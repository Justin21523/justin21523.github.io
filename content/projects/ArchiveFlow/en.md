---
title: "ArchiveFlow Studio"
tagline: "A node-based desktop workflow system for personal digital archives, metadata, file processing, and Dublin Core export."
summary: "ArchiveFlow Studio is a cross-platform desktop app built with C#, .NET 9, and Avalonia. Its core is a node-based metadata workflow canvas backed by SQLite, Dapper, FluentMigrator, ImageSharp, FTS5 full-text search, background jobs, and a plugin-oriented architecture."
role: "Independent Developer / Metadata System Designer / Desktop Application Developer"
problem: "Personal and small-organization digital files often live in scattered folders without consistent metadata, relationship context, batch processing workflows, or exchangeable archive formats."
solution: "I designed a node-based workflow system where users can connect file sources, filters, metadata actions, relationship builders, and output nodes into repeatable processing pipelines. SQLite and FTS5 provide local persistence and search."
outcome: "The project demonstrates how my digital archive background becomes a real interactive desktop tool, especially around metadata modeling, Dublin Core, full-text search, workflow design, and custom Avalonia UI."
highlights:
  - "Builds a custom node workflow canvas with drag, zoom, selection, and Bezier connections."
  - "Uses an EAV metadata model for flexible fields and supports Dublin Core XML export."
  - "Combines SQLite, Dapper, and FTS5 for local persistence and file discovery."
  - "Runs heavy file indexing and thumbnail generation through background jobs with ImageSharp."
challenges:
  - "The canvas has to coordinate interaction state, data flow, parameters, and visual connections."
  - "Archive metadata is flexible by nature, so the schema must stay adaptable while remaining searchable."
  - "Large file indexing and thumbnail generation must not block the desktop UI."
nextSteps:
  - "Document the plugin API so new processing nodes can be added independently."
  - "Support more metadata standards such as MODS or configurable field mappings."
  - "Add workflow history, undo/redo, and reusable import templates."
---
ArchiveFlow Studio is one of the strongest examples of where my library and information science background meets software engineering. It is not just a file manager. It turns a digital archive workflow into a visual, modular, repeatable desktop system.

The central idea is metadata plus workflow. Users can place source nodes, filter nodes, metadata action nodes, relationship nodes, and output nodes on a canvas, turning scattered file organization tasks into an adjustable pipeline. This connects digital archives, classification, retrieval, knowledge organization, and interaction design in one product.

Technically, ArchiveFlow uses Clean Architecture, MVVM, and the Repository Pattern. Avalonia powers the desktop interface and custom canvas. SQLite and Dapper handle local data access. FluentMigrator manages schema changes. ImageSharp generates thumbnails. SQLite FTS5 powers full-text discovery. Each technology maps to an actual product need: large file sets, flexible metadata, fast search, and non-blocking processing.

This is a primary portfolio case study because it shows that I can connect information architecture and metadata standards with real engineering implementation, not just describe them at a conceptual level.
