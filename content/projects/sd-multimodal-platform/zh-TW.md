---
title: "SD 多模態生成平台"
tagline: "文生圖到多模態理解的一站式 Stable Diffusion 推理後端"
summary: "以 FastAPI 為核心打造的 Stable Diffusion 多模態平台，整合文生圖、圖生圖、區域修補與放大／面部修復後處理，並串接 BLIP-2 影像描述與 LLaVA 視覺問答。後端採模組化路由與懶載入模型管理，搭配 Redis + Celery 非同步佇列；前端以 React + TypeScript 提供操作介面，全程遵循嚴謹的模型／快取／產出儲存規範。"
role: "全端與 ML 平台開發者：負責後端 API、模型推理服務、非同步佇列、前端介面與容器化部署的整體設計與實作。"
problem: "個別的 Stable Diffusion 工具往往各自為政——文生圖、圖生圖、修補、放大、影像理解分散在不同腳本或 WebUI 中，缺乏統一 API、任務佇列與模型管理，也難以在有限 GPU 記憶體下穩定切換多個模型，更不利於容器化部署與測試。"
solution: "建立以 FastAPI 為核心的單一後端，將各能力拆成獨立 v1 路由（txt2img / img2img / inpaint / upscale / face_restore / caption / vqa / queue / models / history / assets / health）。透過 services 層的模型註冊表與懶載入快取統一管理 SD 1.5、SDXL、ControlNet、BLIP-2、LLaVA 等模型；長任務交由 Redis + Celery 的 generation／postprocess 佇列處理。後端設計成即使缺少 Redis 或模型權重仍能開機（回傳 503 而非崩潰），前端則以 React + TypeScript（Vite）提供含遮罩編輯器的操作介面。"
outcome: "完成可運行的原型：涵蓋多種生成與後處理能力的統一 REST API、可降級啟動的非同步佇列、模型自動選擇與快取，以及 React 前端。專案附帶 pytest 測試套件（覆蓋率門檻 80%）、Docker Compose（含 GPU profile）與 K8s 部署設定，並嚴格落實「模型／快取置於 /mnt/c、產出置於 /mnt/data」的儲存規範與 .env 密鑰隔離。"
highlights:
  - "模組化 FastAPI v1 API，將 txt2img／img2img／inpaint／upscale／face_restore／caption／vqa 等能力統一收斂於同一後端"
  - "多模型管理：以模型註冊表與懶載入快取在 SD 1.5、SDXL、ControlNet、BLIP-2、LLaVA、Qwen2 等之間切換"
  - "Redis + Celery 非同步佇列（generation／postprocess），長任務不阻塞 API"
  - "可降級設計：缺少 Redis、ControlNet 或模型權重時仍可開機，相關端點優雅回傳 503"
  - "React + TypeScript 前端，內建遮罩編輯器、狀態輪詢與歷史紀錄瀏覽"
  - "完整工程化：pytest 標記與 80% 覆蓋率門檻、auth／rate-limit／logging 中介層、Docker Compose 與 K8s 設定"
challenges:
  - "在有限 GPU 記憶體下協調多個重量級模型的載入與卸載，需要懶載入、快取與裝置／精度（float16）策略以避免 OOM"
  - "為支援 RTX 5080（sm_120）必須採用 PyTorch Nightly（CUDA 12.8），同時維持與 diffusers／xformers 的相容性"
  - "讓後端在可選元件（Redis／Celery／ControlNet／模型權重）缺席時仍可開機並回傳明確錯誤，而非整體崩潰"
nextSteps:
  - "依存檔規劃，將獨特模組（放大、面部修復、佇列管理、K8s／Gradio／桌面端）遷移併入後續主力專案"
  - "強化多模態聊天與 VQA 路由的串接，整合 Qwen2 與 BGE-m3 嵌入以支援檢索式互動"
  - "補強整合測試與 GPU 環境的端到端壓力測試，並完善前端錯誤回饋與任務進度視覺化"
---
SD 多模態生成平台是一個以 **FastAPI** 為核心、整合多種影像生成與理解能力的 Stable Diffusion 推理後端原型。它把原本分散在各種腳本與 WebUI 的功能——文生圖、圖生圖、區域修補、放大、面部修復、影像描述與視覺問答——收斂到單一、模組化的 REST API 之中。

架構分為三層協作：**前端**以 React + TypeScript（Vite）呈現操作介面，內含遮罩編輯器與任務狀態輪詢；**API 層**由 FastAPI 提供 `/api/v1` 下的獨立路由，並套用 auth、rate-limit、logging、CORS 與 gzip 中介層；**推理層**位於 `services/`，以模型註冊表與懶載入快取管理 SD 1.5／SDXL（diffusers）、ControlNet，以及 BLIP-2 描述、LLaVA 視覺問答等 transformers 模型。長時間任務透過 **Redis + Celery** 的 generation／postprocess 佇列非同步處理，避免阻塞 API。

工程取捨上特別強調**韌性與可重現性**：即使缺少 Redis、ControlNet 或尚未下載模型權重，後端仍可正常開機，相關端點以 503 明確回報而非崩潰；模型、快取與產出路徑透過環境變數集中管理（模型／快取於 `/mnt/c`、產出於 `/mnt/data`），密鑰一律以 `.env` 隔離且不入庫。

專案具備完整工程化配套：**pytest** 測試套件搭配 unit／integration／api 等標記與 80% 覆蓋率門檻、**Docker Compose**（含 GPU profile）與 **Kubernetes** 部署設定。為支援 RTX 5080（sm_120），環境採用 PyTorch Nightly（CUDA 12.8）。

此平台目前定位為原型；依其存檔說明，放大、面部修復、佇列管理與部署等獨特模組將被後續主力專案吸收。
