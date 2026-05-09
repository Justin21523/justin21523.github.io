import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(process.cwd());
const dataPath = path.join(repoRoot, "data", "projects.json");

const roots = [
  { group: "web", root: "/home/justin/web-projects", exclude: new Set(["AI_LLM_projects", "justin-portfolio"]) },
  // Keep this aligned with scripts/sync-projects.mjs `excludedNames`.
  { group: "ai", root: "/mnt/c/ai_projects", exclude: new Set(["character-settings"]) },
];

function die(message) {
  console.error(message);
  process.exit(1);
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function listDirs(root, exclude) {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !exclude.has(e.name))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, "en"));
}

function isGitRepo(dir) {
  return fs.existsSync(path.join(dir, ".git"));
}

function gitRemoteOrigin(dir) {
  const res = spawnSync("git", ["remote", "get-url", "origin"], { cwd: dir, encoding: "utf8" });
  if (res.status !== 0) return "";
  return String(res.stdout || "").trim();
}

function main() {
  if (!fs.existsSync(dataPath)) die(`[audit] missing data file: ${dataPath}`);
  const projects = readJson(dataPath);
  if (!Array.isArray(projects)) die("[audit] data/projects.json must be an array");

  const byGroup = new Map();
  for (const p of projects) {
    const group = p?.group;
    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group).push(p);
  }

  let ok = true;

  // 1) Ensure JSON matches folders exactly
  for (const { group, root, exclude } of roots) {
    const folders = listDirs(root, exclude);
    const jsonNames = (byGroup.get(group) || []).map((p) => p.name).sort((a, b) => a.localeCompare(b, "en"));
    const setFolders = new Set(folders);
    const setJson = new Set(jsonNames);

    const extra = [...setJson].filter((n) => !setFolders.has(n)).sort();
    const missing = [...setFolders].filter((n) => !setJson.has(n)).sort();

    if (extra.length || missing.length) {
      ok = false;
      console.error(`\n[audit] group=${group} mismatch`);
      if (extra.length) console.error(`[audit]  extra_in_json (${extra.length}): ${extra.join(", ")}`);
      if (missing.length) console.error(`[audit]  missing_in_json (${missing.length}): ${missing.join(", ")}`);
    }
  }

  // 2) Ensure id + slug policy
  const ids = new Set();
  for (const p of projects) {
    const expectedId = `${p.group}:${p.name}`;
    if (p.id !== expectedId) {
      ok = false;
      console.error(`[audit] bad id for ${p.group}/${p.name}: got=${JSON.stringify(p.id)} expected=${JSON.stringify(expectedId)}`);
    }
    if (p.slug !== p.name) {
      ok = false;
      console.error(`[audit] bad slug for ${p.group}/${p.name}: got=${JSON.stringify(p.slug)} expected=${JSON.stringify(p.name)}`);
    }
    if (ids.has(p.id)) {
      ok = false;
      console.error(`[audit] duplicate id: ${p.id}`);
    }
    ids.add(p.id);
  }

  // 3) Soft warnings: git repos without repoUrl
  const warnings = [];
  for (const p of projects) {
    const dir = p.sourcePath;
    if (!dir || !fs.existsSync(dir)) continue;
    if (!isGitRepo(dir)) continue;
    const origin = gitRemoteOrigin(dir);
    if (origin && !p.repoUrl) warnings.push(`${p.group}/${p.name} has git origin but repoUrl is empty`);
  }
  for (const w of warnings) console.warn(`[audit] warn: ${w}`);

  if (!ok) process.exit(1);
  console.log(`[audit] OK: ${projects.length} projects match folders and naming policy`);
}

main();
