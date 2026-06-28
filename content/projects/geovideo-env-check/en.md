---
title: "GeoVideo Evidence Viewer"
tagline: "C++/Qt6 desktop tool for video event retrieval and spatial visualization"
summary: "A desktop application built in C++20 and Qt6 for reviewing surveillance footage, indexing motion-related events, configuring spatial regions of interest (ROIs), and visualizing incidents on a field map. It follows a clean layered architecture (domain / application / infrastructure / UI) and already ships transactional SQLite schema migration, repositories, dependency-injected services, and OpenCV video metadata extraction; playback, ROI editing, and motion detection pipelines are still in progress."
role: "Solo developer (architecture and full desktop implementation)"
problem: "Smart-city, campus-safety, and facility-monitoring teams need a tool to review large volumes of surveillance video locally, annotate regions of interest, search and triage events, and produce case reports, but most options are cloud-locked, hard to customize, or lack spatial visualization."
solution: "A Qt6 Widgets dock-based workspace with a central video viewer surrounded by project explorer, event detail, event timeline, search, and a 2D/3D OpenGL spatial view. The backend uses an embedded SQLite database for projects, cameras, video sources, ROIs, and events, with a transactional SchemaMigrator for versioned migrations and an AppContext composition root that injects repositories and services; OpenCV handles video metadata extraction."
outcome: "Delivered a runnable desktop skeleton plus a working data layer: the Qt6 UI shell, a versioned SQLite schema (projects/cameras/video_sources/rois/events with indexes and foreign keys), SQLite repositories, ProjectService/VideoImportService/EventReviewService, OpenCV-based video parsing, and persisted window/dock layout."
highlights:
  - "Clean layered architecture separating domain, application, infrastructure, and UI, decoupling domain models from the Qt UI"
  - "Versioned SQLite schema migration run inside an IMMEDIATE transaction for atomic table creation, with full foreign keys and query indexes"
  - "Centralized dependency injection via AppContext wiring database, repositories, and application services"
  - "OpenCV VideoCapture extracts resolution/FPS/frame count with defensive handling of NaN and non-positive values"
  - "Qt6 dock workspace with nested/tabbed docking and layout persistence restored via QSettings"
  - "CMake + Ninja with AUTOMOC and CONFIGURE_DEPENDS source globbing, targeting Linux, Windows, and macOS"
challenges:
  - "Applying domain-driven layering in a C++/Qt desktop context without coupling UI to data access"
  - "Designing an evolvable SQLite schema with transactional migrations that balance foreign-key integrity and query performance"
  - "Robustly reading multi-format video metadata via OpenCV while guarding against invalid property values"
nextSteps:
  - "Wire up real video playback, frame stepping, and timeline navigation"
  - "Implement the ROI editor and an OpenCV motion-detection pipeline that persists events to the database"
  - "Add snapshot/clip export, case report generation, and 2D/3D spatial visualization"
---
## Overview

GeoVideo Evidence Viewer is a **C++20 / Qt6** desktop application positioned as a portfolio-grade video evidence tool for smart-city, campus-safety, facility-monitoring, traffic-technology, and security-review workflows. It lets users review surveillance footage locally, index motion-related events, configure spatial regions of interest (ROIs), and visualize incidents on a 2D/3D field map.

## Architecture

The project uses a clean layered architecture split into four layers: `core/domain` (domain models such as Project, Camera, VideoSource, Roi, and Event, plus value objects EntityId/TimeRange/Severity), `application/services` (application services and a ServiceResult type), `infrastructure` (SQLite connection, SchemaMigrator, and sqlite repositories), and `app` (the Qt6 main window and dock-panel widgets). An `AppContext` acts as the composition root, initializing the database and injecting repositories and services.

## Data and Video Layer

Data is stored in embedded **SQLite**, where `SchemaMigrator` runs versioned migrations inside an IMMEDIATE transaction, creating projects, cameras, video_sources, rois, and events tables with cascading foreign keys and multiple query indexes (time range, type, review status, and more). The video layer uses **OpenCV** VideoCapture to extract resolution, FPS, and frame count, defensively converting NaN and non-positive values.

## UI and Engineering

The interface is a Qt6 Widgets dock-based workspace with a central video viewer surrounded by project explorer, event detail, event timeline, event search, and an OpenGL spatial view, supporting nested/tabbed docking and layout memory. The build uses **CMake + Ninja** with AUTOMOC/AUTORCC/AUTOUIC, compile-commands export, and cross-platform targets for Linux, Windows, and macOS.

## Status

The data layer and application skeleton are runnable: creating projects, importing videos (extracting metadata and persisting to SQLite), and saving/restoring layout all work today. Real video playback, the ROI editor, the motion-detection pipeline, evidence export, and report generation are the next milestones.
