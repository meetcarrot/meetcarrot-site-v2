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
  easyCards: [VerticalCopyBlock, VerticalCopyBlock, VerticalCopyBlock];

  winWinWin: [VerticalCopyBlock, VerticalCopyBlock, VerticalCopyBlock];

  ctaTitle: string;
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
    copy: "Real cash back on purchases they were already going to make, at places near them.",
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
    benefits: [
      {
        title: "Fill your slow shifts",
        copy: "PENDING — awaiting final value-prop copy. Offers go out when you need covers, not when a campaign calendar says so.",
      },
      {
        title: "Reach diners nearby",
        copy: "PENDING — awaiting final value-prop copy. Carrot puts you in front of people already deciding where to eat tonight.",
      },
      {
        title: "Only pay for revenue",
        copy: "PENDING — awaiting final value-prop copy. No upfront cost, no monthly fee. You pay a share of the sales we bring you.",
      },
    ],
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your customers.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing setup. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: [
      {
        title: "How Carrot works",
        copy: "PENDING — awaiting final copy. You set a cashback rate and a monthly cap. We promote the offer to the right diners and you keep full control.",
      },
      {
        title: "Works with your POS",
        copy: "PENDING — awaiting final copy. No new hardware, no new terminal, no menu changes. Customers pay you the way they already do.",
      },
      {
        title: "What do diners see?",
        copy: "PENDING — awaiting final copy. They see your offer in the Carrot app, visit, pay normally, and get cash back automatically.",
      },
    ],
    winWinWin: SHARED_WIN_WIN_WIN,
    ctaTitle: "Fill more seats",
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
    benefits: [
      {
        title: "Get real foot traffic",
        copy: "PENDING — awaiting final value-prop copy. Shoppers who came to buy, not to browse an ad they scrolled past.",
      },
      {
        title: "Smooth out slow weeks",
        copy: "PENDING — awaiting final value-prop copy. Offers keep working in the background so the quiet stretches stay steady.",
      },
      {
        title: "Only pay for revenue",
        copy: "PENDING — awaiting final value-prop copy. No upfront cost, no monthly fee. You pay a share of the sales we bring you.",
      },
    ],
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your customers.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing setup. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: [
      {
        title: "How Carrot works",
        copy: "PENDING — awaiting final copy. You set a cashback rate and a monthly cap. We promote the offer to nearby shoppers and you keep full control.",
      },
      {
        title: "Works with your POS",
        copy: "PENDING — awaiting final copy. No new hardware and no changes at checkout. Customers pay you the way they already do.",
      },
      {
        title: "What do shoppers see?",
        copy: "PENDING — awaiting final copy. They see your offer in the Carrot app, come in, pay normally, and get cash back automatically.",
      },
    ],
    winWinWin: SHARED_WIN_WIN_WIN,
    ctaTitle: "Bring more shoppers in",
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
    averageOrderValue: 150,
    cashbackRate: 0.15,
    calculatorHeading: "See what steady revenue costs you.",
    calculatorFootnote: "Based on the average service-based business.",
    benefitsHeading: "More cash, less pressure, every month.",
    benefits: [
      {
        title: "Fill your calendar",
        copy: "PENDING — awaiting final value-prop copy. New clients booking the appointments you actually have room for.",
      },
      {
        title: "Keep clients coming back",
        copy: "PENDING — awaiting final value-prop copy. Cash back gives regulars a reason to rebook with you instead of shopping around.",
      },
      {
        title: "Only pay for revenue",
        copy: "PENDING — awaiting final value-prop copy. No upfront cost, no monthly fee. You pay a share of the bookings we bring you.",
      },
    ],
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your clients.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing setup. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: [
      {
        title: "How Carrot works",
        copy: "PENDING — awaiting final copy. You set a cashback rate and a monthly cap. We promote the offer to nearby clients and you keep full control.",
      },
      {
        title: "Works with your booking flow",
        copy: "PENDING — awaiting final copy. No new software and no changes to how you schedule. Clients pay you the way they already do.",
      },
      {
        title: "What do clients see?",
        copy: "PENDING — awaiting final copy. They see your offer in the Carrot app, book, pay normally, and get cash back automatically.",
      },
    ],
    winWinWin: SHARED_WIN_WIN_WIN,
    ctaTitle: "Book more clients",
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
    benefits: [
      {
        title: "Reach buyers who convert",
        copy: "PENDING — awaiting final value-prop copy. Cash back turns interest into a completed order.",
      },
      {
        title: "Predictable monthly revenue",
        copy: "PENDING — awaiting final value-prop copy. Offers run continuously so sales don't depend on one campaign landing.",
      },
      {
        title: "Only pay for revenue",
        copy: "PENDING — awaiting final value-prop copy. No upfront cost, no monthly fee. You pay a share of the sales we bring you.",
      },
    ],
    consumerSteps: SHARED_CONSUMER_STEPS,
    easyHeading: "Easy for you. Easy for your customers.",
    easyIntro:
      "PENDING — awaiting final Easy For You copy. Carrot runs alongside your existing checkout. Nothing changes about how you take payment.",
    easySteps: SHARED_EASY_STEPS,
    easyCards: [
      {
        title: "How Carrot works",
        copy: "PENDING — awaiting final copy. You set a cashback rate and a monthly cap. We promote the offer to the right buyers and you keep full control.",
      },
      {
        title: "Works with your store",
        copy: "PENDING — awaiting final copy. No replatforming and no checkout changes. Customers pay you the way they already do.",
      },
      {
        title: "What do customers see?",
        copy: "PENDING — awaiting final copy. They see your offer in the Carrot app, order, pay normally, and get cash back automatically.",
      },
    ],
    winWinWin: SHARED_WIN_WIN_WIN,
    ctaTitle: "Grow your online sales",
  },
};
