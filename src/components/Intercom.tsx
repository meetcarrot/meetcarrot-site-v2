"use client";

import Script from "next/script";

/**
 * Intercom Messenger, same workspace as meetcarrot.xyz.
 *
 * `afterInteractive` rather than the vendor's inline `onload`/`readyState`
 * dance: Next controls injection order, so the widget loads after hydration
 * without blocking first paint.
 */
const INTERCOM_APP_ID = "ofca1xoz";

export function Intercom() {
  return (
    <>
      <Script id="intercom-settings" strategy="afterInteractive">
        {`window.intercomSettings = { app_id: ${JSON.stringify(INTERCOM_APP_ID)} };`}
      </Script>
      <Script
        id="intercom-widget"
        strategy="afterInteractive"
        src={`https://widget.intercom.io/widget/${INTERCOM_APP_ID}`}
        onLoad={() => {
          window.Intercom?.("boot", { app_id: INTERCOM_APP_ID });
        }}
      />
    </>
  );
}
