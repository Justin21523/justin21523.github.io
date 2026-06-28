---
title: "Discord Clone 即時通訊平台"
tagline: "FastAPI + WebSocket 打造的全棧即時聊天系統"
summary: "以 FastAPI 與 SQLModel 為核心、原生 JavaScript ES Modules 前端構成的 Discord 仿作。後端採分層架構（routers / services / schemas），透過 WebSocket 實現即時聊天與在線狀態，並支援伺服器、頻道、私訊、表情回應、檔案上傳、角色權限、審核、稽核日誌與語音會話等 20 餘組 API。涵蓋 JWT 驗證、bcrypt 雜湊、CORS 與速率限制等安全實務。"
role: "全端開發者（獨立開發前後端、資料模型與架構設計）"
problem: "想完整實作一套類 Discord 的即時社群通訊系統，需同時處理即時雙向訊息、複雜的權限與審核模型，以及可維護的後端架構，並兼顧安全性與效能。"
solution: "後端以 FastAPI + SQLModel/SQLAlchemy 建立分層架構，將 API 路由、業務邏輯 Service 層與 Pydantic schema 解耦；以 WebSocket ConnectionManager 管理房間連線、在線狀態與速率限制；用 JWT + passlib(bcrypt) 處理驗證，並為高頻查詢欄位加索引、設定連線池與時間分頁。前端採原生 ES Modules 元件化渲染，免框架構成 SPA。"
outcome: "完成涵蓋伺服器/頻道/私訊/反應/檔案/在線/角色/審核/搜尋/通知/範本/稽核/語音等 20 餘組 REST 與 WebSocket API 的可運行原型，並落實環境變數化機密、CORS 收斂、輸入驗證與速率限制等安全強化。"
highlights:
  - "WebSocket ConnectionManager：房間連線追蹤、在線狀態廣播、每連線 10 秒 10 則的速率限制"
  - "清楚的後端分層：routers（API）→ services（業務邏輯）→ schemas（Pydantic 驗證），便於維護與測試"
  - "完整 Discord 領域模型：Guild、Channel、Role、Message、DM、Reaction、Thread、Ban/Mute/Timeout、AuditLog、VoiceSession 等 20+ 資料表"
  - "安全實務：JWT(python-jose)、bcrypt 密碼雜湊、機密改用環境變數、CORS 來源白名單、輸入清理"
  - "效能優化：SQLAlchemy QueuePool 連線池、高頻欄位索引、訊息歷史時間分頁"
  - "免框架前端：原生 ES Modules 元件化 SPA，啟動時自動探測可用 port"
challenges:
  - "即時雙向通訊的連線生命週期管理與斷線清理，並避免訊息洪水（速率限制）"
  - "在單一資料模型中同時支撐頻道訊息與私訊的反應/檔案關聯，並維持查詢效能"
  - "將早期硬編碼機密與寬鬆 CORS 重構為環境變數化與白名單的安全設定"
nextSteps:
  - "將前後端完整接線並補上 WebSocket 前端初始化"
  - "由 SQLite 遷移至 PostgreSQL 並導入 Alembic 資料庫遷移"
  - "補上自動化測試與 CI，並整合語音聊天的實際 WebRTC 串流"
---
## 專案概述

Discord Clone 是一套全棧即時通訊平台，重現 Discord 的核心體驗：多伺服器（Guild）、頻道與分類、即時聊天、私訊、表情回應、檔案分享、在線狀態與語音會話。後端以 **FastAPI + SQLModel/SQLAlchemy 2.0** 為核心，前端則以**原生 JavaScript ES Modules** 元件化構成單頁應用，刻意不依賴前端框架。

## 架構設計

後端採清晰的分層架構：routers 負責 API 端點、services 封裝業務邏輯、schemas 以 Pydantic v2 做輸入驗證與序列化，三者解耦以利維護與測試。即時功能由自製的 **WebSocket ConnectionManager** 驅動，負責房間連線管理、在線狀態廣播，以及每連線每 10 秒 10 則訊息的速率限制。資料層使用 SQLModel 定義 20 餘張資料表（Guild、Channel、Role、Message、DirectMessage、Reaction、Thread、Ban/Mute/Timeout、AuditLog、VoiceSession 等），並為高頻查詢欄位建立索引。

## 功能範圍

專案掛載超過 20 組路由，涵蓋驗證、伺服器、頻道、機器人、私訊、反應、檔案、在線狀態、討論串、角色權限、審核、釘選/星標、分類、搜尋、通知設定、伺服器範本、稽核日誌與語音聊天，並提供 /api/health 健康檢查與 Swagger 文件。

## 安全與效能

身分驗證採 **JWT（python-jose）** 搭配 **passlib/bcrypt** 密碼雜湊；機密改由環境變數載入，CORS 由寬鬆改為來源白名單，並加入輸入清理與速率限制。效能面則導入 SQLAlchemy QueuePool 連線池、索引與訊息歷史的時間分頁。

## 現況

後端原型已可運行，涵蓋完整領域模型與安全強化；前後端完整接線、PostgreSQL 遷移與 WebRTC 語音串流為後續工作。
