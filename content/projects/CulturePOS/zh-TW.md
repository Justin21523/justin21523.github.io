---
title: "CulturePOS 文創零售 POS 桌面系統"
tagline: "用 .NET 10 + Avalonia 打造的跨平台文創零售銷售點系統"
summary: "CulturePOS 是一套以 C# .NET 10 與 Avalonia UI 開發的跨平台桌面 POS 系統，鎖定書店、博物館商店、文創零售等場景。採用 App/Core/Infrastructure/Tests 分層架構與 MVVM，目前已完成商品管理、庫存管理與 POS 結帳三大核心模組，並以 EF Core + SQLite 持久化銷售與庫存交易。"
role: "全端與架構設計者（個人作品集專案）"
problem: "中小型文創零售（書店、博物館商店、校園合作社）需要一套能離線運作、跨平台、且能完整處理商品、庫存與結帳流程的銷售點系統，但多數現成方案綁定 Windows 或雲端，難以在 Linux 環境自架與客製。"
solution: "以 .NET 10 與 Avalonia UI 建構跨平台桌面 App，套用乾淨分層架構：Core 放純商業模型與介面、Infrastructure 放 EF Core/SQLite 資料存取與服務、App 以 MVVM 與依賴注入組裝畫面。透過 DbContextFactory 管理連線，並用 InventoryTransaction 記錄每筆庫存異動，結帳時自動扣庫存並寫入 Sale/SaleItem。"
outcome: "完成可登入、依角色導覽的桌面殼層，並落地商品 CRUD、庫存調整與安全庫存警示、含條碼搜尋與付款方式的 POS 結帳流程；以 xUnit 為四個服務撰寫單元測試，並以 EF Core Migration 管理資料庫結構。"
highlights:
  - "乾淨分層架構（App / Core / Infrastructure / Tests），UI 不碰商業邏輯、ViewModel 不直接操作資料庫"
  - "以 EF Core + SQLite 持久化商品、庫存、交易與銷售，並用 Migration 管理結構演進"
  - "POS 結帳支援條碼/SKU 搜尋、購物車數量調整、付款方式與庫存自動扣減"
  - "庫存模組具安全庫存與低庫存警示，並以 InventoryTransaction 完整記錄異動軌跡"
  - "採 CommunityToolkit.Mvvm 與 DI 容器降低樣板程式碼，桌面端以 DbContextFactory 管理連線"
  - "四個核心服務（Product/Inventory/Pos/Auth）皆有 xUnit 單元測試覆蓋"
challenges:
  - "桌面 App 中正確管理 EF Core DbContext 生命週期，改用 DbContextFactory 避免長期持有同一連線"
  - "結帳時需在同一交易內同時寫入銷售紀錄並扣減庫存、留下異動軌跡，確保資料一致性"
nextSteps:
  - "實作會員與點數、折扣促銷引擎（Roadmap Phase 5–6）"
  - "補上銷售報表、收據 PDF 與 Excel 匯入匯出（Phase 9–11）"
---
## 專案概述

CulturePOS Desktop 是一套以 **C# .NET 10** 與 **Avalonia UI** 打造的跨平台桌面銷售點（POS）系統，目標客群為書店、博物館商店、圖書館禮品店、校園合作社等文創零售場景。專案定位為作品集等級的完整商業系統，而非僅停在 MVP。

## 架構設計

系統採乾淨分層架構，拆為四個專案：`Core` 存放純商業模型、列舉與服務介面，不依賴任何 UI 或資料庫框架；`Infrastructure` 以 EF Core + SQLite 實作資料存取與商業服務；`App` 以 MVVM（CommunityToolkit.Mvvm）搭配 Microsoft DI 容器組裝畫面；`Tests` 以 xUnit 驗證服務邏輯。架構規則明確要求 UI 不寫商業邏輯、ViewModel 不直接操作資料庫。

## 核心功能

目前已落地三大模組：**商品管理**（含分類、SKU/條碼唯一性、啟用停用與多條件搜尋）、**庫存管理**（庫存調整、安全庫存、低庫存警示與完整的 InventoryTransaction 異動軌跡），以及 **POS 結帳**（條碼/SKU 商品搜尋、購物車管理、付款方式、結帳時自動寫入 Sale/SaleItem 並扣減庫存）。登入採角色式 Mock 驗證（收銀/店長/管理員），並依角色控制側邊導覽可見性。

## 工程實作重點

資料層使用 DbContextFactory 管理連線，符合桌面 App 不長期持有單一 DbContext 的最佳實務；資料庫結構以 EF Core Migration 管理（含 InitialCreate 與 Phase4Sales）。程式碼遵循中文註解、英文 UI 標籤的慣例。

## 後續規劃

依 Roadmap 規劃，後續將擴充會員與點數、折扣促銷引擎、進貨單、退貨處理、銷售報表、收據 PDF 與 Excel 匯入匯出等模組，逐步成長為貼近真實零售營運的完整桌面業務系統。
