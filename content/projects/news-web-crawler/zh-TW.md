---
title: "News Web Crawler & Analysis Pipeline"
tagline: "Scrapy-based Taiwanese news crawler with full CKIP NLP pipeline and ML analysis ..."
summary: "Scrapy-based Taiwanese news crawler with full CKIP NLP pipeline and ML analysis suite."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python 的解決方案。"
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
Scrapy-based Taiwanese news crawler with full CKIP NLP pipeline and ML analysis suite.

bash pip install -r requirements.txt playwright install chromium

python runcrawler.py cna --days 7 --max-articles 500

python pipelinecli.py run-all

python pipelinecli.py nlp --engine ckip --batch-size 64
