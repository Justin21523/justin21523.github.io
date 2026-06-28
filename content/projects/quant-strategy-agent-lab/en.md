---
title: "Quant Strategy Agent Lab"
tagline: "A local-first quant research workbench from universe management to scanner-driven portfolio rebalance."
summary: "A quantitative research platform built with FastAPI, SQLite, pandas, Vite, and framework-free JavaScript. It supports stock universes, batch data sync, technical scanner presets, data-quality reports, multi-asset backtests, portfolio rebalance, long-running job progress, and a visual research demo. The public GitHub Pages demo runs from static fixture snapshots; the local version keeps the full FastAPI/SQLite workflow."
role: "Solo developer: backend data layer, scanner/backtest/portfolio services, frontend workbench, site guide, Playwright media capture, and GitHub Pages deployment packaging."
problem: "A single-symbol backtest is too small to explain a realistic quant workflow. Useful research needs universe coverage, data quality checks, batch sync, scanner ranking, portfolio rebalance, report exports, and clear labeling when fixture data is used."
solution: "The project is split into auditable modules: market cache, universe management, scanner presets, data-quality gates, job queue, portfolio rebalance, performance analyzer, and report center. The frontend adds Demo Studio plus a 15-step site guide with spotlight overlays, particle effects, and cross-page navigation. Playwright captures screenshots, guide video, poster assets, traces, and an HTML report."
outcome: "The current Phase 9F demo presents a complete sample research workflow on entry. Users can inspect scanner results, data-quality failures, portfolio matrices, performance metrics, report exports, and the guided assistant. The GitHub Pages version uses deterministic fixture snapshots so the demo works without a running backend."
highlights:
  - "Universe management, batch sync, scanner presets, skipped-symbol reasons, and sync history"
  - "Data quality report with bar counts, first/last dates, missing weekdays, fixture flags, SMA200 readiness, and 252D return readiness"
  - "Portfolio rebalance MVP with weekly/monthly rebalance, scanner top N, equal weighting, turnover, drawdown, Sharpe, and benchmark comparison"
  - "Research Lab one-click pipeline covering sync, quality, scanner, portfolio matrix, strategy comparison, and report export"
  - "Long-running job queue with status, progress, result id, timestamps, and error output"
  - "15-step site guide with spotlight masks, particles, bottom-right instructions, and routed navigation"
  - "Playwright showcase package with screenshots, guide video, poster, trace, and HTML report"
challenges:
  - "GitHub Pages cannot run FastAPI or SQLite, so the public demo needs a static API adapter backed by fixture snapshots"
  - "Quant demos must distinguish engineering fixtures from investment-grade live data"
  - "The portfolio card and media gallery need verified live, video, GitHub, and README links while preserving the existing catalog format"
nextSteps:
  - "Add more real-market providers and stricter data freshness policies"
  - "Expand portfolio optimization, rebalance cost modeling, and factor exposure analysis"
  - "Package research artifacts as reproducible downloadable study bundles"
---
## Overview

Quant Strategy Agent Lab is a local-first quantitative research workbench. Instead of stopping at one-symbol backtests, it models the larger workflow around a stock universe: sync market data, evaluate data quality, run technical scanners, compare strategies across candidates, rebalance portfolios, and export research reports.

## Demo Strategy

The public site is deployed on GitHub Pages, so it cannot rely on a long-running FastAPI backend. The static demo mode reads deterministic fixture snapshots and serves the same major UI flows through a frontend API adapter. Dashboard, Research Lab, Scanner, Portfolio, Performance, Report Center, and the guided assistant all work in the static deployment. Local development still runs the full FastAPI + SQLite stack.

## Engineering Focus

The backend uses FastAPI, Pydantic, SQLite, and pandas for typed data and research services. The frontend uses Vite, modular Vanilla JavaScript, native DOM APIs, and SVG charts. Playwright is used both for E2E validation and for portfolio packaging: screenshots, a guided assistant video, a poster frame, trace files, and an HTML report are generated from the real app.

## Current Status

The project is best read as a quant research platform prototype and portfolio demo. It demonstrates data engineering, API contracts, batch jobs, research workflows, visualization, browser automation, and deployment packaging. All public demo data is synthetic fixture data and is not investment advice.
