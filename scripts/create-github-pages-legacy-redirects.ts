import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const outputDir = path.resolve(process.cwd(), "out");
const legacyBasePath = "justin-portfolio";

function directoryExists(directory: string) {
  try {
    return statSync(directory).isDirectory();
  } catch {
    return false;
  }
}

function collectIndexPages(directory: string, pages: string[] = []) {
  for (const entry of readdirSync(directory)) {
    const entryPath = path.join(directory, entry);
    const relativePath = path.relative(outputDir, entryPath);

    if (entry === legacyBasePath || relativePath.startsWith(`${legacyBasePath}${path.sep}`)) {
      continue;
    }

    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      collectIndexPages(entryPath, pages);
      continue;
    }

    if (entry === "index.html") {
      pages.push(entryPath);
    }
  }

  return pages;
}

function getPageTitle(indexPath: string) {
  const html = readFileSync(indexPath, "utf8");
  const match = html.match(/<title>(.*?)<\/title>/i);

  return match?.[1] ?? "Justin Portfolio";
}

function getTargetPath(indexPath: string) {
  const pageDir = path.dirname(indexPath);
  const relativeDir = path.relative(outputDir, pageDir).split(path.sep).join("/");

  return relativeDir ? `/${relativeDir}/` : "/";
}

function createRedirectHtml(targetPath: string, title: string) {
  const escapedTarget = targetPath.replace(/"/g, "&quot;");
  const escapedTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <meta http-equiv="refresh" content="0; url=${escapedTarget}">
    <title>${escapedTitle}</title>
    <link rel="canonical" href="${escapedTarget}">
    <script>
      (function () {
        var target = "${escapedTarget}";
        var next = target + window.location.search + window.location.hash;
        window.location.replace(next);
      })();
    </script>
  </head>
  <body>
    <a href="${escapedTarget}">Continue to Justin Portfolio</a>
  </body>
</html>
`;
}

function writeLegacyRedirect(indexPath: string) {
  const targetPath = getTargetPath(indexPath);
  const relativeTarget = targetPath === "/" ? "" : targetPath.slice(1);
  const legacyDir = path.join(outputDir, legacyBasePath, relativeTarget);
  const legacyIndexPath = path.join(legacyDir, "index.html");

  mkdirSync(legacyDir, {
    recursive: true,
  });

  writeFileSync(
    legacyIndexPath,
    createRedirectHtml(targetPath, getPageTitle(indexPath)),
    "utf8"
  );

  return legacyIndexPath;
}

if (!directoryExists(outputDir)) {
  throw new Error(`Static output directory not found: ${outputDir}`);
}

const writtenFiles = collectIndexPages(outputDir).map(writeLegacyRedirect);

console.log(
  `Created ${writtenFiles.length} legacy GitHub Pages redirect pages under /${legacyBasePath}/.`
);
