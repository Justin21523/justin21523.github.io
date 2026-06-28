---
title: "RestorAI Studio — AI 影像修復與超解析展示工作台"
tagline: "可公開展示的 AI 影像修復產品 Demo，含 before/after、任務流程與 mock-safe 推論模式"
summary: "RestorAI Studio 是一套 AI 影像修復與超解析平台原型，將 Real-ESRGAN、GFPGAN/CodeFormer、RIFE 等模型服務架構整理成可讓使用者直接操作的作品集 Demo。公開版以瀏覽器 Canvas 模擬推論流程，不依賴 GPU 或模型權重；本機則提供 FastAPI + Pillow 的 smoke-safe API，用來驗證上傳、處理與回傳流程。"
role: "獨立開發者（產品展示設計、前端 demo、FastAPI demo API、CI/CD、文件與 portfolio 整合）"
problem: "原專案具備 AI 影像修復服務的架構雛形，但真模型依賴大型權重、GPU 與版本敏感套件，對使用者而言不容易快速啟動、截圖或理解核心價值。"
solution: "將展示路徑拆成兩層：公開 GitHub Pages 採純前端 mock-safe demo，第一屏直接呈現影像修復工作台；本機 smoke path 使用 FastAPI + Pillow 模擬上傳與放大 API。README 補齊 Mermaid 架構圖、資料流圖、部署圖與 demo 操作圖，讓專案價值、技術棧與風險一眼可讀。"
outcome: "完成可公開瀏覽的互動 demo、cover、桌面/手機截圖與 demo 錄影，並以 GitHub Actions 驗證 compile、pytest、API smoke、static build 後部署到 GitHub Pages。真模型路徑誠實標示為 prototype scaffold，避免展示時被外部服務或硬體卡住。"
highlights:
  - "第一屏即是產品工作台：before/after viewer、scenario、scale、restore strength、pipeline status 與 job payload"
  - "Mock-safe public demo：不用 GPU、不下載模型、不呼叫外部服務也能完整展示"
  - "FastAPI demo API 驗證上傳、Pillow resize/sharpen、PNG response headers 與 smoke tests"
  - "README 以 Mermaid 補齊產品流程、系統架構、資料流、部署與模組組織圖"
  - "Playwright 產生 cover、screenshots 與 WebM demo tour，媒體可重現"
  - "GitHub Pages workflow 在部署前執行 compile、pytest、smoke 與 static build"
challenges:
  - "在不依賴真模型/GPU 的前提下，仍讓使用者看懂 AI 影像修復產品的完整操作感"
  - "把原本分散的 FastAPI、Gradio、CLI、PyQt 與模型 scaffold 整理成可解釋的架構"
  - "避免將 prototype scaffold 誤包裝成 production-ready inference service"
nextSteps:
  - "補完 Real-ESRGAN/GFPGAN/RIFE 真模型 lifecycle 與 CPU/GPU fallback"
  - "將 prototype API routers 收斂成一致的 production contract"
  - "加入真模型 integration test、模型權重 health check 與 artifact persistence"
---
## 專案概述

RestorAI Studio 展示的是「如何把 AI 模型原型整理成可展示產品」。公開 demo 不假設使用者有 GPU 或模型權重，而是用瀏覽器 Canvas 建立可操作的影像修復工作台：載入 sample、調整 scale/strength、執行 pipeline、觀看 before/after、檢查 job payload。

## 技術架構

專案保留完整 AI service scaffold：FastAPI routers、job manager、metrics/history/export/admin routes、Gradio/CLI/PyQt 入口、AI Warehouse 模型路徑，以及 Real-ESRGAN/GFPGAN/RIFE adapter 設計。展示路徑則以 `portfolio-web/` 靜態前端與 `webapp/main.py` demo API 穩定交付。

## 展示價值

這個作品的重點不只是模型名稱，而是展示工程判斷：把不可控的 GPU/外部權重風險隔離，建立可重現的 mock-safe demo、CI、媒體資產與完整 README，讓使用者能快速理解產品定位、架構取捨與後續 production 化路線。
