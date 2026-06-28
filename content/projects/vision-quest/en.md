---
title: "VisionQuest Multi-Modal AI Platform"
tagline: "Vision, language, retrieval and interactive narrative behind one API"
summary: "A FastAPI-and-React multi-modal AI platform prototype that unifies image captioning, visual question answering, chat, RAG knowledge retrieval, a tool-using agent and a text-adventure game behind a single REST API. A built-in mock/GPU dual mode lets the full UI and data flow be demoed even on machines without a GPU."
role: "Full-stack and AI systems designer; solely responsible for the backend service architecture, model management layer, React frontend and containerised deployment."
problem: "Vision and language models tend to live in silos and are hard to showcase together, while environments without a GPU often can't run a full demo at all. The need was a platform that collapses several multi-modal capabilities into one consistent API and starts up on any machine."
solution: "I designed a modular FastAPI backend that splits captioning, VQA, chat, RAG, agent and game into independent services and v1 routers, fronted by a unified ModelManager that scans local VLM/LLM models. A USE_MOCK_MODE switch lets the same codebase return simulated results without a GPU or load real models in GPU mode. The frontend is a React + TypeScript + Tailwind app where each capability maps to an interactive card."
outcome: "A working MVP: the backend spans nine API router groups, a PostgreSQL + pgvector persistence layer, pytest tests and Docker Compose deployment, with an eight-tab frontend. The project was later folded into the larger anime-adventure-lab and archived, kept as an exploratory prototype of multi-modal architecture design."
highlights:
  - "Nine v1 API router groups: caption, vqa, chat, rag, agent, game, models, history, batch"
  - "Mock/GPU dual-mode design lets the full UI and data flow run without a GPU"
  - "Unified ModelManager auto-detects the device (CUDA/MPS/CPU) and scans local models"
  - "pgvector + SQLAlchemy for vector search and persistent game state"
  - "React + TypeScript + Tailwind card-based frontend with React Flow visualisation"
  - "Containerised with Docker Compose, deployed behind the portfolio gateway"
challenges:
  - "Demoing without a GPU meant abstracting model calls behind a mock mode while keeping responses structurally identical to real inference"
  - "Collapsing five heterogeneous capability families (vision, language, retrieval, agent, game) into one consistent, extensible service and schema interface"
  - "Managing device selection and memory budgets for multiple local models (VLM/LLM/Diffusion)"
nextSteps:
  - "Complete the real-inference paths beyond mock mode and add a batch-processing task queue"
  - "Strengthen RAG chunking, citation tracking and hybrid retrieval"
  - "Its distinctive features were merged into anime-adventure-lab, which now carries ongoing maintenance"
---
## Overview

VisionQuest is a multi-modal AI platform prototype that aims to bring several common computer-vision and natural-language tasks together under a single, portable, easy-to-demo REST API. It covers image captioning, visual question answering (VQA), chat, RAG knowledge retrieval, a tool-using agent, and a narrative-driven text-adventure game.

## Architecture

The backend is built on FastAPI with clean layering: `api/v1` routers, `services` for business logic, `models` for model abstraction, a `database` persistence layer, and `core` for settings and middleware. Each capability is an independent service with its own Pydantic schema, making it easy to test and extend in isolation. The data layer uses PostgreSQL with pgvector for vector search and SQLAlchemy to manage game state and sessions. The frontend is a separate React + TypeScript + Tailwind app whose card-based tabs map onto each backend capability, with React Flow used for flow visualisation.

## Mock / GPU dual mode

The most pragmatic design choice is a `USE_MOCK_MODE` switch that lets the same codebase run in two regimes: mock mode returns structurally consistent simulated results so developers and reviewers can experience the full UI and data flow on a GPU-less machine, while GPU mode uses a unified `ModelManager` to detect CUDA/MPS/CPU, pick a precision and scan local VLM/LLM model directories to load real weights.

## Engineering practices

The project ships with pytest tests (health, chat and vision endpoints), ruff/black style configuration, LoRA fine-tuning configs, and several ops scripts (index building, model download, benchmarking, deployment), and is containerised with Docker Compose behind the portfolio gateway.

## Status

This is an MVP prototype for architecture exploration. Its distinctive text-adventure and game-state features were later integrated into the more complete anime-adventure-lab, at which point VisionQuest was archived. It remains a worked example of collapsing heterogeneous multi-modal capabilities into one consistent API while staying demoable without a GPU.
