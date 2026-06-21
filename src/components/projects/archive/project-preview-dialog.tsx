"use client";

import {
  useEffect,
} from "react";

import Image from "next/image";

import {
  ArrowUpRight,
  BookOpen,
  Download,
  ExternalLink,
  GitBranch,
  PlayCircle,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  m,
  useReducedMotion,
} from "motion/react";

import { Link } from "@/i18n/navigation";
import {
  withBasePath,
} from "@/lib/site-assets";

import type {
  PortfolioLocale,
  Project,
  ProjectLinkKind,
} from "@/types/projects";

interface ProjectPreviewDialogProps {
  project: Project | null;
  locale: PortfolioLocale;
  onClose: () => void;
}

export function ProjectPreviewDialog({
  project,
  locale,
  onClose,
}: ProjectPreviewDialogProps) {
  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    if (!project) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <m.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-background/80 p-0 backdrop-blur-md md:items-center md:p-6"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              onClose();
            }
          }}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
            initial={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: 80,
                    scale: 0.96,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: 50,
                    scale: 0.97,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] border border-border bg-card shadow-2xl md:rounded-[2rem]"
          >
            <PreviewContent
              project={project}
              locale={locale}
              onClose={onClose}
            />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

interface PreviewContentProps {
  project: Project;
  locale: PortfolioLocale;
  onClose: () => void;
}

function PreviewContent({
  project,
  locale,
  onClose,
}: PreviewContentProps) {
  const content =
    project.content[locale];

  const featuredMedia =
    project.media.find(
      (item) =>
        item.featured
    ) ??
    project.media[0];

  const features =
    content.features ?? [];

  return (
    <>
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label={
          locale === "en"
            ? "Close preview"
            : "關閉預覽"
        }
        className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/85 backdrop-blur transition-colors hover:bg-accent"
      >
        <X className="h-5 w-5" />
      </button>

      <m.div
        layoutId={`project-cover-${project.slug}`}
        className="relative aspect-video overflow-hidden rounded-t-[2rem] bg-gradient-to-br from-primary/20 via-background to-secondary"
      >
        {featuredMedia?.type ===
        "video" ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={
              withBasePath(
                featuredMedia.poster
              )
            }
            className="h-full w-full object-cover"
          >
            <source
              src={
                withBasePath(
                  featuredMedia.src
                )
              }
            />
          </video>
        ) : featuredMedia ? (
          <Image
            src={
              withBasePath(
                featuredMedia.src
              ) ?? featuredMedia.src
            }
            alt={
              featuredMedia.alt[
                locale
              ]
            }
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            onError={(event) => {
              event.currentTarget.style.opacity =
                "0";
            }}
            className="object-cover"
          />
        ) : project.coverImage ? (
          <Image
            src={
              withBasePath(
                project.coverImage
              ) ?? project.coverImage
            }
            alt={content.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            onError={(event) => {
              event.currentTarget.style.opacity =
                "0";
            }}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-20 w-20 text-primary/30" />
          </div>
        )}
      </m.div>

      <div className="p-6 md:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {project.year} ·{" "}
          {project.status}
        </p>

        <h2
          id="project-preview-title"
          className="text-3xl font-bold tracking-tight md:text-4xl"
        >
          {content.title}
        </h2>

        {content.tagline && (
          <p className="mt-3 text-lg font-medium">
            {content.tagline}
          </p>
        )}

        <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
          {content.summary}
        </p>

        {features.length > 0 && (
          <section className="mt-8">
            <h3 className="mb-4 text-lg font-bold">
              {locale === "en"
                ? "Featured capabilities"
                : "精彩功能預覽"}
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              {features
                .slice(0, 3)
                .map(
                  (
                    feature,
                    index
                  ) => (
                    <m.article
                      key={
                        feature.id
                      }
                      initial={{
                        opacity:
                          0,
                        y: 18,
                      }}
                      animate={{
                        opacity:
                          1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          0.12 +
                          index *
                            0.08,
                      }}
                      className="rounded-2xl border border-border bg-background/50 p-5"
                    >
                      <h4 className="mb-2 font-bold">
                        {
                          feature.title
                        }
                      </h4>

                      <p className="text-sm leading-6 text-muted-foreground">
                        {
                          feature.description
                        }
                      </p>
                    </m.article>
                  )
                )}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map(
            (technology) => (
              <span
                key={technology}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
              >
                {technology}
              </span>
            )
          )}
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            {locale === "en"
              ? "Open full case study"
              : "開啟完整專案案例"}

            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {project.links.map(
            (link) => {
              const Icon =
                getLinkIcon(
                  link.kind
                );

              return (
                <a
                  key={`${link.kind}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-medium transition-colors hover:bg-accent"
                >
                  <Icon className="h-4 w-4" />

                  {
                    link.label[
                      locale
                    ]
                  }
                </a>
              );
            }
          )}
        </div>
      </div>
    </>
  );
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
      return PlayCircle;

    case "live":
    default:
      return ExternalLink;
  }
}
