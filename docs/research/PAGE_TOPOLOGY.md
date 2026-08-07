# Page Topology — splitpay.com homepage

Total document height at 1440px: **7708px**. One flow column, no scroll
container, no scroll-snap on the page, no smooth-scroll library (checked for
Lenis / Locomotive — absent).

Layer order:

| z | Element |
| --- | --- |
| 40 | FAQ modal + backdrop (portal, locks `body` overflow) |
| 30 | Mobile menu overlay (full-screen, black) |
| 20 | `<header>` — `fixed inset-x-0 top-0` |
| 0 | `<main>` flow content, then `<footer>` |

## Section order

| # | Component | Top | Height | Interaction model |
| --- | --- | --- | --- | --- |
| — | `SiteHeader` | fixed | 112px (`h-16.5` → `md:h-28`) | scroll-driven theming |
| 0 | `HeroSection` | 0 | 742 | static; `data-header-theme="golden"` |
| 1 | `ProductCards` | 742 | 1416 | static grid, Lottie illustrations, hover-free |
| 2 | `HowItWorks` | 2159 | 1067 | static 3-column |
| 3 | `Testimonials` | 3226 | 1767 | drag/scroll carousel, snap, looping |
| 4 | `FaqSection` | 4993 | 984 | click → modal with prev/next |
| 5 | `FinalCta` | 5977 | 1240 | static; overlapping phone image |
| — | `SiteFooter` | 7204 | 504 | static; `data-header-theme="black"` |

`<main>` itself has no wrapper classes — sections stack directly.

## Section anatomy

**HeroSection** — `bg-golden pt-18 md:pt-28`. Inner `flex justify-between gap-6`
with three columns at `lg`: left photo (`deco-left.png`), centre copy column
(`w-120 md:w-full lg:w-98.5`), right photo (`deco-right.png`). Photo columns are
`hidden lg:block` and their inner absolute wrapper uses `inset-0 -bottom-12`, so
the images bleed 48px past the golden band. Below `lg` the two photos re-render
as a `grid grid-cols-2` block *inside* the copy column instead.

**ProductCards** — heading pair, then `grid grid-cols-1 md:grid-cols-2 gap-4
lg:gap-8`. Four cards: Rent (`/rent`), Mortgages (`/mortgage`), Car payment
(`/car`) are `<a>`; "Every big bill" is a non-interactive `<div>` with a
"Coming soon" pill. The first three carry Lottie illustrations; the fourth uses
the static `deco.svg`.

**HowItWorks** — heading, then `grid grid-cols-1 lg:grid-cols-3` of three steps.
Each step ships two `<img>` variants (296×418 mobile, 432×611 desktop) toggled
with `block lg:hidden` / `hidden lg:block`.

**Testimonials** — `average-rating.svg` badge, heading, then a horizontally
scrollable rail. 18 unique testimonials, tripled to 54 cards, laid out two-per
column across 27 columns; the rail starts scrolled into the middle copy so it
reads as infinite in both directions.

**FaqSection** — heading, then `grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6`
of 12 buttons. Buttons open a shared modal, they are not accordions.

**FinalCta** — heading, paragraph, CTA, then a `relative h-100 md:h-110 lg:h-200`
frame holding `homepage.png` (fill, `rounded-4xl`) with `homepage_phone.png`
absolutely positioned and deliberately overflowing the bottom edge. The section's
huge bottom padding (`pb-90 sm:pb-25 lg:pb-30`) exists to make room for that
overflow.

**SiteFooter** — `bg-black`, three duplicated layout variants in the DOM
(`grid-cols-1 gap-14 md:hidden`, a `md` variant, and an `lg` variant) rather
than one responsive grid.

## Mobile menu

Opened by the hamburger in the header. Full-screen black overlay containing
`nav[aria-label="Menu"]` with a 4-up grid of bill types (dark Lottie variants),
plus "Learn More" links, and the footer link columns repeated.
