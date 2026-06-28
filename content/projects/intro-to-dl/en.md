---
title: "Deep Learning Hands-On Tutorial Series"
tagline: "A personal, hands-on notebook curriculum from DL fundamentals to LLMs and generative AI"
summary: "A systematic self-study deep learning project of nearly 40 Jupyter notebooks across 15 modules, built around NTU Hung-yi Lee's ML/GenAI courses. It covers CNNs, Transformers, BERT, LLM fine-tuning, RAG, AI agents, diffusion and RLHF through model compression, all implemented in PyTorch and optimized for an RTX 5080 16GB setup."
role: "Independent learner and author (designed the learning roadmap, implemented notebooks, curated papers and examples)"
problem: "Modern deep learning is vast and fast-moving, with no clear path from mathematical foundations and classic models to the latest LLM and generative-AI techniques, and scattered materials are hard to actually run hands-on on a limited GPU."
solution: "Organized 15 topic modules by model family (foundations, supervised learning, CV, sequence modeling, language models, generative models, graph learning, robustness, transfer, RL, AI agents, advanced LLM, multimodal, etc.), each mapped to Hung-yi Lee course assignments and seminal papers, and implemented step by step in PyTorch with setup, learning-order and VRAM guidance."
outcome: "Produced nearly 40 runnable notebooks spanning MLPs, ResNet and Transformers through LoRA fine-tuning, RAG, diffusion, RLHF, model editing and model merging, forming a reusable personal learning and teaching resource that is still being expanded."
highlights:
  - "15 modules and ~40 notebooks systematically covering core modern DL techniques"
  - "Mapped to Hung-yi Lee ML 2021/2025 and GenAI 2025 assignments and original papers"
  - "Includes 2025-era topics: LLM fine-tuning (LoRA/QLoRA), RAG, AI agents, model editing and merging"
  - "Optimized for RTX 5080 16GB: mixed precision, gradient accumulation, 4-bit quantization"
  - "Provides beginner, advanced and LLM-focused suggested learning tracks"
  - "Covers robustness and safety topics: XAI, adversarial attacks, LLM safety"
challenges:
  - "Running LLM fine-tuning and diffusion workloads within a 16GB VRAM budget required quantization and gradient-accumulation techniques"
  - "Integrating multi-year, multi-course assignments with paper context while keeping concepts coherent across modules"
nextSteps:
  - "Complete still-planned modules and unify the older and newer notebook directory layout"
  - "Package the tutorials and deploy a browsable online version via Docker"
  - "Track emerging LLM and multimodal techniques and add corresponding implementations"
---
This is a self-study-oriented, systematic deep learning tutorial project whose goal is to walk through the entire building of modern deep learning and implement it hands-on in PyTorch. It integrates content from NTU professor Hung-yi Lee's ML 2021, ML 2025 and GenAI-ML 2025 courses, distilling a sprawling field into a clear learning roadmap and a modular collection of Jupyter notebooks.

The material is split into 15 modules by model family. Starting from Foundations (math and PyTorch basics), it moves through supervised learning, computer vision (CNNs), sequence modeling (RNN/LSTM, attention, Transformers) and language models (BERT, LLM fine-tuning, inference), then extends to generative models (autoencoder/VAE, GAN, diffusion), graph learning (GNNs), robustness and security (XAI, adversarial attacks, LLM safety), transfer and adaptation, reinforcement learning (policy gradient, RLHF/DPO), and on to AI agents (RAG, ReAct, tool use), advanced LLM topics (model editing, model merging) and multimodal (speech generation). Each notebook is annotated with its corresponding course assignment and the seminal papers it draws on.

On the engineering side the project is tuned for a 32-thread CPU plus RTX 5080 16GB VRAM environment, using CUDA, mixed-precision training, torch.compile, 4-bit quantization (QLoRA) and gradient accumulation so that large-model tasks can actually run on a consumer GPU, with per-notebook VRAM requirements documented.

It also lays out beginner, advanced and LLM-focused learning tracks so users can progress by interest and level. This is an evolving personal learning and teaching resource: some newer modules are still being filled in, and there are plans to package it with Docker and deploy a browsable online version.
