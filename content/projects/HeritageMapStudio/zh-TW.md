---
title: "HeritageMap Studio 文化資產地圖工作室"
tagline: "以 Qt6 + OpenGL 打造的原生桌面文化資產地圖與時間軸視覺化工作站"
summary: "一套以 C++17、Qt6 Widgets 與 OpenGL 3.3 開發的 Linux 原生桌面應用，專為文化資產地圖、metadata 探索與歷史時間軸視覺化而設計。採 QOpenGLWidget 自繪地圖畫布，搭配 SQLite 資料庫、CSV 匯入管線、地理座標投影、圖層管理、時間軸播放與分面搜尋，並以分層架構（model / repository / service / ui）逐階段擴充功能。"
role: "獨立開發者（架構設計、OpenGL 渲染、資料層與 UI 全棧實作）"
problem: "文化資產資料往往散落於試算表，缺乏一個能同時呈現空間分布、歷史年代與詳細 metadata，並支援互動探索的本地工具；通用 GIS 軟體又過於笨重且不貼合文化資產的資料模型。"
solution: "以 Qt6 Widgets 建立可停靠面板式工作站，central canvas 使用 QOpenGLWidget + 自寫 GLSL shader 管線繪製格線與地點；後端以 SQLite 加上版本化 migration 管理 schema，透過 repository 模式存取 HeritageSite，並由 CSV 匯入服務與地理座標投影器把經緯度轉為本地公尺座標，再疊加圖層、時間軸與分面搜尋等互動篩選。"
outcome: "已完成 8 個開發階段，從應用程式骨架演進為具備資料庫、匯入、投影、metadata 編輯、圖層、時間軸與進階搜尋的可運作工作站；架構清晰分層，便於後續加入地圖底圖與路線編輯。"
highlights:
  - "自寫 OpenGL 3.3 Core Profile shader 管線，繪製自適應格線與依文化類型著色的地點，支援滑鼠平移、滾輪縮放與點擊選取"
  - "版本化 SQLite migration（schema_migrations 表）搭配 repository 模式，資料存取與 UI、渲染徹底解耦"
  - "GeoCoordinateTransformer 將經緯度投影為本地公尺座標，並保留無座標資料的 fallback 與投影摘要資訊"
  - "完整分層架構：model / repository / service / ui / opengl / utils 各司其職，避免 MainWindow 變成義大利麵"
  - "互動式圖層、時間軸播放與分面搜尋三套篩選狀態統一驅動地圖重繪"
  - "CMake 特別隔離 conda 工具鏈，強制以系統 c++ 解析 Qt/OpenGL，解決開發環境衝突"
challenges:
  - "在 conda 環境中 Qt6 與桌面 OpenGL 連結容易誤用 conda sysroot，需在 CMake 清空 CFLAGS/LDFLAGS 等變數並指定系統編譯器"
  - "以原生 OpenGL 從零實作 2D 相機、座標換算與點擊命中測試，需自行處理 screen↔world 投影與自適應格線間距"
nextSteps:
  - "加入地圖底圖圖磚（map tile background）以提供地理脈絡"
  - "實作路線/路徑編輯功能"
  - "導入正式 GIS 投影與更完整的 metadata 來源管理"
---
## 專案概述

HeritageMap Studio 是一套以 **C++17 + Qt6 Widgets + OpenGL 3.3** 開發的 Linux 原生桌面應用，定位為文化資產的地圖工作站。它把散落的文化地點資料整合到單一視窗中，讓使用者能同時瀏覽空間分布、歷史年代與詳細 metadata，並進行互動式探索。

## 架構設計

專案採清楚的分層架構：`models`（純資料模型如 HeritageSite）、`repositories`（資料存取）、`database`（DatabaseManager 與版本化 MigrationManager）、`services`（CsvReader、ImportService）、`utils`（GeoCoordinateTransformer）、`opengl`（MapCanvas 渲染）與 `ui`（MainWindow 及各 Dock 面板）。各層職責分明，model 不碰 UI 與 database，渲染層也不需知道 MainWindow 細節，全靠 Qt signal/slot 串接。

## 渲染與互動

central map canvas 以 QOpenGLWidget 搭配自寫 GLSL shader 管線繪製自適應格線與依文化類型著色的地點；實作了 2D 相機、screen↔world 座標換算、滑鼠平移／滾輪縮放與點擊命中測試。GeoCoordinateTransformer 負責把經緯度投影為本地公尺座標，並對無座標資料保留 fallback。

## 資料與篩選

後端使用 SQLite，透過 schema_migrations 表進行版本化遷移，並以 repository 模式存取資料。CSV 匯入管線可載入文化資產樣本資料（含台北文資範例）。三套統一的篩選狀態 —— 圖層、時間軸與分面搜尋 —— 共同驅動地圖即時重繪。

## 進度與展望

專案已歷經 8 個開發階段，從純應用程式骨架逐步擴充為具資料庫、匯入、投影、metadata 編輯、圖層、時間軸播放與進階搜尋的完整工作站。後續規劃包含地圖底圖圖磚、路線編輯與更完整的 GIS 投影。
