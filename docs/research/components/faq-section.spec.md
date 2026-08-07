# FaqSection Specification

## Overview
- **Target files:** `src/components/FaqSection.tsx`, `src/components/FaqModal.tsx`
- **Verbatim source markup:** `docs/research/markup/section-04.txt`
- **Data:** `src/data/faqs.ts` (12 entries; `answer` is trusted HTML from the source CMS)
- **Interaction model:** click-driven **modal**, not an accordion. Verified live:
  clicking a question leaves the URL unchanged, adds one `[role=dialog]`, and sets
  `document.body { overflow: hidden }`.
- Client component.

## Section structure
`section.py-14.lg:py-24` → `div.mx-auto.px-6.container.lg:max-w-324`
- `div.flex.flex-col.gap-6.md:gap-6` >
  `h2.leading-[115%]!.font-poly-sans-wide.text-[32px].md:text-[48px].lg:text-[56px].text-center` — "FAQs"
- `div.mt-14.lg:mt-20` > `div.grid.grid-cols-1.md:grid-cols-2.gap-4.lg:gap-6`

Each question is a `<button type="button">` with, verbatim:
```
flex items-center justify-between gap-8 py-4 px-5 lg:px-8 cursor-pointer bg-white
rounded-[20px] md:rounded-3xl lg:rounded-4xl md:min-h-18 lg:min-h-22
transition duration-200 ease-in-out shadow-[0_8px_16px_0_rgba(0,0,0,0.05)]
active:shadow-[0_4px_8px_0_rgba(0,0,0,0.04)] active:scale-[0.99] active:translate-y-px
focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-orange-200/80 focus-visible:ring-offset-white
focus-visible:ring-offset-2
```
Content: `span.text-[16px].leading-[1.33].font-medium.text-left` wrapping a `<b>`
with the question, then `<ChevronRightIcon width={12} height={12} />`
(`stroke="var(--color-black)"`).

Grid fill order is **row-major** — question 1 top-left, question 2 top-right.

## Modal
Rendered on top of everything (`z-40`). Backdrop dims the page; the panel is a
centred rounded white card with generous padding, max width ~720px, and:

1. Close button — circular, top-right of the panel, `aria-label="Close"`, `×` glyph.
2. `h3` with the question — `font-medium text-[20px] lg:text-[24px] mb-4`.
3. The answer, rendered from the trusted `answer` HTML via
   `dangerouslySetInnerHTML`. Style the rich text with a wrapper that gives
   `p { margin-bottom: 1rem }`, `strong { font-weight: 500 }`, and
   `a.external-link { color: var(--color-orange-100); text-decoration: underline }`.
4. Footer row: `Prev` button (disabled at index 0), the label `{i+1} of 12`, and
   `Next` (disabled at the last). Both are pill buttons matching the site style,
   `Prev` with a left chevron, `Next` with a right chevron.

Behaviour:
- Lock `document.body.style.overflow = "hidden"` while open; restore on close.
- Close on backdrop click and on `Escape`.
- Move focus into the panel on open and return it to the triggering button on close.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the `h3`.

## Assets
`<ChevronRightIcon />`.

## Responsive
- **1440:** 2 columns, `gap-6`, rows `rounded-4xl min-h-22 px-8`.
- **768:** 2 columns, `gap-4`, `rounded-3xl min-h-18`.
- **390:** single column, `rounded-[20px] px-5`; modal goes near-full-width with side gutters.
