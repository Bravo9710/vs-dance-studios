export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-6 px-6 py-section">
      <p className="font-body text-sm text-ink-muted">
        Scaffold placeholder — Hero and class-finder content land in later phases.
      </p>
      <h1 className="font-display text-display text-ink">
        Танцово студио VS DANCE StudioS
      </h1>
      <p className="max-w-prose font-body text-base text-ink">
        Улични танци и съвременни техники в две студиа в София.
      </p>
      <a
        href="#"
        className="rounded-md bg-red px-6 py-3 font-body text-base font-bold text-paper transition-colors hover:bg-red-hover"
      >
        Вземи 3 безплатни класа
      </a>
      <div className="flex gap-4">
        <span className="h-12 w-12 rounded bg-ink" aria-hidden="true" />
        <span className="h-12 w-12 rounded border border-ink-muted bg-paper" aria-hidden="true" />
        <span className="h-12 w-12 rounded bg-red" aria-hidden="true" />
        <span className="h-12 w-12 rounded bg-red-tint" aria-hidden="true" />
        <span className="h-12 w-12 rounded bg-yellow" aria-hidden="true" />
      </div>
    </main>
  );
}
