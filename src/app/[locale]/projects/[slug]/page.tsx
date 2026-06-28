import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Download,
  ExternalLink,
  GitBranch,
  Lightbulb,
  Target,
  Wrench,
} from "lucide-react";

import {
  Link,
} from "@/i18n/navigation";

import {
  ProjectMediaGallery,
} from "@/components/projects/detail/project-media-gallery";

import {
  Reveal,
} from "@/components/motion/reveal";

import {
  projects,
} from "@/data/projects";

import {
  getProjectBySlug,
  getRelatedProjects,
  normalizePortfolioLocale,
} from "@/lib/projects";

import {
  statusLabels,
} from "@/lib/project-taxonomy";
import {
  getProjectActionLinks,
} from "@/lib/project-links";

import type {
  PortfolioLocale,
  ProjectLinkKind,
} from "@/types/projects";

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map(
    (project) => ({
      slug: project.slug,
    })
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
    slug,
  } = await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    return {
      title:
        "Project not found",
    };
  }

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  const content =
    project.content[locale];

  return {
    title: `${content.title} | Justin`,

    description:
      content.summary,

    openGraph: {
      title: content.title,
      description:
        content.summary,

      images:
        project.coverImage
          ? [
              {
                url:
                  project.coverImage,
                alt:
                  content.title,
              },
            ]
          : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const {
    locale: localeParam,
    slug,
  } = await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  const content =
    project.content[locale];

  const relatedProjects =
    getRelatedProjects(
      project,
      3
    );

  const actionLinks =
    getProjectActionLinks(
      project,
      locale
    );

  const labels =
    locale === "en"
      ? {
          back:
            "Back to project archive",
          overview:
            "Project overview",
          role: "My role",
          problem:
            "Problem",
          solution:
            "Solution",
          outcome:
            "Current outcome",
          features:
            "Key features",
          highlights:
            "Highlights",
          challenges:
            "Engineering challenges",
          nextSteps:
            "Next steps",
          metadata:
            "Project metadata",
          technologies:
            "Technologies",
          platforms:
            "Platforms",
          domains:
            "Domains",
          capabilities:
            "Capabilities",
          roles:
            "Responsibilities",
          updated:
            "Last updated",
          duration:
            "Duration",
          team:
            "Team size",
          related:
            "Related projects",
          resources:
            "Project links and demo readiness",
          sourceAccess:
            "Source access",
          demoGuide:
            "Live demo guide",
          demoVideo:
            "Demo video",
          readmeGuide:
            "README and documentation",
          architecture:
            "Architecture",
          dataFlow:
            "Data flow",
          projectStructure:
            "Project structure",
          setupGuide:
            "Setup / Run guide",
          technicalHighlights:
            "Technical highlights",
          targetUsers:
            "Target users",
          futureImprovements:
            "Future improvements",
          interviewNotes:
            "Interview notes",
        }
      : {
          back:
            "返回作品典藏庫",
          overview:
            "專案概覽",
          role: "我的角色",
          problem:
            "問題背景",
          solution:
            "解決方案",
          outcome:
            "目前成果",
          features:
            "核心功能",
          highlights:
            "作品亮點",
          challenges:
            "技術挑戰",
          nextSteps:
            "後續規劃",
          metadata:
            "專案 Metadata",
          technologies:
            "使用技術",
          platforms:
            "執行平台",
          domains:
            "應用領域",
          capabilities:
            "系統能力",
          roles:
            "負責項目",
          updated:
            "最後更新",
          duration:
            "開發期間",
          team:
            "團隊人數",
          related:
            "相關作品",
          resources:
            "專案連結與 Demo 狀態",
          sourceAccess:
            "原始碼狀態",
          demoGuide:
            "Live Demo 指南",
          demoVideo:
            "Demo 影片",
          readmeGuide:
            "README 與文件",
          architecture:
            "系統架構",
          dataFlow:
            "資料流程",
          projectStructure:
            "專案結構",
          setupGuide:
            "安裝與執行",
          technicalHighlights:
            "技術亮點",
          targetUsers:
            "目標使用者",
          futureImprovements:
            "後續改進",
          interviewNotes:
            "面試說明重點",
        };

  const features =
    content.features ?? [];

  const metrics =
    content.metrics ?? [];

  return (
    <main className="min-h-screen pb-24 pt-28">
      <article className="section-shell">
        <Reveal>
          <Link
            href="/projects/all"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />

            {labels.back}
          </Link>
        </Reveal>

        <header className="mb-12">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {
                  statusLabels[
                    locale
                  ][project.status]
                }
              </span>

              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {project.year}
              </span>

              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {
                  project.category
                }
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-5xl text-balance text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
              {content.title}
            </h1>
          </Reveal>

          {content.tagline && (
            <Reveal delay={0.14}>
              <p className="mt-5 text-xl font-medium text-primary md:text-2xl">
                {
                  content.tagline
                }
              </p>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-4xl text-pretty text-lg leading-8 text-muted-foreground">
              {content.summary}
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap gap-3">
              {actionLinks.map(
                (link) => {
                  const Icon =
                    getLinkIcon(
                      link.kind
                    );

                  if (!link.available) {
                    return (
                      <span
                        key={link.kind}
                        aria-disabled="true"
                        className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-dashed border-border px-5 py-3 font-medium text-muted-foreground"
                      >
                        <Icon className="h-4 w-4" />

                        {link.unavailableLabel}
                      </span>
                    );
                  }

                  return (
                    <a
                      key={`${link.kind}-${link.url}`}
                      href={
                        link.url
                      }
                      target={link.url?.startsWith("http") ? "_blank" : undefined}
                      rel={link.url?.startsWith("http") ? "noreferrer" : undefined}
                      className={
                        link.kind === "live"
                          ? "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
                          : "inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-medium transition-colors hover:bg-accent"
                      }
                    >
                      <Icon className="h-4 w-4" />

                      {link.label}

                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  );
                }
              )}
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.12}>
          <ProjectMediaGallery
            media={project.media}
            locale={locale}
          />
        </Reveal>

        <Reveal delay={0.16}>
          <section
            id="source-access"
            className="mt-12 scroll-mt-28"
          >
            <h2 className="mb-5 text-2xl font-bold">
              {labels.resources}
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {actionLinks.map((link) => {
                const id =
                  link.kind === "live"
                    ? "demo-guide"
                    : link.kind === "video"
                      ? "demo-video"
                      : link.kind === "documentation"
                        ? "readme-guide"
                        : undefined;
                const content = (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {link.kind}
                    </p>

                    <h3 className="mt-2 font-bold transition-colors group-hover:text-primary">
                      {link.available ? link.label : link.unavailableLabel}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {getActionDescription(link.kind, locale)}
                    </p>
                  </>
                );

                if (!link.available) {
                  return (
                    <div
                      key={link.kind}
                      id={id}
                      aria-disabled="true"
                      className="rounded-2xl border border-dashed border-border bg-card p-5 text-muted-foreground"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={link.kind}
                    id={id}
                    href={link.url}
                    target={link.url?.startsWith("http") ? "_blank" : undefined}
                    rel={link.url?.startsWith("http") ? "noreferrer" : undefined}
                    className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </section>
        </Reveal>

        {metrics.length > 0 && (
          <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map(
              (
                metric,
                index
              ) => (
                <Reveal
                  key={
                    metric.label
                  }
                  delay={
                    index * 0.08
                  }
                >
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <p className="text-3xl font-bold text-primary">
                      {
                        metric.value
                      }
                    </p>

                    <p className="mt-2 font-bold">
                      {
                        metric.label
                      }
                    </p>

                    {metric.description && (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {
                          metric.description
                        }
                      </p>
                    )}
                  </div>
                </Reveal>
              )
            )}
          </section>
        )}

        <div className="mt-16 grid gap-12 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <ContentSection
              title={
                labels.overview
              }
              icon={BookOpen}
            >
              <p className="leading-8 text-muted-foreground">
                {
                  content.description
                }
              </p>
            </ContentSection>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <SummaryCard
                title={
                  labels.role
                }
                content={
                  content.role
                }
                icon={Target}
              />

              <SummaryCard
                title={
                  labels.problem
                }
                content={
                  content.problem
                }
                icon={Lightbulb}
              />

              <SummaryCard
                title={
                  labels.solution
                }
                content={
                  content.solution
                }
                icon={Wrench}
              />
            </div>

            {content.outcome && (
              <ContentSection
                title={
                  labels.outcome
                }
                icon={
                  CheckCircle2
                }
                className="mt-12"
              >
                <p className="leading-8 text-muted-foreground">
                  {
                    content.outcome
                  }
                </p>
              </ContentSection>
            )}

            {features.length >
              0 && (
              <ContentSection
                title={
                  labels.features
                }
                icon={Target}
                className="mt-12"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  {features.map(
                    (
                      feature,
                      index
                    ) => (
                      <Reveal
                        key={
                          feature.id
                        }
                        delay={
                          index *
                          0.06
                        }
                      >
                        <article className="h-full rounded-2xl border border-border bg-card p-6">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Feature{" "}
                            {String(
                              index +
                                1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </p>

                          <h3 className="text-xl font-bold">
                            {
                              feature.title
                            }
                          </h3>

                          <p className="mt-3 leading-7 text-muted-foreground">
                            {
                              feature.description
                            }
                          </p>

                          {feature
                            .bullets && (
                            <ul className="mt-5 space-y-2">
                              {feature.bullets.map(
                                (
                                  bullet
                                ) => (
                                  <li
                                    key={
                                      bullet
                                    }
                                    className="flex gap-3 text-sm text-muted-foreground"
                                  >
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                                    {
                                      bullet
                                    }
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </article>
                      </Reveal>
                    )
                  )}
                </div>
              </ContentSection>
            )}

            <ListSection
              title={
                labels.highlights
              }
              items={
                content.highlights
              }
              icon={
                CheckCircle2
              }
              className="mt-12"
            />

            <ListSection
              title={
                labels.challenges
              }
              items={
                content.challenges
              }
              icon={Wrench}
              className="mt-12"
            />

            <ListSection
              title={
                labels.targetUsers
              }
              items={
                content.targetUsers ?? []
              }
              icon={Target}
              className="mt-12"
            />

            <ListSection
              title={
                labels.technicalHighlights
              }
              items={
                content.technicalHighlights ?? []
              }
              icon={CheckCircle2}
              className="mt-12"
            />

            {content.architecture && (
              <ContentSection
                title={labels.architecture}
                icon={Wrench}
                className="mt-12"
              >
                <p className="whitespace-pre-line leading-8 text-muted-foreground">
                  {content.architecture}
                </p>
              </ContentSection>
            )}

            {content.dataFlow && (
              <ContentSection
                title={labels.dataFlow}
                icon={Target}
                className="mt-12"
              >
                <p className="whitespace-pre-line leading-8 text-muted-foreground">
                  {content.dataFlow}
                </p>
              </ContentSection>
            )}

            {content.projectStructure && (
              <ContentSection
                title={labels.projectStructure}
                icon={BookOpen}
                className="mt-12"
              >
                <pre className="overflow-x-auto rounded-2xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground">
                  {content.projectStructure}
                </pre>
              </ContentSection>
            )}

            {content.setupGuide && (
              <ContentSection
                title={labels.setupGuide}
                icon={Wrench}
                className="mt-12"
              >
                <pre className="overflow-x-auto rounded-2xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground">
                  {content.setupGuide}
                </pre>
              </ContentSection>
            )}

            <ListSection
              title={
                labels.futureImprovements
              }
              items={
                content.futureImprovements ?? []
              }
              icon={Lightbulb}
              className="mt-12"
            />

            <ListSection
              title={
                labels.interviewNotes
              }
              items={
                content.interviewNotes ?? []
              }
              icon={BookOpen}
              className="mt-12"
            />

            <ListSection
              title={
                labels.nextSteps
              }
              items={
                content.nextSteps
              }
              icon={Target}
              className="mt-12"
            />
          </div>

          <aside>
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold">
                {labels.metadata}
              </h2>

              <MetadataValue
                label={
                  labels.updated
                }
                value={
                  project.metadata
                    .updatedAt
                }
              />

              {project.metadata
                .duration && (
                <MetadataValue
                  label={
                    labels.duration
                  }
                  value={
                    project
                      .metadata
                      .duration
                  }
                />
              )}

              <MetadataValue
                label={
                  labels.team
                }
                value={String(
                  project.metadata
                    .teamSize ?? 1
                )}
              />

              <MetadataTags
                label={
                  labels.technologies
                }
                values={
                  project.technologies
                }
              />

              <MetadataTags
                label={
                  labels.platforms
                }
                values={
                  project.metadata
                    .platforms
                }
              />

              <MetadataTags
                label={
                  labels.domains
                }
                values={
                  project.metadata
                    .domains
                }
              />

              <MetadataTags
                label={
                  labels.capabilities
                }
                values={
                  project.metadata
                    .capabilities
                }
              />

              <MetadataTags
                label={
                  labels.roles
                }
                values={
                  project.metadata
                    .roles
                }
              />
            </div>
          </aside>
        </div>

        {relatedProjects.length >
          0 && (
          <section className="mt-24 border-t border-border pt-16">
            <Reveal>
              <h2 className="mb-8 text-3xl font-bold">
                {labels.related}
              </h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map(
                (
                  related,
                  index
                ) => (
                  <Reveal
                    key={
                      related.slug
                    }
                    delay={
                      index * 0.08
                    }
                  >
                    <Link
                      href={`/projects/${related.slug}`}
                      className="group block h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                    >
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        {
                          related.year
                        }
                      </p>

                      <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                        {
                          related
                            .content[
                            locale
                          ].title
                        }
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {
                          related
                            .content[
                            locale
                          ].summary
                        }
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        {locale ===
                        "en"
                          ? "View project"
                          : "查看作品"}

                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Reveal>
                )
              )}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

interface ContentSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

function ContentSection({
  title,
  icon: Icon,
  children,
  className,
}: ContentSectionProps) {
  return (
    <Reveal
      className={className}
    >
      <section>
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>
        </div>

        {children}
      </section>
    </Reveal>
  );
}

interface SummaryCardProps {
  title: string;
  content: string;
  icon: React.ElementType;
}

function SummaryCard({
  title,
  content,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <Reveal>
      <article className="h-full rounded-2xl border border-border bg-card p-6">
        <Icon className="mb-4 h-6 w-6 text-primary" />

        <h2 className="mb-3 font-bold">
          {title}
        </h2>

        <p className="text-sm leading-7 text-muted-foreground">
          {content}
        </p>
      </article>
    </Reveal>
  );
}

interface ListSectionProps {
  title: string;
  items: string[];
  icon: React.ElementType;
  className?: string;
}

function ListSection({
  title,
  items,
  icon: Icon,
  className,
}: ListSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ContentSection
      title={title}
      icon={Icon}
      className={className}
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map(
          (item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <span className="leading-7 text-muted-foreground">
                {item}
              </span>
            </li>
          )
        )}
      </ul>
    </ContentSection>
  );
}

interface MetadataValueProps {
  label: string;
  value: string;
}

function MetadataValue({
  label,
  value,
}: MetadataValueProps) {
  return (
    <div className="border-b border-border py-4 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 font-medium">
        {value}
      </p>
    </div>
  );
}

interface MetadataTagsProps {
  label: string;
  values: string[];
}

function MetadataTags({
  label,
  values,
}: MetadataTagsProps) {
  if (values.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border py-4 last:border-0">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {values.map(
          (value) => (
            <span
              key={value}
              className="rounded-md bg-secondary px-2 py-1 text-xs"
            >
              {value}
            </span>
          )
        )}
      </div>
    </div>
  );
}

function getActionDescription(
  kind: "live" | "github" | "video" | "documentation",
  locale: PortfolioLocale
) {
  const descriptions = {
    en: {
      live:
        "Open the verified live demo when available, or use the internal run guide for manual demo preparation.",
      github:
        "Open the public repository when available, or review the source-access status captured by this case study.",
      video:
        "Open the demo recording when available, or use this section as the recording checklist for the project.",
      documentation:
        "Open the project README when available, or use this case study as the documentation baseline.",
    },
    "zh-TW": {
      live:
        "有已驗證 Live Demo 時直接開啟；尚未部署時，使用本頁的執行指南準備手動展示。",
      github:
        "有公開 repository 時直接開啟；尚未確認時，使用本頁原始碼狀態追蹤後續補齊。",
      video:
        "有 Demo 錄影時直接開啟；尚未錄影時，使用本段作為錄影檢查清單。",
      documentation:
        "有 README 時直接開啟；尚未補齊時，使用本案例頁作為文件基準。",
    },
  } as const;

  return descriptions[locale][kind];
}

function getLinkIcon(
  kind: ProjectLinkKind
) {
  switch (kind) {
    case "github":
      return GitBranch;

    case "documentation":
    case "article":
      return BookOpen;

    case "download":
      return Download;

    case "video":
      return ExternalLink;

    case "live":
    default:
      return ExternalLink;
  }
}
