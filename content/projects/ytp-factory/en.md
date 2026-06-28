---
title: "YTP Factory — AI-Driven Video Automation Factory"
tagline: "Turns ordinary source videos into YouTube Poop remixes via multi-agent AI, RAG, and multimodal generation"
summary: "YTP Factory is an end-to-end AI pipeline that automatically segments, transcribes, LLM-rewrites, re-voices (TTS), and applies audio/visual effects to source footage, composing YouTube Poop-style outputs. It integrates six collaborating agents, FAISS vector retrieval, several ML models, and diffusion-based generation, with GPU memory scheduling, checkpoint/resume, and batch processing — used to mass-produce 76 videos."
role: "Solo developer — full-stack design and implementation (architecture, pipeline, AI integration, infrastructure)"
problem: "Hand-crafting YTP videos is extremely tedious: repeated slicing, line rewriting, re-voicing, effect application, and audio/video alignment. Existing tools lack intelligent decision-making — they can't judge what's funny or pick the right effect or SFX automatically."
solution: "A six-stage, checkpoint-resumable pipeline with an AI layer on top: faster-whisper transcription, multi-provider LLM (local/OpenAI/LLMVendor) script rewriting, XTTS/OpenAI TTS re-voicing, and probabilistic effect composition via moviepy/FFmpeg. An Orchestrator-led multi-agent system coordinates the work, a FAISS RAG retrieves context from past successes, and an XGBoost funniness detector plus multi-task quality scorer close the feedback loop — with SDXL/ControlNet/AnimateDiff generating supplemental assets when needed."
outcome: "Delivered a v2.0 system spanning phases P0–P8: ~35K lines of Python across src with 32 test files, plus a FastAPI service, Docker, and systemd deployment. A memory-monitored, auto-retrying batch pipeline successfully drove automated production of 76 videos."
highlights:
  - "Six-agent coordination architecture (Orchestrator/Segment/Script/Audio/Visual/Quality) with Chain-of-Thought reasoning and an inter-agent communication protocol"
  - "Multi-provider LLM routing with fuzzy-matched prompt caching, switching seamlessly between local vLLM/DeepSeek/Qwen and cloud APIs"
  - "FAISS vector store with multi-modal embeddings (text/audio/video) and a 4-stage retrieval pipeline that learns from past outputs"
  - "A 1977-line compose_final implementing probabilistic visual effects (stutter, reverse, speedup, freeze, jump-cut, mirror, picture-in-picture)"
  - "Priority-based LRU GPU memory manager for 16GB VRAM, loading/unloading diffusion and ML models on demand"
  - "Checkpoint-resumable batch pipeline with memory gating, GPU cleanup, and auto-retry — used to produce 76 videos"
challenges:
  - "Fitting Whisper, embedders, SDXL/ControlNet/SVD, and multiple ML models onto a single 16GB GPU required careful priority-based LRU scheduling to avoid OOM"
  - "Integrating a broad surface (agents/RAG/ML/multimodal/streaming/auth) with graceful degradation — every external dependency needed stubs and CPU fallbacks for offline testing"
  - "Audio/video alignment and duration fitting: ducking, phase alignment, and empty-audio validation when re-voiced TTS length differs from the original segment"
nextSteps:
  - "Fill documentation gaps (README links to INSTALL/DEPLOY/CONFIG guides that don't yet exist)"
  - "Build out the real-time/streaming processing path (realtime and streaming modules are scaffolded)"
  - "Add YouTube upload automation and content-moderation/copyright detection integration"
---
## Overview

YTP Factory is an AI-centric video production pipeline that automatically transforms ordinary footage into 'YouTube Poop' (YTP) style meme remixes. The flow — slice, Whisper transcription, LLM script rewriting, TTS re-voicing, SFX mixing, and visual-effect composition — is fully automated, with advanced AI capabilities available on demand.

## Technical Architecture

The system is layered. At the base is a six-stage, checkpoint-resumable core pipeline (segment → transcribe → script → synthesize → remix → compose), with an 'intelligence core' and an 'agents layer' stacked above. The intelligence core includes a multi-provider LLM system (local/OpenAI/LLMVendor routing with prompt caching), a FAISS multi-modal RAG retriever, and four ML models (XGBoost funniness detector, LoRA-tuned GPT-2 style transfer, contrastive SFX matcher, multi-task quality scorer). The agents layer has an Orchestrator coordinating Segment, Script, Audio, Visual, and Quality agents, with Chain-of-Thought reasoning and an inter-agent protocol.

## Engineering Highlights

The codebase is genuinely substantial: ~35K lines of Python under src spanning agents, intelligence (llm/rag/ml), multimodal, creativity, audio, video, infrastructure, streaming, auth, and realtime modules, plus 32 test files. compose_final alone is nearly 2,000 lines of probabilistic visual effects, and api.py provides a 1,200-line FastAPI service. The infrastructure layer includes a priority-based LRU GPU memory manager for 16GB VRAM, along with performance profiling and bottleneck detection.

## Outcomes and Honest Caveats

The project completed its stated P0–P8 v2.0 scope and, via a memory-gated, auto-retrying batch script, actually mass-produced 76 videos. The README is aspirational in places — some linked docs aren't yet written, and the high-end multimodal/ML features depend on large models and a multi-disk 'AI warehouse' to shine — but the core pipeline and AI integration genuinely work, with stubs and CPU fallbacks enabling offline testing.
