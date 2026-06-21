import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { normalizeTechTerm } from "../../src/lib/catalog/vocabulary";

const PORTFOLIO_ROOT = process.cwd();

interface ProjectScanResult {
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
  hasMedia: boolean;
  needsManualReview: boolean;
  suitability: string;
  confidence: number;
}

const PROJECT_ROOTS = [
  "/home/justin/web-projects",
  "/mnt/c/ai_projects",
];

const EXCLUDED_FOLDERS = [
  "justin-portfolio", // Skip the portfolio itself
  "node_modules",
  ".next",
  "dist",
  "build",
  "coverage",
  ".cache",
  "Library",
  "Temp",
  "Logs",
  "UserSettings",
  "obj",
  "bin",
  "target",
  "vendor",
  ".venv",
  "__pycache__",
  ".git",
];

const STANDALONE_PROJECT_PATHS = [
  "/home/justin/java-learning-lab",
  "/home/justin/lost-campus-3d",
  "/home/justin/unity-3d-course",
];

function getGitMetadata(dirPath: string) {
  const metadata = {
    remote: "",
    branch: "",
    lastCommitMessage: "",
    lastCommitDate: ""
  };

  if (!fs.existsSync(path.join(dirPath, ".git"))) {
    return metadata;
  }

  try {
    // Remote
    let remoteUrl = execSync("git config --get remote.origin.url", {
      cwd: dirPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (remoteUrl.startsWith("git@github.com:")) {
      remoteUrl = remoteUrl.replace("git@github.com:", "https://github.com/");
    } else if (remoteUrl.startsWith("git@")) {
      remoteUrl = remoteUrl.replace("git@", "https://").replace(":", "/");
    }
    remoteUrl = remoteUrl.replace(/\.git$/, "");
    metadata.remote = remoteUrl.replace(/https:\/\/.*@github\.com\//, "https://github.com/");
  } catch {}

  try {
    // Branch
    metadata.branch = execSync("git rev-parse --abbrev-ref HEAD", {
      cwd: dirPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {}

  try {
    // Last commit details
    metadata.lastCommitMessage = execSync("git log -1 --format=%s", {
      cwd: dirPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    metadata.lastCommitDate = execSync("git log -1 --format=%cI", {
      cwd: dirPath,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {}

  return metadata;
}

function analyzeProjectDir(dirPath: string, folderName: string): ProjectScanResult | null {
  try {
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) return null;

    const files = fs.readdirSync(dirPath);
    
    let type = "Other";
    const detectedStackSet = new Set<string>();
    let hasReadme = false;
    let readmeContent = "";
    let canBuild = false;
    let canRun = false;
    let hasMedia = false;
    let suitability = "Learning Exercise";
    let needsManualReview = true;
    let confidence = 0.7;

    // Read readme
    const readmeFile = files.find(f => f.toLowerCase() === "readme.md");
    if (readmeFile) {
      hasReadme = true;
      readmeContent = fs.readFileSync(path.join(dirPath, readmeFile), "utf8").slice(0, 3000); // read first 3k chars
    }

    hasMedia = files.some(file => {
      const lower = file.toLowerCase();
      return (
        lower.includes("screenshot") ||
        lower.includes("recording") ||
        lower.includes("demo") ||
        lower.endsWith(".png") ||
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".webp") ||
        lower.endsWith(".gif") ||
        lower.endsWith(".mp4") ||
        lower.endsWith(".webm")
      );
    });

    // Technology scanning
    if (files.includes("package.json")) {
      type = "Web/Node";
      const packageJson = fs.readFileSync(path.join(dirPath, "package.json"), "utf8");
      const pkg = packageJson.trim() ? JSON.parse(packageJson) : {};
      
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      
      // Match with controlled vocab or common frameworks
      Object.keys(deps).forEach(dep => {
        const norm = normalizeTechTerm(dep);
        if (norm.group !== "other") {
          detectedStackSet.add(norm.label);
        }
      });

      if (deps["react"]) detectedStackSet.add("React");
      if (deps["next"]) detectedStackSet.add("Next.js");
      if (deps["typescript"]) detectedStackSet.add("TypeScript");
      if (deps["tailwindcss"]) detectedStackSet.add("Tailwind CSS");
      if (deps["three"] || deps["@types/three"]) detectedStackSet.add("Three.js");
      if (deps["@react-three/fiber"]) detectedStackSet.add("React Three Fiber");
      if (deps["phaser"]) detectedStackSet.add("Phaser");

      canBuild = pkg.scripts?.build ? true : false;
      canRun = pkg.scripts?.dev || pkg.scripts?.start ? true : false;
      suitability = hasReadme ? "Needs Content" : "Prototype";
      confidence = 0.9;
    } else if (files.includes("pom.xml")) {
      type = "Java/Maven";
      detectedStackSet.add("Java");
      detectedStackSet.add("Maven");
      const content = fs.readFileSync(path.join(dirPath, "pom.xml"), "utf8");
      if (content.includes("spring-boot")) {
        detectedStackSet.add("Spring Boot");
      }
      canBuild = true;
      canRun = true;
      suitability = hasReadme ? "Needs Content" : "Prototype";
      confidence = 0.85;
    } else if (files.includes("build.gradle")) {
      type = "Java/Gradle";
      detectedStackSet.add("Java");
      detectedStackSet.add("Gradle");
      canBuild = true;
      suitability = "Needs Content";
    } else if (files.some(f => f.endsWith(".csproj"))) {
      type = "C#/.NET";
      detectedStackSet.add("C#");
      detectedStackSet.add(".NET");
      const csprojFile = files.find(f => f.endsWith(".csproj"))!;
      const content = fs.readFileSync(path.join(dirPath, csprojFile), "utf8");
      if (content.includes("Avalonia")) {
        detectedStackSet.add("Avalonia");
      }
      canBuild = true;
      suitability = hasReadme ? "Needs Content" : "Prototype";
      confidence = 0.85;
    } else if (files.includes("pyproject.toml") || files.includes("requirements.txt")) {
      type = "Python";
      detectedStackSet.add("Python");
      if (files.includes("requirements.txt")) {
        const reqs = fs.readFileSync(path.join(dirPath, "requirements.txt"), "utf8");
        if (reqs.includes("fastapi")) detectedStackSet.add("FastAPI");
        if (reqs.includes("plotly")) detectedStackSet.add("Plotly");
      }
      suitability = "Prototype";
      confidence = 0.8;
    } else if (files.includes("Cargo.toml")) {
      type = "Rust";
      detectedStackSet.add("Rust");
      suitability = "Learning Exercise";
    } else if (files.includes("ProjectSettings")) {
      type = "Unity";
      detectedStackSet.add("Unity");
      detectedStackSet.add("C#");
      suitability = hasReadme ? "Needs Content" : "Prototype";
      confidence = 0.9;
    }

    // Read git details
    const gitMeta = getGitMetadata(dirPath);
    const lastUpdate = gitMeta.lastCommitDate || stats.mtime.toISOString();

    // Map suitability based on known candidate list
    const knownCompleted = [
      "digital-archive-review-board",
      "ai-knowledge-workspace",
      "prism-runner-3d",
      "signal-diver-3d",
      "the-archive-that-watches-you",
      "campus-quest-3d",
      "libradesk",
      "library-seat-equipment-reservation",
      "datalab-studio",
      "modelops-dashboard",
      "data-narrative-studio",
      "highway-adventure-3d",
      "aqua-rush",
      "cafe-net-manager"
    ];

    if (knownCompleted.includes(folderName)) {
      suitability = "Portfolio Ready";
    }

    const hasUsefulReadme = readmeContent.trim().length > 240;
    const hasEvidence = hasUsefulReadme || hasMedia || gitMeta.remote;
    needsManualReview = !hasUsefulReadme || !hasEvidence || confidence < 0.85;
    if (!hasEvidence) {
      suitability = "Learning Exercise";
      confidence = Math.min(confidence, 0.55);
    }

    return {
      name: folderName.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      folder: folderName,
      path: dirPath,
      type,
      hasReadme,
      readmeContent: readmeContent.slice(0, 800), // Keep it compact for JSON
      detectedStack: Array.from(detectedStackSet),
      lastUpdate,
      gitRemote: gitMeta.remote,
      gitBranch: gitMeta.branch,
      gitLastCommitMessage: gitMeta.lastCommitMessage,
      canBuild,
      canRun,
      hasMedia,
      needsManualReview,
      suitability,
      confidence
    };
  } catch (e) {
    console.error(`Error analyzing ${dirPath}:`, e);
    return null;
  }
}

export function scan() {
  console.log("Starting project scanning...");
  const scannedProjects: ProjectScanResult[] = [];
  const projectPaths = new Set<string>();

  PROJECT_ROOTS.forEach(root => {
    if (!fs.existsSync(root)) {
      console.log(`Directory root not found or not accessible: ${root}`);
      return;
    }

    const folders = fs.readdirSync(root);
    folders.forEach(folder => {
      if (EXCLUDED_FOLDERS.includes(folder)) return;
      const folderPath = path.join(root, folder);
      
      // Only include folders that are tracked with Git (.git exists)
      if (!fs.existsSync(path.join(folderPath, ".git"))) return;
      projectPaths.add(folderPath);
    });
  });

  STANDALONE_PROJECT_PATHS.forEach(projectPath => {
    if (fs.existsSync(projectPath) && fs.existsSync(path.join(projectPath, ".git"))) {
      projectPaths.add(projectPath);
    }
  });

  Array.from(projectPaths).sort((a, b) => a.localeCompare(b)).forEach(projectPath => {
    const result = analyzeProjectDir(projectPath, path.basename(projectPath));
    if (result) {
      scannedProjects.push(result);
    }
  });

  // Make sure directories exist
  const outputDir = path.join(PORTFOLIO_ROOT, "data/generated");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const reportPath = path.join(outputDir, "project-scan-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(scannedProjects, null, 2), "utf8");
  console.log(`Successfully generated scan report at: ${reportPath}`);
  console.log(`Total scanned projects: ${scannedProjects.length}`);

  // Also write the documentation docs/project-inventory.md
  generateInventoryMarkdown(scannedProjects);
}

function generateInventoryMarkdown(projects: ProjectScanResult[]) {
  const docsDir = path.join(PORTFOLIO_ROOT, "docs");
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  let md = `# Project Inventory

This document is automatically generated by the project catalog sync pipeline.

| Project Name | Folder Name | Detected Stack | Last Update | Git Remote | README | Media | Can Build | Can Run | Suitability | Confidence | Needs Review |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- | :---: | :---: |
`;

  projects.forEach(p => {
    const stackStr = p.detectedStack.join(", ") || "Other";
    const lastUpdateDate = p.lastUpdate.slice(0, 10);
    const gitUrl = p.gitRemote ? `[Git](${p.gitRemote})` : "None";
    const hasReadmeStr = p.hasReadme ? "✅" : "❌";
    const hasMediaStr = p.hasMedia ? "✅" : "❌";
    const canBuildStr = p.canBuild ? "✅" : "❌";
    const canRunStr = p.canRun ? "✅" : "❌";
    const needsReviewStr = p.needsManualReview ? "✅" : "❌";
    
    md += `| ${p.name} | \`${p.folder}\` | ${stackStr} | ${lastUpdateDate} | ${gitUrl} | ${hasReadmeStr} | ${hasMediaStr} | ${canBuildStr} | ${canRunStr} | ${p.suitability} | ${p.confidence} | ${needsReviewStr} |\n`;
  });

  const inventoryPath = path.join(docsDir, "project-inventory.md");
  fs.writeFileSync(inventoryPath, md, "utf8");
  console.log(`Successfully generated Markdown project inventory at: ${inventoryPath}`);
}

// If run directly
if (require.main === module) {
  scan();
}
