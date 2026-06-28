---
title: "LLM Train-Eval-Ship Control Plane"
tagline: "A testable, recordable, mock-safe LLM MLOps portfolio demo"
summary: "A portfolio demo that turns the LLM train → eval → ship path into an interactive control plane: dataset readiness, fine-tuning, automated evaluation, canary deployment, rollback decisions, and shared model-cache governance. It runs without a GPU, model weights, API keys, or external services by using deterministic mock-safe flows."
role: "Solo developer (architecture, backend API, static demo, testing, capture pipeline, and deployment)"
problem: "LLM projects are hard to showcase publicly. Real fine-tuning needs GPUs, large weights, private data, and serving infrastructure, while a README plus a health check is not enough for an interviewer to understand the engineering value."
solution: "I turned a thin FastAPI skeleton into a mock-safe portfolio demo: demo APIs, three pipeline scenarios, AutoEval scorecards, deployment manifests, a GitHub Pages control plane, Playwright screenshots, a WebM walkthrough, and a Mermaid-rich README covering flow, architecture, data movement, deployment, module organization, and the technical stack."
outcome: "Delivered a locally runnable, smoke-tested, Docker-buildable, GitHub Pages-ready LLM MLOps demo with screenshot and recording assets integrated into the main portfolio. Real LoRA/DPO training and production vLLM/TGI serving remain clearly labeled roadmap items."
highlights:
  - "The first screen shows the actual product: scenario selector, pipeline timeline, scorecard, and canary/rollback decision"
  - "Mock-safe mode needs no GPU, model weights, API keys, or external services"
  - "FastAPI exposes /healthz plus scenario, pipeline, scorecard, and manifest APIs"
  - "Shared model-cache governance through MODEL_STORE_ROOT, HF_HOME, TRANSFORMERS_CACHE, and HF_HUB_CACHE"
  - "Playwright + FFmpeg produce cover, screenshots, and WebM demo recording"
  - "GitHub Pages workflow plus Docker/Nginx static smoke path"
challenges:
  - "Representing LLM MLOps decisions honestly without running a real model in the public demo"
  - "Turning a /healthz-only skeleton into a portfolio entry that interviewers can understand quickly"
nextSteps:
  - "Wire in real LoRA/PEFT or DPO job runners"
  - "Connect vLLM/TGI serving endpoints and real canary metrics"
  - "Add real eval datasets, artifact registry, and model version governance"
---
## Overview

LLM Train-Eval-Ship does not pretend to fine-tune a large model in the browser. Its purpose is to make the most important engineering path visible: whether data is ready, whether a fine-tuning job completed, whether evaluation passed, whether the model should enter canary deployment, and how rollback happens when regression appears.

## What is implemented

The FastAPI backend exposes a mock-safe API contract for health checks, demo scenarios, pipeline runs, AutoEval scorecards, and deployment manifests. The frontend is a GitHub Pages-ready static control plane with three switchable scenarios. The README includes Mermaid flow, architecture, data flow, deployment, module organization, and tech-stack diagrams.

## How to review it

Open the interactive demo, switch between Support Copilot LoRA, Policy DPO Safety Pass, and RAG Agent Regression Gate, then review the video and screenshot gallery on this portfolio page. The README documents local startup, tests, deployment, API contracts, and roadmap boundaries.

## Honest boundary

This version is a portfolio-ready mock-safe demo. It demonstrates pipeline contracts, release decisions, tests, capture assets, and deployment. Real model training, production vLLM/TGI serving, artifact registries, and live canary metrics remain future extension points.
