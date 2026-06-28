---
title: "Video Family LoRA Hub"
tagline: "單張 16GB GPU 的多模型影片生成與身份 LoRA 工作流中樞"
summary: "把 SVD、LTX-2、Wan、CogVideoX、AnimateDiff SDXL 等影片生成模型家族整理成統一 Python CLI、YAML manifest pipeline、ComfyUI workflow template 與 mock-safe portfolio demo，讓面試官可直接看到操作台、artifact、架構與驗證流程。"
role: "獨立開發者：系統架構、CLI 與 adapter 設計、ComfyUI workflow 整合、mock-safe demo、README 與 GitHub Pages 部署"
problem: "影片生成模型與 LoRA 訓練工具鏈分散在不同框架、權重格式、ComfyUI 節點與訓練器之間。若要在一張 16GB 消費級 GPU 上做 t2v、i2v、v2v 與角色身份 LoRA，缺少一個可重現、可測試、可對外展示的統一入口。"
solution: "以 Typer CLI 與 Pydantic 驗證的 YAML model catalog 為核心，建立 family registry、generation adapters、manifest pipeline runner、ComfyUI API template 與 trainer subprocess bridges。公開展示版本使用 dummy/mock-safe backend 與 deterministic sample assets，因此不需要 GPU、模型權重、API key 或外部服務，也能完整展示產品流程。"
outcome: "專案已整理成 portfolio-ready demo：GitHub Pages 第一屏直接是產品操作台，含 demo scenarios、pipeline state、artifact browser、截圖與 WebM 錄影；本機可跑 pytest、ruff、mypy、package build、demo smoke 與 demo app build。"
highlights:
  - "第一屏直接展示產品操作台，不是單純 marketing landing page"
  - "Mock-safe demo mode 不依賴 GPU、模型權重、ComfyUI 或外部 API"
  - "Typer CLI 統一 t2v / i2v / v2v / pipeline run，輸出 metadata 與 config snapshot"
  - "YAML + Pydantic 管理 SVD、LTX-2、Wan、CogVideoX、AnimateDiff SDXL 模型家族"
  - "ComfyUI API workflow metadata 與 GUI export 對齊，支援 template validation"
  - "README 使用 Mermaid 補齊架構圖、資料流圖、部署圖、模組組織圖與 demo flow"
challenges:
  - "真模型推論與 LoRA 訓練需要大型權重、GPU 與 ComfyUI custom nodes，因此公開 demo 必須安全降級"
  - "原始研究 repo 有大量實驗腳本、log、outputs、local_data 與模型 symlink，需要嚴格隔離 commit scope"
nextSteps:
  - "加入真實 GPU output gallery 與評估指標 dashboard"
  - "把 CLI 核心包成 FastAPI 或 Gradio operator UI"
  - "將 LoRA training experiment tracking 與 artifact registry 補成正式 MLOps workflow"
---
## 概觀

Video Family LoRA Hub 是一個以作品集展示為目標整理過的 AI 影片生成工具鏈。它保留真實工程架構：CLI、manifest、adapter、ComfyUI template、trainer bridge、metadata artifact；同時補上可公開展示的 mock-safe demo，讓面試官不需要 GPU 或私有模型也能理解系統價值。

## 展示重點

Demo 第一屏就是 run composer 與 pipeline state，可切換 family film teaser、reference portrait i2v、continuity polish v2v、identity LoRA training batch 等情境。截圖與 WebM 錄影呈現 manifest orchestration、artifact browser、architecture layers，README 則提供完整 Mermaid 圖與驗證命令。

## 技術架構

核心是 `video_generation_lab` Python package：`cli.py` 提供 Typer 入口，`pipeline.py` 處理 YAML manifest、job chaining 與 sharding，`adapters/` 封裝不同影片模型家族，`comfyui/api.py` 負責 workflow parameter binding 與 artifact download，`outputs.py` 統一產出 metadata、config snapshot、preview 與 run log。

## 可驗證性

公開 demo 使用 deterministic assets；本機則可執行 `python scripts/run_demo_smoke.py` 跑完整 mock-safe pipeline，並用 `pytest`、`ruff`、`mypy`、`python -m build` 驗證核心品質。這讓作品不只是靜態頁，而是一個可重建、可檢查、可部署的展示專案。
