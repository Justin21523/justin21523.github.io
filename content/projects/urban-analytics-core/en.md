---
title: "urban-analytics-core"
tagline: "Shared infrastructure package extracted from five Taiwan urban-analytics projects"
summary: "Consolidates duplicated infrastructure code from five Taiwan urban-analytics projects (traffic congestion, metro/YouBike mobility, destination scoring, commute reliability, library accessibility) into a single installable Python package. Provides a unified TDX OAuth client with rate-limited/retrying HTTP, Pydantic settings loading, logging, TTL caching, SQLite/DuckDB storage backends, a FastAPI app factory, and geo/time utilities — eliminating cross-project reimplementation."
role: "Solo developer: architecture, module extraction and consolidation, packaging"
problem: "Five standalone projects each reimplemented their own TDX client, settings system, logging, cache, geo/time utilities and FastAPI bootstrap, causing high maintenance cost, inconsistent behavior and repeated bug fixes."
solution: "Packaged as urban-analytics-core using a src-layout, splitting shared concerns into focused modules (tdx, settings, logging_cfg, cache, utils, api, storage), consumed by each project via editable install, with optional-dependencies separating core from heavy deps (DuckDB/SciPy)."
outcome: "Five TDX clients collapse into one; five settings/logging systems and three cache and geo/time utilities converge to a single source of truth — with reliability built in: auto token refresh, exponential backoff with jitter, Retry-After handling and forced refresh on 401."
highlights:
  - "TDX OAuth2 client-credentials auth with in-memory token caching and safety-margin auto-refresh"
  - "HTTP client with exponential backoff + jitter retries, 429 Retry-After parsing and minimum request-interval throttling"
  - "Layered config: Pydantic v2 settings with YAML deep-merge and environment-variable overrides"
  - "FastAPI app factory with built-in CORS, TTL response cache and per-IP sliding-window rate-limit middleware"
  - "Dual storage backends: SQLite (WAL mode) for reference/metadata, DuckDB+Parquet for large time-series analytics"
  - "Lightweight geo helpers (haversine) with no GIS dependency and Asia/Taipei timezone normalization"
challenges:
  - "Reconciling inconsistent interfaces and behavior across five existing projects into abstractions usable by all of them"
  - "Isolating heavy dependencies (DuckDB/SciPy) behind optional-dependencies so lightweight consumers avoid the install burden"
nextSteps:
  - "Build out test coverage (pytest/pytest-asyncio already configured) and add CI"
  - "Publish as a versioned internal package and migrate the five downstream projects to consume it"
---
## Overview

`urban-analytics-core` is a shared-infrastructure Python package created by extracting duplicated code from five Taiwan urban-analytics projects (`traffic-pulse` road congestion, `mrt-ubike-analysis` metro/YouBike, `tripscore` destination scoring, `commute-reliability-analysis` commute reliability, `library-reach-analysis` library accessibility). The goal is a single source of truth that eliminates cross-project duplication.

## Technical Design

The package uses a src-layout with setuptools. Core dependencies are Pydantic v2, httpx, FastAPI/Starlette/Uvicorn and pandas/numpy, with heavier libraries like DuckDB and SciPy gated behind `optional-dependencies`. Code is split by concern into `tdx` (auth + client), `settings`, `logging_cfg`, `cache`, `utils`, `api` and `storage`.

## Reliability

The TDX integration hardens against an unreliable upstream API with in-memory token caching plus safety-margin auto-refresh, exponential backoff with random jitter, 429 `Retry-After` parsing, forced token refresh on 401, and a configurable minimum request interval — keeping bulk ingestion stable.

## Data and Service Layer

The storage layer offers SQLite (WAL mode, for reference data and run metadata) and DuckDB+Parquet (for large time-series observations and analytic queries). The API layer ships a standardized FastAPI factory with health check, CORS, TTL response cache and per-IP sliding-window rate limiting, and can mount a static frontend.

## Status

Currently version 0.1.0, a personal project consumed via editable install. A ruff + pytest toolchain is configured; next work centers on tests, CI and downstream migration.
