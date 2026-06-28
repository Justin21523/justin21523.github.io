---
title: "Multi-AI Agents — Game Agent Ecosystem"
tagline: "A prototype platform where local-LLM-driven agents auto-collaborate on interactive narrative games"
summary: "A self-hosted multi-agent coordination system: a GameMaster agent orchestrates and auto-routes player input to specialist agents (story, NPC, world, quest) that collaborate to generate a 'campus life' interactive narrative. The backend wires FastAPI + WebSocket to local Ollama inference, Qdrant vector search, and a Neo4j knowledge graph; the frontend is React 18 + TypeScript. Currently a prototype, with the text-adventure module as the priority."
role: "Full-stack & AI system design/development (solo project)"
problem: "Interactive narrative games need several specialized capabilities — story progression, NPC dialogue, world/scene management, quest tracking — working in concert, which a single prompt struggles to cover. The goal was also to self-host inference on a local GPU for cost and privacy, without relying on cloud APIs."
solution: "A pluggable agent core was designed: a BaseAgent abstraction, an AgentRegistry, and an AgentRouter for automatic routing and delegation, with an LLMClient unifying any OpenAI-compatible backend (Ollama / vLLM / llama.cpp). The GameMaster delegates requests to specialist agents by keyword. RAG is backed by a Qdrant vector store and a Neo4j knowledge graph for character knowledge; FastAPI WebSocket provides real-time streaming, and a React + shadcn/ui frontend renders an agent dashboard and game views."
outcome: "A working prototype: the agent core, LLM abstraction layer, RAG, FastAPI/WebSocket backend, and a multi-page React frontend are all in place, with the text-adventure module running end to end. The 2D (Phaser 3), 3D (Three.js), and fine-tuning (Unsloth/PEFT) pipelines remain in planning and implementation."
highlights:
  - "GameMaster auto-routes to 5 specialist game agents that can delegate to one another"
  - "LLMClient unifies OpenAI-compatible backends, swappable across Ollama / vLLM / llama.cpp"
  - "Dual-engine RAG: Qdrant vector search plus a Neo4j knowledge graph for the character KB"
  - "FastAPI + WebSocket real-time streaming, with an agent dashboard and character studio frontend"
  - "Fully local GPU inference (AMD R9700, 32GB), no cloud API dependency"
  - "Modular core: clearly layered Registry / Router / Memory / EventBus / ContextEngine"
challenges:
  - "Inter-agent context passing and delegation routing are still keyword-based, limiting accuracy"
  - "Coordinating Qdrant, Neo4j, and Ollama via docker compose makes the deployment heavy"
nextSteps:
  - "Upgrade keyword routing to semantic / tool-call-driven agent decisions"
  - "Complete the Phaser 3 and Three.js game modules and the Unsloth fine-tuning pipeline"
---
## Overview
Multi-AI Agents is a prototype game ecosystem driven by local LLMs, where several specialist AI agents auto-collaborate to generate a 'campus life' interactive narrative. It emphasizes self-hosted inference on a local GPU (AMD Radeon AI PRO R9700, 32GB VRAM) for cost, privacy, and control.

## Architecture
The backend core is modular: `BaseAgent` defines the agent contract, `AgentRegistry` handles registration and lazy creation, and `AgentRouter` performs request routing. A GameMaster agent acts as the conductor, delegating tasks by keyword to StoryAgent, NPCAgent, WorldAgent, and QuestAgent. `LLMClient` wraps Ollama, vLLM, and llama.cpp behind a unified OpenAI-compatible interface, alongside Memory, EventBus, CommunicationBus, and ContextEngine for memory, events, and context.

## Retrieval & Data
RAG uses dual engines: Qdrant for vector search and Neo4j for a knowledge graph, integrated via LlamaIndex to power a character knowledge base (CharacterKB) so NPC dialogue and world lore stay consistent. Infrastructure is orchestrated with docker compose for Qdrant and Neo4j.

## Frontend & Game Modules
The frontend is React 18 + TypeScript + Vite + Tailwind + shadcn/ui, offering an agent dashboard, character studio, knowledge base, text adventure, and fine-tuning pages, streaming over WebSocket. The text adventure is the priority module; the 2D (Phaser 3), 3D (Three.js + React Three Fiber), and fine-tuning (Unsloth/PEFT/TRL) pipelines are still planned.

## Status
This project is currently a prototype: the core agent framework, LLM abstraction, RAG, and text adventure run end to end, while several advanced game and fine-tuning features are not yet complete.
