---
title: "Quant Strategy Agent Lab 量化策略 Agent 實驗室"
tagline: "從股票池、資料品質、Scanner 到 Portfolio Rebalance 的本地量化研究工作台。"
summary: "以 FastAPI、SQLite、pandas 與 Vanilla JavaScript 打造的量化研究平台，支援股票池管理、批次資料同步、技術指標 Scanner、資料品質報告、multi-asset backtest、portfolio rebalance、長任務進度與可視化 research demo。公開 GitHub Pages 版使用靜態 fixture snapshot 展示完整產品流程；本機版則保留 FastAPI/SQLite 的完整研究工作流。"
role: "獨立開發者：後端資料層、策略與回測服務、前端操作台、自動導覽、Playwright 截圖錄影與 GitHub Pages 展示部署。"
problem: "量化研究工具如果只展示單檔回測，很難看出真實研究流程；實務上需要先處理股票池、資料品質、批次同步、Scanner 篩選、portfolio rebalance 與結果報告，還要能清楚標示 fixture/sample data，避免展示結果被誤解為投資建議。"
solution: "把量化研究拆成可稽核的模組：market cache、universe、scanner presets、data-quality gates、job queue、portfolio rebalance、performance analyzer 與 report center。前端加入 Demo Studio 與 site guide，小幫手會自動框選各功能區、顯示粒子效果與步驟說明；Playwright 則自動產生展示截圖、導覽影片與 HTML trace。"
outcome: "目前已完成 Phase 9F 級別的可展示研究工作流：使用者進入網站即可看到 sample research playback，也能透過小幫手走完整站導覽。GitHub Pages 公開 demo 使用 deterministic fixture snapshot，不需要後端服務也能展示 scanner、portfolio matrix、performance report 與 report center。"
highlights:
  - "股票池 / universe、批次 sync、scanner presets、skipped symbols reason 與 sync history"
  - "資料品質報告：bar count、first/last date、missing weekdays、fixture flag、SMA200 / 252D readiness"
  - "Portfolio / Rebalance MVP：週/月 rebalance、scanner top N、equal weight、turnover、drawdown、Sharpe、benchmark"
  - "Research Lab 一鍵 pipeline：sync、quality、scanner、portfolio matrix、strategy comparison、report export"
  - "長任務 job queue：pending/running/success/failed、progress、result id 與 error log"
  - "小幫手導覽：15 步 site guide、spotlight、粒子效果、右下角步驟卡與跨頁導航"
  - "Playwright showcase：大量截圖、導覽錄影、poster、trace 與 HTML report"
challenges:
  - "GitHub Pages 不能執行 FastAPI/SQLite，因此需要 static demo adapter，以 fixture snapshot 模擬完整 API 互動"
  - "量化展示必須清楚區分工程 demo、fixture data 與真實投資建議"
  - "Portfolio card 與媒體櫃需要符合既有作品集格式，同時保留可點擊的 live demo、video、GitHub、README link"
nextSteps:
  - "加入更多真實資料 provider 與更嚴格的 data freshness policy"
  - "擴充 portfolio optimizer、rebalance cost model 與 factor exposure 分析"
  - "將 research pipeline artifacts 做成可下載且可重現的研究包"
---
## 專案概述

Quant Strategy Agent Lab 是一個本地優先的量化策略研究工作台。它不是只做單檔股票回測，而是把大量股票研究會遇到的流程拆成一條可操作的 pipeline：先建立股票池，批次同步市場資料，再跑資料品質檢查、技術指標 scanner、multi-asset backtest、portfolio rebalance 與績效報告。

## Demo 展示策略

公開網站部署在 GitHub Pages，因此不能依賴 FastAPI 後端常駐。這次新增 static demo mode，前端會讀取 deterministic fixture snapshot，讓 dashboard、Research Lab、Scanner、Portfolio、Performance、Report Center 與小幫手導覽都能在純靜態環境中運作。本機開發仍可啟動完整 FastAPI + SQLite 服務。

## 工程重點

後端以 FastAPI、Pydantic、SQLite 與 pandas 建立資料與研究服務；前端用 Vanilla JavaScript、Vite、原生 SVG 圖表與模組化頁面組成操作台。Playwright 不只負責 E2E 測試，也負責作品集展示素材：自動截圖、錄下小幫手導覽影片，並保留 HTML report 與 trace 方便回看。

## 現況

目前最適合作為量化研究平台原型與 portfolio demo：它展示資料工程、API 合約、批次任務、研究工作流、視覺化與部署包裝能力。所有展示資料皆為 synthetic fixture，不構成投資建議。
