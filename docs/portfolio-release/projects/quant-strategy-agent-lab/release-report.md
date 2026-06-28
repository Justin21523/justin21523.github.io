# Quant Strategy Agent Lab Release Report

## Completed
- Portfolio case study exists for `quant-strategy-agent-lab`.
- Live demo, GitHub, README, and demo video links are present.
- Playwright showcase media was regenerated from the current app.
- GitHub Pages live demo target is `https://justin21523.github.io/quant-strategy-agent-lab/`.
- Public demo uses static fixture snapshots so it can run without a FastAPI backend.

## Changed Files
- `content/projects/quant-strategy-agent-lab/project.override.json`
- `content/projects/quant-strategy-agent-lab/zh-TW.md`
- `content/projects/quant-strategy-agent-lab/en.md`
- `docs/demo-scripts/quant-strategy-agent-lab.md`
- `docs/portfolio-release/projects/quant-strategy-agent-lab/release-report.md`
- `public/projects/quant-strategy-agent-lab/`

## Links
- Portfolio Case Study: /projects/quant-strategy-agent-lab
- GitHub: https://github.com/Justin21523/quant-strategy-agent-lab
- README: https://github.com/Justin21523/quant-strategy-agent-lab#readme
- Live Demo: https://justin21523.github.io/quant-strategy-agent-lab/
- Demo Video: /projects/quant-strategy-agent-lab#demo-video

## Build / Run Status
- Quant frontend static build: `npm run build:pages`
- Quant showcase capture: `npm run showcase:capture`
- Full local app: FastAPI backend + Vite frontend
- Public demo: static GitHub Pages fixture mode

## Assets
- Hero image: `public/projects/quant-strategy-agent-lab/hero.png`
- Screenshots: `public/projects/quant-strategy-agent-lab/screenshots/`
- Demo video: `public/projects/quant-strategy-agent-lab/videos/playwright-external-live-demo.webm`
- Video poster: `public/projects/quant-strategy-agent-lab/videos/posters/playwright-external-live-demo.webp`

## Manual Follow-up Needed
- None.

## Notes for Interview
- Emphasize the workflow breadth: universe, sync, quality, scanner, portfolio, jobs, performance, and report exports.
- State clearly that public demo data is deterministic synthetic fixture data and not investment advice.
- Mention that GitHub Pages uses static snapshots while the local version runs the full FastAPI/SQLite stack.
