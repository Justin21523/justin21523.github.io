---
title: "CafeNet Manager"
tagline: "A C++ / Qt desktop operations system for cafes and internet cafes."
summary: "CafeNet Manager is a desktop operations system built with C++17, Qt 6, SQLite, and CMake. It combines seat maps, timed sessions, ordering carts, kitchen display, checkout, customer records, and revenue dashboards into one local management interface."
role: "Independent Developer / C++ Desktop Application Developer / Workflow System Designer"
problem: "Small cafes and internet cafes often manage seats, timed sessions, orders, kitchen status, checkout, and customer records across disconnected tools or manual workflows, which makes operational state hard to keep consistent."
solution: "I built a multi-tab Qt Widgets desktop interface backed by a SQLite repository layer and service layer. Seat state, timed billing, orders, carts, kitchen boards, and checkout workflows are handled inside one local system."
outcome: "The project is a complete C++/Qt desktop case study that demonstrates complex state UI, business workflow modeling, local persistence, and repository-based architecture."
highlights:
  - "Implements an interactive seat map concept with seat status, capacity, amenities, and management workflows."
  - "Supports both cafe minimum-charge sessions and internet cafe timed sessions with live status updates."
  - "Connects cart, order status, kitchen display, checkout, and receipt data flow."
  - "Uses a SQLite repository pattern to separate UI behavior from data access and business services."
challenges:
  - "Seat, session, order, and payment state are linked, so UI updates must reflect the current operational model."
  - "Qt Widgets requires clear component boundaries so MainWindow does not absorb every business rule."
  - "The workflow is more complex than a typical portfolio card, so repositories, services, and widgets need separate responsibilities."
nextSteps:
  - "Add fuller staff roles, shift management, and inventory workflows."
  - "Add more report export formats and revenue visualization."
  - "Improve tests and database migration handling."
---
CafeNet Manager is my representative C++/Qt desktop project for operations workflow modeling. It is not a single-feature exercise. It connects seats, timed sessions, orders, kitchen workflow, checkout, and customer management into one desktop system.

The project forced me to model real operational state. A seat has status, capacity, amenities, and an active session. An order has cart items, preparation state, payment method, and checkout totals. Customer records can connect to history and notes. This is a different type of complexity from a visual portfolio site, and it required a more disciplined approach to state and data flow.

The implementation uses C++17, Qt 6 Widgets, SQLite, and CMake. The architecture separates Presentation, Business Logic, Data Access, and Database layers. Repositories such as SeatRepository, OrderRepository, and MenuRepository isolate persistence from UI code, while widgets such as MainWindow, SeatMapView, CartWidget, KitchenBoardWidget, DashboardWidget, and CheckoutDialog handle the interface.

In the portfolio, this project shows that my work is not limited to Web UI or metadata systems. I can also build database-backed desktop software, structure operational workflows, and reason about state-heavy business interfaces.
