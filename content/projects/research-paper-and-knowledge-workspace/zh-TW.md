---
title: "Research Paper & Knowledge Workspace"
tagline: "把研究文獻、註記、Metadata 與論文關係整理成可操作的桌面工作區。"
summary: "這是一個以 C#、.NET 9、Avalonia、Entity Framework Core 與 SQLite 建立的跨平台研究文獻管理工具。重點不是只做一個資料表，而是把書目 Metadata、閱讀狀態、Markdown 註記、附件與論文之間的語意關係整合成研究者可以持續使用的本機知識工作區。"
role: "獨立開發者 / 桌面應用工程師 / 資訊架構設計者"
problem: "研究文獻通常散落在 PDF、筆記、資料夾和引用工具之間，文獻 Metadata、閱讀狀態、註記和論文關係很難在同一個工作脈絡中被整理與追蹤。"
solution: "我用 Clean Architecture 和 MVVM 拆分 Domain、Application、Infrastructure 與 Avalonia App 層，並用 EF Core + SQLite 建立本機資料模型，讓研究者可以管理論文、作者、標籤、註記、附件與 paper-to-paper 關係。"
outcome: "完成一個可展示的研究文獻桌面工作區，能清楚呈現我把圖書資訊學背景轉成軟體架構、Metadata 設計與桌面 UI 流程的能力。"
highlights:
  - "以 Clean Architecture 切分 Core、Application、Infrastructure 與 App，避免 UI、資料庫與領域邏輯混在一起。"
  - "用 EF Core + SQLite 管理 Paper、Author、Tag、Note、Attachment 與 Research Project 等關聯資料。"
  - "支援閱讀狀態、評分、優先度、收藏與封存，讓研究資料能被長期維護。"
  - "設計論文之間的 directional relationship，包含 references、builds-on、contradicts、related 等語意連結。"
challenges:
  - "文獻管理不是單純 CRUD；資料模型必須同時支援書目 Metadata、註記、附件與論文關係。"
  - "Avalonia MVVM 需要把 UI 狀態、非同步資料載入與本機資料庫操作拆乾淨。"
  - "論文關係是自我關聯資料，必須避免 UI 呈現與資料模型互相綁死。"
nextSteps:
  - "補上更多篩選條件，例如 DOI、期刊、作者、研究專案與閱讀狀態複合查詢。"
  - "把論文關係圖做成互動式視覺化，協助瀏覽研究脈絡。"
  - "增加 BibTeX / RIS 匯入與匯出流程。"
---
這個專案反映我最想放進作品集的核心方向：不是只把畫面做漂亮，而是把一個資訊密度很高的工作流程整理成可以維護、可以檢索、可以擴充的產品。

我把研究文獻視為一種 Metadata-driven 的知識物件。每篇 paper 不只有標題與作者，也包含 DOI、期刊、出版社、會議、頁碼、閱讀狀態、標籤、註記、附件與研究專案歸屬。這些資料在 UI 上要能被快速掃描，在資料庫中也要保持關聯清楚。

架構上，我採用 Clean Architecture：Core 層保存 Entities、Enums、Value Objects 與介面；Application 層處理 use cases、DTO 與服務；Infrastructure 層負責 EF Core repository、SQLite 與本機儲存；App 層則是 Avalonia Views 與 ViewModels。這讓我可以把圖書資訊學中的分類、檢索、Metadata 與知識組織概念，落到實際的桌面應用架構。

這個作品適合展示我的 C# / .NET 桌面應用能力，也適合展示我如何把研究與知識管理場景拆成資料模型、操作流程和介面結構。它不是行銷式 demo，而是一個可繼續擴充成個人研究資料庫的本機工具。
