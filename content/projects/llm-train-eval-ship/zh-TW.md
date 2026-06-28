---
title: "LLM 訓練評估部署管線"
tagline: "一鍵串接微調、評估到部署的 LLM 工程骨架"
summary: "一個以 train-eval-ship 為核心的 LLM 工程管線雛形：規劃從資料上傳、微調、自動評估到以 vLLM 或 TGI 部署的完整流程，並以共用模型快取避免重複下載。目前已實作 FastAPI 服務骨架、快取路徑檢視與容器化部署設定，進階訓練與服務功能列為路線圖。"
role: "獨立開發者（架構設計與工程實作）"
problem: "LLM 從微調、評估到上線涉及多套工具與大型權重檔，流程零散、重複下載成本高，難以一鍵端到端執行並安全回滾。"
solution: "設計 train-eval-ship 三段式管線藍圖：以 FastAPI 提供服務入口與健康檢查，透過 HF_HOME / TRANSFORMERS_CACHE / HF_HUB_CACHE 共用快取，規劃 vLLM 與 TGI 雙部署引擎、LoRA/PEFT 與 DPO 微調、RAG 工具白名單與金絲雀部署/回滾等可擴充掛鉤，並以 Docker + Nginx 容器化發布展示頁。"
outcome: "完成可執行的 FastAPI 骨架（/healthz 與啟動時印出快取路徑）、容器化部署配置與作品集展示頁；端到端訓練與服務管線仍在路線圖階段，誠實標示為雛形。"
highlights:
  - "以環境變數統一管理共用模型快取，避免重複下載大型權重"
  - "FastAPI 服務骨架含 /healthz 健康檢查與啟動期快取路徑列印"
  - "規劃 vLLM / TGI 雙引擎部署（相容 OpenAI / HF API）"
  - "預留 LoRA/PEFT、DPO、RAG 與 HIL 回饋擴充點"
  - "Docker（nginx:alpine）+ Nginx 容器化發布展示頁，含返回作品集導覽注入"
  - "DEPLOYMENT.md 明確記錄 docker-compose 上線與更新流程"
challenges:
  - "在零散的訓練/評估/服務工具間設計可一鍵串接且可回滾的統一管線"
  - "大型模型權重的共用快取與儲存路徑治理"
nextSteps:
  - "實作實際微調（LoRA/PEFT、DPO）與自動評估儀表板"
  - "串接 vLLM / TGI 部署引擎與金絲雀流量切換、安全回滾"
  - "補齊 requirements.txt 相依與可互動的端到端 demo"
---
## 概述
**LLM Train-Eval-Ship** 是一個聚焦於 LLM 工程化（MLOps）的管線雛形，目標是把「資料上傳 → 微調 → 自動評估 → 部署」串成一鍵流程，並以共用模型快取降低重複下載成本。專案定位為可延伸的工程骨架，README 已勾勒完整願景，部分進階能力列為路線圖。

## 已實作
目前的程式碼以 **FastAPI** 服務骨架為核心：提供 `/healthz` 健康檢查端點，並在服務啟動時透過 `print_cache_paths()` 印出 `MODEL_STORE_ROOT`、`HF_HOME`、`TRANSFORMERS_CACHE`、`HF_HUB_CACHE` 等共用快取路徑，方便確認模型儲存治理是否正確。服務以 **Uvicorn** 啟動於 8080 埠。

## 部署與展示
專案附帶 **Docker**（`nginx:1.27-alpine`）與 **Nginx** 設定，將作品集展示頁（landing page）容器化發布，並透過 `sub_filter` 注入「回到作品集」導覽連結與靜態資源 404 保護。`DEPLOYMENT.md` 詳列以 docker-compose 上線與後續更新的工作流程。

## 路線圖（尚未實作）
 README 中規劃但目前為掛鉤/藍圖的能力包括：**vLLM** 與 **TGI** 雙部署引擎（相容 OpenAI / HF API）、**LoRA/PEFT** 與 **DPO** 微調、**RAG** 工具白名單、AutoEval 儀表板，以及金絲雀部署與安全回滾。`requirements.txt` 目前為空，端到端可互動 demo 仍在建置中。

## 誠實標示
本專案為雛形（prototype）：服務骨架、快取治理與容器化部署已可運作，但實際的訓練、評估與模型服務管線尚未落地。內容不含任何金鑰、`.env` 或密碼。
