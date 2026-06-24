---
title: "CNIRS Chinese News IR System"
tagline: "An explainable, evaluable, portfolio-ready Chinese news search engine demo."
summary: "CNIRS is a Flask and Python information retrieval system for searching a unified Taiwanese news corpus. It combines BM25, TF-IDF, Boolean, Hybrid, Language Model retrieval, BIM, WAND, MaxScore, CSoundex, query expansion, clustering, summarization, ranking diagnostics, evaluation dashboards, and a feedback/LTR sandbox into a usable search engine demo."
role: "Independent Developer / IR System Architect and Full-stack Implementer"
problem: "The original repository contained many academic IR modules, but it needed a stable web app, unified APIs, explainable results, real news data, visual dashboards, and a clear portfolio demo flow."
solution: "I reorganized the IR functionality behind a Flask service layer, added unified search APIs, facet browsing, document detail enrichment, model comparison, evaluation, diagnostics, feedback analytics, and a node-based analysis graph, then verified the demo with Playwright screenshots and video recording."
outcome: "The project is now a portfolio-ready Chinese news retrieval system where visitors can search news, switch ranking models, apply facets, inspect explanations, compare models, review evaluation metrics, explore an analysis graph, and see how feedback can support future ranking improvements."
highlights:
  - "Supports BM25, TF-IDF, Boolean, Hybrid, LM, BIM, WAND, MaxScore, Fuzzy, and CSoundex retrieval modes."
  - "Facet browsing works without a query, so users can directly browse all news matching selected metadata."
  - "Each result exposes snippets, highlights, component scores, field boosts, and Why this result explanations."
  - "Document detail combines summary, KWIC, keywords, taxonomy metadata, related news, and source facets."
  - "Model Comparison, Evaluation, Ranking Diagnostics, Feedback Analytics, and Analysis Graph pages make the IR pipeline visually demonstrable."
challenges:
  - "Consolidating research-style IR modules into a stable, testable, demo-ready service API."
  - "Handling Chinese tokenization, normalization, metadata cleaning, taxonomy mapping, and facet quality."
  - "Keeping heavy optional models such as CKIP/BERT out of low-resource startup paths through graceful fallback."
  - "Presenting a dynamic Flask system from a static GitHub Pages portfolio using screenshots, video, and a live demo link."
nextSteps:
  - "Expand qrels and human relevance labels for a stronger evaluation benchmark."
  - "Grow the feedback dataset into a real learning-to-rank experiment."
  - "Expose semantic retrieval as an optional production profile rather than a default startup dependency."
---
CNIRS is not just a single ranking algorithm. The main achievement is turning a set of information retrieval modules into a complete, usable search engine demo.

Visitors can search Taiwanese news, choose among BM25, TF-IDF, Hybrid, Boolean, LM, BIM, WAND, and MaxScore, and narrow results by source, taxonomy, date, tags, publisher, and other metadata facets. Facets can also be clicked without a query, which turns the interface into a corpus exploration tool rather than only a search box.

Each result includes title, snippet, highlight, score, metadata, and a ranking explanation. The Why this result panel shows matched terms, component scores, field boosts, and ranking signals. The document detail view adds summary, KWIC, keywords, related news, taxonomy, and full metadata.

To make the project interview-ready, I added Model Comparison, Evaluation Dashboard, Ranking Diagnostics, Feedback Analytics, and an Analysis Graph. These pages show how ranking models differ, how demo qrels are evaluated, how BM25/TF-IDF/LM scores are decomposed, how user feedback is logged, and how a query flows through the retrieval pipeline.

The GitHub Pages portfolio page shows the full demo screenshots and recording. The live Flask search system is available through the Live Demo link.
