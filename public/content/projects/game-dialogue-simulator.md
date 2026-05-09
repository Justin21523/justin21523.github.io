# Game Dialogue Simulator (Web Game)

A browser-based simulation game inspired by the Super Wings animated series, using high-quality character art generated from SDXL LoRA models.

## Overview

- **Genre**: simulation + dispatch/management
- **Frontend**: Vite + React + TypeScript + Phaser 3
- **Backend**: FastAPI
- **Characters available**: 8 (Jett, Jerome, Donnie, Chase, Flip, Todd, Paul, Bello)

## Highlights

- **Dispatch system**: pick a character and send them on missions worldwide
- **Mission variety**: multiple mission types and locations
- **Resource management**: money, fuel, and items
- **Animation pipeline**: launch → flight → arrival → transformation → landing
- **Persistence**: LocalStorage save snapshot for quick resume

## Quick Start

### Docker (full stack, one command)

Requirements: Docker + Docker Compose v2.

```bash
./scripts/docker-up.sh
```

Open `http://localhost:8080` (frontend). Backend API: `http://localhost:8001/api/v1` (docs: `http://localhost:8001/docs`).

`./scripts/docker-up.sh` tries the GPU stack first (`docker-compose.yml` + `docker-compose.gpu.yml`). If GPU runtime is unavailable it falls back to CPU (`docker-compose.yml`).

To force CPU: `./scripts/docker-up.sh --cpu` (or `docker compose -f docker-compose.yml up --build`).
To force GPU: `./scripts/docker-up.sh --gpu` (or `docker compose -f docker-compose.yml -f docker-compose.gpu.yml up --build`).
To include local models / SD backgrounds: `./scripts/docker-up.sh --gpu --models`.

#### AI_WAREHOUSE storage layout

This repo’s Docker Compose defaults assume the AI_WAREHOUSE paths from `~/Desktop/data_model_structure.md`:

- Models (read-only): `/mnt/c/ai_models` → `/app/models`
- Caches: `/mnt/c/ai_cache/huggingface` + `/mnt/c/ai_cache/torch`
- Runtime outputs: `/mnt/data/tmp/super-wings-simulator/*` (content packs / chroma / generated assets)

If you’re on native Linux (no `/mnt/c`), override the host paths via environment variables:

- `AI_MODELS_DIR` (default: `/mnt/c/ai_models`)
- `AI_CACHE_DIR` (default: `/mnt/c/ai_cache`)
- `AI_DATA_DIR` (default: `/mnt/data/tmp/super-wings-simulator`)

#### Daily content pack backgrounds (Diffusers)

If you want the daily generator to create runtime background images for newly-added locations:

- Ensure the GPU stack installs Diffusers (see `backend/requirements.docker.gpu.txt`).
- Provide a **local** text-to-image model path inside the backend container (no network downloads).
- Set:
  - `CONTENT_PACKS_GENERATE_BACKGROUNDS=true`
  - `CONTENT_PACKS_BACKGROUND_MODEL_PATH=/app/models/stable-diffusion/<your_model_dir>`

Convenience override: `docker-compose.models.yml` enables the feature (assumes your models are already mounted to `/app/models` by `docker-compose.yml`):

```bash
docker compose -f docker-compose.yml -f docker-compose.gpu.yml -f docker-compose.models.yml up --build
```

#### Docker GPU prerequisites (NVIDIA)

If you run the GPU stack and see:

`could not select device driver "" with capabilities: [[gpu]]`

your Docker daemon is not configured with the NVIDIA GPU runtime (this is not a YAML formatting issue). Fix by installing and configuring NVIDIA Container Toolkit for your OS, then verify:

```bash
docker run --rm --gpus all nvidia/cuda:12.3.2-base-ubuntu22.04 nvidia-smi
```

Repo helpers:

- Diagnose: `./scripts/gpu-doctor.sh`
- Install/configure (Linux): `./scripts/gpu-setup-linux.sh --run`

### Frontend (Vite + React + TS + Phaser 3)

```bash
npm install
npm run dev
```

Open the Vite URL (default `http://localhost:5173`).

### Frontend build preview (static hosting)

```bash
npm run build
python3 -m http.server 8000 --directory dist
```

## Project Structure

```txt
super-wings-simulator/
├── index.html                  # App entry (boots React)
├── src/                        # Frontend (React + TS + Phaser 3)
│   ├── main.tsx                # React entry point
│   ├── ui/                     # React screens/overlays (no per-frame logic)
│   ├── game/phaser/            # Phaser scenes/systems (game loop)
│   └── shared/                 # Shared logic (API, save, progression, quests)
├── css/                        # Styles
│   ├── main.css                # Global styles / theme variables
│   ├── components.css          # Reusable UI components
│   ├── animations.css          # Shared animations
│   └── screens/                # Per-screen styles
├── backend/                    # FastAPI backend (`/api/v1`)
├── assets/images/              # Art assets
│   ├── characters/             # Character images and sequences
│   ├── backgrounds/            # Background art
│   └── ui/                     # UI art
├── data/                       # Game data (legacy + generators)
├── docs/                       # Project docs
├── scripts/                    # Helper scripts
└── prompts/                    # Prompt templates
```

## Gameplay Notes

### Character stats (concept)
- **Speed**: affects travel time
- **Reliability**: affects success rate
- **Specialization**: mission matching bonuses

### Mission types (examples)
- **Delivery**
- **Rescue**
- **Sports**
- **Construction**
- **Police**
- **Animal Care**

## License

This project is for learning and demonstration purposes. Super Wings-related character/IP rights belong to their respective owners.

## Status

In active development. Last updated: 2025-12-16
