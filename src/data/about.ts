import type {
  Education,
  Experience,
  ProfileInfo,
  Skill,
} from "@/types/about";
import type {
  PortfolioLocale,
} from "@/types/projects";
import {
  contactEmail,
} from "@/data/contact";

interface AboutData {
  profileInfo: ProfileInfo;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
}

export const aboutData: Record<
  PortfolioLocale,
  AboutData
> = {
  "zh-TW": {
    profileInfo: {
      name: "Justin",
      title:
        "Junior Developer Learner / 國立臺灣大學圖書資訊學系背景",
      location: "Taiwan",
      email: contactEmail,
      bio: [
        "我是 Justin，目前正在透過自學與作品集專案累積程式開發經驗。我的主要學習方向是 Python、JavaScript、TypeScript 與網頁應用開發，並持續練習前端介面、資料整理、互動流程與應用程式架構。",
        "我的學術背景是國立臺灣大學圖書資訊學系，因此我特別關注資料如何被描述、分類、檢索、組織與呈現。這也影響我的作品方向：我希望把 metadata、資訊組織、數位典藏、文獻管理與知識管理等概念，轉換成可以操作、可以擴充的數位工具。",
        "我目前也正在補強 C++、C#、.NET、ASP.NET Core、Avalonia UI、Qt 與 SQLite。這些仍是學習中的技術，我會以桌面應用、後端 API 與資料庫練習作品來逐步累積完整的開發能力。",
      ],
      interests: [
        "圖書資訊",
        "Metadata",
        "資訊組織",
        "數位典藏",
        "文獻管理",
        "網頁應用",
        "桌面應用學習",
        "資料搜尋與篩選",
      ],
      avatar: "",
    },
    skills: [
      {
        name: "Python",
        level: 70,
        proficiency: "主要使用",
        category: "backend",
      },
      {
        name: "JavaScript",
        level: 70,
        proficiency: "主要使用",
        category: "frontend",
      },
      {
        name: "TypeScript",
        level: 65,
        proficiency: "主要使用",
        category: "frontend",
      },
      {
        name: "React",
        level: 60,
        proficiency: "持續練習",
        category: "frontend",
      },
      {
        name: "Next.js",
        level: 60,
        proficiency: "持續練習",
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        level: 60,
        proficiency: "持續練習",
        category: "frontend",
      },
      {
        name: "C# / .NET",
        level: 40,
        proficiency: "正在學習",
        category: "backend",
      },
      {
        name: "C++ / Qt",
        level: 35,
        proficiency: "正在學習",
        category: "backend",
      },
      {
        name: "SQLite",
        level: 45,
        proficiency: "正在學習",
        category: "backend",
      },
      {
        name: "Git / GitHub",
        level: 60,
        proficiency: "日常工具",
        category: "tools",
      },
      {
        name: "VS Code",
        level: 60,
        proficiency: "日常工具",
        category: "tools",
      },
      {
        name: "Linux Development",
        level: 45,
        proficiency: "持續練習",
        category: "tools",
      },
      {
        name: "Metadata Design",
        level: 70,
        proficiency: "背景強項",
        category: "design",
      },
      {
        name: "Search / Filtering UI",
        level: 60,
        proficiency: "作品練習",
        category: "design",
      },
      {
        name: "Information Architecture",
        level: 70,
        proficiency: "背景強項",
        category: "design",
      },
    ],
    experiences: [
      {
        company: "Portfolio Projects",
        position:
          "網頁應用與互動介面練習",
        period: "Currently",
        location: "Self-learning",
        description:
          "透過作品集專案練習 React、Next.js、TypeScript、資料整理、搜尋篩選與互動式介面。",
        achievements: [
          "建立資料敘事、知識工作區、數位典藏審查與 3D Web 互動等主題作品。",
          "練習將資料欄位、狀態管理、使用者流程與 UI 元件拆成可維護的結構。",
          "把圖書資訊背景中的 metadata、分類、檢索與知識組織概念放入作品設計。",
        ],
      },
      {
        company: "Desktop Application Learning",
        position:
          "C# / C++ 桌面應用學習",
        period: "Currently",
        location: "Self-learning",
        description:
          "透過 CafeNet Manager、ArchiveFlow Studio 與 Research Paper & Knowledge Workspace 練習桌面應用、資料庫與工作流程設計。",
        achievements: [
          "用 C#、.NET、Avalonia、SQLite 練習文獻管理、metadata workflow 與數位典藏相關介面。",
          "用 C++、Qt、SQLite 練習座位、計時、訂單與營運流程的桌面管理系統。",
          "理解桌面應用中的資料模型、狀態同步、repository layer 與本機資料儲存。",
        ],
      },
      {
        company: "Library & Information Science Background",
        position:
          "圖書資訊背景與技術轉換",
        period: "Ongoing",
        location: "Learning path",
        description:
          "將圖書資訊領域中的資料組織、metadata、檢索、數位典藏與知識管理概念轉換成軟體作品方向。",
        achievements: [
          "關注資料如何被描述、分類、搜尋、連結與呈現。",
          "將文獻管理、檔案整理、典藏審查與知識工作區作為作品集主題。",
          "持續補強後端 API、資料庫設計與未來 Java / Spring Boot 學習路線。",
        ],
      },
    ],
    educations: [
      {
        school:
          "國立臺灣大學",
        degree: "圖書資訊學系",
        period: "Academic Background",
        description:
          "以資訊組織、metadata、分類、檢索、數位典藏與知識管理作為學術背景，並將這些概念轉換到作品集中的資料整理、搜尋流程與介面設計。",
      },
      {
        school: "Self-directed Programming Learning",
        degree: "程式語言與應用開發自學",
        period: "Currently",
        description:
          "目前主要學習 Python、JavaScript、TypeScript 與 Web 開發，並逐步補強 C++、C#、.NET、ASP.NET Core、Avalonia UI、Qt、SQLite 與後端 API。",
      },
    ],
  },
  en: {
    profileInfo: {
      name: "Justin",
      title:
        "Junior Developer Learner / NTU Library and Information Science Background",
      location: "Taiwan",
      email: contactEmail,
      bio: [
        "I’m Justin, currently building programming experience through self-learning and portfolio projects. My main learning focus is Python, JavaScript, TypeScript, and web application development, especially frontend interfaces, data handling, interaction flows, and application structure.",
        "My academic background is from the Department of Library and Information Science at National Taiwan University, so I’m interested in how data is described, classified, retrieved, organized, and presented. This shapes my project direction: I try to turn metadata, information organization, digital archives, literature management, and knowledge management concepts into usable digital tools.",
        "I’m also learning C++, C#, .NET, ASP.NET Core, Avalonia UI, Qt, and SQLite. These are still learning areas for me, and I use desktop application, backend API, and database practice projects to gradually build broader development skills.",
      ],
      interests: [
        "Library Information Science",
        "Metadata",
        "Information Organization",
        "Digital Archives",
        "Literature Management",
        "Web Applications",
        "Desktop App Learning",
        "Search and Filtering",
      ],
      avatar: "",
    },
    skills: [
      {
        name: "Python",
        level: 70,
        proficiency: "Mainly using",
        category: "backend",
      },
      {
        name: "JavaScript",
        level: 70,
        proficiency: "Mainly using",
        category: "frontend",
      },
      {
        name: "TypeScript",
        level: 65,
        proficiency: "Mainly using",
        category: "frontend",
      },
      {
        name: "React",
        level: 60,
        proficiency: "Practicing",
        category: "frontend",
      },
      {
        name: "Next.js",
        level: 60,
        proficiency: "Practicing",
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        level: 60,
        proficiency: "Practicing",
        category: "frontend",
      },
      {
        name: "C# / .NET",
        level: 40,
        proficiency: "Currently learning",
        category: "backend",
      },
      {
        name: "C++ / Qt",
        level: 35,
        proficiency: "Currently learning",
        category: "backend",
      },
      {
        name: "SQLite",
        level: 45,
        proficiency: "Currently learning",
        category: "backend",
      },
      {
        name: "Git / GitHub",
        level: 60,
        proficiency: "Daily tool",
        category: "tools",
      },
      {
        name: "VS Code",
        level: 60,
        proficiency: "Daily tool",
        category: "tools",
      },
      {
        name: "Linux Development",
        level: 45,
        proficiency: "Practicing",
        category: "tools",
      },
      {
        name: "Metadata Design",
        level: 70,
        proficiency: "Background strength",
        category: "design",
      },
      {
        name: "Search / Filtering UI",
        level: 60,
        proficiency: "Project practice",
        category: "design",
      },
      {
        name: "Information Architecture",
        level: 70,
        proficiency: "Background strength",
        category: "design",
      },
    ],
    experiences: [
      {
        company: "Portfolio Projects",
        position:
          "Web Application and Interactive UI Practice",
        period: "Currently",
        location: "Self-learning",
        description:
          "I practice React, Next.js, TypeScript, data organization, search/filtering, and interactive interfaces through portfolio projects.",
        achievements: [
          "Built learning projects around data storytelling, knowledge workspaces, digital archive review, and 3D web interaction.",
          "Practiced turning data fields, state management, user flows, and UI components into maintainable structures.",
          "Applied metadata, classification, retrieval, and knowledge organization ideas from my LIS background.",
        ],
      },
      {
        company: "Desktop Application Learning",
        position:
          "C# / C++ Desktop Application Learning",
        period: "Currently",
        location: "Self-learning",
        description:
          "I use CafeNet Manager, ArchiveFlow Studio, and Research Paper & Knowledge Workspace to practice desktop applications, databases, and workflow design.",
        achievements: [
          "Practiced literature management, metadata workflows, and digital archive interfaces with C#, .NET, Avalonia, and SQLite.",
          "Practiced a desktop operations system with C++, Qt, SQLite, seating, timed sessions, orders, and workflow modeling.",
          "Studied data models, state synchronization, repository layers, and local persistence in desktop applications.",
        ],
      },
      {
        company: "Library & Information Science Background",
        position:
          "LIS Background and Technical Transition",
        period: "Ongoing",
        location: "Learning path",
        description:
          "I translate concepts from information organization, metadata, retrieval, digital archives, and knowledge management into software project ideas.",
        achievements: [
          "Focus on how data can be described, classified, searched, linked, and presented.",
          "Use literature management, file organization, archive review, and knowledge workspaces as portfolio themes.",
          "Continue strengthening backend APIs, database design, and future Java / Spring Boot learning plans.",
        ],
      },
    ],
    educations: [
      {
        school:
          "National Taiwan University",
        degree:
          "Department of Library and Information Science",
        period: "Academic Background",
        description:
          "Academic background in information organization, metadata, classification, retrieval, digital archives, and knowledge management, now applied to data organization, search workflows, and interface design in portfolio projects.",
      },
      {
        school: "Self-directed Programming Learning",
        degree:
          "Programming language and application development learning",
        period: "Currently",
        description:
          "Currently focusing on Python, JavaScript, TypeScript, and web development while gradually learning C++, C#, .NET, ASP.NET Core, Avalonia UI, Qt, SQLite, and backend APIs.",
      },
    ],
  },
};

export function getAboutData(
  locale: PortfolioLocale
) {
  return aboutData[locale];
}

export const {
  profileInfo,
  skills,
  experiences,
  educations,
} = aboutData["zh-TW"];
