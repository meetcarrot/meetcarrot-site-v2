# Carrot site — current decisions

Working notes for this marketing site, as of 26 Aug 2026. The files under
`docs/research/` still describe the Split Pay clone target. This page describes
what Carrot actually ships.

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

## Hero

- White band, `data-header-theme="light"`.
- Left: `/images/deco-left.jpg` (father and son dining).
- Right: `/images/deco-right.jpg` (full-frame restaurant payment photo). Keep
  `object-cover object-center` so the background people stay in frame.

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
