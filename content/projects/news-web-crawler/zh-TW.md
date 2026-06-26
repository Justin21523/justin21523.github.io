---
title: "News Web Crawler"
tagline: "新聞爬蟲、資料品質、文字探勘與 ML diagnostics 的端到端分析平台。"
summary: "News Web Crawler 是一個把台灣新聞資料從 crawler、清理、SQLite/FTS、NLP、EDA、文字探勘到 ML diagnostics 串成瀏覽器工作台的資料產品。作品集版本包含公開 demo、GitHub、README、導覽錄影與 Playwright 截圖證據。"
role: "獨立開發者 / 全端資料產品實作者"
problem: "新聞資料專案常停在爬蟲或 notebook 分析，缺少能讓人檢查資料品質、重跑 pipeline、探索文章、比較模型並輸出報表的完整操作介面。"
solution: "我用 FastAPI + SQLite 建立 API 與背景 jobs，用 Next.js 建立資料品質、EDA、文字探勘、文章搜尋、ML diagnostics 與報表頁面，並用 Playwright 產生截圖與 guided-tour 錄影作為作品集證據。"
outcome: "專案已補齊遠端 demo、GitHub、README、demo 錄影與截圖素材；作品集卡片可直接連到可操作的新聞資料分析 demo。"
highlights:
  - "FastAPI backend 提供 articles、stats、data quality、analysis、text mining、ML diagnostics 與 jobs API。"
  - "Next.js dashboard 支援 guided assistant，能引導使用者走完上傳、pipeline、分析、搜尋與報表流程。"
  - "文字探勘整合 TF-IDF、n-gram、topic modeling、cluster、collocation、entity 與 co-occurrence network。"
  - "ML diagnostics 支援 baseline model、decision tree、artifact、error samples 與 portfolio report export。"
  - "Playwright 產生桌面/手機截圖與 guided-tour.webm，方便在作品集卡片與 README 直接展示。"
challenges:
  - "需要把原本偏 CLI/pipeline 的資料工程專案整理成可公開瀏覽的產品介面。"
  - "需要讓 demo 在 portfolio reverse proxy 的 /p/news-web-crawler/ 子路徑下正常處理 route、API 與靜態資源。"
  - "需要把截圖、錄影、GitHub、README 與 live demo 連結整理成一致的作品集 evidence。"
nextSteps:
  - "把遠端 smoke test 納入部署流程，確認 /p/news-web-crawler/ 與 /api/v1/health 都正常。"
  - "增加更多真實新聞資料集與資料來源健康檢查。"
  - "補強 ML 報表樣板與人工標註資料，降低弱監督 sentiment 的限制。"
---
News Web Crawler 的重點不是單一 crawler，而是把新聞資料從取得到分析、品質檢查、模型診斷與報表輸出整理成一個可以操作的資料工作台。

我把 backend 拆成 FastAPI services 與 pipeline jobs，讓 crawler、sample demo、analysis、text mining、ML training 和 report export 都能從 UI 觸發。Frontend 則以 dashboard 方式呈現：首頁看 pipeline 狀態，Data Quality 檢查缺漏與錯誤，Analysis 看趨勢與來源，Text Mining 探索 keyword/entity/topic/cluster，Articles 搜尋與 facet，ML 頁面比較 baseline models，Reports 頁面輸出可保留的 portfolio evidence。

作品集版也補上完整公開證據：Live Demo、GitHub、README、demo 錄影、cover image 與多張 Playwright 截圖。這讓瀏覽者不用猜專案長什麼樣子，也能直接看到平台如何操作。
