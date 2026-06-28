---
title: "CharaForge T2I Lab — 文生圖與 LoRA 微調平台"
tagline: "整合擴散模型推論、LoRA 訓練與模型治理的全端 AI 實驗平台"
summary: "以 FastAPI 與 React 打造的文生圖平台，整合 Stable Diffusion 1.5/SDXL 推論、PEFT LoRA 微調、ControlNet 條件控制與模型倉儲管理。透過 Celery + Redis 非同步佇列處理長時間生成與訓練任務，並以 WebSocket 即時推送訓練進度，配備 JWT/API Key 認證與速率限制，可在本機 GPU 與 Docker 環境運行。"
role: "獨立開發者：負責後端 API、推論與訓練核心、Celery worker、React 前端、認證與部署的端到端設計與實作。"
problem: "角色導向的文生圖工作流通常分散在多個腳本與筆記本中：模型散落於檔案系統、LoRA 訓練缺乏排程與進度可視化、生成任務同步阻塞且難以治理並發與成本，亦缺乏對外服務所需的認證與速率限制。我需要一個能把推論、訓練、模型管理與權限控管統一起來的單一平台。"
solution: "設計分層架構：core/ 封裝統一的 T2I Pipeline 管理器（多排程器、SD1.5/SDXL、LoRA 動態載入、NSFW 安全過濾與浮水印）與 LoRA 訓練器（Accelerate + Diffusers + PEFT）；api/ 以 FastAPI 提供 /api/v1 版本化路由，涵蓋 t2i、controlnet、lora、batch、finetune、datasets、models 與 auth；workers/ 以 Celery 消費 t2i 與訓練佇列，長任務改為提交式（submit/status/cancel）非同步處理；前端以 React 19 + Vite + Zustand 構建生成、批次、訓練、LoRA 與圖庫等模組，並透過 WebSocket 接收即時訓練進度。安全面實作 API Key（cfk_ 格式、雜湊儲存）、JWT 存取/刷新權杖、CSRF、WebSocket 短效票券與多桶速率限制。"
outcome: "完成可運行的原型：本機可一鍵啟動 API、T2I worker、訓練 worker 與 React UI，並以 Docker Compose 編排後端、Redis 與 worker。模型掃描可建立 registry、生成與訓練支援非同步佇列與並發/成本治理，並導入 CLIP 與臉部一致性評估器、Prometheus 指標與結構化請求日誌。專案後續規劃將其獨特模組（分散式訓練佇列、認證、訓練評估）整併進更大的內容創作平台。"
highlights:
  - "統一 T2I Pipeline 管理器：支援 SD1.5/SDXL、多種排程器（DDIM/DPM++/Euler-A/LMS/PNDM）與 LoRA 動態載入／卸載"
  - "Celery + Redis 非同步佇列：生成與訓練皆採 submit/status/cancel 模式，含每使用者與全域並發/佇列上限"
  - "完整 ControlNet 端點：pose、depth、canny、lineart 條件控制生成"
  - "生產級認證：API Key、JWT（含刷新與 CSRF）、WebSocket 短效票券與多桶速率限制"
  - "LoRA 訓練核心：Accelerate + Diffusers + PEFT，搭配 CLIP 與臉部一致性評估器"
  - "可觀測性：Prometheus 指標、JSON 請求日誌、X-Request-ID 追蹤與統一錯誤格式"
challenges:
  - "在共享 GPU 與單一 pipeline 鎖下協調並發生成與訓練任務，避免顯存衝突並維持任務治理"
  - "為瀏覽器 WebSocket 設計安全的認證流程：以短效、單次使用的票券取代 query 參數傳遞憑證"
  - "將模型、快取、資料集與訓練輸出依 AI_WAREHOUSE 規範外部化，避免硬編碼路徑並讓容器與本機共用倉儲"
nextSteps:
  - "將分散式訓練佇列、認證與訓練評估等獨特模組整併進 anime-adventure-lab 內容創作平台"
  - "擴充 ControlNet 與多 LoRA 組合的進階生成工作流"
  - "強化端到端整合測試與 GPU 環境的回歸測試覆蓋率"
---
## 概述

CharaForge T2I Lab 是一個以角色生成為核心的文生圖（Text-to-Image）實驗平台，將擴散模型推論、LoRA 微調訓練與模型治理整合於單一全端系統。後端採 FastAPI 提供版本化的 `/api/v1` REST API 與 WebSocket，前端為 React 19 + Vite 單頁應用，長時間的生成與訓練工作則交由 Celery + Redis 非同步處理。

## 架構

專案採清楚的分層設計：`core/` 收斂與框架無關的領域邏輯，包含統一的 T2I Pipeline 管理器（支援 Stable Diffusion 1.5 與 SDXL、多種排程器、LoRA 動態載入、NSFW 安全過濾與浮水印）以及基於 Accelerate/Diffusers/PEFT 的 LoRA 訓練器；`api/` 提供 t2i、controlnet、lora、batch、finetune、datasets、models 與 auth 等路由；`workers/` 以 Celery 消費生成與訓練佇列。模型、快取、資料集與訓練輸出皆依照 AI_WAREHOUSE 規範外部化於檔案系統，透過環境變數而非硬編碼路徑存取。

## 非同步任務與治理

為避免同步請求阻塞昂貴的 GPU 運算，生成與訓練皆採用提交式（submit / status / cancel）模式。系統實作每使用者與全域的並發與佇列上限、基於成本單位的節流，以及輸出檔案 TTL 清理，讓平台在有限 GPU 資源下仍可受控運行。

## 安全與可觀測性

認證層支援雜湊儲存的受管 API Key（`cfk_` 格式）、可交換的 JWT 存取／刷新權杖（含 HttpOnly cookie 與 CSRF 防護），以及針對瀏覽器 WebSocket 的短效、單次使用票券。多桶速率限制涵蓋認證、上傳、資料集與 T2I 成本。可觀測性方面提供 Prometheus 指標、JSON 結構化請求日誌、`X-Request-ID` 追蹤與統一錯誤回應格式。

## 現況

本平台為可運行的原型，可在本機 GPU 與 Docker Compose 環境啟動。依專案定位分析，其分散式訓練佇列、認證與訓練評估等獨特模組規劃整併進範圍更廣的內容創作平台。
