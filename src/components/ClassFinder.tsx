import { ResponsivePicture } from "@/components/ResponsivePicture";
import { LocationFilter } from "@/components/LocationFilter";
import { CLASS_CARDS, cardLocationLabel } from "@/lib/classes";
import { ctaClickDataAttr } from "@/lib/analytics";

const CARDS_SCOPE_ID = "class-finder-cards";

export function ClassFinder() {
  return (
    <section aria-labelledby="class-finder-heading" className="px-6 py-section lg:px-12">
      <h2 id="class-finder-heading" className="font-display text-4xl text-ink">
        Открий подходящата тренировка
      </h2>

      <ul id={CARDS_SCOPE_ID} className="mt-10 grid gap-6 md:grid-cols-3">
        {CLASS_CARDS.map((card) => {
          const allLabel = cardLocationLabel(card);
          return (
            <li
              key={card.ageLabel}
              data-card
              data-all-label={allLabel}
              className="elevated elevated-interactive h-full rounded-lg"
            >
              <a
                href={card.href}
                data-cta-event={ctaClickDataAttr({
                  cta_id: `class_finder_${card.id}`,
                  cta_text: card.ageLabel,
                  cta_location: "class_finder",
                  cta_destination: card.href,
                })}
                className="group flex h-full flex-col gap-4 rounded-lg border border-ink-muted bg-paper p-6 transition-colors duration-500 hover:border-red"
              >
                <div className="brand-frame [--frame-inset:-0.75rem] [--frame-size:1.5rem]">
                  <div className="overflow-hidden rounded">
                    <ResponsivePicture
                      name={card.imageName}
                      // Decorative: the h3 below already names the age group, and the
                      // style chips + footer cover what the photo would otherwise convey.
                      alt=""
                      width={800}
                      height={533}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="font-display text-2xl text-ink transition-colors duration-500 group-hover:text-red">
                  {card.ageLabel}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {card.styles.map((style) => (
                    <li
                      key={style.name}
                      data-locations={style.locations.join(" ")}
                      className="rounded-full border border-ink px-3 py-1 font-body text-base text-ink"
                    >
                      {style.name}
                    </li>
                  ))}
                </ul>
                <p data-card-footer className="mt-auto font-body text-base text-ink-muted">
                  {allLabel}
                </p>
                <p data-empty-state hidden className="mt-auto font-body text-base text-ink-muted">
                  Няма класове на тази локация
                </p>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
        <LocationFilter scopeId={CARDS_SCOPE_ID} />
        <a
          href="https://vs.dance/tantsovi-klasove/#graf"
          className="group inline-flex min-h-11 items-center gap-2 py-3 font-body text-base font-bold text-red underline-offset-4 hover:underline"
        >
          Виж целия график
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
