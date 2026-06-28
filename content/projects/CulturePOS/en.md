---
title: "CulturePOS Cultural-Retail POS Desktop System"
tagline: "A cross-platform cultural-retail point-of-sale app built with .NET 10 and Avalonia"
summary: "CulturePOS is a cross-platform desktop POS system built with C# .NET 10 and Avalonia UI, targeting bookstores, museum shops, and cultural retail. It uses a clean App/Core/Infrastructure/Tests layered architecture with MVVM, and has delivered three core modules so far: product management, inventory management, and POS checkout, all persisted via EF Core + SQLite."
role: "Full-stack & architecture owner (personal portfolio project)"
problem: "Small and mid-sized cultural retailers (bookstores, museum shops, campus co-ops) need an offline-capable, cross-platform POS that fully handles products, inventory, and checkout, but most off-the-shelf options are Windows-locked or cloud-bound and hard to self-host or customize on Linux."
solution: "Build a cross-platform desktop app on .NET 10 and Avalonia UI with a clean layered architecture: Core holds pure business models and interfaces, Infrastructure holds EF Core/SQLite data access and services, and App wires up views via MVVM and dependency injection. Connections are managed through a DbContextFactory, every stock change is recorded as an InventoryTransaction, and checkout automatically deducts stock while writing Sale/SaleItem records."
outcome: "Delivered a role-based, navigable desktop shell plus product CRUD, inventory adjustment with safety-stock and low-stock alerts, and a POS checkout flow with barcode search and payment methods. Four core services are covered by xUnit unit tests, and the schema is managed through EF Core migrations."
highlights:
  - "Clean layered architecture (App / Core / Infrastructure / Tests): UI holds no business logic and ViewModels never touch the database directly"
  - "Products, inventory, transactions, and sales persisted with EF Core + SQLite, with schema evolution managed via migrations"
  - "POS checkout supports barcode/SKU search, cart quantity edits, payment methods, and automatic stock deduction"
  - "Inventory module provides safety-stock and low-stock alerts plus a full InventoryTransaction audit trail"
  - "CommunityToolkit.Mvvm and a DI container cut boilerplate; desktop connections managed via DbContextFactory"
  - "Four core services (Product/Inventory/Pos/Auth) covered by xUnit unit tests"
challenges:
  - "Correctly managing the EF Core DbContext lifecycle in a desktop app, switching to DbContextFactory to avoid holding a single long-lived connection"
  - "Writing the sale record while deducting stock and recording the movement within one consistent operation at checkout"
nextSteps:
  - "Implement membership & points and the discount/promotion engine (Roadmap Phase 5-6)"
  - "Add sales reports, PDF receipts, and Excel import/export (Phase 9-11)"
---
## Overview

CulturePOS Desktop is a cross-platform point-of-sale (POS) application built with **C# .NET 10** and **Avalonia UI**, targeting bookstores, museum shops, library gift shops, and campus co-ops in the cultural-retail space. It is scoped as a portfolio-grade business system rather than stopping at an MVP.

## Architecture

The system follows a clean layered architecture across four projects: `Core` holds pure business models, enums, and service interfaces with no UI or database dependencies; `Infrastructure` implements data access and business services on EF Core + SQLite; `App` composes the UI with MVVM (CommunityToolkit.Mvvm) and the Microsoft DI container; and `Tests` validates service logic with xUnit. Architecture rules explicitly forbid business logic in the UI and direct database access from ViewModels.

## Core Features

Three modules are implemented: **Product management** (categories, unique SKU/barcode, activation toggles, and multi-criteria search), **Inventory management** (stock adjustment, safety stock, low-stock alerts, and a complete InventoryTransaction audit trail), and **POS checkout** (barcode/SKU product search, cart management, payment methods, and automatic stock deduction with Sale/SaleItem persistence at checkout). Login uses role-based mock authentication (cashier/manager/admin) and drives role-based sidebar visibility.

## Engineering Notes

The data layer uses a DbContextFactory to manage connections, matching desktop best practice of not holding a single long-lived DbContext; the schema is managed with EF Core migrations.

## Roadmap

Per the roadmap, upcoming work expands into membership & points, a discount/promotion engine, purchase orders, returns handling, sales reports, PDF receipts, and Excel import/export, growing toward a complete, real-world retail desktop business system.
