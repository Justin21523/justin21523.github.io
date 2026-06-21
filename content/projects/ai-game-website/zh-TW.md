---
title: "ReactAI Game Website（React + Vite）"
tagline: "此專案是「React + Vite」前端，並在 /battle 掛載 Phaser 3 來製作「橫向 2D 平台格鬥」原型。目前已具備： - HP 制的快節奏 ..."
summary: "此專案是「React + Vite」前端，並在 /battle 掛載 Phaser 3 來製作「橫向 2D 平台格鬥」原型。目前已具備： - HP 制的快節奏 1v1 對戰（暫以幾何方塊呈現） - 雙 AI（AI vs AI）：兩邊都用同一套 Behavior Tree（BT）原理產生 intent，降低人工測試成本 ..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Phaser, React, Tailwind CSS 的解決方案。"
highlights:
  - "**HP 制**的快節奏 1v1 對戰（暫以幾何方塊呈現）"
  - "**雙 AI（AI vs AI）**：兩邊都用同一套 Behavior Tree（BT）原理產生 intent，降低人工測試成本"
  - "**BT 實驗室（JSON）**：可編輯/儲存 BT，並套用到對戰頁"
  - "**可解釋資料（debug）**：BT trace / reasons / blackboard 摘要可輸出給 UI 顯示"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
此專案是「React + Vite」前端，並在 /battle 掛載 Phaser 3 來製作「橫向 2D 平台格鬥」原型。目前已具備： - HP 制的快節奏 1v1 對戰（暫以幾何方塊呈現） - 雙 AI（AI vs AI）：兩邊都用同一套 Behavior Tree（BT）原理產生 intent，降低人工測試成本 - BT 實驗室（JSON）：可編輯/儲存 BT，並套用到對戰頁 - 可解釋資料（debug）：BT trace / reasons / blackboard 摘要可輸出給 UI 顯示

環境需求（Vite 6）：Node ^18.0.0 || ^20.0.0 || >=22.0.0

在專案根目錄執行： bash npm ci npm run dev

常用指令： - npm run dev：啟動開發伺服器（HMR）。 - npm run build：建置正式版到 dist/。 - npm run preview：在本機預覽 dist/。 - npm run lint：執行 ESLint（可加 -- --fix）。

- /：預設入口（會導向 /battle，一進站就能看到 AI 對戰） - /battle：對戰（Phaser 場景；預設 AI vs AI，可切換任一邊為人類鍵盤控制；可一鍵重新開始） - /menu：選單/首頁（可選） - /lab/bt：Behavior Tree 實驗室（JSON）
