---
title: "SD Multi-Modal Platform"
tagline: "A unified Stable Diffusion backend from txt2img to multimodal understanding"
summary: "A FastAPI-based Stable Diffusion multimodal platform that unifies text-to-image, image-to-image, inpainting, and upscale/face-restore post-processing, while wiring in BLIP-2 captioning and LLaVA visual question answering. The backend uses modular routing with lazy-loaded model management and a Redis + Celery async queue; a React + TypeScript frontend drives it, all under a strict model/cache/output storage discipline."
role: "Full-stack & ML platform developer: designed and built the backend API, model-inference services, async queue, frontend UI, and containerized deployment."
problem: "Individual Stable Diffusion tools tend to live in silos—text-to-image, image-to-image, inpainting, upscaling, and image understanding scattered across separate scripts or WebUIs, with no unified API, task queue, or model management. Switching between several models within limited GPU memory is fragile, and the setup resists clean containerization and testing."
solution: "I built a single FastAPI backend that decomposes each capability into independent v1 routers (txt2img / img2img / inpaint / upscale / face_restore / caption / vqa / queue / models / history / assets / health). A services layer with a model registry and lazy-loading cache manages SD 1.5, SDXL, ControlNet, BLIP-2, and LLaVA behind one interface, while long-running jobs are handed off to Redis + Celery generation/postprocess queues. The backend is designed to boot even when Redis or model weights are absent (returning 503 instead of crashing), and a React + TypeScript (Vite) frontend provides the UI, including a mask editor."
outcome: "Delivered a working prototype: a unified REST API spanning multiple generation and post-processing capabilities, a gracefully degradable async queue, model auto-selection with caching, and a React frontend. The project ships a pytest suite (80% coverage gate), Docker Compose (with a GPU profile), and Kubernetes manifests, and rigorously follows the storage discipline—models/caches under /mnt/c, outputs under /mnt/data—with .env secret isolation."
highlights:
  - "Modular FastAPI v1 API unifying txt2img / img2img / inpaint / upscale / face_restore / caption / vqa behind one backend"
  - "Multi-model management: a registry plus lazy-loading cache to switch across SD 1.5, SDXL, ControlNet, BLIP-2, LLaVA, and Qwen2"
  - "Redis + Celery async queue (generation / postprocess) so long jobs never block the API"
  - "Graceful degradation: boots even without Redis, ControlNet, or model weights, with endpoints returning a clean 503"
  - "React + TypeScript frontend with a built-in mask editor, status polling, and history browsing"
  - "Production-minded engineering: pytest markers with an 80% coverage gate, auth/rate-limit/logging middleware, Docker Compose, and K8s configs"
challenges:
  - "Coordinating load/unload of several heavyweight models within limited GPU memory, requiring lazy loading, caching, and device/precision (float16) strategies to avoid OOM"
  - "Supporting the RTX 5080 (sm_120) meant adopting PyTorch Nightly (CUDA 12.8) while keeping diffusers/xformers compatibility intact"
  - "Keeping the backend bootable—and returning clear errors—when optional components (Redis/Celery/ControlNet/model weights) are missing, rather than failing wholesale"
nextSteps:
  - "Per the archival plan, migrate the distinctive modules (upscale, face restore, queue management, K8s/Gradio/desktop) into a follow-on flagship project"
  - "Strengthen the multimodal chat and VQA routes, integrating Qwen2 and BGE-m3 embeddings for retrieval-augmented interaction"
  - "Add integration and GPU end-to-end stress tests, and improve frontend error feedback and task-progress visualization"
---
The SD Multi-Modal Platform is a **FastAPI**-centered Stable Diffusion inference backend prototype that unifies a range of image generation and understanding capabilities. It consolidates functionality that usually lives in scattered scripts and WebUIs—text-to-image, image-to-image, inpainting, upscaling, face restoration, image captioning, and visual question answering—into a single, modular REST API.

The architecture is a three-tier collaboration: the **frontend** is React + TypeScript (Vite) with a mask editor and task-status polling; the **API layer** exposes independent routers under `/api/v1` via FastAPI, wrapped in auth, rate-limit, logging, CORS, and gzip middleware; the **inference layer** lives in `services/`, using a model registry and lazy-loading cache to manage SD 1.5/SDXL (diffusers), ControlNet, and transformers models such as BLIP-2 captioning and LLaVA VQA. Long-running jobs are processed asynchronously through **Redis + Celery** generation/postprocess queues so the API stays responsive.

The engineering emphasizes **resilience and reproducibility**: the backend boots even without Redis, ControlNet, or downloaded weights, with affected endpoints reporting a clear 503 instead of crashing. Model, cache, and output paths are centrally managed via environment variables (models/caches on `/mnt/c`, outputs on `/mnt/data`), and secrets are isolated in `.env` and never committed.

The project ships a full engineering toolchain: a **pytest** suite with unit/integration/api markers and an 80% coverage gate, **Docker Compose** (including a GPU profile), and **Kubernetes** manifests. To support the RTX 5080 (sm_120), the environment uses PyTorch Nightly (CUDA 12.8).

The platform is currently positioned as a prototype; per its archival notes, distinctive modules—upscaling, face restoration, queue management, and deployment—are slated to be absorbed into a successor flagship project.
