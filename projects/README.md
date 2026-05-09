# Projects folder (server-side)

這個資料夾用來放「要上線展示的專案」原始碼 checkout（每個資料夾名稱 = slug）。

作品集主站的 `docker-compose.yml` 會以 `./projects/<slug>` 作為 build context，並把 demo 掛到：

- `https://neojustin.dothost.net/p/<slug>/`

## 更新已上線的 demo（程式碼變更後）
在遠端主機上，只需要 rebuild 對應 service：
```bash
cd /home/neojustin/justin-portfolio
docker-compose up -d --build <slug>
```

完整流程（rsync / git pull）請見：
- `/home/justin/web-projects/justin-portfolio/docs/deployment/update-workflow.md`

建議每個專案 repo 根目錄都放一份 `DEPLOYMENT.md`，用來記錄：
- 線上 URL（/p/<slug>/）
- 遠端 checkout 路徑
- 更新指令（docker-compose up -d --build <slug>）

範例：
- `projects/threejs-product-viewer`
- `projects/rigview3d`
