---
title: "Quant Strategy Agent Lab"
tagline: "A local-first quantitative strategy research workbench: data, indicators, and deterministic backtesting end to end."
summary: "A local-first quant research workbench built with FastAPI, SQLite, and pandas. It provides a normalized OHLCV data layer, six technical indicators, five strategy templates with a Strategy JSON DSL, and an in-house deterministic backtest engine that outputs metrics, equity curves, and agent-style execution steps. The frontend is framework-free Vanilla JS with native SVG charts. Educational and research use only; not investment advice."
role: "Solo developer: backend architecture, backtest engine, DSL design, frontend, and tests."
problem: "Quant strategy research often leans on black-box backtesting libraries whose execution assumptions (fill price, fees, slippage, liquidation rules) are opaque and hard to audit, raising the cost of learning and validation."
solution: "A layered architecture separates the data layer, indicator engine, strategy templates and DSL, backtest engine, and agent workflow. The project deliberately ships a small in-house deterministic backtest MVP first to keep every execution assumption visible, backed by 89% backend coverage and synthetic fixtures for reproducibility."
outcome: "Phase 4 delivered: run one strategy against one cached asset and get total return, annualized return, Sharpe, max drawdown, win rate, profit factor and more, plus equity and drawdown curves. Backend: 35 tests passing at 89.01% coverage; frontend: 5 tests passing and a clean Vite production build."
highlights:
  - "In-house long-only deterministic backtest engine: next-bar-open fills, explicit fees and slippage, forced final-bar liquidation, with fully transparent, auditable assumptions"
  - "Strategy JSON DSL 1.0: declarative JSON for entry/exit and risk rules with structural and indicator-reference validation"
  - "Six technical indicators (SMA/EMA/RSI/MACD/Bollinger Bands/ATR) computed on demand from SQLite-cached bars"
  - "Provider-neutral data layer: synthetic CSV fixtures run fully offline by default, with yfinance and reserved FinMind adapter boundaries"
  - "No frontend framework: Vanilla JS + ES Modules + native SVG rendering of price, indicator, equity, and drawdown charts"
  - "Agent-style execution timeline orchestrating deterministic steps (receive -> validate -> load data -> compute indicators -> generate signals -> backtest -> analyze -> explain -> report) that cite concrete data assumptions"
challenges:
  - "Implementing reproducible fill and liquidation logic with clear assumptions without depending on backtesting.py or vectorbt"
  - "Designing a Strategy JSON DSL that covers multiple strategy templates yet validates strictly"
  - "Honestly labeling synthetic fixtures and backtest boundaries so no result can be mistaken for investment advice"
nextSteps:
  - "Phase 5: Backtest Lab frontend polish and chart enhancements"
  - "Phase 6: Agent Timeline MVP with event-driven execution tracing"
  - "Phase 9: introduce an LLM strategy parser that turns natural language into a validated Strategy DSL"
---
## Overview

Quant Strategy Agent Lab is a **local-first** quantitative strategy research workbench built with Python, FastAPI, SQLite, pandas, and modular Vanilla JavaScript. It decomposes the full quant research pipeline — market data, technical indicators, strategy templates and DSL, backtest engine, and agent-style orchestration — into clear layers so every assumption can be inspected and tested. It is positioned for educational and research use and explicitly provides no investment advice.

## Architecture

The backend is layered: `domain` holds provider-neutral market, indicator, strategy, and backtest models; `providers` integrate CSV (offline synthetic fixtures by default), yfinance, and a reserved FinMind boundary behind adapters; `services` carry normalization, indicator, strategy-template, and backtesting logic; `repositories` handle SQLite persistence and provider lineage. The frontend deliberately uses no framework — ES Modules, Fetch API, native DOM, and native SVG charts form a router-based SPA, with Vite used only as dev/build tooling.

## Backtest and agent workflow

Phase 4 intentionally uses a small in-house **deterministic backtest MVP** rather than depending on backtesting.py or vectorbt right away. The engine's assumptions are explicit: daily bars only, long-only, one position at a time, rules evaluated on completed bars, normal signals filled at the next bar open, open positions liquidated at the final close, and commission and slippage as explicit inputs. The agent workflow orchestrates these tools through deterministic steps (strategy received -> validated -> market data loaded -> indicators computed -> signals generated -> backtest executed -> performance analyzed -> risk explained -> report generated) instead of letting a model become the calculation engine or execute arbitrary generated code; an LLM natural-language parser is planned for Phase 9.

## Quality

A `make check` quality gate runs Ruff, Pytest with coverage, ESLint, Prettier, frontend Node tests, and a Vite production build. Current Phase 4 validation: backend 35 tests passing at 89.01% coverage, frontend 5 tests passing, and a runtime smoke test through dynamic backend/frontend ports.
