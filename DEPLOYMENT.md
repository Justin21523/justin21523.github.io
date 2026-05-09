# Deployment

Status: Deployed ✅

- Live URL: `https://neojustin.dothost.net/`
- Server host: `live.dothost.net:2965` (user: `neojustin`)
- Server checkout path: `/home/neojustin/justin-portfolio`

## Update after code changes (recommended workflow)
1) Sync code to server (pick one):

- **Git on server**:
```bash
cd /home/neojustin/justin-portfolio
git pull
```

- **rsync from local**:
```bash
rsync -az --delete \
  --exclude .git --exclude node_modules --exclude dist \
  -e "ssh -p 2965 -i ~/.ssh/school-library-lms_live_dothost_ed25519" \
  /home/justin/web-projects/justin-portfolio/ \
  neojustin@live.dothost.net:/home/neojustin/justin-portfolio/
```

2) Rebuild + restart (server):
```bash
cd /home/neojustin/justin-portfolio
docker-compose up -d --build web
```

## Notes
- `/p/<slug>/` demos are configured in `/home/neojustin/justin-portfolio/docker-compose.yml` and served via the portfolio nginx gateway.
- See:
  - `docs/deployment/update-workflow.md`
  - `docs/deployment/live-dothost-ssh-docker-compose.md`
