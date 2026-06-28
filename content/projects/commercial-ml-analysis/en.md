---
title: "Commercial ML Analysis Platform"
tagline: "Production-grade traditional-ML and MLOps platform for tens-of-GB Amazon review analytics"
summary: "An end-to-end e-commerce ML analytics platform that processes tens of GB of Amazon review data with Polars, spanning ETL, feature engineering, gradient-boosting training with Optuna, drift monitoring with automated retraining, and a rich set of business modules (NLP, CLV, segmentation, recommendation, causal inference), surfaced through React and Streamlit dashboards."
role: "Solo developer: led architecture, data pipelines, model training, MLOps monitoring, and full-stack dashboard implementation."
problem: "E-commerce teams facing tens of GB of review and interaction data lacked a reproducible, CPU-friendly, end-to-end pipeline that could also continuously monitor model quality, while needing to turn raw reviews into actionable business insight."
solution: "Built a memory-safe ETL on Polars lazy evaluation and partitioned Parquet, with RFM / rolling-window / CV target-encoding feature engineering. Trained LightGBM and CatBoost with Optuna and TimeSeriesSplit cross-validation, tracked via MLflow and exported to ONNX for fast inference. Added Evidently AI drift detection (PSI / Wasserstein / target drift) with Prefect-orchestrated conditional retraining, plus analysis modules for NLP, CLV, segmentation, recommendation, market basket, and causal/uplift modeling, all served to a React dashboard through a Starlette ASGI API."
outcome: "Delivered across multiple phases (Phase 1/2 marked complete) with a pytest suite and coverage reports, DVC data versioning, one-command Makefile pipelines, and a portfolio-safe quick demo that generates labeled sample data when no raw files are present."
highlights:
  - "Handles tens of GB on CPU only via Polars lazy/streaming evaluation and partitioned Parquet"
  - "LightGBM/CatBoost with Optuna Bayesian tuning, TimeSeriesSplit to prevent leakage, and ONNX export for fast inference"
  - "Evidently AI drift detection (PSI, Wasserstein, target drift) with Prefect-orchestrated automated retraining triggers"
  - "Full business-analytics suite: NLP sentiment/topics, CLV (BG/NBD, Gamma-Gamma), segmentation, recommendation, market basket, causal inference and uplift"
  - "Dual dashboards: a React analytics UI backed by a Starlette ASGI API plus a Streamlit fallback"
  - "Reproducibility via MLflow + DVC + YAML configs, backed by a pytest suite and coverage reporting"
challenges:
  - "Processing tens of GB on CPU with limited memory, requiring lazy evaluation, streaming, and chunked cleaning to avoid OOM"
  - "Honestly modeling raw reviews as user-product-rating interactions rather than complete order transactions, while keeping a derived-only public data policy"
nextSteps:
  - "Introduce distributed or GPU acceleration to scale data volume further"
  - "Harden online inference serving and API deployment with containerization"
  - "Extend causal and uplift models with an online A/B validation loop"
---
## Overview

The Commercial ML Analysis Platform is a production-grade "traditional ML" analytics and prediction system for e-commerce, designed around large-scale Amazon review data (tens of GB). It turns raw reviews into actionable business insight and covers the full MLOps lifecycle from ingestion to in-production monitoring, running efficiently on CPU throughout.

## Technical Architecture

The data layer is built on Polars lazy evaluation and partitioned Parquet, with Dask for out-of-core compute and Great Expectations for data-quality validation. Feature engineering covers RFM, 7d/30d/90d rolling-window statistics, cross-validated target encoding, and cyclic temporal features. The modeling layer uses LightGBM/CatBoost/XGBoost gradient boosting, Optuna for Bayesian hyperparameter search, TimeSeriesSplit cross-validation, MLflow experiment tracking, and ONNX export for accelerated CPU inference.

## MLOps and Monitoring

Evidently AI detects data and concept drift (PSI, Wasserstein distance, target drift, and performance decay), with Prefect orchestrating conditional automated retraining. DVC handles data and pipeline versioning, and YAML centralizes hyperparameters and thresholds for end-to-end reproducibility.

## Business Analysis Modules

Beyond core prediction, the platform ships several analysis modules: NLP sentiment and LDA topic modeling with aspect-based sentiment and summarization; probabilistic CLV via BG/NBD and Gamma-Gamma; HDBSCAN segmentation and cohort analysis; ALS/SVD recommendation; FP-Growth market-basket rules; and causal inference and uplift modeling based on DML/IV and S/T/X-Learners.

## Presentation Layer

The frontend is a React analytics dashboard (recharts, light theme, reproducible screenshots and contrast checks) driven by a Starlette ASGI API, with a Streamlit dashboard retained as a fallback. The project includes a pytest suite, coverage reports, and a portfolio-safe quick-demo flow that auto-generates clearly labeled sample data to reproduce the full artifact contract when raw data is unavailable.
