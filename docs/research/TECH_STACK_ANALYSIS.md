# Tech Stack — splitpay.com vs. this clone

| Concern | Target | This clone |
| --- | --- | --- |
| Framework | Next.js (Pages Router — `data-next-head`, `/_next/data/<buildId>/en.json`) | Next.js 16 App Router |
| React | 19 | 19 |
| CSS | Tailwind CSS v4, compiled to one chunk | Tailwind CSS v4 |
| Design tokens | `@theme` custom properties | same tokens, `src/app/globals.css` |
| Fonts | `next/font/local`, self-hosted GT America + PolySans | `next/font/local`, same files |
| Images | `next/image` with the default loader | `next/image`, assets in `public/images` |
| Illustrations | `lottie-web` SVG renderer, JSON from `/lottie/*.json` | `lottie-web` via `LottieAnimation.tsx` |
| Icons | Inline SVG, no icon library | Ported to `src/components/icons.tsx` |
| i18n | `next-i18next` style locale payload (`en.json`) | Not needed — content inlined |
| Content | CMS-backed FAQ payload in page props | `src/data/faqs.ts`, `src/data/testimonials.ts` |
| State | Local component state only | same |
| Animation library | None (beyond Lottie) | None |
| Smooth scroll | None | None |
| Analytics | Third-party tags | Omitted |

## Notes

- No GraphQL or client data fetching on the homepage; everything is SSR'd page
  props plus the Lottie JSON fetches.
- The target ships three duplicated footer layouts in the DOM (mobile / md / lg)
  rather than one responsive grid. The clone keeps that structure so the
  breakpoint behaviour matches exactly.
- `lucide-react` remains a dependency of the scaffold but is unused — the target
  has no icon library.
- **Font licensing:** GT America and PolySans are commercial typefaces. They are
  self-hosted here purely to reproduce the target locally; shipping them
  publicly would require licences from GrilliType and Poly Type respectively.
