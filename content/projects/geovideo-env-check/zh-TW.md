---
title: "GeoVideo Evidence Viewer 影像證據檢視器"
tagline: "C++/Qt6 桌面影像事件檢索與空間視覺化工具"
summary: "以 C++20 與 Qt6 打造的桌面應用，用於檢視監控影片、索引動態事件、設定空間關注區（ROI）並在地圖上視覺化案件。採分層（領域／應用／基礎設施／UI）架構，已具備 SQLite 結構遷移、儲存庫、服務層相依注入與 OpenCV 影片中繼資料擷取；播放、ROI 編輯與動態偵測等管線仍在建置中。"
role: "獨立開發者（架構設計與全端桌面實作）"
problem: "智慧城市、校園安防與設施監控等場景需要可在本機檢視大量監控影片、標註關注區、檢索與覆核事件並產出案件報告的工具，但多數方案綁雲端、難客製或缺乏空間視覺化。"
solution: "以 Qt6 Widgets 建構停駐式（dock）工作區，中央為影片檢視、四周為專案總覽、事件詳情、時間軸、搜尋與 2D/3D 空間視圖；後端以 SQLite 內嵌資料庫管理專案、攝影機、影片來源、ROI 與事件，透過 SchemaMigrator 做交易式結構遷移，並以 AppContext 統一注入儲存庫與服務，OpenCV 負責影片中繼資料擷取。"
outcome: "完成可執行的桌面骨架與資料層：Qt6 UI 殼層、版本化 SQLite schema（projects／cameras／video_sources／rois／events 含索引與外鍵）、SQLite 儲存庫、ProjectService／VideoImportService／EventReviewService 服務層，以及 OpenCV 影片解析與版面狀態保存。"
highlights:
  - "乾淨分層架構：domain／application／infrastructure／app 四層分離，領域模型與 Qt UI 解耦"
  - "版本化 SQLite 結構遷移，採 IMMEDIATE 交易確保建表原子性，含完整外鍵與查詢索引"
  - "以 AppContext 集中相依注入，串接資料庫、儲存庫與應用服務"
  - "OpenCV VideoCapture 擷取解析度／FPS／影格數，並對 NaN／負值做防禦性處理"
  - "Qt6 停駐式工作區支援巢狀／分頁停駐與版面記憶（QSettings 還原）"
  - "CMake + Ninja 自動掃描原始碼與 AUTOMOC，跨 Linux／Windows／macOS 目標設定"
challenges:
  - "在 C++/Qt 桌面環境中落實領域驅動分層，避免 UI 與資料存取耦合"
  - "設計可演進的 SQLite schema 與交易式遷移，兼顧外鍵約束與查詢效能"
  - "以 OpenCV 穩健讀取多格式影片中繼資料並處理無效屬性值"
nextSteps:
  - "接上實際影片播放、影格步進與時間軸導覽"
  - "實作 ROI 編輯器與 OpenCV 動態偵測管線，並寫回事件資料庫"
  - "完成快照／剪輯匯出與案件報告產生，以及 2D/3D 空間視覺化"
---
## 專案概述

GeoVideo Evidence Viewer 是一套以 **C++20 / Qt6** 開發的桌面應用，定位為作品集等級的影像證據檢視工具，適用於智慧城市、校園安防、設施監控、交通科技與安防覆核等情境。它讓使用者在本機檢視監控影片、索引動態相關事件、設定空間關注區（ROI），並在 2D/3D 場域地圖上視覺化案件。

## 架構設計

專案採乾淨分層架構，將程式碼切為四層：`core/domain`（領域模型，如 Project、Camera、VideoSource、Roi、Event 與共用值物件 EntityId／TimeRange／Severity）、`application/services`（應用服務與 ServiceResult 結果型別）、`infrastructure`（SQLite 連線、SchemaMigrator 與 sqlite 儲存庫）以及 `app`（Qt6 主視窗與各停駐面板 widget）。`AppContext` 作為組合根，統一初始化資料庫並注入儲存庫與服務。

## 資料與影像層

資料以內嵌 **SQLite** 儲存，`SchemaMigrator` 以 IMMEDIATE 交易執行版本化遷移，建立 projects、cameras、video_sources、rois、events 等資料表，搭配外鍵級聯與多組查詢索引（時間範圍、類型、覆核狀態等）。影像層透過 **OpenCV** 的 VideoCapture 擷取解析度、FPS 與影格數，並對 NaN 與非正值做防禦性轉換。

## UI 與工程實務

介面以 Qt6 Widgets 打造停駐式工作區，中央為影片檢視，周圍環繞專案總覽、事件詳情、事件時間軸、事件搜尋與 OpenGL 空間視圖，支援巢狀／分頁停駐與版面記憶。建置採 **CMake + Ninja**，啟用 AUTOMOC／AUTORCC／AUTOUIC 與 compile_commands 匯出，並設定跨 Linux／Windows／macOS 目標。

## 現況

資料層與應用骨架已可執行：新增專案、匯入影片（擷取中繼資料並寫入 SQLite）、版面保存與還原皆已運作；影片播放、ROI 編輯器、動態偵測管線、證據匯出與報告產生則為下一階段目標。
