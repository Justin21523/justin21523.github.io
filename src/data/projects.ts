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