import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * Reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` and renders nothing when it is unset,
 * so local development and preview builds do not pollute the property. Set it
 * in Vercel's environment variables to switch analytics on — no code change.
 *
 * Search Console verification is handled by `verification.google` in the root
 * metadata rather than here, since it only needs a meta tag.
 *
 * `lazyOnload` keeps the gtag bundle off the critical path so it cannot steal
 * LCP or Total Blocking Time from first paint.
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        id="ga-src"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});`}
      </Script>
    </>
  );
}
