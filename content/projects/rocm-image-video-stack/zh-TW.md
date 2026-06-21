---
title: "ROCm Image/Video AI Stack"
tagline: "This project builds a complete AMD ROCm image and video AI pipeline for the Rade..."
summary: "This project builds a complete AMD ROCm image and video AI pipeline for the Radeon AI PRO R9700 (gfx1201, 32GB HBM) running alongside an existing NVIDIA/CUDA st..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於  的解決方案。"
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
This project builds a complete AMD ROCm image and video AI pipeline for the Radeon AI PRO R9700 (gfx1201, 32GB HBM) running alongside an existing NVIDIA/CUDA stack on the same machine.

The stack is parallel and non-destructive: it never modifies, deletes, or overwrites any existing CUDA tools, conda environments, model files, workflows, or project data under /mnt/c.

| Item | Detail | |------|--------| | GPU | AMD Radeon AI PRO R9700 (gfx1201, RDNA4, 64 CUs, 32 GB HBM) | | ROCm | 7.2.3 at /opt/rocm | | PyTorch | 2.5.1+rocm6.2 (upgrade to 2.9+rocm7.2 recommended in Phase 2) | | OS | Ubuntu 24.04 (WSL2) | | Prior GPU | NVIDIA RTX 5080 (
