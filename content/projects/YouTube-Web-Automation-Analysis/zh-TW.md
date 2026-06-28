---
title: "YouTube 網路自動化分析平台"
tagline: "整合 API 擷取、網頁爬蟲與 LLM/RAG 的 YouTube 智慧分析平台"
summary: "以 FastAPI 與非同步 SQLAlchemy 打造的 YouTube 數據平台，結合 YouTube Data API v3 與 Playwright/Selenium 爬蟲雙軌擷取，並透過 Celery + Redis 進行任務排程。內建情感分析、主題建模、字幕擷取，以及 RAG 檢索、VQA、對話式 AI 等 LLM 能力，採分層 Clean Architecture 與 Repository 模式，可容器化部署並含 Prometheus/Grafana 監控。"
role: "全端／後端開發者（架構設計與實作）"
problem: "YouTube 數據分散且受 API 每日配額限制，純 API 擷取易遇到配額耗盡與部分公開資料無法取得的問題；同時原始留言、字幕等非結構化文本缺乏可查詢、可推理的分析層，難以快速洞察頻道趨勢與觀眾情緒。"
solution: "設計 API 優先、爬蟲備援的雙軌資料擷取架構，搭配速率限制與配額追蹤；以 Celery + Redis 將擷取、分析、嵌入等工作非同步分佇列處理。資料層採非同步 SQLAlchemy 與 Repository 模式，AI 層提供統一 LLM 客戶端（OpenAI／LLMVendor LLMProvider／本地模型）並建立 RAG 檢索、VQA、對話與字幕服務，全部以 FastAPI 路由暴露並可容器化部署。"
outcome: "完成可運作的分層後端骨架：資料模型、Repository、服務層、API 路由、Celery 任務與 Docker/監控堆疊均已就位；情感分析、主題建模與 RAG／VQA／Chat 等功能模組依特性旗標可選擇啟用，具備擴充至完整資料管線的基礎。"
highlights:
  - "API 優先、Playwright/Selenium 爬蟲備援的雙軌擷取，含速率限制與每日配額追蹤"
  - "Celery + Redis 多佇列（scraping／analysis／priority）非同步任務編排，並以 Flower 監控"
  - "分層 Clean Architecture：domain／services／infrastructure repositories／api routers 明確分離"
  - "統一 LLM 客戶端抽象，支援 OpenAI、LLMVendor LLMProvider 與本地模型，串接 RAG、VQA、Chat 服務"
  - "以 transformers／sentence-transformers／spaCy／scikit-learn 實作情感分析與主題建模"
  - "完整容器化（docker-compose）與 Prometheus + Grafana 監控、Nginx 反向代理"
challenges:
  - "在 API 配額限制與爬蟲反偵測之間取得平衡，需設計自適應速率限制與隱身模式"
  - "跨多個非結構化來源（留言、字幕、影格）建立一致的 RAG 嵌入與檢索流程"
nextSteps:
  - "完成 YouTube Data API 客戶端與爬蟲備援的端到端資料管線（ETL）"
  - "擴充向量檢索與評測，提升 RAG 回答品質與引用準確度"
  - "補齊整合測試與生產環境部署自動化"
---
## 專案概述

YouTube 網路自動化分析平台是一套以 **FastAPI** 與非同步 **SQLAlchemy 2.0** 打造的數據分析後端，目標是把分散在 YouTube 上的頻道、影片、留言與字幕資料，轉化為可查詢、可推理的分析資產。專案採用 API 優先、網頁爬蟲備援的雙軌擷取策略，並在其上疊加情感分析、主題建模與多項 LLM 能力。

## 架構設計

程式碼遵循分層的 Clean Architecture，明確切分 `domain`（模型與介面）、`services`（業務邏輯）、`infrastructure`（Repository、YouTube 客戶端、Celery 任務）與 `api`（FastAPI 路由）四層，並以 Repository 模式封裝型別安全的資料存取。資料擷取結合 **YouTube Data API v3** 與 **Playwright/Selenium** 爬蟲備援，內建速率限制、配額追蹤與反偵測機制。

## 非同步與任務編排

以 **Celery + Redis** 將擷取、分析與嵌入等耗時工作切分到 scraping／analysis／priority 等多個佇列非同步執行，搭配 Beat 排程與 Flower 監控；API 層另提供 WebSocket 即時推播任務進度。

## AI 與分析能力

專案提供統一的 LLM 客戶端抽象，可切換 OpenAI、LLMVendor LLMProvider 或本地模型，並在其上建構 RAG 檢索、視覺問答（VQA）、對話式 AI 與字幕服務；NLP 層則以 transformers、sentence-transformers、spaCy 與 scikit-learn 實作情感分析與主題建模。

## 部署與監控

整套服務透過 docker-compose 容器化（API、Celery worker/beat、Flower、Redis），並配置 Nginx 反向代理與 Prometheus + Grafana 監控堆疊，具備邁向生產環境的基礎。目前處於積極開發階段，後端骨架與多數功能模組已就位，資料管線端到端串接仍在持續完善中。
