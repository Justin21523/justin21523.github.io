export interface ControlledTerm {
  id: string;
  label: string;
  aliases: string[];
  group: "language" | "framework" | "library" | "database" | "styling" | "3d-web" | "game-engine" | "tool" | "devops" | "other";
}

export const CONTROLLED_VOCABULARY: ControlledTerm[] = [
  {
    id: "react",
    label: "React",
    aliases: ["react", "react.js", "reactjs"],
    group: "framework",
  },
  {
    id: "nextjs",
    label: "Next.js",
    aliases: ["next.js", "nextjs", "next"],
    group: "framework",
  },
  {
    id: "typescript",
    label: "TypeScript",
    aliases: ["typescript", "ts"],
    group: "language",
  },
  {
    id: "javascript",
    label: "JavaScript",
    aliases: ["javascript", "js"],
    group: "language",
  },
  {
    id: "tailwind-css",
    label: "Tailwind CSS",
    aliases: ["tailwind css", "tailwind", "tailwindcss"],
    group: "styling",
  },
  {
    id: "zustand",
    label: "Zustand",
    aliases: ["zustand"],
    group: "library",
  },
  {
    id: "threejs",
    label: "Three.js",
    aliases: ["three.js", "threejs", "three"],
    group: "3d-web",
  },
  {
    id: "react-three-fiber",
    label: "React Three Fiber",
    aliases: ["react three fiber", "r3f", "@react-three/fiber"],
    group: "3d-web",
  },
  {
    id: "phaser",
    label: "Phaser",
    aliases: ["phaser", "phaser.js", "phaserjs", "phaser3"],
    group: "game-engine",
  },
  {
    id: "unity",
    label: "Unity",
    aliases: ["unity", "unity3d", "unity game engine"],
    group: "game-engine",
  },
  {
    id: "java",
    label: "Java",
    aliases: ["java"],
    group: "language",
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    aliases: ["spring boot", "springboot", "spring"],
    group: "framework",
  },
  {
    id: "csharp",
    label: "C#",
    aliases: ["c#", "csharp", "c #"],
    group: "language",
  },
  {
    id: "dotnet",
    label: ".NET",
    aliases: [".net", "dotnet", ".net core", "dotnet core"],
    group: "framework",
  },
  {
    id: "avalonia",
    label: "Avalonia",
    aliases: ["avalonia", "avaloniaui", "avalonia ui"],
    group: "framework",
  },
  {
    id: "python",
    label: "Python",
    aliases: ["python", "py"],
    group: "language",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    aliases: ["fastapi", "fast api"],
    group: "framework",
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    aliases: ["postgresql", "postgres"],
    group: "database",
  },
  {
    id: "mysql",
    label: "MySQL",
    aliases: ["mysql"],
    group: "database",
  },
  {
    id: "sqlite",
    label: "SQLite",
    aliases: ["sqlite", "sqlite3"],
    group: "database",
  },
  {
    id: "plotly",
    label: "Plotly",
    aliases: ["plotly"],
    group: "library",
  },
  {
    id: "docker",
    label: "Docker",
    aliases: ["docker"],
    group: "devops",
  },
  {
    id: "github-actions",
    label: "GitHub Actions",
    aliases: ["github actions", "github-actions"],
    group: "devops",
  },
];

/**
 * Normalizes a tech term string matching controlled vocabulary definition.
 * Returns the matching label, or the capitalized original term if no match is found.
 */
export function normalizeTechTerm(term: string): { label: string; id: string; group: string } {
  const cleanTerm = term.trim().toLowerCase();
  
  for (const item of CONTROLLED_VOCABULARY) {
    if (item.id === cleanTerm || item.label.toLowerCase() === cleanTerm || item.aliases.map(a => a.toLowerCase()).includes(cleanTerm)) {
      return {
        label: item.label,
        id: item.id,
        group: item.group,
      };
    }
  }

  // Fallback for unmapped terms
  return {
    label: term.trim(),
    id: cleanTerm.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    group: "other",
  };
}
