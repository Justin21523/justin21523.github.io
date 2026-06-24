---
title: "Fandom / MediaWiki Scraper Platform"
tagline: "以 MediaWiki API 為優先、支援 SQLite 瀏覽、分析、匯出與合規紀錄的 Wiki data platform。"
summary: "我把原本的 Fandom GUI scraper 穩定化並升級成 Web-first 的資料平台：使用者可以建立多 wiki campaign、走合規爬取流程、產生 wiki.db、瀏覽 pages/categories/links/templates/images/revisions/infobox/page text，並查看分析圖表、匯出資料與完整導覽錄影。"
role: "獨立 Python / Web Scraping / Data Engineering / GUI / Frontend Developer"
problem: "單純 scraper 很容易停留在抓 HTML 和輸出檔案，但作品集需要展示更完整的工程能力：API-first 設計、合規 runtime 控制、可恢復資料流程、可檢查的 SQLite dataset、Web/Qt UI、分析視覺化與可重現 demo。"
solution: "我先穩定 runtime 與合規設計，移除不適合的 bypass/proxy/fingerprint 命名與 eager import 副作用，再建立 MediaWiki Action API 優先的資料流程。Web UI 以 Campaigns、Scraper、Process、Browse、Analysis、Export、Compliance Log 組成，並用 Playwright 產生使用者導覽截圖與錄影。"
outcome: "專案現在可以展示為完整 Fandom / MediaWiki Wiki Data Scraper & Analysis Platform：包含 FastAPI backend、PyQt6 desktop viewer、SQLite wiki.db、CSV/JSON/Parquet export、HTML infobox fallback、分析視覺化、雙語 Web UI、使用者導覽小幫手與部署後 live demo。"
highlights:
  - "建立 API-first crawler flow，優先走 MediaWiki Action API，HTML parsing 只作為 infobox-like data fallback。"
  - "用 SQLite 儲存 pages、categories、links、templates、images、revisions metadata、infobox fields 與 page text，並支援 Web/Qt 瀏覽。"
  - "完成 Campaigns / Browse / Analysis 的 live data UX：dataset count、搜尋、分頁、錯誤 drill-down、network graph 與資料品質摘要。"
  - "加入使用者導覽小幫手、雙語介面、indigo/light visual theme、Playwright section screenshots 與 demo recording。"
challenges:
  - "要避免把 scraper 做成灰色反爬工具，因此功能邊界必須明確：不做 CAPTCHA、Cloudflare、登入牆、代理池或 fingerprint bypass。"
  - "需要讓 offline demo、sample wiki.db 與 live crawl preset 同時存在，讓展示不依賴外部網路但仍能證明 pipeline 可運作。"
  - "Qt GUI、FastAPI backend、static Web UI、SQLite schema 與 portfolio page 都要對齊同一套資料流程。"
nextSteps:
  - "把更多 MediaWiki edge cases 納入 integration tests，例如 continuation、redirects、template-heavy pages 與 image metadata。"
  - "擴充 analysis layer，例如 centrality metrics、category clustering 與 text quality scoring。"
  - "把 demo deployment 拆成更穩定的 container release flow，降低遠端手動部署成本。"
---
這個專案的核心不是「抓一個網站」，而是把 Fandom / MediaWiki wiki 資料變成可檢查、可恢復、可分析的 data platform。使用者可以選擇快速離線 demo，也可以使用合規即時爬取 preset；流程會展示 URL normalization、robots check、API discovery、rate limit、retry/backoff、checkpoint、SQLite persistence 與 export。

資料層以 `wiki.db` 為中心。Crawler 會把 MediaWiki pages、categories、links、templates、images、revisions metadata、infobox-like fields 與 page text 寫入 SQLite，Web Browse 和 Qt Viewer 都可以讀同一份資料。這讓 demo 不只是看 UI，而是可以真的檢查資料表、搜尋資料集、切換 dataset、分頁瀏覽、下載 CSV/JSON/Parquet。

Web UI 是這次作品集展示的主角。Campaigns 頁呈現多 wiki run、每個 wiki 的資料量與事件；Process 頁把爬取流程視覺化；Browse 頁讓使用者查資料；Analysis 頁用 category bars、text terms、network graph 和 quality checks 顯示資料工程後的分析價值；Compliance Log 則記錄 robots、rate limit、403/429、停止原因與非目標功能。

我也把展示流程本身自動化。Playwright 會開啟 demo app、設定中文與主題、跑使用者導覽小幫手、逐步跳到對應頁面並擷取區塊截圖與錄影。這些素材會同步放進 README、live demo preview 和 portfolio project page，讓使用者不用猜功能在哪裡，也能快速看到完整 pipeline。
