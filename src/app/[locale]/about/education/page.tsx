import { getTranslations } from "next-intl/server";
import { getAboutData } from "@/data/about";
import { EducationCard } from "@/components/about/education-card";
import { normalizePortfolioLocale } from "@/lib/projects";

interface EducationPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata() {
  const t = await getTranslations("about.education");
  return {
    title: `${t("title")} | Justin Portfolio`,
    description: t("subtitle"),
  };
}

export default async function EducationPage({
  params,
}: EducationPageProps) {
  const { locale: localeParam } =
    await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    );
  const { educations } =
    getAboutData(locale);
  const t = await getTranslations(
    "about.education"
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {educations.map((education, index) => (
            <EducationCard key={index} education={education} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
