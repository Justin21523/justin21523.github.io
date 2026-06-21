---
title: "ModelOps Dashboard"
tagline: "A personal AI model registry, inference task manager, evaluation tracker, and mo..."
summary: "A personal AI model registry, inference task manager, evaluation tracker, and monitoring dashboard backend, built as a production-grade Spring Boot reference pr..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Java, Maven, Spring Boot 的解決方案。"
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
A personal AI model registry, inference task manager, evaluation tracker, and monitoring dashboard backend, built as a production-grade Spring Boot reference project.

It manages metadata about local AI models (formats, quantization, hardware requirements, runtime backends) and simulates inference task execution. Phase 1 does not load real models — execution is handled by a pluggable mock runtime adapter, with interfaces prepared for real backends (llama.cpp, Ollama, ONNX Runtime, DJL) in later phases.

Java 21 · Spring Boot 3.4 · Maven · Spring Web / Security / Data JPA / Validation / WebSocket / Actuator · PostgreSQL + Flyway · Redis · JWT (JJWT) · MapStruct · Lombok · springdoc OpenAPI · JUnit 5 · Mockito · Testcontainers · Docker Compose.
