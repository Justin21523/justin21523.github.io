import type {
  PortfolioLocale,
  Project,
  ProjectCategory,
  ProjectStatus,
} from "@/types/projects";

export type ProjectSort =
  | "featured"
  | "newest"
  | "oldest"
  | "title";

export type UpdatedPreset =
  | "any"
  | "30d"
  | "90d"
  | "1y";

export type HasFacet =
  | "github"
  | "demo"
  | "media"
  | "documentation"
  | "featured"
  | "needs-review";

export type ProjectViewMode =
  | "grid"
  | "list"
  | "catalog";

const pinnedProjectSlugs = [
  "ir-rag-evaluation-lab",
  "dcard-trending-crawler",
  "agentic-bi-dataops-copilot",
  "nyc-taxi-mobility-analytics",
  "openalex-research-rag",
  "music-intelligence-platform",
  "lyrics-cultural-analytics-lab",
];

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface YearBounds {
  min: number;
  max: number;
}

export interface FilterState {
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

export type FilterListKey =
  | "categories"
  | "statuses"
  | "technologies"
  | "languages"
  | "frameworks"
  | "platforms"
  | "databases"
  | "capabilities"
  | "projectTypes"
  | "domains"
  | "subjects"
  | "keywords"
  | "audiences"
  | "contentTypes"
  | "dataTypes"
  | "roles"
  | "has";

export const projectCategories: ProjectCategory[] = [
  "information-system",
  "interactive-3d",
  "ai-data",
  "frontend",
  "backend-desktop",
];

export const projectStatuses: ProjectStatus[] = [
  "completed",
  "in-progress",
  "prototype",
  "planned",
  "archived",
];

export const hasFacetValues: HasFacet[] = [
  "github",
  "demo",
  "media",
  "documentation",
  "featured",
  "needs-review",
];

const queryKeys: Record<FilterListKey, string> = {
  categories: "category",
  statuses: "status",
  technologies: "technology",
  languages: "language",
  frameworks: "framework",
  platforms: "platform",
  databases: "database",
  capabilities: "capability",
  projectTypes: "projectType",
  domains: "domain",
  subjects: "subject",
  keywords: "keyword",
  audiences: "audience",
  contentTypes: "contentType",
  dataTypes: "dataType",
  roles: "role",
  has: "has",
};

export function getYearBounds(projects: Project[]): YearBounds {
  const years = projects.map((project) => project.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
}

export function createDefaultFilterState(yearBounds: YearBounds): FilterState {
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

export function parseFilterState(
  params: URLSearchParams,
  yearBounds: YearBounds
): FilterState {
  const fromYear = parseBoundedYear(
    params.get("from"),
    yearBounds.min,
    yearBounds
  );
  const toYear = parseBoundedYear(
    params.get("to"),
    yearBounds.max,
    yearBounds
  );

  return normalizeFilterState(
    {
      q: params.get("q") ?? "",
      categories: parseCategories(params.getAll("category")),
      statuses: parseStatuses(params.getAll("status")),
      technologies: getUniqueParams(params, "technology", "tech"),
      languages: getUniqueParams(params, "language"),
      frameworks: getUniqueParams(params, "framework"),
      platforms: getUniqueParams(params, "platform"),
      databases: getUniqueParams(params, "database"),
      capabilities: getUniqueParams(params, "capability"),
      projectTypes: getUniqueParams(params, "projectType"),
      domains: getUniqueParams(params, "domain"),
      subjects: getUniqueParams(params, "subject"),
      keywords: getUniqueParams(params, "keyword"),
      audiences: getUniqueParams(params, "audience"),
      contentTypes: getUniqueParams(params, "contentType"),
      dataTypes: getUniqueParams(params, "dataType"),
      roles: getUniqueParams(params, "role"),
      has: parseHasFacets(params.getAll("has")),
      fromYear,
      toYear,
      updatedPreset: parseUpdatedPreset(params.get("updated")),
      sort: parseSort(params.get("sort")),
      viewMode: parseViewMode(params.get("view")),
    },
    yearBounds
  );
}

export function serializeFilterState(
  filters: FilterState,
  yearBounds: YearBounds
) {
  const normalized =
    normalizeFilterState(filters, yearBounds);
  const params =
    new URLSearchParams();

  if (normalized.q.trim()) {
    params.set("q", normalized.q.trim());
  }

  appendAll(params, "category", normalized.categories);
  appendAll(params, "status", normalized.statuses);
  appendAll(params, "technology", normalized.technologies);
  appendAll(params, "language", normalized.languages);
  appendAll(params, "framework", normalized.frameworks);
  appendAll(params, "platform", normalized.platforms);
  appendAll(params, "database", normalized.databases);
  appendAll(params, "capability", normalized.capabilities);
  appendAll(params, "projectType", normalized.projectTypes);
  appendAll(params, "domain", normalized.domains);
  appendAll(params, "subject", normalized.subjects);
  appendAll(params, "keyword", normalized.keywords);
  appendAll(params, "audience", normalized.audiences);
  appendAll(params, "contentType", normalized.contentTypes);
  appendAll(params, "dataType", normalized.dataTypes);
  appendAll(params, "role", normalized.roles);
  appendAll(params, "has", normalized.has);

  if (normalized.fromYear !== yearBounds.min) {
    params.set("from", String(normalized.fromYear));
  }

  if (normalized.toYear !== yearBounds.max) {
    params.set("to", String(normalized.toYear));
  }

  if (normalized.updatedPreset !== "any") {
    params.set("updated", normalized.updatedPreset);
  }

  if (normalized.sort !== "featured") {
    params.set("sort", normalized.sort);
  }

  if (normalized.viewMode !== "grid") {
    params.set("view", normalized.viewMode);
  }

  return params.toString();
}

export function normalizeFilterState(
  filters: FilterState,
  yearBounds: YearBounds
): FilterState {
  const fromYear =
    clampYear(filters.fromYear, yearBounds);
  const toYear =
    clampYear(filters.toYear, yearBounds);

  return {
    ...filters,
    q: filters.q,
    categories: uniqueValues(filters.categories).filter((value) =>
      projectCategories.includes(value)
    ),
    statuses: uniqueValues(filters.statuses).filter((value) =>
      projectStatuses.includes(value)
    ),
    technologies: uniqueValues(filters.technologies),
    languages: uniqueValues(filters.languages),
    frameworks: uniqueValues(filters.frameworks),
    platforms: uniqueValues(filters.platforms),
    databases: uniqueValues(filters.databases),
    capabilities: uniqueValues(filters.capabilities),
    projectTypes: uniqueValues(filters.projectTypes),
    domains: uniqueValues(filters.domains),
    subjects: uniqueValues(filters.subjects),
    keywords: uniqueValues(filters.keywords),
    audiences: uniqueValues(filters.audiences),
    contentTypes: uniqueValues(filters.contentTypes),
    dataTypes: uniqueValues(filters.dataTypes),
    roles: uniqueValues(filters.roles),
    has: uniqueValues(filters.has).filter((value) =>
      hasFacetValues.includes(value)
    ),
    fromYear: Math.min(fromYear, toYear),
    toYear: Math.max(fromYear, toYear),
  };
}

export function toggleFilterValue<T extends FilterListKey>(
  filters: FilterState,
  key: T,
  value: FilterState[T][number],
  yearBounds: YearBounds
) {
  const current = filters[key] as string[];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  return normalizeFilterState(
    {
      ...filters,
      [key]: next,
    },
    yearBounds
  );
}

export function removeFilterValue<T extends FilterListKey>(
  filters: FilterState,
  key: T,
  value: FilterState[T][number],
  yearBounds: YearBounds
) {
  return normalizeFilterState(
    {
      ...filters,
      [key]: (filters[key] as string[]).filter((item) => item !== value),
    },
    yearBounds
  );
}

export function applyProjectFilters(
  projects: Project[],
  filters: FilterState,
  locale: PortfolioLocale
) {
  const normalized =
    filters.q.trim().toLowerCase();

  return projects
    .filter((project) => {
      const content = project.content[locale];
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

      return (
        includesAny([project.category], filters.categories) &&
        includesAny([project.status], filters.statuses) &&
        includesAny(project.technologies, filters.technologies) &&
        includesAny(project.metadata.languages ?? [], filters.languages) &&
        includesAny(project.metadata.frameworks ?? [], filters.frameworks) &&
        includesAny(project.metadata.platforms ?? [], filters.platforms) &&
        includesAny(project.metadata.database ?? [], filters.databases) &&
        includesAny(project.metadata.capabilities ?? [], filters.capabilities) &&
        includesAny(project.metadata.projectType ? [project.metadata.projectType] : [], filters.projectTypes) &&
        includesAny(project.metadata.domains ?? [], filters.domains) &&
        includesAny(project.metadata.subjects ?? [], filters.subjects) &&
        includesAny(project.metadata.keywords ?? [], filters.keywords) &&
        includesAny(project.metadata.audiences ?? [], filters.audiences) &&
        includesAny(project.metadata.contentTypes ?? [], filters.contentTypes) &&
        includesAny(project.metadata.dataTypes ?? [], filters.dataTypes) &&
        includesAny(project.metadata.roles ?? [], filters.roles) &&
        matchesHas(project, filters.has) &&
        project.year >= filters.fromYear &&
        project.year <= filters.toYear &&
        matchesUpdatedPreset(project.metadata.updatedAt, filters.updatedPreset) &&
        (normalized.length === 0 || searchableText.includes(normalized))
      );
    })
    .sort((a, b) =>
      sortProjects(a, b, filters.sort, locale)
    );
}

export function buildFacetOptions(projects: Project[]) {
  return {
    technologies: countOptions(projects.flatMap((project) => project.technologies)),
    languages: countOptions(projects.flatMap((project) => project.metadata.languages ?? [])),
    frameworks: countOptions(projects.flatMap((project) => project.metadata.frameworks ?? [])),
    platforms: countOptions(projects.flatMap((project) => project.metadata.platforms ?? [])),
    databases: countOptions(projects.flatMap((project) => project.metadata.database ?? [])),
    capabilities: countOptions(projects.flatMap((project) => project.metadata.capabilities ?? [])),
    projectTypes: countOptions(projects.flatMap((project) => project.metadata.projectType ? [project.metadata.projectType] : [])),
    domains: countOptions(projects.flatMap((project) => project.metadata.domains ?? [])),
    subjects: countOptions(projects.flatMap((project) => project.metadata.subjects ?? [])),
    keywords: countOptions(projects.flatMap((project) => project.metadata.keywords ?? [])),
    audiences: countOptions(projects.flatMap((project) => project.metadata.audiences ?? [])),
    contentTypes: countOptions(projects.flatMap((project) => project.metadata.contentTypes ?? [])),
    dataTypes: countOptions(projects.flatMap((project) => project.metadata.dataTypes ?? [])),
    roles: countOptions(projects.flatMap((project) => project.metadata.roles ?? [])),
  };
}

export function projectMatchesHas(project: Project, value: HasFacet) {
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

export function getHasFacetLabel(value: HasFacet, locale: PortfolioLocale) {
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

export function getUpdatedPresetLabel(
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

function countOptions(values: string[]): FacetOption[] {
  const counts = new Map<string, number>();
  values
    .map((value) => value.trim())
    .filter(Boolean)
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

function matchesHas(project: Project, selected: HasFacet[]) {
  return selected.length === 0 ||
    selected.some((value) => projectMatchesHas(project, value));
}

function includesAny(source: string[], selected: string[]) {
  if (selected.length === 0) return true;
  const sourceSet = new Set(source.map((value) => value.toLowerCase()));
  return selected.some((value) => sourceSet.has(value.toLowerCase()));
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

function sortProjects(
  a: Project,
  b: Project,
  sort: ProjectSort,
  locale: PortfolioLocale
) {
  const priorityDelta =
    getPinnedProjectRank(a) -
    getPinnedProjectRank(b);

  if (priorityDelta !== 0) {
    return priorityDelta;
  }

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

function getPinnedProjectRank(project: Project) {
  const index =
    pinnedProjectSlugs.indexOf(
      project.slug
    );

  return index === -1
    ? Number.POSITIVE_INFINITY
    : index;
}

function parseCategories(values: string[]): ProjectCategory[] {
  return values.filter((value): value is ProjectCategory =>
    projectCategories.includes(value as ProjectCategory)
  );
}

function parseStatuses(values: string[]): ProjectStatus[] {
  return values.filter((value): value is ProjectStatus =>
    projectStatuses.includes(value as ProjectStatus)
  );
}

function parseHasFacets(values: string[]): HasFacet[] {
  return values.filter((value): value is HasFacet =>
    hasFacetValues.includes(value as HasFacet)
  );
}

function parseUpdatedPreset(value: string | null): UpdatedPreset {
  if (value === "30d" || value === "90d" || value === "1y") {
    return value;
  }

  return "any";
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

function parseBoundedYear(
  value: string | null,
  fallback: number,
  yearBounds: YearBounds
) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return clampYear(parsed, yearBounds);
}

function clampYear(value: number, yearBounds: YearBounds) {
  return Math.min(Math.max(value, yearBounds.min), yearBounds.max);
}

function appendAll(
  params: URLSearchParams,
  key: string,
  values: string[]
) {
  uniqueValues(values).forEach((value) => {
    params.append(key, value);
  });
}

function getUniqueParams(searchParams: URLSearchParams, key: string, legacyKey?: string) {
  return uniqueValues([
    ...searchParams.getAll(key),
    ...(legacyKey ? searchParams.getAll(legacyKey) : []),
  ]);
}

function uniqueValues<T extends string>(values: T[]) {
  return Array.from(
    new Set(values.map((value) => value.trim()).filter(Boolean))
  ) as T[];
}

export function getQueryKey(key: FilterListKey) {
  return queryKeys[key];
}
