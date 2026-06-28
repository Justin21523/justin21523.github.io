---
title: "CharaForge T2I Lab — Text-to-Image & LoRA Fine-tuning Platform"
tagline: "A full-stack AI lab unifying diffusion inference, LoRA training, and model governance"
summary: "A text-to-image platform built with FastAPI and React that unifies Stable Diffusion 1.5/SDXL inference, PEFT LoRA fine-tuning, ControlNet conditioning, and model-warehouse management. Long-running generation and training jobs run on a Celery + Redis async queue with live WebSocket progress, guarded by JWT/API-key auth and rate limiting, and run on local GPU or Docker."
role: "Solo developer: end-to-end design and implementation of the backend API, inference/training core, Celery workers, React frontend, authentication, and deployment."
problem: "Character-focused text-to-image workflows are usually scattered across ad-hoc scripts and notebooks: models live loosely on the filesystem, LoRA training lacks scheduling and progress visibility, generation calls block synchronously with no concurrency or cost governance, and there is no auth or rate limiting for exposing the service. I needed one platform that unified inference, training, model management, and access control."
solution: "I designed a layered architecture. `core/` encapsulates a unified T2I Pipeline manager (multiple schedulers, SD1.5/SDXL, dynamic LoRA load/unload, NSFW safety filtering, and watermarking) and a LoRA trainer (Accelerate + Diffusers + PEFT). `api/` exposes versioned `/api/v1` FastAPI routers spanning t2i, controlnet, lora, batch, finetune, datasets, models, and auth, with long jobs handled via a submit/status/cancel async model. `workers/` runs Celery consumers for the t2i and training queues. The React 19 + Vite + Zustand frontend provides generation, batch, training, LoRA, and gallery modules and receives live training progress over WebSocket. The security layer implements hashed managed API keys (the `cfk_` format), JWT access/refresh tokens with CSRF protection, short-lived single-use WebSocket tickets, and multi-bucket rate limiting."
outcome: "Delivered a working prototype: the API, T2I worker, training worker, and React UI all start locally, with Docker Compose orchestrating the backend, Redis, and workers. Model scanning builds a registry; generation and training run on async queues with per-owner/global concurrency and cost governance; CLIP and face-consistency evaluators, Prometheus metrics, and structured request logs are integrated. The project is positioned to have its distinctive modules (distributed training queue, auth, training evaluators) absorbed into a larger content-creation platform."
highlights:
  - "Unified T2I Pipeline manager supporting SD1.5/SDXL, multiple schedulers (DDIM/DPM++/Euler-A/LMS/PNDM), and dynamic LoRA load/unload"
  - "Celery + Redis async queue: both generation and training use a submit/status/cancel model with per-owner and global concurrency/queue limits"
  - "Full ControlNet endpoints: pose, depth, canny, and lineart conditioned generation"
  - "Production-grade auth: API keys, JWT (with refresh and CSRF), short-lived WebSocket tickets, and multi-bucket rate limiting"
  - "LoRA training core on Accelerate + Diffusers + PEFT, paired with CLIP and face-consistency evaluators"
  - "Observability: Prometheus metrics, JSON request logs, X-Request-ID tracing, and a uniform error format"
challenges:
  - "Coordinating concurrent generation and training on a shared GPU under a single pipeline lock to avoid VRAM contention while keeping jobs governed"
  - "Designing a secure auth flow for browser WebSockets, replacing credentials-in-query-params with short-lived single-use tickets"
  - "Externalizing models, caches, datasets, and training outputs per the AI_WAREHOUSE convention, avoiding hard-coded paths so containers and local runs share one warehouse"
nextSteps:
  - "Absorb the distinctive modules (distributed training queue, auth, training evaluators) into the broader anime-adventure-lab content platform"
  - "Expand advanced workflows for ControlNet and multi-LoRA composition"
  - "Strengthen end-to-end integration tests and regression coverage for GPU environments"
---
## Overview

CharaForge T2I Lab is a character-centric text-to-image lab that unifies diffusion inference, LoRA fine-tuning, and model governance in a single full-stack system. The backend is a FastAPI service exposing a versioned `/api/v1` REST API plus WebSocket; the frontend is a React 19 + Vite single-page app; and long-running generation and training jobs are offloaded to a Celery + Redis async queue.

## Architecture

The project follows a clean layered design. `core/` holds framework-agnostic domain logic — a unified T2I Pipeline manager (Stable Diffusion 1.5 and SDXL, multiple schedulers, dynamic LoRA loading, NSFW safety filtering, and watermarking) plus a LoRA trainer built on Accelerate, Diffusers, and PEFT. `api/` provides routers for t2i, controlnet, lora, batch, finetune, datasets, models, and auth. `workers/` runs Celery consumers for the generation and training queues. Models, caches, datasets, and training outputs are externalized on the filesystem per the AI_WAREHOUSE convention and accessed via environment variables rather than hard-coded paths.

## Async jobs and governance

To keep synchronous requests from blocking expensive GPU work, both generation and training use a submit/status/cancel model. The system enforces per-owner and global concurrency/queue limits, cost-based throttling, and TTL cleanup of output files, keeping the platform controllable under limited GPU resources.

## Security and observability

The auth layer supports hashed managed API keys (the `cfk_` format), exchangeable JWT access/refresh tokens (with HttpOnly cookies and CSRF protection), and short-lived single-use tickets for browser WebSockets. Multi-bucket rate limiting covers auth, uploads, datasets, and T2I cost. For observability it offers Prometheus metrics, structured JSON request logs, `X-Request-ID` tracing, and a uniform error response format.

## Status

The platform is a working prototype that runs on local GPU and via Docker Compose. Per the project positioning analysis, its distinctive modules — distributed training queue, authentication, and training evaluators — are slated to be merged into a broader content-creation platform.
