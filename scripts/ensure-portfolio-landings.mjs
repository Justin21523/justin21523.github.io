import fs from "node:fs/promises";
import path from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
const portfolioRoot = path.resolve(__dirname, "..");
const projectsJsonPath = path.join(portfolioRoot, "data", "projects.json");

const serviceSlugOverrides = new Map([
  ["charaforge-T2I-Lab", "charaforge-t2i-lab"],
  ["restoreAI-studio", "restoreai-studio"],
]);

function usage() {
  console.log(
    [
      "Usage:",
      "  node scripts/ensure-portfolio-landings.mjs [--apply] [--only-missing-demo] [--dry-run]",
      "",
      "Defaults:",
      "  - Creates missing landing files under the project folders.",
      "  - If --apply is passed, also updates data/projects.json demoUrl fields (only when empty).",
      "",
      "Notes:",
      "  - AI projects live under /mnt/c/ai_projects/<slug>/",
      "  - Web projects live under ../<slug>/ relative to justin-portfolio/",
    ].join("\n"),
  );
}

function getArgs() {
  const args = new Set(process.argv.slice(2));
  if (args.has("--help") || args.has("-h")) {
    usage();
    process.exit(0);
  }
  return {
    apply: args.has("--apply"),
    onlyMissingDemo: args.has("--only-missing-demo"),
    dryRun: args.has("--dry-run"),
  };
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p, dryRun) {
  if (dryRun) return;
  await fs.mkdir(p, { recursive: true });
}

async function writeFileIfMissing(filePath, contents, dryRun) {
  if (await fileExists(filePath)) return { created: false };
  if (!dryRun) {
    await fs.writeFile(filePath, contents, "utf8");
  }
  return { created: true };
}

function renderPortfolioDockerfile() {
  return [
    "FROM nginx:1.27-alpine",
    "",
    "COPY docker/portfolio.nginx.conf /etc/nginx/conf.d/default.conf",
    "COPY portfolio-web /usr/share/nginx/html",
    "",
    "RUN chmod -R a+rX /usr/share/nginx/html",
    "",
    "EXPOSE 80",
    "",
  ].join("\n");
}

function renderPortfolioNginxConf(projectSlug) {
  return [
    "server {",
    "  listen 80;",
    "  server_name _;",
    "",
    "  root /usr/share/nginx/html;",
    "  index index.html;",
    "",
    "  # Static-only (avoid SPA fallback masking missing assets).",
    "  location ~* \\.(?:css|js|mjs|map|json|txt|xml|png|jpg|jpeg|gif|webp|svg|ico|wasm|mp4|webm)$ {",
    "    try_files $uri =404;",
    "  }",
    "",
    "  location / {",
    "    sub_filter_types text/html;",
    "    sub_filter_once on;",
    "",
    "    sub_filter '</head>' '<style>\\n.portfolio-back-link{position:fixed;top:16px;right:16px;z-index:9999;padding:10px 12px;border-radius:12px;background:rgba(15,23,42,.85);color:#fff;text-decoration:none;font:600 13px/1 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;backdrop-filter:blur(8px);box-shadow:0 10px 30px rgba(0,0,0,.2)}\\n.portfolio-back-link:hover{background:rgba(15,23,42,.95)}\\n</style></head>';",
    `    sub_filter '</body>' '<a class="portfolio-back-link" href="https://neojustin.dothost.net/projects/${projectSlug}">回到作品集</a></body>';`,
    "",
    "    try_files $uri $uri/ =404;",
    "  }",
    "}",
    "",
  ].join("\n");
}

function renderLandingHtml({ title, projectSlug }) {
  const safeTitle = title || projectSlug;
  return [
    "<!doctype html>",
    '<html lang="zh-Hant">',
    "  <head>",
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `    <title>${safeTitle} — Demo Landing</title>`,
    '    <meta name="description" content="此頁為作品集線上展示用的 landing page（完整 demo 會逐步上線）。" />',
    '    <link rel="stylesheet" href="./styles.css" />',
    "  </head>",
    "  <body>",
    '    <main class="wrap">',
    '      <header class="hero">',
    "        <div>",
    '          <p class="kicker">Portfolio Demo</p>',
    `          <h1>${safeTitle}</h1>`,
    '          <p class="sub">此頁是「作品集展示 landing page」。完整可互動 demo / full-stack / GPU pipeline 會逐步以 docker service 上線。</p>',
    "        </div>",
    "      </header>",
    "",
    '      <section class="card">',
    "        <h2>目前狀態</h2>",
    "        <ul>",
    "          <li>此專案已掛在同一個網域下（方便導覽）。</li>",
    "          <li>完整 demo 尚未上線：會在後續補齊 docker 配置與反向代理。</li>",
    "        </ul>",
    "      </section>",
    "",
    '      <section class="grid">',
    '        <a class="card link" href="#" onclick="alert(\'此 demo 目前僅提供 landing page；完整 demo 會再上線。\');return false;">',
    "          <h3>Full Demo（待上線）</h3>",
    "          <p>後續會提供可跑的最小示範（不含私密金鑰）。</p>",
    "        </a>",
    "      </section>",
    "",
    '      <footer class="foot">',
    '        <p class="muted">提示：若你是面試官/審查者，請先從作品集專案頁了解此專案的定位與技術細節。</p>',
    "      </footer>",
    "    </main>",
    "  </body>",
    "</html>",
    "",
  ].join("\n");
}

function renderLandingCss() {
  return [
    ":root {",
    "  color-scheme: dark;",
    "  --bg: #0b1020;",
    "  --card: rgba(255, 255, 255, 0.06);",
    "  --border: rgba(255, 255, 255, 0.12);",
    "  --text: rgba(255, 255, 255, 0.92);",
    "  --muted: rgba(255, 255, 255, 0.68);",
    "  --accent: #60a5fa;",
    "}",
    "",
    "* {",
    "  box-sizing: border-box;",
    "}",
    "",
    "html,",
    "body {",
    "  height: 100%;",
    "}",
    "",
    "body {",
    "  margin: 0;",
    "  background: radial-gradient(1200px 700px at 20% 10%, rgba(96, 165, 250, 0.18), transparent 55%),",
    "    radial-gradient(900px 600px at 80% 30%, rgba(34, 211, 238, 0.12), transparent 60%),",
    "    var(--bg);",
    "  color: var(--text);",
    "  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;",
    "}",
    "",
    ".wrap {",
    "  max-width: 980px;",
    "  margin: 0 auto;",
    "  padding: 48px 20px;",
    "}",
    "",
    ".hero {",
    "  display: flex;",
    "  align-items: flex-end;",
    "  justify-content: space-between;",
    "  gap: 16px;",
    "  margin-bottom: 18px;",
    "}",
    "",
    ".kicker {",
    "  margin: 0 0 10px 0;",
    "  color: var(--muted);",
    "  font-weight: 650;",
    "  letter-spacing: 0.3px;",
    "}",
    "",
    "h1 {",
    "  margin: 0;",
    "  font-size: 40px;",
    "  letter-spacing: -0.6px;",
    "}",
    "",
    ".sub {",
    "  margin: 12px 0 0 0;",
    "  color: var(--muted);",
    "  line-height: 1.55;",
    "}",
    "",
    ".card {",
    "  background: var(--card);",
    "  border: 1px solid var(--border);",
    "  border-radius: 16px;",
    "  padding: 18px 18px;",
    "  backdrop-filter: blur(10px);",
    "}",
    "",
    ".card h2,",
    ".card h3 {",
    "  margin: 0 0 10px 0;",
    "}",
    "",
    ".card ul {",
    "  margin: 0;",
    "  padding-left: 18px;",
    "  color: var(--muted);",
    "  line-height: 1.55;",
    "}",
    "",
    ".grid {",
    "  display: grid;",
    "  grid-template-columns: 1fr;",
    "  gap: 14px;",
    "  margin-top: 14px;",
    "}",
    "",
    "@media (min-width: 860px) {",
    "  .grid {",
    "    grid-template-columns: 1fr 1fr;",
    "  }",
    "}",
    "",
    ".link {",
    "  text-decoration: none;",
    "  color: inherit;",
    "  display: block;",
    "}",
    "",
    ".link:hover {",
    "  border-color: rgba(96, 165, 250, 0.45);",
    "  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);",
    "}",
    "",
    ".foot {",
    "  margin-top: 18px;",
    "}",
    "",
    ".muted {",
    "  color: var(--muted);",
    "  margin: 0;",
    "}",
    "",
  ].join("\n");
}

async function main() {
  const { apply, onlyMissingDemo, dryRun } = getArgs();

  const projects = JSON.parse(await fs.readFile(projectsJsonPath, "utf8"));

  let changedProjectsJson = false;
  const created = [];

  for (const project of projects) {
    const hasDemoUrl = Boolean(project.demoUrl);
    if (onlyMissingDemo && hasDemoUrl) continue;

    const projectSlug = project.slug;
    const serviceSlug = serviceSlugOverrides.get(projectSlug) ?? projectSlug;

    const isAI = project.id.startsWith("ai:");
    const isWeb = project.id.startsWith("web:");
    if (!isAI && !isWeb) continue;

    const projectRoot = isAI
      ? path.join("/mnt/c/ai_projects", projectSlug)
      : path.join(portfolioRoot, "..", projectSlug);

    if (!(await fileExists(projectRoot))) {
      console.warn(`[skip] folder missing: ${projectRoot}`);
      continue;
    }

    const dockerDir = path.join(projectRoot, "docker");
    const webDir = path.join(projectRoot, "portfolio-web");

    await ensureDir(dockerDir, dryRun);
    await ensureDir(webDir, dryRun);

    const dockerfilePath = path.join(dockerDir, "portfolio.Dockerfile");
    const nginxPath = path.join(dockerDir, "portfolio.nginx.conf");
    const indexPath = path.join(webDir, "index.html");
    const cssPath = path.join(webDir, "styles.css");

    const r1 = await writeFileIfMissing(dockerfilePath, renderPortfolioDockerfile(), dryRun);
    const r2 = await writeFileIfMissing(nginxPath, renderPortfolioNginxConf(projectSlug), dryRun);
    const r3 = await writeFileIfMissing(indexPath, renderLandingHtml({ title: project.name, projectSlug }), dryRun);
    const r4 = await writeFileIfMissing(cssPath, renderLandingCss(), dryRun);

    if (r1.created || r2.created || r3.created || r4.created) {
      created.push({ projectSlug, serviceSlug, projectRoot });
    }

    if (apply && !project.demoUrl) {
      project.demoUrl = `https://neojustin.dothost.net/p/${serviceSlug}/`;
      changedProjectsJson = true;
    }
  }

  for (const c of created) {
    console.log(`[created] ${c.projectSlug} -> /p/${c.serviceSlug}/ (${c.projectRoot})`);
  }

  if (apply && changedProjectsJson) {
    const formatted = JSON.stringify(projects, null, 2) + "\n";
    if (!dryRun) {
      await fs.writeFile(projectsJsonPath, formatted, "utf8");
    }
    console.log(`[updated] ${projectsJsonPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
