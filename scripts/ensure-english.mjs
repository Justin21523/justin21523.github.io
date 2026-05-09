import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve("data/projects.json");
if (!fs.existsSync(projectsPath)) {
  console.error("Projects file not found.");
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

function generateProfessionalSummary(project) {
  const stack = project.stack || [];
  const group = project.group || "web";
  let desc = "";

  if (group === "ai") {
    desc = "A focused Artificial Intelligence project leveraging machine learning techniques. ";
    if (stack.includes("Python")) desc += "Built with Python for robust data processing. ";
    if (stack.includes("Docker")) desc += "Containerized for reproducible deployments. ";
    desc += "Designed to solve specific computational challenges in the AI domain.";
  } else {
    desc = "A modern web application demonstrating frontend best practices. ";
    if (stack.includes("React") || stack.includes("Vite")) desc += "Developed using the React ecosystem for high interactivity. ";
    if (stack.includes("Three.js")) desc += "Incorporates 3D graphics for an immersive user experience. ";
    else desc += "Features a responsive design and intuitive user interface.";
  }
  return desc;
}

let updatedCount = 0;

const updatedProjects = projects.map(p => {
  let summary = p.summary || "";
  
  // Heuristic: If summary is empty, too short, or looks like a file path
  if (!summary || summary.length < 15 || summary.includes(".md") || summary.includes("TODO")) {
    summary = generateProfessionalSummary(p);
    updatedCount++;
  }

  // Ensure title is clean (remove emojis if desired, but user seems to like them. Let's keep emojis but ensure text is English)
  // Actually, some titles might be raw file names.
  let title = p.title || p.name;
  if (title.includes("-") && !title.includes(" ")) {
     // Convert kebab-case to Title Case if it looks raw
     title = title.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
     updatedCount++;
  }

  return { ...p, title, summary };
});

if (updatedCount > 0) {
  fs.writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2));
  console.log(`✅ Polished English content for ${updatedCount} projects.`);
} else {
  console.log("English content looks good.");
}
