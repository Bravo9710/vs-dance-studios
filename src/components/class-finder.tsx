import { ResponsivePicture } from "@/components/responsive-picture";
import { LocationFilter } from "@/components/location-filter";
import { CLASS_CARDS } from "@/lib/classes";
import { ctaClickDataAttr } from "@/lib/analytics";

const CARDS_SCOPE_ID = "class-finder-cards";

export function ClassFinder() {
  return (
    <section aria-labelledby="class-finder-heading" className="px-6 py-section lg:px-12">
      <h2 id="class-finder-heading" className="font-display text-4xl text-ink">
        Открий подходящата тренировка
      </h2>
      <p className="mt-3 max-w-prose font-body text-base text-ink-muted">
        Започни от възрастта, после стеснѝ по стил и локация.
      </p>

      <ul id={CARDS_SCOPE_ID} className="mt-10 grid gap-6 md:grid-cols-3">
        {CLASS_CARDS.map((card) => (
          <li key={card.ageLabel}>
            <a
              href={card.href}
              data-cta-event={ctaClickDataAttr({
                cta_id: `class_finder_${card.id}`,
                cta_text: card.ageLabel,
                cta_location: "class_finder",
                cta_destination: card.href,
              })}
              className={`flex h-full flex-col gap-4 rounded-lg p-6 transition-colors ${
                card.accented
                  ? "border-2 border-red bg-red-tint"
                  : "border border-ink-muted bg-paper hover:border-red"
              }`}
            >
              <ResponsivePicture
                name={card.imageName}
                alt=""
                width={800}
                height={533}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="aspect-[3/2] w-full rounded object-cover"
              />
              <h3 className="font-display text-2xl text-ink">{card.ageLabel}</h3>
              <ul className="flex flex-wrap gap-2">
                {card.styles.map((style) => (
                  <li
                    key={style}
                    data-locations="vitosha buxton"
                    className="rounded-full border border-ink px-3 py-1 font-body text-base text-ink"
                  >
                    {style}
                  </li>
                ))}
              </ul>
              <p className="mt-auto font-body text-base text-ink-muted">
                Витоша 91 · Бъкстон
              </p>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
        <LocationFilter scopeId={CARDS_SCOPE_ID} />
        <a
          href="https://vs.dance/tantsovi-klasove/#graf"
          className="inline-flex min-h-11 items-center py-3 font-body text-base font-bold text-red underline-offset-4 hover:underline"
        >
          Виж целия график →
        </a>
      </div>
    </section>
  );
}
