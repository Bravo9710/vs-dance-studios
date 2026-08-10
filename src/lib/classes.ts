export type LocationId = "vitosha" | "buxton";

export const LOCATIONS: { id: LocationId; label: string }[] = [
  { id: "vitosha", label: "Витоша 91" },
  { id: "buxton", label: "Бъкстон" },
];

export type StyleEntry = {
  name: string;
  locations: LocationId[];
  // false = the source didn't name a studio for this style; it's modeled as
  // offered at both locations until the client confirms a real split.
  confirmed: boolean;
};

export type ClassCard = {
  id: string;
  ageLabel: string;
  styles: StyleEntry[];
  href: string;
  imageName: string;
};

export function cardLocationLabel(card: ClassCard): string {
  const ids = new Set(card.styles.flatMap((style) => style.locations));
  return LOCATIONS.filter((location) => ids.has(location.id))
    .map((location) => location.label)
    .join(" · ");
}

// Locations sourced from the audit of vs.dance — see the citation on each
// style below.
export const CLASS_CARDS: ClassCard[] = [
  {
    id: "kids",
    ageLabel: "Деца · 7–12 г.",
    styles: [
      // Homepage FAQ names both studios explicitly: Studio #1 бул. Витоша 91
      // (Sat/Sun 12:30-13:30) and Studio #2 ж.к. Бъкстон (Mon/Wed 18:00-19:00).
      { name: "Hip-hop kids", locations: ["vitosha", "buxton"], confirmed: true },
      // Homepage FAQ: "Брейк Денс за деца преподава Валентин Радков ...
      // Studio #2 – ж.к. Бъкстон".
      { name: "Break dance", locations: ["buxton"], confirmed: true },
      // Homepage FAQ gives days/times but no studio.
      { name: "Show dance", locations: ["vitosha", "buxton"], confirmed: false },
    ],
    href: "https://vs.dance/tantsovi-klasove/#class",
    imageName: "card-kids",
  },
  {
    id: "youth",
    ageLabel: "Младежи",
    styles: [
      // Not located separately for this group in any source.
      { name: "Hip-hop", locations: ["vitosha", "buxton"], confirmed: false },
      // /tantsovi-klasove/ schedule: ГРАФИК VS DANCE STUDIO #1, бул. Витоша 91.
      { name: "Choreography & technique", locations: ["vitosha"], confirmed: true },
      // A performance squad, not a room — no location named in any source.
      { name: "VS Youth", locations: ["vitosha", "buxton"], confirmed: false },
    ],
    href: "https://vs.dance/programi-za-razvitie/",
    imageName: "card-youth",
  },
  {
    id: "adults",
    ageLabel: "Възрастни",
    styles: [
      // /tantsovi-klasove/ schedule: ГРАФИК VS DANCE STUDIO #2, ж.к. Бъкстон.
      { name: "Beginner hip-hop", locations: ["buxton"], confirmed: true },
      // Same schedule, Studio #2.
      { name: "Popping", locations: ["buxton"], confirmed: true },
      // Same schedule, Studio #2.
      { name: "Ladies style", locations: ["buxton"], confirmed: true },
    ],
    href: "https://vs.dance/tantsovi-klasove/#graf",
    imageName: "card-adults",
  },
];
