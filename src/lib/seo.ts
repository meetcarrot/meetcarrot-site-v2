/** Titles, descriptions, share cards, and structured data. One place so the
 *  homepage meta tags, Open Graph image, and JSON-LD cannot describe Carrot
 *  differently. */

import type { Metadata } from "next";

import { HOW_IT_WORKS_STEPS } from "@/data/how-it-works";
import { APP_STORE_URL, GOOGLE_PLAY_URL, SUPPORT_EMAIL } from "@/lib/links";
import { SITE_URL } from "@/lib/site";
import type { Faq } from "@/types/content";

export const SITE_TITLE = "Carrot - The Way Marketing Should Be";

export const SITE_DESCRIPTION =
  "Turn on steady, automated revenue with intelligent cashback offers. No upfront or monthly fee — you pay for revenue, not clicks.";

export const OG_IMAGE_ALT = "Carrot — The Way Marketing Should Be";

/**
 * Canonical share-card file — the photo only. iMessage / Slack already
 * render the page title under it, so this is not a designed card.
 * JPEG with no alpha (iMessage drops transparent PNGs). Pair 5's left
 * hero is the homepage default; crawlers cache one URL, so this stays
 * a single stable frame.
 */
export const OG_IMAGE = {
  url: "/seo/og-image.jpg",
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
  type: "image/jpeg",
} as const;

/** Skip-link target. Every page's `<main>` must use this id. */
export const MAIN_ID = "main";

function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Canonical + Open Graph + Twitter for a single route. Pages pass the same
 * title and description they already used. Canonical stays on `SITE_URL`;
 * `og:image` is the stable `/seo/og-image.jpg` path (resolved against
 * `metadataBase`, which is the host that actually serves this build).
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Carrot",
      title,
      description,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Carrot",
    legalName: "Carrot Company Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/seo/apple-touch-icon.png`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    description: SITE_DESCRIPTION,
    email: SUPPORT_EMAIL,
    sameAs: [APP_STORE_URL, GOOGLE_PLAY_URL],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Carrot",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd()],
  };
}

export function faqPageJsonLd(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: htmlToPlainText(faq.answer),
      },
    })),
  };
}

export function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Carrot Works",
    description:
      "Set your offer terms, let Carrot promote it to the right customers, and earn steady revenue from real purchases.",
    url: `${SITE_URL}/how-it-works`,
    step: HOW_IT_WORKS_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.copy,
    })),
  };
}
