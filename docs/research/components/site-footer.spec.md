# SiteFooter Specification

## Overview
- **Target file:** `src/components/SiteFooter.tsx`
- **Verbatim source markup:** `docs/research/markup/footer-00.txt` (the full
  three-variant markup; large, but it is the source of truth — read it)
- **Interaction model:** static. Link hover is the shared focus/transition only.
- Server component.

## Root
```html
<footer class="py-14 lg:pt-24 lg:pb-30 bg-black" data-header-theme="black">
  <div class="mx-auto px-6 container lg:max-w-324"> … </div>
</footer>
```
The `data-header-theme="black"` attribute is required — `SiteHeader` observes it.

## Three layout variants
The target ships the same content three times, gated by breakpoint, instead of
one responsive grid. Reproduce that structure so the breakpoints match:

1. `div.grid.grid-cols-1.gap-14.md:hidden` — mobile
2. the `md`-only variant
3. the `lg` variant (which moves the copyright/disclaimer block above the link columns)

Read `footer-00.txt` for the exact wrapper classes on variants 2 and 3.

## Content (identical in all three)
- `<SplitPayLogo className="text-white" width={152} height={34} />`
- Tagline: "Split your bills into two. `<br/>` Less stress, better timing."
- App-store badges, `153×49` each, as links:
  - `<AppStoreBadge />` → `https://apps.apple.com/us/app/rent-app-best-way-to-pay-rent/id6448634850`
  - `<GooglePlayBadge />` → `https://play.google.com/store/apps/details?id=xyz.visible.visiblerentapp`
  Both `target="_blank" rel="noopener noreferrer"`.
- Column **PRODUCTS** (label is uppercase, muted, small) with icon + label links:
  - `<RentIcon />` Rent → `/rent`
  - `<MortgageIcon />` Mortgage → `/mortgage`
  - `<CarIcon />` Car payment → `/car`
  - `<OtherBillsIcon />` "Other bills (coming soon)" — **not a link**, plain text
- Column **LEARN MORE** (text links, no icons):
  How it works `/how-it-works` · Safety & security `/safety-and-security` ·
  About us `/about-us` · Help & FAQs `/help` · Terms of service `/terms` ·
  Privacy policy `/privacy`
- Legal block:
  - "© 2026 Visible Ideas Inc."
  - "Split Pay™ is a financial technology company, not a bank. Banking services
    are provided by Evolve Bank & Trust, Members FDIC."

Keep the year as the literal `2026` the target renders — do not compute it, or
the markup will drift from the reference.

## Assets
`<SplitPayLogo />`, `<AppStoreBadge />`, `<GooglePlayBadge />`, `<RentIcon />`,
`<MortgageIcon />`, `<CarIcon />`, `<OtherBillsIcon />` — all from `@/components/icons`.

## Responsive
- **1440:** `pt-24 pb-30`; legal block sits above the link columns.
- **768:** the `md` variant; logo + tagline on one side, two link columns beside it.
- **390:** single column, `gap-14`, sections stacked in source order.
