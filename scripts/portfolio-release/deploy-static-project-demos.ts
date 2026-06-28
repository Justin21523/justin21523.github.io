import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const ROOT = process.cwd();
const OWNER = "Justin21523";
const PAGES_BASE = `https://${OWNER.toLowerCase()}.github.io`;
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const LOCAL_MAP_PATH = path.join(ROOT, ".portfolio-local-map.json");
const CONTENT_DIR = path.join(ROOT, "content/projects");
const REPORT_PATH = path.join(ROOT, "docs/portfolio-release/static-demo-deployment-report.json");
const REPORT_MD_PATH = path.join(ROOT, "docs/portfolio-release/static-demo-deployment-report.md");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const deployAll = args.has("--all");
const createMissingRepos = args.has("--create-missing-repos");
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
  title?: Partial<LocaleText>;
  caption?: Partial<LocaleText>;
  placeholder?: boolean;
};

type Project = {
  slug: string;
  category: string;
  status?: string;
  year?: number;
  technologies?: string[];
  githubUrl?: string;
  readmeUrl?: string;
  links?: ProjectLink[];
  media?: ProjectMedia[];
  screenshots?: string[];
  coverImage?: string;
  heroImage?: string;
  content?: Record<string, {
    title?: string;
    summary?: string;
    problem?: string;
    solution?: string;
    architecture?: string;
    dataFlow?: string;
    projectStructure?: string;
    setupGuide?: string;
  }>;
};

type LocalMapEntry = {
  slug: string;
  githubUrl?: string;
  localPath?: string;
};

type RepoInfo = {
  name: string;
  url: string;
  isArchived?: boolean;
  description?: string;
};

type DeployResult = {
  slug: string;
  repo?: string;
  url?: string;
  status: "deployed" | "planned" | "skipped" | "failed";
  reason: string;
};

type RepoResolution = {
  repo?: RepoInfo;
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
    maxBuffer: 1024 * 1024 * 20,
  }).trim();
}

function safeRun(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number } = {}) {
  try {
    return { ok: true, output: run(command, commandArgs, options) };
  } catch (error) {
    const err = error as { stderr?: Buffer | string; stdout?: Buffer | string; message?: string };
    const stderr = Buffer.isBuffer(err.stderr) ? err.stderr.toString("utf8") : err.stderr ?? "";
    const stdout = Buffer.isBuffer(err.stdout) ? err.stdout.toString("utf8") : err.stdout ?? "";
    return { ok: false, output: `${stdout}\n${stderr}\n${err.message ?? ""}`.trim().slice(-4000) };
  }
}

function loadRepos() {
  const output = run("gh", ["repo", "list", OWNER, "--limit", "300", "--json", "name,url,isArchived"], {
    timeoutMs: 30000,
  });
  return JSON.parse(output) as RepoInfo[];
}

function findRepo(repoByName: Map<string, RepoInfo>, name: string | undefined) {
  if (!name) return undefined;
  return repoByName.get(name.toLowerCase());
}

function tokenize(value: string | undefined) {
  return String(value ?? "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !["app", "web", "demo", "project", "site", "studio", "platform", "system"].includes(token));
}

function normalized(value: string | undefined) {
  return tokenize(value).join("");
}

function repoKeywordScore(project: Project, repo: RepoInfo) {
  const projectTokens = new Set([
    ...tokenize(project.slug),
    ...tokenize(titleOf(project)),
  ]);
  const repoNameTokens = new Set(tokenize(repo.name));
  const repoTextTokens = new Set(tokenize(`${repo.name} ${repo.description ?? ""}`));
  let score = 0;

  projectTokens.forEach((token) => {
    if (repoNameTokens.has(token)) score += 2;
    else if (repoTextTokens.has(token)) score += 1;
    else {
      repoTextTokens.forEach((repoToken) => {
        if (token.length >= 4 && repoToken.length >= 4 && (token.includes(repoToken) || repoToken.includes(token))) {
          score += 0.5;
        }
      });
    }
  });

  if (normalized(repo.name) === normalized(project.slug)) score += 10;
  if (normalized(repo.name) === normalized(titleOf(project))) score += 8;
  return score;
}

function findKeywordRepo(project: Project, repos: RepoInfo[]) {
  const ranked = repos
    .filter((repo) => !repo.isArchived)
    .map((repo) => ({ repo, score: repoKeywordScore(project, repo) }))
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score);

  return ranked[0];
}

function ensureRepo(repoByName: Map<string, RepoInfo>, project: Project, repoName: string | undefined) {
  const normalizedName = repoName ?? project.slug;
  const existing = findRepo(repoByName, normalizedName);
  if (existing) return existing;
  if (!createMissingRepos || dryRun) return undefined;

  const created = safeRun("gh", ["repo", "create", `${OWNER}/${normalizedName}`, "--public", "--description", `${titleOf(project)} static demo project`, "--confirm"], {
    timeoutMs: 60000,
  });
  if (!created.ok && !/already exists|Name already exists/i.test(created.output)) {
    return undefined;
  }

  const repo: RepoInfo = {
    name: normalizedName,
    url: `https://github.com/${OWNER}/${normalizedName}`,
    isArchived: false,
  };
  repoByName.set(normalizedName.toLowerCase(), repo);
  return repo;
}

function repoNameFromUrl(url: string | undefined) {
  if (!url) return undefined;
  const httpsMatch = url.match(/^https:\/\/github\.com\/Justin21523\/([^/#?]+)/i);
  const sshMatch = url.match(/^git@github\.com:Justin21523\/([^/#?]+)/i);
  return (httpsMatch?.[1] ?? sshMatch?.[1])?.replace(/\.git$/, "");
}

function repoNameMatchesSlug(repoName: string | undefined, slug: string) {
  if (!repoName) return false;
  return normalized(repoName).includes(normalized(slug)) || normalized(slug).includes(normalized(repoName));
}

function linkFor(project: Project, kind: string) {
  return project.links?.find((link) => link.kind === kind && link.url);
}

function isFallbackLive(project: Project) {
  const live = linkFor(project, "live")?.url ?? "";
  return live.startsWith(`/projects/${project.slug}`);
}

function htmlEscape(value: string | number | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function assetUrl(src: string | undefined) {
  if (!src) return "";
  if (/^https?:\/\//.test(src)) return src;
  return `${PAGES_BASE}${src.startsWith("/") ? src : `/${src}`}`;
}

function firstText(project: Project, key: keyof NonNullable<Project["content"]>[string]) {
  return project.content?.en?.[key] ?? project.content?.["zh-TW"]?.[key] ?? "";
}

function titleOf(project: Project) {
  return firstText(project, "title") || project.slug;
}

function summaryOf(project: Project) {
  return firstText(project, "summary") || "A static, backend-free project preview prepared for portfolio review.";
}

function splitLines(value: string | undefined) {
  return (value ?? "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function mediaFor(project: Project) {
  const media = (project.media ?? []).filter((item) => !item.placeholder);
  const imageSources = [
    project.heroImage,
    project.coverImage,
    ...(project.screenshots ?? []),
    ...media.filter((item) => item.type === "image").map((item) => item.src),
    ...media.filter((item) => item.type === "video").map((item) => item.poster),
  ]
    .filter(Boolean)
    .map((src) => assetUrl(src))
    .filter(Boolean);

  return Array.from(new Set(imageSources)).slice(0, 8);
}

function renderStaticDemo(project: Project, repo: RepoInfo) {
  const title = titleOf(project);
  const summary = summaryOf(project);
  const github = linkFor(project, "github")?.url ?? project.githubUrl ?? `https://github.com/${OWNER}/${repo.name}`;
  const docs = linkFor(project, "documentation")?.url ?? project.readmeUrl ?? `${github}#readme`;
  const technologies = project.technologies ?? [];
  const images = mediaFor(project);
  const sections = [
    ["Problem", firstText(project, "problem")],
    ["Solution", firstText(project, "solution")],
    ["Architecture", firstText(project, "architecture")],
    ["Data Flow", firstText(project, "dataFlow")],
    ["Run Guide", firstText(project, "setupGuide")],
  ].filter(([, value]) => value);

  const gallery = images.length
    ? images.map((src, index) => `<figure><img src="${htmlEscape(src)}" alt="${htmlEscape(title)} preview ${index + 1}" loading="lazy" /></figure>`).join("")
    : `<div class="empty-media">Static preview assets are being prepared for this repository.</div>`;

  const projectStructure = splitLines(firstText(project, "projectStructure"));

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${htmlEscape(title)} - Static Demo</title>
  <meta name="description" content="${htmlEscape(summary)}" />
  <style>
    :root { color-scheme: dark; --bg: #101114; --panel: #191c22; --text: #f3f5f7; --muted: #a8b0bd; --line: #303640; --accent: #71d4b7; --accent2: #f5c55f; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    a { color: inherit; }
    .shell { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
    header { padding: 56px 0 28px; border-bottom: 1px solid var(--line); }
    .eyebrow { color: var(--accent); text-transform: uppercase; font-size: 12px; letter-spacing: .12em; font-weight: 800; }
    h1 { margin: 12px 0 12px; font-size: clamp(36px, 7vw, 72px); line-height: .95; letter-spacing: 0; }
    .summary { max-width: 780px; color: var(--muted); font-size: 18px; }
    .meta, .chips, .actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
    .meta { margin-top: 22px; color: var(--muted); }
    .pill, .chip { border: 1px solid var(--line); border-radius: 999px; padding: 7px 11px; background: rgba(255,255,255,.03); }
    .chip { color: var(--accent2); }
    .actions { margin-top: 26px; }
    .button { display: inline-flex; min-height: 42px; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--line); background: var(--panel); text-decoration: none; font-weight: 750; }
    .button.primary { background: var(--accent); color: #061310; border-color: var(--accent); }
    main { padding: 34px 0 60px; }
    .grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr); gap: 24px; }
    section, aside { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 22px; }
    section + section { margin-top: 22px; }
    h2 { margin: 0 0 12px; font-size: 22px; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
    figure { margin: 0; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #0b0c0f; aspect-ratio: 16 / 10; }
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .empty-media { border: 1px dashed var(--line); border-radius: 8px; padding: 32px; color: var(--muted); }
    pre { overflow: auto; padding: 16px; border-radius: 8px; background: #0b0c0f; border: 1px solid var(--line); color: #d9e6ef; }
    ul { padding-left: 20px; }
    .note { color: var(--muted); font-size: 14px; }
    @media (max-width: 820px) { .grid { grid-template-columns: 1fr; } header { padding-top: 36px; } }
  </style>
</head>
<body>
  <header>
    <div class="shell">
      <div class="eyebrow">Static Project Demo</div>
      <h1>${htmlEscape(title)}</h1>
      <p class="summary">${htmlEscape(summary)}</p>
      <div class="meta">
        <span class="pill">${htmlEscape(project.category)}</span>
        <span class="pill">${htmlEscape(project.status ?? "portfolio-ready")}</span>
        <span class="pill">${htmlEscape(project.year ?? "2026")}</span>
      </div>
      <div class="actions">
        <a class="button primary" href="${htmlEscape(github)}">Source Repository</a>
        <a class="button" href="${htmlEscape(docs)}">Project Docs</a>
        <a class="button" href="${htmlEscape(PAGES_BASE)}/en/projects/${htmlEscape(project.slug)}/">Portfolio Detail</a>
      </div>
    </div>
  </header>
  <main class="shell">
    <div class="grid">
      <div>
        <section>
          <h2>Preview</h2>
          <div class="gallery">${gallery}</div>
        </section>
        ${sections.map(([heading, value]) => `<section><h2>${htmlEscape(heading)}</h2><p>${htmlEscape(value)}</p></section>`).join("")}
      </div>
      <aside>
        <h2>Technology</h2>
        <div class="chips">${technologies.map((tech) => `<span class="chip">${htmlEscape(tech)}</span>`).join("") || `<span class="note">Technology metadata is being curated.</span>`}</div>
        <h2 style="margin-top:24px;">Static Mode</h2>
        <p class="note">This deployment is intentionally backend-free. Server, database, authentication, and external API behavior is represented through static project materials and deterministic sample flows.</p>
        ${projectStructure.length ? `<h2 style="margin-top:24px;">Structure</h2><pre>${htmlEscape(projectStructure.join("\n"))}</pre>` : ""}
      </aside>
    </div>
  </main>
</body>
</html>
`;
}

function prepareStaticWorktree(project: Project, repo: RepoInfo) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `static-project-demo-${repo.name}-`));
  run("git", ["init"], { cwd: tempDir });
  run("git", ["checkout", "-b", "gh-pages"], { cwd: tempDir });
  fs.writeFileSync(path.join(tempDir, "index.html"), renderStaticDemo(project, repo), "utf8");
  fs.writeFileSync(path.join(tempDir, ".nojekyll"), "");
  run("git", ["add", "."], { cwd: tempDir });
  run("git", ["-c", "user.name=Portfolio Release Bot", "-c", "user.email=portfolio-release@example.local", "commit", "-m", `deploy: publish static demo for ${project.slug}`], { cwd: tempDir });
  run("git", ["remote", "add", "origin", repo.url], { cwd: tempDir });
  return tempDir;
}

function enablePages(repo: RepoInfo) {
  const repoPath = `${OWNER}/${repo.name}`;
  const existing = safeRun("gh", ["api", `repos/${repoPath}/pages`], { timeoutMs: 30000 });
  if (existing.ok) {
    return safeRun("gh", ["api", "-X", "PUT", `repos/${repoPath}/pages`, "-f", "source[branch]=gh-pages", "-f", "source[path]=/"], { timeoutMs: 30000 });
  }

  return safeRun("gh", ["api", "-X", "POST", `repos/${repoPath}/pages`, "-f", "source[branch]=gh-pages", "-f", "source[path]=/"], { timeoutMs: 30000 });
}

function updateOverride(project: Project, repo: RepoInfo) {
  const overridePath = path.join(CONTENT_DIR, project.slug, "project.override.json");
  const override = readJson<Record<string, unknown>>(overridePath, {});
  const links = Array.isArray(override.links) ? override.links as ProjectLink[] : [];
  const liveUrl = `${PAGES_BASE}/${repo.name}/`;
  const liveLink: ProjectLink = {
    kind: "live",
    url: liveUrl,
    label: {
      "zh-TW": "Static Demo Site",
      en: "Static Demo Site",
    },
    primary: true,
  };
  const index = links.findIndex((link) => link.kind === "live");
  if (index === -1) links.unshift(liveLink);
  else links[index] = { ...links[index], ...liveLink };

  const githubUrl = `https://github.com/${OWNER}/${repo.name}`;
  const githubLink: ProjectLink = {
    kind: "github",
    url: githubUrl,
    label: {
      "zh-TW": "GitHub",
      en: "GitHub",
    },
  };
  const docsLink: ProjectLink = {
    kind: "documentation",
    url: `${githubUrl}#readme`,
    label: {
      "zh-TW": "Project Docs",
      en: "Project Docs",
    },
  };
  const githubIndex = links.findIndex((link) => link.kind === "github");
  const docsIndex = links.findIndex((link) => link.kind === "documentation");
  if (githubIndex === -1) links.push(githubLink);
  else if (!/^https?:\/\//.test(links[githubIndex].url)) links[githubIndex] = githubLink;
  if (docsIndex === -1) links.push(docsLink);
  else if (!/^https?:\/\//.test(links[docsIndex].url)) links[docsIndex] = docsLink;

  override.links = links;
  writeJson(overridePath, override);
}

function deploy(project: Project, repo: RepoInfo): DeployResult {
  const url = `${PAGES_BASE}/${repo.name}/`;
  if (dryRun) {
    return { slug: project.slug, repo: repo.name, url, status: "planned", reason: "dry run" };
  }

  const tempDir = prepareStaticWorktree(project, repo);
  try {
    const pushed = safeRun("git", ["push", "--force", "origin", "gh-pages"], { cwd: tempDir, timeoutMs: 420000 });
    if (!pushed.ok) {
      return { slug: project.slug, repo: repo.name, url, status: "failed", reason: `push failed: ${pushed.output}` };
    }

    const pages = enablePages(repo);
    if (!pages.ok && !/already exists|source/i.test(pages.output)) {
      return { slug: project.slug, repo: repo.name, url, status: "failed", reason: `pages enable failed: ${pages.output}` };
    }

    safeRun("gh", ["repo", "edit", `${OWNER}/${repo.name}`, "--homepage", url], { timeoutMs: 30000 });
    updateOverride(project, repo);
    return { slug: project.slug, repo: repo.name, url, status: "deployed", reason: "deployed backend-free static demo to gh-pages" };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function resolveRepo(project: Project, local: LocalMapEntry | undefined, repoByName: Map<string, RepoInfo>, repos: RepoInfo[]): RepoResolution {
  const catalogRepoName =
    repoNameFromUrl(project.githubUrl) ??
    repoNameFromUrl(linkFor(project, "github")?.url);
  const catalogRepo = findRepo(repoByName, catalogRepoName);
  if (catalogRepo) return { repo: catalogRepo, reason: `catalog GitHub URL matched ${catalogRepo.name}` };

  const localRepoName = repoNameFromUrl(local?.githubUrl);
  if (repoNameMatchesSlug(localRepoName, project.slug)) {
    const localRepo = findRepo(repoByName, localRepoName);
    if (localRepo) return { repo: localRepo, reason: `local map matched ${localRepo.name}` };
  }

  const keywordMatch = findKeywordRepo(project, repos);
  if (keywordMatch) {
    return { repo: keywordMatch.repo, reason: `keyword matched ${keywordMatch.repo.name} (score ${keywordMatch.score})` };
  }

  const created = ensureRepo(repoByName, project, catalogRepoName);
  return {
    repo: created,
    reason: created ? `created missing repo ${created.name}` : "no active GitHub repo found; rerun with --create-missing-repos to create one",
  };
}

function writeReport(results: DeployResult[]) {
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  writeJson(REPORT_PATH, {
    generatedAt: new Date().toISOString(),
    dryRun,
    deployAll,
    results,
  });
  fs.writeFileSync(
    REPORT_MD_PATH,
    [
      "# Static Demo Deployment Report",
      "",
      `Generated at: ${new Date().toISOString()}`,
      `Dry run: ${dryRun ? "yes" : "no"}`,
      "",
      "| Slug | Repo | URL | Status | Reason |",
      "| :--- | :--- | :--- | :--- | :--- |",
      ...results.map((result) => `| ${result.slug} | ${result.repo ?? ""} | ${result.url ?? ""} | ${result.status} | ${result.reason.replace(/\|/g, "\\|")} |`),
      "",
    ].join("\n"),
    "utf8"
  );
}

function main() {
  const projects = readJson<Project[]>(CATALOG_PATH, []);
  const localMap = readJson<{ projects?: LocalMapEntry[] }>(LOCAL_MAP_PATH, { projects: [] }).projects ?? [];
  const localBySlug = new Map(localMap.map((entry) => [entry.slug, entry]));
  const repos = loadRepos();
  const repoByName = new Map(repos.filter((repo) => !repo.isArchived).map((repo) => [repo.name.toLowerCase(), repo]));
  const results: DeployResult[] = [];
  let processed = 0;

  for (const project of projects) {
    if (onlySlug && project.slug !== onlySlug) continue;
    if (limit > 0 && processed >= limit) break;
    if (!deployAll && !isFallbackLive(project)) continue;

    const local = localBySlug.get(project.slug);
    const resolved = resolveRepo(project, local, repoByName, repos);
    const repo = resolved.repo;

    if (!repo) {
      results.push({ slug: project.slug, status: "skipped", reason: resolved.reason });
      continue;
    }

    processed += 1;
    const result = deploy(project, repo);
    result.reason = `${resolved.reason}; ${result.reason}`;
    results.push(result);
  }

  writeReport(results);
  const failed = results.filter((result) => result.status === "failed").length;
  const skipped = results.filter((result) => result.status === "skipped").length;
  console.log(`Static demo deployment complete: ${results.length} processed, ${failed} failed, ${skipped} skipped.`);
  results.forEach((result) => console.log(`${result.status}\t${result.slug}\t${result.url ?? ""}\t${result.reason}`));
  if (failed > 0) process.exitCode = 1;
}

main();
