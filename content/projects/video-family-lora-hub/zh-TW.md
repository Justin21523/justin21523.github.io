---
title: "影片家族 LoRA 訓練中樞"
tagline: "單張 16GB GPU 上的多模型影片生成與 LoRA 訓練實驗室"
summary: "以統一 Python CLI 整合 Diffusers 與 ComfyUI，於單張 16GB 顯卡上跨 LTX-2、Wan、CogVideoX、SVD、AnimateDiff SDXL 等模型家族執行文生影片、圖生影片與角色 LoRA 微調，並以 YAML 預設與清單批次流程確保可重現產出。"
role: "獨立開發者：系統架構、CLI 與訓練後端設計、VRAM 優化與工作流整合"
problem: "影片擴散模型百花齊放，但每個家族（LTX、Wan、CogVideoX、SVD、AnimateDiff）各有不同的推論與 LoRA 訓練介面、相依與 VRAM 需求；在一張 16GB 消費級顯卡上要同時做生成與角色身份 LoRA 訓練，缺乏統一、可重現的工作流。"
solution: "打造一個以家族為單位的註冊表式架構：統一 Typer CLI 提供 run t2v/i2v/v2v、list、comfy、pipeline 等子指令；adapters 與 runners 封裝各模型推論，trainers 以子程序後端串接 finetrainers / musubi / simpletuner 等外部訓練器。設定全部以 Pydantic 驗證的 YAML 預設驅動（rank、量化、gradient checkpointing、int8/bf16 等 16GB 優化），並提供 ComfyUI 工作流模板與 API、清單批次流程與 render-farm 分片，輸出附帶 metadata 與環境快照以利重現。"
outcome: "原型已能在 RTX 5080 16GB 上跑通多家族推論與身份 LoRA 訓練流程，累積 70+ 份 YAML 設定與 50+ 份技術文件；以 dummy 後端支援 dry-run 驗證管線。屬個人研究原型，部分路徑（原生 v2v、真生成式 v2v）仍標記為分開追蹤中。"
highlights:
  - "以家族註冊表（registry）統一 LTX-2、Wan、CogVideoX、SVD、AnimateDiff SDXL 的推論與訓練進入點"
  - "Typer CLI 提供 t2v / i2v / v2v、ComfyUI 匯出與清單批次流程等子指令"
  - "YAML + Pydantic 設定驅動，內建 16GB VRAM 優化（int8-quanto 量化、bf16、gradient checkpointing、adamw8bit）"
  - "trainers 以子程序後端整合 finetrainers / musubi / simpletuner 等外部訓練器，支援批次訓練多角色身份 LoRA"
  - "ComfyUI 工作流模板與 API helper，銜接 AnimateDiff SDXL 與 Wan 的 i2v 路徑"
  - "產出附帶 metadata、環境與設定快照，並提供 dummy 後端做 dry-run 管線驗證"
challenges:
  - "在單張 16GB 顯卡上訓練大型影片模型 LoRA（如 LTX 2.3 22B）需大量量化與記憶體優化，逼近硬體極限"
  - "各模型家族介面與相依差異大，需以子程序後端與轉接層吸收不一致性"
nextSteps:
  - "補上生產級 Diffusers 原生 LTX-2 / Wan 推論轉接，減少對 ComfyUI 子程序的依賴"
  - "加入 CLIP／動態／美學評分等輸出評估與訓練實驗追蹤"
  - "以 Gradio 或 FastAPI 在同一核心套件上提供編排端點"
---
## 概觀

影片家族 LoRA 訓練中樞（Video Generation Lab）是一個為「單張 16GB GPU 上的短影片生成研究」設計的可重現工具鏈。它把分散的影片擴散生態（LTX-2、Wan 2.1/2.2、CogVideoX、Stable Video Diffusion、AnimateDiff SDXL）收斂到一個統一的 Python 套件與 CLI 之下，讓推論與角色身份 LoRA 微調共用同一套設定、流程與產出規範。

## 架構

核心採用「家族（family）」為單位的註冊表設計：`adapters` 與 `runners` 封裝各模型的推論細節，`trainers` 則以子程序後端串接 finetrainers、musubi-tuner、simpletuner 等外部訓練器。一支以 Typer 打造的統一 CLI 暴露 `run`（t2v/i2v/v2v）、`list`、`comfy`、`pipeline` 等子指令；所有行為由 Pydantic 驗證的 YAML 設定驅動，倉庫內已累積 70 多份生成與訓練預設。

## 16GB VRAM 優化

專案的核心約束是在消費級 RTX 5080 16GB 上同時完成生成與訓練。設定預設大量使用 int8-quanto 量化、bf16 混合精度、gradient checkpointing、adamw8bit 優化器與 batch size 1，並以 accelerate／DeepSpeed ZeRO offload 設定處理大型骨幹；技術文件中詳細評估了不同訓練器在 16GB 下的可行性。

## 工作流與可重現性

除 Diffusers 路徑外，專案整合 ComfyUI：提供工作流模板、匯出器與 API helper，把 AnimateDiff SDXL 與 Wan 的 i2v 路徑接入同一流程。清單（manifest）驅動的批次流程支援多角色、多鏡頭與 render-farm 分片，輸出一律附帶 metadata、環境與設定快照；並提供 dummy 後端讓管線能 dry-run 驗證。

## 現況

本專案為個人研究原型，倉庫中保有大量實驗腳本、日誌與規劃文件；部分路徑（原生 v2v 與真生成式 v2v）仍標記為分開追蹤，路線圖也列出評估指標、實驗追蹤與 FastAPI/Gradio 編排等待辦事項。
