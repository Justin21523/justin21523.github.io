---
title: "Starforge AI 敘事遊戲"
tagline: "以多代理 AI 與 RAG 驅動的校園敘事冒險遊戲"
summary: "一款 AI 驅動的 2D 校園敘事冒險遊戲。後端以 FastAPI 打造多代理協作系統（規劃、對話、記憶、安全代理），結合 RAG 向量檢索與工具呼叫，動態生成 NPC 對話與劇情；前端為自寫 TypeScript/Vite 2D 引擎。全程採 mock-first 設計，無需 GPU 即可開發測試。"
role: "獨立全端開發者（後端 AI 架構、前端遊戲引擎、測試）"
problem: "傳統文字冒險遊戲對話與分支寫死，缺乏真實人際互動感；同時 AI 整合常需昂貴模型與 GPU，開發測試門檻高。"
solution: "設計可替換的 LLM Provider 抽象層（mock/OpenAI/本地 transformers），以多代理協作（PlannerAgent 用 LLM 規劃工具序列、DialogueAgent 整合上下文、Memory 與 Safety 代理把關），搭配 RAG 向量檢索玩家自訂世界觀與角色設定，動態生成符合情境的對話與任務走向。"
outcome: "完成可運行的 MVP 原型：mock 模式下無需 GPU 即可啟動 API 與前端，pytest 測試覆蓋對話、規劃、向量檢索與存檔等模組，並提供 Docker 部署設定。"
highlights:
  - "多代理協作架構：Planner / Dialogue / Memory / Safety 代理分工，LLM 動態規劃工具序列並在解析失敗時回退預設"
  - "可插拔 LLM Provider 抽象（mock / OpenAI / 本地 transformers），加上向量檢索 mock，無 GPU 即可全功能開發"
  - "RAG 系統支援玩家上傳自訂世界觀與角色設定，啟動時自動 ingest lore 至向量庫"
  - "工具註冊表整合 game_state、search_lore、web_search（Brave）、roll_check 等可呼叫工具"
  - "自寫 TypeScript/Vite 2D 遊戲引擎，含場景管理、任務、商店、成就、存檔與 i18n"
  - "mock-first 測試策略：pytest-asyncio 覆蓋核心 AI 與遊戲服務，確保先跑通再替換真實模型"
challenges:
  - "在無 GPU 環境下保持 AI 功能可開發可測試，需為每個外部依賴設計 mock/stub"
  - "多代理與多步工具規劃的編排複雜，需處理 LLM 輸出解析失敗的回退機制"
nextSteps:
  - "接入真實本地 LLM（Qwen2-7B）與 OpenAI 模型驗證生成品質"
  - "整合 Stable Diffusion 即時生成場景與角色道具圖（目前為 mock）"
---
## 專案概述

Starforge AI Narrative 是一款 AI 驅動的 2D 校園敘事冒險遊戲，設定為美國國小五年級學生的校園與社區生活，玩法聚焦於對話、選項與任務，玩家與同學、朋友互動建立關係並合作面對霸凌等情境。核心理念是讓 LLM、RAG 與 AI 代理深度參與，使每次互動的對話與劇情走向都能動態生成，趨近真人互動體驗。

## 技術架構

後端以 **FastAPI** 打造，採多代理協作（orchestrator）：`PlannerAgent` 使用 LLM 動態規劃要呼叫的工具序列，`DialogueAgent` 整合 RAG 上下文與遊戲狀態後生成回應，並由 `MemoryAgent` 與 `SafetyAgent` 負責記憶與內容安全。工具透過 ToolRegistry 註冊（game_state、search_lore、web_search、roll_check）。RAG 以 VectorStore 與 Embedder 抽象實作，支援 mock 關鍵詞匹配與向量相似度兩種模式。

## Mock-first 設計

整個系統圍繞可替換的 Provider 抽象：`llm_provider` 可在 `mock`、`openai`、`local`（transformers/PyTorch）間切換，向量庫與影像生成（Stable Diffusion）亦皆有 mock 實作。如此在無 GPU、無金鑰的環境也能啟動完整 API 與前端、跑過 pytest 測試，符合「先運行、後替換真實模型」的開發策略。

## 前端與部署

前端為自行以 **TypeScript + Vite** 撰寫的 2D 遊戲引擎，包含場景管理（探索 / 室內 / 標題）、任務、商店、成就、事件、存檔與 i18n 等管理器，並支援 Tiled（.tmx）地圖。專案附 Docker（nginx）部署設定，後端資料層以 SQLAlchemy async + SQLite/PostgreSQL 支撐，亦保留 in-memory 模式方便測試。
