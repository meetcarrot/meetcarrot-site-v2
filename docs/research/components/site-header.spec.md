# SiteHeader Specification

## Overview
- **Target files:** `src/components/SiteHeader.tsx`, `src/components/MobileMenu.tsx`
- **Verbatim source markup:** `docs/research/markup/header-00.txt` (header),
  `docs/research/markup/nav-00.txt` (mobile menu panel)
- **Interaction model:** scroll-driven theming + click-to-open overlay menu
- **Client component** (`"use client"`) — needs scroll state and menu state.

## DOM structure
```
header.fixed.inset-x-0.top-0.z-20
  div  ← blur layer (aria-hidden, pointer-events-none, absolute inset-0)
  div  ← golden wash layer (aria-hidden, pointer-events-none, absolute inset-0)
  div.relative > div.w-full > div.mx-auto.px-6.flex.justify-between.items-center.h-16.5.md:h-28
    a[href="/"][aria-label="Split Pay home"].block.rounded.mr-2.w-38.md:w-50  → <SplitPayLogo className="transition-colors duration-200 w-full text-gray-400" />
    div.flex.items-center.justify-end.gap-4.flex-1
      button "Get started"  (hidden lg:flex, max-w-45)
      button "Sign In"      (h-10 md:h-12, max-w-20 md:max-w-30, whitespace-nowrap)
      button hamburger      (h-10 w-10 md:h-12 md:w-12 rounded-full) → <MenuIcon />
```

Root classes, verbatim:
```
fixed inset-x-0 top-0 z-20 transition-[opacity,visibility] duration-300
ease-[cubic-bezier(0.16,1,0.3,1)] visible opacity-100
```

Blur layer, verbatim:
```
pointer-events-none absolute inset-0 backdrop-blur-md transition-opacity
duration-300 ease-out mask-[linear-gradient(to_bottom,black,transparent)]
[-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] opacity-0
```

Golden wash layer, verbatim:
```
pointer-events-none absolute inset-0 bg-linear-to-t
transition-[opacity,--tw-gradient-from,--tw-gradient-to] duration-300 ease-out
from-golden/10 to-golden mask-[linear-gradient(to_bottom,black,transparent)]
[-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] opacity-0
```

## States & behaviors

### Scroll-driven theme (measured)
- **Trigger:** sections carry `data-header-theme`. On this page: the hero
  (`golden`) and the footer (`black`). Resolve which themed section currently
  sits behind the header band and apply its theme. Implement with an
  `IntersectionObserver` over `[data-header-theme]` using
  `rootMargin: "0px 0px -100% 0px"` (i.e. intersect only the top strip), or an
  equivalent scroll handler. Default theme when none matches: `light`.
- **State A — `golden` (scrollY 0):** blur layer `opacity-0`; "Get started" and
  "Sign In" labels `text-golden`; hamburger label `text-gray-100`.
- **State B — default (measured at scrollY 1000):** blur layer `opacity-100`;
  "Get started" and "Sign In" labels `text-white`; hamburger `text-gray-100`.
- **State C — `black` (over footer):** same as `golden` for label colour
  (`text-golden`) with the blur layer `opacity-0`.
- **Transition:** `transition-opacity duration-300 ease-out` on the layers;
  `transition-colors duration-200` on the label colour.
- Pill background is `bg-black` in every state — only the label colour moves.

### Buttons
Use `Button` from `src/components/ui/button.tsx`:
- "Get started" → `variant="darkOnGolden"` on golden/black themes, `variant="dark"`
  otherwise; `size="default"`; extra classes `max-w-45 hidden lg:flex items-center justify-center`.
- "Sign In" → same variant logic; `size="compact"`; extra classes
  `max-w-20 md:max-w-30 whitespace-nowrap items-center justify-center`.
- Hamburger → `variant="dark"` with `size="icon"`, `aria-label="Open menu"`,
  `aria-controls="public-header-menu"`, `aria-expanded={open}`. Inner span:
  `flex items-center justify-center transition-transform duration-200 ease-out`
  plus `rotate-0` closed / `rotate-90` open. Icon: `<MenuIcon />` with
  `fill="var(--color-golden)"` rects (already baked into the icon).

## MobileMenu
Full-screen overlay, `z-30`, `bg-black`, id `public-header-menu`, rendered when
open. Locks `document.body` overflow. Contains, in order:

1. A header row mirroring the site header (logo + "Sign In" + close button, the
   hamburger rotated to a close state).
2. `nav[aria-label="Menu"]` with classes
   `mx-auto px-6 container lg:max-w-324 min-h-0 flex-1 overflow-y-auto`.
3. Inside: `p` "Which bill would you like to split?" —
   `text-[16px] leading-[1.33] font-medium text-white md:text-[24px] mb-6 md:mb-8`.
4. `div.grid.grid-cols-2.md:grid-cols-4.gap-6.lg:flex-1` of four bill cards.

Bill card (verbatim classes):
```
relative h-54 md:h-58 lg:h-full rounded-3xl px-4 bg-linear-to-b from-white/10
to-transparent shadow-[0_12px_24px_rgba(0,0,0,0.5)]
shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.45)]
before:bg-linear-to-b before:from-white before:to-transparent before:opacity-10
bg-black cursor-pointer flex flex-col justify-center transition-[filter]
duration-200 ease-out hover:brightness-90 focus-visible:z-10
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80
focus-visible:ring-offset-white transition duration-200 ease-in-out
```
Card body: `div.h-25.flex.justify-center.items-end` holding the **dark** Lottie,
then `div.mt-4.h-12` with
`p.font-medium.tracking-[-0.56px].text-white.text-[18px].text-center`.

Cards: Rent → `/rent` + `/lottie/product_rent_dark.json`; Mortgage →
`/mortgage` + `product_mortgage_dark.json`; Car payment → `/car` +
`product_carloan_dark.json`; "Other Bills" + a "Coming soon" label, not a link.

Then a "Learn More" list of links: How it works `/how-it-works`, Safety &
security `/safety-and-security`, About us `/about-us`, Help & FAQs `/help`,
Terms of service `/terms`, Privacy policy `/privacy`.

Read `docs/research/markup/nav-00.txt` for the exact remaining markup.

## Assets
- `<SplitPayLogo />`, `<MenuIcon />`, `<ChevronRightIcon />` from `@/components/icons`
- `<LottieAnimation />` from `@/components/LottieAnimation`

## Text content (verbatim)
"Get started", "Sign In", "Which bill would you like to split?", "Rent",
"Mortgage", "Car payment", "Other Bills", "Coming soon", "Learn More".

## Responsive
- **1440:** all three buttons visible, header `h-28`, logo `w-50`.
- **768:** "Get started" hidden (`hidden lg:flex`), header `h-28`, logo `w-50`.
- **390:** header `h-16.5`, logo `w-38`, buttons `h-10`.
