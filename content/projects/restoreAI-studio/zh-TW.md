---
title: "RestorAI Studio — AI 影像修復與超解析平台"
tagline: "一套打通 Web、API、CLI 的 AI 影像修復與超解析工具原型"
summary: "RestorAI Studio 是以 PyTorch 為核心、整合 Real-ESRGAN 超解析、GFPGAN/CodeFormer 人臉修復與 RIFE 影格插補的影像/影片增強平台原型。提供 Gradio 網頁、FastAPI REST API、CLI 與 PyQt 桌面四種介面，並具備分塊推論、非同步任務佇列、批次處理、安全過濾與 Prometheus 監控等模組化管線。"
role: "獨立開發者（架構設計、後端 API、推論管線與多介面整合）"
problem: "一般影像修復工具往往綁定單一介面、模型權重各專案重複下載佔用磁碟，且缺乏批次、任務追蹤與部署所需的工程化結構，難以從 Demo 走向可維運的服務。"
solution: "以 BaseProcessor 抽象類統一各模型（ESRGAN/GFPGAN/RIFE）的載入、推論、記憶體管理與分塊處理介面；後端用 FastAPI 拆分 jobs、batch、video、safety、metrics、admin 等路由，搭配 ThreadPoolExecutor 任務佇列與磁碟日誌；並導入集中式「AI Warehouse」共享模型倉，讓權重跨專案共用。前端同時提供 Gradio、靜態 Web、PyQt 桌面與 CLI 多入口。"
outcome: "完成可透過單一 run.py 切換 UI／API／CLI 的原型，具備健康檢查、Prometheus 指標、安全過濾與 Docker 部署設定；部分模組（pipeline、gfpgan、rife 載入器）仍為骨架，屬功能驗證階段的原型。"
highlights:
  - "以抽象基底類別統一影像/影片處理器，支援 FP16 與分塊推論處理大圖記憶體"
  - "FastAPI 後端模組化拆分十餘個路由（任務、批次、影片、安全、指標、匯出、歷史）"
  - "ThreadPoolExecutor 非同步任務佇列，含進度回呼、事件回呼與磁碟 journaling 復原"
  - "集中式 AI Warehouse 設計，模型權重跨專案共享以節省磁碟"
  - "四種使用介面：Gradio、靜態 Web、PyQt 桌面與 CLI，皆共用同一推論核心"
  - "內建 NSFW／人臉模糊安全過濾、Prometheus 指標端點與 Docker 部署設定"
challenges:
  - "跨多介面（Web/API/CLI/Desktop）共用同一套推論核心並保持狀態一致"
  - "大圖與影片在有限 VRAM 下的分塊推論與記憶體釋放策略"
  - "真實模型權重與環境相依（CUDA nightly、basicsr/realesrgan）導致可重現性與部署複雜度"
nextSteps:
  - "補完 pipeline、GFPGAN、RIFE 等仍為骨架的模型載入與推論實作"
  - "將 in-memory／ThreadPool 任務佇列升級為已宣告的 Celery + Redis 以利水平擴展"
  - "收斂依賴版本（PyTorch nightly、PyQt5/6 不一致）並補強自動化測試與 CI"
---
## 專案概述

RestorAI Studio（程式內部代號 RestorAI MVP）是一套以 **PyTorch** 為核心的 AI 影像／影片修復與超解析平台原型，整合 **Real-ESRGAN** 超解析、**GFPGAN / CodeFormer** 人臉修復，以及 **RIFE** 影格插補。專案目標是把單純的模型 Demo，工程化為具備多介面、任務佇列與可部署結構的服務雛形。

## 架構設計

核心 `core/base.py` 以 `BaseProcessor` / `ImageProcessor` / `VideoProcessor` 抽象類別統一各模型的載入、推論、記憶體量測與**分塊（tiling）推論**介面；`ESRGANProcessor` 為目前較完整的實作，支援 FP16 與自動裝置選擇。後端 `api/` 以 **FastAPI** 模組化拆分為 jobs、batch、video、safety、metrics、admin、exports、history 等十餘個路由，並由 `ThreadPoolExecutor` 任務佇列搭配 `jobs_journal.jsonl` 磁碟日誌提供進度追蹤與復原。

## 多介面與工程化

單一進入點 `run.py` 可切換 **Gradio 網頁 UI、FastAPI REST API、CLI**，另有 **PyQt 桌面** 與靜態 Web 前端，皆共用同一推論核心。專案導入集中式「**AI Warehouse**」設計，將模型權重集中於 `~/ai-warehouse` 供跨專案共享；並內建 NSFW／人臉模糊安全過濾、Prometheus 指標端點、健康檢查、pytest 測試與 Docker／docker-compose 部署設定。

## 原型狀態

誠實標示：此為**原型（prototype）**。部分模組（`core/pipeline.py`、`core/gfpgan.py`、`core/rife.py` 的權重載入器）仍為骨架佔位；`jobs.py` 存在重複的 Job 定義，且 requirements 宣告了 Celery／Redis／Flower 但實際任務系統採行程內 ThreadPool，依賴版本（CUDA nightly、PyQt5 與 PyQt6 並存）亦待收斂。整體已驗證多介面與管線架構可行，下一步聚焦補完模型實作與部署穩定性。
