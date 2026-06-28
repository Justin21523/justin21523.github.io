---
title: "2D 動畫角色 LoRA 訓練管線"
tagline: "把 2D 動畫素材整理成可訓練資料集，並包裝成可展示、可截圖、可錄影的 portfolio demo"
summary: "一套針對 2D 動畫角色 LoRA 的資料工程與訓練管線。專案涵蓋影格抽取、YOLO/ByteTrack 多角色追蹤、ToonOut 風格角色分割、身份分群、DWpose 姿態、captioned dataset、LoRA 訓練設定與公開 mock-safe demo。"
role: "獨立開發者：管線架構、2D demo 包裝、測試驗證、GitHub Pages 展示與 portfolio media 整理"
problem: "2D 動畫 LoRA 資料集很難公開展示：真實素材、模型權重、GPU、外部 captioning 服務與大量中間產物都不適合直接放到作品集。面試官需要的是能快速理解價值、能看到操作流程、也能分辨真實 pipeline 與公開 demo 邊界的展示版本。"
solution: "我把研究型 Python pipeline 整理成雙層架構：真實工作流仍保留 YOLO、ToonOut、DWpose、HDBSCAN、kohya/diffusers 等本機 GPU 路徑；公開展示則新增 static mock-safe demo，用 deterministic synthetic assets 呈現 stage dashboard、角色資料集 sheet、frame-to-sample transformation、training metrics、evaluation matrix、motion strip、截圖與 WebM 錄影。"
outcome: "完成可公開展示版本：GitHub Pages demo 站能看到完整產品化展示頁，主 portfolio 專案頁有 cover、截圖、錄影、GitHub 與 README 連結；本機可跑 demo asset generator、CPU-safe pytest smoke suite、static HTTP check 與 Docker/Nginx build。"
highlights:
  - "第一屏直接展示產品本體：pipeline readiness、stage metrics、synthetic character sheet 與 demo results"
  - "Mock-safe demo mode：不需要 API key、模型權重、私有影片或 GPU，也能展示完整資料流"
  - "2D pipeline 重點：YOLO/ByteTrack 多角色追蹤、ToonOut-style masks、HDBSCAN 身份合併、DWpose 條件資料"
  - "README 補齊 Mermaid 架構圖、資料流圖、部署圖、模組組織圖、tech stack map 與面試展示流程"
  - "Portfolio media package：cover、桌面截圖、行動截圖、結果頁截圖與 WebM walkthrough"
challenges:
  - "公開展示必須誠實切開 demo mode 與 full GPU/model workflow，避免讓面試官以為 GitHub Pages 會跑真訓練"
  - "原 repo 含大量研究/批次腳本，需要收斂出一條穩定、可驗證、可講清楚的 review path"
nextSteps:
  - "擴充更多匿名 demo scenario，例如資料品質審核、cluster review、checkpoint comparison"
  - "把更多真實訓練後的匿名 aggregate metrics 整理成公開可展示報告"
---
## 專案概述

這個專案是針對 2D 動畫角色 LoRA 的端到端資料與訓練管線。核心目標是把影片素材轉成可重現的訓練資料：抽幀、角色偵測與追蹤、前景分割、身份分群、姿態條件資料、字幕與 LoRA 訓練設定。

## Demo 展示設計

公開 demo 不使用私有影片或具名角色，而是用 synthetic 2D characters 模擬真實產線輸出。第一屏直接呈現 pipeline dashboard、stage readiness、角色資料集 sheet 與結果 metrics；後續區塊可看 transformation、training metrics、evaluation matrix、motion strip、screenshots 與 demo video。

## 技術架構

後端不是常駐服務，而是 Python CLI 與 file-based artifact contracts。`anime_pipeline/` 放核心模組，`configs/` 管理 global/stage/project 設定，`portfolio-web/` 是 GitHub Pages 靜態展示站，`tests/` 則提供 CPU-safe smoke tests。公開頁面只 fetch static manifest JSON；真實 LoRA 訓練仍需本機 GPU、模型倉庫與資料倉庫。

## 面試亮點

這個作品重點不是只列 AI 名詞，而是展示如何把一條依賴 GPU、模型權重與大量媒體素材的研究 pipeline，整理成可公開、可測試、可部署、可被面試官快速理解的 portfolio project。
