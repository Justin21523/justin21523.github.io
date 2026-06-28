---
title: "MetaShelf — Bibliographic Resource Discovery Platform"
tagline: "An LIS-grounded book & metadata management MVP with an e-commerce-style browsing experience"
summary: "MetaShelf is a resource discovery platform that blends Library and Information Science (LIS) principles with a modern e-commerce browsing experience. The backend is built on FastAPI with async SQLAlchemy following Clean Architecture (Models/Schemas/Repositories/Services/API); the frontend is a React 19 + Vite + Tailwind card-based catalog. The data model uses FRBR-lite, separating Resource (bibliographic record) from Item (physical holding), with professional metadata like ISBN, call number, and subject headings. Currently an MVP."
role: "Full-stack developer (architecture, backend API, frontend UI)"
problem: "Traditional library catalog systems have dated interfaces and poor search UX, while consumer reading-list tools lack the rigorous metadata of library science (FRBR levels, call numbers, subject headings, authority control). The core challenge is reconciling LIS rigor with a smooth, e-commerce-grade discovery experience."
solution: "The backend pairs FastAPI with async SQLAlchemy 2.0, splitting into five Clean Architecture layers (Domain/DTO/Repository/Service/API) for testability and maintainability. The data layer uses FRBR-lite, separating the bibliographic Resource from the physical Item while preserving professional fields like ISBN, call number, and subject headings. The frontend is a responsive card-based catalog built with React 19 + Vite + Tailwind v4, consuming the REST API via TanStack Query with dark mode and lazy-loaded covers."
outcome: "Delivered a working MVP: resource list and create APIs, Pydantic validation, automatic SQLite table creation with a seed script, and a catalog frontend featuring a search-bar placeholder and a 'New Arrivals' section. It ships with a clean layered architecture and a clear roadmap toward PostgreSQL, many-to-many subject relations, and JWT auth."
highlights:
  - "Five-layer Clean Architecture (Models/Schemas/Repositories/Services/API) with clear separation of concerns and easy extensibility"
  - "FRBR-lite data model separating bibliographic Resource from physical Item, preserving LIS metadata (ISBN, call number, subject headings)"
  - "Fully async stack: FastAPI + SQLAlchemy 2.0 async + aiosqlite for end-to-end async I/O"
  - "Modern frontend: React 19 + Vite + Tailwind CSS v4 + TanStack Query with a responsive, dark-mode card UI"
  - "Repository pattern encapsulating data access, paired with Pydantic v2 DTOs for request/response validation"
  - "Solid DX: seed script, Vite proxy, and a one-command start_dev.sh launching both backend and frontend"
challenges:
  - "Balancing LIS rigor against MVP velocity — using FRBR-lite and comma-separated subject headings as deliberate simplifications for fast iteration"
  - "Managing async SQLAlchemy 2.0 engine/session lifecycles and startup-time table creation"
  - "Designing for smooth upgrades (SQLite->PostgreSQL, string author->relational Agent authority control)"
nextSteps:
  - "Implement Item inventory management and auth endpoints (OAuth2 Password Flow + JWT)"
  - "Promote subject headings and authors to many-to-many tables with Agent authority control, and adopt Alembic migrations"
  - "Round out the frontend: wire up real search, a resource detail page, My Lists, and pagination"
---
## Overview

MetaShelf is a **resource discovery and exchange platform** grounded in Library and Information Science (LIS) principles, paired with the smooth browsing experience of a modern e-commerce site. Users explore a collection like an online bookstore while the system retains library-grade bibliographic metadata underneath.

## Architecture

The backend strictly follows **Clean Architecture**, split into five layers: Domain (SQLAlchemy models), Schemas (Pydantic DTOs), Repositories (data access), Services (business logic), and API (routers) — ensuring scalability, maintainability, and testability. It runs a fully async stack: FastAPI + SQLAlchemy 2.0 Async + aiosqlite for end-to-end async I/O.

## Data Modeling

The data layer adopts **FRBR-lite**: a Resource (mapping to FRBR Work/Manifestation, carrying ISBN, call number, and subject-heading metadata) is separated from an Item (the FRBR Item — the physical copy on the shelf, with barcode, location, and loan status). This balances LIS strictness with MVP velocity while leaving room to upgrade toward relational author/subject authority control.

## Frontend Experience

The frontend is a card-based catalog built with React 19 + Vite + TypeScript + Tailwind CSS v4. It consumes the REST API via TanStack Query, proxies requests to the backend through Vite, and supports dark mode, lazy-loaded covers, and loading/error states.

## Maturity

The project is at the **MVP stage**: resource list/create APIs, Pydantic validation, automatic SQLite table creation, a seed script, and the catalog frontend are complete. User/Item models and auth/inventory endpoints are planned but not yet implemented — making it a clear showcase of full-stack architecture skills.
