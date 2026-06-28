---
title: "InteractCSS 互動式 HTML/CSS 學習實驗室"
tagline: "把 CSS 屬性變成可即時操控的互動控制與即時預覽"
summary: "InteractCSS 是純 vanilla HTML/CSS/JavaScript 打造的學習平台，將 CSS 屬性與元件轉化為滑桿、開關、色彩選擇器與拖曳控制，搭配即時預覽。涵蓋 3D 變形、OKLCH 色彩、Flexbox/Grid、捲動時間軸、可變字型等主題，已建置 28+ 互動 demo。核心採 schema 驅動自動生成控制面板，內建 FPS 效能 HUD、完整鍵盤導覽與 ARIA 無障礙支援。"
role: "獨立開發者（架構設計、核心模組、demo 與部署）"
problem: "CSS 進階特性（3D 變形、混合模式、捲動動畫、色彩空間等）抽象難懂，靜態文件與程式碼片段難以讓學習者直觀感受屬性變化對畫面的即時影響。"
solution: "打造可重用的核心引擎：studio.js 提供舞台與快捷鍵、ui.js 從 JSON schema 自動生成控制面板並綁定 CSS 變數、perf.js 監控 FPS 與佈局位移、base.css 以 @layer 管理串接層級。每個 demo 嚴格分離 HTML/CSS/JS，控制項只操作 CSS 自訂屬性，動畫優先使用 transform/opacity 避免重排。"
outcome: "完成 28+ 個互動 demo 與多元素實驗室（3D 變形、色彩濾鏡、Flexbox），涵蓋從 HTML 基礎到現代 CSS 的十大主題；具備鍵盤導覽、螢幕報讀公告、prefers-reduced-motion 與高對比支援，並以 Docker/Nginx 部署。"
highlights:
  - "Schema 驅動的控制工廠：以 JSON 定義即自動生成滑桿/下拉/開關/色彩四種控制項並綁定 CSS 變數"
  - "以 @layer 管理 reset→base→utilities→demo→overrides 串接順序，避免特異性衝突"
  - "多元素實驗室可動態新增/移除最多 20 個元素並隔離各自的 CSS 變數狀態"
  - "內建效能 HUD：以 rAF 計算 FPS 與 frame time，並用 PerformanceObserver 偵測佈局位移"
  - "無障礙優先：完整鍵盤操作、ARIA live region 報讀、reduced-motion 與高對比支援"
  - "純 vanilla 無框架無建置工具，使用瀏覽器原生 ES Modules"
challenges:
  - "在純 vanilla 架構下設計可擴充的 schema 與核心模組，讓新 demo 只需定義控制項即可運作"
  - "為 backdrop-filter、3D 變形、container queries、:has()、color-mix() 等新特性以 @supports 提供一致的降級體驗"
  - "多元素場景下隔離每個元素的 CSS 變數與屬性狀態，同時維持拖曳與鍵盤操作的流暢度"
nextSteps:
  - "依 ROADMAP 補齊剩餘 milestone，朝約 60 個 demo 的完整課程邁進"
  - "補上 Position Playground、Variable Font Player、Color Mix 等尚未完成的 demo"
  - "清理 demos 目錄中的 test/debug 暫存檔並統一各 demo 的進入點結構"
---
## 概覽

**InteractCSS**（html-css-interactive-lab）是一個以純 vanilla HTML/CSS/JavaScript 打造的互動式學習實驗室，把抽象的 CSS 屬性與元件轉化為可即時操控的滑桿、開關、色彩選擇器與拖曳手把，並搭配即時預覽。目標是讓學習者「邊調邊看」，直觀理解每個屬性對畫面的影響。

## 架構

專案刻意不使用任何框架或建置工具，僅依賴瀏覽器原生 ES Modules。四個核心模組構成可重用引擎：studio.js 負責舞台、快捷鍵與 ARIA；ui.js 是控制工廠，從 JSON schema 自動生成 UI 並綁定 CSS 自訂屬性；perf.js 提供 FPS 與 frame time 監控；base.css 以 CSS @layer 管理串接層級並提供設計 token。每個 demo 嚴格分離 HTML/CSS/JS，控制項只操作 CSS 變數，動畫優先採用 transform/opacity 以避免佈局重排。

## 內容範圍

已建置 28 個以上的互動 demo，涵蓋 3D 變形與透視、OKLCH 色彩空間、漸層產生器、Flexbox 與 Grid、捲動時間軸、可變字型、clip-path、混合模式、dialog 模態、ARIA live region 等主題，對應從 HTML 基礎到現代 CSS 的十大課程分類。另設多元素實驗室，可動態新增/移除元素並獨立編輯各自屬性。

## 工程重點

以 Pointer Events 統一滑鼠與觸控拖曳，並提供鍵盤連續輸入。無障礙為一級要求：完整鍵盤導覽、螢幕報讀公告、prefers-reduced-motion 與高對比模式支援。所有現代 CSS 特性都以 @supports 包覆並提供優雅降級。專案透過 Docker 與 Nginx 容器化。
