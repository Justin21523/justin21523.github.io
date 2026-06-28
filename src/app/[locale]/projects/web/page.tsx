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

interface WebProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Frontend & Web Projects | Justin",
  description: "Browse Justin's frontend, browser UI, and full-stack web application portfolio projects.",
};

export default function WebProjectsPage({
  params,
}: WebProjectsPageProps) {
  return (
    <Suspense fallback={<ProjectArchiveSkeleton />}>
      <ProjectArchiveRoute
        params={params}
        preset="web"
      />
    </Suspense>
  );
}
