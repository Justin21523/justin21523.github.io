---
title: "LLM Train-Eval-Ship Release Console"
tagline: "A guided LLM MLOps journey for release gates, evidence, canary rollout, and rollback"
summary: "A mock-safe guided product journey that turns the LLM train → eval → ship path into an interactive release console. Users can operate release candidates, inspect checkpoint evidence, review AutoEval scorecards, and decide whether to promote, hold, or roll back an adapter without GPUs, model weights, API keys, or external services."
role: "Solo developer (architecture, backend API, static demo, testing, capture pipeline, and deployment)"
problem: "LLM release workflows normally require GPUs, large model weights, private data, and serving infrastructure. A public demo needs to let users understand the release decision path safely, not just read a README or call a health check."
solution: "I turned a thin FastAPI skeleton into a mock-safe guided release console: demo APIs, three release scenarios, AutoEval scorecards, deployment manifests, a GitHub Pages product UI, Playwright screenshots, a WebM walkthrough, and an English README with Mermaid diagrams for flow, architecture, data movement, deployment, module organization, and the technical stack."
outcome: "Delivered a locally runnable, smoke-tested, Docker-buildable, GitHub Pages-ready LLM MLOps demo with screenshot and recording assets integrated into the main portfolio. Real LoRA/DPO training and production vLLM/TGI serving remain clearly labeled roadmap items."
highlights:
  - "The first screen shows a guided release console: queue, checkpoint lane, scorecard, user decision, and operation log"
  - "Mock-safe mode needs no GPU, model weights, API keys, or external services"
  - "FastAPI exposes /healthz plus scenario, pipeline, scorecard, and manifest APIs"
  - "Shared model-cache governance through MODEL_STORE_ROOT, HF_HOME, TRANSFORMERS_CACHE, and HF_HUB_CACHE"
  - "Playwright + FFmpeg produce cover, screenshots, and WebM demo recording"
  - "GitHub Pages workflow plus Docker/Nginx static smoke path"
challenges:
  - "Representing LLM MLOps decisions honestly without running a real model in the public demo"
  - "Turning a /healthz-only skeleton into a user-operable release journey"
nextSteps:
  - "Wire in real LoRA/PEFT or DPO job runners"
  - "Connect vLLM/TGI serving endpoints and real canary metrics"
  - "Add real eval datasets, artifact registry, and model version governance"
---
## Overview

LLM Train-Eval-Ship does not pretend to fine-tune a large model in the browser. Its purpose is to make the most important release decisions visible: whether data is ready, whether an adapter artifact is registered, whether evaluation passed, whether users should see the canary, and how rollback happens when regression appears.

## What is implemented

The FastAPI backend exposes a mock-safe API contract for health checks, demo scenarios, pipeline runs, AutoEval scorecards, and deployment manifests. The frontend is a GitHub Pages-ready guided release console with three switchable scenarios. The README is English-only and includes Mermaid flow, architecture, data flow, deployment, module organization, and tech-stack diagrams.

## How to use it

Open the interactive demo, switch between Support Copilot LoRA, Policy DPO Safety Pass, and RAG Agent Regression Gate, then follow the checkpoint lane, scorecard, user decision panel, and operation log. The video and screenshot gallery preserve the same workflow states, while the README documents local startup, tests, deployment, API contracts, and roadmap boundaries.

## Honest boundary

This version is a portfolio-ready mock-safe demo. It demonstrates pipeline contracts, release decisions, tests, capture assets, and deployment. Real model training, production vLLM/TGI serving, artifact registries, and live canary metrics remain future extension points.
