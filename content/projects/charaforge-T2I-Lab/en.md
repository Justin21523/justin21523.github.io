---
title: "CharaForge T2I Lab — Text-to-Image, ControlNet, and LoRA Training Platform"
tagline: "A local AI generation workflow packaged into a reviewable full-stack demo platform"
summary: "CharaForge T2I Lab is a portfolio-ready AI image generation platform. The FastAPI backend exposes text-to-image, ControlNet, batch generation, LoRA training, model scanning, dataset validation, and authentication APIs; Redis/Celery handles long-running jobs; and the React + Vite frontend presents generation, training, job state, and gallery flows. The public GitHub Pages demo includes interactive mock scenarios, screenshot gallery, MP4 walkthrough, architecture notes, and a reviewer runbook so interviewers can understand the system without GPU access or model weights."
role: "Solo developer: product framing, FastAPI backend, T2I/LoRA/ControlNet workflow design, Celery workers, React operator UI, auth/security, documentation, static demo, and GitHub Pages deployment."
problem: "Local AI image generation often lives across WebUIs, scripts, notebooks, and loose model folders. Prompt, seed, LoRA, ControlNet, datasets, training output, and generated files are hard to govern together; long-running generation and training can block APIs; shared GPU resources need queueing, concurrency limits, cost controls, and observability; and a portfolio reviewer should not need to install model weights or start a GPU environment."
solution: "I split the project into two layers: a runnable local full-stack platform and a stable public static demo. The full-stack platform exposes a versioned FastAPI `/api/v1` contract for t2i, controlnet, batch, lora, finetune, datasets, models, and auth; `core/` encapsulates Diffusers/PEFT/PyTorch logic; `workers/` consumes generation and training jobs with Celery; Redis stores queue/job/progress state; and the React UI turns the workflow into an operator dashboard. The static demo uses reproducible mock state, screenshots, and a recorded walkthrough deployed to GitHub Pages for interview review."
outcome: "The project is now packaged as a demonstrable portfolio piece. The GitHub Pages demo can be opened directly and includes interactive scenarios, screenshots, recorded demo, architecture explanation, and runbook. The README documents setup, tests, deployment, and architecture. CI/Pages deployment works from `main`. The codebase passes ruff, pytest, React lint/test/build, and npm audit checks; backend tests cover health, model scanning, datasets, auth/security, ownership, WebSocket tickets, and observability behavior."
highlights:
  - "GPU-free GitHub Pages demo with interactive scenarios, screenshot gallery, MP4 walkthrough, architecture notes, and reviewer runbook"
  - "FastAPI `/api/v1` API covering t2i, controlnet, batch, finetune, datasets, models, auth, and WebSocket flows"
  - "Celery + Redis async jobs with submit/status/cancel modeling for generation, model scanning, and LoRA training"
  - "AI pipeline integration with PyTorch, Diffusers, Transformers, Accelerate, PEFT, and safetensors"
  - "Security and governance: API keys, JWT refresh cookies, CSRF, short-lived WebSocket tickets, and rate-limit buckets"
  - "Observability and operations: Prometheus metrics, JSON request logs, X-Request-ID, and consistent error responses"
  - "Portfolio packaging: README, docs, screenshots, recording, demo script, and deployment workflow"
challenges:
  - "Turning heavy GPU workloads into governed async API flows while keeping local model/dataset paths flexible"
  - "Designing a GitHub Pages showcase that communicates the project clearly despite not being able to run backend/GPU work"
  - "Converting an internal AI tooling project into a portfolio artifact with screenshots, recording, flow, and runbook"
nextSteps:
  - "Add more recordings and metrics from real GPU inference/training sessions"
  - "Automate screenshots and demo recording through Playwright so showcase assets are reproducible"
  - "Expand E2E and GPU smoke tests so the local full inference path is easier to validate"
---

## Positioning

CharaForge T2I Lab is not just an image generation screen. It packages a local AI image-generation workflow into a full-stack platform that can be operated, governed, and reviewed. It covers three layers:

- AI tooling: text-to-image, ControlNet, batch generation, LoRA training, model scanning, and dataset validation.
- Platform engineering: API contracts, async queues, job state, auth, security, observability, and deployment.
- Portfolio presentation: GitHub Pages, screenshots, recorded demo, walkthrough script, and README.

## Demo Strategy

The public demo uses a static-first approach. GitHub Pages cannot run GPU inference, Redis, Celery, or private model weights, so the demo presents the product experience through mock state and recorded assets:

1. Start with the dashboard to understand product positioning and stack.
2. Switch through Text-to-Image, ControlNet, Batch, and LoRA Training scenarios.
3. Observe how prompt/config, output preview, job timeline, and API contract map to each other.
4. Open the media section for screenshot gallery and MP4 walkthrough.
5. Review architecture/runbook to understand the local full-stack path.

## Technical Architecture

```text
React/Vite Operator UI
  -> FastAPI /api/v1
  -> Redis + Celery queues
  -> Diffusers / PEFT / PyTorch workers
  -> AI_WAREHOUSE filesystem
```

The backend exposes a versioned FastAPI API with separate routers for `t2i`, `controlnet`, `batch`, `finetune`, `datasets`, `models`, `auth`, and WebSocket progress. Long-running work does not block HTTP requests directly. Instead, the frontend submits a job, receives a `job_id`, then tracks progress through status endpoints or WebSocket updates.

## Engineering Highlights

| Area | Implementation | What it demonstrates |
| --- | --- | --- |
| API design | FastAPI routers, typed request/response, Swagger docs | Clear backend boundaries and contracts |
| Async jobs | Redis/Celery, job state, cancel/cleanup | Long-running workload governance |
| AI integration | Diffusers, PEFT, Accelerate, ControlNet hooks | Turning AI libraries into product workflows |
| Security | API keys, JWT, CSRF, WebSocket tickets | Practical API exposure and auth design |
| Frontend | React/Vite dashboard, scenario UI, gallery | Translating engineering flows into usable screens |
| Portfolio packaging | GitHub Pages, screenshots, recording, README | Making a complex project quickly reviewable |

## Current Status

The project is best evaluated as an engineering portfolio case study. The live demo explains the product and workflow quickly, while the repository keeps the full API, worker, React dashboard, and tests. Real inference requires compatible PyTorch/Diffusers/PEFT packages, Stable Diffusion/SDXL/ControlNet/LoRA weights, Redis, and enough GPU/CPU memory.
