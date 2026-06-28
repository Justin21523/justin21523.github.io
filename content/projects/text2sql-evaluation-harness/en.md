---
title: "Text2SQL Evaluation Harness"
tagline: "Reproducible harness for measuring LLM-generated SQL for Agentic BI"
summary: "A reproducible Text-to-SQL evaluation harness (not a chatbot) that loads Spider, DuckDB Text2SQL 25k, and a built-in retail warehouse benchmark to compare prompt templates and schema-retrieval strategies. It blocks unsafe SQL with SQLGlot and measures execution accuracy, valid SQL rate, latency, and an error taxonomy, paired with a bilingual React dark dashboard and bad case replay."
role: "Full-stack developer (designed and built the evaluation engine, API, and dashboard)"
problem: "Agentic BI systems need reliable SQL generation, clear safety boundaries, and repeatable measurement, yet lack an evaluation loop to systematically compare prompts, retrieval, and models before deployment, while preventing LLMs from producing destructive SQL."
solution: "Built a FastAPI + DuckDB evaluation engine supporting multiple benchmark loaders, prompt templates, and schema-retrieval ablations (keyword/column/mock-embedding). SQL is parsed with SQLGlot plus denylist prechecks to block mutating statements, multi-statements, and sandbox escapes, then executed in a sandbox to compute execution accuracy, exact match, unsafe rejection rate, and latency. API runs use an async queue with optional LLM self-correction and final-SQL-only scoring across mock, OpenAI-compatible, and llama.cpp adapters."
outcome: "Delivered a reproducible evaluation pipeline and a bilingual React TypeScript dark dashboard with radar, latency histogram, error treemap, and model x prompt x retrieval heatmap, plus bad case replay, regression flagging, and Markdown/JSON/CSV/ZIP report export, backed by GitHub Actions CI, Docker production config, and a prod-check health gate."
highlights:
  - "SQL safety layer using SQLGlot plus denylist prechecks that blocks mutating statements, multi-statements, non-whitelisted tables, and sandbox-escape commands"
  - "Four benchmark loaders: Spider, DuckDB Text2SQL 25k, a built-in retail warehouse, and custom JSONL"
  - "Ablation matrix comparing prompt templates (zero-shot/few-shot/schema variants) against schema-retrieval strategies"
  - "12-class error taxonomy plus semantic error classification, with bad case replay and regression candidates"
  - "React + ECharts dark analytics dashboard featuring a model x prompt x retrieval heatmap and bilingual (zh-TW/en-US) UI"
  - "Pluggable generation adapters: deterministic mock, OpenAI-compatible, and llama.cpp (Qwen2.5-7B) with Tailscale remote inference"
challenges:
  - "Balancing unsafe-SQL blocking against correctly executing legitimate queries, achieved with SQLGlot parsing plus denylist prechecks"
  - "Designing a reproducible measurement flow that fairly compares prompt x retrieval x model, using a deterministic mock adapter to keep tests and demos stable"
nextSteps:
  - "Add real embedding-based schema retrieval to replace the deterministic mock vector retriever"
  - "Wire in full Spider / DuckDB Text2SQL 25k datasets for large-scale evaluation beyond samples"
  - "Strengthen LLM self-correction strategies and multi-model concurrent evaluation throughput and observability"
---
## Overview
The Text2SQL Evaluation Harness is an **evaluation framework for Agentic BI, not a chatbot**. It evaluates fixed benchmark questions against gold SQL and warehouse data, persisting each run's predictions, metrics, and bad cases for repeatable analysis.

## Architecture and stack
The backend is built on **FastAPI + DuckDB** (separate harness DB and sample warehouse) and is split into benchmark loaders, a prompt renderer, schema retrieval, generation adapters, a SQLGlot safety validator, and a sandboxed executor. The frontend is **React 18 + TypeScript + Vite + Tailwind**, using Apache ECharts for radar, latency histogram, error treemap, and ablation heatmaps, with i18next powering a bilingual (zh-TW/en-US) dark Agentic BI Terminal theme.

## SQL safety and evaluation
SQL is parsed with **SQLGlot** and guarded by denylist prechecks that block mutating statements, multiple statements, non-whitelisted tables, sandbox escapes, and risky `SELECT *`, before sandboxed execution. Runs compute execution accuracy, exact match, valid SQL rate, unsafe rejection rate, execution error rate, latency, and a 12-class error taxonomy; API-triggered runs use an async queue with progress events, optional LLM self-correction, and final-SQL-only scoring.

## Generation adapters and deployment
Three generation adapters are supported: a deterministic **mock** (stable fallback for tests/demos), an **OpenAI-compatible** adapter, and a **llama.cpp** adapter (OpenAI-compatible `llama-server`, defaulting to Qwen2.5-7B), which can connect a VPS backend back to a local inference host over Tailscale without public exposure. The project ships GitHub Actions CI, Docker/docker-compose production configuration, and a `make prod-check` deployment health gate.

## Outcome
It delivers a complete prompt/retrieval/model ablation and report-export workflow (Markdown/JSON/CSV/ZIP) with bad case replay and regression flagging, letting teams reliably measure and compare SQL generation for Agentic BI before deployment.
