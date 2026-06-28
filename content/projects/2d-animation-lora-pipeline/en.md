---
title: "2D Animation Character LoRA Training Pipeline"
tagline: "End-to-end pipeline turning 2D cartoon video into character LoRA adapters"
summary: "An end-to-end LoRA training pipeline for Western 2D cartoon-style footage. It spans frame extraction, YOLO multi-object tracking, ToonOut character segmentation, face-based identity clustering, DWpose, VLM captioning, and LoRA/ControlNet training — wired together by a staged orchestrator with hierarchical OmegaConf config, checkpoint/resume, and a weight-free stub mode for fast validation."
role: "Solo developer: pipeline architecture, per-stage modules, config system, and training experiments (personal AI research project)"
problem: "Building high-quality character LoRA datasets from 2D animation is tedious: multiple characters in one frame must be separated, the same character across cuts must be merged, hard-edge line art and per-episode style drift make 3D pipeline defaults unsuitable, and the whole flow lacks reproducible, resumable automation."
solution: "A staged orchestrator (frame → multi-character extraction → pose → dataset → training): YOLO+ByteTrack for detection/tracking, per-track ToonOut segmentation, and HDBSCAN clustering over face embeddings to merge the same identity. OmegaConf provides hierarchical config with automatic 2D/3D parameter conversion (alpha/blur thresholds, cluster sizes). Training integrates kohya-ss and Diffusers to train SD/SDXL LoRA and ControlNet, with GPT-4V captioning. Every module supports stub mode and dry-run for GPU-free smoke testing."
outcome: "A working multi-stage pipeline prototype that has trained several anonymized character LoRAs with CLIP-verified clean datasets and kohya .toml configs, backed by checkpoint/resume, resource monitoring, batch prompt-test suites, and monitoring scripts."
highlights:
  - "Staged orchestrator with dependency management, checkpoint/resume, and progress tracking"
  - "Three-step multi-character handling: YOLO+ByteTrack tracking, per-track ToonOut segmentation, HDBSCAN face-identity clustering"
  - "Hierarchical OmegaConf config with automatic 2D/3D parameter conversion (edge thresholds, cluster sizes, dataset volume)"
  - "kohya-ss / Diffusers integration to train SD/SDXL LoRA and ControlNet-Pose (DWpose conditioning)"
  - "Stub mode + dry-run across all modules for fast smoke tests without model weights"
  - "Full surrounding toolkit: RealESRGAN/GFPGAN enhancement, RIFE interpolation, LaMa/PowerPaint inpainting, GPT-4V captioning"
challenges:
  - "Separating multiple characters per frame while merging the same identity across cuts via tracking plus face-embedding clustering"
  - "Recalibrating 3D-derived defaults for 2D hard-edge line art and per-episode style variation, solved with a parameter-conversion layer"
nextSteps:
  - "Consolidate scattered training scripts and configs into a single CLI workflow with full end-to-end integration tests"
  - "Validate identity clustering and data-quality filtering generalization across more characters and shows"
---
## Overview

**2D Animation LoRA Pipeline** is an end-to-end character LoRA training data pipeline built for Western 2D cartoon-style footage. It turns "video → frames → multi-character extraction → pose → dataset → LoRA training" into a reproducible, resumable automated flow, reusing mature 3D-pipeline infrastructure retuned for 2D characteristics.

## Architecture & Stack

The core is a staged orchestrator plus stage-dependency manager, using OmegaConf for hierarchical config with automatic 2D/3D parameter conversion. Vision processing chains Ultralytics YOLO + ByteTrack multi-object tracking, per-track ToonOut (ONNX) segmentation, InsightFace embeddings + HDBSCAN identity clustering, and DWpose extraction. Training integrates kohya-ss with Diffusers/PEFT to train Stable Diffusion / SDXL character LoRAs and ControlNet-Pose, with optimizers like bitsandbytes/Prodigy and TensorBoard/W&B monitoring.

## Engineering Features

Every module supports **stub mode** and dry-run, letting developers smoke-test the whole pipeline with no model weights and no GPU. It also provides a unified MetadataIO (parquet-first), resource monitoring, and checkpoint/resume. Surrounding tooling includes RealESRGAN/GFPGAN enhancement, RIFE interpolation, LaMa/PowerPaint background inpainting, and GPT-4V auto-captioning.

## Results & Status

The project has trained several anonymized character LoRAs, shipping complete kohya .toml configs, prompt-test suites, and training-monitoring scripts. It remains an evolving personal research prototype: many stages are stub-driven and training scripts are still scattered, with consolidation into a single CLI workflow and fuller end-to-end tests as next steps.

> Note: the captioning module reads an OpenAI key from an environment variable; no keys or secrets are included here.
