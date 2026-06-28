---
title: "OpenClaw Multimodal Stack"
tagline: "Local vision-language inference workspace wiring VLMs through llama.cpp on AMD ROCm"
summary: "A ROCm/llama.cpp multimodal workspace for the AMD Radeon AI PRO R9700 (32GB) that serves vision-language models such as Gemma 4 31B and exposes image-text inference via an OpenClaw Gateway and a Model Control UI. It focuses on diagnosing lost images in multi-turn WebChat, stabilizing VLM configs, and planning a Qwen-family VLM profile. The repo is mainly investigation docs, systemd service profiles, and Bash automation — a prototype stage."
role: "Solo developer / systems integration & technical writing"
problem: "When serving large vision-language models locally via llama.cpp, WebChat stores images as base64 in chat history, making single messages 1-2MB — well over OpenClaw's hardcoded 128KB per-message cap. From turn two onward the message is replaced with the placeholder '[chat.history omitted: message too large]', breaking multi-turn image analysis."
solution: "A read-only audit mapped four image-inference paths and the layered memory-limit hierarchy, pinpointing the hardcoded constants inside OpenClaw's compiled bundle. The proposed fix adds an /img skill that routes through the Model Control UI's /api/image-test endpoint to bypass history storage, keeping only text in history. YAML model profiles manage Gemma/Qwen switching with the mmproj projector offloaded to CPU, backed by backup and rollback scripts."
outcome: "Verified that the direct API, the Model Control UI image test, and CLI inference all work; completed root-cause analysis, a ~28-30GB VRAM budget estimate, and a cross-profile validation plan. The WebChat patch and Qwen VLM download remain pending approval, keeping the stack a fully rollback-able prototype."
highlights:
  - "Mapped all four image-inference paths plus the multi-tier memory-limit hierarchy"
  - "Located and documented config-immutable hardcoded constants (128KB / 6MB / 1.43MB) in the compiled bundle"
  - "Orchestrated llama-server, Gateway, and Model Control UI as systemd user services"
  - "YAML-profiled switching across Gemma 4 31B VLM and Qwen3.6 text/MoE models"
  - "Offloaded the mmproj vision projector to CPU via --no-mmproj-offload with a precise VRAM budget"
  - "Every change paired with backup and rollback scripts, plus a stall-watchdog toggle for long inference tests"
challenges:
  - "Image base64 payloads vastly exceed the hardcoded history cap, which cannot be changed via config"
  - "An embedded agent hits a 400 tokenize failure when oversized bootstrap files exceed the Gemma tokenizer limit"
nextSteps:
  - "Implement the /img skill and validate multi-turn WebChat image conversations"
  - "Download and verify Qwen2.5-VL-32B mmproj compatibility, then add the VLM profile"
  - "Run the cross-profile validation test matrix"
---
## Overview
The OpenClaw Multimodal Stack is a ROCm/llama.cpp investigation-and-implementation workspace built around the AMD Radeon AI PRO R9700 (32GB HBM). Its goal is to serve vision-language models (VLMs) reliably on a local GPU and make image-text inference work through the OpenClaw Gateway chat interface.

## Architecture
The system runs three systemd user services: `llama-server` (port 8080, hosting Gemma 4 31B Q4_K_M plus an mmproj projector), `openclaw-gateway` (port 18789, chat and history management), and a custom `model-control-ui` (port 18888, model switching and an /api/image-test endpoint). The LLM backbone sits on the GPU while the vision projector is offloaded to CPU via `--no-mmproj-offload`, for a total VRAM budget of roughly 28-30GB.

## Core problem and solution
The centerpiece is a `[chat.history omitted: message too large]` defect: WebChat stores images as base64 in history at 1-2MB per message, exceeding a hardcoded 128KB cap and getting replaced by a placeholder so multi-turn image analysis fails. After a read-only audit clarified the four inference paths, the proposed remedy is an `/img` skill that routes to the history-bypassing image-test endpoint.

## What it contains
The project is documentation-led: an architecture diagram, root-cause investigation, an image-pipeline fix plan, a VLM stability guide, a Qwen VLM research report, and validation/rollback plans — alongside YAML model profiles and a set of Bash automation scripts for audit, backup, testing, and rollback.

## Status
This is a prototype: the direct API, Model Control UI, and CLI inference paths are verified working, while the WebChat patch and Qwen VLM addition await approval. Every change follows a strict 'back up first, stay rollback-able, never break the working Gemma service' safety policy.
