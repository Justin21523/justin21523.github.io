---
title: "IR / RAG Evaluation Lab"
tagline: "一個專業的資訊檢索與 RAG 評估工作台，展示 BM25、Dense、Hybrid、Rerank、RAG citation、LLM judge 與文本探勘分析。"
summary: "IR / RAG Evaluation Lab 是一個 benchmark/evaluation lab，不是聊天機器人 UI。它支援 custom JSONL、BEIR/MS MARCO/OpenAlex ingestion、BM25 baseline、dense fallback、hybrid search、reranker interface、retrieval metrics、bad case analysis、RAG citation checker、local llama.cpp judge、query rewrite experiment、text mining network analysis，以及完整中英文 React dashboard。"
role: "獨立開發者 / IR、RAG 與 Evaluation Workflow 架構師"
problem: "很多 RAG demo 只展示把 embedding 丟進 vector DB 後得到一段答案，卻無法證明 retrieval 是否真的找到正確 evidence，也無法解釋失敗 query、citation coverage、bad cases 或 LLM judge 的可靠性。這個專案的目標是做出一個可重現、可展示、可診斷的 IR/RAG evaluation lab。"
solution: "我使用 FastAPI + DuckDB 實作 dataset registry、BM25/dense/hybrid/rerank retrievers、experiment persistence、retrieval metrics、bad case root cause workflow、RAG claim-to-evidence evaluation、llama.cpp local judge history，以及 text mining pipeline。前端使用 React + TypeScript + Vite，提供自動啟動的導覽小幫手、Pipeline Journey、互動式 heatmap/scatter/network/Sankey/chart dashboard，並用 Playwright 產生完整截圖與錄影驗證。"
outcome: "一個面試可直接展示的 evaluation platform：使用者能上傳 JSONL 或使用 sample dataset，跟著導覽小幫手逐步理解資料如何被清理、索引、檢索、評估、分析與報告化，並能檢查 llama.cpp judge 是否為真實連線。"
highlights:
  - "BM25、Dense、Hybrid、Rerank 的可比較 retriever workflow，所有 search/evaluate run 都寫入 DuckDB。"
  - "Evaluation Analytics 包含 metric matrix、failure heatmap、rank movement、retriever battle、query diagnostics 與 deterministic insight summary。"
  - "RAG Citation Checker 將 answer 拆成 claims，對應 evidence/citation，並以 local llama.cpp 輔助判斷 supported、partially supported、unsupported 或 contradictory。"
  - "Text Mining 頁整合共現網路、collocation、association rules、Sankey flow、community detection 與 Gephi-like network workbench。"
  - "App 式導覽小幫手每次進站自動啟動，逐步跳到各頁指定區塊並搭配 spotlight 與 pipeline journey 解釋結果意義。"
challenges:
  - "讓專案保持 benchmark/evaluation lab 定位，而不是退化成一般 ChatGPT UI。"
  - "設計 fallback 與 real llama.cpp mode，讓 demo 離線可跑，但真實 LLM judge 也能被記錄與驗證。"
  - "把 raw JSON payload 產品化成 cards、badges、confidence bars、history dashboard 與 reviewer workflow。"
  - "用 Playwright 驗證整個導覽、每個主要頁面、長頁 scroll screenshots、錄影與雙語切換。"
nextSteps:
  - "接入更大型的 BEIR/MS MARCO/OpenAlex benchmark corpus 與更多 qrels。"
  - "加入更正式的 reranker/cross-encoder model adapter 與 Prompt Studio。"
  - "擴充報表成可互動的 benchmark artifact，支援更多 stakeholder-friendly conclusions。"
---
IR / RAG Evaluation Lab 的核心不是「產生答案」，而是證明 retrieval 與 RAG 評估流程是否可靠。

使用者可以上傳 `documents.jsonl` 與 `queries.jsonl`，也可以使用內建 sample dataset。系統會把資料寫入 DuckDB dataset registry，檢查資料品質，建立 BM25/dense/hybrid/rerank 的 evaluation runs，並產生 Precision@K、Recall@K、MRR、MAP、nDCG@K、latency 與 zero-result rate。

前端是一個雙語 evaluation dashboard。它包含 Query Evaluator、Retrieval Comparison、Evaluation Analytics、RAG Citation Checker、Bad Case Viewer、LLM Evaluation、Text Mining 與 Experiment Runs。自動啟動的小幫手會引導面試官逐步跳到每個功能區，解釋每個數值與圖表代表什麼，而不是只展示漂亮圖表。

local llama.cpp 被用在 evaluation workflow：claim support、bad case root cause suggestion、query rewrite experiment、faithfulness judgment 與 analyst notes。UI 會清楚標示 LLM judge 是 assistive signal，不是 ground truth，並保留 latency、confidence、invalid JSON rate 與 run history。

我使用 Playwright 做完整 walkthrough 驗證，包含導覽小幫手、Pipeline Journey、query evaluation、analytics heatmap、RAG citation、LLM dashboard、text mining network 與中英文切換；截圖與錄影都已連到本頁。
