---
title: "Discord Clone Real-Time Chat Platform"
tagline: "A full-stack real-time chat system built with FastAPI + WebSocket"
summary: "A Discord clone centered on FastAPI and SQLModel, with a framework-free vanilla JavaScript (ES Modules) frontend. The backend uses a layered architecture (routers / services / schemas), delivers real-time chat and presence over WebSocket, and exposes 20+ API groups covering guilds, channels, DMs, reactions, file uploads, roles/permissions, moderation, audit logs and voice sessions. It applies security practices such as JWT auth, bcrypt hashing, CORS hardening and rate limiting."
role: "Full-stack developer (solo build of frontend, backend, data model and architecture)"
problem: "To fully implement a Discord-like real-time community messaging system, handling bidirectional real-time messages, a complex permission and moderation model, and a maintainable backend architecture, while keeping security and performance in mind."
solution: "The backend uses FastAPI + SQLModel/SQLAlchemy with a layered architecture that decouples API routers, a business-logic service layer and Pydantic schemas; a custom WebSocket ConnectionManager handles room connections, presence broadcasting and rate limiting; JWT + passlib(bcrypt) handle auth, while frequently queried fields are indexed, a connection pool is configured, and message history uses time-based pagination. The frontend is a framework-free SPA built from componentized vanilla ES Modules."
outcome: "A working prototype exposing 20+ REST and WebSocket API groups (guilds, channels, DMs, reactions, files, presence, roles, moderation, search, notifications, templates, audit logs, voice), with security hardening such as environment-variable secrets, CORS allow-listing, input validation and rate limiting."
highlights:
  - "WebSocket ConnectionManager: per-room connection tracking, presence broadcasting, and a 10-messages-per-10-seconds per-connection rate limit"
  - "Clean backend layering: routers (API) -> services (business logic) -> schemas (Pydantic validation) for maintainability and testability"
  - "Complete Discord domain model: 20+ tables including Guild, Channel, Category, Role, Message, DM, Reaction, Thread, Ban/Mute/Timeout, AuditLog and VoiceSession"
  - "Security practices: JWT (python-jose), bcrypt password hashing, secrets moved to environment variables, CORS origin allow-list, input sanitization"
  - "Performance work: SQLAlchemy QueuePool connection pooling, indexes on hot fields, time-based message pagination"
  - "Framework-free frontend: componentized vanilla ES Modules SPA, with automatic free-port discovery on startup"
challenges:
  - "Managing the connection lifecycle and disconnect cleanup for bidirectional real-time messaging while preventing message floods via rate limiting"
  - "Supporting reactions and file attachments for both channel messages and DMs within one data model while keeping queries performant"
  - "Refactoring early hardcoded secrets and a permissive CORS policy into environment-driven, allow-listed secure configuration"
nextSteps:
  - "Fully wire frontend to backend and add WebSocket client initialization"
  - "Migrate from SQLite to PostgreSQL and adopt Alembic for database migrations"
  - "Add automated tests and CI, and integrate real WebRTC media streaming for voice chat"
---
## Overview

Discord Clone is a full-stack real-time messaging platform that recreates Discord's core experience: multiple servers (guilds), channels and categories, real-time chat, direct messages, emoji reactions, file sharing, presence and voice sessions. The backend is built on **FastAPI + SQLModel/SQLAlchemy 2.0**, while the frontend is a single-page app composed of **vanilla JavaScript ES Modules**, deliberately avoiding any frontend framework.

## Architecture

The backend follows a clean layered design: routers define API endpoints, services encapsulate business logic, and schemas use Pydantic v2 for input validation and serialization, keeping the three decoupled for maintainability and testing. Real-time features are driven by a custom **WebSocket ConnectionManager** that handles room connections, presence broadcasting, and a per-connection rate limit of 10 messages per 10 seconds. The data layer defines 20+ SQLModel tables (Guild, Channel, Role, Message, DirectMessage, Reaction, Thread, Ban/Mute/Timeout, AuditLog, VoiceSession and more) with indexes on frequently queried fields.

## Feature Scope

The app mounts 20+ routers covering auth, guilds, channels, bots, direct messages, reactions, files, presence, threads, roles/permissions, moderation, pin/star, categories, search, notification settings, server templates, audit logs and voice chat, plus an /api/health check and Swagger docs.

## Security & Performance

Authentication uses **JWT (python-jose)** with **passlib/bcrypt** password hashing; secrets are loaded from environment variables, CORS was tightened from permissive to an origin allow-list, and input sanitization and rate limiting were added. Performance work includes a SQLAlchemy QueuePool connection pool, indexing, and time-based message history pagination.

## Status

The backend prototype is runnable with a complete domain model and security hardening; fully wiring the frontend, migrating to PostgreSQL, and WebRTC voice streaming are follow-up work.
