---
title: "News Web Crawler"
tagline: "An end-to-end news crawling, data quality, text mining, and ML diagnostics platform."
summary: "News Web Crawler turns Taiwanese news data into a browser-based analytics workbench covering crawling, cleaning, SQLite/FTS storage, NLP, EDA, text mining, and ML diagnostics. The portfolio version includes a public demo, GitHub, README, guided-tour recording, and Playwright screenshot evidence."
role: "Independent Developer / Full-stack Data Product Builder"
problem: "News data projects often stop at a crawler or notebook analysis. They need a usable interface for checking data quality, rerunning pipeline jobs, exploring articles, comparing models, and exporting reports."
solution: "I built a FastAPI + SQLite backend for APIs and background jobs, then created a Next.js workbench for data quality, EDA, text mining, article search, ML diagnostics, and report output. Playwright captures screenshots and a guided-tour recording for portfolio evidence."
outcome: "The project now has public live demo, GitHub, README, demo recording, and screenshot assets wired into the portfolio card and case study."
highlights:
  - "FastAPI backend exposes articles, stats, data quality, analysis, text mining, ML diagnostics, and jobs APIs."
  - "Next.js dashboard includes a guided assistant that walks through upload, pipeline jobs, analysis, search, and report export."
  - "Text mining combines TF-IDF, n-grams, topic modeling, clustering, collocations, entities, and co-occurrence networks."
  - "ML diagnostics supports baseline models, decision trees, artifacts, error samples, and portfolio report export."
  - "Playwright captures desktop/mobile screenshots plus guided-tour.webm for the portfolio card and README."
challenges:
  - "Turning a CLI/pipeline-oriented data engineering project into a public, inspectable product interface."
  - "Making the demo work under the portfolio reverse proxy at /p/news-web-crawler/ with correct routes, API calls, and assets."
  - "Keeping live demo, GitHub, README, screenshots, and recording links consistent across the project and portfolio."
nextSteps:
  - "Add remote smoke tests to deployment so /p/news-web-crawler/ and /api/v1/health are verified after release."
  - "Expand real news datasets and source health checks."
  - "Improve ML report templates and add manually labeled data to reduce weak-supervision limits."
---
News Web Crawler is not just a crawler. It organizes the full path from news collection to analysis, quality checks, model diagnostics, and report export into a usable data workbench.

The backend is split into FastAPI services and pipeline jobs, so crawler runs, demo data, analysis, text mining, ML training, and report export can be triggered from the UI. The frontend is structured as a dashboard: the home page shows pipeline state, Data Quality tracks missing or invalid records, Analysis covers trends and sources, Text Mining explores keywords/entities/topics/clusters, Articles supports search and facets, ML compares baseline models, and Reports exports evidence-ready diagnostics.

The portfolio version also includes complete public evidence: Live Demo, GitHub, README, demo recording, cover image, and Playwright screenshots. Visitors can inspect the actual product instead of relying on a text-only project card.
