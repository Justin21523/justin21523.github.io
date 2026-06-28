---
title: "AI 3D Studio — 統一多後端的 image-to-3D 生成與 Blender 整合框架"
tagline: "把單張影像變成可進 Blender、可條件化影片的 3D 資產管線"
summary: "一套以生產為導向的開源 Python 框架，將 TripoSR、SF3D、TRELLIS、Hunyuan3D 等多個 image-to-3D 模型統一在單一介面後，並串接背景去除、網格清理、UV 展開、格式轉換、headless Blender 轉台渲染與 ComfyUI 影片工作流，形成從原始影像到影片條件化資料包的完整 11 階段管線。"
role: "獨立開發者 / 系統架構與實作"
problem: "市面上的 image-to-3D 模型（TripoSR、SF3D、TRELLIS、Hunyuan3D、InstantMesh、CRM 等）各有不同的環境需求、模型載入方式與輸出格式，要在實際專案中使用必須為每個後端重寫環境設定、推論呼叫、格式轉換與下游整合的樣板程式，缺乏一致介面，也難以做批次與可重現的資產生成。"
solution: "設計以抽象基底類別 BaseBackend 為核心的後端註冊機制，每個 3D 模型只需實作 generate / check_availability / estimate_requirements / export_metadata 四個方法即可加入；資料流全程使用 Pydantic v2 型別模型並以 YAML 持久化，所有檔案路徑外部化至 configs/paths.yaml。前處理（rembg 去背、品質檢查）、後處理（trimesh 清網格、xatlas UV 展開、GLB/OBJ/FBX/PLY 轉換）、headless Blender 轉台與深度/法線/遮罩渲染、影片條件化資料包輸出，以及純 HTTP 的 ComfyUI 客戶端，全部由 11 階段 GenerationPipeline 串接，每階段寫出 manifest 以支援重現與續跑。"
outcome: "M1 里程碑完成：TripoSR 與 SF3D 兩個後端完整實作，Blender 子程序橋接、ComfyUI HTTP 客戶端、影片條件化資料包與 11 階段管線皆可運作，並以 pytest 建立單元測試套件（涵蓋 backends、blender、comfyui、pipeline、postprocessors 等模組）。TRELLIS、Hunyuan3D 等後端已建立 scaffold，等待 M2 完成完整推論。"
highlights:
  - "以 BaseBackend ABC 與 BackendRegistry 達成「新增一個檔案即新增一個後端」的可擴充架構"
  - "11 階段 GenerationPipeline 每階段輸出 manifest，支援可重現與續跑"
  - "Blender 以子程序隔離執行，透過 JSON spec 檔與 AI3D_RESULT: stdout 標記通訊，避免 bpy 汙染主程序"
  - "全程 Pydantic v2 型別化資料流，路徑全部外部化至 paths.yaml，無硬編碼路徑"
  - "輸出 rgb/depth/normal/mask 影片條件化資料包，可餵給 CogVideoX、Wan2.1、LTX-Video 等 I2V 工作流"
  - "純 HTTP 的 ComfyUI 客戶端，不需安裝 ComfyUI Python 套件即可填模板、提交與下載結果"
challenges:
  - "在 bpy 與 PyTorch 之間做進程隔離，避免 Blender 嵌入式 Python 與推論環境的相依衝突"
  - "為 VRAM 需求從 4GB 到 24GB 不等的多種後端設計一致的能力宣告與選擇規則"
  - "讓不同後端的異質輸出（純網格、PBR GLB、3DGS .ply）在同一後處理與渲染管線中正規化"
nextSteps:
  - "M2：完成 TRELLIS、Hunyuan3D、InstantMesh、CRM 的完整推論與 UV 貼圖烘焙"
  - "M3：Wonder3D 與 Mesh2Splat、完整 3DGS 管線、EXR 深度序列與相機運動預設"
  - "M4：FastAPI 服務層、非同步批次處理與基準效能文件"
---
## 概述

AI 3D Studio 是一套以生產為導向的開源 Python 框架，目標是把「單張影像 → 可用 3D 資產 → 影片條件化素材」這條鏈路收斂成一個可安裝的套件。它將多個最先進的 image-to-3D 生成後端統一在同一介面之後，並把前處理、後處理、Blender 渲染與 ComfyUI 編排串成一條完整管線。

## 架構設計

核心是一個以抽象基底類別 `BaseBackend` 為合約的後端註冊系統：每個 3D 模型（TripoSR、SF3D、TRELLIS、Hunyuan3D、InstantMesh、CRM、Wonder3D、Mesh2Splat）都實作 `generate`、`check_availability`、`estimate_requirements`、`export_metadata`，新增後端只需新增一個檔案。所有資料流經 Pydantic v2 型別模型，並透過 `write_model` / `read_model` 做 YAML I/O；模型權重採惰性載入，可在不載入的情況下檢查可用性。

## 管線與整合

11 階段的 `GenerationPipeline` 串接背景去除（rembg）、品質檢查、後端推論、網格清理（trimesh）、UV 展開（xatlas）、格式轉換（GLB/OBJ/FBX/PLY），再進入 headless Blender 進行轉台 RGB、深度、法線與遮罩渲染，最後打包成含 `pack_manifest.yaml` 的影片條件化資料包，餵給 ComfyUI 的 I2V 工作流。每個階段都寫出 manifest，支援重現與續跑。

## 工程取捨

Blender 以子程序隔離執行，透過 JSON spec 檔與 `AI3D_RESULT:` stdout 標記與主程序通訊，避免 `bpy` 嵌入式環境與 PyTorch 推論環境衝突；ComfyUI 整合刻意採用純 HTTP 客戶端，不依賴 ComfyUI 的 Python 套件。所有檔案路徑外部化至 `configs/paths.yaml`，避免硬編碼，方便在不同機器與 GPU 配置間遷移。

## 現況

目前完成 M1 里程碑：SF3D 與 TripoSR 兩個後端完整可用，Blender 橋接、ComfyUI 客戶端、影片資料包與管線皆已運作，並有 pytest 單元測試覆蓋主要模組；TRELLIS、Hunyuan3D 等後端已建立 scaffold，待後續里程碑補上完整推論。
