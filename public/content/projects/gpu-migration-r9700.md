# GPU Migration Workspace — AMD Radeon AI PRO R9700

## Purpose

This workspace manages the staged, safe migration from an NVIDIA GeForce RTX 5080
to an AMD Radeon AI PRO R9700 (RDNA 4).

The goal is a **parallel environment strategy**: AMD/ROCm is added alongside the
existing NVIDIA/CUDA stack. Nothing from the current NVIDIA environment is removed
or damaged. At any point you can reinsert the RTX 5080 and resume CUDA workloads.

---

## CUDA Preservation Guarantee

> **The existing NVIDIA/CUDA environment will not be touched.**

- NVIDIA driver 590.48.01 remains installed.
- CUDA 12.0 toolkit packages remain installed.
- All existing conda environments (comfyui, kohya_ss, animatediff_xl, ai_env,
  audio_env, data_env, diffsinger_env, riganything, storyline, svc_env,
  textgen_env) are protected. None will be modified.
- `/mnt/c/ai_models`, `/mnt/c/ai_tools`, `/mnt/c/ai_projects`, and all user
  data directories are treated as read-only protected assets.

See `CUDA_PRESERVATION_POLICY.md` for the full forbidden-commands list.

---

## Parallel ROCm Strategy

ROCm is installed into `/opt/rocm` — a completely separate path from NVIDIA.
Six new conda environments are created with the `rocm-*-r9700` naming convention.
These environments install PyTorch ROCm wheels, which are distinct packages from
PyTorch CUDA wheels. They do not share environments or conflict at the system level.

| CUDA Environment | ROCm Counterpart |
|---|---|
| comfyui | rocm-comfyui-r9700 |
| kohya_ss | rocm-lora-r9700 |
| ai_env | rocm-pytorch-r9700 |
| (diffusers work) | rocm-diffusers-r9700 |
| (llama.cpp) | rocm-llamacpp-r9700 |
| (video gen) | rocm-video-r9700 |

See `SWITCHING_GUIDE.md` to learn how to switch between GPU stacks at runtime.

---

## Phase System

| Phase | When | Action | Scripts |
|---|---|---|---|
| **0** | Before GPU swap | Read-only system audit | 00, 01, 02 |
| **1** | Before GPU swap | Workspace preparation | 03 |
| **2** | Day of swap | Physical GPU swap checklist | (manual) |
| **3** | After first boot | Verify R9700 detected by kernel | (manual) |
| **4** | After verification | Install AMDGPU + ROCm | (requires approval) |
| **5** | After ROCm | Create ROCm conda environments | 04 |
| **6** | After Phase 5 | Set up ComfyUI ROCm workspace | 05 |
| **7** | After Phase 4 | Build llama.cpp with HIP | 06, 07 |
| **8** | After Phase 7 | Configure OpenClaw + llama.cpp | 09, 10 |
| **9** | After Phase 8 | Full stack validation | 08, 11 |

**Current phase: 0** — The workspace has been created. You are ready to run
Phase 0 audits.

---

## Safety Policy

- Phases 0–1: completely non-destructive (read-only or mkdir only).
- Scripts 00, 01, 02, 08, 11 are read-only and safe to run at any time.
- Script 03 creates folders only.
- Scripts 04–07, 09–10 **require explicit approval** before execution.
- Any command using `sudo apt purge`, `rm -rf`, `conda remove` on existing
  environments, or `systemctl` changes requires explicit user confirmation.
- See `CUDA_PRESERVATION_POLICY.md` for the complete forbidden-commands list.

---

## Directory Layout

```
gpu-migration-r9700/
├── README.md                    This file
├── MIGRATION_PLAN.md            Full 9-phase plan with commands
├── CUDA_PRESERVATION_POLICY.md  Forbidden commands and protected paths
├── ROCM_POST_SWAP_SOP.md        BIOS + first-boot checklist after swap
├── COMFYUI_ROCM_PLAN.md         ComfyUI ROCm workspace setup plan
├── LLAMACPP_OPENCLAW_PLAN.md    llama.cpp + OpenClaw architecture and setup
├── SWITCHING_GUIDE.md           How to switch between CUDA and ROCm envs
├── configs/
│   ├── rocm_r9700_env.template  Environment variables for ROCm workloads
│   ├── openclaw.llamacpp.json   OpenClaw provider config for llama.cpp
│   ├── rocm_conda_env_plan.yaml Planned ROCm conda environment definitions
│   └── protected_paths.yaml     Protected paths that must not be modified
├── scripts/
│   ├── 00_readonly_system_audit.sh     Phase 0: full system snapshot
│   ├── 01_snapshot_cuda_state.sh       Phase 0: CUDA/NVIDIA snapshot
│   ├── 02_audit_conda_gpu_envs.sh      Phase 0: classify all conda GPU envs
│   ├── 03_prepare_rocm_workspace.sh    Phase 1: create workspace folders
│   ├── 04_create_rocm_conda_envs.sh    Phase 5: create 6 ROCm conda envs
│   ├── 05_setup_comfyui_rocm.sh        Phase 6: clone + symlink ComfyUI ROCm
│   ├── 06_build_llamacpp_rocm.sh       Phase 7: build llama.cpp with HIP
│   ├── 07_start_llamacpp_rocm_server.sh Phase 7: start llama-server
│   ├── 08_test_llamacpp_api.sh         Phase 9: test OpenAI-compatible API
│   ├── 09_setup_openclaw_llamacpp_provider.sh  Phase 8: install provider config
│   ├── 10_start_openclaw_llamacpp_stack.sh     Phase 8: start full stack
│   ├── 11_check_rocm_ai_stack.sh       Phase 9: status check
│   └── 99_stop_openclaw_llamacpp_stack.sh      Stop llama.cpp + OpenClaw
├── reports/                     Output from audit scripts
└── logs/                        Output from build and run scripts
```
