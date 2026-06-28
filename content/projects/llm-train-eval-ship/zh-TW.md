---
title: "LLM Train-Eval-Ship 發布控制台"
tagline: "以使用者旅程呈現 LLM MLOps 發布、評估與回滾流程"
summary: "一個把 LLM 從資料準備、adapter tuning、自動評估到 canary 部署/rollback 串成 guided product journey 的 mock-safe demo。專案不依賴 GPU、模型權重、API key 或外部服務，讓使用者可以直接操作 release candidate、檢查 gate evidence、理解共享模型快取與發布決策。"
role: "獨立開發者（架構設計、後端 API、靜態 demo、測試、截圖錄影與部署）"
problem: "LLM 發布流程通常需要 GPU、大型權重、私有資料與 serving infrastructure，公開展示時很難讓使用者安全操作完整流程。若只有 README 或 health check，使用者無法理解模型從候選版本到 canary 或 rollback 的決策依據。"
solution: "我把原本很薄的 FastAPI skeleton 補成 mock-safe guided release console：新增 demo APIs、三個 release scenario、AutoEval scorecard、deployment manifest、GitHub Pages 互動控制台、Playwright 截圖與 WebM walkthrough，並用英文 README 的 Mermaid 圖說明流程、架構、資料流、部署與模組組織。"
outcome: "完成可本機啟動、可 pytest smoke、可 Docker build、可 GitHub Pages 展示、可截圖錄影、可整合主 portfolio 的 LLM MLOps demo。真實 LoRA/DPO 訓練與 vLLM/TGI production serving 仍明確標示為 roadmap。"
highlights:
  - "第一屏直接呈現 guided release console：release queue、checkpoint lane、scorecard、user decision、operation log"
  - "Mock-safe 模式不需要 GPU、模型權重、API key 或外部服務"
  - "FastAPI 提供 /healthz 與 demo scenario / pipeline / scorecard / manifest APIs"
  - "用 MODEL_STORE_ROOT、HF_HOME、TRANSFORMERS_CACHE、HF_HUB_CACHE 表達共享模型快取治理"
  - "Playwright + FFmpeg 自動產出 cover、screenshots 與 WebM demo recording"
  - "GitHub Pages workflow 與 Docker/Nginx local static smoke path"
challenges:
  - "在不執行真模型的限制下，仍要誠實呈現 LLM MLOps 的使用者決策與風險控制"
  - "把原本只有 /healthz 的 skeleton 整理成使用者能操作與理解的完整發布旅程"
nextSteps:
  - "接上真實 LoRA/PEFT 或 DPO job runner"
  - "串接 vLLM/TGI serving endpoint 與實際 canary metrics"
  - "加入真實 eval dataset、artifact registry 與模型版本治理"
---
## 專案概述

LLM Train-Eval-Ship 的目標不是假裝在瀏覽器裡訓練大型模型，而是把一個 LLM 發布流程中最重要的使用者決策可視化：資料是否可用、adapter 是否已註冊、評估是否過門檻、能否進 canary、發現 regression 時是否要 rollback。

## 已完成內容

後端以 FastAPI 提供 mock-safe API contract，包含健康檢查、demo scenarios、pipeline run、AutoEval scorecard 與 deployment manifest。前端是 GitHub Pages 可部署的 guided release console，第一屏就能操作三個不同 release candidate。文件則以英文 README 補齊 Mermaid 流程圖、架構圖、資料流圖、部署圖、模組組織圖與技術 stack 圖。

## 使用方式

使用者可以先打開互動 Demo，切換 Support Copilot LoRA、Policy DPO Safety Pass、RAG Agent Regression Gate 三個 scenario，沿著 release journey 檢查 checkpoint、scorecard、user decision 和 operation log，再看 media gallery 裡的錄影與截圖。README 則說明本機啟動、測試、部署、API contract 與 roadmap。

## 誠實邊界

此版本是 portfolio-ready mock-safe demo：展示 pipeline contract、發布決策、測試與部署能力。真實模型訓練、production vLLM/TGI serving、artifact registry 與實際 canary metrics 仍是後續擴充範圍。
