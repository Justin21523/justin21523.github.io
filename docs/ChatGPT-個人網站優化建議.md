# 個人網站優化建議

**User:** Anonymous  
**Created:** 6/19/2026 22:22:42  
**Updated:** 6/19/2026 23:31:14  
**Exported:** 6/19/2026 23:31:57  
**Link:** [https://chatgpt.com/c/6a3550aa-3554-83e8-90e0-64cae29d0f1d](https://chatgpt.com/c/6a3550aa-3554-83e8-90e0-64cae29d0f1d)  

## Response:
6/19/2026, 10:22:41 PM

> **Evaluating user's request and analyzing context**
>
> The user likely needs this in Chinese, and they want a step-by-step guide tailored to their prior projects, learning, and current job market needs. I'll need to analyze the uploaded materials, including screenshots and markdown, and gather relevant information from the web, considering the user's past projects and current needs. I'll also use personal_context to refine the response if necessary.
>
> **Clarifying portfolio structure and analyzing job market needs**
>
> For the portfolio, I recommend limiting the top-level menu to 5-6 sections (e.g., About, Work, Expertise, Learning, Notes, Contact), avoiding too many dropdown items. It’s important to categorize projects by type and status, like completed, in progress, and learning. I'll also look at recent job listings in Taiwan for relevant data.
>
> **Remembering**
>
> Reviewing your past projects
>
> **Remembering**
>
> Highlighting your frontend skills
>
> **Remembering**
>
> Prioritizing your learning goals
>
> **Remembering**
>
> Clarifying your portfolio style
>
> **Searching for up-to-date job listings**
>
> I need to search for the latest official job listings and reports, so I’ll focus on finding the most current information. I’ll likely look for broad terms to ensure I gather relevant results. Time to dive into some trustworthy sources!
>
> **Refining search for specific skills**
>
> I think I need to search more specifically for roles involving accessibility (a
>
> **Planning user response and next steps**
>
> I don't think I need to zoom into the image since the user has provided it, so I’ll skip that step. Instead, I should start by giving a comprehensive audit and roadmap, focusing on positioning and information architecture. I’ll propose a new homepage hero copy, navigation categories, and "proof" cards, likely asking for the project folder/code afterward.
>
> **Handling search result citation**
>
> I’m looking into how line ranges work for citations, and it seems like file cites may only be supported by the file itself. The snippets don’t show the line markers in full, but I can try clicking on the relevant sections to get the full text and line ranges.
>
> **Clarifying citations and critique**
>
> Since the mclick does not provide line numbers, I'll just use the citation marker, which may still be acceptable. I'll follow the provided citation syntax for clarity. Regarding the portfolio critique, I can base it on the image provided, no need for internet citations. If we refer to the web, factual claims about the job market will require citations. I'll mention that the percentages from the Qwen document are unverified for 2026
>
> **Critiquing portfolio language and layout**
>
> For the portfolio, "Frontend Developer specializing in React, 3D Web, and information-oriented products" sounds stronger than "candidate." It's important to highlight progress with clear status badges like "Featured," "Production-ready," and "In Progress." I also need to address the mismatched language, sparse header, and lack of unique content in the screenshot — from
>
> **Organizing portfolio structure and content**
>
> I should mention the "current portfolio stack" from the uploaded guide: Next.js, React, Tailwind, etc., but it's important not to just list these technologies. The site should demonstrate them. I’ll focus on framing the portfolio around strengths and weaknesses, then build a clear roadmap based on market needs. The structure would include key sections like Home, Projects,
>
> **Outlining approach and next steps**
>
> I’ll outline the phases in a concise yet detailed way with clear steps, starting with Phase 0 (content/positioning) and continuing through Phase 6 (deploy). Then, for the next step, I’ll ask the user to provide their folder tree, header files, and hero components. I’ll say something like: "接下來先做 Phase 1:..." But I should limit it to one follow-up request.
>
> Thought for 1m 23s

可以。這次不把它當成「再加幾個頁面的作品集模板」，而是當成一個真正能幫你求職的 **個人技術品牌平台**，並且每一階段都同時達成三件事：

1. 讓面試官快速理解你是誰、擅長什麼。
2. 用實際功能證明前端工程能力。
3. 整理你大量且跨領域的專案，不讓網站最後變成作品倉庫大爆炸。

先直接說目前畫面的問題：**乾淨、能看，但太像通用模板，還看不出「Justin 為什麼值得被記住」。**

---

# 一、目前版本的實際評估

## 做得不錯的部分

你現在已經具備一個良好的技術骨架：

- 深色與淺色模式
- 繁中與英文切換
- Next.js App Router 與多語系路由
- 響應式導覽列基礎
- Framer Motion 動畫
- 統一的藍黑色設計風格
- 清楚的主要 CTA

你上傳的開發紀錄也已經規劃了 Next.js、TypeScript、Tailwind、Shadcn、動態路由、作品篩選、MDX、表單驗證、SEO 與效能最佳化，技術方向本身沒有問題。`前端工程師技能實戰指南_qwen.md`

## 目前最需要修改的地方

### 1. 首頁內容太通用

目前的文字：

> Justin  
> Frontend Engineer  
> I love crafting elegant...

放到任何前端工程師網站都成立。

但你的真正差異是：

- 圖書資訊學背景
- 數位典藏、知識管理與檔案檢索系統
- React、Next.js、TypeScript
- Three.js、React Three Fiber、Phaser
- 互動式 3D 網頁與遊戲系統
- AI、資料分析與視覺化
- 正在延伸 Java/Spring Boot 與 C#/.NET 桌面應用

這些現在一個都沒有在首屏被看見。

### 2. 語言狀態不一致

畫面顯示「繁體中文」，Hero 卻仍然是英文。這對面試官來說會像 i18n 還沒完成，而不是刻意的雙語設計。

中文模式下，主內容應全部中文；英文模式再全部英文。技術名稱可以保留英文。

### 3. Header 不像完成版

桌面寬度仍只看到漢堡選單，會讓人以為網站只有手機導覽。你想要大量分類是合理的，但不應把所有東西都藏起來。

桌面版應顯示 4～5 個主要 Mega Menu；手機版才使用漢堡選單。

### 4. 首屏空白太多

Hero 佔滿整個畫面，但真正資訊量很低。現在像漂亮的開場投影片，而不是工程師作品集。

面試官進站後的前十秒，需要立即看到：

- 你的定位
- 主要技術
- 代表作品
- 履歷與聯絡入口
- 你目前求職的方向

### 5. 有兩個重複的向下箭頭

「Explore My Work」內有箭頭，底下又有一顆圓形箭頭，資訊重複。底部箭頭可以改成「Scroll to featured projects」，或直接移除。

左下角紅色 `N` 看起來像開發模式工具指示器，不是網站設計的一部分；正式展示和作品截圖時要確認它不會出現。

---

# 二、2026 年前端職缺真正需要你證明什麼

你舊文件裡有 React 佔 60%～70% 之類的 2024 年估算，但缺乏完整取樣方法，不適合繼續當成精確市場數據。比較可靠的做法，是觀察近期職缺反覆出現哪些要求。

我重新查看 2026 年台灣相關職缺後，React、Next.js 與 TypeScript 仍大量出現；104 的 `TypeScript React` 搜尋頁一度顯示 1000+ 筆結果，但這只是平台關鍵字結果，不能直接解讀為市占率。([104人力銀行](https://www.104.com.tw/jobs/search/?keyword=TypeScript+React&utm_source=chatgpt.com))

近期職缺反覆出現的能力包括：

- JavaScript、TypeScript、HTML、CSS、DOM 與瀏覽器基礎
- React、Vue 或 Angular 等框架實作
- REST、GraphQL 與前後端 API 串接
- Redux、Zustand、Context 等狀態管理
- Git、Code Review、團隊協作
- Jest、Vitest、React Testing Library、Cypress、Playwright
- CI/CD、GitHub Actions、Docker 基礎
- RWD、效能最佳化、可維護架構
- Design System 與可複用元件
- 能與設計師、後端與 PM 協作

這些要求在 1111、104、Cake 與 LinkedIn 的近期職缺樣本中都能看到。([1111 Job Bank](https://www.1111.com.tw/job/132001511/?utm_source=chatgpt.com))

所以你的作品集不能只是列出：

> React、TypeScript、Tailwind、Zustand

而要讓面試官看到：

> 我在哪個專案使用它、解決什麼問題、架構如何設計、遇到什麼困難、怎麼測試與最佳化。

Tailwind 和 Shadcn 是好工具，但不應成為你的核心賣點。這是根據近期職缺樣本做出的推論：企業通常更在意基礎、架構、API、測試與交付能力，Tailwind 常只是工具或加分項。([104人力銀行](https://www.104.com.tw/job/similar/89vgp?utm_source=chatgpt.com))

---

# 三、你的個人定位應重新調整

你目前只寫：

> Frontend Engineer

不算錯，但太普通。

我建議主定位改成：

## 中文

**前端與互動系統開發者**

> 使用 React、Next.js 與 3D Web 技術，打造可操作、可視化且可擴充的數位產品。

第二段帶出你的背景：

> 結合圖書資訊、數位典藏、知識管理與互動技術，專注於資訊系統、資料視覺化及 3D 網頁體驗。

## 英文

**Frontend Developer focused on Interactive Systems**

> I build scalable web applications, interactive 3D experiences, and information-oriented digital products with React, Next.js, TypeScript, and Three.js.

這樣保留「前端求職」主軸，又能讓人記得你的 3D 與圖書資訊特色。

Java、Spring Boot、C#/.NET 現在不要寫成主要專長。它們應放在：

- Currently Learning
- Backend & Desktop Lab
- Learning Roadmap
- In-progress Projects

這比把尚未成熟的技能和 React 並排更可信。

---

# 四、重新設計 Header 與 Mega Menu

你確實適合使用多層導覽，但頂層不要超過五個，不然面試官會開始玩尋寶遊戲。

## 1. Projects｜作品

Mega Menu 內放：

- Featured Projects｜精選作品
- All Projects｜全部作品
- Information Systems｜資訊系統
- 3D & Interactive｜3D 與互動作品
- AI & Data Visualization｜AI 與資料視覺化
- Web Applications｜Web 應用
- Backend & Desktop Lab｜後端與桌面實驗室

## 2. Expertise｜技術能力

- Frontend Engineering
- React & Next.js
- TypeScript Architecture
- Three.js & React Three Fiber
- State & Data Management
- Testing & Code Quality
- Accessibility & Performance

## 3. Journey｜個人歷程

- About Me
- Library & Information Science
- Education
- Experience
- Learning Roadmap
- Technical Notes

## 4. Resume｜履歷

- Online Resume
- Download PDF
- Skills Evidence
- Project Timeline
- Certifications

## 5. Contact｜聯絡

- Contact Form
- GitHub
- Email
- Social Links

語言、主題切換則放在 Header 最右側，不需要成為主要導覽項目。

---

# 五、首頁應該如何重新排列

## Section 1：Hero

首頁首屏建議改成：

**你好，我是 Justin**

# 前端與互動系統開發者

我使用 React、Next.js、TypeScript 與 3D Web 技術，打造資訊系統、資料視覺化工具與互動式數位體驗。

按鈕只保留兩個：

- 查看精選作品
- 下載履歷

底下增加幾個簡潔標籤：

`React` `Next.js` `TypeScript` `Three.js` `Information Systems`

## Section 2：Featured Projects

首頁直接放 3～4 個最能代表你的專案：

1. **數位檔案管理與典藏系統**  
   展示圖書資訊背景、metadata、節點檢索、檔案關聯與桌面型系統思維。

2. **AI Knowledge Workspace**  
   展示 Next.js、知識管理、AI、搜尋、資料結構與現代 UI。

3. **3D Campus Quest／Prism Runner 類型專案**  
   展示 React Three Fiber、Three.js、狀態管理、場景架構與互動。

4. **Document Approval Workflow 或 Digital Archive Review Board**  
   展示企業系統、權限、工作流、表單與複雜狀態。

不要一開始塞二十個作品。首頁只放最強的，其他再進 Project Explorer。

## Section 3：What I Build

用三個大型區塊表現你的三條主線：

- **Information Systems**  
  數位典藏、知識管理、工作流、預約與管理平台。

- **Interactive Web & 3D**  
  Three.js、R3F、Phaser、互動場景與遊戲系統。

- **AI & Data Experiences**  
  AI 工作區、資料分析、Plotly、視覺化與智慧介面。

## Section 4：Skills with Evidence

不要使用「React 90%、Java 65%」這種技能條。

技能沒有客觀百分比，面試官通常也不信。

改成：

| 能力 | 實際證據 |
|---|---|
| React / Next.js | 多語系路由、動態頁面、元件架構、SSR/SSG |
| TypeScript | 嚴格型別、資料模型、可擴充系統架構 |
| Three.js / R3F | 3D 場景、互動、碰撞、程序生成 |
| State Management | Zustand、Context、複雜 UI 狀態 |
| API Integration | REST API、非同步狀態、錯誤處理 |
| Testing | Vitest、RTL、Playwright 實作案例 |

每一項都能點進對應作品。

## Section 5：Learning Roadmap

這裡才呈現：

- Java + Spring Boot
- PostgreSQL / MySQL
- C# + .NET
- Avalonia 或桌面應用
- Docker / CI/CD
- 後端架構與系統設計

顯示三種狀態：

- Learning
- Building
- Demonstrated

這會比假裝全部精通專業得多。

---

# 六、每個作品頁不能只放圖片與技術標籤

每個 Project Case Study 應固定包含：

1. **Project Overview**  
   這個產品解決什麼問題。

2. **My Role**  
   你實際負責哪些部分。

3. **Key Features**  
   核心功能與互動流程。

4. **Architecture**  
   前端架構、資料流、狀態管理、API 與資料模型。

5. **Engineering Challenges**  
   真正困難的地方，以及如何處理。

6. **Quality & Performance**  
   測試、RWD、a11y、效能與錯誤處理。

7. **Screenshots / Video Demo**  
   不只放一張首頁截圖。

8. **What I Learned**  
   實際學到什麼。

9. **Next Improvements**  
   尚未完成與下一步。

10. **Links**  
    Live Demo、GitHub、技術文件。

這才是「工程作品集」，不是 Behance 圖片牆。

---

# 七、我們接下來的完整實作順序

## Phase 1：個人定位與首頁重構

- 修改 Hero 文案
- 調整首屏高度與資訊密度
- 加入精選作品預覽
- 增加履歷 CTA
- 修正中英文內容一致性

## Phase 2：Mega Menu 與資料驅動導航

- 把導覽資料抽成 TypeScript 設定
- Desktop Mega Menu
- Mobile Accordion Menu
- 鍵盤操作與焦點管理
- Active route 狀態

## Phase 3：Project Explorer

- 專案型別與資料模型
- 分類、技術、狀態與年份篩選
- URL Search Params
- 搜尋、排序、空結果處理
- 響應式作品卡片

## Phase 4：Project Case Study

- 動態路由
- MDX 或結構化資料
- 架構圖
- 圖片輪播與影片
- SEO Metadata
- Related Projects

## Phase 5：About、Journey 與 Skills Evidence

- 個人背景
- 圖書資訊與工程能力的連結
- 學習歷程
- 實際技能證據
- Java、C#/.NET 學習路線

## Phase 6：工程品質展示

- Vitest
- React Testing Library
- Playwright
- Error Boundary
- Loading / Empty / Error states
- Accessibility
- Lighthouse
- GitHub Actions

## Phase 7：履歷、聯絡與部署

- 線上履歷
- PDF 履歷
- 聯絡表單
- Open Graph
- Sitemap
- Vercel 部署
- 自訂網域
- 分析工具

---

# 現在正式開始 Phase 1

第一步先只修改 **Header 與 Hero**，不要急著繼續大量新增空白頁面。

下一則請貼出目前這幾個檔案的完整內容：

```text
src/components/header.tsx
src/components/hero.tsx
src/app/[locale]/page.tsx
messages/zh-TW.json
messages/en.json
```

再附上目前 `src/` 的檔案樹。我會直接依照你現在的實際程式碼，給你第一輪可貼上執行的完整修改，而不是再給一套可能和專案版本打架的範例。

之後也適合建立每週一次的台灣前端職缺技能追蹤，避免網站完成時，市場需求又偷偷換了考題。

---

**Sources:**

- [「TypeScript React」最新找工作職缺｜2026年3月](https://www.104.com.tw/jobs/search/?keyword=TypeScript+React&utm_source=chatgpt.com)
- [統一超商資深前端工程師(uniopen)](https://www.1111.com.tw/job/132001511/?utm_source=chatgpt.com)

## Response:
6/19/2026, 10:28:27 PM

> **Clarifying next steps after Sprint 4**
>
> The user mentioned referencing conversation records for what's already implemented, hinting that Sprint 4 is complete. I shouldn't ask for files. Instead, I should identify the next steps, likely post-Sprint 4. I'll review the latest sections to see if there are additional errors or if Sprint 5 is indicated.
>
> **Clarifying next steps after Sprint 4**
>
> It seems the user is asking about the next step, not necessarily after completing Sprint 4. The conversation suggests Sprint 4 includes parts like project types and filters. There's some unfinished work, like outdated parameters in the code and a mismatch in project data. I need to guide them through cleaning up Sprint 4 first, potentially improving the data and aligning it with their goals.
>
> **Planning Sprint 4.1 for portfolio project foundation**
>
> The user's current setup works with raw filtering, but the bilingual content isn’t fully internationalized. There are placeholders for images and category pages. Some headers are hardcoded in Chinese, so the language switch only affects top-level labels. To fix this, I should propose a detailed "Sprint 4.1: Real portfolio project data foundation," including file structure, data types, and component updates. I'll include step-by-step details and important code, especially focusing on `projects.ts`.
>
> **Preparing next steps with real data and personal context**
>
> I haven't found the exact type yet, but it's clear we’ll replace the fake data with real portfolio structures and fix Next.js 16/locale/lucide issues. I should consider using the personal context, as the user refers to past conversations and projects. This will likely improve the solution, so I’ll pull it.
>
> **Remembering**
>
> Reviewing relevant projects
>
> **Remembering**
>
> Highlighting technical strengths
>
> **Remembering**
>
> Identifying learning goals
>
> **Remembering**
>
> Clarifying portfolio positioning
>
> **Planning next step with project data and file references**
>
> The user didn't ask for the latest update, so I can rely on the existing file and personal context. I should cite the uploaded file but avoid citing personal context since it doesn’t support external citations. I’ll structure the next step as "Sprint 4.1: Replace fake project data and finish the project system," potentially with code and specific files for reference. I’ll look up the exact project type at the start of Sprint 4.
>
> **Tracking latest progress after Sprint 4**
>
> I found that the conversation extends beyond Sprint 4, with some later tech/blog implementation. I need to figure out the latest progress, so I'll search for the last major section, possibly related to contact, SEO, or footer. I’ll use search terms like "tech.ts" and "contact" to narrow it down.
>
> **Determining the latest content in the file**
>
> I need to confirm if the file includes the phrase “好 請繼續下一步” after projects. I could search for chronological phrases or use a command like `grep` for the uploaded file. The file path is present in the container, but since I've used file search already, it's better to stick with it. I’ll inspect the last 300 lines.
>
> **Summarizing the current project status and next step**
>
> The conversation shows the project is mostly complete but needs improvements. The current setup features Next.js 16 with TypeScript, Tailwind, i18n, and more. However, there are issues like placeholders, mismatched versions, hardcoded
>
> **Classifying project statuses based on current data**
>
> I’m classifying the projects with what’s available:  
> - Digital Archive Management System: in-progress (system mostly completed, but some gaps remain).  
> - AI Knowledge Workspace: in-progress.  
> - Prism Runner 3D: prototype.  
> - Library Seat & Equipment Reservation System: planned (since not completed).  
> - Document Workflow: planned or in progress.  
> 
> I’ll cite the file for current project status and note it's a placeholder, to be replaced later.
>
> **Handling icons, images, and bilingual project data**
>
> I need to use the existing Lucide icons, but since there might be an issue with GitHub icons in the current setup, I’ll avoid that and use `GitBranch` instead. For images, I'll use local paths with a fallback CSS placeholder. 
> 
> I’ll handle multilingual project data by focusing content around the project rather than messages
>
> **Clarifying project details and navigation options**
>
> User asked about project memory, and frontend stack info:  
> - AI Knowledge Workspace: Next.js, TypeScript, Tailwind, shadcn/ui, Zustand.  
> - Prism Runner 3D: React, TypeScript, React Three Fiber
>
> Thought for 2m 3s

我已經把你提供的完整對話紀錄往後看完。你現在並不是只完成截圖中的 Hero，而是已經做到：

- Next.js 16 App Router、TypeScript、Tailwind CSS
- `next-intl` 中英文路由
- Dark／Light Mode
- Desktop Dropdown Header 與 Mobile Menu
- About 的個人簡介、技能、經歷、教育頁面
- 作品卡片、分類篩選、`[slug]` 動態作品頁
- 技術文章列表與動態文章頁
- React Hook Form + Zod 聯絡表單
- 基礎 Metadata、Open Graph、字體與圖片最佳化

不過，紀錄中的 `projects.ts` 明確使用了電商、天氣、健身 App 等假資料，原本也註明「之後替換成真實作品」；目前作品分類仍是 `web/mobile/design/opensource`，與你真正的專長不太吻合。`前端工程師技能實戰指南_qwen.md` `前端工程師技能實戰指南_qwen.md`

另外，現有作品頁確實已經有卡片、篩選與動態路由，所以不需要重新再做一次相同功能。`前端工程師技能實戰指南_qwen.md` `前端工程師技能實戰指南_qwen.md`

因此，**下一步不是立刻部署，也不是繼續增加空白頁面**，而是進入：

# Sprint 6：真實作品內容化與 Project System V2

這一階段要把網站從「看起來完成的模板」變成「真的能拿去面試的作品集」。

---

# 一、這一階段要完成什麼

這次先完成五件事：

1. 移除所有假專案資料。
2. 改成符合你的真實作品分類。
3. 支援中英文專案內容。
4. 補上作品狀態、角色、問題、解法、挑戰與下一步。
5. 修正 Next.js 16 動態路由與 Lucide icon 問題。

你的作品分類建議改為：

```text
information-system
interactive-3d
ai-data
frontend
backend-desktop
```

對應：

- 資訊系統與數位典藏
- 3D Web 與互動遊戲
- AI 與資料視覺化
- 前端 Web 應用
- 後端與桌面應用學習

---

# 二、調整後的檔案架構

先確認或建立：

```text
src/
├── app/
│   └── [locale]/
│       └── projects/
│           ├── all/
│           │   └── page.tsx
│           └── [slug]/
│               └── page.tsx
├── components/
│   └── projects/
│       ├── project-card.tsx
│       └── project-explorer.tsx
├── data/
│   └── projects.ts
├── lib/
│   └── projects.ts
└── types/
    └── projects.ts
```

建立目錄：

```bash
mkdir -p src/components/projects
mkdir -p src/data
mkdir -p src/lib
mkdir -p src/types
mkdir -p 'src/app/[locale]/projects/all'
mkdir -p 'src/app/[locale]/projects/[slug]'
```

---

# 三、重寫作品型別

將原本的：

```ts
export type ProjectCategory =
  | "web"
  | "mobile"
  | "design"
  | "opensource";
```

替換成更符合你的結構。

## `src/types/projects.ts`

```ts
export type PortfolioLocale = "zh-TW" | "en";

export type ProjectCategory =
  | "information-system"
  | "interactive-3d"
  | "ai-data"
  | "frontend"
  | "backend-desktop";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "prototype"
  | "planned";

export interface LocalizedProjectContent {
  title: string;
  summary: string;
  description: string;

  /**
   * 你在專案中的角色與主要責任。
   */
  role: string;

  /**
   * 專案想解決的核心問題。
   */
  problem: string;

  /**
   * 你採用的解決方案。
   */
  solution: string;

  /**
   * 可被面試官快速閱讀的功能亮點。
   */
  highlights: string[];

  /**
   * 實作過程中的技術挑戰。
   */
  challenges: string[];

  /**
   * 尚未完成或未來準備改進的部分。
   */
  nextSteps: string[];
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;

  year: number;
  featured: boolean;

  technologies: string[];

  /**
   * 建議使用 public/images/projects 下的本機圖片。
   * 尚未準備圖片時可以不填。
   */
  coverImage?: string;

  repositoryUrl?: string;
  demoUrl?: string;

  content: Record<
    PortfolioLocale,
    LocalizedProjectContent
  >;
}
```

這次不再只保存：

```ts
title
description
longDescription
```

因為那種資料量只夠做展示卡片，不夠做專案 Case Study。

---

# 四、換成你的真實專案

## `src/data/projects.ts`

```ts
import type { Project } from "@/types/projects";

export const projects: Project[] = [
  {
    slug: "digital-archive-management-system",
    category: "information-system",
    status: "in-progress",
    year: 2026,
    featured: true,
    technologies: [
      "React",
      "TypeScript",
      "Metadata Modeling",
      "Node-based UI",
      "Search & Filtering",
    ],
    content: {
      "zh-TW": {
        title: "數位檔案管理與典藏系統",
        summary:
          "結合數位典藏、metadata、節點式檢索與檔案關聯探索的個人資料管理平台。",
        description:
          "此專案以圖書資訊與數位典藏概念為基礎，嘗試改善傳統檔案系統必須逐層瀏覽資料夾的限制。使用者可以透過 metadata、欄位條件、布林檢索及視覺化節點組合，逐步縮小搜尋範圍並探索檔案間的關係。",
        role:
          "負責產品概念、資訊架構、前端介面、節點系統、metadata 模型與互動流程設計。",
        problem:
          "一般檔案系統高度依賴資料夾階層，當檔案數量增加後，使用者難以透過內容、主題、來源或關係重新發現資料。",
        solution:
          "建立資料驅動的節點式檢索介面，讓搜尋條件、結果預覽與實際操作節點可以被組合，並以結構化 metadata 支援更細緻的篩選與關聯探索。",
        highlights: [
          "節點式搜尋與操作流程",
          "metadata 條件與欄位篩選",
          "檔案預覽與屬性面板",
          "分類、標籤與關係探索",
          "支援進一步擴充布林檢索與多條件查詢",
        ],
        challenges: [
          "建立清楚且可延伸的節點分類階層",
          "維持節點與右側屬性面板資料一致",
          "將 metadata 從顯示資訊轉變為實際檢索能力",
          "處理大量節點與檔案結果時的介面可讀性",
        ],
        nextSteps: [
          "加入完整布林檢索與巢狀條件群組",
          "加入檔案關係圖與 metadata 編輯器",
          "補上本機檔案掃描與自動歸檔功能",
          "增加測試與大量資料效能驗證",
        ],
      },

      en: {
        title: "Digital Archive Management System",
        summary:
          "A metadata-driven personal archive platform with node-based retrieval and file relationship exploration.",
        description:
          "This project applies concepts from library and information science to personal file management. Instead of relying entirely on folder hierarchies, users can discover files through metadata, structured fields, Boolean conditions, and visual node combinations.",
        role:
          "Responsible for product planning, information architecture, frontend development, node-system design, metadata modeling, and interaction design.",
        problem:
          "Traditional file systems depend heavily on folder hierarchies, making it difficult to rediscover files by subject, source, context, or relationship as collections grow.",
        solution:
          "A data-driven node editor combines search conditions, result previews, and file actions while structured metadata enables more flexible filtering and relationship discovery.",
        highlights: [
          "Node-based retrieval workflow",
          "Metadata and field filtering",
          "File preview and property panels",
          "Classification and relationship discovery",
          "Expandable Boolean-query architecture",
        ],
        challenges: [
          "Designing a scalable node taxonomy",
          "Keeping node data and property panels synchronized",
          "Turning metadata into practical retrieval functionality",
          "Maintaining readability with large result sets",
        ],
        nextSteps: [
          "Add nested Boolean query groups",
          "Build a file relationship graph",
          "Add local file scanning and automatic organization",
          "Introduce testing and large-dataset performance checks",
        ],
      },
    },
  },

  {
    slug: "ai-knowledge-workspace",
    category: "ai-data",
    status: "in-progress",
    year: 2026,
    featured: true,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
    ],
    content: {
      "zh-TW": {
        title: "AI Knowledge Workspace",
        summary:
          "整合知識整理、文件管理、AI 輔助與多面板工作區的個人知識平台。",
        description:
          "這是一套以 Next.js App Router 建立的知識工作區，目標是讓使用者能在同一個介面管理文件、筆記、來源、對話與專案資料。",
        role:
          "負責前端架構、TypeScript 資料模型、工作區介面、元件系統與狀態管理。",
        problem:
          "個人知識常散落在筆記、文件、AI 對話與不同工具之中，缺乏一致的管理方式。",
        solution:
          "以多面板工作區統整文件、來源與 AI 操作，並透過結構化資料模型維持內容之間的關係。",
        highlights: [
          "Next.js App Router 架構",
          "多面板 Workspace 介面",
          "文件與知識來源管理",
          "可擴充的 TypeScript 資料模型",
          "響應式 UI 與狀態管理",
        ],
        challenges: [
          "管理多個面板之間的共享狀態",
          "設計可擴充的文件與知識資料模型",
          "避免大型工作區介面變得混亂",
        ],
        nextSteps: [
          "加入全文搜尋與知識關聯",
          "串接實際 AI 與文件解析服務",
          "加入持久化儲存與使用者權限",
        ],
      },

      en: {
        title: "AI Knowledge Workspace",
        summary:
          "A multi-panel knowledge workspace for documents, sources, projects, and AI-assisted workflows.",
        description:
          "Built with the Next.js App Router, this workspace is designed to bring documents, notes, sources, AI conversations, and project information into one unified interface.",
        role:
          "Responsible for frontend architecture, TypeScript data models, workspace UI, component design, and state management.",
        problem:
          "Personal knowledge is often scattered across notes, files, AI conversations, and unrelated tools.",
        solution:
          "A unified multi-panel workspace organizes documents, sources, and AI actions through structured and extensible data models.",
        highlights: [
          "Next.js App Router architecture",
          "Multi-panel workspace",
          "Document and source management",
          "Extensible TypeScript models",
          "Responsive UI and state management",
        ],
        challenges: [
          "Synchronizing state across multiple panels",
          "Designing extensible knowledge models",
          "Maintaining clarity in a feature-dense interface",
        ],
        nextSteps: [
          "Add full-text search and knowledge relationships",
          "Integrate AI and document-processing services",
          "Add persistent storage and permissions",
        ],
      },
    },
  },

  {
    slug: "prism-runner-3d",
    category: "interactive-3d",
    status: "prototype",
    year: 2026,
    featured: true,
    technologies: [
      "React",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "Zustand",
      "WebGL",
    ],
    content: {
      "zh-TW": {
        title: "Prism Runner 3D",
        summary:
          "使用 React Three Fiber 製作的 3D 平台動作與關卡系統原型。",
        description:
          "專案包含玩家移動、碰撞、移動平台、旋轉平台、陷阱、收集物、終點、關卡串流與除錯介面，重點是將遊戲邏輯、資料與渲染元件分離。",
        role:
          "負責 3D 場景、遊戲系統、玩家操作、碰撞邏輯、關卡資料與除錯工具。",
        problem:
          "大型 3D Web 專案如果將場景、狀態與遊戲邏輯全部寫在元件內，會快速變得難以維護。",
        solution:
          "將關卡資料、遊戲邏輯、狀態管理與 R3F 渲染元件拆分，建立資料驅動的 3D 遊戲架構。",
        highlights: [
          "玩家移動與平台碰撞",
          "移動、旋轉及掉落平台",
          "陷阱、收集物與終點系統",
          "關卡串流與 Debug UI",
          "遊戲邏輯與渲染分離",
        ],
        challenges: [
          "處理每幀更新與 React 狀態的邊界",
          "維持高速移動下的碰撞穩定性",
          "管理場景物件生命週期與關卡切換",
        ],
        nextSteps: [
          "加入完整關卡編輯器",
          "改善角色控制與碰撞回饋",
          "加入效能監控與更多測試關卡",
        ],
      },

      en: {
        title: "Prism Runner 3D",
        summary:
          "A browser-based 3D platformer and level-system prototype built with React Three Fiber.",
        description:
          "The prototype includes player movement, collision systems, moving and rotating platforms, hazards, collectibles, goals, level streaming, and debug tools.",
        role:
          "Responsible for 3D scenes, gameplay systems, controls, collision logic, level data, and debugging tools.",
        problem:
          "Large WebGL projects quickly become difficult to maintain when scene rendering, game state, and gameplay logic are tightly coupled.",
        solution:
          "The project separates level data, gameplay logic, state management, and React Three Fiber rendering into a data-driven architecture.",
        highlights: [
          "Player movement and collision",
          "Moving, rotating, and falling platforms",
          "Hazards, collectibles, and goal systems",
          "Level streaming and debug UI",
          "Separation of gameplay logic and rendering",
        ],
        challenges: [
          "Balancing frame updates with React state",
          "Maintaining stable collision at high movement speeds",
          "Managing object lifecycles and level transitions",
        ],
        nextSteps: [
          "Add a complete level editor",
          "Improve controls and collision feedback",
          "Introduce performance monitoring and more levels",
        ],
      },
    },
  },

  {
    slug: "document-approval-workflow",
    category: "information-system",
    status: "planned",
    year: 2026,
    featured: false,
    technologies: [
      "React",
      "TypeScript",
      "Workflow Modeling",
      "Role-based Access",
    ],
    content: {
      "zh-TW": {
        title: "Document Approval Workflow",
        summary:
          "以多階段簽核、角色權限與文件版本為核心的企業工作流程系統。",
        description:
          "此專案規劃實作文件提交、審查、退回、重新提交、版本追蹤、權限管理與通知流程。",
        role:
          "負責系統規劃、前端架構、流程資料模型與互動設計。",
        problem:
          "文件簽核通常涉及多個角色、狀態與版本，若缺少清楚的流程模型，容易造成追蹤困難。",
        solution:
          "以狀態機與結構化工作流程模型管理文件生命週期、角色權限與操作紀錄。",
        highlights: [
          "多階段文件簽核",
          "角色與權限管理",
          "版本與歷程追蹤",
          "工作流程狀態視覺化",
        ],
        challenges: [
          "設計可擴充的工作流程狀態模型",
          "處理角色權限與操作限制",
        ],
        nextSteps: [
          "完成可操作的前端原型",
          "串接後端 API 與資料庫",
          "加入通知與稽核紀錄",
        ],
      },

      en: {
        title: "Document Approval Workflow",
        summary:
          "An enterprise workflow system focused on multi-stage approvals, roles, and document versions.",
        description:
          "The planned system covers submission, review, rejection, resubmission, version tracking, permission management, and notifications.",
        role:
          "Responsible for system planning, frontend architecture, workflow modeling, and interaction design.",
        problem:
          "Document approval involves multiple roles, states, and versions that are difficult to track without a clear workflow model.",
        solution:
          "A state-machine-based workflow model manages document lifecycles, permissions, and operation history.",
        highlights: [
          "Multi-stage document approval",
          "Role and permission management",
          "Version history",
          "Workflow-state visualization",
        ],
        challenges: [
          "Designing an extensible workflow model",
          "Handling role-specific operation restrictions",
        ],
        nextSteps: [
          "Build an interactive frontend prototype",
          "Connect backend APIs and a database",
          "Add notifications and audit logs",
        ],
      },
    },
  },
];
```

這裡最重要的是：**不要把 planned 專案裝成已完成。**

面試官看到 `planned` 或 `in-progress` 並不會扣分，反而代表你知道如何誠實管理專案狀態。

---

# 五、建立作品查詢工具

## `src/lib/projects.ts`

```ts
import { projects } from "@/data/projects";
import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
} from "@/types/projects";

export function normalizePortfolioLocale(
  locale: string
): PortfolioLocale {
  return locale === "en" ? "en" : "zh-TW";
}

export function getProjectBySlug(
  slug: string
): Project | undefined {
  return projects.find(
    (project) => project.slug === slug
  );
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(
    (project) => project.featured
  );
}

export function getProjectsByCategory(
  category: ProjectCategory
): Project[] {
  return projects.filter(
    (project) => project.category === category
  );
}
```

這樣首頁、列表頁與詳細頁都不需要各自重新寫一次搜尋邏輯。

---

# 六、重寫作品卡片

你之前的版本會再次使用 `Github` icon，但你目前版本的 `lucide-react` 已經發生過 export 錯誤。

因此繼續使用：

```ts
GitBranch
```

不要再匯入：

```ts
Github
```

## `src/components/projects/project-card.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GitBranch,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import type {
  PortfolioLocale,
  Project,
  ProjectStatus,
} from "@/types/projects";

interface ProjectCardProps {
  project: Project;
  locale: PortfolioLocale;
  index: number;
}

const statusLabels: Record<
  PortfolioLocale,
  Record<ProjectStatus, string>
> = {
  "zh-TW": {
    completed: "已完成",
    "in-progress": "開發中",
    prototype: "原型",
    planned: "規劃中",
  },
  en: {
    completed: "Completed",
    "in-progress": "In progress",
    prototype: "Prototype",
    planned: "Planned",
  },
};

export function ProjectCard({
  project,
  locale,
  index,
}: ProjectCardProps) {
  const content = project.content[locale];

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.06,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative flex min-h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/30">
        <span className="select-none text-5xl font-bold text-primary/30">
          {content.title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 3)}
        </span>

        <div className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
          {statusLabels[locale][project.status]}
        </div>

        {project.featured && (
          <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {locale === "en" ? "Featured" : "精選"}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
            {project.year}
          </p>

          <h2 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
            {content.title}
          </h2>

          <p className="text-sm leading-6 text-muted-foreground">
            {content.summary}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies
            .slice(0, 5)
            .map((technology) => (
              <span
                key={technology}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {technology}
              </span>
            ))}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {locale === "en"
              ? "View case study"
              : "查看專案案例"}

            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={
                locale === "en"
                  ? "Open source code"
                  : "查看原始碼"
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent"
            >
              <GitBranch className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
```

---

# 七、建立真正有用的作品搜尋與分類

## `src/components/projects/project-explorer.tsx`

```tsx
"use client";

import {
  useMemo,
  useState,
} from "react";
import { useLocale } from "next-intl";
import {
  Search,
  X,
} from "lucide-react";

import { projects } from "@/data/projects";
import { normalizePortfolioLocale } from "@/lib/projects";
import type {
  ProjectCategory,
} from "@/types/projects";

import { ProjectCard } from "./project-card";

type CategoryFilter =
  | "all"
  | ProjectCategory;

const categoryValues: CategoryFilter[] = [
  "all",
  "information-system",
  "interactive-3d",
  "ai-data",
  "frontend",
  "backend-desktop",
];

const labels = {
  "zh-TW": {
    title: "作品與實作案例",
    subtitle:
      "從資訊系統、3D Web 到 AI 與前端應用，查看我的實際開發歷程。",
    search: "搜尋作品、技術或功能",
    empty: "找不到符合條件的作品。",
    clear: "清除搜尋",
    categories: {
      all: "全部",
      "information-system": "資訊系統",
      "interactive-3d": "3D 與互動",
      "ai-data": "AI 與資料",
      frontend: "前端應用",
      "backend-desktop": "後端與桌面",
    },
  },

  en: {
    title: "Projects and Case Studies",
    subtitle:
      "Explore my work across information systems, interactive 3D, AI, data, and frontend development.",
    search: "Search projects, technologies, or features",
    empty: "No projects match the current filters.",
    clear: "Clear search",
    categories: {
      all: "All",
      "information-system": "Information Systems",
      "interactive-3d": "3D & Interactive",
      "ai-data": "AI & Data",
      frontend: "Frontend",
      "backend-desktop": "Backend & Desktop",
    },
  },
} as const;

export function ProjectExplorer() {
  const currentLocale = useLocale();
  const locale =
    normalizePortfolioLocale(currentLocale);

  const text = labels[locale];

  const [category, setCategory] =
    useState<CategoryFilter>("all");

  const [query, setQuery] =
    useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return projects.filter((project) => {
      const content =
        project.content[locale];

      const matchesCategory =
        category === "all" ||
        project.category === category;

      const searchableText = [
        content.title,
        content.summary,
        content.description,
        ...content.highlights,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        searchableText.includes(
          normalizedQuery
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    category,
    locale,
    query,
  ]);

  return (
    <main className="min-h-screen px-4 pb-20 pt-28">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {text.title}
          </h1>

          <p className="text-lg leading-8 text-muted-foreground">
            {text.subtitle}
          </p>
        </header>

        <section
          aria-label={
            locale === "en"
              ? "Project filters"
              : "作品篩選"
          }
          className="mb-10"
        >
          <div className="mx-auto mb-6 flex max-w-2xl items-center gap-2 rounded-xl border border-border bg-card px-4">
            <Search className="h-5 w-5 text-muted-foreground" />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder={text.search}
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={text.clear}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categoryValues.map(
              (categoryValue) => (
                <button
                  key={categoryValue}
                  type="button"
                  onClick={() =>
                    setCategory(
                      categoryValue
                    )
                  }
                  aria-pressed={
                    category ===
                    categoryValue
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    category ===
                    categoryValue
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {
                    text.categories[
                      categoryValue
                    ]
                  }
                </button>
              )
            )}
          </div>
        </section>

        {filteredProjects.length > 0 ? (
          <section className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map(
              (project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  index={index}
                />
              )
            )}
          </section>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
            {text.empty}
          </div>
        )}
      </div>
    </main>
  );
}
```

---

# 八、更新作品列表頁

## `src/app/[locale]/projects/all/page.tsx`

```tsx
import type { Metadata } from "next";

import { ProjectExplorer } from "@/components/projects/project-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Justin's development projects and case studies.",
};

export default function AllProjectsPage() {
  return <ProjectExplorer />;
}
```

這次先保持簡單。

之後再把 Metadata 改成依照 locale 產生，但不要同一輪一次挖十個坑，否則作品集又會開始長出地下城。

---

# 九、重寫 Next.js 16 動態作品頁

你對話紀錄中的版本仍然使用：

```ts
params: {
  slug: string;
}
```

但你目前使用 Next.js 16，應該改成 Promise：

```ts
params: Promise<{
  locale: string;
  slug: string;
}>;
```

同時不要再使用會出錯的 `Github` icon。

## `src/app/[locale]/projects/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Wrench,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";
import {
  getProjectBySlug,
  normalizePortfolioLocale,
} from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
    slug,
  } = await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  const content =
    project.content[locale];

  return {
    title: content.title,
    description: content.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const {
    locale: localeParam,
    slug,
  } = await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  const content =
    project.content[locale];

  const text =
    locale === "en"
      ? {
          back: "Back to projects",
          role: "My role",
          problem: "Problem",
          solution: "Solution",
          highlights: "Key features",
          challenges:
            "Engineering challenges",
          nextSteps: "Next steps",
          technologies: "Technologies",
          code: "Source code",
          demo: "Live demo",
        }
      : {
          back: "返回作品列表",
          role: "我的角色",
          problem: "問題背景",
          solution: "解決方案",
          highlights: "核心功能",
          challenges: "技術挑戰",
          nextSteps: "後續規劃",
          technologies: "使用技術",
          code: "查看原始碼",
          demo: "線上展示",
        };

  return (
    <main className="min-h-screen px-4 pb-20 pt-28">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/projects/all"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {text.back}
        </Link>

        <header className="mb-12">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {project.year}
            </span>

            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {project.status}
            </span>
          </div>

          <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-6xl">
            {content.title}
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            {content.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                {text.demo}
              </a>
            )}

            {project.repositoryUrl && (
              <a
                href={
                  project.repositoryUrl
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                <GitBranch className="h-4 w-4" />
                {text.code}
              </a>
            )}
          </div>
        </header>

        <div className="mb-12 rounded-2xl border border-border bg-card p-7">
          <p className="leading-8 text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <CaseStudySection
            title={text.role}
            content={content.role}
          />

          <CaseStudySection
            title={text.problem}
            content={content.problem}
          />

          <CaseStudySection
            title={text.solution}
            content={content.solution}
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ListSection
            title={text.highlights}
            items={content.highlights}
            icon="check"
          />

          <ListSection
            title={text.challenges}
            items={content.challenges}
            icon="tool"
          />
        </div>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-bold">
            {text.technologies}
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.technologies.map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-card p-7">
          <h2 className="mb-5 text-2xl font-bold">
            {text.nextSteps}
          </h2>

          <ul className="space-y-3">
            {content.nextSteps.map(
              (step) => (
                <li
                  key={step}
                  className="flex gap-3 text-muted-foreground"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{step}</span>
                </li>
              )
            )}
          </ul>
        </section>
      </article>
    </main>
  );
}

interface CaseStudySectionProps {
  title: string;
  content: string;
}

function CaseStudySection({
  title,
  content,
}: CaseStudySectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-3 text-lg font-bold">
        {title}
      </h2>

      <p className="text-sm leading-7 text-muted-foreground">
        {content}
      </p>
    </section>
  );
}

interface ListSectionProps {
  title: string;
  items: string[];
  icon: "check" | "tool";
}

function ListSection({
  title,
  items,
  icon,
}: ListSectionProps) {
  const Icon =
    icon === "check"
      ? CheckCircle2
      : Wrench;

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">
        {title}
      </h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-xl border border-border bg-card p-4"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <span className="text-sm leading-6 text-muted-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

# 十、修改 Header 的作品分類

你目前 Header 仍是：

```text
Web 應用
移動應用
UI/UX 設計
開源專案
```

這些分類太像教學模板。

將作品選單改成：

```tsx
projects: [
  {
    href: "/projects/all",
    label: "全部作品",
    icon: Layers,
    description: "瀏覽所有開發作品",
  },
  {
    href: "/projects/all?category=information-system",
    label: "資訊系統",
    icon: Database,
    description: "數位典藏與管理平台",
  },
  {
    href: "/projects/all?category=interactive-3d",
    label: "3D 與互動",
    icon: Cuboid,
    description: "Three.js 與互動式體驗",
  },
  {
    href: "/projects/all?category=ai-data",
    label: "AI 與資料",
    icon: BrainCircuit,
    description: "AI、知識與資料應用",
  },
  {
    href: "/projects/all?category=frontend",
    label: "前端應用",
    icon: Code2,
    description: "React 與 Web 系統",
  },
],
```

需要加入：

```tsx
import {
  BrainCircuit,
  Code2,
  Cuboid,
  Database,
  Layers,
} from "lucide-react";
```

不過你目前的 `ProjectExplorer` 還沒有讀取 URL query。第一輪點進去會顯示全部作品，搜尋與按鈕本身正常；下一輪再把 query 與篩選狀態同步，不要同時把所有東西攪成一鍋 TypeScript 粥。

---

# 十一、先修正兩個現有的潛在錯誤

## 1. 技術文章動態頁也要改 Next.js 16 params

對話紀錄中的文章頁目前仍是：

```tsx
export default function ArticleDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
})
```

改成：

```tsx
interface ArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  // 後續邏輯
}
```

`generateMetadata` 也一樣要 `await params`。

## 2. 全專案搜尋錯誤 icon

執行：

```bash
grep -R "Github" src
```

若還有結果，全部確認是否需要改成：

```tsx
GitBranch
```

你之前只修了 Header，但作品卡片與作品詳細頁的舊範例又重新使用了 `Github`，很容易同一顆香蕉皮滑兩次。

---

# 十二、完成後執行檢查

```bash
rm -rf .next

npx tsc --noEmit

npm run lint

npm run build

npm run dev
```

測試以下網址：

```text
http://localhost:3000/zh-TW/projects/all
http://localhost:3000/en/projects/all

http://localhost:3000/zh-TW/projects/digital-archive-management-system
http://localhost:3000/en/projects/prism-runner-3d
```

確認：

- 中英文專案內容不同
- 搜尋功能正常
- 分類功能正常
- planned 與 in-progress 狀態有清楚顯示
- 不再出現電商、天氣、健身等假專案
- 詳細頁使用真實專案問題與解法
- `npm run build` 可以成功

---

# 這一輪做完後的下一階段

下一階段才是 **首頁重構**，把目前只有 Hero 的首頁改成：

```text
Hero
→ 精選作品
→ 我能建立什麼
→ 技能與實際證據
→ 學習 Roadmap
→ About Preview
→ Contact CTA
```

其中 Java、Spring Boot、C#/.NET 不會假裝成已精通，而會放在：

```text
Currently Learning
Building
Planned
```

這樣網站才會同時呈現你的前端主力、3D 差異化、圖書資訊背景，以及後端與桌面應用的成長方向。

## Response:
6/19/2026, 10:35:39 PM

> **Verifying current libraries for Next.js project**
>
> I need to confirm the version of Framer Motion or "motion modules" the user is working with. They might already have "framer-motion" in their project, so I don’t want to get too deep into updates unless necessary. I’ll check official docs for the latest API and consider whether any Next.js updates affect things.
>
> **Searching for official Motion React documentation**
>
> [Getting Started: Server and Client Components | Next.js](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
> [React Animation | Keyframes, Transitions & Gestures | Motion React](https://motion.dev/docs/react-animation)
> [MotionConfig — Configure Motion for React | Motion React](https://www.motion.dev/docs/react-motion-config)
>
> **Planning homepage rebuild with animation architecture**
>
> I’m planning the next step: rebuilding the homepage with animation. I’ll suggest installing "motion" and transitioning imports from "framer-motion" to avoid duplication. After ensuring no "framer-motion" imports are left, we can uninstall it. I’ll recommend using `LazyMotion` to optimize bundles and consider project data already provided. We’ll also need a global provider setup.
>
> **Mapping out the next steps for user project**
>
> I’m thinking about the user’s request for detailed next steps, breaking it down into smaller tasks such as creating motion components and sections for the homepage. I’ll also consider making the whole thing bilingual by adding translation support for text with `useTranslations` and `next-intl`. I’ll focus on clear, manageable code for each part.
>
> **Designing homepage layout with animations and icons**
>
> It sounds like I should rely on common, safe icons like Code2, Database, Box, and others. For the hero section, I’ll include key phrases like "Frontend & Interactive Systems Developer" and some impressive features like animated components (e.g., "capability constellation"). I’ll animate cards on hover for the featured projects section and use motion for smooth transitions.
>
> **Planning first step: Animation foundation and homepage sections**
>
> I’m thinking about animating elements like hover
>
> **Migrating to `motion/react` and optimizing code**
>
> To switch to `motion/react`, I’ll first use a simple command to replace `framer-motion` imports with `motion/react`, then uninstall `framer-motion`. I’ll set up the
>
> **Refining architecture and content structure**
>
> Instead of using the client locale directly, it’s better to store language strings in data. I’ll focus on using `next-intl` for global UI, while portfolio content is handled via structured data with arrays and typed components. For icons, I’ll store key references and map them to icons
>
> **Planning components and animations for homepage**
>
> I’m thinking about breaking the homepage into smaller components for better architecture, but I could also create a monolithic file for simplicity. For animations, I’ll use parallax effects with `useMotionValue`, `useSpring`, and `useTransform` for smooth motion. I’ll make sure to handle reduced motion for accessibility by using `useReducedMotion` and adjusting animations.
>
> **Planning animations and styles for homepage**
>
> I’ll use `whileInView` for step cards and animate background gradients for elements like buttons. For utility classes, I’ll define styles like `.portfolio-grid` and `.animated-gradient-text`. I also want to make sure animations adjust for
>
> **Organizing resume links and featured projects**
>
> I’m thinking it’s safer to use `href="/resume.pdf"` for consistency with prior implementation, though we could place the resume in `/resume/justin-lu-resume.pdf`. For the Orbit
>
> **Simplifying content management and layout**
>
> I’m thinking about passing content through a simpler method like this: `const content = homeContent[locale]`.
>
> **Transitions and optimization for motion animations**
>
> Okay, so I'll replace "framer-motion" with "motion", but I'll keep the existing imports for now to avoid breaking things. I'll use `m` with LazyMotion for new components and make sure to follow best animation practices like using transform and opacity. I won’t go into route transitions yet, though—that’ll be part of the next phase.
>
> Thought for 1m 31s

好，接下來正式進入：

# Sprint 7：動畫化首頁與 Motion 動畫基礎系統

依照目前對話紀錄，你的首頁仍主要是單一 `Hero`，並且原先就預定透過 Framer Motion 製作進場、背景與互動動畫。`前端工程師技能實戰指南_qwen.md`

這一輪不只是多塞幾個區塊，而是建立一套之後所有頁面都能共用的動畫系統：

- 全站 Motion Provider
- 頁面捲動進度條
- Scroll Reveal
- Stagger Animation
- Hero 滑鼠視差
- Scroll Parallax
- 無限旋轉技術軌道
- 卡片 Hover Lift
- 區塊進場動畫
- Roadmap 時間軸動畫
- 支援 `prefers-reduced-motion`

目前 Motion 官方 React 套件使用 `motion/react`，並提供 `LazyMotion`、`useScroll`、`useTransform`、`useSpring` 與 `useReducedMotion`。我們會使用 `LazyMotion + m`，避免動畫功能把客戶端 bundle 養得比作品集本人還胖。([Motion](https://motion.dev/docs/react-animation?utm_source=chatgpt.com))

首頁 `page.tsx` 繼續保留為 Server Component，只把真正需要狀態、瀏覽器事件和動畫 Hook 的區塊拆成 Client Components，符合目前 Next.js App Router 的元件分工方式。([Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components?utm_source=chatgpt.com))

---

# 一、安裝並統一 Motion 套件

先安裝目前的 Motion React 套件：

```bash
npm install motion
```

搜尋目前舊的 import：

```bash
grep -R 'from "framer-motion"' src
grep -R "from 'framer-motion'" src
```

在 VS Code 使用全域取代：

```text
from "framer-motion"
```

替換成：

```text
from "motion/react"
```

單引號版本也一起替換。

全部替換完後再確認：

```bash
grep -R "framer-motion" src
```

沒有結果才移除舊套件：

```bash
npm uninstall framer-motion
```

原本這種寫法仍可使用：

```tsx
import {
  motion,
  AnimatePresence,
} from "motion/react";
```

不過接下來新元件會優先使用：

```tsx
import { m } from "motion/react";
```

因為 `m` 可以搭配 `LazyMotion` 延遲載入動畫功能。

---

# 二、建立新的動畫元件結構

建立以下目錄：

```bash
mkdir -p src/components/motion
mkdir -p src/components/home
```

完成後結構會是：

```text
src/
├── components/
│   ├── motion/
│   │   ├── motion-provider.tsx
│   │   ├── scroll-progress.tsx
│   │   ├── reveal.tsx
│   │   └── section-heading.tsx
│   └── home/
│       ├── hero-section.tsx
│       └── home-sections.tsx
├── data/
│   ├── projects.ts
│   └── home.ts
└── app/
    └── [locale]/
        ├── layout.tsx
        └── page.tsx
```

---

# 三、建立全站 Motion Provider

建立：

```text
src/components/motion/motion-provider.tsx
```

```tsx
"use client";

import type { ReactNode } from "react";
import {
  domAnimation,
  LazyMotion,
  MotionConfig,
} from "motion/react";

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({
  children,
}: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
```

這裡有三個作用：

- `LazyMotion`：按需載入動畫功能。
- `MotionConfig`：統一動畫節奏。
- `reducedMotion="user"`：尊重作業系統的減少動畫設定。

---

# 四、建立全站捲動進度條

建立：

```text
src/components/motion/scroll-progress.tsx
```

```tsx
"use client";

import {
  m,
  useScroll,
  useSpring,
} from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 28,
      mass: 0.3,
    }
  );

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-1 origin-left bg-primary"
    />
  );
}
```

使用者往下捲動時，最上方會出現細小進度條。

這不是單純裝飾，也可以讓長首頁有明確的閱讀進度。

---

# 五、建立共用 Scroll Reveal

建立：

```text
src/components/motion/reveal.tsx
```

```tsx
"use client";

import type {
  ReactNode,
} from "react";
import {
  m,
  useReducedMotion,
} from "motion/react";

type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  distance?: number;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 32,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const shouldReduceMotion =
    useReducedMotion();

  const offset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getDirectionOffset(
        direction,
        distance
      );

  return (
    <m.div
      initial={{
        opacity: 0,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0.2
            : duration,
        delay:
          shouldReduceMotion
            ? 0
            : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function getDirectionOffset(
  direction: RevealDirection,
  distance: number
) {
  switch (direction) {
    case "down":
      return {
        x: 0,
        y: -distance,
      };

    case "left":
      return {
        x: distance,
        y: 0,
      };

    case "right":
      return {
        x: -distance,
        y: 0,
      };

    case "none":
      return {
        x: 0,
        y: 0,
      };

    case "up":
    default:
      return {
        x: 0,
        y: distance,
      };
  }
}
```

之後其他頁面都可以直接這樣使用：

```tsx
<Reveal>
  <h2>作品集</h2>
</Reveal>
```

或者：

```tsx
<Reveal
  direction="left"
  delay={0.15}
>
  <ProjectCard />
</Reveal>
```

---

# 六、建立共用 Section Heading

建立：

```text
src/components/motion/section-heading.tsx
```

```tsx
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center"
      : "";

  return (
    <div
      className={`mb-12 max-w-3xl ${alignment}`}
    >
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground md:text-lg">
          {description}
        </p>
      </Reveal>
    </div>
  );
}
```

---

# 七、建立首頁的中英文結構化內容

你已經使用 `next-intl` 處理全站導覽與一般文案。

但首頁這種具有大量陣列、技術項目、Roadmap、證據資料的內容，放在 TypeScript 資料檔會更好維護，也能有完整型別檢查。

建立：

```text
src/data/home.ts
```

```ts
export type HomeLocale =
  | "zh-TW"
  | "en";

export const homeContent = {
  "zh-TW": {
    hero: {
      eyebrow:
        "Frontend · Interactive Systems · 3D Web",

      greeting:
        "你好，我是 Justin",

      title:
        "我打造可操作、可視化且可擴充的",

      titleAccent:
        "數位產品與互動系統",

      description:
        "我以 React、Next.js、TypeScript 與 Three.js 建立現代 Web 應用，並結合圖書資訊、數位典藏、知識管理與資料視覺化背景，設計真正能處理複雜資訊的產品。",

      availability:
        "目前專注於前端工程、3D Web 與資訊系統作品",

      primaryCta:
        "探索精選作品",

      secondaryCta:
        "下載履歷",

      focusCards: [
        {
          label: "前端主力",
          value:
            "React / Next.js / TypeScript",
        },
        {
          label: "互動技術",
          value:
            "Three.js / R3F / Phaser",
        },
        {
          label: "領域背景",
          value:
            "Metadata / Archive / LIS",
        },
      ],
    },

    featured: {
      eyebrow: "Featured Work",
      title: "精選開發作品",
      description:
        "這些專案不只展示畫面，也記錄了需求、資料模型、系統架構、互動設計與技術決策。",
      viewAll: "查看所有作品",
      viewCaseStudy: "查看完整案例",
      featuredLabel: "精選",
    },

    domains: {
      eyebrow: "What I Build",
      title: "我專注建立的產品類型",
      description:
        "我的作品橫跨資訊管理、互動式 Web、3D 場景、AI 工作區與資料視覺化，但核心都是把複雜問題整理成清楚、可操作的介面。",

      items: [
        {
          icon: "database",
          title:
            "資訊系統與數位典藏",
          description:
            "將 metadata、分類、檢索、檔案關聯與工作流程轉化為真正可操作的數位產品。",
          tags: [
            "Metadata",
            "Search",
            "Workflow",
            "Archive",
          ],
        },
        {
          icon: "box",
          title:
            "3D Web 與互動體驗",
          description:
            "使用 Three.js、React Three Fiber 與遊戲系統架構建立可探索、可操作的瀏覽器體驗。",
          tags: [
            "Three.js",
            "R3F",
            "WebGL",
            "Phaser",
          ],
        },
        {
          icon: "code",
          title:
            "現代前端應用",
          description:
            "以 React、Next.js 與 TypeScript 建立可維護、響應式且具有完整狀態處理的應用程式。",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
            "Testing",
          ],
        },
      ],
    },

    skills: {
      eyebrow: "Evidence, Not Percentages",
      title: "技能以實際作品證明",
      description:
        "我不使用沒有客觀標準的技能百分比，而是直接展示每項技術實際解決過的問題。",

      items: [
        {
          title:
            "React 與元件架構",
          evidence:
            "建立多面板工作區、資料驅動介面、動態表單與高複用元件系統。",
          tags: [
            "React",
            "Component Design",
          ],
        },
        {
          title:
            "Next.js App Router",
          evidence:
            "實作多語系路由、動態作品頁、Metadata、Server 與 Client Component 分工。",
          tags: [
            "App Router",
            "SSR",
            "SSG",
          ],
        },
        {
          title:
            "TypeScript 資料模型",
          evidence:
            "為作品、節點、檔案、角色、工作流程與遊戲系統建立嚴格型別。",
          tags: [
            "Type Safety",
            "Data Modeling",
          ],
        },
        {
          title:
            "Three.js 與 R3F",
          evidence:
            "處理 3D 場景、玩家控制、碰撞、平台、關卡資料與互動物件。",
          tags: [
            "Three.js",
            "R3F",
            "WebGL",
          ],
        },
        {
          title:
            "狀態與資料流",
          evidence:
            "使用 Zustand、Context、URL 狀態與結構化資料管理複雜介面。",
          tags: [
            "Zustand",
            "State Design",
          ],
        },
        {
          title:
            "資訊架構與 Metadata",
          evidence:
            "運用圖書資訊背景設計數位典藏、分類、檢索、知識關係與工作流程。",
          tags: [
            "LIS",
            "Metadata",
            "Retrieval",
          ],
        },
      ],
    },

    roadmap: {
      eyebrow: "Growth Roadmap",
      title: "目前技術發展路線",
      description:
        "前端與互動系統是目前主力；後端與桌面應用則透過實際專案持續建立完整能力。",

      items: [
        {
          status: "demonstrated",
          phase: "已實作",
          title:
            "Frontend Engineering",
          description:
            "React、Next.js、TypeScript、Tailwind、狀態管理與複雜互動介面。",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
          ],
        },
        {
          status: "demonstrated",
          phase: "已實作",
          title:
            "Interactive 3D Web",
          description:
            "Three.js、React Three Fiber、WebGL、Phaser 與遊戲系統。",
          tags: [
            "Three.js",
            "R3F",
            "Phaser",
          ],
        },
        {
          status: "building",
          phase: "建構中",
          title:
            "Java & Spring Boot",
          description:
            "RESTful API、後端分層架構、資料庫、權限與企業應用設計。",
          tags: [
            "Java",
            "Spring Boot",
            "REST",
          ],
        },
        {
          status: "planned",
          phase: "下一階段",
          title:
            "C# & .NET Desktop",
          description:
            "跨平台桌面應用、完整資訊系統與前後端整合。",
          tags: [
            "C#",
            ".NET",
            "Desktop",
          ],
        },
      ],
    },

    contact: {
      eyebrow: "Let’s Build",
      title:
        "需要一位能處理前端、互動與複雜資訊的開發者？",
      description:
        "歡迎查看完整作品案例、GitHub 程式碼，或直接與我聯絡。",
      primaryCta: "聯絡我",
      secondaryCta:
        "瀏覽所有作品",
    },
  },

  en: {
    hero: {
      eyebrow:
        "Frontend · Interactive Systems · 3D Web",

      greeting:
        "Hi, I’m Justin",

      title:
        "I build usable, visual, and scalable",

      titleAccent:
        "digital products and interactive systems",

      description:
        "I build modern web applications with React, Next.js, TypeScript, and Three.js, combining frontend engineering with a background in library science, digital archives, knowledge management, and data visualization.",

      availability:
        "Currently focused on frontend engineering, 3D web, and information systems",

      primaryCta:
        "Explore featured work",

      secondaryCta:
        "Download resume",

      focusCards: [
        {
          label: "Frontend",
          value:
            "React / Next.js / TypeScript",
        },
        {
          label: "Interactive",
          value:
            "Three.js / R3F / Phaser",
        },
        {
          label: "Domain",
          value:
            "Metadata / Archive / LIS",
        },
      ],
    },

    featured: {
      eyebrow: "Featured Work",
      title:
        "Selected development projects",
      description:
        "These projects present not only interfaces, but also requirements, data models, architecture, interaction design, and engineering decisions.",
      viewAll: "View all projects",
      viewCaseStudy:
        "View case study",
      featuredLabel: "Featured",
    },

    domains: {
      eyebrow: "What I Build",
      title:
        "Products and systems I focus on",
      description:
        "My projects span information systems, interactive web, 3D experiences, AI workspaces, and data visualization, all centered on turning complex problems into clear interfaces.",

      items: [
        {
          icon: "database",
          title:
            "Information Systems",
          description:
            "Transforming metadata, classification, retrieval, file relationships, and workflows into usable digital products.",
          tags: [
            "Metadata",
            "Search",
            "Workflow",
            "Archive",
          ],
        },
        {
          icon: "box",
          title:
            "3D Web & Interaction",
          description:
            "Building explorable browser experiences with Three.js, React Three Fiber, and gameplay architecture.",
          tags: [
            "Three.js",
            "R3F",
            "WebGL",
            "Phaser",
          ],
        },
        {
          icon: "code",
          title:
            "Modern Frontend Apps",
          description:
            "Building maintainable and responsive applications with React, Next.js, TypeScript, and reliable state handling.",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
            "Testing",
          ],
        },
      ],
    },

    skills: {
      eyebrow:
        "Evidence, Not Percentages",
      title:
        "Skills demonstrated through real work",
      description:
        "Instead of arbitrary skill percentages, I connect each capability to systems and problems I have actually worked on.",

      items: [
        {
          title:
            "React Architecture",
          evidence:
            "Built multi-panel workspaces, data-driven interfaces, dynamic forms, and reusable component systems.",
          tags: [
            "React",
            "Component Design",
          ],
        },
        {
          title:
            "Next.js App Router",
          evidence:
            "Implemented localized routing, dynamic project pages, metadata, and Server-Client Component boundaries.",
          tags: [
            "App Router",
            "SSR",
            "SSG",
          ],
        },
        {
          title:
            "TypeScript Modeling",
          evidence:
            "Created strict models for projects, nodes, files, workflows, characters, and gameplay systems.",
          tags: [
            "Type Safety",
            "Data Modeling",
          ],
        },
        {
          title:
            "Three.js & R3F",
          evidence:
            "Implemented 3D scenes, player controls, collision systems, platforms, level data, and interactions.",
          tags: [
            "Three.js",
            "R3F",
            "WebGL",
          ],
        },
        {
          title:
            "State and Data Flow",
          evidence:
            "Managed complex interfaces through Zustand, Context, URL state, and structured data.",
          tags: [
            "Zustand",
            "State Design",
          ],
        },
        {
          title:
            "Metadata Architecture",
          evidence:
            "Applied library-science concepts to archives, classification, retrieval, knowledge relationships, and workflows.",
          tags: [
            "LIS",
            "Metadata",
            "Retrieval",
          ],
        },
      ],
    },

    roadmap: {
      eyebrow: "Growth Roadmap",
      title:
        "My current technical direction",
      description:
        "Frontend and interactive systems are my current strengths, while backend and desktop development are being expanded through practical projects.",

      items: [
        {
          status: "demonstrated",
          phase: "Demonstrated",
          title:
            "Frontend Engineering",
          description:
            "React, Next.js, TypeScript, Tailwind, state management, and complex interactive interfaces.",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
          ],
        },
        {
          status: "demonstrated",
          phase: "Demonstrated",
          title:
            "Interactive 3D Web",
          description:
            "Three.js, React Three Fiber, WebGL, Phaser, and gameplay systems.",
          tags: [
            "Three.js",
            "R3F",
            "Phaser",
          ],
        },
        {
          status: "building",
          phase: "Building",
          title:
            "Java & Spring Boot",
          description:
            "REST APIs, layered backend architecture, databases, authorization, and enterprise applications.",
          tags: [
            "Java",
            "Spring Boot",
            "REST",
          ],
        },
        {
          status: "planned",
          phase: "Next",
          title:
            "C# & .NET Desktop",
          description:
            "Cross-platform desktop applications, complete information systems, and frontend-backend integration.",
          tags: [
            "C#",
            ".NET",
            "Desktop",
          ],
        },
      ],
    },

    contact: {
      eyebrow: "Let’s Build",
      title:
        "Looking for a developer who understands frontend, interaction, and complex information?",
      description:
        "Explore my complete case studies and source code, or contact me directly.",
      primaryCta: "Contact me",
      secondaryCta:
        "Browse all projects",
    },
  },
} as const;

export type HomeContent =
  (typeof homeContent)[HomeLocale];
```

---

# 八、重做高動畫 Hero Section

建立：

```text
src/components/home/hero-section.tsx
```

```tsx
"use client";

import type {
  PointerEvent,
} from "react";
import {
  useRef,
} from "react";
import {
  ArrowRight,
  Box,
  Code2,
  Database,
  Download,
  Sparkles,
} from "lucide-react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { Link } from "@/i18n/navigation";
import type {
  HomeContent,
} from "@/data/home";

interface HeroSectionProps {
  content: HomeContent["hero"];
}

const orbitItems = [
  {
    label: "React",
    className:
      "left-2 top-[18%] md:-left-3",
  },
  {
    label: "TypeScript",
    className:
      "right-0 top-[22%] md:-right-4",
  },
  {
    label: "Three.js",
    className:
      "bottom-[18%] left-4 md:-left-2",
  },
  {
    label: "Metadata",
    className:
      "bottom-[12%] right-1 md:-right-6",
  },
];

export function HeroSection({
  content,
}: HeroSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const pointerX =
    useMotionValue(0);

  const pointerY =
    useMotionValue(0);

  const smoothX = useSpring(
    pointerX,
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const smoothY = useSpring(
    pointerY,
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const backgroundX =
    useTransform(
      smoothX,
      [-600, 600],
      [-45, 45]
    );

  const backgroundY =
    useTransform(
      smoothY,
      [-400, 400],
      [-35, 35]
    );

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end start",
      ],
    });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 150]
  );

  const heroOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.78],
      [1, 0]
    );

  function handlePointerMove(
    event: PointerEvent<HTMLElement>
  ) {
    if (shouldReduceMotion) {
      return;
    }

    const rect =
      event.currentTarget
        .getBoundingClientRect();

    pointerX.set(
      event.clientX -
        rect.left -
        rect.width / 2
    );

    pointerY.set(
      event.clientY -
        rect.top -
        rect.height / 2
    );
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        resetPointer
      }
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border/60 pt-24"
    >
      <div
        aria-hidden="true"
        className="portfolio-grid absolute inset-0 opacity-60"
      />

      <m.div
        aria-hidden="true"
        style={{
          x: shouldReduceMotion
            ? 0
            : backgroundX,
          y: shouldReduceMotion
            ? 0
            : backgroundY,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px] will-change-transform"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-8 h-96 w-96 rounded-full bg-secondary/60 blur-3xl"
      />

      <m.div
        style={{
          y: shouldReduceMotion
            ? 0
            : heroY,
          opacity:
            shouldReduceMotion
              ? 1
              : heroOpacity,
        }}
        className="section-shell relative z-10 grid items-center gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <m.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />

            {content.eyebrow}
          </m.div>

          <m.p
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mb-4 text-lg font-medium text-muted-foreground"
          >
            {content.greeting}
          </m.p>

          <m.h1
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.28,
              duration: 0.8,
            }}
            className="max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {content.title}

            <span className="mt-2 block bg-gradient-to-r from-primary via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {content.titleAccent}
            </span>
          </m.h1>

          <m.p
            initial={{
              opacity: 0,
              y: 26,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="mt-7 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-lg"
          >
            {content.description}
          </m.p>

          <m.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/projects/all"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
            >
              {content.primaryCta}

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3.5 font-medium backdrop-blur transition-colors hover:bg-accent"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />

              {content.secondaryCta}
            </a>
          </m.div>

          <m.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.65,
            }}
            className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <span className="relative flex h-3 w-3">
              {!shouldReduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              )}

              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>

            {content.availability}
          </m.div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-[32rem] lg:block">
          <m.div
            initial={{
              opacity: 0,
              scale: 0.88,
              rotate: -6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.9,
            }}
            className="absolute inset-[12%] rounded-full border border-primary/25 bg-card/50 shadow-2xl shadow-primary/10 backdrop-blur-xl"
          />

          <m.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[5%] rounded-full border border-dashed border-primary/25"
          />

          <m.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: -360,
                  }
            }
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[20%] rounded-full border border-dashed border-border"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <m.div
              whileHover={{
                scale: 1.06,
                rotate: 2,
              }}
              className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-3xl border border-primary/30 bg-background/80 shadow-2xl shadow-primary/20 backdrop-blur-xl"
            >
              <Code2 className="mb-3 h-10 w-10 text-primary" />

              <span className="text-lg font-bold">
                Justin
              </span>

              <span className="text-xs text-muted-foreground">
                Systems Builder
              </span>
            </m.div>
          </div>

          {orbitItems.map(
            (item, index) => (
              <m.div
                key={item.label}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y:
                    shouldReduceMotion
                      ? 0
                      : [
                          0,
                          index % 2 === 0
                            ? -10
                            : 10,
                          0,
                        ],
                }}
                transition={{
                  opacity: {
                    delay:
                      0.65 +
                      index * 0.1,
                  },
                  scale: {
                    delay:
                      0.65 +
                      index * 0.1,
                  },
                  y: {
                    duration:
                      3.5 +
                      index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`absolute rounded-xl border border-border bg-background/85 px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur ${item.className}`}
              >
                {item.label}
              </m.div>
            )
          )}

          <Database className="absolute left-[18%] top-[46%] h-6 w-6 text-primary/45" />

          <Box className="absolute bottom-[26%] right-[22%] h-6 w-6 text-primary/45" />
        </div>

        <m.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.72,
          }}
          className="grid gap-3 sm:grid-cols-3 lg:col-span-2"
        >
          {content.focusCards.map(
            (item, index) => (
              <m.div
                key={item.label}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.01,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                }}
                className="rounded-2xl border border-border/80 bg-card/70 p-5 backdrop-blur"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {item.label}
                </p>

                <p className="font-medium">
                  {item.value}
                </p>
              </m.div>
            )
          )}
        </m.div>
      </m.div>
    </section>
  );
}
```

這個 Hero 已經包含：

- 滑鼠跟隨光暈
- 首屏進場動畫
- Hero 捲動淡出
- 技術軌道旋轉
- 浮動技術標籤
- CTA Hover 動畫
- 卡片 Spring Hover
- Reduced Motion 支援
- 桌面與手機響應式

---

# 九、建立其他首頁動畫區塊

建立：

```text
src/components/home/home-sections.tsx
```

```tsx
"use client";

import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
  Mail,
  Wrench,
} from "lucide-react";
import {
  m,
  useReducedMotion,
} from "motion/react";

import { Link } from "@/i18n/navigation";
import type {
  HomeContent,
  HomeLocale,
} from "@/data/home";
import type {
  Project,
  ProjectStatus,
} from "@/types/projects";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/motion/section-heading";

interface FeaturedProjectsSectionProps {
  content: HomeContent["featured"];
  projects: Project[];
  locale: HomeLocale;
}

const statusLabels: Record<
  HomeLocale,
  Record<ProjectStatus, string>
> = {
  "zh-TW": {
    completed: "已完成",
    "in-progress": "開發中",
    prototype: "原型",
    planned: "規劃中",
  },

  en: {
    completed: "Completed",
    "in-progress": "In progress",
    prototype: "Prototype",
    planned: "Planned",
  },
};

export function FeaturedProjectsSection({
  content,
  projects,
  locale,
}: FeaturedProjectsSectionProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section className="border-b border-border/60 py-24 md:py-32">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={
              content.description
            }
          />

          <Reveal
            direction="left"
            className="mb-12"
          >
            <Link
              href="/projects/all"
              className="group inline-flex items-center gap-2 font-medium text-primary"
            >
              {content.viewAll}

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map(
            (project, index) => {
              const projectContent =
                project.content[locale];

              return (
                <m.article
                  key={project.slug}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -10,
                          scale: 1.01,
                        }
                  }
                  transition={{
                    delay:
                      index * 0.08,
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-background to-secondary">
                    {project.coverImage ? (
                      <Image
                        src={
                          project.coverImage
                        }
                        alt={
                          projectContent.title
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="select-none text-5xl font-bold text-primary/25">
                          {projectContent.title
                            .split(" ")
                            .map(
                              (word) =>
                                word[0]
                            )
                            .join("")
                            .slice(0, 3)}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-70" />

                    <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
                      {
                        statusLabels[
                          locale
                        ][project.status]
                      }
                    </span>

                    {project.featured && (
                      <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {
                          content.featuredLabel
                        }
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {project.year}
                    </p>

                    <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                      {
                        projectContent.title
                      }
                    </h3>

                    <p className="mb-6 text-sm leading-7 text-muted-foreground">
                      {
                        projectContent.summary
                      }
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.technologies
                        .slice(0, 4)
                        .map(
                          (
                            technology
                          ) => (
                            <span
                              key={
                                technology
                              }
                              className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                            >
                              {
                                technology
                              }
                            </span>
                          )
                        )}
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/link inline-flex flex-1 items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                      >
                        {
                          content.viewCaseStudy
                        }

                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </Link>

                      {project.repositoryUrl && (
                        <a
                          href={
                            project.repositoryUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Source code"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors hover:bg-accent"
                        >
                          <GitBranch className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </m.article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

interface DomainsSectionProps {
  content: HomeContent["domains"];
}

const domainIcons = {
  database: Database,
  box: Box,
  code: Code2,
} as const;

export function DomainsSection({
  content,
}: DomainsSectionProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent"
      />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={
            content.description
          }
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {content.items.map(
            (item, index) => {
              const Icon =
                domainIcons[
                  item.icon
                ];

              return (
                <m.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 36,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -8,
                        }
                  }
                  transition={{
                    delay:
                      index * 0.1,
                    type: "spring",
                    stiffness: 230,
                    damping: 24,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7"
                >
                  <m.div
                    aria-hidden="true"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                  />

                  <div className="relative">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mb-6 leading-7 text-muted-foreground">
                      {
                        item.description
                      }
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </m.article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

interface SkillsEvidenceSectionProps {
  content: HomeContent["skills"];
}

const skillContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const skillItemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [
        0.22,
        1,
        0.36,
        1,
      ],
    },
  },
};

export function SkillsEvidenceSection({
  content,
}: SkillsEvidenceSectionProps) {
  return (
    <section className="border-b border-border/60 py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={
            content.description
          }
        />

        <m.ul
          variants={
            skillContainerVariants
          }
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid gap-5 md:grid-cols-2"
        >
          {content.items.map(
            (item) => (
              <m.li
                key={item.title}
                variants={
                  skillItemVariants
                }
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/35"
              >
                <div className="flex gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold">
                      {item.title}
                    </h3>

                    <p className="leading-7 text-muted-foreground">
                      {
                        item.evidence
                      }
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-secondary px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </m.li>
            )
          )}
        </m.ul>
      </div>
    </section>
  );
}

interface RoadmapSectionProps {
  content: HomeContent["roadmap"];
}

const roadmapStatusStyles = {
  demonstrated:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  building:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  planned:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
} as const;

export function RoadmapSection({
  content,
}: RoadmapSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={
            content.description
          }
        />

        <div className="relative">
          <m.div
            aria-hidden="true"
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1.1,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="absolute bottom-8 left-[1.15rem] top-8 w-px origin-top bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-1/2"
          />

          <div className="space-y-8">
            {content.items.map(
              (item, index) => (
                <m.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    x:
                      index % 2 === 0
                        ? -35
                        : 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                    duration: 0.7,
                  }}
                  className={`relative grid gap-6 pl-14 md:grid-cols-2 md:pl-0 ${
                    index % 2 === 0
                      ? ""
                      : "md:[&>div:first-child]:col-start-2"
                  }`}
                >
                  <span className="absolute left-3 top-8 z-10 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] md:left-1/2 md:-translate-x-1/2" />

                  <div
                    className={`rounded-2xl border border-border bg-card p-6 ${
                      index % 2 === 0
                        ? "md:mr-12"
                        : "md:col-start-2 md:ml-12"
                    }`}
                  >
                    <span
                      className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        roadmapStatusStyles[
                          item.status
                        ]
                      }`}
                    >
                      {item.phase}
                    </span>

                    <h3 className="mb-3 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="leading-7 text-muted-foreground">
                      {
                        item.description
                      }
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </m.article>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactCtaSectionProps {
  content: HomeContent["contact"];
}

export function ContactCtaSection({
  content,
}: ContactCtaSectionProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section className="px-4 py-24 md:py-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-primary/20 bg-card px-6 py-16 text-center shadow-2xl shadow-primary/10 md:px-12 md:py-24">
          <m.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [
                      "-20%",
                      "20%",
                      "-20%",
                    ],
                    y: [
                      "-10%",
                      "15%",
                      "-10%",
                    ],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[110px]"
          />

          <div className="relative">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {content.eyebrow}
            </p>

            <h2 className="mx-auto max-w-4xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
              {content.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-8 text-muted-foreground md:text-lg">
              {content.description}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact/form"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground"
              >
                <Mail className="h-4 w-4" />

                {content.primaryCta}

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/projects/all"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3.5 font-medium backdrop-blur hover:bg-accent"
              >
                <Wrench className="h-4 w-4" />

                {content.secondaryCta}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

---

# 十、更新首頁 `page.tsx`

修改：

```text
src/app/[locale]/page.tsx
```

完整替換為：

```tsx
import {
  ContactCtaSection,
  DomainsSection,
  FeaturedProjectsSection,
  RoadmapSection,
  SkillsEvidenceSection,
} from "@/components/home/home-sections";
import { HeroSection } from "@/components/home/hero-section";

import {
  homeContent,
  type HomeLocale,
} from "@/data/home";
import {
  getFeaturedProjects,
  normalizePortfolioLocale,
} from "@/lib/projects";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale: localeParam } =
    await params;

  const locale =
    normalizePortfolioLocale(
      localeParam
    ) as HomeLocale;

  const content =
    homeContent[locale];

  const featuredProjects =
    getFeaturedProjects().slice(
      0,
      3
    );

  return (
    <main className="overflow-x-clip">
      <HeroSection
        content={content.hero}
      />

      <FeaturedProjectsSection
        content={content.featured}
        projects={featuredProjects}
        locale={locale}
      />

      <DomainsSection
        content={content.domains}
      />

      <SkillsEvidenceSection
        content={content.skills}
      />

      <RoadmapSection
        content={content.roadmap}
      />

      <ContactCtaSection
        content={content.contact}
      />
    </main>
  );
}
```

這裡首頁仍然是 Server Component。

它負責：

- 取得 locale
- 選出正確語言內容
- 選出三個精選專案
- 把資料傳給動畫 Client Components

---

# 十一、更新 `[locale]/layout.tsx`

在目前的 Layout 加入：

```tsx
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
```

Provider 區域改成：

```tsx
<NextIntlClientProvider
  messages={messages}
>
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <MotionProvider>
      <ScrollProgress />

      <Header />

      {children}
    </MotionProvider>
  </ThemeProvider>
</NextIntlClientProvider>
```

完整結構大致應是：

```tsx
return (
  <html
    lang={locale}
    suppressHydrationWarning
  >
    <body
      className={`${inter.variable} font-sans antialiased`}
    >
      <NextIntlClientProvider
        messages={messages}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <ScrollProgress />

            <Header />

            {children}
          </MotionProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </body>
  </html>
);
```

---

# 十二、補上首頁背景與共用 CSS

不要整份覆蓋 `globals.css`。

只需要把以下內容加在檔案最底部：

```css
html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}

::selection {
  background: hsl(
    var(--primary) / 0.25
  );
  color: hsl(var(--foreground));
}

.section-shell {
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: 1rem;
}

.portfolio-grid {
  background-image:
    linear-gradient(
      to right,
      hsl(var(--border) / 0.35)
        1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      hsl(var(--border) / 0.35)
        1px,
      transparent 1px
    );

  background-size: 42px 42px;

  mask-image:
    radial-gradient(
      ellipse at center,
      black 30%,
      transparent 78%
    );

  -webkit-mask-image:
    radial-gradient(
      ellipse at center,
      black 30%,
      transparent 78%
    );
}

.text-balance {
  text-wrap: balance;
}

.text-pretty {
  text-wrap: pretty;
}

@media (min-width: 640px) {
  .section-shell {
    padding-inline: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .section-shell {
    padding-inline: 2rem;
  }
}

@media (
  prefers-reduced-motion:
    reduce
) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms
      !important;

    animation-iteration-count: 1
      !important;

    transition-duration: 0.01ms
      !important;

    scroll-behavior: auto
      !important;
  }
}
```

---

# 十三、準備履歷檔案

Hero 的下載按鈕目前使用：

```text
/resume.pdf
```

因此請把履歷放到：

```text
public/resume.pdf
```

例如：

```bash
cp ~/Documents/Justin-Resume.pdf public/resume.pdf
```

若目前還沒準備履歷，可以暫時把：

```tsx
<a
  href="/resume.pdf"
  download
>
```

改成：

```tsx
<Link href="/about/profile">
```

避免面試官按下去直接撞上 404，這種驚喜通常不加分。

---

# 十四、檢查專案資料

首頁只會顯示：

```ts
featured: true
```

的專案。

請確認 `src/data/projects.ts` 至少有三個：

```ts
featured: true
```

例如：

```ts
{
  slug:
    "digital-archive-management-system",
  featured: true,
}
```

```ts
{
  slug:
    "ai-knowledge-workspace",
  featured: true,
}
```

```ts
{
  slug:
    "prism-runner-3d",
  featured: true,
}
```

首頁只顯示三個最強作品是刻意的。

其他作品留在完整作品頁，不要讓首頁一打開就像在逛大賣場。

---

# 十五、執行檢查

先清除舊快取：

```bash
rm -rf .next
```

型別檢查：

```bash
npx tsc --noEmit
```

Lint：

```bash
npm run lint
```

正式建置：

```bash
npm run build
```

啟動：

```bash
npm run dev
```

測試：

```text
http://localhost:3000/zh-TW
http://localhost:3000/en
```

---

# 十六、這一輪應看到的結果

首頁順序會變成：

```text
動畫 Hero
↓
精選作品
↓
我能建立的產品類型
↓
技能與實際證據
↓
技術學習 Roadmap
↓
聯絡 CTA
```

動畫效果包含：

- Hero 逐層進場
- 滑鼠視差背景
- 技術軌道持續旋轉
- 技術標籤上下浮動
- Hero 隨捲動產生 Parallax
- 全站捲動進度條
- Section Scroll Reveal
- 多張卡片 Stagger 進場
- 卡片 Hover Lift
- 圖示 Hover Rotate
- Roadmap 時間軸展開
- CTA 背景緩慢漂移
- 減少動畫模式

下一階段會繼續處理 **頁面切換動畫、Header Mega Menu 動畫、Mobile Menu 手勢、作品卡片共享 Layout Animation，以及滑鼠磁吸按鈕效果**。

## Response:
6/19/2026, 10:51:44 PM

> **Planning next steps for project continuation**
>
> I need to focus on the next stage of the project, which involves detailed metadata handling and providing a demo with video/screenshots. I'll check the project document to see where we're at. The request explicitly asks for a continuation, so I’ll focus on providing the next phase in line with the existing structure.
>
> **Planning next stage for Project Explorer V3**
>
> The user wants to proceed with the next stage, focusing on organized metadata browsing and detailed previews. I’ll likely frame this as the Project Archive/Explorer V3 update, making sure not to get too overwhelming. I’ll include code for implementation and cite the uploaded documentation for clarity, replacing previous filters.
>
> **Browsing and previewing technical project archive details**
>
> [File-system conventions: public | Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder)
> [AnimatePresence | React exit animations | Motion React](https://motion.dev/docs/react-animate-presence)
>
> **Drafting detailed plan for Project Archive/Explorer V3**
>
> I need to craft a detailed implementation while citing relevant sources carefully. The user requested code with minimal citations, so I’ll avoid overloading it with internet-based references. I'll focus on metadata, structured views, filters, and project details like video and galleries. It might make sense to break this into phases due to its complexity.
>
> **Planning details for project implementation and features**
>
> I’m focusing on using routing properly with `next/navigation` and `next-intl`. For localization, I'll rely on `usePathname` to preserve the locale while updating the query string. I’ll also wrap components that use `useSearchParams` in `<Suspense>` to manage static routes. Features include search, multi-category filtering, and metadata chips with smooth transitions.
>
> **Breaking down the project stage for Phase 8**
>
> I’m preparing a page that includes a hero section, project metadata sidebar, action links, and more—like the demo video gallery and feature grids. I’ll focus on implementing the core types and components for the project explorer and detail preview. I’ll provide foundational code now, with plans to refine next.
>
> **Defining project metadata structure**
>
> I'm creating a metadata schema with localized content and a taxonomy for things like categories, technology, and platforms. It includes things like project summary, roles, featured content, and project-specific features. I'll combine metadata with localized descriptions for flexibility, using JSON or simpler structures for easier filtering.
>
> **Implementing motion and metadata filtering**
>
> I’m thinking of using `layoutId` to create motion between the card and modal, keeping them in the same `LayoutGroup`. This could work for smooth transitions if they’re in the same tree. For metadata, I can use `getFacetCounts` for filtering. I’ll break it into two stages: Sprint 8A for metadata and explorer, and Sprint 8B for the detail page and media
>
> **Defining project type definitions**
>
> I'm defining types for project metadata, such as `LocalizedText` for multi-language support, `ProjectFeature` for localized content, and `ProjectMedia` for handling
>
> **Designing project explorer components**
>
> I'm planning the `project-explorer.tsx` to handle projects passed in as a prop, with locale parsing and filter options from search params. I want to include sorting, view modes, and an inline sidebar for filtering. For the `ProjectArchiveCard`, I'll feature metadata and a quick preview button but won’t navigate
>
> **Updating project data structure and migration plan**
>
> I’m planning to update the project structure with locale normalization, bilingual labels for categories and statuses, and functions for retrieving data. I’ll create one fully updated project as an example and provide a migration helper for old entries, using default values for a smooth transition with optional fields where necessary.
>
> **Updating content structure and migration plan**
>
> I’m adding optional fields for project content features like tagline, outcome, and metrics, while allowing for smooth migration with default values for existing entries. This way there won't be any compile breaks. I'll show how to append new fields to the existing content and provide a sample setup for media, links, and metadata.
>
> **Breaking down modular code implementation**
>
> I’ll start by providing a manageable approach, focusing only on key features. I'll avoid adding new packages unless absolutely needed. The task is to update types, enrich data, add helpers, and carefully create archive components with proper taxonomy labels in a dedicated file. This keeps the structure clear and modular.
>
> **Considering optimized search query handling**
>
> For handling search queries efficiently, I'll use a controlled input tied to the URL params. Debounce will help limit excessive URL changes on each keystroke. I’ll make sure the adjustments are stable, using `useCallback` where necessary. For filtering the list, I'll concatenate relevant
>
> **Outlining project details and layout**
>
> We need a detailed structure: a header with breadcrumbs, status, year, and sections like overview, problem, solution, and more. The layout will include a media gallery, related projects, and aside
>
> **Planning detailed project implementation**
>
> I’m organizing the task into clear steps: defining the scope and rationale, file structure, types, and builder. Then I’ll enrich the data and include helpers along with components like cards, previews, and media galleries. We aim for a 12-15k token
>
> Thought for 1m 36s

好的，現在進入整個網站最重要的核心階段：

# Sprint 8：Metadata-driven Project Archive

這一階段會把目前的「作品卡片列表」升級成真正的 **個人作品典藏庫／Project Explorer**。

你原本的對話紀錄已經完成了基本分類按鈕、作品卡片與 `[slug]` 動態詳細頁，但資料模型仍偏簡單，主要只有標題、描述、分類、技術標籤與連結。`前端工程師技能實戰指南_qwen.md`

現在要升級成：

```text
作品總覽
├── 全文搜尋
├── Metadata Faceted Filters
│   ├── 專案類型
│   ├── 完成狀態
│   ├── 使用技術
│   ├── 平台
│   ├── 領域
│   └── 能力面向
├── 排序
├── Grid / List View
├── 動畫化篩選結果
├── Quick Preview
└── 完整 Case Study
    ├── Demo 影片
    ├── UI 截圖
    ├── Features
    ├── 問題與解法
    ├── 技術挑戰
    ├── Metadata
    ├── GitHub
    ├── Live Demo
    ├── 技術文件
    └── Related Projects
```

篩選狀態會寫入 URL，因此面試官可以直接分享某個篩選結果，例如：

```text
/zh-TW/projects/all?category=interactive-3d&tech=Three.js&status=prototype
```

Next.js 的 `useSearchParams` 很適合處理已載入資料的客戶端篩選；在靜態頁面使用時，互動元件應放進 `Suspense` 邊界。([Next.js](https://nextjs.org/docs/app/api-reference/functions/use-search-params?utm_source=chatgpt.com))

作品篩選會使用 Motion 的 `layout` 與 `AnimatePresence`，讓卡片重新排列、消失與加入時不是瞬間跳動，而是具有平滑的位置與離場動畫。([Motion](https://motion.dev/docs/react-animate-presence?utm_source=chatgpt.com))

---

# 一、這一階段的檔案結構

建立需要的檔案：

```bash
mkdir -p src/components/projects/archive
mkdir -p src/components/projects/detail
mkdir -p public/portfolio/projects
```

調整後：

```text
src/
├── app/
│   └── [locale]/
│       └── projects/
│           ├── all/
│           │   └── page.tsx
│           └── [slug]/
│               └── page.tsx
├── components/
│   └── projects/
│       ├── archive/
│       │   ├── project-explorer.tsx
│       │   ├── project-archive-card.tsx
│       │   └── project-preview-dialog.tsx
│       └── detail/
│           └── project-media-gallery.tsx
├── data/
│   └── projects.ts
├── lib/
│   ├── define-project.ts
│   ├── project-taxonomy.ts
│   └── projects.ts
└── types/
    └── projects.ts

public/
└── portfolio/
    └── projects/
        └── digital-archive-management-system/
            ├── cover.webp
            ├── screenshots/
            │   ├── node-editor.webp
            │   ├── metadata-panel.webp
            │   └── search-results.webp
            └── demo/
                ├── overview.mp4
                └── poster.webp
```

---

# 二、升級作品 Metadata 型別

完整替換：

```text
src/types/projects.ts
```

```ts
export type PortfolioLocale =
  | "zh-TW"
  | "en";

export type ProjectCategory =
  | "information-system"
  | "interactive-3d"
  | "ai-data"
  | "frontend"
  | "backend-desktop";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "prototype"
  | "planned";

export type ProjectLinkKind =
  | "live"
  | "github"
  | "documentation"
  | "download"
  | "video"
  | "article";

export type ProjectMediaType =
  | "image"
  | "video";

export type LocalizedText =
  Record<PortfolioLocale, string>;

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface LocalizedProjectContent {
  title: string;
  summary: string;
  description: string;

  tagline?: string;
  role: string;
  problem: string;
  solution: string;
  outcome?: string;

  features?: ProjectFeature[];
  metrics?: ProjectMetric[];

  highlights: string[];
  challenges: string[];
  nextSteps: string[];
}

export interface ProjectLink {
  kind: ProjectLinkKind;
  url: string;
  label: LocalizedText;
  primary?: boolean;
}

export interface ProjectMedia {
  id: string;
  type: ProjectMediaType;
  src: string;

  /**
   * 影片使用的預覽封面。
   */
  poster?: string;

  /**
   * 圖片與影片的無障礙描述。
   */
  alt: LocalizedText;

  title: LocalizedText;
  caption?: LocalizedText;

  featured?: boolean;
}

export interface ProjectMetadata {
  /**
   * ISO date，例如 2026-06-01。
   */
  startedAt?: string;
  updatedAt: string;

  duration?: string;
  teamSize?: number;

  /**
   * 用於篩選與 Metadata 顯示。
   * 建議採穩定英文標籤。
   */
  roles: string[];
  platforms: string[];
  domains: string[];
  capabilities: string[];
  tools: string[];
  keywords: string[];
  audiences: string[];
  dataTypes: string[];
}

export interface Project {
  id: string;
  slug: string;

  category: ProjectCategory;
  status: ProjectStatus;

  year: number;
  featured: boolean;

  technologies: string[];
  coverImage?: string;

  links: ProjectLink[];
  media: ProjectMedia[];
  metadata: ProjectMetadata;

  content: Record<
    PortfolioLocale,
    LocalizedProjectContent
  >;
}

/**
 * 允許舊專案資料逐步遷移，不必一次補完全部欄位。
 */
export type ProjectInput =
  Omit<
    Project,
    "links" | "media" | "metadata"
  > & {
    links?: ProjectLink[];
    media?: ProjectMedia[];
    metadata?: Partial<ProjectMetadata>;
  };
```

---

# 三、建立作品資料 Builder

這個 Builder 可以讓你逐步增加 Metadata，不會因為某個舊作品還沒加影片或截圖就整站 TypeScript 爆炸。

建立：

```text
src/lib/define-project.ts
```

```ts
import type {
  Project,
  ProjectInput,
} from "@/types/projects";

export function defineProject(
  input: ProjectInput
): Project {
  return {
    ...input,

    links: input.links ?? [],
    media: input.media ?? [],

    metadata: {
      startedAt:
        input.metadata?.startedAt,

      updatedAt:
        input.metadata?.updatedAt ??
        `${input.year}-01-01`,

      duration:
        input.metadata?.duration,

      teamSize:
        input.metadata?.teamSize ?? 1,

      roles:
        input.metadata?.roles ?? [],

      platforms:
        input.metadata?.platforms ??
        ["Web"],

      domains:
        input.metadata?.domains ?? [],

      capabilities:
        input.metadata
          ?.capabilities ?? [],

      tools:
        input.metadata?.tools ?? [],

      keywords:
        input.metadata?.keywords ?? [],

      audiences:
        input.metadata?.audiences ?? [],

      dataTypes:
        input.metadata?.dataTypes ?? [],
    },
  };
}
```

接著把目前 `projects.ts` 裡每一筆：

```ts
{
  slug: "...",
}
```

改成：

```ts
defineProject({
  id: "...",
  slug: "...",
})
```

並加入：

```ts
import { defineProject } from "@/lib/define-project";
```

---

# 四、為一個作品加入完整 Metadata

先從你最具代表性的數位典藏系統開始。

在：

```text
src/data/projects.ts
```

把第一筆專案調整為以下結構。原本中英文介紹可以保留，再加入 Metadata、媒體、連結、Features 與 Outcome。

```ts
import { defineProject } from "@/lib/define-project";
import type {
  Project,
} from "@/types/projects";

export const projects: Project[] = [
  defineProject({
    id: "project-digital-archive-001",

    slug:
      "digital-archive-management-system",

    category:
      "information-system",

    status: "in-progress",

    year: 2026,

    featured: true,

    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Zustand",
      "Node-based UI",
      "Metadata Modeling",
      "Search",
      "Drag and Drop",
    ],

    coverImage:
      "/portfolio/projects/digital-archive-management-system/cover.webp",

    links: [
      {
        kind: "github",

        url:
          "https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY",

        label: {
          "zh-TW": "查看 GitHub",
          en: "View GitHub",
        },
      },

      {
        kind: "live",

        url:
          "https://YOUR_DEMO_URL",

        primary: true,

        label: {
          "zh-TW": "開啟線上展示",
          en: "Open live demo",
        },
      },

      {
        kind: "documentation",

        url:
          "https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY#readme",

        label: {
          "zh-TW": "技術文件",
          en: "Documentation",
        },
      },
    ],

    media: [
      {
        id: "archive-demo-overview",

        type: "video",

        src:
          "/portfolio/projects/digital-archive-management-system/demo/overview.mp4",

        poster:
          "/portfolio/projects/digital-archive-management-system/demo/poster.webp",

        featured: true,

        title: {
          "zh-TW":
            "數位典藏系統操作展示",
          en:
            "Digital archive system demo",
        },

        alt: {
          "zh-TW":
            "展示節點式搜尋、Metadata 編輯與檔案預覽流程的影片",
          en:
            "Video demonstrating node-based search, metadata editing, and file previews",
        },

        caption: {
          "zh-TW":
            "從加入搜尋節點、組合條件，到預覽篩選結果的完整流程。",
          en:
            "A complete workflow from adding nodes and combining filters to previewing results.",
        },
      },

      {
        id: "archive-node-editor",

        type: "image",

        src:
          "/portfolio/projects/digital-archive-management-system/screenshots/node-editor.webp",

        title: {
          "zh-TW": "節點式搜尋編輯器",
          en: "Node-based search editor",
        },

        alt: {
          "zh-TW":
            "數位典藏系統的節點式搜尋編輯器畫面",
          en:
            "Node-based search editor in the digital archive system",
        },

        caption: {
          "zh-TW":
            "以資料來源、Metadata 條件、搜尋與結果節點建立可視化流程。",
          en:
            "A visual workflow built from sources, metadata conditions, search nodes, and result nodes.",
        },
      },

      {
        id: "archive-metadata-panel",

        type: "image",

        src:
          "/portfolio/projects/digital-archive-management-system/screenshots/metadata-panel.webp",

        title: {
          "zh-TW": "Metadata 屬性面板",
          en: "Metadata property panel",
        },

        alt: {
          "zh-TW":
            "檔案 Metadata 與屬性編輯面板",
          en:
            "File metadata and property editing panel",
        },
      },

      {
        id: "archive-search-result",

        type: "image",

        src:
          "/portfolio/projects/digital-archive-management-system/screenshots/search-results.webp",

        title: {
          "zh-TW": "檔案搜尋結果",
          en: "File search results",
        },

        alt: {
          "zh-TW":
            "依據多個 Metadata 條件產生的檔案搜尋結果",
          en:
            "File search results generated from multiple metadata conditions",
        },
      },
    ],

    metadata: {
      startedAt: "2026-06-01",
      updatedAt: "2026-06-19",

      duration: "持續開發中",
      teamSize: 1,

      roles: [
        "Product Planning",
        "Information Architecture",
        "Frontend Development",
        "Interaction Design",
        "Metadata Modeling",
      ],

      platforms: [
        "Web",
        "Desktop-oriented UI",
      ],

      domains: [
        "Digital Archive",
        "Library Science",
        "Knowledge Management",
        "Personal Information Management",
      ],

      capabilities: [
        "Advanced Search",
        "Metadata Editing",
        "Node-based Workflow",
        "File Preview",
        "Relationship Discovery",
        "Drag and Drop",
      ],

      tools: [
        "VS Code",
        "Git",
        "GitHub",
        "Figma",
      ],

      keywords: [
        "archive",
        "metadata",
        "classification",
        "retrieval",
        "file management",
        "node editor",
      ],

      audiences: [
        "Researchers",
        "Students",
        "Knowledge Workers",
        "Digital Collectors",
      ],

      dataTypes: [
        "Documents",
        "Images",
        "Videos",
        "Audio",
        "Metadata Records",
      ],
    },

    content: {
      "zh-TW": {
        title:
          "數位檔案管理與典藏系統",

        tagline:
          "讓檔案不再只被資料夾階層困住。",

        summary:
          "結合數位典藏、Metadata、節點式檢索與檔案關聯探索的個人資料管理平台。",

        description:
          "此專案以圖書資訊與數位典藏概念為基礎，改善傳統檔案系統必須逐層瀏覽資料夾的限制。使用者可以透過 Metadata、欄位條件、布林檢索及視覺化節點組合，逐步縮小搜尋範圍並探索檔案間的關係。",

        role:
          "負責產品規劃、資訊架構、前端介面、節點系統、Metadata 模型與互動流程設計。",

        problem:
          "一般檔案系統高度依賴資料夾階層。當檔案數量增加後，使用者難以透過內容、主題、來源、時間或關係重新發現資料。",

        solution:
          "建立資料驅動的節點式檢索介面，讓搜尋條件、結果預覽與實際操作節點能被自由組合，並以結構化 Metadata 支援更細緻的篩選與關聯探索。",

        outcome:
          "目前已完成節點工作區、主要搜尋流程、檔案預覽、屬性面板與基礎 Metadata 架構，下一步將強化布林條件、檔案關係與本機檔案整合。",

        metrics: [
          {
            label: "主要系統模組",
            value: "6+",
            description:
              "節點、搜尋、預覽、Metadata、檔案庫與屬性面板。",
          },

          {
            label: "檢索方式",
            value: "5+",
            description:
              "欄位、分類、標籤、關鍵字與複合條件。",
          },

          {
            label: "支援內容類型",
            value: "多媒體",
            description:
              "文件、圖片、影片、音訊與 Metadata。",
          },
        ],

        features: [
          {
            id: "node-search",

            title:
              "節點式搜尋與工作流程",

            description:
              "使用者可以拖曳資料來源、條件、搜尋、轉換與結果節點，自行建立檢索流程。",

            bullets: [
              "視覺化資料流",
              "節點連線驗證",
              "即時結果預覽",
              "節點屬性同步",
            ],
          },

          {
            id: "metadata-engine",

            title:
              "Metadata 驅動檢索",

            description:
              "Metadata 不只是被動顯示資訊，而是搜尋、分類與建立關聯的核心。",

            bullets: [
              "欄位條件",
              "多值 Metadata",
              "分類與描述詞",
              "可擴充 Metadata Schema",
            ],
          },

          {
            id: "file-preview",

            title:
              "多媒體檔案預覽",

            description:
              "搜尋結果可以在不離開工作區的情況下快速查看內容與重要屬性。",

            bullets: [
              "圖片預覽",
              "文件摘要",
              "影片資訊",
              "檔案屬性",
            ],
          },
        ],

        highlights: [
          "節點式搜尋與操作流程",
          "Metadata 條件與欄位篩選",
          "檔案預覽與屬性面板",
          "分類、標籤與關係探索",
          "可擴充的布林檢索架構",
        ],

        challenges: [
          "建立清楚且可延伸的節點分類階層",
          "維持節點與右側屬性面板資料一致",
          "將 Metadata 從顯示資訊轉變為實際檢索能力",
          "處理大量節點與檔案結果時的介面可讀性",
        ],

        nextSteps: [
          "加入完整布林檢索與巢狀條件群組",
          "加入檔案關係圖與 Metadata 編輯器",
          "補上本機檔案掃描與自動歸檔",
          "增加測試與大量資料效能驗證",
        ],
      },

      en: {
        title:
          "Digital Archive Management System",

        tagline:
          "Move beyond rigid folder hierarchies.",

        summary:
          "A metadata-driven personal archive platform with node-based retrieval and file relationship exploration.",

        description:
          "This project applies concepts from library and information science to personal file management. Instead of relying entirely on folder hierarchies, users can discover files through metadata, structured fields, Boolean conditions, and visual node combinations.",

        role:
          "Responsible for product planning, information architecture, frontend development, node-system design, metadata modeling, and interaction design.",

        problem:
          "Traditional file systems rely heavily on folder hierarchies, making it difficult to rediscover files by subject, source, time, context, or relationship as collections grow.",

        solution:
          "A data-driven node editor combines search conditions, result previews, and file actions, while structured metadata enables flexible filtering and relationship discovery.",

        outcome:
          "The current prototype includes the node workspace, core search flow, file previews, property panels, and foundational metadata architecture.",

        metrics: [
          {
            label: "Core modules",
            value: "6+",
          },
          {
            label: "Retrieval methods",
            value: "5+",
          },
          {
            label: "Supported content",
            value: "Multimedia",
          },
        ],

        features: [
          {
            id: "node-search",

            title:
              "Node-based search workflow",

            description:
              "Users can combine source, condition, search, transformation, and result nodes into retrieval workflows.",

            bullets: [
              "Visual data flow",
              "Connection validation",
              "Live result previews",
              "Synchronized properties",
            ],
          },

          {
            id: "metadata-engine",

            title:
              "Metadata-driven retrieval",

            description:
              "Metadata acts as the foundation for search, classification, and relationship discovery.",

            bullets: [
              "Field conditions",
              "Multi-value metadata",
              "Classification terms",
              "Extensible schemas",
            ],
          },

          {
            id: "file-preview",

            title:
              "Multimedia file previews",

            description:
              "Users can inspect results and properties without leaving the workspace.",

            bullets: [
              "Image previews",
              "Document summaries",
              "Video information",
              "File properties",
            ],
          },
        ],

        highlights: [
          "Node-based retrieval workflow",
          "Metadata and field filtering",
          "File preview and property panels",
          "Classification and relationship discovery",
          "Expandable Boolean-query architecture",
        ],

        challenges: [
          "Designing a scalable node taxonomy",
          "Keeping node data and property panels synchronized",
          "Turning metadata into practical retrieval functionality",
          "Maintaining readability with large result sets",
        ],

        nextSteps: [
          "Add nested Boolean query groups",
          "Build a file relationship graph",
          "Add local file scanning and automatic organization",
          "Introduce testing and large-dataset performance checks",
        ],
      },
    },
  }),

  // 其他現有專案繼續放在這裡
];
```

請把假網址：

```text
https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY
https://YOUR_DEMO_URL
```

換成真正網址。尚未公開時，直接移除對應 link，不要放假連結。

---

# 五、建立分類與狀態名稱

建立：

```text
src/lib/project-taxonomy.ts
```

```ts
import type {
  PortfolioLocale,
  ProjectCategory,
  ProjectStatus,
} from "@/types/projects";

export const categoryLabels: Record<
  PortfolioLocale,
  Record<ProjectCategory, string>
> = {
  "zh-TW": {
    "information-system":
      "資訊系統",

    "interactive-3d":
      "3D 與互動",

    "ai-data":
      "AI 與資料",

    frontend:
      "前端應用",

    "backend-desktop":
      "後端與桌面",
  },

  en: {
    "information-system":
      "Information Systems",

    "interactive-3d":
      "3D & Interactive",

    "ai-data":
      "AI & Data",

    frontend:
      "Frontend",

    "backend-desktop":
      "Backend & Desktop",
  },
};

export const statusLabels: Record<
  PortfolioLocale,
  Record<ProjectStatus, string>
> = {
  "zh-TW": {
    completed: "已完成",
    "in-progress": "開發中",
    prototype: "原型",
    planned: "規劃中",
  },

  en: {
    completed: "Completed",
    "in-progress": "In progress",
    prototype: "Prototype",
    planned: "Planned",
  },
};
```

---

# 六、升級作品查詢工具

修改：

```text
src/lib/projects.ts
```

```ts
import { projects } from "@/data/projects";

import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

export function normalizePortfolioLocale(
  locale: string
): PortfolioLocale {
  return locale === "en"
    ? "en"
    : "zh-TW";
}

export function getProjectBySlug(
  slug: string
): Project | undefined {
  return projects.find(
    (project) =>
      project.slug === slug
  );
}

export function getFeaturedProjects() {
  return projects.filter(
    (project) =>
      project.featured
  );
}

export function getAllTechnologies() {
  return Array.from(
    new Set(
      projects.flatMap(
        (project) =>
          project.technologies
      )
    )
  ).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getRelatedProjects(
  currentProject: Project,
  limit = 3
): Project[] {
  return projects
    .filter(
      (project) =>
        project.slug !==
        currentProject.slug
    )
    .map((project) => {
      const sharedTechnologies =
        project.technologies.filter(
          (technology) =>
            currentProject.technologies.includes(
              technology
            )
        ).length;

      const sharedDomains =
        project.metadata.domains.filter(
          (domain) =>
            currentProject.metadata.domains.includes(
              domain
            )
        ).length;

      const categoryScore =
        project.category ===
        currentProject.category
          ? 4
          : 0;

      return {
        project,
        score:
          categoryScore +
          sharedTechnologies * 2 +
          sharedDomains,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        b.project.year -
        a.project.year
      );
    })
    .slice(0, limit)
    .map(
      (result) =>
        result.project
    );
}
```

---

# 七、建立動畫作品卡片

建立：

```text
src/components/projects/archive/project-archive-card.tsx
```

```tsx
"use client";

import Image from "next/image";

import {
  ArrowUpRight,
  Eye,
  Layers3,
} from "lucide-react";

import {
  m,
  useReducedMotion,
} from "motion/react";

import { Link } from "@/i18n/navigation";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";

import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

export type ProjectViewMode =
  | "grid"
  | "list";

interface ProjectArchiveCardProps {
  project: Project;
  locale: PortfolioLocale;
  index: number;
  viewMode: ProjectViewMode;

  onPreview: (
    project: Project
  ) => void;
}

export function ProjectArchiveCard({
  project,
  locale,
  index,
  viewMode,
  onPreview,
}: ProjectArchiveCardProps) {
  const shouldReduceMotion =
    useReducedMotion();

  const content =
    project.content[locale];

  const image =
    project.coverImage ??
    project.media.find(
      (item) =>
        item.type === "image"
    )?.src;

  const features =
    content.features ?? [];

  const isList =
    viewMode === "list";

  return (
    <m.article
      layout
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 18,
        scale: 0.96,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -7,
            }
      }
      transition={{
        layout: {
          type: "spring",
          stiffness: 280,
          damping: 28,
        },

        delay:
          Math.min(
            index * 0.04,
            0.25
          ),
      }}
      className={`group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10 ${
        isList
          ? "grid md:grid-cols-[20rem_1fr]"
          : "flex h-full flex-col"
      }`}
    >
      <m.div
        layoutId={`project-cover-${project.slug}`}
        className={`relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary ${
          isList
            ? "min-h-64 md:min-h-full"
            : "aspect-[16/10]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={content.title}
            fill
            sizes={
              isList
                ? "(max-width: 768px) 100vw, 320px"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Layers3 className="h-16 w-16 text-primary/25" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur">
            {
              categoryLabels[
                locale
              ][project.category]
            }
          </span>

          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {
              statusLabels[
                locale
              ][project.status]
            }
          </span>
        </div>
      </m.div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{project.year}</span>

          {project.metadata
            .platforms[0] && (
            <>
              <span>•</span>

              <span>
                {
                  project
                    .metadata
                    .platforms[0]
                }
              </span>
            </>
          )}

          {project.metadata
            .duration && (
            <>
              <span>•</span>

              <span>
                {
                  project
                    .metadata
                    .duration
                }
              </span>
            </>
          )}
        </div>

        <h2 className="mb-3 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
          {content.title}
        </h2>

        {content.tagline && (
          <p className="mb-3 font-medium text-foreground/80">
            {content.tagline}
          </p>
        )}

        <p className="mb-5 line-clamp-3 leading-7 text-muted-foreground">
          {content.summary}
        </p>

        {features.length > 0 && (
          <div className="mb-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {locale === "en"
                ? "Key features"
                : "核心功能"}
            </p>

            <ul className="space-y-1 text-sm text-muted-foreground">
              {features
                .slice(0, 3)
                .map((feature) => (
                  <li
                    key={
                      feature.id
                    }
                    className="flex gap-2"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                    <span>
                      {
                        feature.title
                      }
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies
            .slice(0, 6)
            .map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-md bg-secondary px-2 py-1 text-xs"
                >
                  {technology}
                </span>
              )
            )}
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              onPreview(project)
            }
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Eye className="h-4 w-4" />

            {locale === "en"
              ? "Quick preview"
              : "快速預覽"}
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
          >
            {locale === "en"
              ? "Case study"
              : "完整案例"}

            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </m.article>
  );
}
```

---

# 八、建立 Quick Preview 動畫視窗

建立：

```text
src/components/projects/archive/project-preview-dialog.tsx
```

```tsx
"use client";

import {
  useEffect,
} from "react";

import Image from "next/image";

import {
  ArrowUpRight,
  BookOpen,
  Download,
  ExternalLink,
  GitBranch,
  PlayCircle,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  m,
  useReducedMotion,
} from "motion/react";

import { Link } from "@/i18n/navigation";

import type {
  PortfolioLocale,
  Project,
  ProjectLinkKind,
} from "@/types/projects";

interface ProjectPreviewDialogProps {
  project: Project | null;
  locale: PortfolioLocale;
  onClose: () => void;
}

export function ProjectPreviewDialog({
  project,
  locale,
  onClose,
}: ProjectPreviewDialogProps) {
  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    if (!project) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <m.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-background/80 p-0 backdrop-blur-md md:items-center md:p-6"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              onClose();
            }
          }}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
            initial={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: 80,
                    scale: 0.96,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: 50,
                    scale: 0.97,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] border border-border bg-card shadow-2xl md:rounded-[2rem]"
          >
            <PreviewContent
              project={project}
              locale={locale}
              onClose={onClose}
            />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

interface PreviewContentProps {
  project: Project;
  locale: PortfolioLocale;
  onClose: () => void;
}

function PreviewContent({
  project,
  locale,
  onClose,
}: PreviewContentProps) {
  const content =
    project.content[locale];

  const featuredMedia =
    project.media.find(
      (item) =>
        item.featured
    ) ??
    project.media[0];

  const features =
    content.features ?? [];

  return (
    <>
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label={
          locale === "en"
            ? "Close preview"
            : "關閉預覽"
        }
        className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/85 backdrop-blur transition-colors hover:bg-accent"
      >
        <X className="h-5 w-5" />
      </button>

      <m.div
        layoutId={`project-cover-${project.slug}`}
        className="relative aspect-video overflow-hidden rounded-t-[2rem] bg-gradient-to-br from-primary/20 via-background to-secondary"
      >
        {featuredMedia?.type ===
        "video" ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={
              featuredMedia.poster
            }
            className="h-full w-full object-cover"
          >
            <source
              src={
                featuredMedia.src
              }
            />
          </video>
        ) : featuredMedia ? (
          <Image
            src={
              featuredMedia.src
            }
            alt={
              featuredMedia.alt[
                locale
              ]
            }
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        ) : project.coverImage ? (
          <Image
            src={
              project.coverImage
            }
            alt={content.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-20 w-20 text-primary/30" />
          </div>
        )}
      </m.div>

      <div className="p-6 md:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {project.year} ·{" "}
          {project.status}
        </p>

        <h2
          id="project-preview-title"
          className="text-3xl font-bold tracking-tight md:text-4xl"
        >
          {content.title}
        </h2>

        {content.tagline && (
          <p className="mt-3 text-lg font-medium">
            {content.tagline}
          </p>
        )}

        <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
          {content.summary}
        </p>

        {features.length > 0 && (
          <section className="mt-8">
            <h3 className="mb-4 text-lg font-bold">
              {locale === "en"
                ? "Featured capabilities"
                : "精彩功能預覽"}
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              {features
                .slice(0, 3)
                .map(
                  (
                    feature,
                    index
                  ) => (
                    <m.article
                      key={
                        feature.id
                      }
                      initial={{
                        opacity:
                          0,
                        y: 18,
                      }}
                      animate={{
                        opacity:
                          1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          0.12 +
                          index *
                            0.08,
                      }}
                      className="rounded-2xl border border-border bg-background/50 p-5"
                    >
                      <h4 className="mb-2 font-bold">
                        {
                          feature.title
                        }
                      </h4>

                      <p className="text-sm leading-6 text-muted-foreground">
                        {
                          feature.description
                        }
                      </p>
                    </m.article>
                  )
                )}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map(
            (technology) => (
              <span
                key={technology}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
              >
                {technology}
              </span>
            )
          )}
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            {locale === "en"
              ? "Open full case study"
              : "開啟完整專案案例"}

            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {project.links.map(
            (link) => {
              const Icon =
                getLinkIcon(
                  link.kind
                );

              return (
                <a
                  key={`${link.kind}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-medium transition-colors hover:bg-accent"
                >
                  <Icon className="h-4 w-4" />

                  {
                    link.label[
                      locale
                    ]
                  }
                </a>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

function getLinkIcon(
  kind: ProjectLinkKind
) {
  switch (kind) {
    case "github":
      return GitBranch;

    case "documentation":
    case "article":
      return BookOpen;

    case "download":
      return Download;

    case "video":
      return PlayCircle;

    case "live":
    default:
      return ExternalLink;
  }
}
```

---

# 九、建立完整 Project Explorer

建立：

```text
src/components/projects/archive/project-explorer.tsx
```

```tsx
"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Check,
  Filter,
  Grid2X2,
  List,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  LayoutGroup,
  m,
} from "motion/react";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";

import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
  ProjectStatus,
} from "@/types/projects";

import {
  ProjectArchiveCard,
  type ProjectViewMode,
} from "./project-archive-card";

import {
  ProjectPreviewDialog,
} from "./project-preview-dialog";

interface ProjectExplorerProps {
  projects: Project[];
  locale: PortfolioLocale;
}

type ProjectSort =
  | "featured"
  | "newest"
  | "oldest"
  | "title";

const categories: ProjectCategory[] =
  [
    "information-system",
    "interactive-3d",
    "ai-data",
    "frontend",
    "backend-desktop",
  ];

const statuses: ProjectStatus[] =
  [
    "completed",
    "in-progress",
    "prototype",
    "planned",
  ];

export function ProjectExplorer({
  projects,
  locale,
}: ProjectExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(true);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<Project | null>(
    null
  );

  const query =
    searchParams.get("q") ?? "";

  const category =
    parseCategory(
      searchParams.get(
        "category"
      )
    );

  const status =
    parseStatus(
      searchParams.get("status")
    );

  const technologies =
    searchParams.getAll("tech");

  const sort =
    parseSort(
      searchParams.get("sort")
    );

  const viewMode =
    parseViewMode(
      searchParams.get("view")
    );

  const technologyOptions =
    useMemo(() => {
      const counts =
        new Map<string, number>();

      projects.forEach(
        (project) => {
          project.technologies.forEach(
            (technology) => {
              counts.set(
                technology,
                (counts.get(
                  technology
                ) ?? 0) + 1
              );
            }
          );
        }
      );

      return Array.from(
        counts.entries()
      )
        .sort((a, b) => {
          if (b[1] !== a[1]) {
            return b[1] - a[1];
          }

          return a[0].localeCompare(
            b[0]
          );
        })
        .map(
          ([
            name,
            count,
          ]) => ({
            name,
            count,
          })
        );
    }, [projects]);

  const filteredProjects =
    useMemo(() => {
      const normalizedQuery =
        query
          .trim()
          .toLowerCase();

      const filtered =
        projects.filter(
          (project) => {
            const content =
              project.content[
                locale
              ];

            const matchesCategory =
              !category ||
              project.category ===
                category;

            const matchesStatus =
              !status ||
              project.status ===
                status;

            const matchesTechnology =
              technologies.length ===
                0 ||
              technologies.every(
                (technology) =>
                  project.technologies.includes(
                    technology
                  )
              );

            const featureText =
              (
                content.features ??
                []
              )
                .flatMap(
                  (feature) => [
                    feature.title,
                    feature.description,
                    ...(
                      feature.bullets ??
                      []
                    ),
                  ]
                )
                .join(" ");

            const searchableText =
              [
                content.title,
                content.tagline,
                content.summary,
                content.description,
                content.role,
                content.problem,
                content.solution,
                content.outcome,
                ...content.highlights,
                ...content.challenges,
                ...content.nextSteps,
                featureText,
                ...project.technologies,
                ...project
                  .metadata
                  .domains,
                ...project
                  .metadata
                  .capabilities,
                ...project
                  .metadata
                  .keywords,
                ...project
                  .metadata
                  .platforms,
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch =
              normalizedQuery
                .length === 0 ||
              searchableText.includes(
                normalizedQuery
              );

            return (
              matchesCategory &&
              matchesStatus &&
              matchesTechnology &&
              matchesSearch
            );
          }
        );

      return filtered.sort(
        (a, b) => {
          switch (sort) {
            case "newest":
              return (
                new Date(
                  b.metadata.updatedAt
                ).getTime() -
                new Date(
                  a.metadata.updatedAt
                ).getTime()
              );

            case "oldest":
              return (
                new Date(
                  a.metadata.updatedAt
                ).getTime() -
                new Date(
                  b.metadata.updatedAt
                ).getTime()
              );

            case "title":
              return a.content[
                locale
              ].title.localeCompare(
                b.content[
                  locale
                ].title,
                locale
              );

            case "featured":
            default:
              if (
                a.featured !==
                b.featured
              ) {
                return a.featured
                  ? -1
                  : 1;
              }

              return (
                b.year -
                a.year
              );
          }
        }
      );
    }, [
      category,
      locale,
      projects,
      query,
      sort,
      status,
      technologies,
    ]);

  function replaceParams(
    mutate: (
      params: URLSearchParams
    ) => void
  ) {
    const nextParams =
      new URLSearchParams(
        searchParams.toString()
      );

    mutate(nextParams);

    const queryString =
      nextParams.toString();

    startTransition(() => {
      router.replace(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        {
          scroll: false,
        }
      );
    });
  }

  function setSingleParam(
    key: string,
    value?: string
  ) {
    replaceParams((params) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });
  }

  function toggleTechnology(
    technology: string
  ) {
    replaceParams((params) => {
      const current =
        params.getAll("tech");

      const next =
        current.includes(
          technology
        )
          ? current.filter(
              (item) =>
                item !== technology
            )
          : [
              ...current,
              technology,
            ];

      params.delete("tech");

      next.forEach((item) => {
        params.append(
          "tech",
          item
        );
      });
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.replace(pathname, {
        scroll: false,
      });
    });
  }

  const activeFilterCount =
    Number(Boolean(query)) +
    Number(Boolean(category)) +
    Number(Boolean(status)) +
    technologies.length;

  const text =
    locale === "en"
      ? {
          eyebrow:
            "Project Archive",
          title:
            "Explore all projects",
          description:
            "Search and filter projects by domain, technology, platform, status, and capability.",
          search:
            "Search projects, technologies, metadata, or features",
          filters: "Filters",
          clear: "Clear all",
          category: "Category",
          status: "Status",
          technology:
            "Technologies",
          all: "All",
          results: "projects",
          noResults:
            "No projects match the current filters.",
          sort: "Sort",
        }
      : {
          eyebrow:
            "Project Archive",
          title:
            "瀏覽所有作品",
          description:
            "依照領域、技術、平台、狀態與能力 Metadata 搜尋和篩選專案。",
          search:
            "搜尋作品、技術、Metadata 或功能",
          filters: "篩選條件",
          clear: "全部清除",
          category: "專案分類",
          status: "完成狀態",
          technology:
            "使用技術",
          all: "全部",
          results: "個作品",
          noResults:
            "找不到符合目前條件的作品。",
          sort: "排序方式",
        };

  return (
    <>
      <main className="min-h-screen pb-24 pt-28">
        <div className="section-shell">
          <m.header
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mx-auto mb-12 max-w-4xl text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {text.eyebrow}
            </p>

            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {text.title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              {text.description}
            </p>
          </m.header>

          <section className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 xl:flex-row">
              <label className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-border bg-background px-4 focus-within:ring-2 focus-within:ring-primary/30">
                <Search className="h-5 w-5 text-muted-foreground" />

                <input
                  value={query}
                  onChange={(
                    event
                  ) =>
                    setSingleParam(
                      "q",
                      event.target
                        .value ||
                        undefined
                    )
                  }
                  placeholder={
                    text.search
                  }
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() =>
                      setSingleParam(
                        "q"
                      )
                    }
                    aria-label={
                      text.clear
                    }
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFiltersOpen(
                      (current) =>
                        !current
                    )
                  }
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-border px-4 font-medium transition-colors hover:bg-accent"
                >
                  <Filter className="h-4 w-4" />

                  {text.filters}

                  {activeFilterCount >
                    0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {
                        activeFilterCount
                      }
                    </span>
                  )}
                </button>

                <select
                  value={sort}
                  onChange={(
                    event
                  ) =>
                    setSingleParam(
                      "sort",
                      event.target
                        .value
                    )
                  }
                  aria-label={
                    text.sort
                  }
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none"
                >
                  <option value="featured">
                    {locale ===
                    "en"
                      ? "Featured"
                      : "精選優先"}
                  </option>

                  <option value="newest">
                    {locale ===
                    "en"
                      ? "Recently updated"
                      : "最近更新"}
                  </option>

                  <option value="oldest">
                    {locale ===
                    "en"
                      ? "Oldest first"
                      : "最早優先"}
                  </option>

                  <option value="title">
                    {locale ===
                    "en"
                      ? "Title"
                      : "標題"}
                  </option>
                </select>

                <div className="flex h-12 rounded-xl border border-border p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setSingleParam(
                        "view",
                        "grid"
                      )
                    }
                    aria-label="Grid view"
                    className={`rounded-lg px-3 ${
                      viewMode ===
                      "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSingleParam(
                        "view",
                        "list"
                      )
                    }
                    aria-label="List view"
                    className={`rounded-lg px-3 ${
                      viewMode ===
                      "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {filtersOpen && (
                <m.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 grid gap-8 border-t border-border pt-6 lg:grid-cols-3">
                    <FilterGroup
                      title={
                        text.category
                      }
                    >
                      <FilterButton
                        active={
                          !category
                        }
                        label={
                          text.all
                        }
                        onClick={() =>
                          setSingleParam(
                            "category"
                          )
                        }
                      />

                      {categories.map(
                        (
                          categoryValue
                        ) => (
                          <FilterButton
                            key={
                              categoryValue
                            }
                            active={
                              category ===
                              categoryValue
                            }
                            label={
                              categoryLabels[
                                locale
                              ][
                                categoryValue
                              ]
                            }
                            onClick={() =>
                              setSingleParam(
                                "category",
                                categoryValue
                              )
                            }
                          />
                        )
                      )}
                    </FilterGroup>

                    <FilterGroup
                      title={
                        text.status
                      }
                    >
                      <FilterButton
                        active={
                          !status
                        }
                        label={
                          text.all
                        }
                        onClick={() =>
                          setSingleParam(
                            "status"
                          )
                        }
                      />

                      {statuses.map(
                        (
                          statusValue
                        ) => (
                          <FilterButton
                            key={
                              statusValue
                            }
                            active={
                              status ===
                              statusValue
                            }
                            label={
                              statusLabels[
                                locale
                              ][
                                statusValue
                              ]
                            }
                            onClick={() =>
                              setSingleParam(
                                "status",
                                statusValue
                              )
                            }
                          />
                        )
                      )}
                    </FilterGroup>

                    <FilterGroup
                      title={
                        text.technology
                      }
                    >
                      <div className="flex flex-wrap gap-2">
                        {technologyOptions
                          .slice(
                            0,
                            14
                          )
                          .map(
                            (
                              technology
                            ) => {
                              const active =
                                technologies.includes(
                                  technology.name
                                );

                              return (
                                <button
                                  key={
                                    technology.name
                                  }
                                  type="button"
                                  onClick={() =>
                                    toggleTechnology(
                                      technology.name
                                    )
                                  }
                                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                                    active
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border hover:bg-accent"
                                  }`}
                                >
                                  {active && (
                                    <Check className="h-3 w-3" />
                                  )}

                                  {
                                    technology.name
                                  }

                                  <span
                                    className={
                                      active
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground"
                                    }
                                  >
                                    {
                                      technology.count
                                    }
                                  </span>
                                </button>
                              );
                            }
                          )}
                      </div>
                    </FilterGroup>
                  </div>

                  {activeFilterCount >
                    0 && (
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={
                          clearFilters
                        }
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                      >
                        <RotateCcw className="h-4 w-4" />

                        {
                          text.clear
                        }
                      </button>
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </section>

          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                {
                  filteredProjects.length
                }
              </strong>{" "}
              {text.results}
            </p>

            {isPending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4 animate-pulse" />

                {locale === "en"
                  ? "Updating…"
                  : "更新中…"}
              </div>
            )}
          </div>

          <LayoutGroup id="project-archive">
            <m.section
              layout
              className={
                viewMode ===
                "grid"
                  ? "grid gap-7 md:grid-cols-2 xl:grid-cols-3"
                  : "space-y-6"
              }
            >
              <AnimatePresence
                mode="popLayout"
              >
                {filteredProjects.map(
                  (
                    project,
                    index
                  ) => (
                    <ProjectArchiveCard
                      key={
                        project.slug
                      }
                      project={
                        project
                      }
                      locale={locale}
                      index={index}
                      viewMode={
                        viewMode
                      }
                      onPreview={
                        setSelectedProject
                      }
                    />
                  )
                )}
              </AnimatePresence>
            </m.section>
          </LayoutGroup>

          {filteredProjects.length ===
            0 && (
            <m.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-3xl border border-dashed border-border py-24 text-center"
            >
              <Search className="mx-auto mb-5 h-10 w-10 text-muted-foreground" />

              <p className="text-muted-foreground">
                {text.noResults}
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="mt-5 font-medium text-primary"
              >
                {text.clear}
              </button>
            </m.div>
          )}
        </div>
      </main>

      <ProjectPreviewDialog
        project={selectedProject}
        locale={locale}
        onClose={() =>
          setSelectedProject(
            null
          )
        }
      />
    </>
  );
}

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

function FilterGroup({
  title,
  children,
}: FilterGroupProps) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-bold">
        {title}
      </h2>

      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </section>
  );
}

interface FilterButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

function FilterButton({
  active,
  label,
  onClick,
}: FilterButtonProps) {
  return (
    <m.button
      type="button"
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-accent"
      }`}
    >
      {label}
    </m.button>
  );
}

function parseCategory(
  value: string | null
): ProjectCategory | undefined {
  return categories.includes(
    value as ProjectCategory
  )
    ? (value as ProjectCategory)
    : undefined;
}

function parseStatus(
  value: string | null
): ProjectStatus | undefined {
  return statuses.includes(
    value as ProjectStatus
  )
    ? (value as ProjectStatus)
    : undefined;
}

function parseSort(
  value: string | null
): ProjectSort {
  const values: ProjectSort[] =
    [
      "featured",
      "newest",
      "oldest",
      "title",
    ];

  return values.includes(
    value as ProjectSort
  )
    ? (value as ProjectSort)
    : "featured";
}

function parseViewMode(
  value: string | null
): ProjectViewMode {
  return value === "list"
    ? "list"
    : "grid";
}
```

---

# 十、更新作品總覽頁

修改：

```text
src/app/[locale]/projects/all/page.tsx
```

```tsx
import type {
  Metadata,
} from "next";

import {
  Suspense,
} from "react";

import {
  ProjectExplorer,
} from "@/components/projects/archive/project-explorer";

import {
  projects,
} from "@/data/projects";

import {
  normalizePortfolioLocale,
} from "@/lib/projects";

interface AllProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  title:
    "Project Archive | Justin",
  description:
    "Browse Justin's projects by technology, domain, platform, capability, and development status.",
};

export default async function AllProjectsPage({
  params,
}: AllProjectsPageProps) {
  const {
    locale: localeParam,
  } = await params;

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  return (
    <Suspense
      fallback={
        <ProjectExplorerSkeleton />
      }
    >
      <ProjectExplorer
        projects={projects}
        locale={locale}
      />
    </Suspense>
  );
}

function ProjectExplorerSkeleton() {
  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="section-shell">
        <div className="mx-auto mb-12 h-36 max-w-3xl animate-pulse rounded-3xl bg-secondary" />

        <div className="mb-10 h-40 animate-pulse rounded-3xl bg-secondary" />

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-[32rem] animate-pulse rounded-3xl bg-secondary"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
```

---

# 十一、建立詳細頁媒體瀏覽器

建立：

```text
src/components/projects/detail/project-media-gallery.tsx
```

```tsx
"use client";

import {
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import {
  ImageIcon,
  Play,
} from "lucide-react";

import {
  AnimatePresence,
  m,
} from "motion/react";

import type {
  PortfolioLocale,
  ProjectMedia,
} from "@/types/projects";

interface ProjectMediaGalleryProps {
  media: ProjectMedia[];
  locale: PortfolioLocale;
}

export function ProjectMediaGallery({
  media,
  locale,
}: ProjectMediaGalleryProps) {
  const orderedMedia =
    useMemo(
      () =>
        [...media].sort(
          (a, b) =>
            Number(
              Boolean(
                b.featured
              )
            ) -
            Number(
              Boolean(
                a.featured
              )
            )
        ),
      [media]
    );

  const [
    selectedId,
    setSelectedId,
  ] = useState(
    orderedMedia[0]?.id ?? ""
  );

  const selectedMedia =
    orderedMedia.find(
      (item) =>
        item.id === selectedId
    ) ??
    orderedMedia[0];

  if (!selectedMedia) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-border bg-card text-muted-foreground">
        <div className="text-center">
          <ImageIcon className="mx-auto mb-3 h-10 w-10" />

          <p>
            {locale === "en"
              ? "Project media will be added soon."
              : "專案媒體內容即將補上。"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
        <AnimatePresence
          mode="wait"
        >
          <m.div
            key={selectedMedia.id}
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.01,
            }}
            transition={{
              duration: 0.35,
            }}
            className="relative aspect-video bg-background"
          >
            {selectedMedia.type ===
            "video" ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={
                  selectedMedia.poster
                }
                className="h-full w-full object-contain"
              >
                <source
                  src={
                    selectedMedia.src
                  }
                />
              </video>
            ) : (
              <Image
                src={
                  selectedMedia.src
                }
                alt={
                  selectedMedia.alt[
                    locale
                  ]
                }
                fill
                priority={
                  selectedMedia.featured
                }
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain"
              />
            )}
          </m.div>
        </AnimatePresence>

        <div className="border-t border-border p-5">
          <h2 className="font-bold">
            {
              selectedMedia.title[
                locale
              ]
            }
          </h2>

          {selectedMedia.caption && (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {
                selectedMedia.caption[
                  locale
                ]
              }
            </p>
          )}
        </div>
      </div>

      {orderedMedia.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {orderedMedia.map(
            (item) => {
              const active =
                item.id ===
                selectedMedia.id;

              return (
                <m.button
                  key={item.id}
                  type="button"
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    setSelectedId(
                      item.id
                    )
                  }
                  aria-label={
                    item.title[
                      locale
                    ]
                  }
                  className={`relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border-2 bg-secondary ${
                    active
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {item.type ===
                  "video" ? (
                    <>
                      {item.poster && (
                        <Image
                          src={
                            item.poster
                          }
                          alt=""
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      )}

                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-7 w-7 text-white" />
                      </span>
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  )}
                </m.button>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}
```

靜態圖片與影片應放在專案根目錄的 `public` 內，然後透過 `/portfolio/...` 使用。Next.js 會從根目錄 `public` 提供靜態資產，圖片則可交給 `next/image` 處理；官方也提供在 App Router 中使用本機或外部影片的專門指南。([Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder?utm_source=chatgpt.com))

---

# 十二、重寫完整作品詳細頁

修改：

```text
src/app/[locale]/projects/[slug]/page.tsx
```

```tsx
import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Download,
  ExternalLink,
  GitBranch,
  Lightbulb,
  Target,
  Wrench,
} from "lucide-react";

import {
  Link,
} from "@/i18n/navigation";

import {
  ProjectMediaGallery,
} from "@/components/projects/detail/project-media-gallery";

import {
  Reveal,
} from "@/components/motion/reveal";

import {
  projects,
} from "@/data/projects";

import {
  getProjectBySlug,
  getRelatedProjects,
  normalizePortfolioLocale,
} from "@/lib/projects";

import {
  statusLabels,
} from "@/lib/project-taxonomy";

import type {
  ProjectLinkKind,
} from "@/types/projects";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map(
    (project) => ({
      slug: project.slug,
    })
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
    slug,
  } = await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    return {
      title:
        "Project not found",
    };
  }

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  const content =
    project.content[locale];

  return {
    title: `${content.title} | Justin`,

    description:
      content.summary,

    openGraph: {
      title: content.title,
      description:
        content.summary,

      images:
        project.coverImage
          ? [
              {
                url:
                  project.coverImage,
                alt:
                  content.title,
              },
            ]
          : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const {
    locale: localeParam,
    slug,
  } = await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  const content =
    project.content[locale];

  const relatedProjects =
    getRelatedProjects(
      project,
      3
    );

  const labels =
    locale === "en"
      ? {
          back:
            "Back to project archive",
          overview:
            "Project overview",
          role: "My role",
          problem:
            "Problem",
          solution:
            "Solution",
          outcome:
            "Current outcome",
          features:
            "Key features",
          highlights:
            "Highlights",
          challenges:
            "Engineering challenges",
          nextSteps:
            "Next steps",
          metadata:
            "Project metadata",
          technologies:
            "Technologies",
          platforms:
            "Platforms",
          domains:
            "Domains",
          capabilities:
            "Capabilities",
          roles:
            "Responsibilities",
          updated:
            "Last updated",
          duration:
            "Duration",
          team:
            "Team size",
          related:
            "Related projects",
        }
      : {
          back:
            "返回作品典藏庫",
          overview:
            "專案概覽",
          role: "我的角色",
          problem:
            "問題背景",
          solution:
            "解決方案",
          outcome:
            "目前成果",
          features:
            "核心功能",
          highlights:
            "作品亮點",
          challenges:
            "技術挑戰",
          nextSteps:
            "後續規劃",
          metadata:
            "專案 Metadata",
          technologies:
            "使用技術",
          platforms:
            "執行平台",
          domains:
            "應用領域",
          capabilities:
            "系統能力",
          roles:
            "負責項目",
          updated:
            "最後更新",
          duration:
            "開發期間",
          team:
            "團隊人數",
          related:
            "相關作品",
        };

  const features =
    content.features ?? [];

  const metrics =
    content.metrics ?? [];

  return (
    <main className="min-h-screen pb-24 pt-28">
      <article className="section-shell">
        <Reveal>
          <Link
            href="/projects/all"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />

            {labels.back}
          </Link>
        </Reveal>

        <header className="mb-12">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {
                  statusLabels[
                    locale
                  ][project.status]
                }
              </span>

              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {project.year}
              </span>

              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {
                  project.category
                }
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-5xl text-balance text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
              {content.title}
            </h1>
          </Reveal>

          {content.tagline && (
            <Reveal delay={0.14}>
              <p className="mt-5 text-xl font-medium text-primary md:text-2xl">
                {
                  content.tagline
                }
              </p>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-4xl text-pretty text-lg leading-8 text-muted-foreground">
              {content.summary}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map(
                (link) => {
                  const Icon =
                    getLinkIcon(
                      link.kind
                    );

                  return (
                    <a
                      key={`${link.kind}-${link.url}`}
                      href={
                        link.url
                      }
                      target="_blank"
                      rel="noreferrer"
                      className={
                        link.primary
                          ? "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
                          : "inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-medium transition-colors hover:bg-accent"
                      }
                    >
                      <Icon className="h-4 w-4" />

                      {
                        link.label[
                          locale
                        ]
                      }

                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  );
                }
              )}
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.12}>
          <ProjectMediaGallery
            media={project.media}
            locale={locale}
          />
        </Reveal>

        {metrics.length > 0 && (
          <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map(
              (
                metric,
                index
              ) => (
                <Reveal
                  key={
                    metric.label
                  }
                  delay={
                    index * 0.08
                  }
                >
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <p className="text-3xl font-bold text-primary">
                      {
                        metric.value
                      }
                    </p>

                    <p className="mt-2 font-bold">
                      {
                        metric.label
                      }
                    </p>

                    {metric.description && (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {
                          metric.description
                        }
                      </p>
                    )}
                  </div>
                </Reveal>
              )
            )}
          </section>
        )}

        <div className="mt-16 grid gap-12 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <ContentSection
              title={
                labels.overview
              }
              icon={BookOpen}
            >
              <p className="leading-8 text-muted-foreground">
                {
                  content.description
                }
              </p>
            </ContentSection>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <SummaryCard
                title={
                  labels.role
                }
                content={
                  content.role
                }
                icon={Target}
              />

              <SummaryCard
                title={
                  labels.problem
                }
                content={
                  content.problem
                }
                icon={Lightbulb}
              />

              <SummaryCard
                title={
                  labels.solution
                }
                content={
                  content.solution
                }
                icon={Wrench}
              />
            </div>

            {content.outcome && (
              <ContentSection
                title={
                  labels.outcome
                }
                icon={
                  CheckCircle2
                }
                className="mt-12"
              >
                <p className="leading-8 text-muted-foreground">
                  {
                    content.outcome
                  }
                </p>
              </ContentSection>
            )}

            {features.length >
              0 && (
              <ContentSection
                title={
                  labels.features
                }
                icon={Target}
                className="mt-12"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  {features.map(
                    (
                      feature,
                      index
                    ) => (
                      <Reveal
                        key={
                          feature.id
                        }
                        delay={
                          index *
                          0.06
                        }
                      >
                        <article className="h-full rounded-2xl border border-border bg-card p-6">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Feature{" "}
                            {String(
                              index +
                                1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </p>

                          <h3 className="text-xl font-bold">
                            {
                              feature.title
                            }
                          </h3>

                          <p className="mt-3 leading-7 text-muted-foreground">
                            {
                              feature.description
                            }
                          </p>

                          {feature
                            .bullets && (
                            <ul className="mt-5 space-y-2">
                              {feature.bullets.map(
                                (
                                  bullet
                                ) => (
                                  <li
                                    key={
                                      bullet
                                    }
                                    className="flex gap-3 text-sm text-muted-foreground"
                                  >
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                                    {
                                      bullet
                                    }
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </article>
                      </Reveal>
                    )
                  )}
                </div>
              </ContentSection>
            )}

            <ListSection
              title={
                labels.highlights
              }
              items={
                content.highlights
              }
              icon={
                CheckCircle2
              }
              className="mt-12"
            />

            <ListSection
              title={
                labels.challenges
              }
              items={
                content.challenges
              }
              icon={Wrench}
              className="mt-12"
            />

            <ListSection
              title={
                labels.nextSteps
              }
              items={
                content.nextSteps
              }
              icon={Target}
              className="mt-12"
            />
          </div>

          <aside>
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold">
                {labels.metadata}
              </h2>

              <MetadataValue
                label={
                  labels.updated
                }
                value={
                  project.metadata
                    .updatedAt
                }
              />

              {project.metadata
                .duration && (
                <MetadataValue
                  label={
                    labels.duration
                  }
                  value={
                    project
                      .metadata
                      .duration
                  }
                />
              )}

              <MetadataValue
                label={
                  labels.team
                }
                value={String(
                  project.metadata
                    .teamSize ?? 1
                )}
              />

              <MetadataTags
                label={
                  labels.technologies
                }
                values={
                  project.technologies
                }
              />

              <MetadataTags
                label={
                  labels.platforms
                }
                values={
                  project.metadata
                    .platforms
                }
              />

              <MetadataTags
                label={
                  labels.domains
                }
                values={
                  project.metadata
                    .domains
                }
              />

              <MetadataTags
                label={
                  labels.capabilities
                }
                values={
                  project.metadata
                    .capabilities
                }
              />

              <MetadataTags
                label={
                  labels.roles
                }
                values={
                  project.metadata
                    .roles
                }
              />
            </div>
          </aside>
        </div>

        {relatedProjects.length >
          0 && (
          <section className="mt-24 border-t border-border pt-16">
            <Reveal>
              <h2 className="mb-8 text-3xl font-bold">
                {labels.related}
              </h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map(
                (
                  related,
                  index
                ) => (
                  <Reveal
                    key={
                      related.slug
                    }
                    delay={
                      index * 0.08
                    }
                  >
                    <Link
                      href={`/projects/${related.slug}`}
                      className="group block h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                    >
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        {
                          related.year
                        }
                      </p>

                      <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                        {
                          related
                            .content[
                            locale
                          ].title
                        }
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {
                          related
                            .content[
                            locale
                          ].summary
                        }
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        {locale ===
                        "en"
                          ? "View project"
                          : "查看作品"}

                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Reveal>
                )
              )}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

interface ContentSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

function ContentSection({
  title,
  icon: Icon,
  children,
  className,
}: ContentSectionProps) {
  return (
    <Reveal
      className={className}
    >
      <section>
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>
        </div>

        {children}
      </section>
    </Reveal>
  );
}

interface SummaryCardProps {
  title: string;
  content: string;
  icon: React.ElementType;
}

function SummaryCard({
  title,
  content,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <Reveal>
      <article className="h-full rounded-2xl border border-border bg-card p-6">
        <Icon className="mb-4 h-6 w-6 text-primary" />

        <h2 className="mb-3 font-bold">
          {title}
        </h2>

        <p className="text-sm leading-7 text-muted-foreground">
          {content}
        </p>
      </article>
    </Reveal>
  );
}

interface ListSectionProps {
  title: string;
  items: string[];
  icon: React.ElementType;
  className?: string;
}

function ListSection({
  title,
  items,
  icon: Icon,
  className,
}: ListSectionProps) {
  return (
    <ContentSection
      title={title}
      icon={Icon}
      className={className}
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map(
          (item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <span className="leading-7 text-muted-foreground">
                {item}
              </span>
            </li>
          )
        )}
      </ul>
    </ContentSection>
  );
}

interface MetadataValueProps {
  label: string;
  value: string;
}

function MetadataValue({
  label,
  value,
}: MetadataValueProps) {
  return (
    <div className="border-b border-border py-4 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 font-medium">
        {value}
      </p>
    </div>
  );
}

interface MetadataTagsProps {
  label: string;
  values: string[];
}

function MetadataTags({
  label,
  values,
}: MetadataTagsProps) {
  if (values.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border py-4 last:border-0">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {values.map(
          (value) => (
            <span
              key={value}
              className="rounded-md bg-secondary px-2 py-1 text-xs"
            >
              {value}
            </span>
          )
        )}
      </div>
    </div>
  );
}

function getLinkIcon(
  kind: ProjectLinkKind
) {
  switch (kind) {
    case "github":
      return GitBranch;

    case "documentation":
    case "article":
      return BookOpen;

    case "download":
      return Download;

    case "video":
      return ExternalLink;

    case "live":
    default:
      return ExternalLink;
  }
}
```

`[slug]` 是標準的 App Router 動態路由，`generateStaticParams` 可在建置時預先產生作品路由，而 `generateMetadata` 可依照每筆作品資料建立獨立的標題、描述與分享圖片。([Next.js](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes?utm_source=chatgpt.com))

---

# 十三、準備專案圖片與影片

先建立第一個作品的媒體資料夾：

```bash
mkdir -p public/portfolio/projects/digital-archive-management-system/screenshots

mkdir -p public/portfolio/projects/digital-archive-management-system/demo
```

將檔案放成：

```text
public/portfolio/projects/digital-archive-management-system/
├── cover.webp
├── screenshots/
│   ├── node-editor.webp
│   ├── metadata-panel.webp
│   └── search-results.webp
└── demo/
    ├── overview.mp4
    └── poster.webp
```

圖片建議：

```text
cover.webp
1920 × 1080

node-editor.webp
1600 × 1000

metadata-panel.webp
1600 × 1000

search-results.webp
1600 × 1000
```

Demo 影片不需要很長，面試作品最適合：

```text
30～90 秒
1080p
無需口白也能理解
畫面上加入簡短操作標題
先展示最精彩功能
不要從登入畫面慢慢演半天
```

影片內容順序建議：

```text
0-5 秒
專案名稱與核心價值

5-20 秒
節點拖曳與連線

20-35 秒
設定 Metadata 條件

35-50 秒
產生搜尋結果

50-65 秒
預覽檔案與編輯屬性

65-75 秒
顯示完整工作區
```

---

# 十四、Header 作品選單連結

將 Header 的作品選單統一連到 Archive，並透過 Query 預先篩選：

```ts
const projectMenuItems = [
  {
    href:
      "/projects/all",

    label:
      locale === "en"
        ? "All Projects"
        : "全部作品",
  },

  {
    href:
      "/projects/all?category=information-system",

    label:
      locale === "en"
        ? "Information Systems"
        : "資訊系統",
  },

  {
    href:
      "/projects/all?category=interactive-3d",

    label:
      locale === "en"
        ? "3D & Interactive"
        : "3D 與互動",
  },

  {
    href:
      "/projects/all?category=ai-data",

    label:
      locale === "en"
        ? "AI & Data"
        : "AI 與資料",
  },

  {
    href:
      "/projects/all?category=frontend",

    label:
      locale === "en"
        ? "Frontend Apps"
        : "前端應用",
  },

  {
    href:
      "/projects/all?category=backend-desktop",

    label:
      locale === "en"
        ? "Backend & Desktop"
        : "後端與桌面",
  },
];
```

---

# 十五、執行檢查

```bash
rm -rf .next

npx tsc --noEmit

npm run lint

npm run build

npm run dev
```

測試：

```text
http://localhost:3000/zh-TW/projects/all

http://localhost:3000/en/projects/all

http://localhost:3000/zh-TW/projects/all?category=information-system

http://localhost:3000/zh-TW/projects/all?tech=Three.js

http://localhost:3000/zh-TW/projects/digital-archive-management-system
```

確認以下行為：

- 搜尋會同步到 URL
- 選擇分類會同步到 URL
- 可同時選多個技術
- Grid 與 List 可切換
- 卡片篩選時具有重新排列動畫
- 快速預覽具有共享封面與彈出動畫
- Esc 可以關閉預覽
- 詳細頁可切換影片與圖片
- GitHub、Demo、文件連結正常
- Metadata 面板可固定於右側
- 中英文內容會正確切換
- 沒有媒體的作品會顯示安全的空狀態
- `npm run build` 成功

下一階段會進入 **Project Archive V2**：加入 Metadata 統計面板、Command Palette 全站搜尋、作品比較模式、專案收藏、截圖 Lightbox、章節目錄、高亮捲動定位，以及更完整的 Header／頁面切換動畫。

---

**Sources:**

- [Functions: useSearchParams | Next.js](https://nextjs.org/docs/app/api-reference/functions/use-search-params?utm_source=chatgpt.com)
- [AnimatePresence | React exit animations | Motion React](https://motion.dev/docs/react-animate-presence?utm_source=chatgpt.com)

## Response:
6/19/2026, 11:04:54 PM

> **Continuing project steps and deciding on info sources**
>
> Next step seems clear: continue with the project implementation. We may not need a file search right now since the context is enough. I could consider checking for personal context, but it’s not crucial. I’ll need to get up-to-date details from the web on libraries to make sure we’re using the latest.
>
> **Focusing on next step with current docs**
>
> I’ll need to check the latest documentation for Next.js and Motion, especially around view transitions, since Next.js 16 might have experimental features. For the next stage, implementing the Project Archive V2 core might be a good choice. I’ll focus on manageable parts like metadata stats, command palette, and favorites to keep it simple.
>
> **Planning next step for Project Archive V2 implementation**
>
> [Layout Animation | React FLIP & Shared Element | Motion React](https://motion.dev/docs/react-layout-animations)
> [Command - shadcn/ui](https://ui.shadcn.com/docs/components/base/command)
> [Functions: useRouter | Next.js](https://nextjs.org/docs/app/api-reference/functions/use-router)
>
> **Deciding on manageable scope for Archive V2**
>
> The next stage could be "Archive V2-A," focusing on global search, favorites, and compare foundation. I will create detailed files for this, including the metadata stats dashboard and project explorer toolbar. It’s a lot, but I think it’s a good start without overwhelming things. I'll provide the necessary code as expected.
>
> **Planning Archive V2 features with code implementation**
>
> [Getting Started: Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
>
> **Detailing next step for Sprint 9**
>
> I'll focus on creating the next phase for Sprint 9: "Command Center," with Favorites, Compare, and Page Transitions. Key tasks include:
> 
> 1. Implementing a command/dialog system.
> 2. Storing favorites and compare data with Zustand in localStorage.
> 3. Adding a global command palette (Ctrl/Cmd+K).
> 4. Updating the Archive with stats and tech overview.
> 5. Adding controls for comparison in cards.
> 
> This gives us a substantial, yet manageable step forward.
>
> **Addressing file citation and next steps**
>
> Since the developer requested a file citation, I'll include that reference, using the "turn0file0" from earlier, without needing line numbers. The current context should be sufficient, and a file search might not be necessary. Now, I’ll move on to designing the code. The first step: install necessary packages and ensure Zustand is set up.
>
> Thought for 49s

很好。依照目前的實作紀錄，你已經完成作品資料模型、Metadata 篩選、快速預覽、媒體瀏覽器與完整 Case Study 的主要骨架。`前端工程師技能實戰指南_qwen.md`

接下來進入：

# Sprint 9：Project Command Center

這一階段會增加：

- 全站 `Ctrl / Cmd + K` 作品搜尋
- 收藏作品
- 最多三個作品比較
- 浮動比較工具列
- 專案比較頁
- 作品典藏統計面板
- 收藏篩選
- 全站頁面切換動畫
- 更多 Motion Layout Animation

Next.js 的 `template.tsx` 和持續存在的 `layout.tsx` 不同，它會在導覽時重新建立子樹，因此很適合拿來製作頁面進場動畫。([Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/template?utm_source=chatgpt.com))

作品增減、篩選和比較工具列則繼續使用 Motion 的 `layout`、`LayoutGroup` 與 `AnimatePresence`，讓元素離場與重新排列保持平滑。([Motion](https://motion.dev/docs/react-layout-animations?utm_source=chatgpt.com))

---

# 一、安裝 Command Palette 元件

執行：

```bash
npx shadcn@latest add command dialog separator badge
```

若專案還沒有 Zustand：

```bash
npm install zustand
```

Shadcn 的 `CommandDialog` 基於 Command 元件，適合製作鍵盤導向的全站搜尋介面。([Shadcn UI](https://ui.shadcn.com/docs/components/base/command?utm_source=chatgpt.com))

建立目錄：

```bash
mkdir -p src/components/command
mkdir -p src/components/projects/compare
mkdir -p src/stores
mkdir -p src/hooks
mkdir -p 'src/app/[locale]/projects/compare'
```

完成後新增：

```text
src/
├── app/
│   └── [locale]/
│       ├── template.tsx
│       └── projects/
│           └── compare/
│               └── page.tsx
├── components/
│   ├── command/
│   │   ├── project-command-button.tsx
│   │   └── project-command-palette.tsx
│   └── projects/
│       ├── archive/
│       │   ├── project-archive-overview.tsx
│       │   └── project-archive-card.tsx
│       └── compare/
│           └── project-compare-bar.tsx
├── hooks/
│   └── use-mounted.ts
└── stores/
    └── project-preferences-store.ts
```

---

# 二、建立 Mounted Hook

Zustand 的收藏資料會從 `localStorage` 恢復。為了避免伺服器初始畫面和瀏覽器狀態不一致，先建立：

## `src/hooks/use-mounted.ts`

```ts
"use client";

import {
  useEffect,
  useState,
} from "react";

export function useMounted() {
  const [
    mounted,
    setMounted,
  ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
```

---

# 三、建立收藏與比較 Store

## `src/stores/project-preferences-store.ts`

```ts
"use client";

import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

const MAX_COMPARE_PROJECTS = 3;

interface ProjectPreferencesState {
  favoriteSlugs: string[];
  compareSlugs: string[];

  toggleFavorite: (
    slug: string
  ) => void;

  addToCompare: (
    slug: string
  ) => boolean;

  removeFromCompare: (
    slug: string
  ) => void;

  clearCompare: () => void;
}

export const useProjectPreferences =
  create<ProjectPreferencesState>()(
    persist(
      (set, get) => ({
        favoriteSlugs: [],
        compareSlugs: [],

        toggleFavorite: (
          slug
        ) => {
          set((state) => {
            const isFavorite =
              state.favoriteSlugs.includes(
                slug
              );

            return {
              favoriteSlugs:
                isFavorite
                  ? state.favoriteSlugs.filter(
                      (
                        currentSlug
                      ) =>
                        currentSlug !==
                        slug
                    )
                  : [
                      ...state.favoriteSlugs,
                      slug,
                    ],
            };
          });
        },

        addToCompare: (
          slug
        ) => {
          const {
            compareSlugs,
          } = get();

          if (
            compareSlugs.includes(
              slug
            )
          ) {
            return true;
          }

          if (
            compareSlugs.length >=
            MAX_COMPARE_PROJECTS
          ) {
            return false;
          }

          set({
            compareSlugs: [
              ...compareSlugs,
              slug,
            ],
          });

          return true;
        },

        removeFromCompare: (
          slug
        ) => {
          set((state) => ({
            compareSlugs:
              state.compareSlugs.filter(
                (
                  currentSlug
                ) =>
                  currentSlug !==
                  slug
              ),
          }));
        },

        clearCompare: () => {
          set({
            compareSlugs: [],
          });
        },
      }),
      {
        name:
          "justin-portfolio-project-preferences",

        partialize: (
          state
        ) => ({
          favoriteSlugs:
            state.favoriteSlugs,

          compareSlugs:
            state.compareSlugs,
        }),
      }
    )
  );
```

這個 Store 會把收藏與比較選擇保存在瀏覽器中。

重新整理頁面後仍會保留：

```text
favoriteSlugs
compareSlugs
```

比較上限設定為三個。超過三個時，`addToCompare()` 會回傳 `false`。

---

# 四、建立全站頁面切換動畫

建立：

## `src/app/[locale]/template.tsx`

```tsx
"use client";

import type {
  ReactNode,
} from "react";

import {
  m,
  useReducedMotion,
} from "motion/react";

interface LocaleTemplateProps {
  children: ReactNode;
}

export default function LocaleTemplate({
  children,
}: LocaleTemplateProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <m.div
      initial={
        shouldReduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
              y: 18,
              filter:
                "blur(6px)",
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0.1
            : 0.5,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      {children}
    </m.div>
  );
}
```

現在切換以下頁面時，都會有柔和的淡入與位移效果：

```text
首頁 → 作品總覽
作品總覽 → 專案詳細頁
專案詳細頁 → About
中文 → 英文
```

不要在這裡加入很長的離場動畫。頁面切換是導航，不是電影片頭。

---

# 五、建立 Command Palette 開啟按鈕

## `src/components/command/project-command-button.tsx`

```tsx
"use client";

import {
  Command,
  Search,
} from "lucide-react";

import {
  m,
} from "motion/react";

export function ProjectCommandButton() {
  function openCommandPalette() {
    window.dispatchEvent(
      new CustomEvent(
        "portfolio:open-command"
      )
    );
  }

  return (
    <m.button
      type="button"
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={
        openCommandPalette
      }
      aria-label="搜尋所有作品"
      className="group hidden h-10 items-center gap-2 rounded-lg border border-border bg-background/70 px-3 text-sm text-muted-foreground backdrop-blur transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
    >
      <Search className="h-4 w-4" />

      <span className="hidden xl:inline">
        搜尋作品
      </span>

      <span className="ml-1 hidden items-center gap-1 xl:flex">
        <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px]">
          <Command className="inline h-3 w-3" />
        </kbd>

        <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px]">
          K
        </kbd>
      </span>
    </m.button>
  );
}
```

在 Linux 與 Windows 上使用：

```text
Ctrl + K
```

在 macOS 上使用：

```text
Cmd + K
```

---

# 六、建立全站作品 Command Palette

## `src/components/command/project-command-palette.tsx`

```tsx
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  Heart,
  Search,
  Sparkles,
} from "lucide-react";

import {
  m,
} from "motion/react";

import {
  useRouter,
} from "@/i18n/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import {
  useMounted,
} from "@/hooks/use-mounted";

import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
} from "@/types/projects";

interface ProjectCommandPaletteProps {
  projects: Project[];
  locale: PortfolioLocale;
}

const categoryIcons: Record<
  ProjectCategory,
  React.ElementType
> = {
  "information-system":
    Database,

  "interactive-3d":
    Box,

  "ai-data":
    Sparkles,

  frontend:
    Code2,

  "backend-desktop":
    Database,
};

export function ProjectCommandPalette({
  projects,
  locale,
}: ProjectCommandPaletteProps) {
  const router =
    useRouter();

  const mounted =
    useMounted();

  const [
    open,
    setOpen,
  ] = useState(false);

  const favoriteSlugs =
    useProjectPreferences(
      (state) =>
        state.favoriteSlugs
    );

  const favoriteProjects =
    useMemo(() => {
      if (!mounted) {
        return [];
      }

      return projects.filter(
        (project) =>
          favoriteSlugs.includes(
            project.slug
          )
      );
    }, [
      favoriteSlugs,
      mounted,
      projects,
    ]);

  const featuredProjects =
    useMemo(
      () =>
        projects.filter(
          (project) =>
            project.featured
        ),
      [projects]
    );

  useEffect(() => {
    function handleKeyboard(
      event: KeyboardEvent
    ) {
      const isCommand =
        event.metaKey ||
        event.ctrlKey;

      if (
        isCommand &&
        event.key.toLowerCase() ===
          "k"
      ) {
        event.preventDefault();

        setOpen(
          (current) =>
            !current
        );
      }
    }

    function handleOpenEvent() {
      setOpen(true);
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    window.addEventListener(
      "portfolio:open-command",
      handleOpenEvent
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );

      window.removeEventListener(
        "portfolio:open-command",
        handleOpenEvent
      );
    };
  }, []);

  function openProject(
    slug: string
  ) {
    setOpen(false);

    router.push(
      `/projects/${slug}`
    );
  }

  function openProjectArchive() {
    setOpen(false);

    router.push(
      "/projects/all"
    );
  }

  const text =
    locale === "en"
      ? {
          placeholder:
            "Search projects, technologies, domains, or features…",

          empty:
            "No matching projects.",

          favorites:
            "Favorites",

          featured:
            "Featured projects",

          all:
            "All projects",

          archive:
            "Open project archive",
        }
      : {
          placeholder:
            "搜尋作品、技術、領域或功能…",

          empty:
            "找不到符合條件的作品。",

          favorites:
            "收藏作品",

          featured:
            "精選作品",

          all:
            "所有作品",

          archive:
            "開啟完整作品典藏庫",
        };

  return (
    <CommandDialog
      open={open}
      onOpenChange={
        setOpen
      }
    >
      <CommandInput
        placeholder={
          text.placeholder
        }
      />

      <CommandList className="max-h-[70svh]">
        <CommandEmpty>
          <m.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex flex-col items-center py-10 text-center"
          >
            <Search className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">
              {text.empty}
            </p>
          </m.div>
        </CommandEmpty>

        {favoriteProjects.length >
          0 && (
          <>
            <CommandGroup
              heading={
                text.favorites
              }
            >
              {favoriteProjects.map(
                (project) => (
                  <ProjectCommandItem
                    key={
                      project.slug
                    }
                    project={
                      project
                    }
                    locale={
                      locale
                    }
                    icon={Heart}
                    onSelect={() =>
                      openProject(
                        project.slug
                      )
                    }
                  />
                )
              )}
            </CommandGroup>

            <CommandSeparator />
          </>
        )}

        <CommandGroup
          heading={
            text.featured
          }
        >
          {featuredProjects.map(
            (project) => (
              <ProjectCommandItem
                key={
                  project.slug
                }
                project={
                  project
                }
                locale={locale}
                icon={Sparkles}
                onSelect={() =>
                  openProject(
                    project.slug
                  )
                }
              />
            )
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup
          heading={text.all}
        >
          {projects.map(
            (project) => {
              const Icon =
                categoryIcons[
                  project.category
                ];

              return (
                <ProjectCommandItem
                  key={
                    project.slug
                  }
                  project={
                    project
                  }
                  locale={
                    locale
                  }
                  icon={Icon}
                  onSelect={() =>
                    openProject(
                      project.slug
                    )
                  }
                />
              );
            }
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup>
          <CommandItem
            value="project archive all projects metadata explorer"
            onSelect={
              openProjectArchive
            }
            className="gap-3 py-3"
          >
            <ExternalLink className="h-4 w-4 text-primary" />

            <span>
              {text.archive}
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

interface ProjectCommandItemProps {
  project: Project;
  locale: PortfolioLocale;
  icon: React.ElementType;
  onSelect: () => void;
}

function ProjectCommandItem({
  project,
  locale,
  icon: Icon,
  onSelect,
}: ProjectCommandItemProps) {
  const content =
    project.content[locale];

  const searchableValue = [
    content.title,
    content.tagline,
    content.summary,
    content.description,
    ...project.technologies,
    ...project.metadata.domains,
    ...project.metadata.capabilities,
    ...project.metadata.keywords,
    ...project.metadata.roles,
    ...(
      content.features ?? []
    ).flatMap(
      (feature) => [
        feature.title,
        feature.description,
        ...(
          feature.bullets ??
          []
        ),
      ]
    ),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <CommandItem
      value={
        searchableValue
      }
      onSelect={onSelect}
      className="group gap-3 py-3"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">
          {content.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>
            {
              categoryLabels[
                locale
              ][project.category]
            }
          </span>

          <span>•</span>

          <span>
            {
              statusLabels[
                locale
              ][project.status]
            }
          </span>

          <span>•</span>

          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" />

            {
              project.metadata
                .updatedAt
            }
          </span>
        </div>
      </div>

      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
    </CommandItem>
  );
}
```

Command Palette 現在可以搜尋：

```text
作品標題
摘要
專案說明
技術
Metadata domain
Capability
Keyword
Role
Feature
Feature bullet
```

例如搜尋：

```text
metadata
Three.js
workflow
React
file preview
Spring Boot
```

都能找到對應作品。

---

# 七、將 Command Palette 加到 Layout

在：

```text
src/app/[locale]/layout.tsx
```

加入：

```tsx
import {
  ProjectCommandPalette,
} from "@/components/command/project-command-palette";

import {
  projects,
} from "@/data/projects";

import {
  normalizePortfolioLocale,
} from "@/lib/projects";
```

取得語言後：

```tsx
const portfolioLocale =
  normalizePortfolioLocale(
    locale
  );
```

在 `MotionProvider` 裡加入：

```tsx
<ProjectCommandPalette
  projects={projects}
  locale={portfolioLocale}
/>
```

Provider 區域調整為：

```tsx
<MotionProvider>
  <ScrollProgress />

  <Header />

  <ProjectCommandPalette
    projects={projects}
    locale={
      portfolioLocale
    }
  />

  {children}
</MotionProvider>
```

---

# 八、把搜尋按鈕加進 Header

在：

```text
src/components/header.tsx
```

加入：

```tsx
import {
  ProjectCommandButton,
} from "@/components/command/project-command-button";
```

在 Header 右側控制區加入：

```tsx
<div className="flex items-center gap-2">
  <ProjectCommandButton />

  <LanguageToggle />

  <ThemeToggle />

  {/* Mobile menu button */}
</div>
```

現在桌面版 Header 會出現搜尋按鈕。

手機版仍然可以之後在 Mobile Menu 裡加入相同按鈕：

```tsx
<button
  type="button"
  onClick={() => {
    window.dispatchEvent(
      new CustomEvent(
        "portfolio:open-command"
      )
    );
  }}
>
  搜尋所有作品
</button>
```

---

# 九、建立作品典藏統計面板

這個區塊會讓作品總覽更像一套真正的「作品資料庫」，而不只是卡片清單。

## `src/components/projects/archive/project-archive-overview.tsx`

```tsx
"use client";

import {
  BarChart3,
  Boxes,
  Code2,
  ImageIcon,
} from "lucide-react";

import {
  m,
} from "motion/react";

import {
  categoryLabels,
} from "@/lib/project-taxonomy";

import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
} from "@/types/projects";

interface ProjectArchiveOverviewProps {
  projects: Project[];
  locale: PortfolioLocale;
}

const categories: ProjectCategory[] =
  [
    "information-system",
    "interactive-3d",
    "ai-data",
    "frontend",
    "backend-desktop",
  ];

export function ProjectArchiveOverview({
  projects,
  locale,
}: ProjectArchiveOverviewProps) {
  const technologies =
    new Set(
      projects.flatMap(
        (project) =>
          project.technologies
      )
    );

  const totalMedia =
    projects.reduce(
      (
        total,
        project
      ) =>
        total +
        project.media.length,
      0
    );

  const activeProjects =
    projects.filter(
      (project) =>
        project.status ===
          "in-progress" ||
        project.status ===
          "prototype"
    ).length;

  const categoryCounts =
    categories.map(
      (category) => ({
        category,

        count:
          projects.filter(
            (project) =>
              project.category ===
              category
          ).length,
      })
    );

  const largestCount =
    Math.max(
      1,
      ...categoryCounts.map(
        (item) =>
          item.count
      )
    );

  const cards = [
    {
      label:
        locale === "en"
          ? "Projects"
          : "作品總數",

      value:
        projects.length,

      icon: Boxes,
    },

    {
      label:
        locale === "en"
          ? "Active builds"
          : "持續開發",

      value:
        activeProjects,

      icon: BarChart3,
    },

    {
      label:
        locale === "en"
          ? "Technologies"
          : "技術類型",

      value:
        technologies.size,

      icon: Code2,
    },

    {
      label:
        locale === "en"
          ? "Media assets"
          : "媒體內容",

      value:
        totalMedia,

      icon: ImageIcon,
    },
  ];

  return (
    <section className="mb-10">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(
          (
            card,
            index
          ) => {
            const Icon =
              card.icon;

            return (
              <m.article
                key={
                  card.label
                }
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    0.08 +
                    index *
                      0.07,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                }}
                className="group rounded-2xl border border-border bg-card p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:rotate-3 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="text-3xl font-bold tracking-tight">
                    {card.value}
                  </span>
                </div>

                <p className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
              </m.article>
            );
          }
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        <div className="mb-6">
          <h2 className="font-bold">
            {locale === "en"
              ? "Project distribution"
              : "作品分類分布"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "en"
              ? "Distribution based on project metadata categories."
              : "依照 Metadata 分類呈現目前作品分布。"}
          </p>
        </div>

        <div className="space-y-4">
          {categoryCounts.map(
            (
              item,
              index
            ) => {
              const percentage =
                item.count === 0
                  ? 0
                  : Math.max(
                      8,
                      (
                        item.count /
                        largestCount
                      ) * 100
                    );

              return (
                <div
                  key={
                    item.category
                  }
                  className="grid items-center gap-3 sm:grid-cols-[12rem_1fr_2rem]"
                >
                  <p className="text-sm font-medium">
                    {
                      categoryLabels[
                        locale
                      ][
                        item.category
                      ]
                    }
                  </p>

                  <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                    <m.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width:
                          `${percentage}%`,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration:
                          0.7,

                        delay:
                          index *
                          0.08,

                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>

                  <span className="text-right text-sm font-bold">
                    {item.count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
```

---

# 十、升級作品卡片：收藏與比較

修改目前：

```text
src/components/projects/archive/project-archive-card.tsx
```

加入 imports：

```tsx
import {
  ArrowUpRight,
  Columns3,
  Eye,
  Heart,
  Layers3,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import {
  useMounted,
} from "@/hooks/use-mounted";
```

在元件開頭加入：

```tsx
const mounted =
  useMounted();

const [
  compareLimitReached,
  setCompareLimitReached,
] = useState(false);

const favoriteSlugs =
  useProjectPreferences(
    (state) =>
      state.favoriteSlugs
  );

const compareSlugs =
  useProjectPreferences(
    (state) =>
      state.compareSlugs
  );

const toggleFavorite =
  useProjectPreferences(
    (state) =>
      state.toggleFavorite
  );

const addToCompare =
  useProjectPreferences(
    (state) =>
      state.addToCompare
  );

const removeFromCompare =
  useProjectPreferences(
    (state) =>
      state.removeFromCompare
  );

const isFavorite =
  mounted &&
  favoriteSlugs.includes(
    project.slug
  );

const isCompared =
  mounted &&
  compareSlugs.includes(
    project.slug
  );

function handleCompare() {
  setCompareLimitReached(false);

  if (isCompared) {
    removeFromCompare(
      project.slug
    );

    return;
  }

  const added =
    addToCompare(
      project.slug
    );

  if (!added) {
    setCompareLimitReached(
      true
    );

    window.setTimeout(
      () => {
        setCompareLimitReached(
          false
        );
      },
      2200
    );
  }
}
```

找到圖片區域原本的：

```tsx
<div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
```

建議替換成：

```tsx
<div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
  <div className="flex flex-col items-start gap-2">
    <span className="rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur">
      {
        categoryLabels[
          locale
        ][project.category]
      }
    </span>

    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
      {
        statusLabels[
          locale
        ][project.status]
      }
    </span>
  </div>

  <div className="flex gap-2">
    <m.button
      type="button"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={() =>
        toggleFavorite(
          project.slug
        )
      }
      aria-label={
        isFavorite
          ? locale === "en"
            ? "Remove favorite"
            : "取消收藏"
          : locale === "en"
            ? "Add favorite"
            : "收藏作品"
      }
      aria-pressed={
        isFavorite
      }
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors ${
        isFavorite
          ? "border-rose-500/40 bg-rose-500 text-white"
          : "border-border bg-background/85 hover:bg-accent"
      }`}
    >
      <Heart
        className={`h-4 w-4 ${
          isFavorite
            ? "fill-current"
            : ""
        }`}
      />
    </m.button>

    <m.button
      type="button"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={
        handleCompare
      }
      aria-label={
        isCompared
          ? locale === "en"
            ? "Remove comparison"
            : "移出比較"
          : locale === "en"
            ? "Add comparison"
            : "加入比較"
      }
      aria-pressed={
        isCompared
      }
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors ${
        isCompared
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background/85 hover:bg-accent"
      }`}
    >
      <Columns3 className="h-4 w-4" />
    </m.button>
  </div>
</div>
```

在卡片內容區的按鈕上方加入限制提示：

```tsx
<AnimatePresence>
  {compareLimitReached && (
    <m.p
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      className="mb-3 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"
    >
      {locale === "en"
        ? "You can compare up to three projects."
        : "最多只能同時比較三個作品。"}
    </m.p>
  )}
</AnimatePresence>
```

確保 imports 中包含：

```tsx
import {
  AnimatePresence,
  m,
  useReducedMotion,
} from "motion/react";
```

---

# 十一、建立浮動比較工具列

## `src/components/projects/compare/project-compare-bar.tsx`

```tsx
"use client";

import {
  ArrowRight,
  Columns3,
  Trash2,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  m,
} from "motion/react";

import {
  useRouter,
} from "@/i18n/navigation";

import {
  useMounted,
} from "@/hooks/use-mounted";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

interface ProjectCompareBarProps {
  projects: Project[];
  locale: PortfolioLocale;
}

export function ProjectCompareBar({
  projects,
  locale,
}: ProjectCompareBarProps) {
  const mounted =
    useMounted();

  const router =
    useRouter();

  const compareSlugs =
    useProjectPreferences(
      (state) =>
        state.compareSlugs
    );

  const removeFromCompare =
    useProjectPreferences(
      (state) =>
        state.removeFromCompare
    );

  const clearCompare =
    useProjectPreferences(
      (state) =>
        state.clearCompare
    );

  if (!mounted) {
    return null;
  }

  const selectedProjects =
    compareSlugs
      .map((slug) =>
        projects.find(
          (project) =>
            project.slug ===
            slug
        )
      )
      .filter(
        (
          project
        ): project is Project =>
          Boolean(project)
      );

  function openComparison() {
    if (
      selectedProjects.length <
      2
    ) {
      return;
    }

    const ids =
      selectedProjects
        .map(
          (project) =>
            project.slug
        )
        .join(",");

    router.push(
      `/projects/compare?ids=${encodeURIComponent(ids)}`
    );
  }

  return (
    <AnimatePresence>
      {selectedProjects.length >
        0 && (
        <m.aside
          initial={{
            opacity: 0,
            y: 90,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 70,
            scale: 0.97,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 26,
          }}
          className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-2xl border border-primary/25 bg-background/90 p-4 shadow-2xl shadow-primary/20 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Columns3 className="h-5 w-5" />
              </span>

              <div>
                <p className="font-bold">
                  {locale === "en"
                    ? "Project comparison"
                    : "作品比較"}
                </p>

                <p className="text-xs text-muted-foreground">
                  {selectedProjects.length}
                  /3
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
              {selectedProjects.map(
                (project) => (
                  <m.div
                    layout
                    key={
                      project.slug
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2"
                  >
                    <span className="max-w-44 truncate text-sm font-medium">
                      {
                        project
                          .content[
                          locale
                        ].title
                      }
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCompare(
                          project.slug
                        )
                      }
                      aria-label={
                        locale === "en"
                          ? "Remove project"
                          : "移除作品"
                      }
                      className="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </m.div>
                )
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={
                  clearCompare
                }
                aria-label={
                  locale === "en"
                    ? "Clear comparison"
                    : "清除比較"
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium hover:bg-accent"
              >
                <Trash2 className="h-4 w-4" />

                <span className="hidden sm:inline">
                  {locale === "en"
                    ? "Clear"
                    : "清除"}
                </span>
              </button>

              <button
                type="button"
                disabled={
                  selectedProjects.length <
                  2
                }
                onClick={
                  openComparison
                }
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45"
              >
                {locale === "en"
                  ? "Compare"
                  : "開始比較"}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
  );
}
```

---

# 十二、把統計與比較加入 Project Explorer

修改：

```text
src/components/projects/archive/project-explorer.tsx
```

新增：

```tsx
import {
  Heart,
} from "lucide-react";

import {
  ProjectArchiveOverview,
} from "./project-archive-overview";

import {
  ProjectCompareBar,
} from "@/components/projects/compare/project-compare-bar";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import {
  useMounted,
} from "@/hooks/use-mounted";
```

在元件開頭加入：

```tsx
const mounted =
  useMounted();

const favoriteSlugs =
  useProjectPreferences(
    (state) =>
      state.favoriteSlugs
  );

const favoritesOnly =
  searchParams.get(
    "favorites"
  ) === "1";
```

在 `filteredProjects` 的 filter 內加入：

```tsx
const matchesFavorites =
  !favoritesOnly ||
  (
    mounted &&
    favoriteSlugs.includes(
      project.slug
    )
  );
```

最後的 return 條件加入：

```tsx
return (
  matchesCategory &&
  matchesStatus &&
  matchesTechnology &&
  matchesSearch &&
  matchesFavorites
);
```

`useMemo` dependency 補上：

```tsx
favoriteSlugs,
favoritesOnly,
mounted,
```

在 `activeFilterCount` 加上：

```tsx
Number(favoritesOnly)
```

完整：

```tsx
const activeFilterCount =
  Number(Boolean(query)) +
  Number(Boolean(category)) +
  Number(Boolean(status)) +
  technologies.length +
  Number(favoritesOnly);
```

在 Header 下方、主要篩選器之前加入：

```tsx
<ProjectArchiveOverview
  projects={projects}
  locale={locale}
/>
```

在工具列按鈕區加入收藏按鈕：

```tsx
<button
  type="button"
  onClick={() =>
    setSingleParam(
      "favorites",
      favoritesOnly
        ? undefined
        : "1"
    )
  }
  aria-pressed={
    favoritesOnly
  }
  className={`inline-flex h-12 items-center gap-2 rounded-xl border px-4 font-medium transition-colors ${
    favoritesOnly
      ? "border-rose-500 bg-rose-500 text-white"
      : "border-border hover:bg-accent"
  }`}
>
  <Heart
    className={`h-4 w-4 ${
      favoritesOnly
        ? "fill-current"
        : ""
    }`}
  />

  {locale === "en"
    ? "Favorites"
    : "收藏"}

  {mounted &&
    favoriteSlugs.length >
      0 && (
      <span className="rounded-full bg-background/20 px-2 py-0.5 text-xs">
        {
          favoriteSlugs.length
        }
      </span>
    )}
</button>
```

在元件最外層结尾、`ProjectPreviewDialog` 後面加入：

```tsx
<ProjectCompareBar
  projects={projects}
  locale={locale}
/>
```

結尾大致變成：

```tsx
<ProjectPreviewDialog
  project={selectedProject}
  locale={locale}
  onClose={() =>
    setSelectedProject(
      null
    )
  }
/>

<ProjectCompareBar
  projects={projects}
  locale={locale}
/>
```

---

# 十三、補充作品查詢函數

在：

```text
src/lib/projects.ts
```

加入：

```ts
export function getProjectsBySlugs(
  slugs: string[]
): Project[] {
  return slugs
    .map((slug) =>
      getProjectBySlug(slug)
    )
    .filter(
      (
        project
      ): project is Project =>
        Boolean(project)
    );
}
```

---

# 十四、建立作品比較頁

## `src/app/[locale]/projects/compare/page.tsx`

```tsx
import type {
  Metadata,
} from "next";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Columns3,
  Minus,
} from "lucide-react";

import {
  Link,
} from "@/i18n/navigation";

import {
  Reveal,
} from "@/components/motion/reveal";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";

import {
  getProjectsBySlugs,
  normalizePortfolioLocale,
} from "@/lib/projects";

import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

export const metadata: Metadata = {
  title:
    "Compare Projects | Justin",

  description:
    "Compare project technologies, features, metadata, and development outcomes.",
};

interface CompareProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;

  searchParams: Promise<{
    ids?:
      | string
      | string[];
  }>;
}

export default async function CompareProjectsPage({
  params,
  searchParams,
}: CompareProjectsPageProps) {
  const {
    locale: localeParam,
  } = await params;

  const query =
    await searchParams;

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  const rawIds =
    Array.isArray(query.ids)
      ? query.ids[0]
      : query.ids;

  const slugs =
    rawIds
      ?.split(",")
      .map((slug) =>
        slug.trim()
      )
      .filter(Boolean)
      .slice(0, 3) ?? [];

  const projects =
    getProjectsBySlugs(
      slugs
    );

  const text =
    locale === "en"
      ? {
          eyebrow:
            "Project Comparison",

          title:
            "Compare projects side by side",

          description:
            "Review technologies, features, platforms, domains, responsibilities, and project status.",

          back:
            "Back to archive",

          insufficient:
            "Select at least two projects to start a comparison.",

          browse:
            "Browse projects",

          status:
            "Status",

          category:
            "Category",

          year:
            "Year",

          platforms:
            "Platforms",

          technologies:
            "Technologies",

          domains:
            "Domains",

          capabilities:
            "Capabilities",

          roles:
            "Responsibilities",

          features:
            "Features",

          challenges:
            "Engineering challenges",

          updated:
            "Last updated",

          open:
            "Open case study",
        }
      : {
          eyebrow:
            "Project Comparison",

          title:
            "並排比較不同作品",

          description:
            "比較技術、功能、平台、領域、負責內容與目前完成狀態。",

          back:
            "返回作品典藏庫",

          insufficient:
            "請至少選擇兩個作品才能進行比較。",

          browse:
            "瀏覽所有作品",

          status:
            "完成狀態",

          category:
            "作品分類",

          year:
            "年份",

          platforms:
            "執行平台",

          technologies:
            "使用技術",

          domains:
            "應用領域",

          capabilities:
            "系統能力",

          roles:
            "負責項目",

          features:
            "核心功能",

          challenges:
            "技術挑戰",

          updated:
            "最後更新",

          open:
            "開啟完整案例",
        };

  if (projects.length < 2) {
    return (
      <main className="min-h-screen px-4 pb-24 pt-32">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <Columns3 className="mx-auto mb-6 h-12 w-12 text-muted-foreground" />

            <h1 className="text-2xl font-bold">
              {
                text.insufficient
              }
            </h1>

            <Link
              href="/projects/all"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              {text.browse}

              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="section-shell">
        <Reveal>
          <Link
            href="/projects/all"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />

            {text.back}
          </Link>
        </Reveal>

        <header className="mb-12 max-w-4xl">
          <Reveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {text.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {text.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {
                text.description
              }
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.18}>
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[70rem] border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 w-52 border-b border-r border-border bg-card p-5 text-left">
                    Comparison
                  </th>

                  {projects.map(
                    (project) => (
                      <th
                        key={
                          project.slug
                        }
                        className="min-w-72 border-b border-r border-border p-6 text-left last:border-r-0"
                      >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                          {
                            project.year
                          }
                        </p>

                        <h2 className="text-xl font-bold">
                          {
                            project
                              .content[
                              locale
                            ].title
                          }
                        </h2>

                        <p className="mt-3 line-clamp-3 text-sm font-normal leading-6 text-muted-foreground">
                          {
                            project
                              .content[
                              locale
                            ].summary
                          }
                        </p>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
                        >
                          {text.open}

                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                <ComparisonRow
                  label={
                    text.status
                  }
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    statusLabels[
                      locale
                    ][
                      project.status
                    ]
                  }
                />

                <ComparisonRow
                  label={
                    text.category
                  }
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    categoryLabels[
                      locale
                    ][
                      project.category
                    ]
                  }
                />

                <ComparisonRow
                  label={text.year}
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    String(
                      project.year
                    )
                  }
                />

                <ComparisonRow
                  label={
                    text.updated
                  }
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    project
                      .metadata
                      .updatedAt
                  }
                />

                <ComparisonTagRow
                  label={
                    text.platforms
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .platforms
                  }
                />

                <ComparisonTagRow
                  label={
                    text.technologies
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .technologies
                  }
                />

                <ComparisonTagRow
                  label={
                    text.domains
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .domains
                  }
                />

                <ComparisonTagRow
                  label={
                    text.capabilities
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .capabilities
                  }
                />

                <ComparisonTagRow
                  label={
                    text.roles
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .roles
                  }
                />

                <ComparisonListRow
                  label={
                    text.features
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    (
                      project
                        .content[
                        locale
                      ].features ??
                      []
                    ).map(
                      (
                        feature
                      ) =>
                        feature.title
                    )
                  }
                />

                <ComparisonListRow
                  label={
                    text.challenges
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .content[
                      locale
                    ].challenges
                  }
                />
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

interface ComparisonRowProps {
  label: string;
  projects: Project[];
  render: (
    project: Project
  ) => string;
}

function ComparisonRow({
  label,
  projects,
  render,
}: ComparisonRowProps) {
  return (
    <tr>
      <ComparisonLabel>
        {label}
      </ComparisonLabel>

      {projects.map(
        (project) => (
          <td
            key={
              project.slug
            }
            className="border-b border-r border-border p-5 align-top last:border-r-0"
          >
            <span className="font-medium">
              {render(project)}
            </span>
          </td>
        )
      )}
    </tr>
  );
}

interface ComparisonTagRowProps {
  label: string;
  projects: Project[];
  getValues: (
    project: Project
  ) => string[];
}

function ComparisonTagRow({
  label,
  projects,
  getValues,
}: ComparisonTagRowProps) {
  return (
    <tr>
      <ComparisonLabel>
        {label}
      </ComparisonLabel>

      {projects.map(
        (project) => {
          const values =
            getValues(project);

          return (
            <td
              key={
                project.slug
              }
              className="border-b border-r border-border p-5 align-top last:border-r-0"
            >
              {values.length >
              0 ? (
                <div className="flex flex-wrap gap-2">
                  {values.map(
                    (value) => (
                      <span
                        key={
                          value
                        }
                        className="rounded-md bg-secondary px-2 py-1 text-xs"
                      >
                        {value}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <Minus className="h-4 w-4 text-muted-foreground" />
              )}
            </td>
          );
        }
      )}
    </tr>
  );
}

interface ComparisonListRowProps {
  label: string;
  projects: Project[];
  getValues: (
    project: Project
  ) => string[];
}

function ComparisonListRow({
  label,
  projects,
  getValues,
}: ComparisonListRowProps) {
  return (
    <tr>
      <ComparisonLabel>
        {label}
      </ComparisonLabel>

      {projects.map(
        (project) => {
          const values =
            getValues(project);

          return (
            <td
              key={
                project.slug
              }
              className="border-b border-r border-border p-5 align-top last:border-r-0"
            >
              {values.length >
              0 ? (
                <ul className="space-y-3">
                  {values.map(
                    (value) => (
                      <li
                        key={
                          value
                        }
                        className="flex gap-2 text-sm leading-6 text-muted-foreground"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />

                        {value}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <Minus className="h-4 w-4 text-muted-foreground" />
              )}
            </td>
          );
        }
      )}
    </tr>
  );
}

function ComparisonLabel({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <th className="sticky left-0 z-10 border-b border-r border-border bg-card p-5 text-left align-top text-sm font-bold">
      {children}
    </th>
  );
}
```

Next.js App Router 的 `searchParams` 可以作為頁面屬性讀取網址中的比較清單，而 Client Component 的篩選器則可使用 `useSearchParams` 與 `useRouter` 同步 URL 狀態。([Next.js](https://nextjs.org/docs/app/api-reference/functions/use-router?utm_source=chatgpt.com))

---

# 十五、補上行動版 Command 按鈕

在 Mobile Menu 的最上方加入：

```tsx
<button
  type="button"
  onClick={() => {
    onClose();

    window.setTimeout(
      () => {
        window.dispatchEvent(
          new CustomEvent(
            "portfolio:open-command"
          )
        );
      },
      150
    );
  }}
  className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left"
>
  <Search className="h-5 w-5 text-primary" />

  <div>
    <p className="font-medium">
      {locale === "en"
        ? "Search projects"
        : "搜尋所有作品"}
    </p>

    <p className="text-xs text-muted-foreground">
      {locale === "en"
        ? "Search metadata, features, and technologies"
        : "搜尋 Metadata、功能與技術"}
    </p>
  </div>
</button>
```

確認有匯入：

```tsx
import {
  Search,
} from "lucide-react";
```

---

# 十六、加入收藏入口至作品 Mega Menu

Header 的作品選單加入：

```ts
{
  href:
    "/projects/all?favorites=1",

  label:
    locale === "en"
      ? "Favorite Projects"
      : "收藏作品",

  icon: Heart,

  description:
    locale === "en"
      ? "Projects saved in this browser"
      : "查看目前瀏覽器收藏的作品",
},
```

加入 icon：

```tsx
import {
  Heart,
} from "lucide-react";
```

---

# 十七、完整測試流程

清除快取：

```bash
rm -rf .next
```

執行型別檢查：

```bash
npx tsc --noEmit
```

執行 Lint：

```bash
npm run lint
```

執行正式建置：

```bash
npm run build
```

啟動：

```bash
npm run dev
```

測試網址：

```text
http://localhost:3000/zh-TW

http://localhost:3000/zh-TW/projects/all

http://localhost:3000/zh-TW/projects/all?favorites=1

http://localhost:3000/zh-TW/projects/compare?ids=digital-archive-management-system,ai-knowledge-workspace

http://localhost:3000/en/projects/all
```

確認以下功能：

```text
Ctrl + K 可以開啟作品搜尋
Cmd + K 可以開啟作品搜尋
Header 按鈕可開啟搜尋
Mobile Menu 可開啟搜尋
可依照 Feature 與 Metadata 找到作品
收藏後重新整理仍保留
可以只顯示收藏作品
最多加入三個比較作品
比較工具列會從底部滑入
移除作品時具有離場動畫
兩個以上作品可進入比較頁
比較頁可比較技術與 Metadata
頁面切換具有淡入與模糊消失效果
Reduced Motion 設定仍被尊重
```

---

# 這一階段完成後的網站能力

你的作品區現在不再是普通的：

```text
作品卡片列表
```

而會成為：

```text
Project Command Center
├── 全站 Command Palette
├── Metadata 全文檢索
├── Faceted Filtering
├── 收藏系統
├── 比較系統
├── Grid / List View
├── Quick Preview
├── 完整 Case Study
├── 影片與截圖
├── Project Statistics
└── Related Projects
```

下一階段會處理 **Case Study 閱讀體驗 V2**：全螢幕 Screenshot Lightbox、影片章節、右側文章目錄、捲動章節高亮、Feature 展開動畫、Before／After 對照、架構圖區、程式碼片段與設計決策紀錄。

---

**Sources:**

- [File-system conventions: template.js](https://nextjs.org/docs/app/api-reference/file-conventions/template?utm_source=chatgpt.com)
- [Layout Animation | React FLIP & Shared Element | Motion React](https://motion.dev/docs/react-layout-animations?utm_source=chatgpt.com)
- [Command - shadcn/ui](https://ui.shadcn.com/docs/components/base/command?utm_source=chatgpt.com)

## Response:
6/19/2026, 11:23:59 PM

> **Remembering**
>
> Reviewing portfolio goals
>
> **Remembering**
>
> Tracking software projects
>
> **Remembering**
>
> Defining architecture choices
>
> **Remembering**
>
> Prioritizing tech stack preferences
>
> **Creating a prompt for project analysis**
>
> We need to draft a detailed prompt for LLMProvider Tooling to audit the entire project portfolio. It should start by scanning the project repo and sibling folders, mapping metadata, and tracking statuses. Rather than dumping everything into a single file, it should create an organized ingestion pipeline and avoid hallucinations. There’s also the possibility of adding codegen scripts and mapping performance/search architecture. No citation needed because we’re not using web sources, just personal context.
>
> **Choosing the right search tool for the user's project filtering**
>
> For Chinese search, MiniSearch doesn’t handle tokenization well, so a custom tokenizer or Fuse.js might be better. For larger datasets, FlexSearch is ideal. I should suggest using these depending on installed packages and explain them. Goals: For under 100 projects, use a small build-time index with FlexSearch/Fuse.js. Focus on rich filtering with exact faceted filters
>
> **Creating user prompt for LLMProvider Tooling**
>
> The user wants to know what information to tell LLMProvider Tooling, so I'll provide a list, such as the path to their main project repo, project roots, GitHub username, media policy, and whether private data can be accessed. The user also requests an optional deployment target and contact links.
> 
> I'll also remind them about the possibility of automatic screenshot capture with Playwright and note that for project demos, it’s important to not alter global dependencies. For safety, only safe, read-only commands should be run.
>
> Thought for 55s

可以。這次要給 LLMProvider Tooling 的不是普通「請幫我新增作品頁」提示，而是一份能讓它：

1. 先讀懂目前作品集網站。
2. 掃描你電腦上的所有專案。
3. 從程式碼、README、Git、資產與依賴分析真實內容。
4. 產生結構化 Metadata。
5. 自動同步到作品集網站。
6. 建立像圖書館館藏目錄一樣的進階檢索系統。
7. 加入截圖、影片、GitHub、Demo、文件與完整 Case Study。
8. 維持搜尋效能、網站效能與漂亮的 Motion 動畫。

---

# 一、貼給 LLMProvider Tooling 前，先補上這些資訊

先把下面內容貼在 Prompt 最前面，並將路徑換成你電腦上的真實位置。

```text
【本機環境資訊】

作業系統：Linux
主要編輯器：VS Code
Node.js 版本：請自行透過 node --version 檢查
套件管理器：請先依 lockfile 判斷 npm、pnpm 或 yarn，不要擅自更換
目前作品集專案路徑：
/請替換成你的路徑/justin-portfolio

需要掃描的專案根目錄：
1. /請替換成你的路徑/web-projects
2. /請替換成你的路徑/java-projects
3. /請替換成你的路徑/unity-projects
4. /請替換成你的路徑/dotnet-projects
5. /請替換成你的路徑/python-projects

GitHub 使用者名稱：
請填寫你的 GitHub username

允許公開顯示的 Email：
請填寫公開用 Email，若尚未決定則先不要寫入網站

履歷檔案：
/請替換成履歷路徑/Justin-Resume.pdf

網站預計部署平台：
Vercel

網站預設語言：
繁體中文 zh-TW

第二語言：
英文 en
```

如果你的專案全部集中在同一個資料夾，只要提供一個根目錄即可。

---

# 二、完整 LLMProvider Tooling Master Prompt

下面整段可以直接貼給 LLMProvider Tooling。

```text
你現在是一位資深 Next.js 架構師、React / TypeScript 前端工程師、資訊檢索系統工程師、數位典藏與 Metadata 系統設計師、搜尋效能工程師、UI/UX 設計師，以及能夠直接分析大型本機程式碼庫的 Coding Agent。

你將協助我繼續完成一個已經有相當進度的個人作品集網站。

這個網站不是普通的靜態作品卡片網站，而是一個結合以下概念的「個人技術作品典藏與檢索平台」：

- 個人求職作品集
- 數位典藏系統
- 圖書館館藏目錄
- Metadata-driven Project Archive
- 全文搜尋與 Faceted Search
- 專案 Case Study
- 技術能力證據庫
- 學習歷程與開發紀錄
- 互動式與動畫化的個人品牌網站

網站主要提供給面試官、工程師、招募人員及可能的合作對象瀏覽。

我的背景包含圖書資訊學、數位典藏、Metadata、資訊檢索、知識管理、前端 Web、3D Web、遊戲互動、資料視覺化，以及正在延伸學習的 Java / Spring Boot、C# / .NET 和桌面應用程式。

請不要把網站改成普通的套版作品集。

網站必須明確展現我的差異化：

1. React、Next.js、TypeScript 前端能力
2. Three.js、React Three Fiber、Phaser 與互動式 3D Web
3. 數位典藏、Metadata、分類、檢索與資訊架構
4. 複雜資訊系統與工作流程設計
5. AI、知識管理與資料視覺化
6. Java / Spring Boot 後端學習與專案
7. C# / .NET 跨平台桌面應用發展方向
8. 實際專案架構、解決問題能力和技術決策

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
一、重要工作原則
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

你必須先分析現有程式碼，再進行修改。

不要假設之前對話中規劃的功能都已經完成。請以目前檔案系統中的實際程式碼為唯一依據。

你必須：

1. 先完整檢查作品集專案目前的檔案結構。
2. 讀取 package.json、lockfile、tsconfig、next.config、Tailwind 設定及主要元件。
3. 確認目前使用的 Next.js、React、TypeScript、next-intl、next-themes、Motion、Zustand 和 shadcn/ui 版本。
4. 確認哪些功能已完成、部分完成、只有空頁面、存在錯誤或根本尚未實作。
5. 不可因為此 Prompt 提到某個檔案，就直接假設該檔案存在。
6. 優先延續現有架構，不要無理由重新建立整個專案。
7. 不可刪除或破壞目前正常運作的功能。
8. 不可使用假專案、假 GitHub 網址、假 Demo、假成效數字或虛構技術。
9. 不可把規劃中的專案標示為已完成。
10. 不可把尚未成熟的技能寫成精通。
11. 不要讀取、輸出或提交 .env、API Key、Token、密碼或私人資料。
12. 不要把本機絕對路徑輸出到公開網站。
13. 不要掃描 node_modules、.next、dist、build、Library、Temp、Logs、bin、obj、.git objects 或其他大型生成目錄。
14. 所有自動分析結果都必須保留「來源證據」與「信心程度」。
15. 無法確認的資訊必須標記 needsReview，而不是自行猜測。
16. 在實作期間持續執行 TypeScript、Lint 和 Build 檢查。
17. 每個階段都先修正錯誤，再繼續下一階段。
18. 除非遇到真正缺少路徑、權限或必要祕密，否則不要只停在分析報告，要繼續完成實作。

所有程式碼：

- 檔名、變數、函式、類別、型別與註解使用英文。
- 對我的說明使用繁體中文。
- 避免 any。
- 避免單一超大型元件。
- 保持 Server Component 和 Client Component 的合理邊界。
- 優先使用資料驅動設計。
- 保持元件可測試、可維護、可擴充。
- 尊重 prefers-reduced-motion。
- 保持完整 RWD、鍵盤操作與無障礙支援。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二、目前作品集的預期技術方向
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

目前作品集預期使用以下技術，但請先檢查實際版本和現況：

- Next.js 16 App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-intl
- next-themes
- Motion for React，優先使用 motion/react
- Zustand
- React Hook Form
- Zod
- Lucide React
- Next Image
- 動態路由
- generateStaticParams
- generateMetadata
- URL Search Params
- Server Components
- Client Components

可能已經完成或規劃中的功能包括：

- 中英文切換
- 深色與淺色主題
- Header Mega Menu
- Mobile Menu
- Hero 動畫
- Scroll Reveal
- Project Archive
- Metadata 篩選
- Grid / List View
- Project Quick Preview
- Project Detail Page
- Demo 影片
- Screenshot Gallery
- Command Palette
- 收藏功能
- 專案比較
- Related Projects
- Motion Layout Animation

請逐項檢查，不要重複建立功能相同但命名不同的元件。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
三、第一階段：完整稽核作品集網站
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

請先對作品集專案進行完整稽核。

至少檢查：

- package.json
- lockfile
- src/app
- src/components
- src/data
- src/lib
- src/types
- src/stores
- src/hooks
- messages
- public
- scripts
- next.config
- tsconfig
- eslint
- Tailwind 或 PostCSS 設定

建立以下文件：

docs/portfolio-audit.md
docs/current-architecture.md
docs/project-catalog-plan.md
docs/implementation-progress.md

portfolio-audit.md 必須記錄：

1. 目前技術棧與實際版本
2. 已完成頁面
3. 已完成元件
4. 已完成動畫
5. 已完成搜尋功能
6. 尚未完成項目
7. 重複元件或重複邏輯
8. 可能的 TypeScript 問題
9. 可能的 Next.js 16 API 問題
10. 效能問題
11. 無障礙問題
12. SEO 問題
13. 目前 Project Metadata 架構
14. 是否仍存在假專案資料
15. 是否存在失效連結或缺少媒體資產
16. 建議保留、重構和移除的部分

完成稽核後，不要停止，繼續執行後續工作。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
四、第二階段：掃描所有本機專案
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

請掃描我提供的所有專案根目錄。

掃描時必須忽略：

- node_modules
- .next
- dist
- build
- coverage
- .cache
- Library
- Temp
- Logs
- UserSettings
- obj
- bin
- target
- vendor
- .venv
- __pycache__
- 大型模型檔
- 資料集
- Git object
- .env
- credentials
- secrets

每個候選專案至少分析：

- 專案資料夾名稱
- README
- package.json
- pom.xml
- build.gradle
- .csproj
- .sln
- pyproject.toml
- requirements.txt
- Cargo.toml
- Unity ProjectSettings
- Vite 設定
- Next.js 設定
- 原始碼目錄
- 主要路由
- 主要元件
- 主要系統模組
- Git remote
- Git branch
- Git log
- 最後修改日期
- 程式語言
- Framework
- Library
- Database
- Testing tools
- Build tools
- Deployment configuration
- 現有圖片
- 現有影片
- Demo GIF
- 文件
- 架構圖

請辨認專案，而不是把每個小練習資料夾都當作獨立大型作品。

遇到 Monorepo 時，請辨認：

- Workspace 根目錄
- Apps
- Packages
- 每個可獨立展示的產品
- 共用套件

請建立：

docs/project-inventory.md
data/generated/project-scan-report.json

project-inventory.md 必須包含表格：

- Project name
- Local folder
- Detected stack
- Detected status
- Last update
- Git remote
- Has README
- Has screenshots
- Has demo video
- Can build
- Can run
- Portfolio suitability
- Confidence
- Needs manual review

请把專案分成：

1. Portfolio Ready
2. Needs Content
3. Prototype
4. In Progress
5. Planned
6. Learning Exercise
7. Duplicate or Archived
8. Not Suitable for Public Portfolio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
五、已知候選專案名稱
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

以下是可能存在的專案或曾規劃過的專案名稱，僅作為搜尋線索，不代表一定存在或已完成：

- Digital Archive Management System
- 個人數位檔案管理與典藏系統
- AI Knowledge Workspace
- Prism Runner 3D
- Dream Archive Runner
- Signal Diver 3D
- The Archive That Watches You
- Campus Quest 3D
- Lost Campus Unity
- Unity Campus Quest
- Digital Archive Review Board
- Document Approval Workflow
- Library Seat & Equipment Reservation System
- 3D Asset Command Center
- Game Level & Quest Editor
- LibraDesk
- Library Information Management System
- ProjectMind API
- DataLab Studio
- ModelOps Dashboard
- Data Narrative Studio
- Highway Adventure 3D
- Aqua Rush
- Coffee Shop Management System
- Library Information System

你必須從實際檔案確認：

- 是否真的存在
- 實際名稱
- 實際技術
- 實際完成程度
- 是否只是概念
- 是否適合公開

不可僅依照這份名稱清單生成作品。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
六、第三階段：建立自動化 Project Catalog Pipeline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

不要把所有作品資料手動塞進單一 projects.ts。

請建立可長期維護的專案同步系統。

建議結構可依現況調整，但應達成相同目的：

scripts/
└── catalog/
    ├── scan-projects.ts
    ├── analyze-project.ts
    ├── extract-git-metadata.ts
    ├── detect-technologies.ts
    ├── detect-features.ts
    ├── collect-media.ts
    ├── build-search-index.ts
    ├── validate-catalog.ts
    └── sync-catalog.ts

content/
└── projects/
    └── [slug]/
        ├── project.override.json
        ├── zh-TW.mdx
        └── en.mdx

src/
├── generated/
│   ├── project-catalog.json
│   ├── project-taxonomy.json
│   └── project-search-index.json
├── lib/
│   └── catalog/
│       ├── schema.ts
│       ├── normalize.ts
│       ├── merge-project-data.ts
│       ├── search.ts
│       └── facets.ts
└── types/
    └── project-catalog.ts

public/
└── portfolio/
    └── projects/
        └── [slug]/
            ├── cover.webp
            ├── screenshots/
            ├── demo/
            └── diagrams/

每個專案的最終資料應由三個來源合併：

1. 自動偵測資料
2. 人工 Override
3. 人工撰寫的中英文 Case Study

優先順序：

人工 Override
> 人工 Case Study
> 自動偵測結果

自動掃描不可覆蓋人工修正內容。

請新增 npm scripts，名稱可依實際套件管理器調整：

catalog:scan
catalog:validate
catalog:media
catalog:index
catalog:sync
catalog:watch

理想行為：

- catalog:scan：掃描所有本機專案
- catalog:validate：驗證 Metadata
- catalog:media：整理和複製媒體
- catalog:index：建立全文搜尋索引
- catalog:sync：完整執行全部流程
- catalog:watch：開發時監控 Metadata 或 Override 變化

不要讓每次 npm run dev 都重新掃描所有大型專案。

正式 build 前至少執行 catalog:validate。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
七、Metadata Schema
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

使用 Zod 建立嚴格 Metadata Schema。

每個作品至少支援以下欄位。

基礎識別：

- id
- catalogNumber
- slug
- visibility
- featured
- locale availability
- title zh-TW
- title en
- subtitle
- tagline
- aliases

分類資訊：

- primaryCategory
- secondaryCategories
- projectType
- domains
- subjects
- controlledTerms
- keywords
- audiences
- contentTypes
- dataTypes
- platforms
- operatingSystems

開發狀態：

- status
- completionPercentage
- startedAt
- updatedAt
- completedAt
- version
- releaseStage
- archived

技術：

- languages
- frameworks
- libraries
- stateManagement
- styling
- database
- backend
- desktop
- gameEngine
- threeD
- testing
- buildTools
- infrastructure
- deployment
- developmentTools

個人貢獻：

- role
- responsibilities
- teamSize
- collaborationType
- myContribution
- duration
- learningGoals
- skillsDemonstrated

內容：

- summary
- description
- problem
- targetUsers
- solution
- features
- highlights
- engineeringChallenges
- architecture
- technicalDecisions
- tradeoffs
- outcomes
- limitations
- nextSteps
- lessonsLearned

品質：

- hasUnitTests
- hasIntegrationTests
- hasE2ETests
- accessibilityNotes
- performanceNotes
- Lighthouse scores
- responsive
- browserSupport
- codeQualityTools

連結：

- repositoryUrl
- repositoryVisibility
- liveDemoUrl
- documentationUrl
- videoUrl
- downloadUrl
- articleUrl
- externalLinks

媒體：

- coverImage
- screenshots
- demoVideos
- posters
- gifs
- architectureDiagrams
- thumbnails
- altText
- captions
- featuredMedia

關聯：

- relatedProjects
- parentProject
- subprojects
- successorProjects
- usesPackages
- inspiredBy
- dependencies

資料可信度：

- extractionConfidence
- needsReview
- missingFields
- evidenceSources
- lastScannedAt

catalogNumber 請建立穩定、可讀的格式，例如：

PF-2026-IS-001
PF-2026-3D-001
PF-2026-AI-001
PF-2026-FE-001
PF-2026-BE-001

分類代碼不可因排序改變而重新編號。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
八、Metadata Controlled Vocabulary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

為避免同一技術出現多種寫法，建立 controlled vocabulary。

例如：

React.js
ReactJS
react

全部正規化成：

React

React Three Fiber
R3F
@react-three/fiber

展示名稱統一為：

React Three Fiber

同樣處理：

- Next.js
- TypeScript
- JavaScript
- Tailwind CSS
- Zustand
- Three.js
- React Three Fiber
- Phaser
- Unity
- Java
- Spring Boot
- C#
- .NET
- Avalonia
- Python
- FastAPI
- PostgreSQL
- MySQL
- SQLite
- Plotly
- Docker
- GitHub Actions

請區分：

- 技術顯示名稱
- 穩定 ID
- 別名
- 技術分類
- 圖示
- 搜尋關鍵詞

例如：

{
  "id": "react-three-fiber",
  "label": "React Three Fiber",
  "aliases": ["R3F", "@react-three/fiber"],
  "group": "3d-web"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
九、分析功能時不得憑空猜測
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

請從以下證據辨認功能：

- README 描述
- Route 名稱
- Component 名稱
- Page 名稱
- Type 定義
- Store
- API route
- Service
- Controller
- Entity
- Database migration
- Test
- Assets
- UI text
- Commit message

例如只有看到 Zustand dependency，不代表專案一定有複雜狀態管理。

只有在實際來源中找到使用紀錄，才可以將它加入 skillsDemonstrated。

不要自行生成不存在的：

- 使用者人數
- 效能提升百分比
- 錯誤率下降
- 商業成果
- Lighthouse 分數
- 測試覆蓋率
- 團隊人數
- 部署環境

無法計算就不顯示。

每個重要欄位保留 evidenceSources，例如：

[
  "package.json",
  "src/stores/workspace-store.ts",
  "README.md",
  "git log"
]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十、媒體資產整理
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

請掃描專案中現有的：

- screenshots
- docs images
- public images
- README images
- demo videos
- GIF
- architecture diagrams
- recordings

不要修改原專案中的媒體。

將適合公開的媒體複製到作品集：

public/portfolio/projects/[slug]/

使用統一命名：

cover.webp
screenshots/01-dashboard.webp
screenshots/02-editor.webp
demo/overview.mp4
demo/poster.webp
diagrams/architecture.webp

請：

1. 優先使用真實畫面。
2. 不要生成看起來像真實產品的假截圖。
3. 沒有截圖時顯示誠實的 Media Pending 狀態。
4. 不要用無關的網路圖片冒充作品。
5. 自動產生合理 alt text 草稿，但標記 needsReview。
6. 圖片優先轉成 WebP 或 AVIF。
7. 保留適當畫質。
8. 不要重複複製相同檔案。
9. 大型影片不可直接全部預載。
10. 影片使用 preload="metadata"。
11. 影片必須有 poster。
12. 不要自動播放有聲影片。
13. Demo 影片優先控制在 30 至 90 秒。
14. 使用 Next Image。
15. 首屏以外的媒體必須 lazy load。

若某個 Web 專案可以正常啟動，可建立安全的自動截圖流程：

- 依 lockfile 使用正確套件管理器
- 不擅自升級 dependency
- 啟動現有 dev server
- 使用 Playwright 擷取主要頁面
- 不修改原專案功能
- 擷取完成後正常關閉 server
- 失敗時記錄原因，不要卡死整個 catalog sync

請建立：

docs/media-review.md

列出：

- 已取得媒體
- 缺少封面
- 缺少 Screenshot
- 缺少 Demo
- 需要人工補拍的畫面
- 建議 Demo 影片內容

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十一、作品總覽要像圖書館檢索系統
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

作品總覽頁不應只是分類按鈕。

請建立完整 Faceted Search。

Desktop：

- 左側 Facet Sidebar
- 右側結果區
- 頂部搜尋列
- 結果數量
- 排序
- Grid / List / Catalog Record View
- Active Filter Chips
- Clear All
- Shareable URL

Mobile：

- 頂部搜尋
- Filter 按鈕
- Bottom Sheet 或 Drawer
- 可查看目前啟用的篩選數量
- 可單獨清除每個條件
- 操作後保持捲動位置

Facets 至少包含：

1. Project Category
2. Status
3. Year
4. Updated Date
5. Technology
6. Programming Language
7. Framework
8. Platform
9. Domain
10. Capability
11. Role
12. Project Type
13. Content Type
14. Data Type
15. Audience
16. Has Demo
17. Has Video
18. Has Screenshots
19. Has GitHub
20. Has Live Demo
21. Has Documentation
22. Featured
23. Favorite
24. Completed / In Progress / Prototype / Planned

Checkbox 必須：

- 顯示 facet count
- 支援多選
- 有清楚 checked 狀態
- 可鍵盤操作
- 有 label
- 有 focus state
- 沒有結果的 facet 可 disabled 或隱藏
- 顯示套用後預期數量時不可造成明顯卡頓

時間篩選至少包含：

- 起始年份
- 結束年份
- 最近更新日期
- 開發期間
- 本月更新
- 最近三個月
- 最近一年

可使用：

- Year Range
- Date Inputs
- Preset Buttons

所有篩選必須同步到 URL。

例如：

/zh-TW/projects/all?q=metadata
&category=information-system
&technology=react
&technology=typescript
&status=in-progress
&from=2025
&to=2026
&has=demo
&view=catalog
&sort=updated-desc

重新整理頁面後，篩選狀態必須保留。

網址可直接分享給面試官。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十二、全文搜尋
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

搜尋範圍至少包含：

- title
- aliases
- summary
- description
- tagline
- features
- highlights
- technologies
- languages
- frameworks
- domains
- subjects
- controlledTerms
- keywords
- capabilities
- roles
- responsibilities
- challenges
- lessons
- audiences
- dataTypes
- catalogNumber

搜尋必須支援：

- 繁體中文
- 英文
- 不區分大小寫
- 常見別名
- 技術縮寫
- 部分字串
- 基本模糊搜尋
- 技術名稱正規化

請依專案數量選擇合理方案。

作品少於約 100 筆時，不要引入大型搜尋後端。

優先建立：

- Build-time Search Index
- Client-side Search
- 預先正規化欄位
- 輕量 fuzzy matching
- Facet Filtering

可以評估現有 dependency 後，在 Fuse.js、MiniSearch 或 FlexSearch 中選擇最適合的方案。

不要同時安裝三套搜尋 Library。

請在 docs/search-architecture.md 說明選擇原因。

進階搜尋可以支援簡單欄位語法：

tech:React
framework:Next.js
status:in-progress
year:2026
domain:archive
has:demo
has:github
role:frontend
"node editor"

可再支援：

AND
OR
NOT
-term

但不要為了展示而建立無法維護的完整查詢語言。

請先實作穩定、可測試的 parser。

搜尋輸入要有：

- debounce 或 useDeferredValue
- useTransition
- Clear button
- Keyboard shortcut
- Search suggestions
- Recent searches
- No result suggestions
- Search result count
- Query syntax help

搜尋結果排序可考慮：

1. Exact title
2. Alias
3. Featured
4. Keyword
5. Technology
6. Summary
7. Description
8. Last updated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十三、Catalog Record View
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

除 Grid 和 List 外，增加一個像圖書館館藏紀錄的 Catalog Record View。

每筆紀錄可顯示：

- Catalog Number
- Title
- Alternative Title
- Project Type
- Creator / Role
- Year
- Status
- Edition / Version
- Platform
- Subjects
- Technologies
- Description
- Content Format
- Repository
- Demo
- Updated Date
- Availability
- Language
- Related Projects

視覺上可以借用圖書館目錄的結構感，但不能做得老舊或難閱讀。

保持現代化、專業、乾淨。

這會成為我圖書資訊背景和前端技能的差異化設計。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十四、作品卡片
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

每張作品卡片至少支援：

- 真實封面
- Catalog Number
- 分類
- 狀態
- 年份
- 最後更新
- 標題
- Tagline
- Summary
- 主要技術
- 3 個核心 Feature
- 是否有 Demo
- 是否有 GitHub
- 是否有 Screenshot
- Quick Preview
- Full Case Study
- Favorite
- Compare

卡片使用 Motion：

- layout animation
- filter reorder
- AnimatePresence
- hover lift
- image zoom
- status badge animation
- shared layout transition
- reduced motion support

不要在每次輸入一個搜尋字元時執行大量昂貴動畫。

搜尋過程中，動畫必須保持流暢。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十五、Quick Preview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quick Preview 必須是一個快速理解作品的介面。

至少顯示：

- Featured Media
- Title
- Tagline
- Summary
- Status
- Year
- Project Type
- Top Features
- Technologies
- Metadata 摘要
- GitHub
- Demo
- Documentation
- Full Case Study

支援：

- Esc 關閉
- 點擊背景關閉
- Focus trap
- 恢復原本焦點
- Body scroll lock
- 鍵盤操作
- 手機 Bottom Sheet
- 桌面 Modal
- Motion shared layout animation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十六、完整作品 Case Study
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

每個作品詳細頁至少包含：

1. Hero
2. Status / Year / Catalog Number
3. Tagline
4. Summary
5. GitHub / Demo / Documentation Links
6. Featured Demo Video
7. Screenshot Gallery
8. Lightbox
9. Project Overview
10. Problem
11. Target Users
12. My Role
13. Solution
14. Features
15. Architecture
16. Data Flow
17. Metadata
18. Technologies
19. Engineering Challenges
20. Technical Decisions
21. Tradeoffs
22. Testing
23. Performance
24. Accessibility
25. Current Outcome
26. Limitations
27. Lessons Learned
28. Next Steps
29. Related Projects

加入 Sticky Table of Contents。

目錄必須：

- 顯示目前閱讀章節
- 使用 IntersectionObserver
- 點擊平滑捲動
- 更新 URL hash
- 不干擾瀏覽器返回
- 手機改為折疊式目錄

Features 區塊可以使用：

- Tabs
- Accordion
- Feature Spotlight
- Screenshot plus explanation
- Demo clip
- Animated step flow

媒體 Gallery 必須：

- 支援圖片
- 支援影片
- 支援 Caption
- 支援 Alt text
- 支援 Lightbox
- 支援前後切換
- 支援鍵盤方向鍵
- 不一次載入全部原始大圖

GitHub、Demo 和文件連結若不存在，就不要顯示空按鈕。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十七、架構圖與程式碼內容
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

對於可確定架構的專案，可以產生架構摘要，例如：

- Component Architecture
- State Flow
- API Flow
- Data Model
- Scene Architecture
- Backend Layers
- Database Relations

可以建立 Mermaid 草稿，但必須：

- 從實際程式碼推導
- 保留 evidence
- 標記 confidence
- 不確定時只放在 review 文件
- 經確認後才顯示於公開網站

程式碼片段只選擇：

- 能代表架構的部分
- 不包含祕密
- 不包含大量無關程式碼
- 不超過合理長度
- 加入檔案路徑
- 說明它解決的問題

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十八、作品關聯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

不要只用相同分類判斷 Related Projects。

建立權重：

- 相同 primary category
- 相同 domain
- 相同 technology
- 相同 capability
- 相同 role
- 相同 audience
- 相同 project type
- 時間接近
- parent / successor 關係

顯示「為何相關」，例如：

- 同樣使用 React Three Fiber
- 同樣屬於資訊檢索系統
- 同樣包含工作流程設計
- 同樣屬於 Java 後端作品

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
十九、開發中的專案
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

對 in-progress、prototype 和 planned 專案誠實顯示。

狀態：

- completed
- in-progress
- prototype
- planned
- archived

對應頁面可顯示：

- 已完成內容
- 正在進行
- 尚未實作
- 下一步
- Known Issues
- 最近更新

不要把 planned project 顯示成完成作品。

也不要把它們完全藏起來。

它們可以展現我的學習路線與規劃能力。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十、動畫與視覺效果
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

網站需要大量但有目的的動畫。

使用 Motion for React，並延續既有 Motion Provider。

可使用：

- LazyMotion
- MotionConfig
- m
- AnimatePresence
- LayoutGroup
- layout
- layoutId
- useScroll
- useTransform
- useSpring
- useMotionValue
- useReducedMotion
- whileInView
- whileHover
- whileTap

動畫應用：

- Page entrance
- Mega Menu
- Mobile Menu
- Search suggestions
- Filter panel
- Checkbox state
- Active chips
- Result reorder
- Card hover
- Quick Preview
- Gallery
- Lightbox
- Related Projects
- Table of Contents
- Metadata sections
- Statistics
- Loading skeletons

限制：

- 主要使用 transform 和 opacity
- 避免大量 layout thrashing
- 避免過度 blur
- 避免搜尋時每個字元都觸發昂貴動畫
- 不可犧牲操作速度
- 支援 prefers-reduced-motion
- 手機低效能模式下減少裝飾動畫
- 不使用動畫掩蓋載入速度問題

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十一、效能要求
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

這個網站要讓面試官感受到工程品質。

請設定效能目標：

- 首頁不要載入所有專案完整內容
- 作品列表只載入列表必要欄位
- 詳細內容按路由載入
- 搜尋索引與完整 Case Study 分離
- 圖片使用 Next Image
- 影片 lazy load
- 非必要 Client Component 不得變成 Client
- Command Palette dynamic import
- Lightbox dynamic import
- 重型圖表 dynamic import
- 避免大型 JSON 重複送到瀏覽器
- 避免將所有雙語完整文章塞入首頁 bundle
- Static Generation 優先
- Project detail 使用 generateStaticParams
- Metadata 使用 generateMetadata
- 搜尋索引在 Build Time 建立
- 分類資料預先計算
- Facet count 避免每次重複全量計算
- 使用 memoization
- 合理使用 useMemo
- 搜尋使用 useDeferredValue 或 debounce
- 過多結果時評估 virtualization
- 不要過早引入複雜後端

當作品數量低於 100 時，優先保持架構簡單。

當結果超過合理門檻時，再啟用：

- Web Worker search
- Virtualized list
- Chunked index

請建立：

docs/performance-strategy.md

並記錄：

- Bundle concerns
- Search index size
- Image strategy
- Video strategy
- Server / Client boundaries
- Dynamic imports
- Caching
- Future scaling approach

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十二、SEO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

每個作品頁建立獨立：

- title
- description
- canonical
- Open Graph
- Twitter Card
- image
- locale alternatives
- structured data

可以加入 JSON-LD：

- Person
- WebSite
- CreativeWork
- SoftwareSourceCode
- CollectionPage
- BreadcrumbList

只輸出真實資料。

每個專案至少有：

- title
- summary
- image
- dateCreated
- dateModified
- programmingLanguage
- codeRepository
- url

不存在的欄位不要虛構。

建立：

- sitemap
- robots
- project routes
- language alternates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十三、無障礙
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

必須支援：

- Keyboard navigation
- Visible focus
- Correct labels
- Semantic landmarks
- Dialog semantics
- Focus trap
- Focus restore
- Esc closing
- Checkbox labels
- Screen reader result count
- aria-live for filter updates
- Alt text
- Caption
- Reduced motion
- Color contrast
- Touch target size
- Skip link

篩選結果更新時，不要讓 Screen Reader 被大量訊息淹沒。

使用簡短 aria-live 訊息，例如：

「目前顯示 12 個作品」。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十四、測試
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

先檢查目前是否已有測試工具。

依現有技術建立：

Unit tests：

- Metadata normalization
- Controlled vocabulary
- Project merge logic
- Search normalization
- Query parser
- Filter logic
- Facet counts
- Date range
- Related project scoring
- Catalog number stability

Component tests：

- Search input
- Checkbox filters
- Active chips
- Clear all
- Grid / List / Catalog view
- Quick Preview
- Favorite
- Compare
- No result state

E2E：

- 開啟作品總覽
- 搜尋 metadata
- 選擇多個 checkbox
- 套用年份範圍
- 重新整理保留 URL 狀態
- 開啟 Quick Preview
- 前往 Case Study
- 開啟 Demo
- 開啟 GitHub
- 切換中英文
- 手機篩選 Drawer
- Command Palette
- Favorite
- Compare

測試不可依賴真正的外部 GitHub API。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十五、GitHub 資訊
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

優先從本機 Git remote 取得 repository URL。

處理：

git@github.com:user/repo.git
https://github.com/user/repo.git
帶 token 的 URL

公開網站只能保存安全的：

https://github.com/user/repo

必須移除 Token 和 Credentials。

Private repository：

- 不顯示無法開啟的公開連結
- 可顯示「Private Repository」
- 不揭露機密名稱或內容
- 是否公開由 Override 控制

可選擇支援 Build-time GitHub enrichment。

只有存在 GITHUB_TOKEN 時才執行：

- Repository description
- Primary language
- Last push
- Topics

必須快取結果。

GitHub API 失敗時不可造成 Build 失敗。

Token 絕對不能傳到 Client。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十六、內容生成
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

可以依照實際程式碼和 README 草擬：

- 中文標題
- 英文標題
- Summary
- Features
- Challenges
- Role
- Architecture summary
- Technologies
- Learning outcomes

但是：

- 草稿需標記 generatedDraft
- 需要 review 的內容列入 docs/content-review.md
- 不得產生不存在的商業成果
- 不得把推論寫成確定事實
- 每個推論必須標示 inferred
- 每個重要描述保存來源

英文版要自然，不要逐字翻譯。

技術名稱保留官方英文。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十七、建立內部 Catalog Review 頁
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

建立只在 Development 顯示的審核頁：

/dev/catalog-review

正式 Production 不得公開。

此頁顯示：

- 所有掃描專案
- Portfolio Ready
- Needs Review
- Missing Metadata
- Missing Screenshot
- Missing Demo
- Missing English
- Invalid GitHub Link
- Build Failed
- Low Confidence Fields
- Duplicate Projects
- Private Projects
- Hidden Projects

可以快速查看：

- 自動值
- Override 值
- 最終合併值
- Evidence
- Confidence

不要在此頁暴露祕密或本機完整路徑。

路徑只顯示相對或經過遮罩的值。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十八、優先處理的代表作品
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

完成掃描後，優先挑選 4 至 6 個最能代表我的作品。

預期優先方向：

1. 數位檔案管理與典藏系統
2. AI Knowledge Workspace
3. 最完整的 React Three Fiber / Three.js 專案
4. Document Approval Workflow 或 Digital Archive Review Board
5. 圖書館資訊系統
6. Java / Spring Boot 或 C# / .NET 中實際進度最高的專案

但仍以實際掃描結果為準。

首頁只顯示最強的 3 至 4 個。

作品總覽則顯示所有適合公開的作品。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
二十九、實作順序
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

請依下列順序執行。

Phase 0：
備份、確認 Git 狀態、檢查目前 Build。

Phase 1：
稽核現有作品集。

Phase 2：
掃描本機專案並建立 inventory。

Phase 3：
建立 Zod Metadata Schema 和 Controlled Vocabulary。

Phase 4：
建立自動 Catalog Pipeline。

Phase 5：
產生第一批真實專案資料。

Phase 6：
整理真實媒體資產。

Phase 7：
重構 Project Archive。

Phase 8：
實作全文搜尋與 Faceted Search。

Phase 9：
實作 Catalog Record View。

Phase 10：
升級 Quick Preview。

Phase 11：
升級完整 Case Study。

Phase 12：
實作 Lightbox、Table of Contents、Feature Spotlight。

Phase 13：
整合 Command Palette、Favorite、Compare。

Phase 14：
SEO、Accessibility、Performance。

Phase 15：
Tests、Build、Documentation。

每個 Phase 完成後：

1. 執行 typecheck
2. 執行 lint
3. 執行 tests
4. 執行 build
5. 修正錯誤
6. 更新 docs/implementation-progress.md
7. 記錄修改檔案
8. 記錄尚未解決問題

不要等到全部完成才第一次執行 build。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
三十、Git 與檔案安全
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

開始前執行：

git status
git branch --show-current
git log -5 --oneline

若目前存在未提交修改：

- 不可直接 reset
- 不可直接 checkout 覆蓋
- 不可刪除使用者修改
- 先記錄現況
- 修改時避免覆蓋不相關檔案

不要執行：

git reset --hard
git clean -fd
rm -rf 使用者專案
強制 push

建議每個主要 Phase 建立清楚 commit，但不要在未經要求時 push。

Commit message 使用 Conventional Commits，例如：

feat(catalog): add project scanner
feat(search): add metadata faceted search
feat(projects): generate real project records
perf(search): optimize project index
test(catalog): add metadata validation tests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
三十一、驗收標準
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

最終網站必須達到：

1. 不再使用假作品。
2. 所有公開作品都來自真實本機專案。
3. 每個作品具有經驗證的 Metadata。
4. 搜尋支援中文、英文、技術別名和模糊比對。
5. 篩選支援多個 Checkbox。
6. 篩選支援年份與日期。
7. 篩選狀態同步 URL。
8. 可切換 Grid、List、Catalog Record。
9. 可快速預覽。
10. 可查看完整 Case Study。
11. 可播放 Demo。
12. 可瀏覽 Screenshot。
13. GitHub、Demo、文件連結只顯示有效項目。
14. 可以收藏。
15. 可以比較。
16. 可以用 Command Palette 搜尋。
17. 動畫流暢。
18. 支援 Reduced Motion。
19. 手機版可正常操作。
20. 搜尋不造成明顯卡頓。
21. npm run build 成功。
22. TypeScript 無錯誤。
23. 沒有任何祕密被寫入網站。
24. 沒有虛構成效或技術。
25. 所有 needsReview 項目都有報告。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
三十二、最終回報格式
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

完成後請使用繁體中文回報：

一、完成內容

二、掃描到的專案數量

三、加入網站的真實專案

四、被排除的專案與原因

五、Metadata 架構

六、搜尋架構

七、篩選功能

八、媒體整理結果

九、效能最佳化

十、無障礙改善

十一、測試結果

十二、Build 結果

十三、修改檔案

十四、需要我人工確認的內容

十五、仍缺少的 Screenshot、Demo、GitHub 或文字

十六、建議下一步

請不要只回覆概念或程式碼片段。

請實際建立檔案、修改專案、執行指令、檢查錯誤並完成可執行結果。

現在請先：

1. 確認目前工作目錄。
2. 檢查 Git 狀態。
3. 找出作品集專案。
4. 找出我提供的所有專案根目錄。
5. 完成 Phase 0 和 Phase 1 稽核。
6. 建立稽核文件。
7. 接著自動進入 Phase 2，不要只停在報告。
```

---

# 三、建議另外附給 LLMProvider Tooling 的補充規則

將下面這段接在主 Prompt 後面，可以減少它「掃一掃就亂產生內容」的情況。

```text
【補充內容判定規則】

請使用以下方式判定專案狀態：

completed：
主要功能完整、可正常執行、有明確完成成果。

in-progress：
已有實際程式碼與可操作功能，但仍有重要功能正在開發。

prototype：
有可執行核心概念，但不應被描述為完整產品。

planned：
只有設計、文件、Prompt、Scaffold 或少量初始化程式碼。

learning-exercise：
主要目的是練習單一語法、Library 或課程內容，不應和大型代表作品同級。

archived：
已停止開發或被其他專案取代。

請使用以下方式判斷 Portfolio Ready：

- 有清楚目的
- 有實際程式碼
- 有可辨識的功能
- 能解釋技術決策
- 與其他作品具有差異
- 不包含重大私人資訊
- 能提供 Screenshot、Demo、文件或程式碼證據中的至少一項

對同系列的多個小專案，優先整理成一個 Collection，而不是產生大量低品質作品卡片。

例如：

Three.js Learning Collection
Java Core Practice Collection
Frontend Event Laboratory
Unity Campus Systems Collection

Collection 仍需列出子專案，但不應讓作品總覽被大量小練習淹沒。
```

---

# 四、讓 LLMProvider Tooling 先做「只讀掃描」的保險指令

若你第一次讓它掃描大量資料夾，可以先將主 Prompt 最後一句暫時改成：

```text
第一輪請只執行 Phase 0、Phase 1 和 Phase 2。

這一輪可以建立 docs 和 generated scan report，但先不要修改作品集主要 UI，也不要修改其他被掃描專案。

完成 project inventory 後，請列出你下一步準備加入網站的專案及其證據。
```

確認掃描結果正常後，再對它說：

```text
已確認 Project Inventory。現在請依照原 Master Prompt 從 Phase 3 繼續實作，不要重新掃描已完成且沒有變動的專案。
```

這樣比較不會讓 Coding Agent 一上場就像喝了三杯濃縮咖啡，把整個專案樹翻修一遍。

---

# 五、你應該優先準備的真實資料

自動分析雖然能找到技術和部分功能，但下面內容仍以你親自提供最準確：

- 每個代表作品的目的
- 你在專案裡的實際角色
- 哪些功能是你真正完成的
- 哪些部分是 AI Coding Agent 協助
- 遇到的最大技術問題
- 你如何修正
- 哪些作品可以公開 GitHub
- 哪些只能放 Screenshot
- 哪些仍在規劃
- 想投遞的職位方向
- 公開用履歷與聯絡資訊

LLMProvider Tooling 應該把這些資料放進 Override，而不是下一次掃描時重新猜測。

最重要的設計是：

```text
自動掃描結果
＋
人工確認 Override
＋
中英文 Case Study
＝
網站最終公開內容
```

這會讓網站後續新增專案時，只要執行：

```bash
npm run catalog:sync
npm run build
```

就能自動發現新專案、更新 Metadata、重建搜尋索引，同時保留你親自修改過的介紹內容。

## Response:
6/19/2026, 11:27:22 PM

> **Deciding on committing changes in logical groups**
>
> I need to guide the user on committing files correctly with a meaningful message, but there are 77 issues. It’s better to avoid committing broken code. I'll suggest running `npx tsc --noEmit`, `npm run lint`, and `npm run build`, and committing only those that work. For stale files, we’ll hold off on deletions until they’re finalized.
>
> **Planning UI and dependency commits**
>
> For commit 6, I’ll include the `feat(search)` changes for adding the project command palette, but I’m unsure whether I should group dependencies with it. Since some UI components like shadcn are shared, they should ideally be committed separately under a `chore(ui)` commit before the feature changes. Dependencies should also be in a `chore(deps)` commit if applicable.
>
> **Guiding commits and using checks**
>
> Since there are 77 issues, I should recommend fixing them before committing. Blindly using `git add .` is risky, so I’ll suggest starting with `git restore --staged .` to safely unstage changes. I'll provide a preflight checklist and advise running type checks, linting, and builds first to ensure the project works.
>
> **Planning commit steps and grouping**
>
> For the commits, I think
>
> **Organizing commit sequence and messages**
>
> I’ll structure specific feature commits logically in sequence: 
> - Add faceted project explorer for commit 6.
> - Commit 7 for rich project previews & case studies.
> - Commit 8 for the global command palette.
> - Commit 9 for persistent favorites/state.
> - Commit 10 for side-by-side comparisons.
> 
> For shell integration, commit at the end with `feat(navigation): integrate project discovery`. I'll ensure proper cleanup for unreferenced items like code and media. Each commit will have clear messaging to reflect the changes.
>
> Thought for 44s

可以。從你截圖目前的狀態來看，這一批修改混合了：

- Motion 動畫基礎
- 新首頁
- Metadata 作品資料
- 作品典藏搜尋
- 快速預覽與媒體展示
- Command Palette
- 收藏與比較
- Header／Layout 整合
- Shadcn UI 元件
- 新增路由

**不要直接 `git add .` 一次提交。** 那樣 Git 歷史會變成一顆內容過多、之後很難回滾的巨型炸彈。

另外 VS Code 顯示目前有 **77 個 Problems**。先確認它們是不是 TypeScript／ESLint 真錯誤。理想狀況是每個功能提交前至少能通過型別檢查。

---

# 一、提交前先整理工作區

先進入專案：

```bash
cd ~/web-projects/justin-portfolio
```

查看狀態：

```bash
git status --short
git branch --show-current
git diff --stat
```

先取消所有已暫存內容，但不會刪掉程式碼：

```bash
git restore --staged .
```

確認 `.next` 與 `node_modules` 有被忽略：

```bash
git check-ignore -v .next node_modules
```

若沒有輸出，請在 `.gitignore` 補上：

```gitignore
node_modules/
.next/
out/
dist/
coverage/
.env
.env.*
!.env.example
```

然後執行：

```bash
npx tsc --noEmit
npm run lint
```

若 `package.json` 有 `build`：

```bash
npm run build
```

目前有大量錯誤時，先不要急著正式提交；至少要確認錯誤來自哪些新功能。可以使用：

```bash
npx tsc --noEmit 2>&1 | tee typecheck-errors.log
```

`typecheck-errors.log` 不要提交：

```bash
rm -f typecheck-errors.log
```

---

# 二、建議的完整 Commit 順序

建議分成 **11～13 個 Commit**。下面順序也考慮了功能依賴關係。

---

# Commit 1：新增依賴

這一批應該包含 Motion、Zustand、Command Dialog 等套件變更。

先查看：

```bash
git diff package.json
```

若你使用 npm：

```bash
git add package.json package-lock.json
```

若使用 pnpm：

```bash
git add package.json pnpm-lock.yaml
```

若 `components.json` 因為 Shadcn 初始化或設定而改變，也加入：

```bash
git add components.json
```

檢查暫存內容：

```bash
git diff --cached --stat
git diff --cached
```

提交訊息：

```bash
git commit -m "chore(deps): add portfolio interaction dependencies"
```

這個 Commit 應只包含：

```text
package.json
package-lock.json 或 pnpm-lock.yaml
components.json（有修改才加入）
```

---

# Commit 2：加入共用 UI 元件

從畫面可見你新增或修改了：

```text
src/components/ui/badge.tsx
src/components/ui/button.tsx
src/components/ui/command.tsx
src/components/ui/dialog.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/input-group.tsx
src/components/ui/input.tsx
src/components/ui/separator.tsx
src/components/ui/textarea.tsx
```

暫存：

```bash
git add \
  src/components/ui/badge.tsx \
  src/components/ui/button.tsx \
  src/components/ui/command.tsx \
  src/components/ui/dialog.tsx \
  src/components/ui/dropdown-menu.tsx \
  src/components/ui/input-group.tsx \
  src/components/ui/input.tsx \
  src/components/ui/separator.tsx \
  src/components/ui/textarea.tsx
```

檢查：

```bash
git diff --cached --stat
git diff --cached --check
```

提交：

```bash
git commit -m "chore(ui): add reusable command and dialog primitives"
```

---

# Commit 3：Motion 動畫基礎系統

這個 Commit 專門放共用動畫架構：

```text
src/components/motion/motion-provider.tsx
src/components/motion/reveal.tsx
src/components/motion/scroll-progress.tsx
src/components/motion/section-heading.tsx
src/app/[locale]/template.tsx
```

暫存：

```bash
git add \
  src/components/motion/motion-provider.tsx \
  src/components/motion/reveal.tsx \
  src/components/motion/scroll-progress.tsx \
  src/components/motion/section-heading.tsx \
  'src/app/[locale]/template.tsx'
```

`globals.css` 同時包含很多不同功能，不能整份直接加入。請使用互動式暫存：

```bash
git add -p src/app/globals.css
```

看到每一段修改時：

- 動畫共用樣式、`prefers-reduced-motion`、`section-shell` 等這一批按 `y`
- 首頁專用樣式先按 `n`
- 不確定可按 `s` 拆小區塊
- 想離開按 `q`

檢查：

```bash
git diff --cached
git diff --cached --check
```

提交：

```bash
git commit -m "feat(motion): add shared animation infrastructure"
```

---

# Commit 4：動畫化首頁

這個 Commit 放首頁內容與新 Hero：

```text
src/components/home/hero-section.tsx
src/components/home/home-sections.tsx
src/data/home.ts
src/app/[locale]/page.tsx
```

暫存：

```bash
git add \
  src/components/home/hero-section.tsx \
  src/components/home/home-sections.tsx \
  src/data/home.ts \
  'src/app/[locale]/page.tsx'
```

若 `globals.css` 還有首頁 Grid、背景、文字平衡等樣式：

```bash
git add -p src/app/globals.css
```

提交：

```bash
git commit -m "feat(home): build animated portfolio landing page"
```

這一個 Commit 應包含：

- Hero 滑鼠視差
- 精選作品首頁區塊
- 技術能力區塊
- Roadmap
- Contact CTA
- Homepage bilingual content
- Homepage Motion animation

---

# Commit 5：Metadata 驅動的作品資料模型

這是整套作品典藏的資料層：

```text
src/types/projects.ts
src/data/projects.ts
src/lib/define-project.ts
src/lib/project-taxonomy.ts
src/lib/projects.ts
```

暫存：

```bash
git add \
  src/types/projects.ts \
  src/data/projects.ts \
  src/lib/define-project.ts \
  src/lib/project-taxonomy.ts \
  src/lib/projects.ts
```

檢查是否不小心包含假網址：

```bash
grep -R \
  -E "YOUR_ACCOUNT|YOUR_REPOSITORY|YOUR_DEMO_URL|example.com" \
  src/data src/lib src/types
```

有假網址時，請先移除或改成真實網址。

提交：

```bash
git commit -m "feat(projects): add metadata-driven project catalog"
```

---

# Commit 6：作品典藏與 Faceted Explorer

這個 Commit 放作品總覽、Metadata 篩選與統計：

```text
src/components/projects/archive/project-archive-card.tsx
src/components/projects/archive/project-archive-overview.tsx
src/components/projects/archive/project-explorer.tsx
src/app/[locale]/projects/all/page.tsx
```

暫存：

```bash
git add \
  src/components/projects/archive/project-archive-card.tsx \
  src/components/projects/archive/project-archive-overview.tsx \
  src/components/projects/archive/project-explorer.tsx \
  'src/app/[locale]/projects/all/page.tsx'
```

不過 `project-archive-card.tsx` 和 `project-explorer.tsx` 後面又加入收藏與比較功能，所以建議使用：

```bash
git reset \
  src/components/projects/archive/project-archive-card.tsx \
  src/components/projects/archive/project-explorer.tsx
```

然後分段暫存：

```bash
git add -p src/components/projects/archive/project-archive-card.tsx
git add -p src/components/projects/archive/project-explorer.tsx
```

這一個 Commit 只暫存：

- 搜尋
- 類別篩選
- 狀態篩選
- 技術篩選
- 排序
- Grid / List
- URL Search Params
- Archive Overview
- 卡片基本顯示

先不要暫存：

- Favorite
- Compare
- `useProjectPreferences`
- `useMounted`
- Compare bar

提交：

```bash
git commit -m "feat(projects): add faceted project archive explorer"
```

---

# Commit 7：作品快速預覽與完整 Case Study

這個 Commit 放：

```text
src/components/projects/archive/project-preview-dialog.tsx
src/components/projects/detail/project-media-gallery.tsx
src/app/[locale]/projects/[slug]/page.tsx
```

暫存：

```bash
git add \
  src/components/projects/archive/project-preview-dialog.tsx \
  src/components/projects/detail/project-media-gallery.tsx \
  'src/app/[locale]/projects/[slug]/page.tsx'
```

若已經加入真實圖片與影片：

```bash
git add public/portfolio/projects
```

不要加入超大型原始影片。先查看：

```bash
find public/portfolio/projects -type f -printf '%s %p\n' \
  | sort -nr \
  | head -20
```

若影片超過數十 MB，先壓縮，避免 Git Repository 被灌爆。

提交：

```bash
git commit -m "feat(projects): add rich project previews and case studies"
```

---

# Commit 8：全站 Command Palette 搜尋

這個 Commit 放：

```text
src/components/command/project-command-button.tsx
src/components/command/project-command-palette.tsx
```

暫存：

```bash
git add \
  src/components/command/project-command-button.tsx \
  src/components/command/project-command-palette.tsx
```

`header.tsx` 和 `layout.tsx` 同時包含其他整合內容，所以分段加入：

```bash
git add -p src/components/header.tsx
git add -p 'src/app/[locale]/layout.tsx'
```

這一個 Commit 只選擇：

- `ProjectCommandButton` import
- Header 搜尋按鈕
- `ProjectCommandPalette` import
- Layout 裡放入 Command Palette
- 對應 locale 傳遞

提交：

```bash
git commit -m "feat(search): add global project command palette"
```

---

# Commit 9：作品收藏功能

這個 Commit 放 Zustand Local Storage 收藏狀態：

```text
src/hooks/use-mounted.ts
src/stores/project-preferences-store.ts
```

暫存：

```bash
git add \
  src/hooks/use-mounted.ts \
  src/stores/project-preferences-store.ts
```

接著從作品卡片與 Explorer 中只挑收藏功能：

```bash
git add -p src/components/projects/archive/project-archive-card.tsx
git add -p src/components/projects/archive/project-explorer.tsx
```

應暫存的部分：

- `Heart`
- `favoriteSlugs`
- `toggleFavorite`
- `favoritesOnly`
- `favorites=1`
- 收藏 Checkbox／Button
- 收藏數量
- Local Storage hydration

不要暫存：

- `compareSlugs`
- `addToCompare`
- `removeFromCompare`
- Compare bar

提交：

```bash
git commit -m "feat(projects): add persistent project favorites"
```

---

# Commit 10：作品比較系統

這個 Commit 放：

```text
src/components/projects/compare/project-compare-bar.tsx
src/app/[locale]/projects/compare/page.tsx
```

暫存：

```bash
git add \
  src/components/projects/compare/project-compare-bar.tsx \
  'src/app/[locale]/projects/compare/page.tsx'
```

再把卡片和 Explorer 剩下的比較功能加入：

```bash
git add -p src/components/projects/archive/project-archive-card.tsx
git add -p src/components/projects/archive/project-explorer.tsx
```

應包含：

- `Columns3`
- `compareSlugs`
- `addToCompare`
- `removeFromCompare`
- 三個作品上限
- Compare bar
- Compare URL
- Side-by-side comparison page

檢查：

```bash
git diff --cached --check
git diff --cached --stat
```

提交：

```bash
git commit -m "feat(projects): add side-by-side project comparison"
```

---

# Commit 11：網站外殼與導覽整合

這個 Commit 放剩餘 Header、Mobile Menu、Layout 和翻譯整合。

可能包含：

```text
src/components/header.tsx
src/components/mobile-menu.tsx
src/app/[locale]/layout.tsx
messages/zh-TW.json
messages/en.json
```

暫存：

```bash
git add \
  src/components/header.tsx \
  src/components/mobile-menu.tsx \
  'src/app/[locale]/layout.tsx' \
  messages/zh-TW.json \
  messages/en.json
```

如果這些檔案還混有不相關修改，使用：

```bash
git reset \
  src/components/header.tsx \
  src/components/mobile-menu.tsx \
  'src/app/[locale]/layout.tsx' \
  messages/zh-TW.json \
  messages/en.json
```

再逐個：

```bash
git add -p src/components/header.tsx
git add -p src/components/mobile-menu.tsx
git add -p 'src/app/[locale]/layout.tsx'
git add -p messages/zh-TW.json
git add -p messages/en.json
```

提交：

```bash
git commit -m "feat(navigation): integrate project discovery into the site shell"
```

這一批適合包含：

- Mega Menu 新作品分類
- Mobile 搜尋入口
- Motion Provider
- Scroll Progress
- Header Search
- 中英文名稱
- Theme／Locale Provider 整合

---

# Commit 12：舊作品分類路由整理

畫面中仍存在：

```text
src/app/[locale]/projects/design/page.tsx
src/app/[locale]/projects/mobile/page.tsx
src/app/[locale]/projects/opensource/page.tsx
src/app/[locale]/projects/web/page.tsx
```

這些是舊分類架構。現在你已經改為：

```text
information-system
interactive-3d
ai-data
frontend
backend-desktop
```

不要讓舊網址直接 404。建議將它們改成 redirect 到新 Archive。

例如 `web/page.tsx`：

```tsx
import { redirect } from "@/i18n/navigation";

interface LegacyWebProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LegacyWebProjectsPage({
  params,
}: LegacyWebProjectsPageProps) {
  const { locale } = await params;

  redirect({
    href: "/projects/all?category=frontend",
    locale,
  });
}
```

對應建議：

```text
/projects/web
→ /projects/all?category=frontend

/projects/design
→ /projects/all?category=frontend

/projects/mobile
→ /projects/all

/projects/opensource
→ /projects/all?has=github
```

修改後暫存：

```bash
git add \
  'src/app/[locale]/projects/web/page.tsx' \
  'src/app/[locale]/projects/design/page.tsx' \
  'src/app/[locale]/projects/mobile/page.tsx' \
  'src/app/[locale]/projects/opensource/page.tsx'
```

提交：

```bash
git commit -m "refactor(projects): route legacy categories through the archive"
```

---

# Commit 13：移除舊的重複作品元件

畫面中同時存在：

```text
src/components/projects/project-card.tsx
src/components/projects/project-explorer.tsx
```

以及新版：

```text
src/components/projects/archive/project-archive-card.tsx
src/components/projects/archive/project-explorer.tsx
```

先搜尋誰還在引用舊版：

```bash
rg \
  'components/projects/project-card|components/projects/project-explorer|ProjectCard|ProjectExplorer' \
  src
```

## 情況 A：舊元件已完全沒有被使用

移除：

```bash
git rm \
  src/components/projects/project-card.tsx \
  src/components/projects/project-explorer.tsx
```

提交：

```bash
git commit -m "refactor(projects): remove legacy project listing components"
```

## 情況 B：仍有頁面使用舊元件

先不要刪，將引用改成新版，再提交：

```bash
git add \
  src/components/projects/project-card.tsx \
  src/components/projects/project-explorer.tsx
```

提交：

```bash
git commit -m "refactor(projects): migrate legacy listings to the archive system"
```

不要同時保留兩套功能相同的 Explorer，否則之後修 Bug 會修到懷疑人生。

---

# 三、About、Contact、Tech 檔案先不要混進來

你的截圖中這些檔案有 Problems 數字，但沒有明顯顯示本次新增或修改：

```text
src/components/about/*
src/components/contact/contact-form.tsx
src/components/tech/article-card.tsx
src/app/[locale]/about/*
src/app/[locale]/contact/*
src/app/[locale]/tech/*
```

先用：

```bash
git status --short
```

只有出現 `M`、`A`、`??` 的才需要處理。

若它們只是因為共用 TypeScript 型別改動而被迫修正，另外建立修復 Commit：

```bash
git add \
  src/components/about \
  src/components/contact \
  src/components/tech \
  'src/app/[locale]/about' \
  'src/app/[locale]/contact' \
  'src/app/[locale]/tech'
```

提交：

```bash
git commit -m "fix(ui): align existing pages with the updated portfolio architecture"
```

不要把未修改檔案硬塞進 Commit，Git 本來也不會理它們。

---

# 四、每次 Commit 前都執行這組檢查

每次 `git add` 完成後：

```bash
git diff --cached --stat
git diff --cached --check
git diff --cached
```

其中：

```bash
git diff --cached --check
```

可以找出：

- 行尾空白
- Merge marker
- 格式問題

確認無誤再：

```bash
git commit -m "你的英文訊息"
```

---

# 五、全部 Commit 完成後檢查

查看 Commit 紀錄：

```bash
git log --oneline --decorate -15
```

理想結果大致如下：

```text
refactor(projects): remove legacy project listing components
refactor(projects): route legacy categories through the archive
feat(navigation): integrate project discovery into the site shell
feat(projects): add side-by-side project comparison
feat(projects): add persistent project favorites
feat(search): add global project command palette
feat(projects): add rich project previews and case studies
feat(projects): add faceted project archive explorer
feat(projects): add metadata-driven project catalog
feat(home): build animated portfolio landing page
feat(motion): add shared animation infrastructure
chore(ui): add reusable command and dialog primitives
chore(deps): add portfolio interaction dependencies
```

最後執行：

```bash
npx tsc --noEmit
npm run lint
npm run build
git status --short
```

正常情況下最後應顯示：

```text
nothing to commit, working tree clean
```

---

# 六、目前 77 個 Problems 的處理原則

若目前不能 Build，不建議硬把所有功能都提交成正式 `feat`。

先依錯誤類型修正：

```bash
npx tsc --noEmit
```

常見問題可能包括：

- `m` 元件的 variants 型別推導
- `readonly` 陣列不能指派給可變陣列
- `React.ElementType` 沒有匯入型別
- `useSearchParams()` 需要 Suspense
- `redirect()` 的 next-intl 參數格式
- `params` 在 Next.js 16 應為 Promise
- Project Metadata 新欄位缺失
- Lucide icon 名稱錯誤
- `MotionValue` 型別不相容
- `ProjectInput` 和 `Project` 欄位不一致

修正錯誤最好合併進對應功能 Commit，不要最後出現一個內容混亂的：

```text
fix: fix errors
```

真的需要最後統一修正時，使用較明確的訊息：

```bash
git commit -m "fix(build): resolve portfolio feature integration errors"
```

但這應該是最後手段，不是垃圾桶 Commit。



---
Powered by [ChatGPT Exporter](https://www.chatgptexporter.com)