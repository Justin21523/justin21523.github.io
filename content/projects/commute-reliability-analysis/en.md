---
title: "CommuteReliability (Baseline MVP)"
tagline: "CommuteReliability is a multi-modal commute reliability analytics app focused on..."
summary: "CommuteReliability is a multi-modal commute reliability analytics app focused on explainable, baseline statistics first (no ML in the MVP)."
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using Python."
highlights:
  - "TDX bus client (routes, stops-of-route, ETA snapshots)"
  - "Optional metro station metadata cache (for bus→metro candidate generation)"
  - "On-disk time-window storage (SQLite)"
  - "ETA accuracy analytics (bias/error by route/stop/time buckets)"
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
CommuteReliability is a multi-modal commute reliability analytics app focused on explainable, baseline statistics first (no ML in the MVP).

This MVP provides: - TDX bus client (routes, stops-of-route, ETA snapshots) - Optional metro station metadata cache (for bus→metro candidate generation) - On-disk time-window storage (SQLite) - ETA accuracy analytics (bias/error by route/stop/time buckets) - Transfer miss risk (buffer-based, baseline proxy) - Route reliability ranking (baseline scoring) - Commute plan scoring (multi-leg aggregation) - Auto candidate generation + scoring from origin/destination coordinates - FastAPI endpoints + minimal dashboard

- Python 3.10+ - TDX API credentials (client credentials grant)

1) Create a
