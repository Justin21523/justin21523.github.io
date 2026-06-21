---
title: "AI 3D Studio"
tagline: "A production-oriented, open-source system for image-to-3D generation, 3D asset p..."
summary: "A production-oriented, open-source system for image-to-3D generation, 3D asset post-processing, Blender integration, ComfyUI workflow orchestration, and video-g..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python, FastAPI 的解決方案。"
highlights:
  - "包含完整原始碼"
  - "採用現代技術架構開發"
  - "支援響應式網頁介面"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
A production-oriented, open-source system for image-to-3D generation, 3D asset post-processing, Blender integration, ComfyUI workflow orchestration, and video-generation downstream conditioning.

AI 3D Studio unifies multiple state-of-the-art 3D generation backends behind a single consistent interface, with a full processing pipeline from raw image to video-ready conditioning pack.

Input Image │ ├── Background removal (rembg) ├── Quality check │ ▼ 3D Generation Backend (TripoSR / SF3D / TRELLIS / Hunyuan3D / ...) │ ├── Mesh cleanup (trimesh) ├── UV unwrapping (xatlas) ├── Format conversion (GLB / OBJ / FBX / PLY) │ ▼ Blender (headless) ├── Turntable render (RGB) ├── Depth pass ├── Normal pass └──
