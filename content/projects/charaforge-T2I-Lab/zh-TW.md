---
title: "CharaForge T2I Lab — 文生圖、ControlNet 與 LoRA 訓練平台"
tagline: "把本機 AI 生成工作流整理成可展示、可治理、可部署的全端平台"
summary: "CharaForge T2I Lab 是一個 portfolio-ready 的 AI 影像生成平台：後端以 FastAPI 提供文生圖、ControlNet、批次生成、LoRA 訓練、模型掃描、資料集驗證與認證 API；長時間任務交由 Redis/Celery 非同步處理；前端以 React + Vite 呈現生成、訓練、job state 與圖庫流程。公開展示版部署在 GitHub Pages，內含互動 mock scenario、截圖牆、MP4 錄影與 reviewer runbook，讓面試官不用 GPU 或模型權重也能理解專案價值。"
role: "獨立開發者：負責產品定位、FastAPI 後端、T2I/LoRA/ControlNet 核心流程、Celery worker、React 操作介面、認證安全、文件、靜態 demo 與 GitHub Pages 部署。"
problem: "本機 AI 圖像生成通常散落在 WebUI、腳本、Notebook 和模型資料夾中：prompt、seed、LoRA、ControlNet、資料集、訓練結果與輸出檔案難以統一管理；長時間生成和訓練容易阻塞 API；共享 GPU 缺乏佇列、並發限制、成本治理與可觀測性；作品集展示時又不能要求面試官安裝大型模型或啟動 GPU 環境。"
solution: "我把系統拆成兩層：實際可執行的本機全端平台，以及穩定可公開的靜態 demo。全端平台以 FastAPI 暴露 `/api/v1` 合約，將 t2i、controlnet、batch、lora、finetune、datasets、models、auth 等能力分開；`core/` 封裝 Diffusers/PEFT/PyTorch 相關邏輯；`workers/` 以 Celery 消費生成與訓練任務；Redis 管理 queue、job state 與 progress；React 前端集中呈現操作流程。靜態 demo 則使用可重現的 mock state、截圖與錄影，部署到 GitHub Pages，專門服務面試展示與截圖錄影需求。"
outcome: "專案已整理成可展示版本：GitHub Pages 線上 demo 可直接瀏覽，含互動 scenario、完整截圖、錄影 demo、架構說明與操作 runbook；README 補齊啟動、測試、部署與架構說明；CI/Pages workflow 可從 `main` 部署。程式碼面通過 ruff、pytest、React lint/test/build 與 npm audit 檢查，後端測試涵蓋健康檢查、模型掃描、資料集、auth/security、ownership、WebSocket ticket 與 observability。"
highlights:
  - "GitHub Pages demo 可免 GPU 展示：互動 scenario、截圖牆、MP4 walkthrough、架構與 reviewer runbook"
  - "FastAPI `/api/v1` API：t2i、controlnet、batch、finetune、datasets、models、auth、WebSocket"
  - "Celery + Redis 非同步任務：submit/status/cancel job model，支援生成、模型掃描與 LoRA 訓練"
  - "AI pipeline 整合：PyTorch、Diffusers、Transformers、Accelerate、PEFT、safetensors"
  - "安全與治理：API Key、JWT refresh cookies、CSRF、WebSocket 短效票券、rate-limit buckets"
  - "可觀測性與維運：Prometheus metrics、JSON request logs、X-Request-ID、統一錯誤格式"
  - "Portfolio packaging：README、docs、截圖、錄影、demo script 與 deployment workflow 都已整理"
challenges:
  - "將重 GPU 工作轉成可治理的非同步 API 模式，同時保留本機模型與資料集路徑的彈性"
  - "在 GitHub Pages 不能跑後端/GPU 的限制下，設計仍能讓面試官看懂價值的展示層"
  - "把原本偏工程內部的 AI 工具整理成有 screenshot、recording、flow、runbook 的作品集專案"
nextSteps:
  - "補上更多真實 GPU inference/training 的錄影與效能數據"
  - "增加 Playwright 自動截圖與影片錄製流程，讓展示資產可重複生成"
  - "擴充 E2E 測試與 GPU smoke test，讓本機完整推論流程更容易驗收"
---

## 專案定位

CharaForge T2I Lab 不是單純的圖片生成頁面，而是把「本機 AI 影像生成實驗」整理成一個可操作、可治理、可展示的全端平台。它同時處理三個問題：

- AI 工具層：文生圖、ControlNet、批次生成、LoRA 訓練、模型掃描與資料集驗證。
- 平台工程層：API 合約、非同步 queue、job state、認證、安全、可觀測性與部署。
- 作品集展示層：GitHub Pages、截圖牆、錄影 demo、操作腳本與 README。

## Demo 展示策略

公開 demo 採用 static-first 策略。GitHub Pages 不能執行 GPU inference、Redis、Celery 或私有模型權重，因此 demo 以 mock state 和錄製素材呈現完整產品體驗：

1. 先看 Dashboard，理解平台定位與技術棧。
2. 切換 Text-to-Image、ControlNet、Batch、LoRA Training 四個 scenario。
3. 觀察 prompt/config、output preview、job timeline 與 API contract 如何互相對應。
4. 打開 media section 查看截圖牆與 MP4 walkthrough。
5. 進入 architecture/runbook 理解本機 full-stack 啟動方式。

## 技術架構

```text
React/Vite Operator UI
  -> FastAPI /api/v1
  -> Redis + Celery queues
  -> Diffusers / PEFT / PyTorch workers
  -> AI_WAREHOUSE filesystem
```

後端以 FastAPI 提供版本化 API，路由拆分為 `t2i`、`controlnet`、`batch`、`finetune`、`datasets`、`models`、`auth` 與 WebSocket。長時間任務不直接阻塞 HTTP request，而是使用 submit/status/cancel 模型：前端提交任務後取得 `job_id`，後續透過 status endpoint 或 WebSocket 追蹤進度。

## 工程亮點

| 面向 | 實作重點 | 面試官可觀察的能力 |
| --- | --- | --- |
| API 設計 | FastAPI routers、typed request/response、Swagger docs | 清楚的 backend boundary 與 API 合約 |
| 非同步工作 | Redis/Celery、job state、cancel/cleanup | 長任務治理與 GPU 資源控管 |
| AI 整合 | Diffusers、PEFT、Accelerate、ControlNet hooks | 能把 AI library 包成產品流程 |
| 安全 | API Key、JWT、CSRF、WebSocket ticket | 對公開 API 的基本安全設計 |
| 前端 | React/Vite dashboard、scenario UI、gallery | 能把工程流程轉成可操作介面 |
| 展示 | GitHub Pages、截圖、錄影、README | 能把專案整理成可被快速理解的作品 |

## 現況

目前最適合以作品集方式評估：線上 demo 用於快速理解產品與流程，本機 repo 則保留完整 API、worker、React dashboard 與測試。若要跑真實 inference，需要準備相容的 PyTorch/Diffusers/PEFT 環境、Stable Diffusion/SDXL/ControlNet/LoRA 權重、Redis 與足夠 GPU/CPU 記憶體。
