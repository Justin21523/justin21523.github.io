---
title: "LLM Train-Eval-Ship Pipeline"
tagline: "One-click scaffold to fine-tune, evaluate, and ship LLMs"
summary: "An early-stage LLM engineering pipeline built around a train-eval-ship flow: dataset upload, fine-tuning, auto-evaluation, then deployment via vLLM or TGI, with shared model caches to avoid re-downloads. Currently a FastAPI service skeleton with cache-path inspection and containerized delivery is implemented; advanced training and serving features are on the roadmap."
role: "Solo developer (architecture and engineering)"
problem: "Taking an LLM from fine-tuning through evaluation to production spans many tools and huge weight files; the workflow is fragmented, re-downloads are costly, and end-to-end runs with safe rollback are hard to achieve."
solution: "Designed a three-stage train-eval-ship pipeline blueprint: a FastAPI entry point with health checks, shared caching via HF_HOME / TRANSFORMERS_CACHE / HF_HUB_CACHE, planned dual deploy engines (vLLM and TGI), extensible hooks for LoRA/PEFT and DPO fine-tuning, a RAG tool whitelist, and canary/rollback — all packaged with Docker + Nginx for the demo landing page."
outcome: "Delivered a runnable FastAPI skeleton (/healthz plus startup cache-path printing), containerized deployment config, and a portfolio landing page; the full end-to-end training and serving pipeline remains on the roadmap and is honestly labeled a prototype."
highlights:
  - "Unified shared model-cache management via environment variables to avoid re-downloading large weights"
  - "FastAPI skeleton with /healthz health check and startup cache-path logging"
  - "Planned vLLM / TGI dual-engine deployment (OpenAI / HF-compatible)"
  - "Reserved extension points for LoRA/PEFT, DPO, RAG, and human-in-the-loop feedback"
  - "Docker (nginx:alpine) + Nginx containerized landing page with back-to-portfolio nav injection"
  - "DEPLOYMENT.md documents the docker-compose rollout and update workflow"
challenges:
  - "Designing a single one-click, rollback-capable pipeline across fragmented training/eval/serving tools"
  - "Shared caching and storage-path governance for large model weights"
nextSteps:
  - "Implement real fine-tuning (LoRA/PEFT, DPO) and an auto-eval dashboard"
  - "Wire up vLLM / TGI deploy engines with canary traffic shift and safe rollback"
  - "Populate requirements.txt dependencies and an interactive end-to-end demo"
---
## Overview
**LLM Train-Eval-Ship** is an LLM-MLOps pipeline prototype that aims to chain "dataset upload → fine-tune → auto-eval → deploy" into a one-click flow, using shared model caches to cut redundant downloads. It is positioned as an extensible engineering scaffold: the README outlines the full vision, with several advanced capabilities marked as roadmap.

## What's implemented
The current code centers on a **FastAPI** service skeleton: it exposes a `/healthz` health-check endpoint and, on startup, calls `print_cache_paths()` to log shared cache locations (`MODEL_STORE_ROOT`, `HF_HOME`, `TRANSFORMERS_CACHE`, `HF_HUB_CACHE`), making model-storage governance easy to verify. The service runs under **Uvicorn** on port 8080.

## Deployment & demo
The project ships **Docker** (`nginx:1.27-alpine`) and **Nginx** config that containerize and serve the portfolio landing page, injecting a "back to portfolio" link via `sub_filter` and guarding static assets with explicit 404 handling. `DEPLOYMENT.md` details the docker-compose rollout and update workflow.

## Roadmap (not yet built)
Capabilities described in the README but currently blueprint/hooks include: dual deploy engines **vLLM** and **TGI** (OpenAI / HF-compatible), **LoRA/PEFT** and **DPO** fine-tuning, a **RAG** tool whitelist, AutoEval dashboards, and canary deployment with safe rollback. `requirements.txt` is currently empty and the interactive end-to-end demo is still in progress.

## Honest labeling
This project is a prototype: the service skeleton, cache governance, and containerized deployment work, but the actual training, evaluation, and model-serving pipeline is not yet realized. It contains no keys, `.env` files, or passwords.
