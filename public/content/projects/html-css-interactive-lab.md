# InteractCSS

**An interactive HTML/CSS learning laboratory** that transforms CSS properties and components into live, manipulable controls with real-time preview.

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Core Modules](#core-modules)
- [Available Demos](#available-demos)
- [How to Use](#how-to-use)
- [Browser Compatibility](#browser-compatibility)
- [Development](#development)
- [Roadmap](#roadmap)

---

## 🎯 Overview

**InteractCSS** is a vanilla JavaScript learning platform that covers HTML/CSS topics from fundamentals to advanced features. Every demo provides:

- **Interactive control panel** generated from a simple schema
- **Real-time manipulation** of CSS custom properties
- **Live preview** with drag interactions and keyboard controls
- **Performance monitoring** with FPS and frame time metrics
- **Accessibility-first** design with full keyboard navigation and ARIA support
- **Progressive enhancement** with graceful degradation for unsupported features

**Tech Stack:**
- Pure HTML/CSS/JavaScript (no frameworks or build tools)
- ES Modules (native browser support)
- CSS `@layer` for cascade management
- CSS Custom Properties for reactive styling
- Pointer Events API for unified mouse/touch handling

---

## ✨ Features

### 🎛️ Control System
- **Automatic UI generation** from JSON schema
- **4 control types**: Slider, Select, Switch, Color Picker
- **Real-time CSS variable updates** with automatic unit detection
- **Target scoping**: Apply variables to `:root` or specific elements
- **Reset to defaults** button

### 🖱️ Interactions
- **Drag-to-manipulate** using Pointer Events (mouse + touch)
- **Keyboard controls** with continuous input (hold to rotate)
- **Keyboard shortcuts**: `P` to toggle perf HUD, `Escape` to reset
- **Focus management** with visible focus styles

### 📊 Performance Monitoring
- **FPS counter** (color-coded: green 55+, yellow 30-55, red <30)
- **Frame time** in milliseconds
- **Layout shift detection** (via PerformanceObserver)
- **Non-intrusive HUD** in bottom-left corner

### ♿ Accessibility
- **Full keyboard navigation** (Tab, Arrow keys, Enter, Space)
- **ARIA landmarks** and live regions
- **Screen reader announcements** for dynamic changes
- **High contrast mode** support (Windows)
- **Reduced motion** support (`prefers-reduced-motion`)

### 🔧 Progressive Enhancement
- **Feature detection** with `@supports`
- **Graceful fallbacks** for modern CSS (backdrop-filter, 3D transforms, etc.)
- **Browser compatibility warnings** in console

---

## 🚀 Quick Start

### Option 1: Direct File Access (Simplest)

Open any demo HTML file directly in a modern browser:

```bash
# Windows
start demos/3d-card/index.html

# macOS
open demos/3d-card/index.html

# Linux
xdg-open demos/3d-card/index.html
```

### Option 2: Local Server (Recommended)

For best results (avoids CORS issues), use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (requires http-server)
npx http-server -p 8000

# Then open: http://localhost:8000/demos/3d-card/
```

---

## 📁 Project Structure

```
html-css-interactive-lab/
├── core/                       # Core modules (shared by all demos)
│   ├── base.css               # Design system, layout, utilities
│   ├── studio.js              # Studio shell, keyboard shortcuts, ARIA
│   ├── ui.js                  # Control factory (schema → UI)
│   └── perf.js                # Performance HUD (FPS, frame time)
│
├── demos/                      # Individual interactive demos
│   └── 3d-card/               # 3D Card demo (Milestone 1)
│       ├── index.html         # Entry point
│       ├── schema.js          # Control definitions
│       ├── style.css          # Demo-specific styles + fallbacks
│       └── script.js          # Interaction logic (drag, keyboard)
│
├── docs/                       # Documentation
│   ├── TOPICS.md              # Complete topic map (11 categories)
│   ├── ROADMAP.md             # Milestones and delivery schedule
│   └── PLANNING.md            # Demo specification template
│
├── .github/
│   └── labels-and-issues.md   # GitHub labels and issue templates
│
├── LLM_PROVIDER.md                   # Instructions for LLMProvider Tooling
└── README.md                   # This file
```

---

## 🧩 Core Modules

### 1. `core/studio.js`

**Responsibilities:**
- Initialize studio shell (stage + control panel + perf HUD layout)
- Setup global keyboard shortcuts (`P` for perf HUD, `Escape` for reset)
- Manage ARIA live regions for screen reader announcements
- Provide utility functions (`announceToScreenReader`, `resetDemo`)

**API:**
```javascript
import { initStudio, announceToScreenReader } from './core/studio.js';

initStudio(); // Call once on page load
announceToScreenReader('Card rotated to 45 degrees'); // Announce to screen readers
```

### 1.5 `core/multi-element-lab.js` (NEW!)

**Responsibilities:**
- Manage multiple draggable elements with independent properties
- Add/remove elements dynamically
- Select elements to edit their properties
- Isolate CSS variables per element
- Enable drag-to-position and keyboard navigation

**Key Features:**
- **Dynamic element management**: Add up to 20 elements with a single click
- **Individual property control**: Each element has its own isolated property state
- **Visual selection**: Click to select, drag to reposition
- **Element list sidebar**: Thumbnail previews with add/remove buttons
- **Property panel integration**: Automatically updates when switching elements
- **Keyboard controls**: Arrow keys to nudge selected element (Shift = 10px step)

**API:**
```javascript
import { MultiElementLab } from './core/multi-element-lab.js';

const lab = new MultiElementLab({
  previewContainer: document.getElementById('preview'),
  listContainer: document.getElementById('elementList'),
  propertyContainer: document.getElementById('properties'),
  initialElements: 2,
  maxElements: 15,
  elementFactory: () => createCustomElement(),
  properties: [/* PropertyPanel schema */],
  onPropertyChange: (key, value, element, props) => {
    // Custom handler for property changes
  }
});

lab.init(); // Start the lab
```

### 2. `core/ui.js`

**Responsibilities:**
- Read control schema and generate UI
- Bind controls to CSS custom properties
- Handle value formatting (auto-detect units: `deg`, `px`, etc.)
- Provide reset functionality

**Schema Format:**
```javascript
export const schema = {
  title: "Demo Title",
  controls: [
    {
      key: "--my-variable",      // CSS variable name
      type: "slider",             // slider | select | switch | color
      label: "My Control",        // Display label
      min: 0, max: 100, step: 1, // For sliders
      default: 50,                // Initial value
      target: ".my-element",      // Selector (default: :root)
      unit: "px"                  // Optional: explicit unit
    }
  ]
};
```

**API:**
```javascript
import { initControls, resetAllControls, getControlValues } from './core/ui.js';

initControls(schema);           // Generate control panel
resetAllControls();             // Reset to defaults
const values = getControlValues(); // Get current values
```

### 3. `core/perf.js`

**Responsibilities:**
- Monitor FPS using `requestAnimationFrame`
- Calculate rolling average frame time (last 10 frames)
- Observe layout shifts with `PerformanceObserver` (if supported)
- Color-code metrics (green/yellow/red)

**API:**
```javascript
import { initPerf, getPerfMetrics, stopPerf } from './core/perf.js';

initPerf();                     // Start monitoring
const metrics = getPerfMetrics(); // { fps: 60, frameTime: 16.67, samples: 10 }
stopPerf();                     // Stop monitoring (cleanup)
```

### 4. `core/base.css`

**Responsibilities:**
- Define `@layer` cascade order: `reset` → `base` → `utilities` → `demo` → `overrides`
- Provide design tokens (colors, spacing, typography)
- Layout studio grid (responsive: desktop sidebar, mobile stacked)
- Accessibility styles (focus-visible, reduced-motion, high-contrast)

**CSS Variables:**
```css
:root {
  /* Colors */
  --color-bg-primary: #0a0a0f;
  --color-text-primary: #e4e4e7;
  --color-accent: #6366f1;

  /* Spacing */
  --space-xs: 0.25rem; /* 4px */
  --space-md: 1rem;    /* 16px */
  --space-xl: 2rem;    /* 32px */

  /* Typography */
  --text-xs: 0.75rem;  /* 12px */
  --text-base: 1rem;   /* 16px */
  --text-xl: 1.25rem;  /* 20px */

  /* Layout */
  --control-panel-width: 320px;
  --perf-hud-size: 180px;
}
```

---

## 🎨 Available Demos

### ✅ 3D Card (Milestone 1 - Completed)

**Location:** `demos/3d-card/`

**Learning Objectives:**
- Understand `perspective` and `transform-style: preserve-3d`
- Master 3D rotations (`rotateX`, `rotateY`, `rotateZ`)
- Explore `backdrop-filter` for glassmorphism
- Learn `backface-visibility` and `mix-blend-mode`

**Features:**
- **9 interactive controls**:
  - Rotate X/Y/Z (sliders: -60° to 60°, -180° to 180°)
  - Perspective (200px to 2000px)
  - Backdrop Blur (0 to 20px)
  - Background Alpha (0 to 1)
  - Blend Mode (7 options)
  - Border Glow Color (color picker)
  - Show Backface (toggle)

- **Drag interaction**: Pointer Events for unified mouse/touch handling
- **Keyboard controls**:
  - `↑` `↓` `←` `→`: Continuous rotation (60°/sec)
  - `Q` / `E`: Z-axis rotation
  - `R`: Reset to defaults
  - `Space` / `Enter`: Flip card (0° ↔ 180°)

- **Performance**:
  - 60fps smooth animation (compositor-only transforms)
  - `will-change: transform` during drag
  - No layout thrashing

- **Fallbacks**:
  - `backdrop-filter` → opaque background (Firefox)
  - 3D transforms → 2D fallback (old browsers)
  - `prefers-reduced-motion` → no animation

**Technologies:**
- CSS: `transform-style: preserve-3d`, `perspective`, `backdrop-filter`, `backface-visibility`, `mix-blend-mode`, `@layer`, `@supports`
- JS: Pointer Events, requestAnimationFrame, CSS variable manipulation

---

### 🆕 Multi-Element Labs (NEW!)

**🎯 3D Transform Multi-Element Lab**

**Location:** `demos/transform-3d-multi.html`

**Learning Objectives:**
- Apply 3D transforms to multiple elements independently
- Understand `translateZ`, `rotateX/Y/Z`, and `scale3d`
- Master element selection and property isolation

**Features:**
- **Add/remove elements** dynamically (up to 15)
- **Independent 3D controls** per element:
  - Translate Z (-300px to 300px)
  - Rotate X/Y/Z (-180° to 180°)
  - Scale X/Y/Z (0.1 to 2)
- **Element list sidebar** with thumbnails
- **Click to select**, drag to reposition
- **Keyboard nudge**: Arrow keys (Shift for 10px steps)

---

**🎨 Color & Filters Multi-Element Lab**

**Location:** `demos/color-filters-multi.html`

**Learning Objectives:**
- Use OKLCH color space for perceptually uniform colors
- Apply CSS filters independently to each element
- Understand `opacity`, `blur`, `backdrop-filter`

**Features:**
- **Add/remove color shapes** (up to 20)
- **Per-element controls**:
  - OKLCH Lightness, Chroma, Hue
  - Blur, Brightness, Contrast, Saturate
  - Hue Rotate, Opacity
  - Border Radius, Backdrop Blur
- **Dark mode preview** background
- **Visual property feedback** in real-time

---

**📐 Flexbox Multi-Element Lab**

**Location:** `demos/flexbox-multi.html`

**Learning Objectives:**
- Master Flexbox with multiple items
- Control `flex-grow`, `flex-shrink`, `flex-basis`
- Understand `order` and `align-self`

**Features:**
- **Container controls**:
  - Flex Direction (row/column/reverse)
  - Justify Content (6 options)
  - Align Items (5 options)
  - Flex Wrap (3 options)
- **Per-item controls**:
  - Flex Grow (0-5)
  - Flex Shrink (0-5)
  - Order (-5 to 5)
  - Align Self (6 options)
- **Add/remove flex items** dynamically

---

## 📖 How to Use

### For Learners

1. **Open a demo** (e.g., `demos/3d-card/index.html`)
2. **Adjust controls** in the right panel (desktop) or bottom panel (mobile)
3. **Interact with the demo**: Drag, use arrow keys, press shortcuts
4. **Monitor performance**: Check FPS in the bottom-left HUD
5. **Inspect code**: Open DevTools to see CSS variables updating in real-time

### For Developers: Adding a New Demo

#### Step 1: Create Directory Structure

```bash
mkdir -p demos/my-demo
cd demos/my-demo
touch index.html schema.js style.css script.js
```

#### Step 2: Define Schema (`schema.js`)

```javascript
export const schema = {
  title: "My Demo",
  controls: [
    {
      key: "--my-rotation",
      type: "slider",
      label: "Rotation (deg)",
      min: 0,
      max: 360,
      step: 1,
      default: 0,
      target: ".my-element"
    }
  ]
};
```

#### Step 3: Create HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Demo - InteractCSS</title>
  <link rel="stylesheet" href="../../core/base.css">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <main class="studio">
    <section class="demo-stage" id="demo-stage">
      <div class="my-element">Content here</div>
    </section>
    <aside class="control-panel" id="controls"></aside>
    <div class="perf-hud" id="perf"></div>
  </main>

  <script type="module">
    import { initStudio } from '../../core/studio.js';
    import { initControls } from '../../core/ui.js';
    import { initPerf } from '../../core/perf.js';
    import { schema } from './schema.js';
    import './script.js';

    initStudio();
    initControls(schema);
    initPerf();
  </script>
</body>
</html>
```

#### Step 4: Add Styles (`style.css`)

```css
@layer demo {
  .my-element {
    transform: rotate(var(--my-rotation, 0deg));
    transition: transform 0.2s ease;
  }

  /* Add @supports fallbacks if needed */
  @supports not (transform: rotate(1deg)) {
    .my-element {
      /* Fallback styles */
    }
  }
}
```

#### Step 5: Add Interactions (`script.js`)

```javascript
const element = document.querySelector('.my-element');

// Add custom interactions here
element.addEventListener('click', () => {
  console.log('Element clicked!');
});

// Listen for studio reset event
document.addEventListener('studio:reset', () => {
  // Reset demo-specific state
});
```

#### Step 6: Test

```bash
python -m http.server 8000
# Open http://localhost:8000/demos/my-demo/
```

See `docs/PLANNING.md` for the complete demo specification template.

---

## 🌐 Browser Compatibility

### Fully Supported (All Features)

- **Chrome/Edge**: 115+ (recommended)
- **Safari**: 15.4+
- **Firefox**: 121+

### Partial Support (Fallbacks Active)

| Feature                | Chrome | Safari | Firefox | Fallback                       |
|------------------------|--------|--------|---------|--------------------------------|
| `backdrop-filter`      | 76+    | 9+     | ❌      | Opaque background              |
| `@layer`               | 99+    | 15.4+  | 97+     | Higher specificity warnings    |
| 3D Transforms          | 36+    | 9+     | 16+     | 2D transforms only             |
| `@supports`            | 28+    | 9+     | 22+     | Universal (degraded gracefully)|
| Container Queries      | 105+   | 16+    | 110+    | Media queries fallback         |
| `:has()`               | 105+   | 15.4+  | 121+    | Fallback selectors             |
| `color-mix()`          | 111+   | 16.2+  | 113+    | Static color values            |

**Mobile Support:**
- iOS Safari 15.4+
- Chrome Android 115+
- Samsung Internet 20+

---

## 🛠️ Development

### Running the Project

```bash
# Start local server
python -m http.server 8000

# Open in browser
open http://localhost:8000/demos/3d-card/
```

### Development Tools

- **Browser DevTools**: Inspect CSS variables, monitor performance
- **Lighthouse**: Accessibility and performance audits
- **axe DevTools**: WCAG compliance checking

### Code Style

- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat(demo-3d): add 3D card with drag interaction`
  - `fix(core): correct control factory target selector`
  - `docs(readme): update browser compatibility table`

- **File Organization**:
  - HTML: Semantic, accessible markup
  - CSS: Use `@layer demo` for demo-specific styles
  - JS: ES Modules, document at function level

### Testing Checklist

Before marking a demo complete:

- [ ] All controls work in Chrome, Firefox, Safari
- [ ] Drag/touch interactions smooth (60fps)
- [ ] Keyboard navigation fully functional
- [ ] Screen reader announces changes (test with NVDA/VoiceOver)
- [ ] `prefers-reduced-motion` disables animations
- [ ] High contrast mode renders correctly
- [ ] Mobile viewport responsive (test at 375px, 768px, 1920px)
- [ ] Fallbacks active in browsers without support

---

## 🗺️ Roadmap

### ✅ Milestone 1: Core Infrastructure (COMPLETED)

- [x] Core modules (studio, ui, perf)
- [x] 3D Card demo
- [x] README documentation

### ✅ Milestone 2: Layout Fundamentals (PARTIALLY COMPLETE)

- [x] Box Model Visualizer
- [x] Flexbox Multi-Element
- [x] Grid Playground
- [ ] Position Playground
- [ ] Flex Holy Grail

### ✅ Milestone 3: Colors & Typography (PARTIALLY COMPLETE)

- [x] OKLCH Color Picker
- [ ] Color Mix Demo
- [x] Gradient Generator
- [ ] Variable Font Player
- [ ] Text Gradient

### 📅 Milestone 4-10

See `docs/ROADMAP.md` for complete milestone breakdown (10 total milestones, ~60 demos planned).

**Topics Covered:**
- HTML Fundamentals (9 sub-topics)
- CSS Foundations (5 sub-topics)
- Layout Systems (4 sub-topics)
- Colors & Visual Styling (4 sub-topics)
- Typography (3 sub-topics)
- Transforms & Motion (8 sub-topics)
- Visual Effects (4 sub-topics)
- SVG & Graphics (3 sub-topics)
- Responsive Design (4 sub-topics)
- Performance & Modern CSS (4 sub-topics)

---

## 📚 Documentation

- **`docs/TOPICS.md`**: Complete topic map with learning paths
- **`docs/ROADMAP.md`**: Milestones and delivery schedule
- **`docs/PLANNING.md`**: Demo specification template and best practices
- **`.github/labels-and-issues.md`**: GitHub workflow setup

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Follow the demo specification in `docs/PLANNING.md`
2. Use Conventional Commits format
3. Ensure accessibility (WCAG AA minimum)
4. Provide fallbacks for modern CSS features
5. Test in Chrome, Firefox, and Safari

---

## 📄 License

MIT License - feel free to use for learning, teaching, or building upon.

---

## 🙏 Acknowledgments

Built with:
- Modern CSS features (CSS Working Group)
- Web Platform APIs (WHATWG, W3C)
- Accessibility best practices (WAI-ARIA)

Inspired by the need for **interactive, hands-on learning** of web technologies.

---

**Ready to explore?** Start with `demos/3d-card/index.html` and experience the future of CSS learning! 🚀
# html-css-interactive-lab
# html-css-interactive-lab
