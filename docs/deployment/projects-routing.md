# 專案 Demo 路由（/p/<slug>/）

目標：未來把每個專案都 Docker 化後，透過同一個主網域提供線上展示入口，並且可以回到主作品集網站。

## 現況（已就緒）
- 主站：`https://neojustin.dothost.net/`（作品集）
- 保留路徑：`/p/<slug>/`
  - 若 `<slug>` 對應的 docker service 尚未加入 compose，會回 404（提示尚未上線）

## 如何把一個專案接到 /p/<slug>/
在同一個 `docker-compose.yml`（同一個 network）加入該專案 service，並確保：
- service name == `<slug>`（與 `data/projects.json` 的 slug 相同）
- container 在內部提供 HTTP（建議 `80`），並用 `expose: ["80"]`（不需要對外 `ports:`）

範例（示意）：
```yaml
services:
  web:
    # 作品集站（已存在）
    ports:
      - "3000:80"

  threejs-product-viewer:
    image: your-image
    expose:
      - "80"
```

接好後：
- `https://neojustin.dothost.net/p/threejs-product-viewer/` 會被反向代理到 `http://threejs-product-viewer/`

## 讓每個專案能回到主網站（建議）
每個專案 UI 建議加固定連結：
- `Home` → `https://neojustin.dothost.net/`

（可選）若專案需要知道自己被掛在 `/p/<slug>/` 下，反向代理會帶：
- `X-Forwarded-Prefix: /p/<slug>`

