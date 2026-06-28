---
title: "SD Multi-Modal Platform：可展示的 Stable Diffusion 多模態平台"
tagline: "把文生圖、圖生圖、inpaint、後處理、queue、assets 與 history 收斂成面試官能直接操作的產品 demo"
summary: "SD Multi-Modal Platform 是一個以 FastAPI + React 為核心的生成式 AI 平台 demo。整理後的版本不只保留 Stable Diffusion / SDXL / ControlNet / postprocess 的 full-mode 架構，也新增 mock-safe demo mode，讓公開 GitHub Pages、截圖、錄影與本機 smoke test 在沒有 GPU、模型權重、Redis 或外部服務時仍能穩定展示。"
role: "獨立開發者（全端平台設計、API 實作、React 工作台、mock-safe demo engineering、README/架構文件、部署與 portfolio 整合）"
problem: "Stable Diffusion 專案常常卡在「只能在我的本機 GPU 跑」：需要模型權重、CUDA、Redis、Celery、後處理模型與大量環境變數，面試官很難在短時間內看懂系統價值。原專案已有不少 API 與服務模組，但缺少可公開展示、可截圖、可錄影、可 smoke test 的穩定入口。"
solution: "我把專案整理成雙模式：full mode 保留 ModelRegistry、Diffusers pipeline、Redis/Celery queue、assets/history 與 postprocess 服務；mock-safe mode 則在同一組 FastAPI 路由下用 deterministic PIL renderer 產生代表性結果，不需要大型模型或 GPU。前端 React workbench 可連 mock API，本 repo 也提供 GitHub Pages 靜態 demo、Playwright 截圖/錄影腳本、完整 README Mermaid 架構圖與面試 runbook。"
outcome: "目前公開展示鏈路已可用：GitHub Pages 第一屏直接展示產品工作台，portfolio 頁包含 cover、screenshots 與 WebM demo 影片；本機可用 MOCK_GENERATION=true 啟動 FastAPI，並用 smoke script 驗證 health、models、txt2img、img2img 與 queue graceful degradation。React typecheck/build 也已修復為可重現流程。"
highlights:
  - "第一屏直接展示產品本體：prompt panel、generated result、queue monitor、assets/history，而不是純 landing page"
  - "Mock-safe demo mode：沒有 GPU、模型權重、Redis 或外部服務也能跑核心 API flow"
  - "FastAPI v1 routers：generation、postprocess、assets、history、models、queue、health 都有清楚邊界"
  - "React + TypeScript workbench：prompt presets、mask workflow、queue monitor、assets/history 操作集中在同一介面"
  - "Graceful degradation：optional dependencies 缺席時服務可啟動，相關功能回傳明確狀態"
  - "README 視覺化：用 Mermaid 補齊產品流程、架構、資料流、queue lifecycle、部署與模組圖"
challenges:
  - "把原本依賴 GPU/model weights 的 AI 專案轉成公開可展示 demo，同時不誇大 mock output 是真模型結果"
  - "處理 optional ML 套件 import-time failure，避免 GFPGAN/basicsr 類依賴阻止整個 FastAPI app 啟動"
  - "在主 portfolio repo 已有大量不相關髒檔的情況下，只提交本專案 slug 的 content 與 media"
nextSteps:
  - "把 live backend 部署到 Render/Railway/Fly.io 類平台，提供可互動的遠端 API demo"
  - "補更多真模型輸出案例，讓 portfolio 除 mock-safe flow 外也能展示實際 SDXL output"
  - "針對 Redis/Celery full queue 和 GPU model switching 補端到端壓力測試"
---
這個專案現在的重點不是單純展示「我能呼叫 Stable Diffusion」，而是展示我能把一組本地 AI 推理能力包裝成可理解、可測試、可部署、可維護的產品型平台。

公開 demo 採用 mock-safe 模式，因為面試展示最重要的是穩定與可重現：面試官打開頁面就能看到 prompt 工作台、生成結果、queue 狀態、assets/history 與架構說明；本機則可以啟動 FastAPI mock backend，直接跑 smoke test 驗證 API contract。

Full mode 仍保留通往真模型的架構：ModelManager 管理 SDXL/SD 1.5/SD 2.1，postprocess layer 對應 Real-ESRGAN/GFPGAN/CodeFormer，Redis/Celery 負責長任務 queue。README 明確標示模型、快取、outputs、assets、logs 的儲存位置，避免大型檔案和本機私有路徑混進 Git。
