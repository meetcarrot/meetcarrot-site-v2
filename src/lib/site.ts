/** Canonical origin. Every absolute URL the site emits derives from this. */
export const SITE_URL = "https://meetcarrot.xyz";

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
