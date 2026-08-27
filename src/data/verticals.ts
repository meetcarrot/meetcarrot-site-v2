import { HOW_IT_WORKS_STEPS } from "@/data/how-it-works";

import type { Vertical } from "@/data/product-testimonials";

export interface VerticalCopyBlock {
  title: string;
  copy: string;
}

export interface VerticalConfig {
  slug: Vertical;
  /** Display name, e.g. "Hospitality". */
  name: string;
  metaTitle: string;
  metaDescription: string;

  /** Hero header, e.g. "Fill More Seats". */
  heading: string;
  subheading: string;
  /** The three hero checkmarks. */
  badges: [string, string, string];

  /** Average order value used by the cashback calculator. */
  averageOrderValue: number;
  /** Cashback rate as a fraction, e.g. 0.125. */
  cashbackRate: number;
  calculatorHeading: string;
  /** Renders after the asterisk under the calculator. */
  calculatorFootnote: string;

  benefitsHeading: string;
  /** The three value props. */
  benefits: [VerticalCopyBlock, VerticalCopyBlock, VerticalCopyBlock];

  /** "How customers use it" — the three consumer-side animations. */
  consumerSteps: [VerticalCopyBlock, VerticalCopyBlock, VerticalCopyBlock];

  easyHeading: string;
  easyIntro: string;
  easySteps: [VerticalCopyBlock, VerticalCopyBlock, VerticalCopyBlock];
  /** Three cards under the Easy photo — the old Win-Win-Win copy. */
  easyCards: [VerticalCopyBlock, VerticalCopyBlock, VerticalCopyBlock];

  ctaTitle: string;
  ctaDescription: string;
  /** Closing-band photograph. Named for the shot so a cache cannot serve a previous CTA. */
  ctaBackground: string;
}

/**
 * Copy marked `PENDING` below is placeholder written from the brand voice in the
 * changes doc — the final wording is still coming. Headings, subheadings,
 * calculator inputs, and footnotes are all final as supplied.
 */

// PENDING: identical across verticals until the real per-vertical copy lands.
const SHARED_BADGES: [string, string, string] = [
  "100% Automated",
  "No Upfront or Monthly Fee",
  "Pay For Revenue, Not Clicks",
];

// PENDING: consumer-side flow is the same product everywhere, so the three
// steps are shared until the doc says otherwise.
const SHARED_CONSUMER_STEPS: [
  VerticalCopyBlock,
  VerticalCopyBlock,
  VerticalCopyBlock,
] = [
  {
    title: "Discover",
    copy: "Customers find your offer.",
  },
  {
    title: "Activate",
    copy: "They activate your offer.",
  },
  {
    title: "Spend",
    copy: "They visit and make a purchase. Once verified, cashback is earned.",
  },
];

/**
 * Derived from the canonical flow rather than written again here — this block
 * had drifted to its own third step ("You get paid") while the homepage and
 * /how-it-works both said "Earn Steady Revenue". One source, one wording.
 */
const SHARED_EASY_STEPS: [
  VerticalCopyBlock,
  VerticalCopyBlock,
  VerticalCopyBlock,
] = [
  HOW_IT_WORKS_STEPS[0],
  HOW_IT_WORKS_STEPS[1],
  HOW_IT_WORKS_STEPS[2],
].map((step) => ({ title: step.title, copy: step.copy })) as [
  VerticalCopyBlock,
  VerticalCopyBlock,
  VerticalCopyBlock,
];

const SHARED_WIN_WIN_WIN: [
  VerticalCopyBlock,
  VerticalCopyBlock,
  VerticalCopyBlock,
] = [
  {
    title: "Customers win",
    copy: "Offers help them get more of what they love.",
  },
  {
    title: "You win",
    copy: "Steady, incremental revenue from real purchases — and you only pay when it works.",
  },
  {
    title: "Carrot wins",
    copy: "We earn a share of the revenue we drive, so our incentives match yours from day one.",
  },
];

const SHARED_BENEFITS: [
  VerticalCopyBlock,
  VerticalCopyBlock,
  VerticalCopyBlock,
] = [
  {
    title: "Zero Hassle",
    copy: "Get up and running in minutes. No complicated setup or long onboarding required.",
  },
  {
    title: "Fully Automated",
    copy: "Once your offer is live, we handle everything — you don’t have to manage anything.",
  },
  {
    title: "Risk-Free",
    copy: "You only pay when revenue comes in. No upfront fees, no monthly charges.",
  },
];

export const VERTICALS: Record<Vertical, VerticalConfig> = {
  hospitality: {
    slug: "hospitality",
    name: "Hospitality",
    metaTitle: "Fill More Seats - Carrot",
    metaDescription:
      "Help diners find you and turn on consistent revenue — without the usual marketing hassle.",
    heading: "Fill More Seats",
    subheading:
      "Help diners find you and turn on consistent revenue — without the usual marketing hassle.",
    badges: SHARED_BADGES,
    averageOrderValue: 75,
    cashbackRate: 0.125,
    calculatorHeading: "See what steady revenue costs you.",
    calculatorFootnote: "Based on the average restaurant.",
    benefitsHeading: "More cash, less pressure, every month.",
    benefits: SHARED_BENEFITS,
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your customers.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing setup. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: SHARED_WIN_WIN_WIN,
    ctaTitle: "More time for the things you love",
    ctaDescription:
      "Relax — your restaurant is on autopilot. Carrot brings diners in, verifies the visits, and settles up every Friday.",
    ctaBackground: "/images/hospitality/cta-hammock.jpg",
  },

  retail: {
    slug: "retail",
    name: "Retail",
    metaTitle: "Bring More Shoppers In - Carrot",
    metaDescription:
      "Attract real customers with automated offers that deliver reliable sales month after month.",
    heading: "Bring More Shoppers In",
    subheading:
      "Attract real customers with automated offers that deliver reliable sales month after month.",
    badges: SHARED_BADGES,
    averageOrderValue: 125,
    cashbackRate: 0.15,
    calculatorHeading: "See what steady revenue costs you.",
    calculatorFootnote: "Based on the average retail store.",
    benefitsHeading: "More cash, less pressure, every month.",
    benefits: SHARED_BENEFITS,
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your customers.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing setup. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: SHARED_WIN_WIN_WIN,
    ctaTitle: "More time for the things you love",
    ctaDescription:
      "Relax — your shop is on autopilot. Carrot brings shoppers in, verifies the purchases, and settles up every Friday.",
    ctaBackground: "/images/retail/cta-catch.jpg",
  },

  services: {
    slug: "services",
    name: "Services",
    metaTitle: "Book More Clients - Carrot",
    metaDescription:
      "Grow your client base and keep revenue consistent while staying in full control of your offer.",
    heading: "Book More Clients",
    subheading:
      "Grow your client base and keep revenue consistent while staying in full control of your offer.",
    badges: SHARED_BADGES,
    averageOrderValue: 250,
    cashbackRate: 0.15,
    calculatorHeading: "See what steady revenue costs you.",
    calculatorFootnote: "Based on the average service-based business.",
    benefitsHeading: "More cash, less pressure, every month.",
    benefits: SHARED_BENEFITS,
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your clients.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing setup. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: SHARED_WIN_WIN_WIN,
    ctaTitle: "More time for the things you love",
    ctaDescription:
      "Relax — your calendar is on autopilot. Carrot brings clients in, verifies the visits, and settles up every Friday.",
    ctaBackground: "/images/services/cta-walk.jpg",
  },

  /*
   * No route while Digital is marked coming soon — the nav, the homepage card
   * and the footer all render it unlinked. The config stays so restoring the
   * page is one file, not a rewrite.
   */
  digital: {
    slug: "digital",
    name: "Digital",
    // PENDING: the Digital vertical has no supplied copy at all — everything
    // below is placeholder built from the category one-liner on the homepage.
    metaTitle: "Grow Your Online Sales - Carrot",
    metaDescription:
      "E-commerce, online events, digital products, and businesses that operate primarily online.",
    heading: "Grow Your Online Sales",
    subheading:
      "Reach real buyers with automated cashback offers that turn browsing into steady, repeatable revenue.",
    badges: SHARED_BADGES,
    // PENDING: no AOV or rate supplied for Digital; retail's figures stand in.
    averageOrderValue: 125,
    cashbackRate: 0.15,
    calculatorHeading: "See what steady revenue costs you.",
    calculatorFootnote: "Based on the average online business.",
    benefitsHeading: "More cash, less pressure, every month.",
    benefits: SHARED_BENEFITS,
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your customers.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing checkout. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: SHARED_WIN_WIN_WIN,
    ctaTitle: "More time for the things you love",
    ctaDescription:
      "Relax — your store is on autopilot. Carrot finds the buyers, verifies the purchases, and settles up every Friday.",
    ctaBackground: "/images/digital/cta-bg.jpg",
  },
};
