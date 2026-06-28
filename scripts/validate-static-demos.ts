import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "src/generated/project-catalog.json");

type Project = {
  slug: string;
  links?: Array<{
    kind: string;
    url: string;
  }>;
};

type Result = {
  slug: string;
  url: string;
  ok: boolean;
  status?: number;
  reason?: string;
};

function readJson<T>(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

async function check(project: Project): Promise<Result> {
  const live = project.links?.find((link) => link.kind === "live" && link.url);
  if (!live?.url) {
    return { slug: project.slug, url: "", ok: false, reason: "missing live demo URL" };
  }

  if (!/^https?:\/\//.test(live.url)) {
    return { slug: project.slug, url: live.url, ok: false, reason: "live demo URL must be an external static deployment" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(live.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "portfolio-static-demo-validation/1.0",
      },
    });
    const text = await response.text();
    const generatedCaseStudy = /Portfolio Case Study|Case Study Demo/.test(text);

    if (response.status >= 400) {
      return { slug: project.slug, url: live.url, ok: false, status: response.status, reason: "HTTP error" };
    }

    if (!text.trim()) {
      return { slug: project.slug, url: live.url, ok: false, status: response.status, reason: "empty response" };
    }

    if (generatedCaseStudy) {
      return { slug: project.slug, url: live.url, ok: false, status: response.status, reason: "generated portfolio case-study page detected" };
    }

    return { slug: project.slug, url: live.url, ok: true, status: response.status };
  } catch (error) {
    return {
      slug: project.slug,
      url: live.url,
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runWithConcurrency<T, R>(items: T[], limit: number, worker: (item: T) => Promise<R>) {
  const results: R[] = [];
  let index = 0;

  async function next() {
    while (index < items.length) {
      const item = items[index];
      index += 1;
      results.push(await worker(item));
    }
  }

  await Promise.all(Array.from({ length: limit }, next));
  return results;
}

async function main() {
  const projects = readJson<Project[]>(CATALOG_PATH);
  const results = await runWithConcurrency(projects, 8, check);
  const failed = results.filter((result) => !result.ok);

  if (failed.length > 0) {
    console.error(`Static demo validation failed: ${failed.length} projects need external static demos.`);
    failed.forEach((result) => {
      console.error(`- ${result.slug}: ${result.url || "(missing)"} ${result.status ?? ""} ${result.reason ?? ""}`.trim());
    });
    process.exit(1);
  }

  console.log(`Validated external static demos for ${projects.length} projects.`);
}

main();
