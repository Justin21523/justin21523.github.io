---
title: "Video Family LoRA Hub"
tagline: "A multi-model video generation and identity LoRA workflow hub for a single 16GB GPU"
summary: "A portfolio-ready Python CLI and demo app that unifies SVD, LTX-2, Wan, CogVideoX, and AnimateDiff SDXL through YAML manifests, ComfyUI workflow templates, adapters, mock-safe demo flows, screenshots, and a WebM walkthrough."
role: "Solo developer: system architecture, CLI and adapter design, ComfyUI workflow integration, mock-safe demo, README diagrams, and GitHub Pages deployment"
problem: "Video generation and LoRA training workflows are fragmented across model families, weight formats, ComfyUI nodes, and trainer projects. Running t2v, i2v, v2v, and identity LoRA workflows on one 16GB GPU needs a unified, reproducible operator surface that can also be shown publicly without private models."
solution: "The project uses a Typer CLI and Pydantic-validated YAML model catalog to coordinate a family registry, generation adapters, manifest runner, ComfyUI API templates, and trainer subprocess bridges. The public demo runs through deterministic dummy flows, so it is safe without GPU access, model weights, API keys, or external services."
outcome: "The project is now portfolio-ready: the GitHub Pages demo opens directly on the product console, includes demo scenarios, pipeline state, artifact browser, screenshots, and a WebM walkthrough; locally it passes pytest, ruff, mypy, package build, demo smoke, and demo app build checks."
highlights:
  - "The first viewport is the actual product console, not a marketing-only page"
  - "Mock-safe demo mode works without GPU, model weights, ComfyUI, or external APIs"
  - "Typer CLI unifies t2v / i2v / v2v / pipeline runs with metadata and config snapshots"
  - "YAML + Pydantic model registry covers SVD, LTX-2, Wan, CogVideoX, and AnimateDiff SDXL"
  - "ComfyUI API workflow metadata is aligned with GUI exports for template validation"
  - "README includes Mermaid architecture, data flow, deployment, module organization, and demo flow diagrams"
challenges:
  - "Full generation and LoRA training require large weights, GPU access, and ComfyUI custom nodes, so the public demo needs safe fallback behavior"
  - "The original research repository included many experiment scripts, logs, outputs, local data, and model symlinks, requiring strict commit scoping"
nextSteps:
  - "Add a real GPU output gallery and evaluation dashboard"
  - "Wrap the CLI core with a FastAPI or Gradio operator UI"
  - "Add LoRA training experiment tracking and a formal artifact registry"
---
## Overview

Video Family LoRA Hub is an AI video generation toolkit prepared as a portfolio demo. It keeps the real engineering structure: CLI, manifests, adapters, ComfyUI templates, trainer bridges, and reproducible artifacts, while adding a public mock-safe demo that an interviewer can inspect without a GPU or private model files.

## Demo Focus

The first screen is a run composer and pipeline state board. Reviewers can switch between a family-film teaser, reference portrait i2v, continuity polish v2v, and identity LoRA training batch. Screenshots and the WebM walkthrough show manifest orchestration, artifact browsing, and architecture layers, while the README provides Mermaid diagrams and runnable validation commands.

## Architecture

The core package is `video_generation_lab`: `cli.py` exposes the Typer interface, `pipeline.py` resolves YAML manifests, job chaining, and sharding, `adapters/` isolate model-family execution, `comfyui/api.py` handles workflow parameter binding and artifact download, and `outputs.py` standardizes metadata, config snapshots, previews, and run logs.

## Verifiability

The public demo uses deterministic assets. Locally, `python scripts/run_demo_smoke.py` runs a complete mock-safe pipeline, and the project is validated with `pytest`, `ruff`, `mypy`, and `python -m build`. The result is not just a static portfolio page, but a rebuildable, testable, deployable showcase project.
