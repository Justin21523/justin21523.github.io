import { getTranslations } from "next-intl/server";
import { getAboutData } from "@/data/about";
import { SkillsSection } from "@/components/about/skills-section";
import { normalizePortfolioLocale } from "@/lib/projects";

interface SkillsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata() {
  const t = await getTranslations("about.skills");
  return {
    title: `${t("title")} | Justin Portfolio`,
    description: t("subtitle"),
  };
}

export default async function SkillsPage({
  params,
}: SkillsPageProps) {
  const { locale: localeParam } =
    await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    );
  const { skills } =
    getAboutData(locale);
  const t = await getTranslations(
    "about.skills"
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Skills */}
        <SkillsSection skills={skills} />
      </div>
    </div>
  );
}
