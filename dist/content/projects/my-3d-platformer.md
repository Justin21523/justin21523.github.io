# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

你這個目標其實可以做，而且用 TypeScript + React + Three.js（我會強烈建議用 React Three Fiber 來接）會比你想的順，但我先講結論：**真正最容易把人搞瘋的不是渲染，是「角色控制器 + 大世界效能 + 自動測試可重現」這三件事的交集。**如果你把架構一開始就設好，後面會舒服很多；如果沒設好，你會在某一天被「為什麼我今天又穿牆了」氣到懷疑人生。

下面我用「可落地」的方式，給你一套完整建議（含 AI player 自動跑圖測試的設計）。

---

## 1) 技術棧建議（不要硬寫 raw three.js，除非你很愛自虐）

### 渲染層：React Three Fiber（R3F）

* `@react-three/fiber` 是 Three.js 的 React renderer，你可以用 React component 的方式組場景跟物件，比較好拆系統、做 UI、做狀態管理。 ([GitHub][1])
* 安裝方式官方就是 `npm install three @react-three/fiber`，而且 **Fiber 版本跟 React 版本要對齊**：`@react-three/fiber@9` 對 `react@19`，`@react-three/fiber@8` 對 `react@18`。 ([Poimandres Documentation][2])

### 常用工具包：drei

* `@react-three/drei` 是 R3F 的一堆好用 helper（controls、簡化幾何、載入器、效果等）。 ([drei.docs.pmnd.rs][3])

### 物理層：Rapier（強推）

* 在 web 平台做 platformer，沒物理你會很痛苦；有物理但用得不對你會更痛苦。
* 我建議 `@react-three/rapier`（R3F 封裝 Rapier WASM 物理引擎）。 ([pmndrs.github.io][4])
* 版本相容性要注意：`@react-three/rapier v2` 支援 `@react-three/fiber v9` + `react v19`；如果你停在 React 18，就用 `@react-three/rapier v1` + `fiber v8`。 ([pmndrs.github.io][4])
* `Physics` 元件是物理世界 root，而且它會 lazy 初始化 Rapier，所以要包在 `Suspense` 裡。 ([pmndrs.github.io][4])

---

## 2) 角色控制器：你要 Mario 感，關鍵不是「跳起來」而是「落下去像人」

平台跳躍遊戲的手感 80% 來自這些細節：

* coyote time（掉下邊緣後 0.xx 秒內還能跳）
* jump buffer（按跳太早也幫你記住）
* 可變跳高（按久跳高、點一下跳低）
* 空中操控（air control）
* 地面吸附 / 貼地（避免小坡/小縫一直抖）
* 台階處理（小障礙不要卡死）
* 斜坡、邊緣、移動平台（會讓你崩潰的三本柱）

### A 方案：直接用現成的 ecctrl（省下非常多痛苦）

`pmndrs/ecctrl` 是基於 R3F + react-three-rapier 的角色控制器範例/套件，它的賣點就是為了「角色像角色」：

* 小障礙順滑跨越
* 用 spring/damping 的浮力控制（穩）
* Rigidbody 互動（推箱子那種）
* 可調地面摩擦
* 支援移動/旋轉平台
  而且它也示範了 KeyboardControls 怎麼接。 ([GitHub][5])

> 如果你目標是「做出能玩的 Mario-like」，我會建議先用 ecctrl 把遊戲跑起來，等內容夠多、手感定了，再決定要不要自己重寫控制器。

### B 方案：用 Rapier 的 Kinematic Character Controller（更可控、更適合精準平台跳）

Rapier 本身有 **Kinematic Character Controller**（做 move-and-slide，會用 raycast/shape-cast 去調整軌跡）。 ([rapier.rs][6])
這種方式通常比「動態剛體 + 一堆 hack」更適合平台跳躍，因為：

* 你可以把「移動」當成你決定的，而不是完全交給物理引擎漂移
* 更容易做 deterministic（對自動測試超重要）

現實建議：

* 你要快：ecctrl 起步
* 你要「平台跳很準 + 自動測試重現率高」：最後多半會往 Kinematic 走

---

## 3) 「很大的世界」怎麼做：Chunk + Streaming，不要一口氣塞滿整個宇宙

你說要「很大的世界、到處探索跳躍」，這在瀏覽器可行，但前提是：

### 世界一定要切 Chunk（分區載入）

概念像 Minecraft：

* 世界座標切成 `(cx, cz)` chunk（例如每 chunk 32x32 或 64x64）
* 玩家附近半徑 N 的 chunks 才「實體化」（render + collider）
* 離太遠的 chunks：

  * 渲染可以砍掉或降 LOD
  * 物理 collider **一定要砍掉**（不然你 CPU 會哭）

### 只用內部元素（primitive）反而更適合 chunk

你不用 glTF 大模型，代表你可以大量用：

* Box / Cylinder / Sphere 等 primitive
* `InstancedMesh` 做重複磚塊（同幾何同材質一次畫一堆）
* collider 用 cuboid/ball 等簡單形狀（trimesh 很貴，能不用就不用）

在 `@react-three/rapier` 你也可以控制自動 collider 類型（cuboid/ball/trimesh/hull），甚至全局關掉再自己放 collider。 ([pmndrs.github.io][4])

### 內容生成方式：我會建議你先走「模組化平台」再走「地形」

因為你要 Mario 感，通常不是「真實山谷」，而是：

* 平台、斜坡、彈跳板、移動平台、管子、機關
* 清晰的可跳躍節奏

你可以定義一堆 “prefab”：

* `Platform(width, depth, height, materialId)`
* `MovingPlatform(path, speed)`
* `CoinRing(radius, count)`
* `Checkpoint(flag)`
* `Hazard(lava/void/spikes)`
  然後 chunk 生成時，用 seed + rule 把這些 prefab 擺上去。

---

## 4) 核心架構：把「輸入」抽象化，AI 玩家才塞得進來

你最重要的需求是：**自動 AI player 幫你跑整個遊戲測試**。
要做到這件事，你一定要先把架構變成這樣：

### ✅ 玩家控制只吃一個 InputState（人類/AI 都走同一條路）

例如：

```ts
type InputState = {
  moveX: number;   // -1..1
  moveZ: number;   // -1..1
  jumpPressed: boolean;  // 當幀按下
  jumpHeld: boolean;     // 持續按住
  run: boolean;
  cameraYawDelta: number;
  cameraPitchDelta: number;
};
```

然後你做兩個 provider：

* `HumanInputProvider`：讀鍵盤/手把
* `AIInputProvider`：讀「感測資料」算出要按什麼

這樣你測試時只要切換 provider，不用改遊戲邏輯。

### ✅ 遊戲更新用固定步進（Fixed Timestep）或至少可鎖定步進

不然 AI 測試會變成玄學：
「昨天 bot 會過，今天 bot 會摔死」——恭喜你獲得量子平台跳躍。

`@react-three/rapier` 的 `Physics` 本來就提供很多進階控制（包含手動 stepping、獨立 update loop、甚至 snapshot）。 ([pmndrs.github.io][4])

---

## 5) AI Player 怎麼做才「真的能測試」：三層策略（由簡到難，但都很有用）

你說「幫我跑所有遊戲做測試」，我會很直白：
**你不需要一個很聰明的 AI 才能測試，你需要一個很穩、可重現、會回報問題的 bot。**
所以建議分三層做（可以同時存在）：

---

### 第 1 層：Scripted Bot（最有效的回歸測試）

用途：確保主路線、關鍵機關、Boss、終點「每次都能跑通」。

做法：

* 每關/每段路線錄一段「路徑腳本」
* 腳本不是錄影重播（那種太脆），而是「高階指令」：

  * `GoTo(checkpoint_3)`
  * `JumpGap(gapId)`
  * `WaitPlatform(platformId)`
  * `Interact(switchId)`

你可以把關卡設計成有明確 checkpoint / gate，bot 目標就是「到下一個 checkpoint」。
**這層是 CP 值最高的**：做起來快、測試結果也最穩。

---

### 第 2 層：Explorer Bot（探索大世界、找 crash、找卡點）

用途：你要大世界探索，最怕的是：

* 走到某個 chunk 生成 bug → 掉出世界 / 場景爆炸 / NaN
* 某個坡度角度讓角色永遠爬不上去
* 某個碰撞組合讓物理抖到飛天

Explorer Bot 核心是「覆蓋率」：

* 世界切 chunk 後，你記錄 `visitedChunks`、`visitedCells`
* bot 每次挑「最接近、但沒去過」的 chunk 當目標（frontier-based exploration）
* 走路卡住就做 recovery（轉向、跳、後退、重置到 checkpoint）

感測資料建議至少有：

* 角色位置/速度、是否在地面
* 前方/下方 raycast 距離（前面是不是牆、前面是不是坑）
* 目標方向向量（target - position）

---

### 第 3 層：Fuzz Bot（亂按但有腦的 Monkey Test）

用途：抓最噁心的 bug（尤其是物理、動畫、狀態機）。
做法：

* bot 隨機輸入，但要加限制避免一直原地抽搐：

  * 偏好往前走
  * 每隔一段時間才允許大轉向
  * 遇到坑洞（raycast 掉很深）就提高跳躍機率
* 這層最常抓到「某個狀態切換會讓角色穿模」這種鬼東西

---

## 6) 讓 AI 測試「可自動化」：Playwright 跑 E2E（很適合你）

你說你不會一直手動測，那你要的其實是：

* 每次你 push code
* CI 自動開瀏覽器跑遊戲
* bot 跑一輪
* 有問題就吐 report（log + screenshot/video + seed）

### Playwright 很適合做「真的在瀏覽器裡跑」的測試

它可以用原生事件模擬鍵盤輸入（`keyboard.down/up/type`）。 ([Playwright][7])

而且真的有人專門分享「怎麼在 CI 上讓 Playwright 測 WebGL/3D 更穩、甚至開 GPU」的經驗（包含 Chromium headless flags、Firefox/WebKit 差異）。 ([Promaton][8])

> 直白一句：你如果要讓 3D 遊戲的 E2E 測試在 CI 跑得穩，GPU/driver 這塊你遲早要面對，不然就是慢＋不穩＋偶發失敗三連擊。 ([Promaton][8])

### 更香的做法：不用 Playwright 去「按鍵」，而是直接叫你遊戲的 bot API

你可以在遊戲掛一個測試入口：

```ts
// window.__GAME_TEST__ = { runBot, getMetrics, teleportToCheckpoint ... }
```

Playwright 只負責：

* 開頁面
* `page.evaluate(() => window.__GAME_TEST__.runBot({ seed: 123 }))`
* 等 bot 跑完，拿結果、截圖、存 trace

這樣比「純鍵盤事件」穩很多，因為你可以精準控制 seed、步進、超時、重置。

---

## 7) 測試最重要的三件事：Seed、可重現、快照

### Seed（世界生成、物件擺放、隨機行為都要可重現）

* 世界生成：`seed -> chunks -> platforms/enemies/coins`
* bot 行為：random policy 也要用同一個 seed 控制
* 出 bug 時只要報「seed + bot 路徑摘要」，你就能重跑

### 快照（Snapshot / Save-State）讓你 debug 速度暴增

Rapier 世界可以序列化成 snapshot，再用 snapshot 還原（但要注意：還原世界必須跟原本世界物件/建立順序一致，不然會亂）。 ([pmndrs.github.io][4])
這對「跑到第 7 分鐘才爆炸」的 bug 超有用：你直接從第 6:50 的 snapshot 開始重跑。

### 只要能「更快重現」，你就贏一半

你不常測沒關係，你怕的是 **出事你找不到怎麼重現**。
所以你的 bot 不是要會通關，它要會：

* 產出 report
* 留下可重現的 seed / snapshot / 路徑
* 告訴你「在哪個 chunk / 哪個 checkpoint 附近死的」

---

## 8) 我會建議你照這個順序做（不需要神功，一步一步堆就行）

1. **小測試場景**（10 個平台 + 一個移動平台 + 一個坑）
2. 角色控制器先定（ecctrl 起步或 kinematic 自製） ([GitHub][5])
3. Input abstraction（人類/AI 共用 InputState）
4. Chunk 系統（先做載入/卸載，不用很漂亮）
5. Explorer Bot（先會走會跳會自救）
6. Playwright 跑起來（CI 自動跑 bot） ([Playwright][7])
7. 再開始堆內容（機關、敵人、收集品、關卡節奏）

---

## 最後講一句很實在的：你要「大世界 + 平台跳 + 自動 AI 測試」，關鍵是「工程化」，不是「做個很神的 AI」

你真正需要的是：

* **穩定的角色控制器**（不然 bot 每次死法都不一樣）
* **可重現的世界與 bot 行為**（seed）
* **可觀測性**（metrics、log、snapshot、replay）
* **自動化執行環境**（Playwright/CI）

如果你願意，我也可以直接給你一個「最小可行骨架」的專案結構（R3F + Rapier + Chunk + InputProvider + BotRunner + Playwright test），你照著填內容就能一路長大。

[1]: https://github.com/pmndrs/react-three-fiber?utm_source=chatgpt.com "pmndrs/react-three-fiber: 🇨🇭 A React renderer for Three.js"
[2]: https://r3f.docs.pmnd.rs/getting-started/installation?utm_source=chatgpt.com "Installation - React Three Fiber"
[3]: https://drei.docs.pmnd.rs/?utm_source=chatgpt.com "React-Three-Drei"
[4]: https://pmndrs.github.io/react-three-rapier/ "@react-three/rapier"
[5]: https://github.com/pmndrs/ecctrl "GitHub - pmndrs/ecctrl: ️ A floating rigibody character controller"
[6]: https://rapier.rs/docs/user_guides/javascript/character_controller/?utm_source=chatgpt.com "Character controller"
[7]: https://playwright.dev/docs/api/class-keyboard?utm_source=chatgpt.com "Keyboard"
[8]: https://blog.promaton.com/testing-3d-applications-with-playwright-on-gpu-1e9cfc8b54a9 "Testing 3D applications with Playwright on GPU | by Lev Cheliadinov | Promaton"
