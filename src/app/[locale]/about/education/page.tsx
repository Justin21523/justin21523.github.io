import { getTranslations } from "next-intl/server";
import { educations } from "@/data/about";
import { EducationCard } from "@/components/about/education-card";

export async function generateMetadata() {
  const t = await getTranslations("about.education");
  return {
    title: `${t("title")} | Justin Portfolio`,
    description: t("subtitle"),
  };
}

export default function EducationPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            教育背景
          </h1>
          <p className="text-lg text-muted-foreground">
            學歷與學習經歷
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