---
title: "Starforge AI Narrative"
tagline: "A school-life adventure game driven by multi-agent AI and RAG"
summary: "An AI-driven 2D school-life narrative adventure game. The FastAPI backend implements a multi-agent system (planner, dialogue, memory, safety agents) combined with RAG retrieval and tool calling to dynamically generate NPC dialogue and story branches; the frontend is a hand-built TypeScript/Vite 2D engine. A mock-first design lets the whole stack run and be tested without a GPU."
role: "Solo full-stack developer (backend AI architecture, frontend game engine, testing)"
problem: "Traditional text adventures hard-code dialogue and branches and feel mechanical; meanwhile AI integration usually demands costly models and GPUs, raising the bar for development and testing."
solution: "A swappable LLM provider abstraction (mock/OpenAI/local transformers) drives a multi-agent orchestration: a PlannerAgent uses the LLM to plan a tool sequence, a DialogueAgent assembles context, and Memory/Safety agents guard state and content. RAG vector retrieval ingests player-customizable world lore and character settings to generate context-appropriate dialogue and quest outcomes."
outcome: "A working MVP prototype: in mock mode the API and frontend boot with no GPU, pytest covers dialogue, planning, vector store and save modules, and Docker deployment configs are provided."
highlights:
  - "Multi-agent architecture: Planner / Dialogue / Memory / Safety agents, with the LLM dynamically planning tool sequences and falling back to defaults on parse failure"
  - "Pluggable LLM provider abstraction (mock / OpenAI / local transformers) plus a mock vector store, enabling full-feature development with no GPU"
  - "RAG system supports player-uploaded custom world lore and character settings, auto-ingested into the vector store at startup"
  - "Tool registry integrating callable tools: game_state, search_lore, web_search (Brave), and roll_check"
  - "Hand-built TypeScript/Vite 2D game engine with scene management, quests, shops, achievements, saves and i18n"
  - "Mock-first testing strategy: pytest-asyncio covers core AI and game services so everything runs before swapping in real models"
challenges:
  - "Keeping AI features developable and testable on GPU-less machines required designing a mock/stub for every external dependency"
  - "Orchestrating multi-agent, multi-step tool planning is complex and required robust fallback handling for LLM output parsing failures"
nextSteps:
  - "Wire in real local LLMs (Qwen2-7B) and OpenAI models to validate generation quality"
  - "Integrate Stable Diffusion for on-the-fly scene/character/item image generation (currently mocked)"
---
## Overview

Starforge AI Narrative is an AI-driven 2D school-life adventure game set around an American 5th-grade student's school and neighborhood. Gameplay centers on dialogue, choices and quests, where the player builds relationships with classmates and friends and cooperates to handle situations like bullying. The guiding idea is deep involvement of LLMs, RAG and AI agents so that every interaction's dialogue and story direction is generated dynamically, approaching a human-like experience.

## Technical Architecture

The backend is built on **FastAPI** with a multi-agent orchestrator: `PlannerAgent` uses an LLM to dynamically plan the sequence of tools to call, `DialogueAgent` assembles RAG context and game state before generating a response, and `MemoryAgent` plus `SafetyAgent` handle memory and content safety. Tools are registered through a ToolRegistry (game_state, search_lore, web_search, roll_check). RAG is implemented via VectorStore and Embedder abstractions, supporting both mock keyword matching and vector-similarity modes.

## Mock-first Design

The system revolves around swappable provider abstractions: `llm_provider` switches between `mock`, `openai`, and `local` (transformers/PyTorch), while the vector store and image generation (Stable Diffusion) also ship with mock implementations. This lets the full API and frontend boot and pass pytest suites even with no GPU or API keys, following a 'run first, swap in real models later' strategy.

## Frontend and Deployment

The frontend is a hand-written 2D game engine in **TypeScript + Vite**, with managers for scene management (exploration / interior / title), quests, shops, achievements, events, saves and i18n, and support for Tiled (.tmx) maps. The project includes Docker (nginx) deployment configs, and the backend data layer is backed by async SQLAlchemy with SQLite/PostgreSQL, retaining an in-memory mode for easy testing.
