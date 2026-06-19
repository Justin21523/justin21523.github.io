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
  type HomeLocale,
} from "@/data/home";
import {
  getFeaturedProjects,
  normalizePortfolioLocale,
} from "@/lib/projects";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
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
    getFeaturedProjects().slice(
      0,
      3
    );

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
        content={content.domains}
      />

      <SkillsEvidenceSection
        content={content.skills}
      />

      <RoadmapSection
        content={content.roadmap}
      />

      <ContactCtaSection
        content={content.contact}
      />
    </main>
  );
}