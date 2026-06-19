"use client";

import {
  ArrowRight,
  Columns3,
  Trash2,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  m,
} from "motion/react";

import {
  useRouter,
} from "@/i18n/navigation";

import {
  useMounted,
} from "@/hooks/use-mounted";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import type {
  PortfolioLocale,
  Project,
} from "@/types/projects";

interface ProjectCompareBarProps {
  projects: Project[];
  locale: PortfolioLocale;
}

export function ProjectCompareBar({
  projects,
  locale,
}: ProjectCompareBarProps) {
  const mounted =
    useMounted();

  const router =
    useRouter();

  const compareSlugs =
    useProjectPreferences(
      (state) =>
        state.compareSlugs
    );

  const removeFromCompare =
    useProjectPreferences(
      (state) =>
        state.removeFromCompare
    );

  const clearCompare =
    useProjectPreferences(
      (state) =>
        state.clearCompare
    );

  if (!mounted) {
    return null;
  }

  const selectedProjects =
    compareSlugs
      .map((slug) =>
        projects.find(
          (project) =>
            project.slug ===
            slug
        )
      )
      .filter(
        (
          project
        ): project is Project =>
          Boolean(project)
      );

  function openComparison() {
    if (
      selectedProjects.length <
      2
    ) {
      return;
    }

    const ids =
      selectedProjects
        .map(
          (project) =>
            project.slug
        )
        .join(",");

    router.push(
      `/projects/compare?ids=${encodeURIComponent(ids)}`
    );
  }

  return (
    <AnimatePresence>
      {selectedProjects.length >
        0 && (
        <m.aside
          initial={{
            opacity: 0,
            y: 90,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 70,
            scale: 0.97,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 26,
          }}
          className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-2xl border border-primary/25 bg-background/90 p-4 shadow-2xl shadow-primary/20 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Columns3 className="h-5 w-5" />
              </span>

              <div>
                <p className="font-bold">
                  {locale === "en"
                    ? "Project comparison"
                    : "作品比較"}
                </p>

                <p className="text-xs text-muted-foreground">
                  {selectedProjects.length}
                  /3
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
              {selectedProjects.map(
                (project) => (
                  <m.div
                    layout
                    key={
                      project.slug
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2"
                  >
                    <span className="max-w-44 truncate text-sm font-medium">
                      {
                        project
                          .content[
                          locale
                        ].title
                      }
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCompare(
                          project.slug
                        )
                      }
                      aria-label={
                        locale === "en"
                          ? "Remove project"
                          : "移除作品"
                      }
                      className="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </m.div>
                )
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={
                  clearCompare
                }
                aria-label={
                  locale === "en"
                    ? "Clear comparison"
                    : "清除比較"
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium hover:bg-accent"
              >
                <Trash2 className="h-4 w-4" />

                <span className="hidden sm:inline">
                  {locale === "en"
                    ? "Clear"
                    : "清除"}
                </span>
              </button>

              <button
                type="button"
                disabled={
                  selectedProjects.length <
                  2
                }
                onClick={
                  openComparison
                }
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-45"
              >
                {locale === "en"
                  ? "Compare"
                  : "開始比較"}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
  );
}