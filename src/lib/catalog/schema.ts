import { z } from "zod";

export const PortfolioLocaleSchema = z.enum(["zh-TW", "en"]);

export const ProjectCategorySchema = z.enum([
  "information-system",
  "interactive-3d",
  "ai-data",
  "frontend",
  "backend-desktop",
]);

export const ProjectStatusSchema = z.enum([
  "completed",
  "in-progress",
  "prototype",
  "planned",
  "archived",
]);

export const LocalizedTextSchema = z.record(PortfolioLocaleSchema, z.string());

export const ProjectFeatureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  bullets: z.array(z.string()).optional(),
});

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string().optional(),
});

export const LocalizedProjectContentSchema = z.object({
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  tagline: z.string().optional(),
  role: z.string(),
  problem: z.string(),
  solution: z.string(),
  outcome: z.string().optional(),
  targetUsers: z.array(z.string()).optional(),
  technicalHighlights: z.array(z.string()).optional(),
  architecture: z.string().optional(),
  dataFlow: z.string().optional(),
  projectStructure: z.string().optional(),
  setupGuide: z.string().optional(),
  futureImprovements: z.array(z.string()).optional(),
  interviewNotes: z.array(z.string()).optional(),
  features: z.array(ProjectFeatureSchema).optional(),
  metrics: z.array(ProjectMetricSchema).optional(),
  highlights: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  nextSteps: z.array(z.string()).default([]),
});

export const ProjectLinkKindSchema = z.enum([
  "live",
  "github",
  "documentation",
  "download",
  "video",
  "article",
]);

export const ProjectLinkSchema = z.object({
  kind: ProjectLinkKindSchema,
  // Absolute URL (external) or site-relative path (e.g. /portfolio/.../demo.webm).
  url: z
    .string()
    .refine((v) => /^https?:\/\//.test(v) || v.startsWith("/"), {
      message: "Must be an absolute URL or a site-relative path",
    }),
  label: LocalizedTextSchema,
  primary: z.boolean().optional(),
});

export const ProjectMediaSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "video"]),
  src: z.string(),
  poster: z.string().optional(),
  alt: LocalizedTextSchema,
  title: LocalizedTextSchema,
  caption: LocalizedTextSchema.optional(),
  featured: z.boolean().optional(),
  placeholder: z.boolean().optional(),
});

export const ProjectReleaseStateSchema = z.enum([
  "verified",
  "preparing",
  "missing",
  "blocked",
  "failed",
  "not-applicable",
]);

export const ProjectReleaseStatusSchema = z.object({
  audit: ProjectReleaseStateSchema,
  readme: ProjectReleaseStateSchema,
  screenshots: ProjectReleaseStateSchema,
  demo: ProjectReleaseStateSchema,
  video: ProjectReleaseStateSchema,
  portfolioPage: ProjectReleaseStateSchema,
  links: ProjectReleaseStateSchema,
  build: ProjectReleaseStateSchema,
  manualFollowUpNeeded: z.array(z.string()).default([]),
});

export const ProjectMetadataSchema = z.object({
  // Dates & Info
  startedAt: z.string().optional(),
  updatedAt: z.string(),
  completedAt: z.string().optional(),
  duration: z.string().optional(),
  teamSize: z.number().int().nonnegative().optional(),
  version: z.string().default("0.1.0"),
  
  // Advanced Taxonomy fields (Library-style)
  catalogNumber: z.string().optional(),
  visibility: z.enum(["public", "private", "hidden"]).default("public"),
  aliases: z.array(z.string()).default([]),
  primaryCategory: ProjectCategorySchema.optional(),
  secondaryCategories: z.array(z.string()).default([]),
  projectType: z.string().optional(),
  domains: z.array(z.string()).default([]),
  subjects: z.array(z.string()).default([]),
  controlledTerms: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  audiences: z.array(z.string()).default([]),
  contentTypes: z.array(z.string()).default([]),
  dataTypes: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  operatingSystems: z.array(z.string()).default([]),
  
  // Tech stack classification
  languages: z.array(z.string()).default([]),
  frameworks: z.array(z.string()).default([]),
  libraries: z.array(z.string()).default([]),
  stateManagement: z.array(z.string()).default([]),
  styling: z.array(z.string()).default([]),
  database: z.array(z.string()).default([]),
  backend: z.array(z.string()).default([]),
  desktop: z.array(z.string()).default([]),
  gameEngine: z.array(z.string()).default([]),
  threeD: z.array(z.string()).default([]),
  testing: z.array(z.string()).default([]),
  buildTools: z.array(z.string()).default([]),
  infrastructure: z.array(z.string()).default([]),
  deployment: z.array(z.string()).default([]),
  developmentTools: z.array(z.string()).default([]),
  
  // Contributions & capabilities
  roles: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  collaborationType: z.string().optional(),
  myContribution: z.string().optional(),
  learningGoals: z.array(z.string()).default([]),
  skillsDemonstrated: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),

  // Quality details
  hasUnitTests: z.boolean().default(false),
  hasIntegrationTests: z.boolean().default(false),
  hasE2ETests: z.boolean().default(false),
  accessibilityNotes: z.string().optional(),
  performanceNotes: z.string().optional(),
  lighthouseScores: z.object({
    performance: z.number().min(0).max(100).optional(),
    accessibility: z.number().min(0).max(100).optional(),
    bestPractices: z.number().min(0).max(100).optional(),
    seo: z.number().min(0).max(100).optional(),
  }).optional(),
  responsive: z.boolean().default(true),
  browserSupport: z.array(z.string()).default([]),
  codeQualityTools: z.array(z.string()).default([]),

  // Relations
  relatedProjects: z.array(z.string()).default([]),
  parentProject: z.string().optional(),
  subprojects: z.array(z.string()).default([]),
  successorProjects: z.array(z.string()).default([]),
  usesPackages: z.array(z.string()).default([]),
  inspiredBy: z.array(z.string()).default([]),
  dependencies: z.array(z.string()).default([]),

  // Data Confidence
  extractionConfidence: z.number().min(0.0).max(1.0).default(1.0),
  needsReview: z.boolean().default(false),
  missingFields: z.array(z.string()).default([]),
  evidenceSources: z.array(z.string()).default([]),
  lastScannedAt: z.string().optional(),
  localAuditStatus: z.enum(["matched", "unmatched", "excluded", "needs-review"]).optional(),
  releaseStatus: ProjectReleaseStatusSchema.optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: ProjectCategorySchema,
  status: ProjectStatusSchema,
  year: z.number().int(),
  featured: z.boolean().default(false),
  technologies: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  subtitle: z.string().optional(),
  githubUrl: z.string().optional(),
  liveDemoUrl: z.string().optional(),
  demoVideoUrl: z.string().optional(),
  readmeUrl: z.string().optional(),
  heroImage: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  videoEmbedUrl: z.string().optional(),
  links: z.array(ProjectLinkSchema).default([]),
  media: z.array(ProjectMediaSchema).default([]),
  metadata: ProjectMetadataSchema,
  content: z.record(PortfolioLocaleSchema, LocalizedProjectContentSchema),
});

export type ValidatedProject = z.infer<typeof ProjectSchema>;
