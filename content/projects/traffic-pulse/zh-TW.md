---
title: "TrafficPulse"
tagline: "TrafficPulse is a road congestion analytics and visualization web app for Taiwan..."
summary: "TrafficPulse is a road congestion analytics and visualization web app for Taiwan, powered by TDX (Transport Data eXchange)."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於  的解決方案。"
highlights:
  - "Reproducible ingestion → preprocessing → analytics pipeline (Python)"
  - "A FastAPI backend for segment metadata, time series, and reliability rankings"
  - "A minimal map-based frontend for interactive exploration"
  - "Page-specific story KPIs:"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
TrafficPulse is a road congestion analytics and visualization web app for Taiwan, powered by TDX (Transport Data eXchange).

This repository is being developed in phases. Phase 1 (MVP) focuses on: - Reproducible ingestion → preprocessing → analytics pipeline (Python) - A FastAPI backend for segment metadata, time series, and reliability rankings - A minimal map-based frontend for interactive exploration

Recent UI upgrades focus on “map-first” storytelling and demo-ready presentation: - Page-specific story KPIs: - Events: linked hotspots count - Time Series: drop vs baseline + coverage - Rankings: filtered count - Actionable empty states: when a list is empty (no data / filtered out / dataset missing), the UI shows an empty-state card with
