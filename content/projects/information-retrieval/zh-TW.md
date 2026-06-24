---
title: "CNIRS 中文新聞智能檢索系統"
tagline: "可查詢、可解釋、可評估的中文新聞 Search Engine Demo。"
summary: "CNIRS 是一個以 Flask、Python 與傳統資訊檢索方法打造的中文新聞檢索系統。它整合 BM25、TF-IDF、Boolean、Hybrid、LM、BIM、WAND、MaxScore、CSoundex、Query Expansion、Clustering、Summarization、Ranking Diagnostics、Evaluation Dashboard 與 Feedback/LTR sandbox，並使用大量台灣新聞語料展示完整 Search Engine Demo。"
role: "獨立開發者 / IR 系統架構與全端實作"
problem: "原本專案比較接近課堂型 IR demo，雖然有許多演算法模組，但缺少穩定 Web App、統一 API、可展示 UI、可解釋結果、真實新聞資料與完整操作流程。"
solution: "我把核心 IR 模組整理成 Flask service layer，建立統一搜尋 API、facet browsing、document detail、model comparison、evaluation、diagnostics、feedback analytics 與 analysis graph，並用 Playwright 產生完整導覽截圖與錄影。"
outcome: "完成一個可以放在作品集展示的中文新聞檢索系統，訪客可以搜尋新聞、切換模型、套用 facets、查看排序原因、比較模型、檢視評估指標、瀏覽分析圖譜與觀察 feedback/LTR 基礎。"
highlights:
  - "支援 BM25、TF-IDF、Boolean、Hybrid、LM、BIM、WAND、MaxScore、Fuzzy、CSoundex 等多種 IR 方法。"
  - "可直接點選 facets 瀏覽所有符合 metadata 的新聞，不需要輸入 query。"
  - "每筆結果提供 snippet、highlight、component scores、field boost 與 Why this result explanation。"
  - "Document detail 整合 summary、KWIC、keywords、taxonomy、related news 與 metadata facets。"
  - "Model Comparison、Evaluation、Ranking Diagnostics、Feedback Analytics 與 Analysis Graph 都有視覺化頁面。"
challenges:
  - "需要把原本分散的研究型 IR modules 接成一致、可測、可展示的 service API。"
  - "中文新聞需要處理斷詞、正規化、metadata 清理、taxonomy 與 facet 品質。"
  - "低資源部署環境不能 eager-load CKIP/BERT 等重型模型，因此需要 optional dependency fallback。"
  - "GitHub Pages 是靜態站，不能直接跑 Flask，所以 portfolio 頁要用影片、截圖與外部 live demo 連結呈現完整效果。"
nextSteps:
  - "持續擴充 qrels 與人工 relevance labels，讓 evaluation 更接近正式 benchmark。"
  - "將 feedback dataset 擴充到真正 learning-to-rank 實驗。"
  - "把 semantic retrieval 作為 optional production profile，而不是預設啟動。"
---
這個作品最重要的重點不是單一演算法，而是把一組資訊檢索模組整理成真正可以操作的 Search Engine Demo。

使用者可以從主搜尋頁輸入中文新聞 query，選擇 BM25、TF-IDF、Hybrid、Boolean、LM、BIM、WAND 或 MaxScore 等模型，並搭配來源、主題分類、日期、tags、publisher 等 facets 即時縮小結果。Facet 也可以在沒有 query 的情況下直接瀏覽所有對應文章，這讓系統不只是 search box，也像一個新聞資料探索工具。

每筆搜尋結果都會呈現標題、摘要片段、highlight、score、metadata 與 explanation。使用者可以打開 Why this result 面板檢查 matched terms、component scores、field boost 與 ranking signals，也可以打開文章 detail modal 查看 summary、KWIC、keywords、related news、taxonomy 與完整 metadata。

為了讓作品更像完整 IR 系統，我另外做了 Model Comparison、Evaluation Dashboard、Ranking Diagnostics、Feedback Analytics 與 Analysis Graph。這些頁面讓面試官可以看到同一個 query 在不同模型下的排序差異、demo qrels 指標、BM25/TF-IDF/LM 分數拆解、click/relevance feedback 統計，以及從 query 到 ranking results 的節點式流程圖。

GitHub Pages 作品頁會直接顯示完整 demo 截圖與錄影；真正可互動的 Flask 搜尋系統則放在 Live Demo 連結中。
