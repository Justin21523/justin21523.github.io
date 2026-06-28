---
title: "urban-analytics-core 都市分析共用核心"
tagline: "為五個台灣都市分析專案抽取的共用基礎設施套件"
summary: "將分散在五個台灣都市分析專案（交通壅塞、捷運/YouBike、景點評分、通勤可靠度、圖書館可及性）中重複的基礎程式碼，抽取整併為單一可安裝的 Python 套件。提供統一的 TDX OAuth 認證與具速率限制/重試的 HTTP 客戶端、Pydantic 設定載入、日誌、TTL 快取、SQLite/DuckDB 儲存後端、FastAPI 應用工廠與地理/時間工具，消除跨專案的重複實作。"
role: "獨立開發者：架構設計、模組抽取與整併、套件化"
problem: "五個獨立專案各自重複實作了 TDX 客戶端、設定系統、日誌、快取、地理/時間工具與 FastAPI 啟動樣板，造成維護成本高、行為不一致與 bug 重複修補。"
solution: "以 src-layout 打包成 urban-analytics-core，將共用關注點抽離為獨立模組（tdx、settings、logging_cfg、cache、utils、api、storage），各專案改以 editable 安裝引用，並用 optional-dependencies 區分核心與重型相依（DuckDB/SciPy）。"
outcome: "五套 TDX 客戶端整併為一套、五套設定系統與日誌、三套快取與地理/時間工具收斂為單一可信來源；具備自動 Token 更新、指數退避加抖動的重試、Retry-After 處理與 401 強制刷新等可靠性機制。"
highlights:
  - "TDX OAuth2 client-credentials 認證，含記憶體 Token 快取與安全邊際自動更新"
  - "HTTP 客戶端內建指數退避＋抖動重試、429 Retry-After 解析與最小請求間隔節流"
  - "Pydantic v2 設定 + YAML 深層合併 + 環境變數覆寫的分層設定載入"
  - "FastAPI 應用工廠，內建 CORS、TTL 回應快取與每 IP 滑動視窗速率限制中介層"
  - "雙儲存後端：SQLite（WAL 模式）做參考資料與中繼資料、DuckDB+Parquet 做大型時序分析"
  - "無 GIS 相依的輕量地理工具（haversine）與 Asia/Taipei 時區正規化"
challenges:
  - "在五個既有專案間調和不一致的介面與行為，設計出彼此皆可共用的抽象"
  - "以 optional-dependencies 隔離 DuckDB/SciPy 等重型相依，讓輕量使用者免於安裝負擔"
nextSteps:
  - "補齊測試覆蓋（已配置 pytest/pytest-asyncio）並導入 CI"
  - "發佈為可版本控管的內部套件並讓五個下游專案逐步遷移引用"
---
## 專案概觀

`urban-analytics-core` 是一個共用基礎設施 Python 套件，從五個台灣都市分析專案（`traffic-pulse` 道路壅塞、`mrt-ubike-analysis` 捷運/YouBike、`tripscore` 景點評分、`commute-reliability-analysis` 通勤可靠度、`library-reach-analysis` 圖書館可及性）中抽取重複程式碼整併而成，目標是建立單一可信來源、消除跨專案重工。

## 技術設計

套件採 src-layout 與 setuptools 打包，相依以 Pydantic v2、httpx、FastAPI/Starlette/Uvicorn、pandas/numpy 為核心，並透過 `optional-dependencies` 將 DuckDB、SciPy 等重型套件設為選用。模組依關注點切分為 `tdx`（認證＋客戶端）、`settings`、`logging_cfg`、`cache`、`utils`、`api`、`storage`。

## 可靠性機制

TDX 整合面對外部 API 的不穩定，實作了記憶體 Token 快取與安全邊際自動更新、指數退避加隨機抖動的重試、429 的 `Retry-After` 解析、401 時強制刷新 Token，以及可設定的最小請求間隔節流，確保大量抓取下的穩定性。

## 資料與服務層

儲存層提供 SQLite（WAL 模式，存參考資料與執行中繼資料）與 DuckDB+Parquet（存大型時序觀測，供分析查詢）兩種後端；API 層提供標準化 FastAPI 工廠，內建健康檢查、CORS、TTL 回應快取與每 IP 滑動視窗速率限制中介層，並可掛載靜態前端。

## 現況

目前為 0.1.0 版、個人專案性質，採 editable 安裝供下游專案引用；已配置 ruff 與 pytest 工具鏈，後續以補測試、CI 與下游遷移為主。
