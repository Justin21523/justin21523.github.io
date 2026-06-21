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

export function getProjectsBySlugs(
  slugs: string[]
): Project[] {
  return projects.filter((project) =>
    slugs.includes(project.slug)
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