---
title: "VisionQuest 多模態 AI 平台"
tagline: "視覺、語言、檢索與互動敘事整合於單一 API 平台"
summary: "以 FastAPI 為核心、React 為前端的多模態 AI 平台原型，將圖像描述、視覺問答、對話、RAG 知識檢索、工具代理與文字冒險遊戲整合進統一的 REST API。內建 Mock 與 GPU 雙模式，可在無顯卡環境下展示完整介面與資料流。"
role: "全端與 AI 系統設計者，獨力完成後端服務架構、模型管理層、React 前端與容器化部署。"
problem: "視覺與語言模型常各自為政、難以統一展示；同時，缺少 GPU 的開發或展示環境往往無法跑起完整 Demo。需要一個把多種多模態能力收斂到一致 API、且在任何機器上都能啟動的平台。"
solution: "設計模組化 FastAPI 後端，將描述、VQA、對話、RAG、代理、遊戲拆為獨立 service 與 v1 路由，並以統一的 ModelManager 掃描本機 VLM／LLM 模型。透過 USE_MOCK_MODE 環境開關，同一套程式碼可在 Mock 模式回傳模擬結果（無需顯卡）或在 GPU 模式載入真實模型。前端以 React + TypeScript + Tailwind 打造卡片式介面，每種能力對應一張互動卡片。"
outcome: "完成可運行的 MVP：後端涵蓋九個 API 路由群、PostgreSQL + pgvector 持久層、pytest 測試與 Docker Compose 部署，前端提供八個功能分頁。專案後續被整合進規模更完整的 anime-adventure-lab 而封存，作為多模態架構設計的探索原型保留。"
highlights:
  - "九個 v1 API 路由群：caption、vqa、chat、rag、agent、game、models、history、batch"
  - "Mock／GPU 雙模式設計，無 GPU 也能完整展示介面與資料流"
  - "統一 ModelManager 自動偵測裝置（CUDA／MPS／CPU）並掃描本機模型"
  - "pgvector + SQLAlchemy 向量檢索與遊戲狀態持久化"
  - "React + TypeScript + Tailwind 卡片式前端，含 React Flow 流程視覺化"
  - "Docker Compose 容器化，部署於作品集閘道後方"
challenges:
  - "在無顯卡環境也要能展示，需以 Mock 模式抽象模型呼叫並維持與真實推論一致的回應結構"
  - "把視覺、語言、檢索、代理、遊戲五類異質能力收斂為一致且可擴充的服務與 Schema 介面"
  - "本機多模型（VLM／LLM／Diffusion）的裝置選擇與記憶體配置管理"
nextSteps:
  - "補完 Mock 模式以外的真實模型推論路徑與批次處理工作佇列"
  - "強化 RAG 的文件切塊、引用追蹤與混合檢索"
  - "其獨特功能已整合至 anime-adventure-lab，後續維護以該專案為主"
---
## 專案概述

VisionQuest 是一個多模態 AI 平台原型，目標是把電腦視覺與自然語言處理常見的數種任務，整合到單一、可攜、易於展示的 REST API 之下。它涵蓋圖像描述（Image Captioning）、視覺問答（VQA）、對話、RAG 知識檢索、工具代理，以及一個由敘事驅動的文字冒險遊戲。

## 架構設計

後端以 FastAPI 建構，採清晰的分層：`api/v1` 路由、`services` 業務邏輯、`models` 模型抽象、`database` 持久層與 `core` 設定與中介層。每種能力都是獨立的 service 與 Pydantic Schema，便於單獨測試與擴充。資料層使用 PostgreSQL 搭配 pgvector 做向量檢索，並以 SQLAlchemy 管理遊戲狀態與工作階段。前端是獨立的 React + TypeScript + Tailwind 應用，以卡片式分頁對應每一種後端能力，並用 React Flow 呈現流程。

## Mock／GPU 雙模式

專案最務實的設計，是透過 `USE_MOCK_MODE` 環境開關讓同一套程式碼在兩種情境運行：Mock 模式回傳結構一致的模擬結果，讓開發者與審視者在沒有顯卡的機器上也能完整體驗介面與資料流；GPU 模式則由統一的 `ModelManager` 偵測 CUDA／MPS／CPU、選擇精度並掃描本機 VLM／LLM 模型目錄載入真實權重。

## 工程實踐

專案附帶 pytest 測試（健康檢查、聊天與視覺端點等）、ruff／black 程式風格設定、LoRA 微調設定與多支運維腳本（建索引、下載模型、基準測試、部署），並以 Docker Compose 容器化、部署於作品集閘道之後。

## 現況

此專案為架構探索的 MVP 原型；其文字冒險與遊戲狀態等獨特功能後來被整合進規模更完整的 anime-adventure-lab，VisionQuest 因而封存。它仍是一份展示如何把異質多模態能力收斂為一致 API、並兼顧無 GPU 可展示性的設計範例。
