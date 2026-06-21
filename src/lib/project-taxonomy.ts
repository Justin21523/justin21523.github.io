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
    archived: "已封存",
  },

  en: {
    completed: "Completed",
    "in-progress": "In progress",
    prototype: "Prototype",
    planned: "Planned",
    archived: "Archived",
  },
};
