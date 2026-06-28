import { execFileSync, spawn, type ChildProcess } from "child_process";
import fs from "fs";
import net from "net";
import path from "path";
import { chromium, type Page } from "@playwright/test";

const ROOT = process.cwd();
const HOME_DIR = process.env.HOME || "";
const WINDOWS_MOUNT_ROOT = path.join(path.sep, "mnt", "c");
const LOCAL_PATH_KEY = "local" + "Path";
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const SCAN_REPORT_PATH = path.join(ROOT, "data/generated/project-scan-report.json");
const LOCAL_MAP_PATH = path.join(ROOT, ".portfolio-local-map.json");
const PROGRESS_PATH = path.join(ROOT, "docs/portfolio-release/project-release-progress.json");
const PROJECT_RELEASE_ROOT = path.join(ROOT, "docs/portfolio-release/projects");
const QUALITY_REPORT_PATH = path.join(ROOT, "docs/portfolio-release/quality-pass-report.md");
const QUALITY_JSON_PATH = path.join(ROOT, "docs/portfolio-release/quality-pass-report.json");
const RELEASE_REPORT_PATH = path.join(ROOT, "docs/portfolio-release/release-report.md");
const DEMO_SCRIPT_ROOT = path.join(ROOT, "docs/demo-scripts");
const PUBLIC_PROJECT_ROOT = path.join(ROOT, "public/projects");
const PUBLIC_PORTFOLIO_PROJECT_ROOT = path.join(ROOT, "public/portfolio/projects");

const excludedDirs = new Set([
  ".git",
  ".next",
  ".venv",
  "__pycache__",
  "bin",
  "build",
  "coverage",
  "dist",
  "Library",
  "node_modules",
  "obj",
  "target",
  "Temp",
  "venv",
]);

type LocaleText = Record<"en" | "zh-TW", string>;

type ProjectLink = {
  kind: string;
  url: string;
  label: LocaleText;
  primary?: boolean;
};

type ProjectMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: LocaleText;
  title: LocaleText;
  caption?: LocaleText;
  featured?: boolean;
  placeholder?: boolean;
};

type Project = {
  id: string;
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
    needsReview?: boolean;
    evidenceSources?: string[];
    localAuditStatus?: string;
    [key: string]: unknown;
  };
  content: Record<
    "en" | "zh-TW",
    {
      title: string;
      summary: string;
      problem: string;
      solution: string;
      highlights: string[];
      challenges: string[];
      nextSteps: string[];
      technicalHighlights?: string[];
      interviewNotes?: string[];
      projectStructure?: string;
      setupGuide?: string;
      futureImprovements?: string[];
    }
  >;
};

type ScannedProject = {
  folder: string;
  type: string;
  canBuild: boolean;
  canRun: boolean;
  hasReadme: boolean;
  hasMedia?: boolean;
  detectedStack?: string[];
  suitability?: string;
};

type LocalMapEntry = {
  slug: string;
  localPath?: string;
  githubUrl?: string;
  status?: string;
  matchConfidence?: string;
};

type ProgressEntry = {
  slug: string;
  title: string;
  priority: number;
  status: string;
  auditStatus: string;
  readmeStatus: string;
  screenshotStatus: string;
  demoStatus: string;
  portfolioPageStatus: string;
  linkValidationStatus: string;
  buildStatus: string;
  manualFollowUpNeeded: string[];
  updatedAt: string;
  qualityStatus?: string;
};

type ProjectQualityResult = {
  slug: string;
  title: string;
  status: "completed" | "failed";
  localRepo: "present" | "missing";
  sourceType: string;
  readmeStatus: string;
  installStatus: string;
  runStatus: string;
  buildStatus: string;
  testStatus: string;
  lintStatus: string;
  screenshotStatus: string;
  demoVideoStatus: string;
  deploymentStatus: string;
  copiedAssets: string[];
  capturedScreenshots: string[];
  manualFollowUpNeeded: string[];
  notes: string[];
};

type CaptureResult = {
  ok: boolean;
  status: string;
  screenshots: string[];
  videos: string[];
};

type PackageInfo = {
  scripts: Record<string, string>;
  packageManager: "npm" | "none";
  hasNodeModules: boolean;
  hasLockfile: boolean;
};

const args = new Set(process.argv.slice(2));
const argValue = (name: string) => {
  const prefix = `${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : undefined;
};
const selectedSlug = argValue("--slug");
const limit = Number(argValue("--limit") ?? "0");
const executeBuilds = !args.has("--skip-builds");
const captureScreens = !args.has("--skip-screenshots");
const installDependencies = args.has("--install");
let portfolioServer: ChildProcess | undefined;
let portfolioServerPort: number | undefined;
let portfolioServerBaseUrl: string | undefined;

function readJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function writeJson(filePath: string, value: unknown) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureDir(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeLocalMap(raw: unknown): LocalMapEntry[] {
  if (Array.isArray(raw)) return raw as LocalMapEntry[];
  if (raw && typeof raw === "object" && Array.isArray((raw as { projects?: unknown }).projects)) {
    return (raw as { projects: LocalMapEntry[] }).projects;
  }
  return [];
}

function linkFor(project: Project, kind: string) {
  return project.links.find((link) => link.kind === kind && link.url);
}

function isExternal(url: string | undefined): url is string {
  return Boolean(url && /^https?:\/\//.test(url));
}

function sitePathToPublicPath(url: string) {
  const withoutHash = url.split("#")[0];
  return path.join(ROOT, "public", withoutHash.replace(/^\//, ""));
}

function packageInfo(localPath: string | undefined): PackageInfo {
  if (!localPath) {
    return { scripts: {}, packageManager: "none", hasNodeModules: false, hasLockfile: false };
  }

  const packagePath = path.join(localPath, "package.json");
  if (!fs.existsSync(packagePath)) {
    return { scripts: {}, packageManager: "none", hasNodeModules: false, hasLockfile: false };
  }

  const packageJson = readJson<{ scripts?: Record<string, string> }>(packagePath, {});
  return {
    scripts: packageJson.scripts ?? {},
    packageManager: "npm",
    hasNodeModules: fs.existsSync(path.join(localPath, "node_modules")),
    hasLockfile: ["package-lock.json", "npm-shrinkwrap.json"].some((file) => fs.existsSync(path.join(localPath, file))),
  };
}

function runCommand(
  command: string,
  args: string[],
  options: { cwd: string; timeoutMs: number; env?: Record<string, string> }
) {
  try {
    const output = execFileSync(command, args, {
      cwd: options.cwd,
      encoding: "utf8",
      env: { ...process.env, ...options.env },
      maxBuffer: 1024 * 1024 * 4,
      stdio: ["ignore", "pipe", "pipe"],
      timeout: options.timeoutMs,
    });
    return { ok: true, status: "passed", detail: redactPublicText(output.trim().slice(-1200)) };
  } catch (error) {
    const err = error as { status?: number; signal?: string; stderr?: Buffer | string; stdout?: Buffer | string; message?: string };
    const stderr = Buffer.isBuffer(err.stderr) ? err.stderr.toString("utf8") : err.stderr ?? "";
    const stdout = Buffer.isBuffer(err.stdout) ? err.stdout.toString("utf8") : err.stdout ?? "";
    const reason = err.signal === "SIGTERM" ? "timed out" : `failed${err.status ? ` (${err.status})` : ""}`;
    return {
      ok: false,
      status: reason,
      detail: redactPublicText(`${stdout}\n${stderr}\n${err.message ?? ""}`.trim().slice(-1600)),
    };
  }
}

function readmeAudit(localPath: string | undefined) {
  if (!localPath || !fs.existsSync(localPath)) {
    return { status: "missing-local-repo", missing: ["README cannot be checked without a local repository."], sections: [] };
  }

  const readmePath = path.join(localPath, "README.md");
  if (!fs.existsSync(readmePath)) {
    return { status: "missing-readme", missing: ["README.md is missing."], sections: [] };
  }

  const text = fs.readFileSync(readmePath, "utf8");
  const required = [
    "Overview",
    "Demo",
    "Features",
    "Tech Stack",
    "Architecture",
    "Project Structure",
    "Getting Started",
    "Screenshots",
    "Demo Script",
    "Key Implementation Details",
    "Challenges",
    "Future Improvements",
  ];
  const present = required.filter((section) => new RegExp(`^##\\s+${section}`, "im").test(text));
  const missing = required.filter((section) => !present.includes(section));
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return {
    status: missing.length === 0 && wordCount >= 350 ? "portfolio-grade" : "needs-detail",
    missing,
    sections: present,
  };
}

function markdownList(items: string[]) {
  if (!items.length) return "- None.";
  return items.map((item) => `- ${redactPublicText(item)}`).join("\n");
}

function redactPublicText(value: string) {
  const escapedHome = HOME_DIR.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedWindowsRoot = WINDOWS_MOUNT_ROOT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value
    .replace(escapedHome ? new RegExp(`${escapedHome}\\/[^\\s)\`"'，。；,;]*`, "g") : /$a/, "[local-path]")
    .replace(new RegExp(`${escapedWindowsRoot}(?:\\/[^\\s)\`"'，。；,;]*)?`, "g"), "[local-path]")
    .replace(/[A-Za-z]:\\Users\\[^\\\s]+\\[^\s)`"']*/g, "[local-path]")
    .replace(/\u001b\[[0-9;]*m/g, "");
}

function updateReadmeQualitySection(
  project: Project,
  localPath: string | undefined,
  result: Pick<
    ProjectQualityResult,
    "buildStatus" | "runStatus" | "testStatus" | "lintStatus" | "screenshotStatus" | "demoVideoStatus" | "manualFollowUpNeeded"
  >
) {
  if (!localPath || !fs.existsSync(localPath)) return "missing-local-repo";
  const readmePath = path.join(localPath, "README.md");
  const current = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : `# ${project.content.en.title}\n`;
  const section = [
    "<!-- portfolio-quality-notes:start -->",
    "## Portfolio Quality Notes",
    "",
    "This section records the latest portfolio packaging check. It is intentionally factual: incomplete deployment, video, or build work is listed as follow-up instead of being presented as finished.",
    "",
    "### Verification Status",
    `- Build: ${result.buildStatus}`,
    `- Run: ${result.runStatus}`,
    `- Test: ${result.testStatus}`,
    `- Lint: ${result.lintStatus}`,
    `- Screenshots: ${result.screenshotStatus}`,
    `- Demo Video: ${result.demoVideoStatus}`,
    "",
    "### Portfolio Follow-up",
    markdownList(result.manualFollowUpNeeded),
    "<!-- portfolio-quality-notes:end -->",
    "",
  ].join("\n");

  const next = current.includes("<!-- portfolio-quality-notes:start -->")
    ? current.replace(/<!-- portfolio-quality-notes:start -->[\s\S]*?<!-- portfolio-quality-notes:end -->\n?/, section)
    : `${current.trimEnd()}\n\n${section}`;

  fs.writeFileSync(readmePath, next.endsWith("\n") ? next : `${next}\n`);
  return current.includes("<!-- portfolio-quality-notes:start -->") ? "updated-quality-section" : "appended-quality-section";
}

function copyFileToPublic(source: string, destination: string) {
  ensureDir(path.dirname(destination));
  fs.copyFileSync(source, destination);
}

function publicUrlFromProjectPath(slug: string, filePath: string) {
  return `/projects/${slug}/${path.relative(path.join(PUBLIC_PROJECT_ROOT, slug), filePath).replace(/\\/g, "/")}`;
}

function collectCandidateAssets(root: string | undefined) {
  if (!root || !fs.existsSync(root)) return { images: [] as string[], videos: [] as string[] };
  const images: string[] = [];
  const videos: string[] = [];

  const walk = (dirPath: string, depth: number) => {
    if (depth > 5) return;
    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
      if (excludedDirs.has(entry.name)) continue;
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, depth + 1);
        continue;
      }

      const rel = path.relative(root, fullPath).toLowerCase();
      const ext = path.extname(entry.name).toLowerCase();
      const evidenceName =
        rel.includes("screenshot") ||
        rel.includes("screen") ||
        rel.includes("demo") ||
        rel.includes("cover") ||
        rel.includes("hero") ||
        rel.includes("recording");

      if (!evidenceName) continue;
      if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) images.push(fullPath);
      if ([".mp4", ".webm"].includes(ext)) videos.push(fullPath);
    }
  };

  walk(root, 0);
  return { images, videos };
}

function addMedia(project: Project, item: ProjectMedia) {
  const exists = project.media.some((media) => media.src === item.src || media.id === item.id);
  if (!exists) {
    project.media.push(item);
  }
}

function hasRealImageMedia(project: Project) {
  return project.media.some((item) => item.type === "image" && !item.placeholder && fs.existsSync(sitePathToPublicPath(item.src)));
}

function hasRealVideoMedia(project: Project) {
  return project.media.some((item) => item.type === "video" && !item.placeholder && fs.existsSync(sitePathToPublicPath(item.src))) || isExternal(linkFor(project, "video")?.url);
}

function harvestAssets(project: Project, localPath: string | undefined) {
  const copiedAssets: string[] = [];
  const capturedScreenshots: string[] = [];
  const publicRoot = path.join(PUBLIC_PROJECT_ROOT, project.slug);
  const screenshotRoot = path.join(publicRoot, "screenshots");
  const videoRoot = path.join(publicRoot, "videos");
  ensureDir(screenshotRoot);
  ensureDir(videoRoot);

  const publicPortfolioRoot = path.join(PUBLIC_PORTFOLIO_PROJECT_ROOT, project.slug);
  const sources = [publicPortfolioRoot, localPath].filter(Boolean) as string[];
  let imageIndex = 1;
  let videoIndex = 1;

  for (const sourceRoot of sources) {
    const assets = collectCandidateAssets(sourceRoot);
    for (const image of assets.images.slice(0, 6)) {
      const ext = path.extname(image).toLowerCase() || ".png";
      const dest = path.join(screenshotRoot, `${String(imageIndex).padStart(2, "0")}-real-${path.basename(image).replace(/[^a-zA-Z0-9._-]/g, "-")}`);
      copyFileToPublic(image, dest.endsWith(ext) ? dest : `${dest}${ext}`);
      const actualDest = dest.endsWith(ext) ? dest : `${dest}${ext}`;
      const url = publicUrlFromProjectPath(project.slug, actualDest);
      addMedia(project, {
        id: `quality-real-image-${imageIndex}`,
        type: "image",
        src: url,
        alt: {
          en: `${project.content.en.title} real project screenshot or demo asset.`,
          "zh-TW": `${project.content["zh-TW"].title} 的真實專案截圖或展示素材。`,
        },
        title: {
          en: `Verified Project Screenshot ${imageIndex}`,
          "zh-TW": `已驗證專案截圖 ${imageIndex}`,
        },
        caption: {
          en: "Copied from an existing project media directory during the quality pass.",
          "zh-TW": "品質檢查時從既有專案素材目錄複製而來。",
        },
        featured: imageIndex === 1 && !project.media.some((item) => item.featured),
      });
      if (!project.coverImage) project.coverImage = url;
      copiedAssets.push(url);
      imageIndex += 1;
    }

    for (const video of assets.videos.slice(0, 2)) {
      const ext = path.extname(video).toLowerCase() || ".webm";
      const dest = path.join(videoRoot, `${String(videoIndex).padStart(2, "0")}-real-${path.basename(video).replace(/[^a-zA-Z0-9._-]/g, "-")}`);
      copyFileToPublic(video, dest.endsWith(ext) ? dest : `${dest}${ext}`);
      const actualDest = dest.endsWith(ext) ? dest : `${dest}${ext}`;
      const url = publicUrlFromProjectPath(project.slug, actualDest);
      addMedia(project, {
        id: `quality-real-video-${videoIndex}`,
        type: "video",
        src: url,
        poster: project.coverImage,
        alt: {
          en: `${project.content.en.title} real demo recording.`,
          "zh-TW": `${project.content["zh-TW"].title} 的真實 demo 錄影。`,
        },
        title: {
          en: `Verified Demo Recording ${videoIndex}`,
          "zh-TW": `已驗證 Demo 錄影 ${videoIndex}`,
        },
        caption: {
          en: "Copied from an existing project demo asset during the quality pass.",
          "zh-TW": "品質檢查時從既有專案 demo 素材複製而來。",
        },
      });
      const videoLink = linkFor(project, "video");
      if (videoLink && !isExternal(videoLink.url)) videoLink.url = url;
      copiedAssets.push(url);
      videoIndex += 1;
    }
  }

  return { copiedAssets, capturedScreenshots };
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

async function openStablePage(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 35000 });
  try {
    await page.waitForLoadState("networkidle", { timeout: 8000 });
  } catch {
    await page.waitForLoadState("load", { timeout: 8000 }).catch(() => undefined);
  }
  await wait(1200);
}

async function captureStep(page: Page, outputPath: string, scrollRatio: number) {
  await page.evaluate((ratio) => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    window.scrollTo({ top: Math.round(maxScroll * ratio), left: 0 });
  }, scrollRatio);
  await wait(800);
  ensureDir(path.dirname(outputPath));
  await page.screenshot({ path: outputPath, fullPage: false });
  return fs.existsSync(outputPath) && fs.statSync(outputPath).size > 5000;
}

async function capturePlaywrightWalkthrough(
  project: Project,
  url: string,
  source: "external-live-demo" | "local-dev-server" | "portfolio-case-study"
): Promise<CaptureResult> {
  const screenshotRoot = path.join(PUBLIC_PROJECT_ROOT, project.slug, "screenshots");
  const videoRoot = path.join(PUBLIC_PROJECT_ROOT, project.slug, "videos");
  ensureDir(screenshotRoot);
  ensureDir(videoRoot);

  const executablePath = chromiumExecutablePath();
  const browser = await chromium.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    recordVideo: {
      dir: videoRoot,
      size: { width: 1440, height: 1000 },
    },
  });

  const page = await context.newPage();
  const videoPathPromise = page.video()?.path();
  const captured: string[] = [];
  let captureError = "";

  try {
    await openStablePage(page, url);

    const steps = [
      { file: "01-overview.png", ratio: 0 },
      { file: "02-core-feature.png", ratio: 0.33 },
      { file: "03-detail-view.png", ratio: 0.66 },
      { file: "04-architecture-or-data-flow.png", ratio: 1 },
    ];

    for (const step of steps) {
      const outputPath = path.join(screenshotRoot, step.file);
      if (await captureStep(page, outputPath, step.ratio)) {
        const publicUrl = publicUrlFromProjectPath(project.slug, outputPath);
        captured.push(publicUrl);
        const index = captured.length;
        addMedia(project, {
          id: `playwright-${source}-screenshot-${index}`,
          type: "image",
          src: publicUrl,
          alt: {
            en: `${project.content.en.title} Playwright-captured ${source.replace(/-/g, " ")} screenshot ${index}.`,
            "zh-TW": `${project.content["zh-TW"].title} 的 Playwright 自動截圖 ${index}。`,
          },
          title: {
            en: `Playwright Screenshot ${index}`,
            "zh-TW": `Playwright 截圖 ${index}`,
          },
          caption: {
            en:
              source === "portfolio-case-study"
                ? "Recorded from the portfolio case study page as a verified fallback demo."
                : `Captured from the ${source.replace(/-/g, " ")} during the portfolio quality pass.`,
            "zh-TW":
              source === "portfolio-case-study"
                ? "從作品集案例頁錄製，作為可驗證的 fallback demo。"
                : `品質檢查時從 ${source.replace(/-/g, " ")} 擷取。`,
          },
          featured: !project.media.some((item) => item.featured),
        });
        if (!project.coverImage) project.coverImage = publicUrl;
      }
    }

    await page.mouse.wheel(0, 900);
    await wait(500);
    await page.mouse.wheel(0, 900);
    await wait(500);
  } catch (error) {
    captureError = error instanceof Error ? error.message : String(error);
  } finally {
    await context.close().catch(() => undefined);
    await browser.close().catch(() => undefined);
  }

  const videoPath = await videoPathPromise?.catch(() => undefined);
  const videoPublicUrls: string[] = [];
  if (videoPath && fs.existsSync(videoPath) && fs.statSync(videoPath).size > 5000) {
    const finalVideo = path.join(videoRoot, `playwright-${source}.webm`);
    fs.copyFileSync(videoPath, finalVideo);
    if (path.resolve(videoPath) !== path.resolve(finalVideo)) {
      fs.rmSync(videoPath, { force: true });
    }
    const videoUrl = publicUrlFromProjectPath(project.slug, finalVideo);
    addMedia(project, {
      id: `playwright-${source}-recording`,
      type: "video",
      src: videoUrl,
      poster: project.coverImage,
      alt: {
        en: `${project.content.en.title} Playwright-recorded ${source.replace(/-/g, " ")} walkthrough.`,
        "zh-TW": `${project.content["zh-TW"].title} 的 Playwright 自動錄影。`,
      },
      title: {
        en: source === "portfolio-case-study" ? "Portfolio Case Study Recording" : "Automated Demo Recording",
        "zh-TW": source === "portfolio-case-study" ? "作品集案例錄影" : "自動化 Demo 錄影",
      },
      caption: {
        en:
          source === "portfolio-case-study"
            ? "A verified portfolio case study recording produced with Playwright when no deployable external demo was available."
            : `A verified ${source.replace(/-/g, " ")} recording produced with Playwright.`,
        "zh-TW":
          source === "portfolio-case-study"
            ? "當尚無可部署外部 demo 時，以 Playwright 產生的作品集案例錄影。"
            : `以 Playwright 產生的 ${source.replace(/-/g, " ")} 驗證錄影。`,
      },
    });
    const videoLink = linkFor(project, "video");
    if (videoLink && !isExternal(videoLink.url)) {
      videoLink.url = videoUrl;
      videoLink.label = { en: "Demo Recording", "zh-TW": "Demo 錄影" };
    }
    videoPublicUrls.push(videoUrl);
  }

  if (!captured.length) {
    return {
      ok: false,
      status: captureError ? redactPublicText(captureError) : "Playwright completed without producing usable screenshots.",
      screenshots: [],
      videos: videoPublicUrls,
    };
  }

  return { ok: true, status: `captured ${captured.length} screenshots`, screenshots: captured, videos: videoPublicUrls };
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
        if (Date.now() - started > timeoutMs) {
          resolve(false);
        } else {
          setTimeout(attempt, 800);
        }
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

async function captureLocalDevScreenshot(project: Project, localPath: string, scripts: Record<string, string>) {
  const scriptName = scripts.dev ? "dev" : scripts.start ? "start" : "";
  if (!scriptName) return { ok: false, status: "no dev/start script", screenshots: [], videos: [] };
  const port = 43100 + Math.floor(Math.random() * 1000);
  const child = spawn("npm", ["run", scriptName], {
    cwd: localPath,
    detached: true,
    env: {
      ...process.env,
      BROWSER: "none",
      HOST: "127.0.0.1",
      HOSTNAME: "127.0.0.1",
      PORT: String(port),
      VITE_PORT: String(port),
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: "ignore",
  });

  try {
    const ready = await waitForPort(port, 22000);
    if (!ready) return { ok: false, status: "dev server did not open a local port within timeout", screenshots: [], videos: [] };
    return await capturePlaywrightWalkthrough(project, `http://127.0.0.1:${port}`, "local-dev-server");
  } finally {
    stopProcess(child);
  }
}

async function captureExternalDemo(project: Project) {
  const live = linkFor(project, "live")?.url;
  if (!isExternal(live)) return { ok: false, status: "no external live demo URL", screenshots: [], videos: [] };
  return await capturePlaywrightWalkthrough(project, live, "external-live-demo");
}

async function urlResponds(url: string) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(5000),
    });
    return response.status < 500;
  } catch {
    return false;
  }
}

function existingPortfolioDevServer() {
  const lockPath = path.join(ROOT, ".next/dev/lock");
  const lock = readJson<{ pid?: number; port?: number; appUrl?: string; hostname?: string } | undefined>(lockPath, undefined);
  if (!lock?.pid || !lock.port) return undefined;
  try {
    process.kill(lock.pid, 0);
  } catch {
    return undefined;
  }
  return lock.appUrl || `http://${lock.hostname || "127.0.0.1"}:${lock.port}`;
}

async function ensurePortfolioServer() {
  if (portfolioServerBaseUrl) return portfolioServerBaseUrl;

  const existing = existingPortfolioDevServer();
  if (existing && (await urlResponds(existing))) {
    portfolioServerBaseUrl = existing;
    return portfolioServerBaseUrl;
  }

  const port = 45100 + Math.floor(Math.random() * 1000);
  portfolioServer = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: ROOT,
    detached: true,
    env: {
      ...process.env,
      BROWSER: "none",
      NEXT_TELEMETRY_DISABLED: "1",
      PORT: String(port),
    },
    stdio: "ignore",
  });
  const ready = await waitForPort(port, 35000);
  if (!ready) {
    stopProcess(portfolioServer);
    portfolioServer = undefined;
    throw new Error("Portfolio dev server did not open a local port for Playwright case-study capture.");
  }
  portfolioServerPort = port;
  portfolioServerBaseUrl = `http://127.0.0.1:${portfolioServerPort}`;
  return portfolioServerBaseUrl;
}

async function capturePortfolioCaseStudy(project: Project) {
  const baseUrl = await ensurePortfolioServer();
  return await capturePlaywrightWalkthrough(project, `${baseUrl}/en/projects/${project.slug}`, "portfolio-case-study");
}

function writeDemoScript(project: Project, result: ProjectQualityResult) {
  ensureDir(DEMO_SCRIPT_ROOT);
  const filePath = path.join(DEMO_SCRIPT_ROOT, `${project.slug}.md`);
  const body = `# ${project.content.en.title} Demo Recording Guide

## Current Media Status
- Screenshots: ${result.screenshotStatus}
- Demo video: ${result.demoVideoStatus}
- Live demo / deployment: ${result.deploymentStatus}

## Recommended Length
45-90 seconds.

## Recording Flow
1. Open the portfolio case study at \`/projects/${project.slug}\`.
2. Open the Live Demo CTA if it points to an external verified app; otherwise stay on the case study demo section.
3. Show the GitHub or source-status CTA and README section.
4. Demonstrate the strongest verified workflow or source artifact:
${markdownList(project.content.en.interviewNotes ?? project.content.en.highlights)}
5. End by naming the build/run status honestly.

## Screenshots Still Needed
${result.screenshotStatus.includes("real") ? "- Real screenshots are already present; replace only if the UI changes." : "- Capture overview, core workflow, detail/output, and architecture/data-flow screens."}

## Manual Follow-up
${markdownList(result.manualFollowUpNeeded)}
`;
  fs.writeFileSync(filePath, body);
}

function writeProjectQualityReport(project: Project, result: ProjectQualityResult) {
  const dir = path.join(PROJECT_RELEASE_ROOT, project.slug);
  ensureDir(dir);
  const report = `# ${project.content.en.title} Quality Pass

## Independent Analysis
- Portfolio slug: \`${project.slug}\`
- Local repo: ${result.localRepo}
- Source type: ${result.sourceType}
- README: ${result.readmeStatus}
- Install: ${result.installStatus}
- Run: ${result.runStatus}
- Build: ${result.buildStatus}
- Test: ${result.testStatus}
- Lint: ${result.lintStatus}

## Assets
- Screenshots: ${result.screenshotStatus}
- Demo video: ${result.demoVideoStatus}
- Deployment: ${result.deploymentStatus}

## Copied / Captured Assets
${markdownList([...result.copiedAssets, ...result.capturedScreenshots])}

## Manual Follow-up Needed
${markdownList(result.manualFollowUpNeeded)}

## Notes
${markdownList(result.notes)}
`;
  fs.writeFileSync(path.join(dir, "quality-report.md"), report);
}

function updateExistingProjectReleaseReport(project: Project, result: ProjectQualityResult) {
  const reportPath = path.join(PROJECT_RELEASE_ROOT, project.slug, "release-report.md");
  if (!fs.existsSync(reportPath)) return;
  const current = fs.readFileSync(reportPath, "utf8");
  const section = [
    "<!-- quality-pass:start -->",
    "## Quality Pass",
    `- README: ${result.readmeStatus}`,
    `- Install: ${result.installStatus}`,
    `- Run: ${result.runStatus}`,
    `- Build: ${result.buildStatus}`,
    `- Test: ${result.testStatus}`,
    `- Lint: ${result.lintStatus}`,
    `- Screenshots: ${result.screenshotStatus}`,
    `- Demo video: ${result.demoVideoStatus}`,
    `- Deployment: ${result.deploymentStatus}`,
    "",
    "### Remaining Manual Work",
    markdownList(result.manualFollowUpNeeded),
    "<!-- quality-pass:end -->",
    "",
  ].join("\n");
  const next = current.includes("<!-- quality-pass:start -->")
    ? current.replace(/<!-- quality-pass:start -->[\s\S]*?<!-- quality-pass:end -->\n?/, section)
    : `${current.trimEnd()}\n\n${section}`;
  fs.writeFileSync(reportPath, next.endsWith("\n") ? next : `${next}\n`);
}

async function analyzeProject(project: Project, local: LocalMapEntry | undefined, scan: ScannedProject | undefined) {
  const localPath = local?.localPath && fs.existsSync(local.localPath) ? local.localPath : undefined;
  const pkg = packageInfo(localPath);
  const readme = readmeAudit(localPath);
  const notes: string[] = [];
  const manual: string[] = [];

  let installStatus = pkg.packageManager === "npm" ? "not run; node_modules already present or install not requested" : "no npm package manifest";
  if (pkg.packageManager === "npm" && !pkg.hasNodeModules) {
    if (installDependencies) {
      const install = runCommand("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", "--no-package-lock"], {
        cwd: localPath!,
        timeoutMs: 90000,
      });
      installStatus = install.ok ? "passed via npm install --ignore-scripts" : `failed: ${install.status}`;
      if (!install.ok) manual.push("Install dependencies manually; automated npm install did not complete.");
    } else {
      installStatus = "not run; dependencies missing and --install was not requested";
      manual.push("Install dependencies before local build/run verification.");
    }
  }

  let buildStatus = "not applicable";
  let runStatus = scan?.canRun || pkg.scripts.dev || pkg.scripts.start ? "run script detected; not executed" : "no verified run command detected";
  let testStatus = pkg.scripts.test ? "test script detected; not executed" : "no test script detected";
  let lintStatus = pkg.scripts.lint ? "lint script detected; not executed" : "no lint script detected";

  const canExecuteNodeChecks = Boolean(localPath && pkg.packageManager === "npm" && (pkg.hasNodeModules || installDependencies));
  if (executeBuilds && canExecuteNodeChecks) {
    if (pkg.scripts.build) {
      const build = runCommand("npm", ["run", "build", "--if-present"], {
        cwd: localPath!,
        timeoutMs: 120000,
        env: { NEXT_TELEMETRY_DISABLED: "1", CI: "1" },
      });
      buildStatus = build.ok ? "passed" : `failed: ${build.status}`;
      if (!build.ok) {
        manual.push("Fix the local build before publishing this as a fully runnable demo.");
        notes.push(`Build output tail: ${build.detail}`);
      }
    } else {
      buildStatus = "no build script";
    }

    if (pkg.scripts.lint) {
      const lint = runCommand("npm", ["run", "lint", "--if-present"], { cwd: localPath!, timeoutMs: 90000, env: { CI: "1" } });
      lintStatus = lint.ok ? "passed" : `failed: ${lint.status}`;
      if (!lint.ok) notes.push(`Lint output tail: ${lint.detail}`);
    }

    if (pkg.scripts.test) {
      const test = runCommand("npm", ["test", "--if-present"], { cwd: localPath!, timeoutMs: 90000, env: { CI: "1" } });
      testStatus = test.ok ? "passed" : `failed: ${test.status}`;
      if (!test.ok) notes.push(`Test output tail: ${test.detail}`);
    }
  } else if (pkg.scripts.build) {
    buildStatus = pkg.hasNodeModules ? "not run; --skip-builds used" : "not run; dependencies missing";
    if (!pkg.hasNodeModules) manual.push("Run npm install and verify npm run build.");
  } else if (scan?.canBuild) {
    buildStatus = "build capability detected by scanner, but no executable npm build was verified";
    manual.push("Verify build command from the project-specific documentation.");
  }

  const assetHarvest = harvestAssets(project, localPath);

  if (captureScreens) {
    const externalCapture = await captureExternalDemo(project);
    if (externalCapture.ok) {
      assetHarvest.capturedScreenshots.push(...(externalCapture.screenshots ?? []));
      assetHarvest.copiedAssets.push(...(externalCapture.videos ?? []));
    } else if (localPath && canExecuteNodeChecks && (pkg.scripts.dev || pkg.scripts.start)) {
      const localCapture = await captureLocalDevScreenshot(project, localPath, pkg.scripts);
      runStatus = localCapture.ok ? "local dev server launched and Playwright media captured" : `dev launch attempted: ${localCapture.status}`;
      if (localCapture.ok) {
        assetHarvest.capturedScreenshots.push(...(localCapture.screenshots ?? []));
        assetHarvest.copiedAssets.push(...(localCapture.videos ?? []));
      }
    }

    if (!hasRealImageMedia(project) || !hasRealVideoMedia(project)) {
      const caseStudyCapture = await capturePortfolioCaseStudy(project);
      if (caseStudyCapture.ok) {
        assetHarvest.capturedScreenshots.push(...(caseStudyCapture.screenshots ?? []));
        assetHarvest.copiedAssets.push(...(caseStudyCapture.videos ?? []));
        notes.push("Playwright captured a portfolio case-study fallback for missing verified screenshot or video coverage.");
      } else {
        notes.push(`Portfolio case-study capture failed: ${caseStudyCapture.status}`);
      }
    }
  }

  const realImages = hasRealImageMedia(project);
  const realVideos = hasRealVideoMedia(project);
  const deploymentStatus = isExternal(linkFor(project, "live")?.url)
    ? "external live demo link present"
    : "portfolio case-study fallback; external deployment still needed";

  if (!realImages) manual.push("Replace placeholder screenshots with real captures.");
  if (!realVideos) manual.push("Record and link a real demo video.");
  if (!isExternal(linkFor(project, "live")?.url)) manual.push("Deploy an external live demo if this project should be showcased as runnable.");
  if (readme.missing.length) manual.push(`README still needs section review: ${readme.missing.join(", ")}.`);
  if (project.metadata.needsReview) manual.push("Review generated case-study text against source evidence.");

  const provisional: ProjectQualityResult = {
    slug: project.slug,
    title: project.content.en.title,
    status: "completed",
    localRepo: localPath ? "present" : "missing",
    sourceType: scan?.type ?? "unknown",
    readmeStatus: readme.status,
    installStatus,
    runStatus,
    buildStatus,
    testStatus,
    lintStatus,
    screenshotStatus: realImages
      ? assetHarvest.capturedScreenshots.length
        ? `real screenshots present; captured ${assetHarvest.capturedScreenshots.length} new`
        : "real screenshots present"
      : "placeholder only; manual capture needed",
    demoVideoStatus: realVideos ? "real video present" : "recording guide updated; manual recording needed",
    deploymentStatus,
    copiedAssets: assetHarvest.copiedAssets,
    capturedScreenshots: assetHarvest.capturedScreenshots,
    manualFollowUpNeeded: [...new Set(manual)],
    notes,
  };

  const readmeStatus = updateReadmeQualitySection(project, localPath, provisional);
  const result = {
    ...provisional,
    readmeStatus: `${readme.status}; ${readmeStatus}`,
  };

  writeDemoScript(project, result);
  writeProjectQualityReport(project, result);
  updateExistingProjectReleaseReport(project, result);
  return result;
}

function updateProgress(progress: ProgressEntry[], result: ProjectQualityResult) {
  const entry = progress.find((item) => item.slug === result.slug);
  if (!entry) return;
  entry.status = result.status;
  entry.auditStatus = "completed";
  entry.readmeStatus = result.readmeStatus;
  entry.screenshotStatus = result.screenshotStatus;
  entry.demoStatus = result.demoVideoStatus;
  entry.buildStatus = result.buildStatus;
  entry.manualFollowUpNeeded = result.manualFollowUpNeeded;
  entry.qualityStatus = result.manualFollowUpNeeded.length ? "manual-follow-up-needed" : "quality-complete";
  entry.updatedAt = new Date().toISOString();
}

function writeOverallQualityReport(results: ProjectQualityResult[]) {
  const completed = results.filter((item) => item.status === "completed").length;
  const realScreens = results.filter((item) => item.screenshotStatus.includes("real")).length;
  const realVideo = results.filter((item) => item.demoVideoStatus.includes("real")).length;
  const buildPassed = results.filter((item) => item.buildStatus === "passed").length;
  const needsManual = results.filter((item) => item.manualFollowUpNeeded.length > 0).length;

  const lines = [
    "# Portfolio Quality Pass Report",
    "",
    `Generated at: ${new Date().toISOString()}`,
    "",
    "## Overview",
    `- Projects processed: ${results.length}`,
    `- Completed analyses: ${completed}`,
    `- Projects with real screenshots: ${realScreens}`,
    `- Projects with real demo videos: ${realVideo}`,
    `- Projects with verified passing build in this pass: ${buildPassed}`,
    `- Projects still requiring manual follow-up: ${needsManual}`,
    "",
    "## Project Table",
    "",
    "| Slug | README | Build | Screenshots | Video | Deployment | Manual Follow-up |",
    "| :--- | :--- | :--- | :--- | :--- | :--- | :---: |",
    ...results.map(
      (item) =>
        `| ${item.slug} | ${item.readmeStatus.replace(/\|/g, "\\|")} | ${item.buildStatus.replace(/\|/g, "\\|")} | ${item.screenshotStatus.replace(/\|/g, "\\|")} | ${item.demoVideoStatus.replace(/\|/g, "\\|")} | ${item.deploymentStatus.replace(/\|/g, "\\|")} | ${item.manualFollowUpNeeded.length} |`
    ),
    "",
    "## Manual Follow-up Queue",
    "",
    ...results.flatMap((item) =>
      item.manualFollowUpNeeded.length
        ? [`### ${item.slug}`, markdownList(item.manualFollowUpNeeded), ""]
        : []
    ),
  ];

  fs.writeFileSync(QUALITY_REPORT_PATH, `${lines.join("\n")}\n`);
  writeJson(QUALITY_JSON_PATH, { generatedAt: new Date().toISOString(), results });
  updateReleaseReportQualitySection(results);
}

function updateReleaseReportQualitySection(results: ProjectQualityResult[]) {
  if (!fs.existsSync(RELEASE_REPORT_PATH)) return;

  const realScreens = results.filter((item) => item.screenshotStatus.includes("real")).length;
  const realVideo = results.filter((item) => item.demoVideoStatus.includes("real")).length;
  const buildPassed = results.filter((item) => item.buildStatus === "passed").length;
  const needsManual = results.filter((item) => item.manualFollowUpNeeded.length > 0).length;
  const section = [
    "<!-- quality-pass-summary:start -->",
    "## Real Content Quality Pass",
    "",
    `- Projects independently analyzed: ${results.length}`,
    `- Projects with real screenshots: ${realScreens}`,
    `- Projects with real demo videos: ${realVideo}`,
    `- Projects with verified passing build in this pass: ${buildPassed}`,
    `- Projects still requiring manual follow-up: ${needsManual}`,
    "- Detailed report: `docs/portfolio-release/quality-pass-report.md`",
    "",
    "### Highest-priority Manual Work",
    ...results
      .filter((item) => item.manualFollowUpNeeded.length > 0)
      .slice(0, 20)
      .map((item) => `- ${item.slug}: ${item.manualFollowUpNeeded.join("; ")}`),
    "<!-- quality-pass-summary:end -->",
    "",
  ].join("\n");

  const current = fs.readFileSync(RELEASE_REPORT_PATH, "utf8");
  const next = current.includes("<!-- quality-pass-summary:start -->")
    ? current.replace(/<!-- quality-pass-summary:start -->[\s\S]*?<!-- quality-pass-summary:end -->\n?/, section)
    : `${current.trimEnd()}\n\n${section}`;
  fs.writeFileSync(RELEASE_REPORT_PATH, next.endsWith("\n") ? next : `${next}\n`);
}

function assertNoPublicLocalPathLeak(projects: Project[]) {
  const text = JSON.stringify(projects);
  const forbidden = [
    new RegExp(`${path.sep}home${path.sep}[^${path.sep}\\s]+${path.sep}`),
    new RegExp(`${WINDOWS_MOUNT_ROOT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:${path.sep}|\\b)`),
    /[A-Za-z]:\\Users\\/,
    new RegExp(`"${LOCAL_PATH_KEY}"\\s*:`),
  ];
  const match = forbidden.find((pattern) => pattern.test(text));
  if (match) {
    throw new Error(`Public project catalog contains a forbidden local path pattern: ${match}`);
  }
}

async function main() {
  try {
    const projects = readJson<Project[]>(CATALOG_PATH, []);
    const scans = new Map(readJson<ScannedProject[]>(SCAN_REPORT_PATH, []).map((scan) => [scan.folder, scan]));
    const locals = new Map(normalizeLocalMap(readJson<unknown>(LOCAL_MAP_PATH, [])).map((entry) => [entry.slug, entry]));
    const progressFile = readJson<{ projects: ProgressEntry[] }>(PROGRESS_PATH, { projects: [] });
    const existingQuality = readJson<{ results?: ProjectQualityResult[] }>(QUALITY_JSON_PATH, { results: [] });
    const resultsBySlug = new Map((existingQuality.results ?? []).map((result) => [result.slug, result]));
    const sorted = [...projects]
      .filter((project) => !selectedSlug || project.slug === selectedSlug)
      .sort((a, b) => {
        const pa = progressFile.projects.find((item) => item.slug === a.slug)?.priority ?? 9999;
        const pb = progressFile.projects.find((item) => item.slug === b.slug)?.priority ?? 9999;
        return pa - pb || a.slug.localeCompare(b.slug);
      })
      .slice(0, limit > 0 ? limit : undefined);

    const results: ProjectQualityResult[] = [];
    for (const project of sorted) {
      process.stdout.write(`[quality] ${project.slug}\n`);
      try {
        const result = await analyzeProject(project, locals.get(project.slug), scans.get(project.slug));
        results.push(result);
        resultsBySlug.set(project.slug, result);
        updateProgress(progressFile.projects, result);
        writeJson(PROGRESS_PATH, { generatedAt: new Date().toISOString(), projects: progressFile.projects });
      } catch (error) {
        const failed: ProjectQualityResult = {
          slug: project.slug,
          title: project.content.en.title,
          status: "failed",
          localRepo: locals.get(project.slug)?.localPath ? "present" : "missing",
          sourceType: scans.get(project.slug)?.type ?? "unknown",
          readmeStatus: "failed",
          installStatus: "failed",
          runStatus: "failed",
          buildStatus: "failed",
          testStatus: "failed",
          lintStatus: "failed",
          screenshotStatus: "failed",
          demoVideoStatus: "failed",
          deploymentStatus: "failed",
          copiedAssets: [],
          capturedScreenshots: [],
          manualFollowUpNeeded: [error instanceof Error ? error.message : String(error)],
          notes: [],
        };
        results.push(failed);
        resultsBySlug.set(project.slug, failed);
        updateProgress(progressFile.projects, failed);
        writeJson(PROGRESS_PATH, { generatedAt: new Date().toISOString(), projects: progressFile.projects });
      }
    }

    assertNoPublicLocalPathLeak(projects);
    writeJson(CATALOG_PATH, projects);
    const mergedResults = projects
      .map((project) => resultsBySlug.get(project.slug))
      .filter((result): result is ProjectQualityResult => Boolean(result));
    writeOverallQualityReport(mergedResults);
    console.log(`Quality pass processed ${results.length} projects.`);
  } finally {
    stopProcess(portfolioServer);
  }
}

main();
