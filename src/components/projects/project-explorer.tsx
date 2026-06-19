"use client";

import {
  useMemo,
  useState,
} from "react";
import { useLocale } from "next-intl";
import {
  Search,
  X,
} from "lucide-react";

import { projects } from "@/data/projects";
import { normalizePortfolioLocale } from "@/lib/projects";
import type {
  ProjectCategory,
} from "@/types/projects";

import { ProjectCard } from "./project-card";

type CategoryFilter =
  | "all"
  | ProjectCategory;

const categoryValues: CategoryFilter[] = [
  "all",
  "information-system",
  "interactive-3d",
  "ai-data",
  "frontend",
  "backend-desktop",
];

const labels = {
  "zh-TW": {
    title: "作品與實作案例",
    subtitle:
      "從資訊系統、3D Web 到 AI 與前端應用，查看我的實際開發歷程。",
    search: "搜尋作品、技術或功能",
    empty: "找不到符合條件的作品。",
    clear: "清除搜尋",
    categories: {
      all: "全部",
      "information-system": "資訊系統",
      "interactive-3d": "3D 與互動",
      "ai-data": "AI 與資料",
      frontend: "前端應用",
      "backend-desktop": "後端與桌面",
    },
  },

  en: {
    title: "Projects and Case Studies",
    subtitle:
      "Explore my work across information systems, interactive 3D, AI, data, and frontend development.",
    search: "Search projects, technologies, or features",
    empty: "No projects match the current filters.",
    clear: "Clear search",
    categories: {
      all: "All",
      "information-system": "Information Systems",
      "interactive-3d": "3D & Interactive",
      "ai-data": "AI & Data",
      frontend: "Frontend",
      "backend-desktop": "Backend & Desktop",
    },
  },
} as const;

export function ProjectExplorer() {
  const currentLocale = useLocale();
  const locale =
    normalizePortfolioLocale(currentLocale);

  const text = labels[locale];

  const [category, setCategory] =
    useState<CategoryFilter>("all");

  const [query, setQuery] =
    useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return projects.filter((project) => {
      const content =
        project.content[locale];

      const matchesCategory =
        category === "all" ||
        project.category === category;

      const searchableText = [
        content.title,
        content.summary,
        content.description,
        ...content.highlights,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        searchableText.includes(
          normalizedQuery
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    category,
    locale,
    query,
  ]);

  return (
    <main className="min-h-screen px-4 pb-20 pt-28">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {text.title}
          </h1>

          <p className="text-lg leading-8 text-muted-foreground">
            {text.subtitle}
          </p>
        </header>

        <section
          aria-label={
            locale === "en"
              ? "Project filters"
              : "作品篩選"
          }
          className="mb-10"
        >
          <div className="mx-auto mb-6 flex max-w-2xl items-center gap-2 rounded-xl border border-border bg-card px-4">
            <Search className="h-5 w-5 text-muted-foreground" />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder={text.search}
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={text.clear}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categoryValues.map(
              (categoryValue) => (
                <button
                  key={categoryValue}
                  type="button"
                  onClick={() =>
                    setCategory(
                      categoryValue
                    )
                  }
                  aria-pressed={
                    category ===
                    categoryValue
                  }
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    category ===
                    categoryValue
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {
                    text.categories[
                      categoryValue
                    ]
                  }
                </button>
              )
            )}
          </div>
        </section>

        {filteredProjects.length > 0 ? (
          <section className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map(
              (project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  index={index}
                />
              )
            )}
          </section>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
            {text.empty}
          </div>
        )}
      </div>
    </main>
  );
}