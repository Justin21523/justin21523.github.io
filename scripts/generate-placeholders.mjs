import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve("data/projects.json");
const outputDir = path.resolve("public/images/projects");

if (!fs.existsSync(projectsPath)) {
  console.error("Projects file not found.");
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

// Color palettes for gradients
const palettes = [
  ["#4F46E5", "#7C3AED"], // Indigo to Violet
  ["#2563EB", "#3B82F6"], // Blue to Sky
  ["#059669", "#10B981"], // Emerald
  ["#DC2626", "#EF4444"], // Red
  ["#D97706", "#F59E0B"], // Amber
  ["#7C3AED", "#DB2777"], // Violet to Pink
  ["#0891B2", "#06B6D4"], // Cyan
  ["#475569", "#64748B"], // Slate
];

function generateSVG(title, index) {
  const palette = palettes[index % palettes.length];
  // Simple "browser window" mockup style
  return `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${palette[1]};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="#000" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <rect width="100%" height="100%" fill="#F8FAFC" />
  
  <!-- Browser Window Mockup -->
  <g transform="translate(140, 110)">
    <rect width="1000" height="600" rx="12" fill="white" filter="url(#shadow)" />
    
    <!-- Title Bar -->
    <path d="M0 12 C0 5.37258 5.37258 0 12 0 H988 C994.627 0 1000 5.37258 1000 12 V 40 H 0 V 12 Z" fill="#F1F5F9" />
    <circle cx="20" cy="20" r="6" fill="#EF4444" opacity="0.5" />
    <circle cx="40" cy="20" r="6" fill="#F59E0B" opacity="0.5" />
    <circle cx="60" cy="20" r="6" fill="#10B981" opacity="0.5" />
    
    <!-- Content Area -->
    <rect x="0" y="40" width="1000" height="560" fill="url(#grad${index})" rx="0" ry="0" />
    
    <!-- Text -->
    <text x="500" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" style="text-shadow: 0 4px 12px rgba(0,0,0,0.2);">${title}</text>
  </g>
</svg>`;
}

let generatedCount = 0;

projects.forEach((project, index) => {
  const slug = project.slug;
  const filePath = path.join(outputDir, `${slug}.svg`);

  // Check if any image exists for this slug
  const extensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];
  const exists = extensions.some(ext => fs.existsSync(path.join(outputDir, `${slug}${ext}`)));

  if (!exists) {
    const svgContent = generateSVG(project.title || project.name, index);
    fs.writeFileSync(filePath, svgContent);
    generatedCount++;
    console.log(`Generated: ${slug}.svg`);
  }
});

console.log(`Total generated: ${generatedCount}`);
