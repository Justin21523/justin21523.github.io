"use client";

import {
  useMemo,
  useState,
  useTransition,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  BookOpen,
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

interface ProjectExplorerProps {
  projects: Project[];
  locale: PortfolioLocale;
}

type ProjectSort =
  | "featured"
  | "newest"
  | "oldest"
  | "title";

type UpdatedPreset =
  | "any"
  | "30d"
  | "90d"
  | "1y";

type HasFacet =
  | "github"
  | "demo"
  | "media"
  | "documentation"
  | "featured"
  | "needs-review";

interface FacetOption {
  value: string;
  label: string;
  count: number;
}

interface FilterState {
  q: string;
  categories: ProjectCategory[];
  statuses: ProjectStatus[];
  technologies: string[];
  languages: string[];
  frameworks: string[];
  platforms: string[];
  databases: string[];
  capabilities: string[];
  projectTypes: string[];
  domains: string[];
  subjects: string[];
  keywords: string[];
  audiences: string[];
  contentTypes: string[];
  dataTypes: string[];
  roles: string[];
  has: HasFacet[];
  fromYear: number;
  toYear: number;
  updatedPreset: UpdatedPreset;
  sort: ProjectSort;
  viewMode: ProjectViewMode;
}

const categories: ProjectCategory[] = [
  "information-system",
  "interactive-3d",
  "ai-data",
  "frontend",
  "backend-desktop",
];

const statuses: ProjectStatus[] = [
  "completed",
  "in-progress",
  "prototype",
  "planned",
  "archived",
];

const hasFacetValues: HasFacet[] = [
  "github",
  "demo",
  "media",
  "documentation",
  "featured",
  "needs-review",
];

export function ProjectExplorer({
  projects,
  locale,
}: ProjectExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const yearBounds = useMemo(() => getYearBounds(projects), [projects]);
  const [
    filters,
    setFilters,
  ] = useState(
    () =>
      createDefaultFilterState(
        yearBounds
      )
  );
  const [searchVal, setSearchVal] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state from searchParams on client mount and URL change
  useEffect(() => {
    const nextFilters = parseFilterState(
      new URLSearchParams(searchParams.toString()),
      yearBounds
    );
    queueMicrotask(() => {
      setFilters(nextFilters);
      setSearchVal(nextFilters.q);
    });
  }, [searchParams, yearBounds]);

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const [isPending, startTransition] = useTransition();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    setFilters((prev) => ({ ...prev, q: val }));

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      setSingleParam("q", val || undefined);
    }, 300);
  };

  const query = filters.q;
  const selectedCategories = filters.categories;
  const selectedStatuses = filters.statuses;
  const selectedTechnologies = filters.technologies;
  const selectedLanguages = filters.languages;
  const selectedFrameworks = filters.frameworks;
  const selectedPlatforms = filters.platforms;
  const selectedDatabases = filters.databases;
  const selectedCapabilities = filters.capabilities;
  const selectedProjectTypes = filters.projectTypes;
  const selectedDomains = filters.domains;
  const selectedSubjects = filters.subjects;
  const selectedKeywords = filters.keywords;
  const selectedAudiences = filters.audiences;
  const selectedContentTypes = filters.contentTypes;
  const selectedDataTypes = filters.dataTypes;
  const selectedRoles = filters.roles;
  const selectedHas = filters.has;
  const fromYear = filters.fromYear;
  const toYear = filters.toYear;
  const updatedPreset = filters.updatedPreset;
  const sort = filters.sort;
  const viewMode = filters.viewMode;

  const facetOptions = useMemo(() => {
    return {
      technologies: countOptions(projects.flatMap((project) => project.technologies)).slice(0, 18),
      languages: countOptions(projects.flatMap((project) => project.metadata.languages ?? [])).slice(0, 14),
      frameworks: countOptions(projects.flatMap((project) => project.metadata.frameworks ?? [])).slice(0, 14),
      platforms: countOptions(projects.flatMap((project) => project.metadata.platforms ?? [])).slice(0, 14),
      databases: countOptions(projects.flatMap((project) => project.metadata.database ?? [])).slice(0, 12),
      capabilities: countOptions(projects.flatMap((project) => project.metadata.capabilities ?? [])).slice(0, 18),
      projectTypes: countOptions(projects.flatMap((project) => project.metadata.projectType ? [project.metadata.projectType] : [])).slice(0, 12),
      domains: countOptions(projects.flatMap((project) => project.metadata.domains ?? [])).slice(0, 18),
      subjects: countOptions(projects.flatMap((project) => project.metadata.subjects ?? [])).slice(0, 14),
      keywords: countOptions(projects.flatMap((project) => project.metadata.keywords ?? [])).slice(0, 18),
      audiences: countOptions(projects.flatMap((project) => project.metadata.audiences ?? [])).slice(0, 12),
      contentTypes: countOptions(projects.flatMap((project) => project.metadata.contentTypes ?? [])).slice(0, 12),
      dataTypes: countOptions(projects.flatMap((project) => project.metadata.dataTypes ?? [])).slice(0, 12),
      roles: countOptions(projects.flatMap((project) => project.metadata.roles ?? [])).slice(0, 12),
    };
  }, [projects]);

  const categoryOptions: FacetOption[] = categories.map((category) => ({
    value: category,
    label: categoryLabels[locale][category],
    count: projects.filter((project) => project.category === category).length,
  }));

  const statusOptions: FacetOption[] = statuses.map((status) => ({
    value: status,
    label: statusLabels[locale][status],
    count: projects.filter((project) => project.status === status).length,
  }));

  const hasOptions: FacetOption[] = hasFacetValues.map((value) => ({
    value,
    label: getHasFacetLabel(value, locale),
    count: projects.filter((project) => projectMatchesHas(project, value)).length,
  }));

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects
      .filter((project) => {
        const content = project.content[locale];
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(project.category);
        const matchesStatus =
          selectedStatuses.length === 0 ||
          selectedStatuses.includes(project.status);
        const matchesTechnologies = includesAny(project.technologies, selectedTechnologies);
        const matchesLanguages = includesAny(project.metadata.languages ?? [], selectedLanguages);
        const matchesFrameworks = includesAny(project.metadata.frameworks ?? [], selectedFrameworks);
        const matchesPlatforms = includesAny(project.metadata.platforms ?? [], selectedPlatforms);
        const matchesDatabases = includesAny(project.metadata.database ?? [], selectedDatabases);
        const matchesCapabilities = includesAny(project.metadata.capabilities ?? [], selectedCapabilities);
        const matchesProjectTypes = includesAny(project.metadata.projectType ? [project.metadata.projectType] : [], selectedProjectTypes);
        const matchesDomains = includesAny(project.metadata.domains ?? [], selectedDomains);
        const matchesSubjects = includesAny(project.metadata.subjects ?? [], selectedSubjects);
        const matchesKeywords = includesAny(project.metadata.keywords ?? [], selectedKeywords);
        const matchesAudiences = includesAny(project.metadata.audiences ?? [], selectedAudiences);
        const matchesContentTypes = includesAny(project.metadata.contentTypes ?? [], selectedContentTypes);
        const matchesDataTypes = includesAny(project.metadata.dataTypes ?? [], selectedDataTypes);
        const matchesRoles = includesAny(project.metadata.roles ?? [], selectedRoles);
        const matchesHas =
          selectedHas.length === 0 ||
          selectedHas.some((value) => projectMatchesHas(project, value));
        const matchesYear = project.year >= fromYear && project.year <= toYear;
        const matchesUpdated = matchesUpdatedPreset(project.metadata.updatedAt, updatedPreset);
        const featureText = (content.features ?? [])
          .flatMap((feature) => [
            feature.title,
            feature.description,
            ...(feature.bullets ?? []),
          ])
          .join(" ");
        const searchableText = [
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
          project.metadata.catalogNumber,
          ...project.technologies,
          ...project.metadata.domains,
          ...project.metadata.capabilities,
          ...project.metadata.keywords,
          ...project.metadata.platforms,
          ...(project.metadata.languages ?? []),
          ...(project.metadata.frameworks ?? []),
          ...(project.metadata.database ?? []),
          ...(project.metadata.aliases ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const matchesSearch =
          normalizedQuery.length === 0 ||
          searchableText.includes(normalizedQuery);

        return (
          matchesCategory &&
          matchesStatus &&
          matchesTechnologies &&
          matchesLanguages &&
          matchesFrameworks &&
          matchesPlatforms &&
          matchesDatabases &&
          matchesCapabilities &&
          matchesProjectTypes &&
          matchesDomains &&
          matchesSubjects &&
          matchesKeywords &&
          matchesAudiences &&
          matchesContentTypes &&
          matchesDataTypes &&
          matchesRoles &&
          matchesHas &&
          matchesYear &&
          matchesUpdated &&
          matchesSearch
        );
      })
      .sort((a, b) => sortProjects(a, b, sort, locale));
  }, [
    locale,
    projects,
    query,
    selectedCapabilities,
    selectedCategories,
    selectedDatabases,
    selectedDataTypes,
    selectedAudiences,
    selectedContentTypes,
    selectedDomains,
    selectedFrameworks,
    selectedHas,
    selectedKeywords,
    selectedLanguages,
    selectedPlatforms,
    selectedProjectTypes,
    selectedRoles,
    selectedStatuses,
    selectedSubjects,
    selectedTechnologies,
    sort,
    fromYear,
    toYear,
    updatedPreset,
  ]);

  const activeFilterCount =
    Number(Boolean(query)) +
    selectedCategories.length +
    selectedStatuses.length +
    selectedTechnologies.length +
    selectedLanguages.length +
    selectedFrameworks.length +
    selectedPlatforms.length +
    selectedDatabases.length +
    selectedCapabilities.length +
    selectedProjectTypes.length +
    selectedDomains.length +
    selectedSubjects.length +
    selectedKeywords.length +
    selectedAudiences.length +
    selectedContentTypes.length +
    selectedDataTypes.length +
    selectedRoles.length +
    selectedHas.length +
    Number(fromYear !== yearBounds.min || toYear !== yearBounds.max) +
    Number(updatedPreset !== "any");

  const text = getText(locale);
  const activeFilterLabels = [
    ...selectedCategories.map((value) => categoryLabels[locale][value]),
    ...selectedStatuses.map((value) => statusLabels[locale][value]),
    ...selectedTechnologies,
    ...selectedLanguages,
    ...selectedFrameworks,
    ...selectedPlatforms,
    ...selectedDatabases,
    ...selectedCapabilities,
    ...selectedProjectTypes,
    ...selectedDomains,
    ...selectedSubjects,
    ...selectedKeywords,
    ...selectedAudiences,
    ...selectedContentTypes,
    ...selectedDataTypes,
    ...selectedRoles,
    ...selectedHas.map((value) => getHasFacetLabel(value, locale)),
    ...(fromYear !== yearBounds.min || toYear !== yearBounds.max
      ? [`${fromYear}-${toYear}`]
      : []),
    ...(updatedPreset !== "any"
      ? [getUpdatedPresetLabel(updatedPreset, locale)]
      : []),
  ];

  function replaceParams(mutate: (params: URLSearchParams) => void) {
    const nextParams = new URLSearchParams(
      buildFilterQueryString(filters, yearBounds)
    );
    mutate(nextParams);
    const queryString = nextParams.toString();
    const nextFilters =
      parseFilterState(
        nextParams,
        yearBounds
      );

    setFilters(nextFilters);

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  }

  function setSingleParam(key: string, value?: string) {
    replaceParams((params) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });
  }

  function toggleParam(key: string, value: string) {
    replaceParams((params) => {
      const current = params.getAll(key);
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      params.delete(key);
      next.forEach((item) => params.append(key, item));
      if (key === "technology") {
        params.delete("tech");
      }
    });
  }

  function setYearRange(bound: "from" | "to", value: number) {
    replaceParams((params) => {
      const nextFrom = bound === "from" ? value : fromYear;
      const nextTo = bound === "to" ? value : toYear;
      const normalizedFrom = Math.min(nextFrom, nextTo);
      const normalizedTo = Math.max(nextFrom, nextTo);

      if (normalizedFrom === yearBounds.min) {
        params.delete("from");
      } else {
        params.set("from", String(normalizedFrom));
      }

      if (normalizedTo === yearBounds.max) {
        params.delete("to");
      } else {
        params.set("to", String(normalizedTo));
      }
    });
  }

  function clearFilters() {
    const nextFilters =
      createDefaultFilterState(
        yearBounds
      );

    setFilters(nextFilters);
    setSearchVal("");

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    startTransition(() => {
      router.replace(pathname, {
        scroll: false,
      });
    });
  }

  return (
    <>
      <main className="min-h-screen pb-24 pt-28">
        <div className="mx-auto w-full max-w-[112rem] px-4 sm:px-6 lg:px-8">
          <m.header
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
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
                  value={searchVal}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder={text.search}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                {searchVal && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    aria-label={text.clear}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((current) => !current)}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-border px-4 font-medium transition-colors hover:bg-accent lg:hidden"
                >
                  <Filter className="h-4 w-4" />
                  {text.filters}
                  {activeFilterCount > 0 && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <select
                  value={sort}
                  onChange={(event) => setSingleParam("sort", event.target.value)}
                  aria-label={text.sort}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none"
                >
                  <option value="featured">{text.sortFeatured}</option>
                  <option value="newest">{text.sortNewest}</option>
                  <option value="oldest">{text.sortOldest}</option>
                  <option value="title">{text.sortTitle}</option>
                </select>

                <div className="flex h-12 gap-1 rounded-xl border border-border p-1">
                  <ViewButton active={viewMode === "grid"} label={text.gridView} onClick={() => setSingleParam("view", "grid")}>
                    <Grid2X2 className="h-4 w-4" />
                  </ViewButton>
                  <ViewButton active={viewMode === "list"} label={text.listView} onClick={() => setSingleParam("view", "list")}>
                    <List className="h-4 w-4" />
                  </ViewButton>
                  <ViewButton active={viewMode === "catalog"} label={text.catalogView} onClick={() => setSingleParam("view", "catalog")}>
                    <BookOpen className="h-4 w-4" />
                  </ViewButton>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[21rem_minmax(0,1fr)]">
            <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
              <div className="sticky top-24 space-y-5 rounded-3xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{text.filters}</h2>
                    <p className="text-xs text-muted-foreground">{text.filterHint}</p>
                  </div>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {text.clear}
                    </button>
                  )}
                </div>

                <FilterGroup title={text.category}>
                  {categoryOptions.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedCategories.includes(option.value as ProjectCategory)}
                      onChange={() => toggleParam("category", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.status}>
                  {statusOptions.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedStatuses.includes(option.value as ProjectStatus)}
                      onChange={() => toggleParam("status", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.timeline}>
                  <YearRangeFacet
                    min={yearBounds.min}
                    max={yearBounds.max}
                    from={fromYear}
                    to={toYear}
                    fromLabel={text.fromYear}
                    toLabel={text.toYear}
                    onChange={setYearRange}
                  />

                  <SelectFacet
                    label={text.updated}
                    value={updatedPreset}
                    onChange={(value) => setSingleParam("updated", value === "any" ? undefined : value)}
                    options={[
                      { value: "any", label: text.updatedAny },
                      { value: "30d", label: text.updated30d },
                      { value: "90d", label: text.updated90d },
                      { value: "1y", label: text.updated1y },
                    ]}
                  />
                </FilterGroup>

                <FilterGroup title={text.projectType}>
                  {facetOptions.projectTypes.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedProjectTypes.includes(option.value)}
                      onChange={() => toggleParam("projectType", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.domain}>
                  {facetOptions.domains.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedDomains.includes(option.value)}
                      onChange={() => toggleParam("domain", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.audience}>
                  {facetOptions.audiences.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedAudiences.includes(option.value)}
                      onChange={() => toggleParam("audience", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.has}>
                  {hasOptions.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedHas.includes(option.value as HasFacet)}
                      onChange={() => toggleParam("has", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.technology}>
                  {facetOptions.technologies.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedTechnologies.includes(option.value)}
                      onChange={() => toggleParam("technology", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.language}>
                  {facetOptions.languages.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedLanguages.includes(option.value)}
                      onChange={() => toggleParam("language", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.framework}>
                  {facetOptions.frameworks.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedFrameworks.includes(option.value)}
                      onChange={() => toggleParam("framework", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.platform}>
                  {facetOptions.platforms.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedPlatforms.includes(option.value)}
                      onChange={() => toggleParam("platform", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.database}>
                  {facetOptions.databases.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedDatabases.includes(option.value)}
                      onChange={() => toggleParam("database", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.contentType}>
                  {facetOptions.contentTypes.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedContentTypes.includes(option.value)}
                      onChange={() => toggleParam("contentType", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.dataType}>
                  {facetOptions.dataTypes.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedDataTypes.includes(option.value)}
                      onChange={() => toggleParam("dataType", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.role}>
                  {facetOptions.roles.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedRoles.includes(option.value)}
                      onChange={() => toggleParam("role", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.capability}>
                  {facetOptions.capabilities.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedCapabilities.includes(option.value)}
                      onChange={() => toggleParam("capability", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.subject}>
                  {facetOptions.subjects.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedSubjects.includes(option.value)}
                      onChange={() => toggleParam("subject", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.keyword}>
                  {facetOptions.keywords.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedKeywords.includes(option.value)}
                      onChange={() => toggleParam("keyword", option.value)}
                    />
                  ))}
                </FilterGroup>
              </div>
            </aside>

            <section>
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  <strong className="text-foreground">{filteredProjects.length}</strong>{" "}
                  {text.results}
                </p>
                {isPending && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SlidersHorizontal className="h-4 w-4 animate-pulse" />
                    {text.updating}
                  </div>
                )}
              </div>

              {activeFilterLabels.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {activeFilterLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}

              <LayoutGroup id="project-archive">
                <m.section
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid gap-8 md:grid-cols-2 2xl:grid-cols-3"
                      : viewMode === "catalog"
                        ? "grid gap-7 xl:grid-cols-2"
                        : "space-y-7"
                  }
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                      <ProjectArchiveCard
                        key={project.slug}
                        project={project}
                        locale={locale}
                        index={index}
                        viewMode={viewMode}
                        onPreview={setSelectedProject}
                      />
                    ))}
                  </AnimatePresence>
                </m.section>
              </LayoutGroup>

              {filteredProjects.length === 0 && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-dashed border-border py-24 text-center"
                >
                  <Search className="mx-auto mb-5 h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">{text.noResults}</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 font-medium text-primary"
                  >
                    {text.clear}
                  </button>
                </m.div>
              )}
            </section>
          </div>
        </div>
      </main>

      <ProjectPreviewDialog
        project={selectedProject}
        locale={locale}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

interface FilterGroupProps {
  title: string;
  children: ReactNode;
}

function FilterGroup({
  title,
  children,
}: FilterGroupProps) {
  return (
    <section className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-sm font-bold">{title}</h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

interface CheckboxFacetProps {
  option: FacetOption;
  checked: boolean;
  onChange: () => void;
}

function CheckboxFacet({
  option,
  checked,
  onChange,
}: CheckboxFacetProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={option.count === 0}
      onClick={onChange}
      className={`flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm transition-colors ${
        checked
          ? "bg-primary/10 text-primary"
          : "hover:bg-accent"
      } disabled:cursor-not-allowed disabled:opacity-45`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
          checked
            ? "border-primary bg-primary"
            : "border-border"
        }`}
      >
        {checked && (
          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
        )}
      </span>
      <span className="min-w-0 flex-1 truncate">{option.label}</span>
      <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
        {option.count}
      </span>
    </button>
  );
}

interface SelectFacetProps {
  label: string;
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChange: (value: string) => void;
}

function SelectFacet({
  label,
  value,
  options,
  onChange,
}: SelectFacetProps) {
  return (
    <label className="mt-4 block space-y-2">
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

interface YearRangeFacetProps {
  min: number;
  max: number;
  from: number;
  to: number;
  fromLabel: string;
  toLabel: string;
  onChange: (bound: "from" | "to", value: number) => void;
}

function YearRangeFacet({
  min,
  max,
  from,
  to,
  fromLabel,
  toLabel,
  onChange,
}: YearRangeFacetProps) {
  if (min === max) {
    return (
      <div className="rounded-2xl border border-border bg-background/55 p-3 text-sm text-muted-foreground">
        {fromLabel}: <strong className="text-foreground">{min}</strong>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-background/55 p-3">
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{fromLabel}: <strong className="text-foreground">{from}</strong></span>
        <span>{toLabel}: <strong className="text-foreground">{to}</strong></span>
      </div>
      <div className="space-y-3">
        <input
          type="range"
          min={min}
          max={max}
          value={from}
          onChange={(event) => onChange("from", Number(event.target.value))}
          className="w-full accent-primary"
          aria-label={fromLabel}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={to}
          onChange={(event) => onChange("to", Number(event.target.value))}
          className="w-full accent-primary"
          aria-label={toLabel}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

interface ViewButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
}

function ViewButton({
  active,
  label,
  onClick,
  children,
}: ViewButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`rounded-lg px-3 ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}

function countOptions(values: string[]): FacetOption[] {
  const counts = new Map<string, number>();
  values
    .filter((value) => value.trim().length > 0)
    .forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));

  return Array.from(counts.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .map(([value, count]) => ({
      value,
      label: value,
      count,
    }));
}

function getYearBounds(projects: Project[]) {
  const years = projects.map((project) => project.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
}

function createDefaultFilterState(
  yearBounds: {
    min: number;
    max: number;
  }
): FilterState {
  return {
    q: "",
    categories: [],
    statuses: [],
    technologies: [],
    languages: [],
    frameworks: [],
    platforms: [],
    databases: [],
    capabilities: [],
    projectTypes: [],
    domains: [],
    subjects: [],
    keywords: [],
    audiences: [],
    contentTypes: [],
    dataTypes: [],
    roles: [],
    has: [],
    fromYear: yearBounds.min,
    toYear: yearBounds.max,
    updatedPreset: "any",
    sort: "featured",
    viewMode: "grid",
  };
}

function parseFilterState(
  params: URLSearchParams,
  yearBounds: {
    min: number;
    max: number;
  }
): FilterState {
  return {
    q: params.get("q") ?? "",
    categories: parseCategories(params.getAll("category")),
    statuses: parseStatuses(params.getAll("status")),
    technologies: getUniqueParams(params, "technology", "tech"),
    languages: params.getAll("language"),
    frameworks: params.getAll("framework"),
    platforms: params.getAll("platform"),
    databases: params.getAll("database"),
    capabilities: params.getAll("capability"),
    projectTypes: params.getAll("projectType"),
    domains: params.getAll("domain"),
    subjects: params.getAll("subject"),
    keywords: params.getAll("keyword"),
    audiences: params.getAll("audience"),
    contentTypes: params.getAll("contentType"),
    dataTypes: params.getAll("dataType"),
    roles: params.getAll("role"),
    has: parseHasFacets(params.getAll("has")),
    fromYear: parseBoundedYear(params.get("from"), yearBounds.min, yearBounds.max),
    toYear: parseBoundedYear(params.get("to"), yearBounds.max, yearBounds.max),
    updatedPreset: parseUpdatedPreset(params.get("updated")),
    sort: parseSort(params.get("sort")),
    viewMode: parseViewMode(params.get("view")),
  };
}

function buildFilterQueryString(
  filters: FilterState,
  yearBounds: {
    min: number;
    max: number;
  }
) {
  const params =
    new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  appendAll(params, "category", filters.categories);
  appendAll(params, "status", filters.statuses);
  appendAll(params, "technology", filters.technologies);
  appendAll(params, "language", filters.languages);
  appendAll(params, "framework", filters.frameworks);
  appendAll(params, "platform", filters.platforms);
  appendAll(params, "database", filters.databases);
  appendAll(params, "capability", filters.capabilities);
  appendAll(params, "projectType", filters.projectTypes);
  appendAll(params, "domain", filters.domains);
  appendAll(params, "subject", filters.subjects);
  appendAll(params, "keyword", filters.keywords);
  appendAll(params, "audience", filters.audiences);
  appendAll(params, "contentType", filters.contentTypes);
  appendAll(params, "dataType", filters.dataTypes);
  appendAll(params, "role", filters.roles);
  appendAll(params, "has", filters.has);

  if (filters.fromYear !== yearBounds.min) {
    params.set("from", String(filters.fromYear));
  }

  if (filters.toYear !== yearBounds.max) {
    params.set("to", String(filters.toYear));
  }

  if (filters.updatedPreset !== "any") {
    params.set("updated", filters.updatedPreset);
  }

  if (filters.sort !== "featured") {
    params.set("sort", filters.sort);
  }

  if (filters.viewMode !== "grid") {
    params.set("view", filters.viewMode);
  }

  return params.toString();
}

function appendAll(
  params: URLSearchParams,
  key: string,
  values: string[]
) {
  values.forEach((value) => {
    params.append(key, value);
  });
}

function parseBoundedYear(
  value: string | null,
  fallback: number,
  max: number
) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, 1900), max);
}

function parseUpdatedPreset(value: string | null): UpdatedPreset {
  if (value === "30d" || value === "90d" || value === "1y") {
    return value;
  }

  return "any";
}

function matchesUpdatedPreset(updatedAt: string, preset: UpdatedPreset) {
  if (preset === "any") {
    return true;
  }

  const updatedTime = new Date(updatedAt).getTime();
  if (!Number.isFinite(updatedTime)) {
    return false;
  }

  const days = preset === "30d" ? 30 : preset === "90d" ? 90 : 365;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return updatedTime >= cutoff;
}

function includesAny(source: string[], selected: string[]) {
  if (selected.length === 0) return true;
  return selected.some((value) => source.includes(value));
}

function getUniqueParams(searchParams: URLSearchParams, key: string, legacyKey?: string) {
  return Array.from(
    new Set([
      ...searchParams.getAll(key),
      ...(legacyKey ? searchParams.getAll(legacyKey) : []),
    ])
  );
}

function projectMatchesHas(project: Project, value: HasFacet) {
  switch (value) {
    case "github":
      return project.links.some((link) => link.kind === "github");
    case "demo":
      return project.links.some((link) => link.kind === "live" || link.kind === "video") ||
        project.media.some((item) => item.type === "video");
    case "media":
      return Boolean(project.coverImage) || project.media.length > 0;
    case "documentation":
      return project.links.some((link) => link.kind === "documentation" || link.kind === "article");
    case "featured":
      return project.featured;
    case "needs-review":
      return Boolean(project.metadata.needsReview);
  }
}

function getHasFacetLabel(value: HasFacet, locale: PortfolioLocale) {
  const labels: Record<PortfolioLocale, Record<HasFacet, string>> = {
    "zh-TW": {
      github: "有 GitHub",
      demo: "有 Demo",
      media: "有截圖或媒體",
      documentation: "有文件",
      featured: "精選作品",
      "needs-review": "需要人工確認",
    },
    en: {
      github: "Has GitHub",
      demo: "Has demo",
      media: "Has screenshots or media",
      documentation: "Has documentation",
      featured: "Featured",
      "needs-review": "Needs review",
    },
  };

  return labels[locale][value];
}

function getUpdatedPresetLabel(
  value: UpdatedPreset,
  locale: PortfolioLocale
) {
  const labels: Record<
    PortfolioLocale,
    Record<UpdatedPreset, string>
  > = {
    "zh-TW": {
      any: "不限時間",
      "30d": "最近 30 天",
      "90d": "最近 90 天",
      "1y": "最近一年",
    },
    en: {
      any: "Any time",
      "30d": "Last 30 days",
      "90d": "Last 90 days",
      "1y": "Last year",
    },
  };

  return labels[locale][value];
}

function parseCategories(values: string[]): ProjectCategory[] {
  return values.filter((value): value is ProjectCategory =>
    categories.includes(value as ProjectCategory)
  );
}

function parseStatuses(values: string[]): ProjectStatus[] {
  return values.filter((value): value is ProjectStatus =>
    statuses.includes(value as ProjectStatus)
  );
}

function parseHasFacets(values: string[]): HasFacet[] {
  return values.filter((value): value is HasFacet =>
    hasFacetValues.includes(value as HasFacet)
  );
}

function parseSort(value: string | null): ProjectSort {
  const values: ProjectSort[] = ["featured", "newest", "oldest", "title"];
  return values.includes(value as ProjectSort) ? (value as ProjectSort) : "featured";
}

function parseViewMode(value: string | null): ProjectViewMode {
  if (value === "list") return "list";
  if (value === "catalog") return "catalog";
  return "grid";
}

function sortProjects(
  a: Project,
  b: Project,
  sort: ProjectSort,
  locale: PortfolioLocale
) {
  switch (sort) {
    case "newest":
      return new Date(b.metadata.updatedAt).getTime() - new Date(a.metadata.updatedAt).getTime();
    case "oldest":
      return new Date(a.metadata.updatedAt).getTime() - new Date(b.metadata.updatedAt).getTime();
    case "title":
      return a.content[locale].title.localeCompare(b.content[locale].title, locale);
    case "featured":
    default:
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.year - a.year;
  }
}

function getText(locale: PortfolioLocale) {
  return locale === "en"
    ? {
        eyebrow: "Project Archive",
        title: "Explore all projects",
        description:
          "Search by project evidence: metadata, technology, domain, platform, status, and capability.",
        search: "Search projects, technologies, metadata, or features",
        filters: "Filters",
        filterHint: "Checkbox facets are synced to the URL.",
        clear: "Clear all",
        category: "Project category",
        status: "Status",
        timeline: "Timeline",
        fromYear: "From",
        toYear: "To",
        updated: "Updated",
        updatedAny: "Any time",
        updated30d: "Last 30 days",
        updated90d: "Last 90 days",
        updated1y: "Last year",
        projectType: "Project type",
        domain: "Domain",
        audience: "Audience",
        technology: "Technology",
        language: "Programming language",
        framework: "Framework",
        platform: "Platform",
        database: "Database",
        contentType: "Content type",
        dataType: "Data type",
        role: "Role",
        capability: "Capability",
        subject: "Subject",
        keyword: "Keyword",
        has: "Availability",
        results: "projects",
        noResults: "No projects match the current filters.",
        sort: "Sort",
        sortFeatured: "Featured first",
        sortNewest: "Recently updated",
        sortOldest: "Oldest first",
        sortTitle: "Title",
        gridView: "Grid view",
        listView: "List view",
        catalogView: "Catalog record view",
        updating: "Updating...",
      }
    : {
        eyebrow: "Project Archive",
        title: "瀏覽所有作品",
        description:
          "用 Metadata、技術、領域、平台、狀態與能力證據檢索作品，而不是只看作品卡片。",
        search: "搜尋作品、技術、Metadata 或功能",
        filters: "篩選條件",
        filterHint: "勾選條件會同步到網址，可直接分享。",
        clear: "全部清除",
        category: "專案分類",
        status: "完成狀態",
        timeline: "時間軸",
        fromYear: "起始年",
        toYear: "結束年",
        updated: "更新時間",
        updatedAny: "不限時間",
        updated30d: "最近 30 天",
        updated90d: "最近 90 天",
        updated1y: "最近一年",
        projectType: "專案類型",
        domain: "應用領域",
        audience: "目標對象",
        technology: "使用技術",
        language: "程式語言",
        framework: "框架",
        platform: "平台",
        database: "資料庫",
        contentType: "內容形式",
        dataType: "資料型態",
        role: "我的角色",
        capability: "能力證據",
        subject: "主題",
        keyword: "關鍵字",
        has: "可用資源",
        results: "個作品",
        noResults: "找不到符合目前條件的作品。",
        sort: "排序方式",
        sortFeatured: "精選優先",
        sortNewest: "最近更新",
        sortOldest: "最早優先",
        sortTitle: "標題",
        gridView: "格狀檢視",
        listView: "列表檢視",
        catalogView: "館藏紀錄檢視",
        updating: "更新中...",
      };
}
