import {
  contactMailto,
  githubProfileUrl,
  resumePath,
} from "@/data/contact";

export type HomeLocale =
  | "zh-TW"
  | "en";

export const siteUrl =
  "https://justin21523.github.io";

export const homeContent = {
  "zh-TW": {
    seo: {
      title:
        "Justin | 網頁開發、資料整理與圖書資訊作品集",
      description:
        "Justin 的個人作品集，展示 Python、JavaScript、TypeScript 網頁應用開發作品，並結合圖書資訊背景中的 metadata、資訊組織、檢索、數位典藏與知識管理概念。",
    },

    hero: {
      eyebrow:
        "Web Development · Metadata · Digital Archives",
      greeting:
        "你好，我是 Justin",
      title:
        "我正在打造結合網頁開發、資料整理與",
      titleAccent:
        "圖書資訊背景的數位作品",
      description:
        "我是 Justin，目前主要使用 Python、JavaScript 與 TypeScript 進行網頁相關應用程式開發，並將圖書資訊背景中的資訊組織、metadata、檢索與數位典藏概念融入作品中。近期也正在學習 C++、C#、ASP.NET / .NET 等技術，希望逐步累積前端、後端與桌面應用的完整開發能力。",
      availability:
        "目前以網頁應用、資料整理、互動介面與圖書資訊概念作品為主",
      ctas: [
        {
          label: "查看作品",
          href: "/projects/all",
          icon: "arrow",
          variant: "primary",
        },
        {
          label: "聯絡我",
          href: "/contact/form",
          icon: "mail",
          variant: "secondary",
        },
        {
          label: "瀏覽 GitHub",
          href: githubProfileUrl,
          icon: "github",
          variant: "secondary",
          external: true,
        },
      ],
      focusCards: [
        {
          label: "目前主力",
          value:
            "Python / JavaScript / TypeScript",
        },
        {
          label: "網頁開發",
          value:
            "React / Next.js / Tailwind CSS",
        },
        {
          label: "領域背景",
          value:
            "Metadata / Retrieval / LIS",
        },
      ],
    },

    about: {
      eyebrow: "About",
      title: "關於我",
      paragraphs: [
        "我是 Justin，一位正在累積實作經驗的 Junior 工程學習者。目前主要專注在 Python、JavaScript、TypeScript 與網頁應用程式開發，透過不同主題的作品練習前端介面、資料處理、互動流程與應用程式架構。",
        "我的背景與圖書資訊領域有關，因此我對資料如何被整理、描述、分類、搜尋與呈現特別有興趣。這也影響了我的專案方向：我不只想做單純的畫面或功能，而是希望把 metadata、資訊組織、檢索、數位典藏、知識管理與工作流程等概念，轉換成可以實際操作的數位產品。",
        "目前我的主要技術重心是 Python 與網頁開發，包含 JavaScript、TypeScript、React、Next.js 與互動式介面設計。同時，我也正在學習 C++、C#、ASP.NET / .NET 與桌面應用開發，未來則計畫進一步學習 Java 與 Spring Boot，補強後端系統、API 設計與企業應用開發能力。",
        "現階段我希望透過作品集呈現的不只是「使用過哪些技術」，而是我如何理解需求、整理資料、設計操作流程，並把圖書資訊背景與程式開發能力結合，做出清楚、可維護、可展示的作品。",
      ],
      cards: [
        {
          icon: "database",
          title:
            "資訊組織與 Metadata",
          description:
            "關注資料欄位、分類、檢索、內容脈絡與數位典藏資料如何被整理成可操作的介面。",
          tags: [
            "Metadata",
            "Search",
            "Digital Archive",
          ],
        },
        {
          icon: "code",
          title:
            "網頁應用與互動流程",
          description:
            "透過 React、Next.js、TypeScript 與前端狀態設計，練習把資料與使用流程做成清楚的產品介面。",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
          ],
        },
        {
          icon: "box",
          title:
            "桌面與後端學習",
          description:
            "正在補強 C++、C#、.NET、Avalonia、Qt、SQLite 與 API 設計，累積跨平台應用的基礎能力。",
          tags: [
            "C++",
            "C#",
            ".NET",
          ],
        },
      ],
    },

    skills: {
      eyebrow: "Tech Stack",
      title: "技術與工具",
      description:
        "我目前的技術學習以 Python、JavaScript、TypeScript 與網頁應用開發為主，並持續將圖書資訊領域中的資料組織、metadata、搜尋與數位典藏概念應用到作品中。除了前端與資料處理，我也正在逐步學習 C++、C#、ASP.NET / .NET 與桌面應用開發，未來會再補強 Java 與 Spring Boot 後端技術。",
      groups: [
        {
          title: "目前主要使用",
          categories: [
            {
              title: "Programming",
              items: [
                "Python",
                "JavaScript",
                "TypeScript",
              ],
            },
            {
              title: "Frontend / Web",
              items: [
                "HTML",
                "CSS",
                "React",
                "Next.js",
                "Tailwind CSS",
                "Component-based UI",
                "State Management",
                "Responsive Layout",
              ],
            },
            {
              title:
                "Data / Information Organization",
              items: [
                "Metadata",
                "資料整理與資料欄位設計",
                "搜尋與篩選介面",
                "資訊分類與內容組織",
                "數位典藏概念",
                "知識管理介面",
                "基礎資料視覺化",
              ],
            },
            {
              title: "Tools",
              items: [
                "Git",
                "GitHub",
                "VS Code",
                "Linux Development Environment",
              ],
            },
          ],
        },
        {
          title: "正在學習",
          categories: [
            {
              title: "Desktop Application",
              items: [
                "C++",
                "C#",
                ".NET",
                "Avalonia UI",
                "Qt",
                "SQLite",
              ],
            },
            {
              title: "Backend / Web API",
              items: [
                "ASP.NET / ASP.NET Core",
                "RESTful API",
                "Database Design",
                "Frontend / Backend Integration",
              ],
            },
          ],
        },
        {
          title: "未來學習規劃",
          categories: [
            {
              title:
                "Backend / Enterprise Stack",
              items: [
                "Java",
                "Spring Boot",
                "Maven",
                "Backend Layered Architecture",
                "Authentication / Authorization",
                "Database and API Design",
              ],
            },
          ],
        },
      ],
    },

    featured: {
      eyebrow: "Projects",
      title: "作品集",
      description:
        "這些作品記錄了我目前的學習與實作過程，主題多圍繞網頁應用、資料整理、metadata、數位典藏、知識管理與互動式介面設計。部分專案是作品集型練習，部分則是正在學習與持續擴充中的作品。",
      viewAll: "查看所有作品",
      viewCaseStudy: "查看完整案例",
      viewGithub: "查看 GitHub",
      groups: [
        {
          title: "Web / Frontend Projects",
          description:
            "以網頁應用、資料整理、工作區介面與數位典藏流程為主的前端練習作品。",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
            "Metadata",
          ],
          projects: [
            {
              title: "Data Narrative Studio",
              slug: "data-narrative-studio",
              description:
                "以資料敘事與互動視覺化為主題的網頁應用作品，練習將資料整理成清楚、可閱讀、可互動的呈現方式。",
              techStack: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
              ],
              focus:
                "練習資料整理、視覺化呈現、互動式介面設計，以及如何讓資料不只是被顯示，而是能被理解與探索。",
              status:
                "Learning Project / Portfolio Project",
            },
            {
              title: "AI Knowledge Workspace",
              slug: "ai-knowledge-workspace",
              description:
                "以知識整理與工作區介面為主題的網頁應用作品，聚焦資料分類、內容組織與知識管理流程。",
              techStack: [
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
              ],
              focus:
                "練習建立工作區型介面、資料狀態管理、內容分類、搜尋篩選與資訊呈現流程。",
              status:
                "Learning Project / Portfolio Project",
            },
            {
              title:
                "Digital Archive Review Board",
              slug:
                "digital-archive-review-board",
              description:
                "以數位典藏資料審查與流程管理為主題的前端作品，結合 metadata、審查狀態與資料欄位管理概念。",
              techStack: [
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
              ],
              focus:
                "練習將數位典藏、metadata、審查流程與狀態管理轉換成可操作的前端介面。",
              status:
                "Learning Project / Portfolio Project",
            },
          ],
        },
        {
          title:
            "Interactive Web / 3D Web Projects",
          description:
            "以 3D Web、互動操作、場景控制與遊戲式介面原型為主的學習作品。",
          tags: [
            "Three.js",
            "React Three Fiber",
            "Zustand",
            "Interaction",
          ],
          projects: [
            {
              title: "Lost Yokai Campus RPG",
              slug: "lost-yokai-campus-rpg",
              description:
                "以校園探索為主題的 3D Web 互動作品。",
              techStack: [
                "JavaScript",
                "TypeScript",
                "React",
                "Three.js",
                "React Three Fiber",
              ],
              focus:
                "練習 3D 場景建立、角色操作、鏡頭控制與互動式 Web 體驗設計。",
              status: "Learning Project",
            },
            {
              title: "Aqua Rush",
              slug: "aqua-rush",
              description:
                "以動態互動與 3D 場景為主題的 Web 作品。",
              techStack: [
                "TypeScript",
                "React",
                "Three.js",
                "React Three Fiber",
                "Zustand",
              ],
              focus:
                "練習 3D 場景中的即時互動、狀態管理與使用者操作流程。",
              status: "Learning Project",
            },
            {
              title: "3D Platformer Runner",
              slug: "3d-platformer-runner",
              description:
                "以平台移動與 Runner 操作為核心的 3D Web 遊戲原型。",
              techStack: [
                "TypeScript",
                "React",
                "Three.js",
              ],
              focus:
                "練習玩家控制、場景節奏、互動回饋與遊戲式介面原型。",
              status: "Learning Project",
            },
          ],
        },
        {
          title:
            "Desktop / Application Projects",
          description:
            "以桌面應用、metadata、檔案整理、文獻管理與實際工作流程為主的學習作品。",
          tags: [
            "C#",
            ".NET",
            "Avalonia",
            "C++ / Qt",
          ],
          projects: [
            {
              title:
                "Research Paper & Knowledge Workspace",
              slug:
                "research-paper-and-knowledge-workspace",
              description:
                "以研究文獻、知識整理與個人資料管理為主題的桌面應用作品。",
              techStack: [
                "C#",
                ".NET",
                "Avalonia",
                "Entity Framework Core",
                "SQLite",
              ],
              focus:
                "練習將圖書資訊背景中的書目資料、研究筆記、metadata 與知識管理流程轉換成桌面應用介面。",
              status:
                "In Progress / Learning Project",
            },
            {
              title: "ArchiveFlow Studio",
              slug: "ArchiveFlow",
              description:
                "以 metadata、檔案整理與視覺化工作流程為核心的桌面應用作品。",
              techStack: [
                "C#",
                ".NET",
                "Avalonia",
                "SQLite",
                "Dapper",
              ],
              focus:
                "練習 C# 桌面應用架構、SQLite 資料儲存、節點式 UI、metadata workflow，以及如何讓檔案整理流程更直覺、可視覺化。",
              status:
                "In Progress / Learning Project",
            },
            {
              title: "CafeNet Manager",
              slug: "cafe-net-manager",
              description:
                "以咖啡廳座位、計時與營運管理為主題的桌面管理系統。",
              techStack: [
                "C++",
                "Qt",
                "SQLite",
                "CMake",
              ],
              focus:
                "練習 C++ / Qt 桌面 UI、資料庫設計、座位地圖操作、營運流程建模與 CMake 專案架構。",
              status:
                "In Progress / Learning Project",
            },
          ],
        },
        {
          title:
            "Backend Learning / Future Plan",
          description:
            "用來補強後端 API、資料庫、分層架構與企業常見技術棧的學習方向。",
          tags: [
            "ASP.NET Core",
            "RESTful API",
            "Java",
            "Spring Boot",
          ],
          projects: [
            {
              title:
                "ASP.NET / .NET Web API Practice",
              description:
                "正在學習中的後端 API 練習，目標是理解 Web API、資料庫操作與前後端串接流程。",
              techStack: [
                "C#",
                "ASP.NET Core",
                ".NET",
              ],
              focus:
                "練習 RESTful API、Controller、Service、資料模型與基礎後端分層設計。",
              status: "Currently Learning",
            },
            {
              title:
                "Java / Spring Boot Learning Plan",
              description:
                "未來預計學習與實作的後端專案方向，用來補強企業常見後端技術與大型系統架構。",
              techStack: [
                "Java",
                "Spring Boot",
                "Maven",
              ],
              focus:
                "未來預計用來補強後端架構、資料庫設計、API 開發、權限驗證與企業常見技術棧。",
              status: "Future Plan",
            },
          ],
        },
      ],
    },

    learning: {
      eyebrow: "Current Goals",
      title: "目前學習方向",
      paragraphs: [
        "我目前的主要學習重心是 Python、JavaScript、TypeScript 與網頁應用程式開發，並透過 React、Next.js 與互動式介面專案累積實作經驗。相比只做靜態頁面，我更希望能練習資料如何被輸入、整理、搜尋、篩選、呈現與操作。",
        "因為我有圖書資訊背景，所以我特別關注 metadata、資訊組織、檢索、數位典藏與知識管理等主題。這些概念也會持續出現在我的作品中，像是文獻管理、數位典藏審查、資料工作區、檔案整理流程與互動式搜尋介面。",
        "接下來我正在補強 C++、C#、ASP.NET / .NET 與桌面應用開發能力，希望理解不同平台上的應用程式如何設計資料模型、管理狀態、連接資料庫並建立完整操作流程。未來則計畫學習 Java 與 Spring Boot，進一步接觸企業常見後端技術與大型系統架構。",
        "我的作品集希望呈現我能把一個需求拆解成清楚的資料結構、操作流程與介面設計，並透過持續實作，把圖書資訊背景與程式開發能力整合成有主題、有脈絡、也能持續擴充的作品。",
      ],
      items: [
        {
          status: "demonstrated",
          phase: "主力",
          title:
            "Python / JavaScript / TypeScript",
          description:
            "以網頁應用、資料整理、搜尋篩選與互動式介面累積實作經驗。",
          tags: [
            "Python",
            "React",
            "Next.js",
          ],
        },
        {
          status: "demonstrated",
          phase: "領域整合",
          title:
            "圖書資訊與 Metadata",
          description:
            "將資訊組織、檢索、數位典藏與知識管理概念轉換成可操作介面。",
          tags: [
            "Metadata",
            "Retrieval",
            "Archive",
          ],
        },
        {
          status: "building",
          phase: "正在學習",
          title:
            "C++ / C# / .NET",
          description:
            "補強桌面應用、資料庫連接、狀態管理與後端 API 基礎。",
          tags: [
            "C++",
            "C#",
            "ASP.NET Core",
          ],
        },
        {
          status: "planned",
          phase: "未來規劃",
          title:
            "Java / Spring Boot",
          description:
            "未來補強企業常見後端架構、權限驗證、資料庫與 API 設計。",
          tags: [
            "Java",
            "Spring Boot",
            "Maven",
          ],
        },
      ],
    },

    contact: {
      eyebrow: "Contact",
      title:
        "歡迎交流作品與學習方向",
      description:
        "如果你對我的作品、學習歷程或技術方向有興趣，歡迎透過 Email 或 GitHub 與我聯絡。我也很樂意分享專案中的實作過程、資料設計思路與持續學習的紀錄。",
      links: [
        {
          label: "Email",
          href: contactMailto,
          icon: "mail",
          external: true,
        },
        {
          label: "GitHub",
          href: githubProfileUrl,
          icon: "github",
          external: true,
        },
        {
          label: "Resume",
          href: resumePath,
          icon: "file",
          external: true,
        },
        {
          label: "Projects",
          href: "/projects/all",
          icon: "projects",
        },
      ],
    },
  },

  en: {
    seo: {
      title:
        "Justin | Web Development, Data Organization, and LIS Portfolio",
      description:
        "Justin’s portfolio showcasing web application projects built with Python, JavaScript, and TypeScript, with a focus on data organization, metadata, search, digital archives, and library information science concepts.",
    },

    hero: {
      eyebrow:
        "Web Development · Metadata · Digital Archives",
      greeting:
        "Hi, I’m Justin",
      title:
        "I build digital products that connect",
      titleAccent:
        "web development, data organization, and LIS",
      description:
        "I’m Justin, currently building web-related applications with Python, JavaScript, and TypeScript. My projects often combine interface design, data organization, metadata, search, and digital archive concepts from my library information science background. I’m also learning C++, C#, ASP.NET / .NET, and desktop application development to gradually build a broader full-stack foundation.",
      availability:
        "Currently focused on web applications, data organization, interactive interfaces, and LIS-inspired projects",
      ctas: [
        {
          label: "View Projects",
          href: "/projects/all",
          icon: "arrow",
          variant: "primary",
        },
        {
          label: "Contact Me",
          href: "/contact/form",
          icon: "mail",
          variant: "secondary",
        },
        {
          label: "View GitHub",
          href: githubProfileUrl,
          icon: "github",
          variant: "secondary",
          external: true,
        },
      ],
      focusCards: [
        {
          label: "Core Stack",
          value:
            "Python / JavaScript / TypeScript",
        },
        {
          label: "Web",
          value:
            "React / Next.js / Tailwind CSS",
        },
        {
          label: "Domain",
          value:
            "Metadata / Retrieval / LIS",
        },
      ],
    },

    about: {
      eyebrow: "About",
      title: "About Me",
      paragraphs: [
        "I’m Justin, a junior developer currently building practical experience through portfolio projects and learning-focused applications. My current focus is Python, JavaScript, TypeScript, and web application development, especially frontend interfaces, data handling, interaction flows, and application structure.",
        "My background is related to library and information science, so I’m especially interested in how data can be organized, described, classified, searched, and presented. This has shaped many of my project ideas. Instead of building only static pages or isolated features, I try to turn concepts such as metadata, information organization, retrieval, digital archives, knowledge management, and workflows into usable digital products.",
        "At this stage, my main technical focus is Python and web development, including JavaScript, TypeScript, React, Next.js, and interactive interface design. I’m also learning C++, C#, ASP.NET / .NET, and desktop application development. In the future, I plan to study Java and Spring Boot to strengthen my understanding of backend systems, API design, and enterprise application development.",
        "Through this portfolio, I want to show not only which technologies I have used, but also how I understand requirements, organize data, design workflows, and connect my library information background with software development.",
      ],
      cards: [
        {
          icon: "database",
          title:
            "Information Organization and Metadata",
          description:
            "I focus on fields, classification, retrieval, content context, and how digital archive records can become usable interfaces.",
          tags: [
            "Metadata",
            "Search",
            "Digital Archive",
          ],
        },
        {
          icon: "code",
          title:
            "Web Applications and Interaction Flows",
          description:
            "I use React, Next.js, TypeScript, and frontend state design to turn data and workflows into clear product interfaces.",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
          ],
        },
        {
          icon: "box",
          title:
            "Desktop and Backend Learning",
          description:
            "I am building foundations in C++, C#, .NET, Avalonia, Qt, SQLite, and API design for cross-platform applications.",
          tags: [
            "C++",
            "C#",
            ".NET",
          ],
        },
      ],
    },

    skills: {
      eyebrow: "Tech Stack",
      title: "Skills & Tech Stack",
      description:
        "My current learning path focuses on Python, JavaScript, TypeScript, and web application development. I also try to apply concepts from library and information science, including metadata, information organization, search, and digital archives. In parallel, I’m learning C++, C#, ASP.NET / .NET, and desktop application development, with Java and Spring Boot planned as future backend learning goals.",
      groups: [
        {
          title: "Mainly Using",
          categories: [
            {
              title: "Programming",
              items: [
                "Python",
                "JavaScript",
                "TypeScript",
              ],
            },
            {
              title: "Frontend / Web",
              items: [
                "HTML",
                "CSS",
                "React",
                "Next.js",
                "Tailwind CSS",
                "Component-based UI",
                "State Management",
                "Responsive Layout",
              ],
            },
            {
              title:
                "Data / Information Organization",
              items: [
                "Metadata",
                "Data organization",
                "Field and schema design",
                "Search and filtering interfaces",
                "Information classification",
                "Digital archive concepts",
                "Knowledge management interfaces",
                "Basic data visualization",
              ],
            },
            {
              title: "Tools",
              items: [
                "Git",
                "GitHub",
                "VS Code",
                "Linux Development Environment",
              ],
            },
          ],
        },
        {
          title: "Currently Learning",
          categories: [
            {
              title: "Desktop Application",
              items: [
                "C++",
                "C#",
                ".NET",
                "Avalonia UI",
                "Qt",
                "SQLite",
              ],
            },
            {
              title: "Backend / Web API",
              items: [
                "ASP.NET / ASP.NET Core",
                "RESTful API",
                "Database Design",
                "Frontend / Backend Integration",
              ],
            },
          ],
        },
        {
          title: "Future Learning Plan",
          categories: [
            {
              title:
                "Backend / Enterprise Stack",
              items: [
                "Java",
                "Spring Boot",
                "Maven",
                "Layered backend architecture",
                "Authentication / Authorization",
                "Database and API design",
              ],
            },
          ],
        },
      ],
    },

    featured: {
      eyebrow: "Projects",
      title: "Portfolio Projects",
      description:
        "These projects document my current learning and implementation process. Their themes center on web applications, data organization, metadata, digital archives, knowledge management, and interactive interface design. Some are portfolio practice projects, while others are learning projects that I am still expanding.",
      viewAll: "View all projects",
      viewCaseStudy:
        "View case study",
      viewGithub: "View GitHub",
      groups: [
        {
          title: "Web / Frontend Projects",
          description:
            "Frontend practice projects focused on web applications, data organization, workspace interfaces, and digital archive workflows.",
          tags: [
            "React",
            "Next.js",
            "TypeScript",
            "Metadata",
          ],
          projects: [
            {
              title: "Data Narrative Studio",
              slug: "data-narrative-studio",
              description:
                "A web application project focused on data storytelling and interactive visualization, exploring how data can be organized into clear, readable, and interactive experiences.",
              techStack: [
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
              ],
              focus:
                "Practicing data organization, visual presentation, interactive UI design, and ways to help users understand and explore data instead of only viewing it.",
              status:
                "Learning Project / Portfolio Project",
            },
            {
              title: "AI Knowledge Workspace",
              slug: "ai-knowledge-workspace",
              description:
                "A web application project focused on knowledge organization and workspace-style interfaces, with an emphasis on content classification, information structure, and knowledge management workflows.",
              techStack: [
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
              ],
              focus:
                "Practicing workspace UI design, state management, content classification, search and filtering, and information presentation flows.",
              status:
                "Learning Project / Portfolio Project",
            },
            {
              title:
                "Digital Archive Review Board",
              slug:
                "digital-archive-review-board",
              description:
                "A frontend project centered on digital archive review workflows, combining metadata, review status, and structured data fields.",
              techStack: [
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
              ],
              focus:
                "Practicing how to translate digital archive concepts, metadata, review workflows, and state management into usable frontend interfaces.",
              status:
                "Learning Project / Portfolio Project",
            },
          ],
        },
        {
          title:
            "Interactive Web / 3D Web Projects",
          description:
            "Learning projects focused on 3D web scenes, interaction control, camera behavior, and game-like interface prototypes.",
          tags: [
            "Three.js",
            "React Three Fiber",
            "Zustand",
            "Interaction",
          ],
          projects: [
            {
              title: "Lost Yokai Campus RPG",
              slug: "lost-yokai-campus-rpg",
              description:
                "A 3D web interaction project based on campus exploration.",
              techStack: [
                "JavaScript",
                "TypeScript",
                "React",
                "Three.js",
                "React Three Fiber",
              ],
              focus:
                "Practicing 3D scene building, player interaction, camera control, and interactive web experience design.",
              status: "Learning Project",
            },
            {
              title: "Aqua Rush",
              slug: "aqua-rush",
              description:
                "A web project focused on dynamic interaction and 3D scenes.",
              techStack: [
                "TypeScript",
                "React",
                "Three.js",
                "React Three Fiber",
                "Zustand",
              ],
              focus:
                "Practicing real-time interaction, state management, and user interaction flows inside 3D scenes.",
              status: "Learning Project",
            },
            {
              title: "3D Platformer Runner",
              slug: "3d-platformer-runner",
              description:
                "A 3D web game prototype centered on platform movement and runner-style interaction.",
              techStack: [
                "TypeScript",
                "React",
                "Three.js",
              ],
              focus:
                "Practicing player control, scene pacing, interaction feedback, and game-like interface prototyping.",
              status: "Learning Project",
            },
          ],
        },
        {
          title:
            "Desktop / Application Projects",
          description:
            "Learning projects focused on desktop applications, metadata, file organization, literature management, and real-world workflows.",
          tags: [
            "C#",
            ".NET",
            "Avalonia",
            "C++ / Qt",
          ],
          projects: [
            {
              title:
                "Research Paper & Knowledge Workspace",
              slug:
                "research-paper-and-knowledge-workspace",
              description:
                "A desktop application project focused on research papers, knowledge organization, and personal information management.",
              techStack: [
                "C#",
                ".NET",
                "Avalonia",
                "Entity Framework Core",
                "SQLite",
              ],
              focus:
                "Practicing how to turn bibliographic data, research notes, metadata, and knowledge management workflows into a desktop application interface.",
              status:
                "In Progress / Learning Project",
            },
            {
              title: "ArchiveFlow Studio",
              slug: "ArchiveFlow",
              description:
                "A desktop application project centered on metadata, file organization, and visual workflow design.",
              techStack: [
                "C#",
                ".NET",
                "Avalonia",
                "SQLite",
                "Dapper",
              ],
              focus:
                "Practicing C# desktop application structure, SQLite persistence, node-based UI, metadata workflows, and more visual ways to organize files.",
              status:
                "In Progress / Learning Project",
            },
            {
              title: "CafeNet Manager",
              slug: "cafe-net-manager",
              description:
                "A desktop management system project for cafe seating, timed sessions, and operational workflows.",
              techStack: [
                "C++",
                "Qt",
                "SQLite",
                "CMake",
              ],
              focus:
                "Practicing C++ / Qt desktop UI development, database design, seating map interaction, workflow modeling, and CMake project structure.",
              status:
                "In Progress / Learning Project",
            },
          ],
        },
        {
          title:
            "Backend Learning / Future Plan",
          description:
            "Learning directions for strengthening backend APIs, databases, layered architecture, and common enterprise technology stacks.",
          tags: [
            "ASP.NET Core",
            "RESTful API",
            "Java",
            "Spring Boot",
          ],
          projects: [
            {
              title:
                "ASP.NET / .NET Web API Practice",
              description:
                "A backend API learning project focused on understanding Web API development, database operations, and frontend-backend integration.",
              techStack: [
                "C#",
                "ASP.NET Core",
                ".NET",
              ],
              focus:
                "Practicing RESTful APIs, controllers, services, data models, and basic backend layered architecture.",
              status: "Currently Learning",
            },
            {
              title:
                "Java / Spring Boot Learning Plan",
              description:
                "A future backend learning direction for strengthening enterprise backend development skills and larger system architecture.",
              techStack: [
                "Java",
                "Spring Boot",
                "Maven",
              ],
              focus:
                "Planned learning around backend architecture, database design, API development, authentication, authorization, and common enterprise technology stacks.",
              status: "Future Plan",
            },
          ],
        },
      ],
    },

    learning: {
      eyebrow: "Current Goals",
      title: "Current Learning Direction",
      paragraphs: [
        "My current learning focus is Python, JavaScript, TypeScript, and web application development. Through React, Next.js, and interactive interface projects, I’m building practical experience with components, data flow, state management, search, filtering, and user-facing application structure.",
        "Because of my library information science background, I’m especially interested in metadata, information organization, retrieval, digital archives, and knowledge management. These ideas appear throughout my projects, including research paper tools, digital archive review interfaces, workspace-style applications, file organization workflows, and interactive search interfaces.",
        "I’m also learning C++, C#, ASP.NET / .NET, and desktop application development to understand how applications manage data models, state, databases, and user workflows across different platforms. In the future, I plan to study Java and Spring Boot to further explore backend systems and enterprise application architecture.",
        "My goal for this portfolio is to show how I break down requirements into data structures, workflows, and interface designs, while continuously turning my learning into projects that can be explained, improved, and expanded.",
      ],
      items: [
        {
          status: "demonstrated",
          phase: "Core Focus",
          title:
            "Python / JavaScript / TypeScript",
          description:
            "Building practical experience through web applications, data organization, search, filtering, and interactive interfaces.",
          tags: [
            "Python",
            "React",
            "Next.js",
          ],
        },
        {
          status: "demonstrated",
          phase: "Domain Integration",
          title:
            "LIS and Metadata",
          description:
            "Turning information organization, retrieval, digital archives, and knowledge management into usable interfaces.",
          tags: [
            "Metadata",
            "Retrieval",
            "Archive",
          ],
        },
        {
          status: "building",
          phase: "Currently Learning",
          title:
            "C++ / C# / .NET",
          description:
            "Strengthening desktop applications, database connections, state management, and backend API foundations.",
          tags: [
            "C++",
            "C#",
            "ASP.NET Core",
          ],
        },
        {
          status: "planned",
          phase: "Future Plan",
          title:
            "Java / Spring Boot",
          description:
            "Planning to learn common enterprise backend architecture, authentication, databases, and API design.",
          tags: [
            "Java",
            "Spring Boot",
            "Maven",
          ],
        },
      ],
    },

    contact: {
      eyebrow: "Contact",
      title:
        "Let’s Talk About Projects and Learning",
      description:
        "If you’re interested in my projects, learning path, or technical direction, feel free to reach out through Email or GitHub. I’m also happy to share how I design project ideas, structure data, and document my development process.",
      links: [
        {
          label: "Email",
          href: contactMailto,
          icon: "mail",
          external: true,
        },
        {
          label: "GitHub",
          href: githubProfileUrl,
          icon: "github",
          external: true,
        },
        {
          label: "Resume",
          href: resumePath,
          icon: "file",
          external: true,
        },
        {
          label: "Projects",
          href: "/projects/all",
          icon: "projects",
        },
      ],
    },
  },
} as const;

export type HomeContent =
  (typeof homeContent)[HomeLocale];
