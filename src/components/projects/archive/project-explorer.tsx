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
import {
  applyProjectFilters,
  buildFacetOptions,
  createDefaultFilterState,
  getHasFacetLabel,
  getUpdatedPresetLabel,
  getYearBounds,
  hasFacetValues,
  normalizeFilterState,
  parseFilterState,
  projectCategories,
  projectMatchesHas,
  projectStatuses,
  removeFilterValue,
  serializeFilterState,
  toggleFilterValue,
  type FacetOption,
  type FilterListKey,
  type FilterState,
  type HasFacet,
  type ProjectSort,
  type UpdatedPreset,
} from "@/lib/project-filters";
import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
  ProjectStatus,
} from "@/types/projects";

import {
  ProjectArchiveCard,
} from "./project-archive-card";
import {
  ProjectPreviewDialog,
} from "./project-preview-dialog";

interface ProjectExplorerProps {
  projects: Project[];
  locale: PortfolioLocale;
}

const pinnedProjectSlugs = [
  "ir-rag-evaluation-lab",
  "agentic-bi-dataops-copilot",
  "nyc-taxi-mobility-analytics",
  "openalex-research-rag",
  "music-intelligence-platform",
  "lyrics-cultural-analytics-lab",
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
    const nextFilters =
      normalizeFilterState(
        {
          ...filters,
          q: val,
        },
        yearBounds
      );
    setFilters(nextFilters);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      commitFilters(nextFilters);
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
    return buildFacetOptions(projects);
  }, [projects]);

  const categoryOptions: FacetOption[] = projectCategories.map((category) => ({
    value: category,
    label: categoryLabels[locale][category],
    count: projects.filter((project) => project.category === category).length,
  }));

  const statusOptions: FacetOption[] = projectStatuses.map((status) => ({
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
    return applyProjectFilters(projects, filters, locale);
  }, [filters, locale, projects]);

  const pinnedProjects =
    pinnedProjectSlugs
      .map((slug) =>
        filteredProjects.find(
          (project) =>
            project.slug === slug
        )
      )
      .filter(
        (project): project is Project =>
          Boolean(project)
      );

  const listedProjects =
    pinnedProjects.length > 0
      ? filteredProjects.filter(
          (project) =>
            !pinnedProjectSlugs.includes(
              project.slug
            )
        )
      : filteredProjects;

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
  const activeFilterChips: Array<{
    key: string;
    label: string;
    onRemove: () => void;
  }> = [
    ...selectedCategories.map((value) => ({
      key: `category-${value}`,
      label: categoryLabels[locale][value],
      onRemove: () => removeFacet("categories", value),
    })),
    ...selectedStatuses.map((value) => ({
      key: `status-${value}`,
      label: statusLabels[locale][value],
      onRemove: () => removeFacet("statuses", value),
    })),
    ...selectedTechnologies.map((value) => ({
      key: `technology-${value}`,
      label: value,
      onRemove: () => removeFacet("technologies", value),
    })),
    ...selectedLanguages.map((value) => ({
      key: `language-${value}`,
      label: value,
      onRemove: () => removeFacet("languages", value),
    })),
    ...selectedFrameworks.map((value) => ({
      key: `framework-${value}`,
      label: value,
      onRemove: () => removeFacet("frameworks", value),
    })),
    ...selectedPlatforms.map((value) => ({
      key: `platform-${value}`,
      label: value,
      onRemove: () => removeFacet("platforms", value),
    })),
    ...selectedDatabases.map((value) => ({
      key: `database-${value}`,
      label: value,
      onRemove: () => removeFacet("databases", value),
    })),
    ...selectedCapabilities.map((value) => ({
      key: `capability-${value}`,
      label: value,
      onRemove: () => removeFacet("capabilities", value),
    })),
    ...selectedProjectTypes.map((value) => ({
      key: `projectType-${value}`,
      label: value,
      onRemove: () => removeFacet("projectTypes", value),
    })),
    ...selectedDomains.map((value) => ({
      key: `domain-${value}`,
      label: value,
      onRemove: () => removeFacet("domains", value),
    })),
    ...selectedSubjects.map((value) => ({
      key: `subject-${value}`,
      label: value,
      onRemove: () => removeFacet("subjects", value),
    })),
    ...selectedKeywords.map((value) => ({
      key: `keyword-${value}`,
      label: value,
      onRemove: () => removeFacet("keywords", value),
    })),
    ...selectedAudiences.map((value) => ({
      key: `audience-${value}`,
      label: value,
      onRemove: () => removeFacet("audiences", value),
    })),
    ...selectedContentTypes.map((value) => ({
      key: `contentType-${value}`,
      label: value,
      onRemove: () => removeFacet("contentTypes", value),
    })),
    ...selectedDataTypes.map((value) => ({
      key: `dataType-${value}`,
      label: value,
      onRemove: () => removeFacet("dataTypes", value),
    })),
    ...selectedRoles.map((value) => ({
      key: `role-${value}`,
      label: value,
      onRemove: () => removeFacet("roles", value),
    })),
    ...selectedHas.map((value) => ({
      key: `has-${value}`,
      label: getHasFacetLabel(value, locale),
      onRemove: () => removeFacet("has", value),
    })),
    ...(fromYear !== yearBounds.min || toYear !== yearBounds.max
      ? [
          {
            key: "year-range",
            label: `${fromYear}-${toYear}`,
            onRemove: () =>
              commitFilters({
                ...filters,
                fromYear: yearBounds.min,
                toYear: yearBounds.max,
              }),
          },
        ]
      : []),
    ...(updatedPreset !== "any"
      ? [
          {
            key: "updated",
            label: getUpdatedPresetLabel(updatedPreset, locale),
            onRemove: () =>
              setSingleFilter({
                updatedPreset: "any",
              }),
          },
        ]
      : []),
  ];

  function commitFilters(nextFilters: FilterState) {
    const normalizedFilters =
      normalizeFilterState(
        nextFilters,
        yearBounds
      );
    const queryString =
      serializeFilterState(
        normalizedFilters,
        yearBounds
      );

    setFilters(normalizedFilters);
    setSearchVal(normalizedFilters.q);

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  }

  function setSingleFilter(
    values: Partial<
      Pick<
        FilterState,
        "sort" | "viewMode" | "updatedPreset" | "q"
      >
    >
  ) {
    commitFilters({
      ...filters,
      ...values,
    });
  }

  function toggleFacet<T extends FilterListKey>(
    key: T,
    value: FilterState[T][number]
  ) {
    commitFilters(
      toggleFilterValue(
        filters,
        key,
        value,
        yearBounds
      )
    );
  }

  function setYearRange(bound: "from" | "to", value: number) {
    commitFilters({
      ...filters,
      fromYear:
        bound === "from"
          ? value
          : fromYear,
      toYear:
        bound === "to"
          ? value
          : toYear,
    });
  }

  function removeFacet<T extends FilterListKey>(
    key: T,
    value: FilterState[T][number]
  ) {
    commitFilters(
      removeFilterValue(
        filters,
        key,
        value,
        yearBounds
      )
    );
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
                  onChange={(event) =>
                    setSingleFilter({
                      sort: event.target.value as ProjectSort,
                    })
                  }
                  aria-label={text.sort}
                  className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none"
                >
                  <option value="featured">{text.sortFeatured}</option>
                  <option value="newest">{text.sortNewest}</option>
                  <option value="oldest">{text.sortOldest}</option>
                  <option value="title">{text.sortTitle}</option>
                </select>

                <div className="flex h-12 gap-1 rounded-xl border border-border p-1">
                  <ViewButton active={viewMode === "grid"} label={text.gridView} onClick={() => setSingleFilter({ viewMode: "grid" })}>
                    <Grid2X2 className="h-4 w-4" />
                  </ViewButton>
                  <ViewButton active={viewMode === "list"} label={text.listView} onClick={() => setSingleFilter({ viewMode: "list" })}>
                    <List className="h-4 w-4" />
                  </ViewButton>
                  <ViewButton active={viewMode === "catalog"} label={text.catalogView} onClick={() => setSingleFilter({ viewMode: "catalog" })}>
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
                      onChange={() => toggleFacet("categories", option.value as ProjectCategory)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.status}>
                  {statusOptions.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedStatuses.includes(option.value as ProjectStatus)}
                      onChange={() => toggleFacet("statuses", option.value as ProjectStatus)}
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
                    onChange={(value) => setSingleFilter({ updatedPreset: value as UpdatedPreset })}
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
                      onChange={() => toggleFacet("projectTypes", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.domain}>
                  {facetOptions.domains.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedDomains.includes(option.value)}
                      onChange={() => toggleFacet("domains", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.audience}>
                  {facetOptions.audiences.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedAudiences.includes(option.value)}
                      onChange={() => toggleFacet("audiences", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.has}>
                  {hasOptions.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedHas.includes(option.value as HasFacet)}
                      onChange={() => toggleFacet("has", option.value as HasFacet)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.technology}>
                  {facetOptions.technologies.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedTechnologies.includes(option.value)}
                      onChange={() => toggleFacet("technologies", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.language}>
                  {facetOptions.languages.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedLanguages.includes(option.value)}
                      onChange={() => toggleFacet("languages", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.framework}>
                  {facetOptions.frameworks.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedFrameworks.includes(option.value)}
                      onChange={() => toggleFacet("frameworks", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.platform}>
                  {facetOptions.platforms.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedPlatforms.includes(option.value)}
                      onChange={() => toggleFacet("platforms", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.database}>
                  {facetOptions.databases.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedDatabases.includes(option.value)}
                      onChange={() => toggleFacet("databases", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.contentType}>
                  {facetOptions.contentTypes.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedContentTypes.includes(option.value)}
                      onChange={() => toggleFacet("contentTypes", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.dataType}>
                  {facetOptions.dataTypes.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedDataTypes.includes(option.value)}
                      onChange={() => toggleFacet("dataTypes", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.role}>
                  {facetOptions.roles.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedRoles.includes(option.value)}
                      onChange={() => toggleFacet("roles", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.capability}>
                  {facetOptions.capabilities.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedCapabilities.includes(option.value)}
                      onChange={() => toggleFacet("capabilities", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.subject}>
                  {facetOptions.subjects.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedSubjects.includes(option.value)}
                      onChange={() => toggleFacet("subjects", option.value)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={text.keyword}>
                  {facetOptions.keywords.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedKeywords.includes(option.value)}
                      onChange={() => toggleFacet("keywords", option.value)}
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

              {activeFilterChips.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {activeFilterChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.onRemove}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
                    >
                      {chip.label}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              )}

              {pinnedProjects.length > 0 && (
                <section className="mb-10">
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {text.pinnedEyebrow}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight">
                        {text.pinnedTitle}
                      </h2>
                    </div>
                  </div>

                  <div
                    className={
                      viewMode === "catalog"
                        ? "grid gap-7 xl:grid-cols-2"
                        : "grid gap-8 xl:grid-cols-2"
                    }
                  >
                    {pinnedProjects.map(
                      (project, index) => (
                        <ProjectArchiveCard
                          key={project.slug}
                          project={project}
                          locale={locale}
                          index={index}
                          viewMode={
                            viewMode === "catalog"
                              ? "catalog"
                              : "list"
                          }
                          onPreview={setSelectedProject}
                        />
                      )
                    )}
                  </div>
                </section>
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
                    {listedProjects.map((project, index) => (
                      <ProjectArchiveCard
                        key={project.slug}
                        project={project}
                        locale={locale}
                        index={
                          pinnedProjects.length > 0
                            ? index +
                              pinnedProjects.length
                            : index
                        }
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
        pinnedEyebrow: "Highlighted project",
        pinnedTitle: "OpenAlex Research RAG",
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
        pinnedEyebrow: "重點作品",
        pinnedTitle: "OpenAlex 學術研究智能平台",
      };
}
