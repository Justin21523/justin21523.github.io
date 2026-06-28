---
title: "Anime Adventure Lab — RAG + LLM Story World Generation Platform"
tagline: "A service stack that generates, retrieves, and illustrates interactive story worlds with RAG and LLMs"
summary: "A story-driven service stack uniting LLM, RAG, text-to-image, vision-language, and LoRA fine-tuning. A modular FastAPI backend exposes routered capabilities, Celery + Redis handle long jobs, and the frontend ships both React and Gradio UIs. Split AI storage roots manage cache, weights, and output with a low-VRAM, local-inference bias."
role: "Solo full-stack / AI engineer: overall architecture, backend APIs, RAG and story engine, frontend UIs, and deployment configuration."
problem: "Generating interactive stories and game worlds requires narrative generation, world-lore consistency, traceable citations, scene illustration, and character fine-tuning all at once — capabilities scattered across separate tools, with no unified, extensible skeleton that still runs on consumer GPUs."
solution: "A modular monolith: FastAPI splits LLM, RAG, story, T2I, VLM, LoRA, batch, and admin into independent routers; a core layer encapsulates the business logic with hierarchical chunking, bge-m3 embeddings, hybrid FAISS + BM25 retrieval with reranking, and a story engine covering GameState, choice resolution, memory, and character systems. Inference stays local via a llama.cpp server adapter and transformers, while AI_WAREHOUSE 3.0 separates cache, model, and output roots."
outcome: "A working end-to-end prototype: API routers and smoke tests are in place, the core layer carries substantial story, RAG, and T2I implementations, and the frontend offers both a React 19 (Vite/TanStack/Tailwind/Radix) UI and a Gradio UI, with Docker Compose and CI configured. Some public endpoints remain stubs — positioned as an extensible skeleton."
highlights:
  - "Modular FastAPI backend splitting LLM / RAG / story / T2I / VLM / LoRA / batch / admin into dedicated routers"
  - "Chinese-oriented RAG: hierarchical chunking, bge-m3 embeddings, hybrid FAISS + BM25 retrieval with reranking and citations"
  - "Full story engine: GameState, choice resolution, memory management, character and scene systems"
  - "Celery + Redis async job queue for long-running fine-tuning and batch generation tasks"
  - "Dual-frontend strategy: React 19 + Vite + TanStack + Tailwind for production, Gradio for rapid prototyping"
  - "AI_WAREHOUSE 3.0 storage governance with low-VRAM defaults (fp16/bf16, LoRA, device_map=auto)"
challenges:
  - "Designing split cache / weights / output storage roots so no large models or datasets ever enter the repo"
  - "Keeping LLM inference switchable between a local llama.cpp server and transformers while preserving low-VRAM defaults"
  - "Coordinating state consistency and memory write-back across the story engine, RAG retrieval, and text-to-image"
nextSteps:
  - "Flesh out the remaining stubbed public endpoints into full implementations and broaden integration test coverage"
  - "Strengthen safety governance: content filtering, watermarking, and license records"
  - "Performance and export: 4/8-bit quantization, KV-cache, batch generation, and artifact export"
---
Anime Adventure Lab is an **LLM + RAG + T2I + VLM + LoRA** service stack built around story-driven experiences. Its goal is to fold the many AI capabilities needed for interactive storytelling and game-world generation into one engineering skeleton that runs on consumer GPUs and grows incrementally.

The backend is a modular FastAPI monolith that separates health, LLM chat, RAG, story, text-to-image, vision-language, LoRA fine-tuning, batch, and admin into clean router groups. The `core/` layer holds the real business logic: the RAG subsystem covers document processing, hierarchical chunking, bge-m3-centric embeddings, a FAISS vector store paired with BM25 for hybrid retrieval and reranking with citations, while the story subsystem includes GameState, choice resolution, memory management, and character and scene systems. Long-running work flows through a Celery + Redis queue, with SQLAlchemy/PostgreSQL underneath.

Model inference is deliberately local-first: it switches between a llama.cpp server adapter and transformers, and leans on low-VRAM defaults such as fp16/bf16, LoRA in place of full fine-tuning, and `device_map=auto` to lower the hardware bar. The project follows AI_WAREHOUSE 3.0 principles, separating cache, model weights, and output into distinct roots so the repo never carries large assets, and managing secrets through `.env` that is never committed.

The frontend takes a dual-track approach: a production WebUI built with React 19 + Vite, backed by TanStack Query/Router, Tailwind, Radix UI, and Zustand, alongside a retained Gradio UI for rapid prototyping and demos, plus a Qt desktop prototype. The whole stack is orchestrated with Docker Compose and wired to GitHub Actions CI.

The project is currently a **prototype**: the full chain runs end-to-end and passes smoke tests, and the `core/` layer already carries substantial implementations, but some public endpoints remain intentionally minimal stubs that wire the whole stack together while leaving clear extension points for later safety, quantization, and export stages.
