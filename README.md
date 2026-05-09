# Justin Portfolio（求職作品集網站）

這是一個 React（Vite）作品集網站，會匯入本機兩個專案根目錄的資料並生成 `data/projects.json`，用於展示作品與技術棧。

## 開發

前置需求：Node.js 20+、npm

```bash
npm install
npm run sync-projects
npm run dev
```

開啟：`http://localhost:4321`

## 專案清單同步

預設掃描：
- `/home/justin/web-projects`
- `/mnt/c/ai_projects`

```bash
npm run sync-projects
```

同步策略：
- 會新增「新發現」的專案條目
- 會更新 `stack/sourcePath/repoUrl`
- 會保留你手動改的 `title/summary/tags/featured/demoUrl/image`

## Docker Compose（對齊 school-library-lms：直接開 port）

```bash
cp .env.example .env
docker compose up -d --build
```

預設對外：`http://localhost:3000`

## 專案 Demo 路由（未來）

當你把某個專案 Docker 化並加入「同一個 compose network」，且 service name 使用專案的 `slug`（例如 `threejs-product-viewer`），
作品集站點會自動提供這個路徑作為 Demo gateway：

- `https://neojustin.dothost.net/p/<slug>/`

部署到遠端（SSH + Docker Compose）：請見 `docs/deployment/live-dothost-ssh-docker-compose.md`

更新已上線專案（程式碼變更後 rebuild）：請見 `docs/deployment/update-workflow.md`
