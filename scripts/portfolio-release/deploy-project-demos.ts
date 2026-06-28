import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const QUALITY_JSON_PATH = path.join(ROOT, "docs/portfolio-release/quality-pass-report.json");
const QUALITY_MD_PATH = path.join(ROOT, "docs/portfolio-release/quality-pass-report.md");
const RELEASE_REPORT_PATH = path.join(ROOT, "docs/portfolio-release/release-report.md");
const DEPLOY_REPORT_PATH = path.join(ROOT, "docs/portfolio-release/demo-deployment-report.md");
const LOCAL_MAP_PATH = path.join(ROOT, ".portfolio-local-map.json");
const CONTENT_DIR = path.join(ROOT, "content/projects");
const HOME_DIR = os.homedir();
const WINDOWS_MOUNT_ROOT = path.join(path.sep, "mnt", "c");

const OWNER = "Justin21523";
const PAGES_BASE = `https://${OWNER.toLowerCase()}.github.io`;
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const onlySlug = valueFor("--slug");
const limit = Number(valueFor("--limit") ?? "0");

type LocaleText = Record<"en" | "zh-TW", string>;

type ProjectLink = {
  kind: string;
  url: string;
  label?: LocaleText;
  primary?: boolean;
};

type ProjectMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
  title?: LocaleText;
};

type Project = {
  slug: string;
  technologies: string[];
  links: ProjectLink[];
  media: ProjectMedia[];
  content: Record<"en" | "zh-TW", {
    title: string;
    summary: string;
    problem: string;
    solution: string;
    highlights: string[];
    technicalHighlights?: string[];
  }>;
};

type QualityResult = {
  slug: string;
  title: string;
  deploymentStatus: string;
  demoVideoStatus: string;
  screenshotStatus: string;
  manualFollowUpNeeded: string[];
  notes: string[];
};

type LocalMapEntry = {
  slug: string;
  githubUrl?: string;
  status?: string;
  matchConfidence?: string;
};

type RepoInfo = {
  name: string;
  url: string;
  homepageUrl?: string;
  isArchived?: boolean;
  isFork?: boolean;
  visibility?: string;
};

type DeployResult = {
  slug: string;
  repo?: string;
  url?: string;
  status: "deployed" | "blocked" | "skipped" | "failed" | "planned";
  reason: string;
};

function valueFor(name: string) {
  const prefix = `${name}=`;
  return process.argv.slice(2).find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function readJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function writeJson(filePath: string, value: unknown) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function run(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number } = {}) {
  return execFileSync(command, commandArgs, {
    cwd: options.cwd ?? ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: options.timeoutMs ?? 120000,
    maxBuffer: 1024 * 1024 * 8,
  }).trim();
}

function safeRun(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number } = {}) {
  try {
    return { ok: true, output: run(command, commandArgs, options) };
  } catch (error) {
    const err = error as { stderr?: Buffer | string; stdout?: Buffer | string; message?: string };
    const stderr = Buffer.isBuffer(err.stderr) ? err.stderr.toString("utf8") : err.stderr ?? "";
    const stdout = Buffer.isBuffer(err.stdout) ? err.stdout.toString("utf8") : err.stdout ?? "";
    return { ok: false, output: redact(`${stdout}\n${stderr}\n${err.message ?? ""}`.trim()) };
  }
}

function redact(value: string) {
  const escapedHome = HOME_DIR.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedWindowsRoot = WINDOWS_MOUNT_ROOT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value
    .replace(new RegExp(`${escapedHome}\\/[^\\s)\`"'，。；,;]*`, "g"), "[local-path]")
    .replace(new RegExp(`${escapedWindowsRoot}(?:\\/[^\\s)\`"'，。；,;]*)?`, "g"), "[local-path]")
    .replace(/[A-Za-z]:\\Users\\[^\\\s]+\\[^\s)`"']*/g, "[local-path]");
}

function linkFor(project: Project, kind: string) {
  return project.links.find((link) => link.kind === kind && link.url);
}

function githubRepoName(url: string | undefined) {
  const match = url?.match(/^https:\/\/github\.com\/Justin21523\/([^/#?]+)/i);
  return match?.[1]?.replace(/\.git$/, "");
}

function repoSimilarity(slug: string, repoName: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const a = normalize(slug);
  const b = normalize(repoName);
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.86;
  const aParts = slug.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const bParts = repoName.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const overlap = aParts.filter((part) => bParts.includes(part)).length;
  return overlap / Math.max(aParts.length, bParts.length, 1);
}

function loadRepos() {
  const output = run("gh", ["repo", "list", OWNER, "--limit", "200", "--json", "name,url,homepageUrl,visibility,isArchived,isFork"], {
    timeoutMs: 30000,
  });
  return JSON.parse(output) as RepoInfo[];
}

function normalizeLocalMap(raw: unknown): LocalMapEntry[] {
  if (Array.isArray(raw)) return raw as LocalMapEntry[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { projects?: unknown }).projects)) {
    return (raw as { projects: LocalMapEntry[] }).projects;
  }
  return [];
}

function resolveRepo(project: Project, repos: RepoInfo[], localMap: Map<string, LocalMapEntry>) {
  const repoByLower = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]));
  const github = linkFor(project, "github")?.url;
  const existingRepo = githubRepoName(github);
  if (existingRepo) {
    const repo = repoByLower.get(existingRepo.toLowerCase());
    if (!repo || repo.isArchived) {
      return { repo: undefined, reason: "GitHub URL does not resolve to an active repo." };
    }

    const score = repoSimilarity(project.slug, repo.name);
    if (score >= 0.45) {
      return { repo, reason: `matched existing catalog GitHub link with score ${score.toFixed(2)}` };
    }

    return { repo: undefined, reason: `catalog GitHub repo '${repo.name}' is too ambiguous for deployment.` };
  }

  const exact = repoByLower.get(project.slug.toLowerCase());
  if (exact && !exact.isArchived) {
    return { repo: exact, reason: "matched exact repo name" };
  }

  const local = localMap.get(project.slug);
  const localRepo = githubRepoName(local?.githubUrl);
  if (localRepo) {
    const repo = repoByLower.get(localRepo.toLowerCase());
    if (repo && !repo.isArchived && repoSimilarity(project.slug, repo.name) >= 0.45) {
      return { repo, reason: "matched local map GitHub URL" };
    }
  }

  return { repo: undefined, reason: "no high-confidence existing GitHub repo; repo creation is disabled" };
}

function absolutePortfolioUrl(relativeUrl: string | undefined) {
  if (!relativeUrl) return "";
  if (/^https?:\/\//.test(relativeUrl)) return relativeUrl;
  return `${PAGES_BASE}${relativeUrl}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDemoPage(project: Project) {
  const title = project.content.en.title;
  const screenshot = project.media.find((item) => item.type === "image")?.src;
  const video = project.media.find((item) => item.type === "video")?.src || linkFor(project, "video")?.url;
  const github = linkFor(project, "github")?.url ?? "";
  const readme = linkFor(project, "documentation")?.url ?? "";
  const portfolio = `${PAGES_BASE}/en/projects/${project.slug}/`;
  const tech = project.technologies.slice(0, 12).map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const highlights = project.content.en.highlights.slice(0, 5).map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} Demo</title>
  <style>
    :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #f7f7f4; color: #191b1f; }
    main { max-width: 1120px; margin: 0 auto; padding: 48px 20px 64px; }
    header { display: grid; gap: 18px; margin-bottom: 32px; }
    h1 { margin: 0; font-size: clamp(2rem, 6vw, 4.5rem); line-height: .95; letter-spacing: 0; max-width: 900px; }
    p { font-size: 1.05rem; line-height: 1.7; max-width: 820px; color: #3f454f; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; }
    a.button { color: #fff; background: #111827; padding: 12px 16px; border-radius: 8px; text-decoration: none; font-weight: 700; }
    a.secondary { color: #111827; background: #e4e6eb; }
    .media { display: grid; gap: 18px; margin: 28px 0; }
    img, video { width: 100%; border-radius: 8px; border: 1px solid #d8dbe2; background: #fff; }
    .panel { border-top: 1px solid #d8dbe2; padding-top: 24px; display: grid; gap: 16px; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chips span { background: #e9efe5; color: #243025; border: 1px solid #cbd8c8; border-radius: 999px; padding: 6px 10px; font-size: .9rem; }
    li { margin: 8px 0; line-height: 1.6; }
    @media (prefers-color-scheme: dark) {
      body { background: #101214; color: #f1f3f5; }
      p { color: #c4c9d1; }
      a.secondary { color: #f1f3f5; background: #2b3038; }
      img, video { border-color: #333944; background: #14181f; }
      .panel { border-color: #333944; }
      .chips span { background: #1f2a22; color: #d8f0dc; border-color: #304537; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(project.content.en.summary)}</p>
      <div class="actions">
        <a class="button" href="${portfolio}">Portfolio Case Study</a>
        ${github ? `<a class="button secondary" href="${github}">GitHub</a>` : ""}
        ${readme ? `<a class="button secondary" href="${readme}">README</a>` : ""}
        ${video ? `<a class="button secondary" href="${absolutePortfolioUrl(video)}">Demo Video</a>` : ""}
      </div>
    </header>
    <section class="media">
      ${screenshot ? `<img src="${absolutePortfolioUrl(screenshot)}" alt="${escapeHtml(title)} screenshot" />` : ""}
      ${video ? `<video src="${absolutePortfolioUrl(video)}" controls playsinline preload="metadata"></video>` : ""}
    </section>
    <section class="panel">
      <h2>Case Study Demo</h2>
      <p><strong>Problem:</strong> ${escapeHtml(project.content.en.problem)}</p>
      <p><strong>Solution:</strong> ${escapeHtml(project.content.en.solution)}</p>
      <h2>Highlights</h2>
      <ul>${highlights}</ul>
      <h2>Tech Stack</h2>
      <div class="chips">${tech}</div>
    </section>
  </main>
</body>
</html>`;
}

function prepareGhPagesWorktree(project: Project, repo: RepoInfo) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `portfolio-demo-${project.slug}-`));
  run("git", ["init"], { cwd: tempDir });
  run("git", ["checkout", "-b", "gh-pages"], { cwd: tempDir });
  fs.writeFileSync(path.join(tempDir, ".nojekyll"), "");
  fs.writeFileSync(path.join(tempDir, "index.html"), renderDemoPage(project));
  fs.writeFileSync(
    path.join(tempDir, "README.md"),
    `# ${project.content.en.title} Demo\n\nThis branch is generated by the portfolio release automation. It hosts a static case-study demo for GitHub Pages.\n`
  );
  run("git", ["add", "."], { cwd: tempDir });
  run("git", ["-c", "user.name=Portfolio Release Bot", "-c", "user.email=portfolio-release@example.local", "commit", "-m", `deploy: publish ${project.slug} portfolio demo`], { cwd: tempDir });
  run("git", ["remote", "add", "origin", repo.url], { cwd: tempDir });
  return tempDir;
}

function enablePages(repo: RepoInfo) {
  const repoPath = `${OWNER}/${repo.name}`;
  const source = JSON.stringify({ branch: "gh-pages", path: "/" });
  const existing = safeRun("gh", ["api", `repos/${repoPath}/pages`], { timeoutMs: 30000 });
  const verifyCurrentSource = () => {
    const current = safeRun("gh", ["api", `repos/${repoPath}/pages`, "--jq", ".source.branch + \" \" + .source.path"], { timeoutMs: 30000 });
    return current.ok && current.output.trim() === "gh-pages /";
  };

  if (existing.ok) {
    const updated = safeRun("gh", ["api", "-X", "PUT", `repos/${repoPath}/pages`, "-f", `source=${source}`], { timeoutMs: 30000 });
    if (updated.ok || verifyCurrentSource()) {
      return { ok: true, output: updated.ok ? updated.output : "current Pages source is already gh-pages /" };
    }
    return updated;
  }

  const created = safeRun("gh", ["api", "-X", "POST", `repos/${repoPath}/pages`, "-f", `source=${source}`], { timeoutMs: 30000 });
  if (created.ok || verifyCurrentSource()) {
    return { ok: true, output: created.ok ? created.output : "current Pages source is already gh-pages /" };
  }
  return created;
}

function deployProject(project: Project, repo: RepoInfo) {
  const pagesUrl = `${PAGES_BASE}/${repo.name}/`;
  if (dryRun) {
    return { status: "planned" as const, url: pagesUrl, reason: "dry run" };
  }

  const tempDir = prepareGhPagesWorktree(project, repo);
  try {
    const push = safeRun("git", ["push", "--force", "origin", "gh-pages"], { cwd: tempDir, timeoutMs: 180000 });
    if (!push.ok) {
      return { status: "failed" as const, url: pagesUrl, reason: `git push failed: ${push.output}` };
    }

    const pages = enablePages(repo);
    if (!pages.ok && !/already exists|is already enabled|204/.test(pages.output)) {
      return { status: "failed" as const, url: pagesUrl, reason: `GitHub Pages API failed: ${pages.output}` };
    }

    safeRun("gh", ["repo", "edit", `${OWNER}/${repo.name}`, "--homepage", pagesUrl], { timeoutMs: 30000 });
    return { status: "deployed" as const, url: pagesUrl, reason: "published gh-pages branch and enabled GitHub Pages" };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function setLink(project: Project, kind: string, url: string, label: LocaleText) {
  const link = linkFor(project, kind);
  if (link) {
    link.url = url;
    link.label = label;
  } else {
    project.links.push({ kind, url, label });
  }
}

function updateProjectOverride(project: Project, repo: RepoInfo, liveUrl: string) {
  const overridePath = path.join(CONTENT_DIR, project.slug, "project.override.json");
  const override = readJson<Record<string, unknown>>(overridePath, {});
  const links = Array.isArray(override.links) ? override.links as ProjectLink[] : [];
  const nextProject = { ...project, links: [...links] };
  setLink(nextProject, "github", repo.url, { en: "View GitHub", "zh-TW": "查看 GitHub" });
  setLink(nextProject, "documentation", `${repo.url}#readme`, { en: "README", "zh-TW": "README" });
  setLink(nextProject, "live", liveUrl, { en: "Live Demo", "zh-TW": "Live Demo" });
  override.links = nextProject.links;
  fs.writeFileSync(overridePath, `${JSON.stringify(override, null, 2)}\n`);
}

function updateQualityResult(result: QualityResult, deploy: DeployResult) {
  if (dryRun) {
    return;
  }

  if (deploy.status === "deployed" || deploy.status === "planned") {
    result.deploymentStatus = deploy.status === "planned" ? `planned external demo: ${deploy.url}` : `external live demo deployed: ${deploy.url}`;
    result.manualFollowUpNeeded = result.manualFollowUpNeeded.filter((item) => !item.includes("Deploy an external live demo"));
  } else {
    result.deploymentStatus = `${deploy.status}: ${deploy.reason}`;
    if (!result.manualFollowUpNeeded.some((item) => item.includes(deploy.reason))) {
      result.manualFollowUpNeeded.push(deploy.reason);
    }
  }
  result.notes = [...new Set([...(result.notes ?? []), `Deployment automation: ${deploy.reason}`])];
}

function writeReports(results: DeployResult[], quality: QualityResult[]) {
  const knownBySlug = new Map(results.map((result) => [result.slug, result]));
  const allResults = quality
    .filter((result) =>
      result.deploymentStatus.startsWith("external live demo deployed") ||
      result.deploymentStatus.startsWith("blocked") ||
      result.deploymentStatus.startsWith("failed") ||
      result.deploymentStatus.startsWith("planned external demo")
    )
    .map<DeployResult>((result) => {
      const known = knownBySlug.get(result.slug);
      if (known) return known;

      const deployedUrl = result.deploymentStatus.match(/https:\/\/[^\s]+/)?.[0];
      const status = result.deploymentStatus.startsWith("external live demo deployed")
        ? "deployed"
        : result.deploymentStatus.startsWith("planned external demo")
          ? "planned"
          : result.deploymentStatus.startsWith("failed")
            ? "failed"
            : "blocked";
      return {
        slug: result.slug,
        url: deployedUrl,
        status,
        reason: result.deploymentStatus,
      };
    });

  const lines = [
    "# Demo Deployment Report",
    "",
    `Generated at: ${new Date().toISOString()}`,
    "",
    "| Slug | Repo | URL | Status | Reason |",
    "| :--- | :--- | :--- | :--- | :--- |",
    ...allResults.map((result) => `| ${result.slug} | ${result.repo ?? "See project link"} | ${result.url ?? "None"} | ${result.status} | ${result.reason.replace(/\|/g, "\\|")} |`),
    "",
  ];
  fs.writeFileSync(DEPLOY_REPORT_PATH, `${lines.join("\n")}\n`);
  writeJson(QUALITY_JSON_PATH, { generatedAt: new Date().toISOString(), results: quality });

  const current = fs.existsSync(QUALITY_MD_PATH) ? fs.readFileSync(QUALITY_MD_PATH, "utf8") : "";
  const deployed = allResults.filter((result) => result.status === "deployed").length;
  const planned = allResults.filter((result) => result.status === "planned").length;
  const blocked = allResults.filter((result) => result.status === "blocked" || result.status === "failed").length;
  const section = [
    "<!-- demo-deployment-summary:start -->",
    "## Demo Deployment Automation",
    "",
    `- Deployed: ${deployed}`,
    `- Planned (dry run): ${planned}`,
    `- Blocked/failed: ${blocked}`,
    "- Detailed deployment report: `docs/portfolio-release/demo-deployment-report.md`",
    "<!-- demo-deployment-summary:end -->",
    "",
  ].join("\n");
  const next = current.includes("<!-- demo-deployment-summary:start -->")
    ? current.replace(/<!-- demo-deployment-summary:start -->[\s\S]*?<!-- demo-deployment-summary:end -->\n?/, section)
    : `${current.trimEnd()}\n\n${section}`;
  fs.writeFileSync(QUALITY_MD_PATH, next.endsWith("\n") ? next : `${next}\n`);

  if (fs.existsSync(RELEASE_REPORT_PATH)) {
    const release = fs.readFileSync(RELEASE_REPORT_PATH, "utf8");
    const releaseNext = release.includes("<!-- demo-deployment-summary:start -->")
      ? release.replace(/<!-- demo-deployment-summary:start -->[\s\S]*?<!-- demo-deployment-summary:end -->\n?/, section)
      : `${release.trimEnd()}\n\n${section}`;
    fs.writeFileSync(RELEASE_REPORT_PATH, releaseNext.endsWith("\n") ? releaseNext : `${releaseNext}\n`);
  }
}

function main() {
  const projects = readJson<Project[]>(CATALOG_PATH, []);
  const qualityRaw = readJson<{ results: QualityResult[] }>(QUALITY_JSON_PATH, { results: [] });
  const qualityBySlug = new Map(qualityRaw.results.map((result) => [result.slug, result]));
  const repos = loadRepos();
  const localMap = new Map(normalizeLocalMap(readJson<unknown>(LOCAL_MAP_PATH, [])).map((entry) => [entry.slug, entry]));

  if (!dryRun) {
    for (const project of projects) {
      const quality = qualityBySlug.get(project.slug);
      const live = linkFor(project, "live")?.url;
      if (quality?.deploymentStatus.includes("external deployment still needed") && live?.startsWith(PAGES_BASE)) {
        quality.deploymentStatus = `external live demo deployed: ${live}`;
        quality.manualFollowUpNeeded = quality.manualFollowUpNeeded.filter((item) => !item.includes("Deploy an external live demo"));
      }
    }
  }

  const candidates = projects
    .filter((project) => !onlySlug || project.slug === onlySlug)
    .filter((project) => {
      const status = qualityBySlug.get(project.slug)?.deploymentStatus ?? "";
      return (
        status.includes("external deployment still needed") ||
        status.startsWith("planned external demo") ||
        status.startsWith("failed:")
      );
    })
    .slice(0, limit > 0 ? limit : undefined);

  const results: DeployResult[] = [];
  for (const project of candidates) {
    process.stdout.write(`[deploy] ${project.slug}\n`);
    const quality = qualityBySlug.get(project.slug);
    if (!quality) continue;

    const match = resolveRepo(project, repos, localMap);
    if (!match.repo) {
      const blocked: DeployResult = {
        slug: project.slug,
        status: "blocked",
        reason: match.reason,
      };
      results.push(blocked);
      updateQualityResult(quality, blocked);
      continue;
    }

    const deployed = deployProject(project, match.repo);
    const deployResult: DeployResult = {
      slug: project.slug,
      repo: `${OWNER}/${match.repo.name}`,
      url: deployed.url,
      status: deployed.status,
      reason: `${match.reason}; ${deployed.reason}`,
    };
    results.push(deployResult);
    updateQualityResult(quality, deployResult);
    if (!dryRun && (deployed.status === "deployed" || deployed.status === "planned")) {
      updateProjectOverride(project, match.repo, deployed.url);
    }
  }

  writeReports(results, qualityRaw.results);
  console.log(`Deployment automation processed ${results.length} projects.`);
}

main();
