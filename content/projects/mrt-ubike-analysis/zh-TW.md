---
title: "MetroBikeAtlas"
tagline: "MetroBikeAtlas is an MVP web app + data pipeline for urban mobility analysis in ..."
summary: "MetroBikeAtlas is an MVP web app + data pipeline for urban mobility analysis in Taiwan: Metro (MRT/rail) stations and flows (or feasible proxies when station-le..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python, FastAPI 的解決方案。"
highlights:
  - "Reproducible project scaffold (config, logging, caching)"
  - "TDX clients for metro + bike station metadata and bike availability snapshots"
  - "Preprocessing utilities: temporal alignment and metro↔bike spatial join"
  - "FastAPI backend + interactive map dashboard (control panels, inspector, keyboard shortcuts)"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
MetroBikeAtlas is an MVP web app + data pipeline for urban mobility analysis in Taiwan: Metro (MRT/rail) stations and flows (or feasible proxies when station-level flows are unavailable), shared bike stations, and city factors (district/POI density, accessibility, etc.).

- Reproducible project scaffold (config, logging, caching) - TDX clients for metro + bike station metadata and bike availability snapshots - Preprocessing utilities: temporal alignment and metro↔bike spatial join - FastAPI backend + interactive map dashboard (control panels, inspector, keyboard shortcuts)

1. Create venv: python -m venv .venv && source .venv/bin/activate 2. Install deps: pip install -r requirements-dev.txt 3. Run API + web (demo mode by default)
