# Project Catalog & Sync Pipeline Design

This document details the design of the automated Project Catalog Sync Pipeline.

## 1. Zod Metadata Schema Definition
We will create a robust parser using Zod under `src/lib/catalog/schema.ts` to validate scanned and manually overridden project data. The schema will enforce strict type checking on all portfolio items.

### Core Schema Fields:
- **Identification**:
  - `id`: string (unique identifier)
  - `catalogNumber`: string (e.g. `PF-2026-IS-001`)
  - `slug`: string (URL friendly identifier)
  - `visibility`: 'public' | 'private' | 'hidden'
  - `featured`: boolean
- **Metadata Categories**:
  - `category`: 'information-system' | 'interactive-3d' | 'ai-data' | 'frontend' | 'backend-desktop'
  - `status`: 'completed' | 'in-progress' | 'prototype' | 'planned'
  - `year`: number
  - `version`: string (e.g. `1.0.0`)
  - `updatedAt`: string (ISO date)
  - `startedAt`: string (ISO date, optional)
  - `completedAt`: string (ISO date, optional)
- **Controlled Vocabularies**:
  - `technologies`: Array of strings
  - `languages`: Array of strings
  - `frameworks`: Array of strings
  - `libraries`: Array of strings
  - `platforms`: Array of strings
  - `domains`: Array of strings
  - `capabilities`: Array of strings
  - `tools`: Array of strings
  - `keywords`: Array of strings
  - `audiences`: Array of strings
  - `dataTypes`: Array of strings
- **Personal Roles**:
  - `role`: string / LocalizedText
  - `responsibilities`: Array of strings
  - `teamSize`: number
- **Links & Resources**:
  - `repositoryUrl`: string (optional)
  - `liveDemoUrl`: string (optional)
  - `documentationUrl`: string (optional)
  - `videoUrl`: string (optional)
  - `downloadUrl`: string (optional)
- **Media Assets**:
  - `coverImage`: string (relative path under `/portfolio/projects/[slug]/`)
  - `screenshots`: Array of string paths
  - `demoVideos`: Array of string paths
  - `diagrams`: Array of string paths
- **Quality & Status**:
  - `extractionConfidence`: number (0.0 to 1.0)
  - `needsReview`: boolean
  - `missingFields`: Array of strings
  - `evidenceSources`: Array of strings

## 2. Controlled Vocabularies
To ensure consistency (e.g., standardizing `reactjs`, `React.js` -> `React`), we will implement a normalization dictionary:
```typescript
export const CONTROLLED_VOCABULARY: Record<string, { id: string; label: string; aliases: string[]; group: string }> = {
  "react": { id: "react", label: "React", aliases: ["react.js", "reactjs"], group: "frontend" },
  "typescript": { id: "typescript", label: "TypeScript", aliases: ["ts"], group: "language" },
  "nextjs": { id: "nextjs", label: "Next.js", aliases: ["next.js", "next"], group: "frontend" },
  "threejs": { id: "threejs", label: "Three.js", aliases: ["three.js", "three"], group: "3d-web" },
  "react-three-fiber": { id: "react-three-fiber", label: "React Three Fiber", aliases: ["r3f", "@react-three/fiber"], group: "3d-web" },
  // ... other tools (Phaser, Java, Spring Boot, C#, .NET, Python, etc.)
};
```

## 3. Merge Strategy
The final catalog data for any project `slug` will compile from three sources merged in order of priority:
1. **Manual Override File** (`content/projects/[slug]/project.override.json`): Manually written corrections. High priority.
2. **MDX Case Studies** (`content/projects/[slug]/zh-TW.mdx` and `en.mdx`): Rich case study details written by the developer.
3. **Automated Scan Data**: Inferred repository scan results. Low priority.

```text
  [Auto-Scan Output] 
          ↓
  (Merge & Normalize) ← [Override JSON] & [MDX Case Studies]
          ↓
[Validate against Zod Schema]
          ↓
[Final generated/project-catalog.json]
```

## 4. Pipeline Execution Scripts
We will structure the synchronization scripts inside a separate namespace directory: `scripts/catalog/`:
- `scan-projects.ts` - Iterates over all candidate folders in web-projects and ai_projects to extract package files, build configs, and Readmes.
- `extract-git-metadata.ts` - Reads git remote details, branch name, commit logs, and modification times.
- `detect-technologies.ts` - Matches files and package configurations against controlled terms.
- `collect-media.ts` - Automatically copies screenshots and media files to `/public/portfolio/projects/[slug]/` and generates thumbnails.
- `build-search-index.ts` - Builds client-side fuzzy searching structure using pre-rendered terms.
- `validate-catalog.ts` - Executes Zod validation against the generated inventory database.
- `sync-catalog.ts` - Orchestrates the entire process.

NPM Scripts will be defined as follows:
- `catalog:scan`: Runs project scanner.
- `catalog:validate`: Validates all project structures.
- `catalog:media`: Syncs media files.
- `catalog:index`: Builds search indexes.
- `catalog:sync`: Performs a full scan, override-merge, media-copy, index-build, and schema validation.
