---
title: "3D Animation LoRA Pipeline and Demo Showcase"
tagline: "Turning animation footage into trainable datasets, then packaging the result as a screenshot-ready portfolio demo"
summary: "A LoRA data-engineering and training pipeline for 3D CGI animation footage. It combines frame extraction, instance segmentation, CLIP/HDBSCAN clustering, auto-captioning, pose data, LoRA/ControlNet training, and evaluation, then adds an anonymized demo site, screenshots, recording, and README so reviewers can understand the project quickly."
role: "Solo developer: pipeline architecture, demo packaging, test verification, portfolio media, and documentation"
problem: "Raw animation footage is not directly usable for LoRA training. A usable dataset requires frame extraction, dedupe, segmentation, clustering, captions, pose data, and evaluation reports; if the project only exposes CLI commands and folders, reviewers cannot quickly understand its product value."
solution: "I built a config-driven multi-stage Python pipeline that separates video preprocessing, visual segmentation, embedding clustering, dataset assembly, training, and evaluation into rerunnable stages. I also added a CPU-safe stub demo, static showcase website, anonymized sample data, product-style result cards, screenshots, and a walkthrough video so the project can be reviewed publicly without private media or GPU weights."
outcome: "Delivered a public demo version: the GitHub Pages site hosts an interactive showcase, the portfolio detail page includes a full media gallery with screenshots, recording, GitHub, README, and live demo links, and the demo tests verify manifest and media assets. The static site can also be deployed through Docker/Nginx."
highlights:
  - "Uses anonymized sample data to demonstrate pipeline outputs without exposing source material or character names"
  - "Complete portfolio media package: cover, desktop screenshots, mobile screenshot, results screenshot, and MP4 walkthrough"
  - "Stage manifest shows frame extraction, dedupe, segmentation, pose data, embeddings, training data, and generated outputs"
  - "Demo-safe tests run in CPU-only environments without private videos or large model weights"
  - "Static demo deploys to GitHub Pages and can also be packaged with Docker/Nginx"
  - "README and portfolio page explain stack, architecture, startup commands, and interview walkthrough flow"
challenges:
  - "Converting a research-style pipeline into a product-style demo that reviewers can understand quickly"
  - "Anonymizing public materials so the page does not reveal character names or private source context"
  - "Designing a CPU-safe demo path for a workflow that normally depends on GPU models and large media files"
nextSteps:
  - "Add more anonymized demo scenarios, such as data-quality review, training-config comparison, and checkpoint evaluation"
  - "Automate the recording script so the demo video can be regenerated after UI changes"
  - "Unify the 2D and 3D training pipelines behind a single showcase dashboard"
---
## Overview

This project started as a research-style 3D animation LoRA data pipeline. Its core goal is to turn long-form animation footage into trainable character datasets, then connect those datasets to LoRA, ControlNet, and video-generation workflows. The latest version also adds the outer layer needed for interviews: anonymized data, screenshot-ready pages, demo recording, public website, and a clear README.

## Architecture and data flow

The data flow is organized around a stage-based orchestrator: frame extraction, perceptual dedupe, detection/tracking, foreground/background segmentation, pose conditioning data, embedding index, LoRA dataset, ControlNet dataset, inference samples, and animation export. Each stage writes metadata and artifacts; the demo manifest then turns those outputs into frontend-readable showcase data.

## Demo strategy

The public demo does not use private footage or named characters. Instead, it uses anonymized sample data to simulate production outputs. The site first communicates the pipeline value proposition, then uses a product results section to show a character sheet, before/after panel, training metrics, evaluation matrix, and animation strip. The portfolio detail page integrates the cover, screenshots, and MP4 walkthrough so the project reads like a complete product case study instead of only a README.

## Engineering focus

The project includes a Python CLI, pytest smoke tests, Docker/Nginx static deployment, GitHub Pages publishing, and media asset packaging. For reviewers, the important point is not just the AI terminology; it is how the data workflow, training flow, frontend demo, documentation, and deployment are tied together into a credible portfolio project.
