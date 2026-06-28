import {
  Suspense,
} from "react";

import {
  ProjectExplorer,
} from "@/components/projects/archive/project-explorer";
import {
  ProjectArchiveSkeleton,
} from "@/components/projects/archive/project-archive-skeleton";
import {
  projects,
} from "@/data/projects";
import {
  getArchivePresetCopy,
  getProjectsForArchivePreset,
  type ProjectArchivePreset,
} from "@/lib/project-archive-presets";
import {
  normalizePortfolioLocale,
} from "@/lib/projects";

interface ProjectArchiveRouteProps {
  params: Promise<{
    locale: string;
  }>;
  preset: ProjectArchivePreset;
}

export async function ProjectArchiveRoute({
  params,
  preset,
}: ProjectArchiveRouteProps) {
  const {
    locale: localeParam,
  } = await params;

  const locale =
    normalizePortfolioLocale(
      localeParam
    );
  const archiveProjects =
    getProjectsForArchivePreset(
      preset,
      projects
    );

  return (
    <Suspense fallback={<ProjectArchiveSkeleton />}>
      <ProjectExplorer
        projects={archiveProjects}
        locale={locale}
        archiveCopy={getArchivePresetCopy(preset, locale)}
      />
    </Suspense>
  );
}
