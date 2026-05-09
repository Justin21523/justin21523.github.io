# MockMaster

> A powerful toolkit for creating realistic content modifications across various media types - web pages, images, and documents.

> 一個強大的內容模擬工具，可以對各種媒體類型（網頁、圖片、文件）進行真實感的內容修改。

## 📋 專案概述 (Project Overview)

MockMaster 是一個多功能的內容編輯工具，旨在將自定義內容無縫整合到現有媒體中，使修改後的內容看起來完全真實自然。本專案採用混合技術方案，針對不同類型的內容使用最適合的處理技術。

**核心功能 (Core Features):**
- 🌐 **Web Content Editor**: 使用 Playwright 修改網頁 DOM 並截圖
- 🖼️ **Image Text Overlay**: 圖像文字覆蓋與樣式匹配
- 🤖 **AI-Assisted Editing**: 使用 Stable Diffusion 進行智能圖像修復

## 🏗️ 技術架構 (Technical Architecture)

### 混合方案設計 (Hybrid Approach Design)

| Content Type | Technology Stack | Use Cases |
|-------------|------------------|-----------|
| Web Screenshots | Playwright + DOM Manipulation | Google AI Summary, Twitter posts, News articles |
| Flat Text Images | OpenCV + PIL + Font Matching | Documents, Certificates, Signs |
| 3D Physical Objects | Stable Diffusion Inpainting | Tombstones, Monuments, Physical products |

### 技術棧 (Tech Stack)

**前端/自動化 (Frontend/Automation):**
- Playwright (Browser automation)
- Node.js / TypeScript

**圖像處理 (Image Processing):**
- Python 3.10+
- OpenCV (Computer vision)
- Pillow (PIL) (Image manipulation)
- Tesseract OCR (Text detection)

**AI 模型 (AI Models):**
- Stable Diffusion (Inpainting)
- CLIP (Style matching)

**GUI (Optional):**
- Electron / PyQt6

## 📁 專案結構 (Project Structure)

```
MockMaster/
├── README.md                          # 專案說明文件
├── package.json                       # Node.js dependencies
├── requirements.txt                   # Python dependencies
├── .gitignore
├── docs/                              # 詳細文檔
│   ├── API.md                         # API 文檔
│   ├── DEVELOPMENT.md                 # 開發指南
│   └── EXAMPLES.md                    # 使用範例
├── src/
│   ├── web-editor/                    # 網頁內容編輯器
│   │   ├── playwright-engine.ts       # Playwright automation engine
│   │   ├── dom-manipulator.ts         # DOM manipulation utilities
│   │   ├── screenshot-handler.ts      # Screenshot capture logic
│   │   └── presets/                   # 預設模板
│   │       ├── google-summary.ts      # Google AI Summary preset
│   │       ├── twitter.ts             # Twitter post preset
│   │       └── index.ts
│   ├── image-editor/                  # 圖像編輯器
│   │   ├── text-overlay.py            # Text overlay engine
│   │   ├── style-matcher.py           # Font and style matching
│   │   ├── perspective-corrector.py   # Perspective transformation
│   │   └── utils/
│   │       ├── font-detector.py       # Font detection utilities
│   │       └── color-analyzer.py      # Color analysis utilities
│   ├── ai-editor/                     # AI 輔助編輯
│   │   ├── inpainting.py              # Stable Diffusion inpainting
│   │   ├── prompt-builder.py          # AI prompt generation
│   │   └── model-loader.py            # Model loading utilities
│   ├── core/                          # 核心功能
│   │   ├── config.ts                  # Configuration management
│   │   ├── logger.ts                  # Logging utilities
│   │   └── types.ts                   # TypeScript type definitions
│   └── cli/                           # 命令行介面
│       └── index.ts                   # CLI entry point
├── tests/                             # 測試文件
│   ├── web-editor/
│   ├── image-editor/
│   └── ai-editor/
├── examples/                          # 使用範例
│   ├── google-summary-mock.ts
│   ├── image-text-replacement.py
│   └── tombstone-edit.py
├── assets/                            # 資源文件
│   ├── fonts/                         # 字體庫
│   ├── templates/                     # 模板
│   └── samples/                       # 範例圖片
└── output/                            # 輸出目錄
    └── .gitkeep
```

## 🚀 快速開始 (Quick Start)

### 環境需求 (Prerequisites)

- Node.js >= 18.0.0
- Python >= 3.10（建議啟用 `ytp_video_env`：`source ~/miniconda3/bin/activate ytp_video_env`，或直接使用 `~/miniconda3/envs/ytp_video_env/bin/python` / `pip`）
- Git

### 安裝步驟 (Installation)

```bash
# Clone the repository
git clone https://github.com/yourusername/MockMaster.git
cd MockMaster

# Install Node.js dependencies
npm install  # 若想跳過瀏覽器下載：PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install

# Install Python dependencies
~/miniconda3/envs/ytp_video_env/bin/pip install -r requirements.txt

# Install Playwright browsers
#（建議在有網路/資源時執行；若前一步跳過下載，記得補裝）
npx playwright install
```

### 基本使用 (Basic Usage)

#### 爬蟲 + 模板
- 抓取與解析：`src/scraper/page-scraper.ts`（fetch + cheerio），可取得標題/lead/段落/圖片，再輸出給模板。
- 模板渲染：`news-article` preset 改用 `buildNewsHtml`，可帶入多段落、accent color、字型（含中英 fallback）；配合 `MOCKMASTER_USE_PLAYWRIGHT=1` 可實拍（環境需允許 sandbox/userns）。

#### TypeScript CLI Stub

```bash
# Build TypeScript 腳手架並執行預設 Google Summary 預設
npm install
npm run build
node dist/cli/index.js --preset google-summary --input ./assets/samples/google.png --out ./output/google-mock.png

# 啟用真實 Playwright 截圖（需先安裝瀏覽器，並設定環境變數）
MOCKMASTER_USE_PLAYWRIGHT=1 \
PLAYWRIGHT_BROWSERS_PATH=.cache/playwright \
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=.cache/playwright/chromium-1200/chrome-linux64/chrome \
node dist/cli/index.js --preset news-article --out ./output/news-mock.png
# 如環境支援 sandbox/userns，可改用預設路徑安裝後直接：MOCKMASTER_USE_PLAYWRIGHT=1 node dist/cli/index.js --preset news-article ...

# 抓取 URL -> 套用 news-article 模板 -> 截圖（真實模式或 stub 皆可）
node dist/cli/index.js --preset news-article --url https://example.com/article --out ./output/news-from-url.png

# 只輸出 JSON（抓取後離線處理）
npm run scrape:news -- --url https://example.com/article --out ./output/article.json
```

#### TypeScript 範例腳本

```bash
# 使用 ts-node 執行範例（不需先 build）
npm install
npm run example:google
npm run example:twitter
npm run example:news

# Playwright E2E（需可啟動 Chromium，否則略過）
MOCKMASTER_USE_PLAYWRIGHT=1 npx playwright test tests/web-editor/playwright.e2e.spec.ts
```

### Playwright 環境提示
- 若在某些 Linux 環境遇到 sandbox/userns 權限不足，可嘗試加上 `--no-sandbox --disable-setuid-sandbox`（已預設），或在系統允許時啟用 `sysctl kernel.unprivileged_userns_clone=1`。無法啟動時會自動回退為 stub 複製，不影響基本流程。

#### 1. 修改 Google AI Summary (Modify Google AI Summary)

```typescript
import { GoogleSummaryEditor } from './src/web-editor/presets/google-summary';

const editor = new GoogleSummaryEditor();

await editor.mockSummary({
  searchQuery: 'artificial intelligence',
  customSummary: 'Your custom AI summary text here...',
  outputPath: './output/google-mock.png'
});
```

#### 2. 圖片文字替換 (Image Text Replacement)

```python
from src.image_editor.text_overlay import TextOverlay

editor = TextOverlay()

editor.replace_text(
    image_path='./assets/samples/tombstone.jpg',
    target_text='ERCOLE VISCONTI',
    replacement_text='YOUR NAME HERE',
    output_path='./output/custom-tombstone.jpg'
)
```

#### 3. AI 輔助修復 (AI-Assisted Inpainting)

```python
from src.ai_editor.inpainting import StableDiffusionEditor

editor = StableDiffusionEditor()

editor.inpaint(
    image_path='./assets/samples/monument.jpg',
    mask_region=(100, 100, 400, 300),  # x, y, width, height
    prompt='realistic engraved text on stone surface',
    output_path='./output/modified-monument.jpg'
)
```

## 🎯 主要功能模組 (Main Modules)

### Web Editor Module (網頁編輯器模組)

**說明：** 使用 Playwright 自動化瀏覽器，修改網頁 DOM 元素後截圖，確保 100% 真實的渲染效果。

**核心類別 (Core Classes):**
- `PlaywrightEngine`: Browser automation engine
- `DOMManipulator`: DOM element modification utilities
- `ScreenshotHandler`: Screenshot capture and optimization

**支援的網站預設 (Supported Presets):**
- Google AI Summary
- Twitter/X Posts
- News Articles
- Social Media Posts

### Image Editor Module (圖像編輯器模組)

**說明：** 針對平面圖像進行文字檢測、字體匹配和內容替換，適用於文件、證書等。

**核心功能 (Core Features):**
- OCR text detection
- Font matching and similarity analysis
- Color and style preservation
- Perspective correction

### AI Editor Module (AI 編輯器模組)

**說明：** 使用 Stable Diffusion 進行智能圖像修復，適合處理複雜的 3D 物體和實體場景。

**核心功能 (Core Features):**
- Stable Diffusion inpainting
- Automatic prompt generation
- Style transfer
- Content-aware filling

## 🛠️ 開發規範 (Development Guidelines)

### 程式碼風格 (Code Style)

- **語言 (Languages):**
  - TypeScript for web automation
  - Python for image/AI processing
- **註解語言 (Comments):** 英文 (English only)
- **提交訊息 (Commit Messages):** 使用 Conventional Commits 規範
- **命名規範 (Naming Conventions):**
  - TypeScript: camelCase for variables, PascalCase for classes
  - Python: snake_case for functions/variables, PascalCase for classes

### Git Workflow (Git 工作流程)

```bash
# Feature development
git checkout -b feature/google-summary-editor
git commit -m "feat: add Google AI Summary editor"

# Bug fixes
git checkout -b fix/screenshot-timeout
git commit -m "fix: resolve Playwright timeout issue"

# Documentation
git commit -m "docs: update API documentation"
```

### 測試規範 (Testing Guidelines)

- Unit tests for all core functions
- Integration tests for web automation
- Visual regression tests for screenshots

```bash
# Run all tests
npm test                    # TypeScript/JavaScript tests
pytest tests/               # Python tests
```

## 📚 詳細文檔 (Documentation)

- [API Reference](./docs/API.md) - 完整的 API 文檔
- [Development Guide](./docs/DEVELOPMENT.md) - 開發指南
- [Examples](./docs/EXAMPLES.md) - 更多使用範例

## 🗺️ Roadmap (開發路線圖)

### Phase 1: MVP (Week 1-4)
- [x] 專案初始化
- [ ] Google AI Summary editor
- [ ] Basic image text overlay
- [ ] CLI interface

### Phase 2: Core Features (Week 5-8)
- [ ] Multiple website presets
- [ ] Advanced font matching
- [ ] OCR integration

### Phase 3: AI Integration (Week 9-12)
- [ ] Stable Diffusion integration
- [ ] Automatic style matching
- [ ] Batch processing

### Phase 4: GUI & Polish (Week 13-16)
- [ ] Electron-based GUI
- [ ] Template library
- [ ] Export options

## 🤝 貢獻指南 (Contributing)

歡迎提交 Pull Request！在提交之前，請確保：

1. 程式碼符合專案風格規範
2. 添加了適當的測試
3. 更新了相關文檔
4. 提交訊息遵循 Conventional Commits

## 📄 授權 (License)

MIT License - 詳見 [LICENSE](./LICENSE) 文件

## 🙏 致謝 (Acknowledgments)

- Playwright team for excellent browser automation
- Stable Diffusion community
- OpenCV contributors

---

**注意事項 (Important Notes):**
- 本工具僅供教育和娛樂用途
- 請勿用於製造虛假信息或詐騙
- 使用時請遵守相關法律法規

**開發者 (Developer):** Justin Lu
**專案狀態 (Status):** 🚧 In Active Development
**最後更新 (Last Updated):** 2025-10-28
