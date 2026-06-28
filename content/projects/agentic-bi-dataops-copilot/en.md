---
title: "Agentic BI / DataOps Copilot"
tagline: "Local BI copilot: schema-aware Text2SQL with three-pass SQL guardrails"
summary: "A bilingual (EN/ZH) natural-language analytics platform over a retail DuckDB warehouse. Users ask in plain language; the system runs schema retrieval, Text2SQL, three-pass SQL safety validation, read-only execution, and chart recommendation. A rule-based adapter runs with zero API key, paired with a 16-stage DataOps guided React frontend. The focus is safety, explainability, and evaluability."
role: "Full-stack developer: backend architecture, SQL safety validator, evaluation harness, and React frontend"
problem: "Letting non-technical users query a warehouse in natural language is compelling, but trusting LLM-generated SQL directly risks destructive writes, injection attacks, and runaway queries — and most demos lack any evaluable, verifiable safety layer."
solution: "A schema-aware Text2SQL pipeline where every SQL string (including LLM output) passes a three-pass validator — regex blacklist, sqlparse AST analysis, and table whitelist — then executes on a read-only DuckDB connection with injected LIMIT and timeouts, backed by benchmark YAML and quantitative metrics."
outcome: "A working end-to-end, portfolio-grade platform: zero-cost rule-based adapter, 20+ pytest tests, a 12-case benchmark (targeting 100% unsafe-query rejection), and a Playwright-verified 16-stage React guided tour."
highlights:
  - "Defense-in-depth: three-pass SQL validation plus read-only DuckDB"
  - "Full demo with zero API key via rule-based Text2SQL"
  - "12-case benchmark with quantified safety/accuracy metrics"
  - "Playwright-verified 16-stage guided React frontend"
  - "Clean FastAPI REST API with interactive docs"
  - "Bilingual EN/ZH querying over a semantic catalog (catalog.yaml)"
challenges:
  - "Blocking dangerous statements while keeping the false-positive rate low"
  - "Keyword-scored schema retrieval trades simplicity against recall"
  - "Sharing one validation layer across both rule-based and LLM paths"
nextSteps:
  - "Complete the OpenAI adapter (currently a stub) with real API calls"
  - "Replace keyword scoring with sentence-transformer semantic retrieval"
  - "Add JWT/OAuth auth and rate limiting for production readiness"
---
## Overview
Agentic BI / DataOps Copilot is a natural-language analytics platform over a retail data warehouse. Users ask questions in English or Chinese, and the system performs schema retrieval, Text2SQL generation, SQL safety validation, query execution, chart recommendation, query history, and data-quality checks. Its guiding principle is safety, explainability, and evaluability — not making the agent look flashy.

## Safety Architecture
Every SQL string (including future LLM output) must clear the three-pass validator in `validator.py`: Pass 1 uses regex to block DROP/DELETE/UPDATE and 20+ dangerous keywords plus comment injection; Pass 2 parses the AST with sqlparse to reject multi-statement, non-SELECT, and comment-token injection; Pass 3 permits only whitelisted retail tables. Validated queries run on a `read_only=True` DuckDB connection with injected LIMIT and a thread timeout, forming layered defense — the LLM is never trusted directly.

## Tech Stack & Evaluability
The backend uses Python 3.11, FastAPI, Pydantic v2, and in-process DuckDB (OLAP), managed with uv; SQL parsing relies on sqlparse and sqlglot. The frontend is React + TypeScript + Vite + TailwindCSS, visualized with Recharts and verified by Playwright across a 16-stage tour and feature pages. Evaluation ships benchmark YAML and metrics such as `unsafe_rejection_rate`, `valid_sql_rate`, `execution_accuracy`, and `false_positive_rate`.

## Honest Completeness
The rule-based Text2SQL path, validator, query executor, evaluation harness, and frontend all run end-to-end with 20+ pytest tests; data is fully synthetic with no real PII. The OpenAI adapter is currently a stub, and authentication, rate limiting, semantic retrieval, and external benchmarks (Spider/BIRD) are tracked as production follow-ups.
