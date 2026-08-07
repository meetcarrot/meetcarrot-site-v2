# Testimonials Specification

## Overview
- **Target file:** `src/components/Testimonials.tsx`
- **Verbatim source markup:** `docs/research/markup/section-03.txt`
- **Data:** `src/data/testimonials.ts` (18 entries, `Testimonial` type)
- **Interaction model:** drag / wheel / touch horizontal carousel with CSS snap
  and a tripled-content loop. **Not auto-playing** — measured `scrollLeft`
  unchanged over 1.5s at rest. Do not add an autoplay timer.
- Client component.

## Structure
`section.py-14.lg:py-24`
- `div.flex.flex-col.gap-6.md:gap-6.px-4`
  - `next/image` `/images/average-rating.svg`, alt "rating", `width={239} height={104}`,
    `class="w-40 mx-auto h-auto md:w-57.5"`
  - `h2.leading-[115%]!.font-poly-sans-wide.text-[32px].md:text-[48px].lg:text-[56px].text-center`
    — "What people are saying"
- `div.mt-8.lg:mt-14` > `div.w-full.max-w-480.mx-auto` > the rail.

Rail classes, verbatim:
```
flex py-8 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden cursor-grab
snap-x snap-mandatory scroll-smooth gap-6 lg:gap-8 min-[1920px]:px-4
```

Column: `div.shrink-0.snap-always.snap-center.w-1/2.min-w-60.sm:w-1/3.lg:w-1/4`
containing `div.h-full.flex.flex-col.items-center.justify-center.gap-6.lg:gap-8`
with **two** cards.

Card:
```
w-full rounded-[20px] p-6 lg:rounded-4xl lg:p-10
shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] <theme>
```
where `<theme>` is the entry's `theme` field (one of `bg-gray-400 text-white`,
`bg-golden text-gray-400`, `bg-orange-100 text-white`, `bg-white text-gray-400`).

Card body:
- `div.flex.items-center.gap-3.lg:gap-4`
  - avatar: `div.size-10.lg:size-14.rounded-full.flex.items-center.justify-center.font-semibold.text-[14px].lg:text-[18px].leading-none.uppercase.shrink-0`
    plus an inverted colour pair — for `bg-gray-400 text-white` cards the avatar
    is `bg-white text-gray-400`; derive each avatar pair by swapping the card's
    background and foreground.
  - `span.text-[14px].lg:text-[18px].font-medium.leading-none` — the name
- the quote in a `p` below.

## Loop mechanics (measured)
- 18 testimonials → 9 columns (2 cards each) → rendered **3×** = 27 columns / 54 cards.
- On mount, set `scrollLeft = scrollWidth / 3` so the visible content is the
  middle copy (measured live: `scrollLeft` 4164, `scrollWidth` 10552, `clientWidth` 1440).
- On scroll, when `scrollLeft < scrollWidth / 3 * 0.5` add one copy width; when
  `scrollLeft > scrollWidth / 3 * 1.5` subtract one. Suppress `scroll-smooth`
  during the jump (toggle `scroll-behavior: auto` on the element) so the wrap is invisible.
- Drag: pointer events on the rail — `pointerdown` captures `scrollLeft` and
  `clientX`, `pointermove` applies the delta, `pointerup` releases. Swap
  `cursor-grab` → `cursor-grabbing` while dragging, and disable snap during the
  drag so it doesn't fight the pointer.

## Assets
`/images/average-rating.svg`.

## Responsive
- **1440:** columns `w-1/4`, `gap-8`, cards `rounded-4xl p-10`, avatar `size-14`, name 18px.
- **768:** columns `w-1/3`, `gap-6`, cards `rounded-[20px] p-6`.
- **390:** columns `w-1/2` with `min-w-60` floor, badge `w-40`.
