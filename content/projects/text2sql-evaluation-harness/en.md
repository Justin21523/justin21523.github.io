---
title: "Text2SQL Evaluation Harness"
tagline: "Text2SQL Evaluation Harness 是一個支援 Agentic BI 的 Text2SQL 評估工具。它能載入 Spider、DuckDB ..."
summary: "Text2SQL Evaluation Harness 是一個支援 Agentic BI 的 Text2SQL 評估工具。它能載入 Spider、DuckDB Text2SQL 25k 或自建 warehouse benchmark，比較 prompt templates、schema retrieval 策略、SQL..."
role: "Independent Developer"
problem: "This field needs review against the README and source code."
solution: "This field needs a reviewed architecture summary based on the detected stack."
highlights:
  - "It evaluates fixed benchmark questions against gold SQL and warehouse data."
  - "It stores runs, predictions, m"
challenges:
  - "Add verified engineering challenges."
nextSteps:
  - "Add screenshots, demo material, and a complete case study."
---
Text2SQL Evaluation Harness 是一個支援 Agentic BI 的 Text2SQL 評估工具。它能載入 Spider、DuckDB Text2SQL 25k 或自建 warehouse benchmark，比較 prompt templates、schema retrieval 策略、SQL validation、execution accuracy、unsafe SQL blocking、latency 與 bad case replay。

This repository is a reproducible Text2SQL evaluation harness, not a chatbot. It focuses on benchmark loading, schema catalogs, prompt and retrieval ablations, SQL safety, execution accuracy, latency, and bad case replay for Agentic BI systems.

- It evaluates fixed benchmark questions against gold SQL and warehouse data. - It stores runs, predictions, m
