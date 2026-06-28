---
title: "InteractCSS — Interactive HTML/CSS Learning Lab"
tagline: "Turning CSS properties into live, manipulable controls with real-time preview"
summary: "InteractCSS is a vanilla HTML/CSS/JavaScript learning platform that turns CSS properties and components into sliders, toggles, color pickers and drag handles with live preview. It covers 3D transforms, OKLCH color, Flexbox/Grid, scroll timelines, variable fonts and more across 28+ built demos. A schema-driven engine auto-generates control panels, with a built-in FPS perf HUD, full keyboard navigation, ARIA accessibility, and @supports-based graceful degradation."
role: "Solo developer (architecture, core modules, demos, deployment)"
problem: "Advanced CSS features — 3D transforms, blend modes, scroll-linked animation, modern color spaces — are abstract and hard to grasp. Static docs and code snippets cannot show learners how a property change instantly affects rendering."
solution: "Build a reusable core engine: studio.js provides the stage and shortcuts, ui.js auto-generates a control panel from a JSON schema and binds it to CSS custom properties, perf.js monitors FPS and layout shifts, and base.css uses @layer to manage cascade order. Each demo keeps HTML/CSS/JS strictly separate, controls only mutate CSS variables, and animations favor transform/opacity to avoid reflow."
outcome: "Delivered 28+ interactive demos plus multi-element labs (3D transforms, color filters, Flexbox), spanning ten topic categories from HTML basics to modern CSS, with keyboard navigation, screen-reader announcements, reduced-motion and high-contrast support, deployed via Docker/Nginx."
highlights:
  - "Schema-driven control factory: a JSON definition auto-generates slider/select/switch/color controls bound to CSS variables"
  - "CSS @layer manages the reset->base->utilities->demo->overrides cascade to avoid specificity conflicts"
  - "Multi-element labs dynamically add/remove up to 20 elements with isolated per-element CSS-variable state"
  - "Built-in perf HUD computes FPS and frame time via rAF and detects layout shifts with PerformanceObserver"
  - "Accessibility-first: full keyboard control, ARIA live-region announcements, reduced-motion and high-contrast support"
  - "Pure vanilla — no frameworks or build tools — using native browser ES Modules"
challenges:
  - "Designing an extensible schema and core modules in a pure vanilla stack so new demos work by just declaring controls"
  - "Providing consistent @supports fallbacks for new features like backdrop-filter, 3D transforms, container queries, :has() and color-mix()"
  - "Isolating each element's CSS variables and property state in multi-element scenarios while keeping drag and keyboard interaction smooth"
nextSteps:
  - "Complete remaining roadmap milestones toward the full ~60-demo curriculum"
  - "Add still-missing demos such as Position Playground, Variable Font Player and Color Mix"
  - "Clean up leftover test/debug files in the demos folder and unify each demo's entry-point structure"
---
## Overview

**InteractCSS** (html-css-interactive-lab) is an interactive learning laboratory built in pure vanilla HTML/CSS/JavaScript. It turns abstract CSS properties and components into manipulable sliders, switches, color pickers and drag handles with real-time preview, so learners can tweak and instantly see how each property affects rendering.

## Architecture

The project deliberately avoids any framework or build tooling, relying only on native browser ES Modules. Four core modules form a reusable engine: studio.js handles the stage, shortcuts and ARIA; ui.js is a control factory that auto-generates UI from a JSON schema and binds it to CSS custom properties; perf.js provides FPS and frame-time monitoring; and base.css manages cascade order with CSS @layer and exposes design tokens. Each demo keeps HTML/CSS/JS strictly separate, controls mutate only CSS variables, and animations favor transform/opacity to avoid reflow.

## Scope

More than 28 interactive demos have been built, covering 3D transforms and perspective, the OKLCH color space, gradient generation, Flexbox and Grid, scroll/view timelines, variable fonts, clip-path, blend modes, dialog modals, ARIA live regions and more — mapping to ten curriculum categories from HTML fundamentals to modern CSS. Multi-element labs additionally allow dynamically adding/removing elements with independent per-element property editing.

## Engineering Focus

Pointer Events unify mouse and touch dragging, complemented by continuous keyboard input. Accessibility is a first-class requirement: full keyboard navigation, screen-reader announcements, prefers-reduced-motion and high-contrast support. Every modern CSS feature is wrapped in @supports with graceful fallbacks. The project is containerized with Docker and Nginx.
