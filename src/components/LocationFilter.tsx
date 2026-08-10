"use client";

import { useRef, useState } from "react";
import { LOCATIONS } from "@/lib/classes";

const OPTIONS = [{ id: "all", label: "Всички" }, ...LOCATIONS];

/**
 * Progressive-enhancement filter: without JS this renders inert buttons and
 * every style chip stays visible (nothing is hidden by default). With JS,
 * selecting a location toggles the `hidden` attribute on chips inside
 * `scopeId` whose `data-locations` doesn't include it — a roving-tabindex
 * ARIA radiogroup, since these are custom-styled controls, not native inputs.
 * The same pass also updates each card's footer/empty-state (via its
 * `[data-card]` wrapper) and an aria-live status announces the change.
 */
export function LocationFilter({ scopeId }: { scopeId: string }) {
  const [selected, setSelected] = useState("all");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(id: string) {
    setSelected(id);
    const scope = document.getElementById(scopeId);
    scope?.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
      let visibleCount = 0;
      card.querySelectorAll<HTMLElement>("[data-locations]").forEach((chip) => {
        const locations = chip.dataset.locations?.split(" ") ?? [];
        const hidden = id !== "all" && !locations.includes(id);
        chip.hidden = hidden;
        if (!hidden) visibleCount++;
      });

      const footer = card.querySelector<HTMLElement>("[data-card-footer]");
      const emptyState = card.querySelector<HTMLElement>("[data-empty-state]");
      if (footer) {
        footer.hidden = visibleCount === 0;
        footer.textContent =
          id === "all" ? (card.dataset.allLabel ?? "") : (OPTIONS.find((o) => o.id === id)?.label ?? "");
      }
      if (emptyState) emptyState.hidden = visibleCount > 0;
    });
  }

  const statusText =
    selected === "all"
      ? "Показани са всички класове"
      : `Показани са класовете в ${OPTIONS.find((o) => o.id === selected)?.label}`;

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % OPTIONS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + OPTIONS.length) % OPTIONS.length;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    select(OPTIONS[nextIndex].id);
    buttonRefs.current[nextIndex]?.focus();
  }

  return (
    <div>
      <div role="radiogroup" aria-label="Локация" className="flex flex-wrap gap-3">
        {OPTIONS.map((option, index) => (
          <button
            key={option.id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected === option.id}
            tabIndex={selected === option.id ? 0 : -1}
            onClick={() => select(option.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className="shine min-h-11 rounded-md border border-ink px-5 py-2 font-body text-base font-bold text-ink hover:border-red hover:bg-red-tint hover:text-red-hover aria-checked:bg-ink aria-checked:text-paper aria-checked:hover:border-ink aria-checked:hover:bg-ink aria-checked:hover:text-paper"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {statusText}
      </p>
    </div>
  );
}
