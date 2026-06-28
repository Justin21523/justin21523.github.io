---
title: "JavaScript 平台遊戲概念原型"
tagline: "以 Phaser 3 與自製 ECS 打造的 2D 平台動作遊戲技術試驗場"
summary: "一個探索 2D 平台遊戲核心技術的概念原型：同時實作 Phaser 3 執行時與自製 Vanilla JS ECS 引擎，涵蓋程序化關卡生成、可達性驗證、AI 自動操作與離線壓力測試/自動調參工具鏈。內含 Hyperdrive 超速、技能戰鬥、神器與元進度系統。專案已整合進 platformer-game，此倉庫保留為技術沉澱。"
role: "獨立開發者／遊戲程式與系統設計"
problem: "想驗證能否在純前端環境，建立一套既可手玩又能被 AI 自動驗證、且具備可重現程序化關卡的 2D 平台遊戲架構，並避免關卡無法通關等品質問題。"
solution: "採資料驅動的 ECS 架構切分數十個系統（物理、碰撞、相機、視差、戰鬥、技能、特效、波次等），以種子化 RNG 做程序化關卡生成並加入可達性驗證與重試；另建 A* 跳躍尋路的 AI 玩家，搭配 Node.js 離線工具進行壓力測試、自動調參、變體重播比對與夜間回歸。"
outcome: "形成一套可在瀏覽器即玩、可由 AI 自動通關並量化評估（通關率、卡關率、救援率、完成時間 P90）的平台遊戲技術基底，並以 Vite 打包、Docker/Nginx 部署；經驗證後內容整合進後續正式專案。"
highlights:
  - "雙軌實作：Phaser 3 執行時與自製 Vanilla JS ECS 引擎並存，便於比較架構取捨"
  - "種子化程序化關卡生成，內建可達性保證與失敗重試，避免不可通關地圖"
  - "A* 跳躍邊尋路的 AI 玩家，命令與人類輸入經 InputMergeSystem 合流，互不衝突"
  - "完整離線 QA 工具鏈：壓力測試、自動調參、AI 雙重檢查、變體重播比對、夜間回歸門檻"
  - "豐富玩法系統：Hyperdrive 超速、輕重斬/射擊/旋斬技能、盾牌、神器稀有度與元進度"
  - "Vite 建置、Docker + Nginx 部署設定與素材生成腳本，貼近實務交付流程"
challenges:
  - "在純前端確保程序化關卡始終可通關，需設計保守的可達性驗證與重試機制"
  - "讓 AI 玩家與人類輸入並存而不互搶控制，並用量化指標客觀評估關卡平衡"
nextSteps:
  - "延續整合至 platformer-game，收斂雙軌實作為單一執行時"
  - "擴充 AI 評估指標與自動調參維度，建立可持續的關卡品質基準線"
---
## 專案概述

**JavaScript 平台遊戲概念原型** 是一個聚焦 2D 平台動作遊戲核心技術的試驗場。專案有趣之處在於「雙軌」：index.html 以 Phaser 3 作為實際執行時（src/phaser-main.js），同時倉庫內保留一套完整的自製 Vanilla JS ECS 引擎（src/main.js、src/ecs、src/systems 下數十個系統），用以比較框架與自研架構在物理、碰撞、相機、視差與戰鬥上的取捨。

## 架構與系統

核心採資料驅動的 Entity-Component-System：World 以 bitmask 管理實體與元件儲存，系統涵蓋輸入合流、物理、碰撞、相機、視差背景、命中框、傷害、技能、投射物、特效、波次、目標與慶祝模式等。關卡來源支援固定關卡（Tiled TMX/JSON）與 ProceduralLevelGenerator 的程序化生成——後者使用 mulberry32 種子化 RNG，並加入可達性保證與失敗重試，避免產生無法通關的地圖。

## AI 與離線工具鏈

專案最具特色的是把「可被 AI 自動驗證」當成一等公民：AiPlayerSystem 透過 PlatformerPathfinding（含跳躍邊的格點 A*）與任務跑者產生指令，再經 InputMergeSystem 與人類輸入合流。package.json 暴露成套 Node.js 工具——ai:autotune、ai:stress、map:ai:dual、variation:eval、nightly:stress——以通關率、卡關率、救援率、完成時間 P90 等門檻做自動調參與夜間回歸。

## 玩法與交付

玩法面提供 Hyperdrive 超速、輕重斬/射擊/旋斬等技能、盾牌格擋、神器稀有度與元進度系統。工程面以 Vite 打包，並備有 Docker + Nginx 部署設定與素材生成腳本。

## 現況

此專案內容已整合進 platformer-game 繼續開發；本倉庫保留為技術沉澱與架構參考。
