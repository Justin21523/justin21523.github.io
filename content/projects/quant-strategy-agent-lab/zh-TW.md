---
title: "Quant Strategy Agent Lab 量化策略 Agent 實驗室"
tagline: "本地優先的量化策略研究工作台，從資料、指標到確定性回測一條龍。"
summary: "以 FastAPI + SQLite + pandas 打造的本地量化研究工作台，提供正規化 OHLCV 資料層、六種技術指標、五個策略模板與 Strategy JSON DSL，並用自研確定性回測引擎產出績效、權益曲線與 Agent 式執行步驟。前端採無框架 Vanilla JS 與原生 SVG 圖表。教學與研究用途，不構成投資建議。"
role: "獨立開發者：後端架構、回測引擎、DSL 設計、前端與測試全包辦。"
problem: "量化策略研究常依賴黑箱回測套件，執行假設（成交價、手續費、滑點、清算規則）不透明且難以稽核，學習與驗證成本高。"
solution: "以分層架構切開資料層、指標引擎、策略模板與 DSL、回測引擎與 Agent 工作流；刻意先自研小型確定性回測 MVP，把所有執行假設攤在陽光下，再以 89% 後端測試覆蓋率與合成 fixture 確保可重現。"
outcome: "完成 Phase 4：可對單一快取資產執行單一策略回測，輸出總報酬、年化報酬、Sharpe、最大回撤、勝率、獲利因子等指標與權益／回撤曲線；後端 35 項測試通過、覆蓋率 89%，前端 5 項測試與 Vite production build 皆過。"
highlights:
  - "自研長線單向確定性回測引擎：次根 K 棒開盤成交、顯式手續費與滑點、最終強制清算，假設完全透明可稽核"
  - "Strategy JSON DSL 1.0：以宣告式 JSON 描述進出場與風控規則，含結構與指標引用驗證"
  - "六種技術指標（SMA／EMA／RSI／MACD／布林通道／ATR）按需從 SQLite 快取 K 棒計算"
  - "provider-neutral 資料層：CSV 合成 fixture 預設離線可跑，yfinance 與 FinMind 為預留 adapter 邊界"
  - "無前端框架：Vanilla JS + ES Modules + 原生 SVG 繪製價格、指標、權益與回撤圖"
  - "Agent 式執行時間軸：以確定性步驟（接收→驗證→載入資料→算指標→產訊號→回測→分析→解釋→產報告）編排工具，可引用具體資料假設"
challenges:
  - "在不依賴 backtesting.py／vectorbt 的前提下，自行實作可重現且假設清晰的回測撮合與清算邏輯"
  - "設計一套既能涵蓋多種策略模板、又能嚴格驗證的 Strategy JSON DSL"
  - "誠實標示合成 fixture 與回測邊界，避免任何結果被誤解為投資建議"
nextSteps:
  - "Phase 5：Backtest Lab 前端體驗打磨與圖表強化"
  - "Phase 6：Agent Timeline MVP，落實事件化執行追蹤"
  - "Phase 9：導入 LLM 策略解析器，將自然語言轉為驗證過的 Strategy DSL"
---
## 概述

Quant Strategy Agent Lab 是一個**本地優先（local-first）**的量化策略研究工作台，用 Python、FastAPI、SQLite、pandas 與模組化 Vanilla JavaScript 打造。它把量化研究的完整鏈路——市場資料、技術指標、策略模板與 DSL、回測引擎，到 Agent 式執行編排——拆成清楚的分層，讓每一步的假設都可被檢視與測試。專案定位為教學與研究用途，明確聲明不提供投資建議。

## 架構

後端採分層設計：`domain` 放 provider-neutral 的市場、指標、策略與回測模型；`providers` 以 adapter 邊界整合 CSV（預設離線合成 fixture）、yfinance 與預留的 FinMind；`services` 承載正規化、指標、策略模板與回測邏輯；`repositories` 負責 SQLite 持久化與資料來源 lineage。前端刻意不使用任何框架，以 ES Modules、Fetch API、原生 DOM 與原生 SVG 圖表構成路由式單頁應用，Vite 僅作為開發與建置工具。

## 回測與 Agent 工作流

Phase 4 刻意先採用自研的小型**確定性回測 MVP**，而非立即依賴 backtesting.py 或 vectorbt。引擎假設透明：僅日線、長線單向、單一持倉、規則在完成的 K 棒上評估、一般訊號於次根開盤成交、收盤強制清算、手續費與滑點為顯式輸入。Agent 工作流則是以確定性步驟編排這些工具（接收策略→驗證→載入資料→計算指標→產生訊號→回測→績效分析→風險解釋→產生報告），而非讓模型直接成為計算引擎或執行任意產生的程式碼；LLM 自然語言解析器規劃於 Phase 9 加入。

## 品質

專案以 Ruff、Pytest（含覆蓋率）、ESLint、Prettier、前端 Node 測試與 Vite production build 組成 `make check` 品質閘門。目前 Phase 4 驗證：後端 35 項測試通過、覆蓋率 89.01%，前端 5 項測試通過，並完成動態埠的執行期煙霧測試。
