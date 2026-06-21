---
title: "Dcard Trending Crawler"
tagline: "A production-style crawler system for collecting public posts from Dcard's trend..."
summary: "A production-style crawler system for collecting public posts from Dcard's trending forum. Built with an API-first approach, using Playwright only as a fallback..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python 的解決方案。"
highlights:
  - "**API-First Crawling**: Uses Dcard's public JSON API endpoints for efficient data collection"
  - "**Browser Fallback**: Playwright-based endpoint discovery when API structure changes"
  - "**Resume Support**: Checkpoint-based resume to continue from last successful position"
  - "**Data Quality**: Validation layer for detecting empty content, duplicates, and malformed records"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
A production-style crawler system for collecting public posts from Dcard's trending forum. Built with an API-first approach, using Playwright only as a fallback for endpoint discovery.

- API-First Crawling: Uses Dcard's public JSON API endpoints for efficient data collection - Browser Fallback: Playwright-based endpoint discovery when API structure changes - Resume Support: Checkpoint-based resume to continue from last successful position - Data Quality: Validation layer for detecting empty content, duplicates, and malformed records - Rate Limiting: Built-in throttling to avoid overwhelming the target server - Retry Logic: Exponential backoff for handling transient failures - Structured Storage: SQLite database with clean
