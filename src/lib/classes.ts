export type LocationId = "vitosha" | "buxton";

export const LOCATIONS: { id: LocationId; label: string }[] = [
  { id: "vitosha", label: "Витоша 91" },
  { id: "buxton", label: "Бъкстон" },
];

export type ClassCard = {
  id: string;
  ageLabel: string;
  styles: string[];
  href: string;
  imageName: string;
  alt: string;
  accented?: boolean;
};

// Style-chip locations aren't split per style anywhere in the source
// material — every card lists both studios together — so every chip is
// modeled as offered at both locations. The location filter still works
// correctly against this data; it just won't remove any chip until a real
// per-style/location split is confirmed by the client.
export const CLASS_CARDS: ClassCard[] = [
  {
    id: "kids",
    ageLabel: "Деца · 7–12 г.",
    styles: ["Hip-hop kids", "Break dance", "Show dance"],
    href: "https://vs.dance/tantsovi-klasove/#class",
    imageName: "card-kids",
    alt: "Деца тренират хип-хоп в студио на VS DANCE StudioS",
  },
  {
    id: "youth",
    ageLabel: "Младежи",
    styles: ["Hip-hop", "Choreography & technique", "VS Youth"],
    href: "https://vs.dance/programi-za-razvitie/",
    imageName: "card-youth",
    alt: "Тийнейджър танцува пред развълнувана публика от връстници",
    accented: true,
  },
  {
    id: "adults",
    ageLabel: "Възрастни",
    styles: ["Beginner hip-hop", "Popping", "Ladies style"],
    href: "https://vs.dance/tantsovi-klasove/#graf",
    imageName: "card-adults",
    alt: "Възрастни танцьорки тренират хореография на високи токчета",
  },
];
