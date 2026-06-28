---
title: "YTP Factory — AI 驅動的影片自動化生產工廠"
tagline: "以多智能體、RAG 與多模態生成把素材影片自動改造成 YTP 作品"
summary: "YTP Factory 是一套端到端的 AI 影片自動化管線，將來源影片自動切割、轉錄、LLM 腳本改寫、TTS 重配音、加入音效與視覺特效，最終合成 YouTube Poop 風格作品。系統整合六個協作智能體、FAISS 向量檢索、多個 ML 模型與擴散模型生成，並具備 GPU 記憶體調度、斷點續傳與批次處理能力，曾用於 76 支影片的批次量產。"
role: "獨立開發者 — 全棧設計與實作（架構、管線、AI 整合、基礎設施）"
problem: "手工製作 YTP 影片極度耗時，需要反覆切片、改寫台詞、配音、套特效與對齊音畫；而既有工具缺乏「智能決策」，無法依內容自動判斷哪裡好笑、該用什麼特效或音效。"
solution: "設計六階段可斷點續傳的管線，並在其上疊加 AI 智能層：以 faster-whisper 轉錄、多供應商 LLM（本地/OpenAI/LLMVendor）改寫腳本、XTTS/OpenAI TTS 重配音、moviepy/FFmpeg 套用機率化特效合成；再以 Orchestrator 為首的多智能體協調分工，搭配 FAISS RAG 從歷史成功案例檢索脈絡，並用 XGBoost 趣味度偵測與多任務品質評分閉環迭代，必要時以 SDXL/ControlNet/AnimateDiff 生成補充素材。"
outcome: "完成涵蓋 P0–P8 八個階段的 v2.0 系統，src 下約 3.5 萬行 Python、32 個測試檔，並提供 FastAPI 服務、Docker 與 systemd 部署。批次處理腳本具記憶體監控與自動重試，成功支撐 76 支影片的自動化量產。"
highlights:
  - "六智能體協調架構（Orchestrator/Segment/Script/Audio/Visual/Quality），含 Chain-of-Thought 推理與智能體通訊協定"
  - "多供應商 LLM 路由 + 模糊比對提示快取，支援本地 vLLM/DeepSeek/Qwen 與雲端 API 無縫切換"
  - "FAISS 向量庫 + 多模態嵌入（文字/音訊/影片）的四階段檢索管線，從歷史輸出持續學習"
  - "以 1977 行的 compose_final 實作機率化視覺特效（抖動、倒放、加速、定格、跳切、鏡像、子母畫面）"
  - "針對 16GB VRAM 的優先級 LRU GPU 記憶體管理，按需載入/卸載擴散與 ML 模型"
  - "可斷點續傳的批次管線，含記憶體守門、GPU 清理與自動重試，實際量產 76 支影片"
challenges:
  - "在單張 16GB GPU 上同時容納 Whisper、嵌入模型、SDXL/ControlNet/SVD 與多個 ML 模型，需以優先級 LRU 精細調度避免 OOM"
  - "龐大功能面（agents/RAG/ML/multimodal/streaming/auth）的整合與優雅降級——所有外部依賴皆需 stub 與 CPU fallback 才能離線測試"
  - "音畫對齊與時長吻合：TTS 重配音長度與原片段不一致時的 ducking、相位對齊與空音訊驗證"
nextSteps:
  - "補齊文件（README 連結的 INSTALL/DEPLOY/CONFIG 等指南尚未建立）"
  - "實作即時/串流處理路徑（realtime 與 streaming 模組已起頭）"
  - "YouTube 上傳自動化與內容審核/版權偵測整合"
---
## 專案概述

YTP Factory 是一套以 AI 為核心的影片自動化生產管線，目標是把普通素材影片自動改造成「YouTube Poop」(YTP) 風格的迷因混剪。整個流程從影片切片、Whisper 轉錄、LLM 腳本改寫、TTS 重配音，到音效混音與視覺特效合成全程自動化，並可選擇性啟用更進階的 AI 能力。

## 技術架構

系統採分層設計：最底層是六階段、可斷點續傳的核心管線（segment → transcribe → script → synthesize → remix → compose），上面疊加「智能核心」與「智能體層」。智能核心包含多供應商 LLM 系統（本地/OpenAI/LLMVendor 路由與提示快取）、FAISS 多模態 RAG 檢索，以及四個 ML 模型（XGBoost 趣味度偵測、LoRA 微調的 GPT-2 風格轉移、對比學習的音效配對、多任務品質評分）。智能體層由 Orchestrator 統籌 Segment、Script、Audio、Visual、Quality 五個專責智能體協作，並具備 Chain-of-Thought 推理與智能體間通訊協定。

## 工程亮點

程式碼規模實在：src 下約 3.5 萬行 Python，涵蓋 agents、intelligence(llm/rag/ml)、multimodal、creativity、audio、video、infrastructure、streaming、auth、realtime 等模組，並有 32 個測試檔。compose_final 單檔近 2000 行實作機率化視覺特效；api.py 提供 1200 餘行的 FastAPI 服務。基礎設施層包含針對 16GB VRAM 的優先級 LRU GPU 記憶體管理、效能剖析與瓶頸偵測。

## 實際成果與務實面

專案完成了標稱的 P0–P8 八階段 v2.0，並以批次腳本（含記憶體守門與自動重試）實際量產 76 支影片。README 對能力的描述偏理想化、部分連結文件尚未補齊，且多模態與 ML 高階功能依賴大型模型與多盤儲存（3 碟 AI 倉儲）才能完整發揮；但核心管線與 AI 整合確實可運作，並提供 stub 與 CPU fallback 以支援離線測試。
