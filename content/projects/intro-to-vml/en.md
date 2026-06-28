---
title: "Intro to VML: Visual Machine Learning Primer"
tagline: "A from-scratch visual machine learning curriculum from math foundations to CNNs"
summary: "A progressive visual machine learning teaching project that implements core algorithms from scratch in Jupyter notebooks: covering math foundations, image processing, edge detection and segmentation, feature extraction, classical ML, CNNs and advanced architectures, plus a performance-optimization module and a NumPy/PyTorch training CLI. Emphasizes understanding the fundamentals rather than calling high-level APIs."
role: "Solo developer / curriculum author (personal learning project)"
problem: "Most deep learning tutorials call high-level framework APIs directly, leaving learners unable to grasp how convolution, backpropagation, and feature descriptors actually work, with no coherent path from math foundations to a full CNN."
solution: "Eight progressive modules (m0–m7) of Jupyter notebooks implement algorithms from scratch, mostly in NumPy: m0 math foundations, m1 basic image processing (convolution, filters, histograms, geometric transforms), m2 edges & segmentation (Otsu, Canny), m3 features (Harris, SIFT, HOG), m4 classical ML, m5 CNNs (backprop, Conv2D, pooling, LeNet), m6 advanced architectures (BatchNorm, ResNet block, U-Net), and m7 performance (vectorization, im2col, multiprocessing). A companion vml package and CLI wrap dataset indexing, training, inference, and error analysis, with pytest tests and a Docker deployment template."
outcome: "Built a complete self-study curriculum skeleton of roughly 35 notebooks spanning math to deep learning, plus a runnable training/inference CLI and tests. The project is still in development and not yet officially deployed (deployment files are templates)."
highlights:
  - "Eight progressive modules (m0 math to m7 performance) with ~35 notebooks forming a full learning path"
  - "Core algorithms hand-coded from scratch in NumPy: convolution, backprop, SIFT, HOG, GMM-EM, im2col and more"
  - "Reimplemented classic architectures: LeNet, ResNet block, and U-Net (with forward and backward passes)"
  - "A vml Python package and CLI for dataset indexing, MLP/softmax/CNN training, inference, and error analysis"
  - "Unit tests with pytest covering the training and inference pipelines"
  - "Docker and Nginx deployment templates with a planned portfolio-site publishing path"
challenges:
  - "Deriving and numerically verifying gradients correctly when implementing algorithms from scratch without high-level APIs"
  - "Balancing teaching clarity against performance, later addressing the speed limits of pure Python via vectorization and im2col"
nextSteps:
  - "Finish dockerization and deploy the curriculum site per DEPLOYMENT.md"
  - "Flesh out the README and module docs, and expand topic and exercise coverage"
---
## Overview

Intro to VML is a **personal learning project**: an introductory visual machine learning curriculum centered on Jupyter notebooks, built on the principle of implementing core algorithms from scratch to develop solid low-level understanding rather than calling high-level framework APIs. It is built on Python, NumPy, and PyTorch. (Note: the repository README describes itself as a Vision-Language Model course, but the actual notebook content focuses on foundational vision and machine learning algorithms; this writeup honestly reflects the real content.)

## Curriculum Structure

Content is organized into eight progressive modules: **m0 math foundations**, **m1 basic image processing** (convolution, filters, histograms, geometric transforms), **m2 edges & segmentation** (Otsu, Canny), **m3 features** (Harris corners, SIFT, HOG), **m4 classical ML** (linear/logistic/softmax regression, SVM, K-means, GMM-EM, HOG+SVM classifier), **m5 CNNs** (backprop, fully-connected layers, activations, Conv2D, pooling, LeNet, optimization), **m6 advanced architectures** (BatchNorm, ResNet block, U-Net), and **m7 performance optimization** (Python performance, vectorization, im2col, multiprocessing).

## Engineering

Beyond teaching notebooks, the project includes a `vml` Python package and CLI that wrap dataset indexing/splitting, MLP/softmax/CNN training, inference evaluation, and error analysis, with pytest unit tests over the training and inference modules — showing it is not just courseware but also reusable engineering code.

## Deployment Status

The project ships with Docker and Nginx deployment templates and plans to publish the curriculum as a portfolio site, but per DEPLOYMENT.md it is **not yet deployed and still in development**.
