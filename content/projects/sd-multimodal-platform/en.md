---
title: "SD Multi-Modal Platform: Portfolio-Ready Stable Diffusion Platform"
tagline: "A product-shaped AI generation demo unifying txt2img, img2img, inpaint, post-processing, queue state, assets, and history"
summary: "SD Multi-Modal Platform is a FastAPI + React generative AI platform demo. The refreshed version keeps the full-mode Stable Diffusion / SDXL / ControlNet / post-processing architecture, while adding a mock-safe demo mode so the public GitHub Pages site, screenshots, walkthrough video, and local smoke tests work without GPU access, model weights, Redis, or external services."
role: "Independent developer across full-stack platform design, API implementation, React workbench, mock-safe demo engineering, architecture documentation, deployment, and portfolio integration."
problem: "Stable Diffusion projects often remain stuck in a local-only state: reviewers need model weights, CUDA, Redis, Celery, post-processing weights, and environment-specific paths before they can understand the value. This repo already had many API and service modules, but it needed a stable public entrypoint for demos, screenshots, video capture, and smoke testing."
solution: "I reorganized the project around two modes. Full mode preserves the ModelRegistry, Diffusers pipelines, Redis/Celery queue, assets/history, and post-processing services. Mock-safe mode uses deterministic PIL rendering behind the same FastAPI routes, so the workflow remains demonstrable without large models or GPU hardware. The React workbench can connect to the mock API, and the repo now includes a GitHub Pages static demo, Playwright screenshot/video capture, README Mermaid diagrams, and an interview runbook."
outcome: "The public showcase path is now usable: GitHub Pages opens directly into a product workbench, the portfolio page includes cover media, screenshots, and a WebM walkthrough, and the local mock backend can be smoke-tested through health, models, txt2img, img2img, and queue graceful-degradation checks. The React typecheck/build workflow is also reproducible."
highlights:
  - "First viewport shows the product itself: prompt panel, generated result, queue monitor, assets/history"
  - "Mock-safe demo mode runs core API flows without GPU access, model weights, Redis, or external services"
  - "FastAPI v1 routers separate generation, postprocess, assets, history, models, queue, and health boundaries"
  - "React + TypeScript workbench groups prompt presets, mask workflows, queue state, assets, and history"
  - "Graceful degradation keeps the API bootable when optional ML/runtime dependencies are missing"
  - "README diagrams cover product flow, system architecture, data flow, queue lifecycle, deployment, and module organization"
challenges:
  - "Turning a GPU/model-dependent AI project into a public demo without pretending mock output is real model output"
  - "Preventing optional ML package import failures from blocking the entire FastAPI application"
  - "Integrating the project into a portfolio repo with unrelated local changes while staging only this project's slug and media"
nextSteps:
  - "Deploy a live backend on Render, Railway, or Fly.io for remote API interaction"
  - "Add more real model output examples alongside the mock-safe workflow"
  - "Expand end-to-end coverage for Redis/Celery full queue execution and GPU model switching"
---
This project now demonstrates more than the ability to call Stable Diffusion. It shows how local AI inference capabilities can be packaged into a product-shaped platform that is understandable, testable, deployable, and safe to present in an interview.

The public demo uses mock-safe mode because a portfolio demo needs to be stable and reproducible. Reviewers can immediately see the prompt workbench, generated result, queue state, assets/history, and architecture notes. Locally, the FastAPI mock backend can be started and verified with a smoke test against the same API concepts.

Full mode still retains the real-model architecture: ModelManager coordinates SDXL, SD 1.5, and SD 2.1; the post-processing layer maps to Real-ESRGAN, GFPGAN, and CodeFormer; and Redis/Celery handles long-running queue work. The README documents the storage layout for models, caches, outputs, assets, and logs so large local files and private runtime paths stay out of Git.
