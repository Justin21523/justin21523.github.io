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

interface DesignProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Information Architecture Projects | Justin",
  description: "Browse Justin's information architecture, archive, search, metadata, and workflow system projects.",
};

export default function DesignProjectsPage({
  params,
}: DesignProjectsPageProps) {
  return (
    <Suspense fallback={<ProjectArchiveSkeleton />}>
      <ProjectArchiveRoute
        params={params}
        preset="design"
      />
    </Suspense>
  );
}
