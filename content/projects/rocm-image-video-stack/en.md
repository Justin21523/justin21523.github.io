---
title: "ROCm Image & Video AI Generation Stack"
tagline: "A parallel, non-destructive image/video generation pipeline on AMD's R9700 alongside CUDA"
summary: "A ROCm-based image and video AI generation stack for the AMD Radeon AI PRO R9700 (gfx1201, 32GB HBM) that runs alongside an existing NVIDIA/CUDA setup on the same machine without disturbing it. Staged scripts provision ComfyUI ROCm, Diffusers, and LTX-2.3 video generation, share weights via symlinks, and confirm ROCm compatibility through an automated validation suite."
role: "Solo developer / ML platform & infrastructure engineer"
problem: "After swapping an RTX 5080 for an AMD R9700, the existing CUDA image-generation environment had to be preserved exactly while a new ROCm pipeline was stood up amid uncertain ROCm-ecosystem compatibility (FP8 compute, custom nodes, PyTorch versions)."
solution: "A 10-phase, approval-gated, non-destructive deployment: read-only scripts first audit the existing CUDA stack and model inventory, then isolated ROCm conda environments are created, ComfyUI ROCm is installed on a separate service port, weights are shared through a configurable local model directory to avoid re-downloads, and Python harnesses drive SDXL/FLUX/Qwen-Image/LTX-2.3 validation workflows over the ComfyUI HTTP API."
outcome: "Completed read-only audit, conda env validation, ComfyUI ROCm install, and initial LTX-2.3 workflow validation with execution logs retained; produced a full document set covering safety policy, rollback plan, and a custom-node compatibility matrix as a reproducible ROCm image/video generation prototype."
highlights:
  - "Parallel, non-destructive architecture: explicit protected paths and a forbidden-command list keep existing CUDA tools, models, and conda envs untouched"
  - "Phase-gated deployment: numbered scripts (00-13) map to 10 phases, with read-only audits requiring no approval and write phases requiring explicit sign-off"
  - "ROCm tuning for gfx1201: PYTORCH_HIP_ALLOC_CONF, AOTRITON experimental flags, and tailored ComfyUI launch flags"
  - "Multi-model validation suite: a runner queues SDXL, FLUX, Qwen-Image, Z-Image, and multiple LTX-2.3 video workflows via the ComfyUI API"
  - "Weight-sharing strategy: configurable symlink mapping avoids duplicating tens of GB of model weights"
  - "Honest risk labeling: the model manifest flags gfx1201 FP8 compute risk and documents a GGUF fallback"
challenges:
  - "Unstable FP8 compute on AMD gfx1201, requiring either BF16 dequantization on load via ComfyUI-LTXVideo or a GGUF fallback"
  - "Version compatibility and upgrade timing across ROCm 7.2 and PyTorch 2.5.1+rocm6.2 / 2.11+rocm7.2"
  - "Guaranteeing full isolation between ROCm and CUDA workflows on a dual-GPU WSL2 host"
nextSteps:
  - "Upgrade PyTorch to rocm7.2 and complete hands-on ComfyUI ROCm custom-node compatibility testing"
  - "Finish LTX-2.3 image-to-video and IC-LoRA/control workflows and add the Wan video pipeline"
  - "Run the full 10-test validation and benchmark suite to produce an R9700 video-generation performance report"
---
## Overview

This is a ROCm-based image and video AI generation stack built for the **AMD Radeon AI PRO R9700** (gfx1201, RDNA4, 32GB HBM). Its central goal is to **run in parallel with an existing NVIDIA/CUDA generation environment on the same machine** — standing up an independent, reproducible AMD GPU pipeline without modifying, deleting, or overwriting any existing CUDA tools, conda environments, models, or workflows.

## Architecture & Approach

The stack uses a **10-phase, approval-gated** deployment model implemented as numbered Bash scripts (00-13). Phase 0 performs read-only audits (inventorying the existing CUDA stack and models); subsequent phases handle workspace prep, validation of the `rocm-*-r9700` conda envs, ComfyUI ROCm install (port 8189, coexisting with CUDA ComfyUI on 8188), model symlinks, safe custom nodes, and LTX-2.3 video workflows. Every write phase requires explicit approval, and each write script checks whether a protected CUDA environment is active and aborts if so.

## Tech Stack

The foundation is **ROCm 7.2 + PyTorch (rocm6.2, with a planned upgrade to rocm7.2)**. Generation front-ends are **ComfyUI** and **HuggingFace Diffusers**, with **Lightricks LTX-2.3** (FP8 and GGUF variants) for video. Validation is done with pure-Python scripts that queue generations over ComfyUI's HTTP API, covering SDXL, FLUX, Qwen-Image, and Z-Image image workflows plus multiple LTX-2.3 text-to-video and image-to-video workflows; video post-processing tooling includes FFmpeg, OpenCV, moviepy, and PyAV.

## Engineering Trade-offs & Honesty

The project **honestly documents known risks**: FP8 compute on gfx1201 is flagged as high-risk, with BF16-dequantization and GGUF fallback paths, and the repo ships a safety policy, rollback plan, and custom-node compatibility matrix. It is currently an early-stage prototype — read-only audit, env validation, ComfyUI ROCm install, and initial LTX-2.3 workflow validation are complete with logs retained, while the full 10-test validation and performance benchmarks remain outstanding.
