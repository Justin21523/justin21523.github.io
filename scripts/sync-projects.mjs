import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const repoRoot = path.resolve(process.cwd());
const dataDir = path.join(repoRoot, "data");
const outputPath = path.join(dataDir, "projects.json");

const roots = [
  { group: "web", root: "/home/justin/web-projects" },
  { group: "ai", root: "/mnt/c/ai_projects" },
];

const excludedNames = new Set([
  "AI_LLM_projects", "justin-portfolio", "character-settings",
  "gpu-migration-r900", "monitor",
]);

// ---- Minimal TOML [[project]] parser ----
function parseProjectIndex(tomlPath) {
  const raw = safeReadText(tomlPath);
  if (!raw) return [];
  const projects = [];
  const re = /\[\[project\]\]\s*\n([\s\S]*?)(?=\[\[|$)/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const block = m[1];
    const p = {};
    for (const line of block.trim().split("\n")) {
      const kv = line.match(/^(\w+)\s*=\s*"(.*)"/);
      if (kv) p[kv[1]] = kv[2];
    }
    if (p.name) projects.push(p);
  }
  return projects;
}

// ---- Helpers ----
function safeReadText(fp) {
  try { return fs.readFileSync(fp, "utf8"); } catch { return null; }
}
function readJson(fp) {
  const raw = safeReadText(fp);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function execQuiet(cmd, opts = {}) {
  try {
    return execSync(cmd, { ...opts, stdio: ["ignore","pipe","ignore"] }).toString().trim();
  } catch { return ""; }
}
function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }

// ---- Discovery ----
function listProjectDirs(rootDir) {
  if (!fs.existsSync(rootDir)) return [];
  return fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith(".") && !excludedNames.has(e.name))
    .map(e => path.join(rootDir, e.name));
}

// ---- Stack detection ----
function detectStack(projectDir) {
  const stack = [];
  const pkg = readJson(path.join(projectDir, "package.json"));
  if (pkg) {
    const deps = { ...(pkg.dependencies||{}), ...(pkg.devDependencies||{}) };
    const markers = [
      ["next","Next.js"],["astro","Astro"],["vite","Vite"],["react","React"],
      ["vue","Vue"],["svelte","Svelte"],["three","Three.js"],["nestjs","NestJS"],
      ["express","Express"],["flask","Flask"],["fastapi","FastAPI"],
      ["playwright","Playwright"],["vitest","Vitest"],["jest","Jest"],
      ["phaser","Phaser"],["tauri","Tauri"],["daisyui","DaisyUI"],["tailwindcss","Tailwind"],
    ];
    for (const [key, label] of markers) { if (deps[key]) stack.push(label); }
  }
  if (fs.existsSync(path.join(projectDir,"pyproject.toml")) || fs.existsSync(path.join(projectDir,"requirements.txt")))
    stack.push("Python");
  const dockerDir = path.join(projectDir, "docker");
  const hasDockerfile = fs.existsSync(dockerDir) && fs.statSync(dockerDir).isDirectory() &&
    fs.readdirSync(dockerDir).some(n => n.toLowerCase().includes("dockerfile"));
  if (fs.existsSync(path.join(projectDir,"docker-compose.yml")) || fs.existsSync(path.join(projectDir,"Dockerfile")) || hasDockerfile)
    stack.push("Docker");
  return [...new Set(stack)];
}

// ---- README summary ----
function extractReadmeSummary(projectDir) {
  let text = null, readmeFile = null;
  for (const name of ["README.md","README.en.md","readme.md"]) {
    const fp = path.join(projectDir, name);
    if (fs.existsSync(fp)) { text = safeReadText(fp); readmeFile = name; break; }
  }
  if (!text || !text.trim()) {
    const fp = path.join(projectDir, "docs", "00_overview.md");
    if (fs.existsSync(fp)) { text = safeReadText(fp); readmeFile = "docs/00_overview.md"; }
  }
  if (!text) return { readme: null, title: null, summary: "" };
  const lines = text.split(/\r?\n/).map(l => l.trimEnd());
  let title = null;
  for (const line of lines) { const mt = line.match(/^#\s+(.+)$/); if (mt) { title = mt[1].trim(); break; } }
  const para = [];
  let inCode = false, skippedHeader = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;
    if (!skippedHeader && trimmed.startsWith("#")) { skippedHeader = true; continue; }
    if (skippedHeader && trimmed === "") { if (para.length > 0) break; continue; }
    if (trimmed === "" || trimmed === "---" || trimmed.startsWith("![") || trimmed.startsWith(">") || trimmed.startsWith("[![") || trimmed.startsWith("|")) continue;
    if (trimmed) para.push(trimmed);
  }
  let summary = para.join(" ").replace(/\s+/g, " ").trim();
  if (summary.length > 260) summary = summary.slice(0, 257) + "...";
  return { readme: readmeFile, title, summary };
}

// ---- Git stats ----
function getGitStats(projectDir) {
  if (!fs.existsSync(path.join(projectDir, ".git"))) return null;
  const commits = execQuiet("git rev-list --count HEAD", { cwd: projectDir });
  const lastCommit = execQuiet("git log -1 --format=%ci", { cwd: projectDir });
  return {
    commits: parseInt(commits, 10) || 0,
    lastCommit: lastCommit || null,
  };
}

// ---- Tags ----
function guessTags({ name, stack, group, summary, category }) {
  const tags = new Set();
  tags.add(group === "web" ? "web" : "ai");
  const catMap = { games:"Game", visualization:"3D", "ai-ml":"AI", crawlers:"Crawler", analytics:"Data", academic:"Education", "ai-generation":"AI-Gen" };
  if (category && catMap[category]) tags.add(catMap[category]);
  for (const s of stack) tags.add(s);
  const lower = `${name} ${summary}`.toLowerCase();
  if (/three|3d|maze/.test(lower) || stack.includes("Three.js")) tags.add("3D");
  if (/dashboard|analysis|data/.test(lower)) tags.add("Data");
  if (/llm|rag|lora|vlm/.test(lower)) tags.add("AI");
  if (/game|platformer|simulator/.test(lower)) tags.add("Game");
  return [...tags];
}

// ---- Repo URL ----
function repoUrlFromProject(projectDir) {
  const normalize = (url) => {
    if (!url) return "";
    return url.replace(/^git\+/, "").replace(/\.git$/, "")
      .replace(/^git@github\.com:/, "https://github.com/")
      .replace(/^https:\/\/github\.com:443\//, "https://github.com/").trim();
  };
  const pkg = readJson(path.join(projectDir, "package.json"));
  if (typeof pkg?.repository?.url === "string" && pkg.repository.url) return normalize(pkg.repository.url);
  if (fs.existsSync(path.join(projectDir, ".git"))) {
    try { const url = execQuiet("git remote get-url origin", { cwd: projectDir }); if (url) return normalize(url); } catch {}
  }
  return "";
}

// ---- Load existing ----
function loadExisting() {
  const raw = safeReadText(outputPath);
  if (!raw) return [];
  try { const p = JSON.parse(raw); return Array.isArray(p) ? p : []; } catch { return []; }
}
function ensureId(p) {
  if (p && typeof p === "object" && typeof p.id === "string" && p.id.trim()) return p;
  const g = String(p?.group||"").trim(), n = String(p?.name||"").trim();
  if (!g || !n) return { ...p };
  return { ...p, id: `${g}:${n}` };
}

// ---- Main ----
function main() {
  ensureDir(dataDir);
  const contentDir = path.join(repoRoot, "public", "content", "projects");
  ensureDir(contentDir);

  // Load TOML index
  const tomlPath = path.join("/home/justin/web-projects", ".project-index.toml");
  const tomlProjects = parseProjectIndex(tomlPath);
  const tomlByName = new Map(tomlProjects.map(p => [p.name, p]));
  const deprecatedSet = new Set(tomlProjects.filter(p => p.status === "deprecated").map(p => p.name));

  const existing = loadExisting().map(ensureId);
  const existingById = new Map(existing.map(p => [p.id, p]));

  const scanned = [];
  for (const { group, root } of roots) {
    if (!fs.existsSync(root)) continue;
    for (const projectDir of listProjectDirs(root)) {
      const name = path.basename(projectDir);
      if (deprecatedSet.has(name)) { console.log(`  Skip deprecated: ${name}`); continue; }

      const id = `${group}:${name}`;
      const stack = detectStack(projectDir);
      const { readme, title, summary } = extractReadmeSummary(projectDir);
      const repoUrl = repoUrlFromProject(projectDir);
      const gitStats = getGitStats(projectDir);
      const tomlEntry = tomlByName.get(name);
      const category = tomlEntry?.category || "";
      const priority = tomlEntry?.priority || "";

      // Copy README
      if (readme) {
        try { fs.copyFileSync(path.join(projectDir, readme), path.join(contentDir, `${name}.md`)); }
        catch (e) { console.warn(`Copy README ${name}: ${e.message}`); }
      }

      // Detect image
      let image = "";
      for (const ext of [".png",".jpg",".jpeg",".svg",".webp"]) {
        const rp = `/images/projects/${name}${ext}`;
        if (fs.existsSync(path.join(repoRoot, "public", rp))) { image = rp; break; }
      }

      // Detect video
      let video = "";
      for (const ext of [".webm",".mp4"]) {
        const vp = `/media/projects/${name}-demo${ext}`;
        if (fs.existsSync(path.join(repoRoot, "public", vp))) { video = vp; break; }
      }

      scanned.push({
        id, slug: name, name, group, sourcePath: projectDir, readme,
        title: title || name, summary, stack, repoUrl,
        tags: guessTags({ name, stack, group, summary, category }),
        detectedImage: image, detectedVideo: video, category, priority,
        git: gitStats ? { commits: gitStats.commits, lastCommit: gitStats.lastCommit } : null,
      });
    }
  }

  // Merge
  const merged = [];
  for (const p of scanned) {
    const prev = existingById.get(p.id);

    // Auto-feature based on TOML priority (only critical gets featured by default)
    const autoFeatured = p.priority === "critical";

    if (!prev) {
      merged.push({ ...p, featured: autoFeatured, demoUrl: "", image: p.detectedImage||"", video: p.detectedVideo||"" });
      continue;
    }
    merged.push({
      ...p,
      readme: prev.readme || p.readme,
      title: prev.title || p.title,
      summary: prev.summary || p.summary,
      tags: Array.isArray(prev.tags) && prev.tags.length > 0
        ? [...new Set([...(p.tags||[]), ...prev.tags])] : p.tags,
      featured: autoFeatured || Boolean(prev.featured),
      demoUrl: prev.demoUrl || "",
      image: p.detectedImage || prev.image || "",
      video: p.detectedVideo || prev.video || "",
      repoUrl: prev.repoUrl || p.repoUrl,
      aliases: Array.isArray(prev.aliases) && prev.aliases.length > 0 ? prev.aliases : undefined,
    });
  }

  merged.sort((a, b) => {
    if (a.featured !== b.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return (a.title || a.name).localeCompare(b.title || b.name, "en");
  });

  fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2) + "\n", "utf8");

  // Summary
  const byGroup = {}, byCategory = {};
  for (const p of merged) {
    byGroup[p.group] = (byGroup[p.group]||0) + 1;
    if (p.category) byCategory[p.category] = (byCategory[p.category]||0) + 1;
  }
  console.log(`Synced ${scanned.length} projects -> ${path.relative(repoRoot, outputPath)}`);
  console.log(`Groups: ${JSON.stringify(byGroup)}`);
  console.log(`Categories: ${JSON.stringify(byCategory)}`);
  console.log(`Featured: ${merged.filter(p => p.featured).length}`);
  console.log(`With image: ${merged.filter(p => p.image).length}`);
  console.log(`With video: ${merged.filter(p => p.video).length}`);
  console.log(`With git: ${merged.filter(p => p.git).length}`);
}

main();
