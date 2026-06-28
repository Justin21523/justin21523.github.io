---
title: "MetaCleaner Batch Metadata Scrubbing Tool"
tagline: "A desktop tool that batch-cleans Dublin Core metadata via a rule engine"
summary: "MetaCleaner is a cross-platform desktop app built with C#/.NET 10 and Avalonia UI, structured around Clean Architecture. Its core is a configurable rule engine that batch-cleans Dublin Core XML metadata through composable condition and action strategies (Trim, whitespace normalization, date normalization, regex replace), tracking before/after changes at the field level. Rule sets serialize to JSON for import/export, and a visual Rule Builder is provided. The Import and Rule Builder flows work today; Batch Run, Review and Reports pages remain skeletons."
role: "Solo developer: architecture, core rule engine, Avalonia MVVM UI, and unit tests"
problem: "Metadata in libraries and digital archives is often dirty: leading/trailing whitespace, inconsistent date formats, mismatched language-code casing. Fixing records by hand is slow and error-prone, with no repeatable, reviewable cleaning workflow."
solution: "A layered rule engine decomposes cleaning behavior into composable condition and action strategy objects; a format abstraction (MetadataDocument / Adapter) supports multiple metadata formats, with Dublin Core XML implemented first using hardened, DTD-disabled parsing. Rule sets are described and validated as JSON, paired with an Avalonia MVVM UI for import preview, rule application, and change inspection."
outcome: "A working vertical slice of Import and Rule Builder: load a sample Dublin Core XML, apply the built-in rule set, and inspect field-level changes. Rule JSON serialization, validation, and basic editing are covered by xUnit tests spanning the Core, Application, and Infrastructure layers."
highlights:
  - "Clean Architecture with four separated layers (Core/Application/Infrastructure/App); the core depends on neither UI nor external tech"
  - "Strategy-pattern rule engine: condition evaluators and action executors are extensible via DI registration"
  - "Four cleaning actions (Trim, NormalizeWhitespace, NormalizeDate, RegexReplace) applied in order, each receiving the prior action's result"
  - "Hardened XML parsing: DTD and external-entity resolution disabled to shrink the attack surface for imported files"
  - "Rule sets described as JSON with validation of unknown action/condition types, supporting import/export"
  - "MVVM implemented via CommunityToolkit.Mvvm source generators with Avalonia compiled bindings"
challenges:
  - "Designing the MetadataDocument abstraction without binding to a specific file format, to ease future MARCXML and JSON support"
  - "Balancing the rule engine's error-handling modes (continue / stop current rule / abort) for batch stability and traceability"
nextSteps:
  - "Complete the Batch Run, Review, Reports, and Settings pages (currently placeholder skeletons)"
  - "Implement MARCXML and JSON adapters, plus the planned SQLite rule-set storage"
---
## Overview

MetaCleaner is a cross-platform desktop application built with **C# / .NET 10** and **Avalonia UI 12**, aimed at providing a repeatable, reviewable batch metadata-cleaning workflow for digital archives and libraries. It follows **Clean Architecture**, cleanly separated into Core (domain model and rule engine), Application (use cases and services), Infrastructure (external tech such as XML parsing), and App (the Avalonia MVVM UI).

## Core Design

At the heart of the cleaning logic is a **strategy-pattern rule engine**: the engine itself does not know how to trim whitespace or normalize dates. Instead it delegates each behavior to small strategy objects (TrimActionExecutor, NormalizeDateActionExecutor, RegexReplaceActionExecutor, etc.) registered through dependency injection. A rule combines conditions (currently FieldExists) with ordered actions; the engine executes field by field, producing a field-level change log and a processing-issue list, with per-rule error behavior.

## Format Abstraction & Safe Parsing

Through the MetadataDocument and IMetadataDocumentAdapter abstractions, the engine need not know whether the source is XML, JSON, or MARCXML. A **Dublin Core XML** adapter is implemented using System.Xml.Linq, deliberately disabling DTD processing and external resource resolution to reduce the attack surface when importing external files. Rule sets serialize via System.Text.Json and are validated against unregistered action/condition types.

## Status & Completeness

A working vertical slice of **Import** and **Rule Builder** is complete: load a sample dirty Dublin Core XML, apply the built-in rule set, and inspect before/after changes; the UI uses CommunityToolkit.Mvvm source generators with Avalonia compiled bindings. The Batch Run, Review, Reports, and Settings pages, along with MARCXML/JSON formats and SQLite storage, remain placeholder skeletons or planned work. Tests are written in xUnit, covering key paths across the Core, Application, and Infrastructure layers. The project is at a well-architected, core-functional in-progress (MVP) stage.
