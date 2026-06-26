import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
        404
      </p>
      <h1 className="text-3xl font-semibold text-foreground">
        Page not found
      </h1>
      <Link
        href="/zh-TW/projects/all/"
        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        Back to projects
      </Link>
    </main>
  );
}
