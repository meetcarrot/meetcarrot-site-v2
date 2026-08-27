import { MAIN_ID } from "@/lib/seo";

/**
 * First focusable control on every page. Hidden until tabbed to, then jumps
 * past the fixed header into `<main>`.
 */
export function SkipToContent() {
  return (
    <a
      href={`#${MAIN_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-[16px] focus:font-medium focus:shadow-[0_8px_16px_0_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-2"
    >
      Skip to content
    </a>
  );
}
