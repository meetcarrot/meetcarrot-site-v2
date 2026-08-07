# HowItWorks Specification

## Overview
- **Target file:** `src/components/HowItWorks.tsx`
- **Verbatim source markup:** `docs/research/markup/section-02.txt` — port it 1:1.
- **Interaction model:** static. No animation, no hover.
- Server component.

## Structure
`section.py-14.lg:py-24` → `div.mx-auto.px-6.container.lg:max-w-324`

- `div.flex.flex-col.gap-6.md:gap-6` >
  `h2.leading-[115%]!.font-poly-sans-wide.text-[32px].md:text-[48px].lg:text-[56px].text-center`
  — "One bill, `<br class="md:hidden"/>` two payments"
- `div.mt-14.lg:mt-20.grid.grid-cols-1.lg:grid-cols-3.gap-14.lg:gap-0.lg:-ml-6.lg:-mr-6`

Each of three steps is a bare `div` containing **two** `next/image` elements —
the target ships separate crops per breakpoint, do not collapse them into one:
- mobile: `width={296} height={418}` `class="block lg:hidden mx-auto mb-6 max-w-full"`
- desktop: `width={432} height={611}` `class="hidden lg:block mx-auto mb-8 max-w-full"`

then `p.font-medium.text-[18px].md:text-[24px].text-center.mb-2` (title) and
`p.text-[16px].font-normal.leading-[1.33].text-center.lg:text-[18px]` (copy).

| Step | alt | Images | Title | Copy |
| --- | --- | --- | --- | --- |
| 1 | "app view: product selector" | `/images/slide-1.png`, `/images/slide-1-lg.png` | Pick your bill | "Add your rent, mortgage, car payment, `<br class="hidden md:block"/>` or other bills. Takes about 2 minutes." |
| 2 | "app view: split example" | `/images/slide-2.png`, `/images/slide-2-lg.png` | We split it | "We look at your cash flow and set your split, `<br class="hidden md:block"/>` anywhere from 30% to 50% of the bill." |
| 3 | "app view: schedule" | `/images/slide-3.png`, `/images/slide-3-lg.png` | Pay on your schedule | "1st half when the bill is due. `<br class="hidden md:block"/>` 2nd half two weeks later." |

All images `loading="lazy"`.

## Responsive
- **1440:** 3 columns, `gap-0`, negative side margins, desktop crops, body 18px.
- **768:** single column, `gap-14`, mobile crops, `<br class="hidden md:block">` active.
- **390:** single column, mobile crops, line breaks collapsed.
