---
title: "Video Generation Lab"
tagline: "Video Generation Lab is a reproducible repository for short-form video generatio..."
summary: "Video Generation Lab is a reproducible repository for short-form video generation research on a single 16 GB GPU. It provides:"
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python 的解決方案。"
highlights:
  - "Diffusers-based pipelines behind a unified Python CLI."
  - "ComfyUI workflow templates plus API helpers."
  - "YAML-driven model presets tuned for practical 16 GB VRAM usage."
  - "Manifest-driven batch pipelines for 2D animation, 3D animation, live-action, image-to-video, and video-to-video runs, including render-farm sharding."
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
Video Generation Lab is a reproducible repository for short-form video generation research on a single 16 GB GPU. It provides:

- Diffusers-based pipelines behind a unified Python CLI. - ComfyUI workflow templates plus API helpers. - YAML-driven model presets tuned for practical 16 GB VRAM usage. - Manifest-driven batch pipelines for 2D animation, 3D animation, live-action, image-to-video, and video-to-video runs, including render-farm sharding. - Reproducible outputs with metadata, environment snapshots, and config snapshots.

The initial baseline is Stable Video Diffusion image-to-video for short clips. The strongest image-to-video paths on this machine are currently the ComfyUI-backed AnimateDiff SDXL reference-image flow and Wan image-to-video flow, while
