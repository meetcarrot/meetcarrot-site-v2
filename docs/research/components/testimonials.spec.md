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
with **three** children, in this order:

1. quote card (testimonial `2*i`)
2. quote card (testimonial `2*i + 1`)
3. **photo card** — one per column, `/images/img-1.png` … `/images/img-9.png`
   matching column index 0…8

The photo card is easy to miss: it is absent from any summary of the text
content but is clearly visible in the reference screenshot as a full-height
image tile between the quote cards.

```html
<div class="w-full flex-1 select-none overflow-hidden rounded-[20px] lg:rounded-4xl shadow-[0_12px_24px_0_rgba(0,0,0,0.05)]">
  <img class="w-full h-full object-cover" … />
</div>
```
`flex-1` is what makes the photo absorb the column's leftover height, so column
heights stay equal across the rail. Keep `select-none` — it stops the image
ghosting during a drag.

Quote card:
```
w-full rounded-[20px] p-6 lg:rounded-4xl lg:p-10
shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] <theme>
```
where `<theme>` is the entry's `theme` field.

Quote card body, in order:
- `div.flex.items-center.gap-3.lg:gap-4`
  - avatar: `div.size-10.lg:size-14.rounded-full.flex.items-center.justify-center.font-semibold.text-[14px].lg:text-[18px].leading-none.uppercase.shrink-0`
    plus the theme's avatar pair (below)
  - `span.text-[14px].lg:text-[18px].font-medium.leading-none` — the name
- horizontal rule: `div.h-px.my-4.lg:my-8.<divider>`
- quote: `p.text-[16px].lg:text-[24px].font-medium.leading-[1.3]`

### Theme lookup (measured, not derivable by swapping)

| Card theme | Avatar | Divider |
| --- | --- | --- |
| `bg-gray-400 text-white` | `bg-white text-gray-400` | `bg-white/15` |
| `bg-golden text-gray-400` | `bg-gray-400 text-golden` | `bg-black/15` |
| `bg-orange-100 text-white` | `bg-white text-orange-100` | `bg-black/15` |
| `bg-white text-gray-400` | `bg-orange-100 text-white` | `bg-black/10` |

Note the `bg-white` card's avatar is **orange**, not a plain inversion — encode
this table literally.

## Loop mechanics (measured)
- 18 testimonials → 9 columns (2 quote cards + 1 photo each) → rendered **3×** = 27 columns.
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
`/images/average-rating.svg`, `/images/img-1.png` … `/images/img-9.png`.

## Responsive
- **1440:** columns `w-1/4`, `gap-8`, cards `rounded-4xl p-10`, avatar `size-14`, name 18px.
- **768:** columns `w-1/3`, `gap-6`, cards `rounded-[20px] p-6`.
- **390:** columns `w-1/2` with `min-w-60` floor, badge `w-40`.
