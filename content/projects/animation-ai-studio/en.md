---
title: "Animation AI Studio: A Demoable AI Animation Workflow Platform"
tagline: "Turning shot planning, generation jobs, artifact review, and system monitoring into an interview-ready product surface"
summary: "Animation AI Studio is a local-first AI animation workflow platform. It has been shaped from a research-heavy script collection into a portfolio-ready demo with a GitHub Pages project site, a runnable mock-safe Web UI, seeded demo scenarios, screenshots, and a WebM walkthrough. Users can understand the project from the public page first, then run the local demo mode to inspect FastAPI, SQLite, job orchestration, result browsing, and system monitoring."
role: "Solo developer (product framing, full-stack implementation, demo engineering, deployment, and documentation)"
problem: "AI animation projects often remain hard to evaluate because they depend on GPU hardware, model weights, ComfyUI, API keys, media assets, and many batch scripts. That is weak for portfolio walkthroughs: users cannot quickly understand the value or reliably see a working result. This project solves the presentation problem by turning a research pipeline into a demoable, screenshot-ready, recordable, and honestly scoped portfolio project."
solution: "I built a dual-mode architecture. Demo mode uses repo-local SQLite and outputs/demo with a deterministic mock runner that writes logs, summaries, storyboard manifests, quality reports, and gallery previews without private keys, GPU access, or model files. Full mode preserves the integration path to ComfyUI, image providers, TTS, FFmpeg, and batch scripts. The Web UI is a Vanilla JS SPA served by FastAPI, with Jobs, Action, Image, Creative, Results, and System pages. The backend uses FastAPI routers, a SQLite job database, and a JobService layer for execution and progress tracking. A separate GitHub Pages site presents the product in the first viewport and includes screenshots, a WebM demo, architecture notes, and local run instructions."
outcome: "The public demo path is complete: GitHub Pages serves the landing page, screenshots, demo video, and description; the local runner seeds sample data and starts the Web UI; core APIs, frontend JS syntax, Python py_compile, focused pytest tests, demo job submission, and public media HTTP checks have all been verified. The full GPU/model pipeline still requires local model assets, external services, and provider credentials, so it is documented as a full-mode extension path rather than overstated as universally runnable."
highlights:
  - "GitHub Pages project site with positioning, architecture, screenshots, WebM demo, and local run instructions"
  - "Mock-safe demo mode that runs without API keys, model weights, or GPU access"
  - "Seeded scenarios for completed, running, failed, and provider-routing states"
  - "FastAPI + SQLite backend for jobs, outputs, stats, results, and system metrics"
  - "Vanilla JS Web UI with Jobs Dashboard, Results Browser, System Monitor, and job details"
  - "Demo artifacts including summary.json, quality_report.json, storyboard manifests, logs, and gallery previews"
challenges:
  - "Packaging scattered AI scripts into a product-like demo that an user can understand quickly"
  - "Keeping the demo credible without relying on GPU hardware, ComfyUI, model weights, or private credentials"
  - "Drawing a clear boundary between mock-safe demo mode and full-mode runtime integrations"
nextSteps:
  - "Deploy the interactive FastAPI demo to Render, Railway, Fly.io, or a VM so users can use it without local setup"
  - "Add more real model-output examples so demo artifacts can mix mock previews with actual generations"
  - "Strengthen full-mode provider execution, retry/cancel behavior, and artifact preview with broader end-to-end tests"
---
## What To Review

The project is now framed around the ability to make a complex AI workflow inspectable. The public site shows the demo video and screenshots. The local demo mode lets users seed jobs, submit a mock job, browse generated artifacts, and inspect CPU/RAM/GPU/disk monitoring without needing a private runtime.

## Architecture

There are two frontend surfaces: `portfolio-web/` is the GitHub Pages static project site with screenshots and video, while `web_ui/frontend/` is the Vanilla JS SPA for the interactive dashboard. The backend is `web_ui/backend/`, a FastAPI service with routers for jobs, stats, results, system metrics, action, image, and creative flows. SQLite stores jobs, outputs, progress events, and metrics. JobService owns execution: demo mode writes deterministic artifacts, while full mode can hand off to batch scripts and external providers.

## Demo Flow

The recommended interview flow is: open the GitHub Pages page and explain the project positioning; show the Jobs Dashboard with completed/running/failed states; open the Results Browser and inspect outputs/demo artifacts; submit a demo-mode job and watch it complete with logs, summary, storyboard, and gallery outputs; then open System Monitor to explain how the same interface maps to real GPU/model pipeline execution.

## Engineering Tradeoffs

Demo mode and full mode are intentionally separate. Demo mode optimizes reliability: no private environment, no model downloads, no `/mnt/data` dependency, and all outputs are regenerated under repo-local `outputs/demo`. Full mode keeps the path to ComfyUI, LTX/Wan providers, TTS, FFmpeg, and existing scripts, but it is clearly documented as requiring local runtime assets and credentials. That makes the portfolio demo honest while still showing architecture, observability, and deployment thinking.
