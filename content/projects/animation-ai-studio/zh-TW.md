---
title: "Animation AI Studio：可展示的 AI 動畫工作流 Demo 平台"
tagline: "把分鏡規劃、生成任務、結果瀏覽與系統監控整理成面試官能快速理解的產品介面"
summary: "Animation AI Studio 是一個本地優先的 AI 動畫工作流平台。這次整理後，專案不再只是研究型 scripts，而是具備 GitHub Pages 作品頁、可重跑的 mock-safe Web UI、seeded demo scenarios、截圖與錄影素材的 portfolio demo。面試官可以先看公開頁面理解價值，再用本機 demo mode 看到 FastAPI、SQLite、Job Queue、Results Browser 與 System Monitor 的完整操作流程。"
role: "獨立開發者（產品定位、全端實作、demo engineering、部署與文件整理）"
problem: "AI 動畫專案很容易停留在模型腳本或半成品狀態：需要 GPU、模型權重、ComfyUI、API key、影片素材與多個 batch scripts 才能展示。這對面試情境很不友善，因為審查者無法在短時間內理解專案價值，也無法穩定看到功能成果。這個專案要解決的是：如何把研究型 AI pipeline 包裝成可以展示、截圖、錄影、重跑且誠實標示能力邊界的作品集專案。"
solution: "我建立了雙模式架構：demo mode 使用 repo-local SQLite 與 outputs/demo，透過 deterministic mock runner 產生 logs、summary、storyboard、quality report 與 gallery preview，不需要私密金鑰、GPU 或模型檔；full mode 則保留原本通往 ComfyUI、image providers、TTS、FFmpeg 與 batch scripts 的整合路徑。Web UI 使用 Vanilla JS SPA + FastAPI，提供 Jobs、Action、Image、Creative、Results、System 等頁面；後端以 FastAPI routers、SQLite job database 與 JobService 管理任務、輸出與進度。另有 GitHub Pages 的 portfolio-web，第一屏直接展示產品本體，並包含截圖、WebM demo 影片、架構說明與本機啟動指令。"
outcome: "目前公開展示鏈路已完成：GitHub Pages 能看到完整 landing page、截圖、錄影 demo 與說明；本機可用 scripts/demo/run_web_ui_demo.sh seed demo data 並啟動 Web UI；核心 API、前端 JS 語法、Python py_compile、重點 pytest、demo job submission、公開媒體資產 200 檢查都已驗證。完整 GPU/model pipeline 仍需本機模型、外部服務與 provider credentials，因此在文件中明確標示為 full-mode extension path。"
highlights:
  - "GitHub Pages 公開展示頁：包含產品定位、架構、截圖、WebM demo 與本機操作指引"
  - "Mock-safe demo mode：不需要 API key、模型權重或 GPU，也能展示完整 job flow"
  - "Seeded scenarios：completed、running、failed、provider routing 等展示狀態"
  - "FastAPI + SQLite job backend：jobs、outputs、stats、results、system metrics API"
  - "Vanilla JS Web UI：Jobs Dashboard、Results Browser、System Monitor 與 job detail"
  - "Demo artifacts：summary.json、quality_report.json、storyboard manifest、logs、gallery preview"
challenges:
  - "把原本分散的 AI scripts 包裝成可被面試官快速理解的產品型 demo，而不是只展示程式碼"
  - "在不依賴 GPU、ComfyUI、模型權重或私密金鑰的情況下，仍保留可信的資料流與結果輸出"
  - "維持 demo mode 與 full mode 的界線，避免公開展示時誇大尚需外部 runtime 的能力"
nextSteps:
  - "將互動式 FastAPI demo 部署到 Render / Railway / Fly.io，讓面試官不必本機啟動也能操作"
  - "補上更多真實模型輸出案例，讓 demo artifacts 從 mock preview 擴展到真實生成結果"
  - "把 full-mode provider execution、queue retry、job cancellation 與 artifact preview 做更完整的端到端測試"
---
## 展示重點

這個專案現在的展示重點不是「我有很多生成模型 scripts」，而是「我能把複雜 AI pipeline 整理成可觀測、可重跑、可部署、可被非專案成員理解的產品介面」。公開頁面可以直接看到 demo video 與 screenshots，本機 demo mode 則可以實際跑出 seeded jobs、提交 mock job、瀏覽 outputs，並看到 CPU/RAM/GPU/Disk 監控。

## 技術架構

前端分成兩層：`portfolio-web/` 是 GitHub Pages 靜態展示站，放置 landing page、截圖與錄影；`web_ui/frontend/` 是 Vanilla JS SPA，提供 Jobs、Results、System 等操作頁。後端是 `web_ui/backend/` 的 FastAPI service，包含 jobs、stats、results、system、action、image、creative 等 routers。資料層使用 SQLite，記錄 jobs、job_outputs、progress events 與 system metrics。執行層由 JobService 管理：demo mode 走 deterministic artifact generator，full mode 才交給 batch scripts 與外部 provider。

## Demo 操作流程

建議面試展示流程是：先打開 GitHub Pages 作品頁說明定位，再展示 Jobs Dashboard 的 completed/running/failed 狀態；接著打開 Results Browser 看 outputs/demo 裡的 artifacts；再提交一個 demo-mode job，展示 job 從 pending 到 completed 並產生 logs、summary、storyboard、gallery；最後打開 System Monitor，說明這個介面如何對應真實 GPU/模型 pipeline 的資源監控。

## 工程取捨

我刻意把 demo mode 和 full mode 分開。demo mode 的目標是穩定展示：不需要私密環境、不讀大型模型、不依賴 `/mnt/data`，所有輸出都在 repo-local `outputs/demo` 產生。full mode 則保留通往 ComfyUI、LTX/Wan providers、TTS、FFmpeg 與既有 scripts 的路徑，但文件明確標示這部分需要本機 runtime、模型資產與 credentials。這樣做可以讓作品展示誠實，同時也讓面試官看到我對部署、可觀測性與 demo engineering 的重視。
