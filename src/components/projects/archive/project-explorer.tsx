"use client";

import {
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Check,
  Filter,
  Grid2X2,
  List,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  LayoutGroup,
  m,
} from "motion/react";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";

import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
  ProjectStatus,
} from "@/types/projects";

import {
  ProjectArchiveCard,
  type ProjectViewMode,
} from "./project-archive-card";

import {
  ProjectPreviewDialog,
} from "./project-preview-dialog";

import {
  Heart,
} from "lucide-react";

import {
  ProjectArchiveOverview,
} from "./project-archive-overview";

import {
  ProjectCompareBar,
} from "@/components/projects/compare/project-compare-bar";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import {
  useMounted,
} from "@/hooks/use-mounted";

interface ProjectExplorerProps {
  projects: Project[];
  locale: PortfolioLocale;
}

type ProjectSort =
  | "featured"
  | "newest"
  | "oldest"
  | "title";

const categories: ProjectCategory[] =
  [
    "information-system",
    "interactive-3d",
    "ai-data",
    "frontend",
    "backend-desktop",
  ];

const statuses: ProjectStatus[] =
  [
    "completed",
    "in-progress",
    "prototype",
    "planned",
  ];

export function ProjectExplorer({
  projects,
  locale,
}: ProjectExplorerProps) {

    const mounted =
    useMounted();

    const favoriteSlugs =
    useProjectPreferences(
        (state) =>
        state.favoriteSlugs
    );

    const favoritesOnly =
    searchParams.get(
        "favorites"
    ) === "1";
    
  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(true);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<Project | null>(
    null
  );

  const query =
    searchParams.get("q") ?? "";

  const category =
    parseCategory(
      searchParams.get(
        "category"
      )
    );

  const status =
    parseStatus(
      searchParams.get("status")
    );

  const technologies =
    searchParams.getAll("tech");

  const sort =
    parseSort(
      searchParams.get("sort")
    );

  const viewMode =
    parseViewMode(
      searchParams.get("view")
    );

  const technologyOptions =
    useMemo(() => {
      const counts =
        new Map<string, number>();

      projects.forEach(
        (project) => {
          project.technologies.forEach(
            (technology) => {
              counts.set(
                technology,
                (counts.get(
                  technology
                ) ?? 0) + 1
              );
            }
          );
        }
      );

      return Array.from(
        counts.entries()
      )
        .sort((a, b) => {
          if (b[1] !== a[1]) {
            return b[1] - a[1];
          }

          return a[0].localeCompare(
            b[0]
          );
        })
        .map(
          ([
            name,
            count,
          ]) => ({
            name,
            count,
          })
        );
    }, [projects]);

  const filteredProjects =
    useMemo(() => {
      const normalizedQuery =
        query
          .trim()
          .toLowerCase();

      const filtered =
        projects.filter(
          (project) => {
            const content =
              project.content[
                locale
              ];

            const matchesCategory =
              !category ||
              project.category ===
                category;

            const matchesStatus =
              !status ||
              project.status ===
                status;

            const matchesTechnology =
              technologies.length ===
                0 ||
              technologies.every(
                (technology) =>
                  project.technologies.includes(
                    technology
                  )
              );

            const featureText =
              (
                content.features ??
                []
              )
                .flatMap(
                  (feature) => [
                    feature.title,
                    feature.description,
                    ...(
                      feature.bullets ??
                      []
                    ),
                  ]
                )
                .join(" ");

            const searchableText =
              [
                content.title,
                content.tagline,
                content.summary,
                content.description,
                content.role,
                content.problem,
                content.solution,
                content.outcome,
                ...content.highlights,
                ...content.challenges,
                ...content.nextSteps,
                featureText,
                ...project.technologies,
                ...project
                  .metadata
                  .domains,
                ...project
                  .metadata
                  .capabilities,
                ...project
                  .metadata
                  .keywords,
                ...project
                  .metadata
                  .platforms,
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch =
              normalizedQuery
                .length === 0 ||
              searchableText.includes(
                normalizedQuery
              );

            return (
              matchesCategory &&
              matchesStatus &&
              matchesTechnology &&
              matchesSearch
            );
          }
        );

      return filtered.sort(
        (a, b) => {
          switch (sort) {
            case "newest":
              return (
                new Date(
                  b.metadata.updatedAt
                ).getTime() -
                new Date(
                  a.metadata.updatedAt
                ).getTime()
              );

            case "oldest":
              return (
                new Date(
                  a.metadata.updatedAt
                ).getTime() -
                new Date(
                  b.metadata.updatedAt
                ).getTime()
              );

            case "title":
              return a.content[
                locale
              ].title.localeCompare(
                b.content[
                  locale
                ].title,
                locale
              );

            case "featured":
            default:
              if (
                a.featured !==
                b.featured
              ) {
                return a.featured
                  ? -1
                  : 1;
              }

              return (
                b.year -
                a.year
              );
          }
        }
      );
    }, [
      category,
      locale,
      projects,
      query,
      sort,
      status,
      technologies,
    ]);

  function replaceParams(
    mutate: (
      params: URLSearchParams
    ) => void
  ) {
    const nextParams =
      new URLSearchParams(
        searchParams.toString()
      );

    mutate(nextParams);

    const queryString =
      nextParams.toString();

    startTransition(() => {
      router.replace(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        {
          scroll: false,
        }
      );
    });
  }

  function setSingleParam(
    key: string,
    value?: string
  ) {
    replaceParams((params) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });
  }

  function toggleTechnology(
    technology: string
  ) {
    replaceParams((params) => {
      const current =
        params.getAll("tech");

      const next =
        current.includes(
          technology
        )
          ? current.filter(
              (item) =>
                item !== technology
            )
          : [
              ...current,
              technology,
            ];

      params.delete("tech");

      next.forEach((item) => {
        params.append(
          "tech",
          item
        );
      });
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.replace(pathname, {
        scroll: false,
      });
    });
  }

  const activeFilterCount =
    Number(Boolean(query)) +
    Number(Boolean(category)) +
    Number(Boolean(status)) +
    technologies.length;

  const text =
    locale === "en"
      ? {
          eyebrow:
            "Project Archive",
          title:
            "Explore all projects",
          description:
            "Search and filter projects by domain, technology, platform, status, and capability.",
          search:
            "Search projects, technologies, metadata, or features",
          filters: "Filters",
          clear: "Clear all",
          category: "Category",
          status: "Status",
          technology:
            "Technologies",
          all: "All",
          results: "projects",
          noResults:
            "No projects match the current filters.",
          sort: "Sort",
        }
      : {
          eyebrow:
            "Project Archive",
          title:
            "瀏覽所有作品",
          description:
            "依照領域、技術、平台、狀態與能力 Metadata 搜尋和篩選專案。",
          search:
            "搜尋作品、技術、Metadata 或功能",
          filters: "篩選條件",
          clear: "全部清除",
          category: "專案分類",
          status: "完成狀態",
          technology:
            "使用技術",
          all: "全部",
          results: "個作品",
          noResults:
            "找不到符合目前條件的作品。",
          sort: "排序方式",
        };

  return (
    <>
      <main className="min-h-screen pb-24 pt-28">
        <div className="section-shell">
          <m.header
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mx-auto mb-12 max-w-4xl text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {text.eyebrow}
            </p>

            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {text.title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              {text.description}
            </p>
          </m.header>

          <section className="mb-8 rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 xl:flex-row">
              <label className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-border bg-background px-4 focus-within:ring-2 focus-within:ring-primary/30">
                <Search className="h-5 w-5 text-muted-foreground" />

                <input
                  value={query}
                  onChange={(
                    event
                  ) =>
                    setSingleParam(
                      "q",
                      event.target
                        .value ||
                        undefined
                    )
                  }
                  placeholder={
                    text.search
                  }
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() =>
                      setSingleParam(
                        "q"
                      )
                    }
                    aria-label={
                      text.clear
                    }
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFiltersOpen(
                      (current) =>
                        !current
                    )
                  }
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-border px-4 font-medium transition-colors hover:bg-accent"
                >
                  <Filter className="h-4 w-4" />

                  {text.filters}

                  {activeFilterCount >
                    0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {
                        activeFilterCount
                      }
                    </span>
                  )}
                </button>

                <select
                  value={sort}
                  onChange={(
                    event
                  ) =>
                    setSingleParam(
                      "sort",
                      event.target
                        .value
                    )
                  }
                  aria-label={
                    text.sort
                  }
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none"
                >
                  <option value="featured">
                    {locale ===
                    "en"
                      ? "Featured"
                      : "精選優先"}
                  </option>

                  <option value="newest">
                    {locale ===
                    "en"
                      ? "Recently updated"
                      : "最近更新"}
                  </option>

                  <option value="oldest">
                    {locale ===
                    "en"
                      ? "Oldest first"
                      : "最早優先"}
                  </option>

                  <option value="title">
                    {locale ===
                    "en"
                      ? "Title"
                      : "標題"}
                  </option>
                </select>

                <div className="flex h-12 rounded-xl border border-border p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setSingleParam(
                        "view",
                        "grid"
                      )
                    }
                    aria-label="Grid view"
                    className={`rounded-lg px-3 ${
                      viewMode ===
                      "grid"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSingleParam(
                        "view",
                        "list"
                      )
                    }
                    aria-label="List view"
                    className={`rounded-lg px-3 ${
                      viewMode ===
                      "list"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {filtersOpen && (
                <m.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 grid gap-8 border-t border-border pt-6 lg:grid-cols-3">
                    <FilterGroup
                      title={
                        text.category
                      }
                    >
                      <FilterButton
                        active={
                          !category
                        }
                        label={
                          text.all
                        }
                        onClick={() =>
                          setSingleParam(
                            "category"
                          )
                        }
                      />

                      {categories.map(
                        (
                          categoryValue
                        ) => (
                          <FilterButton
                            key={
                              categoryValue
                            }
                            active={
                              category ===
                              categoryValue
                            }
                            label={
                              categoryLabels[
                                locale
                              ][
                                categoryValue
                              ]
                            }
                            onClick={() =>
                              setSingleParam(
                                "category",
                                categoryValue
                              )
                            }
                          />
                        )
                      )}
                    </FilterGroup>

                    <FilterGroup
                      title={
                        text.status
                      }
                    >
                      <FilterButton
                        active={
                          !status
                        }
                        label={
                          text.all
                        }
                        onClick={() =>
                          setSingleParam(
                            "status"
                          )
                        }
                      />

                      {statuses.map(
                        (
                          statusValue
                        ) => (
                          <FilterButton
                            key={
                              statusValue
                            }
                            active={
                              status ===
                              statusValue
                            }
                            label={
                              statusLabels[
                                locale
                              ][
                                statusValue
                              ]
                            }
                            onClick={() =>
                              setSingleParam(
                                "status",
                                statusValue
                              )
                            }
                          />
                        )
                      )}
                    </FilterGroup>

                    <FilterGroup
                      title={
                        text.technology
                      }
                    >
                      <div className="flex flex-wrap gap-2">
                        {technologyOptions
                          .slice(
                            0,
                            14
                          )
                          .map(
                            (
                              technology
                            ) => {
                              const active =
                                technologies.includes(
                                  technology.name
                                );

                              return (
                                <button
                                  key={
                                    technology.name
                                  }
                                  type="button"
                                  onClick={() =>
                                    toggleTechnology(
                                      technology.name
                                    )
                                  }
                                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                                    active
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border hover:bg-accent"
                                  }`}
                                >
                                  {active && (
                                    <Check className="h-3 w-3" />
                                  )}

                                  {
                                    technology.name
                                  }

                                  <span
                                    className={
                                      active
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground"
                                    }
                                  >
                                    {
                                      technology.count
                                    }
                                  </span>
                                </button>
                              );
                            }
                          )}
                      </div>
                    </FilterGroup>
                  </div>

                  {activeFilterCount >
                    0 && (
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={
                          clearFilters
                        }
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                      >
                        <RotateCcw className="h-4 w-4" />

                        {
                          text.clear
                        }
                      </button>
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </section>

          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                {
                  filteredProjects.length
                }
              </strong>{" "}
              {text.results}
            </p>

            {isPending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SlidersHorizontal className="h-4 w-4 animate-pulse" />

                {locale === "en"
                  ? "Updating…"
                  : "更新中…"}
              </div>
            )}
          </div>

          <LayoutGroup id="project-archive">
            <m.section
              layout
              className={
                viewMode ===
                "grid"
                  ? "grid gap-7 md:grid-cols-2 xl:grid-cols-3"
                  : "space-y-6"
              }
            >
              <AnimatePresence
                mode="popLayout"
              >
                {filteredProjects.map(
                  (
                    project,
                    index
                  ) => (
                    <ProjectArchiveCard
                      key={
                        project.slug
                      }
                      project={
                        project
                      }
                      locale={locale}
                      index={index}
                      viewMode={
                        viewMode
                      }
                      onPreview={
                        setSelectedProject
                      }
                    />
                  )
                )}
              </AnimatePresence>
            </m.section>
          </LayoutGroup>

          {filteredProjects.length ===
            0 && (
            <m.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-3xl border border-dashed border-border py-24 text-center"
            >
              <Search className="mx-auto mb-5 h-10 w-10 text-muted-foreground" />

              <p className="text-muted-foreground">
                {text.noResults}
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="mt-5 font-medium text-primary"
              >
                {text.clear}
              </button>
            </m.div>
          )}
        </div>
      </main>

      <ProjectPreviewDialog
        project={selectedProject}
        locale={locale}
        onClose={() =>
          setSelectedProject(
            null
          )
        }
      />
    </>
  );
}

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

function FilterGroup({
  title,
  children,
}: FilterGroupProps) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-bold">
        {title}
      </h2>

      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </section>
  );
}

interface FilterButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

function FilterButton({
  active,
  label,
  onClick,
}: FilterButtonProps) {
  return (
    <m.button
      type="button"
      whileTap={{
        scale: 0.96,
      }}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-accent"
      }`}
    >
      {label}
    </m.button>
  );
}

function parseCategory(
  value: string | null
): ProjectCategory | undefined {
  return categories.includes(
    value as ProjectCategory
  )
    ? (value as ProjectCategory)
    : undefined;
}

function parseStatus(
  value: string | null
): ProjectStatus | undefined {
  return statuses.includes(
    value as ProjectStatus
  )
    ? (value as ProjectStatus)
    : undefined;
}

function parseSort(
  value: string | null
): ProjectSort {
  const values: ProjectSort[] =
    [
      "featured",
      "newest",
      "oldest",
      "title",
    ];

  return values.includes(
    value as ProjectSort
  )
    ? (value as ProjectSort)
    : "featured";
}

function parseViewMode(
  value: string | null
): ProjectViewMode {
  return value === "list"
    ? "list"
    : "grid";
}