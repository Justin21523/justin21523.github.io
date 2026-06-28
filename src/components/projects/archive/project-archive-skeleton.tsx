export function ProjectArchiveSkeleton() {
  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="mx-auto w-full max-w-[112rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 h-36 max-w-3xl animate-pulse rounded-3xl bg-secondary" />

        <div className="mb-10 h-40 animate-pulse rounded-3xl bg-secondary" />

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-[32rem] animate-pulse rounded-3xl bg-secondary"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
