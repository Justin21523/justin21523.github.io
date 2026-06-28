---
title: "MetroBikeAtlas: Metro & Shared-Bike Urban Mobility Analytics"
tagline: "A Metro x YouBike x city-factors dashboard built on TDX open data"
summary: "An end-to-end data engineering and analytics project centered on Taiwan's metro and YouBike open data. It uses a Bronze/Silver/Gold data lake, integrates TDX, Open-Meteo and OpenStreetMap, performs temporal alignment and metro-to-bike spatial joins, runs correlation and clustering analysis, and surfaces decision evidence through a FastAPI backend and an interactive map dashboard."
role: "Solo developer: full-stack design and implementation of the data pipeline, backend API, analytics methods, and front-end dashboard"
problem: "Metro and shared-bike usage is strongly shaped by urban structure, accessibility, and time-of-day behavior, yet the relevant data is scattered across open platforms at inconsistent spatial and temporal granularities, making it hard to assemble into reproducible, verifiable evidence for urban and transport decisions."
solution: "Built a config-driven, reproducible layered data lake (Bronze raw snapshots, Silver cleaned and aligned, Gold features and analytics). A throttled, 429-aware TDX client continuously collects live bike data into time series, and metro-to-bike spatial links are formed via buffer-radius or nearest-K methods. The analytics layer implements correlation, linear regression, KMeans clustering, and station similarity from scratch in NumPy to classify metro stations into functional types. A FastAPI backend exposes REST and SSE, paired with a multi-page, briefing-style Leaflet/Chart.js dashboard (home, insights, explorer, ops, about)."
outcome: "Delivered a one-command Bronze→Silver→Gold pipeline, Docker long-run deployment with SSE heartbeats to avoid proxy disconnects, Silver data-quality contract validation, and Playwright UI smoke tests with screenshots; APIs cover station time series, nearby bikes, and similar stations, supporting both demo and real data modes."
highlights:
  - "Bronze/Silver/Gold medallion data lake, config-driven and reproducible"
  - "Continuous TDX collector with throttling and 429 backoff turns live bike data into time series"
  - "Hand-rolled NumPy correlation, linear regression, KMeans, and station similarity for station typology"
  - "Metro-to-bike spatial join via buffer radius or nearest-K, with temporal alignment"
  - "FastAPI + Leaflet/Chart.js multi-page briefing dashboard with demo/real modes and freshness badges"
  - "Docker long-run, SSE heartbeats, data-quality contracts, and Playwright smoke tests with auto screenshots"
challenges:
  - "Deriving a ridership proxy from nearby bike-rental deltas when station-level live flows are unavailable"
  - "Unifying inconsistent spatial/temporal granularity across TDX, Open-Meteo, and OSM Overpass"
  - "Keeping SSE connections stable behind reverse proxies/Docker via proxy headers and heartbeats"
nextSteps:
  - "Add policy simulation (e.g., placing new YouBike stations) and multi-city comparison"
  - "Integrate census and socioeconomic data to strengthen urban-factor analysis"
  - "Extend time-series decomposition and richer ridership models"
---
## Overview

MetroBikeAtlas is an urban mobility analytics project built on Taiwan's metro (MRT/rail) and YouBike shared-bike open data, combining a data engineering pipeline with an interactive web dashboard. It studies how urban structure, accessibility, POI density, and time-of-day behavior influence metro flows and bike usage, making it suitable for smart-city research, urban planning, and transport policy evaluation.

## Architecture and Data Flow

The project uses a Bronze/Silver/Gold medallion data lake: Bronze stores raw TDX snapshots, Silver performs cleaning and temporal alignment, and Gold produces station-level features and analytics. Sources integrate Taiwan's TDX platform, Open-Meteo weather, and OpenStreetMap Overpass POIs. A continuous collector with built-in throttling and 429 backoff repeatedly pulls live bike availability to build time series, and can periodically rebuild Silver.

## Analytics Methods

The analytics layer deliberately implements correlation, linear regression, KMeans clustering, and station similarity from scratch in NumPy, classifying metro stations into functional types based on mobility and environmental features. Spatial integration supports both buffer-radius and nearest-K metro-to-bike join methods, while temporal alignment supports 15-minute/hour/day granularity with rolling windows. When station-level live flows are missing, the system derives a proxy from nearby bike-rental deltas.

## Backend and Frontend

FastAPI exposes REST and Server-Sent Events, with endpoints for station time series, nearby bikes, similar stations, and an analytics overview, supporting both demo (no credentials) and real (reads from Silver) modes. The front end is a multi-page, briefing-style dashboard (home, insights, explorer, ops, about) rendered with Leaflet maps and Chart.js, showing data freshness and a build code in the header.

## Engineering Quality

The project features config-driven design, Silver data-quality contract validation, Docker long-run deployment (with SSE heartbeats to prevent proxy disconnects), a pytest suite, and Playwright UI smoke tests with automatic screenshots, reflecting a reproducibility-first design with clear separation of ingestion, processing, and analysis.
