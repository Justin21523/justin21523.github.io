import { execFileSync, spawn, type ChildProcess } from "child_process";
import fs from "fs";
import net from "net";
import os from "os";
import path from "path";
import { chromium, type Browser, type Page } from "@playwright/test";

const ROOT = process.cwd();
const OWNER = "Justin21523";
const PAGES_BASE = `https://${OWNER.toLowerCase()}.github.io`;
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const LOCAL_MAP_PATH = path.join(ROOT, ".portfolio-local-map.json");
const CONTENT_DIR = path.join(ROOT, "content/projects");
const PUBLIC_PROJECT_ROOT = path.join(ROOT, "public/projects");
const REPORT_JSON_PATH = path.join(ROOT, "docs/portfolio-release/target-demo-implementation-report.json");
const REPORT_MD_PATH = path.join(ROOT, "docs/portfolio-release/target-demo-implementation-report.md");
const DEFAULT_START = "AutoForge-llm-studio";
const DEFAULT_END = "web-auto-concepts";
const SEARCH_ROOTS = ["/home/justin/web-projects", "/mnt/c/ai_projects"];

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const skipDeploy = args.has("--skip-deploy");
const skipMedia = args.has("--skip-media");
const onlySlug = valueFor("--slug");
const limit = Number(valueFor("--limit") ?? "0");
const rangeStart = valueFor("--range-start") ?? DEFAULT_START;
const rangeEnd = valueFor("--range-end") ?? DEFAULT_END;

type Locale = "en" | "zh-TW";

type ProjectLink = {
  kind: string;
  url: string;
  label?: Record<Locale, string>;
  primary?: boolean;
};

type Project = {
  slug: string;
  category?: string;
  status?: string;
  year?: number;
  technologies?: string[];
  githubUrl?: string;
  readmeUrl?: string;
  links?: ProjectLink[];
  content?: Record<string, Record<string, unknown>>;
  metadata?: Record<string, unknown>;
};

type LocalMapEntry = {
  slug: string;
  localPath?: string;
  githubUrl?: string;
  status?: string;
  matchConfidence?: string;
};

type RepoInfo = {
  name: string;
  url: string;
  isArchived?: boolean;
};

type DemoModel = {
  slug: string;
  title: string;
  category: string;
  status: string;
  year: number;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  setupGuide: string;
  technologies: string[];
  repoUrl: string;
  readmeUrl: string;
  modules: string[];
  features: string[];
  records: Array<{ id: string; name: string; owner: string; status: string; score: number }>;
};

type Result = {
  slug: string;
  repo: string;
  localPath?: string;
  liveUrl: string;
  sourcePushed: boolean;
  deployed: boolean;
  screenshots: number;
  video: boolean;
  status: "completed" | "planned" | "failed";
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
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function run(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number } = {}) {
  return execFileSync(command, commandArgs, {
    cwd: options.cwd ?? ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: options.timeoutMs ?? 120000,
    maxBuffer: 1024 * 1024 * 40,
  }).trim();
}

function safeRun(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number } = {}) {
  try {
    return { ok: true, output: run(command, commandArgs, options) };
  } catch (error) {
    const err = error as { stdout?: Buffer | string; stderr?: Buffer | string; message?: string };
    const stdout = Buffer.isBuffer(err.stdout) ? err.stdout.toString("utf8") : err.stdout ?? "";
    const stderr = Buffer.isBuffer(err.stderr) ? err.stderr.toString("utf8") : err.stderr ?? "";
    return { ok: false, output: `${stdout}\n${stderr}\n${err.message ?? ""}`.trim().slice(-8000) };
  }
}

function normalizeLocalMap(raw: unknown): LocalMapEntry[] {
  if (Array.isArray(raw)) return raw as LocalMapEntry[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { projects?: unknown }).projects)) {
    return (raw as { projects: LocalMapEntry[] }).projects;
  }
  return [];
}

function linkFor(project: Project, kind: string) {
  return project.links?.find((link) => link.kind === kind && link.url);
}

function githubRepoName(url: string | undefined) {
  const match = url?.match(/^https:\/\/github\.com\/Justin21523\/([^/#?]+)/i);
  return match?.[1]?.replace(/\.git$/, "");
}

function titleOf(project: Project) {
  return textOf(project, "title") || project.slug;
}

function textOf(project: Project, key: string) {
  const en = project.content?.en?.[key];
  const zh = project.content?.["zh-TW"]?.[key];
  return typeof en === "string" ? en : typeof zh === "string" ? zh : "";
}

function normalizeSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function findLocalPath(project: Project, localBySlug: Map<string, LocalMapEntry>) {
  const mapped = localBySlug.get(project.slug)?.localPath;
  if (mapped && fs.existsSync(mapped)) return mapped;

  const candidates = new Set<string>([project.slug, githubRepoName(linkFor(project, "github")?.url) ?? ""]);
  for (const root of SEARCH_ROOTS) {
    if (!fs.existsSync(root)) continue;
    for (const candidate of candidates) {
      if (!candidate) continue;
      const direct = path.join(root, candidate);
      if (fs.existsSync(direct)) return direct;
      const normalized = normalizeSlug(candidate);
      const found = fs.readdirSync(root, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(root, entry.name))
        .find((dir) => normalizeSlug(path.basename(dir)) === normalized);
      if (found) return found;
    }
  }

  return "";
}

function loadRepos() {
  const output = run("gh", ["repo", "list", OWNER, "--limit", "350", "--json", "name,url,isArchived"], {
    timeoutMs: 30000,
  });
  return JSON.parse(output) as RepoInfo[];
}

function ensureRepo(repoName: string, title: string, repoByName: Map<string, RepoInfo>) {
  const existing = repoByName.get(repoName.toLowerCase());
  if (existing && !existing.isArchived) return existing;

  if (dryRun) {
    return {
      name: repoName,
      url: `https://github.com/${OWNER}/${repoName}`,
      isArchived: false,
    };
  }

  const created = safeRun("gh", [
    "repo",
    "create",
    `${OWNER}/${repoName}`,
    "--public",
    "--description",
    `${title} demo project`,
    "--confirm",
  ], { timeoutMs: 60000 });
  if (!created.ok && !/already exists|Name already exists/i.test(created.output)) {
    throw new Error(`repo create failed for ${repoName}: ${created.output}`);
  }

  const repo = {
    name: repoName,
    url: `https://github.com/${OWNER}/${repoName}`,
    isArchived: false,
  };
  repoByName.set(repoName.toLowerCase(), repo);
  return repo;
}

function cloneRepo(repo: RepoInfo) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `target-demo-source-${repo.name}-`));
  const cloned = safeRun("git", ["clone", "--depth", "1", repo.url, tempDir], { timeoutMs: 420000 });
  if (!cloned.ok) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error(`clone failed for ${repo.name}: ${cloned.output}`);
  }
  const branchResult = safeRun("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: tempDir, timeoutMs: 30000 });
  let branch = branchResult.ok ? branchResult.output : "main";
  if (!branch || branch === "HEAD") {
    safeRun("git", ["checkout", "-B", "main"], { cwd: tempDir, timeoutMs: 30000 });
    branch = "main";
  }
  return { path: tempDir, branch };
}

function readReadmeSummary(localPath: string, clonePath: string) {
  const readmePath = [localPath, clonePath]
    .flatMap((rootDir) => ["README.md", "readme.md", "README.MD"].map((file) => rootDir ? path.join(rootDir, file) : ""))
    .find((file) => file && fs.existsSync(file));
  if (!readmePath) return { summary: "", headings: [] as string[] };
  const text = fs.readFileSync(readmePath, "utf8").slice(0, 14000);
  const headings = Array.from(text.matchAll(/^#{1,3}\s+(.+)$/gm)).map((match) => match[1].trim()).slice(0, 10);
  const summary = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("!") && !line.startsWith("["))
    .slice(0, 5)
    .join(" ");
  return { summary, headings };
}

function sourceModules(localPath: string, clonePath: string) {
  const rootDir = localPath && fs.existsSync(localPath) ? localPath : clonePath;
  const ignored = new Set([".git", "node_modules", "dist", "build", ".next", "out", "demo-app", ".venv", "venv", "__pycache__"]);
  if (!fs.existsSync(rootDir)) return [];
  return fs.readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => !ignored.has(entry.name))
    .map((entry) => entry.isDirectory() ? `${entry.name}/` : entry.name)
    .slice(0, 18);
}

function splitItems(value: string, fallback: string[]) {
  const items = value
    .split(/(?:\n|\.|;|•|- )+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 18)
    .slice(0, 8);
  return items.length >= 4 ? items : fallback;
}

function classify(project: Project, readme: string) {
  const text = `${project.slug} ${titleOf(project)} ${textOf(project, "summary")} ${readme}`.toLowerCase();
  if (/lora|diffusion|animation|image|video|model|transformer|llm|ai/.test(text)) return "AI workflow";
  if (/crawler|scraper|etl|pipeline|analytics|dashboard|bi|data/.test(text)) return "Data platform";
  if (/game|3d|maze|runner|physics|canvas|three/.test(text)) return "Interactive experience";
  if (/archive|library|metadata|research|paper|heritage/.test(text)) return "Knowledge system";
  if (/pos|retail|manager|energy|traffic|trip|map/.test(text)) return "Operations console";
  return "Product workspace";
}

function buildModel(project: Project, repo: RepoInfo, localPath: string, clonePath: string): DemoModel {
  const readme = readReadmeSummary(localPath, clonePath);
  const title = titleOf(project);
  const summary = textOf(project, "summary") || readme.summary || `${title} is presented as a browser-ready project demo.`;
  const problem = textOf(project, "problem") || summary;
  const solution = textOf(project, "solution") || `The demo packages the key ${title} workflow into a static, reviewable interface with deterministic sample data.`;
  const architecture = textOf(project, "architecture") || textOf(project, "dataFlow") || "The demo separates navigation, workflow state, sample records, result visualization, and repository evidence so it can run without private services.";
  const setupGuide = textOf(project, "setupGuide") || "Open the GitHub Pages demo, or run a local static server from the demo-app directory.";
  const features = splitItems(
    [
      textOf(project, "features"),
      textOf(project, "technicalHighlights"),
      readme.headings.join(". "),
      solution,
    ].filter(Boolean).join(". "),
    [
      "Inspect the main project workspace and understand the product goal.",
      "Walk through the core workflow with deterministic sample records.",
      "Filter and review fixture data that represents the project domain.",
      "Run a demo pass and inspect generated output state.",
      "Review architecture and repository evidence without private services.",
    ]
  );
  const modules = sourceModules(localPath, clonePath);
  return {
    slug: project.slug,
    title,
    category: classify(project, readme.summary),
    status: project.status ?? "portfolio-ready",
    year: project.year ?? 2026,
    summary,
    problem,
    solution,
    architecture,
    setupGuide,
    technologies: project.technologies ?? [],
    repoUrl: `https://github.com/${OWNER}/${repo.name}`,
    readmeUrl: `${project.readmeUrl ?? `https://github.com/${OWNER}/${repo.name}#readme`}`,
    modules,
    features,
    records: features.slice(0, 6).map((feature, index) => ({
      id: `R${String(index + 1).padStart(2, "0")}`,
      name: feature.replace(/\.$/, ""),
      owner: ["Workflow", "Data", "Automation", "Review", "Delivery", "Quality"][index % 6],
      status: ["Ready", "Running", "Review", "Complete"][index % 4],
      score: 62 + index * 7,
    })),
  };
}

function escapeHtml(value: string | number | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(model: DemoModel) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(model.summary)}" />
    <title>${escapeHtml(model.title)} Demo</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body data-project-demo="true">
    <div id="app"></div>
    <script>window.__PROJECT_DEMO__ = ${JSON.stringify(model)};</script>
    <script src="./main.js"></script>
  </body>
</html>
`;
}

function renderJs() {
  return `const project = window.__PROJECT_DEMO__;
const state = { view: "overview", selected: project.records[0]?.id || "", query: "" };

function html(value) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function nav() {
  return ["overview", "workflow", "data", "visualization", "evidence", "architecture"].map((view) =>
    \`<button class="\${state.view === view ? "active" : ""}" data-view="\${view}">\${view}</button>\`
  ).join("");
}

function metric(label, value) {
  return \`<div class="metric"><span>\${html(label)}</span><strong>\${html(value)}</strong></div>\`;
}

function overview() {
  return \`
    <section class="hero panel">
      <div>
        <p class="eyebrow">\${html(project.category)} · \${html(project.year)}</p>
        <h1>\${html(project.title)}</h1>
        <p class="lead">\${html(project.summary)}</p>
      </div>
      <div class="metrics">
        \${metric("Workflow steps", project.features.length)}
        \${metric("Sample records", project.records.length)}
        \${metric("Tech tags", project.technologies.length)}
        \${metric("Status", project.status)}
      </div>
    </section>
    <section class="split">
      <article class="panel"><h2>Problem</h2><p>\${html(project.problem)}</p></article>
      <article class="panel"><h2>Implemented Demo</h2><p>\${html(project.solution)}</p></article>
    </section>
  \`;
}

function workflow() {
  return \`
    <section class="panel">
      <div class="section-head">
        <div><p class="eyebrow">guided workflow</p><h2>Executable Review Flow</h2></div>
        <button class="primary" id="runDemo">Run demo pass</button>
      </div>
      <div class="board">
        \${project.features.map((feature, index) => \`
          <button class="step \${index === 0 ? "selected" : ""}" data-feature="\${index}">
            <span>\${String(index + 1).padStart(2, "0")}</span>
            <strong>\${html(feature)}</strong>
            <em>\${index % 2 === 0 ? "Ready" : "Review"}</em>
          </button>
        \`).join("")}
      </div>
      <output id="demoOutput">Ready to execute a deterministic project walkthrough.</output>
    </section>
  \`;
}

function data() {
  const rows = project.records.filter((record) => !state.query || [record.id, record.name, record.owner, record.status].join(" ").toLowerCase().includes(state.query.toLowerCase()));
  return \`
    <section class="panel">
      <div class="section-head">
        <div><p class="eyebrow">fixture data</p><h2>Sample Records</h2></div>
        <input id="search" value="\${html(state.query)}" placeholder="Filter records" />
      </div>
      <div class="table">
        \${rows.map((record) => \`
          <button class="row \${state.selected === record.id ? "selected" : ""}" data-record="\${html(record.id)}">
            <span>\${html(record.id)}</span>
            <strong>\${html(record.name)}</strong>
            <em>\${html(record.owner)}</em>
            <b>\${html(record.status)}</b>
          </button>
        \`).join("") || \`<p class="empty">No matching records.</p>\`}
      </div>
    </section>
  \`;
}

function visualization() {
  const max = Math.max(...project.records.map((record) => record.score), 1);
  return \`
    <section class="panel">
      <div class="section-head">
        <div><p class="eyebrow">visible output</p><h2>Demo Result Visualization</h2></div>
        <span class="badge">Fixture-backed</span>
      </div>
      <div class="viz">
        \${project.records.map((record) => \`
          <div class="bar-row">
            <span>\${html(record.id)}</span>
            <div class="bar-track"><div class="bar-fill" style="width: \${Math.round(record.score / max * 100)}%"></div></div>
            <strong>\${record.score}</strong>
          </div>
        \`).join("")}
      </div>
    </section>
  \`;
}

function evidence() {
  return \`
    <section class="split">
      <article class="panel">
        <p class="eyebrow">repository evidence</p>
        <h2>Project Modules</h2>
        <div class="chips">\${(project.modules.length ? project.modules : ["README.md", "demo-app/"]).map((item) => \`<span>\${html(item)}</span>\`).join("")}</div>
      </article>
      <article class="panel">
        <p class="eyebrow">technology</p>
        <h2>Tech Stack</h2>
        <div class="chips">\${(project.technologies.length ? project.technologies : ["Static HTML", "JavaScript", "GitHub Pages"]).map((item) => \`<span>\${html(item)}</span>\`).join("")}</div>
      </article>
    </section>
  \`;
}

function architecture() {
  return \`
    <section class="panel">
      <p class="eyebrow">architecture</p>
      <h2>Static Demo Architecture</h2>
      <p>\${html(project.architecture)}</p>
      <pre>demo-app/
  index.html
  styles.css
  main.js

\${html(project.setupGuide)}</pre>
    </section>
  \`;
}

function render() {
  const views = { overview, workflow, data, visualization, evidence, architecture };
  document.querySelector("#app").innerHTML = \`
    <header>
      <a class="brand" href="\${html(project.repoUrl)}">\${html(project.title)}</a>
      <nav>\${nav()}</nav>
      <a class="readme" href="\${html(project.readmeUrl)}">README</a>
    </header>
    <main>\${views[state.view]()}</main>
  \`;
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    state.view = button.dataset.view;
    render();
  }));
  document.querySelector("#runDemo")?.addEventListener("click", () => {
    document.querySelector("#demoOutput").textContent = \`\${project.title}: \${project.records.length} records processed across \${project.features.length} workflow checks.\`;
  });
  document.querySelector("#search")?.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
    document.querySelector("#search")?.focus();
  });
  document.querySelectorAll("[data-record]").forEach((button) => button.addEventListener("click", () => {
    state.selected = button.dataset.record;
    render();
  }));
}

render();
`;
}

function renderCss() {
  return `:root {
  color-scheme: light;
  --bg: #edf3ef;
  --panel: #ffffff;
  --ink: #172127;
  --muted: #65727b;
  --line: #d5ddd6;
  --accent: #0b766a;
  --accent-2: #b65a34;
  --soft: #f5faf7;
}
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--ink); }
a { color: inherit; text-decoration: none; }
button, input { font: inherit; }
header { position: sticky; top: 0; z-index: 10; display: grid; grid-template-columns: minmax(220px, 1fr) auto auto; gap: 18px; align-items: center; min-height: 72px; padding: 0 28px; border-bottom: 1px solid var(--line); background: rgba(237, 243, 239, .92); backdrop-filter: blur(14px); }
.brand { font-weight: 850; line-height: 1.1; }
nav { display: flex; gap: 6px; padding: 4px; border: 1px solid var(--line); border-radius: 8px; background: white; }
nav button { border: 0; border-radius: 6px; padding: 9px 12px; background: transparent; color: var(--muted); text-transform: capitalize; cursor: pointer; }
nav button.active { color: white; background: var(--ink); }
.readme, .primary { border: 1px solid var(--ink); border-radius: 8px; padding: 10px 14px; color: white; background: var(--ink); cursor: pointer; }
main { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 28px 0 64px; }
.panel { border: 1px solid var(--line); border-radius: 8px; padding: 24px; background: var(--panel); box-shadow: 0 18px 46px rgba(23, 33, 39, .08); }
.panel + .panel { margin-top: 18px; }
.hero { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 24px; align-items: stretch; }
.eyebrow { margin: 0 0 10px; color: var(--accent-2); font-size: 12px; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
h1 { margin: 0; max-width: 860px; font-size: clamp(34px, 6vw, 76px); line-height: .95; letter-spacing: 0; }
h2 { margin: 0 0 10px; font-size: 22px; letter-spacing: 0; }
p { color: var(--muted); line-height: 1.65; }
.lead { max-width: 760px; font-size: 18px; }
.metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.metric { min-height: 116px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--line); border-radius: 8px; padding: 16px; background: var(--soft); }
.metric span { color: var(--muted); font-size: 13px; }
.metric strong { font-size: 25px; }
.split { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 18px; }
.section-head { display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-bottom: 18px; }
.board { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
.step { min-height: 180px; border: 1px solid var(--line); border-radius: 8px; padding: 16px; color: var(--ink); background: white; text-align: left; cursor: pointer; }
.step.selected { border-color: var(--accent); background: #edf8f5; }
.step span { color: var(--accent); font-weight: 900; }
.step strong { display: block; margin-top: 12px; font-size: 17px; }
.step em { display: inline-block; margin-top: 10px; color: var(--accent-2); font-style: normal; font-weight: 800; }
output { display: block; margin-top: 18px; border-radius: 8px; padding: 14px; color: white; background: var(--ink); }
input { width: min(320px, 100%); border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; }
.table { display: grid; gap: 8px; }
.row { display: grid; grid-template-columns: 78px minmax(0, 1fr) 120px 90px; gap: 12px; align-items: center; width: 100%; border: 1px solid var(--line); border-radius: 8px; padding: 12px; color: var(--ink); background: white; text-align: left; cursor: pointer; }
.row.selected { border-color: var(--accent); background: #edf8f5; }
.row span, .row em { color: var(--muted); font-style: normal; }
.row b { color: var(--accent); }
.viz { display: grid; gap: 12px; }
.bar-row { display: grid; grid-template-columns: 54px minmax(0, 1fr) 54px; gap: 12px; align-items: center; }
.bar-track { height: 20px; overflow: hidden; border: 1px solid var(--line); border-radius: 999px; background: #e3ebe5; }
.bar-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--accent), var(--accent-2)); }
.badge { border: 1px solid var(--line); border-radius: 999px; padding: 8px 12px; color: var(--accent); background: var(--soft); font-weight: 850; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips span { border: 1px solid var(--line); border-radius: 999px; padding: 7px 10px; color: var(--accent); background: var(--soft); font-size: 13px; }
pre { overflow: auto; border: 1px solid var(--line); border-radius: 8px; padding: 14px; color: #f6f8f5; background: #172127; }
.empty { padding: 18px; border: 1px dashed var(--line); border-radius: 8px; }
@media (max-width: 860px) {
  header { grid-template-columns: 1fr; padding: 14px 16px; }
  nav { overflow-x: auto; }
  .hero, .split { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; }
}
`;
}

function ensureDemoApp(repoPath: string, model: DemoModel) {
  const demoDir = path.join(repoPath, "demo-app");
  fs.rmSync(demoDir, { recursive: true, force: true });
  fs.mkdirSync(demoDir, { recursive: true });
  fs.writeFileSync(path.join(demoDir, "index.html"), renderHtml(model), "utf8");
  fs.writeFileSync(path.join(demoDir, "main.js"), renderJs(), "utf8");
  fs.writeFileSync(path.join(demoDir, "styles.css"), renderCss(), "utf8");
  fs.writeFileSync(path.join(demoDir, ".nojekyll"), "", "utf8");

  const packagePath = path.join(repoPath, "package.json");
  const packageJson = readJson<Record<string, unknown>>(packagePath, {
    name: model.slug.toLowerCase(),
    version: "0.1.0",
    private: true,
  });
  const scripts = typeof packageJson.scripts === "object" && packageJson.scripts ? packageJson.scripts as Record<string, string> : {};
  scripts["demo:dev"] = "python3 -m http.server 4173 --directory demo-app";
  scripts["demo:build"] = "node -e \"require('fs').accessSync('demo-app/index.html')\"";
  scripts["demo:preview"] = "python3 -m http.server 4173 --directory demo-app";
  packageJson.scripts = scripts;
  fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
  return demoDir;
}

function commitAndPush(repoPath: string, repo: RepoInfo, branch: string) {
  if (dryRun) return { ok: true, output: "dry run" };
  run("git", ["add", "-A", "demo-app", "package.json"], { cwd: repoPath, timeoutMs: 30000 });
  const noDiff = safeRun("git", ["diff", "--cached", "--quiet"], { cwd: repoPath, timeoutMs: 30000 });
  if (noDiff.ok) return { ok: true, output: "source already up to date" };
  const committed = safeRun("git", [
    "-c", "user.name=Portfolio Release Bot",
    "-c", "user.email=portfolio-release@example.local",
    "commit",
    "-m",
    `feat: implement portfolio demo site for ${repo.name}`,
  ], { cwd: repoPath, timeoutMs: 120000 });
  if (!committed.ok) return committed;
  return safeRun("git", ["push", "origin", `HEAD:${branch || "main"}`], { cwd: repoPath, timeoutMs: 420000 });
}

function copyDir(source: string, target: string) {
  fs.mkdirSync(target, { recursive: true });
  fs.cpSync(source, target, {
    recursive: true,
    force: true,
    filter: (sourcePath) => !sourcePath.includes(`${path.sep}.git${path.sep}`),
  });
}

function deployPages(demoDir: string, repo: RepoInfo) {
  if (dryRun || skipDeploy) return { ok: true, output: dryRun ? "dry run" : "deployment skipped" };
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `target-demo-pages-${repo.name}-`));
  try {
    run("git", ["init"], { cwd: tempDir });
    run("git", ["checkout", "-b", "gh-pages"], { cwd: tempDir });
    copyDir(demoDir, tempDir);
    fs.writeFileSync(path.join(tempDir, ".nojekyll"), "", "utf8");
    run("git", ["add", "."], { cwd: tempDir });
    run("git", [
      "-c", "user.name=Portfolio Release Bot",
      "-c", "user.email=portfolio-release@example.local",
      "commit",
      "-m",
      `deploy: publish portfolio demo for ${repo.name}`,
    ], { cwd: tempDir });
    run("git", ["remote", "add", "origin", repo.url], { cwd: tempDir });
    const pushed = safeRun("git", ["push", "--force", "origin", "gh-pages"], { cwd: tempDir, timeoutMs: 420000 });
    if (!pushed.ok) return pushed;

    const repoPath = `${OWNER}/${repo.name}`;
    const existingPages = safeRun("gh", ["api", `repos/${repoPath}/pages`], { timeoutMs: 30000 });
    const pages = existingPages.ok
      ? safeRun("gh", ["api", "-X", "PUT", `repos/${repoPath}/pages`, "-f", "source[branch]=gh-pages", "-f", "source[path]=/"], { timeoutMs: 30000 })
      : safeRun("gh", ["api", "-X", "POST", `repos/${repoPath}/pages`, "-f", "source[branch]=gh-pages", "-f", "source[path]=/"], { timeoutMs: 30000 });
    if (!pages.ok && !/already exists|source/i.test(pages.output)) return pages;
    safeRun("gh", ["repo", "edit", `${OWNER}/${repo.name}`, "--homepage", `${PAGES_BASE}/${repo.name}/`], { timeoutMs: 30000 });
    return { ok: true, output: "deployed" };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function updateOverride(project: Project, repo: RepoInfo) {
  if (dryRun) return;
  const overridePath = path.join(CONTENT_DIR, project.slug, "project.override.json");
  const override = readJson<Record<string, unknown>>(overridePath, {});
  const links = Array.isArray(override.links) ? override.links as ProjectLink[] : [];
  const liveUrl = `${PAGES_BASE}/${repo.name}/`;
  const videoUrl = `/projects/${project.slug}/videos/01-demo-walkthrough.webm`;
  const setLink = (next: ProjectLink) => {
    const index = links.findIndex((link) => link.kind === next.kind);
    if (index === -1) links.push(next);
    else links[index] = next;
  };
  setLink({
    kind: "live",
    url: liveUrl,
    label: { en: "Live Demo", "zh-TW": "網站 Demo" },
    primary: true,
  });
  setLink({
    kind: "video",
    url: videoUrl,
    label: { en: "Demo Recording", "zh-TW": "Demo 錄影" },
  });
  override.links = links.sort((a, b) => {
    const order = ["live", "video", "github", "documentation"];
    return order.indexOf(a.kind) - order.indexOf(b.kind);
  });
  override.metadata = {
    ...(typeof override.metadata === "object" && override.metadata ? override.metadata as Record<string, unknown> : {}),
    needsReview: false,
  };
  writeJson(overridePath, override);
}

function chromiumExecutablePath() {
  for (const candidate of ["/snap/bin/chromium", "chromium", "chromium-browser", "google-chrome", "google-chrome-stable"]) {
    if (fs.existsSync(candidate)) return candidate;
    try {
      return execFileSync("which", [candidate], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    } catch {}
  }
  return undefined;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForPort(port: number, timeoutMs: number) {
  const started = Date.now();
  return new Promise<boolean>((resolve) => {
    const attempt = () => {
      const socket = net.createConnection({ host: "127.0.0.1", port });
      socket.once("connect", () => {
        socket.end();
        resolve(true);
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - started > timeoutMs) resolve(false);
        else setTimeout(attempt, 300);
      });
    };
    attempt();
  });
}

function stopProcess(child: ChildProcess | undefined) {
  if (!child?.pid) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
}

async function openStablePage(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 35000 });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => undefined);
  await wait(600);
}

async function screenshot(page: Page, filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath, fullPage: false });
}

async function clickView(page: Page, view: string) {
  await page.locator(`[data-view="${view}"]`).first().click({ timeout: 3000 }).catch(() => undefined);
  await wait(350);
}

async function captureMedia(project: Project, demoDir: string): Promise<{ screenshots: number; video: boolean }> {
  if (dryRun || skipMedia) return { screenshots: 0, video: false };
  const publicRoot = path.join(PUBLIC_PROJECT_ROOT, project.slug);
  const screenshotRoot = path.join(publicRoot, "screenshots");
  const videoRoot = path.join(publicRoot, "videos");
  fs.mkdirSync(screenshotRoot, { recursive: true });
  fs.mkdirSync(videoRoot, { recursive: true });

  const port = 47100 + Math.floor(Math.random() * 1400);
  const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", demoDir], {
    detached: true,
    stdio: "ignore",
  });
  const ready = await waitForPort(port, 12000);
  if (!ready) {
    stopProcess(server);
    throw new Error("local demo server did not start");
  }

  let browser: Browser | undefined;
  let videoOk = false;
  const capturedFiles = [
    "01-overview.png",
    "02-workflow.png",
    "03-data-or-fixture.png",
    "04-visualization.png",
    "05-evidence.png",
    "06-architecture.png",
    "07-mobile.png",
    "08-interaction-state.png",
  ];

  try {
    browser = await chromium.launch({
      headless: true,
      executablePath: chromiumExecutablePath(),
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      recordVideo: { dir: videoRoot, size: { width: 1440, height: 1000 } },
    });
    const page = await context.newPage();
    const videoPathPromise = page.video()?.path();
    const url = `http://127.0.0.1:${port}/`;

    await openStablePage(page, url);
    await screenshot(page, path.join(screenshotRoot, capturedFiles[0]));
    await clickView(page, "workflow");
    await screenshot(page, path.join(screenshotRoot, capturedFiles[1]));
    await clickView(page, "data");
    await page.locator("#search").fill("ready").catch(() => undefined);
    await wait(300);
    await screenshot(page, path.join(screenshotRoot, capturedFiles[2]));
    await clickView(page, "visualization");
    await screenshot(page, path.join(screenshotRoot, capturedFiles[3]));
    await clickView(page, "evidence");
    await screenshot(page, path.join(screenshotRoot, capturedFiles[4]));
    await clickView(page, "architecture");
    await screenshot(page, path.join(screenshotRoot, capturedFiles[5]));

    await page.setViewportSize({ width: 390, height: 900 });
    await clickView(page, "overview");
    await screenshot(page, path.join(screenshotRoot, capturedFiles[6]));
    await page.setViewportSize({ width: 1440, height: 1000 });
    await clickView(page, "workflow");
    await page.locator("#runDemo").click({ timeout: 3000 }).catch(() => undefined);
    await wait(500);
    await screenshot(page, path.join(screenshotRoot, capturedFiles[7]));

    await context.close();
    const videoPath = await videoPathPromise?.catch(() => undefined);
    if (videoPath && fs.existsSync(videoPath) && fs.statSync(videoPath).size > 5000) {
      const finalVideo = path.join(videoRoot, "01-demo-walkthrough.webm");
      fs.copyFileSync(videoPath, finalVideo);
      if (path.resolve(videoPath) !== path.resolve(finalVideo)) fs.rmSync(videoPath, { force: true });
      videoOk = true;
    }
  } finally {
    await browser?.close().catch(() => undefined);
    stopProcess(server);
  }

  return {
    screenshots: capturedFiles.filter((file) => fs.existsSync(path.join(screenshotRoot, file)) && fs.statSync(path.join(screenshotRoot, file)).size > 5000).length,
    video: videoOk,
  };
}

function targetProjects(projects: Project[]) {
  if (onlySlug) return projects.filter((project) => project.slug === onlySlug);
  const start = projects.findIndex((project) => project.slug === rangeStart);
  const end = projects.findIndex((project) => project.slug === rangeEnd);
  if (start === -1 || end === -1) {
    throw new Error(`Could not resolve target range ${rangeStart} -> ${rangeEnd}`);
  }
  const slice = projects.slice(Math.min(start, end), Math.max(start, end) + 1);
  return limit > 0 ? slice.slice(0, limit) : slice;
}

function writeReport(results: Result[]) {
  const generatedAt = new Date().toISOString();
  writeJson(REPORT_JSON_PATH, {
    generatedAt,
    dryRun,
    total: results.length,
    completed: results.filter((result) => result.status === "completed").length,
    failed: results.filter((result) => result.status === "failed").length,
    results,
  });
  fs.writeFileSync(
    REPORT_MD_PATH,
    [
      "# Target Demo Implementation Report",
      "",
      `Generated at: ${generatedAt}`,
      `Dry run: ${dryRun ? "yes" : "no"}`,
      "",
      "| Slug | Repo | Live Demo | Status | Screenshots | Video | Reason |",
      "| :--- | :--- | :--- | :--- | ---: | :--- | :--- |",
      ...results.map((result) => `| ${result.slug} | ${result.repo} | ${result.liveUrl} | ${result.status} | ${result.screenshots} | ${result.video ? "yes" : "no"} | ${result.reason.replace(/\|/g, "\\|")} |`),
      "",
    ].join("\n"),
    "utf8"
  );
}

async function processProject(project: Project, localBySlug: Map<string, LocalMapEntry>, repoByName: Map<string, RepoInfo>) {
  const repoName = githubRepoName(linkFor(project, "github")?.url) ?? githubRepoName(project.githubUrl) ?? project.slug;
  const repo = ensureRepo(repoName, titleOf(project), repoByName);
  const localPath = findLocalPath(project, localBySlug);
  const liveUrl = `${PAGES_BASE}/${repo.name}/`;

  if (dryRun) {
    return {
      slug: project.slug,
      repo: repo.name,
      localPath,
      liveUrl,
      sourcePushed: false,
      deployed: false,
      screenshots: 0,
      video: false,
      status: "planned" as const,
      reason: "dry run",
    };
  }

  const clone = cloneRepo(repo);
  try {
    const model = buildModel(project, repo, localPath, clone.path);
    const demoDir = ensureDemoApp(clone.path, model);
    const pushed = commitAndPush(clone.path, repo, clone.branch);
    if (!pushed.ok) throw new Error(`source push failed: ${pushed.output}`);
    const deployed = deployPages(demoDir, repo);
    if (!deployed.ok) throw new Error(`pages deploy failed: ${deployed.output}`);
    const media = await captureMedia(project, demoDir);
    updateOverride(project, repo);
    return {
      slug: project.slug,
      repo: repo.name,
      localPath,
      liveUrl,
      sourcePushed: true,
      deployed: true,
      screenshots: media.screenshots,
      video: media.video,
      status: "completed" as const,
      reason: "implemented repo-local interactive demo, deployed GitHub Pages, and captured media",
    };
  } finally {
    fs.rmSync(clone.path, { recursive: true, force: true });
  }
}

async function main() {
  const projects = readJson<Project[]>(CATALOG_PATH, []);
  const localBySlug = new Map(normalizeLocalMap(readJson<unknown>(LOCAL_MAP_PATH, [])).map((entry) => [entry.slug, entry]));
  const repos = loadRepos();
  const repoByName = new Map(repos.filter((repo) => !repo.isArchived).map((repo) => [repo.name.toLowerCase(), repo]));
  const targets = targetProjects(projects);
  const results: Result[] = [];

  for (const project of targets) {
    process.stdout.write(`[target-demo] ${project.slug}\n`);
    try {
      results.push(await processProject(project, localBySlug, repoByName));
    } catch (error) {
      const repoName = githubRepoName(linkFor(project, "github")?.url) ?? githubRepoName(project.githubUrl) ?? project.slug;
      results.push({
        slug: project.slug,
        repo: repoName,
        liveUrl: `${PAGES_BASE}/${repoName}/`,
        sourcePushed: false,
        deployed: false,
        screenshots: 0,
        video: false,
        status: "failed",
        reason: error instanceof Error ? error.message : String(error),
      });
    }
    writeReport(results);
  }

  const failed = results.filter((result) => result.status === "failed");
  console.log(`Target demo implementation complete: ${results.length} processed, ${failed.length} failed.`);
  if (failed.length > 0) process.exitCode = 1;
}

main();
