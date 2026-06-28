---
title: "LibraCore"
tagline: "An integrated library services platform demo built around MARC21, RDA, authority control, Discovery, ERM, and repository workflows."
summary: "LibraCore is a Django-based library information system scaffold that models real library information science concepts instead of reducing the domain to a single book table. It includes cataloging, MARC import review, authority control, holdings, circulation, acquisitions, serials, ERM, repository, analytics, audit, and guided staff workflows."
role: "System Architect / Full-stack Developer"
problem: "A credible library system needs bibliographic control, authority data, holdings, item status, electronic resources, discovery, governance, and interoperability. A simple CRUD book app cannot represent how libraries actually organize and manage information."
solution: "I designed and implemented a modular Django platform with Work/Instance separation, MARC21 raw record storage, cataloging review, authority linking, OPAC facets, circulation workflows, acquisitions and serials management, ERM records, repository metadata, audit logs, and a guided UI tour recorded with Playwright."
outcome: "The project now has a tested local MVP, a static GitHub Pages demo, a public GitHub repository, screenshots, and a recorded walkthrough that can be reviewed from the portfolio."
highlights:
  - "Models Work, Expression, Instance, BibliographicRecord, MARC records, authority records, holdings, items, patrons, loans, acquisitions, serials, ERM, and repository objects."
  - "Supports MARC import batches, parsed/mapped review screens, match candidates, and authority suggestions."
  - "Provides OPAC discovery with facets, availability, authority browse, subject browse, electronic access links, and repository integration."
  - "Includes staff workbenches for circulation, patrons, fees, acquisitions, serials, ERM, repository, analytics, audit, and data quality."
challenges:
  - "Keeping MARC21 raw data, normalized internal models, and Discovery indexes aligned without flattening the domain."
  - "Making complex staff workflows demonstrable in a portfolio without requiring a hosted Django backend."
  - "Representing library standards honestly while avoiding licensed vocabulary/toolkit overclaims."
nextSteps:
  - "Add a production backend deployment for the full Django system."
  - "Expand MARC Authority and Holdings import/export coverage."
  - "Add external lookup adapters for id.loc.gov, VIAF, ORCID, and OpenSearch-scale Discovery."
---
LibraCore is a portfolio-grade implementation of a real library information system architecture. The public demo is static because GitHub Pages cannot run Django, but the source repository includes the full local Django application, tests, seeded demo data, and Playwright capture script.

The strongest part of the project is the domain model: Work/Expression/Instance/Item separation, MARC21 raw record preservation, authority control, holdings and circulation, acquisitions, serials, electronic resources, and repository metadata are modeled as separate concepts with their own workflows.

The demo recording focuses on the guided assistant overlay added to the UI. It walks through OPAC discovery, MARC import review, authority control, circulation desk workflows, acquisitions, ERM, repository management, analytics, audit, and data quality checks.

