# Assets Inbox

Drop raw downloads from Google Drive here. Nothing in this folder ships — files get
renamed, optimized, and moved into `public/` as they're wired up.

Keep the original filenames from Drive; I'll match them against the list below.

## Needed

### Brand
- [x] `logo` — Carrot wordmark is in `src/components/carrot-logo.tsx`
- [ ] `icon` — Carrot mark/app icon (SVG preferred)
- [x] Final brand color hex values — pink `#ff0063` / orange `#ff4a17` in `src/app/globals.css`

### Home
- [x] Left hero — `public/images/deco-left.jpg`
- [x] Right hero — `public/images/deco-right.jpg` (restaurant payment, full frame)
- [ ] Tile images (9) — used in the reviews rail
- [x] Ending image — `public/images/homepage-paddleboard.jpg`
- [ ] Ending phone screen — removed from the live CTA; keep only if it returns
- [x] Category section animated icons (4: hospitality, retail, services, digital)
- [x] How It Works animations (3: Set Your Terms / We Promote It / You Earn Steady Revenue)

### Hospitality
- [ ] Hero image
- [ ] More Cash / Less Pressure image
- [ ] Easy For You / Easy For Your Customers image
- [x] Ending image — `public/images/hospitality/cta-hammock.jpg`

### Retail
- [ ] Hero image
- [ ] More Cash / Less Pressure image
- [ ] Easy For You / Easy For Your Customers image
- [x] Ending image — `public/images/retail/cta-catch.jpg`

### Services
- [ ] Hero image
- [ ] More Cash / Less Pressure image
- [ ] Easy For You / Easy For Your Customers image
- [x] Ending image — `public/images/services/cta-walk.jpg`

### Digital
- [ ] Same four images as the other verticals (page is coming soon; no route)

### How It Works page
- [ ] Step 4 animation

### Safety & Security
- [x] Clay shield — `public/images/safety-and-security/shield-clay.webp`
- [x] Stripe partner logo — `public/images/brands/stripe.svg` (white/grey, with Plaid and Drata)
- [ ] Ending image (safety closer still uses `cta-bg.jpg` if present)

### Legal / help heroes
- [x] Help — `public/images/help/help.webp`
- [x] Terms — `public/images/terms/terms.webp`
- [x] Privacy — `public/images/privacy/privacy.webp`

## Still needed as copy, not assets
- [x] 12 FAQs — `src/data/faqs.ts`
- [x] Shared value props — `SHARED_BENEFITS` in `src/data/verticals.ts`
- [x] Win-Win-Win — `SHARED_WIN_WIN_WIN` in `src/data/verticals.ts`
- [ ] Easy For You title & caption (vertical `easyIntro` is still PENDING)
- [x] How It Works — the 4 steps (`src/data/how-it-works.ts`)
- [x] Footer tagline — “Pay for Revenue, Not Clicks”
