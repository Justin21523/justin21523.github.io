import React from "react";
import fs from "fs";
import path from "path";
import { Link } from "@/i18n/navigation";
import { CheckCircle, HelpCircle, ArrowLeft, ShieldAlert } from "lucide-react";
import { normalizePortfolioLocale } from "@/lib/projects";

interface ScannedProject {
  name: string;
  folder: string;
  path: string;
  type: string;
  hasReadme: boolean;
  readmeContent: string;
  detectedStack: string[];
  lastUpdate: string;
  gitRemote: string;
  gitBranch: string;
  gitLastCommitMessage: string;
  canBuild: boolean;
  canRun: boolean;
  hasMedia?: boolean;
  needsManualReview?: boolean;
  suitability: string;
  confidence: number;
}

interface CatalogProject {
  slug: string;
}

const PORTFOLIO_ROOT = process.cwd();
const SCAN_REPORT_PATH = path.join(PORTFOLIO_ROOT, "data/generated/project-scan-report.json");
const CATALOG_PATH = path.join(PORTFOLIO_ROOT, "src/generated/project-catalog.json");

export default async function CatalogReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  normalizePortfolioLocale(localeParam);

  // Check if development environment, otherwise display warning (or we can let developers view it in dev server mode)
  const isDev = process.env.NODE_ENV === "development";

  let scannedProjects: ScannedProject[] = [];
  const publicSlugs = new Set<string>();

  try {
    if (fs.existsSync(SCAN_REPORT_PATH)) {
      scannedProjects = JSON.parse(fs.readFileSync(SCAN_REPORT_PATH, "utf8"));
    }
    if (fs.existsSync(CATALOG_PATH)) {
      const catalogData = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf8")) as CatalogProject[];
      catalogData.forEach((project) => publicSlugs.add(project.slug));
    }
  } catch (e) {
    console.error("Error reading catalog logs: ", e);
  }

  // Sort: Portfolio Ready first
  scannedProjects.sort((a, b) => {
    if (a.suitability !== b.suitability) {
      return a.suitability === "Portfolio Ready" ? -1 : 1;
    }
    return a.folder.localeCompare(b.folder);
  });

  return (
    <main className="min-h-screen bg-background pb-20 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-mono font-bold tracking-tight">
                /dev/catalog-review
              </h1>
              <span className="rounded bg-yellow-500/10 px-2 py-1 text-xs font-semibold text-yellow-500 border border-yellow-500/20">
                Dev Only
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground font-sans">
              Audit scan results, active visibility settings, and package overrides.
            </p>
          </div>
          <Link
            href="/projects/all"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
        </div>

        {!isDev && (
          <div className="mb-8 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 flex gap-3 text-destructive">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <div>
              <h3 className="font-semibold text-sm">Security Notice</h3>
              <p className="text-xs mt-1">
                This page is designated for local development checks only. Ensure access is restricted in public production environments.
              </p>
            </div>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Scanned</p>
            <p className="text-3xl font-bold font-mono mt-1">{scannedProjects.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Portfolio Ready</p>
            <p className="text-3xl font-bold font-mono mt-1 text-green-500">
              {scannedProjects.filter(p => p.suitability === "Portfolio Ready").length}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Publicly Listed</p>
            <p className="text-3xl font-bold font-mono mt-1 text-primary">{publicSlugs.size}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Excluded / Hidden</p>
            <p className="text-3xl font-bold font-mono mt-1 text-muted-foreground">
              {scannedProjects.length - publicSlugs.size}
            </p>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm font-mono">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="p-4">Project Folder</th>
                  <th className="p-4">Scan Type</th>
                  <th className="p-4">Suitability</th>
                  <th className="p-4">Visibility</th>
                  <th className="p-4">Git Remote Status</th>
                  <th className="p-4">Conf. Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scannedProjects.map((project) => {
                  const isPublic = publicSlugs.has(project.folder);
                  return (
                    <tr key={project.folder} className="hover:bg-accent/40 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-foreground">{project.folder}</p>
                        <p className="text-[10px] text-muted-foreground truncate max-w-xs">{project.path}</p>
                      </td>
                      <td className="p-4">
                        <span className="rounded bg-secondary px-2 py-0.5 text-xs">
                          {project.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          project.suitability === "Portfolio Ready" ? "text-green-500" : "text-amber-500"
                        }`}>
                          {project.suitability === "Portfolio Ready" ? (
                            <CheckCircle className="h-3.5 w-3.5" />
                          ) : (
                            <HelpCircle className="h-3.5 w-3.5" />
                          )}
                          {project.suitability}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          isPublic ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-muted text-muted-foreground border border-border"
                        }`}>
                          {isPublic ? "Public" : "Hidden / Excluded"}
                        </span>
                      </td>
                      <td className="p-4">
                        {project.gitRemote ? (
                          <a
                            href={project.gitRemote}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-xs max-w-xs truncate block"
                          >
                            {project.gitRemote.replace("https://github.com/", "")}
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs">No remote found</span>
                        )}
                      </td>
                      <td className="p-4 font-semibold">
                        {(project.confidence * 100).toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
