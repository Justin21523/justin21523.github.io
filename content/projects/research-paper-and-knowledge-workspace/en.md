---
title: "Research Paper & Knowledge Workspace"
tagline: "A local desktop workspace for papers, notes, metadata, and literature relationships."
summary: "A cross-platform research literature management app built with C#, .NET 9, Avalonia, Entity Framework Core, and SQLite. The project turns bibliographic metadata, reading status, Markdown annotations, attachments, and paper-to-paper relationships into a local knowledge workspace for researchers."
role: "Independent Developer / Desktop Application Developer / Information Architecture Designer"
problem: "Research work often spreads across PDFs, folders, notes, and citation tools. Paper metadata, reading progress, annotations, and literature relationships are hard to maintain inside one coherent workflow."
solution: "I used Clean Architecture and MVVM to separate the domain, application, infrastructure, and Avalonia UI layers. EF Core and SQLite power the local data model for papers, authors, tags, notes, attachments, projects, and semantic paper relationships."
outcome: "The result is a demonstrable research desktop workspace that shows how my library and information science background translates into metadata modeling, workflow design, and desktop application architecture."
highlights:
  - "Separates Core, Application, Infrastructure, and App layers with Clean Architecture."
  - "Uses EF Core and SQLite to manage papers, authors, tags, notes, attachments, and research projects."
  - "Tracks reading status, ratings, priority, favorites, and archived references for long-term maintenance."
  - "Models directional paper relationships such as references, builds-on, contradicts, and related."
challenges:
  - "The domain is more than CRUD; the model must connect bibliographic metadata, notes, attachments, and literature relationships."
  - "Avalonia MVVM requires clear boundaries between UI state, async loading, and local database operations."
  - "Paper relationships are self-referential records, so the data model cannot be tightly coupled to one UI layout."
nextSteps:
  - "Add richer filters for DOI, journal, author, project, and reading status."
  - "Turn paper relationships into an interactive visualization for literature review navigation."
  - "Add BibTeX and RIS import/export workflows."
---
This project represents the type of portfolio work I want to be known for: not just polished screens, but software that organizes complex information into a maintainable, searchable, and expandable system.

I treated each research paper as a metadata-driven knowledge object. A paper record can contain title, authors, DOI, venue, publisher, page ranges, reading state, tags, notes, attachments, and project membership. The UI needs to make those records scannable, while the database keeps the relationships explicit and reliable.

The implementation follows Clean Architecture. The Core layer owns entities, enums, value objects, and interfaces. The Application layer handles use cases, DTOs, and services. The Infrastructure layer provides EF Core repositories, SQLite persistence, and local storage. The Avalonia App layer contains the XAML views and MVVM view models.

This case study connects my background in library and information science with practical C#/.NET desktop engineering. It shows how I approach metadata, classification, retrieval, and knowledge organization as product architecture rather than decorative content.
