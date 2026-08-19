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
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});`}
      </Script>
    </>
  );
}
