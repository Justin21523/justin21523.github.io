---
title: "Anime-Adventure-lab"
tagline: "LLM + RAG + T2I + VLM + LoRA service stack for story-driven experiences. FastAPI..."
summary: "LLM + RAG + T2I + VLM + LoRA service stack for story-driven experiences. FastAPI backend, Celery workers, and a React (Vite) WebUI, with AIWAREHOUSE 3.0 storage..."
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using Python, FastAPI."
highlights:
  - "**AI_WAREHOUSE 3.0**: No large models/datasets in the repo. Use split roots:"
  - "`AI_CACHE_ROOT` (HF/torch/XDG cache) → `/mnt/c/ai_cache`"
  - "`AI_MODELS_ROOT` (managed weights / LoRAs / checkpoints) → `/mnt/c/ai_models`"
  - "`AI_OUTPUT_ROOT` (runs / generated media / exports) → `/mnt/c/ai_output/anime-adventure-lab`"
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
LLM + RAG + T2I + VLM + LoRA service stack for story-driven experiences. FastAPI backend, Celery workers, and a React (Vite) WebUI, with AIWAREHOUSE 3.0 storage roots.

- AIWAREHOUSE 3.0: No large models/datasets in the repo. Use split roots: - AICACHEROOT (HF/torch/XDG cache) → /mnt/c/aicache - AIMODELSROOT (managed weights / LoRAs / checkpoints) → /mnt/c/aimodels - AIOUTPUTROOT (runs / generated media / exports) → /mnt/c/aioutput/anime-adventure-lab - Low-VRAM Defaults: Prefer devicemap="auto", fp16/bf16, gradient checkpointing, and LoRA over full fine-tuning. - Security & Governance: Never commit secrets; use .env. Optional NSFW/face-blur for public demos.

Architecture and folder layout follo
