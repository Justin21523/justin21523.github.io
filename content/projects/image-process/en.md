---
title: "Browser-Based 3D Model Viewer & Editor"
tagline: "A multi-format 3D model viewer/editor built with Three.js"
summary: "A pure front-end 3D model tool built with Vite and Three.js. It loads glb/gltf/fbx/obj/stl/ply via drag-and-drop and offers a Unity-like editing experience: orbit camera, transform gizmo (move/rotate/scale), click-to-select, a numeric inspector, snapping, and animation playback. Built on a modular controller architecture with no heavy UI framework, plus GPU memory disposal and Docker/Nginx deployment."
role: "Front-end / WebGL engineering (personal project)"
problem: "Quickly inspecting and tweaking 3D models from various pipelines usually means launching heavyweight desktop software; there was no lightweight, drag-and-drop, cross-format tool to adjust and preview models (and their animations) directly in the browser."
solution: "Three.js wraps six model loaders plus resource resolution (including MTL materials for OBJ), and editing is split into independent controllers: EditorController (TransformControls gizmo), SelectionController (Raycaster picking), InspectorController (numeric editing), SnapController (snapping), and AnimationController (AnimationMixer), all served and bundled by Vite."
outcome: "A deployable single-page WebGL app that loads multi-format models via drag-and-drop and supports live transform editing, snapping, animation playback, and helper toggles; shipped via Docker/Nginx."
highlights:
  - "Drag-and-drop loading of glb/gltf/fbx/obj/stl/ply, with automatic resolution of external textures and .mtl materials"
  - "TransformControls gizmo with W/E/R hotkeys and local/world space toggling, modeled on a Unity-like workflow"
  - "Raycaster sub-mesh selection plus a numeric inspector for live position/rotation/scale editing"
  - "Independent translate/rotate/scale snapping parameters for precise placement"
  - "Modular controller architecture; animation playback supports multi-clip switching and speed control"
  - "Built-in disposeObject3D frees geometry and materials to prevent GPU memory leaks when swapping models"
challenges:
  - "Reconstructing glTF/OBJ relative paths to external buffers and textures within a browser drag-and-drop context"
  - "Coordinating events across multiple controllers sharing one camera, renderer, and selection state (disabling orbit while dragging the gizmo)"
  - "Properly releasing WebGL resources on model swap to avoid memory buildup over long sessions"
nextSteps:
  - "Add post-processing and HDR environment lighting for better material rendering"
  - "Support exporting the edited scene or transform results"
  - "Add mobile touch controls and multi-select/group editing"
---
## Overview
This is the browser front-end within the `image-process` repository — a pure front-end 3D model viewer and editor built with **Vite + Three.js**. While the repo as a whole includes Python image/frame and LoRA/SDXL pipelines, this Vite app (web/, the site actually deployed) focuses on viewing and fine-tuning 3D models in the browser.

## Features & Architecture
Users drag model files straight into the viewport; model_loader.js selects the right loader by extension, supporting **glb, gltf, fbx, obj, stl, and ply**, and attempts to resolve OBJ .mtl materials and external texture resources. The UI uses a modular controller design: EditorController provides a TransformControls gizmo, SelectionController picks sub-objects via Raycaster, InspectorController offers numeric position/rotation/scale editing, SnapController adds three snapping modes, AnimationController plays skeletal animations through AnimationMixer with multi-clip and speed control, and SceneHelpersController toggles Grid/Axes helpers.

## Engineering Details
The project deliberately avoids any heavy UI framework — the HUD is plain HTML/CSS and all 3D logic is organized as ES Modules. dispose_utils.js releases geometry and materials on model swap to prevent GPU memory leaks, and scene_utils.js auto-frames the camera from the model's bounding box. The source is heavily annotated in a tutorial style.

## Deployment
The Vite config roots at web/, outputs to dist/ with source maps, and the project is containerized via Docker/Nginx.
