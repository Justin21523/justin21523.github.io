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
  technologies: string[];
  githubUrl?: string;
  links: ProjectLink[];
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
    path.join(localPath, "admin-web"),
    path.join(localPath, "web"),
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
      "zh-TW": "App Demo",
      en: "App Demo",
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
    };
  }

  const install = installIfNeeded(localPath);
  if (!install.ok) {
    return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `install failed: ${install.output}` };
  }

  const build = buildProject(localPath, repo.name);
  if (!build.ok) {
    return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: `build failed: ${build.output}` };
  }

  const outputDir = detectBuildOutput(localPath);
  if (!outputDir || !fs.existsSync(path.join(outputDir, "index.html"))) {
    return { slug: project.slug, status: "failed", repo: repo.name, url: appUrl, reason: "build output does not contain index.html" };
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
    return { slug: project.slug, status: "deployed", repo: repo.name, url: appUrl, reason: `deployed ${build.mode} output to gh-pages` };
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
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
  let deployedOrTried = 0;

  for (const project of projects) {
    if (onlySlug && project.slug !== onlySlug) continue;
    if (limit > 0 && deployedOrTried >= limit) break;

    const local = localBySlug.get(project.slug);
    const localPath = local?.localPath;
    const packagePath = localPath ? path.join(localPath, "package.json") : "";
    if (!localPath || !fs.existsSync(packagePath)) continue;

    const packageJson = readJson<PackageJson>(packagePath, {});
    if (!packageJson.scripts?.build) continue;
    if (!isWebAppCandidate(project, packageJson)) continue;

    const repoName = githubRepoName(project.githubUrl) ?? githubRepoName(local.githubUrl);
    const repo = repoName ? repoByName.get(repoName.toLowerCase()) : undefined;

    if (!repo) {
      results.push({ slug: project.slug, status: "skipped", reason: "no active GitHub repo for app deployment" });
      continue;
    }

    const live = linkFor(project, "live")?.url ?? "";
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
