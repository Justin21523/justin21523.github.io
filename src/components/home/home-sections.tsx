"use client";

import Image from "next/image";

import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  FolderKanban,
  GitBranch,
  Mail,
  PlayCircle,
} from "lucide-react";
import {
  m,
  useReducedMotion,
} from "motion/react";

import { Link } from "@/i18n/navigation";
import type {
  HomeContent,
} from "@/data/home";
import {
  statusLabels as projectStatusLabels,
} from "@/lib/project-taxonomy";
import {
  getProjectThumbnailMedia,
  getProjectThumbnailSource,
} from "@/lib/project-media";
import {
  withBasePath,
} from "@/lib/site-assets";
import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/motion/section-heading";

const roadmapStatusStyles = {
  demonstrated:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  building:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  planned:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
} as const;

const domainIcons = {
  database: Database,
  box: Box,
  code: Code2,
} as const;

const contactIcons = {
  mail: Mail,
  github: GitBranch,
  file: FileText,
  projects: FolderKanban,
} as const;

interface DomainsSectionProps {
  content: HomeContent["about"];
}

export function DomainsSection({
  content,
}: DomainsSectionProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent"
      />

      <div className="section-shell relative">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={
            content.paragraphs[0]
          }
          align="center"
        />

        <div className="mx-auto mb-12 grid max-w-5xl gap-5 text-pretty text-sm leading-7 text-muted-foreground md:grid-cols-2 md:text-base">
          {content.paragraphs
            .slice(1)
            .map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {content.cards.map(
            (item, index) => {
              const Icon =
                domainIcons[
                  item.icon
                ];

              return (
                <m.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 36,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -8,
                        }
                  }
                  transition={{
                    delay:
                      index * 0.1,
                    type: "spring",
                    stiffness: 230,
                    damping: 24,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7"
                >
                  <m.div
                    aria-hidden="true"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                  />

                  <div className="relative">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mb-6 leading-7 text-muted-foreground">
                      {
                        item.description
                      }
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </m.article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

interface SkillsEvidenceSectionProps {
  content: HomeContent["skills"];
}

export function SkillsEvidenceSection({
  content,
}: SkillsEvidenceSectionProps) {
  return (
    <section className="border-b border-border/60 py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={
            content.description
          }
        />

        <div className="space-y-8">
          {content.groups.map(
            (group) => (
              <m.section
                key={group.title}
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.16,
                }}
                className="rounded-3xl border border-border bg-card/70 p-6"
              >
                <h3 className="mb-5 text-xl font-bold">
                  {group.title}
                </h3>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {group.categories.map(
                    (category) => (
                      <article
                        key={
                          category.title
                        }
                        className="rounded-2xl border border-border/70 bg-background/50 p-5"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CheckCircle2 className="h-4 w-4" />
                          </span>

                          <h4 className="font-semibold">
                            {
                              category.title
                            }
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {category.items.map(
                            (item) => (
                              <span
                                key={item}
                                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                              >
                                {item}
                              </span>
                            )
                          )}
                        </div>
                      </article>
                    )
                  )}
                </div>
              </m.section>
            )
          )}
        </div>
      </div>
    </section>
  );
}

interface FeaturedProjectsSectionProps {
  content: HomeContent["featured"];
  projects?: Project[];
  locale?: PortfolioLocale;
}

export function FeaturedProjectsSection({
  content,
  projects,
  locale = "zh-TW",
}: FeaturedProjectsSectionProps) {
  const shouldReduceMotion =
    useReducedMotion();
  const desktopGroup =
    content.groups.find((group) =>
      group.title
        .toLowerCase()
        .includes("desktop")
    ) ?? content.groups[0];

  return (
    <section className="border-b border-border/60 py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />

          <Reveal direction="left" className="mb-4">
            <Link
              href="/projects/all"
              className="group inline-flex items-center gap-2 rounded-full bg-primary/5 px-5 py-2.5 font-medium text-primary transition-all hover:bg-primary/10"
            >
              {content.viewAll}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="space-y-24">
          {projects?.length ? (
            <div className="space-y-8">
              <m.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="flex flex-col justify-between gap-6 border-b border-border/60 pb-6 md:flex-row md:items-start"
              >
                <div className="space-y-2">
                  <span className="rounded-sm bg-primary/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary/80">
                    FEATURED
                  </span>

                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                    {desktopGroup.title}
                  </h3>
                </div>

                <div className="md:max-w-xl">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {
                      desktopGroup.description
                    }
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {desktopGroup.tags.map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-background/50 px-2 py-0.5 text-xs text-muted-foreground/80"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </m.div>

              <div className="grid gap-7 lg:grid-cols-3">
                {projects.map(
                  (project, index) => {
                    const projectContent =
                      project.content[locale];
                    const featuredMedia =
                      getProjectThumbnailMedia(project);
                    const image =
                      getProjectThumbnailSource(project);
                    const imageAlt =
                      featuredMedia?.alt[
                        locale
                      ] ??
                      projectContent.title;

                    return (
                      <m.article
                        key={project.slug}
                        initial={{
                          opacity: 0,
                          y: 40,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.1,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -8,
                                scale: 1.01,
                              }
                        }
                        transition={{
                          delay:
                            index * 0.08,
                          type: "spring",
                          stiffness: 220,
                          damping: 24,
                        }}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10"
                      >
                        {image ? (
                          <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                            <Image
                              src={
                                withBasePath(
                                  image
                                ) ?? image
                              }
                              alt={imageAlt}
                              fill
                              sizes="(min-width: 1024px) 33vw, 100vw"
                              onError={(event) => {
                                event.currentTarget.style.opacity =
                                  "0";
                              }}
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {featuredMedia?.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <span className="rounded-full bg-background/90 p-3 text-foreground shadow-lg">
                                  <PlayCircle className="h-6 w-6" />
                                </span>
                              </div>
                            )}
                          </div>
                        ) : null}

                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-5 flex items-start justify-between gap-4">
                            <h4 className="text-xl font-bold transition-colors group-hover:text-primary">
                              {
                                projectContent.title
                              }
                            </h4>

                            <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {
                                projectStatusLabels[
                                  locale
                                ][
                                  project.status
                                ]
                              }
                            </span>
                          </div>

                          <p className="mb-5 text-sm leading-7 text-muted-foreground">
                            {
                              projectContent.summary
                            }
                          </p>

                          <div className="mb-5">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                              Tech Stack
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {project.technologies
                                .slice(0, 6)
                                .map(
                                  (
                                    technology
                                  ) => (
                                    <span
                                      key={
                                        technology
                                      }
                                      className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                                    >
                                      {
                                        technology
                                      }
                                    </span>
                                  )
                                )}
                            </div>
                          </div>

                          <p className="mb-6 text-sm leading-7 text-muted-foreground">
                            {
                              projectContent
                                .highlights[0]
                            }
                          </p>

                          <div className="mt-auto">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group/link inline-flex w-full items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                            >
                              {
                                content.viewCaseStudy
                              }
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                      </m.article>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            content.groups.map(
              (group, groupIdx) => (
              <div
                key={group.title}
                className="space-y-8"
              >
                <m.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="flex flex-col justify-between gap-6 border-b border-border/60 pb-6 md:flex-row md:items-start"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-wider text-primary/80 bg-primary/10 px-2 py-0.5 rounded-sm">
                      AREA 0{groupIdx + 1}
                    </span>

                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                      {group.title}
                    </h3>
                  </div>

                  <div className="md:max-w-xl">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {
                        group.description
                      }
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border bg-background/50 px-2 py-0.5 text-xs text-muted-foreground/80"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </m.div>

                <div className="grid gap-7 lg:grid-cols-3">
                  {group.projects.map(
                    (project, index) => (
                      <m.article
                        key={project.title}
                        initial={{
                          opacity: 0,
                          y: 40,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.1,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -8,
                                scale: 1.01,
                              }
                        }
                        transition={{
                          delay:
                            index * 0.08,
                          type: "spring",
                          stiffness: 220,
                          damping: 24,
                        }}
                        className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10"
                      >
                        <div className="mb-5 flex items-start justify-between gap-4">
                          <h4 className="text-xl font-bold transition-colors group-hover:text-primary">
                            {project.title}
                          </h4>

                          <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {project.status}
                          </span>
                        </div>

                        <p className="mb-5 text-sm leading-7 text-muted-foreground">
                          {
                            project.description
                          }
                        </p>

                        <div className="mb-5">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Tech Stack
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map(
                              (technology) => (
                                <span
                                  key={
                                    technology
                                  }
                                  className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                                >
                                  {
                                    technology
                                  }
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        <p className="mb-6 text-sm leading-7 text-muted-foreground">
                          {project.focus}
                        </p>

                        {"slug" in
                          project &&
                          project.slug && (
                          <div className="mt-auto">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group/link inline-flex w-full items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                            >
                              {content.viewCaseStudy}
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            </Link>
                          </div>
                        )}
                      </m.article>
                    )
                  )}
                </div>
              </div>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
}

interface RoadmapSectionProps {
  content: HomeContent["learning"];
}

export function RoadmapSection({
  content,
}: RoadmapSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24 md:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={
            content.paragraphs[0]
          }
        />

        <div className="mb-12 grid gap-5 text-pretty text-sm leading-7 text-muted-foreground md:grid-cols-3 md:text-base">
          {content.paragraphs
            .slice(1)
            .map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
        </div>

        <div className="relative">
          <m.div
            aria-hidden="true"
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1.1,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="absolute bottom-8 left-[1.15rem] top-8 w-px origin-top bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-1/2"
          />

          <div className="space-y-8">
            {content.items.map(
              (item, index) => (
                <m.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    x:
                      index % 2 === 0
                        ? -35
                        : 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                    duration: 0.7,
                  }}
                  className={`relative grid gap-6 pl-14 md:grid-cols-2 md:pl-0 ${
                    index % 2 === 0
                      ? ""
                      : "md:[&>div:first-child]:col-start-2"
                  }`}
                >
                  <span className="absolute left-3 top-8 z-10 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] md:left-1/2 md:-translate-x-1/2" />

                  <div
                    className={`rounded-2xl border border-border bg-card p-6 ${
                      index % 2 === 0
                        ? "md:mr-12"
                        : "md:col-start-2 md:ml-12"
                    }`}
                  >
                    <span
                      className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        roadmapStatusStyles[
                          item.status
                        ]
                      }`}
                    >
                      {item.phase}
                    </span>

                    <h3 className="mb-3 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="leading-7 text-muted-foreground">
                      {
                        item.description
                      }
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </m.article>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactCtaSectionProps {
  content: HomeContent["contact"];
}

export function ContactCtaSection({
  content,
}: ContactCtaSectionProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section className="px-4 py-24 md:py-32">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-primary/20 bg-card px-6 py-16 text-center shadow-2xl shadow-primary/10 md:px-12 md:py-24">
          <m.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [
                      "-20%",
                      "20%",
                      "-20%",
                    ],
                    y: [
                      "-10%",
                      "15%",
                      "-10%",
                    ],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[110px]"
          />

          <div className="relative">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {content.eyebrow}
            </p>

            <h2 className="mx-auto max-w-4xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
              {content.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-8 text-muted-foreground md:text-lg">
              {content.description}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {content.links.map(
                (link) => {
                  const Icon =
                    contactIcons[
                      link.icon
                    ];
                  const className =
                    "group inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-3 font-medium backdrop-blur hover:bg-accent";

                  if (
                    "external" in link &&
                    link.external
                  ) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          className
                        }
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={
                        className
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
