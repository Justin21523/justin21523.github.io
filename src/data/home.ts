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
            "Implemented localized routing, dynamic project pages, metadata, and Server–Client Component boundaries.",
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