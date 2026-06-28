---
title: "Video Family LoRA Hub"
tagline: "A multi-model video generation and LoRA training lab on a single 16GB GPU"
summary: "A unified Python CLI that wires Diffusers and ComfyUI together to run text-to-video, image-to-video, and character LoRA finetuning across the LTX-2, Wan, CogVideoX, SVD, and AnimateDiff SDXL model families on one 16GB GPU, with YAML presets and manifest batch pipelines for reproducible output."
role: "Solo developer: system architecture, CLI and training-backend design, VRAM optimization, workflow integration"
problem: "Video diffusion models proliferate, but each family (LTX, Wan, CogVideoX, SVD, AnimateDiff) ships its own inference and LoRA-training interface, dependencies, and VRAM profile. Doing both generation and character-identity LoRA training on a single 16GB consumer GPU lacks a unified, reproducible workflow."
solution: "A family-keyed registry architecture: a unified Typer CLI exposes run t2v/i2v/v2v, list, comfy, and pipeline subcommands; adapters and runners encapsulate per-model inference, while trainers bridge to external trainers (finetrainers / musubi / simpletuner) via subprocess backends. Everything is driven by Pydantic-validated YAML presets (rank, quantization, gradient checkpointing, int8/bf16 for 16GB), with ComfyUI workflow templates and API helpers, manifest-driven batch pipelines, render-farm sharding, and outputs carrying metadata and environment snapshots for reproducibility."
outcome: "The prototype runs multi-family inference and identity-LoRA training end to end on an RTX 5080 16GB, backed by 70+ YAML configs and 50+ technical docs, with a dummy backend for dry-run pipeline validation. It is a personal research prototype; some paths (native v2v, true generative v2v) are still tracked separately."
highlights:
  - "Family registry unifies inference and training entry points across LTX-2, Wan, CogVideoX, SVD, and AnimateDiff SDXL"
  - "Typer CLI with t2v/i2v/v2v runs, ComfyUI export, and manifest-driven batch pipeline subcommands"
  - "YAML + Pydantic config with built-in 16GB VRAM optimization (int8-quanto, bf16, gradient checkpointing, adamw8bit)"
  - "Trainers bridge to finetrainers / musubi / simpletuner via subprocess backends, with batch training of multiple character identity LoRAs"
  - "ComfyUI workflow templates and API helpers connecting the AnimateDiff SDXL and Wan i2v paths"
  - "Outputs ship with metadata, environment, and config snapshots, plus a dummy backend for dry-run validation"
challenges:
  - "Training LoRAs for large video backbones (e.g. LTX 2.3 22B) on a single 16GB GPU pushes hardware limits and requires heavy quantization and memory optimization"
  - "Model families differ sharply in interfaces and dependencies, absorbed through subprocess backends and an adapter layer"
nextSteps:
  - "Add production-grade native Diffusers adapters for LTX-2 / Wan to reduce reliance on ComfyUI subprocesses"
  - "Add output evaluation (CLIP, motion, aesthetic scoring) and training experiment tracking"
  - "Expose orchestration endpoints (Gradio or FastAPI) on top of the same core package"
---
## Overview

Video Family LoRA Hub (Video Generation Lab) is a reproducible toolchain for short-form video generation research on a single 16GB GPU. It collapses a fragmented video-diffusion ecosystem (LTX-2, Wan 2.1/2.2, CogVideoX, Stable Video Diffusion, AnimateDiff SDXL) into one Python package and CLI, so inference and character-identity LoRA finetuning share the same configs, flows, and output contract.

## Architecture

The core is a family-keyed registry: `adapters` and `runners` encapsulate each model's inference details, while `trainers` bridge to external trainers (finetrainers, musubi-tuner, simpletuner) through subprocess backends. A single Typer CLI exposes `run` (t2v/i2v/v2v), `list`, `comfy`, and `pipeline` subcommands, and all behavior is driven by Pydantic-validated YAML — the repo already holds 70+ generation and training presets.

## 16GB VRAM optimization

The central constraint is doing both generation and training on a consumer RTX 5080 16GB. Presets lean heavily on int8-quanto quantization, bf16 mixed precision, gradient checkpointing, the adamw8bit optimizer, and batch size 1, with accelerate / DeepSpeed ZeRO-offload configs for large backbones. The technical docs assess the feasibility of different trainers under 16GB in detail.

## Workflow and reproducibility

Beyond the Diffusers path, the project integrates ComfyUI via workflow templates, an exporter, and API helpers, folding the AnimateDiff SDXL and Wan i2v paths into the same flow. Manifest-driven batch pipelines support multiple characters, multi-shot runs, and render-farm sharding; every output carries metadata, environment, and config snapshots, and a dummy backend lets pipelines be dry-run validated.

## Status

This is a personal research prototype. The repository retains many experimental scripts, logs, and planning documents; some paths (native v2v and true generative v2v) are still tracked separately, and the roadmap lists evaluation metrics, experiment tracking, and FastAPI/Gradio orchestration as open work.
