import { ResponsivePicture } from "@/components/responsive-picture";

export function Hero() {
  return (
    <header className="grid gap-10 px-6 py-section md:grid-cols-2 md:items-center md:gap-12 lg:px-12">
      <div className="flex flex-col items-start gap-6">
        <p className="font-body text-base font-bold text-red">
          Танцово студио VS DANCE StudioS · от 2009 г.
        </p>

        <h1 className="font-display text-display text-ink">
          Танцово студио в София за деца, младежи и възрастни
        </h1>

        <p className="hidden max-w-prose font-body text-base text-ink md:block">
          Улични танци и съвременни техники в две студиа — на бул. Витоша 91 и
          в ж.к. Бъкстон. Мисията ни е да бъдем мост между мечтите ти и
          тяхното осъществяване.
        </p>
        <p className="max-w-prose font-body text-base text-ink md:hidden">
          Улични танци и съвременни техники в две студиа — Витоша 91 и
          Бъкстон.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://vs.dance/tantsovi-klasove/"
            className="rounded-md bg-red px-8 py-4 font-body text-base font-bold text-paper transition-colors hover:bg-red-hover"
          >
            Вземи 3 безплатни класа
          </a>
          <a
            href="https://vs.dance/tantsovi-klasove/#graf"
            className="rounded-md border border-ink px-8 py-4 font-body text-base font-bold text-ink transition-colors hover:bg-red-tint"
          >
            Виж графика
          </a>
        </div>

        <p className="font-body text-base text-ink-muted">
          От 2009 г.
          <span aria-hidden="true"> · </span>
          Две студиа в София
          <span aria-hidden="true"> · </span>
          Първите 3 класа са безплатни
        </p>
      </div>

      <ResponsivePicture
        name="hero"
        alt="Ученици на VS DANCE StudioS си дават висока пета в кръг след тренировка"
        width={2048}
        height={1365}
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="w-full rounded-lg object-cover"
      />
    </header>
  );
}
