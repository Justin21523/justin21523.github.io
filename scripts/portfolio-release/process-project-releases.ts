import fs from "fs";
import path from "path";
import zlib from "zlib";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const SCAN_REPORT_PATH = path.join(ROOT, "data/generated/project-scan-report.json");
const LOCAL_MAP_PATH = path.join(ROOT, ".portfolio-local-map.json");
const RELEASE_ROOT = path.join(ROOT, "docs/portfolio-release");
const PROJECT_RELEASE_ROOT = path.join(RELEASE_ROOT, "projects");
const DEMO_SCRIPT_ROOT = path.join(ROOT, "docs/demo-scripts");
const PUBLIC_PROJECT_ROOT = path.join(ROOT, "public/projects");
const PROGRESS_PATH = path.join(RELEASE_ROOT, "project-release-progress.json");
const MATCHING_REPORT_PATH = path.join(RELEASE_ROOT, "project-matching-report.md");

const requiredLinks = ["live", "github", "video", "documentation"] as const;
const featuredPriority = [
  "dcard-trending-crawler",
  "ir-rag-evaluation-lab",
  "agentic-bi-dataops-copilot",
  "nyc-taxi-mobility-analytics",
  "openalex-research-rag",
  "music-intelligence-platform",
  "lyrics-cultural-analytics-lab",
  "news-web-crawler",
  "amazon-review-intelligence",
  "retailpulse-bi-recommender",
  "information-retrieval",
  "excel-python-data-analysis",
  "fandom-gui-scraper",
  "research-paper-and-knowledge-workspace",
  "ArchiveFlow",
  "cafe-net-manager",
];

type ProjectLink = {
  kind: string;
  url: string;
  label?: Record<"zh-TW" | "en", string>;
};

type ProjectMedia = {
  id?: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  placeholder?: boolean;
};

type Project = {
  slug: string;
  category: string;
  status: string;
  year: number;
  featured: boolean;
  technologies: string[];
  coverImage?: string;
  links: ProjectLink[];
  media: ProjectMedia[];
  metadata: {
    localAuditStatus?: string;
    missingFields?: string[];
    needsReview?: boolean;
    projectType?: string;
    platforms?: string[];
  };
  content: Record<
    "en" | "zh-TW",
    {
      title: string;
      summary: string;
      description: string;
      problem: string;
      solution: string;
      highlights: string[];
      challenges: string[];
      nextSteps: string[];
      targetUsers?: string[];
      technicalHighlights?: string[];
      architecture?: string;
      dataFlow?: string;
      projectStructure?: string;
      setupGuide?: string;
      futureImprovements?: string[];
      interviewNotes?: string[];
    }
  >;
};

type ScannedProject = {
  name: string;
  folder: string;
  type: string;
  hasReadme: boolean;
  readmeContent: string;
  detectedStack: string[];
  lastUpdate: string;
  gitRemote: string;
  gitBranch: string;
  gitLastCommitMessage: string;
  canBuild: boolean;
  canRun: boolean;
  hasMedia?: boolean;
  needsManualReview?: boolean;
  suitability: string;
  confidence: number;
};

type LocalMapEntry = {
  slug: string;
  title?: string;
  portfolioSource?: string;
  githubUrl?: string;
  localPath?: string;
  sourceRoot?: string;
  gitRemote?: string;
  gitBranch?: string;
  matchConfidence?: "high" | "medium" | "low";
  matchReason?: string[];
  status?: string;
  lastScannedAt?: string;
};

type ProgressEntry = {
  slug: string;
  title: string;
  priority: number;
  status: "pending" | "in-progress" | "completed" | "blocked" | "failed" | "skipped";
  auditStatus: string;
  readmeStatus: string;
  screenshotStatus: string;
  demoStatus: string;
  portfolioPageStatus: string;
  linkValidationStatus: string;
  buildStatus: string;
  manualFollowUpNeeded: string[];
  updatedAt: string;
};

function readJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function writeJson(filePath: string, value: unknown) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function normalizeLocalMap(raw: unknown): LocalMapEntry[] {
  if (Array.isArray(raw)) {
    return raw as LocalMapEntry[];
  }

  if (raw && typeof raw === "object" && Array.isArray((raw as { projects?: unknown }).projects)) {
    return (raw as { projects: LocalMapEntry[] }).projects;
  }

  return [];
}

function linkFor(project: Project, kind: string) {
  return project.links.find((link) => link.kind === kind && link.url);
}

function isExternal(url: string | undefined) {
  return Boolean(url && /^https?:\/\//.test(url));
}

function safeCell(value: string | undefined) {
  return value?.replace(/\|/g, "\\|") || "None";
}

function packageInfo(localPath: string | undefined) {
  if (!localPath) {
    return {
      packageName: "",
      scripts: {} as Record<string, string>,
      packageManager: "unknown",
    };
  }

  const packagePath = path.join(localPath, "package.json");
  if (!fs.existsSync(packagePath)) {
    return {
      packageName: "",
      scripts: {} as Record<string, string>,
      packageManager: fs.existsSync(path.join(localPath, "pom.xml"))
        ? "maven"
        : fs.existsSync(path.join(localPath, "pyproject.toml"))
          ? "python"
          : "unknown",
    };
  }

  const packageJson = readJson<{ name?: string; scripts?: Record<string, string> }>(packagePath, {});
  const packageManager = fs.existsSync(path.join(localPath, "pnpm-lock.yaml"))
    ? "pnpm"
    : fs.existsSync(path.join(localPath, "yarn.lock"))
      ? "yarn"
      : fs.existsSync(path.join(localPath, "bun.lockb"))
        ? "bun"
        : "npm";

  return {
    packageName: packageJson.name ?? "",
    scripts: packageJson.scripts ?? {},
    packageManager,
  };
}

function readmeTitle(localPath: string | undefined) {
  if (!localPath) {
    return "";
  }

  const readmePath = path.join(localPath, "README.md");
  if (!fs.existsSync(readmePath)) {
    return "";
  }

  const firstHeading = fs
    .readFileSync(readmePath, "utf8")
    .split(/\r?\n/)
    .find((line) => line.startsWith("# "));

  return firstHeading?.replace(/^#\s+/, "").trim() ?? "";
}

function statusForMatch(project: Project, local: LocalMapEntry | undefined, scan: ScannedProject | undefined) {
  if (!local?.localPath || !fs.existsSync(local.localPath)) {
    return "missing-local-project";
  }

  if (!linkFor(project, "github")?.url.startsWith("http") && !scan?.gitRemote) {
    return "missing-github-repo";
  }

  return "matched";
}

function matchConfidence(project: Project, local: LocalMapEntry | undefined, scan: ScannedProject | undefined) {
  const reasons: string[] = [];

  if (local?.localPath && path.basename(local.localPath).toLowerCase() === project.slug.toLowerCase()) {
    reasons.push("slug matches folder name");
  }

  if (scan?.gitRemote && scan.gitRemote === linkFor(project, "github")?.url) {
    reasons.push("git remote matches GitHub link");
  }

  if (readmeTitle(local?.localPath) && readmeTitle(local?.localPath).toLowerCase().includes(project.content.en.title.toLowerCase().slice(0, 16))) {
    reasons.push("README title overlaps project title");
  }

  if (scan?.detectedStack?.some((tech) => project.technologies.includes(tech))) {
    reasons.push("detected stack overlaps portfolio tech stack");
  }

  return {
    confidence: reasons.length >= 2 ? "high" : reasons.length === 1 ? "medium" : "low",
    reasons: reasons.length ? reasons : ["matched by catalog slug and scan report entry"],
  } as const;
}

function priorityFor(project: Project, local: LocalMapEntry | undefined, scan: ScannedProject | undefined) {
  const featuredRank = featuredPriority.indexOf(project.slug);
  if (featuredRank !== -1) {
    return featuredRank;
  }

  let score = 1000;
  if (project.featured) score -= 300;
  if (linkFor(project, "github")?.url.startsWith("http")) score -= 120;
  if (local?.localPath) score -= 80;
  if (scan?.canRun || scan?.canBuild) score -= 40;
  if (linkFor(project, "live")?.url.startsWith("http")) score -= 30;
  return score;
}

function crc32(buffer: Buffer) {
  let crc = ~0;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return ~crc >>> 0;
}

function pngChunk(type: string, data: Buffer) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function placeholderPng(width: number, height: number, seed: string) {
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const r = 36 + (hash % 80);
  const g = 64 + (hash % 70);
  const b = 96 + (hash % 90);
  const rows: Buffer[] = [];

  for (let y = 0; y < height; y += 1) {
    const row = Buffer.alloc(1 + width * 3);
    row[0] = 0;
    for (let x = 0; x < width; x += 1) {
      const offset = 1 + x * 3;
      const shade = Math.floor((x / width) * 34 + (y / height) * 28);
      row[offset] = Math.min(255, r + shade);
      row[offset + 1] = Math.min(255, g + shade);
      row[offset + 2] = Math.min(255, b + shade);
    }
    rows.push(row);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(Buffer.concat(rows))),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function ensurePlaceholderAssets(project: Project) {
  const projectRoot = path.join(PUBLIC_PROJECT_ROOT, project.slug);
  const screenshotRoot = path.join(projectRoot, "screenshots");
  ensureDir(screenshotRoot);
  ensureDir(path.join(projectRoot, "videos"));
  ensureDir(path.join(projectRoot, "diagrams"));

  const hero = path.join(projectRoot, "hero.png");
  if (!fs.existsSync(hero)) {
    fs.writeFileSync(hero, placeholderPng(1200, 675, project.slug));
  }

  ["01-overview.png", "02-core-feature.png", "03-detail-view.png", "04-architecture-or-data-flow.png"].forEach((fileName) => {
    const screenshot = path.join(screenshotRoot, fileName);
    if (!fs.existsSync(screenshot)) {
      fs.writeFileSync(screenshot, placeholderPng(1200, 675, `${project.slug}-${fileName}`));
    }
  });
}

function markdownList(items: string[] | undefined) {
  if (!items?.length) {
    return "- None recorded.";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

function commandStatus(scan: ScannedProject | undefined, scripts: Record<string, string>) {
  return {
    install: Object.keys(scripts).length ? "Detected package manifest; install command should be verified per repo." : "No package install command detected.",
    run: scan?.canRun ? "Run script detected." : "No verified run command detected.",
    build: scan?.canBuild ? "Build script detected." : "No verified build command detected.",
    test: scripts.test ? "Test script detected." : "No test script detected.",
    lint: scripts.lint ? "Lint script detected." : "No lint script detected.",
  };
}

function hasRealImage(project: Project) {
  return project.media.some((item) => item.type === "image" && !item.placeholder);
}

function hasRealVideo(project: Project) {
  return project.media.some((item) => item.type === "video" && !item.placeholder) || isExternal(linkFor(project, "video")?.url);
}

function writeDemoGuide(project: Project, scan: ScannedProject | undefined) {
  ensureDir(DEMO_SCRIPT_ROOT);
  const filePath = path.join(DEMO_SCRIPT_ROOT, `${project.slug}.md`);
  const title = project.content.en.title;
  const body = `# ${title} Demo Recording Guide

## Recommended Length
30-90 seconds.

## Recording Flow
1. Open the portfolio case study for \`${project.slug}\`.
2. State the problem and target users.
3. Show the GitHub/source or source-status CTA.
4. Walk through the main UI, CLI, API, or README evidence available today.
5. Show the setup guide and manual follow-up section.

## Interview Talking Points
${markdownList(project.content.en.interviewNotes ?? project.content.en.highlights)}

## Screenshots Still Needed
- Real overview screen.
- Core feature interaction.
- Detail or output screen.
- Architecture or data-flow diagram.

## Launch / Deployment Notes
${scan?.canRun ? "- A run script was detected. Verify it locally before recording." : "- No verified run command was detected. Use the case-study walkthrough until the project is runnable."}
${scan?.canBuild ? "- A build script was detected. Run it before publishing real screenshots." : "- No verified build command was detected."}
`;
  fs.writeFileSync(filePath, body);
}

function readmeReleaseSection(project: Project, scan: ScannedProject | undefined, commands: ReturnType<typeof commandStatus>) {
  const github = linkFor(project, "github")?.url ?? "Preparing";
  const live = linkFor(project, "live")?.url ?? "Preparing";
  const video = linkFor(project, "video")?.url ?? "Preparing";
  const docs = linkFor(project, "documentation")?.url ?? "Preparing";
  const structure = project.content.en.projectStructure ?? `${project.slug}/\n  README.md\n  source files`;
  const stack = project.technologies.length ? markdownList(project.technologies) : "- To be reviewed";

  return [
    "",
    "",
    "<!-- portfolio-release-notes:start -->",
    "## Portfolio Release Notes",
    "",
    "## Overview",
    project.content.en.summary,
    "",
    "## Demo",
    `- Live Demo: ${live}`,
    `- Portfolio Case Study: /projects/${project.slug}`,
    `- GitHub Repository: ${github}`,
    `- Demo Video: ${video}`,
    `- README: ${docs}`,
    "",
    "## Features",
    markdownList(project.content.en.highlights),
    "",
    "## Tech Stack",
    stack,
    "",
    "## Architecture",
    project.content.en.architecture ?? "Architecture details are tracked in the portfolio release report and should be reviewed against source code.",
    "",
    "## Project Structure",
    "```text",
    structure,
    "```",
    "",
    "## Getting Started",
    `- Install: ${commands.install}`,
    `- Dev/Run: ${commands.run}`,
    `- Build: ${commands.build}`,
    `- Test: ${commands.test}`,
    `- Lint: ${commands.lint}`,
    "",
    "## Screenshots",
    `Screenshots are packaged in the portfolio under \`public/projects/${project.slug}/screenshots/\`. Replace placeholders with real captures when available.`,
    "",
    "## Demo Script",
    `See \`docs/demo-scripts/${project.slug}.md\` in the portfolio release pack.`,
    "",
    "## Key Implementation Details",
    markdownList(project.content.en.technicalHighlights),
    "",
    "## Challenges & Decisions",
    markdownList(project.content.en.challenges),
    "",
    "## Future Improvements",
    markdownList(project.content.en.futureImprovements ?? project.content.en.nextSteps),
    "<!-- portfolio-release-notes:end -->",
    "",
  ].join("\n");
}

function updateReadme(project: Project, localPath: string | undefined, scan: ScannedProject | undefined, commands: ReturnType<typeof commandStatus>) {
  if (!localPath || !fs.existsSync(localPath)) {
    return "missing-local-project";
  }

  const readmePath = path.join(localPath, "README.md");
  const section = readmeReleaseSection(project, scan, commands);

  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# ${project.content.en.title}\n${section}\n`);
    return "created-readme";
  }

  const current = fs.readFileSync(readmePath, "utf8");
  if (current.includes("<!-- portfolio-release-notes:start -->")) {
    const next = current.replace(
      /<!-- portfolio-release-notes:start -->[\s\S]*?<!-- portfolio-release-notes:end -->/,
      section.trim()
    );
    fs.writeFileSync(readmePath, next.endsWith("\n") ? next : `${next}\n`);
    return "updated-release-section";
  }

  fs.writeFileSync(readmePath, `${current.trimEnd()}${section}\n`);
  return "appended-release-section";
}

function writeProjectReports(
  project: Project,
  scan: ScannedProject | undefined,
  local: LocalMapEntry | undefined,
  progress: ProgressEntry,
  commands: ReturnType<typeof commandStatus>,
  readmeStatus: string
) {
  const projectDir = path.join(PROJECT_RELEASE_ROOT, project.slug);
  ensureDir(projectDir);

  const github = linkFor(project, "github")?.url ?? "None";
  const readme = linkFor(project, "documentation")?.url ?? "None";
  const live = linkFor(project, "live")?.url ?? "None";
  const video = linkFor(project, "video")?.url ?? "None";
  const manual = progress.manualFollowUpNeeded;

  const audit = `# ${project.content.en.title} Audit

| Field | Value |
| :--- | :--- |
| Portfolio slug | \`${project.slug}\` |
| Matched GitHub repo | ${safeCell(github)} |
| Matched local path | Stored in \`.portfolio-local-map.json\` |
| Match confidence | ${local?.matchConfidence ?? "low"} |
| Match status | ${local?.status ?? "unknown"} |
| Tech stack | ${project.technologies.join(", ") || "None"} |
| Framework / language | ${scan?.type ?? project.metadata.projectType ?? "Unknown"} |
| Package manager | ${packageInfo(local?.localPath).packageManager} |
| Available scripts | ${Object.keys(packageInfo(local?.localPath).scripts).join(", ") || "None detected"} |
| Install status | ${commands.install} |
| Run status | ${commands.run} |
| Build status | ${commands.build} |
| Test status | ${commands.test} |
| README status | ${readmeStatus} |
| Screenshots status | ${hasRealImage(project) ? "real media present" : "placeholder screenshots generated"} |
| Demo status | ${isExternal(live) ? "external demo link" : "portfolio case-study demo fallback"} |
| Portfolio detail page | /projects/${project.slug} |

## Missing Items
${markdownList(manual)}

## Recommended Fixes
- Replace generated placeholders under \`public/projects/${project.slug}/\` with real screenshots when possible.
- Record a 30-90 second demo video and update the video link.
- Verify install/build/test commands in the matched local repository.
`;

  const release = `# ${project.content.en.title} Release Report

## Completed
- Portfolio case study exists for \`${project.slug}\`.
- Four CTA slots are present with verified links or honest preparing states.
- Public asset folders, placeholder images, and demo guide are available.
- README release notes status: ${readmeStatus}.

## Changed Files
- \`docs/portfolio-release/projects/${project.slug}/audit.md\`
- \`docs/portfolio-release/projects/${project.slug}/release-report.md\`
- \`docs/demo-scripts/${project.slug}.md\`
- \`public/projects/${project.slug}/\`

## Links
- Portfolio Case Study: /projects/${project.slug}
- GitHub: ${github}
- README: ${readme}
- Live Demo: ${live}
- Demo Video: ${video}

## Build / Run Status
- Install: ${commands.install}
- Run: ${commands.run}
- Build: ${commands.build}
- Test: ${commands.test}
- Lint: ${commands.lint}

## Assets
- Hero image: public/projects/${project.slug}/hero.png
- Screenshots: public/projects/${project.slug}/screenshots/
- Demo video: ${hasRealVideo(project) ? "existing media linked" : "manual recording guide"}
- Diagrams: public/projects/${project.slug}/diagrams/

## Manual Follow-up Needed
${markdownList(manual)}

## Notes for Interview
${markdownList(project.content.en.interviewNotes ?? project.content.en.highlights)}
`;

  fs.writeFileSync(path.join(projectDir, "audit.md"), audit);
  fs.writeFileSync(path.join(projectDir, "release-report.md"), release);
}

function buildProgress(projects: Project[], scans: Map<string, ScannedProject>, locals: Map<string, LocalMapEntry>) {
  return projects
    .map<ProgressEntry>((project) => {
      const local = locals.get(project.slug);
      const scan = scans.get(project.slug);
      const localPath = local?.localPath;
      const pkg = packageInfo(localPath);
      const commands = commandStatus(scan, pkg.scripts);
      const hasRealImages = hasRealImage(project);
      const realVideoPresent = hasRealVideo(project);
      const hasExternalDemo = isExternal(linkFor(project, "live")?.url);
      const manualFollowUpNeeded = [
        !hasRealImages ? "Replace placeholder screenshots with real project screenshots." : "",
        !realVideoPresent ? "Record and link a real demo video." : "",
        !hasExternalDemo ? "Deploy a real live demo or keep portfolio case-study demo fallback." : "",
        !scan?.canBuild ? "Verify or add build instructions." : "",
        !scan?.canRun ? "Verify or add run instructions." : "",
        project.metadata.needsReview ? "Review generated case-study content against source evidence." : "",
      ].filter(Boolean);

      return {
        slug: project.slug,
        title: project.content.en.title,
        priority: priorityFor(project, local, scan),
        status: "pending",
        auditStatus: "pending",
        readmeStatus: "pending",
        screenshotStatus: hasRealImages ? "real-assets-present" : "placeholder-needed",
        demoStatus: realVideoPresent ? "video-present" : "recording-guide-needed",
        portfolioPageStatus: "detail-page-generated",
        linkValidationStatus: requiredLinks.every((kind) => linkFor(project, kind)) ? "valid-four-links" : "missing-links",
        buildStatus: commands.build,
        manualFollowUpNeeded,
        updatedAt: new Date().toISOString(),
      };
    })
    .sort((a, b) => a.priority - b.priority || a.slug.localeCompare(b.slug));
}

function writeMatchingReport(projects: Project[], scans: Map<string, ScannedProject>, locals: LocalMapEntry[]) {
  const localBySlug = new Map(locals.map((entry) => [entry.slug, entry]));
  const lines = [
    "# Project Matching Report",
    "",
    "Local paths are intentionally omitted from this public report. See `.portfolio-local-map.json` locally.",
    "",
    "| Slug | Title | GitHub | Local Repo | Confidence | Reasons | Status |",
    "| :--- | :--- | :--- | :---: | :---: | :--- | :--- |",
  ];

  projects.forEach((project) => {
    const local = localBySlug.get(project.slug);
    const scan = scans.get(project.slug);
    const match = matchConfidence(project, local, scan);
    lines.push(
      `| ${project.slug} | ${safeCell(project.content.en.title)} | ${safeCell(linkFor(project, "github")?.url)} | ${local?.localPath ? "Yes" : "No"} | ${match.confidence} | ${match.reasons.join("; ")} | ${statusForMatch(project, local, scan)} |`
    );
  });

  fs.writeFileSync(MATCHING_REPORT_PATH, `${lines.join("\n")}\n`);
}

function linkState(project: Project, kind: string) {
  const link = linkFor(project, kind);
  if (!link) return "Missing";
  if (isExternal(link.url)) return "External";
  return "Preparing";
}

function writeOverallReleaseReport(projects: Project[], scans: Map<string, ScannedProject>, progress: ProgressEntry[]) {
  const progressBySlug = new Map(progress.map((entry) => [entry.slug, entry]));
  const completed = progress.filter((entry) => entry.status === "completed");
  const blocked = progress.filter((entry) => ["blocked", "failed"].includes(entry.status));
  const manualFollowUp = progress.filter((entry) => entry.manualFollowUpNeeded.length > 0);
  const missingLocal = projects.filter((project) => !scans.has(project.slug));
  const missingGithub = projects.filter((project) => !isExternal(linkFor(project, "github")?.url));
  const interviewPriority = projects
    .map((project) => {
      const entry = progressBySlug.get(project.slug);
      const score =
        (project.featured ? 100 : 0) +
        (isExternal(linkFor(project, "github")?.url) ? 30 : 0) +
        (hasRealImage(project) ? 20 : 0) +
        (hasRealVideo(project) ? 20 : 0) +
        (isExternal(linkFor(project, "live")?.url) ? 15 : 0) -
        (entry?.manualFollowUpNeeded.length ?? 0) * 5;
      return { project, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);

  const lines = [
    "# Portfolio Release Report",
    "",
    "## Overview",
    "",
    "This release packages the portfolio catalog into a resume-ready project showcase system with per-project audits, resumable progress tracking, honest CTA states, demo recording guides, and public asset folders.",
    "",
    `- Public catalog projects: ${projects.length}`,
    `- Release packs generated: ${completed.length}`,
    `- Projects with manual follow-up: ${manualFollowUp.length}`,
    `- Blocked or failed projects: ${blocked.length}`,
    `- Missing local repositories: ${missingLocal.length}`,
    `- Missing GitHub repositories: ${missingGithub.length}`,
    "",
    "## Project Summary Table",
    "",
    "| Slug | Title | GitHub | Local Repo | README | Live Demo | Demo Video | Screenshots | Detail Page | Status |",
    "| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |",
  ];

  projects.forEach((project) => {
    const entry = progressBySlug.get(project.slug);
    lines.push(
      `| ${project.slug} | ${safeCell(project.content.en?.title ?? project.slug)} | ${linkState(project, "github")} | ${scans.has(project.slug) ? "Yes" : "No"} | ${linkState(project, "documentation")} | ${linkState(project, "live")} | ${linkState(project, "video")} | ${hasRealImage(project) ? "Real" : "Placeholder"} | Yes | ${entry?.status ?? "unknown"} |`
    );
  });

  lines.push("", "## Completed Projects", "");
  completed.forEach((entry) => lines.push(`- ${entry.slug}`));

  lines.push("", "## Blocked Projects", "");
  if (blocked.length === 0) {
    lines.push("- None.");
  } else {
    blocked.forEach((entry) => lines.push(`- ${entry.slug}: ${entry.manualFollowUpNeeded.join(", ") || entry.status}`));
  }

  lines.push("", "## Missing Local Repositories", "");
  if (missingLocal.length === 0) {
    lines.push("- None.");
  } else {
    missingLocal.forEach((project) => lines.push(`- ${project.slug}`));
  }

  lines.push("", "## Missing GitHub Repositories", "");
  if (missingGithub.length === 0) {
    lines.push("- None.");
  } else {
    missingGithub.forEach((project) => lines.push(`- ${project.slug}`));
  }

  lines.push("", "## Manual Follow-up Needed", "");
  if (manualFollowUp.length === 0) {
    lines.push("- None.");
  } else {
    manualFollowUp.forEach((entry) => lines.push(`- ${entry.slug}: ${entry.manualFollowUpNeeded.join(", ")}`));
  }

  lines.push("", "## Interview Showcase Priority", "");
  interviewPriority.forEach(({ project }, index) => {
    lines.push(`${index + 1}. ${project.content.en?.title ?? project.slug}`);
  });

  fs.writeFileSync(path.join(RELEASE_ROOT, "release-report.md"), `${lines.join("\n")}\n`);
}

function main() {
  ensureDir(RELEASE_ROOT);
  ensureDir(PROJECT_RELEASE_ROOT);
  ensureDir(DEMO_SCRIPT_ROOT);
  ensureDir(PUBLIC_PROJECT_ROOT);

  const projects = readJson<Project[]>(CATALOG_PATH, []);
  const scans = new Map(readJson<ScannedProject[]>(SCAN_REPORT_PATH, []).map((scan) => [scan.folder, scan]));
  const rawLocalMap = readJson<unknown>(LOCAL_MAP_PATH, []);
  const localEntries = normalizeLocalMap(rawLocalMap);
  const locals = new Map(localEntries.map((entry) => [entry.slug, entry]));

  const enrichedLocalMap = projects.map((project) => {
    const local = locals.get(project.slug) ?? { slug: project.slug };
    const scan = scans.get(project.slug);
    const match = matchConfidence(project, local, scan);
    return {
      ...local,
      title: project.content.en.title,
      portfolioSource: "src/generated/project-catalog.json",
      githubUrl: linkFor(project, "github")?.url,
      matchConfidence: match.confidence,
      matchReason: match.reasons,
      status: statusForMatch(project, local, scan),
    };
  });
  writeJson(LOCAL_MAP_PATH, { projects: enrichedLocalMap });

  writeMatchingReport(projects, scans, enrichedLocalMap);

  const progress = buildProgress(projects, scans, new Map(enrichedLocalMap.map((entry) => [entry.slug, entry])));

  progress.forEach((entry) => {
    const project = projects.find((candidate) => candidate.slug === entry.slug);
    if (!project) return;
    const scan = scans.get(project.slug);
    const local = enrichedLocalMap.find((candidate) => candidate.slug === project.slug);
    const pkg = packageInfo(local?.localPath);
    const commands = commandStatus(scan, pkg.scripts);

    try {
      ensurePlaceholderAssets(project);
      writeDemoGuide(project, scan);
      const readmeStatus = updateReadme(project, local?.localPath, scan, commands);
      const completed: ProgressEntry = {
        ...entry,
        status: "completed",
        auditStatus: "completed",
        readmeStatus,
        screenshotStatus: hasRealImage(project) ? "real-assets-present" : "placeholder-generated",
        demoStatus: hasRealVideo(project) ? "video-present" : "recording-guide-generated",
        buildStatus: commands.build,
        updatedAt: new Date().toISOString(),
      };
      writeProjectReports(project, scan, local, completed, commands, readmeStatus);
      Object.assign(entry, completed);
    } catch (error) {
      entry.status = "failed";
      entry.auditStatus = "failed";
      entry.manualFollowUpNeeded.push(error instanceof Error ? error.message : String(error));
      entry.updatedAt = new Date().toISOString();
    }
  });

  writeJson(PROGRESS_PATH, { generatedAt: new Date().toISOString(), projects: progress });
  writeOverallReleaseReport(projects, scans, progress);
  console.log(`Processed ${progress.length} project release packs.`);
}

main();
