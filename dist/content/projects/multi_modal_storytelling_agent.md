# Multi-Modal Storytelling Agent

An AI-powered system that transforms a single sentence story into a ~10 second animated video through multiple specialized agents.

## Overview

The Multi-Modal Storytelling Agent is designed to take a text input (e.g., "Elio fights alien pirates in space harbor") and automatically generate a complete short animated video including:

- Script generation
- Storyboard creation
- Image generation per scene
- Animation synthesis
- Audio generation (TTS + SFX)
- Video editing and composition

## Architecture

The system follows a multi-agent architecture:

- **Script Agent**: Expands one-sentence input into full script
- **Storyboard Agent**: Breaks script into scenes with camera directions
- **Prompt Engineer Agent**: Generates image/video prompts with LoRA support
- **Diffusion Agent**: Creates keyframes and animations
- **TTS Agent**: Generates voiceovers and sound effects
- **Video Editor Agent**: Composes final video

## Prerequisites

- Python 3.11+
- NVIDIA GPU with 16GB VRAM (RTX 5080 recommended)
- Poetry for dependency management

## Installation

1. Clone the repository
2. Install dependencies: `poetry install`
3. Copy `.env.example` to `.env` and fill in your API keys
4. Run: `poetry run start`

## Usage

```bash
# Generate a story video
poetry run generate-story --input "Elio fights alien pirates in space harbor"