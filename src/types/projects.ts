export type PortfolioLocale =
  | "zh-TW"
  | "en";

export type ProjectCategory =
  | "information-system"
  | "interactive-3d"
  | "ai-data"
  | "frontend"
  | "backend-desktop";

export type ProjectStatus =
  | "completed"
  | "in-progress"
  | "prototype"
  | "planned";

export type ProjectLinkKind =
  | "live"
  | "github"
  | "documentation"
  | "download"
  | "video"
  | "article";

export type ProjectMediaType =
  | "image"
  | "video";

export type LocalizedText =
  Record<PortfolioLocale, string>;

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface LocalizedProjectContent {
  title: string;
  summary: string;
  description: string;

  tagline?: string;
  role: string;
  problem: string;
  solution: string;
  outcome?: string;

  features?: ProjectFeature[];
  metrics?: ProjectMetric[];

  highlights: string[];
  challenges: string[];
  nextSteps: string[];
}

export interface ProjectLink {
  kind: ProjectLinkKind;
  url: string;
  label: LocalizedText;
  primary?: boolean;
}

export interface ProjectMedia {
  id: string;
  type: ProjectMediaType;
  src: string;

  /**
   * 影片使用的預覽封面。
   */
  poster?: string;

  /**
   * 圖片與影片的無障礙描述。
   */
  alt: LocalizedText;

  title: LocalizedText;
  caption?: LocalizedText;

  featured?: boolean;
}

export interface ProjectMetadata {
  /**
   * ISO date，例如 2026-06-01。
   */
  startedAt?: string;
  updatedAt: string;

  duration?: string;
  teamSize?: number;

  /**
   * 用於篩選與 Metadata 顯示。
   * 建議採穩定英文標籤。
   */
  roles: string[];
  platforms: string[];
  domains: string[];
  capabilities: string[];
  tools: string[];
  keywords: string[];
  audiences: string[];
  dataTypes: string[];
}

export interface Project {
  id: string;
  slug: string;

  category: ProjectCategory;
  status: ProjectStatus;

  year: number;
  featured: boolean;

  technologies: string[];
  coverImage?: string;

  links: ProjectLink[];
  media: ProjectMedia[];
  metadata: ProjectMetadata;

  content: Record<
    PortfolioLocale,
    LocalizedProjectContent
  >;
}

/**
 * 允許舊專案資料逐步遷移，不必一次補完全部欄位。
 */
export type ProjectInput =
  Omit<
    Project,
    "links" | "media" | "metadata"
  > & {
    links?: ProjectLink[];
    media?: ProjectMedia[];
    metadata?: Partial<ProjectMetadata>;
  };