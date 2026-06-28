---
title: "Anime Adventure Lab — RAG + LLM 故事世界生成平台"
tagline: "用 RAG 與 LLM 打造可生成、可檢索、可繪圖的互動故事世界服務棧"
summary: "一套整合 LLM、RAG、文生圖、視覺語言模型與 LoRA 微調的故事驅動服務棧。後端以 FastAPI 提供模組化路由，Celery + Redis 處理長任務，前端同時具備 React 與 Gradio 介面，並以分離式 AI 倉儲管理快取、權重與輸出，強調低 VRAM 與本地推論。"
role: "獨立全端 / AI 工程師：負責整體架構、後端 API、RAG 與故事引擎、前端介面與部署設定。"
problem: "互動故事與遊戲世界生成需要同時處理敘事生成、世界觀一致性、可追溯的引用、場景繪圖與角色微調，這些能力散落在不同工具中，缺乏一個統一、可擴充且能在消費級顯卡上跑的服務骨架。"
solution: "建立模組化單體架構：FastAPI 將 LLM、RAG、故事、T2I、VLM、LoRA、批次與管理拆成獨立路由；core 層封裝業務邏輯，含階層式切塊、bge-m3 嵌入、FAISS + BM25 混合檢索與重排，並串接含 GameState、選項解析、記憶與角色系統的故事引擎。透過 llama.cpp server adapter 與 transformers 支援本地推論，並以 AI_WAREHOUSE 3.0 分離快取/模型/輸出根目錄。"
outcome: "完成可跑通整條鏈路的原型：API 各路由與冒煙測試到位，core 層含完整的故事、RAG、T2I 模組實作，前端具備 React 19 (Vite/TanStack/Tailwind/Radix) 與 Gradio 雙介面，並提供 Docker Compose 與 CI 設定。部分對外端點仍為 stub，定位為可擴充骨架。"
highlights:
  - "模組化 FastAPI 後端，將 LLM / RAG / 故事 / T2I / VLM / LoRA / 批次 / 管理拆為獨立路由群"
  - "中文導向 RAG：階層式切塊、bge-m3 嵌入、FAISS + BM25 混合檢索並重排，附帶引用"
  - "完整故事引擎：GameState、選項解析、記憶管理、角色與場景系統"
  - "Celery + Redis 非同步任務佇列，承載微調與批次生成等長任務"
  - "雙前端策略：正式用 React 19 + Vite + TanStack + Tailwind，快速試做用 Gradio"
  - "AI_WAREHOUSE 3.0 倉儲治理 + 低 VRAM 預設（fp16/bf16、LoRA、device_map=auto）"
challenges:
  - "在不把大型模型/資料集放進 repo 的前提下，設計快取、權重與輸出分離的倉儲根目錄治理"
  - "讓 LLM 推論在本地 llama.cpp server 與 transformers 之間可切換，並維持低 VRAM 預設"
  - "協調故事引擎、RAG 檢索與文生圖之間的狀態一致性與記憶寫回"
nextSteps:
  - "將仍為 stub 的對外端點補上完整實作並擴充整合測試覆蓋"
  - "強化安全治理：內容過濾、浮水印與授權紀錄"
  - "效能與匯出：4/8-bit 量化、KV-cache、批次生成與成果匯出"
---
Anime Adventure Lab 是一套以故事驅動體驗為核心的 **LLM + RAG + T2I + VLM + LoRA** 服務棧，目標是把互動故事與遊戲世界生成所需的各種 AI 能力，整合進一個可在消費級顯卡上運行、可逐步擴充的工程骨架。

後端採用 FastAPI 的模組化單體設計，把健康檢查、LLM 對話、RAG、故事、文生圖、視覺語言、LoRA 微調、批次與管理拆成清晰的路由群；`core/` 層封裝實際業務邏輯，RAG 子系統涵蓋文件處理、階層式切塊、以 bge-m3 為主的嵌入、FAISS 向量庫搭配 BM25 的混合檢索與重排並輸出引用，故事子系統則包含 GameState、選項解析、記憶管理、角色與場景等完整模組。長任務透過 Celery + Redis 佇列處理，資料層以 SQLAlchemy/PostgreSQL 支撐。

模型推論刻意保持本地優先：透過 llama.cpp server adapter 與 transformers 雙路徑切換，並以 fp16/bf16、LoRA 取代全量微調、`device_map=auto` 等低 VRAM 預設降低硬體門檻。專案遵循 AI_WAREHOUSE 3.0 原則，將快取、模型權重與輸出分離到不同根目錄，確保 repo 不夾帶大型資產，並以 `.env` 管理機密、絕不入庫。

前端採雙軌策略：正式 WebUI 以 React 19 + Vite 打造，搭配 TanStack Query/Router、Tailwind、Radix UI 與 Zustand；同時保留 Gradio 介面供快速試做與展示，另有一個 Qt 桌面原型。整體以 Docker Compose 編排並配有 GitHub Actions CI。

目前定位為 **原型**：整條鏈路已能跑通並通過冒煙測試，`core/` 層已有大量實作，但部分對外端點仍為 stub，刻意保持精簡以串接完整堆疊，並為後續安全治理、量化與匯出等階段留下清晰的擴充點。
