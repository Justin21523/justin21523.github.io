---
title: "Recsys Benchmark Suite"
tagline: "Recommendation Benchmark Suite 是一個推薦系統離線評估工具箱。它支援 MovieLens、ListenBrainz sample、..."
summary: "Recommendation Benchmark Suite 是一個推薦系統離線評估工具箱。它支援 MovieLens、ListenBrainz sample、Amazon sample 等 user-item interaction 資料，提供 popularity、item-based CF、matrix fact..."
role: "獨立開發者"
problem: "此欄位需要依 README 與實際程式碼人工確認。"
solution: "此欄位需要依 實際技術棧 與系統架構人工補寫。"
highlights:
  - "MovieLens sample: small local generated sample and loader guidance; full MovieLens da"
challenges:
  - "需要補充真實技術挑戰。"
nextSteps:
  - "補齊截圖、Demo 與完整案例研究。"
---
Recommendation Benchmark Suite 是一個推薦系統離線評估工具箱。它支援 MovieLens、ListenBrainz sample、Amazon sample 等 user-item interaction 資料，提供 popularity、item-based CF、matrix factorization、ALS / BPR、content-based、hybrid recommender 的統一訓練、評估、比較與 bad case analysis。

This monorepo contains a FastAPI backend and a React TypeScript benchmark dashboard. It is designed for comparable, reproducible offline recommendation evaluation rather than a one-off demo.

Offline evaluation makes ranking quality, catalog coverage, novelty, diversity, and failure cases visible before a recommender is shipped. It also makes baseline regressions easier to catch.

- MovieLens sample: small local generated sample and loader guidance; full MovieLens da
