---
title: "ModelOps Dashboard"
tagline: "A personal AI model registry, inference task manager, evaluation tracker, and mo..."
summary: "A personal AI model registry, inference task manager, evaluation tracker, and monitoring dashboard backend, built as a production-grade Spring Boot reference pr..."
role: "Independent Developer"
problem: "Describe the core problem solved by this project."
solution: "Build the solution framework using Java, Maven, Spring Boot."
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "Technical challenge one..."
nextSteps:
  - "Next step one..."
---
A personal AI model registry, inference task manager, evaluation tracker, and monitoring dashboard backend, built as a production-grade Spring Boot reference project.

It manages metadata about local AI models (formats, quantization, hardware requirements, runtime backends) and simulates inference task execution. Phase 1 does not load real models — execution is handled by a pluggable mock runtime adapter, with interfaces prepared for real backends (llama.cpp, Ollama, ONNX Runtime, DJL) in later phases.

Java 21 · Spring Boot 3.4 · Maven · Spring Web / Security / Data JPA / Validation / WebSocket / Actuator · PostgreSQL + Flyway · Redis · JWT (JJWT) · MapStruct · Lombok · springdoc OpenAPI · JUnit 5 · Mockito · Testcontainers · Docker Compose.
