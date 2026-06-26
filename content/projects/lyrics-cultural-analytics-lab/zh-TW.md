---
title: "Lyrics Cultural Analytics Lab"
tagline: "Copyright-safe 歌詞文化分析與可解釋機器學習平台"
summary: "一個以 React、FastAPI、DuckDB 與 scikit-learn 建成的雙語資料產品，用 metadata、BoW、TF-IDF、topic modeling、相似度與分類模型分析歌曲文化趨勢，同時避免公開完整歌詞。"
role: "獨立開發者 / Full-stack Data Product Developer"
problem: "歌詞分析作品很容易落入兩個風險：只停留在 notebook 圖表，或在展示時暴露不該公開的完整歌詞。這個專案要把歌曲 metadata、衍生特徵、模型結果與可視化流程整理成可操作的產品，同時維持 copyright-safe 邊界。"
solution: "我建立 FastAPI backend、DuckDB feature store、scikit-learn 分析流程與 React TypeScript dashboard，讓使用者可以檢查資料、清理欄位、比較模型、探索主題與情緒趨勢，並透過 guided tour 看見完整資料流程。"
highlights:
  - "以 metadata、BoW、TF-IDF、topics、模型輸出與聚合結果呈現分析，不顯示完整歌詞。"
  - "提供 overview、dataset workflow、ML lab、evaluation、similarity、artist style 與 reporting 等完整 dashboard。"
  - "後端包含資料驗證、安全檢查、DuckDB ETL、分類、相似度、topic modeling 與 evaluation endpoints。"
  - "用 Playwright 產出 guided tour 截圖與錄影，讓作品集卡片能展示真實互動畫面。"
challenges:
  - "在可展示的 demo 與不暴露 raw lyrics 之間設計清楚資料邊界。"
  - "把資料處理、模型訓練、評估與前端探索整合成一致工作流。"
nextSteps:
  - "串接更多授權資料來源的衍生特徵匯入流程。"
  - "擴充模型比較與文化趨勢解釋報告。"
---
Lyrics Cultural Analytics Lab 是一個 copyright-safe 的歌詞文化分析資料產品。它不是單一 notebook，而是把 FastAPI backend、DuckDB feature store、scikit-learn 模型流程與 React TypeScript dashboard 組成一個可操作的平台。

產品重點是讓使用者探索歌曲文化趨勢，同時不公開完整歌詞。Demo 使用 metadata、BoW features、TF-IDF、topic labels、sentiment scores、similarity outputs、classification metrics 與聚合圖表，並用安全檢查避免 API response、sample data 或 UI 出現 raw lyric fields。

前端包含總覽 dashboard、資料集 workflow、topic explorer、sentiment timeline、similar songs、artist style、ML lab、evaluation、explainability center 與 report workspace。作品集素材包含 overview、workflow、ML lab 截圖與 guided tour 錄影，因此在「所有專案」頁面可以直接看到這個專案的實際樣子。
