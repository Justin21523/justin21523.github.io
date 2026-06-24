---
title: "Fandom / MediaWiki Scraper Platform"
tagline: "A MediaWiki API-first wiki data platform with SQLite browsing, analysis, export, and compliance logging."
summary: "I stabilized and upgraded the original Fandom GUI scraper into a Web-first data platform. Users can create multi-wiki campaigns, follow a compliant crawl process, generate wiki.db outputs, browse pages/categories/links/templates/images/revisions/infobox/page text, review analysis visuals, export data, and watch a full guided walkthrough."
role: "Independent Python / Web Scraping / Data Engineering / GUI / Frontend Developer"
problem: "A scraper can easily stop at HTML extraction and output files, but a portfolio-grade project needs to show a fuller engineering system: API-first design, compliant runtime controls, resumable data workflows, inspectable SQLite datasets, Web/Qt UI, analysis visualization, and a reproducible demo."
solution: "I first stabilized runtime dependencies and compliance boundaries, removed unsafe bypass/proxy/fingerprint naming, and eliminated eager import side effects. Then I built a MediaWiki Action API-first data flow. The Web UI is organized around Campaigns, Scraper, Process, Browse, Analysis, Export, and Compliance Log, with Playwright-generated user guide screenshots and recordings."
outcome: "The project is now demoable as a complete Fandom / MediaWiki Wiki Data Scraper & Analysis Platform with a FastAPI backend, PyQt6 desktop viewer, SQLite wiki.db outputs, CSV/JSON/Parquet export, HTML infobox fallback, analysis visualization, bilingual Web UI, a guided user assistant, and a deployed live demo."
highlights:
  - "Built an API-first crawler flow that prefers the MediaWiki Action API, using HTML parsing only as an infobox-like data fallback."
  - "Stored pages, categories, links, templates, images, revisions metadata, infobox fields, and page text in SQLite for Web and Qt browsing."
  - "Completed live data UX for Campaigns, Browse, and Analysis, including dataset counts, search, pagination, error drill-down, network graph, and quality summaries."
  - "Added a guided user assistant, bilingual UI, indigo/light visual theme, Playwright section screenshots, and demo recordings."
challenges:
  - "Keeping the scraper compliant required clear boundaries: no CAPTCHA bypass, Cloudflare bypass, login wall handling, proxy pools, or fingerprint spoofing."
  - "The demo needed both offline sample data and compliant live crawl presets so it would not depend on external network state while still proving the pipeline works."
  - "The Qt GUI, FastAPI backend, static Web UI, SQLite schema, and portfolio page all had to reflect the same data workflow."
nextSteps:
  - "Add integration tests for more MediaWiki edge cases such as continuation, redirects, template-heavy pages, and image metadata."
  - "Expand the analysis layer with centrality metrics, category clustering, and text quality scoring."
  - "Package the live demo deployment into a more reliable container release flow to reduce manual remote deployment work."
---
The core of this project is not simply crawling a website. It turns Fandom / MediaWiki wiki content into an inspectable, resumable, and analyzable data platform. Users can choose the fast offline demo or a compliant live crawl preset. The process shows URL normalization, robots checks, API discovery, rate limiting, retry/backoff, checkpoints, SQLite persistence, and export.

The data layer centers on `wiki.db`. The crawler writes MediaWiki pages, categories, links, templates, images, revisions metadata, infobox-like fields, and page text into SQLite. Both the Web Browse view and the Qt Viewer can read the same output, so the demo is not only a UI mockup. Users can inspect tables, search datasets, switch dataset types, paginate through rows, and download CSV/JSON/Parquet exports.

The Web UI is now the main portfolio presentation. Campaigns shows multi-wiki runs, per-wiki counts, and events. Process visualizes the crawl pipeline. Browse lets users inspect the actual data. Analysis uses category bars, text terms, a network graph, and quality checks to show the value after data engineering. Compliance Log records robots, rate limits, 403/429 handling, stop reasons, and explicit non-goals.

I also automated the demo evidence itself. Playwright opens the demo app, sets the Chinese UI and theme, runs the guided user assistant, jumps through each page, and captures section screenshots plus recordings. Those assets are reused in the README, live demo preview, and portfolio project page so users can quickly understand the full pipeline without hunting through the interface.
