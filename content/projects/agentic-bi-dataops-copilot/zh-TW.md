---
title: "Agentic BI / DataOps 副駕"
tagline: "Schema 感知 Text2SQL 加三重 SQL 安全護欄的本地 BI 副駕"
summary: "面向零售資料倉儲的中英雙語自然語言分析平台。使用者以自然語言提問，系統經 schema retrieval、Text2SQL、三重 SQL 安全驗證、唯讀 DuckDB 執行與圖表推薦完成分析。預設規則式轉換器零 API Key 即可運行，整合 16 階段 DataOps 導覽前端，重點在安全、可解釋與可評估。"
role: "全端開發者：後端架構、SQL 安全驗證器、評估流程與 React 前端"
problem: "讓非技術使用者用自然語言查詢資料倉儲很吸引人，但直接信任 LLM 產生的 SQL 會帶來刪改資料、注入攻擊與失控查詢等風險，且多數 demo 缺乏可評估與可驗證的安全機制。"
solution: "建立 schema 感知的 Text2SQL 管線，所有 SQL（含 LLM 輸出）一律通過三重驗證器（regex 黑名單、sqlparse AST 解析、資料表白名單），再於唯讀 DuckDB 連線執行並注入 LIMIT 與逾時保護；輔以基準 YAML 與量化指標確保可評估。"
outcome: "完成可端到端運行的作品集級平台：規則式轉換器零成本運作、20+ pytest 測試、12 案例基準（不安全查詢 100% 攔截目標），並以 Playwright 驗證 16 階段 React 導覽前端。"
highlights:
  - "三重 SQL 安全驗證加唯讀 DuckDB 的縱深防禦"
  - "零 API Key 規則式 Text2SQL 即可完整 demo"
  - "12 案例基準與量化安全/準確指標"
  - "Playwright 自動驗證 16 階段導覽前端"
  - "FastAPI 提供清晰 REST API 與互動式文件"
  - "中英雙語提問與語意化資料目錄 (catalog.yaml)"
challenges:
  - "在攔截危險語句的同時控制誤判率（false positive）"
  - "以關鍵字評分做 schema retrieval，需在簡潔與召回間取捨"
  - "維持規則式與 LLM 兩條轉換路徑共用同一驗證層"
nextSteps:
  - "完成 OpenAI 轉換器（目前為 stub），接上真實 API 呼叫"
  - "以 sentence-transformer 嵌入取代關鍵字評分做語意檢索"
  - "加入 JWT/OAuth 驗證與速率限制以邁向生產"
---
## 概述
Agentic BI / DataOps Copilot 是一個面向零售資料倉儲的自然語言分析平台。使用者以中文或英文提問，系統依序完成 schema retrieval、Text2SQL 生成、SQL 安全驗證、查詢執行、圖表推薦、查詢歷史與資料品質檢查。整個專案的核心理念是「安全、可解釋、可評估」，而非讓 agent 看起來炫目。

## 安全架構
所有 SQL（包含未來 LLM 產生的輸出）都必須通過 `validator.py` 的三重驗證：Pass 1 以 regex 攔截 DROP/DELETE/UPDATE 等 20 多種危險關鍵字與註解注入；Pass 2 以 sqlparse 解析 AST，阻擋多語句、非 SELECT 與註解 token 注入；Pass 3 僅允許白名單內的零售資料表。通過後再以 `read_only=True` 的 DuckDB 連線執行，並注入 LIMIT 與執行緒逾時，形成多層縱深防禦——LLM 永遠不被直接信任。

## 技術棧與可評估性
後端採 Python 3.11、FastAPI、Pydantic v2 與 DuckDB（in-process OLAP），以 uv 管理套件；SQL 解析使用 sqlparse 與 sqlglot。前端為 React + TypeScript + Vite + TailwindCSS，以 Recharts 視覺化，並由 Playwright 驗證 16 階段導覽與各功能頁。評估面提供基準 YAML 與 `unsafe_rejection_rate`、`valid_sql_rate`、`execution_accuracy`、`false_positive_rate` 等量化指標。

## 誠實的完成度
規則式 Text2SQL 路徑、驗證器、查詢執行、評估流程與前端皆可端到端運行並附 20+ pytest 測試；資料為完全合成、無真實個資。OpenAI 轉換器目前為 stub，驗證與授權、速率限制、語意檢索與外部基準（Spider/BIRD）列為後續生產化項目。
