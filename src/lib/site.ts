/** Canonical origin. Every absolute URL the site emits derives from this. */
export const SITE_URL = "https://meetcarrot.xyz";

/**
 * Origin used to resolve relative metadata URLs (`og:image`, icons).
 * Canonical links still use `SITE_URL`. Share-card images must be fetched
 * from a host that actually serves this build — `meetcarrot.xyz` currently
 * still points at the previous site, so using it as `metadataBase` makes
 * iMessage request a 404 and show a gray box.
 */
export function getMetadataBase(): URL {
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.NODE_ENV !== "production") {
    return new URL("http://localhost:3000");
  }
  return new URL(SITE_URL);
}

/**
 * Every indexable route, in one place so the sitemap and any redirect map stay
 * in step with the app directory.
 *
 * `changeFrequency`/`priority` are hints only — Google ignores them in
 * practice — but `lastModified` is read, so it is set at build time.
 */
export const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/hospitality", priority: 0.8 },
  { path: "/retail", priority: 0.8 },
  { path: "/services", priority: 0.8 },
  { path: "/safety-and-security", priority: 0.6 },
  { path: "/help", priority: 0.6 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
] as const;

/** Current merchant-terms URL. Old agreements still cite `/legals/terms`. */
export const MERCHANT_TERMS_PATH = "/terms/merchant-terms-and-conditions";

/** Post-enrollment thank-you. Formsite sends merchants here; keep it off-search. */
export const ENROLLED_PATH = "/confirmed/enrolled";

/** Paths crawlers must not fetch. Kept out of `ROUTES` / the sitemap on purpose. */
export const ROBOTS_DISALLOW = [
  MERCHANT_TERMS_PATH,
  ENROLLED_PATH,
  "/confirmed/",
  "/legals/",
] as const;
