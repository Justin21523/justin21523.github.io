---
title: "Procedural 3D Maze"
tagline: "A backrooms-style first-person procedural maze survival prototype built with Three.js"
summary: "A browser-based 3D first-person game prototype built with Three.js, Vite, and React. Each level procedurally generates a fresh maze and rooms via DFS; the player completes mission objectives under monster pressure to unlock the exit. Features A* pathfinding, multi-archetype enemy AI with vision/hearing/smell perception, tools and stealth systems, and a takeover-capable AI 'Autopilot' player. Ships as a web demo and a Tauri desktop build, deployed via Docker/Nginx."
role: "Solo developer (full-stack / game programming, 3D graphics, AI systems)"
problem: "To prove out a browser-runnable, always-different procedural maze experience that combines atmospheric real-time 3D with strategically deep, non-trivial enemy AI and an objective system that avoids a single 'always-chase' loop."
solution: "Levels are generated with a DFS maze plus room carving, extra connections, and dead-end removal; grid navigation and enemy routing use a custom MinHeap A*. Multi-archetype monsters are built from behavior trees and a brain-composer, driven by centralized perception (FOV/LOS vision, noise, scent). Rendering uses PBR materials, HDR image-based lighting, and UnrealBloom post-processing, while the HUD/panels are mounted with React 19 and decoupled from gameplay through an EventBus."
outcome: "A data-driven (level JSON), end-to-end playable prototype: objective-gated exits, tools (smoke/flash/decoy/jammer and more), minimap and world markers, procedural audio, and an AI Autopilot for demos and stress testing. Deployable as a web demo and packageable as a Tauri desktop app."
highlights:
  - "DFS procedural maze generation with room carving and dead-end removal for a unique map every run"
  - "Custom MinHeap A* pathfinding with anti-stuck visited/unreachable memory"
  - "Multi-archetype enemy AI (Hunter, Wanderer, Sentinel, Stalker, Weeping Angel, etc.) with behavior trees and vision/hearing/smell perception"
  - "Atmospheric Three.js rendering: 4K PBR materials, HDR IBL, and UnrealBloom post-processing"
  - "React 19 HUD and panels decoupled via an EventBus and ordered system registry"
  - "A single game loop orchestrating 40+ subsystems, packageable as a Tauri desktop build"
challenges:
  - "Making enemy AI both performant and 'not dumb': far-AI throttling reduces thinking frequency, not movement, to preserve immersion"
  - "Sustaining a playable frame rate in-browser while combining live maze generation with heavy PBR and post-processing"
nextSteps:
  - "Consolidate Tauri, CI, and Docker setup"
  - "Expand level recipes and mission templates to increase endless-mode variety"
  - "Keep tuning monster brains, tool balance, and perception coupling"
---
## Overview

**Procedural 3D Maze** is a browser-based first-person game prototype built with Three.js, Vite, and React 19, drawing on a 'Backrooms' atmosphere. Every level generates a fresh maze and room layout at runtime; the player must complete mission objectives under pressure from multiple monster archetypes to unlock and reach the exit, then advance through endless, difficulty-scaling levels.

## Technical Architecture

The project runs a single game loop (gameLoop.js) coordinating 40+ subsystems via an explicitly ordered system registry, with gameplay logic decoupled from the UI through an EventBus. World state (maze grid, walkability, line-of-sight) is kept separate from game state (HP, timer, inventory). Maps are produced by a DFS maze algorithm that carves base corridors, grows rooms, adds extra connections, and removes dead ends; navigation and enemy routing use a custom MinHeap A*.

## Rendering and AI

Rendering uses Three.js ES modules with 4K PBR materials, HDR image-based lighting, and an EffectComposer/UnrealBloom post-processing stack for atmosphere; models load via GLTF and Collada (.dae). Enemy AI is built from behavior trees and a 'brain composer' covering several archetypes, driven by a centralized perception module handling vision (FOV/LOS), hearing (footsteps, gunfire, tool noise), and smell (player breadcrumb trail, lure scent). An **Autopilot** AI player can take over when the human is idle, serving as a demo and stress-testing harness.

## Platforms and Deployment

The UI is mounted with React 19 (HUD, panels, overlays); a Vite multi-page build also bundles developer tools (enemy-lab, level-lab, diagnostics). The app packages as a Tauri 2 (Rust) desktop build and deploys as a web demo via Docker + Nginx.
