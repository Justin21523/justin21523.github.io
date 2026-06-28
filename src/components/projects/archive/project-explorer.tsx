"use client";

import {
  useCallback,
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
  getProjectTypeGroupLabel,
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
  archiveCopy?: {
    eyebrow: string;
    title: string;
    description: string;
  };
}

export function ProjectExplorer({
  projects,
  locale,
  archiveCopy,
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
  const facetOptions = useMemo(() => {
    return buildFacetOptions(projects);
  }, [projects]);
  const normalizeVisibleFilters = useCallback((nextFilters: FilterState) => {
    const normalized = normalizeFilterState(nextFilters, yearBounds);
    const visibleTechnologies = new Set(facetOptions.technologies.map((option) => option.value));
    const visibleProjectTypes = new Set(facetOptions.projectTypes.map((option) => option.value));

    return {
      ...normalized,
      technologies: normalized.technologies.filter((value) => visibleTechnologies.has(value)),
      projectTypes: normalized.projectTypes.filter((value) => visibleProjectTypes.has(value)),
    };
  }, [facetOptions, yearBounds]);

  // Sync state from searchParams on client mount and URL change
  useEffect(() => {
    const nextFilters = parseFilterState(
      new URLSearchParams(searchParams.toString()),
      yearBounds
    );
    const visibleFilters = normalizeVisibleFilters(nextFilters);
    queueMicrotask(() => {
      setFilters(visibleFilters);
      setSearchVal(visibleFilters.q);
    });
  }, [normalizeVisibleFilters, searchParams, yearBounds]);

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
  const selectedProjectTypes = filters.projectTypes;
  const selectedHas = filters.has;
  const sort = filters.sort;
  const viewMode = filters.viewMode;

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

  const projectTypeOptions = facetOptions.projectTypes.map((option) => ({
    ...option,
    label: getProjectTypeGroupLabel(option.value, locale),
  }));

  const filteredProjects = useMemo(() => {
    return applyProjectFilters(projects, filters, locale);
  }, [filters, locale, projects]);

  const listedProjects = filteredProjects;

  const activeFilterCount =
    Number(Boolean(query)) +
    selectedCategories.length +
    selectedStatuses.length +
    selectedTechnologies.length +
    selectedProjectTypes.length +
    selectedHas.length;

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
    ...selectedProjectTypes.map((value) => ({
      key: `projectType-${value}`,
      label: getProjectTypeGroupLabel(value, locale),
      onRemove: () => removeFacet("projectTypes", value),
    })),
    ...selectedHas.map((value) => ({
      key: `has-${value}`,
      label: getHasFacetLabel(value, locale),
      onRemove: () => removeFacet("has", value),
    })),
  ];

  function commitFilters(nextFilters: FilterState) {
    const normalizedFilters =
      normalizeVisibleFilters(nextFilters);
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
        "sort" | "viewMode" | "q"
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
              {archiveCopy?.eyebrow ?? text.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {archiveCopy?.title ?? text.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              {archiveCopy?.description ?? text.description}
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

                <FilterGroup title={text.projectType}>
                  {projectTypeOptions.map((option) => (
                    <CheckboxFacet
                      key={option.value}
                      option={option}
                      checked={selectedProjectTypes.includes(option.value)}
                      onChange={() => toggleFacet("projectTypes", option.value)}
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

              <LayoutGroup id="project-archive">
                <m.section
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
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
