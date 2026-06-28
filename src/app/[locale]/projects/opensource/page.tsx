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

interface OpensourceProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "GitHub Projects | Justin",
  description: "Browse Justin's portfolio projects with verified public GitHub repository or README access.",
};

export default function OpensourceProjectsPage({
  params,
}: OpensourceProjectsPageProps) {
  return (
    <Suspense fallback={<ProjectArchiveSkeleton />}>
      <ProjectArchiveRoute
        params={params}
        preset="opensource"
      />
    </Suspense>
  );
}
