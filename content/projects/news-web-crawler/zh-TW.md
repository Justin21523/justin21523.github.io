---
title: "新聞網路爬蟲與資料智慧平台"
tagline: "從爬取、中文 NLP 到 ML 分析的全端新聞資料管線"
summary: "以 Scrapy 爬取台灣新聞（中央社、公視、自由），透過 CKIP 進行 GPU 加速的中文斷詞、詞性與實體辨識，再以 scikit-learn 完成主題建模、分群、情感與時間序列分析。FastAPI 後端與 Next.js 前端把整條管線搬上瀏覽器，含資料品質、文字探勘與可解釋 ML 診斷儀表板。"
role: "獨立開發者：負責爬蟲、資料工程、NLP/ML 分析模組與前後端全端架構。"
problem: "中文新聞資料分散、格式不一且充滿反爬蟲限制；多數爬蟲僅能取得原始文字，缺乏可重現的清洗、NLP 標註與分析流程，分析結果也難以讓非工程人員檢視。"
solution: "建立分層管線：反偵測爬蟲（Scrapy + Playwright 偽裝中介層）→ 結構化清洗與去重（RawArticle→Clean→Enriched，SQLite FTS5）→ CKIP 聯合斷詞/詞性/NER（GPU 自動偵測、RAM 安全批次）→ 模組化分析套件（搭配詞、LDA/NMF 主題、K-Means 分群、分類、摘要、時間序列）。再以 FastAPI 提供版本化 API、Next.js 儀表板呈現，並支援背景任務、ML 工件管理與報告匯出。"
outcome: "完成可由統一 CLI（13 指令）或瀏覽器操作的端到端平台，具備資料品質檢視、文字探勘工作台、可解釋決策樹與多模型比較，並提供 Docker Compose 一鍵部署與引導式 Demo 導覽（含截圖與影片驗證）。"
highlights:
  - "反偵測爬蟲中介層（stealth + humanization）支援多家台灣新聞來源"
  - "CKIP 聯合斷詞+POS+NER，搭配 GPU 自動偵測與 RAM 安全批次處理"
  - "六大模組化分析套件：搭配詞、主題建模、分群、分類、摘要、時間序列"
  - "FastAPI + Next.js 全端儀表板，含資料品質、文字探勘與 ML 診斷頁"
  - "可解釋 ML：邏輯迴歸/SVM/NB/決策樹/隨機森林訓練、決策樹視覺化與工件比較"
  - "背景任務系統與多格式匯出（CSV/Parquet/JSONL/HuggingFace Dataset）"
challenges:
  - "在 4GB RAM 預算下平衡 CKIP transformer 的 GPU 吞吐與記憶體安全，採自動批次調整"
  - "將命令列導向的研究型管線重構為版本化 API 與可被非工程人員理解的儀表板"
  - "誠實處理弱監督情感標註——在缺乏人工標註前明確標示為 weak supervision"
nextSteps:
  - "導入人工標註情感資料集以取代弱監督標籤"
  - "擴充更多新聞來源並強化排程與增量爬取"
  - "深化 LLM 摘要整合（目前以本地 llama.cpp 相容端點為選用功能）"
---
## 概述

這是一套針對台灣中文新聞的端到端資料智慧平台，將「爬取 → 清洗 → 中文 NLP → 機器學習分析 → 視覺化呈現」整合為單一可重現的管線，並同時提供命令列與瀏覽器兩種操作介面。

## 資料工程與爬蟲

以 Scrapy 搭配 scrapy-playwright 與自訂反偵測中介層（偽 UA、行為擬人化）爬取中央社、公視、自由時報。資料經由 `RawArticle → CleanArticle → EnrichedArticle` 的結構化 schema 進行寬窄字、繁簡、HTML/URL 正規化、驗證與去重，最終寫入支援 FTS5 全文檢索的 SQLite。

## 中文 NLP 與分析

NLP 層以 CKIP Transformers 進行聯合斷詞、詞性標註與命名實體辨識，透過 ResourceManager 自動偵測 CUDA 並在固定 RAM 預算下安全批次處理（Jieba 作為後備）。分析套件涵蓋 PMI/對數似然搭配詞、LDA/NMF 主題建模、K-Means 與階層分群、TF-IDF 分類與詞典情感、Lead-K/TextRank/MMR 摘要，以及線性趨勢與突發偵測。

## 全端 Web 平台

FastAPI 後端以版本化路由（`/api/v1`）暴露資料品質、分析總覽與 ML 端點，並支援可持久化的背景任務與 ML 工件管理（model.joblib、向量器、manifest、決策樹 PNG/SVG）。Next.js 15（App Router）前端以資料優先的儀表板風格呈現 KPI、處理流程與圖表，並內建引導式導覽助手，產出可作為面試佐證的截圖與影片。

## 工程實踐

專案提供 Docker Compose 一鍵部署、pytest 後端測試與 Playwright 端對端測試，並對弱監督情感標註等不確定性保持誠實標示，避免以佔位值填充儀表板。
