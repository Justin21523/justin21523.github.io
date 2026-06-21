---
title: "CommuteReliability (Baseline MVP)"
tagline: "CommuteReliability is a multi-modal commute reliability analytics app focused on..."
summary: "CommuteReliability is a multi-modal commute reliability analytics app focused on explainable, baseline statistics first (no ML in the MVP)."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python 的解決方案。"
highlights:
  - "TDX bus client (routes, stops-of-route, ETA snapshots)"
  - "Optional metro station metadata cache (for bus→metro candidate generation)"
  - "On-disk time-window storage (SQLite)"
  - "ETA accuracy analytics (bias/error by route/stop/time buckets)"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
CommuteReliability is a multi-modal commute reliability analytics app focused on explainable, baseline statistics first (no ML in the MVP).

This MVP provides: - TDX bus client (routes, stops-of-route, ETA snapshots) - Optional metro station metadata cache (for bus→metro candidate generation) - On-disk time-window storage (SQLite) - ETA accuracy analytics (bias/error by route/stop/time buckets) - Transfer miss risk (buffer-based, baseline proxy) - Route reliability ranking (baseline scoring) - Commute plan scoring (multi-leg aggregation) - Auto candidate generation + scoring from origin/destination coordinates - FastAPI endpoints + minimal dashboard

- Python 3.10+ - TDX API credentials (client credentials grant)

1) Create a
