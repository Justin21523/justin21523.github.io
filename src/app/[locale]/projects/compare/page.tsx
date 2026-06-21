import type {
  Metadata,
} from "next";
import {
  Suspense,
} from "react";

import {
  ProjectCompareClient,
} from "./project-compare-client";

import {
  normalizePortfolioLocale,
} from "@/lib/projects";

import type {
  PortfolioLocale,
} from "@/types/projects";

interface CompareProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: CompareProjectsPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
  } = await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  return {
    title:
      locale === "en"
        ? "Compare Projects | Justin"
        : "作品比較 | Justin",
    description:
      locale === "en"
        ? "Compare project technologies, features, metadata, and development outcomes."
        : "並排比較作品技術、功能、Metadata、能力證據與開發狀態。",
  };
}

export default async function CompareProjectsPage({
  params,
}: CompareProjectsPageProps) {
  const {
    locale: localeParam,
  } = await params;

  const locale =
    normalizePortfolioLocale(
      localeParam
    ) as PortfolioLocale;

  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-28" />
      }
    >
      <ProjectCompareClient
        locale={locale}
      />
    </Suspense>
  );
}
