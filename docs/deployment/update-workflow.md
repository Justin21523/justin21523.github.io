# 更新部署流程（主站 + /p/<slug>/ 專案）

這份文件說明：當任何專案程式碼有變更後，如何在遠端主機上「rebuild docker image + restart service」，讓線上展示立即更新。

## 先決條件（遠端主機）
- 遠端部署目錄：`/home/neojustin/justin-portfolio`
- 使用 Docker Compose v2（本機遠端上是 `docker-compose` 指令）
- SSH 連線資訊（本機私有）：`~/SSH_LIVE_DOTHOST_NET.local.md`

## 概念：每個 service 就是一個專案
- 主站 service：`web`
- 每個 demo：service name == 專案資料夾名稱（slug）
  - 例如：`javascript-platformer-concepts`、`3d-platformer-runner`
- 反向代理入口：
  - 主站：`https://neojustin.dothost.net/`
  - 專案：`https://neojustin.dothost.net/p/<slug>/`

## 1) 先把新程式碼同步到遠端
你可以用以下兩種方式擇一（選你習慣的）：

### A) 用 git（遠端 pull）
在遠端更新 `projects/<slug>` 的 repo：
```bash
cd /home/neojustin/justin-portfolio/projects/<slug>
git pull
```

### B) 用 rsync（從本機上傳）
把本機專案同步到遠端 `projects/<slug>`：
```bash
rsync -az --delete \
  --exclude .git --exclude node_modules --exclude dist \
  -e "ssh -p 2965 -i /home/justin/.ssh/school-library-lms_live_dothost_ed25519" \
  /home/justin/web-projects/<slug>/ \
  neojustin@live.dothost.net:/home/neojustin/justin-portfolio/projects/<slug>/
```

> 注意：同步「主站 repo root」(`/home/neojustin/justin-portfolio`) 時，如果你使用 `--delete`，務必排除 `projects/**`，避免把伺服器上的專案 checkout（`projects/<slug>`）整個刪掉。

## 2) rebuild + restart（只更新某一個專案）
在遠端執行：
```bash
cd /home/neojustin/justin-portfolio
docker-compose up -d --build <slug>
```

例：
```bash
docker-compose up -d --build javascript-platformer-concepts
```

## 3) rebuild + restart（更新全部）
```bash
cd /home/neojustin/justin-portfolio
docker-compose up -d --build
```

## 4) 快速驗證（避免吃到舊快取）
### 伺服器端檢查
```bash
docker-compose ps
```

### 瀏覽器端
- 使用「硬重新整理」：`Ctrl+Shift+R`（避免舊 JS/CSS 快取）

## 常見問題（部署後打開是白頁或 JSON parse 失敗）
通常是以下兩種：
1) **專案用到網域根目錄的絕對路徑**（例如 `/sprites/...`），但實際掛在 `/p/<slug>/` 下  
   - 解法：改成 base-aware URL，或在專案的 `docker/nginx.conf` 加 rewrite。
2) **Nginx SPA fallback 把缺檔導向 index.html**，導致 loader 以為拿到 JSON/GLTF 但其實是 HTML  
   - 解法：在專案 Nginx 加上「靜態副檔名 `try_files ... =404`」規則（避免回傳 `index.html`）。
