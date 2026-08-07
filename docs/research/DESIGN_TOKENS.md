# Design Tokens — splitpay.com

Extracted from the target's compiled Tailwind v4 stylesheet
(`/_next/static/chunks/3wxlrbuolonyh.css`). These are the shipped values, not
approximations. All of them are already wired into `src/app/globals.css`.

## Colors

| Token | Hex | Used for |
| --- | --- | --- |
| `--color-white` | `#fff` | Card surfaces, dark-card text |
| `--color-black` | `#000` | Header/footer surfaces, dark pills |
| `--color-golden` | `#fae182` | Hero background, golden testimonial cards, logo-adjacent labels |
| `--color-green` | `#3acb00` | Status accents |
| `--color-orange-100` | `#f56b3f` | Primary CTA, chevron circles, logo gradient |
| `--color-orange-200` | `#ec683d` | Focus ring (`ring-orange-200/80`) |
| `--color-orange-300` | `#d45e37` | Primary CTA `:active` |
| `--color-gray-100` | `#f5f4f2` | Page background, CTA label color |
| `--color-gray-200` | `#e5e5e5` | "Coming soon" pill |
| `--color-gray-300` | `#d0cfce` | Dividers |
| `--color-gray-400` | `#292929` | Body text, dark cards, dark-pill `:active` |
| `--color-gray-600` | `#8f8e8d` | Muted label text |
| `--color-red` | `#e61700` | Error states |

## Typography

Three self-hosted families, downloaded to `public/fonts/`:

| Family | Files | CSS variable | Tailwind class |
| --- | --- | --- | --- |
| GT America Standard | Regular 400, Medium 500 (woff2) | `--font-gt-america` | body default / `.font-default` |
| GT America Mono | Medium 500 (woff2) | `--font-gt-america-mono` | `.font-mono` |
| PolySans Median Wide | 600 (otf) | `--font-poly-sans-wide` | `.font-poly-sans-wide` |

`.font-poly-sans-wide` also hard-sets `font-weight: 600`; `.font-mono` hard-sets
`font-weight: 500`. Both are declared as utilities, not theme font families.

Base `body` rule, copied verbatim:

```css
body { color: var(--color-gray-400); background-color: var(--color-gray-100);
       font-size: 16px; font-style: normal; line-height: 1.33; }
```

### Type scale actually in use

| Role | Mobile | md | lg |
| --- | --- | --- | --- |
| `h1` (hero) | `40px` | `56px` | `64px` |
| `h2` (section) | `32px` | `48px` | `56px` |
| Card title (`font-poly-sans-wide`) | `22px` | `24px` | `40px` + `tracking-[0.8px]` |
| Step title | `18px` | `24px` | — |
| Body | `16px` | — | `18px` |
| Small / meta | `14px` | — | `18px` |

Headings use `leading-[115%]!`. Body copy uses `leading-[1.33]`; the hero
paragraph uses `leading-[1.6]`.

## Spacing, radii, shadows

- `--spacing: .25rem` (Tailwind default) — the site leans on dynamic numeric
  utilities like `w-38`, `h-16.5`, `max-w-324`, `pb-90`, `h-200`. Tailwind v4
  generates these on demand, so no config is needed.
- Container: `mx-auto px-6 container lg:max-w-324` (324 × 0.25rem = 81rem = 1296px).
- Radii: `rounded-3xl` (1.5rem) pills, `rounded-[20px]` cards, `rounded-4xl`
  (2rem) large cards/images.
- Shadows (all literal arbitrary values):
  - Buttons: `0 2px 6px 0 rgba(0,0,0,0.15)`, active `0 1px 3px 0 rgba(0,0,0,0.12)`
  - Product cards: `0 2px 6px 0 rgba(0,0,0,0.06)`
  - FAQ rows: `0 8px 16px 0 rgba(0,0,0,0.05)`, active `0 4px 8px 0 rgba(0,0,0,0.04)`
  - Testimonials: `0 12px 24px 0 rgba(0,0,0,0.05)`
  - Hero photos: `0 8px 16px 0 rgba(0,0,0,0.10)`

## Breakpoints

Tailwind defaults, unmodified: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem,
`2xl` 96rem. Two one-off queries appear in markup: `max-[413px]` (line-break
control on card copy) and `min-[1920px]` (extra rail padding on testimonials).

## Focus ring

Every interactive element shares one focus treatment:

```
focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-orange-200/80 focus-visible:ring-offset-white
focus-visible:ring-offset-2 transition duration-200 ease-in-out
```
