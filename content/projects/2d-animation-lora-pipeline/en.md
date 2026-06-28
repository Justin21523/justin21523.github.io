---
title: "2D Animation Character LoRA Training Pipeline"
tagline: "A 2D animation LoRA data pipeline packaged as a screenshot-ready, recordable portfolio demo"
summary: "A data engineering and training pipeline for 2D animation character LoRAs. It covers frame extraction, YOLO/ByteTrack multi-character tracking, ToonOut-style segmentation, identity clustering, DWpose conditioning, captioned datasets, LoRA training configs, and a public mock-safe demo."
role: "Solo developer: pipeline architecture, 2D demo packaging, test verification, GitHub Pages showcase, and portfolio media"
problem: "2D animation LoRA pipelines are hard to show publicly. Real footage, model weights, GPU dependencies, captioning services, and generated artifacts cannot simply be pushed to a portfolio. Reviewers need a version that is easy to understand, screenshot-ready, and honest about what runs publicly versus what requires a local ML workstation."
solution: "I split the project into a real workstation workflow and a public demo layer. The real path keeps YOLO, ToonOut, DWpose, HDBSCAN, kohya/diffusers, and local model/data warehouses. The public path adds a static mock-safe demo with deterministic synthetic assets: stage dashboard, character dataset sheet, frame-to-sample transformation, training metrics, evaluation matrix, motion strip, screenshots, and a WebM walkthrough."
outcome: "Delivered a public showcase version: the GitHub Pages demo site presents the product-style review flow, the main portfolio page includes cover art, screenshots, video, GitHub, and README links, and the repo verifies the demo with a generator, CPU-safe pytest smoke suite, static HTTP checks, and Docker/Nginx build."
highlights:
  - "First viewport shows the product itself: pipeline readiness, stage metrics, synthetic character sheet, and demo results"
  - "Mock-safe demo mode runs without API keys, model weights, private footage, or GPU access"
  - "2D pipeline focus: YOLO/ByteTrack tracking, ToonOut-style masks, HDBSCAN identity merging, and DWpose conditioning"
  - "README includes Mermaid architecture, data flow, deployment, module organization, tech stack, and interview walkthrough diagrams"
  - "Portfolio media package: cover, desktop screenshot, mobile screenshot, results screenshot, and WebM walkthrough"
challenges:
  - "The public demo needed a clear boundary between static mock-safe presentation and full GPU/model execution"
  - "The original repo includes many research and batch scripts, so the review path had to be narrowed into stable commands and evidence"
nextSteps:
  - "Add more anonymous demo scenarios such as quality review, cluster review, and checkpoint comparison"
  - "Publish more aggregate metrics from real training runs without exposing private media or model artifacts"
---
## Overview

This project is an end-to-end data and training pipeline for 2D animation character LoRAs. It turns video footage into reproducible training artifacts: frames, character detections and tracks, foreground masks, identity clusters, pose conditioning data, captions, and LoRA training configs.

## Demo Strategy

The public demo does not use private footage or named characters. It uses synthetic 2D characters to simulate production outputs. The first screen shows a pipeline dashboard, stage readiness, character dataset sheet, and result metrics; later sections show transformation visuals, training metrics, evaluation matrix, motion strip, screenshots, and the demo video.

## Architecture

The backend is not a hosted service. It is a Python CLI and file-based artifact pipeline. `anime_pipeline/` contains the core modules, `configs/` owns global/stage/project configuration, `portfolio-web/` is the GitHub Pages static showcase, and `tests/` provides CPU-safe smoke tests. The public page only fetches a static manifest JSON; real LoRA training still requires a local GPU, model warehouse, and dataset warehouse.

## Interview Focus

The value of this project is not only the AI vocabulary. It shows how to turn a GPU-heavy, media-heavy research pipeline into a public, testable, deployable, and understandable portfolio project.
