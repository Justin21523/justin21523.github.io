---
title: "3D 動畫角色 LoRA 訓練管線"
tagline: "從影片到可用 LoRA 的端到端 3D 角色生成資料管線"
summary: "專為 Pixar 風格等 3D CGI 角色打造的 LoRA 訓練工具鏈。整合影片抽幀、多層分割、CLIP 角色聚類、BLIP2 自動標註、SDXL/Kohya LoRA 與 ControlNet/AnimateDiff 訓練，並以協調器管理階段、資源監控與斷點續訓，搭配 ComfyUI 進行視覺化測試與評估。"
role: "獨立開發者：管線架構、各階段工具與訓練設定設計、評估流程與文件撰寫"
problem: "3D 動畫角色與 2D 動漫在著色、光照、材質與一致性上差異甚大，既有 2D 流程難以直接套用，且從原始影片到高品質訓練資料集需大量手動清洗、分群與標註，耗時且難以重現。"
solution: "建立模組化、設定檔驅動的端到端管線：以場景偵測抽幀並用 RIFE 補幀，採 U²-Net/SAM/ISNet 多層與深度感知分割並用 LaMa 修補背景，透過 CLIP+HDBSCAN 聚類角色，BLIP2 自動產生標註，再交由 Kohya/Diffusers 進行 SDXL LoRA、ControlNet 姿態與 AnimateDiff 訓練；協調器負責階段管理、資源監控與斷點續訓，姿態資料準備可在 CPU 多執行緒與 GPU 訓練平行進行。"
outcome: "完成 v1.0.0 可運作管線，能由整部 3D 動畫影片自動產出乾淨的角色資料集並訓練出多個角色 LoRA，並透過 LPIPS/FID 與 ComfyUI 工作流進行品質比較。屬個人研究原型，尚未產品化。"
highlights:
  - "設定檔（YAML/TOML）驅動的多階段協調器，支援資源監控與斷點續訓"
  - "針對 3D 內容調校的分割與聚類參數（較低 alpha/模糊門檻、較小聚類規模）"
  - "CLIP + HDBSCAN + UMAP 角色自動分群並提供互動式人工複核"
  - "BLIP2 自動標註並以觸發詞/身分標籤策略強化身分型 LoRA 學習"
  - "CPU 多執行緒姿態資料準備（32 緒可達 60+ FPS）與 GPU 訓練平行運作"
  - "整合 ComfyUI 進行 LoRA 比較、ControlNet 姿態控制與影片生成測試"
challenges:
  - "3D 角色的平滑著色與真實光照使分割與去背門檻需重新調校"
  - "在有限 VRAM 下平衡 SDXL/ControlNet 訓練與多階段前處理的資源消耗"
  - "身分型 LoRA 的標註策略需精準教導年齡/性別等屬性以避免特徵漂移"
nextSteps:
  - "將 2D 與 3D 兩套管線收斂為單一統一介面"
  - "補強自動化品質評估與回歸測試以提升可重現性"
  - "強化跨角色一致性（InstantID/IPAdapter）與影片生成工作流"
---
## 概述
這是一套專為 **3D 動畫角色**（Pixar 等 CGI 風格）設計的 LoRA 訓練管線，目標是把一整部動畫影片自動轉換成乾淨、可訓練的角色資料集並產出高品質 LoRA 模型。專案有別於一般 2D 動漫流程，針對平滑著色、真實光照、材質（SSS、高光）與 3D 角色一致性做了專門最佳化。

## 架構
管線以模組化、設定檔驅動方式組織，由協調器（orchestrator）串接七個階段：抽幀 → 實例分割 → 角色聚類 → 自動標註 → 資料集準備 → LoRA 訓練 → 評估。協調器整合資源監控與階段管理，支援進度追蹤與斷點續訓。前處理採場景偵測抽幀與 RIFE 補幀、U²-Net/SAM/ISNet 多層與深度感知分割、LaMa 背景修補；角色分群結合 CLIP 嵌入、HDBSCAN 與 UMAP 並提供互動式複核。

## 訓練與評估
訓練端整合 Kohya_ss/sd-scripts 與 Diffusers，支援 SDXL LoRA、ControlNet 姿態與 AnimateDiff，並可選用 bitsandbytes 8-bit Adam、Lion 與 Prodigy 等優化器。姿態資料準備以 MediaPipe/DWPose 在多執行緒 CPU 上與 GPU 訓練平行進行。評估端提供 LoRA 檢查點測試、模型比較與 LPIPS/FID 品質指標，並整合 ComfyUI 工作流進行視覺化比較與影片生成測試。

## 定位
專案為個人研究用途的可運作原型（v1.0.0），已實際產出多個角色 LoRA，重點在於建立可重現、可擴充的 3D 角色資料工程流程，而非對外部署的產品。
