# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Verbatim source markup:** `docs/research/markup/section-00.txt` — port it 1:1.
- **Interaction model:** static. No animations, no hover states.
- Server component.

## Structure
`section.bg-golden.pt-18.md:pt-28[data-header-theme="golden"]`
→ `div.mx-auto.px-6.container.lg:max-w-324.pt-12`
→ `div.flex.justify-between.gap-6` with three children:

1. Left photo column — `h-fill flex-1 relative hidden lg:block`, inner
   `absolute inset-0 -bottom-12 rounded-3xl overflow-hidden shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]`
   holding `deco-left.png` (`next/image` `fill`, `object-cover`, alt "dad with son",
   `sizes="(min-width: 1024px) 33vw, 0vw"`).
2. Copy column — `w-120 md:w-full lg:w-98.5 max-w-full mx-auto`.
3. Right photo column — same as (1) with `deco-right.png`, alt "girl with dog".

Copy column contents, in order:
- `h1.leading-[115%]!.font-poly-sans-wide.text-center.text-[40px].md:text-[56px].lg:text-[64px].lg:pt-12.leading-[1.15]`
  — "Big bills. `<br/>` Better timing."
- `p.text-[16px].font-normal.mb-6.mt-1.md:mt-1.25.text-center.leading-[1.6]` —
  "Your biggest bills hit all at once. `<br class="hidden lg:block"/>` Split Pay
  breaks them into two smaller payments. `<br class="hidden md:block"/>` Less
  pressure, more room to breathe."
- `div.w-70.max-w-full.flex.justify-center.mx-auto` wrapping the primary CTA
  ("Get started", `<Button variant="primary" size="default">`).
- Checklist: `div.py-8.md:py-10.lg:pb-12.opacity-65.flex.flex-col.md:flex-row.md:justify-center.lg:flex-col.gap-2.md:gap-0.lg:gap-2`
  with three `p.font-normal.flex.items-center.justify-center.gap-2.text-[14px]`,
  each prefixed by `<CheckIcon className="opacity-65" width={12} height={10} />`.
  Between them at `md` only: `p.font-normal.opacity-25.text-[14px].mx-4.hidden.md:block.lg:hidden` containing "|".
  Items: "No credit check", "Works with any landlord or lender", "Set up in minutes".
- Mobile photo grid — `div.grid.grid-cols-2.gap-6.h-60.md:h-134.lg:hidden`, two
  cells of `w-full h-72 md:h-150 relative rounded-3xl overflow-hidden shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]`
  holding the same two images with `sizes="(max-width: 1023px) 50vw, 0vw"`.

## Assets
`/images/deco-left.png`, `/images/deco-right.png`, `<CheckIcon />`.

## Responsive
- **1440:** three columns; photos flank the copy and bleed 48px below the golden band.
- **768:** photo columns hidden; the in-copy `grid-cols-2` block shows them at `h-150`; checklist becomes one pipe-separated row.
- **390:** copy column `w-120`, heading 40px, checklist stacks, photo grid `h-60`/cells `h-72`.
