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

interface MobileProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Desktop & Cross-platform Projects | Justin",
  description: "Browse Justin's desktop, GIS, POS, cross-platform, and backend-heavy system tools.",
};

export default function MobileProjectsPage({
  params,
}: MobileProjectsPageProps) {
  return (
    <Suspense fallback={<ProjectArchiveSkeleton />}>
      <ProjectArchiveRoute
        params={params}
        preset="mobile"
      />
    </Suspense>
  );
}
