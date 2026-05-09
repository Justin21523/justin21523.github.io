# AI Gen Hub

Central workspace for custom prompts, character assets, and scripts.
This project calls the existing tool repos without modifying them:
- /mnt/c/ai_tools/AnimateDiff
- /mnt/c/ai_tools/Wan2.1

## Quick start
```
source /mnt/c/ai_projects/ai-gen-hub/env.sh

# Wan 2.1 T2V (1.3B)
bash /mnt/c/ai_projects/ai-gen-hub/scripts/run_wan_t2v_1_3b.sh "your prompt"

# AnimateDiff (config required)
bash /mnt/c/ai_projects/ai-gen-hub/scripts/run_animatediff.sh configs/animatediff/your_config.yaml
```


## Batch examples
```
# AnimateDiff batch (Miguel defaults)
bash /mnt/c/ai_projects/ai-gen-hub/scripts/batch_generate_animatediff.sh --limit 5

# Wan 2.1 batch (T2V-1.3B)
bash /mnt/c/ai_projects/ai-gen-hub/scripts/run_wan_t2v_1_3b_batch.sh /path/to/prompts /mnt/data/videos/processed/wan2.1
```

## Video Gen Factory (ComfyUI)
This repo vendors the older `video-gen-factory` project under `video-gen-factory/` (ComfyUI workflows, SVD generators, upscalers).

```
source /mnt/c/ai_projects/ai-gen-hub/env.sh

# One-shot workflow submit + monitor
python /mnt/c/ai_projects/ai-gen-hub/video-gen-factory/run_generation.py --workflow miguel_animatediff_complete.json

# Batch by character (dry-run first)
python /mnt/c/ai_projects/ai-gen-hub/video-gen-factory/batch_generate.py --character miguel --dry-run
```

## LoRA registries
- Wan2.1: `configs/loras/wan2.1.yaml`
- CogVideoX: `configs/loras/cogvideox.yaml`
- LTX-Video: `configs/loras/ltx-video.yaml`
- HunyuanVideo: `configs/loras/hunyuanvideo.yaml`

## SDXL identity training (auto configs)
Configs are generated under:
`configs/training/sdxl_identity`

Regenerate (scans datasets):
```
python /mnt/c/ai_projects/ai-gen-hub/scripts/train/generate_sdxl_identity_configs.py \
  --only miguel,elio,bryce,caleb,luca,alberto,giulia,ian_lightfoot,barley_lightfoot,orion
```

Batch training:
```
bash /mnt/c/ai_projects/ai-gen-hub/scripts/train/train_sdxl_identity_batch.sh
```

## Diffusers LoRA runners (templates)
Set the model id/path in `env.sh`, then run:
```
# Wan2.1 LoRA (diffusers pipeline)
bash /mnt/c/ai_projects/ai-gen-hub/scripts/run_wan2_1_lora_diffusers.sh "your prompt"

# CogVideoX LoRA
bash /mnt/c/ai_projects/ai-gen-hub/scripts/run_cogvideox_lora.sh "your prompt"

# LTX-Video LoRA
bash /mnt/c/ai_projects/ai-gen-hub/scripts/run_ltxvideo_lora.sh "your prompt"

# HunyuanVideo LoRA
bash /mnt/c/ai_projects/ai-gen-hub/scripts/run_hunyuanvideo_lora.sh "your prompt"
```

Batch (diffusers generic):
```
bash /mnt/c/ai_projects/ai-gen-hub/scripts/batch_generate_diffusers_t2v.sh \\
  --prompts-dir /path/to/prompts \\
  --output-dir /mnt/data/videos/processed/diffusers \\
  --pipeline CogVideoXPipeline \\
  --model <model_id_or_path>
```

## Wan2.1 identity LoRA (DiffSynth-Studio)
Prepare datasets from the synthetic image folders (reads legacy `/mnt/data/ai_data` if present; writes under `/mnt/data/datasets/...`):
```
bash /mnt/c/ai_projects/ai-gen-hub/scripts/datasets/prepare_wan21_lora_datasets_from_synthetic.sh --dry-run
```

Train one LoRA:
```
bash /mnt/c/ai_projects/ai-gen-hub/scripts/train/train_wan21_lora_t2v_1_3b.sh \
  --dataset-dir /mnt/data/datasets/general/wan2.1/lora_datasets/<group>/<char>_identity_* \
  --output-dir /mnt/c/ai_models/wan2.1/lora/Wan2.1-T2V-1.3B/<group>/<char>_identity \
  --lora-rank 32 --use-gc-offload
```

Quick eval (generate mp4 with LoRA):
```
bash /mnt/c/ai_projects/ai-gen-hub/scripts/eval/eval_wan21_lora_t2v_1_3b.sh \
  --lora-path /mnt/c/ai_models/wan2.1/lora/Wan2.1-T2V-1.3B/<group>/<char>_identity/epoch-*.safetensors \
  --prompt "your prompt"
```

## Layout
- configs/animatediff: store your AnimateDiff YAML configs
- configs/wan: store custom prompt lists or config notes
- characters: character profiles, LoRA notes, trigger words
- prompts: text prompt files
- outputs: (legacy) generated outputs; prefer `/mnt/data/videos/processed/*`
- scripts: runnable entry points

## Environment
Edit `env.sh` to change model locations or outputs. It can be sourced per session.

## Notes
- T2V-1.3B is the recommended WAN model for 16GB VRAM.
- 14B models usually require much more VRAM and may OOM on 16GB.
