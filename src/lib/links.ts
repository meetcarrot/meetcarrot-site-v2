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
 * Written in the merchant's voice because it is sent as their message, not ours.
 */
export const GET_STARTED_MESSAGE =
  "Hi! I'd like to get started with Carrot for my business.";
