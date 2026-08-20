import type { AccentMotion } from "@/components/AnimatedIcon";
import type { Vertical } from "@/data/product-testimonials";

/**
 * The four category illustrations, each split into a base object and one accent
 * that animates over it.
 *
 * Shared rather than declared per surface: the homepage cards, the menu and the
 * vertical heroes all show these, and three copies of the placement percentages
 * would drift the moment any of them was nudged.
 */
export interface CategoryIcon {
  base: string;
  accent: string;
  /** Accent placement, as percentages of the icon square. */
  accentBox: { left: string; top: string; width: string };
  motion: AccentMotion;
  steam?: boolean;
}

export const CATEGORY_ICONS: Record<Vertical, CategoryIcon> = {
  hospitality: {
    base: "/images/categories/hospitality-base.png",
    accent: "/images/categories/hospitality-cup.png",
    accentBox: { left: "58%", top: "50%", width: "26%" },
    motion: "bob",
    steam: true,
  },
  retail: {
    base: "/images/categories/retail-base.png",
    accent: "/images/categories/retail-bag.png",
    accentBox: { left: "60%", top: "48%", width: "30%" },
    motion: "swing",
  },
  services: {
    base: "/images/categories/services-base.png",
    accent: "/images/categories/services-wrench.png",
    accentBox: { left: "54%", top: "58%", width: "34%" },
    motion: "spin",
  },
  digital: {
    base: "/images/categories/digital-base.png",
    accent: "/images/categories/digital-cart.png",
    accentBox: { left: "62%", top: "40%", width: "30%" },
    motion: "roll",
  },
};
