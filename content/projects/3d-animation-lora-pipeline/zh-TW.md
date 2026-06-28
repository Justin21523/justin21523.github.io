---
title: "3D 動畫 LoRA 訓練管線與 Demo 展示平台"
tagline: "把動畫素材整理成可訓練資料集，並包裝成可展示、可截圖、可錄影的 portfolio demo"
summary: "一套以 3D CGI 動畫素材為對象的 LoRA 資料工程與訓練管線。專案整合影片抽幀、角色實例分割、CLIP/HDBSCAN 分群、自動標註、姿態資料、LoRA/ControlNet 訓練與評估流程，並額外建立匿名 demo 網站、截圖、錄影與 README，讓面試官可以快速理解系統價值與技術成果。"
role: "獨立開發者：管線架構、demo 包裝、測試驗證、作品頁素材與文件整理"
problem: "原始動畫素材通常無法直接拿來訓練 LoRA。從影片到可用資料集需要抽幀、去重、分割、分群、標註、姿態資料與評估報告；如果只展示 CLI 或資料夾結構，面試官很難在短時間內理解專案價值。"
solution: "建立設定檔驅動的多階段 Python 管線，將影片前處理、視覺分割、嵌入分群、資料集組裝與訓練評估拆成可重跑的階段；同時新增 CPU-safe stub demo、靜態展示網站、匿名 sample data、產品化結果卡片、截圖與 walkthrough 影片，使專案能在沒有私有素材與 GPU 權重的情況下被公開展示。"
outcome: "完成可公開展示的 demo 版本：GitHub Pages 上有互動 demo 網站，作品集頁面有完整 media gallery、截圖、錄影與 GitHub/README 連結；測試涵蓋 demo manifest 與媒體資產，並可用 Docker/Nginx 部署靜態站。"
highlights:
  - "以匿名 sample data 展示資料管線成果，不暴露原始素材或角色名稱"
  - "完整 portfolio media package：cover、桌面截圖、行動截圖、結果頁截圖與 MP4 walkthrough"
  - "多階段 pipeline manifest 呈現抽幀、去重、分割、姿態、嵌入、訓練資料與輸出成果"
  - "Demo-safe 測試可在 CPU-only 環境快速驗證，不依賴私有影片或大型權重"
  - "靜態 demo 可部署到 GitHub Pages，也能以 Docker/Nginx 打包"
  - "README 與作品頁把技術棧、架構、啟動方式與展示流程整理成面試可讀格式"
challenges:
  - "需要把研究型 pipeline 轉換成面試官能快速理解的產品化展示介面"
  - "公開展示時必須匿名化素材脈絡，避免暴露角色名稱與私有資料來源"
  - "原始流程依賴 GPU、模型權重與大量媒體檔，因此需要另外設計 CPU-safe demo path"
nextSteps:
  - "補更多匿名 demo scenario，例如資料品質檢查、訓練設定比較與 checkpoint evaluation"
  - "把錄影腳本自動化，讓 demo 影片能隨 UI 更新重新產生"
  - "將 2D/3D 訓練管線整理成單一可展示控制台"
---
## 專案概述

這個專案原本是一套研究型的 3D 動畫 LoRA 資料管線，核心目標是把長影片素材轉換成可訓練的角色資料集，再接到 LoRA、ControlNet 與影片生成相關工作流。這次整理後，重點不只放在「管線能跑」，也補上面試展示需要的外層：匿名資料、可截圖頁面、demo 錄影、公開網站與清楚的 README。

## 架構與資料流程

資料流程以 stage-based orchestrator 串接：影片抽幀、感知去重、偵測追蹤、前景/背景分割、姿態條件資料、embedding index、LoRA dataset、ControlNet dataset、inference samples 與 animation export。每個階段會輸出 metadata 與 artifact，demo manifest 再把這些狀態整理成前端可讀的展示資料。

## Demo 展示設計

公開 demo 不使用私有影片或具名角色，而是用匿名 sample data 模擬真實產線結果。網站首頁先讓面試官看到 pipeline value proposition，再用 product results 區塊呈現 character sheet、before/after、training metrics、evaluation matrix 與 animation strip。作品集頁面則整合 cover、截圖與 MP4 walkthrough，讓整個專案在瀏覽作品集時就像完整作品，而不是只有 README。

## 工程重點

專案包含 Python CLI、pytest smoke tests、Docker/Nginx 靜態部署、GitHub Pages 發布與 media asset packaging。對面試官來說，這個作品展示的不只是 AI 名詞，而是如何把資料處理、模型訓練、前端展示、文件與部署串成一個可信的 portfolio project。
