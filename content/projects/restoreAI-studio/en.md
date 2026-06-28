---
title: "RestorAI Studio — AI Image Restoration Portfolio Workbench"
tagline: "A public, mock-safe AI restoration demo with before/after viewing, pipeline status, and reproducible media"
summary: "RestorAI Studio is an AI image restoration and super-resolution platform prototype reshaped into an interview-ready portfolio demo. The public demo uses browser Canvas to simulate the inference workflow without GPU, model weights, or external services; the local smoke path exposes a FastAPI + Pillow API to validate upload, processing, and PNG response behavior."
role: "Solo developer (portfolio demo design, frontend demo, FastAPI demo API, CI/CD, documentation, and portfolio integration)"
problem: "The original project had a useful AI restoration service architecture, but true model inference depends on large weights, GPU availability, and version-sensitive packages, making it hard for interviewers to launch, inspect, screenshot, or evaluate quickly."
solution: "Split the project into two presentation-safe paths: a pure static GitHub Pages demo whose first screen is the restoration workbench, and a local FastAPI/Pillow smoke API for upload and processing verification. The README now documents the system with Mermaid product flow, architecture, data flow, deployment, and module diagrams."
outcome: "Delivered a public interactive demo, cover image, desktop/mobile screenshots, and a WebM demo recording. GitHub Actions verifies compile, pytest, API smoke, and static build before GitHub Pages deployment. The real model path is honestly labeled as a prototype scaffold instead of being presented as production-ready inference."
highlights:
  - "Product-first first screen: before/after viewer, scenario selector, scale, restore strength, pipeline status, and job payload"
  - "Mock-safe public demo requiring no GPU, model download, backend, or external service"
  - "FastAPI demo API validates upload, Pillow resize/sharpen, PNG response headers, and smoke tests"
  - "README includes Mermaid product, architecture, data flow, deployment, stack, and module diagrams"
  - "Playwright-generated cover, screenshots, and WebM demo tour keep media reproducible"
  - "GitHub Pages workflow runs compile, pytest, smoke, and static build before deployment"
challenges:
  - "Creating a convincing AI product workflow without relying on brittle GPU/model infrastructure"
  - "Turning scattered FastAPI, Gradio, CLI, PyQt, and model scaffolding into an explainable architecture"
  - "Being explicit about prototype boundaries while still making the project easy to evaluate"
nextSteps:
  - "Complete Real-ESRGAN/GFPGAN/RIFE lifecycle and CPU/GPU fallback"
  - "Consolidate prototype API routers into one production contract"
  - "Add true-model integration tests, model weight health checks, and artifact persistence"
---
## Overview

RestorAI Studio demonstrates how to turn an AI model prototype into an evaluable product demo. The public demo does not assume the interviewer has a GPU or model weights. It presents a browser-based image restoration workbench where users can load samples, tune scale/strength, run a pipeline, compare before/after output, and inspect a job payload.

## Architecture

The repository keeps the broader AI service scaffold: FastAPI routers, job manager, metrics/history/export/admin routes, Gradio/CLI/PyQt entries, AI Warehouse model paths, and Real-ESRGAN/GFPGAN/RIFE adapter design. The stable presentation path is delivered through `portfolio-web/` and the `webapp/main.py` demo API.

## Portfolio Value

The value is not just the model list. The project shows practical engineering judgment: isolate GPU/model-weight risk, provide a reproducible mock-safe demo, add CI, generate portfolio media, and document the production path clearly enough for interviewers to understand product scope and next steps.
