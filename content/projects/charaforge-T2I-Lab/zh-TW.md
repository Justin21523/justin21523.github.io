---
title: "CharaForge T2I Lab"
tagline: "Text-to-Image generation + LoRA fine-tuning lab with a FastAPI backend and a Rea..."
summary: "Text-to-Image generation + LoRA fine-tuning lab with a FastAPI backend and a React frontend."
role: "獨立開發者"
problem: "此欄位需要依 README 與實際程式碼人工確認。"
solution: "此欄位需要依 實際技術棧 與系統架構人工補寫。"
highlights:
  - "Code: `/mnt/c/ai_projects/charaforge-T2I-Lab`"
  - "Models: `/mnt/c/ai_models`"
  - "Caches (HF/Torch/pip): `/mnt/c/ai_cache` (never `~/.cache`)"
  - "Datasets: `/mnt/data/datasets/<project_slug>/...`"
challenges:
  - "需要補充真實技術挑戰。"
nextSteps:
  - "補齊截圖、Demo 與完整案例研究。"
---
Text-to-Image generation + LoRA fine-tuning lab with a FastAPI backend and a React frontend.

This repo follows ~/Desktop/datamodelstructure.md: - Code: /mnt/c/aiprojects/charaforge-T2I-Lab - Models: /mnt/c/aimodels - Caches (HF/Torch/pip): /mnt/c/aicache (never ~/.cache) - Datasets: /mnt/data/datasets/<projectslug>/... - Training runs/outputs: /mnt/data/training/runs/<projectslug>/...

Model folders:  /mnt/c/aimodels/ stable-diffusion/sd15/<name>/modelindex.json stable-diffusion/sdxl/<name>/modelindex.json controlnet/<name>/ lora/.safetensors

bash conda env create -f environment.yml conda activate aienv python scripts/checkaienv.py python -c "import peft,re
