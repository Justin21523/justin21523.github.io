import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

export type ProjectArchivePreset =
  | "all"
  | "web"
  | "design"
  | "mobile"
  | "opensource";

type ArchiveCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export function getProjectsForArchivePreset(
  preset: ProjectArchivePreset,
  projects: Project[]
) {
  switch (preset) {
    case "web":
      return projects.filter(isWebProject);
    case "design":
      return projects.filter(isInformationArchitectureProject);
    case "mobile":
      return projects.filter(isDesktopOrCrossPlatformProject);
    case "opensource":
      return projects.filter(hasPublicGitHubSource);
    case "all":
    default:
      return projects;
  }
}

export function getArchivePresetCopy(
  preset: ProjectArchivePreset,
  locale: PortfolioLocale
): ArchiveCopy {
  const copies: Record<ProjectArchivePreset, Record<PortfolioLocale, ArchiveCopy>> = {
    all: {
      en: {
        eyebrow: "Project Archive",
        title: "Explore all projects",
        description: "Browse the complete public portfolio catalog with verified screenshots, recordings, source links, and case studies.",
      },
      "zh-TW": {
        eyebrow: "Project Archive",
        title: "瀏覽所有作品",
        description: "完整瀏覽公開作品集目錄，包含已驗證截圖、錄影、原始碼連結與案例頁。",
      },
    },
    web: {
      en: {
        eyebrow: "Web Projects",
        title: "Frontend and web applications",
        description: "React, Next.js, Vite, browser UI, and full-stack web experiences selected from the full portfolio catalog.",
      },
      "zh-TW": {
        eyebrow: "Web Projects",
        title: "前端與 Web 應用",
        description: "從完整作品集中分流出的 React、Next.js、Vite、瀏覽器 UI 與全端 Web 作品。",
      },
    },
    design: {
      en: {
        eyebrow: "Information Architecture",
        title: "Information, archive, and workflow systems",
        description: "Library science, metadata, search, archive, research, knowledge, and workflow-oriented projects.",
      },
      "zh-TW": {
        eyebrow: "Information Architecture",
        title: "資訊架構、典藏與工作流程",
        description: "圖書資訊、metadata、搜尋、典藏、研究、知識管理與工作流程導向作品。",
      },
    },
    mobile: {
      en: {
        eyebrow: "Desktop and Cross-platform",
        title: "Desktop, GIS, POS, and system tools",
        description: "Cross-platform desktop applications, native tools, GIS utilities, POS systems, and backend-heavy operational software.",
      },
      "zh-TW": {
        eyebrow: "Desktop and Cross-platform",
        title: "桌面、GIS、POS 與系統工具",
        description: "跨平台桌面應用、原生工具、GIS、POS 與偏後端的營運系統作品。",
      },
    },
    opensource: {
      en: {
        eyebrow: "GitHub Projects",
        title: "Projects with public source access",
        description: "Portfolio projects that expose a verified GitHub repository or README link for source-level review.",
      },
      "zh-TW": {
        eyebrow: "GitHub Projects",
        title: "可公開檢視原始碼的作品",
        description: "具有已驗證 GitHub repository 或 README 連結、可供面試官檢視程式碼的作品。",
      },
    },
  };

  return copies[preset][locale];
}

function isWebProject(project: Project) {
  return (
    project.category === "frontend" ||
    project.category === "information-system" ||
    hasAnyTerm(project, [
      "react",
      "next.js",
      "vite",
      "vue",
      "tailwind",
      "browser",
      "web app",
      "web application",
      "full-stack",
      "frontend",
    ])
  );
}

function isInformationArchitectureProject(project: Project) {
  return (
    project.category === "information-system" ||
    hasAnyTerm(project, [
      "archive",
      "library",
      "catalog",
      "metadata",
      "knowledge",
      "research",
      "retrieval",
      "search",
      "workflow",
      "lms",
      "heritage",
      "information",
    ])
  );
}

function isDesktopOrCrossPlatformProject(project: Project) {
  return (
    project.category === "backend-desktop" ||
    hasAnyTerm(project, [
      "desktop",
      "cross-platform",
      "avalonia",
      "qt",
      "native",
      "pos",
      "gis",
      "system tool",
      "backend",
      "cli",
    ])
  );
}

function hasPublicGitHubSource(project: Project) {
  return (
    Boolean(project.githubUrl && /^https:\/\/github\.com\//i.test(project.githubUrl)) ||
    project.links.some((link) => link.kind === "github" && /^https:\/\/github\.com\//i.test(link.url))
  );
}

function hasAnyTerm(project: Project, terms: string[]) {
  const source = [
    project.category,
    project.metadata.projectType,
    ...project.technologies,
    ...project.metadata.domains,
    ...project.metadata.capabilities,
    ...project.metadata.keywords,
    ...project.metadata.platforms,
    ...(project.metadata.frameworks ?? []),
    ...(project.metadata.desktop ?? []),
    project.content.en.title,
    project.content.en.summary,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return terms.some((term) => source.includes(term));
}
