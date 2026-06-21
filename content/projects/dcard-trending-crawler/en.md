---
title: "Dcard Trending Crawler"
tagline: "A production-style crawler system for collecting public posts from Dcard's trend..."
summary: "A production-style crawler system for collecting public posts from Dcard's trending forum. Built with an API-first approach, using Playwright only as a fallback..."
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using Python."
highlights:
  - "**API-First Crawling**: Uses Dcard's public JSON API endpoints for efficient data collection"
  - "**Browser Fallback**: Playwright-based endpoint discovery when API structure changes"
  - "**Resume Support**: Checkpoint-based resume to continue from last successful position"
  - "**Data Quality**: Validation layer for detecting empty content, duplicates, and malformed records"
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
A production-style crawler system for collecting public posts from Dcard's trending forum. Built with an API-first approach, using Playwright only as a fallback for endpoint discovery.

- API-First Crawling: Uses Dcard's public JSON API endpoints for efficient data collection - Browser Fallback: Playwright-based endpoint discovery when API structure changes - Resume Support: Checkpoint-based resume to continue from last successful position - Data Quality: Validation layer for detecting empty content, duplicates, and malformed records - Rate Limiting: Built-in throttling to avoid overwhelming the target server - Retry Logic: Exponential backoff for handling transient failures - Structured Storage: SQLite database with clean
