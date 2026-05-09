# live.dothost.net（SSH + Docker Compose）

本文件提供一個「最小可用」的部署流程：連線到遠端主機並用 Docker Compose 跑起作品集與 demo services。

> 預設採用「直接開 port」的方式（對齊 `school-library-lms` 的部署習慣）。若你要走 HTTPS + 單一網域，我可以再補 Nginx/Caddy/Traefik 範本與設定。

## 0) 連線資訊（不放密碼在 repo）
- Host：`live.dothost.net`
- Port：`2965`
- User：`neojustin`
- 私鑰（本機）：請使用你本機既有 key（例如 `~/.ssh/school-library-lms_live_dothost_ed25519`）

若你需要「密碼版」連線資訊，請看本機私有文件（不 commit）：
- `~/SSH_LIVE_DOTHOST_NET.local.md`

## 1) 遠端主機前置條件
- 安裝 Docker + Docker Compose（此主機使用 `docker-compose` 指令）
- 開放 port（最小版）：
  - Web：`3000/tcp`（或你想改成其他 port）

## 2) 部署流程（最小版：docker compose build）
1) SSH 到遠端：
```bash
ssh <user>@<host>
```

2) 把 repo 放到遠端（擇一）：
- A) 遠端 `git clone`
- B) 本機 `rsync` 上傳（推薦排除 `node_modules/` 與 `dist/`）

3) 在遠端 repo root 準備 `.env`（不要 commit）：
```bash
cp .env.example .env
vim .env
```

4) 啟動（會 build image）：
```bash
docker-compose up -d --build
```

5) 健康檢查：
```bash
curl -sS http://localhost:3000/ >/dev/null && echo OK
```

## 3) 更新（拉新版本 + rebuild）
```bash
git pull
docker-compose up -d --build
```
