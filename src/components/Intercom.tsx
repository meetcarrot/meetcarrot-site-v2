"use client";

import Script from "next/script";

/**
 * Intercom Messenger, same workspace as meetcarrot.xyz.
 *
 * Settings + stub load after hydration so they do not block first paint. The
 * widget itself is `lazyOnload` — it is not needed for LCP, and pulling it
 * later keeps main-thread work off the PageSpeed trace.
 */
const INTERCOM_APP_ID = "ofca1xoz";

export function Intercom() {
  return (
    <>
      <Script id="intercom-settings" strategy="afterInteractive">
        {`window.intercomSettings = { app_id: ${JSON.stringify(INTERCOM_APP_ID)} };
window.Intercom = window.Intercom || function () {
  (window.Intercom.q = window.Intercom.q || []).push(arguments);
};`}
      </Script>
      <Script
        id="intercom-widget"
        strategy="lazyOnload"
        src={`https://widget.intercom.io/widget/${INTERCOM_APP_ID}`}
        onLoad={() => {
          window.Intercom?.("boot", { app_id: INTERCOM_APP_ID });
        }}
      />
    </>
  );
}
