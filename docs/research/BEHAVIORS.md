# Behaviors — splitpay.com

Findings from the scroll / click / hover / responsive sweep.

## Global

- **No smooth-scroll library.** `window.Lenis` undefined, no `.lenis` or
  `.locomotive-scroll` class, no scroll container. Native scrolling.
- **No scroll-snap on the page.** The single `scroll-snap-type` on the document
  belongs to the testimonial rail.
- **No entrance animations.** Nothing animates in on viewport entry; no
  `IntersectionObserver`-driven fades, no `animation-timeline`. Sections are
  simply present. Do not add any.
- **No CSS keyframe animations** beyond Tailwind's unused `spin`/`pulse`.
- `<html>` is locked to `color-scheme: light only` — there is no dark mode.
- `<body>` carries `transition-colors duration-200 ease-in-out`.

## Header (scroll-driven theming)

The header is `fixed inset-x-0 top-0 z-20` and never hides. It holds two stacked
overlay layers, each `pointer-events-none absolute inset-0` and each masked with
`linear-gradient(to bottom, black, transparent)` so the effect fades out down the
header's height:

1. `backdrop-blur-md` layer — `opacity-0` at the top of the page, `opacity-100`
   once the header no longer sits over the golden hero.
2. `bg-linear-to-t from-golden/10 to-golden` layer — the golden wash used while
   the header sits over the hero.

Both transition with `transition-opacity duration-300 ease-out`, and the header
root transitions `opacity,visibility` over `300ms` with
`cubic-bezier(0.16,1,0.3,1)`.

**Trigger mechanism:** sections declare `data-header-theme`. Only two exist on
this page: the hero (`golden`, top 0, height 742) and the footer (`black`, top
7204). The header resolves whichever themed section is currently behind it.

**Measured state diff** (only the label colour changes):

| | Over hero (`golden`) | Default |
| --- | --- | --- |
| "Get started" / "Sign In" label | `text-golden` | `text-white` |
| Pill background | `bg-black` (unchanged) | `bg-black` |
| Blur layer | `opacity-0` | `opacity-100` |

Verified by reading the live `className` at scrollY 0 vs 1000.

Height: `h-16.5` (66px) mobile, `md:h-28` (112px).

## Product cards

- Illustrations are **Lottie animations**, not SVG assets — `lottie-web` SVG
  renderer output (60 `<g>` transforms, `feComponentTransfer` filters). Sources:
  `/lottie/product_rent.json` (300×240), `product_mortgage.json` (300×170),
  `product_carloan.json` (300×160), plus `_dark` variants for the mobile menu.
  All 25fps, looping, autoplay.
- The SSR HTML renders empty placeholder `<div>`s at the illustration slot; the
  animations mount client-side only.
- Cards have no hover state beyond the shared focus ring. Chevron circles are
  static.

## Testimonial carousel

- Rail classes: `flex py-8 overflow-x-auto scrollbar-none
  [&::-webkit-scrollbar]:hidden cursor-grab snap-x snap-mandatory scroll-smooth
  gap-6 lg:gap-8 min-[1920px]:px-4`.
- Columns: `shrink-0 snap-always snap-center w-1/2 min-w-60 sm:w-1/3 lg:w-1/4`,
  each holding two cards in `h-full flex flex-col items-center justify-center
  gap-6 lg:gap-8`.
- **Not auto-scrolling** — measured `scrollLeft` unchanged over 1.5s at rest.
- **Drag to scroll** (`cursor-grab`) plus native wheel/touch.
- **Looping:** content is tripled (18 → 54 cards / 27 columns) and the rail is
  initialised scrolled to the middle copy (measured `scrollLeft` 4164 of
  `scrollWidth` 10552 at `clientWidth` 1440). Crossing into the first or last
  copy jumps back by one copy width.
- Card theme cycles through `bg-gray-400 text-white`, `bg-golden text-gray-400`,
  `bg-orange-100 text-white`, `bg-white text-gray-400` per testimonial (the
  assignment is fixed per person, captured in `content.json`).

## FAQ

- **Not an accordion.** Each question is a `<button>` that opens one shared
  modal dialog. `document.body` gets `overflow: hidden` while open;
  `document.querySelectorAll('[role=dialog]').length` goes 0 → 1.
- The modal shows the question, the answer as rich HTML, a close button, and
  `Prev` / `1 of 12` / `Next` pagination that walks the whole list.
- Answers are **not** in the page HTML — they come from the page data payload
  and are captured in `docs/research/content.json`.
- Button press feedback: `active:scale-[0.99] active:translate-y-px` and the
  shadow drops from `0 8px 16px 0 rgba(0,0,0,0.05)` to `0 4px 8px 0 rgba(0,0,0,0.04)`.

## Buttons (site-wide)

- `after:` overlay is a `transparent → black` vertical gradient at `opacity-.05`,
  rising to `.09` on `:active`, `transition-opacity duration-200 ease-out`.
- Press: `active:scale-[0.98] active:translate-y-[1px]`, shadow
  `0 2px 6px 0 rgba(0,0,0,0.15)` → `0 1px 3px 0 rgba(0,0,0,0.12)`.
- **Hover changes nothing** — `hover:bg-orange-100` / `hover:bg-black` restate
  the resting colour on purpose.
- Mobile-menu bill cards are the one real hover: `transition-[filter]
  duration-200 ease-out hover:brightness-90`.

## Responsive

| Width | What changes |
| --- | --- |
| 1440 (`lg`) | Hero is 3 columns; product cards 2-up; steps 3-up; footer full layout |
| 768 (`md`) | Hero photos move below the copy as a 2-up grid; product cards stay 2-up; steps stack; hero checklist becomes a single pipe-separated row |
| 390 | Everything single column; hero heading 40px; card titles 22px; steps use the 296×418 image variants; footer switches to its `grid-cols-1` variant |

Header CTA "Get started" is `hidden lg:flex` — below `lg` only "Sign In" and the
hamburger show.
