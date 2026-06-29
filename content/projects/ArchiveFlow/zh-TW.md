---
title: "ArchiveFlow Studio"
tagline: "以節點式 Workspace 管理個人數位典藏、Metadata、關係與匯出流程。"
summary: "ArchiveFlow Studio 是以 C#、.NET 10 與 Avalonia 建立的跨平台桌面應用，核心是節點式 Workspace canvas。Desktop Full Version 使用本機 SQLite、Repository、Metadata editor、Graph Explorer、Import/Export pipeline；Browser Workspace Demo 則以 Avalonia WebAssembly 發布到 GitHub Pages，使用內建 sample data 與 in-memory storage 展示主要操作流程。"
role: "獨立開發者 / Metadata 系統設計者 / .NET + Avalonia 工程師"
problem: "個人或小型單位的數位檔案常散落在資料夾中，缺少一致 Metadata、關係脈絡、批次處理流程與可交換的典藏格式。"
solution: "我設計一個節點式 Workspace，讓使用者把檔案來源、篩選、搜尋、Metadata 操作、關係建立與輸出串成可預覽、可套用、可重複執行的流程。瀏覽器 Demo 則保留這個互動模型，但用模擬資料避免觸碰瀏覽器 sandbox 無法支援的桌面功能。"
outcome: "完成 Desktop Full Version 與 Browser Workspace Demo 的雙版本展示：桌面版保留完整本機能力，網頁版讓面試官可以直接在線上操作節點畫布、inspector、結果表、mock import/export 與 metadata preview/apply。"
highlights:
  - "Browser Demo 第一畫面即為 Workspace canvas，包含節點庫、可拖曳節點、inspector、result table 與 pending changes。"
  - "Desktop 版保留本機 SQLite、Metadata Editor、Graph Explorer、Import Pipeline 與 Export Job Log。"
  - "以 service abstraction 區分桌面功能與瀏覽器 Demo Mode，避免把平台差異散落在 UI 中。"
  - "GitHub Pages 部署的是 Avalonia WebAssembly publish 後的靜態 wwwroot，不是假裝執行桌面程式。"
challenges:
  - "瀏覽器 sandbox 不能任意掃描本機資料夾、寫入 SQLite 檔案或使用原生 file dialog，因此需要清楚的 Demo Mode 邊界。"
  - "Workspace canvas 要在桌面與瀏覽器都維持可理解的節點流程、inspector 與結果回饋。"
  - "portfolio 頁面必須清楚區分 Desktop Full Version 與 Browser Demo Version，避免對功能完成度造成誤解。"
nextSteps:
  - "持續補齊更多 built-in nodes 的實際執行測試。"
  - "擴充 Workflow save/load 與更多 metadata mapping。"
  - "補上更完整的 demo screenshots 與操作腳本。"
---
ArchiveFlow Studio 是我用來展示「圖書資訊、Metadata、桌面 UI 與工程實作」交集的代表作品。它不是單純的檔案列表，而是把個人數位典藏流程變成可以操作的節點式 Workspace。

目前完整能力以 Desktop Full Version 為主，包含本機資料庫、檔案匯入、Metadata 編輯、關係建立、Graph Explorer 與匯出紀錄。Browser Workspace Demo 則是為了 portfolio 線上展示而做的 WebAssembly 版本：它不掃描使用者電腦、不寫入本機 SQLite，也不直接輸出到任意資料夾，而是用內建 sample data 模擬主要流程。

Demo 的重點是讓使用者一打開網頁就看到 Workspace canvas，可以理解 source、filter、search、metadata action、result table 之間如何連接，並在右側 inspector 看見不同節點的作用與目前輸出。這讓線上作品集可以展示產品核心互動，同時不誤導使用者以為瀏覽器版等同桌面版。
