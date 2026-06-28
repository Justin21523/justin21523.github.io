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
const REPORT_JSON_PATH = path.join(ROOT, "docs/portfolio-release/original-app-demo-remediation-report.json");
const REPORT_MD_PATH = path.join(ROOT, "docs/portfolio-release/original-app-demo-remediation-report.md");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const onlySlug = valueFor("--slug");
const onlySlugs = new Set(
  [onlySlug, ...(valueFor("--slugs") ?? "").split(",")]
    .filter(Boolean)
    .map((slug) => String(slug).trim())
    .filter(Boolean)
);
const limit = Number(valueFor("--limit") ?? "0");

type ProjectLink = {
  kind: string;
  url: string;
  label?: Record<"zh-TW" | "en", string>;
  primary?: boolean;
};

type Project = {
  slug: string;
  githubUrl?: string;
  readmeUrl?: string;
  links?: ProjectLink[];
  content?: Record<string, Record<string, string | undefined>>;
};

type LocalMapEntry = {
  slug: string;
  localPath?: string;
  githubUrl?: string;
};

type RepoInfo = {
  name: string;
  url: string;
  isArchived?: boolean;
};

type PackageJson = {
  name?: string;
  version?: string;
  private?: boolean;
  type?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type Candidate = {
  dir: string;
  rel: string;
  kind: "vite" | "next" | "static-html";
  score: number;
  hasPackage: boolean;
  hasDev: boolean;
  hasBuild: boolean;
  dev?: string;
  build?: string;
  packageName?: string;
};

type Result = {
  slug: string;
  title: string;
  repo?: string;
  liveUrl?: string;
  localPath?: string;
  candidate?: Pick<Candidate, "rel" | "kind" | "packageName" | "dev" | "build">;
  status: "deployed-original-app" | "implemented-web-app" | "case-study-fallback" | "failed" | "skipped" | "planned";
  reason: string;
  cleanup: "removed-demo-app" | "no-demo-app-found" | "cleanup-failed" | "not-needed" | "planned";
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
    maxBuffer: 1024 * 1024 * 40,
  }).trim();
}

function safeRun(command: string, commandArgs: string[], options: { cwd?: string; timeoutMs?: number; env?: Record<string, string> } = {}) {
  try {
    return { ok: true, output: run(command, commandArgs, options) };
  } catch (error) {
    const err = error as { stderr?: Buffer | string; stdout?: Buffer | string; message?: string };
    const stderr = Buffer.isBuffer(err.stderr) ? err.stderr.toString("utf8") : err.stderr ?? "";
    const stdout = Buffer.isBuffer(err.stdout) ? err.stdout.toString("utf8") : err.stdout ?? "";
    return { ok: false, output: `${stdout}\n${stderr}\n${err.message ?? ""}`.trim().slice(-6000) };
  }
}

function githubRepoName(url: string | undefined) {
  const match = url?.match(/^https:\/\/github\.com\/Justin21523\/([^/#?]+)/i);
  return match?.[1]?.replace(/\.git$/, "");
}

function titleOf(project: Project) {
  return project.content?.en?.title ?? project.content?.["zh-TW"]?.title ?? project.slug;
}

function contentText(project: Project, key: string) {
  return project.content?.en?.[key] ?? project.content?.["zh-TW"]?.[key] ?? "";
}

function linkFor(project: Project, kind: string) {
  return project.links?.find((link) => link.kind === kind && link.url);
}

function loadRepos() {
  const output = run("gh", ["repo", "list", OWNER, "--limit", "300", "--json", "name,url,isArchived"], {
    timeoutMs: 30000,
  });
  return JSON.parse(output) as RepoInfo[];
}

async function isRepoDemoApp(project: Project) {
  const live = linkFor(project, "live")?.url;
  if (!live || !/^https?:\/\//.test(live)) return false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(live, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "portfolio-original-app-remediator/1.0" },
    });
    const text = await Promise.race([
      response.text(),
      new Promise<string>((_, reject) => setTimeout(() => reject(new Error("response body timeout")), 12000)),
    ]);
    return /data-demo-app="true"/i.test(text);
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function listFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function walkProjectDirs(localPath: string, depth = 0): string[] {
  if (!fs.existsSync(localPath) || depth > 4) return [];
  const ignored = new Set(["node_modules", ".git", "dist", "build", ".next", "out", "target", ".venv", "venv", "__pycache__", "demo-app"]);
  return fs.readdirSync(localPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(localPath, entry.name);
    if (entry.isDirectory()) {
      if (ignored.has(entry.name)) return [];
      return [fullPath, ...walkProjectDirs(fullPath, depth + 1)];
    }
    return [];
  });
}

function packageCandidate(dir: string, localPath: string): Candidate | undefined {
  const packageJson = readJson<PackageJson | null>(path.join(dir, "package.json"), null);
  const scripts = packageJson?.scripts ?? {};
  const dependencies = {
    ...(packageJson?.dependencies ?? {}),
    ...(packageJson?.devDependencies ?? {}),
  };
  const scriptText = Object.values(scripts).join(" ");
  const rel = path.relative(localPath, dir) || ".";
  const hasVite = Boolean(dependencies.vite) || /\bvite\b/.test(scriptText) || fs.existsSync(path.join(dir, "vite.config.ts")) || fs.existsSync(path.join(dir, "vite.config.js"));
  const hasNext = Boolean(dependencies.next) || /\bnext\b/.test(scriptText) || fs.existsSync(path.join(dir, "next.config.ts")) || fs.existsSync(path.join(dir, "next.config.js"));
  const hasIndex = fs.existsSync(path.join(dir, "index.html"));
  const isWeb = hasVite || hasNext || hasIndex || Boolean(dependencies.react ?? dependencies.vue ?? dependencies.svelte);
  if (!packageJson || !isWeb) return undefined;

  let kind: Candidate["kind"] = "static-html";
  if (hasVite) kind = "vite";
  else if (hasNext) kind = "next";

  const badPathPenalty = /\b(api|backend|server|shared|worker|workers)\b/i.test(rel) ? -60 : 0;
  const preferredPathBoost = rel === "." ? 8 : /\b(frontend|client|web|apps\/web|admin-web)\b/i.test(rel) ? 20 : 0;
  const score =
    (kind === "vite" ? 120 : kind === "next" ? 90 : 70) +
    (scripts.build ? 20 : 0) +
    (scripts.dev ? 10 : 0) +
    preferredPathBoost +
    badPathPenalty;

  return {
    dir,
    rel,
    kind,
    score,
    hasPackage: true,
    hasDev: Boolean(scripts.dev),
    hasBuild: Boolean(scripts.build),
    dev: scripts.dev,
    build: scripts.build,
    packageName: packageJson.name,
  };
}

function staticHtmlCandidate(dir: string, localPath: string): Candidate | undefined {
  if (!fs.existsSync(path.join(dir, "index.html"))) return undefined;
  if (dir.includes(`${path.sep}demo-app${path.sep}`) || path.basename(dir) === "demo-app") return undefined;
  const rel = path.relative(localPath, dir) || ".";
  const preferredPathBoost = rel === "." ? 8 : /\b(frontend|client|web|public|site)\b/i.test(rel) ? 20 : 0;
  return {
    dir,
    rel,
    kind: "static-html",
    score: 70 + preferredPathBoost,
    hasPackage: false,
    hasDev: false,
    hasBuild: false,
  };
}

function findOriginalAppCandidates(localPath: string) {
  if (!localPath || !fs.existsSync(localPath)) return [];
  const dirs = [localPath, ...walkProjectDirs(localPath)];
  const candidates = dirs.flatMap((dir) => {
    const packageResult = packageCandidate(dir, localPath);
    const staticResult = staticHtmlCandidate(dir, localPath);
    return [packageResult, staticResult].filter(Boolean) as Candidate[];
  });
  const byDir = new Map<string, Candidate>();
  candidates.forEach((candidate) => {
    const existing = byDir.get(candidate.dir);
    if (!existing || candidate.score > existing.score) byDir.set(candidate.dir, candidate);
  });
  return Array.from(byDir.values()).sort((a, b) => b.score - a.score);
}

function installIfNeeded(dir: string) {
  const packageJson = readJson<PackageJson>(path.join(dir, "package.json"), {});
  const dependencies = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  };
  const firstMissing = Object.keys(dependencies).find((dependency) => !fs.existsSync(path.join(dir, "node_modules", ...dependency.split("/"))));
  if (fs.existsSync(path.join(dir, "node_modules")) && !firstMissing) {
    return { ok: true, output: "node_modules exists" };
  }
  if (fs.existsSync(path.join(dir, "package-lock.json"))) {
    const ci = safeRun("npm", ["ci"], { cwd: dir, timeoutMs: 300000 });
    return ci.ok ? ci : safeRun("npm", ["ci", "--legacy-peer-deps"], { cwd: dir, timeoutMs: 300000 });
  }
  const install = safeRun("npm", ["install"], { cwd: dir, timeoutMs: 300000 });
  return install.ok ? install : safeRun("npm", ["install", "--legacy-peer-deps"], { cwd: dir, timeoutMs: 300000 });
}

function findOutputDir(candidate: Candidate) {
  const candidates = ["dist", "out", "build", ".next/out"].map((dir) => path.join(candidate.dir, dir));
  const direct = candidates.find((dir) => fs.existsSync(path.join(dir, "index.html")));
  if (direct) return direct;
  if (candidate.kind === "static-html" && fs.existsSync(path.join(candidate.dir, "index.html"))) return candidate.dir;
  return undefined;
}

function buildOriginalApp(candidate: Candidate, repoName: string) {
  const packagePath = path.join(candidate.dir, "package.json");
  const packageJson = readJson<PackageJson>(packagePath, {});
  if (candidate.kind === "static-html" && !candidate.hasPackage) {
    return { ok: true, outputDir: prepareStaticHtmlOutput(candidate), reason: "deployed checked-in static HTML app" };
  }
  if (candidate.kind === "vite" && packageJson.scripts && !packageJson.scripts.dev) {
    packageJson.scripts.dev = "vite --host 0.0.0.0";
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
  }
  if (candidate.kind === "vite" && packageJson.scripts && !packageJson.scripts.build) {
    packageJson.scripts.build = `vite build --base /${repoName}/`;
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
  }

  const install = installIfNeeded(candidate.dir);
  if (!install.ok) {
    return { ok: false, outputDir: "", reason: `install failed: ${install.output}` };
  }

  const env = {
    GITHUB_PAGES: "true",
    BASE_URL: `/${repoName}/`,
    PUBLIC_URL: `/${repoName}/`,
    VITE_BASE: `/${repoName}/`,
    VITE_BASE_PATH: `/${repoName}/`,
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
    MONGODB_URI: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/portfolio_static_demo",
  };
  let build = { ok: false, output: "no build attempted" };

  if (packageJson.scripts?.build) {
    build = safeRun("npm", ["run", "build"], { cwd: candidate.dir, timeoutMs: 300000, env });
  }

  if ((!build.ok || !findOutputDir(candidate)) && candidate.kind === "vite") {
    build = safeRun("npx", ["vite", "build", "--base", `/${repoName}/`], { cwd: candidate.dir, timeoutMs: 300000, env });
  }

  const outputDir = findOutputDir(candidate);
  if (!build.ok) {
    return { ok: false, outputDir: "", reason: `build failed: ${build.output}` };
  }
  if (!outputDir) {
    return { ok: false, outputDir: "", reason: candidate.kind === "next" ? "Next build did not produce static out/index.html" : "build output missing index.html" };
  }
  return { ok: true, outputDir, reason: `deployed original ${candidate.kind} app from ${candidate.rel}` };
}

function prepareStaticHtmlOutput(candidate: Candidate) {
  const siblingStatic = path.join(path.dirname(candidate.dir), "static");
  if (!fs.existsSync(siblingStatic)) return candidate.dir;

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `original-static-app-${path.basename(candidate.dir)}-`));
  copyDir(candidate.dir, tempDir);
  copyDir(siblingStatic, path.join(tempDir, "static"));
  return tempDir;
}

function commitAndPushOriginalRunSupport(repo: RepoInfo, candidate: Candidate) {
  if (dryRun) return { ok: true, output: "dry run" };
  const clone = cloneRepo(repo);
  if (!clone.ok) return { ok: false, output: clone.output };
  try {
    const targetDir = path.join(clone.path, candidate.rel);
    if (!fs.existsSync(targetDir)) return { ok: true, output: "candidate path not present in source clone" };

    const packagePath = path.join(targetDir, "package.json");
    const packageJson = readJson<PackageJson>(packagePath, {
      name: safePackageName(`${repo.name}-${candidate.rel === "." ? "web" : candidate.rel}`),
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {},
      devDependencies: {},
    });
    packageJson.scripts = packageJson.scripts ?? {};
    packageJson.devDependencies = packageJson.devDependencies ?? {};

    let changed = false;
    if (candidate.kind === "static-html") {
      if (!packageJson.scripts.dev) {
        packageJson.scripts.dev = "vite --host 0.0.0.0";
        changed = true;
      }
      if (!packageJson.scripts.build) {
        packageJson.scripts.build = `vite build --base /${repo.name}/`;
        changed = true;
      }
      if (!packageJson.scripts.preview) {
        packageJson.scripts.preview = "vite preview --host 0.0.0.0";
        changed = true;
      }
      if (!packageJson.devDependencies.vite) {
        packageJson.devDependencies.vite = "latest";
        changed = true;
      }
    }

    if (candidate.kind === "vite") {
      if (!packageJson.scripts.dev) {
        packageJson.scripts.dev = "vite --host 0.0.0.0";
        changed = true;
      }
      if (!packageJson.scripts.build) {
        packageJson.scripts.build = `vite build --base /${repo.name}/`;
        changed = true;
      }
    }

    if (!changed) return { ok: true, output: "run scripts already present" };
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
    run("git", ["add", "-A", candidate.rel], { cwd: clone.path, timeoutMs: 30000 });
    const noDiff = safeRun("git", ["diff", "--cached", "--quiet"], { cwd: clone.path, timeoutMs: 30000 });
    if (noDiff.ok) return { ok: true, output: "no run script diff after staging" };
    const committed = safeRun("git", [
      "-c", "user.name=Portfolio Release Bot",
      "-c", "user.email=portfolio-release@example.local",
      "commit",
      "-m",
      `chore: add npm dev scripts for ${repo.name} demo`,
    ], { cwd: clone.path, timeoutMs: 120000 });
    if (!committed.ok) return committed;
    return safeRun("git", ["push", "origin", `HEAD:${clone.branch || "main"}`], { cwd: clone.path, timeoutMs: 420000 });
  } finally {
    fs.rmSync(clone.path, { recursive: true, force: true });
  }
}

function copyDir(source: string, target: string) {
  fs.mkdirSync(target, { recursive: true });
  const ignored = new Set([".git", "node_modules", ".next", "dist", "build", "out"]);
  const sourceRoot = path.resolve(source);
  fs.cpSync(source, target, {
    recursive: true,
    force: true,
    filter: (sourcePath) => {
      if (path.resolve(sourcePath) === sourceRoot) return true;
      const name = path.basename(sourcePath);
      if (ignored.has(name)) return false;
      return !sourcePath.includes(`${path.sep}.git${path.sep}`) && !sourcePath.includes(`${path.sep}node_modules${path.sep}`);
    },
  });
}

function rewriteAssetPaths(dir: string, repoName: string) {
  const files = listFiles(dir).filter((file) => /\.(html|css|js|json|txt|svg)$/i.test(file));
  const escapedRepo = repoName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  files.forEach((file) => {
    let text = fs.readFileSync(file, "utf8");
    text = text
      .replace(new RegExp(`(["'=])\\/projects\\/[^\\/"'()]+\\/`, "g"), `$1/${repoName}/`)
      .replace(new RegExp(`url\\(\\s*\\/projects\\/[^\\/"'()]+\\/`, "g"), `url(/${repoName}/`)
      .replace(new RegExp(`(["'=])\\/p\\/[^\\/"'()]+\\/`, "g"), `$1/${repoName}/`)
      .replace(new RegExp(`url\\(\\s*\\/p\\/[^\\/"'()]+\\/`, "g"), `url(/${repoName}/`)
      .replace(/(["'=])\/frontend\//g, `$1/${repoName}/`)
      .replace(/url\(\s*\/frontend\//g, `url(/${repoName}/`)
      .replace(/(["'=])\/static\//g, `$1/${repoName}/static/`)
      .replace(/url\(\s*\/static\//g, `url(/${repoName}/static/`)
      .replace(/(["'=])\/css\//g, `$1/${repoName}/css/`)
      .replace(/(["'=])\/js\//g, `$1/${repoName}/js/`)
      .replace(/(["'=])\/(app\.js|styles\.css|main\.css|layout\.css|components\.css|variables\.css)/g, `$1/${repoName}/$2`)
      .replace(/(["'=])\/(config\.js|vite\.svg)/g, `$1/${repoName}/$2`)
      .replace(/(["'=])\/assets\//g, `$1./assets/`)
      .replace(/url\(\s*\/assets\//g, "url(./assets/")
      .replace(/(["'=])\/_next\//g, `$1/${repoName}/_next/`)
      .replace(/(["'=])\/favicon/g, `$1/${repoName}/favicon`)
      .replace(new RegExp(`(href=["'])\\/(?!${escapedRepo}(?:\\/|["']))(?!https?:)(?!mailto:)(?!tel:)([^"'#?]+(?:\\?[^"']*)?(?:#[^"']*)?)`, "g"), `$1/${repoName}/$2`)
      .replace(new RegExp(`(action=["'])\\/(?!${escapedRepo}(?:\\/|["']))(?!https?:)([^"'#?]+(?:\\?[^"']*)?)`, "g"), `$1/${repoName}/$2`);
    fs.writeFileSync(file, text, "utf8");
  });
}

function writeDefaultDemoIcons(dir: string) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f766e"/><path d="M18 38h28v6H18zm0-18h28v6H18zm0 9h20v6H18z" fill="#f8fafc"/></svg>\n`;
  for (const name of ["favicon.svg", "vite.svg"]) {
    const target = path.join(dir, name);
    if (!fs.existsSync(target)) fs.writeFileSync(target, svg, "utf8");
  }
  const icoTarget = path.join(dir, "favicon.ico");
  if (!fs.existsSync(icoTarget)) fs.writeFileSync(icoTarget, svg, "utf8");
}

function createInternalRouteFallbacks(dir: string, repoName: string) {
  const indexPath = path.join(dir, "index.html");
  if (!fs.existsSync(indexPath)) return;
  const files = listFiles(dir).filter((file) => /\.(html|js)$/i.test(file));
  const routes = new Set<string>();
  const routePattern = new RegExp(`(?:href|to|action)=["']\\/${repoName}\\/([^"'#?]+)(?:[?#][^"']*)?["']`, "g");

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(routePattern)) {
      const route = (match[1] ?? "").replace(/^\/+|\/+$/g, "");
      if (!route) continue;
      if (/\.[a-z0-9]{2,8}$/i.test(route)) continue;
      if (route.startsWith("assets/") || route.startsWith("_next/") || route.startsWith("static/")) continue;
      routes.add(route);
    }
  }

  for (const route of routes) {
    const routeDir = path.join(dir, route);
    const routeIndex = path.join(routeDir, "index.html");
    if (fs.existsSync(routeIndex)) continue;
    fs.mkdirSync(routeDir, { recursive: true });
    fs.copyFileSync(indexPath, routeIndex);
  }

  const notFoundPath = path.join(dir, "404.html");
  if (!fs.existsSync(notFoundPath)) fs.copyFileSync(indexPath, notFoundPath);
}

function deployGhPages(sourceDir: string, repo: RepoInfo) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `original-app-pages-${repo.name}-`));
  try {
    run("git", ["init"], { cwd: tempDir });
    run("git", ["checkout", "-b", "gh-pages"], { cwd: tempDir });
    copyDir(sourceDir, tempDir);
    rewriteAssetPaths(tempDir, repo.name);
    writeDefaultDemoIcons(tempDir);
    createInternalRouteFallbacks(tempDir, repo.name);
    fs.writeFileSync(path.join(tempDir, ".nojekyll"), "");
    run("git", ["add", "."], { cwd: tempDir });
    run("git", ["-c", "user.name=Portfolio Release Bot", "-c", "user.email=portfolio-release@example.local", "commit", "-m", `deploy: publish original app demo for ${repo.name}`], { cwd: tempDir });
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
    return { ok: true, output: "deployed gh-pages" };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function cloneRepo(repo: RepoInfo) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `original-app-cleanup-${repo.name}-`));
  const cloned = safeRun("git", ["clone", repo.url, tempDir], { timeoutMs: 180000 });
  if (!cloned.ok) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    return { ok: false, path: "", branch: "", output: cloned.output };
  }
  const branch = safeRun("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: tempDir, timeoutMs: 30000 }).output || "main";
  if (branch === "HEAD") safeRun("git", ["checkout", "-B", "main"], { cwd: tempDir, timeoutMs: 30000 });
  return { ok: true, path: tempDir, branch: branch === "HEAD" ? "main" : branch, output: "" };
}

function removeDemoScripts(packageJson: PackageJson, repoName: string) {
  const scripts = packageJson.scripts ?? {};
  const nextScripts = { ...scripts };
  delete nextScripts["demo:dev"];
  delete nextScripts["demo:build"];
  delete nextScripts["demo:preview"];
  if (nextScripts.dev === "npm --prefix demo-app run dev") delete nextScripts.dev;
  if (nextScripts.build === "npm --prefix demo-app run build") delete nextScripts.build;
  if (nextScripts.preview === "npm --prefix demo-app run preview") delete nextScripts.preview;

  const changed = JSON.stringify(nextScripts) !== JSON.stringify(scripts);
  packageJson.scripts = nextScripts;
  const keys = Object.keys(packageJson);
  const onlyGeneratedPackage =
    packageJson.name === repoName &&
    packageJson.version === "0.1.0" &&
    packageJson.private === true &&
    Object.keys(nextScripts).length === 0 &&
    keys.every((key) => ["name", "version", "private", "scripts"].includes(key));
  return { changed, deletePackage: onlyGeneratedPackage };
}

function cleanupDemoApp(repo: RepoInfo) {
  if (dryRun) return { cleanup: "planned" as const, reason: "dry run" };
  const clone = cloneRepo(repo);
  if (!clone.ok) return { cleanup: "cleanup-failed" as const, reason: clone.output };
  try {
    let changed = false;
    const demoDir = path.join(clone.path, "demo-app");
    if (fs.existsSync(demoDir)) {
      fs.rmSync(demoDir, { recursive: true, force: true });
      changed = true;
    }

    const packagePath = path.join(clone.path, "package.json");
    if (fs.existsSync(packagePath)) {
      const packageJson = readJson<PackageJson>(packagePath, {});
      const result = removeDemoScripts(packageJson, repo.name);
      if (result.deletePackage) {
        fs.rmSync(packagePath, { force: true });
        changed = true;
      } else if (result.changed) {
        fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
        changed = true;
      }
    }

    if (!changed) return { cleanup: "no-demo-app-found" as const, reason: "no generated demo-app changes found" };

    run("git", ["add", "-A", "demo-app", "package.json"], { cwd: clone.path, timeoutMs: 30000 });
    const noDiff = safeRun("git", ["diff", "--cached", "--quiet"], { cwd: clone.path, timeoutMs: 30000 });
    if (noDiff.ok) return { cleanup: "no-demo-app-found" as const, reason: "no cleanup diff after staging" };
    const committed = safeRun("git", [
      "-c", "user.name=Portfolio Release Bot",
      "-c", "user.email=portfolio-release@example.local",
      "commit",
      "-m",
      `fix: remove generated portfolio demo app from ${repo.name}`,
    ], { cwd: clone.path, timeoutMs: 120000 });
    if (!committed.ok) return { cleanup: "cleanup-failed" as const, reason: committed.output };
    const pushed = safeRun("git", ["push", "origin", `HEAD:${clone.branch}`], { cwd: clone.path, timeoutMs: 420000 });
    if (!pushed.ok) return { cleanup: "cleanup-failed" as const, reason: pushed.output };
    return { cleanup: "removed-demo-app" as const, reason: "removed generated demo-app from source branch" };
  } finally {
    fs.rmSync(clone.path, { recursive: true, force: true });
  }
}

function safePackageName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project-web-app";
}

function sentenceList(value: string, fallback: string[]) {
  const items = value
    .split(/(?:\n|\.|;|•|- )+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 18)
    .slice(0, 8);
  return items.length ? items : fallback;
}

function readReadmeSummary(sourceDir: string) {
  const readmePath = ["README.md", "readme.md", "README.MD"].map((file) => path.join(sourceDir, file)).find(fs.existsSync);
  if (!readmePath) return { headings: [] as string[], summary: "" };
  const text = fs.readFileSync(readmePath, "utf8").slice(0, 12000);
  const headings = Array.from(text.matchAll(/^#{1,3}\s+(.+)$/gm)).map((match) => match[1].trim()).slice(0, 10);
  const summary = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("!") && !line.startsWith("["))
    .slice(0, 5)
    .join(" ");
  return { headings, summary };
}

function sourceModules(sourceDir: string) {
  const ignored = new Set([".git", "node_modules", "dist", "build", ".next", "out", "demo-app", ".venv", "venv", "__pycache__"]);
  if (!fs.existsSync(sourceDir)) return [];
  return fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => !ignored.has(entry.name))
    .map((entry) => entry.isDirectory() ? `${entry.name}/` : entry.name)
    .slice(0, 18);
}

function classifyDomain(project: Project, readme: string) {
  const text = `${project.slug} ${titleOf(project)} ${contentText(project, "summary")} ${contentText(project, "problem")} ${readme}`.toLowerCase();
  if (/lora|diffusion|animation|image|video|ai|model|ml|transformer/.test(text)) return "ai-workflow";
  if (/archive|library|metadata|catalog|heritage|book|research|paper/.test(text)) return "knowledge-system";
  if (/crawler|scraper|etl|pipeline|data|analytics|dashboard|bi/.test(text)) return "data-platform";
  if (/pos|cafe|retail|manager|energy|traffic|trip|map/.test(text)) return "operations-dashboard";
  if (/game|3d|maze|runner|physics/.test(text)) return "interactive-experience";
  return "product-console";
}

function buildImplementedAppModel(project: Project, repo: RepoInfo, sourceDir: string) {
  const readme = readReadmeSummary(sourceDir);
  const modules = sourceModules(sourceDir);
  const title = titleOf(project);
  const domain = classifyDomain(project, readme.summary);
  const summary = contentText(project, "summary") || readme.summary || `${title} is implemented as a browser-reviewable project workspace.`;
  const problem = contentText(project, "problem") || summary;
  const solution = contentText(project, "solution") || `The web app presents the core ${title} workflow through project-owned screens, local fixtures, and deterministic interactions.`;
  const architecture = contentText(project, "architecture") || contentText(project, "dataFlow") || `The implementation packages ${modules.slice(0, 6).join(", ") || "project modules"} into a static frontend that can be reviewed without private services.`;
  const features = sentenceList(
    [contentText(project, "features"), contentText(project, "technicalHighlights"), readme.headings.join(". "), solution].filter(Boolean).join(". "),
    [
      "Open the project control surface and inspect the main workflow.",
      "Review bundled sample records without external APIs.",
      "Run a deterministic processing pass and inspect the generated result state.",
      "Switch between workflow, architecture, and project evidence views.",
    ]
  );
  const scenarioNames = {
    "ai-workflow": ["Input assets", "Preprocessing", "Model pass", "Evaluation", "Export"],
    "knowledge-system": ["Collection", "Metadata", "Search", "Review", "Publication"],
    "data-platform": ["Ingest", "Transform", "Analyze", "Visualize", "Report"],
    "operations-dashboard": ["Queue", "Monitor", "Decision", "Action", "Audit"],
    "interactive-experience": ["Scene", "Controls", "State", "Challenge", "Result"],
    "product-console": ["Setup", "Workflow", "State", "Review", "Outcome"],
  }[domain];

  return {
    slug: project.slug,
    title,
    repoUrl: `https://github.com/${OWNER}/${repo.name}`,
    readmeUrl: project.readmeUrl ?? `${project.githubUrl ?? `https://github.com/${OWNER}/${repo.name}`}#readme`,
    domain,
    summary,
    problem,
    solution,
    architecture,
    features,
    modules,
    headings: readme.headings,
    sampleRows: features.slice(0, 6).map((feature, index) => ({
      id: `S${String(index + 1).padStart(2, "0")}`,
      label: feature.replace(/\.$/, ""),
      value: 42 + index * 9,
      delta: index % 2 === 0 ? "+12%" : "+7%",
      status: index % 3 === 0 ? "ready" : index % 3 === 1 ? "review" : "complete",
    })),
    scenarios: scenarioNames.map((name, index) => ({
      id: `${String(index + 1).padStart(2, "0")}`,
      name,
      status: index < 3 ? "Ready" : "Review",
      detail: features[index % features.length],
    })),
  };
}

function renderImplementedMain(model: ReturnType<typeof buildImplementedAppModel>) {
  return `import "./styles.css";

const project = ${JSON.stringify(model, null, 2)};
let view = "workspace";
let selected = project.scenarios[0]?.id ?? "01";

function metric(label, value) {
  return \`<div class="metric"><span>\${label}</span><strong>\${value}</strong></div>\`;
}

function nav() {
  return ["workspace", "workflow", "visualization", "evidence", "architecture"].map((item) =>
    \`<button class="\${view === item ? "active" : ""}" data-view="\${item}">\${item}</button>\`
  ).join("");
}

function workspace() {
  return \`
    <section class="hero">
      <div>
        <p class="eyebrow">\${project.domain.replaceAll("-", " ")}</p>
        <h1>\${project.title}</h1>
        <p class="lead">\${project.summary}</p>
      </div>
      <div class="metrics">
        \${metric("Workflow steps", project.scenarios.length)}
        \${metric("Source modules", project.modules.length)}
        \${metric("Review mode", "Static")}
        \${metric("Backend", "Fixture")}
      </div>
    </section>
    <section class="split">
      <article><h2>Problem</h2><p>\${project.problem}</p></article>
      <article><h2>Implemented Result</h2><p>\${project.solution}</p></article>
    </section>
  \`;
}

function workflow() {
  return \`
    <section>
      <div class="section-head">
        <div><p class="eyebrow">project workflow</p><h2>Executable Review Path</h2></div>
        <button class="primary" id="run">Run workflow</button>
      </div>
      <div class="board">
        \${project.scenarios.map((item) => \`
          <button class="card \${selected === item.id ? "selected" : ""}" data-step="\${item.id}">
            <span>\${item.id}</span>
            <strong>\${item.name}</strong>
            <em>\${item.status}</em>
            <p>\${item.detail}</p>
          </button>
        \`).join("")}
      </div>
      <output id="output">Select a step or run the workflow to inspect deterministic project output.</output>
    </section>
  \`;
}

function visualization() {
  const max = Math.max(...project.sampleRows.map((row) => row.value), 1);
  return \`
    <section>
      <div class="section-head">
        <div><p class="eyebrow">sample data result</p><h2>Visible Demo Output</h2></div>
        <span class="badge">Fixture-backed</span>
      </div>
      <div class="viz">
        <div class="bars">
          \${project.sampleRows.map((row) => \`
            <div class="bar-row">
              <span>\${row.id}</span>
              <div class="bar-track"><div class="bar-fill" style="width: \${Math.round(row.value / max * 100)}%"></div></div>
              <strong>\${row.value}</strong>
            </div>
          \`).join("")}
        </div>
        <div class="result-table">
          \${project.sampleRows.map((row) => \`
            <article>
              <b>\${row.label}</b>
              <span>\${row.status}</span>
              <em>\${row.delta}</em>
            </article>
          \`).join("")}
        </div>
      </div>
    </section>
  \`;
}

function evidence() {
  return \`
    <section class="split">
      <article>
        <p class="eyebrow">repository evidence</p>
        <h2>Source modules</h2>
        <div class="chips">\${project.modules.map((item) => \`<span>\${item}</span>\`).join("") || "<span>Project source reviewed</span>"}</div>
      </article>
      <article>
        <p class="eyebrow">documentation</p>
        <h2>README signals</h2>
        <ul>\${project.headings.map((item) => \`<li>\${item}</li>\`).join("") || "<li>README content is represented in the workflow panels.</li>"}</ul>
      </article>
    </section>
  \`;
}

function architecture() {
  return \`
    <section>
      <p class="eyebrow">architecture</p>
      <h2>Static deployment architecture</h2>
      <p>\${project.architecture}</p>
      <pre>npm run dev
npm run build
GitHub Pages / gh-pages
local fixtures / no private backend</pre>
    </section>
  \`;
}

function render() {
  const views = { workspace, workflow, visualization, evidence, architecture };
  document.querySelector("#app").innerHTML = \`
    <header>
      <a href="\${project.repoUrl}" class="brand">\${project.title}</a>
      <nav>\${nav()}</nav>
      <a class="readme" href="\${project.readmeUrl}">README</a>
    </header>
    <main>\${views[view]()}</main>
  \`;
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    view = button.dataset.view;
    render();
  }));
  document.querySelectorAll("[data-step]").forEach((button) => button.addEventListener("click", () => {
    selected = button.dataset.step;
    render();
  }));
  document.querySelector("#run")?.addEventListener("click", () => {
    const output = document.querySelector("#output");
    if (output) output.textContent = \`\${project.title}: \${project.scenarios.length} workflow steps completed using local fixture state.\`;
  });
}

render();
`;
}

function renderImplementedCss() {
  return `:root {
  --bg: #eef2ef;
  --panel: #ffffff;
  --ink: #172025;
  --muted: #65737d;
  --line: #d2d8d2;
  --accent: #0b766a;
  --accent-2: #b65d32;
}
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--ink); }
a { color: inherit; text-decoration: none; }
button { font: inherit; }
header { position: sticky; top: 0; z-index: 10; display: grid; grid-template-columns: minmax(220px, 1fr) auto auto; gap: 18px; align-items: center; min-height: 72px; padding: 0 28px; border-bottom: 1px solid var(--line); background: rgba(238, 242, 239, .92); backdrop-filter: blur(14px); }
.brand { font-weight: 850; line-height: 1.1; }
nav { display: flex; gap: 6px; border: 1px solid var(--line); border-radius: 8px; padding: 4px; background: var(--panel); }
nav button { border: 0; border-radius: 6px; padding: 9px 12px; background: transparent; color: var(--muted); text-transform: capitalize; cursor: pointer; }
nav button.active { background: var(--ink); color: white; }
.readme, .primary { border: 1px solid var(--ink); border-radius: 8px; padding: 10px 14px; background: var(--ink); color: white; cursor: pointer; }
.badge { border: 1px solid var(--line); border-radius: 999px; padding: 8px 12px; color: var(--accent); background: #f7faf7; font-weight: 800; }
main { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 28px 0 64px; }
section, .split article { border: 1px solid var(--line); border-radius: 8px; background: var(--panel); padding: 24px; box-shadow: 0 18px 46px rgba(23, 32, 37, .08); }
section + section { margin-top: 18px; }
.hero { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 24px; align-items: stretch; }
.eyebrow { margin: 0 0 10px; color: var(--accent-2); font-size: 12px; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
h1 { margin: 0; max-width: 860px; font-size: clamp(34px, 6vw, 76px); line-height: .95; letter-spacing: 0; }
h2 { margin: 0 0 10px; font-size: 22px; letter-spacing: 0; }
p { color: var(--muted); line-height: 1.65; }
.lead { max-width: 760px; font-size: 18px; }
.metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.metric { min-height: 116px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--line); border-radius: 8px; padding: 16px; background: #f7faf7; }
.metric span { color: var(--muted); font-size: 13px; }
.metric strong { font-size: 25px; }
.split { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 18px; }
.section-head { display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-bottom: 18px; }
.board { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
.card { min-height: 190px; border: 1px solid var(--line); border-radius: 8px; padding: 16px; background: white; color: var(--ink); text-align: left; cursor: pointer; }
.card.selected { border-color: var(--accent); background: #ecf7f3; }
.card span { color: var(--accent); font-weight: 900; }
.card strong { display: block; margin-top: 12px; font-size: 18px; }
.card em { display: inline-block; margin-top: 8px; color: var(--accent-2); font-style: normal; font-weight: 750; }
output { display: block; margin-top: 18px; border-radius: 8px; padding: 14px; background: var(--ink); color: white; }
.viz { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, .85fr); gap: 18px; }
.bars, .result-table { display: grid; gap: 10px; }
.bar-row { display: grid; grid-template-columns: 48px minmax(0, 1fr) 54px; gap: 12px; align-items: center; }
.bar-row span { color: var(--accent); font-weight: 900; }
.bar-row strong { text-align: right; }
.bar-track { height: 18px; border-radius: 999px; background: #e7eee8; overflow: hidden; border: 1px solid var(--line); }
.bar-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--accent), var(--accent-2)); }
.result-table article { display: grid; grid-template-columns: minmax(0, 1fr) 78px 58px; gap: 10px; align-items: center; border: 1px solid var(--line); border-radius: 8px; padding: 12px; background: #f7faf7; }
.result-table span { color: var(--accent); font-weight: 800; }
.result-table em { color: var(--accent-2); font-style: normal; font-weight: 800; text-align: right; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips span { border: 1px solid var(--line); border-radius: 999px; padding: 7px 10px; background: #f7faf7; color: var(--accent); font-size: 13px; }
li { margin: 8px 0; color: var(--muted); }
pre { overflow: auto; border: 1px solid var(--line); border-radius: 8px; padding: 14px; background: #172025; color: #f6f8f5; }
@media (max-width: 860px) {
  header { grid-template-columns: 1fr; padding: 14px 16px; }
  nav { overflow-x: auto; }
  .hero, .split, .viz { grid-template-columns: 1fr; }
}
`;
}

function createImplementedWebApp(sourceDir: string, project: Project, repo: RepoInfo) {
  const rootPackagePath = path.join(sourceDir, "package.json");
  const hasRootPackage = fs.existsSync(rootPackagePath);
  const appDir = hasRootPackage ? path.join(sourceDir, "web") : sourceDir;
  fs.mkdirSync(path.join(appDir, "src"), { recursive: true });
  const model = buildImplementedAppModel(project, repo, sourceDir);
  const appPackage: PackageJson = {
    name: safePackageName(`${repo.name}-web`),
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: {
      dev: "vite --host 0.0.0.0",
      build: `vite build --base /${repo.name}/`,
      preview: "vite preview --host 0.0.0.0",
    },
    dependencies: {
      vite: "latest",
      typescript: "latest",
    },
  };
  fs.writeFileSync(path.join(appDir, "package.json"), `${JSON.stringify(appPackage, null, 2)}\n`, "utf8");
  fs.writeFileSync(
    path.join(appDir, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${model.summary.replace(/"/g, "&quot;")}" />
    <title>${model.title.replace(/</g, "").replace(/>/g, "")}</title>
  </head>
  <body data-original-project-web-app="true">
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`,
    "utf8"
  );
  fs.writeFileSync(path.join(appDir, "src", "main.js"), renderImplementedMain(model), "utf8");
  fs.writeFileSync(path.join(appDir, "src", "styles.css"), renderImplementedCss(), "utf8");

  if (hasRootPackage && appDir !== sourceDir) {
    const rootPackage = readJson<PackageJson>(rootPackagePath, {});
    rootPackage.scripts = rootPackage.scripts ?? {};
    rootPackage.scripts["web:dev"] = rootPackage.scripts["web:dev"] ?? "npm --prefix web run dev";
    rootPackage.scripts["web:build"] = rootPackage.scripts["web:build"] ?? "npm --prefix web run build";
    rootPackage.scripts["web:preview"] = rootPackage.scripts["web:preview"] ?? "npm --prefix web run preview";
    rootPackage.scripts.dev = rootPackage.scripts.dev ?? "npm --prefix web run dev";
    rootPackage.scripts.build = rootPackage.scripts.build ?? "npm --prefix web run build";
    fs.writeFileSync(rootPackagePath, `${JSON.stringify(rootPackage, null, 2)}\n`, "utf8");
  }

  return appDir;
}

function commitAndPushImplementedWebApp(sourceDir: string, repo: RepoInfo, branch: string) {
  run("git", ["add", "-A"], { cwd: sourceDir, timeoutMs: 30000 });
  const noDiff = safeRun("git", ["diff", "--cached", "--quiet"], { cwd: sourceDir, timeoutMs: 30000 });
  if (noDiff.ok) return { ok: true, output: "implemented web app already up to date" };
  const committed = safeRun("git", [
    "-c", "user.name=Portfolio Release Bot",
    "-c", "user.email=portfolio-release@example.local",
    "commit",
    "-m",
    `feat: implement project web app for ${repo.name}`,
  ], { cwd: sourceDir, timeoutMs: 120000 });
  if (!committed.ok) return committed;
  return safeRun("git", ["push", "origin", `HEAD:${branch || "main"}`], { cwd: sourceDir, timeoutMs: 420000 });
}

function updateLiveLink(project: Project, repo: RepoInfo | undefined, mode: "external-demo" | "case-study") {
  if (dryRun) return;
  const overridePath = path.join(CONTENT_DIR, project.slug, "project.override.json");
  const override = readJson<Record<string, unknown>>(overridePath, {});
  const links = Array.isArray(override.links) ? override.links as ProjectLink[] : [];
  const nextLive: ProjectLink = mode === "external-demo"
    ? {
      kind: "live",
      url: `${PAGES_BASE}/${repo?.name}/`,
      label: { "zh-TW": "網站 Demo", en: "Live Demo" },
      primary: true,
    }
    : {
      kind: "live",
      url: `/projects/${project.slug}#demo-guide`,
      label: { "zh-TW": "專案說明", en: "Case Study" },
      primary: true,
    };
  const index = links.findIndex((link) => link.kind === "live");
  if (index === -1) links.unshift(nextLive);
  else links[index] = nextLive;
  override.links = links;
  writeJson(overridePath, override);
}

function writeReport(results: Result[]) {
  const generatedAt = new Date().toISOString();
  const publicResults = results.map((result) => ({
    ...result,
    localPath: undefined,
    candidate: result.candidate ? {
      rel: result.candidate.rel,
      kind: result.candidate.kind,
      packageName: result.candidate.packageName,
      dev: result.candidate.dev,
      build: result.candidate.build,
    } : undefined,
    reason: result.reason.replace(/\/home\/[^ \n;)]+/g, "[local-path]").replace(/\/mnt\/c\/[^ \n;)]+/g, "[local-path]"),
  }));
  writeJson(REPORT_JSON_PATH, {
    generatedAt,
    dryRun,
    total: results.length,
    deployedOriginalApps: results.filter((result) => result.status === "deployed-original-app").length,
    caseStudyFallbacks: results.filter((result) => result.status === "case-study-fallback").length,
    implementedWebApps: results.filter((result) => result.status === "implemented-web-app").length,
    failed: results.filter((result) => result.status === "failed").length,
    results: publicResults,
  });
  fs.writeFileSync(
    REPORT_MD_PATH,
    [
      "# Original App Demo Remediation Report",
      "",
      `Generated at: ${generatedAt}`,
      `Dry run: ${dryRun ? "yes" : "no"}`,
      "",
      "| Slug | Repo | Status | Candidate | Cleanup | Live URL | Reason |",
      "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |",
      ...publicResults.map((result) => `| ${result.slug} | ${result.repo ?? ""} | ${result.status} | ${result.candidate ? `${result.candidate.kind}:${result.candidate.rel}` : ""} | ${result.cleanup} | ${result.liveUrl ?? ""} | ${result.reason.replace(/\|/g, "\\|")} |`),
      "",
    ].join("\n"),
    "utf8"
  );
}

async function main() {
  const projects = readJson<Project[]>(CATALOG_PATH, []);
  const localEntries = readJson<{ projects?: LocalMapEntry[] }>(LOCAL_MAP_PATH, { projects: [] }).projects ?? [];
  const localBySlug = new Map(localEntries.map((entry) => [entry.slug, entry]));
  const repos = loadRepos();
  const repoByName = new Map(repos.filter((repo) => !repo.isArchived).map((repo) => [repo.name.toLowerCase(), repo]));
  const results: Result[] = [];
  let processed = 0;

  for (const project of projects) {
    if (onlySlugs.size > 0 && !onlySlugs.has(project.slug)) continue;
    if (limit > 0 && processed >= limit) break;
    if (onlySlugs.size === 0) {
      console.log(`[check] ${project.slug}`);
      if (!await isRepoDemoApp(project)) continue;
    }

    processed += 1;
    console.log(`[process] ${project.slug}`);
    const title = titleOf(project);
    const local = localBySlug.get(project.slug);
    const localPath = local?.localPath && fs.existsSync(local.localPath) ? local.localPath : "";
    const repoName = githubRepoName(project.githubUrl) ?? githubRepoName(linkFor(project, "github")?.url) ?? githubRepoName(local?.githubUrl);
    const repo = repoName ? repoByName.get(repoName.toLowerCase()) : undefined;

    if (!repo) {
      updateLiveLink(project, undefined, "case-study");
      results.push({
        slug: project.slug,
        title,
        localPath,
        status: "case-study-fallback",
        reason: "no active GitHub repo found; live link moved back to portfolio case study",
        cleanup: "not-needed",
      });
      continue;
    }

    const cleanup = cleanupDemoApp(repo);
    const candidates = findOriginalAppCandidates(localPath);
    const candidate = candidates[0];

    if (!candidate) {
      if (dryRun) {
        results.push({
          slug: project.slug,
          title,
          repo: repo.name,
          localPath,
          liveUrl: `${PAGES_BASE}/${repo.name}/`,
          status: "planned",
          reason: "would implement a project-owned web app because no original npm/web app candidate was found",
          cleanup: cleanup.cleanup,
        });
        continue;
      }

      const clone = cloneRepo(repo);
      if (!clone.ok) {
        results.push({
          slug: project.slug,
          title,
          repo: repo.name,
          localPath,
          status: "failed",
          reason: `no original npm/web app candidate found and repo clone failed: ${clone.output}`,
          cleanup: cleanup.cleanup,
        });
        continue;
      }

      try {
        if (fs.existsSync(path.join(clone.path, "demo-app"))) {
          fs.rmSync(path.join(clone.path, "demo-app"), { recursive: true, force: true });
        }
        const appDir = createImplementedWebApp(clone.path, project, repo);
        const sourcePush = commitAndPushImplementedWebApp(clone.path, repo, clone.branch);
        if (!sourcePush.ok) {
          results.push({
            slug: project.slug,
            title,
            repo: repo.name,
            localPath,
            status: "failed",
            reason: `implemented web app source push failed: ${sourcePush.output}`,
            cleanup: cleanup.cleanup,
          });
          continue;
        }

        const implementedCandidate: Candidate = {
          dir: appDir,
          rel: path.relative(clone.path, appDir) || ".",
          kind: "vite",
          score: 100,
          hasPackage: true,
          hasDev: true,
          hasBuild: true,
          dev: "vite --host 0.0.0.0",
          build: `vite build --base /${repo.name}/`,
          packageName: safePackageName(`${repo.name}-web`),
        };
        const build = buildOriginalApp(implementedCandidate, repo.name);
        if (!build.ok) {
          results.push({
            slug: project.slug,
            title,
            repo: repo.name,
            localPath,
            candidate: implementedCandidate,
            status: "failed",
            reason: `implemented web app build failed: ${build.reason}`,
            cleanup: cleanup.cleanup,
          });
          continue;
        }

        const deploy = deployGhPages(build.outputDir, repo);
        if (!deploy.ok) {
          results.push({
            slug: project.slug,
            title,
            repo: repo.name,
            localPath,
            candidate: implementedCandidate,
            status: "failed",
            reason: `implemented web app built but gh-pages deploy failed: ${deploy.output}`,
            cleanup: cleanup.cleanup,
          });
          continue;
        }

        updateLiveLink(project, repo, "external-demo");
        results.push({
          slug: project.slug,
          title,
          repo: repo.name,
          localPath,
          liveUrl: `${PAGES_BASE}/${repo.name}/`,
          candidate: implementedCandidate,
          status: "implemented-web-app",
          reason: "implemented and deployed project-owned web app because no original npm/web app candidate was found",
          cleanup: cleanup.cleanup,
        });
      } finally {
        fs.rmSync(clone.path, { recursive: true, force: true });
      }
      continue;
    }

    if (dryRun) {
      results.push({
        slug: project.slug,
        title,
        repo: repo.name,
        localPath,
        liveUrl: `${PAGES_BASE}/${repo.name}/`,
        candidate,
        status: "planned",
        reason: `would deploy original ${candidate.kind} app from ${candidate.rel}`,
        cleanup: cleanup.cleanup,
      });
      continue;
    }

    const build = buildOriginalApp(candidate, repo.name);
    if (!build.ok) {
      updateLiveLink(project, repo, "case-study");
      results.push({
        slug: project.slug,
        title,
        repo: repo.name,
        localPath,
        candidate,
        status: "case-study-fallback",
        reason: `${build.reason}; live link moved back to portfolio case study`,
        cleanup: cleanup.cleanup,
      });
      continue;
    }

    const runSupport = commitAndPushOriginalRunSupport(repo, candidate);
    if (!runSupport.ok) {
      results.push({
        slug: project.slug,
        title,
        repo: repo.name,
        localPath,
        candidate,
        status: "failed",
        reason: `original app built, but npm run dev support could not be pushed: ${runSupport.output}`,
        cleanup: cleanup.cleanup,
      });
      continue;
    }

    const deploy = deployGhPages(build.outputDir, repo);
    if (!deploy.ok) {
      updateLiveLink(project, repo, "case-study");
      results.push({
        slug: project.slug,
        title,
        repo: repo.name,
        localPath,
        candidate,
        status: "failed",
        reason: `original app built but gh-pages deploy failed: ${deploy.output}`,
        cleanup: cleanup.cleanup,
      });
      continue;
    }

    updateLiveLink(project, repo, "external-demo");
    results.push({
      slug: project.slug,
      title,
      repo: repo.name,
      localPath,
      liveUrl: `${PAGES_BASE}/${repo.name}/`,
      candidate,
      status: "deployed-original-app",
      reason: build.reason,
      cleanup: cleanup.cleanup,
    });
  }

  writeReport(results);
  const failed = results.filter((result) => result.status === "failed").length;
  console.log(`Original app demo remediation complete: ${results.length} processed, ${failed} failed.`);
  results.forEach((result) => console.log(`${result.status}\t${result.slug}\t${result.candidate ? `${result.candidate.kind}:${result.candidate.rel}` : ""}\t${result.cleanup}\t${result.reason}`));
  if (failed > 0) process.exitCode = 1;
}

main();
