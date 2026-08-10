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
 */
export function LocationFilter({ scopeId }: { scopeId: string }) {
  const [selected, setSelected] = useState("all");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(id: string) {
    setSelected(id);
    const scope = document.getElementById(scopeId);
    scope?.querySelectorAll<HTMLElement>("[data-locations]").forEach((chip) => {
      const locations = chip.dataset.locations?.split(" ") ?? [];
      chip.hidden = id !== "all" && !locations.includes(id);
    });
  }

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
          className="min-h-11 rounded-md border border-ink px-5 py-2 font-body text-base font-bold text-ink transition-colors aria-checked:bg-ink aria-checked:text-paper"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
