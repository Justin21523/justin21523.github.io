import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { Project } from "@/types/projects";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

// 產生靜態參數 (SSG)
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// 產生 Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Justin Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const t = await getTranslations("projects");
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/projects/all"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回作品集
        </Link>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-5 h-5" />
                {t("viewLive")}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                <Github className="w-5 h-5" />
                {t("viewCode")}
              </a>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-xl font-bold mb-4">{t("techStack")}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-secondary/50 text-secondary-foreground rounded-lg text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Long Description */}
          <div>
            <h2 className="text-xl font-bold mb-4">專案介紹</h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>{project.longDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}