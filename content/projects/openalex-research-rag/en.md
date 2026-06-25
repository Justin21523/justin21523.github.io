---
title: "OpenAlex Research Intelligence (RAG)"
tagline: "A scholarly research intelligence platform with hybrid search, citation-grounded RAG, and an animated data-pipeline journey."
summary: "A full-stack research platform over 38,152 OpenAlex papers. It combines BM25 + dense-vector retrieval fused with Reciprocal Rank Fusion, citation-grounded streaming RAG (every claim links back to a [Wxxxx] source), bibliometric analytics (topic trends, concept co-occurrence network, UMAP cluster, journals, research velocity, citation graph, authors/institutions), an animated 'Data Story' pipeline journey, an app-like guided tour, and a complete 中文/English interface."
role: "Independent Developer / Full-stack & Retrieval/RAG System Architect"
problem: "Scholarly metadata is large and opaque. The goal was an explainable, demo-ready system that lets anyone search, ask grounded questions, and watch how raw data flows through a retrieval + RAG pipeline — not just see final numbers."
solution: "I built a FastAPI backend over DuckDB + ChromaDB + BM25 with a hybrid (RRF) retriever and a citation-grounded RAG pipeline (llama.cpp, with extractive fallback), then a React frontend with rich Recharts/framer-motion visualizations, an auto-starting guided tour, a 'Data Story' that animates a query through 7 pipeline stages with per-step explanations, and full i18n. I verified every feature with a Playwright capture pipeline (screenshots + demo video)."
outcome: "An interview-ready platform: hybrid + RAG search with clickable citations, four-view topic analytics, citation networks, author/institution explorers, search-log observability, an explainable pipeline journey, a guided tour, and bilingual UI — all captured end-to-end."
highlights:
  - "Hybrid retrieval: BM25 (rank_bm25) + all-MiniLM-L6-v2 dense vectors fused with Reciprocal Rank Fusion; live facets for year, journal, type, language, and citation count."
  - "Citation-grounded RAG: streamed answers (SSE) where every claim carries a clickable [Wxxxx] citation; question builder + presets; extractive fallback when no LLM."
  - "Data Story: upload your own papers or use the sample, then watch one query travel through 7 animated pipeline stages, each with a what/effect/why explainer and a journey summary."
  - "Analytics: topic trends, concept co-occurrence network, concept×year heatmap, UMAP semantic cluster, journal rankings, research velocity, citation graph, author & institution explorers, and search-log analytics."
  - "App-like guided tour that auto-starts, spotlights each feature across pages, types out explanations, and plays themed particles; complete 中文/English toggle."
challenges:
  - "Designing a hybrid retriever and a citation-grounded RAG pipeline that degrades gracefully to extractive mode when the LLM is offline."
  - "Making heavy analytics (UMAP cluster, co-occurrence graph, velocity) feel instant via in-memory TTL caching and a warm-up pipeline."
  - "Externalizing hundreds of UI strings into a full zh/en i18n layer while keeping technical terms in English."
  - "Verifying ~18 pages + the guided tour with an automated Playwright capture (viewport screenshots + a recorded walkthrough video)."
nextSteps:
  - "Grow the corpus beyond 100k papers and benchmark retrieval quality with qrels."
  - "Add multi-hop RAG and re-ranking as optional production profiles."
  - "Deploy the backend behind the portfolio with a reverse tunnel to a local llama.cpp."
---
OpenAlex Research Intelligence is more than a search box — it turns a 38k-paper scholarly corpus into an explainable, interactive research platform.

Visitors can run hybrid search (BM25 + dense vectors fused with RRF) with live facets, ask research questions and get citation-grounded answers where every claim links back to its source paper, and explore bibliometric analytics: topic trends, a concept co-occurrence network, a concept×year heatmap, a UMAP semantic cluster of papers, journal rankings, research velocity, a clickable citation graph, and author/institution explorers.

The centerpiece for explainability is the "Data Story": pick a sample (or upload your own papers) and watch a single query travel through seven pipeline stages — raw OpenAlex JSON, text cleaning, BM25, vector embedding, RRF fusion, RAG context assembly, and citation-grounded answer — each animated and annotated with a "what / effect / why" explainer plus a final journey summary (latency breakdown and candidate funnel).

An app-like guided tour starts automatically, spotlights each feature across pages with floating particles and typed explanations, and the entire interface toggles between 繁體中文 and English. Every feature was verified with a Playwright capture pipeline that produced the screenshots and the demo recording linked from this page.
