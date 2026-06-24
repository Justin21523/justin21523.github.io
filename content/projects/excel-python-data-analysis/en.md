---
title: "Excel Python Data Analysis Platform"
tagline: "A portfolio-ready Excel-to-Python analytics platform for profiling, cleaning, business analysis, dashboards, and automated Excel reports."
summary: "I rebuilt this project from a week-based learning repository into a modular Python analytics platform. It now demonstrates Excel/CSV ingestion, pandas cleaning pipelines, retail analytics, Streamlit dashboards, openpyxl workbook automation, CLI workflows, and Playwright-recorded demo evidence."
role: "Independent Python Data Analyst / Pandas Engineer / Excel Automation Developer"
problem: "The original repository showed many useful learning notes and notebooks, but it did not communicate a product-style workflow. A portfolio reviewer needed to see whether I could turn Excel business data into a maintainable Python analysis system with real outputs."
solution: "I refactored the project into a source-based application with reusable IO, profiling, cleaning, analytics, reporting, and dashboard modules. The demo uses synthetic retail workbooks to walk through data quality checks, cleaning, sales/customer/product analysis, Excel report export, and an openpyxl feature showcase."
outcome: "The project is now demoable as a complete Excel Python Data Analysis Platform with a Streamlit UI, CLI demo command, generated sample workbooks, formatted Excel reports, screenshots, video, GIF, unit tests, and Playwright E2E evidence."
highlights:
  - "Built reusable pandas modules for data profiling, quality checks, cleaning, RFM, cohort, ABC inventory classification, market basket analysis, and KPI summaries."
  - "Implemented openpyxl automation for formulas, named styles, comments, hyperlinks, validation, protection, conditional formatting, charts, workbook metadata, and formatted reports."
  - "Created a Streamlit multipage dashboard with guided demo flow, upload/profile, cleaning workbench, business analytics, openpyxl showcase, and report export pages."
  - "Added pytest coverage plus Playwright E2E recording, screenshots, trace output, and a reproducible CLI demo command."
challenges:
  - "Converting scattered notebooks and weekly practice folders into a maintainable package without hiding the actual learning progression."
  - "Keeping dashboard pages thin while moving analysis logic into testable Python modules."
  - "Creating believable retail sample workbooks that support RFM, cohort, inventory, and market basket workflows without relying on private data."
nextSteps:
  - "Add a hosted Streamlit deployment or containerized demo environment."
  - "Expand report templates with PDF/HTML export and more workbook-level business scenarios."
  - "Add larger performance tests for high-volume Excel and CSV inputs."
---
This project demonstrates how I can move beyond isolated pandas examples and build a full data analysis product around Excel business data. The platform starts with multi-sheet Excel or CSV input, profiles the data, flags quality issues, applies reusable cleaning rules, runs retail analytics, and exports formatted Excel reports.

The core value is the system design: Streamlit is only the user interface. The analysis work lives in reusable Python modules under `src/excel_analysis`, so the same logic can be tested, called from the CLI, or used by the dashboard. The demo evidence includes generated sample workbooks, an automated Excel report, an openpyxl showcase workbook, screenshots, a short MP4 walkthrough, and a GIF summary.

The business analytics layer focuses on realistic retail questions: revenue trends, order volume, average order value, category and region performance, customer segmentation, cohort retention, CLV-style summaries, ABC inventory classification, slow-moving inventory, reorder suggestions, and market basket rules.

The Excel automation layer is intentionally visible. The openpyxl showcase produces a workbook that demonstrates formulas, named styles, comments, hyperlinks, data validation, sheet protection, conditional formatting, charts, freeze panes, filters, workbook metadata, and report styling. This makes the project useful as both a data analysis portfolio piece and an Excel automation case study.

I also added reliability evidence. The repo includes unit tests for IO, cleaning, analytics, samples, CLI behavior, UI design constraints, and workbook formatting. Playwright drives the demo flow, captures screenshots, records a video, and produces trace artifacts, so the dashboard can be checked as an interactive product instead of a static screenshot.
