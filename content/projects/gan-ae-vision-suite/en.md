---
title: "GAN-AE Vision Suite"
tagline: "End-to-end toolkit for training, sampling, and evaluating GANs and autoencoders"
summary: "A PyTorch-centric generative-modeling toolkit that unifies training, sampling, and evaluation for GANs (DCGAN / WGAN-GP / ResNet-SNGAN) and autoencoders (AE / VAE). It ships YAML-driven training scripts, FID/KID/PSNR/SSIM metrics, a FastAPI inference service, and a React control console that loads checkpoints and renders sample grids. It is a learning- and experiment-oriented prototype, not yet deployed."
role: "Solo developer: model implementations, training/evaluation pipelines, backend API, and frontend UI."
problem: "Generative-model experiments tend to scatter across ad-hoc notebooks and scripts, making them hard to reproduce, compare, and operate, with no unified way to manage configs across resolutions and datasets."
solution: "A config-first package that abstracts GAN and AE/VAE models, losses, metrics, and data loading into modules with all hyperparameters in YAML; CLI scripts for training/sampling/evaluation; a FastAPI service exposing checkpoint-load and grid-generation endpoints; and a React + Vite console plus a Gradio UI for operation."
outcome: "A working minimal inference API and frontend supporting several GAN architectures (DCGAN, WGAN-GP, ResNet-SNGAN) and AE/VAE training, with FID/KID/PSNR/SSIM evaluation plus EMA and DiffAugment, backed by pytest tests and a Docker (static-page) config. Still a prototype, with some advanced scripts left as placeholders."
highlights:
  - "Multiple GAN architectures: DCGAN, WGAN-GP (gradient penalty), and a ResNet SNGAN (spectral norm + GroupNorm), all emitting tanh [-1,1] images"
  - "Full AE/VAE family: convolutional AE, ConvAE, a fixed VAE and a configurable ConvVAE with reparameterization and KL loss"
  - "Evaluation and stabilization tooling: torchmetrics FID/KID, PSNR/SSIM, generator EMA, and DiffAugment differentiable augmentation"
  - "Config-first design: YAML manages datasets (MNIST / CelebA / Anime Faces) and training hyperparameters, with a key-compatibility layer"
  - "FastAPI backend + React/Vite console + Gradio UI: load checkpoints, set seed/count, and generate sample grids"
  - "Local workflow: an in-memory job manager runs training via subprocess, plus run scanning (meta/metrics), a file browser, and a config editor"
challenges:
  - "Staying usable across mismatched torch/torchvision versions: lazy imports, a pure-torch make_grid, and FID/KID gracefully degrading to no-ops when dependencies are missing"
  - "Memory and stability for high-resolution (256/512px) training on 16GB VRAM, mitigated with GroupNorm, mixed precision, batch-size tuning, and R1/DiffAugment"
nextSteps:
  - "Fill in the currently-placeholder advanced scripts (model compression/pruning/quantization, online learning, fairness reports) and their tests"
  - "Actually containerize and deploy the inference service (Docker currently serves only a static portfolio page; DEPLOYMENT marks it not yet deployed)"
  - "Flesh out the trainer abstraction (trainers.py is still a placeholder) and adopt a Celery/Redis job queue for multi-task scheduling"
---
## Overview

GAN-AE Vision Suite is a PyTorch-centric research-and-engineering project that consolidates scattered generative-model experiments (GANs and autoencoders) into a modular, reproducible, operable toolchain. The `src/` package spans models, losses, metrics, data loading, and API/UI entrypoints.

## Models and Training

On the model side it offers several GAN architectures: DCGAN-style generator/discriminator, WGAN-GP (gradient penalty with configurable n_critic), and a stronger ResNet SNGAN (spectral norm with GroupNorm, suited to small-batch high-resolution training). Autoencoders include a convolutional AE, ConvAE, and two VAEs (fixed and configurable) implementing reparameterization and KL loss. Training includes generator EMA, DiffAugment differentiable augmentation, and hinge/BCE/WGAN-GP losses.

## Evaluation and Data

Evaluation uses torchmetrics for FID/KID alongside PSNR/SSIM and LPIPS image-quality metrics. Data is YAML-driven, supporting MNIST, CelebA, and several Anime Faces datasets (including a CC0 demo and HQ 512), with data-quality checks and split lists for reproducibility.

## Services and Interfaces

The backend exposes minimal FastAPI endpoints (load checkpoint, generate sample grid), paired with a React 19 + Vite console (Sampler, Train GAN/AE, Data Tools, Eval, Runs, Configs tabs) and a Gradio UI. Locally, an in-memory job manager runs training tasks via subprocess and scans run outputs.

## Status

The project is a learning- and experiment-oriented prototype: the core inference/sampling path works and has pytest coverage, but some advanced scripts (compression, online learning, fairness reports) remain placeholders, and the inference service is not yet containerized for deployment.
