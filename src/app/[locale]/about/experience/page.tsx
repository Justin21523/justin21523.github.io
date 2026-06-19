import { getTranslations } from "next-intl/server";
import { experiences } from "@/data/about";
import { TimelineItem } from "@/components/about/timeline-item";

export async function generateMetadata() {
  const t = await getTranslations("about.experience");
  return {
    title: `${t("title")} | Justin Portfolio`,
    description: t("subtitle"),
  };
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            工作經歷
          </h1>
          <p className="text-lg text-muted-foreground">
            我的職業歷程
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <TimelineItem key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}