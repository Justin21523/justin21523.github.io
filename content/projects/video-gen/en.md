---
title: "video-gen: ROCm Video-Gen Environment Governance Workspace"
tagline: "Agent workspace that audits and consolidates Python environments for an AMD ROCm video-gen toolchain"
summary: "A workspace built on the OpenClaw agent framework whose concrete, working code is a set of Python scripts that inventory pip packages across multiple AMD ROCm virtual environments, compute cross-env overlap and redundancy, and emit a JSON consolidation report. The ComfyUI/LTX-Video/CLIP video-generation capabilities described in the docs are planning notes and external environments, not implemented here — this repo is an early prototype."
role: "Solo project; sole owner of the scripts, environment governance, and documentation"
problem: "To run a video-generation toolchain on an AMD Radeon AI PRO R9700, the author maintained 7+ overlapping ROCm virtual environments (video, comfyui, llamacpp, diffusers, lora, ltx23, etc.), causing duplicated packages, disk bloat, and maintenance overhead with no unified basis for consolidation."
solution: "Python scripts activate each venv, run pip list, aggregate package versions, compute occurrence counts and a redundancy list, and generate a priority-ranked JSON consolidation strategy. An outer OpenClaw agent workspace (AGENTS/SOUL/MEMORY/heartbeat) records GPU and disk status, decisions, and next steps."
outcome: "Produced a repeatable environment-inventory script and a consolidation roadmap document; the project's own notes report substantial package overlap as the basis for a merge order. It remains a prototype: the scripts contain unfixed errors (a variable-name typo and stray full-width characters) that would halt execution, and most video-generation features are described in prose rather than implemented as code."
highlights:
  - "Uses only the Python standard library (subprocess/json/pathlib) to auto-inventory pip packages across several ROCm venvs"
  - "Computes cross-environment package overlap and high-frequency packages, producing a redundancy list"
  - "Auto-generates a priority-based consolidation strategy and JSON report"
  - "Built on the OpenClaw agent framework, logging GPU, disk, and decisions via MEMORY and daily notes"
  - "Targets the real-world governance of an AMD Radeon AI PRO R9700 (ROCm) video-generation toolchain"
challenges:
  - "Limited actually-runnable code; both scripts carry execution-breaking defects (e.g. a package_occurrence variable typo and a full-width comma / CJK token) that need fixing to run"
  - "Docs (MEMORY, reports) describe ComfyUI/LTX-Video/CLIP capabilities and performance figures that are not implemented in this repo — planning must be carefully distinguished from delivered work"
  - "The cross-venv approach of `source activate` + pip list is fragile and depends on each external environment path being correct and activatable"
nextSteps:
  - "Fix the variable-name and full-width-character bugs so the analysis runs end to end and outputs can be validated"
  - "Add the actual video-generation code or clearly mark it as external, so repo contents match the documentation"
  - "Turn the consolidation recommendations into reproducible env export/rebuild scripts (e.g. pinned requirements)"
---
## What this is

Despite its name, a close read of the source shows `video-gen` is best described honestly as a workspace built on the **OpenClaw agent framework** (`AGENTS.md`, `SOUL.md`, `MEMORY.md`, `HEARTBEAT.md`, and a `memory/` journal) whose one piece of executable substance is a set of **ROCm virtual-environment analysis scripts**. The README is essentially empty, so this assessment is grounded in the code and the workspace's own notes.

## What it actually does

`rocm-environment-analysis.py` and `scripts/analyze_rocm_environments.py` step through a configured list of ROCm venvs (rocm-video, comfyui, llamacpp, diffusers, lora, ltx23, etc.), run `source activate && pip list` to collect packages, compute cross-environment overlap and a redundancy rate, identify high-frequency packages, and write a priority-ranked JSON consolidation strategy. The repo also contains a bootstrap-only `venv-rocm` holding just pip/setuptools.

## Plans vs. delivered (kept honest)

`MEMORY.md` and the files under `reports/` narrate LTX-Video, ComfyUI workflows, CLIP semantic search, video-quality assessment, and a battery of performance numbers — but none of that is implemented in this repository. They are agent-generated planning/narrative documents, and the referenced video-generation capabilities live in external environments under `~/`. The verifiable scope here is the environment-audit tooling only.

## Status

Early prototype. The two scripts are near-duplicates and contain a `NameError`-class typo plus stray full-width characters that would break execution before fixing. Overall it is a personalized agent workspace for governing several ROCm Python environments around an AMD Radeon AI PRO R9700 video-generation toolchain.
