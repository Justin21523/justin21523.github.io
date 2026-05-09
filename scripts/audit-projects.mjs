import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const roots = [
  { group: "web", root: "/home/justin/web-projects" },
  { group: "ai", root: "/mnt/c/ai_projects" },
];
const excludedNames = new Set([
  "AI_LLM_projects", "justin-portfolio", "character-settings",
  "gpu-migration-r900", "monitor",
]);

function execQuiet(cmd, opts = {}) {
  try {
    return execSync(cmd, { ...opts, stdio: ["ignore","pipe","ignore"] }).toString().trim();
  } catch { return ""; }
}

function lineCount(dir) {
  const exts = ["*.py","*.js","*.jsx","*.ts","*.tsx","*.html","*.css","*.vue","*.svelte","*.rs","*.go"];
  const patterns = exts.map(e => `-name '${e}'`).join(" -o ");
  try {
    const out = execQuiet(`find . -maxdepth 5 \\( -name '*.py' -o -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' -o -name '*.html' -o -name '*.css' -o -name '*.vue' -o -name '*.svelte' \\) ! -path '*/node_modules/*' ! -path '*/.git/*' ! -path '*/dist/*' ! -path '*/build/*' ! -path '*/__pycache__/*' | xargs wc -l 2>/dev/null | tail -1`, { cwd: dir });
    const n = parseInt(out, 10);
    return isNaN(n) ? 0 : n;
  } catch { return 0; }
}

function fmtLines(n) {
  if (n >= 1000) return `${(n/1000).toFixed(1)}K`;
  return String(n);
}

function auditProject(dir, group) {
  const name = path.basename(dir);
  const gitPath = path.join(dir, ".git");
  const hasGit = fs.existsSync(gitPath) && fs.statSync(gitPath).isDirectory();
  const result = { name, group, path: dir, hasGit };

  if (hasGit) {
    result.commits = parseInt(execQuiet("git rev-list --count HEAD", { cwd: dir }), 10) || 0;
    result.lastCommit = execQuiet("git log -1 --format=%ci", { cwd: dir }) || "?";
    result.branches = execQuiet("git branch -l", { cwd: dir })
      .split("\n").map(b => b.replace(/^\*?\s*/, "").trim()).filter(Boolean).length;
    const status = execQuiet("git status --porcelain", { cwd: dir });
    result.hasUncommitted = status.length > 0;
    result.daysSinceLast = (() => {
      const d = new Date(result.lastCommit);
      const now = new Date();
      return Math.floor((now - d) / 86400000);
    })();
  } else {
    result.commits = 0;
    result.lastCommit = "no-git";
    result.branches = 0;
    result.hasUncommitted = false;
    result.daysSinceLast = -1;
  }

  result.lines = lineCount(dir);
  result.hasReadme = fs.existsSync(path.join(dir, "README.md")) || fs.existsSync(path.join(dir, "readme.md"));
  result.hasDocker = fs.existsSync(path.join(dir, "Dockerfile")) || fs.existsSync(path.join(dir, "docker-compose.yml"));

  return result;
}

function main() {
  console.log("🔍 Project Audit Report");
  console.log("═".repeat(90));

  const all = [];
  for (const { group, root } of roots) {
    if (!fs.existsSync(root)) { console.log(`⚠️  Root not found: ${root}`); continue; }
    const entries = fs.readdirSync(root, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith(".") && !excludedNames.has(e.name));

    console.log(`\n📂 ${root} (${entries.length} projects)`);
    console.log("─".repeat(90));
    console.log(`${"Name".padEnd(35)} ${"Commits".padStart(7)} ${"Lines".padStart(8)} ${"Last Update".padEnd(12)} ${"Days".padStart(5)} ${"Git".padStart(4)} ${"README".padStart(6)} ${"Docker".padStart(6)} ${"Uncommitted"}`);
    console.log("─".repeat(90));

    for (const entry of entries) {
      const dir = path.join(root, entry.name);
      const p = auditProject(dir, group);
      all.push(p);

      const days = p.daysSinceLast < 0 ? "N/A" : (p.daysSinceLast > 30 ? `${p.daysSinceLast}⚠️` : `${p.daysSinceLast}`);
      const git = p.hasGit ? "✅" : "❌";
      const readme = p.hasReadme ? "✅" : "❌";
      const docker = p.hasDocker ? "✅" : "  ";
      const uncommitted = p.hasUncommitted ? "⚠️" : "  ";
      const lines = fmtLines(p.lines);

      console.log(
        `${p.name.padEnd(35)} ${String(p.commits).padStart(7)} ${lines.padStart(8)} ${p.lastCommit.slice(0, 10).padEnd(12)} ${days.padStart(5)} ${git.padStart(4)} ${readme.padStart(6)} ${docker.padStart(6)} ${uncommitted}`
      );
    }
  }

  // Summary
  console.log("\n" + "═".repeat(90));
  console.log("📊 Summary");
  const totalLines = all.reduce((s, p) => s + p.lines, 0);
  const totalCommits = all.reduce((s, p) => s + p.commits, 0);
  const withGit = all.filter(p => p.hasGit).length;
  const noReadme = all.filter(p => !p.hasReadme).length;
  const stale = all.filter(p => p.daysSinceLast > 90 && p.daysSinceLast >= 0).length;
  const uncommitted = all.filter(p => p.hasUncommitted).length;

  console.log(`  Total projects: ${all.length}`);
  console.log(`  Total commits: ${totalCommits.toLocaleString()}`);
  console.log(`  Total lines: ${fmtLines(totalLines)}`);
  console.log(`  With git: ${withGit}/${all.length}`);
  console.log(`  Missing README: ${noReadme}`);
  console.log(`  Stale (>90 days): ${stale}`);
  console.log(`  Uncommitted changes: ${uncommitted}`);

  // Write report
  const reportPath = path.join("/home/justin/web-projects", "PROJECT-AUDIT.json");
  fs.writeFileSync(reportPath, JSON.stringify(all, null, 2) + "\n", "utf8");
  console.log(`\n  Report saved: ${reportPath}`);
}

main();
