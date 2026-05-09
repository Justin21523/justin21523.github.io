# Video Generation Lab

Video Generation Lab is a reproducible repository for short-form video generation research on a single 16 GB GPU.
It provides:

- Diffusers-based pipelines behind a unified Python CLI.
- ComfyUI workflow templates plus API helpers.
- YAML-driven model presets tuned for practical 16 GB VRAM usage.
- Manifest-driven batch pipelines for 2D animation, 3D animation, live-action, image-to-video, and video-to-video runs, including render-farm sharding.
- Reproducible outputs with metadata, environment snapshots, and config snapshots.

The initial baseline is `Stable Video Diffusion` image-to-video for short clips. The strongest image-to-video paths on this machine are currently the ComfyUI-backed `AnimateDiff SDXL` reference-image flow and `Wan` image-to-video flow, while native `v2v` polish and true generative `v2v` are tracked separately.

## Quick Start

```bash
conda activate ai_env
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
cp .env.example .env
```

Create a dry-run output with the built-in dummy backend:

```bash
conda run -n ai_env python -m video_generation_lab.cli run i2v \
  --model svd \
  --model-id dummy://svd \
  --image ./tests/assets/example.ppm \
  --prompt "A portrait with subtle head movement" \
  --dry-run
```

See:

- `docs/SETUP.md`
- `docs/USAGE.md`
- `docs/COMFYUI.md`
- `docs/HF_MEDIA.md`
- `docs/MODELS.md`
- `docs/T2V_IDENTITY_TRAINING_SPEC.md`
- `docs/PRODUCTION_PRESETS.md`
- `ROADMAP.md`
