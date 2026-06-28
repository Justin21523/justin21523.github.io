---
title: "推薦系統基準測試套件"
tagline: "FastAPI + DuckDB 打造的可重現推薦系統離線評估平台與雙語儀表板"
summary: "一套針對推薦系統的離線評估工具箱，以 FastAPI + DuckDB 後端與 React TypeScript 雙語儀表板組成。支援多資料集載入、確定性切分、多種 baseline 推薦模型，並提供排行榜、指標分析、推薦沙盒與失敗案例診斷，讓排序品質、覆蓋率與多樣性在上線前可被量化比較。"
role: "獨立開發者，負責後端 API、評估引擎、資料管線與前端儀表板全端設計實作。"
problem: "推薦模型常以一次性 demo 呈現，缺乏可比較、可重現的離線評估流程，導致排序品質、catalog 覆蓋率、多樣性與失敗模式在上線前難以被量化，baseline 退步也不易察覺。"
solution: "建立統一的 user-item interaction 基準格式與資料載入器，串接 DuckDB 儲存與實驗 runner；實作 popularity、item/user-based CF、SVD 矩陣分解、ALS/BPR 介面、content-based 與 hybrid 等模型，搭配 random／temporal／leave-one-out 確定性切分與完整排序指標，並以 FastAPI 提供 /api/v1 端點供雙語 React 儀表板呈現排行榜、分析工作台與失敗診斷。"
outcome: "完成一個可離線重現的全端評估平台，能跨 MovieLens、ListenBrainz、Amazon 等樣本資料以同一格式比較模型，產出 leaderboard 與 bad case 分析，並在 llama.cpp 不可用時以確定性 fallback 維持 UI 可用。"
highlights:
  - "統一 user-item 基準格式，可跨 MovieLens、ListenBrainz、Amazon 樣本與通用 CSV 評估"
  - "實作 Precision@K、Recall@K、MAP@K、nDCG@K、HitRate、Coverage、Diversity、Novelty 等完整排序指標"
  - "提供 popularity、item/user CF、SVD、ALS/BPR、content-based 與 hybrid 共多種 baseline 模型"
  - "random／temporal／leave-one-out 三種確定性切分，支援可重現的種子控制"
  - "React TypeScript 雙語（zh-TW／en-US）儀表板，含排行榜、分析工作台、推薦沙盒與 Failure Lab"
  - "整合本地 llama.cpp 進行指標解釋，並具備離線確定性 fallback"
challenges:
  - "設計能同時容納電商、音樂、評分等異質來源的單一互動 schema 與正規化載入器"
  - "在固定種子下保證 temporal／leave-one-out 切分與指標計算的可重現性"
nextSteps:
  - "以 optional implicit 路徑強化 ALS/BPR，使其超越 adapter MVP 階段"
  - "將離線指標與線上 A/B 驗證指標串接，補足離線 proxy 的盲點"
  - "擴充更大規模資料集載入與分散式實驗執行能力"
---
## 專案概述
推薦系統基準測試套件（Recommendation Benchmark Suite）是一個為推薦系統打造的離線評估工具箱，採 monorepo 架構，由 FastAPI + DuckDB 後端與 React TypeScript 雙語 benchmark 儀表板組成。設計目標是提供可比較、可重現的離線評估流程，而非一次性 demo。

## 技術架構
資料流為：樣本與使用者 CSV 經 dataset loaders 正規化為統一的 user-item interaction 格式，寫入 DuckDB，再由 experiment runner 驅動各 baseline 推薦模型，經 ranking evaluator 計算指標後寫回 DuckDB，最終透過 FastAPI `/api/v1` 提供給 React 儀表板。後端以 scikit-learn、pandas、Polars、numpy 實作建模與資料處理。

## 核心能力
模型涵蓋 popularity baseline、item/user-based 協同過濾、truncated SVD 矩陣分解、ALS/BPR adapter 介面、content-based 與 hybrid 加權組合。切分策略提供 random、temporal 與 leave-one-out 三種確定性方法，並以固定種子確保可重現。評估指標實作 Precision@K、Recall@K、MAP@K、nDCG@K、HitRate@K 以及 Coverage、Diversity、Novelty，並提供 bad case 分析（missed relevant、popularity bias、cold start、low diversity）。

## 前端與互動
前端預設 zh-TW、支援 en-US，所有導覽、表單、提示與詞彙皆存於 locale JSON。儀表板含 Overview、Dataset Explorer、Experiment Runner、Model Arena、Analytics Workbench、Metrics Explorer、Recommendation Sandbox、Failure Lab、Metric Lab 與 Guided Demo，提供指標熱力圖、K 敏感度、覆蓋率／多樣性權衡、popularity 曝光分析與實驗 traceability。視覺化以 Recharts，狀態與資料以 TanStack React Query 管理。

## 設計取捨
本套件定位為精簡 benchmark 而非分散式訓練系統，ALS/BPR 預設為 adapter 相容 MVP；離線指標被明確視為 proxy，需搭配線上驗證。指標解釋端點可呼叫本地 llama.cpp OpenAI 相容服務，並在其不可用時回傳確定性 fallback，確保離線情境下 UI 仍可用。
