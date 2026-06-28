---
title: "ChronosMap 時空編織者"
tagline: "數位典藏時空導航器：在地圖與時間軸上重現歷史脈絡"
summary: "ChronosMap 是以 .NET 10 與 Avalonia 打造的跨平台桌面應用，將歷史事件與典藏檔案同時投影到地圖、時間軸與知識關係圖三個維度。拖動時間軸即可篩選對應年代的事件，點選地圖節點可在拓樸圖中展開人物、地點與機構間的語意關聯，並支援完整的新增、編輯、搜尋與 JSON 匯入匯出。"
role: "獨立開發者（架構設計、領域建模、UI 與資料層全端實作）"
problem: "傳統數位典藏多以靜態清單呈現，使用者難以同時掌握史料的「時間、空間、關係」三個面向，也缺乏可互動探索的脈絡視圖。"
solution: "採用 Domain／Application／Infrastructure 分層的乾淨架構，以 MVVM（ReactiveUI）串接 Avalonia 介面；用 Mapsui 疊加 OpenStreetMap 圖磚與事件圖釘，時間軸滑桿驅動 TemporalQueryService 做年代篩選，並以三角函數自製力導向拓樸畫布呈現知識關係。"
outcome: "已完成可運行的原型：地圖圖釘、時間軸巡航播放、關係拓樸圖、CRUD 表單與 JSON 持久化皆可操作，並建立領域模型與 xUnit 往返測試。"
highlights:
  - "三維度整合：地圖、時間軸、知識拓樸圖同步連動"
  - "Mapsui + OpenStreetMap 即時渲染地理圖釘與點擊選取"
  - "以 Clean Architecture 切分 Domain／Application／Infrastructure 三專案"
  - "TemporalQueryService 依年代範圍與篩選模式查詢事件"
  - "自製三角函數力導向拓樸圖呈現人物／地點／機構關係"
  - "原生 JSON 匯入匯出，啟動時智慧遷移舊版存檔"
challenges:
  - "在 Avalonia 12 整合 Mapsui 並修正圖釘樣式與點擊雙向綁定"
  - "重構領域型別重複編譯與 partial method 簽章衝突問題"
nextSteps:
  - "完善 README 與使用說明文件"
  - "將 Legacy ArchiveEvent 全面遷移至新領域模型並擴充測試覆蓋"
---
## 專案概觀
ChronosMap（時空編織者）是一款數位典藏「時空導航器」，把歷史事件與檔案資料同時呈現在**地圖**、**時間軸**與**知識關係拓樸圖**三個維度上。使用者拖動時間軸即可看到對應年代的事件在地圖上浮現，點選節點則能在拓樸圖中展開該事件與人物、地點、機構之間的語意關聯。

## 技術架構
專案以 **.NET 10 + Avalonia UI 12** 建構跨平台桌面前端，採用 **ReactiveUI / CommunityToolkit.Mvvm** 的 MVVM 模式。後端邏輯遵循 **Clean Architecture**，拆分為 Domain（KnowledgeEntity、HistoricalEvent、KnowledgeRelation、HistoricalTimeRange 等領域模型）、Application（TemporalQueryService、ProjectDocumentService 等用例）與 Infrastructure（LocalProjectFileStore、JSON 序列化）三個獨立專案。地圖以 Mapsui 疊加 OpenStreetMap 圖磚並渲染事件圖釘。

## 主要功能
- 時間軸滑桿與「時空巡航」自動播放，依年代即時篩選事件
- 地圖圖釘點擊選取，與右側資訊面板及清單雙向連動
- 以三角函數自製的 2D 力導向拓樸圖，依關係型別動態著色節點
- 完整 CRUD 表單、關鍵字／標籤搜尋，以及原生 JSON 匯入匯出

## 完成度
目前為**可運行的進行中原型**：核心互動（地圖、時間軸、拓樸圖、CRUD、持久化）皆已實作並有 stage 化的開發歷程與 xUnit 往返測試；README 與部分舊模型遷移仍待補完。
