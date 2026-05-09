import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve("data/projects.json");
if (!fs.existsSync(projectsPath)) {
  console.error("Projects file not found.");
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

// The Top 5 Visual Projects (Updated)
const featuredSlugs = [
  "threejs-product-viewer",
  "video-gen-factory",
  "school-library-lms",
  "procedural-3d-maze",
  "mrt-ubike-analysis" // Replaced 3d-rendering-showcase
];

const featuredSet = new Set(featuredSlugs);

const updatedProjects = projects.map(p => ({
  ...p,
  featured: featuredSet.has(p.slug)
}));

// Sort: Featured first (in the specific order above), then alphabetical
updatedProjects.sort((a, b) => {
  const aIndex = featuredSlugs.indexOf(a.slug);
  const bIndex = featuredSlugs.indexOf(b.slug);

  // If both are featured, sort by the manual order
  if (aIndex !== -1 && bIndex !== -1) {
    return aIndex - bIndex;
  }
  // If only a is featured, it comes first
  if (aIndex !== -1) return -1;
  // If only b is featured, it comes first
  if (bIndex !== -1) return 1;

  // Otherwise sort alphabetically
  return a.title.localeCompare(b.title);
});

fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));
console.log("✅ Updated featured projects: Replaced 3d-rendering-showcase with mrt-ubike-analysis.");