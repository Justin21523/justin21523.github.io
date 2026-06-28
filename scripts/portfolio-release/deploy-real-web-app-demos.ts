import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const LOCAL_MAP_PATH = path.join(ROOT, ".portfolio-local-map.json");
const CONTENT_DIR = path.join(ROOT, "content/projects");
const REPORT_PATH = path.join(ROOT, "docs/portfolio-release/real-app-demo-deployment-report.json");
const REPORT_MD_PATH = path.join(ROOT, "docs/portfolio-release/real-app-demo-deployment-report.md");
const OWNER = "Justin21523";
const PAGES_BASE = `https://${OWNER.toLowerCase()}.github.io`;
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const replaceStaticOnly = args.has("--replace-static-only");
const forceDemoApp = args.has("--force-demo-app");
const onlySlug = valueFor("--slug");
const limit = Number(valueFor("--limit") ?? "0");

type ProjectLink = {
  kind: string;
  url: string;
  label?: Record<"zh-TW" | "en", string>;
  primary?: boolean;
};

type Project = {
  slug: string;
  category: string;
  status?: string;
  year?: number;
  technologies: string[];
  githubUrl?: string;
  readmeUrl?: string;
  links: ProjectLink[];
  content?: Record<string, Record<string, string | undefined>>;
  metadata: {
    frameworks?: string[];
    platforms?: string[];
    projectType?: string;
  };
};

type LocalMapEntry = {
  slug: string;
  localPath?: string;
  githubUrl?: string;
};

type PackageJson = {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type RepoInfo = {
  name: string;
  url: string;
  isArchived?: boolean;
};

type DeployResult = {
  slug: string;
  status: "deployed" | "skipped" | "failed" | "planned";
  url?: string;
  repo?: string;
  reason: string;
  strategy?: "original-app-build" | "repo-demo-app";
};

type BuildResult = {
  ok: boolean;
  output: string;
  mode: "package-build" | "vite-static";
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

function run(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number; env?: Record<string, string> } = {}) {
  return execFileSync(command, commandArgs, {
    cwd: options.cwd ?? ROOT,
    env: {
      ...process.env,
      ...options.env,
    },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: options.timeoutMs ?? 120000,
    maxBuffer: 1024 * 1024 * 20,
  }).trim();
}

function safeRun(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number; env?: Record<string, string> } = {}) {
  try {
    return {
      ok: true,
      output: run(command, commandArgs, options),
    };
  } catch (error) {
    const err = error as { stderr?: Buffer | string; stdout?: Buffer | string; message?: string };
    const stderr = Buffer.isBuffer(err.stderr) ? err.stderr.toString("utf8") : err.stderr ?? "";
    const stdout = Buffer.isBuffer(err.stdout) ? err.stdout.toString("utf8") : err.stdout ?? "";
    return {
      ok: false,
      output: `${stdout}\n${stderr}\n${err.message ?? ""}`.trim().slice(-4000),
    };
  }
}

function loadRepos() {
  const output = run("gh", ["repo", "list", OWNER, "--limit", "250", "--json", "name,url,isArchived"], {
    timeoutMs: 30000,
  });
  return JSON.parse(output) as RepoInfo[];
}

function githubRepoName(url: string | undefined) {
  const match = url?.match(/^https:\/\/github\.com\/Justin21523\/([^/#?]+)/i);
  return match?.[1]?.replace(/\.git$/, "");
}

function linkFor(project: Project, kind: string) {
  return project.links.find((link) => link.kind === kind && link.url);
}

function isFallbackLive(project: Project) {
  const live = linkFor(project, "live")?.url ?? "";
  return live.startsWith(`/projects/${project.slug}`);
}

function contentText(project: Project, key: string) {
  return project.content?.en?.[key] ?? project.content?.["zh-TW"]?.[key] ?? "";
}

function titleOf(project: Project) {
  return contentText(project, "title") || project.slug;
}

function summaryOf(project: Project) {
  return contentText(project, "summary") ||
    contentText(project, "problem") ||
    `${titleOf(project)} demo workspace prepared for portfolio review and hands-on exploration.`;
}

function splitSentences(value: string, fallback: string[]) {
  const items = value
    .split(/(?:\n|\.|;)+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 18)
    .slice(0, 6);
  return items.length ? items : fallback;
}

function sanitizeText(value: string | number | undefined) {
  return String(value ?? "").replace(/[<>]/g, "");
}

function packageName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "portfolio-demo-app";
}

async function isGeneratedStaticPage(url: string | undefined) {
  if (!url || !/^https?:\/\//.test(url)) return false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "portfolio-real-app-demo-deployer/1.0",
      },
    });
    const text = await response.text();
    return /Static Project Demo|Static Demo Site|backend-free static demo/i.test(text);
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function isWebAppCandidate(project: Project, packageJson: PackageJson) {
  const tokens = [
    project.category,
    project.metadata.projectType ?? "",
    ...project.technologies,
    ...(project.metadata.frameworks ?? []),
    ...(project.metadata.platforms ?? []),
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
  ].join(" ").toLowerCase();

  return project.category === "frontend" ||
    project.category === "interactive-3d" ||
    /\b(vite|next\.js|next|react|three|phaser|webgl|canvas|vanilla javascript|typescript)\b/.test(tokens);
}

function detectBuildOutput(localPath: string) {
  const candidates = ["dist", "out", "build", ".next/out"].map((dir) => path.join(localPath, dir));
  const direct = candidates.find((dir) => fs.existsSync(path.join(dir, "index.html")));
  if (direct) return direct;

  return findBuildOutputs(localPath)[0];
}

function findBuildOutputs(dirPath: string, depth = 0): string[] {
  if (!fs.existsSync(dirPath) || depth > 4) return [];
  if (fs.existsSync(path.join(dirPath, "index.html")) && ["dist", "out", "build", "admin-web"].includes(path.basename(dirPath))) {
    return [dirPath];
  }

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory()) return [];
    if (["node_modules", ".git", ".next", "coverage", "dist/assets"].includes(entry.name)) return [];

    const fullPath = path.join(dirPath, entry.name);
    if (["dist", "out", "build"].includes(entry.name) && fs.existsSync(path.join(fullPath, "index.html"))) {
      return [fullPath];
    }

    return findBuildOutputs(fullPath, depth + 1);
  });
}

function copyDir(source: string, target: string) {
  fs.mkdirSync(target, { recursive: true });
  fs.cpSync(source, target, {
    recursive: true,
    force: true,
  });
}

function rewriteAssetPaths(dir: string, repoName: string) {
  const files = listFiles(dir).filter((file) => /\.(html|css|js|json|txt|svg)$/i.test(file));
  files.forEach((file) => {
    let text = fs.readFileSync(file, "utf8");
    text = text
      .replace(/(["'=])\/assets\//g, `$1./assets/`)
      .replace(/url\(\s*\/assets\//g, "url(./assets/")
      .replace(/(["'=])\/_next\//g, `$1/${repoName}/_next/`)
      .replace(/(["'=])\/favicon/g, `$1/${repoName}/favicon`);
    fs.writeFileSync(file, text, "utf8");
  });
}

function listFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function installIfNeeded(localPath: string) {
  const packageJson = readJson<PackageJson>(path.join(localPath, "package.json"), {});
  const firstMissingDependency = Object.keys({
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  }).find((dependency) => !fs.existsSync(path.join(localPath, "node_modules", ...dependency.split("/"))));

  if (fs.existsSync(path.join(localPath, "node_modules")) && !firstMissingDependency) {
    return { ok: true, output: "node_modules exists" };
  }

  if (fs.existsSync(path.join(localPath, "package-lock.json"))) {
    const cleanInstall = safeRun("npm", ["ci"], { cwd: localPath, timeoutMs: 300000 });
    return cleanInstall.ok ? cleanInstall : safeRun("npm", ["ci", "--legacy-peer-deps"], { cwd: localPath, timeoutMs: 300000 });
  }

  const install = safeRun("npm", ["install"], { cwd: localPath, timeoutMs: 300000 });
  return install.ok ? install : safeRun("npm", ["install", "--legacy-peer-deps"], { cwd: localPath, timeoutMs: 300000 });
}

function findViteProjectDirs(localPath: string) {
  const candidates = [
    localPath,
    path.join(localPath, "apps/web"),
    path.join(localPath, "frontend"),
    path.join(localPath, "client"),
    path.join(localPath, "admin-web"),
    path.join(localPath, "web"),
    path.join(localPath, "app"),
  ];

  return candidates.filter((candidate) => {
    const packageJson = readJson<PackageJson>(path.join(candidate, "package.json"), {});
    const scripts = Object.values(packageJson.scripts ?? {}).join(" ");
    return fs.existsSync(path.join(candidate, "vite.config.ts")) ||
      fs.existsSync(path.join(candidate, "vite.config.js")) ||
      (fs.existsSync(path.join(candidate, "package.json")) &&
        (/\bvite\b/.test(scripts) || Boolean(packageJson.devDependencies?.vite ?? packageJson.dependencies?.vite)));
  });
}

function buildProject(localPath: string, repoName: string): BuildResult {
  const standardBuild = safeRun("npm", ["run", "build"], {
    cwd: localPath,
    timeoutMs: 300000,
    env: {
      GITHUB_PAGES: "true",
      BASE_URL: `/${repoName}/`,
      PUBLIC_URL: `/${repoName}/`,
      VITE_BASE: `/${repoName}/`,
      NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
    },
  });
  if (standardBuild.ok) {
    return { ...standardBuild, mode: "package-build" };
  }

  for (const viteDir of findViteProjectDirs(localPath)) {
    const configPath = ["vite.config.ts", "vite.config.js"].map((fileName) => path.join(viteDir, fileName)).find(fs.existsSync);
    const hasOwnPackage = fs.existsSync(path.join(viteDir, "package.json"));
    if (hasOwnPackage) {
      const install = installIfNeeded(viteDir);
      if (!install.ok) continue;
    }
    const viteArgs = hasOwnPackage || !configPath
      ? ["vite", "build", "--base", `/${repoName}/`]
      : ["vite", "build", "--config", path.relative(localPath, configPath), "--base", `/${repoName}/`];
    const viteBuild = safeRun("npx", viteArgs, {
      cwd: hasOwnPackage ? viteDir : localPath,
      timeoutMs: 300000,
      env: {
        GITHUB_PAGES: "true",
        BASE_URL: `/${repoName}/`,
        PUBLIC_URL: `/${repoName}/`,
        VITE_BASE: `/${repoName}/`,
      },
    });

    if (viteBuild.ok) {
      return { ...viteBuild, mode: "vite-static" };
    }
  }

  return { ...standardBuild, mode: "package-build" };
}

function jsonString(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function buildDemoAppModel(project: Project, repo: RepoInfo) {
  const problem = contentText(project, "problem") || summaryOf(project);
  const solution = contentText(project, "solution") || `Explore ${titleOf(project)} through a browser-based workflow with bundled sample data.`;
  const architecture = contentText(project, "architecture") || contentText(project, "dataFlow") || "The demo separates presentation, workflow state, fixtures, and result panels so the project can be reviewed without backend services.";
  const setupGuide = contentText(project, "setupGuide") || "Run npm install, npm run dev, npm run build, and npm run preview inside demo-app.";
  const features = splitSentences(
    [contentText(project, "features"), contentText(project, "technicalHighlights"), solution].filter(Boolean).join("\n"),
    [
      "Inspect a realistic project dashboard with curated sample records.",
      "Switch between workflow, data, and architecture views.",
      "Run deterministic demo actions that simulate the core user journey.",
      "Review implementation notes and repository links from the app shell.",
    ]
  );
  const metrics = [
    { label: "Demo Modules", value: String(Math.max(4, features.length)) },
    { label: "Tech Stack", value: String(project.technologies?.length ?? 0) },
    { label: "Mode", value: "Fixture" },
    { label: "Status", value: project.status ?? "ready" },
  ];
  const records = features.slice(0, 5).map((feature, index) => ({
    id: `flow-${String(index + 1).padStart(2, "0")}`,
    name: feature.replace(/\.$/, ""),
    status: index % 3 === 0 ? "Ready" : index % 3 === 1 ? "Review" : "Queued",
    owner: ["Frontend", "Data", "Automation", "Product", "Quality"][index % 5],
  }));

  return {
    slug: project.slug,
    title: titleOf(project),
    summary: summaryOf(project),
    category: project.category,
    year: project.year ?? 2026,
    status: project.status ?? "portfolio-ready",
    technologies: project.technologies ?? [],
    githubUrl: project.githubUrl ?? `https://github.com/${OWNER}/${repo.name}`,
    readmeUrl: project.readmeUrl ?? `${project.githubUrl ?? `https://github.com/${OWNER}/${repo.name}`}#readme`,
    problem,
    solution,
    architecture,
    setupGuide,
    features,
    metrics,
    records,
  };
}

function renderDemoMainJs(model: ReturnType<typeof buildDemoAppModel>) {
  return `import "./styles.css";

const project = ${jsonString(model)};

const state = {
  tab: "overview",
  query: "",
  selected: project.records[0]?.id ?? "",
};

function matches(record) {
  const q = state.query.trim().toLowerCase();
  if (!q) return true;
  return [record.name, record.status, record.owner].join(" ").toLowerCase().includes(q);
}

function renderMetrics() {
  return project.metrics.map((metric) => \`
    <div class="metric">
      <span>\${metric.label}</span>
      <strong>\${metric.value}</strong>
    </div>
  \`).join("");
}

function renderTabs() {
  return ["overview", "workflow", "data", "architecture"].map((tab) => \`
    <button class="tab \${state.tab === tab ? "active" : ""}" data-tab="\${tab}">\${tab}</button>
  \`).join("");
}

function renderOverview() {
  return \`
    <section class="panel hero-panel">
      <div>
        <p class="eyebrow">\${project.category} · \${project.year}</p>
        <h1>\${project.title}</h1>
        <p class="lead">\${project.summary}</p>
      </div>
      <div class="metrics">\${renderMetrics()}</div>
    </section>
    <section class="panel split">
      <div>
        <h2>Problem</h2>
        <p>\${project.problem}</p>
      </div>
      <div>
        <h2>Solution</h2>
        <p>\${project.solution}</p>
      </div>
    </section>
  \`;
}

function renderWorkflow() {
  return \`
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Demo workflow</p>
          <h2>Interactive Review Flow</h2>
        </div>
        <button id="runDemo" class="primary">Run demo pass</button>
      </div>
      <div class="timeline">
        \${project.features.map((feature, index) => \`
          <article class="step">
            <span>\${String(index + 1).padStart(2, "0")}</span>
            <p>\${feature}</p>
          </article>
        \`).join("")}
      </div>
      <output id="demoOutput" class="output">Ready to run the guided demo.</output>
    </section>
  \`;
}

function renderData() {
  const rows = project.records.filter(matches);
  return \`
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Fixture data</p>
          <h2>Sample Records</h2>
        </div>
        <input id="search" value="\${state.query}" placeholder="Filter records" />
      </div>
      <div class="table">
        \${rows.map((record) => \`
          <button class="row \${state.selected === record.id ? "selected" : ""}" data-record="\${record.id}">
            <span>\${record.id}</span>
            <strong>\${record.name}</strong>
            <em>\${record.owner}</em>
            <b>\${record.status}</b>
          </button>
        \`).join("") || \`<p class="empty">No records match this filter.</p>\`}
      </div>
    </section>
  \`;
}

function renderArchitecture() {
  return \`
    <section class="panel split">
      <div>
        <p class="eyebrow">Architecture</p>
        <h2>How the demo is organized</h2>
        <p>\${project.architecture}</p>
        <pre>demo-app/
  src/main.js
  src/styles.css
  index.html
  package.json</pre>
      </div>
      <div>
        <p class="eyebrow">Run guide</p>
        <h2>Local commands</h2>
        <pre>\${project.setupGuide}</pre>
        <div class="chips">\${project.technologies.slice(0, 12).map((tech) => \`<span>\${tech}</span>\`).join("")}</div>
      </div>
    </section>
  \`;
}

function render() {
  const views = {
    overview: renderOverview,
    workflow: renderWorkflow,
    data: renderData,
    architecture: renderArchitecture,
  };
  document.querySelector("#app").innerHTML = \`
    <header class="topbar">
      <a href="\${project.githubUrl}" class="brand">\${project.title}</a>
      <nav>\${renderTabs()}</nav>
      <a class="repo" href="\${project.readmeUrl}">README</a>
    </header>
    <main>\${views[state.tab]()}</main>
  \`;

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      render();
    });
  });
  document.querySelector("#search")?.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
    document.querySelector("#search")?.focus();
  });
  document.querySelectorAll("[data-record]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selected = button.dataset.record;
      render();
    });
  });
  document.querySelector("#runDemo")?.addEventListener("click", () => {
    const output = document.querySelector("#demoOutput");
    if (output) output.textContent = \`\${project.title}: \${project.records.length} fixture records processed and \${project.features.length} workflow checks completed.\`;
  });
}

render();
`;
}

function renderDemoCss() {
  return `:root {
  color-scheme: light;
  --bg: #f6f3ed;
  --panel: #ffffff;
  --ink: #182026;
  --muted: #65717c;
  --line: #d8d2c8;
  --accent: #0d7f6f;
  --accent-2: #b84f2a;
  --soft: #e8f4f1;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--ink);
}
a { color: inherit; text-decoration: none; }
button, input { font: inherit; }
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: minmax(180px, 1fr) auto auto;
  gap: 18px;
  align-items: center;
  min-height: 72px;
  padding: 0 28px;
  border-bottom: 1px solid var(--line);
  background: rgba(246, 243, 237, .92);
  backdrop-filter: blur(16px);
}
.brand { font-weight: 850; line-height: 1.1; }
nav { display: flex; gap: 6px; padding: 4px; border: 1px solid var(--line); border-radius: 8px; background: #fffaf2; }
.tab {
  border: 0;
  border-radius: 6px;
  padding: 9px 12px;
  color: var(--muted);
  background: transparent;
  cursor: pointer;
  text-transform: capitalize;
}
.tab.active { background: var(--ink); color: white; }
.repo, .primary {
  border: 1px solid var(--ink);
  border-radius: 8px;
  padding: 10px 14px;
  background: var(--ink);
  color: white;
  cursor: pointer;
}
main {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 64px;
}
.panel {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 24px;
  background: var(--panel);
  box-shadow: 0 18px 50px rgba(24, 32, 38, .08);
}
.panel + .panel { margin-top: 18px; }
.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);
  gap: 24px;
  align-items: stretch;
}
.eyebrow {
  margin: 0 0 10px;
  color: var(--accent-2);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: .1em;
  text-transform: uppercase;
}
h1 {
  margin: 0;
  max-width: 860px;
  font-size: clamp(34px, 6vw, 76px);
  line-height: .95;
  letter-spacing: 0;
}
h2 { margin: 0 0 10px; font-size: 22px; letter-spacing: 0; }
p { color: var(--muted); line-height: 1.65; }
.lead { max-width: 760px; font-size: 18px; }
.metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.metric {
  min-height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 16px;
  background: var(--soft);
}
.metric span { color: var(--muted); font-size: 13px; }
.metric strong { font-size: 26px; }
.split { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.section-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 18px;
}
.timeline { display: grid; gap: 10px; }
.step {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px;
  background: #fffaf2;
}
.step span { color: var(--accent); font-weight: 900; }
.step p { margin: 0; color: var(--ink); }
.output {
  display: block;
  margin-top: 18px;
  border-radius: 8px;
  padding: 14px;
  background: var(--ink);
  color: white;
}
input {
  width: min(280px, 100%);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 10px 12px;
}
.table { display: grid; gap: 8px; }
.row {
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr) 120px 90px;
  gap: 12px;
  align-items: center;
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px;
  background: white;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
}
.row.selected { border-color: var(--accent); background: var(--soft); }
.row span, .row em { color: var(--muted); font-style: normal; }
.row b { color: var(--accent); }
pre {
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 14px;
  background: #182026;
  color: #f7f1e8;
}
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips span {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--accent);
  background: #fffaf2;
  font-size: 13px;
}
.empty { padding: 18px; border: 1px dashed var(--line); border-radius: 8px; }
@media (max-width: 860px) {
  .topbar { grid-template-columns: 1fr; padding: 14px 16px; }
  nav { overflow-x: auto; }
  .hero-panel, .split { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; }
}
`;
}

function ensureDemoApp(sourceDir: string, project: Project, repo: RepoInfo) {
  const demoDir = path.join(sourceDir, "demo-app");
  fs.mkdirSync(path.join(demoDir, "src"), { recursive: true });
  const model = buildDemoAppModel(project, repo);
  fs.writeFileSync(
    path.join(demoDir, "package.json"),
    `${JSON.stringify({
      name: packageName(`${repo.name}-demo-app`),
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: "vite --host 0.0.0.0",
        build: `vite build --base /${repo.name}/`,
        preview: "vite preview --host 0.0.0.0",
      },
      dependencies: {
        "vite": "latest",
        "typescript": "latest",
      },
      devDependencies: {},
    }, null, 2)}\n`,
    "utf8"
  );
  fs.writeFileSync(
    path.join(demoDir, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${sanitizeText(model.summary)}" />
    <title>${sanitizeText(model.title)} Demo</title>
  </head>
  <body data-demo-app="true">
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`,
    "utf8"
  );
  fs.writeFileSync(path.join(demoDir, "src", "main.js"), renderDemoMainJs(model), "utf8");
  fs.writeFileSync(path.join(demoDir, "src", "styles.css"), renderDemoCss(), "utf8");

  const rootPackagePath = path.join(sourceDir, "package.json");
  const rootPackage = readJson<PackageJson & { name?: string; version?: string; private?: boolean; type?: string }>(rootPackagePath, {
    name: repo.name,
    version: "0.1.0",
    private: true,
    scripts: {},
  });
  rootPackage.scripts = rootPackage.scripts ?? {};
  rootPackage.scripts["demo:dev"] = rootPackage.scripts["demo:dev"] ?? "npm --prefix demo-app run dev";
  rootPackage.scripts["demo:build"] = rootPackage.scripts["demo:build"] ?? "npm --prefix demo-app run build";
  rootPackage.scripts["demo:preview"] = rootPackage.scripts["demo:preview"] ?? "npm --prefix demo-app run preview";
  rootPackage.scripts.dev = rootPackage.scripts.dev ?? "npm --prefix demo-app run dev";
  rootPackage.scripts.build = rootPackage.scripts.build ?? "npm --prefix demo-app run build";
  fs.writeFileSync(rootPackagePath, `${JSON.stringify(rootPackage, null, 2)}\n`, "utf8");

  return demoDir;
}

function cloneRepo(repo: RepoInfo) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `repo-demo-source-${repo.name}-`));
  const cloned = safeRun("git", ["clone", repo.url, tempDir], { timeoutMs: 180000 });
  if (!cloned.ok) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    return { ok: false, output: cloned.output, path: "" };
  }
  const branch = safeRun("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: tempDir, timeoutMs: 30000 }).output || "main";
  if (branch === "HEAD") safeRun("git", ["checkout", "-B", "main"], { cwd: tempDir, timeoutMs: 30000 });
  return { ok: true, output: branch === "HEAD" ? "main" : branch, path: tempDir };
}

function commitAndPushDemoApp(sourceDir: string, repo: RepoInfo, branch: string) {
  run("git", ["add", "demo-app", "package.json"], { cwd: sourceDir, timeoutMs: 30000 });
  const diff = safeRun("git", ["diff", "--cached", "--quiet"], { cwd: sourceDir, timeoutMs: 30000 });
  if (diff.ok) return { ok: true, output: "demo-app source already up to date" };
  const committed = safeRun("git", [
    "-c", "user.name=Portfolio Release Bot",
    "-c", "user.email=portfolio-release@example.local",
    "commit",
    "-m",
    `feat: add portfolio demo app for ${repo.name}`,
  ], { cwd: sourceDir, timeoutMs: 120000 });
  if (!committed.ok) return committed;
  return safeRun("git", ["push", "origin", `HEAD:${branch || "main"}`], { cwd: sourceDir, timeoutMs: 420000 });
}

function prepareWorktree(sourceDir: string, repo: RepoInfo) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `real-app-demo-${repo.name}-`));
  run("git", ["init"], { cwd: tempDir });
  run("git", ["checkout", "-b", "gh-pages"], { cwd: tempDir });
  copyDir(sourceDir, tempDir);
  rewriteAssetPaths(tempDir, repo.name);
  fs.writeFileSync(path.join(tempDir, ".nojekyll"), "");
  run("git", ["add", "."], { cwd: tempDir });
  run("git", ["-c", "user.name=Portfolio Release Bot", "-c", "user.email=portfolio-release@example.local", "commit", "-m", `deploy: publish real app demo for ${repo.name}`], { cwd: tempDir });
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
      "zh-TW": "網站 Demo",
      en: "Live Demo",
    },
    primary: true,
  };
  const index = links.findIndex((link) => link.kind === "live");

  if (index === -1) {
    links.unshift(liveLink);
  } else {
    links[index] = liveLink;
  }

  override.links = links;
  writeJson(overridePath, override);
}

function deploy(project: Project, localPath: string, repo: RepoInfo): DeployResult {
  const appUrl = `${PAGES_BASE}/${repo.name}/`;

  if (dryRun) {
    return {
      slug: project.slug,
      status: "planned",
      repo: repo.name,
      url: appUrl,
      reason: "dry run",
      strategy: "original-app-build",
    };
  }

  let outputDir = "";
  let reason = "";
  let strategy: DeployResult["strategy"] = "original-app-build";

  if (!forceDemoApp && localPath && fs.existsSync(path.join(localPath, "package.json"))) {
    const install = installIfNeeded(localPath);
    if (install.ok) {
      const build = buildProject(localPath, repo.name);
      outputDir = build.ok ? detectBuildOutput(localPath) ?? "" : "";
      if (build.ok && outputDir && fs.existsSync(path.join(outputDir, "index.html"))) {
        reason = `deployed ${build.mode} output to gh-pages`;
      } else {
        reason = build.ok ? "app build did not produce index.html; deployed repo demo-app instead" : `app build failed; deployed repo demo-app instead: ${build.output}`;
      }
    } else {
      reason = `install failed; deployed repo demo-app instead: ${install.output}`;
    }
  }

  let tempSource = "";
  if (!outputDir || forceDemoApp) {
    const clone = cloneRepo(repo);
    if (!clone.ok) {
      return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `source clone failed: ${clone.output}`, strategy: "repo-demo-app" };
    }

    tempSource = clone.path;
    const demoDir = ensureDemoApp(tempSource, project, repo);
    const sourcePush = commitAndPushDemoApp(tempSource, repo, clone.output);
    if (!sourcePush.ok) {
      fs.rmSync(tempSource, { recursive: true, force: true });
      return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `demo-app source push failed: ${sourcePush.output}`, strategy: "repo-demo-app" };
    }

    const installDemo = installIfNeeded(demoDir);
    if (!installDemo.ok) {
      fs.rmSync(tempSource, { recursive: true, force: true });
      return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `demo-app install failed: ${installDemo.output}`, strategy: "repo-demo-app" };
    }

    const buildDemo = safeRun("npm", ["run", "build"], {
      cwd: demoDir,
      timeoutMs: 300000,
      env: {
        GITHUB_PAGES: "true",
        BASE_URL: `/${repo.name}/`,
        PUBLIC_URL: `/${repo.name}/`,
        VITE_BASE: `/${repo.name}/`,
      },
    });
    if (!buildDemo.ok) {
      fs.rmSync(tempSource, { recursive: true, force: true });
      return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `demo-app build failed: ${buildDemo.output}`, strategy: "repo-demo-app" };
    }

    outputDir = path.join(demoDir, "dist");
    reason = reason ? `${reason}` : "deployed repo-local demo-app to gh-pages";
    strategy = "repo-demo-app";
  }

  const tempDir = prepareWorktree(outputDir, repo);
  try {
    const pushed = safeRun("git", ["push", "--force", "origin", "gh-pages"], { cwd: tempDir, timeoutMs: 420000 });
    if (!pushed.ok) {
      return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `push failed: ${pushed.output}` };
    }

    const pages = enablePages(repo);
    if (!pages.ok && !/already exists|source/i.test(pages.output)) {
      return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `pages enable failed: ${pages.output}` };
    }

    safeRun("gh", ["repo", "edit", `${OWNER}/${repo.name}`, "--homepage", appUrl], { timeoutMs: 30000 });
    updateOverride(project, repo);
    return { slug: project.slug, status: "deployed", repo: repo.name, url: appUrl, reason, strategy };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
    if (tempSource) fs.rmSync(tempSource, { recursive: true, force: true });
  }
}

function writeReport(results: DeployResult[]) {
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  writeJson(REPORT_PATH, {
    generatedAt: new Date().toISOString(),
    dryRun,
    results,
  });
  fs.writeFileSync(
    REPORT_MD_PATH,
    [
      "# Real App Demo Deployment Report",
      "",
      `Generated at: ${new Date().toISOString()}`,
      "",
      "| Slug | Repo | URL | Status | Strategy | Reason |",
      "| :--- | :--- | :--- | :--- | :--- | :--- |",
      ...results.map((result) => `| ${result.slug} | ${result.repo ?? ""} | ${result.url ?? ""} | ${result.status} | ${result.strategy ?? ""} | ${result.reason.replace(/\|/g, "\\|")} |`),
      "",
    ].join("\n"),
    "utf8"
  );
}

async function main() {
  const projects = readJson<Project[]>(CATALOG_PATH, []);
  const localMap = readJson<{ projects?: LocalMapEntry[] }>(LOCAL_MAP_PATH, { projects: [] }).projects ?? [];
  const localBySlug = new Map(localMap.map((entry) => [entry.slug, entry]));
  const repos = loadRepos();
  const repoByName = new Map(repos.filter((repo) => !repo.isArchived).map((repo) => [repo.name.toLowerCase(), repo]));
  const results: DeployResult[] = [];
  let deployedOrTried = 0;

  for (const project of projects) {
    if (onlySlug && project.slug !== onlySlug) continue;
    if (limit > 0 && deployedOrTried >= limit) break;

    const local = localBySlug.get(project.slug);
    const repoName = githubRepoName(project.githubUrl) ?? githubRepoName(local?.githubUrl);
    const repo = repoName ? repoByName.get(repoName.toLowerCase()) : undefined;

    if (!repo) {
      results.push({ slug: project.slug, status: "skipped", reason: "no active GitHub repo for app deployment" });
      continue;
    }

    const live = linkFor(project, "live")?.url ?? "";
    if (replaceStaticOnly && !await isGeneratedStaticPage(live)) continue;

    const localPath = local?.localPath && fs.existsSync(local.localPath) ? local.localPath : "";
    const packageJson = localPath ? readJson<PackageJson>(path.join(localPath, "package.json"), {}) : {};
    if (localPath && !isWebAppCandidate(project, packageJson) && !replaceStaticOnly) continue;

    const shouldDeploy = isFallbackLive(project) || /^https:\/\/justin21523\.github\.io\//.test(live);
    if (!shouldDeploy) continue;

    deployedOrTried += 1;
    results.push(deploy(project, localPath, repo));
  }

  writeReport(results);
  const failed = results.filter((result) => result.status === "failed").length;
  console.log(`Real app demo deployment complete: ${results.length} processed, ${failed} failed.`);
  results.forEach((result) => console.log(`${result.status}\t${result.slug}\t${result.url ?? ""}\t${result.reason}`));

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main();
