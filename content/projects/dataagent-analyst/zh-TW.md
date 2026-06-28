---
title: "DataAgent Analyst：AI 代理資料分析與機器學習工作台"
tagline: "上傳 CSV，AI 代理自動完成 EDA、建模與洞察報告"
summary: "一個作品集等級的 AI 資料分析平台：使用者上傳 CSV 後，可自動進行欄位剖析、探索式資料分析、視覺化推薦、基準機器學習訓練與模型評估，並透過本地 LLM 與 LangGraph 多代理工作流生成可解釋的分析報告。後端採 FastAPI 分層架構，前端為純 JavaScript 模組化儀表板，並以 Docker Compose 整合 PostgreSQL、Qdrant 與 llama.cpp。"
role: "全端 / AI 應用工程師（獨立設計與開發後端、前端、代理工作流與部署）"
problem: "資料分析從清理、EDA、建模到撰寫報告涉及大量重複且零散的人工步驟，初學者難以串接完整流程，分析師也常缺少可重現、可解釋的工作流；同時許多 LLM 應用過度依賴雲端 API，缺乏可離線、可控成本的本地方案。"
solution: "建立一套以 FastAPI 分層架構（routes／schemas／services／core）為核心的後端，將欄位剖析、EDA、視覺化推薦、ML 訓練、模型評估、預測、SHAP 可解釋性等能力拆成獨立 service，再以 LangGraph 把 Planner、Profiler、Visualizer、Trainer、Explainer、Reporter 等代理組成可編排工作流，並支援非同步任務與進度串流；LLM 透過 OpenAI 相容介面接上本地 llama.cpp，可隨時停用以降級保護。前端以純 JavaScript 的 partials／features／components 模組化結構搭配 ECharts 呈現互動儀表板。"
outcome: "完成從資料上傳到自動化分析、模型訓練、可解釋性、漂移監控、報告與 backtest artifact 檢視的端到端流程，後端涵蓋多組 API 路由與 20 餘個 service，並有 25 個 pytest 測試檔、ruff／mypy 型別與風格檢查、Playwright UI backtest、完整 workflow backtest 與可重現示範資料；GitHub Pages 提供靜態互動 demo，以 fixture API 展示最新 UI、小幫手導覽與主要工作流。"
highlights:
  - "以 LangGraph 編排 Planner／Profiler／Visualizer／Trainer／Explainer／Reporter 六類代理，組成可重複執行的資料分析工作流，並支援非同步任務與進度事件串流"
  - "FastAPI 分層架構：core 集中設定、結構化錯誤回應、Request ID 與處理時間中介層，service 層清楚拆分職責、易於測試與擴充"
  - "整合 SHAP 模型可解釋性與本地 llama.cpp LLM（OpenAI 相容介面），LLM 可關閉並優雅降級，避免未啟動模型時整體失效"
  - "純 JavaScript 模組化前端：HTML partials 動態載入、navigation、bootstrap、全域 toast 與 DOM 契約檢查，搭配 ECharts 互動圖表"
  - "Docker Compose 整合 PostgreSQL、Qdrant 向量庫、llama.cpp 與 Nginx，並提供 CUDA 版 compose 以支援 GPU 推論"
  - "右側 inspector、next-action engine、workspace context persistence 與 19 步小幫手導覽，解決大型資料科學工作台容易迷路與反覆捲動的問題"
  - "完整工程化：uv、pytest（25 個測試檔）、ruff、mypy、Makefile、smoke test、Playwright UI backtest、完整 backtest suite 與示範資料產生器"
challenges:
  - "在 LangGraph 工作流中協調多個既有 service，同時保留每個工具的獨立性與可測試性，並把錯誤與步驟狀態彙整成一致的回傳格式"
  - "設計可關閉、可降級的本地 LLM 整合，讓系統在沒有 GPU 或模型未啟動時仍能正常運作"
  - "以純 JavaScript 維持模組化與可維護性，透過 partials 與 DOM 契約檢查避免前端隨功能增加而失控"
nextSteps:
  - "把 GitHub Pages fixture demo 延伸成更多資料集與模型情境，讓面試展示可切換不同 lifecycle case"
  - "完整串接 Phase 9 的 RAG 知識庫，將資料字典與歷史報告索引進 Qdrant 並提供帶引用的查詢"
  - "強化多使用者 workspace 權限、長任務佇列與 production model governance"
---
## 專案概觀

DataAgent Analyst 是一個作品集等級的 AI 資料分析與機器學習工作台。使用者上傳 CSV 後，平台會自動進行欄位型別推斷與剖析、探索式資料分析（缺值、重複、敘述統計、離群值與相關性）、視覺化圖表推薦、基準機器學習模型訓練與評估，最後由本地 LLM 與多代理工作流生成可解釋的 Markdown 分析報告。

## 架構與技術

後端以 Python 3.12 與 FastAPI 打造分層架構：`api` 負責路由、`schemas` 以 Pydantic v2 定義契約、`services` 封裝各項分析能力、`core` 集中設定、logging、錯誤處理與中介層。分析能力被切分為欄位剖析、EDA、視覺化、ML 訓練、模型評估／預測／註冊、特徵管線、SHAP 可解釋性與報告等獨立 service，便於測試與重組。

## AI 代理工作流

核心是以 LangGraph 建立的 `StateGraph` 工作流，將 Planner、Profiler、Visualizer、Trainer、Explainer 與 Reporter 等代理串成可編排的資料分析流程，並透過既有 service 實際執行各個工具。系統支援非同步代理任務與進度事件回呼，可即時回報每個步驟的狀態。LLM 透過 OpenAI 相容介面接上本地 llama.cpp，預設可關閉並在伺服器不可用時優雅降級。

## 前端與部署

前端為純 JavaScript 的模組化儀表板，採 HTML partials 動態載入，搭配 sidebar、top context bar、right inspector、section subnav、workspace context persistence 與 Apache ECharts 互動圖表，並以全域 toast 與 DOM 契約檢查維持可維護性。最新版本加入 19 步小幫手導覽，會跨 route 聚焦重要區塊並顯示底部說明。整體以 Docker Compose 整合 PostgreSQL、Qdrant、llama.cpp 與 Nginx，另提供 CUDA 版 compose 支援 GPU 推論；GitHub Pages 則部署靜態互動 demo，使用 fixture API 展示真實前端操作。

## 工程實踐

專案以 uv 管理依賴，並具備 pytest（25 個測試檔）、ruff、mypy、Makefile、smoke test、Playwright UI backtest、完整 backtest suite、backtest job runner 與可重現的示範資料產生器，文件以多階段 roadmap 記錄演進過程，展現從原型到產品級工程的完整脈絡。
