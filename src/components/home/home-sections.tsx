"use client";

import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
  Mail,
  Wrench,
} from "lucide-react";
import {
  m,
  useReducedMotion,
} from "motion/react";

import { Link } from "@/i18n/navigation";
import type {
  HomeContent,
  HomeLocale,
} from "@/data/home";
import type {
  Project,
  ProjectStatus,
} from "@/types/projects";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/motion/section-heading";

interface FeaturedProjectsSectionProps {
  content: HomeContent["featured"];
  projects: Project[];
  locale: HomeLocale;
}

const statusLabels: Record<
  HomeLocale,
  Record<ProjectStatus, string>
> = {
  "zh-TW": {
    completed: "已完成",
    "in-progress": "開發中",
    prototype: "原型",
    planned: "規劃中",
  },

  en: {
    completed: "Completed",
    "in-progress": "In progress",
    prototype: "Prototype",
    planned: "Planned",
  },
};

export function FeaturedProjectsSection({
  content,
  projects,
  locale,
}: FeaturedProjectsSectionProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section className="border-b border-border/60 py-24 md:py-32">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={
              content.description
            }
          />

          <Reveal
            direction="left"
            className="mb-12"
          >
            <Link
              href="/projects/all"
              className="group inline-flex items-center gap-2 font-medium text-primary"
            >
              {content.viewAll}

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map(
            (project, index) => {
              const projectContent =
                project.content[locale];

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
                    amount: 0.15,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -10,
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-background to-secondary">
                    {project.coverImage ? (
                      <Image
                        src={
                          project.coverImage
                        }
                        alt={
                          projectContent.title
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="select-none text-5xl font-bold text-primary/25">
                          {projectContent.title
                            .split(" ")
                            .map(
                              (word) =>
                                word[0]
                            )
                            .join("")
                            .slice(0, 3)}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-70" />

                    <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
                      {
                        statusLabels[
                          locale
                        ][project.status]
                      }
                    </span>

                    {project.featured && (
                      <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {
                          content.featuredLabel
                        }
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {project.year}
                    </p>

                    <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                      {
                        projectContent.title
                      }
                    </h3>

                    <p className="mb-6 text-sm leading-7 text-muted-foreground">
                      {
                        projectContent.summary
                      }
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.technologies
                        .slice(0, 4)
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

                    <div className="mt-auto flex items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/link inline-flex flex-1 items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                      >
                        {
                          content.viewCaseStudy
                        }

                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </Link>

                      {project.repositoryUrl && (
                        <a
                          href={
                            project.repositoryUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Source code"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors hover:bg-accent"
                        >
                          <GitBranch className="h-4 w-4" />
                        </a>
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

interface DomainsSectionProps {
  content: HomeContent["domains"];
}

const domainIcons = {
  database: Database,
  box: Box,
  code: Code2,
} as const;

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
            content.description
          }
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {content.items.map(
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

const skillContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const skillItemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [
        0.22,
        1,
        0.36,
        1,
      ],
    },
  },
};

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

        <m.ul
          variants={
            skillContainerVariants
          }
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid gap-5 md:grid-cols-2"
        >
          {content.items.map(
            (item) => (
              <m.li
                key={item.title}
                variants={
                  skillItemVariants
                }
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/35"
              >
                <div className="flex gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold">
                      {item.title}
                    </h3>

                    <p className="leading-7 text-muted-foreground">
                      {
                        item.evidence
                      }
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-secondary px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </m.li>
            )
          )}
        </m.ul>
      </div>
    </section>
  );
}

interface RoadmapSectionProps {
  content: HomeContent["roadmap"];
}

const roadmapStatusStyles = {
  demonstrated:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  building:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  planned:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
} as const;

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
            content.description
          }
        />

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
              <Link
                href="/contact/form"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground"
              >
                <Mail className="h-4 w-4" />

                {content.primaryCta}

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/projects/all"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3.5 font-medium backdrop-blur hover:bg-accent"
              >
                <Wrench className="h-4 w-4" />

                {content.secondaryCta}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}