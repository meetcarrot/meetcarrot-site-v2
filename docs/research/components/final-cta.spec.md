# FinalCta Specification

## Overview
- **Target file:** `src/components/FinalCta.tsx`
- **Verbatim source markup:** `docs/research/markup/section-05.txt` — port it 1:1.
- **Interaction model:** static.
- Server component.

## Structure
`section.pt-14.pb-90.sm:pb-25.lg:pb-30` → `div.mx-auto.px-6.container.lg:max-w-324`

`div.flex.flex-col.gap-6.md:gap-6`:
- `h2.leading-[115%]!.font-poly-sans-wide.text-[32px].md:text-[48px].lg:text-[56px].text-center` — "Make the month easier"
- `p.text-[16px].font-normal.leading-[1.33].text-center.lg:text-[18px]` —
  "Split your bills into smaller payments and make room for the things that matter most."
- `div.w-70.max-w-full.mx-auto` > `<Button variant="primary" size="default">Get Started</Button>`
  (note the capital S — the hero says "Get started", this one says "Get Started").

Image block — `div.mt-14.lg:mt-20` > `div.relative.h-100.md:h-110.lg:h-200`:
- `next/image` `fill`, `className="object-cover rounded-4xl"`, `alt=""`,
  `src="/images/homepage.png"`,
  `sizes="(max-width: 767px) 92vw, (max-width: 1023px) 92vw, 1200px"`.
- Phone overlay — `next/image` `width={872} height={1674}`,
  `alt="Split Pay app on a phone"`, `src="/images/homepage-phone.png"`,
  `sizes="(max-width: 767px) 200px, (max-width: 1023px) 240px, 368px"`, classes:
  ```
  absolute h-auto w-50 md:w-60 lg:w-92 right-[50%] left-[50%]
  transform-[translateX(-50%)] sm:left-auto sm:transform-none sm:right-4
  bottom-[-80%] sm:-bottom-15 lg:-bottom-25
  ```
  Both images `loading="lazy"`.

**Do not clip the overlay.** The phone deliberately overflows the frame's bottom
edge; the section's oversized bottom padding (`pb-90` on mobile) is the room made
for it. Keep the frame `relative` without `overflow-hidden`.

## Responsive
- **1440:** frame `h-200`, phone `w-92` anchored `right-4`, `-bottom-25`.
- **768:** frame `h-110`, phone `w-60`, `-bottom-15`, right-anchored (from `sm`).
- **390:** frame `h-100`, phone `w-50` centred via the `left/right 50%` + translate trick, `bottom-[-80%]`, section `pb-90`.
