---
title: "ChronosMap Spatio-Temporal Weaver"
tagline: "A digital-archive navigator that replays history across map and timeline"
summary: "ChronosMap is a cross-platform desktop app built with .NET 10 and Avalonia that projects historical events and archival records onto three linked dimensions: a map, a timeline, and a knowledge-relation topology graph. Dragging the timeline filters events by era, selecting a map pin expands its semantic links to people, places and organizations, and the app supports full create/edit/search plus JSON import and export."
role: "Solo developer (architecture, domain modeling, UI and data layer — full stack)"
problem: "Conventional digital archives present records as static lists, making it hard to grasp an artifact's time, space and relationships at once, and offering no interactive way to explore historical context."
solution: "A clean, layered architecture (Domain / Application / Infrastructure) is wired to an Avalonia UI through MVVM (ReactiveUI). Mapsui overlays OpenStreetMap tiles with event pins, a timeline slider drives a TemporalQueryService for era-based filtering, and a hand-built trigonometric force-directed canvas renders knowledge relations."
outcome: "A working prototype: map pins, timeline cruise playback, the relation topology graph, CRUD forms and JSON persistence are all functional, backed by a domain model and xUnit round-trip tests."
highlights:
  - "Three synchronized dimensions: map, timeline and knowledge topology"
  - "Mapsui + OpenStreetMap real-time geo pins with click selection"
  - "Clean Architecture split across Domain, Application and Infrastructure projects"
  - "TemporalQueryService filters events by time range and filter mode"
  - "Custom trigonometric force-directed graph for person/place/organization links"
  - "Native JSON import/export with smart migration of legacy saves on startup"
challenges:
  - "Integrating Mapsui into Avalonia 12 and fixing pin styling plus two-way click binding"
  - "Refactoring duplicate domain-type compilation and partial-method signature conflicts"
nextSteps:
  - "Flesh out the README and user documentation"
  - "Fully migrate the legacy ArchiveEvent to the new domain model and expand test coverage"
---
## Overview
ChronosMap (the Spatio-Temporal Weaver) is a digital-archive navigator that presents historical events and records across three dimensions at once: a **map**, a **timeline**, and a **knowledge-relation topology graph**. Dragging the timeline surfaces era-matching events on the map, and selecting a node expands that event's semantic ties to people, places and organizations in the topology view.

## Architecture
The app uses **.NET 10 + Avalonia UI 12** for a cross-platform desktop front end, following the MVVM pattern via **ReactiveUI / CommunityToolkit.Mvvm**. Back-end logic adheres to **Clean Architecture**, split into `Domain` (KnowledgeEntity, HistoricalEvent, KnowledgeRelation, HistoricalTimeRange and related models), `Application` (use cases such as TemporalQueryService and ProjectDocumentService) and `Infrastructure` (LocalProjectFileStore, JSON serialization). The map layer uses **Mapsui** over OpenStreetMap tiles to render event pins.

## Key Features
- Timeline slider with auto-play 'time cruise' that filters events by era in real time
- Clickable map pins kept in two-way sync with the detail panel and list
- A hand-built 2D force-directed topology graph that colors nodes by relation type
- Full CRUD forms, keyword/tag search, and native JSON import/export

## Maturity
The project is a **working, in-progress prototype**: the core interactions (map, timeline, topology graph, CRUD, persistence) are implemented with a staged development history and xUnit round-trip tests, while the README and parts of the legacy-model migration remain to be completed.
