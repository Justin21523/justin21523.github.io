---
title: "Recsys Benchmark Suite"
tagline: "Recommendation Benchmark Suite 是一個推薦系統離線評估工具箱。它支援 MovieLens、ListenBrainz sample、..."
summary: "Recommendation Benchmark Suite 是一個推薦系統離線評估工具箱。它支援 MovieLens、ListenBrainz sample、Amazon sample 等 user-item interaction 資料，提供 popularity、item-based CF、matrix fact..."
role: "Independent Developer"
problem: "This field needs review against the README and source code."
solution: "This field needs a reviewed architecture summary based on the detected stack."
highlights:
  - "MovieLens sample: small local generated sample and loader guidance; full MovieLens da"
challenges:
  - "Add verified engineering challenges."
nextSteps:
  - "Add screenshots, demo material, and a complete case study."
---
Recommendation Benchmark Suite 是一個推薦系統離線評估工具箱。它支援 MovieLens、ListenBrainz sample、Amazon sample 等 user-item interaction 資料，提供 popularity、item-based CF、matrix factorization、ALS / BPR、content-based、hybrid recommender 的統一訓練、評估、比較與 bad case analysis。

This monorepo contains a FastAPI backend and a React TypeScript benchmark dashboard. It is designed for comparable, reproducible offline recommendation evaluation rather than a one-off demo.

Offline evaluation makes ranking quality, catalog coverage, novelty, diversity, and failure cases visible before a recommender is shipped. It also makes baseline regressions easier to catch.

- MovieLens sample: small local generated sample and loader guidance; full MovieLens da
