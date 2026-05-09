import fs from "node:fs";
import path from "node:path";

// Paths
const projectsJsonPath = path.resolve("data/projects.json");
const composePath = path.resolve("docker-compose.yml");

// Base Compose Structure
const BASE_COMPOSE = {
  services: {
    web: {
      build: {
        context: ".",
        dockerfile: "docker/Dockerfile",
        args: {
          SITE_URL: "${SITE_URL:-http://localhost:3000}"
        }
      },
      environment: {
        SITE_URL: "${SITE_URL:-http://localhost:3000}"
      },
      ports: ["${WEB_HOST_PORT:-3000}:80"],
      restart: "unless-stopped"
    }
  }
};

function main() {
  if (!fs.existsSync(projectsJsonPath)) {
    console.error("Projects data not found.");
    process.exit(1);
  }

  const projects = JSON.parse(fs.readFileSync(projectsJsonPath, "utf8"));
  
  // Clone base services
  const services = { ...BASE_COMPOSE.services };
  
  // Track assigned slugs to prevent collision
  const usedSlugs = new Set(["web"]);

  projects.forEach(p => {
    // Only add projects that have a valid source path and seem deployable
    if (!p.sourcePath || !fs.existsSync(p.sourcePath)) return;
    
    // Check if Dockerfile exists (our previous script should have ensured this for most)
    // Also support 'docker/Dockerfile' convention
    const hasDockerRoot = fs.existsSync(path.join(p.sourcePath, "Dockerfile"));
    const hasDockerSub = fs.existsSync(path.join(p.sourcePath, "docker", "Dockerfile"));
    
    if (!hasDockerRoot && !hasDockerSub) return;
    
    const serviceName = p.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    
    if (usedSlugs.has(serviceName)) {
        console.warn(`Duplicate service name: ${serviceName}. Skipping.`);
        return;
    }
    usedSlugs.add(serviceName);

    // Construct Service Entry
    const serviceEntry = {
        build: {
            context: path.relative(process.cwd(), p.sourcePath), // Use relative path for portability
            dockerfile: hasDockerSub ? "docker/Dockerfile" : "Dockerfile",
            args: {
                BASE_PATH: `/p/${p.slug}/` // Pass base path for Vite apps
            }
        },
        expose: ["80"], // Standardize on internal 80
        restart: "unless-stopped",
        // Add environment variables if needed
        environment: {
            BASE_PATH: `/p/${p.slug}/`,
            PORT: "80"
        }
    };
    
    // Check for backend dependency (heuristic)
    // If a project has a sibling "backend" folder or similar, we might need complex logic.
    // For now, we assume Monolithic Dockerfiles or simple services.
    
    services[serviceName] = serviceEntry;
  });

  // Construct Final YAML (Manual stringify to keep it cleanish, or use a lib if available.
  // Since we don't have 'yaml' lib installed by default in node, and I want to avoid massive deps,
  // I will use a simple JSON-to-YAML converter helper or just write JSON if docker-compose supports it (it does, but YAML is standard).
  // Actually, I'll write a simple YAML serializer for this specific structure.)
  
  const yamlContent = toYaml({ version: "3.8", services });
  fs.writeFileSync(composePath, yamlContent);
  console.log(`Generated docker-compose.yml with ${Object.keys(services).length} services.`);
}

function toYaml(obj, indent = 0) {
    let str = "";
    const spacing = "  ".repeat(indent);
    
    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
            str += `${spacing}${key}:\n${toYaml(value, indent + 1)}`;
        } else if (Array.isArray(value)) {
            str += `${spacing}${key}:\n`;
            value.forEach(item => {
                str += `${spacing}  - "${item}"\n`;
            });
        } else {
            str += `${spacing}${key}: "${value}"\n`;
        }
    }
    return str;
}

main();
