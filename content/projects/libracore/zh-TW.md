---
title: "LibraCore"
tagline: "以 MARC21、RDA、權威控制、Discovery、ERM 與數位典藏流程為核心的整合型圖書館資訊系統 Demo。"
summary: "LibraCore 是一個 Django 圖書館資訊系統雛形，重點不是單一書籍 CRUD，而是把圖書資訊學中的書目控制、MARC21、RDA、權威控制、館藏、流通、採訪、期刊、ERM、數位典藏、稽核與資料治理拆成可操作的系統模組。"
role: "系統架構師 / 全端開發者"
problem: "真正的圖書館系統需要處理書目控制、權威資料、館藏與單冊、電子資源、Discovery、資料治理與互通協定。一般借還書 CRUD 無法表達圖書資訊系統的資料層次與工作流程。"
solution: "我設計並實作一套模組化 Django 平台，包含 Work/Instance 分離、MARC21 原始紀錄保存、編目審核、權威連結、OPAC facets、流通、採訪、期刊、ERM、數位典藏、audit log、資料品質檢查，以及可用 Playwright 錄製的小幫手導覽 UI。"
outcome: "目前已完成可本機執行與測試的 MVP，並建立 GitHub Pages 靜態 Demo、公開 GitHub repo、媒體櫃截圖與導覽錄影，方便從作品集檢視。"
highlights:
  - "建立 Work、Expression、Instance、BibliographicRecord、MARC、Authority、Holding、Item、Patron、Loan、Acquisitions、Serials、ERM、Repository 等核心模型。"
  - "支援 MARC 匯入批次、解析/映射預覽、審核畫面、match candidate 與權威建議。"
  - "提供 OPAC Discovery、facets、availability、權威瀏覽、主題瀏覽、電子資源連結與數位典藏整合。"
  - "包含流通櫃台、讀者管理、費用、採購、期刊、ERM、典藏、報表、稽核與資料品質工作台。"
challenges:
  - "在保留 MARC21 原始資料的同時，維持內部正規化模型與 Discovery index 的一致性。"
  - "讓複雜館員流程能在作品集中展示，又不需要 GitHub Pages 執行 Django 後端。"
  - "誠實呈現圖書館標準與詞彙限制，避免把授權標準或外部資料來源誇大為已完整串接。"
nextSteps:
  - "將完整 Django 系統部署到可執行後端的平台。"
  - "擴充 MARC Authority 與 Holdings 的匯入/匯出支援。"
  - "加入 id.loc.gov、VIAF、ORCID 外部查找與 OpenSearch 等級 Discovery。"
---
LibraCore 是一個以圖書資訊學領域知識為核心的圖書館資訊系統實作。公開 Demo 採用靜態網站，因為 GitHub Pages 不能執行 Django；完整後端、測試、seed data 與 Playwright 錄製腳本都保留在 GitHub 原始碼中。

這個專案的重點是資料模型與工作流程：Work/Expression/Instance/Item 分層、MARC21 原始紀錄保存、權威控制、館藏與流通、採訪與期刊、電子資源管理、數位典藏 metadata 都被設計成不同概念，而不是混成單一書籍資料表。

Demo 錄影展示了新版 UI 的小幫手導覽：它會自動框選頁面區塊、顯示粒子與右下角說明卡，帶使用者走過 OPAC、MARC 編目審核、權威控制、流通櫃台、採購、ERM、典藏、報表、稽核與資料品質流程。

