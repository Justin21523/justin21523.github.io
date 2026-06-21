export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Justin Portfolio
        </p>

        <h1 className="text-3xl font-bold">
          Justin | Web Development, Data Organization, and LIS Portfolio
        </h1>

        <p className="mt-4 leading-7 text-muted-foreground">
          Redirecting to the Traditional Chinese homepage. If it does not happen automatically, choose a language below.
        </p>

        <meta
          httpEquiv="refresh"
          content="0; url=./zh-TW/"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="./zh-TW/"
            className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            繁體中文
          </a>

          <a
            href="./en/"
            className="rounded-xl border border-border px-5 py-3 font-medium"
          >
            English
          </a>
        </div>
      </div>
    </main>
  );
}
