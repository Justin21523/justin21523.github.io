import fs from "fs";
import path from "path";
import { ProjectSchema, ValidatedProject } from "../../src/lib/catalog/schema";
import { normalizeTechTerm } from "../../src/lib/catalog/vocabulary";

const PORTFOLIO_ROOT = "/home/justin/web-projects/justin-portfolio";
const SCAN_REPORT_PATH = path.join(PORTFOLIO_ROOT, "data/generated/project-scan-report.json");
const CONTENT_DIR = path.join(PORTFOLIO_ROOT, "content/projects");
const GENERATED_DIR = path.join(PORTFOLIO_ROOT, "src/generated");

interface ScannedProject {
  name: string;
  folder: string;
  path: string;
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

interface ParsedMarkdown {
  metadata: Record<string, FrontmatterValue>;
  body: string;
}

function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
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

function isUnverifiedAutoDemoLink(link: { kind?: string; url?: string }): boolean {
  return (
    link.kind === "live" &&
    typeof link.url === "string" &&
    link.url.includes("neojustin.dothost.net/p/")
  );
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
      const shouldPublish =
        scanData.suitability === "Portfolio Ready" &&
        scanData.hasReadme &&
        scanData.confidence >= 0.85 &&
        !scanData.needsManualReview;
      const defaultOverride = {
        visibility: shouldPublish ? "public" : "hidden",
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
    const coverImage = override.coverImage || `/portfolio/projects/${slug}/cover.webp`;
    const visibility = override.visibility || "hidden";

    // Skip non-public projects in final portfolio output
    if (visibility !== "public") {
      return;
    }

    // Stable Catalog Number generation
    const catCode = getCategoryCode(category);
    const nextIdx = (categoryIndexMap.get(category) || 0) + 1;
    categoryIndexMap.set(category, nextIdx);
    const indexStr = String(nextIdx).padStart(3, "0");
    const catalogNumber = override.catalogNumber || `PF-${year}-${catCode}-${indexStr}`;

    // Normalize Technologies
    const rawTechnologies: string[] = override.technologies || scanData.detectedStack || [];
    const normalizedTechs = Array.from(new Set(rawTechnologies.map(t => normalizeTechTerm(t).label)));
    const projectLinks = (override.links || []).filter(
      (link: { kind?: string; url?: string }) => !isUnverifiedAutoDemoLink(link)
    );
    const missingFields = new Set<string>(override.metadata?.missingFields || []);
    if (contentNeedsReview) {
      missingFields.add("reviewed bilingual case study");
    }
    if (!scanData.hasMedia && (!override.media || override.media.length === 0)) {
      missingFields.add("verified screenshots or demo media");
    }
    const reviewContent = contentNeedsReview
      ? buildReviewContent(scanData, normalizedTechs)
      : null;

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
      links: projectLinks,
      media: override.media || [],
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
        evidenceSources: [overridePath, zhPath, enPath, "git log"],
        lastScannedAt: new Date().toISOString()
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
          features: [],
          metrics: [],
          highlights: reviewContent?.en.highlights ?? asStringArray(enParsed.metadata.highlights),
          challenges: reviewContent?.en.challenges ?? asStringArray(enParsed.metadata.challenges),
          nextSteps: reviewContent?.en.nextSteps ?? asStringArray(enParsed.metadata.nextSteps)
        }
      }
    };

    // Validate using Zod schema
    const parseResult = ProjectSchema.safeParse(projectObject);
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
