import type { PortfolioLocale, Project, ProjectLinkKind } from "@/types/projects";

export type ProjectActionKind = "live" | "github" | "video" | "documentation";

export interface ProjectActionLink {
  kind: ProjectActionKind;
  label: string;
  unavailableLabel: string;
  url?: string;
  available: boolean;
}

const actionOrder: ProjectActionKind[] = ["live", "github", "video", "documentation"];

const labels: Record<PortfolioLocale, Record<ProjectActionKind, { available: string; unavailable: string }>> = {
  en: {
    live: { available: "Live Demo", unavailable: "Portfolio Case Study Demo" },
    github: { available: "GitHub", unavailable: "GitHub pending" },
    video: { available: "Demo Video", unavailable: "Video pending" },
    documentation: { available: "README", unavailable: "README pending" },
  },
  "zh-TW": {
    live: { available: "Live Demo", unavailable: "Demo 準備中" },
    github: { available: "GitHub", unavailable: "GitHub 待補" },
    video: { available: "Demo 影片", unavailable: "影片待補" },
    documentation: { available: "README", unavailable: "README 待補" },
  },
};

function isFallbackLink(project: Project, kind: ProjectActionKind, url: string | undefined) {
  return Boolean(url && url === `/projects/${project.slug}#${kind === "live" ? "demo-guide" : kind === "github" ? "source-access" : kind === "video" ? "demo-video" : "readme-guide"}`);
}

export function getProjectActionLinks(project: Project, locale: PortfolioLocale): ProjectActionLink[] {
  return actionOrder.map((kind) => {
    const link = project.links.find((item) => item.kind === kind);
    const fallback = labels[locale][kind];
    const fallbackUrls: Record<ProjectActionKind, string> = {
      live: `/projects/${project.slug}#demo-guide`,
      github: `/projects/${project.slug}#source-access`,
      video: `/projects/${project.slug}#demo-video`,
      documentation: `/projects/${project.slug}#readme-guide`,
    };
    const url = link?.url ?? fallbackUrls[kind];
    const fallbackLink = isFallbackLink(project, kind, url);
    const available = kind === "live" ? Boolean(url) : Boolean(url && !fallbackLink);
    const fallbackLabels: Record<ProjectActionKind, string> = {
      live: locale === "en" ? "Portfolio Case Study Demo" : "作品集案例 Demo",
      github: fallback.unavailable,
      video: fallback.unavailable,
      documentation: fallback.unavailable,
    };

    return {
      kind,
      label: fallbackLink ? fallbackLabels[kind] : link?.label[locale] ?? fallback.available,
      unavailableLabel: fallback.unavailable,
      url: available ? url : undefined,
      available,
    };
  });
}

export function getProjectLink(project: Project, kind: ProjectLinkKind) {
  return project.links.find((link) => link.kind === kind);
}
