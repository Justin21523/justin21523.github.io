---
title: "RetailPulse BI & Recommendation Platform"
tagline: "End-to-end data product turning retail transactions into actionable insight and recommendations"
summary: "RetailPulse is a retail/e-commerce data product chaining ETL, a DuckDB analytical warehouse, RFM segmentation, cohort retention, market basket analysis and a 3-tier recommendation cascade, extended with time-series forecasting, deep-learning customer modeling, NLP product embeddings and an A/B testing framework. A FastAPI backend serves the analytics, while Next.js and Streamlit front-ends provide interactive dashboards, all verified with pytest and Playwright and shipped via Docker."
role: "Solo full-stack data scientist/engineer owning the full pipeline: data, modeling, API, front-end and deployment."
problem: "Retailers generate thousands of transactions but struggle to answer who their best customers are, whether customers return, what sells together and what to recommend next — they lack an end-to-end system that turns data into decisions."
solution: "Built a data-to-decisions pipeline: clean transactions into an 8-table DuckDB warehouse, compute RFM, cohort and product features, segment with K-Means and mine Apriori association rules, then recommend through a FBT to segment-popular to global-popular cascade. Extended with SARIMA/LSTM forecasting, autoencoder and gradient-boosting customer modeling, SBERT/item2vec product embeddings and an A/B testing framework, all surfaced via FastAPI, Next.js and Streamlit."
outcome: "On the real Online Retail UCI dataset, cleaned 541,909 transactions down to 397,884 and ran the full pipeline in under 30s; the recommender reached Precision@10 = 0.0407 (~14x random baseline) on a 1,867-customer temporal hold-out. Delivered a 6+ endpoint FastAPI, a 5-page Streamlit dashboard and a multi-page Next.js app, verified by 28 pytest tests plus Playwright e2e and deployed with Docker."
highlights:
  - "8-table DuckDB analytical warehouse stitching ETL to features to modeling to serving into one pipeline"
  - "3-tier recommendation cascade (basket association to RFM-segment popularity to global popularity) with cold-start fallback"
  - "Apriori association rules (max lift 24.03) evaluated via temporal hold-out on Precision/Recall/Coverage"
  - "Extended ML: LSTM/SARIMA forecasting, autoencoder anomaly detection, CLV regression and churn classification"
  - "Dual front-ends: Next.js (TanStack Query, Recharts, shadcn/ui, EN/ZH i18n) plus a Streamlit BI dashboard"
  - "Docker Compose deployment with pytest + Playwright verification and remote smoke tests"
challenges:
  - "Synthetic demo data is small, making rules and segments illustrative — honestly documented as a limitation"
  - "Recommender is trained on full data while evaluated on a temporal split; coverage is only 2.0% and popularity fallback can dominate cold-start"
  - "DuckDB is single-writer, so concurrent ETL writes and API reads need careful handling"
nextSteps:
  - "Adopt the full Online Retail UCI dataset and add matrix factorization (SVD/ALS) collaborative filtering"
  - "Move to PostgreSQL for multi-writer production deployment and add CI/CD"
  - "Improve cold-start recommendations and use online A/B experiments to evaluate strategies"
---
## Overview

RetailPulse is an end-to-end **data-to-decisions** product for retail and e-commerce. Raw transactions are cleaned through ETL into an 8-table DuckDB analytical warehouse, then progressively turned into KPIs, RFM segments, cohort retention and market-basket association rules, and finally into actionable decisions via a recommendation engine and interactive dashboards.

## Modeling & recommendation

The core uses scikit-learn K-Means (k=4, centroid-ranked into Champions / Loyal / At Risk / Lost) for RFM segmentation and mlxtend Apriori for single-item association rules. Recommendations run as a 3-tier cascade: frequently-bought-together rules, then segment-popular products, then global popularity for cold-start. The project also adds SARIMA/ETS and LSTM sales forecasting, autoencoder customer anomaly detection, CLV regression and churn classification (PyTorch), plus item2vec/ALS/NMF collaborative filtering and SBERT/TF-IDF product embeddings.

## Serving & front-end

The FastAPI backend exposes health, KPI overview, customer RFM, top products and customer/product recommendation endpoints with OpenAPI docs. Two front-ends are provided: a modern Next.js 14 dashboard (TypeScript, TanStack Query, Recharts, shadcn/ui, Tailwind, EN/ZH i18n) and a 5-page Streamlit BI app (KPIs, RFM scatter, cohort heatmap, association rules, interactive recommendations).

## Engineering & verification

The project ships 28 pytest tests covering data cleaning, RFM, market basket and recommendation logic, with Playwright desktop and mobile e2e verification, a recorded walkthrough and remote smoke tests. Everything is orchestrated with Docker Compose (one-time ETL setup plus API/App services), and limitations such as synthetic data, approximate evaluation and single-writer storage are documented honestly alongside future work.
