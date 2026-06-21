---
title: "LLM Train-Eval-Ship"
tagline: "A portfolio-ready, one-click pipeline to fine-tune LLMs, auto-evaluate, and depl..."
summary: "A portfolio-ready, one-click pipeline to fine-tune LLMs, auto-evaluate, and deploy via vLLM or TGI with shared model caches. Includes FastAPI skeleton, cache pa..."
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using Python."
highlights:
  - "**One-click flow**: dataset upload → fine-tune → auto-eval → deploy."
  - "**Deploy engines**: vLLM or TGI (OpenAI/HF compatible)."
  - "**Shared caches**: `HF_HOME / TRANSFORMERS_CACHE / HF_HUB_CACHE` to avoid re-downloading."
  - "**Canary & rollback** (roadmap): traffic shift and safe fallback."
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
A portfolio-ready, one-click pipeline to fine-tune LLMs, auto-evaluate, and deploy via vLLM or TGI with shared model caches. Includes FastAPI skeleton, cache path prints, and ready-to-extend hooks for LoRA/DPO, RAG/Agent, and HIL feedback.

- One-click flow: dataset upload → fine-tune → auto-eval → deploy. - Deploy engines: vLLM or TGI (OpenAI/HF compatible). - Shared caches: HFHOME / TRANSFORMERSCACHE / HFHUBCACHE to avoid re-downloading. - Canary & rollback (roadmap): traffic shift and safe fallback. - Extensible: LoRA/PEFT, DPO, RAG tools whitelist, AutoEval dashboards.

bash python3 -m venv .venv && source .venv/bin/activate pip install -r requirements.txt export MODELSTOREROOT=/
