---
title: "Recommendation Benchmark Suite"
tagline: "A reproducible offline recommender evaluation platform and bilingual dashboard built on FastAPI + DuckDB"
summary: "An offline evaluation toolbox for recommender systems, pairing a FastAPI + DuckDB backend with a bilingual React TypeScript dashboard. It supports multi-dataset loaders, deterministic splits, and a range of baseline recommenders, plus a leaderboard, metric analysis, a recommendation sandbox, and failure-case diagnosis so ranking quality, coverage, and diversity become measurable before shipping."
role: "Solo developer responsible for the full stack: backend API, evaluation engine, data pipeline, and frontend dashboard."
problem: "Recommender models are often shown as one-off demos without a comparable, reproducible offline evaluation flow, leaving ranking quality, catalog coverage, diversity, and failure modes hard to quantify before launch and making baseline regressions easy to miss."
solution: "Established a unified user-item interaction benchmark format with dataset loaders, backed by DuckDB storage and an experiment runner. Implemented popularity, item/user-based CF, SVD matrix factorization, ALS/BPR interfaces, content-based, and hybrid models, paired with random / temporal / leave-one-out deterministic splits and full ranking metrics, all exposed via FastAPI `/api/v1` to a bilingual React dashboard for leaderboards, an analytics workbench, and failure diagnosis."
outcome: "Delivered an offline, reproducible full-stack evaluation platform that compares models across MovieLens, ListenBrainz, and Amazon samples in one format, produces leaderboards and bad-case analysis, and stays usable offline via a deterministic fallback when local llama.cpp is unavailable."
highlights:
  - "Unified user-item benchmark format that evaluates MovieLens, ListenBrainz, Amazon samples, and generic CSV"
  - "Implements a full ranking metric set: Precision@K, Recall@K, MAP@K, nDCG@K, HitRate, Coverage, Diversity, Novelty"
  - "Ships multiple baselines: popularity, item/user CF, SVD, ALS/BPR, content-based, and hybrid"
  - "Three deterministic split strategies (random, temporal, leave-one-out) with reproducible seed handling"
  - "Bilingual (zh-TW / en-US) React TypeScript dashboard with leaderboard, analytics workbench, sandbox, and Failure Lab"
  - "Local llama.cpp integration for metric explanations with a deterministic offline fallback"
challenges:
  - "Designing a single interaction schema and normalizing loaders that fit heterogeneous e-commerce, music, and rating sources"
  - "Guaranteeing reproducibility of temporal / leave-one-out splits and metric computation under fixed seeds"
nextSteps:
  - "Strengthen ALS/BPR beyond adapter MVPs via the optional implicit path"
  - "Connect offline metrics to online A/B validation to cover offline-proxy blind spots"
  - "Expand loaders for larger datasets and add distributed experiment execution"
---
## Overview
The Recommendation Benchmark Suite is an offline evaluation toolbox for recommender systems, built as a monorepo with a FastAPI + DuckDB backend and a bilingual React TypeScript benchmark dashboard. It is designed for comparable, reproducible offline evaluation rather than a one-off demo.

## Technical architecture
The data flow runs from sample and user CSVs through dataset loaders that normalize records into a unified user-item interaction format, into DuckDB. An experiment runner then drives the baseline recommenders, a ranking evaluator computes metrics back into DuckDB, and FastAPI `/api/v1` serves results to the React dashboard. The backend uses scikit-learn, pandas, Polars, and numpy for modeling and data processing.

## Core capabilities
Models span a popularity baseline, item/user-based collaborative filtering, truncated-SVD matrix factorization, ALS/BPR adapter interfaces, content-based, and a hybrid weighted combination. Split strategies include random, temporal, and leave-one-out, all deterministic with seed handling. Metrics implement Precision@K, Recall@K, MAP@K, nDCG@K, HitRate@K plus Coverage, Diversity, and Novelty, alongside bad-case analysis covering missed relevant items, popularity bias, cold start, and low diversity.

## Frontend and interaction
The frontend defaults to zh-TW and supports en-US, with all navigation, forms, tooltips, and glossary content stored in locale JSON. The dashboard includes Overview, Dataset Explorer, Experiment Runner, Model Arena, Analytics Workbench, Metrics Explorer, Recommendation Sandbox, Failure Lab, Metric Lab, and Guided Demo, offering metric heatmaps, K-sensitivity, coverage/diversity trade-offs, popularity-exposure analysis, and experiment traceability. Visualizations use Recharts, with data and state managed by TanStack React Query.

## Design trade-offs
The suite is positioned as a compact benchmark rather than a distributed training system; ALS/BPR ship as adapter-compatible MVPs by default. Offline metrics are explicitly treated as proxies that must be paired with online validation. Metric-explanation endpoints can call a local llama.cpp OpenAI-compatible server and fall back to a deterministic explanation when it is unavailable, keeping the UI usable offline.
