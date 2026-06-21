---
title: "starforge-AI-narrative"
tagline: "- Activate env: conda activate aienv - Install deps (minimal): pip install fasta..."
summary: "- Activate env: conda activate aienv - Install deps (minimal): pip install fastapi uvicorn pydantic httpx - Run API (mock LLM, no GPU): cd backend/app && uvicor..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於  的解決方案。"
highlights:
  - "Activate env: `conda activate ai_env`"
  - "Install deps (minimal): `pip install fastapi uvicorn pydantic httpx`"
  - "Run API (mock LLM, no GPU): `cd backend/app && uvicorn app.main:app --reload`"
  - "Key routes:"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
- Activate env: conda activate aienv - Install deps (minimal): pip install fastapi uvicorn pydantic httpx - Run API (mock LLM, no GPU): cd backend/app && uvicorn app.main:app --reload - Key routes: - GET /health — health check - POST /ai/dialogue — dialogue (uses mock LLM by default) - GET /game/scenes, /game/npcs, /game/quests — static data - GET /game/player/{playerId}/state — player/NPC stats (in-memory) - GET /game/player/{playerId}/quests — quest stages (in-memory) - GET /config — current mock flags & model paths - Tests: PYTHONPATH=backend pytest backend/tests (mock-only; no GPU/model needed)

- Install: cd client && npm install - Run: n
