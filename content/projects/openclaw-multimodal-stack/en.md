---
title: "OpenClaw Multimodal Stack"
tagline: "AMD Radeon AI PRO R9700 (32GB HBM) — ROCm / llama.cpp multimodal investigation w..."
summary: "AMD Radeon AI PRO R9700 (32GB HBM) — ROCm / llama.cpp multimodal investigation workspace."
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using ."
highlights:
  - "**Active model**: Gemma 4 31B IT Q4_K_M (`gemma31`)"
  - "**Image support**: Working via direct API and Model Control UI"
  - "**WebChat image**: Broken for multi-turn (see investigation)"
  - "**Services**: llama-server:8080, openclaw-gateway:18789, model-control-ui:18888"
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
AMD Radeon AI PRO R9700 (32GB HBM) — ROCm / llama.cpp multimodal investigation workspace.

This workspace documents the investigation and implementation plan for:

1. Fixing [chat.history omitted: message too large] in OpenClaw image analysis flows 2. Stabilizing the Gemma 4 31B VLM profile 3. Adding a Qwen-family VLM profile (Qwen3.6 or Qwen2.5-VL)

- Active model: Gemma 4 31B IT Q4KM (gemma31) - Image support: Working via direct API and Model Control UI - WebChat image: Broken for multi-turn (see investigation) - Services: llama-server:8080, openclaw-gateway:18789, model-control-ui:18888

| Document | Purpose | |----------|---------| | CURRENTSTATUS.md | Active service state and kno
