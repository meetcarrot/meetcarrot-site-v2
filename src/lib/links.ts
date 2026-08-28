/**
 * Every outbound CTA destination, in one place. Components import from here so
 * a change to store URLs or sign-in is a one-line edit rather than a sweep.
 */

/** Merchant dashboard sign-in. */
export const MERCHANT_LOGIN_URL = "https://merchant.meetcarrot.xyz/";

/** Support inbox — also the fallback when the Messenger cannot load. */
export const SUPPORT_EMAIL = "support@meetcarrot.xyz";

/** Consumer iOS app. */
export const APP_STORE_ID = "1663585181";
export const APP_STORE_URL =
  `https://apps.apple.com/us/app/carrot-cashback/id${APP_STORE_ID}`;

/** Consumer Android app. */
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=xyz.meetcarrot.mobile";

/**
 * Prefilled into the Intercom composer when a merchant clicks "Get Started".
 * `showNewMessage` can only seed the text field — not a real form — so this is
 * a short welcome plus labeled blanks they complete and send.
 */
export const GET_STARTED_MESSAGE = `We'd love to help you get started with Carrot.

Please tell us a bit about you so we can follow up:

Who you are:
Best way to reach you:
The name of your business:`;

/**
 * Prefilled into the Intercom composer from Help → Chat with us. Same blanks as
 * Get Started so the team can follow up; different intro so it isn't a signup.
 */
export const CHAT_WITH_US_MESSAGE = `I have a question for the Carrot team.

Please tell us a bit about you so we can follow up:

Who you are:
Best way to reach you:
The name of your business:`;

/**
 * Safety page → Contact support. Account / member issues, not a signup.
 */
export const CONTACT_SUPPORT_MESSAGE = `I need to contact Carrot support about my account.

Please tell us a bit about you so we can follow up:

Who you are:
Best way to reach you:
The name of your business:`;

/**
 * Safety page → Report a vulnerability. Responsible disclosure intake.
 */
export const REPORT_VULNERABILITY_MESSAGE = `I'd like to report a security vulnerability.

Please tell us a bit about you so we can follow up:

Who you are:
Best way to reach you:
The name of your business:
What you found:`;

/** Opens Intercom with a prefill, or a matching mailto if Messenger never loaded. */
export function openIntercomMessage(message: string, mailtoSubject: string) {
  if (typeof window.Intercom === "function") {
    window.Intercom("showNewMessage", message);
    return;
  }
  const subject = encodeURIComponent(mailtoSubject);
  const body = encodeURIComponent(message);
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}
