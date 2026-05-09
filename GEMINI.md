# justin-portfolio

This is a React (Vite) based portfolio website designed to showcase personal projects. It features an automated system to scan local directories and aggregate project metadata into a unified JSON data source.

## Project Overview

*   **Type:** Single Page Application (SPA)
*   **Framework:** React 19 + Vite
*   **Routing:** React Router 7
*   **Purpose:** Central hub for displaying coding projects, with support for hosting/proxying live demos of those projects.

## Architecture & Structure

*   **`src/`**: React source code.
    *   `pages/`: Application views (Home, Projects List, Project Detail).
    *   `components/`: Reusable UI components.
    *   `lib/`: Utility functions (e.g., data fetching).
*   **`data/`**: JSON data stores.
    *   `projects.json`: Generated list of projects.
    *   `profile.json`: User profile information.
*   **`scripts/`**: Node.js automation scripts.
    *   `sync-projects.mjs`: Scans specified local directories (`/home/justin/web-projects`, `/mnt/c/ai_projects`) to update `projects.json`.
*   **`projects/`**: Directory where sub-projects might be checked out or linked for Docker context.
*   **`docker/`**: Docker configuration files.

## Development

### Prerequisites
*   Node.js 20+
*   npm

### Key Commands

```bash
# Install dependencies
npm install

# Scan local directories and update data/projects.json
npm run sync-projects

# Start local development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment (Docker Compose)

The project is designed to be deployed via Docker Compose, which orchestrates the main portfolio site along with multiple sub-project containers.

### Local Docker Run
```bash
cp .env.example .env
docker compose up -d --build
```
Access at `http://localhost:3000`.

### Live Deployment
*   **Host:** `live.dothost.net`
*   **URL:** `https://neojustin.dothost.net/`
*   **Update Workflow:**
    1.  Sync code to server (Git pull or rsync).
    2.  Rebuild and restart the web service:
        ```bash
        docker-compose up -d --build web
        ```

### Project Demos
Sub-projects are served via the portfolio's Nginx gateway under the path `/p/<slug>/`. These are defined in `docker-compose.yml`.

## Conventions
*   **Project Metadata:** `projects.json` is the source of truth. Run `npm run sync-projects` to update it; do not manually edit fields that are auto-generated (like `sourcePath`), but you can safe-keep manual edits to fields like `summary` or `tags`.
*   **Routing:** The app uses standard React Router conventions. New pages should be added to `src/App.jsx`.
*   **Styling:** Global styles in `src/styles/global.css`.
