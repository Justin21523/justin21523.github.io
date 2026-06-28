---
title: "News Web Crawler & Data Intelligence Platform"
tagline: "Full-stack news pipeline from crawling to Chinese NLP and ML analysis"
summary: "Scrapes Taiwanese news (CNA, PTS, LTN) with Scrapy, runs GPU-accelerated Chinese NLP via CKIP for segmentation, POS and NER, then applies scikit-learn for topic modeling, clustering, sentiment, and time-series analysis. A FastAPI backend and Next.js frontend bring the whole pipeline to the browser with data-quality, text-mining, and explainable ML dashboards."
role: "Solo developer: built the crawler, data engineering, NLP/ML analysis modules, and the full-stack architecture."
problem: "Chinese news data is fragmented, inconsistently formatted, and guarded by anti-bot measures. Most crawlers only capture raw text, lacking a reproducible flow for cleaning, NLP annotation, and analysis—and the results are hard for non-engineers to inspect."
solution: "A layered pipeline: anti-detection crawler (Scrapy + Playwright stealth/humanization middleware) to structured cleaning and dedup (RawArticle->Clean->Enriched, SQLite FTS5) to CKIP joint segmentation/POS/NER with GPU auto-detection and RAM-safe batching to a modular analysis suite (collocations, LDA/NMF topics, K-Means clustering, classification, summarization, time series). A FastAPI service exposes versioned APIs, a Next.js dashboard visualizes them, with background jobs, ML artifact management, and report export."
outcome: "An end-to-end platform operable from a unified CLI (13 commands) or the browser, featuring data-quality inspection, a text-mining workbench, explainable decision trees, and multi-model comparison, with one-command Docker Compose deployment and a guided demo tour validated by screenshots and video."
highlights:
  - "Anti-detection crawler middleware (stealth + humanization) across multiple Taiwanese news sources"
  - "CKIP joint segmentation + POS + NER with GPU auto-detection and RAM-safe batch processing"
  - "Six modular analysis suites: collocations, topic modeling, clustering, classification, summarization, time series"
  - "Full-stack FastAPI + Next.js dashboard with data-quality, text-mining, and ML diagnostics pages"
  - "Explainable ML: Logistic/SVM/NB/Decision Tree/Random Forest training, tree visualization, artifact comparison"
  - "Background job system and multi-format export (CSV/Parquet/JSONL/HuggingFace Dataset)"
challenges:
  - "Balancing CKIP transformer GPU throughput against memory safety within a 4GB RAM budget via auto-adjusted batching"
  - "Refactoring a CLI-oriented research pipeline into versioned APIs and dashboards legible to non-engineers"
  - "Handling weak-supervision sentiment honestly—explicitly flagging it as weak until labeled data exists"
nextSteps:
  - "Introduce a manually labeled sentiment dataset to replace weak-supervision labels"
  - "Add more news sources and strengthen scheduled and incremental crawling"
  - "Deepen LLM summarization integration (currently an optional local llama.cpp-compatible endpoint)"
---
## Overview

This is an end-to-end data intelligence platform for Taiwanese Chinese news that integrates crawling, cleaning, Chinese NLP, machine-learning analysis, and visualization into a single reproducible pipeline, exposed through both a CLI and a browser UI.

## Data Engineering & Crawling

Scrapy with scrapy-playwright and custom anti-detection middleware (spoofed UA, humanized behavior) crawls CNA, PTS, and LTN. Data flows through a structured `RawArticle -> CleanArticle -> EnrichedArticle` schema with width/trad-simp/HTML/URL normalization, validation, and dedup, then lands in SQLite with FTS5 full-text search.

## Chinese NLP & Analysis

The NLP layer uses CKIP Transformers for joint segmentation, POS tagging, and NER, with a ResourceManager that auto-detects CUDA and batches safely within a fixed RAM budget (Jieba as fallback). The analysis suite covers PMI/log-likelihood collocations, LDA/NMF topic modeling, K-Means and hierarchical clustering, TF-IDF classification and lexicon sentiment, Lead-K/TextRank/MMR summarization, plus linear trend and burst detection.

## Full-Stack Web Platform

The FastAPI backend exposes versioned routes (`/api/v1`) for data quality, analysis overview, and ML endpoints, with persistent background jobs and ML artifact management (model.joblib, vectorizer, manifest, decision-tree PNG/SVG). The Next.js 15 (App Router) frontend renders a data-first dashboard of KPIs, processing flow, and charts, with a built-in guided assistant that produces interview-ready screenshots and video.

## Engineering Practices

The project ships Docker Compose deployment, pytest backend tests, and Playwright end-to-end tests, and stays honest about uncertainty—e.g., explicitly labeling weak-supervision sentiment rather than padding dashboards with placeholder values.
