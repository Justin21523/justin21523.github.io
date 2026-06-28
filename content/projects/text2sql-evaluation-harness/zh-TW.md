---
title: "Text2SQL 評估框架"
tagline: "為 Agentic BI 量測 LLM 生成 SQL 的可重現評估平台"
summary: "一套針對 Text-to-SQL 的可重現評估框架（非聊天機器人），可載入 Spider、DuckDB Text2SQL 25k 與自建零售 warehouse benchmark，比較 prompt 模板、schema retrieval 策略，並以 SQLGlot 阻擋 unsafe SQL，量測 execution accuracy、valid SQL rate、latency 與 error taxonomy，附 React 雙語暗色儀表板與 bad case replay。"
role: "全端開發者（後端評估引擎、API 與前端儀表板皆由個人設計實作）"
problem: "Agentic BI 系統需要可靠的 SQL 生成、明確的安全邊界與可重複的量測，但缺乏一個能在部署前系統性比較 prompt、retrieval 與模型表現的評估迴圈，且需防止 LLM 產生具破壞性的 SQL。"
solution: "以 FastAPI + DuckDB 建置評估引擎，支援多種 benchmark loader、prompt 模板與 schema retrieval（關鍵字／欄位／mock embedding）ablation；用 SQLGlot 加 denylist 前置檢查阻擋變更語句、多語句與沙箱逃逸，在沙箱中執行並計算 execution accuracy、exact match、unsafe rejection rate 與 latency；API 評估走非同步佇列，支援 LLM 自我修正與 final-SQL-only 計分，並提供 mock、OpenAI-compatible 與 llama.cpp 三種生成 adapter。"
outcome: "完成可重現的評估流程與 React TypeScript 雙語暗色儀表板，涵蓋 radar、latency histogram、error treemap 與 model×prompt×retrieval heatmap，支援 bad case replay、回歸標記與 Markdown／JSON／CSV／ZIP 報告匯出；具 GitHub Actions CI、Docker 生產組態與 prod-check 健康檢查。"
highlights:
  - "以 SQLGlot 加 denylist 實作 SQL 安全層，阻擋變更語句、多語句、非白名單資料表與沙箱逃逸指令"
  - "支援 Spider、DuckDB Text2SQL 25k、內建零售 warehouse 與自建 JSONL 四種 benchmark loader"
  - "prompt 模板（zero-shot/few-shot/schema 變體）與 schema retrieval 策略的 ablation 矩陣比較"
  - "12 類 error taxonomy 與 semantic error classification，搭配 bad case replay 與回歸候選標記"
  - "React + ECharts 暗色分析儀表板，含 model×prompt×retrieval heatmap 與雙語（zh-TW/en-US）介面"
  - "可插拔生成 adapter：deterministic mock、OpenAI-compatible 與 llama.cpp（Qwen2.5-7B），並支援 Tailscale 遠端推論"
challenges:
  - "在阻擋 unsafe SQL 的同時仍要正確執行合法查詢，需以 SQLGlot 解析搭配 denylist 前置檢查取得平衡"
  - "設計能公平比較 prompt×retrieval×model 的可重現量測流程，並以 deterministic mock adapter 確保測試與 demo 穩定"
nextSteps:
  - "擴充真實 embedding-based schema retrieval 以取代 deterministic mock 向量檢索"
  - "接入完整 Spider／DuckDB Text2SQL 25k 資料集進行大規模評估，而非僅 sample"
  - "強化 LLM 自我修正策略與多模型併行評估的吞吐與觀測性"
---
## 專案概述
Text2SQL Evaluation Harness 是一套面向 Agentic BI 的 **評估框架，而非聊天機器人**。它針對固定 benchmark 問題與 gold SQL／warehouse 資料進行評測，將每次 run 的 predictions、metrics 與 bad cases 持久化，提供可重複分析的評估迴圈。

## 架構與技術
後端以 **FastAPI + DuckDB**（harness DB 與 sample warehouse 雙庫）建構，模組化拆分為 benchmark loaders、prompt renderer、schema retrieval、generation adapters、SQLGlot safety validator 與 sandboxed executor。前端為 **React 18 + TypeScript + Vite + Tailwind**，以 Apache ECharts 呈現 radar、latency histogram、error treemap 與 ablation heatmap，並用 i18next 提供 zh-TW／en-US 雙語暗色 Agentic BI Terminal 介面。

## SQL 安全與評估
SQL 先以 **SQLGlot** 解析並通過 denylist 前置檢查，阻擋變更語句、多語句、非白名單資料表、沙箱逃逸與高風險 `SELECT *`，再於沙箱執行。評估計算 execution accuracy、exact match、valid SQL rate、unsafe rejection rate、execution error rate、latency 與 12 類 error taxonomy；API 觸發的 run 採非同步佇列、提供進度事件、可選 LLM 自我修正與 final-SQL-only 計分。

## 生成 adapter 與部署
支援三種生成 adapter：deterministic **mock**（測試／demo 的穩定 fallback）、**OpenAI-compatible** 與 **llama.cpp**（OpenAI 相容 `llama-server`，預設 Qwen2.5-7B），並可透過 Tailscale 將 VPS 後端連回本地推論主機而不暴露於公網。專案具 GitHub Actions CI、Docker／docker-compose 生產組態與 `make prod-check` 部署健康檢查。

## 成果
交付完整的 prompt／retrieval／model ablation 與報告匯出（Markdown／JSON／CSV／ZIP）流程，搭配 bad case replay 與回歸標記，讓 Agentic BI 的 SQL 生成在部署前即可被可靠地量測與比較。
