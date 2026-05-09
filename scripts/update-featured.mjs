import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve("data/projects.json");
if (!fs.existsSync(projectsPath)) {
  console.error("Projects file not found.");
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

const featuredSlugs = new Set([
  "ai-dispatch-center",
  "ai-gen-hub",
  "information-retrieval",
  "html-css-interactive-lab",
  "rigview3d",
  "traffic-pulse",
  "tripscore",
  "vanilla-dom-playground"
]);

const updatedProjects = projects.map(p => ({
  ...p,
  featured: featuredSlugs.has(p.slug)
}));

fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));
console.log("Updated featured projects.");