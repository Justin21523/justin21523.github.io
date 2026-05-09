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

// Projects we do not want to appear on the public portfolio site.
const excludedNames = new Set(["AI_LLM_projects", "justin-portfolio", "character-settings"]);

function safeReadText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function readJson(filePath) {
  const raw = safeReadText(filePath);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function listProjectDirs(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !excludedNames.has(e.name))
    .map((e) => path.join(rootDir, e.name));
}

function detectStack(projectDir) {
  const stack = [];
  const pkg = readJson(path.join(projectDir, "package.json"));
  if (pkg) {
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    const markers = [
      ["next", "Next.js"],
      ["astro", "Astro"],
      ["vite", "Vite"],
      ["react", "React"],
      ["vue", "Vue"],
      ["svelte", "Svelte"],
      ["three", "Three.js"],
      ["nestjs", "NestJS"],
      ["express", "Express"],
      ["playwright", "Playwright"],
      ["vitest", "Vitest"],
      ["jest", "Jest"],
    ];
    for (const [key, label] of markers) {
      if (deps[key]) stack.push(label);
    }
  }
  if (fs.existsSync(path.join(projectDir, "pyproject.toml")) || fs.existsSync(path.join(projectDir, "requirements.txt"))) {
    stack.push("Python");
  }
  const dockerDir = path.join(projectDir, "docker");
  const hasDockerDirDockerfile =
    fs.existsSync(dockerDir) &&
    fs.statSync(dockerDir).isDirectory() &&
    fs.readdirSync(dockerDir).some((name) => name.toLowerCase().includes("dockerfile"));

  if (
    fs.existsSync(path.join(projectDir, "docker-compose.yml")) ||
    fs.existsSync(path.join(projectDir, "Dockerfile")) ||
    hasDockerDirDockerfile
  ) {
    stack.push("Docker");
  }
  return [...new Set(stack)];
}

function extractReadmeSummary(projectDir) {
  const candidates = ["README.md", "README.en.md", "readme.md"];
  let text = null;
  let readmeFile = null;
  for (const name of candidates) {
    const fp = path.join(projectDir, name);
    if (fs.existsSync(fp)) {
      text = safeReadText(fp);
      readmeFile = name;
      break;
    }
  }

  if (!text || text.trim().length === 0) {
    // Fallback for a few repos that keep overview docs in /docs
    const docsOverview = path.join(projectDir, "docs", "00_overview.md");
    if (fs.existsSync(docsOverview)) {
      text = safeReadText(docsOverview);
      readmeFile = "docs/00_overview.md";
    }
  }

  if (!text) return { readme: null, title: null, summary: "" };

  const lines = text.split(/\r?\n/).map((l) => l.trimEnd());

  let title = null;
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)$/);
    if (m) {
      title = m[1].trim();
      break;
    }
  }

  const para = [];
  let inCode = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (para.length > 0 && trimmed === "") break;
    if (para.length === 0) {
      if (
        trimmed === "" ||
        trimmed === "---" ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("![") ||
        trimmed.startsWith(">") ||
        trimmed.startsWith("[![")
      ) {
        continue;
      }
    }
    if (trimmed) para.push(trimmed);
  }

  let summary = para.join(" ").replace(/\s+/g, " ").trim();
  if (summary.length > 260) summary = summary.slice(0, 257) + "...";

  return { readme: readmeFile, title, summary };
}

function guessTags({ name, stack, group, summary }) {
  const tags = new Set();
  tags.add(group === "web" ? "web" : "ai");
  for (const s of stack) tags.add(s);

  const lower = `${name} ${summary}`.toLowerCase();
  if (lower.includes("three") || lower.includes("3d") || lower.includes("maze") || stack.includes("Three.js")) tags.add("3D");
  if (lower.includes("dashboard") || lower.includes("analysis") || lower.includes("data")) tags.add("Data");
  if (lower.includes("llm") || lower.includes("rag") || lower.includes("lora") || lower.includes("vlm")) tags.add("AI");
  if (lower.includes("game") || lower.includes("platformer") || lower.includes("simulator")) tags.add("Game");

  return [...tags];
}

function repoUrlFromProject(projectDir) {
  const normalize = (url) => {
    if (!url) return "";
    return url
      .replace(/^git\+/, "")
      .replace(/\.git$/, "")
      .replace(/^git@github\.com:/, "https://github.com/")
      .replace(/^https:\/\/github\.com:443\//, "https://github.com/")
      .trim();
  };

  const pkg = readJson(path.join(projectDir, "package.json"));
  const pkgRepo = pkg?.repository?.url;
  if (typeof pkgRepo === "string" && pkgRepo) return normalize(pkgRepo);

  if (fs.existsSync(path.join(projectDir, ".git"))) {
    try {
      const url = execSync("git remote get-url origin", { cwd: projectDir, stdio: ["ignore", "pipe", "ignore"] })
        .toString()
        .trim();
      if (url) return normalize(url);
    } catch {
      // ignore
    }
  }
  return "";
}

function loadExisting() {
  const raw = safeReadText(outputPath);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(name) {
  // Keep slug identical to the folder name (user requirement).
  // We still URL-encode when building links in the React app.
  return name;
}

function main() {
  ensureDir(dataDir);
  const contentDir = path.join(repoRoot, "public", "content", "projects");
  ensureDir(contentDir);

  const existing = loadExisting();
  const ensureId = (p) => {
    if (p && typeof p === "object" && typeof p.id === "string" && p.id.trim()) return p;
    const group = String(p?.group || "").trim();
    const name = String(p?.name || "").trim();
    if (!group || !name) return { ...p };
    return { ...p, id: `${group}:${name}` };
  };

  const normalizedExisting = existing.map(ensureId);
  const existingById = new Map(normalizedExisting.map((p) => [p.id, p]));

  const scanned = [];
  for (const { group, root } of roots) {
    if (!fs.existsSync(root)) continue;
    for (const projectDir of listProjectDirs(root)) {
      const name = path.basename(projectDir);
      const slug = slugify(name);
      const id = `${group}:${name}`;
      const stack = detectStack(projectDir);
      const { readme, title, summary } = extractReadmeSummary(projectDir);
      const repoUrl = repoUrlFromProject(projectDir);

      // Copy README to public content
      if (readme) {
        const readmeSrc = path.join(projectDir, readme);
        const readmeDest = path.join(contentDir, `${slug}.md`);
        try {
          fs.copyFileSync(readmeSrc, readmeDest);
        } catch (e) {
          console.warn(`Failed to copy README for ${name}: ${e.message}`);
        }
      }

      // Detect Image
      let image = "";
      const extensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];
      for (const ext of extensions) {
        const relativePath = `/images/projects/${slug}${ext}`;
        const absolutePath = path.join(repoRoot, "public", relativePath);
        if (fs.existsSync(absolutePath)) {
          image = relativePath;
          break;
        }
      }

      scanned.push({
        id,
        slug,
        name,
        group,
        sourcePath: projectDir,
        readme,
        title: title || name,
        summary,
        stack,
        repoUrl,
        tags: guessTags({ name, stack, group, summary }),
        detectedImage: image, // Store newly detected image
      });
    }
  }

  const merged = [];
  const seen = new Set();

  for (const p of scanned) {
    const prev = existingById.get(p.id);
    seen.add(p.id);
    if (!prev) {
      merged.push({ 
        ...p, 
        featured: false, 
        demoUrl: "", 
        image: p.detectedImage || "" 
      });
      continue;
    }
    
    // Use detected image if current JSON has none, or if we want to enforce file-system truth
    // Strategy: Prefer manual override in JSON if it's vastly different? 
    // Actually, if we are building a system, file system presence should probably win or be the default.
    // Let's use: prev.image if set (and not empty), else p.detectedImage.
    // BUT, if the user adds a file, they expect it to show up.
    // Let's say: if p.detectedImage exists, use it. If not, use prev.image (maybe external url).
    const finalImage = p.detectedImage || prev.image || "";

    merged.push({
      ...p,
      readme: prev.readme || p.readme,
      title: prev.title || p.title,
      summary: prev.summary || p.summary,
      tags:
        Array.isArray(prev.tags) && prev.tags.length > 0 ? [...new Set([...(p.tags || []), ...prev.tags])] : p.tags,
      featured: Boolean(prev.featured),
      demoUrl: prev.demoUrl || "",
      image: finalImage,
      repoUrl: prev.repoUrl || p.repoUrl,
      aliases: Array.isArray(prev.aliases) && prev.aliases.length > 0 ? prev.aliases : undefined,
    });
  }

  // User requirement: only keep projects that currently exist in the scanned folders.

  merged.sort((a, b) => {
    const fa = a.featured ? 1 : 0;
    const fb = b.featured ? 1 : 0;
    if (fa !== fb) return fb - fa;
    return (a.title || a.name).localeCompare(b.title || b.name, "en");
  });

  fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`Synced ${scanned.length} projects -> ${path.relative(repoRoot, outputPath)}`);
}

main();
