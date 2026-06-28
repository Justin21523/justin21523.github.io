---
title: "HeritageMap Studio"
tagline: "A native Qt6 + OpenGL desktop workstation for cultural-heritage mapping and timeline visualization"
summary: "A Linux-native desktop application built with C++17, Qt6 Widgets and OpenGL 3.3 for cultural-heritage mapping, metadata exploration and historical timeline visualization. It pairs a self-authored QOpenGLWidget map canvas with a SQLite database, CSV import pipeline, geographic coordinate projection, layer management, timeline playback and faceted search, all organized in a clean layered architecture (model / repository / service / ui)."
role: "Solo developer (architecture, OpenGL rendering, data layer and UI — full stack)"
problem: "Cultural-heritage records typically live scattered across spreadsheets, with no local tool that simultaneously shows spatial distribution, historical era and rich metadata while supporting interactive exploration. General-purpose GIS software is heavyweight and poorly fitted to heritage-specific data models."
solution: "A dockable-panel Qt6 Widgets workstation whose central canvas uses QOpenGLWidget with a hand-written GLSL shader pipeline to draw grids and sites. The backend stores data in SQLite with versioned migrations and exposes it through a repository pattern, while a CSV import service and a geo-coordinate transformer project latitude/longitude into local meter coordinates, then layer, timeline and faceted-search filters drive interactive exploration."
outcome: "Eight development phases delivered, evolving from an application shell into a working workstation with database, import, projection, metadata editing, layers, timeline and advanced search — built on a cleanly layered architecture ready for map tiles and route editing."
highlights:
  - "Hand-written OpenGL 3.3 Core Profile shader pipeline rendering adaptive grids and category-colored heritage points, with mouse pan, wheel zoom and click selection"
  - "Versioned SQLite migrations (schema_migrations table) plus a repository pattern fully decoupling data access from UI and rendering"
  - "GeoCoordinateTransformer projects lat/long into local meter coordinates, with fallback handling and a projection summary for sites lacking coordinates"
  - "Clean layered architecture — model / repository / service / ui / opengl / utils — keeping MainWindow from becoming spaghetti"
  - "Three unified filter states for interactive layers, timeline playback and faceted search, all driving canvas redraws"
  - "CMake deliberately isolates the conda toolchain, forcing the system c++ to resolve Qt/OpenGL and avoid environment conflicts"
challenges:
  - "Inside conda environments, Qt6 and desktop OpenGL linking tends to pull in the conda sysroot, requiring CMake to clear CFLAGS/LDFLAGS and pin the system compiler"
  - "Implementing a 2D camera, coordinate transforms and click hit-testing from scratch on raw OpenGL, including screen-to-world projection and adaptive grid spacing"
nextSteps:
  - "Add a map tile background layer for geographic context"
  - "Implement route / path editing capabilities"
  - "Introduce formal GIS projection and richer metadata source management"
---
## Overview

HeritageMap Studio is a Linux-native desktop application built with **C++17 + Qt6 Widgets + OpenGL 3.3**, positioned as a workstation for cultural heritage. It consolidates scattered heritage records into a single window where users can browse spatial distribution, historical era and detailed metadata while exploring interactively.

## Architecture

The project follows a clearly layered design: `models` (pure data models such as HeritageSite), `repositories` (data access), `database` (DatabaseManager and a versioned MigrationManager), `services` (CsvReader, ImportService), `utils` (GeoCoordinateTransformer), `opengl` (MapCanvas rendering) and `ui` (MainWindow and dock panels). Responsibilities are strictly separated — models never touch UI or the database, and the rendering layer needs no knowledge of MainWindow internals, wired together purely through Qt signals and slots.

## Rendering & Interaction

The central map canvas uses QOpenGLWidget with a hand-written GLSL shader pipeline to render adaptive grids and category-colored sites. It implements a 2D camera, screen-to-world coordinate transforms, mouse pan / wheel zoom and click hit-testing. The GeoCoordinateTransformer projects latitude/longitude into local meter coordinates, with a fallback for records lacking coordinates.

## Data & Filtering

The backend uses SQLite with versioned migrations tracked in a schema_migrations table, accessed via the repository pattern. A CSV import pipeline loads heritage sample data (including a Taipei heritage sample). Three unified filter states — layers, timeline and faceted search — jointly drive real-time canvas redraws.

## Progress & Outlook

The project has progressed through eight development phases, growing from a bare application shell into a full workstation with database, import, projection, metadata editing, layers, timeline playback and advanced search. Planned next steps include map tile backgrounds, route editing and a more complete GIS projection.
