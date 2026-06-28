import fs from "fs";
import path from "path";
import { ProjectSchema, ValidatedProject } from "../../src/lib/catalog/schema";
import { normalizeTechTerm } from "../../src/lib/catalog/vocabulary";

const PORTFOLIO_ROOT = process.cwd();
const SCAN_REPORT_PATH = path.join(PORTFOLIO_ROOT, "data/generated/project-scan-report.json");
const CONTENT_DIR = path.join(PORTFOLIO_ROOT, "content/projects");
const GENERATED_DIR = path.join(PORTFOLIO_ROOT, "src/generated");
const QUALITY_REPORT_PATH = path.join(PORTFOLIO_ROOT, "docs/portfolio-release/quality-pass-report.json");
const HOME_DIR = process.env.HOME || "";
const WINDOWS_MOUNT_ROOT = path.join(path.sep, "mnt", "c");
const LOCAL_PATH_KEY = "local" + "Path";

interface ScannedProject {
  name: string;
  folder: string;
  type: string;
  hasReadme: boolean;
  readmeContent: string;
  detectedStack: string[];
  lastUpdate: string;
  gitRemote: string;
  gitBranch: string;
  gitLastCommitMessage: string;
  canBuild: boolean;
  canRun: boolean;
  hasMedia?: boolean;
  needsManualReview?: boolean;
  suitability: string;
  confidence: number;
}

type FrontmatterValue = string | number | boolean | string[];

type ProjectLinkDraft = {
  kind: string;
  url: string;
  label: Record<"zh-TW" | "en", string>;
  primary?: boolean;
};

type ProjectMediaDraft = {
  id?: string;
  type?: string;
  src?: string;
  poster?: string;
  alt?: Record<"zh-TW" | "en", string>;
  title?: Record<"zh-TW" | "en", string>;
  caption?: Record<"zh-TW" | "en", string>;
  featured?: boolean;
  placeholder?: boolean;
};

type QualityProjectResult = {
  slug: string;
  screenshotStatus?: string;
  demoVideoStatus?: string;
  buildStatus?: string;
  copiedAssets?: string[];
  capturedScreenshots?: string[];
  manualFollowUpNeeded?: string[];
};

interface ParsedMarkdown {
  metadata: Record<string, FrontmatterValue>;
  body: string;
}

function scrubLocalPaths(value: string) {
  const escapedHome = HOME_DIR.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedWindowsRoot = WINDOWS_MOUNT_ROOT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value
    .replace(escapedHome ? new RegExp(`${escapedHome}\\/[^\\s)\`"'，。；,;]*`, "g") : /$a/, "[local-path]")
    .replace(new RegExp(`${escapedWindowsRoot}(?:\\/[^\\s)\`"'，。；,;]*)?`, "g"), "[local-path]")
    .replace(/[A-Za-z]:\\Users\\[^\\\s]+\\[^\s)`"']*/g, "[local-path]");
}

function sanitizePublicData<T>(value: T): T {
  if (typeof value === "string") {
    return scrubLocalPaths(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizePublicData(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== LOCAL_PATH_KEY && key !== "path").map(([key, entry]) => [
        key,
        sanitizePublicData(entry),
      ])
    ) as T;
  }

  return value;
}

function ensurePortfolioLinks(slug: string, scanData: ScannedProject, links: ProjectLinkDraft[], hideVideoLink = false) {
  const nextLinks = [...links];
  const githubUrl = nextLinks.find((link) => link.kind === "github")?.url || scanData.gitRemote;
  const githubRepoName = githubUrl?.match(/^https:\/\/github\.com\/Justin21523\/([^/#?]+)/i)?.[1]?.replace(/\.git$/, "");
  const liveDemoUrl = githubRepoName ? `https://justin21523.github.io/${githubRepoName}/` : "";

  const fallbackLinks = {
    live: {
      kind: "live",
      url: liveDemoUrl,
      label: { "zh-TW": "網站 Demo", en: "Live Demo" },
      primary: true,
    },
    github: {
      kind: "github",
      url: githubUrl || `/projects/${slug}#source-access`,
      label: githubUrl
        ? { "zh-TW": "查看 GitHub", en: "View GitHub" }
        : { "zh-TW": "原始碼狀態", en: "Source Status" },
    },
    video: {
      kind: "video",
      url: `/projects/${slug}#demo-video`,
      label: { "zh-TW": "錄影指南", en: "Recording Guide" },
    },
    documentation: {
      kind: "documentation",
      url: githubUrl ? `${githubUrl}#readme` : `/projects/${slug}#readme-guide`,
      label: githubUrl
        ? { "zh-TW": "README", en: "README" }
        : { "zh-TW": "文件指南", en: "Documentation Guide" },
    },
  } as const;

  (["github", "video", "documentation"] as const).forEach((kind) => {
    if (kind === "video" && hideVideoLink) {
      return;
    }

    if (!nextLinks.some((link) => link.kind === kind && link.url)) {
      nextLinks.push(fallbackLinks[kind]);
    }
  });
  if (!nextLinks.some((link) => link.kind === "live" && link.url) && liveDemoUrl) {
    nextLinks.push(fallbackLinks.live);
  }

  return nextLinks;
}

function linkByKind(links: ProjectLinkDraft[], kind: string) {
  return links.find((link) => link.kind === kind && link.url);
}

function isExternalUrl(url: string | undefined) {
  return Boolean(url && /^https?:\/\//.test(url));
}

function isInternalFallback(url: string | undefined) {
  return Boolean(url && url.startsWith("/projects/") && url.includes("#"));
}

function isPlaceholderAsset(url: string | undefined) {
  return Boolean(url && /placeholder/i.test(url));
}

function mediaHasRealItem(media: ProjectMediaDraft[] | undefined, type: "image" | "video") {
  return Boolean(
    media?.some((item) => item.type === type && item.src && !item.placeholder && !isPlaceholderAsset(item.src) && (isExternalUrl(item.src) || publicAssetExists(item.src)))
  );
}

function mediaSources(media: ProjectMediaDraft[] | undefined, type: "image" | "video") {
  return (media ?? [])
    .filter((item) => item.type === type && item.src && !isPlaceholderAsset(item.src) && (isExternalUrl(item.src) || publicAssetExists(item.src)))
    .map((item) => item.src as string);
}

function publicAssetExists(publicUrl: string | undefined) {
  if (!publicUrl?.startsWith("/")) {
    return false;
  }

  return fs.existsSync(path.join(PORTFOLIO_ROOT, "public", publicUrl.replace(/^\//, "")));
}

function extractedPosterUrlForVideo(videoUrl: string) {
  const parsed = path.posix.parse(videoUrl);
  return `${parsed.dir}/posters/${parsed.name}.webp`;
}

function posterUrlForVideo(videoUrl: string, fallbackImage: string | undefined) {
  const posterUrl = extractedPosterUrlForVideo(videoUrl);

  if (publicAssetExists(posterUrl)) {
    return posterUrl;
  }

  return fallbackImage;
}

function addVideoPosters(media: ProjectMediaDraft[]) {
  const fallbackImage = media.find((item) => item.type === "image" && item.src && !item.placeholder)?.src ??
    media.find((item) => item.type === "image" && item.src)?.src;

  return media.map((item) => {
    if (item.type !== "video" || !item.src) {
      return item;
    }

    const extractedPoster = extractedPosterUrlForVideo(item.src);

    return {
      ...item,
      poster: publicAssetExists(extractedPoster)
        ? extractedPoster
        : item.poster ?? fallbackImage,
    };
  });
}

function loadQualityResults() {
  if (!fs.existsSync(QUALITY_REPORT_PATH)) {
    return new Map<string, QualityProjectResult>();
  }

  const parsed = JSON.parse(fs.readFileSync(QUALITY_REPORT_PATH, "utf8")) as {
    results?: QualityProjectResult[];
  };

  return new Map((parsed.results ?? []).map((result) => [result.slug, result]));
}

function buildQualityMedia(slug: string, title: string, zhTitle: string, quality: QualityProjectResult | undefined, hideVideoLink = false) {
  const publicProjectDir = path.join(PORTFOLIO_ROOT, "public/projects", slug);
  const screenshotDir = path.join(publicProjectDir, "screenshots");
  const videoDir = path.join(publicProjectDir, "videos");
  const existingPublicUrls = fs.existsSync(publicProjectDir)
    ? (fs.existsSync(screenshotDir)
        ? fs
        .readdirSync(screenshotDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /\.(png|jpe?g|webp)$/i.test(entry.name))
        .map((entry) => `/projects/${slug}/screenshots/${entry.name}`)
        : []
      ).concat(
          !hideVideoLink && fs.existsSync(videoDir)
            ? fs
                .readdirSync(videoDir, { withFileTypes: true })
                .filter((entry) => entry.isFile() && /\.(mp4|webm)$/i.test(entry.name))
                .map((entry) => `/projects/${slug}/videos/${entry.name}`)
            : []
        )
    : [];

  const urls = Array.from(new Set([
    ...(hideVideoLink ? [] : (quality?.copiedAssets ?? [])),
    ...(quality?.capturedScreenshots ?? []),
    ...existingPublicUrls,
  ])).filter((url) => url.startsWith(`/projects/${slug}/`) && !url.includes("/videos/posters/") && publicAssetExists(url));

  const imageUrls = urls.filter((url) => /\.(png|jpe?g|webp)$/i.test(url));
  const firstImageUrl = imageUrls[0];

  let imageIndex = 1;
  let videoIndex = 1;

  return urls.flatMap<ProjectMediaDraft>((url) => {
    const lower = url.toLowerCase();
    if (/\.(png|jpe?g|webp)$/.test(lower)) {
      const index = imageIndex;
      imageIndex += 1;
      return [
        {
          id: `quality-image-${index}`,
          type: "image",
          src: url,
          alt: {
            "zh-TW": `${zhTitle} 的已驗證專案截圖。`,
            en: `${title} verified project screenshot.`,
          },
          title: {
            "zh-TW": `已驗證截圖 ${index}`,
            en: `Verified Screenshot ${index}`,
          },
          caption: {
            "zh-TW": "由 portfolio quality pass 從既有素材或可驗證 demo 擷取。",
            en: "Captured or copied by the portfolio quality pass from verified project evidence.",
          },
          featured: index === 1,
        },
      ];
    }

    if (!hideVideoLink && /\.(mp4|webm)$/.test(lower)) {
      const index = videoIndex;
      videoIndex += 1;
      return [
        {
          id: `quality-video-${index}`,
          type: "video",
          src: url,
          alt: {
            "zh-TW": `${zhTitle} 的已驗證 demo 錄影。`,
            en: `${title} verified demo recording.`,
          },
          title: {
            "zh-TW": `已驗證 Demo 錄影 ${index}`,
            en: `Verified Demo Recording ${index}`,
          },
          caption: {
            "zh-TW": "由 portfolio quality pass 從既有專案 demo 素材複製。",
            en: "Copied by the portfolio quality pass from existing project demo media.",
          },
          poster: posterUrlForVideo(url, firstImageUrl),
        },
      ];
    }

    return [];
  });
}

function isProjectVideoForSlug(slug: string, item: ProjectMediaDraft) {
  return item.type === "video" &&
    Boolean(item.src?.startsWith(`/projects/${slug}/videos/`));
}

function isLegacyPortfolioVideo(item: ProjectMediaDraft) {
  return item.type === "video" &&
    Boolean(item.src?.startsWith("/portfolio/projects/"));
}

function mergeMedia(slug: string, baseMedia: ProjectMediaDraft[], qualityMedia: ProjectMediaDraft[]) {
  const hasVerifiedProjectVideo = qualityMedia.some((item) => isProjectVideoForSlug(slug, item));
  const seen = new Set<string>();
  return [...baseMedia, ...qualityMedia].filter((item) => {
    if (!item.src || seen.has(item.src)) {
      return false;
    }

    // 若已經有新版 verified demo，就不要再把舊 portfolio demo 放進 detail video gallery。
    if (hasVerifiedProjectVideo && isLegacyPortfolioVideo(item)) {
      return false;
    }

    seen.add(item.src);
    return true;
  });
}

function qualityReleaseState(value: string | undefined, fallback: ReturnType<typeof statusFromBuildSignals>) {
  if (value === "passed" || value?.includes("real")) {
    return "verified";
  }

  if (value?.startsWith("failed")) {
    return "failed";
  }

  return fallback;
}

function statusFromBuildSignals(scanData: ScannedProject) {
  if (scanData.canBuild || scanData.canRun) {
    return "preparing";
  }

  return "missing";
}

function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function toRepoRelativePath(filePath: string) {
  return path.relative(PORTFOLIO_ROOT, filePath);
}

function parseMarkdown(content: string): ParsedMarkdown {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {
      metadata: {},
      body: content.trim()
    };
  }

  const yamlStr = match[1];
  const body = match[2].trim();
  const metadata: Record<string, FrontmatterValue> = {};

  const lines = yamlStr.split(/\r?\n/);
  let currentKey = "";
  for (const line of lines) {
    if (line.startsWith("  - ") || line.startsWith("    - ")) {
      if (currentKey) {
        if (!Array.isArray(metadata[currentKey])) {
          metadata[currentKey] = [];
        }
        const currentItems = metadata[currentKey];
        let itemVal = line.replace(/^\s*-\s*/, "").trim();
        if ((itemVal.startsWith('"') && itemVal.endsWith('"')) || (itemVal.startsWith("'") && itemVal.endsWith("'"))) {
          itemVal = itemVal.slice(1, -1);
        }
        if (Array.isArray(currentItems)) {
          currentItems.push(itemVal);
        }
      }
    } else {
      const colonIndex = line.indexOf(":");
      if (colonIndex !== -1) {
        currentKey = line.slice(0, colonIndex).trim();
        let valStr = line.slice(colonIndex + 1).trim();
        if (valStr) {
          if ((valStr.startsWith('"') && valStr.endsWith('"')) || (valStr.startsWith("'") && valStr.endsWith("'"))) {
            valStr = valStr.slice(1, -1);
          }
          if (valStr === "true") {
            metadata[currentKey] = true;
          } else if (valStr === "false") {
            metadata[currentKey] = false;
          } else if (!isNaN(Number(valStr)) && valStr !== "") {
            metadata[currentKey] = Number(valStr);
          } else {
            metadata[currentKey] = valStr;
          }
        }
      }
    }
  }

  return {
    metadata,
    body
  };
}

function asString(value: FrontmatterValue | undefined, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function asOptionalString(value: FrontmatterValue | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function asStringArray(value: FrontmatterValue | undefined): string[] {
  return Array.isArray(value) ? value : [];
}

function hasPlaceholderText(value: string | undefined): boolean {
  if (!value) {
    return true;
  }

  return [
    "這是一個精彩的開發作品",
    "在此描述專案",
    "技術挑戰一",
    "下一步計畫一",
    "Describe the core problem",
    "Technical challenge one",
    "Next step one",
    "No summary available",
  ].some((placeholder) => value.includes(placeholder));
}

function buildReviewContent(scanData: ScannedProject, stack: string[]) {
  const stackText = stack.length > 0 ? stack.join(", ") : "detected source files";
  const status =
    scanData.suitability ||
    "Needs Content";

  return {
    zh: {
      title: scanData.name,
      summary: `${scanData.name} 是從本機專案掃描納入的作品候選，目前仍需要人工補齊完整案例研究。已偵測到的技術線索包含：${stackText}。`,
      description: `這個專案已由 catalog pipeline 從本機資料夾、README、Git 資訊與技術設定中偵測到。由於內容尚未人工整理，公開頁面暫時只顯示安全摘要、偵測到的技術與 Metadata，不直接使用未審核的 README 文字。`,
      tagline: "已掃描的作品候選，等待人工整理完整案例。",
      role: "獨立開發者",
      problem: "此作品的問題背景仍需依實際程式碼與 README 人工確認。",
      solution: `目前偵測到的技術與架構線索包含：${stackText}。`,
      outcome: `目前分類狀態：${status}。`,
      highlights: [
        "已由本機 catalog pipeline 偵測到",
        "保留技術棧、Git 與來源證據",
        "需要人工補上專案目的、角色與完整案例"
      ],
      challenges: [
        "需要人工確認功能範圍與完成程度"
      ],
      nextSteps: [
        "補齊中文與英文案例研究",
        "確認 GitHub、Demo、截圖與文件是否可公開"
      ],
    },
    en: {
      title: scanData.name,
      summary: `${scanData.name} is a portfolio candidate detected from local source files. It still needs a reviewed case study. Detected technology signals include: ${stackText}.`,
      description: `This project was detected by the catalog pipeline from local folders, README content, Git metadata, and technology configuration. Because the content has not been manually reviewed yet, the public page shows a safe summary, detected stack, and metadata instead of exposing raw README text.`,
      tagline: "Scanned portfolio candidate pending a reviewed case study.",
      role: "Independent Developer",
      problem: "The project problem statement still needs review against the actual source code and README.",
      solution: `Detected technology and architecture signals include: ${stackText}.`,
      outcome: `Current catalog status: ${status}.`,
      highlights: [
        "Detected by the local catalog pipeline",
        "Keeps stack, Git, and source evidence",
        "Needs a reviewed purpose, role, and complete case study"
      ],
      challenges: [
        "Feature scope and completion level still need manual review"
      ],
      nextSteps: [
        "Complete the Chinese and English case study",
        "Verify whether GitHub, demo, screenshots, and documentation can be public"
      ],
    },
  };
}

// Resolve a cover image only if the file actually exists under public/.
// Returns undefined when no real cover is present so the UI shows its icon
// fallback instead of a broken image.
function resolveCoverImage(slug: string, overrideCover: unknown): string | undefined {
  const candidates: string[] = [];
  if (typeof overrideCover === "string" && overrideCover.length > 0) {
    candidates.push(overrideCover);
  }
  candidates.push(`/portfolio/projects/${slug}/cover.webp`);
  candidates.push(`/portfolio/projects/${slug}/cover.png`);
  for (const candidate of candidates) {
    const abs = path.join(PORTFOLIO_ROOT, "public", candidate.replace(/^\//, ""));
    if (fs.existsSync(abs)) {
      return candidate;
    }
  }
  return undefined;
}

function getCategoryCode(category: string): string {
  switch (category) {
    case "information-system": return "IS";
    case "interactive-3d": return "3D";
    case "ai-data": return "AI";
    case "frontend": return "FE";
    case "backend-desktop": return "BD";
    default: return "PR";
  }
}

function buildGeneratedCaseStudyContent(scanData: ScannedProject, stack: string[]) {
  const stackText = stack.length > 0 ? stack.join(", ") : "the detected source files";
  const runGuide = scanData.canRun
    ? "Install dependencies, start the project with its documented dev/start command, then verify the core workflow from the portfolio demo script."
    : "This project does not expose a verified runnable web command yet. Review the README/source tree and add exact install, run, test, and build commands before interview use.";
  const buildGuide = scanData.canBuild
    ? "Build support was detected from project configuration. Run the repo-specific build command before publishing new screenshots or demos."
    : "No verified build command was detected. Treat the current portfolio page as a case-study placeholder until build steps are reviewed.";

  return {
    zh: {
      targetUsers: [
        "作品集審閱者與面試官",
        "需要快速理解專案目的、技術棧與成熟度的技術讀者",
      ],
      technicalHighlights: [
        `偵測到的主要技術線索：${stackText}`,
        scanData.hasReadme ? "已有 README 作為後續補齊案例研究的依據" : "README 仍待補強，需以 source code audit 補齊說明",
        scanData.gitRemote ? "已連接公開 GitHub repository，可從作品集追溯原始碼" : "尚未確認公開 GitHub repository，作品集會先標示 GitHub 待補",
      ],
      architecture: `此專案目前由 portfolio catalog pipeline 依 README、Git metadata、package/build 設定與素材線索建立案例頁。正式架構說明仍需依實際 source code 補齊；目前可確認的技術線索包含：${stackText}。`,
      dataFlow: "目前尚未完成可公開的資料流程說明。若此專案含資料處理、AI pipeline 或後端 API，後續應補上 input、processing、storage、UI/output 的端到端流程。",
      projectStructure: `${scanData.folder}/\n  README.md              # project documentation, when available\n  source files           # implementation reviewed by local audit\n  package/build config   # detected capability signals`,
      setupGuide: `${runGuide}\n${buildGuide}`,
      futureImprovements: [
        "補齊正式 README、截圖與 demo recording",
        "補上架構圖、資料流程與關鍵技術決策",
        "確認 build/test 狀態並更新 portfolio release report",
      ],
      interviewNotes: [
        "先說明此專案目前的成熟度與可展示範圍",
        "聚焦在可驗證的技術棧、程式結構與已完成部分",
        "不要宣稱尚未部署、尚未錄影或尚未測試的能力已完成",
      ],
    },
    en: {
      targetUsers: [
        "Portfolio reviewers and interviewers",
        "Technical readers who need a quick view of purpose, stack, and maturity",
      ],
      technicalHighlights: [
        `Detected technical signals: ${stackText}`,
        scanData.hasReadme ? "README evidence exists and can support a fuller reviewed case study" : "README content still needs review and expansion from source evidence",
        scanData.gitRemote ? "A public GitHub repository is linked for source traceability" : "A public GitHub repository is not verified yet; the portfolio marks it as pending",
      ],
      architecture: `This case study is generated from the portfolio catalog pipeline using README, Git metadata, package/build configuration, and media signals. The final architecture narrative still needs source-level review. Current detected technology signals include: ${stackText}.`,
      dataFlow: "A public data-flow narrative is not fully reviewed yet. If the project includes data processing, AI pipelines, or backend APIs, the next pass should document input, processing, storage, and UI/output flow end to end.",
      projectStructure: `${scanData.folder}/\n  README.md              # project documentation, when available\n  source files           # implementation reviewed by local audit\n  package/build config   # detected capability signals`,
      setupGuide: `${runGuide}\n${buildGuide}`,
      futureImprovements: [
        "Complete the production-quality README, screenshots, and demo recording",
        "Add architecture diagrams, data-flow notes, and key technical decisions",
        "Verify build/test status and update the portfolio release report",
      ],
      interviewNotes: [
        "State the current maturity and demonstrable scope first",
        "Focus on verified stack, source structure, and completed behavior",
        "Do not claim unverified deployment, video, or test coverage as finished",
      ],
    },
  };
}

function extractMarkdownFromReadme(readmeContent: string | undefined, fallbackTitle: string) {
  let title = fallbackTitle;
  let tagline = "Needs manual summary";
  let summary = "This project was detected from local source files and still needs a reviewed portfolio summary.";
  let description = "This case study is pending manual review. Use the source evidence and README before publishing.";
  let highlights: string[] = [];

  if (readmeContent) {
    // Clean up basic markdown formatting
    const cleanLines = readmeContent
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => !line.startsWith("[!") && !line.startsWith("<!--"));

    // Title from first heading
    const firstHeading = cleanLines.find(line => line.startsWith("# "));
    if (firstHeading) {
      title = firstHeading.replace("# ", "").trim();
    }

    // Paragraphs
    const paragraphs = [];
    let currentParagraph = "";
    for (const line of cleanLines) {
      if (line.startsWith("#")) {
        if (currentParagraph) {
          paragraphs.push(currentParagraph);
          currentParagraph = "";
        }
      } else if (line === "") {
        if (currentParagraph) {
          paragraphs.push(currentParagraph);
          currentParagraph = "";
        }
      } else {
        currentParagraph += (currentParagraph ? " " : "") + line;
      }
    }
    if (currentParagraph) paragraphs.push(currentParagraph);

    // Cleaned paragraphs
    const cleanedParagraphs = paragraphs
      .map(p => p.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1").replace(/[*_`]/g, "").trim())
      .filter(p => p.length > 10);

    if (cleanedParagraphs.length > 0) {
      tagline = cleanedParagraphs[0].slice(0, 80) + (cleanedParagraphs[0].length > 80 ? "..." : "");
      summary = cleanedParagraphs[0].slice(0, 160) + (cleanedParagraphs[0].length > 160 ? "..." : "");
      description = cleanedParagraphs.slice(0, 5).join("\n\n");
    }

    // Try to find highlights
    const bulletLines = cleanLines.filter(line => line.startsWith("- ") || line.startsWith("* "));
    if (bulletLines.length > 0) {
      highlights = bulletLines.slice(0, 4).map(line => line.replace(/^[-*]\s+/, ""));
    }
  }

  if (highlights.length === 0) {
    highlights = ["包含完整原始碼", "採用現代技術架構開發", "支援響應式網頁介面"];
  }

  return {
    title,
    tagline,
    summary,
    description,
    highlights
  };
}

export function sync() {
  console.log("Syncing portfolio catalog...");
  ensureDirExists(GENERATED_DIR);
  ensureDirExists(CONTENT_DIR);

  if (!fs.existsSync(SCAN_REPORT_PATH)) {
    console.error(`Scanned project report not found: ${SCAN_REPORT_PATH}. Run scan first!`);
    return;
  }

  const scanned: ScannedProject[] = JSON.parse(fs.readFileSync(SCAN_REPORT_PATH, "utf8"));
  const qualityBySlug = loadQualityResults();
  
  // Sort scanned projects alphabetically by slug (folder name) to assign stable catalog numbers
  scanned.sort((a, b) => a.folder.localeCompare(b.folder));

  const categoryIndexMap = new Map<string, number>();
  const finalProjects: ValidatedProject[] = [];

  scanned.forEach((scanData) => {
    const slug = scanData.folder;
    const projectDir = path.join(CONTENT_DIR, slug);
    ensureDirExists(projectDir);

    // Paths for override and markdown translations
    const overridePath = path.join(projectDir, "project.override.json");
    const zhPath = path.join(projectDir, "zh-TW.md");
    const enPath = path.join(projectDir, "en.md");

    // Initialize files if they do not exist to make it easier for user override
    if (!fs.existsSync(overridePath)) {
      const hasPublicRepository = scanData.gitRemote.startsWith("https://github.com/");
      const defaultOverride = {
        visibility: "public",
        featured: false,
        category: slug.includes("3d") || slug.includes("game") || slug.includes("quest") || slug.includes("adventure") ? "interactive-3d" : 
                  slug.includes("data") || slug.includes("ai") || slug.includes("analysis") ? "ai-data" : "information-system",
        status: scanData.suitability === "Portfolio Ready" ? "completed" : "prototype",
        year: 2026,
        technologies: scanData.detectedStack,
        coverImage: `/portfolio/projects/${slug}/cover.webp`,
        links: [
          ...(hasPublicRepository ? [
            {
              kind: "github",
              url: scanData.gitRemote,
              label: { "zh-TW": "查看 GitHub", "en": "View GitHub" }
            }
          ] : [])
        ],
        metadata: {
          needsReview: true,
          missingFields: [
            "reviewed zh-TW case study",
            "reviewed English case study",
            "verified media assets",
            "verified public links"
          ]
        }
      };
      fs.writeFileSync(overridePath, JSON.stringify(defaultOverride, null, 2), "utf8");
    }

    const readmeInfo = extractMarkdownFromReadme(scanData.readmeContent, scanData.name);

    if (!fs.existsSync(zhPath)) {
      const defaultZh = `---
title: "${readmeInfo.title}"
tagline: "${readmeInfo.tagline.replace(/"/g, '\\"')}"
summary: "${readmeInfo.summary.replace(/"/g, '\\"')}"
role: "獨立開發者"
problem: "此欄位需要依 README 與實際程式碼人工確認。"
solution: "此欄位需要依 ${scanData.detectedStack.join(", ") || "實際技術棧"} 與系統架構人工補寫。"
highlights:
${readmeInfo.highlights.map(h => `  - "${h.replace(/"/g, '\\"')}"`).join("\n")}
challenges:
  - "需要補充真實技術挑戰。"
nextSteps:
  - "補齊截圖、Demo 與完整案例研究。"
---
${readmeInfo.description}
`;
      fs.writeFileSync(zhPath, defaultZh, "utf8");
    }

    if (!fs.existsSync(enPath)) {
      const defaultEn = `---
title: "${readmeInfo.title}"
tagline: "${readmeInfo.tagline.replace(/"/g, '\\"')}"
summary: "${readmeInfo.summary.replace(/"/g, '\\"')}"
role: "Independent Developer"
problem: "This field needs review against the README and source code."
solution: "This field needs a reviewed architecture summary based on ${scanData.detectedStack.join(", ") || "the detected stack"}."
highlights:
${readmeInfo.highlights.map(h => `  - "${h.replace(/"/g, '\\"')}"`).join("\n")}
challenges:
  - "Add verified engineering challenges."
nextSteps:
  - "Add screenshots, demo material, and a complete case study."
---
${readmeInfo.description}
`;
      fs.writeFileSync(enPath, defaultEn, "utf8");
    }

    // Load content
    const override = JSON.parse(fs.readFileSync(overridePath, "utf8"));
    const zhContentRaw = fs.readFileSync(zhPath, "utf8");
    const enContentRaw = fs.readFileSync(enPath, "utf8");

    const zhParsed = parseMarkdown(zhContentRaw);
    const enParsed = parseMarkdown(enContentRaw);
    const zhSummary = asString(zhParsed.metadata.summary, "無專案簡介");
    const enSummary = asString(enParsed.metadata.summary, "No summary available");
    const zhProblem = asString(zhParsed.metadata.problem, "無描述");
    const enProblem = asString(enParsed.metadata.problem, "No description");
    const contentNeedsReview =
      hasPlaceholderText(zhSummary) ||
      hasPlaceholderText(enSummary) ||
      hasPlaceholderText(zhProblem) ||
      hasPlaceholderText(enProblem) ||
      zhParsed.body.trim().length < 80 ||
      enParsed.body.trim().length < 80;

    // Merge structural metadata
    const category = override.category || "information-system";
    const status = override.status || "completed";
    const year = override.year || 2026;
    const featured = override.featured || false;
    let coverImage = resolveCoverImage(slug, override.coverImage);
    const visibility = "public";

    // Stable Catalog Number generation
    const catCode = getCategoryCode(category);
    const nextIdx = (categoryIndexMap.get(category) || 0) + 1;
    categoryIndexMap.set(category, nextIdx);
    const indexStr = String(nextIdx).padStart(3, "0");
    const catalogNumber = override.catalogNumber || `PF-${year}-${catCode}-${indexStr}`;

    // Normalize Technologies
    const rawTechnologies: string[] = override.technologies || scanData.detectedStack || [];
    const normalizedTechs = Array.from(new Set(rawTechnologies.map(t => normalizeTechTerm(t).label)));
    const qualityResult = qualityBySlug.get(slug);
    const zhTitleForMedia = asString(zhParsed.metadata.title, scanData.name);
    const enTitleForMedia = asString(enParsed.metadata.title, scanData.name);
    const hideVideoLink = Boolean(override.hideVideoLink);
    const qualityMedia = buildQualityMedia(slug, enTitleForMedia, zhTitleForMedia, qualityResult, hideVideoLink);
    const media = addVideoPosters(mergeMedia(slug, (override.media || []) as ProjectMediaDraft[], qualityMedia));
    const firstQualityImage = media.find((item) => item.type === "image" && item.src)?.src;
    if (!coverImage && firstQualityImage) {
      coverImage = firstQualityImage;
    }

    const projectLinks = ensurePortfolioLinks(slug, scanData, override.links || [], hideVideoLink);
    const firstQualityVideo =
      media.find((item) => item.type === "video" && item.src?.startsWith(`/projects/${slug}/videos/`) && !isPlaceholderAsset(item.src) && publicAssetExists(item.src))?.src ??
      media.find((item) => item.type === "video" && item.src && !isPlaceholderAsset(item.src) && (isExternalUrl(item.src) || publicAssetExists(item.src)))?.src;
    const videoLinkDraft = linkByKind(projectLinks, "video");
    if (firstQualityVideo && videoLinkDraft && !isExternalUrl(videoLinkDraft.url)) {
      videoLinkDraft.url = firstQualityVideo;
      videoLinkDraft.label = { "zh-TW": "Demo 錄影", en: "Demo Recording" };
    }
    const githubLink = linkByKind(projectLinks, "github")?.url;
    const liveLink = linkByKind(projectLinks, "live")?.url;
    const videoLink = linkByKind(projectLinks, "video")?.url;
    const readmeLink = linkByKind(projectLinks, "documentation")?.url;
    const hasRealImages = mediaHasRealItem(media, "image");
    const hasRealVideo = mediaHasRealItem(media, "video") || isExternalUrl(videoLink);
    const hasRealDemo = isExternalUrl(liveLink);
    const screenshotSources = mediaSources(media, "image");
    const videoSources = Array.from(new Set([
      ...(firstQualityVideo ? [firstQualityVideo] : []),
      ...mediaSources(media, "video"),
    ]));
    const heroImage = coverImage || `/projects/${slug}/hero.png`;
    const missingFields = new Set<string>(override.metadata?.missingFields || []);
    if (contentNeedsReview) {
      missingFields.add("reviewed bilingual case study");
    }
    if (!scanData.hasMedia && (!override.media || override.media.length === 0)) {
      missingFields.add("verified screenshots or demo media");
    }
    if (!isExternalUrl(githubLink)) {
      missingFields.add("verified GitHub repository");
    }
    if (!hasRealDemo && !isInternalFallback(liveLink)) {
      missingFields.add("verified live demo or portfolio demo guide");
    }
    if (!hasRealVideo) {
      missingFields.add("demo video recording");
    }
    const reviewContent = contentNeedsReview
      ? buildReviewContent(scanData, normalizedTechs)
      : null;
    const generatedCaseStudy = buildGeneratedCaseStudyContent(scanData, normalizedTechs);

    // Create final Project structure
    const projectObject = {
      id: override.id || `project-${slug}-${catalogNumber.toLowerCase()}`,
      slug,
      category,
      status,
      year,
      featured,
      technologies: normalizedTechs,
      coverImage,
      subtitle: asOptionalString(enParsed.metadata.tagline),
      githubUrl: isExternalUrl(githubLink) ? githubLink : undefined,
      liveDemoUrl: hasRealDemo ? liveLink : undefined,
      demoVideoUrl: hasRealVideo && isExternalUrl(videoLink) ? videoLink : undefined,
      readmeUrl: isExternalUrl(readmeLink) ? readmeLink : undefined,
      heroImage,
      screenshots: screenshotSources.length > 0 ? screenshotSources : [`/projects/${slug}/screenshots/01-overview.png`],
      videoUrl: videoSources[0] ?? (isExternalUrl(videoLink) ? videoLink : undefined),
      videoEmbedUrl: hasRealVideo && isExternalUrl(videoLink) ? videoLink : undefined,
      links: projectLinks,
      media,
      metadata: {
        startedAt: override.metadata?.startedAt || scanData.lastUpdate.slice(0, 10),
        updatedAt: override.metadata?.updatedAt || new Date().toISOString().slice(0, 10),
        completedAt: override.metadata?.completedAt || undefined,
        duration: override.metadata?.duration || undefined,
        teamSize: override.metadata?.teamSize || 1,
        version: override.metadata?.version || "1.0.0",
        
        catalogNumber,
        visibility,
        aliases: override.metadata?.aliases || [],
        primaryCategory: category,
        secondaryCategories: override.metadata?.secondaryCategories || [],
        projectType: override.metadata?.projectType || scanData.type,
        domains: override.metadata?.domains || [],
        subjects: override.metadata?.subjects || [],
        controlledTerms: normalizedTechs,
        keywords: override.metadata?.keywords || [],
        audiences: override.metadata?.audiences || [],
        contentTypes: override.metadata?.contentTypes || [],
        dataTypes: override.metadata?.dataTypes || [],
        platforms: override.metadata?.platforms || ["Web"],
        operatingSystems: override.metadata?.operatingSystems || [],
        
        languages: override.metadata?.languages || (scanData.type === "C#/.NET" ? ["C#"] : scanData.type === "Java/Maven" ? ["Java"] : ["JavaScript", "TypeScript"]),
        frameworks: override.metadata?.frameworks || [],
        libraries: override.metadata?.libraries || [],
        stateManagement: override.metadata?.stateManagement || [],
        styling: override.metadata?.styling || [],
        database: override.metadata?.database || [],
        backend: override.metadata?.backend || [],
        desktop: override.metadata?.desktop || [],
        gameEngine: override.metadata?.gameEngine || [],
        threeD: override.metadata?.threeD || [],
        testing: override.metadata?.testing || [],
        buildTools: override.metadata?.buildTools || [],
        infrastructure: override.metadata?.infrastructure || [],
        deployment: override.metadata?.deployment || [],
        developmentTools: override.metadata?.developmentTools || [],
        
        roles: override.metadata?.roles || [asString(zhParsed.metadata.role, "Developer")],
        responsibilities: override.metadata?.responsibilities || [],
        collaborationType: override.metadata?.collaborationType || "Solo",
        myContribution: override.metadata?.myContribution || undefined,
        learningGoals: override.metadata?.learningGoals || [],
        skillsDemonstrated: override.metadata?.skillsDemonstrated || normalizedTechs,
        capabilities: override.metadata?.capabilities || [],
        tools: override.metadata?.tools || [],

        hasUnitTests: override.metadata?.hasUnitTests || false,
        hasIntegrationTests: override.metadata?.hasIntegrationTests || false,
        hasE2ETests: override.metadata?.hasE2ETests || false,
        accessibilityNotes: override.metadata?.accessibilityNotes || undefined,
        performanceNotes: override.metadata?.performanceNotes || undefined,
        responsive: override.metadata?.responsive ?? true,
        browserSupport: override.metadata?.browserSupport || [],
        codeQualityTools: override.metadata?.codeQualityTools || [],

        relatedProjects: override.metadata?.relatedProjects || [],
        parentProject: override.metadata?.parentProject || undefined,
        subprojects: override.metadata?.subprojects || [],
        successorProjects: override.metadata?.successorProjects || [],
        usesPackages: override.metadata?.usesPackages || [],
        inspiredBy: override.metadata?.inspiredBy || [],
        dependencies: override.metadata?.dependencies || [],

        extractionConfidence: scanData.confidence,
        needsReview: override.metadata?.needsReview ?? scanData.needsManualReview ?? contentNeedsReview,
        missingFields: Array.from(missingFields),
        evidenceSources: [
          toRepoRelativePath(overridePath),
          toRepoRelativePath(zhPath),
          toRepoRelativePath(enPath),
          "git log",
        ],
        lastScannedAt: new Date().toISOString(),
        localAuditStatus: scanData.needsManualReview || contentNeedsReview ? "needs-review" : "matched",
        releaseStatus: {
          audit: "preparing",
          readme: scanData.hasReadme ? "verified" : "preparing",
          screenshots: hasRealImages ? "verified" : "preparing",
          demo: hasRealDemo ? "verified" : "preparing",
          video: hasRealVideo ? "verified" : "preparing",
          portfolioPage: "verified",
          links: "preparing",
          build: qualityReleaseState(qualityResult?.buildStatus, statusFromBuildSignals(scanData)),
          manualFollowUpNeeded: qualityResult?.manualFollowUpNeeded ?? Array.from(missingFields),
        },
      },
      content: {
        "zh-TW": {
          title: reviewContent?.zh.title ?? asString(zhParsed.metadata.title, scanData.name),
          summary: reviewContent?.zh.summary ?? zhSummary,
          description: reviewContent?.zh.description ?? zhParsed.body,
          tagline: reviewContent?.zh.tagline ?? asOptionalString(zhParsed.metadata.tagline),
          role: reviewContent?.zh.role ?? asString(zhParsed.metadata.role, "開發者"),
          problem: reviewContent?.zh.problem ?? zhProblem,
          solution: reviewContent?.zh.solution ?? asString(zhParsed.metadata.solution, "無描述"),
          outcome: reviewContent?.zh.outcome ?? asOptionalString(zhParsed.metadata.outcome),
          targetUsers: override.content?.["zh-TW"]?.targetUsers ?? override.content?.targetUsers ?? generatedCaseStudy.zh.targetUsers,
          technicalHighlights: override.content?.["zh-TW"]?.technicalHighlights ?? override.content?.technicalHighlights ?? generatedCaseStudy.zh.technicalHighlights,
          architecture: override.content?.["zh-TW"]?.architecture ?? override.content?.architecture ?? generatedCaseStudy.zh.architecture,
          dataFlow: override.content?.["zh-TW"]?.dataFlow ?? override.content?.dataFlow ?? generatedCaseStudy.zh.dataFlow,
          projectStructure: override.content?.["zh-TW"]?.projectStructure ?? override.content?.projectStructure ?? generatedCaseStudy.zh.projectStructure,
          setupGuide: override.content?.["zh-TW"]?.setupGuide ?? override.content?.setupGuide ?? generatedCaseStudy.zh.setupGuide,
          futureImprovements: override.content?.["zh-TW"]?.futureImprovements ?? override.content?.futureImprovements ?? generatedCaseStudy.zh.futureImprovements,
          interviewNotes: override.content?.["zh-TW"]?.interviewNotes ?? override.content?.interviewNotes ?? generatedCaseStudy.zh.interviewNotes,
          features: [],
          metrics: [],
          highlights: reviewContent?.zh.highlights ?? asStringArray(zhParsed.metadata.highlights),
          challenges: reviewContent?.zh.challenges ?? asStringArray(zhParsed.metadata.challenges),
          nextSteps: reviewContent?.zh.nextSteps ?? asStringArray(zhParsed.metadata.nextSteps)
        },
        en: {
          title: reviewContent?.en.title ?? asString(enParsed.metadata.title, scanData.name),
          summary: reviewContent?.en.summary ?? enSummary,
          description: reviewContent?.en.description ?? enParsed.body,
          tagline: reviewContent?.en.tagline ?? asOptionalString(enParsed.metadata.tagline),
          role: reviewContent?.en.role ?? asString(enParsed.metadata.role, "Developer"),
          problem: reviewContent?.en.problem ?? enProblem,
          solution: reviewContent?.en.solution ?? asString(enParsed.metadata.solution, "No description"),
          outcome: reviewContent?.en.outcome ?? asOptionalString(enParsed.metadata.outcome),
          targetUsers: override.content?.en?.targetUsers ?? override.content?.targetUsers ?? generatedCaseStudy.en.targetUsers,
          technicalHighlights: override.content?.en?.technicalHighlights ?? override.content?.technicalHighlights ?? generatedCaseStudy.en.technicalHighlights,
          architecture: override.content?.en?.architecture ?? override.content?.architecture ?? generatedCaseStudy.en.architecture,
          dataFlow: override.content?.en?.dataFlow ?? override.content?.dataFlow ?? generatedCaseStudy.en.dataFlow,
          projectStructure: override.content?.en?.projectStructure ?? override.content?.projectStructure ?? generatedCaseStudy.en.projectStructure,
          setupGuide: override.content?.en?.setupGuide ?? override.content?.setupGuide ?? generatedCaseStudy.en.setupGuide,
          futureImprovements: override.content?.en?.futureImprovements ?? override.content?.futureImprovements ?? generatedCaseStudy.en.futureImprovements,
          interviewNotes: override.content?.en?.interviewNotes ?? override.content?.interviewNotes ?? generatedCaseStudy.en.interviewNotes,
          features: [],
          metrics: [],
          highlights: reviewContent?.en.highlights ?? asStringArray(enParsed.metadata.highlights),
          challenges: reviewContent?.en.challenges ?? asStringArray(enParsed.metadata.challenges),
          nextSteps: reviewContent?.en.nextSteps ?? asStringArray(enParsed.metadata.nextSteps)
        }
      }
    };

    const publicProjectObject = sanitizePublicData(projectObject);

    // Validate using Zod schema
    const parseResult = ProjectSchema.safeParse(publicProjectObject);
    if (!parseResult.success) {
      console.error(`Validation failed for project: ${slug}`);
      console.error(JSON.stringify(parseResult.error.format(), null, 2));
      process.exit(1);
    }

    finalProjects.push(parseResult.data);
  });

  // Write merged catalog JSON
  const catalogPath = path.join(GENERATED_DIR, "project-catalog.json");
  fs.writeFileSync(catalogPath, JSON.stringify(finalProjects, null, 2), "utf8");
  console.log(`Saved validated catalog of ${finalProjects.length} projects to ${catalogPath}`);

  // Generate taxonomy file
  generateTaxonomy(finalProjects);

  // Generate search index
  generateSearchIndex(finalProjects);
}

function generateTaxonomy(projects: ValidatedProject[]) {
  const categories = Array.from(new Set(projects.map(p => p.category)));
  const statuses = Array.from(new Set(projects.map(p => p.status)));
  const years = Array.from(new Set(projects.map(p => p.year))).sort((a, b) => b - a);
  const technologies = Array.from(new Set(projects.flatMap(p => p.technologies))).sort((a, b) => a.localeCompare(b));
  const domains = Array.from(new Set(projects.flatMap(p => p.metadata.domains))).sort((a, b) => a.localeCompare(b));
  const platforms = Array.from(new Set(projects.flatMap(p => p.metadata.platforms))).sort((a, b) => a.localeCompare(b));
  const capabilities = Array.from(new Set(projects.flatMap(p => p.metadata.capabilities))).sort((a, b) => a.localeCompare(b));
  const roles = Array.from(new Set(projects.flatMap(p => p.metadata.roles))).sort((a, b) => a.localeCompare(b));

  const taxonomy = {
    categories,
    statuses,
    years,
    technologies,
    domains,
    platforms,
    capabilities,
    roles
  };

  const taxonomyPath = path.join(GENERATED_DIR, "project-taxonomy.json");
  fs.writeFileSync(taxonomyPath, JSON.stringify(taxonomy, null, 2), "utf8");
  console.log(`Saved taxonomy file to ${taxonomyPath}`);
}

function generateSearchIndex(projects: ValidatedProject[]) {
  // Simple build-time search index map
  const searchIndex = projects.map(p => {
    return {
      slug: p.slug,
      id: p.id,
      catalogNumber: p.metadata.catalogNumber,
      year: p.year,
      category: p.category,
      status: p.status,
      technologies: p.technologies,
      
      // zh-TW fields
      title_zh: p.content["zh-TW"].title,
      tagline_zh: p.content["zh-TW"].tagline || "",
      summary_zh: p.content["zh-TW"].summary,
      description_zh: p.content["zh-TW"].description,
      role_zh: p.content["zh-TW"].role,
      problem_zh: p.content["zh-TW"].problem,
      solution_zh: p.content["zh-TW"].solution,
      highlights_zh: p.content["zh-TW"].highlights.join(" "),
      
      // en fields
      title_en: p.content.en.title,
      tagline_en: p.content.en.tagline || "",
      summary_en: p.content.en.summary,
      description_en: p.content.en.description,
      role_en: p.content.en.role,
      problem_en: p.content.en.problem,
      solution_en: p.content.en.solution,
      highlights_en: p.content.en.highlights.join(" "),

      // Structural lists
      domains: p.metadata.domains,
      keywords: p.metadata.keywords,
      capabilities: p.metadata.capabilities,
      tools: p.metadata.tools,
      aliases: p.metadata.aliases
    };
  });

  const indexPath = path.join(GENERATED_DIR, "project-search-index.json");
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2), "utf8");
  console.log(`Saved search index of ${projects.length} entries to ${indexPath}`);
}

if (require.main === module) {
  sync();
}
