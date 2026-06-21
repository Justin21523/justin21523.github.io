---
title: "中小學雲端圖書館系統（Lean School Library LMS）"
tagline: "繁體中文 | English"
summary: "繁體中文 | English"
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using ."
highlights:
  - "**領域知識與參考資料**（A–J 章：編目、分類、主題分析、Metadata、檢索、館藏管理、流通、使用者、資訊行為、倫理政策）"
  - "**可直接落地的 MVP 規格**（user stories、API 草案、資料字典、DB schema）"
  - "**可直接跑起來的 MVP+ 程式**（TypeScript monorepo：NestJS API + Next.js Web + shared SSOT）"
  - "文件已整理成「可開發」：`MVP-SPEC.md`、`USER-STORIES.md`、`API-DRAFT.md`、`DATA-DICTIONARY.md`、`db/schema.sql`"
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
繁體中文 | English

!系統入口（Staff Console / OPAC）

本專案目標是打造一套適合台灣中小學、在人力不足與預算有限情境下可快速導入的雲端圖書館管理系統（LMS）。目前已可在同一套系統內跑通：編目（MARC21）→ 館藏 → 流通/預約 → 盤點 → 報表/稽核。此倉庫同時包含： - 領域知識與參考資料（A–J 章：編目、分類、主題分析、Metadata、檢索、館藏管理、流通、使用者、資訊行為、倫理政策） - 可直接落地的 MVP 規格（user stories、API 草案、資料字典、DB schema） - 可直接跑起來的 MVP+ 程式（TypeScript monorepo：NestJS API + Next.js Web + shared SSOT）

> 如果你不熟 TypeScript/Next.js/NestJS，先從 docs/README.md 開始讀。

- 文件已整理成「可開發」：MVP-SPEC.md、USER-STORIES.md、API-DRAFT.md、DATA-DICTIONARY.md、db/schema.sql - 程式已能端到端操作（MVP+ 版本）：apps/api 已落地主檔/名冊 CSV 匯入/書目與冊管理/CSV + MARC 匯入（preview/apply）/MARC 編輯器驗證/權威控制（authorityterms + thesaurus）/進階搜尋（欄位多選 + AND/OR/NOT）/借還續借/預約與到期處理（含
