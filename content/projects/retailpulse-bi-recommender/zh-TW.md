---
title: "RetailPulse 零售 BI 與推薦平台"
tagline: "把交易資料變成可操作洞察與推薦的端到端資料產品"
summary: "RetailPulse 是一個零售電商資料產品，串接 ETL、DuckDB 分析倉儲、RFM 分群、Cohort 留存、購物籃關聯分析與三層推薦引擎，並擴充時序預測、深度學習客戶建模、NLP 商品向量與 A/B 測試。後端以 FastAPI 提供多組 API，前端以 Next.js 與 Streamlit 呈現互動儀表板，全程以 pytest 與 Playwright 驗證並用 Docker 部署。"
role: "獨立全端資料科學家／開發者，負責資料管線、建模、API、前端與部署全鏈路。"
problem: "零售業每天產生大量交易，卻難以回答「誰是最佳客戶、客戶是否回購、哪些商品一起賣、接下來該推薦什麼」，缺乏將資料轉成決策的端到端系統。"
solution: "建立 data-to-decisions 管線：清洗交易資料寫入 DuckDB 八張倉儲表，計算 RFM、Cohort、商品特徵，以 K-Means 分群與 Apriori 產出關聯規則，再透過 FBT→分群→熱門的三層串接推薦。額外加入 SARIMA/LSTM 銷售預測、自編碼器與梯度提升的客戶建模、SBERT/item2vec 商品向量與 A/B 測試框架，並以 FastAPI、Next.js、Streamlit 對外呈現。"
outcome: "在 Online Retail UCI 真實資料上，從 541,909 筆交易清洗到 397,884 筆，30 秒內完成完整管線；推薦引擎於 1,867 位客戶時序測試集達 Precision@10 = 0.0407（約隨機基準 14 倍）。交付 6+ endpoint 的 FastAPI、五頁 Streamlit 與多頁 Next.js 儀表板，並以 28 個 pytest 與 Playwright 端到端驗證、Docker 部署上線。"
highlights:
  - "以 DuckDB 建立八張分析倉儲表，串起 ETL→特徵→建模→服務的完整資料鏈路"
  - "三層推薦串接（購物籃關聯→RFM 分群熱門→全域熱門）處理冷啟動回退"
  - "以 Apriori 產出關聯規則（最高 Lift 24.03），並用時序 hold-out 評估 Precision/Recall/Coverage"
  - "擴充深度學習與時序：LSTM/SARIMA 預測、Autoencoder 異常、CLV 與流失分類"
  - "雙前端：Next.js（TanStack Query、Recharts、shadcn/ui、中英 i18n）＋ Streamlit BI 儀表板"
  - "以 Docker Compose 部署，pytest 與 Playwright 雙重驗證並附遠端 smoke 測試"
challenges:
  - "合成示範資料規模有限，使關聯規則與分群偏向示意，需誠實標註限制"
  - "推薦評估採時序切分但模型以全量資料訓練，覆蓋率僅 2.0% 且熱門回退易主導冷啟動"
  - "DuckDB 單寫入特性使 ETL 與 API 並行讀寫需謹慎設計"
nextSteps:
  - "導入完整 Online Retail UCI 資料並加入矩陣分解（SVD/ALS）協同過濾"
  - "改用 PostgreSQL 支援多寫入生產部署並建置 CI/CD"
  - "強化冷啟動推薦與線上 A/B 實驗評估推薦策略"
---
## 概述

RetailPulse 是一個面向零售與電商的 **data-to-decisions** 端到端資料產品。它把原始交易資料，經過 ETL 清洗後寫入 DuckDB 分析倉儲（八張表），再逐層計算 KPI、RFM 分群、Cohort 留存與購物籃關聯規則，最後透過推薦引擎與互動儀表板，把資料轉成可操作的商業決策。

## 建模與推薦

核心以 scikit-learn 的 K-Means（k=4，依質心排序標記 Champions／Loyal／At Risk／Lost）做 RFM 分群，以 mlxtend Apriori 產出單品關聯規則。推薦採三層串接：先用關聯規則找「常一起買」，再回退到同分群熱門商品，最後回退全域熱門以處理冷啟動。專案另擴充 SARIMA/ETS 與 LSTM 銷售預測、Autoencoder 客戶異常偵測、CLV 迴歸與流失分類（PyTorch），以及 item2vec／ALS／NMF 協同過濾與 SBERT／TF-IDF 商品向量。

## 服務與前端

後端以 FastAPI 提供健康檢查、KPI 概覽、客戶 RFM、熱門商品、客戶／商品推薦等多組 endpoint，並附 OpenAPI 文件。前端提供兩種呈現：Next.js 14（TypeScript、TanStack Query、Recharts、shadcn/ui、Tailwind、中英 i18n）的現代化儀表板，以及五頁 Streamlit BI 介面（KPI、RFM 散點、Cohort heatmap、關聯規則、互動推薦）。

## 工程與驗證

專案以 28 個 pytest 覆蓋資料清洗、RFM、購物籃與推薦核心邏輯，以 Playwright 進行桌面與行動端到端驗證並錄製操作影片，另含遠端部署 smoke 測試。整體以 Docker Compose 編排（ETL 一次性設定＋API／App 服務），並誠實記錄合成資料、評估近似與單寫入等限制與未來工作。
