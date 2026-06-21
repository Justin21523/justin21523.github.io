"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GitBranch,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
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
        <span className="select-none text-5xl font-bold text-primary/30">
          {content.title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 3)}
        </span>

        <div className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
          {statusLabels[locale][project.status]}
        </div>

        {project.featured && (
          <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {locale === "en" ? "Featured" : "精選"}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
            {project.year}
          </p>

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

          {project.links.find((l) => l.kind === "github")?.url && (
            <a
              href={project.links.find((l) => l.kind === "github")!.url}
              target="_blank"
              rel="noreferrer"
              aria-label={
                locale === "en"
                  ? "Open source code"
                  : "查看原始碼"
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent"
            >
              <GitBranch className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
