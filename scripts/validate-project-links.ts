import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SCAN_REPORT = path.join(ROOT, "data/generated/project-scan-report.json");
const CATALOG = path.join(ROOT, "src/generated/project-catalog.json");
const RELEASE_DIR = path.join(ROOT, "docs/portfolio-release");
const DEMO_SCRIPT_DIR = path.join(ROOT, "docs/demo-scripts");
const PROJECT_RELEASE_DIR = path.join(RELEASE_DIR, "projects");
const PROGRESS_PATH = path.join(RELEASE_DIR, "project-release-progress.json");
const windowsMountRootPattern = new RegExp(`${path.sep}mnt${path.sep}c(?:${path.sep}|\\b)`);
const localPathKey = "local" + "Path";

const requiredKinds = ["live", "github", "video", "documentation"] as const;
const forbiddenPatterns = [
  new RegExp(`${path.sep}home${path.sep}[^${path.sep}\\s]+${path.sep}`),
  windowsMountRootPattern,
  /[A-Za-z]:\\Users\\/,
  new RegExp(`"${localPathKey}"\\s*:`),
];
const excludedSlugs = new Set([
  "justin-portfolio",
  "justin21523.github.io",
  "3d-rendering-showcase",
  "data",
  "wayfarer",
  "justin-portfolio-platformer-worktree",
  "soccer-player-rpg",
  "super-wings-rpg-game",
  "polly-rpg-game",
  "lost-yokai-campus-rpg",
]);

type ProjectLink = {
  kind: string;
  url: string;
  label?: Record<string, string>;
};

type ProjectMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  placeholder?: boolean;
};

type Project = {
  slug: string;
  title?: string;
  links: ProjectLink[];
  media: ProjectMedia[];
  coverImage?: string;
  heroImage?: string;
  screenshots?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  demoVideoUrl?: string;
  readmeUrl?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  content: Record<string, { title: string; summary: string }>;
  metadata: {
    localAuditStatus?: string;
    missingFields?: string[];
    needsReview?: boolean;
    releaseStatus?: {
      manualFollowUpNeeded?: string[];
    };
  };
};

type ScannedProject = {
  folder: string;
  name: string;
  gitRemote?: string;
  hasReadme: boolean;
  hasMedia?: boolean;
  canBuild: boolean;
  canRun: boolean;
  suitability: string;
  confidence: number;
};

function readJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

function isFallbackLink(project: Project, kind: string, url: string) {
  const anchor =
    kind === "live"
      ? "demo-guide"
      : kind === "github"
        ? "source-access"
        : kind === "video"
          ? "demo-video"
          : "readme-guide";

  return url === `/projects/${project.slug}#${anchor}`;
}

function sitePathExists(url: string) {
  if (isExternal(url) || url.startsWith("/projects/")) {
    return true;
  }

  const withoutHash = url.split("#")[0];
  const publicPath = path.join(ROOT, "public", withoutHash.replace(/^\//, ""));
  return fs.existsSync(publicPath);
}

function hasForbiddenLocalPath(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const text = fs.readFileSync(filePath, "utf8");
  return forbiddenPatterns.some((pattern) => pattern.test(text));
}

function listFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function linkFor(project: Project, kind: string) {
  return project.links.find((link) => link.kind === kind && link.url);
}

function validOptionalUrl(value: string | undefined) {
  return !value || /^https?:\/\//.test(value) || value.startsWith("/");
}

function main() {
  const scanned = readJson<ScannedProject[]>(SCAN_REPORT, []).filter((project) => !excludedSlugs.has(project.folder));
  const projects = readJson<Project[]>(CATALOG, []);
  const errors: string[] = [];
  const catalogBySlug = new Map(projects.map((project) => [project.slug, project]));
  const progress = readJson<{ projects?: { slug: string; status: string }[] }>(PROGRESS_PATH, { projects: [] });
  const progressBySlug = new Map((progress.projects ?? []).map((project) => [project.slug, project]));

  scanned.forEach((project) => {
    if (!catalogBySlug.has(project.folder)) {
      errors.push(`Scanned project is missing from public catalog: ${project.folder}`);
    }
  });

  projects.forEach((project) => {
    if (!project.slug) {
      errors.push("A project is missing slug.");
    }
    if (!project.content.en?.title && !project.content["zh-TW"]?.title) {
      errors.push(`${project.slug} is missing title.`);
    }
    if (excludedSlugs.has(project.slug)) {
      errors.push(`Excluded project leaked into public catalog: ${project.slug}`);
    }

    requiredKinds.forEach((kind) => {
      const link = linkFor(project, kind);
      if (!link) {
        errors.push(`${project.slug} is missing required ${kind} link or fallback state`);
        return;
      }
      if (!link.url || link.url === "undefined") {
        errors.push(`${project.slug} has an empty ${kind} link`);
      }
      if (!sitePathExists(link.url)) {
        errors.push(`${project.slug} has a broken local ${kind} link: ${link.url}`);
      }
      if (kind !== "live" && isFallbackLink(project, kind, link.url)) {
        return;
      }
      if (["github", "documentation"].includes(kind) && !isExternal(link.url) && !isFallbackLink(project, kind, link.url)) {
        errors.push(`${project.slug} has non-external ${kind} link that is not a known fallback: ${link.url}`);
      }
    });

    [project.githubUrl, project.liveDemoUrl, project.demoVideoUrl, project.readmeUrl, project.heroImage, project.videoUrl, project.videoEmbedUrl]
      .filter(Boolean)
      .forEach((url) => {
        if (!validOptionalUrl(url)) {
          errors.push(`${project.slug} has invalid optional URL field: ${url}`);
        }
      });

    if (!progressBySlug.has(project.slug)) {
      errors.push(`${project.slug} is missing from project-release-progress.json`);
    }

    const projectReleaseDir = path.join(PROJECT_RELEASE_DIR, project.slug);
    if (!fs.existsSync(path.join(projectReleaseDir, "audit.md"))) {
      errors.push(`${project.slug} is missing per-project audit.md`);
    }
    if (!fs.existsSync(path.join(projectReleaseDir, "release-report.md"))) {
      errors.push(`${project.slug} is missing per-project release-report.md`);
    }
    if (!fs.existsSync(path.join(DEMO_SCRIPT_DIR, `${project.slug}.md`))) {
      errors.push(`${project.slug} is missing demo recording guide`);
    }

    const publicProjectDir = path.join(ROOT, "public/projects", project.slug);
    if (!fs.existsSync(path.join(publicProjectDir, "hero.png"))) {
      errors.push(`${project.slug} is missing public/projects hero.png`);
    }
    if (!fs.existsSync(path.join(publicProjectDir, "screenshots", "01-overview.png"))) {
      errors.push(`${project.slug} is missing placeholder or real overview screenshot`);
    }

    [
      ...project.media.map((item) => item.src),
      ...(project.media.map((item) => item.poster).filter(Boolean) as string[]),
      ...(project.screenshots ?? []),
      project.coverImage,
      project.heroImage,
    ]
      .filter(Boolean)
      .forEach((assetPath) => {
        if (assetPath && assetPath.startsWith("/") && !sitePathExists(assetPath)) {
          errors.push(`${project.slug} references missing asset: ${assetPath}`);
        }
      });
  });

  [
    SCAN_REPORT,
    CATALOG,
    path.join(ROOT, "src/generated/project-search-index.json"),
    path.join(ROOT, "src/generated/project-taxonomy.json"),
    ...listFiles(RELEASE_DIR),
    ...listFiles(DEMO_SCRIPT_DIR),
  ].forEach((filePath) => {
    if (hasForbiddenLocalPath(filePath)) {
      errors.push(`Public generated data contains a forbidden local path: ${path.relative(ROOT, filePath)}`);
    }
  });

  if (errors.length > 0) {
    console.error("Project validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(`Validated ${projects.length} public projects with safe release links and assets.`);
}

main();
