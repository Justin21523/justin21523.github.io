---
title: "JavaScript Platformer Concepts"
tagline: "A 2D action-platformer tech sandbox built with Phaser 3 and a custom ECS"
summary: "A concept prototype exploring the core tech of 2D platformers: it ships both a Phaser 3 runtime and a hand-rolled Vanilla JS ECS engine, covering procedural level generation with reachability validation, an AI auto-player, and an offline stress-test / auto-tuning toolchain. Gameplay includes a Hyperdrive boost, ability-based combat, artifacts, and meta-progression. Now folded into platformer-game; this repo is kept as a technical archive."
role: "Solo developer / gameplay engineering & systems design"
problem: "To prove out whether a purely front-end 2D platformer could be both hand-playable and machine-verifiable by an AI, while guaranteeing reproducible procedural levels that are always completable."
solution: "A data-driven ECS splits dozens of systems (physics, collision, camera, parallax, combat, abilities, VFX, waves), with seeded-RNG procedural generation backed by reachability checks and retries. An A*-with-jump-edges AI player feeds commands that merge with human input, paired with Node.js offline tools for stress testing, auto-tuning, variation replay comparison, and nightly regression."
outcome: "A platformer foundation that is instantly playable in the browser yet can be auto-completed and quantitatively scored by an AI (pass rate, stall rate, rescue rate, completion P90), packaged with Vite and deployable via Docker/Nginx. Validated concepts were merged into the successor project."
highlights:
  - "Dual implementation: a Phaser 3 runtime alongside a hand-built Vanilla JS ECS engine for architecture comparison"
  - "Seeded procedural level generation with built-in reachability guarantees and retry-on-failure to avoid uncompletable maps"
  - "AI player using grid A* with jump edges; its commands merge with human input via InputMergeSystem without conflict"
  - "Full offline QA toolchain: stress tests, auto-tuning, AI dual-check, variation replay compare, and nightly regression gates"
  - "Rich gameplay systems: Hyperdrive boost, light/heavy/spin attacks and shots, shield, artifact rarities, and meta-progression"
  - "Vite builds plus Docker + Nginx deployment configs and asset-generation scripts, mirroring real delivery practice"
challenges:
  - "Keeping procedurally generated levels always completable in a pure front-end, requiring conservative reachability validation and retries"
  - "Letting the AI and human input coexist without fighting for control, and scoring level balance with objective quantitative metrics"
nextSteps:
  - "Continue the merge into platformer-game, consolidating the dual implementations into a single runtime"
  - "Expand AI evaluation metrics and auto-tuning dimensions to establish a sustainable level-quality baseline"
---
## Overview

**JavaScript Platformer Concepts** is a sandbox focused on the core technology of 2D action-platformers. Its defining trait is a dual approach: index.html boots a Phaser 3 runtime (src/phaser-main.js), while the repo also preserves a complete, hand-rolled Vanilla JS ECS engine (src/main.js, src/ecs, and dozens of systems under src/systems) to contrast a framework against a from-scratch architecture across physics, collision, camera, parallax, and combat.

## Architecture & systems

The core is a data-driven Entity-Component-System: a World manages entities and component storage via bitmasks, with systems for input merging, physics, collision, camera, parallax background, hitboxes, damage, abilities, projectiles, VFX, waves, goals, and celebration modes. Levels come from fixed maps (Tiled TMX/JSON) or the ProceduralLevelGenerator, which uses a mulberry32 seeded RNG plus reachability guarantees and retries so it never ships an uncompletable map.

## AI & offline toolchain

The standout idea is treating machine-verifiability as a first-class concern. AiPlayerSystem drives play through PlatformerPathfinding (grid A* with jump edges) and a task runner, with commands merged against human input by InputMergeSystem. package.json exposes a Node.js tool suite — ai:autotune, ai:stress, map:ai:dual, variation:eval, nightly:stress — that auto-tunes and runs nightly regression against thresholds like pass rate, stall rate, rescue rate, and completion P90.

## Gameplay & delivery

Gameplay adds a Hyperdrive boost, light/heavy/spin/shot abilities, shield blocking, artifact rarities and meta-progression. On the engineering side it builds with Vite and ships Docker + Nginx deployment configs alongside asset-generation scripts.

## Status

This project's contents have been merged into platformer-game for ongoing development, and this repository remains as a technical archive and architecture reference.
