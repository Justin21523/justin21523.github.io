---
title: "TripScore 可解釋旅遊目的地評分推薦系統"
tagline: "整合交通、天氣與偏好的規則式可解釋景點推薦引擎"
summary: "TripScore 是一套以資料為核心的旅遊決策引擎，給定出發地、時間窗與偏好後，整合 TDX 交通開放資料、Open-Meteo 天氣與地區情境因子，為候選景點計算可解釋的加權合成分數並排序。採規則式評分優先（可解釋先於機器學習），所有權重門檻走 config，並提供 CLI、REST API、Jinja2 網頁 UI 與 Docker always-on 擷取守護程序。"
role: "獨立開發者（資料管線、後端 API、評分模型與前端網頁全端設計）"
problem: "「我下午有四小時，台北該去哪？」這類旅遊決策需同時權衡交通可達性、天氣、人潮與個人偏好，但這些資料分散於不同 API、口徑不一，且多數推薦工具是黑箱、無法說明為什麼推薦這個地點。"
solution: "建立 ingestion→features→scoring→recommender→api→web 的模組化管線：ingestion 只負責擷取 TDX（公車／捷運／YouBike／停車）與天氣資料並快取；features 將原始資料轉為可比較的 0..1 分數（可達性、天氣、偏好、情境）；scoring 以 config 權重合成並附上理由；最後輸出 Top N 與完整分數拆解，前端以地圖證據層與決策簡報呈現。"
outcome: "完成 Phase 1 MVP：30+ 台北景點目錄、四大評分構面、可解釋分數拆解、CLI／REST／網頁三種入口、Leaflet 證據地圖、Docker Compose always-on 擷取守護程序與資料品質報告，並具 13 個測試與速率限制／重試／快取等生產化機制。"
highlights:
  - "模組化資料管線：嚴格分層 ingestion／features／scoring／recommender，職責清晰、易測易改"
  - "可解釋評分：每個推薦皆附構面分數與文字理由，並支援 per-request 權重覆寫與情境預設"
  - "TDX 整合韌性：OAuth client-credentials、批次分頁擷取、速率間隔、指數退避重試與 stale-if-error 快取"
  - "always-on 擷取：Docker Compose 背景守護程序持續刷新可用性資料，含日誌輪替與資料品質／覆蓋率監控"
  - "八頁敘事式網頁 UI（Plan／Results／Evidence Map／Data 等）與 Copy diagnostics 可觀測性"
  - "config 驅動：所有權重、半徑、門檻與預設集中於 defaults.yaml，避免 hard-code"
challenges:
  - "TDX 各城市資料 schema 不一致、欄位缺漏（如 service_time），需設計本地 details 合併與 OSM/Nominatim 補強"
  - "外部 API 的 429 速率限制與不穩定，需在 fail-open（缺資料仍給最佳推薦）與資料新鮮度間取得平衡"
nextSteps:
  - "導入 Phase 2 預測訊號：以歷史時段基準預估人潮／交通風險與單車可用性"
  - "擴充景點目錄與多城市支援，加入評估流程（離線健全性檢查與案例研究）"
  - "加入使用者輪廓、儲存偏好與回饋迴路（Phase 3 產品化）"
---
## 專案概述

TripScore 是一套**規則式、可解釋**的旅遊目的地評分與推薦系統。它回應的是日常旅遊決策難題——例如「我下午有四小時，台北該去哪？」或「週末想去戶外但要避雨避塞車」——將交通可達性、天氣適宜度、偏好匹配與地區情境等多項訊號，整合為透明、可說明的合成分數。

## 架構與資料流

系統採嚴格分層的資料管線：`ingestion → features → scoring → recommender → api → web`。Ingestion 層只負責擷取 TDX 交通開放資料（公車站、捷運站、YouBike 站與即時可用性、停車場）與 Open-Meteo 天氣，並透過檔案快取降低 API 呼叫；features 層將原始資料轉為可比較的 0..1 分數；scoring 層以 config 權重合成並產生理由；recommender 層負責候選生成、排序與編排輸出。核心設計原則是「ingestion 不偷做 scoring、features/scoring 不直接打外部 API」，讓系統好測、好改、好除錯。

## 可解釋性與可調參

第一版刻意採規則式加權評分而非機器學習——先做到可解釋，再談預測模型。所有權重、半徑與門檻集中於 `defaults.yaml`，並支援情境預設集（如 rainy_day_indoor）與 per-request 的 `settings_overrides`。每個推薦結果都附帶四大構面分數與文字理由，使用者能清楚知道「為什麼是這個地點」。

## 工程化與部署

後端以 FastAPI + Pydantic v2 建構 REST API，搭配 Jinja2 server-rendered 的八頁敘事式網頁 UI 與 Leaflet 證據地圖。TDX 擷取具備 OAuth、批次分頁、速率間隔、指數退避重試與 stale-if-error 快取等韌性機制；Docker Compose 提供 always-on 的背景擷取守護程序（含日誌輪替）與資料品質／覆蓋率報告。專案另含 CLI 入口、Jupyter notebook 教學、13 個 pytest 測試與 ruff 靜態檢查，展現完整的生產化思維。
