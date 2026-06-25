---
title: "RetailPulse BI Recommender"
tagline: "零售商業智慧、推薦系統與 ML 分析平台。"
summary: "RetailPulse BI Recommender 是一個端到端零售資料產品，整合 ETL、DuckDB 分析倉儲、FastAPI、Next.js dashboard、RFM 分群、購物籃分析、推薦系統、銷售預測、ML 洞察與 A/B 測試。"
role: "獨立開發者 / 全端資料產品實作者"
problem: "零售交易資料通常分散在訂單、客戶、商品與行銷實驗中，難以快速回答營收趨勢、客戶價值、商品關聯與推薦策略成效。"
solution: "我建立 Python + DuckDB 資料管線，透過 FastAPI 提供分析與推薦 API，並用 Next.js 建立可互動 dashboard；同時以 Playwright 驗證桌面與手機導覽、功能流程、截圖與錄影紀錄。"
outcome: "專案已部署到遠端 /projects/retailpulse-bi-recommender，Docker API 與 frontend 容器可在 server 內健康運行，README 也包含 Playwright 驗證截圖與完整錄影。"
highlights:
  - "Next.js + FastAPI + DuckDB 建立完整零售 BI 與推薦系統。"
  - "支援 Dashboard、Customers、Cohort、Basket、Recommendations、Forecast、ML Insights、A/B Testing、Upload 與 Tour。"
  - "Playwright 驗證桌面功能流程、手機導覽、分段截圖與完整錄影。"
  - "Docker 化部署到 /projects/retailpulse-bi-recommender，API health 與 frontend proxy 已在遠端驗證。"
challenges:
  - "需要讓 DuckDB API 在多個分析頁面與 ML endpoint 下保持穩定。"
  - "需要為長頁面與手機畫面建立可重複的截圖驗證流程。"
  - "遠端 server SSH 連線不穩，部署時需要分小批次上傳與續傳。"
nextSteps:
  - "補上 portfolio 反向代理或公開路由，讓 live demo 從主網域穩定進入。"
  - "增加 CI/CD，自動跑 pytest、build 與 Playwright smoke tests。"
  - "加入更多真實資料集評估與推薦指標追蹤。"
---
RetailPulse BI Recommender 是一個把零售交易資料轉成可操作決策系統的全端資料產品。它不是只展示單一模型，而是把資料清理、分析倉儲、API、dashboard、推薦邏輯、預測與實驗分析串成一個完整流程。

這個專案的重點在於資料產品化：使用者可以從 dashboard 查看營收與商品表現，到 Customers 頁面檢查 RFM 分群，再進入推薦、預測、ML 洞察與 A/B 測試頁面做更細的分析。專案也附有 Playwright 驗證成果，包含桌面與手機截圖、功能流程與完整操作錄影。
