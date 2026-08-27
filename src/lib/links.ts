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
