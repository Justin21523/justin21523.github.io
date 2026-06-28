---
title: "GovCase Tracker 政府案件追蹤系統"
tagline: "模擬公部門案件受理與審核流程的企業級全端平台"
summary: "GovCase Tracker 是一套以企業級後端為核心的政府案件追蹤系統，模擬從民眾申辦、櫃台受理、承辦審查、補件、主管核定到結案的完整公文流程。後端採 Java 21 與 Spring Boot 3.5，整合 JWT 認證、六種角色的 RBAC、案件狀態機、SLA 監控、稽核軌跡、通知中心與檔案儲存；前端提供 React 儀表板並以 Vue 3 + TypeScript 打造下一代 UI，全棧以 Docker Compose 與 GitHub Actions CI 交付。"
role: "全端開發者（架構設計、後端、前端、DevOps 一手包辦）"
problem: "公部門案件審辦流程涉及多種角色、嚴格的權限邊界與狀態轉換規則，傳統系統常缺乏清楚的工作流狀態機、稽核軌跡與權限隔離，導致越權存取與流程不透明等風險。"
solution: "以分層領域架構（domain / service / repository / controller / DTO / security）打造後端，將案件流程建模為明確的狀態機，並以 @PreAuthorize 的控制器層角色檢查搭配服務層的擁有權／指派範圍檢查雙重把關，防止水平越權。資料層以 Flyway 管理 PostgreSQL schema、Spring Data JPA 處理工作流 CRUD、MyBatis 處理報表查詢；並整合 Redis 快取未讀通知數、MinIO 物件儲存附件、OpenAPI 分組文件。前端以 React 提供角色化工作區，並建立 Vue 3 + TypeScript + Tailwind 基礎與視覺化儀表板。"
outcome: "完成涵蓋認證、案件工作流、附件、主管核定、公開進度查詢、SLA 監控、報表、稽核、通知、搜尋分頁等 20+ 個開發階段，具備 151 個後端 Java 類別、整合測試（Testcontainers）、前端 Vitest 測試，以及三道品質閘的 GitHub Actions CI 與生產級 Docker Compose 冒煙測試，可一鍵啟動完整全棧 Demo。"
highlights:
  - "以明確狀態機建模 DRAFT→SUBMITTED→…→APPROVED/REJECTED→CLOSED 的完整公文流程，含補件與退回分支"
  - "雙層安全模型：控制器層 @PreAuthorize 角色檢查 + 服務層擁有權／指派範圍檢查，防止水平越權"
  - "六種角色 RBAC（民眾／櫃台／承辦／主管／稽核／管理員）與對應的角色化前端工作區"
  - "混合資料存取：Spring Data JPA 處理工作流 CRUD，MyBatis XML mapper 處理報表查詢"
  - "完整 DevOps：Flyway 遷移、Redis 快取、MinIO 物件儲存、OpenAPI 分組文件、Docker Compose 與 GitHub Actions CI"
  - "雙前端策略：穩定的 React 18 生產儀表板，並以 Vue 3 + TS + Tailwind + D3/Plotly 打造下一代視覺化 UI"
challenges:
  - "在多角色協作下設計可防止水平越權的權限模型，需在控制器與服務層做雙重把關"
  - "協調 PostgreSQL、Redis、MinIO 多服務依賴，並以 Testcontainers 確保整合測試在 CI 中可重現"
nextSteps:
  - "發布 GHCR 映像檔與版本標籤，並建立雲端部署工作流"
  - "強化管理員管理 UI 與更豐富的報表視覺化，並補上端對端瀏覽器測試"
---
## 概述

GovCase Tracker 是一套以企業級後端為核心的**政府案件追蹤系統**，模擬公部門的案件受理與審辦流程。系統涵蓋民眾申辦、櫃台受理、承辦指派與審查、補件往返、主管核定，以及對外的公開進度查詢，是一個展示完整後端架構與工作流設計的作品集專案。

## 架構與技術

後端採 **Java 21 + Spring Boot 3.5**，以分層領域架構切分為 auth、security、caseapplication、attachment、notification、audit、sla、report、publicquery 等模組。案件流程被建模為明確的**狀態機**，搭配歷程紀錄、稽核軌跡與權限檢查。資料層由 **Flyway** 管理 PostgreSQL schema，工作流 CRUD 走 **Spring Data JPA**、報表查詢走 **MyBatis** XML mapper，並以 **Redis** 快取未讀通知數、**MinIO** 相容物件儲存處理附件。

## 安全模型

採 **JWT Bearer** 認證與六種角色的 **RBAC**。安全採雙層設計：控制器層以 `@PreAuthorize` 做角色檢查，服務層再以擁有權與指派範圍檢查防止水平越權——民眾僅能存取自己的案件、承辦僅能處理被指派的案件、稽核僅能唯讀查詢稽核軌跡。

## 前端與交付

前端提供 **React 18** 角色化儀表板（TanStack Query、React Router），並另建 **Vue 3 + TypeScript + Tailwind** 基礎與 D3/Plotly 視覺化儀表板作為下一代 UI。整個全棧以 **Nginx + Docker Compose** 交付，並由 **GitHub Actions CI** 執行後端測試（Testcontainers）、前端 lint/測試/建置與相依稽核，以及生產 Compose 冒煙測試共三道品質閘。
