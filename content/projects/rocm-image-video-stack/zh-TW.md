---
title: "ROCm 影像／影片 AI 生成技術棧"
tagline: "在 AMD R9700 上打造與既有 CUDA 並存、非破壞式的影像影片生成管線"
summary: "針對 AMD Radeon AI PRO R9700（gfx1201, 32GB HBM）建構的 ROCm 影像與影片 AI 生成技術棧，與同機既有 NVIDIA/CUDA 環境並行且互不干擾。透過分階段腳本佈署 ComfyUI ROCm、Diffusers 與 LTX-2.3 影片生成，模型以符號連結共用，並以自動化驗證套件確認 ROCm 相容性與效能。"
role: "獨立開發者／ML 平台與基礎設施工程師"
problem: "原機已有完整 CUDA 影像生成環境，更換為 AMD R9700 後，ROCm 生態相容性不確定（FP8 計算、自訂節點、PyTorch 版本），且必須確保既有 CUDA 工具、模型與工作流不被破壞或覆寫。"
solution: "設計 10 階段、需逐階審批的非破壞式佈署流程：先以唯讀腳本稽核既有 CUDA 棧與模型清單，再建立獨立的 ROCm conda 環境、以不同服務埠佈署 ComfyUI ROCm，透過可設定的本機模型目錄符號連結共用權重避免重複下載，並提供 Python 測試器透過 ComfyUI HTTP API 跑 SDXL／FLUX／Qwen-Image／LTX-2.3 等驗證工作流。"
outcome: "完成唯讀稽核、conda 環境驗證、ComfyUI ROCm 安裝與 LTX-2.3 工作流驗證並留有執行日誌；建立涵蓋安全政策、回滾計畫與自訂節點相容性矩陣的完整文件，作為可重現的 ROCm 影像影片生成原型。"
highlights:
  - "並行非破壞式架構：明定受保護路徑與禁用指令，確保既有 CUDA 工具、模型、conda 環境零更動"
  - "分階段審批佈署：00–13 編號腳本對應 10 個階段，唯讀稽核階段免審批、寫入階段需明確核可"
  - "ROCm 環境調校：針對 gfx1201 設定 PYTORCH_HIP_ALLOC_CONF、AOTRITON 實驗旗標與 ComfyUI 啟動參數"
  - "多模型驗證套件：以 ComfyUI API 自動排程 SDXL、FLUX、Qwen-Image、Z-Image 與多種 LTX-2.3 影片工作流"
  - "模型共用策略：以可設定的符號連結映射避免數十 GB 權重重複佔用磁碟"
  - "誠實的風險標註：在模型清單中標示 gfx1201 FP8 計算風險與 GGUF 後備方案"
challenges:
  - "AMD gfx1201 上 FP8 計算不穩，需評估 ComfyUI-LTXVideo 載入時反量化為 BF16 或改用 GGUF 後備"
  - "ROCm 7.2 與 PyTorch 2.5.1+rocm6.2／2.11+rocm7.2 的版本相容性與升級時機取捨"
  - "在 WSL2 + 同機雙 GPU 環境下確保 ROCm 與 CUDA 工作流完全隔離互不污染"
nextSteps:
  - "將 PyTorch 升級至 rocm7.2 並完成 ComfyUI ROCm 自訂節點相容性實測"
  - "完成 LTX-2.3 image-to-video 與 IC-LoRA／控制工作流，並補上 Wan 影片管線"
  - "執行完整 10 項驗證與基準測試，產出 R9700 影片生成效能報告"
---
## 專案概觀

這是一套針對 **AMD Radeon AI PRO R9700**（gfx1201、RDNA4、32GB HBM）打造的 ROCm 影像與影片 AI 生成技術棧。專案核心訴求是**與同一台機器上既有的 NVIDIA/CUDA 生成環境並行運作**——在不修改、不刪除、不覆寫任何既有 CUDA 工具、conda 環境、模型或工作流的前提下，建立一條獨立、可重現的 AMD GPU 生成管線。

## 架構與做法

整體採用 **10 階段、逐階審批**的佈署模型，以編號 Bash 腳本（00–13）實作：Phase 0 為唯讀稽核（盤點既有 CUDA 棧與模型清單），其後依序進行工作區準備、`rocm-*-r9700` conda 環境驗證、ComfyUI ROCm 安裝（埠 8189，與 CUDA ComfyUI 的 8188 並存）、模型符號連結、安全自訂節點與 LTX-2.3 影片工作流。每個寫入階段都需明確核可，所有寫入腳本都會檢查當前是否處於受保護的 CUDA 環境並在命中時中止。

## 技術棧

底層為 **ROCm 7.2 + PyTorch（rocm6.2，規劃升級至 rocm7.2）**，生成前端使用 **ComfyUI** 與 **HuggingFace Diffusers**，影片模型為 **Lightricks LTX-2.3**（含 FP8 與 GGUF 變體）。驗證以純 Python 腳本透過 ComfyUI 的 HTTP API 排程生成任務，涵蓋 SDXL、FLUX、Qwen-Image、Z-Image 等影像工作流與多種 LTX-2.3 文字轉影片／圖轉影片工作流；影片後製工具則包含 FFmpeg、OpenCV、moviepy、PyAV 等。

## 工程取捨與誠實標註

專案在文件中**誠實標註已知風險**：gfx1201 的 FP8 計算被標記為高風險，並備有 BF16 反量化與 GGUF 後備路徑；同時提供安全政策、回滾計畫與自訂節點相容性矩陣。目前進度處於早期原型階段（已完成稽核、環境驗證、ComfyUI ROCm 安裝與初步 LTX-2.3 工作流驗證並留有執行日誌），尚未完成全部 10 項驗證與效能基準。
