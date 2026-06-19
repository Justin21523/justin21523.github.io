"use client";

import {
  BarChart3,
  Boxes,
  Code2,
  ImageIcon,
} from "lucide-react";

import {
  m,
} from "motion/react";

import {
  categoryLabels,
} from "@/lib/project-taxonomy";

import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
} from "@/types/projects";

interface ProjectArchiveOverviewProps {
  projects: Project[];
  locale: PortfolioLocale;
}

const categories: ProjectCategory[] =
  [
    "information-system",
    "interactive-3d",
    "ai-data",
    "frontend",
    "backend-desktop",
  ];

export function ProjectArchiveOverview({
  projects,
  locale,
}: ProjectArchiveOverviewProps) {
  const technologies =
    new Set(
      projects.flatMap(
        (project) =>
          project.technologies
      )
    );

  const totalMedia =
    projects.reduce(
      (
        total,
        project
      ) =>
        total +
        project.media.length,
      0
    );

  const activeProjects =
    projects.filter(
      (project) =>
        project.status ===
          "in-progress" ||
        project.status ===
          "prototype"
    ).length;

  const categoryCounts =
    categories.map(
      (category) => ({
        category,

        count:
          projects.filter(
            (project) =>
              project.category ===
              category
          ).length,
      })
    );

  const largestCount =
    Math.max(
      1,
      ...categoryCounts.map(
        (item) =>
          item.count
      )
    );

  const cards = [
    {
      label:
        locale === "en"
          ? "Projects"
          : "作品總數",

      value:
        projects.length,

      icon: Boxes,
    },

    {
      label:
        locale === "en"
          ? "Active builds"
          : "持續開發",

      value:
        activeProjects,

      icon: BarChart3,
    },

    {
      label:
        locale === "en"
          ? "Technologies"
          : "技術類型",

      value:
        technologies.size,

      icon: Code2,
    },

    {
      label:
        locale === "en"
          ? "Media assets"
          : "媒體內容",

      value:
        totalMedia,

      icon: ImageIcon,
    },
  ];

  return (
    <section className="mb-10">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(
          (
            card,
            index
          ) => {
            const Icon =
              card.icon;

            return (
              <m.article
                key={
                  card.label
                }
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    0.08 +
                    index *
                      0.07,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                }}
                className="group rounded-2xl border border-border bg-card p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:rotate-3 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="text-3xl font-bold tracking-tight">
                    {card.value}
                  </span>
                </div>

                <p className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
              </m.article>
            );
          }
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        <div className="mb-6">
          <h2 className="font-bold">
            {locale === "en"
              ? "Project distribution"
              : "作品分類分布"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "en"
              ? "Distribution based on project metadata categories."
              : "依照 Metadata 分類呈現目前作品分布。"}
          </p>
        </div>

        <div className="space-y-4">
          {categoryCounts.map(
            (
              item,
              index
            ) => {
              const percentage =
                item.count === 0
                  ? 0
                  : Math.max(
                      8,
                      (
                        item.count /
                        largestCount
                      ) * 100
                    );

              return (
                <div
                  key={
                    item.category
                  }
                  className="grid items-center gap-3 sm:grid-cols-[12rem_1fr_2rem]"
                >
                  <p className="text-sm font-medium">
                    {
                      categoryLabels[
                        locale
                      ][
                        item.category
                      ]
                    }
                  </p>

                  <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                    <m.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width:
                          `${percentage}%`,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration:
                          0.7,

                        delay:
                          index *
                          0.08,

                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>

                  <span className="text-right text-sm font-bold">
                    {item.count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}