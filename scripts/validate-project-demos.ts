import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");
const REPORT_JSON_PATH = path.join(ROOT, "docs/portfolio-release/demo-link-audit.json");
const REPORT_MD_PATH = path.join(ROOT, "docs/portfolio-release/demo-link-audit.md");
const DEFAULT_BASE_URL = "https://justin21523.github.io";
const LOCALES = ["zh-TW", "en"] as const;
const writeReport = process.argv.includes("--write");
const baseUrl = (process.env.PORTFOLIO_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");

type LinkKind = "live" | "video";

type ProjectLink = {
  kind: string;
  url: string;
};

type Project = {
  slug: string;
  links: ProjectLink[];
};

type AuditResult = {
  slug: string;
  kind: LinkKind;
  sourceUrl: string;
  checkedUrl: string;
  demoType: "external-app-demo" | "portfolio-fallback" | "generated-case-study-demo" | "external-media" | "unknown";
  status: number | null;
  ok: boolean;
  contentType: string;
  finalUrl: string;
  bytesRead: number;
  error?: string;
};

function readJson<T>(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function fallbackAnchor(kind: LinkKind) {
  return kind === "live" ? "demo-guide" : "demo-video";
}

function isFallbackLink(project: Project, kind: LinkKind, url: string) {
  const anchor = fallbackAnchor(kind);
  return [
    `/projects/${project.slug}#${anchor}`,
    `/projects/${project.slug}/#${anchor}`,
    `/zh-TW/projects/${project.slug}/#${anchor}`,
    `/en/projects/${project.slug}/#${anchor}`,
  ].includes(url);
}

function urlsToCheck(project: Project, kind: LinkKind, sourceUrl: string) {
  if (/^https?:\/\//.test(sourceUrl)) {
    return [sourceUrl];
  }

  if (isFallbackLink(project, kind, sourceUrl)) {
    return LOCALES.map((locale) => `${baseUrl}/${locale}/projects/${project.slug}/#${fallbackAnchor(kind)}`);
  }

  return [`${baseUrl}${sourceUrl.startsWith("/") ? sourceUrl : `/${sourceUrl}`}`];
}

async function checkUrl(slug: string, kind: LinkKind, sourceUrl: string, checkedUrl: string): Promise<AuditResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(checkedUrl, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "portfolio-demo-link-audit/1.0",
      },
    });
    const contentType = response.headers.get("content-type") ?? "";
    const reader = response.body?.getReader();
    let bytesRead = 0;

    let firstChunk = "";
    if (reader) {
      const chunk = await reader.read();
      bytesRead = chunk.value?.byteLength ?? 0;
      if (chunk.value) {
        firstChunk = new TextDecoder().decode(chunk.value);
      }
      await reader.cancel();
    }

    const isPortfolioFallback = checkedUrl.includes(`/projects/${slug}/#${fallbackAnchor(kind)}`);
    const generatedCaseStudy = kind === "live" && /Portfolio Case Study|Case Study Demo/.test(firstChunk);

    return {
      slug,
      kind,
      sourceUrl,
      checkedUrl,
      demoType: isPortfolioFallback
        ? "portfolio-fallback"
        : generatedCaseStudy
          ? "generated-case-study-demo"
          : kind === "video"
            ? "external-media"
            : "external-app-demo",
      status: response.status,
      ok: response.status < 400 && bytesRead > 0,
      contentType,
      finalUrl: response.url,
      bytesRead,
    };
  } catch (error) {
    return {
      slug,
      kind,
      sourceUrl,
      checkedUrl,
      demoType: "unknown",
      status: null,
      ok: false,
      contentType: "",
      finalUrl: checkedUrl,
      bytesRead: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runWithConcurrency<T>(items: T[], limit: number, worker: (item: T) => Promise<AuditResult[]>) {
  const results: AuditResult[] = [];
  let index = 0;

  async function next() {
    while (index < items.length) {
      const item = items[index];
      index += 1;
      results.push(...await worker(item));
    }
  }

  await Promise.all(Array.from({ length: limit }, next));
  return results;
}

function ensureReportDir() {
  fs.mkdirSync(path.dirname(REPORT_JSON_PATH), {
    recursive: true,
  });
}

function writeReports(results: AuditResult[]) {
  ensureReportDir();
  const broken = results.filter((result) => !result.ok);
  const generatedCaseStudies = results.filter((result) => result.demoType === "generated-case-study-demo");
  const generatedAt = new Date().toISOString();
  fs.writeFileSync(
    REPORT_JSON_PATH,
    `${JSON.stringify({ generatedAt, baseUrl, total: results.length, broken: broken.length, results }, null, 2)}\n`,
    "utf8"
  );
  fs.writeFileSync(
    REPORT_MD_PATH,
    [
      "# Demo Link Audit",
      "",
      `Generated at: ${generatedAt}`,
      `Base URL: ${baseUrl}`,
      `Checked URLs: ${results.length}`,
      `Broken URLs: ${broken.length}`,
      "",
      "## Broken Links",
      "",
      broken.length
        ? broken.map((result) => `- ${result.slug} ${result.kind}: ${result.status ?? "error"} ${result.checkedUrl}`).join("\n")
        : "No broken demo links found.",
      "",
      "## Generated Case-Study Live Pages",
      "",
      generatedCaseStudies.length
        ? generatedCaseStudies.map((result) => `- ${result.slug}: ${result.checkedUrl}`).join("\n")
        : "No generated case-study pages are currently labeled as live external demos.",
      "",
    ].join("\n"),
    "utf8"
  );
}

async function main() {
  const projects = readJson<Project[]>(CATALOG_PATH);
  const checks = projects.flatMap((project) =>
    (["live", "video"] as const).flatMap((kind) => {
      const link = project.links.find((item) => item.kind === kind && item.url);
      return link ? [{ project, kind, sourceUrl: link.url }] : [];
    })
  );
  const results = await runWithConcurrency(checks, 8, async ({ project, kind, sourceUrl }) =>
    Promise.all(urlsToCheck(project, kind, sourceUrl).map((checkedUrl) => checkUrl(project.slug, kind, sourceUrl, checkedUrl)))
  );
  const broken = results.filter((result) =>
    !result.ok ||
    (result.kind === "live" && result.demoType === "portfolio-fallback") ||
    (result.kind === "live" && result.demoType === "generated-case-study-demo")
  );

  if (writeReport) {
    writeReports(results);
  }

  if (broken.length > 0) {
    console.error(`Demo link validation failed: ${broken.length} live demo URLs are broken or point to portfolio fallback pages.`);
    broken.forEach((result) => {
      console.error(`- ${result.slug} ${result.kind}: ${result.status ?? "error"} ${result.checkedUrl}`);
    });
    process.exit(1);
  }

  console.log(`Validated ${results.length} demo URLs for ${projects.length} projects.`);
}

main();
