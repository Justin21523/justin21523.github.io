---
title: "CharaForge T2I Lab"
tagline: "Text-to-Image generation + LoRA fine-tuning lab with a FastAPI backend and a Rea..."
summary: "Text-to-Image generation + LoRA fine-tuning lab with a FastAPI backend and a React frontend."
role: "Independent Developer"
problem: "This field needs review against the README and source code."
solution: "This field needs a reviewed architecture summary based on the detected stack."
highlights:
  - "Code: `/mnt/c/ai_projects/charaforge-T2I-Lab`"
  - "Models: `/mnt/c/ai_models`"
  - "Caches (HF/Torch/pip): `/mnt/c/ai_cache` (never `~/.cache`)"
  - "Datasets: `/mnt/data/datasets/<project_slug>/...`"
challenges:
  - "Add verified engineering challenges."
nextSteps:
  - "Add screenshots, demo material, and a complete case study."
---
Text-to-Image generation + LoRA fine-tuning lab with a FastAPI backend and a React frontend.

This repo follows ~/Desktop/datamodelstructure.md: - Code: /mnt/c/aiprojects/charaforge-T2I-Lab - Models: /mnt/c/aimodels - Caches (HF/Torch/pip): /mnt/c/aicache (never ~/.cache) - Datasets: /mnt/data/datasets/<projectslug>/... - Training runs/outputs: /mnt/data/training/runs/<projectslug>/...

Model folders:  /mnt/c/aimodels/ stable-diffusion/sd15/<name>/modelindex.json stable-diffusion/sdxl/<name>/modelindex.json controlnet/<name>/ lora/.safetensors

bash conda env create -f environment.yml conda activate aienv python scripts/checkaienv.py python -c "import peft,re
