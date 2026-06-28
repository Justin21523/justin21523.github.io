---
title: "2D 動畫角色 LoRA 訓練管線"
tagline: "從影片到角色 LoRA 的端到端 2D 動畫資料與訓練自動化管線"
summary: "針對西方 2D 卡通風格素材打造的端到端 LoRA 訓練管線。涵蓋影格抽取、YOLO 多物件追蹤、ToonOut 角色分割、人臉身份分群、DWpose 姿態、VLM 字幕、到 LoRA／ControlNet 訓練；以 OmegaConf 階層設定與分階段協調器串接，支援 checkpoint 續跑與無權重的 stub 模式快速驗證。"
role: "獨立開發者：負責管線架構、各階段模組、設定系統與訓練實驗（個人 AI 研究專案）"
problem: "從 2D 動畫影片建立高品質角色 LoRA 訓練集需處理大量繁瑣步驟：同一畫面多角色須分離、跨鏡頭同一角色須合併、2D 硬邊線稿與跨集風格差異使既有 3D 流程的參數不適用，且整段流程缺乏可重現、可續跑的自動化。"
solution: "設計分階段（frame → 多角色抽取 → 姿態 → 資料集 → 訓練）的協調器架構：YOLO+ByteTrack 偵測追蹤、ToonOut 逐軌分割、以 HDBSCAN 對人臉嵌入做身份分群來合併同一角色；用 OmegaConf 階層設定並自動套用 2D／3D 參數轉換（alpha/blur 門檻、cluster 大小等）。訓練端整合 kohya-ss 與 diffusers 訓練 SD/SDXL LoRA 與 ControlNet，並以 GPT-4V 產生字幕。全模組支援 stub 模式與 dry-run 以利無 GPU 快速驗證。"
outcome: "完成可運作的多階段管線雛形，並實際訓練出多組匿名角色 LoRA，含 CLIP 驗證過濾的乾淨資料集與 kohya .toml 設定；具備 checkpoint／resume、資源監控、批次提示測試與監控腳本，整體可重現性與工程化程度高。"
highlights:
  - "分階段協調器＋階段相依管理，支援 checkpoint／resume 與進度追蹤"
  - "多角色處理三部曲：YOLO+ByteTrack 追蹤、逐軌 ToonOut 分割、HDBSCAN 人臉身份分群"
  - "OmegaConf 階層設定與 2D／3D 參數自動轉換（硬邊門檻、cluster 大小、資料量等）"
  - "整合 kohya-ss／diffusers 訓練 SD/SDXL LoRA 與 ControlNet-Pose（DWpose 條件）"
  - "全模組 stub 模式＋dry-run，無模型權重也能快速冒煙測試"
  - "完整周邊：RealESRGAN/GFPGAN 增強、RIFE 補幀、LaMa/PowerPaint 背景修補、GPT-4V 字幕"
challenges:
  - "同畫面多角色分離與跨鏡頭身份合併，需結合追蹤與人臉嵌入分群"
  - "2D 硬邊線稿與跨集風格差異，使 3D 既有參數需重新校準（透過參數轉換層解決）"
nextSteps:
  - "將分散的訓練腳本與設定收斂為單一 CLI 工作流並補齊端到端整合測試"
  - "以更多角色／作品驗證身份分群與資料品質過濾的泛化能力"
---
## 概述

**2D Animation LoRA Pipeline** 是一條針對西方 2D 卡通風格素材打造的端到端角色 LoRA 訓練資料管線。它將「影片 → 影格 → 多角色抽取 → 姿態 → 資料集 → LoRA 訓練」整合為可重現、可續跑的自動化流程，並複用既有 3D 動畫管線的成熟基礎、針對 2D 特性重新調校。

## 架構與技術

核心採分階段協調器（orchestrator）＋階段相依管理（stage manager），以 OmegaConf 做階層式設定並提供 2D／3D 參數自動轉換。視覺處理串接 Ultralytics YOLO + ByteTrack 多物件追蹤、ToonOut（ONNX）逐軌角色分割、InsightFace 人臉嵌入＋HDBSCAN 身份分群，以及 DWpose 姿態抽取。訓練端整合 kohya-ss 與 Diffusers／PEFT，訓練 Stable Diffusion / SDXL 的角色 LoRA 與 ControlNet-Pose，搭配 bitsandbytes/Prodigy 等最佳化器與 TensorBoard/W&B 監控。

## 工程化特色

全模組支援 **stub 模式** 與 dry-run，讓開發者在無模型權重、無 GPU 的情況下也能快速冒煙測試整條管線；並提供統一的 MetadataIO（parquet 優先）、資源監控與 checkpoint/resume。周邊另含 RealESRGAN/GFPGAN 影像增強、RIFE 補幀、LaMa/PowerPaint 背景修補與 GPT-4V 自動字幕。

## 成果與現況

專案已實際訓練出多組匿名角色 LoRA，並附完整 kohya .toml 設定、提示測試集與訓練監控腳本。目前仍屬持續演進的個人研究雛形：許多階段以 stub 驅動、訓練腳本尚分散，下一步將收斂為單一 CLI 工作流並補齊端到端測試。

> 註：字幕模組透過環境變數讀取 OpenAI 金鑰；本文不含任何金鑰或機密資訊。
