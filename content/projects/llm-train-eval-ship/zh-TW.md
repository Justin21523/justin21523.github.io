---
title: "LLM Train-Eval-Ship 控制台"
tagline: "可展示、可測試、可錄影的 LLM MLOps mock-safe demo"
summary: "一個把 LLM 從資料上傳、微調、自動評估到 canary 部署/rollback 串成可展示控制台的 portfolio demo。專案不依賴 GPU、模型權重、API key 或外部服務，改用 deterministic mock flow 呈現真實 MLOps 團隊會關心的 pipeline stage、AutoEval scorecard、共享模型快取與部署決策。"
role: "獨立開發者（架構設計、後端 API、靜態 demo、測試、截圖錄影與部署）"
problem: "LLM 專案很難公開展示：真實訓練需要 GPU、大型權重與私有資料，部署又牽涉 vLLM/TGI、cache、canary、rollback 等基礎設施。若只放 README 或健康檢查，面試官無法快速看懂工程價值。"
solution: "我把原本很薄的 FastAPI skeleton 補成 mock-safe portfolio demo：新增 demo APIs、三個 pipeline scenario、AutoEval scorecard、deployment manifest、GitHub Pages 互動控制台、Playwright 截圖與 WebM walkthrough，並在 README 用 Mermaid 圖完整說明流程、架構、資料流、部署與模組組織。"
outcome: "完成可本機啟動、可 pytest smoke、可 Docker build、可 GitHub Pages 展示、可截圖錄影、可整合主 portfolio 的 LLM MLOps demo。真實 LoRA/DPO 訓練與 vLLM/TGI production serving 仍明確標示為 roadmap，不假裝已上線。"
highlights:
  - "第一屏直接呈現產品本體：scenario selector、pipeline timeline、scorecard、canary/rollback decision"
  - "Mock-safe 模式不需要 GPU、模型權重、API key 或外部服務"
  - "FastAPI 提供 /healthz 與 demo scenario / pipeline / scorecard / manifest APIs"
  - "用 MODEL_STORE_ROOT、HF_HOME、TRANSFORMERS_CACHE、HF_HUB_CACHE 表達共享模型快取治理"
  - "Playwright + FFmpeg 自動產出 cover、screenshots 與 WebM demo recording"
  - "GitHub Pages workflow 與 Docker/Nginx local static smoke path"
challenges:
  - "在不執行真模型的限制下，仍要誠實呈現 LLM MLOps 的工程決策與風險控制"
  - "把原本只有 /healthz 的 skeleton 整理成面試官能快速理解的完整展示入口"
nextSteps:
  - "接上真實 LoRA/PEFT 或 DPO job runner"
  - "串接 vLLM/TGI serving endpoint 與實際 canary metrics"
  - "加入真實 eval dataset、artifact registry 與模型版本治理"
---
## 專案概述

LLM Train-Eval-Ship 的目標不是假裝在瀏覽器裡訓練大型模型，而是把一個 LLM 上線流程中最重要的工程脈絡可視化：資料是否可用、微調任務是否完成、評估是否過門檻、部署要不要進 canary、發現 regression 時如何 rollback。

## 已完成內容

後端以 FastAPI 提供 mock-safe API contract，包含健康檢查、demo scenarios、pipeline run、AutoEval scorecard 與 deployment manifest。前端是 GitHub Pages 可部署的靜態控制台，第一屏就能操作三個不同 scenario。文件則補齊 Mermaid 流程圖、架構圖、資料流圖、部署圖、模組組織圖與技術 stack 圖。

## 展示方式

面試官可以先看互動 Demo，切換 Support Copilot LoRA、Policy DPO Safety Pass、RAG Agent Regression Gate 三個 scenario，再看 portfolio media gallery 裡的錄影與截圖。README 則說明本機啟動、測試、部署、API contract 與 roadmap。

## 誠實邊界

此版本是 portfolio-ready mock-safe demo：展示 pipeline contract、決策流程、測試與部署能力。真實模型訓練、production vLLM/TGI serving、artifact registry 與實際 canary metrics 仍是後續擴充範圍。
