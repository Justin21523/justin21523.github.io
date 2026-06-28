---
title: "CSS Advanced Mastery 進階 CSS 練習與案例庫"
tagline: "用原生 HTML/CSS 做中學，從基礎到現代 CSS 特性的系統化練習庫"
summary: "一個「做中學」導向的純前端練習庫，僅用原生 HTML/CSS（必要時少量 JS 示範行為），系統化涵蓋 cascade/specificity、盒模型、Flexbox、Grid、定位與堆疊脈絡、字體與色彩、sizing 單位、transition/transform、animation、現代選擇器與 @layer、container queries、logical properties、clip-path/mask 等 15 個單元，並含一個綜合案例 SkillHub 儀表板。每單元附 tasks.md 學習目標與驗收。"
role: "獨立開發者／前端學習者，負責規劃學習路線、撰寫每個單元的 HTML 結構、CSS 解法與練習說明，並設定 Docker/Nginx 部署。"
problem: "前端學習常停留在零散教學，缺少有結構、可重現、能逐步累積的練習場域；現代 CSS 特性（container queries、@layer、:has、logical properties 等）分散且不易系統化掌握。"
solution: "建立一個分階段（基礎易錯點→佈局核心→視覺互動→響應式可維護性→現代 CSS 實戰→效能最佳實務）的練習庫。每個單元獨立成資料夾（index.html / style.css / tasks.md），明確標示學習目標、TODO 與驗收方式，並用 roadmap.md 追蹤進度。整站以暗色卡片式入口頁串接各單元。"
outcome: "完成 15 個練習單元的腳手架與一個 SkillHub 綜合案例頁面，目前 01-cascade-specificity 已實作完成、其餘單元持續推進；累積約 3000 行練習 CSS，並提供 Docker/Nginx 部署設定。"
highlights:
  - "涵蓋 15 個主題單元，從 cascade/specificity 到 clip-path/mask 的現代視覺效果"
  - "系統化練習現代 CSS：container queries、@layer 串接、:is/:where/:has、logical properties"
  - "每單元附 tasks.md，明確列出學習目標、TODO 與可驗收標準，強調做中學"
  - "暗色主題、auto-fit grid 的卡片式入口頁，串接所有練習與專案"
  - "SkillHub 綜合案例以 Flex/Grid/RWD 打造 dashboard UI，驗證跨單元整合能力"
  - "全程關注可及性與使用者偏好：focus-visible、prefers-reduced-motion 等"
challenges:
  - "在不依賴框架的前提下，將分散的現代 CSS 特性整理成可循序漸進、彼此銜接的學習路線"
  - "設計每個單元的驗收標準與 TODO，使練習可自我檢核而非單純照抄"
  - "以 @layer 與 :where() 控制 specificity，建立可預期、易覆寫的 cascade"
nextSteps:
  - "依 roadmap 完成 02-15 單元的實作（目前多為腳手架與 tasks）"
  - "擴充 projects/ 的整合型案例，把單元技巧落地到真實 UI"
  - "補上 notes/ 筆記與效能（reflow/repaint、selector 效率）單元"
---
## 專案概述

**CSS Advanced Mastery**（css-mastery-lab）是一個「做中學」導向的純前端練習與案例庫。所有範例僅使用原生 HTML 與 CSS（必要時搭配少量 JS 做行為示範），目標是系統化掌握佈局、動畫、響應式、可維護性與現代 CSS 特性，而不依賴任何框架。

## 內容結構

專案以 `exercises/` 容納 15 個獨立單元，每個單元自成資料夾，包含 `index.html`、`style.css` 與 `tasks.md`。主題從基礎易錯點（cascade、specificity、box model）一路延伸到佈局核心（Flexbox、Grid、position/stacking、container queries）、視覺與互動（transition/transform、animation、filter/clip-path/mask），以及現代 CSS 實戰（:is/:where/:has、@layer、logical properties）。`projects/skillhub/` 則是一個綜合 dashboard 案例，整合 Flex、Grid 與 RWD。

## 學習方法

每個單元的 `tasks.md` 明確列出學習目標、只需修改 `style.css` 的 TODO 練習題，以及可自我檢核的驗收標準，搭配 `roadmap.md` 分階段追蹤進度。入口頁採暗色主題與 auto-fit 卡片格線，將所有練習與專案串成可快速預覽的索引。

## 工程與部署

專案內含 Docker 與 Nginx 設定。目前 01-cascade-specificity 已完成實作，其餘單元持續按路線圖推進。
