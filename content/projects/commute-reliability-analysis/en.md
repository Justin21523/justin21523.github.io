---
title: "CommuteReliability Analytics"
tagline: "Explainable baseline statistics for evaluating multi-modal commute punctuality and transfer risk"
summary: "A multi-modal commute reliability analytics platform built on Taiwan's TDX public-transport data. It deliberately uses explainable baseline statistics (no ML in the MVP) to quantify bus ETA accuracy, transfer-miss risk, and route stability, exposing reliability rankings and multi-leg commute scoring through a FastAPI service and a lightweight dashboard — answering not 'which route is fastest' but 'which route is most reliable.'"
role: "Solo developer responsible for data ingestion, analytics methodology, full-stack API and dashboard implementation, and containerized deployment"
problem: "The real pain of daily commuting is rarely average travel time — it is punctuality and the uncertainty of making transfers. Standard navigation returns the fastest route but offers no quantified, explainable view of ETA bias, transfer-miss probability, or route stability."
solution: "A TDX bus client periodically captures ETA snapshots into a SQLite time-window store; arrival events are inferred from snapshots as a ground-truth proxy. Baseline statistics then compute ETA bias/error, estimate transfer-miss probability from the historical error distribution, and produce route reliability scores via a weighted blend of MAE and bias with a sample-size factor — finally aggregated into multi-leg commute plan scores. All thresholds and weights live in YAML and can be hot-applied without restart."
outcome: "A working MVP deployed behind the portfolio gateway, offering APIs for bus ETA accuracy, transfer risk, route ranking, and commute recommendations, plus a dashboard with a Control Center (background jobs, cache status, hot settings, command palette) and auto-generation of bus_direct / bus_to_bus / bus_to_metro candidates from origin/destination coordinates."
highlights:
  - "A proxy method that infers arrival events from ETA snapshots, enabling prediction-accuracy evaluation without true ground truth"
  - "Transfer-miss risk modeled probabilistically, incorporating walking and platform buffers"
  - "Layered architecture (ingestion / preprocessing / analytics / api) cleanly decoupling collection, cleaning, and scoring"
  - "All thresholds, time windows, and weights externalized to YAML with /settings/apply hot-reload (no restart)"
  - "Dashboard Control Center integrating background polling/caching jobs, a command palette (Ctrl/Cmd+K), and coordinate-nudge tuning"
  - "Automatic multi-modal commute candidate generation from cached stop geometry, scored over a time window"
challenges:
  - "Public ETA data lacks real arrival timestamps, requiring a threshold-based proxy to infer arrival events while controlling evaluation error"
  - "Multi-leg reliability must jointly aggregate bus punctuality and transfer success probability while avoiding overconfident scores on small samples"
nextSteps:
  - "Incorporate service-disruption signals and more advanced time-series modeling (the MVP intentionally stays baseline, no ML)"
  - "Add user personalization (walking and transfer tolerance) and broader multi-city data coverage"
---
## Overview

CommuteReliability is a multi-modal commute reliability analytics platform that deliberately follows a 'baseline statistics first, no ML' philosophy for its MVP. Built on Taiwan's TDX open public-transport data, it answers questions like 'which commute route is most reliable' — emphasizing stability and transfer safety over raw speed.

## Data & Method

A TDX bus client periodically pulls routes, stops, and ETA snapshots into a SQLite time-window store. Because public feeds rarely include true arrival times, the project uses a proxy: an arrival event is detected when estimated time drops below a configured threshold, and prediction accuracy is evaluated against the closest snapshot within a fixed look-back horizon. The analytics layer computes ETA bias and error and estimates bus-to-metro transfer-miss probability from the historical error distribution.

## Scoring & Recommendations

Route reliability scoring combines MAE, an absolute-error percentile, and absolute bias in a weighted blend, with a sample-size factor that automatically discounts scores when data is sparse. Multi-leg commute plans then aggregate each leg's bus reliability and transfer success probability. The system can also auto-generate and score bus_direct, bus_to_bus, and bus_to_metro candidates from origin/destination coordinates.

## Engineering

The backend is FastAPI + Pydantic v2, organized into ingestion / preprocessing / analytics / api layers; all thresholds, time windows, and weights are centralized in YAML and hot-applicable without restart. The frontend is a lightweight static dashboard with a Control Center for background polling/caching jobs, live settings, a command palette, and coordinate nudging. The project is containerized with Docker and deployed behind the portfolio gateway.
