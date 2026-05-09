# Self-Improving Coding Agent

A local coding assistant that can read entire repositories using RAG + local LLMs. Capabilities include:

- Understand architecture
- Answer code questions
- Search relevant files
- Explain functions
- Find bugs
- Generate patch diffs
- Apply patches
- Write unit tests
- Refactor code (including updating imports)
- Generate Conventional Commits messages

## Features

- Local-first design with no remote dependencies
- RAG-powered repository analysis
- Multiple specialized agents (Scanner, RAG, Explainer, Debug, Refactor, Test Generator, Git)
- CLI and API interfaces
- Comprehensive testing framework

## Requirements

- Python 3.10+
- PyTorch 2.7.1 + CUDA 12.8
- Local models stored in `/mnt/c/ai_models/`

## Installation

```bash
# Create conda environment
conda create -n ai_env python=3.10
conda activate ai_env

# Install poetry and dependencies
pip install poetry
poetry install

# Copy example config and adjust as needed
cp .env.example .env