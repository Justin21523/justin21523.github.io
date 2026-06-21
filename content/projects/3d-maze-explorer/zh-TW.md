---
title: "Procedural 3D Maze"
tagline: "A first-person procedural maze game prototype built with JavaScript (ES Modules)..."
summary: "A first-person procedural maze game prototype built with JavaScript (ES Modules) and Three.js. Each run generates a new maze, then spawns missions, enemies, and..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Three.js 的解決方案。"
highlights:
  - "**Endless levels + difficulty scaling**: `src/core/levelDirector.js`, `public/levels/*`, optional recipes in `public/level-recipes/*`"
  - "**Missions + interactables + exit gati"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
A first-person procedural maze game prototype built with JavaScript (ES Modules) and Three.js. Each run generates a new maze, then spawns missions, enemies, and pickups from per-level JSON configuration. Complete the required objectives to unlock the exit and advance to the next level. After the base set of levels, the game can keep generating levels endlessly with difficulty scaling.

This repo also includes an AI player (Autopilot) that takes over when the player is idle. Autopilot is intended for demos, stress testing, and iterating on missions/AI/tool balance.

- Endless levels + difficulty scaling: src/core/levelDirector.js, public/levels/, optional recipes in public/level-recipes/ - Missions + interactables + exit gati
