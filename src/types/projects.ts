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
  | "planned"
  | "archived";

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
  targetUsers?: string[];
  technicalHighlights?: string[];
  architecture?: string;
  dataFlow?: string;
  projectStructure?: string;
  setupGuide?: string;
  futureImprovements?: string[];
  interviewNotes?: string[];

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
  placeholder?: boolean;
}

export type ProjectReleaseState =
  | "verified"
  | "preparing"
  | "missing"
  | "blocked"
  | "failed"
  | "not-applicable";

export interface ProjectReleaseStatus {
  audit: ProjectReleaseState;
  readme: ProjectReleaseState;
  screenshots: ProjectReleaseState;
  demo: ProjectReleaseState;
  video: ProjectReleaseState;
  portfolioPage: ProjectReleaseState;
  links: ProjectReleaseState;
  build: ProjectReleaseState;
  manualFollowUpNeeded: string[];
}

export interface ProjectMetadata {
  startedAt?: string;
  updatedAt: string;
  completedAt?: string;
  duration?: string;
  teamSize?: number;
  version?: string;

  // Advanced Taxonomy fields
  catalogNumber?: string;
  visibility?: "public" | "private" | "hidden";
  aliases?: string[];
  primaryCategory?: string;
  secondaryCategories?: string[];
  projectType?: string;
  domains: string[];
  subjects?: string[];
  controlledTerms?: string[];
  keywords: string[];
  audiences: string[];
  contentTypes?: string[];
  dataTypes: string[];
  platforms: string[];
  operatingSystems?: string[];

  // Tech stack classification
  languages?: string[];
  frameworks?: string[];
  libraries?: string[];
  stateManagement?: string[];
  styling?: string[];
  database?: string[];
  backend?: string[];
  desktop?: string[];
  gameEngine?: string[];
  threeD?: string[];
  testing?: string[];
  buildTools?: string[];
  infrastructure?: string[];
  deployment?: string[];
  developmentTools?: string[];

  // Contributions
  roles: string[];
  responsibilities?: string[];
  collaborationType?: string;
  myContribution?: string;
  learningGoals?: string[];
  skillsDemonstrated?: string[];
  capabilities: string[];
  tools: string[];

  // Quality details
  hasUnitTests?: boolean;
  hasIntegrationTests?: boolean;
  hasE2ETests?: boolean;
  accessibilityNotes?: string;
  performanceNotes?: string;
  lighthouseScores?: {
    performance?: number;
    accessibility?: number;
    bestPractices?: number;
    seo?: number;
  };
  responsive?: boolean;
  browserSupport?: string[];
  codeQualityTools?: string[];

  // Relations
  relatedProjects?: string[];
  parentProject?: string;
  subprojects?: string[];
  successorProjects?: string[];
  usesPackages?: string[];
  inspiredBy?: string[];
  dependencies?: string[];

  // Data Confidence
  extractionConfidence?: number;
  needsReview?: boolean;
  missingFields?: string[];
  evidenceSources?: string[];
  lastScannedAt?: string;
  localAuditStatus?: "matched" | "unmatched" | "excluded" | "needs-review";
  releaseStatus?: ProjectReleaseStatus;
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
  subtitle?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  demoVideoUrl?: string;
  readmeUrl?: string;
  heroImage?: string;
  screenshots?: string[];
  videoUrl?: string;
  videoEmbedUrl?: string;

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
