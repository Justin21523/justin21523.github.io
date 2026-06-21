"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Columns3,
  Minus,
} from "lucide-react";
import {
  useSearchParams,
} from "next/navigation";

import {
  Link,
} from "@/i18n/navigation";

import {
  Reveal,
} from "@/components/motion/reveal";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";

import {
  getProjectsBySlugs,
} from "@/lib/projects";

import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

interface ProjectCompareClientProps {
  locale: PortfolioLocale;
}

export function ProjectCompareClient({
  locale,
}: ProjectCompareClientProps) {
  const searchParams =
    useSearchParams();
  const rawIds =
    searchParams.get("ids");

  const slugs =
    rawIds
      ?.split(",")
      .map((slug) =>
        slug.trim()
      )
      .filter(Boolean)
      .slice(0, 3) ?? [];

  const projects =
    getProjectsBySlugs(
      slugs
    );

  const text =
    locale === "en"
      ? {
          eyebrow:
            "Project Comparison",

          title:
            "Compare projects side by side",

          description:
            "Review technologies, features, platforms, domains, responsibilities, and project status.",

          back:
            "Back to archive",

          insufficient:
            "Select at least two projects to start a comparison.",

          browse:
            "Browse projects",

          status:
            "Status",

          category:
            "Category",

          year:
            "Year",

          platforms:
            "Platforms",

          technologies:
            "Technologies",

          domains:
            "Domains",

          capabilities:
            "Capabilities",

          roles:
            "Responsibilities",

          features:
            "Features",

          challenges:
            "Engineering challenges",

          updated:
            "Last updated",

          open:
            "Open case study",
        }
      : {
          eyebrow:
            "作品比較",

          title:
            "並排比較不同作品",

          description:
            "比較技術、功能、平台、領域、負責內容與目前完成狀態。",

          back:
            "返回作品典藏庫",

          insufficient:
            "請至少選擇兩個作品才能進行比較。",

          browse:
            "瀏覽所有作品",

          status:
            "完成狀態",

          category:
            "作品分類",

          year:
            "年份",

          platforms:
            "執行平台",

          technologies:
            "使用技術",

          domains:
            "應用領域",

          capabilities:
            "系統能力",

          roles:
            "負責項目",

          features:
            "核心功能",

          challenges:
            "技術挑戰",

          updated:
            "最後更新",

          open:
            "開啟完整案例",
        };

  if (projects.length < 2) {
    return (
      <main className="min-h-screen px-4 pb-24 pt-32">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <Columns3 className="mx-auto mb-6 h-12 w-12 text-muted-foreground" />

            <h1 className="text-2xl font-bold">
              {
                text.insufficient
              }
            </h1>

            <Link
              href="/projects/all"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              {text.browse}

              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="section-shell">
        <Reveal>
          <Link
            href="/projects/all"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />

            {text.back}
          </Link>
        </Reveal>

        <header className="mb-12 max-w-4xl">
          <Reveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {text.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {text.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {
                text.description
              }
            </p>
          </Reveal>
        </header>

        <Reveal delay={0.18}>
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-[70rem] border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 w-52 border-b border-r border-border bg-card p-5 text-left">
                    Comparison
                  </th>

                  {projects.map(
                    (project) => (
                      <th
                        key={
                          project.slug
                        }
                        className="min-w-72 border-b border-r border-border p-6 text-left last:border-r-0"
                      >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                          {
                            project.year
                          }
                        </p>

                        <h2 className="text-xl font-bold">
                          {
                            project
                              .content[
                              locale
                            ].title
                          }
                        </h2>

                        <p className="mt-3 line-clamp-3 text-sm font-normal leading-6 text-muted-foreground">
                          {
                            project
                              .content[
                              locale
                            ].summary
                          }
                        </p>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
                        >
                          {text.open}

                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                <ComparisonRow
                  label={
                    text.status
                  }
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    statusLabels[
                      locale
                    ][
                      project.status
                    ]
                  }
                />

                <ComparisonRow
                  label={
                    text.category
                  }
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    categoryLabels[
                      locale
                    ][
                      project.category
                    ]
                  }
                />

                <ComparisonRow
                  label={text.year}
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    String(
                      project.year
                    )
                  }
                />

                <ComparisonRow
                  label={
                    text.updated
                  }
                  projects={
                    projects
                  }
                  render={(
                    project
                  ) =>
                    project
                      .metadata
                      .updatedAt
                  }
                />

                <ComparisonTagRow
                  label={
                    text.platforms
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .platforms
                  }
                />

                <ComparisonTagRow
                  label={
                    text.technologies
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .technologies
                  }
                />

                <ComparisonTagRow
                  label={
                    text.domains
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .domains
                  }
                />

                <ComparisonTagRow
                  label={
                    text.capabilities
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .capabilities
                  }
                />

                <ComparisonTagRow
                  label={
                    text.roles
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .metadata
                      .roles
                  }
                />

                <ComparisonListRow
                  label={
                    text.features
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    (
                      project
                        .content[
                        locale
                      ].features ??
                      []
                    ).map(
                      (
                        feature
                      ) =>
                        feature.title
                    )
                  }
                />

                <ComparisonListRow
                  label={
                    text.challenges
                  }
                  projects={
                    projects
                  }
                  getValues={(
                    project
                  ) =>
                    project
                      .content[
                      locale
                    ].challenges
                  }
                />
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

interface ComparisonRowProps {
  label: string;
  projects: Project[];
  render: (
    project: Project
  ) => string;
}

function ComparisonRow({
  label,
  projects,
  render,
}: ComparisonRowProps) {
  return (
    <tr>
      <ComparisonLabel>
        {label}
      </ComparisonLabel>

      {projects.map(
        (project) => (
          <td
            key={
              project.slug
            }
            className="border-b border-r border-border p-5 align-top last:border-r-0"
          >
            <span className="font-medium">
              {render(project)}
            </span>
          </td>
        )
      )}
    </tr>
  );
}

interface ComparisonTagRowProps {
  label: string;
  projects: Project[];
  getValues: (
    project: Project
  ) => string[];
}

function ComparisonTagRow({
  label,
  projects,
  getValues,
}: ComparisonTagRowProps) {
  return (
    <tr>
      <ComparisonLabel>
        {label}
      </ComparisonLabel>

      {projects.map(
        (project) => {
          const values =
            getValues(project);

          return (
            <td
              key={
                project.slug
              }
              className="border-b border-r border-border p-5 align-top last:border-r-0"
            >
              {values.length >
              0 ? (
                <div className="flex flex-wrap gap-2">
                  {values.map(
                    (value) => (
                      <span
                        key={
                          value
                        }
                        className="rounded-md bg-secondary px-2 py-1 text-xs"
                      >
                        {value}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <Minus className="h-4 w-4 text-muted-foreground" />
              )}
            </td>
          );
        }
      )}
    </tr>
  );
}

interface ComparisonListRowProps {
  label: string;
  projects: Project[];
  getValues: (
    project: Project
  ) => string[];
}

function ComparisonListRow({
  label,
  projects,
  getValues,
}: ComparisonListRowProps) {
  return (
    <tr>
      <ComparisonLabel>
        {label}
      </ComparisonLabel>

      {projects.map(
        (project) => {
          const values =
            getValues(project);

          return (
            <td
              key={
                project.slug
              }
              className="border-b border-r border-border p-5 align-top last:border-r-0"
            >
              {values.length >
              0 ? (
                <ul className="space-y-3">
                  {values.map(
                    (value) => (
                      <li
                        key={
                          value
                        }
                        className="flex gap-2 text-sm leading-6 text-muted-foreground"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />

                        {value}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <Minus className="h-4 w-4 text-muted-foreground" />
              )}
            </td>
          );
        }
      )}
    </tr>
  );
}

function ComparisonLabel({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <th className="sticky left-0 z-10 border-b border-r border-border bg-card p-5 text-left align-top text-sm font-bold">
      {children}
    </th>
  );
}
