/**
 * Every outbound CTA destination, in one place. Components import from here so
 * a change to where "Get started" points is a one-line edit rather than a sweep.
 */

/** Merchant dashboard sign-in. */
export const MERCHANT_LOGIN_URL = "https://merchant.meetcarrot.xyz/";

/** Support inbox — also the fallback when the Messenger cannot load. */
export const SUPPORT_EMAIL = "support@meetcarrot.xyz";

/**
 * Prefilled into the Intercom composer when a merchant clicks "Get started".
 * `showNewMessage` can only seed the text field — not a real form — so this is
 * a short welcome plus labeled blanks they complete and send.
 */
export const GET_STARTED_MESSAGE = `We'd love to help you get started with Carrot.

Please tell us a bit about you so we can follow up:

Who you are:
Best way to reach you:
The name of your business:`;
