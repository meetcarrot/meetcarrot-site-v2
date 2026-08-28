export const FONT_PREVIEW_STORAGE_KEY = "carrot:font-preview-v2";

export interface PreviewFont {
  id: string;
  label: string;
  family: string;
  note?: string;
}

export const PREVIEW_FONTS: readonly PreviewFont[] = [
  {
    id: "gt-america",
    label: "GT America",
    family: "var(--font-gt-america), Arial, sans-serif",
  },
  {
    id: "polysans-wide",
    label: "PolySans Wide",
    family: "var(--font-poly-sans-wide), Arial, sans-serif",
  },
  { id: "inter", label: "Inter", family: "Inter, sans-serif" },
  { id: "geist", label: "Geist", family: "Geist, sans-serif" },
  { id: "satoshi", label: "Satoshi", family: "var(--font-satoshi), sans-serif" },
  {
    id: "clash-display",
    label: "Clash Display",
    family: '"Clash Display", sans-serif',
  },
  {
    id: "cabinet-grotesk",
    label: "Cabinet Grotesk",
    family: '"Cabinet Grotesk", sans-serif',
  },
  {
    id: "bricolage",
    label: "Bricolage Grotesque",
    family: "var(--font-bricolage), sans-serif",
  },
  {
    id: "avenir",
    label: "Avenir",
    family: 'Avenir, "Avenir Next", sans-serif',
    note: "Mac system font",
  },
  {
    id: "avenir-rounded",
    label: "Avenir Rounded",
    family: '"Avenir Next Rounded", "Avenir Rounded", Nunito, sans-serif',
    note: "Nunito stand-in — macOS has no Rounded cut",
  },
];

export interface PreviewPairing {
  id: string;
  label: string;
  body: string;
  headline: string;
  badge: "now" | "rec" | "orig";
}

export const PREVIEW_PAIRINGS: readonly PreviewPairing[] = [
  {
    id: "satoshi-bricolage",
    label: "Satoshi + Bricolage Grotesque",
    body: "satoshi",
    headline: "bricolage",
    badge: "now",
  },
  {
    id: "current",
    label: "GT America + PolySans Wide",
    body: "gt-america",
    headline: "polysans-wide",
    badge: "orig",
  },
  {
    id: "inter-clash",
    label: "Inter + Clash Display",
    body: "inter",
    headline: "clash-display",
    badge: "rec",
  },
  {
    id: "geist-cabinet",
    label: "Geist + Cabinet Grotesk",
    body: "geist",
    headline: "cabinet-grotesk",
    badge: "rec",
  },
  {
    id: "avenir-pair",
    label: "Avenir + Avenir Rounded",
    body: "avenir",
    headline: "avenir-rounded",
    badge: "rec",
  },
];

export const DEFAULT_PREVIEW = {
  body: "satoshi",
  headline: "bricolage",
} as const;

export function familyForFontId(id: string): string | undefined {
  return PREVIEW_FONTS.find((font) => font.id === id)?.family;
}

/** Inline boot so a saved choice applies before the first paint. */
export function fontPreviewBootScript(): string {
  const map = Object.fromEntries(
    PREVIEW_FONTS.map((font) => [font.id, font.family]),
  );
  return `(function(){try{var m=${JSON.stringify(map)};var s=JSON.parse(localStorage.getItem(${JSON.stringify(FONT_PREVIEW_STORAGE_KEY)})||"null");if(!s)return;var r=document.documentElement;if(s.body&&m[s.body])r.style.setProperty("--font-body",m[s.body]);if(s.headline&&m[s.headline])r.style.setProperty("--font-headline",m[s.headline]);}catch(e){}})();`;
}
