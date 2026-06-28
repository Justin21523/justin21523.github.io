---
title: "Vanilla DOM Playground"
tagline: "A visual learn-by-doing platform for DOM and events, built in pure JavaScript"
summary: "A zero-framework interactive learning platform that pairs a visual DOM builder with 5 mini games, 4 event tutorials, and 3 hands-on projects. By dragging elements, binding events, configuring animations, and generating runnable HTML/CSS/JS in real time, it helps learners understand DOM manipulation, event propagation, and CSS animations by doing. Roughly 18,000 lines of pure Vanilla JavaScript built on an ES6-module, event-bus architecture."
role: "Solo developer (design, frontend architecture, full implementation, and docs)"
problem: "DOM manipulation and the event model (capturing, bubbling, delegation, custom events) are frontend fundamentals but feel abstract; beginners memorize APIs without grasping what changed and why."
solution: "A learning platform whose visual builder lets users drag elements, set properties, bind events, and author CSS transitions while emitting minimal runnable code instantly; a guided learning mode then uses games, visual tutorials, and real-world projects, reinforced by an achievement and leaderboard system."
outcome: "A complete platform covering 62 DOM event types, 12 learning modules, and 30 achievements, totaling ~18,000 lines of pure JavaScript and ~6,000 lines of CSS with no framework dependency, plus Docker/Nginx deployment and full design documentation."
highlights:
  - "Visual DOM builder with drag, 8-handle resize, smart guides, grid snapping, marquee multi-select, and Z-order control"
  - "Live code generation: any panel change instantly updates the stage and the minimal HTML/CSS/JS output"
  - "Event system spanning 62 event types across 8 groups, with capture/once/passive options and action presets"
  - "5 games + 4 visual tutorials + 3 hands-on projects teaching propagation, delegation, and custom events step by step"
  - "Gamification layer: 30 achievements, 4 rarity tiers, progress tracking, leaderboard, and Web Audio sound effects"
  - "Pure Vanilla JS ES6-module architecture with a Pub/Sub event bus, centralized state, and command-based history"
challenges:
  - "Hand-rolling state management, an event bus, and command-based undo/redo without a framework while keeping modules loosely coupled"
  - "Keeping geometry math for drag, snapping, guides, and resizing in precise sync with live code generation"
  - "Sandboxing custom event handlers and sanitizing input to prevent unsafe DOM injection"
nextSteps:
  - "Finish full integration and testing of M4 undo/redo"
  - "Implement M5 theme switching and complete project export (with .zip download)"
  - "Add code highlighting, a snippet library, and advanced export"
---
## Overview

Vanilla DOM Playground is a full-featured, zero-framework frontend learning platform designed to make DOM manipulation, the event model, and CSS animation click through hands-on practice. It has two modes: a visual **build mode** (drag elements, set properties, bind events, configure animations, and generate runnable code in real time) and a guided **learn mode** (games, tutorials, and projects).

## Core Features

The builder supports drag, 8-handle resize, smart alignment guides, grid snapping, multi-select and marquee selection, and Z-order control on a stage canvas. The right-hand panels are split into Properties, Events, and Animations tabs, while the bottom pane shows a live HTML/CSS/JS code preview. The event system handles up to 62 event types across 8 groups, with action presets such as toggleClass, changeColor, and setText, plus capture/once/passive advanced options.

## Learning Content

Learn mode includes 5 games (Whack-a-Mole, Drag Puzzle, Snake, Form Master, Music Keys), 4 visual tutorials (event propagation, event object, event delegation, custom events), and 3 real-world projects (TODO List, image carousel, dropdown menu). On top sits a gamification system: 30 achievements, 4 rarity tiers, progress tracking, a leaderboard, and Web Audio sound effects.

## Technical Architecture

Everything is written in pure Vanilla JavaScript, roughly 18,000 lines of JS and nearly 6,000 lines of CSS, using ES6 modules. The core comprises a Pub/Sub event bus, centralized state management, command-based history, and a minimal code generator. The project also ships Docker/Nginx deployment config and architecture, game, tutorial, and testing docs under /docs.
