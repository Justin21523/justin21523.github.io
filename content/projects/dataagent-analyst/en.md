---
title: "DataAgent Analyst: AI Agent Data Analysis & ML Workbench"
tagline: "Upload a CSV; AI agents run EDA, modeling, and insight reports"
summary: "A portfolio-grade AI data analysis platform: users upload a CSV and the system automatically profiles columns, runs EDA, recommends visualizations, trains baseline ML models, evaluates performance, and produces explainable analysis reports via a local LLM and a LangGraph multi-agent workflow. The backend is a layered FastAPI service architecture; the frontend is a modular vanilla-JavaScript dashboard, with PostgreSQL, Qdrant, and llama.cpp wired together through Docker Compose."
role: "Full-stack / AI application engineer (sole designer and developer of backend, frontend, agent workflow, and deployment)"
problem: "Data analysis spans many repetitive, fragmented manual steps — cleaning, EDA, modeling, and report writing. Beginners struggle to connect the full pipeline, while analysts often lack reproducible, explainable workflows. Many LLM applications also over-rely on cloud APIs, leaving no offline, cost-controlled local option."
solution: "A FastAPI backend built on a clean layered architecture (routes / schemas / services / core), with column profiling, EDA, chart recommendation, ML training, evaluation, prediction, and SHAP explainability split into independent services. LangGraph orchestrates Planner, Profiler, Visualizer, Trainer, Explainer, and Reporter agents into a repeatable workflow with async jobs and progress streaming. The LLM connects to a local llama.cpp server over an OpenAI-compatible interface and degrades gracefully when disabled. The frontend uses a modular vanilla-JS partials/features/components structure with ECharts."
outcome: "Delivered an end-to-end flow from upload to automated analysis, model training, explainability, drift monitoring, reports, and backtest artifact review, with 20+ backend services, 25 pytest test files, ruff/mypy checks, Playwright UI backtests, full workflow backtests, and a deterministic demo-dataset generator. GitHub Pages now hosts a static interactive demo that uses a fixture API to show the latest UI, guide tour, and core workflow."
highlights:
  - "LangGraph orchestrates six agent roles (Planner, Profiler, Visualizer, Trainer, Explainer, Reporter) into a repeatable analysis workflow with async jobs and progress-event streaming"
  - "Layered FastAPI architecture: centralized settings, structured error responses, Request-ID and processing-time middleware, and cleanly separated, testable services"
  - "SHAP model explainability plus a local llama.cpp LLM over an OpenAI-compatible API, with the LLM toggleable and gracefully degrading when offline"
  - "Modular vanilla-JavaScript frontend: dynamic HTML partials, navigation, bootstrap, global toasts, and a DOM-contract checker, with interactive ECharts visualizations"
  - "Docker Compose integrates PostgreSQL, the Qdrant vector store, llama.cpp, and Nginx, plus a CUDA compose variant for GPU inference"
  - "Right-side inspector, next-action engine, workspace context persistence, and a 19-step guided tour reduce navigation friction across a large data-science workbench"
  - "Strong engineering hygiene: uv, pytest (25 test files), ruff, mypy, Makefile, smoke tests, Playwright UI backtests, full backtest suites, and a reproducible demo-data generator"
challenges:
  - "Coordinating multiple existing services inside a LangGraph workflow while keeping each tool independent and testable, and aggregating errors and step state into a consistent response shape"
  - "Designing a toggleable, degradable local LLM integration so the system still works without a GPU or a running model"
  - "Keeping a vanilla-JavaScript frontend modular and maintainable through partials and a DOM-contract checker as features grew"
nextSteps:
  - "Expand the GitHub Pages fixture demo with multiple dataset and model lifecycle scenarios"
  - "Fully wire the Phase 9 RAG knowledge base — index data dictionaries and historical reports into Qdrant and serve cited queries"
  - "Strengthen multi-user workspace permissions, long-running job queues, and production model governance"
---
## Overview

DataAgent Analyst is a portfolio-grade AI data analysis and machine learning workbench. After a user uploads a CSV, the platform automatically infers and profiles column types, runs exploratory data analysis (missing values, duplicates, descriptive statistics, outliers, and correlations), recommends visualizations, trains and evaluates baseline ML models, and finally generates explainable Markdown analysis reports via a local LLM and a multi-agent workflow.

## Architecture & Stack

The backend is built with Python 3.12 and FastAPI in a layered architecture: `api` for routes, `schemas` for Pydantic v2 contracts, `services` for analysis capabilities, and `core` for centralized settings, logging, error handling, and middleware. Analysis capabilities are decomposed into independent services — column profiling, EDA, visualization, ML training, model evaluation/prediction/registry, feature pipelines, SHAP explainability, and reporting — making them easy to test and recompose.

## AI Agent Workflow

The core is a LangGraph `StateGraph` workflow that chains Planner, Profiler, Visualizer, Trainer, Explainer, and Reporter agents into an orchestrated analysis pipeline, while the actual tools are executed by the existing services. It supports asynchronous agent jobs with progress-event callbacks that report each step's status in real time. The LLM connects to a local llama.cpp server through an OpenAI-compatible interface and is disabled by default, degrading gracefully when the server is unreachable.

## Frontend & Deployment

The frontend is a modular vanilla-JavaScript dashboard using dynamically loaded HTML partials, a sidebar, top context bar, right inspector, section subnav, workspace context persistence, and Apache ECharts for interactive charts, kept maintainable with global toasts and a DOM-contract checker. The latest version adds a 19-step guide tour that moves across routes, focuses key regions, and explains each step from the lower-right panel. Everything is integrated via Docker Compose across PostgreSQL, Qdrant, llama.cpp, and Nginx, with a CUDA compose variant for GPU inference; GitHub Pages hosts a static interactive demo backed by a fixture API.

## Engineering Practices

The project uses uv for dependency management and ships with pytest (25 test files), ruff, mypy, a Makefile, smoke tests, Playwright UI backtests, full backtest suites, a backtest job runner, and a reproducible demo-data generator. Its roadmap documents the progression from prototype to production-style engineering.
