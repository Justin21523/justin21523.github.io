---
title: "Animation AI Studio: A Local-First Modular AI Animation Pipeline"
tagline: "Wiring storyboards, imagery, voice, and generative models into one repeatable short-film pipeline"
summary: "A local-first, modular AI animation pipeline focused on short-form, shot-based production workflows. The project introduces a typed studio/ package modeling projects, characters, and shots, with a CLI that orchestrates video generation, voice synthesis, and export subsystems. It is currently at an architecture-and-workflow prototype stage."
role: "Solo developer (architecture and full-stack implementation)"
problem: "Personal AI short-film creation involves stitching together many disconnected tools: image generation, video generation, voice cloning, subtitling, and post-production. These tools share no common data model or orchestration layer, making manual chaining error-prone and hard to reproduce for the same project. Converging these heterogeneous subsystems into one clear, traceable production pipeline is the core problem this project tackles."
solution: "The project uses a conservative refactor: a new studio/ package provides the project-facing architecture, with Pydantic-typed models for projects, characters, shots, video, audio, and QC, and a standardized workspace under data/projects/<slug>/. A CLI (python -m studio.cli.main) orchestrates creating projects, registering characters, defining shots, preparing render tasks, and executing audio/video task manifests. The video layer is designed around LTX-2.3 and Wan-family providers split into API, ComfyUI, and local routes, currently emitting normalized task manifests only. Existing scripts/ subsystems (image generation, TTS, analysis, editing) are intentionally left in place and wrapped by the new orchestration layer rather than rewritten, alongside a vLLM + FastAPI LLM gateway and a Vanilla JS + FastAPI Web UI for inference and batch-job monitoring."
outcome: "Currently a prototype: project workspace creation, character/shot registries, task-manifest preparation, FFmpeg-based export and subtitle generation, and voice-dataset export are working, while Wan-family inference, automatic I2V continuation, audio synthesis/alignment, and QC scoring remain scaffolded and not yet fully implemented. It is honestly framed as an exploratory, in-progress learning project."
highlights:
  - "Pydantic-typed data models for projects, characters, and shots"
  - "Standardized data/projects workspace with character, shot, and LoRA registries"
  - "Project-facing CLI orchestrating creation, render prep, and task execution"
  - "Multi-provider video architecture for LTX-2.3 and Wan2.2 (API / ComfyUI / local)"
  - "Dialogue-driven TTS and source-video speaker segmentation analysis"
  - "Per-character voice-clone and RVC / singing-conversion dataset export"
challenges:
  - "Refactoring conservatively by wrapping existing scripts/ subsystems without breaking them"
  - "Designing a unified provider interface and normalized task manifests across heterogeneous backends (LTX-2.3 / Wan / ComfyUI)"
  - "Planning an LLM gateway and model switching under the constraint that a 16GB RTX 5080 can load only one model at a time"
nextSteps:
  - "Complete actual execution of Wan-family inference and automatic I2V continuation"
  - "Implement audio synthesis/alignment and the FFmpeg-based composition/export pipeline"
  - "Build out continuity scoring and QC execution, and finish the end-to-end Web UI flow"
---
## Background

Animation AI Studio is a local-first, modular AI animation pipeline aimed at systematizing short-form, shot-based creative workflows. AI short-film creation typically requires gluing together many tools: image generation, video generation, voice cloning, subtitling, and post-production, each with its own input/output formats and no shared data model or orchestration. This project attempts to converge those heterogeneous subsystems into one clear, repeatable pipeline.

## Architecture

The project follows a conservative refactor strategy split into two layers. The new `studio/` package is the project-facing core, containing `core` (shared result models, paths, storage), `story` (project and shot schemas), `assets` (character and LoRA registries), `video`/`audio` (task models and provider interfaces), `editing`, `evaluation`, `pipelines`, and `cli`. The existing `scripts/` subsystems (generation, synthesis, analysis, editing, orchestration, training) are intentionally retained and wrapped by the new orchestration layer rather than replaced outright, keeping refactor risk manageable.

All domain objects are defined as Pydantic-typed models (e.g., `ShotSpec`, `ShotCharacterBinding`), and project data lands in standardized `data/projects/<slug>/` workspaces containing project.yaml, characters, shots, assets/loras, audio, renders, and exports.

## Technical Detail

The video layer is reoriented around LTX-2.3 and the Wan family, split into `ltx23_api`, `ltx23_comfy`, and `ltx23_local` routes, all emitting normalized task manifests as a unified output; the ComfyUI route injects parameters via workflow templates with placeholders such as `__PROMPT__` and `__IMAGE_URI__`. The audio subsystem spans Whisper speaker segmentation, dialogue-driven TTS, per-character voice-dataset export, and a roadmap toward RVC, Seed-VC, Demucs, and DiffSinger/OpenUtau singing conversion. There is also a vLLM + FastAPI LLM gateway optimized for an RTX 5080 16GB (loading a single model at a time) and a Vanilla JS + FastAPI + SSE Web UI to submit and monitor batch jobs. The stack spans PyTorch 2.7 / CUDA 12.8, Diffusers, Transformers, ControlNet, InsightFace, FAISS/ChromaDB, and moviepy/OpenCV/FFmpeg.

## What I Learned

The biggest takeaway is "define the data models and interfaces clearly before implementing": typed schemas and provider interfaces abstract heterogeneous tools so the orchestration layer can evolve incrementally without rewriting legacy code. It is also an honest learning prototype, the README explicitly separates "implemented" from "scaffolded only" to avoid overstating unfinished capabilities, and that honest marking of engineering boundaries is itself a valuable practice.
