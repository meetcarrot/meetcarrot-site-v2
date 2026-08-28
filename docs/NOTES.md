# Carrot site — current decisions

Working notes for this marketing site, as of 27 Aug 2026. The files under
`docs/research/` still describe the Split Pay clone target. This page describes
what Carrot actually ships.

Open work: **`docs/OPEN_ITEMS.md`**.

## CTAs

- **Get Started** (homepage hero, category heroes, closing bands) opens Intercom
  with `GET_STARTED_MESSAGE` from `src/lib/links.ts`. Mailto fallback uses
  `SUPPORT_EMAIL` if the Messenger never loaded.
- **Download Carrot** lives only in the header (`DownloadCarrotButton`). It opens
  the App Store / Google Play modal. Do not point other primary buttons at that
  modal.

## Closing band (`AutopilotCta`)

Shared headline: “More time for the things you love.” Body is “Relax — … is on
autopilot,” with a category-specific noun (business / restaurant / shop /
calendar). Safety keeps the older “Steady revenue, on autopilot” closer.

Photographs:

| Page | File |
| --- | --- |
| Home | `/images/homepage-paddleboard.jpg` |
| Hospitality | `/images/hospitality/cta-hammock.jpg` |
| Retail | `/images/retail/cta-catch.jpg` |
| Services | `/images/services/cta-walk.jpg` |

No hanging phone overlay.

## Type

Body is **Satoshi** (400/500). Headlines are **Bricolage Grotesque** (600).
GT America + PolySans Wide remains available in the local font preview panel
(`npm run dev` only) until a final pair is locked.

## Hero

- White band, `data-header-theme="light"`.
- Five left/right pairs. Pair 1 is `deco-left.jpg` / `deco-right.jpg`; pairs
  2–5 live under `/images/hero/`. A random pair shows on load, then the
  columns dissolve together every 20s. Left crops hold the person + phone;
  right crops hold the payment (or the closest action in that pair).
- Drop originals into `public/images/hero/` in Finder. Chat attachments have
  arrived as smaller JPEGs misnamed `.png`.

## Category pages

- Hero clay icons (`CategoryIcon`) sit in a larger slot: `h-32` / `md:h-40` /
  `lg:h-48`. Overflow stays visible so the enter animation is not clipped.
- Easy For You intro is the shared two sentences on Hospitality, Retail, and
  Services. Digital still carries a PENDING placeholder and stays unlinked.

## FAQ / legal detail modal

Shared `DocModal` (FAQs, Terms, Privacy). Fixed height `min(60vh, 35rem)` so
Prev / Next do not jump while paging. 35rem is Terms §4 Pass Purchases (the
tallest entry) at the 720px panel, with a little room; 60vh keeps short
viewports from filling the screen. Longer sections scroll inside.

## Footer

Light `bg-gray-100`. Categories + Learn more labels and link/icon hovers use
`text-pink` (`#ff0063`), the same fill as the primary button. Digital stays
coming soon (not a link). One responsive grid, stacked until `lg`.

## Legal / help / safety icons

Clay WebPs in a height-locked slot (`ClayHeroIcon`). Overflow stays visible so
the idle scale animation is not clipped. Stripe on the partners row is the
official wordmark with the same white→grey wash as Plaid and Drata.

## Calculator

Slider is **monthly cashback spend**, `$0–$2,500`, `$50` steps, default `$250`.
Customers = `round(spend / (AOV × rate))`; revenue = customers × AOV.

## SEO / a11y

Canonical origin `https://meetcarrot.xyz`. Share card is
`public/seo/og-image.png` (headline + logo only — not the hero photos). Skip
link, `id="main"`, FAQ/HowTo/Organization JSON-LD, `manifest.ts`, `not-found`.
Digital is omitted from the sitemap.

## Do not

- Rewrite legal or FAQ copy unless supplied.
- Re-add the safety CTA phone overlay.
- Link Digital while it is coming soon.
- Turn the header Download Carrot button into Intercom, or the other CTAs into
  the download modal.
