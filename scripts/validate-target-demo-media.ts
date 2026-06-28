import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const START = "AutoForge-llm-studio";
const END = "web-auto-concepts";
const MIN_SCREENSHOTS = 8;

type Project = {
  slug: string;
  links?: Array<{ kind: string; url: string }>;
};

function readJson<T>(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function targetProjects(projects: Project[]) {
  const start = projects.findIndex((project) => project.slug === START);
  const end = projects.findIndex((project) => project.slug === END);
  if (start === -1 || end === -1) {
    throw new Error(`Unable to resolve target range ${START} -> ${END}`);
  }
  return projects.slice(Math.min(start, end), Math.max(start, end) + 1);
}

function countFiles(dirPath: string, pattern: RegExp) {
  if (!fs.existsSync(dirPath)) return 0;
  return fs.readdirSync(dirPath, { withFileTypes: true }).filter((entry) => entry.isFile() && pattern.test(entry.name)).length;
}

function main() {
  const projects = targetProjects(readJson<Project[]>(CATALOG_PATH));
  const errors: string[] = [];

  for (const project of projects) {
    const live = project.links?.find((link) => link.kind === "live")?.url ?? "";
    if (!/^https?:\/\//.test(live)) {
      errors.push(`${project.slug} live demo is not external: ${live || "(missing)"}`);
    }
    if (/#demo-guide/.test(live)) {
      errors.push(`${project.slug} live demo points to portfolio fallback: ${live}`);
    }

    const projectRoot = path.join(ROOT, "public/projects", project.slug);
    const screenshots = countFiles(path.join(projectRoot, "screenshots"), /\.(png|jpe?g|webp)$/i);
    const videos = countFiles(path.join(projectRoot, "videos"), /\.(mp4|webm)$/i);
    const posters = countFiles(path.join(projectRoot, "videos", "posters"), /\.(png|jpe?g|webp)$/i);

    if (screenshots < MIN_SCREENSHOTS) {
      errors.push(`${project.slug} has ${screenshots} screenshots; expected at least ${MIN_SCREENSHOTS}`);
    }
    if (videos < 1) {
      errors.push(`${project.slug} has no demo video`);
    }
    if (posters < 1) {
      errors.push(`${project.slug} has no demo video poster`);
    }
  }

  if (errors.length > 0) {
    console.error("Target demo media validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(`Validated ${projects.length} target demos with external live URLs, ${MIN_SCREENSHOTS}+ screenshots, video, and poster.`);
}

main();
