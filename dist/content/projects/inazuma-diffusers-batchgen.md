# Inazuma Diffusers BatchGen

Configuration-driven static pose generation scaffold for Inazuma Eleven character datasets using Hugging Face Diffusers, a local SDXL-compatible checkpoint, and one LoRA per character.

This scaffold follows the workstation storage rules you specified: models and LoRAs belong under `/mnt/c/ai_models`, and AI cache directories default to `/mnt/c/ai_cache`. The `/mnt/data` rules are not applied here because that mount is currently unavailable in this environment.

## Overview

This project is designed for large-scale, reproducible character showcase generation:

- Local SDXL `.safetensors` checkpoint loading via Diffusers.
- One LoRA adapter per character, switched without rebuilding the whole pipeline.
- YAML-driven character, pose, and generation settings.
- Deterministic seeds, resume support, failure logging, metadata JSON, and manifest CSV output.
- QA tools for contact sheets, missing-output checks, and failed-job retries.

## Project Layout

```text
configs/      Base settings, character YAMLs, pose libraries, negative presets
configs/groups/  Duo and trio combination plans
configs/group_poses/  Multi-character pose libraries
prompts/      Shared positive prompt fragments
src/          Core loaders, prompt assembly, pipeline, generation, metadata, QA, CLI
scripts/      Thin wrappers for common workflows
outputs/      Images, metadata, contact sheets, and logs
tests/        Unit tests for config, prompt, metadata, and naming behavior
```

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Update `configs/base.yaml` with your local checkpoint path, output root, and preferred device. Replace placeholder LoRA paths in `configs/characters/*.yaml` with real files on disk. The default output root is now an absolute path inside this repository under `/mnt/c/ai_projects/inazuma-diffusers-batchgen/outputs`.

Recommended model locations:

```text
/mnt/c/ai_models/stable-diffusion/illustrious_xl.safetensors
/mnt/c/ai_models/diffusion/lora/sdxl/<character_name>.safetensors
```

Recommended cache environment variables:

```bash
export HF_HOME=/mnt/c/ai_cache/huggingface
export TRANSFORMERS_CACHE=/mnt/c/ai_cache/huggingface
export TORCH_HOME=/mnt/c/ai_cache/torch
export XDG_CACHE_HOME=/mnt/c/ai_cache
```

The CLI also sets these defaults automatically if they are not already defined.

## Usage

Generate all configured characters and poses:

```bash
python -m src.cli generate
```

Generate one character with selected poses:

```bash
python scripts/generate_one_character.py --characters endou_mamoru --pose-ids pose_001 pose_004
```

Run a quick per-character validation batch before larger runs:

```bash
python -m src.cli character-check
python -m src.cli character-check --run
```

Rebuild contact sheets:

```bash
python scripts/build_contact_sheets.py
```

Retry failures only:

```bash
python scripts/retry_failed.py
```

Discover matching LoRA files under the Inazuma Eleven SDXL folder:

```bash
python -m src.cli discover-loras
```

Run the satirical fictional-character-only anime ranking workflow:

```bash
python -m src.cli anime-ranking-seed
python -m src.cli anime-ranking-add-image --character-id utsunomiya_toramaru --file-path outputs/images/utsunomiya_toramaru/example.png
python -m src.cli anime-ranking-evaluate-character --character-id utsunomiya_toramaru --mode suspiciously_fair
python -m src.cli anime-ranking-leaderboard --by-character
python -m src.cli anime-ranking-dashboard
```

Import and score all generated character images under `outputs/images/`:

```bash
python -m src.cli anime-ranking-import-and-evaluate --mode suspiciously_fair
```

Ranking records are stored in `outputs/anime_ranking/anime_ranking.sqlite3`, with older JSON data migrated automatically when needed. The web UI includes character search, single-character detail views, paginated image browsing, score distribution charts, runtime handsome-band controls, and a Gemma VLM batch job queue.

Run the integrated anime ranking backend and frontend:

```bash
python -m src.cli anime-ranking-serve
```

One-click startup with automatic data preparation:

```bash
./scripts/start_anime_ranking.sh
```

Open `http://127.0.0.1:8000/anime-ranking/app`. The ranking feature is intentionally biased toward Utsunomiya Toramaru as a joke for fictional anime characters. It should not be used to rate real people. See `docs/anime_ranking.md` for scoring rules, API routes, frontend notes, and extension points for future CLIP/VLM/LLM analysis.

Export pose CSV:

```bash
python scripts/export_pose_csv.py
```

Validate configured checkpoint and LoRA files:

```bash
python -m src.cli validate-assets
```

Preview the Phase 1 smoke test without running inference:

```bash
python -m src.cli smoke-test --character-id endou_mamoru
```

Run the Phase 1 smoke test for 1 character, 10 poses, 3 images each:

```bash
python -m src.cli smoke-test --character-id endou_mamoru --run
```

Preview the Phase 2 validation batch for 3 characters, 30 poses, 5 images each:

```bash
python -m src.cli phase2-test
```

Run the Phase 2 validation batch:

```bash
python -m src.cli phase2-test --run
```

Run tests:

```bash
pytest
```

Build a unified training manifest from all current single, duo, and trio outputs:

```bash
python -m src.cli training-manifest
```

Build deterministic train/val split CSV files for downstream training:

```bash
python -m src.cli dataset-splits --train-ratio 0.9
```

Export usable rows and training JSONL caption files for the illustration-base route:

```bash
python -m src.cli export-training-data
```

Prepare generated training bundle files for illustration-base LoRA and full finetune runs:

```bash
python -m src.cli prepare-training-bundle
```

Run preflight validation against the generated LoRA bundle:

```bash
python -m src.cli training-preflight
```

Generate a dry-run training launch plan:

```bash
python -m src.cli train-model --dry-run
```

The current dry-run does more than print a command. It also runs a small backend sanity pass that loads a few JSONL rows, reads images, and iterates a couple of training batches to catch dataset-shape problems before wiring a full trainer.

Compare the base illustration checkpoint against a trained LoRA checkpoint:

```bash
python -m src.cli evaluate-trained-lora
```

## Group Dataset Planning

The repository now includes planning scaffolds for native multi-character data generation:

- `configs/groups/duo_combinations.yaml`
- `configs/groups/trio_combinations.yaml`
- `configs/group_poses/duo_static_v1.yaml`
- `configs/group_poses/trio_static_v1.yaml`
- `docs/group_dataset_plan.md`

These files define:

- priority-ranked duo and trio combinations
- target image counts per group
- scene, composition, and interaction biases
- starter static group pose libraries for future native group generation

For future multi-character training, keep the group-model checkpoint on the illustration base route. The existing single-character Noboru exception should not become the default base family for duo or trio training.

The repository also supports a compositing workflow for multi-character dataset construction. This is useful when native multi-character generation collapses into a single dominant subject.

Example dry-runs:

```bash
python -m src.cli compose-duos --priorities A --pose-ids duo_pose_001 duo_pose_003
python -m src.cli compose-trios --priorities A --pose-ids trio_pose_001 trio_pose_003
```

For training preparation, prefer the unified manifest and split files under `outputs/logs/`. The illustration-base route remains the target, but the exported training set now includes the `sakanoue_noboru` pony single-image exception when present.
The training export step writes filtered usable files under `outputs/logs/training_export/`, including `usable_training_manifest.csv`, `dataset_all.jsonl`, `train_dataset.jsonl`, and `val_dataset.jsonl`.
The training bundle step writes generated configs under `outputs/logs/training_bundle/`, and the repository also includes starter templates under `configs/training/`.

## Generation Flow

1. Load `configs/base.yaml`.
2. Load all selected character YAML files and the pose library.
3. Build prompts from reusable text fragments and per-pose fields.
4. Create a shared SDXL pipeline and switch LoRA adapters per character.
5. Generate deterministic outputs using `seed_base + seed_offset + pose_index * 100 + variant_index`.
6. Save image files, metadata JSON, failure logs, and batch manifests.

## Output Layout

```text
outputs/images/{character_id}/
outputs/metadata/{character_id}/
outputs/contact_sheets/{character_id}/
outputs/logs/
```

Image naming is deterministic:

```text
{character_id}__{pose_id}__s{seed}__v{variant}.png
```

## Phased Implementation Roadmap

### Phase 1

- 1 character
- 10 poses
- 3 images per pose
- Validate checkpoint loading, LoRA switching, prompt quality, metadata, and contact sheets

### Phase 2

- 3 characters
- 30 poses
- 5 images per pose
- Validate pose coverage, failure handling, and runtime performance

### Phase 3

- All selected characters
- 100 poses
- 10 images per pose
- Add expanded pose library, production manifests, and large-batch QA review

## Common Failure Modes and Fixes

### Base model path is wrong

Symptom: startup fails before generation begins.

Fix: update `configs/base.yaml` so `base_model_path` points to a real `.safetensors` file under `/mnt/c/ai_models/stable-diffusion/`.

### LoRA path is wrong

Symptom: generation fails when switching to a character.

Fix: update the character YAML `lora_path` and confirm the file exists locally, preferably under `/mnt/c/ai_models/diffusion/lora/sdxl/`.

### Cache files appear under `$HOME/.cache`

Symptom: Hugging Face or torch starts filling the home directory.

Fix: use the provided CLI entry points or export the cache variables from `.env.example` before running manual scripts.

### CUDA out of memory

Symptom: generation fails during inference.

Fix: reduce width, height, or steps; lower `images_per_pose`; keep `float16`, attention slicing, and VAE slicing enabled.

### Poor hands in gesture poses

Symptom: finger-point and peace-sign poses degrade.

Fix: use `hand_focus_negative`, reduce framing complexity, and test those poses first during Phase 1.

### Portrait crops cut off hair or chin

Symptom: face framing is too tight.

Fix: switch to portrait presets, adjust the pose `framing`, and rerun only affected pose IDs.

### Prompt text is truncated by CLIP

Symptom: generation works, but logs warn that parts of the prompt were truncated beyond 77 tokens.

Fix: the prompt builder now drops low-priority segments first. If warnings remain, shorten `base_costume_prompt`, reduce verbose pose wording, or lower `prompt_max_word_estimate` in `configs/base.yaml` even further.

### Characters look too old or too sketch-like

Symptom: outputs drift toward teenagers, adults, or rough draft lineart.

Fix: this scaffold now injects a child-lock prompt centered on a 12-year-old boy and adds sketch/adult terms to negative prompts. If one character still drifts, tighten that character's `base_identity_prompt` and rerun `character-check` before any larger batch.

## How to Add a New Character

1. Copy one file from `configs/characters/`.
2. Set `character_id`, `display_name`, `trigger_words`, and `lora_path`.
3. Write editable identity and costume prompts.
4. Set `seed_offset` to a unique integer block.
5. Run a small batch first: `python -m src.cli generate --characters your_character_id --pose-ids pose_001 pose_002`.

## Asset Validation

- `python -m src.cli validate-assets` checks the configured SDXL checkpoint and all character LoRA files.
- Missing files are reported as `ERROR`.
- Files outside the preferred `/mnt/c/ai_models/stable-diffusion` or `/mnt/c/ai_models/diffusion/lora/sdxl` roots are reported as `WARNING`.

## LoRA Discovery

- `python -m src.cli discover-loras` scans `/mnt/c/ai_models/diffusion/lora/sdxl/inazuma-eleven` by default.
- It prints the current config path, the best suggested LoRA file, and a simple match score for each character.
- Use this when adding characters or cleaning up renamed model files.

## Phase 1 Smoke Test

The smoke test is designed to validate the whole generation path with minimal cost:

- 1 character
- first 10 poses from the current pose library
- 3 images per pose
- deterministic filenames and metadata

Use `python -m src.cli smoke-test --character-id endou_mamoru` to preview the planned requests. Add `--run` to execute the generation once the checkpoint and LoRA file are in place.

## How to Add More Static Poses

1. Add entries to `configs/poses/static_poses_v1.yaml`.
2. Keep the schema stable: `pose_id`, `pose_name`, `category`, `body_pose`, `hand_pose`, `expression`, `camera`, `framing`, `environment_hint`, `quality_hint`, optional `negative_override`.
3. Update `configs/poses/pose_groups.yaml` so category-level selection stays organized.
4. Export the pose CSV and review wording before large reruns.

## Notes

- The starter library ships with 30 well-structured non-action poses and is intended to scale to 100+ entries.
- The scaffold focuses on deterministic v1 behavior. Prompt jitter and ControlNet pose control can be added later without replacing the config model.
