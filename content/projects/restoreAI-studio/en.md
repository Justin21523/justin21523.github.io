---
title: "RestorAI Studio — AI Image Restoration & Super-Resolution Platform"
tagline: "A prototype AI image restoration & super-resolution toolkit spanning Web, API, and CLI"
summary: "RestorAI Studio is a PyTorch-based image/video enhancement platform prototype integrating Real-ESRGAN super-resolution, GFPGAN/CodeFormer face restoration, and RIFE frame interpolation. It exposes four front-ends — Gradio web, FastAPI REST API, CLI, and a PyQt desktop app — over modular pipelines featuring tiled inference, an async job queue, batch processing, safety filtering, and Prometheus monitoring."
role: "Solo developer (architecture, backend API, inference pipelines, multi-interface integration)"
problem: "Typical restoration tools are locked to a single interface, redownload model weights per project wasting disk, and lack the batching, job-tracking, and deployment scaffolding needed to move from demo to a maintainable service."
solution: "A `BaseProcessor` abstraction unifies model loading, inference, memory management, and tiled processing across ESRGAN/GFPGAN/RIFE. The FastAPI backend is split into jobs, batch, video, safety, metrics, and admin routers, backed by a ThreadPoolExecutor job queue with disk journaling. A centralized 'AI Warehouse' shares model weights across projects, while Gradio, static Web, PyQt desktop, and CLI all reuse the same inference core."
outcome: "A working prototype where a single run.py switches between UI/API/CLI, with health checks, Prometheus metrics, safety filtering, and Docker deployment configs. Several modules (pipeline, gfpgan, rife loaders) remain scaffolding — a functionality-validation-stage prototype."
highlights:
  - "Abstract base classes unify image/video processors with FP16 and tiled inference for large-image memory control"
  - "Modular FastAPI backend split into a dozen routers (jobs, batch, video, safety, metrics, exports, history)"
  - "Async ThreadPoolExecutor job queue with progress/event callbacks and disk journaling for recovery"
  - "Centralized AI Warehouse design shares model weights across projects to save disk"
  - "Four interfaces — Gradio, static Web, PyQt desktop, and CLI — over one shared inference core"
  - "Built-in NSFW/face-blur safety filtering, Prometheus metrics endpoint, and Docker deployment config"
challenges:
  - "Sharing one inference core across Web/API/CLI/Desktop while keeping state consistent"
  - "Tiled inference and memory release for large images and video under limited VRAM"
  - "Reproducibility and deployment complexity from heavy, version-sensitive deps (CUDA nightly, basicsr/realesrgan)"
nextSteps:
  - "Complete the still-scaffolded model loaders/inference for pipeline, GFPGAN, and RIFE"
  - "Upgrade the in-memory/ThreadPool job queue to the already-declared Celery + Redis for horizontal scaling"
  - "Pin dependency versions (PyTorch nightly, mismatched PyQt5/6) and add automated tests and CI"
---
## Overview

RestorAI Studio (internally RestorAI MVP) is a **PyTorch**-based prototype platform for AI image and video restoration and super-resolution, integrating **Real-ESRGAN** upscaling, **GFPGAN / CodeFormer** face restoration, and **RIFE** frame interpolation. The goal is to engineer a plain model demo into a service scaffold with multiple interfaces, a job queue, and deployable structure.

## Architecture

The core `core/base.py` defines `BaseProcessor` / `ImageProcessor` / `VideoProcessor` abstractions that unify model loading, inference, memory measurement, and **tiled inference**; `ESRGANProcessor` is the most complete implementation, supporting FP16 and automatic device selection. The **FastAPI** backend under `api/` is modularized into a dozen routers — jobs, batch, video, safety, metrics, admin, exports, history — with a `ThreadPoolExecutor` job queue and `jobs_journal.jsonl` disk journaling for progress tracking and recovery.

## Multi-interface & engineering

A single entry point `run.py` switches between **Gradio web UI, FastAPI REST API, and CLI**, with an additional **PyQt desktop** app and a static web front-end, all reusing one inference core. The project adopts a centralized **'AI Warehouse'** that stores model weights under `~/ai-warehouse` for cross-project sharing, and ships NSFW/face-blur safety filtering, a Prometheus metrics endpoint, health checks, pytest suites, and Docker / docker-compose deployment configs.

## Prototype status

Honestly labeled a **prototype**. Several modules (`core/pipeline.py`, `core/gfpgan.py`, `core/rife.py` weight loaders) are still placeholder scaffolding; `jobs.py` contains a duplicate Job definition; and although requirements declare Celery/Redis/Flower, the actual job system runs in-process via ThreadPool. Dependency versions (CUDA nightly, coexisting PyQt5 and PyQt6) also need consolidation. The multi-interface design and pipeline architecture are validated; next steps focus on completing model implementations and deployment stability.
