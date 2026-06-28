---
title: "3D Animation Character LoRA Pipeline"
tagline: "End-to-end data pipeline turning 3D animation footage into trainable character LoRAs"
summary: "A LoRA training toolkit purpose-built for Pixar-style and other 3D CGI characters. It chains video frame extraction, multi-layer segmentation, CLIP-based character clustering, BLIP2 auto-captioning, and SDXL/Kohya LoRA plus ControlNet/AnimateDiff training, coordinated by an orchestrator with resource monitoring and checkpoint resume, with ComfyUI for visual testing and evaluation."
role: "Solo developer: pipeline architecture, per-stage tooling and training configs, evaluation workflow, and documentation"
problem: "3D animated characters differ sharply from 2D anime in shading, lighting, materials, and consistency, so existing 2D pipelines do not transfer directly. Going from raw footage to a high-quality training dataset demands heavy manual cleaning, clustering, and captioning that is slow and hard to reproduce."
solution: "A modular, config-driven end-to-end pipeline: scene-detected frame extraction with RIFE interpolation, depth-aware multi-layer segmentation (U²-Net/SAM/ISNet) with LaMa background inpainting, CLIP + HDBSCAN character clustering, BLIP2 auto-captioning, then SDXL LoRA, ControlNet pose, and AnimateDiff training via Kohya/Diffusers. An orchestrator handles stage management, resource monitoring, and checkpoint resume, while pose-data prep runs on multi-threaded CPU in parallel with GPU training."
outcome: "Delivered a working v1.0.0 pipeline that automatically produces clean character datasets from full 3D films and trains multiple character LoRAs, with LPIPS/FID metrics and ComfyUI workflows for quality comparison. It is a personal research prototype, not productized."
highlights:
  - "Config-driven (YAML/TOML) multi-stage orchestrator with resource monitoring and checkpoint resume"
  - "Segmentation and clustering parameters tuned for 3D content (lower alpha/blur thresholds, smaller clusters)"
  - "Automatic character grouping via CLIP + HDBSCAN + UMAP with interactive human review"
  - "BLIP2 auto-captioning with a trigger-token / identity-tag strategy for identity LoRAs"
  - "CPU multi-threaded pose-data prep (60+ FPS on 32 threads) running parallel to GPU training"
  - "ComfyUI integration for LoRA comparison, ControlNet pose control, and video generation tests"
challenges:
  - "Smooth 3D shading and realistic lighting required re-tuning segmentation and matting thresholds"
  - "Balancing SDXL/ControlNet training against multi-stage preprocessing under limited VRAM"
  - "Identity LoRA captioning had to explicitly teach attributes like age/gender to avoid feature drift"
nextSteps:
  - "Converge the separate 2D and 3D pipelines behind a single unified interface"
  - "Strengthen automated quality evaluation and regression testing for reproducibility"
  - "Improve cross-character consistency (InstantID/IPAdapter) and video generation workflows"
---
## Overview
This is a LoRA training pipeline built specifically for **3D animated characters** (Pixar-style and other CGI). Its goal is to turn an entire animated film into a clean, trainable character dataset and produce high-quality LoRA models. Unlike typical 2D anime pipelines, it is optimized for smooth shading, realistic lighting, material properties (SSS, specular), and consistent 3D character models.

## Architecture
The pipeline is modular and config-driven, with an orchestrator chaining seven stages: frame extraction, instance segmentation, character clustering, caption generation, dataset preparation, LoRA training, and evaluation. The orchestrator integrates resource monitoring and stage management with progress tracking and checkpoint/resume. Preprocessing uses scene-detected extraction with RIFE interpolation, multi-layer depth-aware segmentation (U²-Net/SAM/ISNet), and LaMa background inpainting; clustering combines CLIP embeddings, HDBSCAN, and UMAP with an interactive review step.

## Training and evaluation
Training integrates Kohya_ss/sd-scripts and Diffusers, supporting SDXL LoRA, ControlNet pose, and AnimateDiff, with optional optimizers such as bitsandbytes 8-bit Adam, Lion, and Prodigy. Pose-data preparation runs MediaPipe/DWPose on multi-threaded CPU in parallel with GPU training. Evaluation provides LoRA checkpoint testing, model comparison, and LPIPS/FID quality metrics, plus ComfyUI workflows for visual comparison and video generation testing.

## Positioning
The project is a working personal-research prototype (v1.0.0) that has produced multiple character LoRAs. Its emphasis is on a reproducible, extensible data-engineering workflow for 3D characters rather than a deployed product.
