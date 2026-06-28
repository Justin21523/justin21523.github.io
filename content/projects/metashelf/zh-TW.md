---
title: "MetaShelf 書目資源探索平台"
tagline: "以圖書資訊學為基底、結合電商體驗的書目資源管理 MVP"
summary: "MetaShelf 是一個結合圖書資訊學（LIS）原則與現代電商瀏覽體驗的書目資源探索平台。後端以 FastAPI + 非同步 SQLAlchemy 建構，採 Clean Architecture 分層（Models／Schemas／Repositories／Services／API）；前端為 React 19 + Vite + Tailwind 的卡片式書目目錄。資料模型採 FRBR-lite，將 Resource（書目）與 Item（館藏件）分離，支援 ISBN、索書號、主題標目等專業 metadata。目前為 MVP 階段。"
role: "全端開發者（架構設計、後端 API、前端 UI）"
problem: "傳統圖書館目錄系統介面老舊、查詢體驗差，而一般書單工具又缺乏圖書資訊學的嚴謹 metadata（如 FRBR 層級、索書號、主題標目、權威控制）。如何兼顧 LIS 的專業性與現代電商般流暢的探索體驗，是本專案要解決的核心問題。"
solution: "後端採 FastAPI 搭配非同步 SQLAlchemy 2.0，依 Clean Architecture 切分 Domain／DTO／Repository／Service／API 五層，提升可測試性與可維護性；資料層採 FRBR-lite，將書目（Resource）與實體館藏（Item）分離，並為書目保留 ISBN、索書號、主題標目等專業欄位。前端以 React 19 + Vite + Tailwind v4 打造響應式卡片目錄，透過 TanStack Query 串接 REST API，支援深色模式與封面懶載入。"
outcome: "完成可運行的 MVP：資源列表與建立 API、Pydantic 驗證、SQLite 自動建表與種子資料腳本，以及具搜尋列占位、新書上架區塊的目錄前端。具備清楚的分層架構與升級至 PostgreSQL／多對多主題關聯／JWT 認證的擴充藍圖。"
highlights:
  - "Clean Architecture 五層分離（Models／Schemas／Repositories／Services／API），職責清晰、易於測試與擴充"
  - "採 FRBR-lite 資料模型，將書目 Resource 與實體館藏 Item 分離，保留 ISBN／索書號／主題標目等 LIS 專業 metadata"
  - "全程非同步：FastAPI + SQLAlchemy 2.0 async + aiosqlite，從 API 到 DB 端到端 async I/O"
  - "現代前端棧：React 19 + Vite + Tailwind CSS v4 + TanStack Query，卡片式響應式 UI 並支援深色模式"
  - "Repository 模式封裝資料存取，搭配 Pydantic v2 DTO 做請求／回應驗證"
  - "完整開發者體驗：種子腳本、Vite 代理、start_dev.sh 一鍵啟動前後端"
challenges:
  - "在 LIS 嚴謹性與 MVP 開發速度間取捨：以 FRBR-lite、主題標目暫存為逗號字串等簡化手段換取快速迭代"
  - "非同步 SQLAlchemy 2.0 的 session 與 engine 生命週期管理，以及啟動時自動建表的處理"
  - "規劃可平滑升級的架構（SQLite→PostgreSQL、字串作者→關聯式 Agent 權威控制）"
nextSteps:
  - "實作 Item 館藏管理與認證授權端點（OAuth2 Password Flow + JWT）"
  - "將主題標目與作者升級為多對多關聯表與 Agent 權威控制，並導入 Alembic 遷移"
  - "完善前端：實際串接搜尋、書目詳情頁、書單與分頁功能"
---
## 專案概述

MetaShelf 是一個**書目資源探索與交換平台**，以圖書資訊學（Library & Information Science, LIS）原則為基底，結合現代電商般流暢的瀏覽體驗。它讓使用者像逛線上書店一樣探索館藏，同時在底層保有圖書館等級的書目 metadata。

## 架構設計

後端嚴格遵循 **Clean Architecture**，切分為 Domain（SQLAlchemy 模型）、Schemas（Pydantic DTO）、Repositories（資料存取）、Services（業務邏輯）與 API（路由）五層，確保可擴充性、可維護性與可測試性。整體採用非同步技術棧：FastAPI + SQLAlchemy 2.0 Async + aiosqlite，達成端到端 async I/O。

## 資料模型

資料層採 **FRBR-lite**：將 Resource（對應 FRBR 的 Work／Manifestation，承載 ISBN、索書號、主題標目等書目 metadata）與 Item（對應 FRBR 的 Item，代表書架上的實體館藏件，含條碼、館藏位置、借閱狀態）分離。此設計在 LIS 嚴謹性與 MVP 開發速度間取得平衡，並預留升級至關聯式作者／主題權威控制的空間。

## 前端體驗

前端為 React 19 + Vite + TypeScript + Tailwind CSS v4 的卡片式書目目錄，透過 TanStack Query 串接 REST API、Axios 經 Vite 代理請求後端，並支援深色模式、封面懶載入與載入／錯誤狀態處理。

## 完成度

目前為 **MVP 階段**：已完成資源列表／建立 API、Pydantic 驗證、SQLite 自動建表與種子資料腳本，以及目錄前端。User／Item 模型與認證、館藏管理端點已規劃但尚待實作，是清楚展現全端架構能力的作品集專案。
