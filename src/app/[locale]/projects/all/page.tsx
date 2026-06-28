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

interface AllProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  title:
    "Project Archive | Justin",
  description:
    "Browse Justin's complete public portfolio catalog with verified screenshots, recordings, source links, and case studies.",
};

export default function AllProjectsPage({
  params,
}: AllProjectsPageProps) {
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
