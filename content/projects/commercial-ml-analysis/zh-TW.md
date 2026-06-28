---
title: "商業機器學習分析平台"
tagline: "處理數十 GB Amazon 評論的生產級傳統 ML 與 MLOps 平台"
summary: "一套面向電商的端到端機器學習分析平台，以 Polars 處理數十 GB 級 Amazon 評論資料，涵蓋 ETL、特徵工程、梯度提升模型訓練與 Optuna 調參、漂移監控與自動再訓練，並整合 NLP、CLV、客群分群、推薦與因果推論等商業分析模組，最終以 React／Streamlit 儀表板呈現。"
role: "獨立開發者：主導架構設計、資料管線、模型訓練、MLOps 監控與前後端儀表板實作。"
problem: "電商團隊面對數十 GB 的評論與互動資料，缺乏一條可重現、CPU 即可運行、且能持續監控模型品質的端到端分析管線；同時需要將原始評論轉化為可行動的商業洞察。"
solution: "以 Polars 惰性運算與分區 Parquet 建構記憶體安全的 ETL，搭配 RFM／滾動視窗／交叉驗證目標編碼的特徵工程；用 LightGBM／CatBoost＋Optuna 進行時間序列交叉驗證訓練，透過 MLflow 追蹤、ONNX 匯出加速推論；以 Evidently AI 偵測 PSI／Wasserstein 漂移並由 Prefect 觸發條件式再訓練；另構建 NLP、CLV、分群、推薦、購物籃與因果／增益模型等分析模組，並以 Starlette ASGI API 驅動 React 儀表板。"
outcome: "完成多階段交付（Phase 1/2 皆標記完成），具備測試套件與覆蓋率報告、DVC 資料版控、Makefile 一鍵管線，並提供可在無原始資料時生成樣本的 portfolio-safe 快速示範流程。"
highlights:
  - "以 Polars 惰性運算＋串流模式與分區 Parquet 處理數十 GB 資料，純 CPU 即可運行"
  - "LightGBM／CatBoost＋Optuna 貝氏調參，採 TimeSeriesSplit 防止資料洩漏，並匯出 ONNX 加速推論"
  - "Evidently AI 漂移偵測（PSI、Wasserstein、目標漂移）配合 Prefect 編排的自動再訓練觸發"
  - "完整商業分析模組：NLP 情感／主題、CLV（BG/NBD、Gamma-Gamma）、客群分群、推薦、購物籃、因果推論與增益模型"
  - "雙儀表板：Starlette ASGI API 驅動的 React 分析介面與 Streamlit 後備介面"
  - "以 MLflow＋DVC＋YAML 配置確保實驗與資料的可重現性，並具 pytest 測試與覆蓋率報告"
challenges:
  - "在純 CPU、有限記憶體下處理數十 GB 資料，需以惰性運算、串流與分塊清洗避免 OOM"
  - "將原始評論誠實建模為「使用者-產品-評分」互動，避免誤呈現為完整訂單交易，並維持衍生資料的公開安全政策"
nextSteps:
  - "導入分散式運算或 GPU 加速以進一步擴展資料規模"
  - "強化線上推論服務與 API 的部署與容器化"
  - "擴充因果與增益模型的線上 A/B 驗證閉環"
---
## 專案概述

商業機器學習分析平台是一套為電商打造的生產級「傳統 ML」分析與預測系統，針對大規模 Amazon 評論資料（數十 GB）設計。它將原始評論轉化為可行動的商業洞察，涵蓋從資料攝取到模型上線監控的完整 MLOps 生命週期，並全程以 CPU 高效運行。

## 技術架構

資料層以 Polars 惰性運算與分區 Parquet 為核心，搭配 Dask 進行核外運算與 Great Expectations 資料品質驗證。特徵工程涵蓋 RFM、7d/30d/90d 滾動視窗統計、交叉驗證的目標編碼與時間週期性編碼。模型層採 LightGBM／CatBoost／XGBoost 梯度提升，以 Optuna 進行貝氏超參數搜尋、TimeSeriesSplit 交叉驗證，透過 MLflow 追蹤實驗並匯出 ONNX 以加速 CPU 推論。

## MLOps 與監控

以 Evidently AI 偵測資料與概念漂移（PSI、Wasserstein 距離、目標漂移與效能衰退），並由 Prefect 編排條件式自動再訓練管線；DVC 負責資料與管線版控，YAML 統一管理超參數與閾值，確保整體可重現。

## 商業分析模組

除核心預測外，平台內建多個分析模組：NLP 情感與 LDA 主題建模、面向級情感與摘要；以 BG/NBD 與 Gamma-Gamma 的機率式 CLV；HDBSCAN 客群分群與世代分析；ALS／SVD 推薦系統；FP-Growth 購物籃關聯規則；以及以 DML／IV 與 S/T/X-Learner 為基礎的因果推論與增益模型。

## 呈現層

前端提供 Starlette ASGI API 驅動的 React 分析儀表板（recharts、淺色主題、可重現截圖與對比度檢查），並保留 Streamlit 後備儀表板。專案附帶 pytest 測試套件、覆蓋率報告與 portfolio-safe 快速示範流程，在缺乏原始資料時可自動生成標註清楚的樣本資料以重現完整產物。
