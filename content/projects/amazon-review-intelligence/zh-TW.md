---
title: "Amazon Review Intelligence"
tagline: "以評論資料驅動的商品搜尋、推薦與分析資料產品。"
summary: "Amazon Review Intelligence 結合 Amazon Reviews 2023、BM25、vector search、reranker、review summarization、sentiment / aspect mining、similar product search、recommendation API 與 dashboard，展示真實 AI product 會需要的搜尋、推薦、NLP、API、前端與評估能力。"
role: "獨立開發者"
problem: "Amazon 商品頁有大量評論，但使用者很難快速理解商品優缺點、評論情緒與相似商品關係；單靠平均星等也不足以支援搜尋、比較與推薦決策。"
solution: "建立一個以評論為核心的資料產品：用 DuckDB 管理商品與評論資料，FastAPI 提供搜尋與推薦 API，並用 Next.js 儀表板呈現 hybrid search、商品摘要、情緒分析、推薦結果與模型評估。"
highlights:
  - "**Hybrid Search** — BM25 lexical + sentence-transformer vector search with configurable alpha blending"
  - "**Review Intelligence** — per-product summaries, pros/cons extraction, sentiment distribution"
  - "**Recommendation** — popularity, content-based, item-item, and cold-start strategies"
  - "**REST API** — FastAPI with 8 endpoints, OpenAPI docs at `/docs`"
challenges:
  - "在 BM25 與 sentence-transformer 向量搜尋之間設計可調權重，讓關鍵字精準度與語意召回能同時被觀察。"
  - "在不能重新散布原始 Amazon review dump 的限制下，只公開程式、文件、合成樣本與聚合指標。"
nextSteps:
  - "補上公開 Demo 連結與更完整的 walkthrough 影片。"
---
Amazon Review Intelligence 是一個以評論為核心的商品搜尋與推薦資料產品。它結合 Amazon Reviews 2023 category subset、BM25、vector search、reranker、review summarization、sentiment / aspect mining、similar product search 與 recommendation API，目標是展示真實 AI product 會需要的搜尋、推薦、NLP、API、dashboard 與評估能力。

這個專案把評論資料整理成可查詢、可比較、可評估的產品體驗。後端以 Python、DuckDB 與 FastAPI 組成資料與 API 層，前端以 Next.js 呈現商品搜尋、評論摘要、推薦、比較、embedding cluster、pipeline 與 evaluation 頁面。專案同時保留 pytest 與 Playwright 驗證，讓資料處理、API contract 與主要前端流程可以被重跑檢查。

作品集卡片要呈現的重點是：這不是單純的 dashboard，而是一個從 ingestion、indexing、retrieval、recommendation、evaluation 到操作介面的完整資料產品練習。
