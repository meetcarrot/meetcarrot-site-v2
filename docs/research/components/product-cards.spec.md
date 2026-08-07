# ProductCards Specification

## Overview
- **Target file:** `src/components/ProductCards.tsx`
- **Verbatim source markup:** `docs/research/markup/section-01.txt` — port it 1:1.
- **Interaction model:** static grid. No hover state; only the shared focus ring.
- Section wrapper is a server component; illustrations mount via the client
  `LottieAnimation` component.

## Structure
`section.pt-32.md:pt-40.lg:pt-36.pb-14.lg:pb-24` → `div.mx-auto.px-6.container.lg:max-w-324`

Heading block — `div.flex.flex-col.gap-6.md:gap-6`:
- `h2.leading-[115%]!.font-poly-sans-wide.text-[32px].md:text-[48px].lg:text-[56px].text-center`
  — "Split your `<br class="md:hidden"/>` largest bills"
- `p.text-[16px].font-normal.leading-[1.33].text-center.lg:text-[18px]` —
  "Rent, mortgage, car payment. Each one splits in two. `<br class="hidden lg:block"/>`
  Your landlord or lender gets paid in full on day one. We handle the rest."

Grid — `div.grid.grid-cols-1.md:grid-cols-2.gap-4.lg:gap-8.mt-14.lg:mt-20`.

Cards 1–3 are `<Link>` wrappers with
`focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2 rounded-[20px] block`.
Card body: `div.shadow-[0_2px_6px_0_rgba(0,0,0,0.06)].p-6.pt-8.lg:p-12.rounded-[20px].bg-white`.

| Card | href | Illustration slot classes | Inner slot | Lottie |
| --- | --- | --- | --- | --- |
| Rent | `/rent` | `h-26 lg:h-54 w-40 lg:w-54 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end` | `h-26 lg:h-46` | `/lottie/product_rent.json` |
| Mortgages | `/mortgage` | `h-26 md:mt-2 lg:h-54 lg:mt-5 w-40 lg:w-54 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end` | `h-21 lg:h-44` | `/lottie/product_mortgage.json` |
| Car payment | `/car` | `h-26 lg:h-54 w-40 lg:w-80 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end` | `h-18 relative -right-4 lg:h-36 lg:-bottom-3` | `/lottie/product_carloan.json` |

Give the inner slot `<LottieAnimation src={...} className="h-full w-full [&_svg]:h-full! [&_svg]:w-full!" />`
— that wrapper class is what the target uses to make the Lottie SVG fill its box.

Footer row of each card — `div.flex.items-end.gap-4`:
- `div.flex-1` with
  `p.leading-[115%]!.font-poly-sans-wide.text-[22px].md:text-[24px].lg:text-[40px].lg:tracking-[0.8px].mb-1` (title)
  and `p.text-[16px].font-normal.leading-[1.33].lg:h-11` (description).
- Chevron circle — `div.w-8.lg:w-12.h-8.lg:h-12.flex.items-center.justify-center.bg-orange-100.rounded-full.shrink-0`
  holding `<ChevronRightIcon width={12} height={12} />` with `stroke="var(--color-white)"`.

Copy (verbatim, keep the `<br>` positions):
- Rent — "The 1st of the month, finally on `<br class="max-[413px]:hidden lg:hidden"/>` your side."
- Mortgages — "Your mortgage, on your schedule. `<br class="max-[413px]:hidden"/>` No refinancing. No catch."
- Car payment — "Your car payment, without `<br class="max-[413px]:hidden lg:hidden"/>` the flinch."

Card 4 is **not** a link — a plain `div` with the same body classes:
- Illustration: `div.illustration-component.flex.items-center.justify-center.h-26.lg:h-54.mb-6.lg:mb-12.lg:items-end`
  holding `<Image src="/images/deco.svg" alt="cash flow" />`.
- Title "Every big bill"; copy "Insurance, tuition, utilities, the ones
  `<br class="hidden lg:block"/>` that keep you up are next."
- Desktop pill: `div.bg-gray-200.h-12.rounded-3xl.px-4.items-center.hidden.lg:flex.shrink-0`
  with `p.text-[16px].font-normal.leading-[1.33].text-gray-600` "Coming soon".
- Mobile badge: `div.w-8.lg:w-12.h-8.lg:h-12.flex.items-center.justify-center.bg-gray-200.rounded-full.lg:hidden.shrink-0`
  holding `<ClockIcon width={14} height={14} />`.

## Assets
`/images/deco.svg`, `/lottie/product_{rent,mortgage,carloan}.json`,
`<ChevronRightIcon />`, `<ClockIcon />`.

## Responsive
- **1440:** 2×2 grid, `gap-8`, card padding `p-12`, titles 40px, illustration slots `h-54`.
- **768:** 2×2 grid, `gap-4`, padding `p-6 pt-8`, titles 24px.
- **390:** single column; the `max-[413px]:hidden` line breaks collapse; "Coming soon" pill becomes the clock badge.
