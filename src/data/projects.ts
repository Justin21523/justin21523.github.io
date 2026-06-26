import projectCatalog from "@/generated/project-catalog.json";
import type { Project } from "@/types/projects";

const catalog = projectCatalog as Project[];
const priorityProjectSlugs = [
  "openalex-research-rag",
  "music-intelligence-platform",
];

function getPriorityRank(project: Project) {
  const index = priorityProjectSlugs.indexOf(project.slug);

  return index === -1
    ? Number.POSITIVE_INFINITY
    : index;
}

export const projects = catalog
  .filter((project) => project.metadata.visibility === "public")
  .sort((a, b) => {
    const priorityDelta = getPriorityRank(a) - getPriorityRank(b);

    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.year !== b.year) {
      return b.year - a.year;
    }

    return a.content["zh-TW"].title.localeCompare(
      b.content["zh-TW"].title,
      "zh-TW"
    );
  });
