export interface HeroShot {
  src: string;
  alt: string;
  /**
   * `object-cover` crop. Left shots keep the person + phone in the tall
   * column; right shots keep the payment (or the closest equivalent).
   */
  position: string;
  /** Optional extra filter — pair 1's payment photo is a touch dark. */
  filter?: string;
}

export interface HeroPair {
  id: 1 | 2 | 3 | 4 | 5;
  left: HeroShot;
  right: HeroShot;
}

/**
 * Display order (by `id`). Always starts on 5, then 1 → 4 → 2 → 3 → 5…
 */
export const HERO_PAIR_CYCLE = [5, 1, 4, 2, 3] as const satisfies readonly HeroPair["id"][];

export const HERO_PAIRS: readonly HeroPair[] = [
  {
    id: 1,
    left: {
      src: "/images/deco-left.jpg",
      alt: "Smiling woman looking at her phone on a city street",
      position: "object-center",
    },
    right: {
      src: "/images/deco-right.jpg",
      alt: "Woman tapping a card to pay at a restaurant",
      position: "object-center",
      filter: "brightness-105",
    },
  },
  {
    id: 2,
    left: {
      src: "/images/hero/left-2.jpg",
      alt: "Woman looking at her phone on a sunlit city sidewalk",
      position: "object-[58%_center]",
    },
    right: {
      src: "/images/hero/right-2.jpg",
      alt: "Woman tapping a card to pay at a studio",
      position: "object-[42%_center]",
    },
  },
  {
    id: 3,
    left: {
      src: "/images/hero/left-3.jpg",
      alt: "Man looking at his phone on a sunny street",
      position: "object-[58%_center]",
    },
    right: {
      src: "/images/hero/right-3.jpg",
      alt: "Man choosing a shirt in a clothing boutique",
      position: "object-[46%_center]",
    },
  },
  {
    id: 4,
    left: {
      src: "/images/hero/left-4.jpg",
      alt: "Woman looking at her phone on a tree-lined sidewalk",
      position: "object-[62%_center]",
    },
    right: {
      src: "/images/hero/right-4.jpg",
      alt: "Woman dining at a cafe",
      position: "object-center",
    },
  },
  {
    id: 5,
    left: {
      src: "/images/hero/left-5.jpg",
      alt: "Man looking at his phone on a sunny street",
      position: "object-center",
    },
    right: {
      src: "/images/hero/right-5.jpg",
      alt: "Man paying with a card at a shop counter",
      position: "object-[48%_center]",
    },
  },
];
