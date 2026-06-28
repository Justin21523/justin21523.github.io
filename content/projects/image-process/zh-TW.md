---
title: "瀏覽器 3D 模型檢視與編輯器"
tagline: "Three.js 打造的多格式 3D 模型檢視 / 編輯前端"
summary: "以 Vite 與 Three.js 打造的純前端 3D 模型工具，支援拖放載入 glb/gltf/fbx/obj/stl/ply 六種格式，並提供類 Unity 的編輯體驗：軌道相機、變換 Gizmo（移動/旋轉/縮放）、點選、數值檢視器、吸附與動畫播放。模組化控制器架構、無重型 UI 框架，附 GPU 記憶體釋放與 Docker/Nginx 部署。"
role: "前端 / WebGL 工程（個人專案）"
problem: "快速檢視與微調來自不同管線的 3D 模型常需開啟笨重的桌面軟體；缺少一個輕量、可拖放、跨格式且能直接在瀏覽器內調整與檢視動畫的工具。"
solution: "以 Three.js 封裝六種模型載入器與資源解析（含 OBJ 的 MTL 材質），並把編輯能力拆成獨立控制器：EditorController（TransformControls Gizmo）、SelectionController（Raycaster 點選）、InspectorController（數值編輯）、SnapController（吸附）、AnimationController（AnimationMixer），以 Vite 提供開發伺服器與建置。"
outcome: "完成可部署的單頁 WebGL 應用，支援拖放即載入多格式模型、即時變換編輯、吸附、動畫播放與輔助線切換；已以 Docker/Nginx 部署。"
highlights:
  - "拖放載入 glb/gltf/fbx/obj/stl/ply 六種格式，並自動解析外部貼圖與 .mtl 材質"
  - "TransformControls Gizmo 配 W/E/R 熱鍵與 local/world 空間切換，操作邏輯貼近 Unity"
  - "Raycaster 點選子網格 + 數值檢視器即時編輯 position/rotation/scale"
  - "平移/旋轉/縮放三種獨立吸附參數，提升精準擺放"
  - "模組化控制器架構，動畫播放支援多 clip 切換與速度調整"
  - "內建 disposeObject3D 釋放幾何與材質，避免換模型時的 GPU 記憶體洩漏"
challenges:
  - "在純瀏覽器拖放情境下，重建 glTF/OBJ 對外部 buffer 與貼圖的相對路徑解析"
  - "多個控制器共用同一相機、渲染器與選取狀態時的事件協調（拖曳 Gizmo 時停用軌道相機）"
  - "換模型時正確釋放 WebGL 資源以避免長時間使用的記憶體累積"
nextSteps:
  - "加入後處理與 HDR 環境光照以提升材質呈現"
  - "支援匯出編輯後的場景或變換結果"
  - "新增行動裝置觸控操作與多選/群組編輯"
---
## 專案概述
這是 `image-process` 倉庫中的瀏覽器前端工具——一個以 **Vite + Three.js** 建構的純前端 3D 模型檢視與編輯器。雖然倉庫整體包含 Python 影像／影格與 LoRA/SDXL 相關管線，但此 Vite 應用（web/，即實際部署的網站）專注於在瀏覽器內檢視與微調 3D 模型。

## 功能與架構
使用者可直接將模型檔拖放進視窗，model_loader.js 依副檔名選用對應載入器，支援 **glb、gltf、fbx、obj、stl、ply** 六種格式，並會嘗試解析 OBJ 的 .mtl 材質與外部貼圖資源。介面採模組化控制器設計：EditorController 提供 TransformControls 變換 Gizmo，SelectionController 以 Raycaster 點選子物件，InspectorController 提供數值化的位置/旋轉/縮放編輯，SnapController 提供三種吸附，AnimationController 以 AnimationMixer 播放骨骼動畫並支援多 clip 與速度調整，SceneHelpersController 切換 Grid/Axes 輔助線。

## 工程細節
專案刻意不使用重型 UI 框架，HUD 以原生 HTML/CSS 構成，所有 3D 邏輯以 ES Modules 組織。dispose_utils.js 在替換模型時釋放幾何與材質以防 GPU 記憶體洩漏；scene_utils.js 依模型包圍盒自動框景相機。原始碼帶有大量教學式註解。

## 部署
Vite 設定以 web/ 為 root、輸出至 dist/ 並產生 source map；專案透過 Docker/Nginx 容器化部署。
