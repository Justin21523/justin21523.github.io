"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  Heart,
  Search,
  Sparkles,
} from "lucide-react";

import {
  m,
} from "motion/react";

import {
  useRouter,
} from "@/i18n/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  categoryLabels,
  statusLabels,
} from "@/lib/project-taxonomy";

import {
  useProjectPreferences,
} from "@/stores/project-preferences-store";

import {
  useMounted,
} from "@/hooks/use-mounted";

import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
} from "@/types/projects";

interface ProjectCommandPaletteProps {
  projects: Project[];
  locale: PortfolioLocale;
}

const categoryIcons: Record<
  ProjectCategory,
  React.ElementType
> = {
  "information-system":
    Database,

  "interactive-3d":
    Box,

  "ai-data":
    Sparkles,

  frontend:
    Code2,

  "backend-desktop":
    Database,
};

export function ProjectCommandPalette({
  projects,
  locale,
}: ProjectCommandPaletteProps) {
  const router =
    useRouter();

  const mounted =
    useMounted();

  const [
    open,
    setOpen,
  ] = useState(false);

  const favoriteSlugs =
    useProjectPreferences(
      (state) =>
        state.favoriteSlugs
    );

  const favoriteProjects =
    useMemo(() => {
      if (!mounted) {
        return [];
      }

      return projects.filter(
        (project) =>
          favoriteSlugs.includes(
            project.slug
          )
      );
    }, [
      favoriteSlugs,
      mounted,
      projects,
    ]);

  const featuredProjects =
    useMemo(
      () =>
        projects.filter(
          (project) =>
            project.featured
        ),
      [projects]
    );

  useEffect(() => {
    function handleKeyboard(
      event: KeyboardEvent
    ) {
      const isCommand =
        event.metaKey ||
        event.ctrlKey;

      if (
        isCommand &&
        event.key.toLowerCase() ===
          "k"
      ) {
        event.preventDefault();

        setOpen(
          (current) =>
            !current
        );
      }
    }

    function handleOpenEvent() {
      setOpen(true);
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    window.addEventListener(
      "portfolio:open-command",
      handleOpenEvent
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );

      window.removeEventListener(
        "portfolio:open-command",
        handleOpenEvent
      );
    };
  }, []);

  function openProject(
    slug: string
  ) {
    setOpen(false);

    router.push(
      `/projects/${slug}`
    );
  }

  function openProjectArchive() {
    setOpen(false);

    router.push(
      "/projects/all"
    );
  }

  const text =
    locale === "en"
      ? {
          placeholder:
            "Search projects, technologies, domains, or features…",

          empty:
            "No matching projects.",

          favorites:
            "Favorites",

          featured:
            "Featured projects",

          all:
            "All projects",

          archive:
            "Open project archive",
        }
      : {
          placeholder:
            "搜尋作品、技術、領域或功能…",

          empty:
            "找不到符合條件的作品。",

          favorites:
            "收藏作品",

          featured:
            "精選作品",

          all:
            "所有作品",

          archive:
            "開啟完整作品典藏庫",
        };

  return (
    <CommandDialog
      open={open}
      onOpenChange={
        setOpen
      }
    >
      <CommandInput
        placeholder={
          text.placeholder
        }
      />

      <CommandList className="max-h-[70svh]">
        <CommandEmpty>
          <m.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex flex-col items-center py-10 text-center"
          >
            <Search className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="text-sm text-muted-foreground">
              {text.empty}
            </p>
          </m.div>
        </CommandEmpty>

        {favoriteProjects.length >
          0 && (
          <>
            <CommandGroup
              heading={
                text.favorites
              }
            >
              {favoriteProjects.map(
                (project) => (
                  <ProjectCommandItem
                    key={
                      project.slug
                    }
                    project={
                      project
                    }
                    locale={
                      locale
                    }
                    icon={Heart}
                    onSelect={() =>
                      openProject(
                        project.slug
                      )
                    }
                  />
                )
              )}
            </CommandGroup>

            <CommandSeparator />
          </>
        )}

        <CommandGroup
          heading={
            text.featured
          }
        >
          {featuredProjects.map(
            (project) => (
              <ProjectCommandItem
                key={
                  project.slug
                }
                project={
                  project
                }
                locale={locale}
                icon={Sparkles}
                onSelect={() =>
                  openProject(
                    project.slug
                  )
                }
              />
            )
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup
          heading={text.all}
        >
          {projects.map(
            (project) => {
              const Icon =
                categoryIcons[
                  project.category
                ];

              return (
                <ProjectCommandItem
                  key={
                    project.slug
                  }
                  project={
                    project
                  }
                  locale={
                    locale
                  }
                  icon={Icon}
                  onSelect={() =>
                    openProject(
                      project.slug
                    )
                  }
                />
              );
            }
          )}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup>
          <CommandItem
            value="project archive all projects metadata explorer"
            onSelect={
              openProjectArchive
            }
            className="gap-3 py-3"
          >
            <ExternalLink className="h-4 w-4 text-primary" />

            <span>
              {text.archive}
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

interface ProjectCommandItemProps {
  project: Project;
  locale: PortfolioLocale;
  icon: React.ElementType;
  onSelect: () => void;
}

function ProjectCommandItem({
  project,
  locale,
  icon: Icon,
  onSelect,
}: ProjectCommandItemProps) {
  const content =
    project.content[locale];

  const searchableValue = [
    content.title,
    content.tagline,
    content.summary,
    content.description,
    ...project.technologies,
    ...project.metadata.domains,
    ...project.metadata.capabilities,
    ...project.metadata.keywords,
    ...project.metadata.roles,
    ...(
      content.features ?? []
    ).flatMap(
      (feature) => [
        feature.title,
        feature.description,
        ...(
          feature.bullets ??
          []
        ),
      ]
    ),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <CommandItem
      value={
        searchableValue
      }
      onSelect={onSelect}
      className="group gap-3 py-3"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">
          {content.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>
            {
              categoryLabels[
                locale
              ][project.category]
            }
          </span>

          <span>•</span>

          <span>
            {
              statusLabels[
                locale
              ][project.status]
            }
          </span>

          <span>•</span>

          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" />

            {
              project.metadata
                .updatedAt
            }
          </span>
        </div>
      </div>

      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
    </CommandItem>
  );
}