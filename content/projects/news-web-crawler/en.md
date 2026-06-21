---
title: "News Web Crawler & Analysis Pipeline"
tagline: "Scrapy-based Taiwanese news crawler with full CKIP NLP pipeline and ML analysis ..."
summary: "Scrapy-based Taiwanese news crawler with full CKIP NLP pipeline and ML analysis suite."
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using Python."
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
Scrapy-based Taiwanese news crawler with full CKIP NLP pipeline and ML analysis suite.

bash pip install -r requirements.txt playwright install chromium

python runcrawler.py cna --days 7 --max-articles 500

python pipelinecli.py run-all

python pipelinecli.py nlp --engine ckip --batch-size 64
