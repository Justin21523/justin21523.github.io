---
title: "Amazon Review Intelligence"
tagline: "A review-centered product search and recommendation data product."
summary: "Amazon Review Intelligence combines Amazon Reviews 2023 data, BM25, vector search, reranking, review summarization, sentiment and aspect analysis, similar-product search, recommendation APIs, and a dashboard experience."
role: "Independent Developer"
problem: "Product pages contain many reviews, but shoppers cannot easily turn raw review volume into clear tradeoffs, sentiment patterns, comparable products, or recommendation signals."
solution: "Built a review-centered data product with DuckDB for product and review data, FastAPI for search and recommendation endpoints, and a Next.js dashboard for hybrid search, product summaries, sentiment analytics, recommendations, and evaluation views."
highlights:
  - "**Hybrid Search** — BM25 lexical + sentence-transformer vector search with configurable alpha blending"
  - "**Review Intelligence** — per-product summaries, pros/cons extraction, sentiment distribution"
  - "**Recommendation** — popularity, content-based, item-item, and cold-start strategies"
  - "**REST API** — FastAPI with 8 endpoints, OpenAPI docs at `/docs`"
challenges:
  - "Balanced BM25 keyword precision with sentence-transformer semantic recall through configurable hybrid ranking."
  - "Kept the portfolio presentation public-safe by shipping code, docs, synthetic samples, screenshots, and aggregate metrics instead of redistributing raw Amazon review dumps."
nextSteps:
  - "Add a public demo link and a fuller walkthrough video."
---
Amazon Review Intelligence is a review-centered product search and recommendation data product. It combines Amazon Reviews 2023 category data, BM25, vector search, reranking, review summarization, sentiment and aspect mining, similar-product search, recommendation APIs, and a dashboard experience.

The project turns review data into a searchable, comparable, and evaluable product experience. The backend uses Python, DuckDB, and FastAPI for data and API layers, while the frontend uses Next.js for product search, review summaries, recommendations, comparison, embedding clusters, pipeline visibility, and evaluation screens. It also includes pytest and Playwright coverage so data processing, API behavior, and main frontend workflows can be checked repeatedly.

The portfolio card should communicate that this is not just a dashboard. It is a full data product exercise spanning ingestion, indexing, retrieval, recommendation, evaluation, and an operator-facing interface.
