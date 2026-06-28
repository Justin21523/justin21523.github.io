# LibraCore Release Report

## Completed
- Public GitHub repository exists for `libracore`.
- Static GitHub Pages demo exists under `site/`.
- Portfolio case study content exists in English and Traditional Chinese.
- Four CTA slots are present: Live Demo, GitHub, README, and Demo Video.
- Public media includes 20 screenshots, one guided-tour recording, and one poster.

## Changed Files
- `content/projects/libracore/`
- `docs/demo-scripts/libracore.md`
- `docs/portfolio-release/projects/libracore/`
- `public/projects/libracore/`

## Links
- Portfolio Case Study: /projects/libracore
- GitHub: https://github.com/Justin21523/libracore
- README: https://github.com/Justin21523/libracore#readme
- Live Demo: https://justin21523.github.io/libracore/
- Demo Video: /projects/libracore/videos/libracore-guided-tour.webm

## Build / Run Status
- Install: `python3 -m pip install -r requirements.txt`
- Run: `python3 manage.py migrate && python3 manage.py seed_portfolio_demo && python3 manage.py runserver`
- Test: `pytest -q`
- Static demo: `site/index.html`

## Assets
- Hero image: public/projects/libracore/hero.png
- Screenshots: public/projects/libracore/screenshots/
- Demo video: public/projects/libracore/videos/libracore-guided-tour.webm
- Video poster: public/projects/libracore/videos/posters/libracore-guided-tour.webp

## Manual Follow-up Needed
- Deploy a full Django backend separately if live staff workflows are required online.

