import type {
  Metadata,
} from "next";
import {
  ContactCtaSection,
  DomainsSection,
  FeaturedProjectsSection,
  RoadmapSection,
  SkillsEvidenceSection,
} from "@/components/home/home-sections";
import { HeroSection } from "@/components/home/hero-section";

import {
  homeContent,
  siteUrl,
  type HomeLocale,
} from "@/data/home";
import {
  getProjectsBySlugs,
  normalizePortfolioLocale,
} from "@/lib/projects";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale: localeParam } =
    await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    ) as HomeLocale;
  const content =
    homeContent[locale];
  const path =
    locale === "en" ? "/en" : "/zh-TW";

  return {
    title: content.seo.title,
    description:
      content.seo.description,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        "zh-TW": `${siteUrl}/zh-TW`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: content.seo.title,
      description:
        content.seo.description,
      url: `${siteUrl}${path}`,
      siteName: "Justin Portfolio",
      locale:
        locale === "en"
          ? "en_US"
          : "zh_TW",
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale: localeParam } =
    await params;

  const locale =
    normalizePortfolioLocale(
      localeParam
    ) as HomeLocale;

  const content =
    homeContent[locale];
  const featuredProjects =
    getProjectsBySlugs([
      "cafe-net-manager",
      "ArchiveFlow",
      "research-paper-and-knowledge-workspace",
    ]);

  return (
    <main className="overflow-x-clip">
      <HeroSection
        content={content.hero}
      />

      <FeaturedProjectsSection
        content={content.featured}
        projects={featuredProjects}
        locale={locale}
      />

      <DomainsSection
        content={content.about}
      />

      <SkillsEvidenceSection
        content={content.skills}
      />

      <RoadmapSection
        content={content.learning}
      />

      <ContactCtaSection
        content={content.contact}
      />
    </main>
  );
}
