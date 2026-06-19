import type {
  Metadata,
} from "next";

import {
  Suspense,
} from "react";

import {
  ProjectExplorer,
} from "@/components/projects/archive/project-explorer";

import {
  projects,
} from "@/data/projects";

import {
  normalizePortfolioLocale,
} from "@/lib/projects";

interface AllProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  title:
    "Project Archive | Justin",
  description:
    "Browse Justin's projects by technology, domain, platform, capability, and development status.",
};

export default async function AllProjectsPage({
  params,
}: AllProjectsPageProps) {
  const {
    locale: localeParam,
  } = await params;

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  return (
    <Suspense
      fallback={
        <ProjectExplorerSkeleton />
      }
    >
      <ProjectExplorer
        projects={projects}
        locale={locale}
      />
    </Suspense>
  );
}

function ProjectExplorerSkeleton() {
  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="section-shell">
        <div className="mx-auto mb-12 h-36 max-w-3xl animate-pulse rounded-3xl bg-secondary" />

        <div className="mb-10 h-40 animate-pulse rounded-3xl bg-secondary" />

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-[32rem] animate-pulse rounded-3xl bg-secondary"
            />
          ))}
        </div>
      </div>
    </main>
  );
}