---
title: "ArchiveFlow Studio"
tagline: "以節點式工作流程管理個人數位典藏、Metadata、檔案處理與 Dublin Core 匯出。"
summary: "ArchiveFlow Studio 是 C#、.NET 9 與 Avalonia 建立的跨平台桌面應用，核心是一個節點式 Metadata 工作流程畫布。它結合 SQLite、Dapper、FluentMigrator、ImageSharp、FTS5 全文檢索、背景工作佇列與外掛架構，用來整理檔案、產生縮圖、建立關聯、匯出 Dublin Core，呈現我在數位典藏與資訊架構上的特色。"
role: "獨立開發者 / Metadata 系統設計者 / 桌面應用工程師"
problem: "個人或小型單位的數位檔案常散落在資料夾中，缺少一致的 Metadata、關係脈絡、批次處理流程與可交換的典藏格式。"
solution: "我設計一個節點式工作流程系統，讓使用者把檔案來源、篩選、Metadata 操作、關係建立與輸出串成可重複執行的管線，並用 SQLite + FTS5 支援本機檢索。"
outcome: "完成一個能把數位典藏知識轉成互動桌面工具的代表作品，特別適合展示 Metadata、Dublin Core、全文檢索、工作流程設計與 Avalonia 自訂 UI 能力。"
highlights:
  - "從零設計節點式工作流程畫布，支援拖曳、縮放、節點選取與 Bezier 連線。"
  - "以 EAV Metadata 模型處理彈性欄位，並支援 Dublin Core XML 匯出。"
  - "使用 SQLite、Dapper 與 FTS5 建立本機檢索與資料保存能力。"
  - "加入背景工作佇列與 ImageSharp 縮圖產生，避免大量檔案處理卡住 UI。"
challenges:
  - "節點畫布需要同時處理互動、資料流、參數狀態與視覺連線。"
  - "典藏 Metadata 欄位不固定，資料模型必須兼顧彈性與可查詢性。"
  - "大量檔案索引與縮圖產生必須移到背景執行，不能影響操作體驗。"
nextSteps:
  - "強化外掛 API 文件，讓新的檔案處理節點可以獨立擴充。"
  - "加入更多 Metadata 標準格式，例如 MODS 或自訂欄位 mapping。"
  - "補上 workflow history、undo/redo 與匯入範本。"
---
ArchiveFlow Studio 是目前最能代表我圖書資訊與工程交集的作品之一。它不是單純的檔案管理器，而是一個把「數位典藏流程」視覺化、模組化、可重複執行的桌面系統。

這個專案的重點在於 Metadata 與 workflow。使用者可以在畫布上放入來源節點、篩選節點、Metadata 操作節點、關係節點與輸出節點，把原本散落的檔案整理流程變成一條可調整的管線。對我來說，這正好結合數位典藏、分類、檢索、知識組織與互動 UI 設計。

技術上，ArchiveFlow 使用 Clean Architecture、MVVM 和 Repository Pattern。Avalonia UI 負責桌面介面與自訂畫布；SQLite + Dapper 負責本機資料存取；FluentMigrator 管理資料庫 schema；ImageSharp 產生縮圖；SQLite FTS5 提供全文檢索。這些不是為了堆技術名詞，而是對應到實際需求：大量檔案、彈性 Metadata、快速搜尋與背景處理。

這個作品會是網站中的主力案例，因為它最清楚說明我不只是會寫前端或桌面 UI，也能把資訊架構、Metadata 標準與工程實作串成一個完整產品。
