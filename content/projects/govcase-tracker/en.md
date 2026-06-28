---
title: "GovCase Tracker — Government Case Tracking System"
tagline: "Enterprise-grade full-stack platform simulating public-sector case intake and review workflows"
summary: "GovCase Tracker is a backend-centric government case-tracking system that simulates the full public-sector case lifecycle: citizen submission, clerk intake, officer review, supplement requests, supervisor approval, and case closure. The Java 21 / Spring Boot 3.5 backend integrates JWT auth, six-role RBAC, a case state machine, SLA monitoring, audit trails, a notification center, and object storage. It ships with a React dashboard, a next-gen Vue 3 + TypeScript UI, and is delivered via Docker Compose with GitHub Actions CI."
role: "Full-stack developer (architecture, backend, frontend, and DevOps)"
problem: "Public-sector case processing involves many roles, strict permission boundaries, and complex state transitions. Legacy systems often lack a clear workflow state machine, audit trail, and permission isolation, leading to privilege-escalation risks and opaque processes."
solution: "The backend is built with a layered domain architecture (domain / service / repository / controller / DTO / security), modeling the case process as an explicit state machine. Security uses two layers: controller-level role checks via @PreAuthorize plus service-level ownership and assignment-scope checks to prevent horizontal privilege escalation. The data layer uses Flyway to manage the PostgreSQL schema, Spring Data JPA for workflow CRUD, and MyBatis for reporting queries, with Redis caching unread notification counts, MinIO storing attachments, and grouped OpenAPI docs. The frontend provides role-based React workspaces, plus a Vue 3 + TypeScript + Tailwind foundation with visualization dashboards."
outcome: "Delivered across 20+ development phases covering auth, case workflow, attachments, supervisor approval, public progress lookup, SLA monitoring, reports, audit logs, notifications, and search/pagination — with 151 backend Java classes, Testcontainers integration tests, frontend Vitest tests, a three-gate GitHub Actions CI pipeline, and a production-like Docker Compose smoke test for a one-command full-stack demo."
highlights:
  - "Explicit state machine modeling the full case process DRAFT→SUBMITTED→…→APPROVED/REJECTED→CLOSED, including supplement and return branches"
  - "Two-layer security model: controller-level @PreAuthorize role checks plus service-level ownership/assignment-scope checks to prevent horizontal privilege escalation"
  - "Six-role RBAC (citizen, clerk, officer, supervisor, auditor, admin) with matching role-based frontend workspaces"
  - "Hybrid data access: Spring Data JPA for workflow CRUD and MyBatis XML mappers for reporting queries"
  - "Full DevOps: Flyway migrations, Redis cache, MinIO object storage, grouped OpenAPI docs, Docker Compose, and GitHub Actions CI"
  - "Dual-frontend strategy: a stable React 18 production dashboard plus a next-gen Vue 3 + TS + Tailwind + D3/Plotly visualization UI"
challenges:
  - "Designing a permission model that prevents horizontal privilege escalation across multiple collaborating roles, requiring double enforcement at both controller and service layers"
  - "Orchestrating multi-service dependencies (PostgreSQL, Redis, MinIO) and using Testcontainers to make integration tests reproducible in CI"
nextSteps:
  - "Publish GHCR images with release tags and build a cloud deployment workflow"
  - "Enhance the admin management UI, add richer report visualizations, and add end-to-end browser tests"
---
## Overview

GovCase Tracker is a backend-centric **government case-tracking system** that simulates public-sector case intake and review. It spans citizen submission, clerk intake, officer assignment and review, supplement round-trips, supervisor decisions, and a public-facing progress lookup — a portfolio project showcasing end-to-end backend architecture and workflow design.

## Architecture & Stack

The backend uses **Java 21 + Spring Boot 3.5**, organized into layered modules: auth, security, caseapplication, attachment, notification, audit, sla, report, and publicquery. The case process is modeled as an explicit **state machine** with history, audit trail, and permission checks. **Flyway** manages the PostgreSQL schema; workflow CRUD runs on **Spring Data JPA** while reporting queries use **MyBatis** XML mappers, with **Redis** caching unread notification counts and **MinIO**-compatible object storage handling attachments.

## Security Model

Authentication uses **JWT Bearer** tokens with six-role **RBAC**. Security is enforced in two layers: controllers apply `@PreAuthorize` role checks, while services add ownership and assignment-scope checks to block horizontal privilege escalation — citizens access only their own cases, officers only assigned cases, and auditors have read-only access to audit logs.

## Frontend & Delivery

The frontend ships a **React 18** role-based dashboard (TanStack Query, React Router) alongside a **Vue 3 + TypeScript + Tailwind** foundation with D3/Plotly visualization dashboards as the next-gen UI. The full stack is delivered via **Nginx + Docker Compose** and validated by a **GitHub Actions CI** pipeline running backend tests (Testcontainers), frontend lint/test/build with dependency audits, and a production Compose smoke test across three quality gates.
