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
  "dcard-trending-crawler",
  "ir-rag-evaluation-lab",
  "agentic-bi-dataops-copilot",
  "nyc-taxi-mobility-analytics",
  "openalex-research-rag",
  "music-intelligence-platform",
  "lyrics-cultural-analytics-lab",
];

const fixedFeaturedSortSlugs = [
  "dcard-trending-crawler",
  "ir-rag-evaluation-lab",
  "agentic-bi-dataops-copilot",
  "nyc-taxi-mobility-analytics",
  "openalex-research-rag",
  "music-intelligence-platform",
  "lyrics-cultural-analytics-lab",
  "2d-animation-lora-pipeline",
  "3d-animation-lora-pipeline",
  "3d-maze-explorer",
  "3d-platformer-runner",
  "ai-3d-studio",
  "ai-game-website",
  "ai-knowledge-workspace",
  "amazon-review-intelligence",
  "animation-ai-studio",
  "anime-adventure-lab",
  "aqua-rush",
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

export const projectTypeGroups = [
  "AI / Data Platforms",
  "RAG / Search",
  "BI / Analytics",
  "Data Engineering / Crawlers",
  "Generative AI Media",
  "3D / Interactive",
  "Games / Simulation",
  "Frontend / Web UI",
  "Full-Stack Web Apps",
  "Desktop / Cross-platform",
  "Backend / API / CLI",
  "Automation / Scraping",
  "Learning Labs",
  "Library / Knowledge Systems",
  "Infrastructure / DevOps",
  "Portfolio / Case Study",
] as const;

export type ProjectTypeGroup =
  (typeof projectTypeGroups)[number];

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
  appendAll(params, "projectType", normalized.projectTypes);
  appendAll(params, "has", normalized.has);

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
    languages: [],
    frameworks: [],
    platforms: [],
    databases: [],
    capabilities: [],
    projectTypes: uniqueValues(filters.projectTypes).filter((value) =>
      projectTypeGroups.includes(value as ProjectTypeGroup)
    ),
    domains: [],
    subjects: [],
    keywords: [],
    audiences: [],
    contentTypes: [],
    dataTypes: [],
    roles: [],
    has: uniqueValues(filters.has).filter((value) =>
      hasFacetValues.includes(value)
    ),
    fromYear: yearBounds.min,
    toYear: yearBounds.max,
    updatedPreset: "any",
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
        getProjectTypeGroup(project),
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
        includesAny([getProjectTypeGroup(project)], filters.projectTypes) &&
        matchesHas(project, filters.has) &&
        (normalized.length === 0 || searchableText.includes(normalized))
      );
    })
    .sort((a, b) =>
      sortProjects(a, b, filters.sort, locale)
    );
}

export function buildFacetOptions(projects: Project[]) {
  return {
    technologies: countOptions(projects.flatMap((project) => project.technologies)).slice(0, 20),
    languages: countOptions(projects.flatMap((project) => project.metadata.languages ?? [])),
    frameworks: countOptions(projects.flatMap((project) => project.metadata.frameworks ?? [])),
    platforms: countOptions(projects.flatMap((project) => project.metadata.platforms ?? [])),
    databases: countOptions(projects.flatMap((project) => project.metadata.database ?? [])),
    capabilities: countOptions(projects.flatMap((project) => project.metadata.capabilities ?? [])),
    projectTypes: countOptions(projects.map((project) => getProjectTypeGroup(project))),
    domains: countOptions(projects.flatMap((project) => project.metadata.domains ?? [])),
    subjects: countOptions(projects.flatMap((project) => project.metadata.subjects ?? [])),
    keywords: countOptions(projects.flatMap((project) => project.metadata.keywords ?? [])),
    audiences: countOptions(projects.flatMap((project) => project.metadata.audiences ?? [])),
    contentTypes: countOptions(projects.flatMap((project) => project.metadata.contentTypes ?? [])),
    dataTypes: countOptions(projects.flatMap((project) => project.metadata.dataTypes ?? [])),
    roles: countOptions(projects.flatMap((project) => project.metadata.roles ?? [])),
  };
}

export function getProjectTypeGroup(project: Project): ProjectTypeGroup {
  const terms = [
    project.category,
    project.metadata.projectType,
    ...project.technologies,
    ...project.metadata.domains,
    ...project.metadata.capabilities,
    ...project.metadata.keywords,
    ...project.metadata.platforms,
    ...(project.metadata.frameworks ?? []),
    ...(project.metadata.backend ?? []),
    ...(project.metadata.threeD ?? []),
    ...(project.metadata.desktop ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (matchesTerms(terms, ["rag", "retrieval", "search", "information retrieval", "bm25", "faiss", "text2sql"])) {
    return "RAG / Search";
  }

  if (matchesTerms(terms, ["business intelligence", "bi", "analytics", "analysis", "dashboard", "forecast", "recommendation"])) {
    return "BI / Analytics";
  }

  if (matchesTerms(terms, ["crawler", "scraper", "scraping", "pipeline", "etl", "data engineering", "data-platform"])) {
    return "Data Engineering / Crawlers";
  }

  if (matchesTerms(terms, ["diffusion", "lora", "comfyui", "video generation", "image restoration", "generative ai", "sd-", "stable diffusion"])) {
    return "Generative AI Media";
  }

  if (matchesTerms(terms, ["game", "rpg", "platformer", "simulation", "phaser", "arena"])) {
    return "Games / Simulation";
  }

  if (project.category === "interactive-3d" || matchesTerms(terms, ["three.js", "threejs", "react three fiber", "3d", "webgl", "blender"])) {
    return "3D / Interactive";
  }

  if (project.category === "backend-desktop" || matchesTerms(terms, ["desktop", "cross-platform", "avalonia", "qt", "pos", "gis", "native"])) {
    return "Desktop / Cross-platform";
  }

  if (matchesTerms(terms, ["automation", "bot", "youtube", "discord", "factory"])) {
    return "Automation / Scraping";
  }

  if (matchesTerms(terms, ["learning", "course", "curriculum", "intro-to", "lab"])) {
    return "Learning Labs";
  }

  if (matchesTerms(terms, ["library", "archive", "knowledge", "metadata", "lms", "catalog", "heritage"])) {
    return "Library / Knowledge Systems";
  }

  if (matchesTerms(terms, ["devops", "infrastructure", "environment", "rocm", "gpu", "deployment", "docker"])) {
    return "Infrastructure / DevOps";
  }

  if (matchesTerms(terms, ["portfolio", "case study", "demo platform"])) {
    return "Portfolio / Case Study";
  }

  if (matchesTerms(terms, ["fastapi", "api", "cli", "backend", "server"])) {
    return "Backend / API / CLI";
  }

  if (matchesTerms(terms, ["full-stack", "fullstack", "next.js", "react", "vite", "web application", "web-app"])) {
    return "Full-Stack Web Apps";
  }

  if (project.category === "frontend" || matchesTerms(terms, ["frontend", "ui", "tailwind", "vanilla javascript"])) {
    return "Frontend / Web UI";
  }

  return "AI / Data Platforms";
}

export function getProjectTypeGroupLabel(value: string, locale: PortfolioLocale) {
  const labels: Record<PortfolioLocale, Record<ProjectTypeGroup, string>> = {
    en: {
      "AI / Data Platforms": "AI / Data Platforms",
      "RAG / Search": "RAG / Search",
      "BI / Analytics": "BI / Analytics",
      "Data Engineering / Crawlers": "Data Engineering / Crawlers",
      "Generative AI Media": "Generative AI Media",
      "3D / Interactive": "3D / Interactive",
      "Games / Simulation": "Games / Simulation",
      "Frontend / Web UI": "Frontend / Web UI",
      "Full-Stack Web Apps": "Full-Stack Web Apps",
      "Desktop / Cross-platform": "Desktop / Cross-platform",
      "Backend / API / CLI": "Backend / API / CLI",
      "Automation / Scraping": "Automation / Scraping",
      "Learning Labs": "Learning Labs",
      "Library / Knowledge Systems": "Library / Knowledge Systems",
      "Infrastructure / DevOps": "Infrastructure / DevOps",
      "Portfolio / Case Study": "Portfolio / Case Study",
    },
    "zh-TW": {
      "AI / Data Platforms": "AI / 資料平台",
      "RAG / Search": "RAG / 搜尋檢索",
      "BI / Analytics": "BI / 分析儀表板",
      "Data Engineering / Crawlers": "資料工程 / 爬蟲",
      "Generative AI Media": "生成式 AI 影音",
      "3D / Interactive": "3D / 互動體驗",
      "Games / Simulation": "遊戲 / 模擬",
      "Frontend / Web UI": "前端 / Web UI",
      "Full-Stack Web Apps": "全端 Web 應用",
      "Desktop / Cross-platform": "桌面 / 跨平台",
      "Backend / API / CLI": "後端 / API / CLI",
      "Automation / Scraping": "自動化 / 擷取",
      "Learning Labs": "學習實驗室",
      "Library / Knowledge Systems": "圖資 / 知識系統",
      "Infrastructure / DevOps": "基礎設施 / DevOps",
      "Portfolio / Case Study": "作品集 / 案例頁",
    },
  };

  return labels[locale][value as ProjectTypeGroup] ?? value;
}

export function projectMatchesHas(project: Project, value: HasFacet) {
  const hasExternalLink = (kind: string) =>
    project.links.some((link) => link.kind === kind && /^https?:\/\//.test(link.url));
  const hasRealMedia = project.media.some((item) => !item.placeholder);

  switch (value) {
    case "github":
      return hasExternalLink("github");
    case "demo":
      return hasExternalLink("live") ||
        hasExternalLink("video") ||
        project.media.some((item) => item.type === "video" && !item.placeholder);
    case "media":
      return Boolean(project.coverImage) || hasRealMedia;
    case "documentation":
      return hasExternalLink("documentation") || hasExternalLink("article");
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

function matchesTerms(source: string, terms: string[]) {
  return terms.some((term) => source.includes(term));
}

function sortProjects(
  a: Project,
  b: Project,
  sort: ProjectSort,
  locale: PortfolioLocale
) {
  if (sort === "featured") {
    const fixedDelta =
      compareFixedFeaturedProjects(a, b);

    if (fixedDelta !== 0) {
      return fixedDelta;
    }
  } else {
    const priorityDelta =
      comparePinnedProjects(a, b);

    if (priorityDelta !== 0) {
      return priorityDelta;
    }
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
      return sortByReleaseCompleteness(a, b, locale);
  }
}

function comparePinnedProjects(a: Project, b: Project) {
  const aRank = getSlugRank(a.slug, pinnedProjectSlugs);
  const bRank = getSlugRank(b.slug, pinnedProjectSlugs);

  if (aRank === bRank) {
    return 0;
  }

  if (aRank === Number.POSITIVE_INFINITY) {
    return 1;
  }

  if (bRank === Number.POSITIVE_INFINITY) {
    return -1;
  }

  return aRank - bRank;
}

function compareFixedFeaturedProjects(a: Project, b: Project) {
  const aRank = getSlugRank(a.slug, fixedFeaturedSortSlugs);
  const bRank = getSlugRank(b.slug, fixedFeaturedSortSlugs);

  if (aRank !== Number.POSITIVE_INFINITY || bRank !== Number.POSITIVE_INFINITY) {
    if (aRank === bRank) {
      return 0;
    }

    return aRank - bRank;
  }

  return 0;
}

function getSlugRank(slug: string, slugs: string[]) {
  const index = slugs.indexOf(slug);

  return index === -1
    ? Number.POSITIVE_INFINITY
    : index;
}

function sortByReleaseCompleteness(a: Project, b: Project, locale: PortfolioLocale) {
  const scoreDelta =
    getProjectCompletenessScore(b) -
    getProjectCompletenessScore(a);

  if (scoreDelta !== 0) {
    return scoreDelta;
  }

  if (a.featured !== b.featured) {
    return a.featured ? -1 : 1;
  }

  if (a.year !== b.year) {
    return b.year - a.year;
  }

  return a.content[locale].title.localeCompare(b.content[locale].title, locale);
}

function getProjectCompletenessScore(project: Project) {
  const realScreenshots = project.media.filter((item) => item.type === "image" && !item.placeholder).length;
  const realVideos = project.media.filter((item) => item.type === "video" && !item.placeholder).length;
  const videoPosters = project.media.filter((item) => item.type === "video" && item.poster).length;
  const externalLinks = ["github", "live", "documentation", "video"].filter((kind) =>
    project.links.some((link) => link.kind === kind && /^https?:\/\//.test(link.url))
  ).length;
  const content = project.content.en ?? project.content["zh-TW"];
  const caseStudyFields = [
    content.problem,
    content.solution,
    content.architecture,
    content.dataFlow,
    content.projectStructure,
    content.setupGuide,
  ].filter(Boolean).length;
  const missingFields = project.metadata.missingFields?.length ?? 0;
  const manualFollowUps =
    project.metadata.releaseStatus?.manualFollowUpNeeded.length ?? 0;

  return Math.min(realScreenshots, 12) * 5 +
    Math.min(realVideos, 3) * 12 +
    Math.min(videoPosters, 3) * 4 +
    externalLinks * 10 +
    caseStudyFields * 4 +
    (project.featured ? 10 : 0) -
    missingFields * 12 -
    manualFollowUps * 10 -
    (project.metadata.needsReview ? 20 : 0);
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
