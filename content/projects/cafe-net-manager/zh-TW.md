---
title: "CafeNet Manager"
tagline: "以 C++ / Qt 建立的咖啡廳與網咖桌面營運管理系統。"
summary: "CafeNet Manager 是一套 C++17、Qt 6、SQLite 與 CMake 建立的桌面營運系統，整合座位地圖、計時場次、點餐購物車、廚房看板、結帳、顧客資料與營收儀表板。它展示我在桌面 UI、業務流程拆解、資料庫 repository pattern 與狀態驅動介面上的能力。"
role: "獨立開發者 / C++ 桌面應用工程師 / 工作流程系統設計者"
problem: "小型咖啡廳或網咖的座位、計時、點餐、廚房出餐、結帳與顧客資料常分散在不同工具或人工流程中，容易造成狀態不一致。"
solution: "我用 Qt Widgets 建立多分頁桌面介面，搭配 SQLite repository layer 與 service layer，把座位狀態、場次計費、訂單、購物車、廚房看板和結帳流程整合在同一套本機系統。"
outcome: "完成一個可展示完整營運流程的 C++/Qt 桌面作品，能呈現我設計複雜狀態 UI、資料模型與業務流程的能力。"
highlights:
  - "建立可互動的座位地圖，支援座位狀態、容量、設備與拖曳式管理概念。"
  - "整合咖啡廳低消模式與網咖計時模式，支援時間延長與即時狀態。"
  - "實作點餐購物車、訂單狀態、廚房看板、結帳與收據資料流程。"
  - "以 SQLite repository pattern 隔離 UI 與資料存取，讓服務層處理業務邏輯。"
challenges:
  - "座位、場次、訂單與付款狀態彼此連動，UI 必須即時反映資料變化。"
  - "Qt Widgets 需要手動設計清楚的元件邊界，避免 MainWindow 承擔過多邏輯。"
  - "營運系統的資料流比一般作品卡片複雜，必須先拆出 repository、service 與 widget 職責。"
nextSteps:
  - "補上更完整的權限角色、班表與庫存管理。"
  - "加入更多報表匯出格式與營收分析圖表。"
  - "補強測試與資料庫 migration 流程。"
---
CafeNet Manager 是我用 C++/Qt 做桌面應用與業務流程建模的代表作品。它不是單一功能練習，而是一套把座位、計時、訂單、出餐、結帳與顧客管理串在一起的營運系統。

這個專案讓我練習如何把真實場域流程拆成資料模型與 UI 狀態。座位不是只有名稱，還有狀態、容量、設備與目前場次；訂單不是只有品項，還有購物車、出餐狀態、付款方式與結帳金額；顧客資料也會牽涉歷史消費與備註。這些都需要比一般前端作品更嚴謹的狀態設計。

技術上，我使用 C++17、Qt 6 Widgets、SQLite 與 CMake。架構分成 Presentation、Business Logic、Data Access 與 Database layer，並以 SeatRepository、OrderRepository、MenuRepository 等 repository 類別隔離資料庫存取。UI 則由 MainWindow、SeatMapView、CartWidget、KitchenBoardWidget、DashboardWidget 與 CheckoutDialog 等元件組成。

這個作品在作品集中的角色，是展示我除了 Web 和 Metadata 系統，也能處理 C++ 桌面應用、資料庫驅動 UI，以及接近實際營運場景的複雜流程。
