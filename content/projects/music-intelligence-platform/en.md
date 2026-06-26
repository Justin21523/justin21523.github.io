---
title: "Music Intelligence Platform"
tagline: "Music Intelligence Platform 是一個音樂知識檢索、相似歌曲搜尋、推薦系統與 artist analytics 平台。它整合 Milli..."
summary: "Music Intelligence Platform 是一個音樂知識檢索、相似歌曲搜尋、推薦系統與 artist analytics 平台。它整合 Million Song Dataset、Taste Profile、MusicBrainz、ListenBrainz，以及 copyright-safe lyric-d..."
role: "Independent Developer"
problem: "This field needs review against the README and source code."
solution: "This field needs a reviewed architecture summary based on Python."
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "Add verified engineering challenges."
nextSteps:
  - "Add screenshots, demo material, and a complete case study."
---
Music Intelligence Platform 是一個音樂知識檢索、相似歌曲搜尋、推薦系統與 artist analytics 平台。它整合 Million Song Dataset、Taste Profile、MusicBrainz、ListenBrainz，以及 copyright-safe lyric-derived features，展示 metadata ETL、hybrid recommendation、ANN search、artist graph analytics、FastAPI API 與 Streamlit demo。

> Data Policy: This repo contains no raw music data. Only synthetic sample data (MIT-licensed) is committed. See docs/licensingnotes.md.

| Aspect | MovieLens | This Project | |--------|-----------|--------------| | Signal sources | Ratings only | Audio features + tag TF-IDF + embeddings + co-listen graph | | Search | None | BM25 + FAISS vector + hybrid RRF fusion | | Graph analytics | None | Artist co-listen n
