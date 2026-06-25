---
title: "RetailPulse BI Recommender"
tagline: "A retail BI, recommendation, and ML analytics platform."
summary: "RetailPulse BI Recommender is an end-to-end retail data product combining ETL, a DuckDB analytical warehouse, FastAPI, a Next.js dashboard, RFM segmentation, market basket analysis, recommendations, sales forecasting, ML insights, and A/B testing."
role: "Independent Developer / Full-stack Data Product Builder"
problem: "Retail transaction data is often split across orders, customers, products, and experiments, making it hard to answer revenue, customer value, product affinity, and recommendation strategy questions quickly."
solution: "I built a Python + DuckDB data pipeline, exposed analytics and recommendation APIs through FastAPI, and implemented an interactive Next.js dashboard. Playwright validates desktop flows, mobile navigation, screenshots, and full-session video evidence."
outcome: "The project is deployed under /projects/retailpulse-bi-recommender on the remote server. Docker API and frontend containers are healthy on the server, and the README includes Playwright screenshots and full verification video."
highlights:
  - "Built a complete retail BI and recommendation system with Next.js, FastAPI, and DuckDB."
  - "Covers Dashboard, Customers, Cohort, Basket, Recommendations, Forecast, ML Insights, A/B Testing, Upload, and Tour views."
  - "Added Playwright verification for desktop feature flows, mobile navigation, segmented screenshots, and full video capture."
  - "Dockerized and deployed under /projects/retailpulse-bi-recommender with remote API health and frontend proxy checks."
challenges:
  - "Keeping DuckDB-backed API routes stable across analytics, recommendations, and ML endpoints."
  - "Building repeatable visual verification for long desktop pages and mobile screens."
  - "Deploying through an unstable SSH connection with small batches and resumable uploads."
nextSteps:
  - "Add portfolio reverse proxy routing so the live demo is reachable through the main domain."
  - "Add CI/CD for pytest, production build, and Playwright smoke tests."
  - "Expand real-dataset evaluation and recommendation metric tracking."
---
RetailPulse BI Recommender turns retail transactions into a usable decision system. It is not just a model demo: it connects data cleaning, analytical storage, APIs, dashboards, recommendation logic, forecasting, and experimentation into one product workflow.

Users can inspect revenue and product performance, review RFM customer segments, explore recommendations, compare forecasts, inspect ML signals, and run A/B testing flows. The project also includes Playwright verification artifacts with desktop and mobile screenshots plus a full interaction recording.
