---
title: "IR / RAG Evaluation Lab"
tagline: "A professional information retrieval and RAG evaluation workbench covering BM25, Dense, Hybrid, Rerank, RAG citation, LLM judge, and text-mining analytics."
summary: "IR / RAG Evaluation Lab is a benchmark and evaluation lab, not a chatbot UI. It supports custom JSONL, BEIR/MS MARCO/OpenAlex ingestion, BM25 baseline, dense fallback, hybrid search, reranker interface, retrieval metrics, bad case analysis, RAG citation checking, local llama.cpp judging, query rewrite experiments, text-mining network analysis, and a bilingual React dashboard."
role: "Independent Developer / IR, RAG, and Evaluation Workflow Architect"
problem: "Many RAG demos show an answer after putting embeddings into a vector database, but they do not prove whether retrieval found the right evidence or explain failed queries, citation coverage, bad cases, or LLM judge reliability. This project was built as a reproducible, explainable, demo-ready IR/RAG evaluation lab."
solution: "I built a FastAPI + DuckDB backend for dataset registry, BM25/dense/hybrid/rerank retrievers, experiment persistence, retrieval metrics, bad case root-cause workflow, RAG claim-to-evidence evaluation, llama.cpp local judge history, and text-mining analytics. The React + TypeScript + Vite frontend provides an auto-starting guided assistant, Pipeline Journey, interactive heatmaps, scatter plots, networks, Sankey-style flows, and chart dashboards, all verified with Playwright screenshots and a walkthrough recording."
outcome: "An interview-ready evaluation platform: users can upload JSONL or use sample datasets, follow an assistant through the full data-to-evaluation journey, compare retrievers, inspect failures, review RAG citations, verify local llama.cpp judging, and export reproducible evidence."
highlights:
  - "Comparable BM25, Dense, Hybrid, and Rerank workflows with every search/evaluation run persisted to DuckDB."
  - "Evaluation Analytics includes metric matrices, failure heatmaps, rank movement, retriever battles, query diagnostics, and deterministic insight summaries."
  - "RAG Citation Checker splits answers into claims, maps evidence/citations, and uses local llama.cpp to assist with supported, partially supported, unsupported, or contradictory judgments."
  - "Text Mining combines co-occurrence networks, collocations, association rules, Sankey flows, community detection, and a Gephi-like network workbench."
  - "An app-like guided assistant auto-starts on every visit, jumps to feature targets, and explains results through spotlighted UI and the Pipeline Journey."
challenges:
  - "Keeping the product focused on benchmark/evaluation workflows instead of drifting into a generic ChatGPT interface."
  - "Designing fallback and real llama.cpp modes so offline demos still run while real LLM judge runs remain auditable."
  - "Turning raw JSON payloads into structured cards, badges, confidence bars, history dashboards, and reviewer workflows."
  - "Using Playwright to verify the guided tour, every major page, long-page screenshots, recording, and bilingual switching."
nextSteps:
  - "Connect larger BEIR/MS MARCO/OpenAlex benchmark corpora with deeper qrels coverage."
  - "Add a production cross-encoder/reranker adapter and Prompt Studio for evaluation prompts."
  - "Grow the report into an interactive benchmark artifact with more stakeholder-friendly conclusions."
---
IR / RAG Evaluation Lab is designed to prove retrieval and RAG evaluation quality, not merely produce answers.

Users can upload `documents.jsonl` and `queries.jsonl` or use the included sample datasets. The system persists data in a DuckDB dataset registry, checks data quality, runs BM25/dense/hybrid/rerank evaluations, and reports Precision@K, Recall@K, MRR, MAP, nDCG@K, latency, and zero-result rate.

The frontend is a bilingual evaluation dashboard with Query Evaluator, Retrieval Comparison, Evaluation Analytics, RAG Citation Checker, Bad Case Viewer, LLM Evaluation, Text Mining, and Experiment Runs. The auto-starting guide walks an interviewer across the actual feature areas and explains what the metrics and charts mean, instead of showing unexplained visuals.

local llama.cpp is used inside the evaluation workflow for claim support, bad case root-cause suggestions, query rewrite experiments, faithfulness judgments, and analyst notes. The UI labels LLM judge output as an assistive signal, not ground truth, and tracks latency, confidence, invalid JSON rate, and run history.

The full experience is verified by a Playwright walkthrough covering the guided assistant, Pipeline Journey, query evaluation, analytics heatmaps, RAG citation, LLM dashboard, text-mining network, and zh/en switching. The screenshots and recording linked on this project card come directly from that capture pipeline.
