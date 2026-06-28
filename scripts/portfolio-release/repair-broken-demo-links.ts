import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const AUDIT_PATH = path.join(ROOT, "docs/portfolio-release/demo-link-audit.json");
const CONTENT_DIR = path.join(ROOT, "content/projects");

type AuditResult = {
  slug: string;
  kind: string;
  sourceUrl: string;
  ok: boolean;
};

type AuditReport = {
  results: AuditResult[];
};

type ProjectLink = {
  kind: string;
  url: string;
  label?: Record<"zh-TW" | "en", string>;
  primary?: boolean;
};

type ProjectOverride = {
  links?: ProjectLink[];
};

function readJson<T>(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function writeJson(filePath: string, value: unknown) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function githubPagesLiveLink(links: ProjectLink[]): ProjectLink | undefined {
  const githubUrl = links.find((link) => link.kind === "github" && /^https:\/\/github\.com\/Justin21523\//i.test(link.url))?.url;
  const repoName = githubUrl?.match(/^https:\/\/github\.com\/Justin21523\/([^/#?]+)/i)?.[1]?.replace(/\.git$/, "");

  if (!repoName) {
    return undefined;
  }

  return {
    kind: "live",
    url: `https://justin21523.github.io/${repoName}/`,
    label: {
      "zh-TW": "網站 Demo",
      en: "Live Demo",
    },
    primary: true,
  };
}

function main() {
  if (!fs.existsSync(AUDIT_PATH)) {
    throw new Error("Run npm run audit:project-demos before repairing demo links.");
  }

  const audit = readJson<AuditReport>(AUDIT_PATH);
  const brokenExternalLiveSlugs = Array.from(new Set(
    audit.results
      .filter((result) => !result.ok && result.kind === "live" && /^https?:\/\//.test(result.sourceUrl))
      .map((result) => result.slug)
  )).sort();
  const changed: string[] = [];

  brokenExternalLiveSlugs.forEach((slug) => {
    const overridePath = path.join(CONTENT_DIR, slug, "project.override.json");

    if (!fs.existsSync(overridePath)) {
      return;
    }

    const override = readJson<ProjectOverride>(overridePath);
    const links = override.links ?? [];
    const liveIndex = links.findIndex((link) => link.kind === "live");
    const repairedLiveLink = githubPagesLiveLink(links);

    if (!repairedLiveLink) {
      return;
    }

    if (liveIndex === -1) {
      links.unshift(repairedLiveLink);
    } else if (/^https?:\/\//.test(links[liveIndex].url)) {
      links[liveIndex] = repairedLiveLink;
    } else {
      return;
    }

    override.links = links;
    writeJson(overridePath, override);
    changed.push(slug);
  });

  console.log(`Repaired ${changed.length} broken external live demo links.`);
  changed.forEach((slug) => console.log(`- ${slug}`));
}

main();
