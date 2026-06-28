---
title: "Poker AI Web — Learning Card-Game AI Platform"
tagline: "A self-learning poker AI and multi-game card platform built in pure JavaScript"
summary: "A custom event-driven game engine built with native ES6 modules, centered on a learning Texas Hold'em AI: it combines Q-learning reinforcement learning, Monte Carlo equity simulation, opponent modeling (VPIP/PFR/aggression), and an expected-value decision engine with tunable difficulty and personality. The platform also bundles Big Two, Blackjack, and Old Maid, ships 525+ unit tests and a statistics dashboard, and deploys via Docker/Nginx."
role: "Solo developer (architecture, AI algorithms, frontend, and testing)"
problem: "Build a browser-based poker AI that showcases solid poker math and reinforcement learning with a complete gameplay experience — without heavyweight frameworks or a backend — and make it extensible into a multi-game platform."
solution: "Hand-rolled a modular engine (EventBus, StateManager finite state machine, GameLoop) and layered the AI into PokerMath (Monte Carlo equity, pot/implied odds, draw detection), OpponentModeler (TAG/LAG/TP/LP classification), DecisionEngine (EV-based with personality modifiers), and LearningEngine (Q-learning), persisting learned strategy to localStorage via AIPersistence."
outcome: "Delivered full Texas Hold'em gameplay with a configurable learning AI, expanded into a card-game platform with Big Two, Blackjack, and Old Maid; core modules pass 525+ unit tests and the app is deployed via Docker/Nginx."
highlights:
  - "Q-learning RL: Q(s,a) updates with epsilon-greedy exploration and decay"
  - "Monte Carlo equity simulation (100-2000 iterations by difficulty) plus Sklansky starting-hand groups for hand strength"
  - "Opponent modeling that classifies players as TAG/LAG/TP/LP from VPIP, PFR, and aggression stats"
  - "EV decision engine factoring pot odds, implied odds, positional bonus, four personalities, and four difficulty tiers"
  - "Event-driven + finite state machine architecture, 60 FPS GameLoop, custom timers and time scaling"
  - "GameRegistry dynamic loading of multiple games (Hold'em, Big Two, Blackjack, Old Maid) with 525+ tests and a stats dashboard"
challenges:
  - "Balancing Monte Carlo iteration count against real-time decision latency in a backend-free frontend (handled via difficulty-tiered iteration budgets)"
  - "Designing engine abstractions (BaseCardGame/GameState) reusable across poker and structurally different card games"
nextSteps:
  - "Actually wire up the declared Three.js dependency for 3D table rendering"
  - "Migrate legacy EventBus/StateManager/GameLoop tests from the custom framework to Vitest"
  - "Add online/multiplayer play and richer AI training replays"
---
## Overview
Poker AI Web is a poker/card-game AI platform written in vanilla JavaScript (ES6 modules), deliberately avoiding frontend frameworks and building an event-driven game engine from scratch, with the spotlight on a learning poker AI backed by real poker math.

## Core AI Algorithms
The AI is layered: PokerMath runs Monte Carlo simulations for equity, pot/implied odds, and draw outs, and uses Sklansky starting-hand groups for strength; OpponentModeler tracks VPIP, PFR, and aggression to classify opponents as TAG/LAG/TP/LP; DecisionEngine makes EV-based choices with positional bonuses, four personalities, and controlled variance; LearningEngine applies a simplified Q-learning update with epsilon-greedy exploration and decay, while AIPersistence saves learned strategy to localStorage for long-term improvement.

## Engine & Architecture
Core systems include EventBus (priority-aware observer pattern with error isolation), StateManager/GameState (a finite state machine with transition guards and history rollback), and a 60 FPS GameLoop/TimeManager with pause and time scaling — all loosely coupled via events.

## Multi-Game Platform & Quality
A GameRegistry dynamically loads multiple games; beyond the flagship Texas Hold'em it integrates Big Two, Blackjack, and Old Maid, each with its own AI. The project ships 525+ Vitest unit tests over core logic plus a statistics dashboard (overview, hand history, AI performance, opponent analysis).

## Deployment
Developed with Vite and containerized with Docker/Nginx. Three.js is listed as a dependency, but the table currently renders in 2D CSS/DOM, with 3D as a future plan.
