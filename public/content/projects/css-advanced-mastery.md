# css-mastery-lab

專為「做中學」CSS 的練習與案例庫。所有範例只用原生 HTML/CSS（必要時少量 JS 只做行為示範），目標涵蓋佈局、動畫、響應式、可維護性與現代 CSS 特性。

## 專案結構
- `exercises/`：每個單元一個資料夾，含 `index.html`、`style.css`、`tasks.md`。
- `projects/`：整合型案例（稍後進行）。
- `notes/`：筆記與重點整理。
- `assets/`：共享圖片、字體等靜態資源。
- `roadmap.md`：學習路線與進度。
- `AGENTS.md`、`first_prompt.md`：協作與提示文件。

## 快速預覽
任一單元：
```bash
cd exercises/<unit-folder>
python -m http.server 3000
```
瀏覽器開啟 `http://localhost:3000` 查看頁面。

## 進度
- [x] 01-cascade-specificity：理解 cascade/繼承/優先度，檢視選擇器影響。
- [ ] 02-box-model-display：控制盒模型、display 與常用單位。
- [ ] 03-flex-layout：flex 佈局與主軸/交叉軸對齊練習。
- [ ] 04-flex-advanced：flex 進階行為與多列對齊。
- [ ] 05-grid-basics：grid 兩維度版面與自適應欄位。
- [ ] 06-grid-advanced：隱式網格與 dense 補洞。
- [ ] 07-position-stacking：position/sticky/fixed 與 stacking context/z-index/BFC。
- [ ] 08-typography-color：字體排版、可讀性、顏色層級與 focus-visible。
- [ ] 09-sizing-units：min/max/clamp、單位選擇、aspect-ratio 與自適應 sizing。
- [ ] 10-transitions-transforms：transition/transform 微互動與 reduce motion。
- [ ] 11-animations：keyframes、stagger、fill-mode 與 reduce motion。
- [ ] 12-selectors-layers：:is/:where/:has、attribute selectors、@layer。
- [ ] 13-container-queries：container-type 與 @container。
- [ ] 14-logical-properties：inline/block、inset/border logical properties。
- [ ] 15-effects-clip-mask：filter、backdrop-filter、clip-path、mask。
- [ ] 更多單元將按 roadmap 推進。

## Projects
- `projects/skillhub/`：綜合練習小網站，涵蓋 flex/grid/RWD。

## 提交習慣
- 使用 Conventional Commits（例：`feat: add cascade exercise`、`docs: update roadmap`）。
- 一次專注一件事，提交前自我檢查練習是否可在瀏覽器正常顯示。
