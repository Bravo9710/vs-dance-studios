import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-6 px-6 py-section">
      <h1 className="font-display text-display text-ink">Страницата не е намерена</h1>
      <p className="max-w-prose font-body text-base text-ink">
        Тази страница не съществува или е била премахната.
      </p>
      <Link
        href="/"
        className="rounded-md bg-red px-6 py-3 font-body text-base font-bold text-paper transition-colors hover:bg-red-hover"
      >
        Обратно към началото
      </Link>
    </main>
  );
}
