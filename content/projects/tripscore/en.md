---
title: "TripScore: Explainable Destination Scoring & Recommendation"
tagline: "Rule-based, explainable trip recommender fusing transit, weather and preferences"
summary: "TripScore is a data-driven travel decision engine. Given an origin, time window and preferences, it fuses TDX open transport data, Open-Meteo weather and area-context factors to compute an explainable weighted composite score for candidate destinations and rank them. It favors rule-based scoring (explainability before ML), keeps all weights/thresholds in config, and ships CLI, REST API, a Jinja2 web UI and a Docker always-on ingestion daemon."
role: "Solo developer (end-to-end: data pipeline, backend API, scoring model, and web frontend)"
problem: "Travel decisions like 'I have four hours this afternoon, where in Taipei should I go?' require weighing transit accessibility, weather, crowds and personal taste at once — yet that data is scattered across inconsistent APIs, and most recommenders are black boxes that can't explain why a place was suggested."
solution: "A modular ingestion->features->scoring->recommender->api->web pipeline: ingestion only fetches and caches TDX (bus/metro/YouBike/parking) and weather data; features turn raw data into comparable 0..1 scores (accessibility, weather, preference, context); scoring composes them via config weights with attached reasons; the system then returns a Top-N list with a full, explainable score breakdown surfaced as an evidence map and decision brief."
outcome: "Delivered the Phase 1 MVP: a 30+ Taipei POI catalog, four scoring dimensions, explainable breakdowns, three entry points (CLI/REST/web), a Leaflet evidence map, a Docker Compose always-on ingestion daemon with quality reporting, plus 13 tests and production-grade rate limiting, retries and caching."
highlights:
  - "Modular pipeline with strict separation of ingestion/features/scoring/recommender for testability and maintainability"
  - "Explainable scoring: every recommendation carries per-component scores and human-readable reasons, with per-request weight overrides and scenario presets"
  - "Resilient TDX integration: OAuth client-credentials, paged bulk fetching, request spacing, exponential-backoff retries and stale-if-error caching"
  - "Always-on ingestion: a Docker Compose background daemon continuously refreshes availability data, with log rotation and data quality/coverage monitoring"
  - "Eight-page narrative web UI (Plan/Results/Evidence Map/Data, etc.) with Copy-diagnostics observability"
  - "Config-driven: all weights, radii, thresholds and presets centralized in defaults.yaml, avoiding hard-coded constants"
challenges:
  - "Inconsistent per-city TDX schemas and missing fields (e.g. service_time) required local details merging and OSM/Nominatim enrichment"
  - "Rate limits (429) and flaky upstream APIs forced a careful balance between failing open (best-effort recommendations on missing data) and data freshness"
nextSteps:
  - "Add Phase 2 predictive signals: hour/day baselines for crowd-traffic risk and bike-availability risk"
  - "Expand the destination catalog and multi-city support, plus an evaluation workflow (offline sanity checks and case studies)"
  - "Introduce user profiles, saved preferences and a feedback loop for Phase 3 productization"
---
## Overview

TripScore is a **rule-based, explainable** destination scoring and recommendation system. It tackles everyday travel decisions — such as 'I have four hours this afternoon, where in Taipei should I go?' or 'I want outdoor spots this weekend but need to avoid rain and traffic' — by fusing transit accessibility, weather suitability, preference matching and area context into a transparent, explainable composite score.

## Architecture & data flow

The system follows a strictly layered pipeline: `ingestion -> features -> scoring -> recommender -> api -> web`. The ingestion layer only fetches TDX open transport data (bus stops, metro stations, YouBike stations with live availability, parking lots) and Open-Meteo weather, backed by a file cache to minimize API calls. The features layer converts raw data into comparable 0..1 scores; the scoring layer composes them with config weights and emits reasons; the recommender orchestrates candidate generation, ranking and output. A core principle keeps ingestion from doing scoring and keeps features/scoring from calling external APIs directly — making the system testable, changeable and easy to debug.

## Explainability & tunability

Phase 1 deliberately uses weighted rule-based scoring rather than machine learning — explainability first, prediction later. All weights, radii and thresholds live in `defaults.yaml`, with scenario presets (e.g. rainy_day_indoor) and per-request `settings_overrides`. Every recommendation ships with four component scores and textual reasons, so users know exactly why a place was suggested.

## Engineering & deployment

The backend is built on FastAPI + Pydantic v2, exposing a REST API alongside an eight-page, server-rendered Jinja2 web UI with a Leaflet evidence map. TDX ingestion is hardened with OAuth, paged bulk fetching, request spacing, exponential-backoff retries and stale-if-error caching; Docker Compose provides an always-on background ingestion daemon (with log rotation) plus data quality and coverage reporting. The project also includes a CLI entry point, Jupyter notebook walkthroughs, 13 pytest tests and ruff linting — reflecting an end-to-end production mindset.
