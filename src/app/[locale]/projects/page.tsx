import type {
  Metadata,
} from "next";

import {
  Suspense,
} from "react";

import {
  ProjectArchiveRoute,
} from "@/components/projects/archive/project-archive-route";
import {
  ProjectArchiveSkeleton,
} from "@/components/projects/archive/project-archive-skeleton";

interface ProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  title:
    "Projects | Justin",
  description:
    "Browse Justin's public portfolio projects, live demos, source links, screenshots, recordings, and case studies.",
};

export default function ProjectsPage({
  params,
}: ProjectsPageProps) {
  return (
    <Suspense
      fallback={
        <ProjectArchiveSkeleton />
      }
    >
      <ProjectArchiveRoute
        params={params}
        preset="all"
      />
    </Suspense>
  );
}
