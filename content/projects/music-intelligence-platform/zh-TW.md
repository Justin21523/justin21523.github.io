---
title: "Music Intelligence Platform"
tagline: "Music Intelligence Platform 是一個音樂知識檢索、相似歌曲搜尋、推薦系統與 artist analytics 平台。它整合 Milli..."
summary: "Music Intelligence Platform 是一個音樂知識檢索、相似歌曲搜尋、推薦系統與 artist analytics 平台。它整合 Million Song Dataset、Taste Profile、MusicBrainz、ListenBrainz，以及 copyright-safe lyric-d..."
role: "獨立開發者"
problem: "此欄位需要依 README 與實際程式碼人工確認。"
solution: "此欄位需要依 Python 與系統架構人工補寫。"
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "需要補充真實技術挑戰。"
nextSteps:
  - "補齊截圖、Demo 與完整案例研究。"
---
Music Intelligence Platform 是一個音樂知識檢索、相似歌曲搜尋、推薦系統與 artist analytics 平台。它整合 Million Song Dataset、Taste Profile、MusicBrainz、ListenBrainz，以及 copyright-safe lyric-derived features，展示 metadata ETL、hybrid recommendation、ANN search、artist graph analytics、FastAPI API 與 Streamlit demo。

> Data Policy: This repo contains no raw music data. Only synthetic sample data (MIT-licensed) is committed. See docs/licensingnotes.md.

| Aspect | MovieLens | This Project | |--------|-----------|--------------| | Signal sources | Ratings only | Audio features + tag TF-IDF + embeddings + co-listen graph | | Search | None | BM25 + FAISS vector + hybrid RRF fusion | | Graph analytics | None | Artist co-listen n
