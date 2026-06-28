---
title: "Multi-AI Agents 多智能體遊戲生態系"
tagline: "以本地 LLM 驅動、自動協作的多智能體互動敘事遊戲平台原型"
summary: "一套自架的多智能體協調系統：由 GameMaster 智能體統籌，依玩家輸入自動路由至劇情、NPC、世界、任務等專職智能體協作生成校園生活互動敘事。後端以 FastAPI + WebSocket 串接本地 Ollama 推論、Qdrant 向量檢索與 Neo4j 知識圖譜；前端為 React 18 + TypeScript。目前為原型階段，文字冒險為優先模組。"
role: "全端與 AI 系統設計開發（個人專案）"
problem: "互動敘事遊戲需要多種專業能力（劇情推進、NPC 對話、世界場景、任務管理）協同運作，單一提示詞難以兼顧；同時希望在地端 GPU 上自架推論以兼顧成本與隱私，不依賴雲端 API。"
solution: "設計可插拔的智能體核心：BaseAgent 抽象、AgentRegistry 註冊、AgentRouter 自動路由與委派，並透過 LLMClient 統一封裝 OpenAI 相容介面（Ollama / vLLM / llama.cpp 皆可）。GameMaster 依關鍵字將請求委派給專職智能體；RAG 以 Qdrant 向量庫與 Neo4j 知識圖譜支撐角色知識，FastAPI WebSocket 提供即時串流，前端以 React + shadcn/ui 呈現智能體儀表板與遊戲畫面。"
outcome: "完成可運作的原型：智能體核心、LLM 抽象層、RAG、FastAPI/WebSocket 後端與多頁 React 前端皆已就位，文字冒險模組可端到端跑通；2D（Phaser 3）、3D（Three.js）與微調（Unsloth/PEFT）管線仍在規劃與實作中。"
highlights:
  - "GameMaster 自動路由至 5 個專職遊戲智能體並可互相委派"
  - "LLMClient 統一封裝 OpenAI 相容後端，可在 Ollama / vLLM / llama.cpp 間切換"
  - "RAG 雙引擎：Qdrant 向量檢索 + Neo4j 知識圖譜支撐角色知識庫"
  - "FastAPI + WebSocket 即時串流，前端含智能體儀表板與角色工作室"
  - "純本地端 GPU 推論（AMD R9700 32GB），不依賴雲端 API"
  - "模組化核心：Registry / Router / Memory / EventBus / ContextEngine 清楚分層"
challenges:
  - "多智能體間的上下文傳遞與委派路由仍以關鍵字為主，準確度有限"
  - "Qdrant、Neo4j 與 Ollama 多服務協調與啟動依賴 docker compose，部署較重"
nextSteps:
  - "將關鍵字路由升級為語意/工具呼叫導向的智能體決策"
  - "完成 Phaser 3 與 Three.js 遊戲模組及 Unsloth 微調管線"
---
## 專案概述
Multi-AI Agents 是一個以本地 LLM 驅動的多智能體遊戲生態系原型，目標是讓多個具備專職能力的 AI 智能體自動協作，共同生成「校園生活」互動敘事體驗。系統強調在地端 GPU（AMD Radeon AI PRO R9700, 32GB VRAM）上自架推論，兼顧成本、隱私與可控性。

## 架構設計
後端核心採模組化分層：`BaseAgent` 定義智能體契約，`AgentRegistry` 負責註冊與惰性建立，`AgentRouter` 進行請求路由。GameMaster 智能體作為總控，依玩家輸入關鍵字將任務委派給 StoryAgent、NPCAgent、WorldAgent、QuestAgent 等專職智能體。`LLMClient` 以 OpenAI 相容格式統一封裝 Ollama、vLLM 與 llama.cpp 等推論後端，搭配 Memory、EventBus、CommunicationBus 與 ContextEngine 處理記憶、事件與上下文。

## 檢索與資料
RAG 採雙引擎：Qdrant 提供向量檢索、Neo4j 提供知識圖譜，並透過 LlamaIndex 串接，支撐角色知識庫（CharacterKB），讓 NPC 對話與世界設定具一致性。基礎設施以 docker compose 編排 Qdrant 與 Neo4j。

## 前端與遊戲模組
前端為 React 18 + TypeScript + Vite + Tailwind + shadcn/ui，提供智能體儀表板、角色工作室、知識庫、文字冒險與微調頁面，並透過 WebSocket 即時串流。文字冒險為優先實作模組；2D（Phaser 3）、3D（Three.js + React Three Fiber）與微調管線（Unsloth/PEFT/TRL）仍在規劃中。

## 狀態
本專案目前為原型（prototype）：核心智能體框架、LLM 抽象、RAG 與文字冒險可端到端運作，部分進階遊戲與微調功能尚未完成。
