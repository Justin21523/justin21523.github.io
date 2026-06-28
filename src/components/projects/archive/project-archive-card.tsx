"use client";

import Image from "next/image";

import {
  ArrowUpRight,
  Eye,
  Layers3,
  PlayCircle,
} from "lucide-react";

import {
  m,
  useReducedMotion,
} from "motion/react";

import { Link } from "@/i18n/navigation";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";
import {
  withBasePath,
} from "@/lib/site-assets";
import {
  getProjectActionLinks,
} from "@/lib/project-links";
import {
  getProjectThumbnailMedia,
  getProjectThumbnailSource,
} from "@/lib/project-media";

import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";
import {
  Columns3,
  Heart,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import {
  useMounted,
} from "@/hooks/use-mounted";
import {
  AnimatePresence,
} from "motion/react";

export type ProjectViewMode =
  | "grid"
  | "list"
  | "catalog";

interface ProjectArchiveCardProps {
  project: Project;
  locale: PortfolioLocale;
  index: number;
  viewMode: ProjectViewMode;

  onPreview: (
    project: Project
  ) => void;
}

export function ProjectArchiveCard({
  project,
  locale,
  index,
  viewMode,
  onPreview,
}: ProjectArchiveCardProps) {
    const mounted =
    useMounted();

    const [
    compareLimitReached,
    setCompareLimitReached,
    ] = useState(false);

    const favoriteSlugs =
    useProjectPreferences(
        (state) =>
        state.favoriteSlugs
    );

    const compareSlugs =
    useProjectPreferences(
        (state) =>
        state.compareSlugs
    );

    const toggleFavorite =
    useProjectPreferences(
        (state) =>
        state.toggleFavorite
    );

    const addToCompare =
    useProjectPreferences(
        (state) =>
        state.addToCompare
    );

    const removeFromCompare =
    useProjectPreferences(
        (state) =>
        state.removeFromCompare
    );

    const isFavorite =
    mounted &&
    favoriteSlugs.includes(
        project.slug
    );

    const isCompared =
    mounted &&
    compareSlugs.includes(
        project.slug
    );

    function handleCompare() {
    setCompareLimitReached(false);

    if (isCompared) {
        removeFromCompare(
        project.slug
        );

        return;
    }

    const added =
        addToCompare(
        project.slug
        );

    if (!added) {
        setCompareLimitReached(
        true
        );

        window.setTimeout(
        () => {
            setCompareLimitReached(
            false
            );
        },
        2200
        );
    }
    }
  const shouldReduceMotion =
    useReducedMotion();

  const content =
    project.content[locale];
  const labels =
    locale === "en"
      ? {
          featured: "Featured",
          altTitle: "Alt title",
          role: "Creator/Role",
          status: "Status",
          year: "Year",
          platforms: "Platforms",
          domains: "Domains",
          stack: "Stack",
          developer: "Developer",
          web: "Web",
          general: "General",
          favorite: "Favorite",
          compare: "Compare",
        }
      : {
          featured: "精選",
          altTitle: "別名",
          role: "作者/角色",
          status: "狀態",
          year: "年份",
          platforms: "平台",
          domains: "領域",
          stack: "技術",
          developer: "開發者",
          web: "Web",
          general: "一般",
          favorite: "收藏",
          compare: "比較",
        };

  const image = getProjectThumbnailSource(project);
  const thumbnailMedia = getProjectThumbnailMedia(project);

  const features =
    content.features ?? [];
  const quickLinks = getProjectActionLinks(project, locale);

  if (viewMode === "catalog") {
    return (
      <m.article
        layout
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 18,
          scale: 0.96,
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -5,
              }
        }
        className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10 flex flex-col gap-5 font-mono text-sm leading-relaxed"
      >
        <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-primary px-2.5 py-1 rounded bg-primary/10 border border-primary/20">
              {project.metadata.catalogNumber || `PF-${project.year}-IS-000`}
            </span>
            {project.featured && (
              <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                ★ {labels.featured}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {categoryLabels[locale][project.category]}
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {content.title}
          </h2>
          {project.metadata.aliases && project.metadata.aliases.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              [{labels.altTitle}: {project.metadata.aliases.join(", ")}]
            </p>
          )}
        </div>

        <div className="grid gap-x-4 gap-y-2 text-xs md:grid-cols-2">
          <div className="flex gap-2">
            <span className="w-24 text-muted-foreground shrink-0">[{labels.role}]</span>
            <span className="text-foreground truncate">{content.role || labels.developer}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-24 text-muted-foreground shrink-0">[{labels.status}]</span>
            <span className={`font-semibold ${project.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>
              {statusLabels[locale][project.status]}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-24 text-muted-foreground shrink-0">[{labels.year}]</span>
            <span className="text-foreground">{project.year}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-24 text-muted-foreground shrink-0">[{labels.platforms}]</span>
            <span className="text-foreground truncate">{project.metadata.platforms.join(", ") || labels.web}</span>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <span className="w-24 text-muted-foreground shrink-0">[{labels.domains}]</span>
            <span className="text-foreground line-clamp-1">{project.metadata.domains.join(", ") || labels.general}</span>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <span className="w-24 text-muted-foreground shrink-0">[{labels.stack}]</span>
            <span className="text-foreground line-clamp-1">{project.technologies.join(", ")}</span>
          </div>
        </div>

        <p className="text-sm leading-7 text-muted-foreground bg-accent/40 p-4 rounded-xl border border-border/50 line-clamp-3">
          {content.summary}
        </p>

        <div className="mt-auto pt-3 border-t border-dashed border-border flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onPreview(project)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground px-2 py-1 border border-border rounded transition-colors"
            >
              {locale === "en" ? "Preview" : "快速預覽"}
            </button>
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-semibold text-primary hover:underline px-2 py-1 border border-primary/20 bg-primary/5 rounded transition-colors"
            >
              {locale === "en" ? "Full Record →" : "完整案例 →"}
            </Link>
            {quickLinks.slice(0, 4).map((link) => (
              link.available ? (
                <a
                  key={`${project.slug}-${link.kind}`}
                  href={link.url}
                  target={link.url?.startsWith("http") ? "_blank" : undefined}
                  rel={link.url?.startsWith("http") ? "noreferrer" : undefined}
                  className={`text-xs font-semibold px-2 py-1 rounded border transition-colors ${
                    link.kind === "live"
                      ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-primary border-primary/20 bg-primary/5 hover:underline"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <span
                  key={`${project.slug}-${link.kind}`}
                  aria-disabled="true"
                  className="cursor-not-allowed rounded border border-dashed border-border px-2 py-1 text-xs font-semibold text-muted-foreground"
                >
                  {link.unavailableLabel}
                </span>
              )
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <m.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(project.slug)}
              className={`p-1.5 rounded border transition-colors ${
                isFavorite
                  ? "border-rose-500/40 bg-rose-500 text-white"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
              aria-label={labels.favorite}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`} />
            </m.button>
            <m.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCompare}
              className={`p-1.5 rounded border transition-colors ${
                isCompared
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
              aria-label={labels.compare}
            >
              <Columns3 className="h-3.5 w-3.5" />
            </m.button>
          </div>
        </div>
      </m.article>
    );
  }

  const isList =
    viewMode === "list";

  return (
    <m.article
      layout
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 18,
        scale: 0.96,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -7,
            }
      }
      transition={{
        layout: {
          type: "spring",
          stiffness: 280,
          damping: 28,
        },

        delay:
          Math.min(
            index * 0.04,
            0.25
          ),
      }}
      className={`group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-2xl hover:shadow-primary/10 ${
        isList
          ? "grid md:grid-cols-[24rem_1fr]"
          : "flex h-full flex-col"
      }`}
    >
      <m.div
        layoutId={`project-cover-${project.slug}`}
        className={`relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary ${
          isList
            ? "min-h-72 md:min-h-full"
            : "aspect-[16/11]"
        }`}
      >
        {image ? (
          <Image
            src={
              withBasePath(image) ??
              image
            }
            alt={
              thumbnailMedia?.alt[locale] ??
              content.title
            }
            fill
            sizes={
              isList
                ? "(max-width: 768px) 100vw, 384px"
                : "(max-width: 768px) 100vw, 50vw"
            }
            onError={(event) => {
              event.currentTarget.style.opacity =
                "0";
            }}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Layers3 className="h-16 w-16 text-primary/25" />
          </div>
        )}

        {thumbnailMedia?.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="rounded-full bg-background/90 p-3 text-foreground shadow-lg">
              <PlayCircle className="h-7 w-7" />
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
<div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
  <div className="flex flex-col items-start gap-2">
    <span className="rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur">
      {
        categoryLabels[
          locale
        ][project.category]
      }
    </span>

    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
      {
        statusLabels[
          locale
        ][project.status]
      }
    </span>
  </div>
<AnimatePresence>
  {compareLimitReached && (
    <m.p
      initial={{
        opacity: 0,
        y: 6,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      className="mb-3 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"
    >
      {locale === "en"
        ? "You can compare up to three projects."
        : "最多只能同時比較三個作品。"}
    </m.p>
  )}
</AnimatePresence>
  <div className="flex gap-2">
    <m.button
      type="button"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={() =>
        toggleFavorite(
          project.slug
        )
      }
      aria-label={
        isFavorite
          ? locale === "en"
            ? "Remove favorite"
            : "取消收藏"
          : locale === "en"
            ? "Add favorite"
            : "收藏作品"
      }
      aria-pressed={
        isFavorite
      }
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors ${
        isFavorite
          ? "border-rose-500/40 bg-rose-500 text-white"
          : "border-border bg-background/85 hover:bg-accent"
      }`}
    >
      <Heart
        className={`h-4 w-4 ${
          isFavorite
            ? "fill-current"
            : ""
        }`}
      />
    </m.button>

    <m.button
      type="button"
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={
        handleCompare
      }
      aria-label={
        isCompared
          ? locale === "en"
            ? "Remove comparison"
            : "移出比較"
          : locale === "en"
            ? "Add comparison"
            : "加入比較"
      }
      aria-pressed={
        isCompared
      }
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition-colors ${
        isCompared
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background/85 hover:bg-accent"
      }`}
    >
      <Columns3 className="h-4 w-4" />
    </m.button>
  </div>
</div>
      </m.div>

      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{project.year}</span>

          {project.metadata
            .platforms[0] && (
            <>
              <span>•</span>

              <span>
                {
                  project
                    .metadata
                    .platforms[0]
                }
              </span>
            </>
          )}

          {project.metadata
            .duration && (
            <>
              <span>•</span>

              <span>
                {
                  project
                    .metadata
                    .duration
                }
              </span>
            </>
          )}
        </div>

        <h2 className="mb-3 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">
          {content.title}
        </h2>

        {content.tagline && (
          <p className="mb-4 text-base font-medium leading-7 text-foreground/80">
            {content.tagline}
          </p>
        )}

        <p className="mb-6 line-clamp-4 text-base leading-8 text-muted-foreground">
          {content.summary}
        </p>

        {features.length > 0 && (
          <div className="mb-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {locale === "en"
                ? "Key features"
                : "核心功能"}
            </p>

            <ul className="space-y-1 text-sm text-muted-foreground">
              {features
                .slice(0, 3)
                .map((feature) => (
                  <li
                    key={
                      feature.id
                    }
                    className="flex gap-2"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                    <span>
                      {
                        feature.title
                      }
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="mb-7 flex flex-wrap gap-2.5">
          {project.technologies
            .slice(0, 6)
            .map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-lg bg-secondary px-3 py-1.5 text-xs"
                >
                  {technology}
                </span>
              )
            )}
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              onPreview(project)
            }
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Eye className="h-4 w-4" />

            {locale === "en"
              ? "Quick preview"
              : "快速預覽"}
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
          >
            {locale === "en"
              ? "Case study"
              : "完整案例"}

            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickLinks.slice(0, 4).map((link) => (
            link.available ? (
              <a
                key={`${project.slug}-${link.kind}`}
                href={link.url}
                target={link.url?.startsWith("http") ? "_blank" : undefined}
                rel={link.url?.startsWith("http") ? "noreferrer" : undefined}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  link.kind === "live"
                    ? "border border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                    : "border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                }`}
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ) : (
              <span
                key={`${project.slug}-${link.kind}`}
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                {link.unavailableLabel}
              </span>
            )
          ))}
        </div>
      </div>
    </m.article>
  );
}
