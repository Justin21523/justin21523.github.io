"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  GitBranch,
  ImageIcon,
  MonitorPlay,
  PlayCircle,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  getProjectActionLinks,
} from "@/lib/project-links";
import {
  getProjectThumbnailMedia,
  getProjectThumbnailSource,
} from "@/lib/project-media";
import {
  categoryLabels,
} from "@/lib/project-taxonomy";
import {
  withBasePath,
} from "@/lib/site-assets";
import type {
  PortfolioLocale,
  Project,
  ProjectStatus,
} from "@/types/projects";

interface ProjectCardProps {
  project: Project;
  locale: PortfolioLocale;
  index: number;
}

const statusLabels: Record<
  PortfolioLocale,
  Record<ProjectStatus, string>
> = {
  "zh-TW": {
    completed: "已完成",
    "in-progress": "開發中",
    prototype: "原型",
    planned: "規劃中",
    archived: "已封存",
  },
  en: {
    completed: "Completed",
    "in-progress": "In progress",
    prototype: "Prototype",
    planned: "Planned",
    archived: "Archived",
  },
};

export function ProjectCard({
  project,
  locale,
  index,
}: ProjectCardProps) {
  const content = project.content[locale];
  const actions = getProjectActionLinks(project, locale);
  const image = getProjectThumbnailSource(project);
  const thumbnailMedia = getProjectThumbnailMedia(project);
  const imageAlt =
    thumbnailMedia?.alt[locale] ??
    content.title;
  const screenshotCount = project.media.filter((item) => item.type === "image" && !item.placeholder).length;
  const videoCount = project.media.filter((item) => item.type === "video" && !item.placeholder).length;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.06,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative flex min-h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/30">
        {image ? (
          <Image
            src={withBasePath(image) ?? image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="select-none text-5xl font-bold text-primary/30">
            {content.title
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 3)}
          </span>
        )}
        {thumbnailMedia?.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="rounded-full bg-background/90 p-3 text-foreground shadow-lg">
              <PlayCircle className="h-7 w-7" />
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/10" />

        <div className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
          {statusLabels[locale][project.status]}
        </div>

        {project.featured && (
          <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {locale === "en" ? "Featured" : "精選"}
          </div>
        )}

        <div className="absolute bottom-4 left-4 rounded-full border border-background/30 bg-background/85 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
          {categoryLabels[locale][project.category]} · {project.year}
        </div>

        {(screenshotCount > 0 || videoCount > 0) && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            {screenshotCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-background/30 bg-background/85 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                <ImageIcon className="h-3.5 w-3.5" />
                {screenshotCount}
              </span>
            )}

            {videoCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-background/30 bg-background/85 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                <PlayCircle className="h-3.5 w-3.5" />
                {videoCount}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h2 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
            {content.title}
          </h2>

          <p className="text-sm leading-6 text-muted-foreground">
            {content.summary}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies
            .slice(0, 5)
            .map((technology) => (
              <span
                key={technology}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {technology}
              </span>
            ))}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          {actions.map((action) => {
            const Icon = getActionIcon(action.kind);
            if (!action.available) {
              return (
                <span
                  key={action.kind}
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-semibold text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {action.unavailableLabel}
                </span>
              );
            }

            return (
              <a
                key={action.kind}
                href={action.url}
                target={action.url?.startsWith("http") ? "_blank" : undefined}
                rel={action.url?.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-colors hover:bg-accent"
              >
                <Icon className="h-3.5 w-3.5" />
                {action.label}
              </a>
            );
          })}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {locale === "en"
              ? "View case study"
              : "查看專案案例"}

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function getActionIcon(kind: "live" | "github" | "video" | "documentation") {
  switch (kind) {
    case "github":
      return GitBranch;
    case "video":
      return PlayCircle;
    case "documentation":
      return BookOpen;
    case "live":
    default:
      return MonitorPlay;
  }
}
