# Animation AI Studio

Animation AI Studio is a local-first, modular AI animation pipeline for short-form, shot-based production workflows.

This repository is being refactored toward a project structure centered on:

- project and story planning
- character and asset registry
- shot definitions with prompt and reference binding
- provider-based video generation
- LoRA metadata management
- audio task preparation
- composition and export scaffolding
- continuity and QC scaffolding

## Current MVP Direction

The current implementation focus is architecture and workflow scaffolding, not full backend completion.

Implemented in this refactor:

- `studio/` package for the new animation-oriented architecture
- typed project, character, shot, video, audio, composition, and QC models
- project workspace creation under `data/projects/<project_slug>/`
- character and shot registries
- project-oriented CLI for creating projects, registering characters, listing shots, preparing render tasks, and executing audio/video task manifests
- FFmpeg-based export task preparation and execution
- dialogue-driven subtitle generation for export tasks
- provider scaffolding for Wan-family video workflows
- LTX-2.3 provider scaffolding for API-first and local runtime preparation
- unified TTS adapter scaffolding
- dialogue-aware TTS task generation for shots
- source-video audio analysis for speaker segmentation and transcript indexing
- per-character voice training dataset export for voice clone and RVC preparation

Scaffolded but not fully implemented yet:

- Wan-family inference
- automatic I2V continuation execution
- audio synthesis/alignment execution in the new CLI
- FFmpeg-based composition/export pipeline
- continuity scoring and QC execution

Existing subsystems under `scripts/` remain available and are intentionally not rewritten in this phase.

## Repository Shape

The repo currently contains two layers:

- `studio/`
  New project-facing architecture for animation production workflows.
- `scripts/`
  Existing subsystem implementations for generation, synthesis, analysis, editing, orchestration, training, and legacy creative-studio flows.

This allows the refactor to be conservative: new project orchestration can wrap existing modules instead of replacing them immediately.

## New CLI

Use the new studio CLI for project-level workflows:

```bash
python -m studio.cli.main create-project --name "Demo Project"
python -m studio.cli.main add-character --project demo-project --character-id hero --display-name "Hero"
python -m studio.cli.main add-shot --project demo-project --shot-id shot-001 --title "Opening" --sequence-index 1 --prompt "Hero enters the scene." --dialogue "I am ready."
python -m studio.cli.main list-shots --project demo-project
python -m studio.cli.main prepare-render --project demo-project --shot-id shot-001 --provider wan
python -m studio.cli.main run-audio-task --project demo-project --shot-id shot-001
python -m studio.cli.main analyze-audio --project demo-project --input-video /path/to/source.mp4 --num-speakers 2
python -m studio.cli.main map-speakers --project demo-project --mapping speaker_00=hero --mapping speaker_01=friend
python -m studio.cli.main export-voice-datasets --project demo-project
python -m studio.cli.main prepare-rvc-training --project demo-project --character-id hero
python -m studio.cli.main run-rvc-training --project demo-project --character-id hero --stage all
python -m studio.cli.main prepare-export --project demo-project --shot-id shot-001 --subtitles external
python -m studio.cli.main run-export-task --project demo-project
```

Example LTX-2.3 shot definitions:

```bash
python -m studio.cli.main add-shot \
  --project demo-project \
  --shot-id shot-010 \
  --title "Hero Delivers Line" \
  --sequence-index 10 \
  --prompt "A close-up of the hero speaking to camera in a cinematic animated style." \
  --mode i2v \
  --generation-mode image_audio_to_video \
  --dialogue "We begin now." \
  --character-id hero \
  --reference-image data/projects/demo-project/assets/images/hero.png \
  --reference-audio data/projects/demo-project/assets/audio/hero_line.wav \
  --model-variant ltx-2-3-pro \
  --lip-sync-priority high

python -m studio.cli.main prepare-render --project demo-project --shot-id shot-010 --provider ltx23_api
python -m studio.cli.main run-video-task --project demo-project --shot-id shot-010 --provider ltx23_api
```

## Workspace Layout

Project workspaces are stored under:

```text
data/projects/<project_slug>/
├── project.yaml
├── characters/
├── shots/
├── assets/
│   └── loras/
├── audio/
├── renders/
└── exports/
```

Audio analysis artifacts are written under:

```text
data/projects/<project_slug>/audio/
├── analysis/
│   ├── source_audio.wav
│   ├── audio_analysis_report.json
│   ├── speaker_summary.json
│   ├── speaker_map_template.yaml
│   └── segments/
└── training/
    └── <character_id>/
        ├── voice_samples/
        ├── gpt_sovits/
        └── rvc/
```

RVC training tasks are written next to the exported RVC dataset:

```text
data/projects/<project_slug>/audio/training/<character_id>/
├── manifest.json
├── rvc/
│   └── dataset_manifest.json
└── rvc_training_task.yaml
```

## Architecture Outline

```text
studio/
├── core/        Shared result models, paths, storage helpers
├── story/       Project and shot schemas
├── assets/      Character and LoRA registries
├── video/       Video task models, provider interfaces, provider registry
├── audio/       Audio task models and provider interfaces
├── editing/     Composition task schemas
├── evaluation/  QC report schemas
├── pipelines/   Project and shot orchestration helpers
└── cli/         Project-facing command line interface
```

## Existing Reusable Subsystems

This refactor deliberately leaves existing implementations in place for later integration, including:

- image provider registry under `scripts/generation/image/`
- action/control workflows under `scripts/generation/action/`
- unified TTS adapter under `scripts/synthesis/tts/unified_tts.py`
- orchestration infrastructure under `scripts/orchestration/`

## LTX-2.3 Direction

The video stack is being reoriented around `LTX-2.3`, with a deliberate split between:

- `ltx23_api`
  Primary near-term provider for synchronized audio-video generation tasks.
- `ltx23_comfy`
  ComfyUI-backed route for local node-based LTX-2.3 workflows.
- `ltx23_local`
  Future isolated local runtime path for high-VRAM deployments.

In this phase, the repository prepares normalized `LTX-2.3` task manifests only. It does not claim that API execution, local runtime execution, uploads, or artifact downloads are complete.

Planned LTX-2.3 task coverage:

- `t2v`
- `i2v`
- `a2v`
- `image_audio_to_video`
- `extend`
- `retake`

Current execution status:

- `ltx23_api`
  Can prepare manifests and execute HTTP requests when `LTX_API_KEY` is set.
- `ltx23_comfy`
  Can prepare and execute against a running ComfyUI server when a real exported workflow JSON is configured.
- `ltx23_local`
  Manifest-only scaffold for a future isolated runtime.

Example ComfyUI route:

```bash
python -m studio.cli.main prepare-render --project demo-project --shot-id shot-010 --provider ltx23_comfy
python -m studio.cli.main run-video-task --project demo-project --shot-id shot-010 --provider ltx23_comfy
```

Before `ltx23_comfy` execution, configure:

- `configs/studio/ltx23.yaml`
  Set `comfy.enabled`, `comfy.base_url`, and `comfy.workflow_template`
- `configs/studio/workflows/ltx23_comfy_template.json`
  Replace the placeholder file with a real exported workflow from your ComfyUI installation

Supported ComfyUI template placeholders:

- `__PROMPT__`
- `__NEGATIVE_PROMPT__`
- `__WIDTH__`
- `__HEIGHT__`
- `__DURATION__`
- `__FPS__`
- `__MODEL_VARIANT__`
- `__OUTPUT_PREFIX__`
- `__IMAGE_URI__`
- `__AUDIO_URI__`
- `__VIDEO_URI__`

Template validation helpers:

```bash
python -m studio.cli.main validate-comfy-workflow --project demo-project --shot-id shot-010
python -m studio.cli.main render-comfy-workflow --project demo-project --shot-id shot-010
```

## Singing Cover Roadmap

The repository now has a documented roadmap for moving from dialogue voice cloning into character singing covers.

Priority plan:

1. `Demucs`
   Song stem separation for vocals and accompaniment.
2. `Seed-VC`
   Character-based singing voice conversion from real vocal stems.
3. Remix / mastering
   Recombine converted vocals with instrumental backing.

Secondary and future systems are also part of the roadmap:

- `so-vits-svc`
  Comparison and fallback singing voice conversion path.
- `DiffSinger`
  Future original singing synthesis from lyrics and notes.
- `OpenUtau`
  Future MIDI and lyric editing / authoring workflow.
- `w-okada voice-changer`
  Optional realtime audition utility.

See:

- [docs/architecture/singing-cover-roadmap.md](docs/architecture/singing-cover-roadmap.md)
- [docs/audio/diffsinger-v170-runbook.md](docs/audio/diffsinger-v170-runbook.md)
- [docs/audio/openutau-diffsinger-bridge.md](docs/audio/openutau-diffsinger-bridge.md)
- [docs/audio/singing-model-benchmark.md](docs/audio/singing-model-benchmark.md)

Create a benchmark workspace for the current Elio song:

```bash
python -m studio.cli.main prepare-singing-model-benchmark \
  --project elio \
  --title "Elio Singing Model Benchmark" \
  --source-song-path /mnt/c/ai_projects/animation-ai-studio/data/projects/elio/audio/openutau/songs/elio-follow-the-starlight-cn-v1/outputs/final/elio_follow_the_starlight_final.wav
```

## RVC Training

`studio` can now prepare and run staged RVC training jobs against an existing RVC checkout such as `/mnt/c/ai_tools/RVC`.

Recommended first pass:

```bash
python -m studio.cli.main prepare-rvc-training \
  --project demo-project \
  --character-id hero \
  --rvc-root /mnt/c/ai_tools/RVC \
  --sample-rate 40k \
  --version v2 \
  --f0-method rmvpe

python -m studio.cli.main run-rvc-training \
  --project demo-project \
  --character-id hero \
  --stage all
```

Stages:

- `preprocess`
- `extract`
- `train`
- `index`
- `all`

Notes:

- The current `/mnt/c/ai_tools/RVC/assets/pretrained_v2/` contents indicate that `v2 + 40k + f0` is the safest default on this machine.
- `prepare-rvc-training` reads the exported `audio/training/<character_id>/rvc/dataset_manifest.json` produced by `export-voice-datasets`.
- The RVC integration uses subprocess execution for preprocess, feature extraction, and model training, then builds the Faiss index from extracted features.

## Scene Dialogue Pipeline

`studio` can now turn a scene script into a multi-character dialogue package using the saved character voice profiles.

Scene script example:

```json
{
  "title": "Signal Corridor",
  "lines": [
    {"character_id": "elio", "text": "The beacon is closer than before."},
    {"character_id": "bryce", "text": "Then stop staring and hand me the scanner."},
    {"character_id": "glordon", "text": "You are already too late."}
  ]
}
```

Generate the scene:

```bash
python -m studio.cli.main generate-scene-dialogue \
  --project elio \
  --scene-id signal-corridor \
  --script-path /path/to/scene_script.json
```

Outputs are written under `data/projects/<project>/audio/scenes/<scene-id>/`:

- `source_tts/`
- `source_wav/`
- `converted/`
- `final/scene_dialogue_mix.wav`
- `final/scene_dialogue.srt`
- `scene_manifest.json`

## Next Steps

Planned follow-up work:

1. Implement the LTX-2.3 API transport layer and response normalization.
2. Expand project manifests to cover continuation chains, retakes, and media transport settings.
3. Build isolated local-runtime support for LTX-2.3 without destabilizing the main repo environment.
4. Expand the export pipeline beyond the current FFmpeg MVP.
5. Add QC and continuity evaluation adapters.
