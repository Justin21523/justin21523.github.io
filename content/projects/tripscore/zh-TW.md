---
title: "TripScore"
tagline: "TripScore is a rule-based, explainable destination scoring and recommendation sy..."
summary: "TripScore is a rule-based, explainable destination scoring and recommendation system."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python, FastAPI 的解決方案。"
highlights:
  - "Destination catalog (sample Taipei POIs)"
  - "TDX-based accessibility proxy (bus + metro stations + YouBike last-mile)"
  - "Origin-aware proximity signal (distance-based, configurable)"
  - "Weather-based suitability (rain probability + temperature)"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
TripScore is a rule-based, explainable destination scoring and recommendation system.

Phase 1 (MVP) includes: - Destination catalog (sample Taipei POIs) - TDX-based accessibility proxy (bus + metro stations + YouBike last-mile) - Origin-aware proximity signal (distance-based, configurable) - Weather-based suitability (rain probability + temperature) - Tag-based preference matching - Context scoring (crowd risk + family-friendly) - Optional congestion proxy via parking availability (TDX, if supported) - Explainable composite score - CLI demo, REST API, and a minimal web UI

Pipeline modules follow: ingestion → features → scoring → recommender → api → web.

Key paths: - data/catalogs/destinations.json — sample destination catalog (30+ points) - src/tripsco
