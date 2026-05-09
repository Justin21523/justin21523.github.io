# 00 — 專案總覽（Overview）

> 本 repo 同時包含 Python 影像處理工具，以及一個 **Web 3D Viewer 子專案**（用 Three.js）。  
> 從教學角度，我們會用「Phase（階段）」的方式逐步擴充 Web Viewer：一次只做一個主題，避免新手一次被太多概念淹沒。
>
> 規則（非常重要）：  
> - **程式碼與註解：英文（English）**  
> - **教學文件：中文（繁體優先）**

---

## 1) 這個 Web Viewer 要做什麼？

我們要做一個「最小但可擴充」的 3D 模型檢視器（Viewer），主要用途是：

- 你把模型檔（例如 `.glb/.gltf/.fbx/.obj/.stl/.ply`）拖進網頁（drag & drop）
- 網頁自動載入模型，並且自動把相機對準模型（auto frame / bounding box）
- 你再拖另一個模型進來，舊模型會被**正確移除並釋放 GPU 資源**（dispose），不會越用越卡

這些能力是後續做「像 Unity 一樣方便操作」的基礎：沒有穩定的載入與資源管理，就很難做出可靠的編輯器工具。

---

## 2) Phase 學習路線（Roadmap）

我們用 Phase（階段）逐步擴充 Web Viewer。你可以把它想成「一邊做一邊學」的教學型專案：每次只新增一個核心能力，並且配套一份超詳細教學文件。

### Phase 2 — Loading（本次）

- Drag & drop 載入 `.glb/.gltf`
- 自動 frame model（bounding box）
- 清理舊模型資源（dispose）

對應文件：`docs/02_phase2_loading.md`

### Phase 3 — Animation（已完成）

- 讀取 glTF 內的動畫
- 用 `AnimationMixer` 播放 / 暫停 / 切換動畫
- 速度控制與快捷鍵（`Space`、`1-9`）

對應文件：`docs/03_phase3_animation.md`

### Phase 4 — Editor-like Controls（已完成）

- Transform gizmo：移動 / 旋轉 / 縮放（`W/E/R`）
- Local/World space toggle（`Q`）
- Frame selection（`F`）

（教學文件：`docs/04_phase4_editor_controls.md`）

### Phase 5 — Selection（已完成）

- 點選選取（Raycaster selection）
- Gizmo 只掛在選到的物件上

（教學文件：`docs/05_phase5_selection.md`）

### Phase 6 — Inspector（已完成）

- Inspector 面板（Position/Rotation/Scale 數值可編輯）

（教學文件：`docs/06_phase6_inspector.md`）

### Phase 7 — Snap & Helpers（已完成）

- Snap（移動/旋轉/縮放吸附）
- Grid/Axes 顯示切換

（教學文件：`docs/07_phase7_snap_and_helpers.md`）

### Phase 8 — Multi-Format Loading（已完成）

這個階段讓載入器不只支援 glTF，也能支援常見格式（不額外加 npm 套件）：

- `.fbx`（FBXLoader）
- `.obj`（OBJLoader，選配 `.mtl`）
- `.stl` / `.ply`（STLLoader / PLYLoader，會包成 Mesh 顯示）

（教學文件：`docs/08_phase8_multi_format_loading.md`）

### Phase 9 — Panels & Scene Tools（規劃）

這個階段會把「更像 Unity」的面板與場景工具補齊（但仍會拆小步做）：

- 更完整的快捷鍵（例如：對齊、更多 reset/對焦模式）
- 可調參數面板（renderer、光源、相機、後處理等）

---

## 3) Web Viewer 專案結構（重要）

Web Viewer 放在 `web/`，並用 Vite 啟動。

- `package.json`：npm scripts 與依賴
- `vite.config.js`：Vite 設定（把 root 指向 `web/`）
- `web/index.html`：頁面與 UI（DOM）
- `web/src/main.js`：入口（建立 scene/camera/renderer，處理 drag & drop）
- `web/src/model_loader.js`：處理多格式載入（`.glb/.gltf/.fbx/.obj/.stl/.ply`）+ 外部資源對應（`LoadingManager.setURLModifier`）
- `web/src/scene_utils.js`：bounding box framing
- `web/src/dispose_utils.js`：釋放 GPU 資源避免 memory leak
- `web/src/animation_controller.js`：動畫控制（Phase 3）
- `web/src/editor_controller.js`：Transform gizmo + hotkeys（Phase 4）
- `web/src/selection_controller.js`：Raycaster selection + highlight（Phase 5）
- `web/src/inspector_controller.js`：Inspector numeric editing（Phase 6）
- `web/src/snap_controller.js`：Transform snapping UI（Phase 7）
- `web/src/scene_helpers_controller.js`：Grid/Axes toggles（Phase 7）

---

## 4) 新手必懂的名詞（中英對照）

以下名詞會在程式碼註解與教學中常出現：

- 場景：`Scene`（Three.js 的 3D 根容器）
- 相機：`PerspectiveCamera`（透視相機，像真實攝影機）
- 渲染器：`WebGLRenderer`（把 3D 畫成畫面，吃 GPU）
- 控制器：`OrbitControls`（滑鼠拖曳旋轉、滾輪縮放）
- 模型載入：`GLTFLoader / FBXLoader / OBJLoader / STLLoader / PLYLoader`（依副檔名選 loader）
- 邊界盒：`Bounding Box` / `Box3`（計算模型範圍、置中）
- 釋放資源：`dispose()`（釋放 WebGL buffer/texture，避免 GPU 記憶體爆）
- Blob URL：`URL.createObjectURL()`（把 File 變成可被 loader 讀的 URL）

---

## 5) 如何驗收（最少步驟）

在 repo root 執行：

```bash
npm install
npm run dev
```

然後打開：

- `http://localhost:5173`

拖一個模型檔（建議先用 `.glb`）到頁面上，應該能看到模型；如果模型有動畫 clips，HUD 會出現動畫面板可以播放/暫停/切換。

> 更細的逐步驗收，請看 `docs/02_phase2_loading.md`。
