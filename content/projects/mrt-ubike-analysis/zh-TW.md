---
title: "MetroBikeAtlas：捷運與共享單車都市移動分析平台"
tagline: "整合 TDX 開放資料的捷運×YouBike×城市因子分析儀表板"
summary: "以台灣捷運與 YouBike 開放資料為核心的端到端資料工程與分析專案。採用 Bronze/Silver/Gold 分層資料湖，串接 TDX、Open-Meteo 與 OpenStreetMap，完成時空對齊、捷運站與單車站空間連結、相關性與分群分析，並以 FastAPI 與互動地圖儀表板呈現決策證據。"
role: "獨立開發者：資料管線、後端 API、分析方法與前端儀表板全端設計實作"
problem: "捷運與共享單車的使用受都市結構、可及性與時段行為強烈影響，但這些資料散落於不同開放平台、時空粒度不一，難以整合成可重現、可驗證的分析證據以支援都市與交通決策。"
solution: "建立 config 驅動、可重現的分層資料湖（Bronze 原始快照、Silver 清洗對齊、Gold 特徵與分析）；以節流與 429 處理的 TDX 客戶端持續擷取單車即時資料形成時間序列，並以緩衝區/最近 K 站方法建立捷運與單車空間連結。分析層以 NumPy 自行實作相關性、線性迴歸、KMeans 分群與站點相似度，產出捷運站功能分類。最後以 FastAPI 提供 REST 與 SSE，搭配 Leaflet/Chart.js 多頁式簡報型儀表板。"
outcome: "完成可一鍵執行的 Bronze→Silver→Gold 管線、Docker 長時運行部署、SSE 心跳避免代理斷線，並具備 Silver 資料品質契約驗證與 Playwright UI 煙霧測試與截圖；提供站點時間序列、鄰近單車、相似站點等 API，支援 demo 與 real 雙模式。"
highlights:
  - "Bronze/Silver/Gold 醫療分層（medallion）資料湖，config 驅動、可重現"
  - "TDX 持續擷取器具備節流與 429 退避，將即時單車資料累積為時間序列"
  - "NumPy 手刻相關性、線性迴歸、KMeans 與站點相似度，捷運站功能分類"
  - "捷運與單車空間連結支援緩衝半徑與最近 K 站兩種方法及時空對齊"
  - "FastAPI + Leaflet/Chart.js 多頁式簡報儀表板，含 demo/real 雙模式與資料新鮮度標示"
  - "Docker 長運行、SSE 心跳、資料品質契約驗證與 Playwright 煙霧測試/自動截圖"
challenges:
  - "缺乏站級即時客流時，以鄰近單車租借變化推導客流代理指標"
  - "多來源（TDX、Open-Meteo、OSM Overpass）時空粒度不一致需統一對齊與驗證"
  - "在反向代理/Docker 環境下維持 SSE 連線穩定，需處理代理標頭與心跳"
nextSteps:
  - "導入政策模擬（如新增 YouBike 站點）與多城市比較"
  - "整合人口普查與社經資料強化都市因子分析"
  - "擴充時間序列分解與更完整的客流模型"
---
## 專案概述

MetroBikeAtlas 是一個以台灣捷運（MRT/軌道）與 YouBike 共享單車開放資料為核心的都市移動分析專案，結合資料工程管線與互動式網頁儀表板。它探討都市結構、可及性、POI 密度與時段行為如何影響捷運客流與單車使用，適用於智慧城市研究、都市規劃與交通政策評估。

## 架構與資料流

專案採用 Bronze/Silver/Gold 分層資料湖（medallion architecture）：Bronze 保存 TDX 原始快照、Silver 完成清洗與時空對齊、Gold 產出站級特徵與分析結果。資料來源串接交通部 TDX、Open-Meteo 天氣與 OpenStreetMap Overpass POI。持續擷取器（collector）內建節流與 429 退避機制，反覆擷取單車即時可用量以累積成時間序列，並可週期性重建 Silver。

## 分析方法

分析層刻意以 NumPy 從零實作相關性分析、線性迴歸、KMeans 分群與站點相似度，將捷運站依移動與環境特徵分類為功能型態。空間整合支援緩衝半徑與最近 K 站兩種捷運與單車連結方法，時間對齊支援 15 分鐘／小時／日粒度與滾動視窗。當缺乏站級即時客流時，系統以鄰近單車租借變化推導代理指標。

## 後端與前端

FastAPI 提供 REST 與 Server-Sent Events，端點涵蓋站點時間序列、鄰近單車、相似站點與分析總覽，並支援 demo（免憑證）與 real（讀取 Silver）雙模式。前端為多頁式簡報型儀表板（首頁、洞察、探索、營運、方法說明），以 Leaflet 地圖與 Chart.js 圖表呈現，並在標頭顯示資料新鮮度與建置代碼。

## 工程品質

專案具備 config 驅動設計、Silver 資料品質契約驗證、Docker 長時運行部署（含 SSE 心跳避免代理斷線）、pytest 測試套件與 Playwright UI 煙霧測試與自動截圖，體現可重現性優先與擷取／處理／分析清楚分層的設計原則。
