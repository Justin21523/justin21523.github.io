---
title: "Poker AI Web 撲克對局 AI 平台"
tagline: "用純 JavaScript 打造會學習的撲克 AI 與多人桌遊平台"
summary: "以原生 ES6 模組與事件驅動架構自建遊戲引擎，核心為德州撲克的學習型 AI：結合 Q-learning 強化學習、Monte Carlo 勝率模擬、對手建模（VPIP/PFR/侵略性）與期望值決策引擎，並支援難度與性格參數調校。平台同時整合大老二、21 點、抽鬼牌等多款卡牌遊戲，附 525+ 單元測試與統計面板，採 Docker/Nginx 部署。"
role: "獨立開發者（架構設計、AI 演算法、前端與測試一手包辦）"
problem: "想在不依賴重量級框架、不需後端的前提下，做出一個既能展示扎實撲克數學與強化學習、又具備完整對局體驗的網頁 AI，並能擴充成多遊戲平台。"
solution: "自建模組化遊戲引擎（EventBus、StateManager 有限狀態機、GameLoop），AI 層拆為 PokerMath（Monte Carlo 勝率/底池賠率/聽牌偵測）、OpponentModeler（玩家分類 TAG/LAG/TP/LP）、DecisionEngine（EV 決策＋性格修正）、LearningEngine（Q-learning），並以 AIPersistence 將學習成果存入 localStorage 持續累積。"
outcome: "完成德州撲克全流程對局與可調難度/性格的學習 AI，並擴充為含大老二、21 點、抽鬼牌的卡牌平台；核心模組達 525+ 單元測試通過，已透過 Docker/Nginx 部署。"
highlights:
  - "Q-learning 強化學習：Q(s,a) 更新搭配 epsilon-greedy 探索與衰減"
  - "Monte Carlo 勝率模擬（依難度 100～2000 次迭代）＋ Sklansky 起手牌分組評估手牌強度"
  - "對手建模：以 VPIP、PFR、侵略性等統計將對手分類為 TAG/LAG/TP/LP 並預測行為"
  - "期望值決策引擎：結合底池賠率、隱含賠率、位置加成與四種 AI 性格、四級難度"
  - "事件驅動 + 有限狀態機架構，GameLoop 鎖定 60 FPS、自建計時器與時間縮放"
  - "GameRegistry 動態載入多遊戲（德撲、大老二、21 點、抽鬼牌），525+ 單元測試與統計儀表板"
challenges:
  - "在純前端、無後端環境下平衡 Monte Carlo 迭代次數與即時決策效能（用難度分級控制迭代量）"
  - "設計能跨遊戲共用的引擎抽象（BaseCardGame／GameState），同時容納撲克與其他卡牌規則差異"
nextSteps:
  - "將宣告的 Three.js 依賴實際接上，提供 3D 牌桌渲染"
  - "補齊 EventBus/StateManager/GameLoop 等舊測試由自製框架遷移至 Vitest"
  - "擴充多人對戰或線上對局與更完整的 AI 訓練回放"
---
## 專案概述
Poker AI Web 是以原生 JavaScript（ES6 模組）打造的撲克 / 卡牌 AI 對局平台，刻意不依賴前端框架，從零自建事件驅動的遊戲引擎，重點放在「會學習」的撲克 AI 與扎實的撲克數學。

## 核心 AI 演算法
AI 層採分層設計：PokerMath 以 Monte Carlo 模擬計算勝率、底池賠率、隱含賠率與聽牌 outs，並用 Sklansky 起手牌分組評估強度；OpponentModeler 追蹤 VPIP、PFR、侵略性等統計，將對手分類為 TAG/LAG/TP/LP；DecisionEngine 以期望值為核心，融入位置加成、四種性格與可控隨機性；LearningEngine 則以簡化 Q-learning 進行強化學習，搭配 epsilon-greedy 探索與衰減，並透過 AIPersistence 把學到的策略存進 localStorage 長期累積。

## 引擎與架構
核心系統包含 EventBus（含優先序與錯誤隔離的觀察者模式）、StateManager／GameState（含轉移守衛與歷史回溯的有限狀態機）、以及鎖定 60 FPS、可暫停與時間縮放的 GameLoop／TimeManager，整體以事件解耦各模組。

## 多遊戲平台與品質
透過 GameRegistry 動態載入多款遊戲，除旗艦德州撲克外，還整合大老二、21 點與抽鬼牌，各自配有對應 AI。專案以 Vitest 撰寫 525+ 單元測試覆蓋核心邏輯，並提供統計面板（總覽、手牌歷史、AI 表現、對手分析）。

## 部署
以 Vite 開發、Docker／Nginx 容器化。Three.js 雖列為依賴，目前牌桌實際以 2D CSS/DOM 渲染，3D 為後續規劃。
