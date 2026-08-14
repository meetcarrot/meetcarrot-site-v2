import { TESTIMONIALS, withThemes } from "@/data/testimonials";
import type { Testimonial } from "@/types/content";

export type Vertical = "hospitality" | "retail" | "services" | "digital";

const HOSPITALITY: Testimonial[] = withThemes([
  {
    initials: "AE",
    name: "@alex.eats",
    quote:
      "I open Carrot when I’m deciding where to eat. It’s helped me find so many great spots I wouldn’t have tried otherwise.",
  },
  {
    initials: "J",
    name: "Jordan",
    quote: "So easy and the food deals are actually good.",
  },
  {
    initials: "SL",
    name: "Sophia L.",
    quote:
      "Carrot has been a game changer for us. We’re getting consistent covers from new customers without adding extra work for the team.",
  },
  {
    initials: "MR",
    name: "Monica R.",
    quote:
      "I love that it makes going out feel smarter. I still treat myself, but the cashback helps.",
  },
  {
    initials: "JH",
    name: "Jordan Hale",
    quote:
      "Easy to set up, easy to adjust, and we’re seeing regular new faces because of it. One of the better decisions we’ve made.",
  },
  {
    initials: "DC",
    name: "@dev.and.coffee",
    quote:
      "I check Carrot the same way I used to scroll for restaurant ideas — except now there’s actual cashback attached.",
  },
  {
    initials: "CM",
    name: "Chris M.",
    quote:
      "The automation is impressive. We set our offer parameters and it keeps working in the background. Support has been excellent too.",
  },
  {
    initials: "TB",
    name: "Taylor B.",
    quote:
      "Helps me say yes to more dinners out with the family without feeling guilty about the spend.",
  },
  {
    initials: "AV",
    name: "Ana V.",
    quote:
      "We get real customers walking through the door from Carrot. The system is smart and the team is responsive.",
  },
  {
    initials: "LP",
    name: "@lisa.plans",
    quote:
      "Fast, reliable, and the offers feel fair. I’ve recommended it to half my group chat.",
  },
  {
    initials: "MT",
    name: "Mike T.",
    quote:
      "Consistent revenue and almost no extra work on our end. That’s exactly what we needed during slower stretches.",
  },
  {
    initials: "H",
    name: "Hayden",
    quote:
      "It’s become part of my routine. Open the app, see what’s available nearby, then decide where to go.",
  },
  {
    initials: "RS",
    name: "Rachel S.",
    quote:
      "Carrot is the most low-maintenance marketing we’ve used. The results are steady and the team is a pleasure to work with.",
  },
  {
    initials: "JE",
    name: "@jordan.eats",
    quote:
      "I spend a little more than I used to on good food, but I also save more than I used to. It balances out in a good way.",
  },
  {
    initials: "PN",
    name: "Priya N.",
    quote:
      "Great service, clear communication, and real diners showing up. We appreciate how much control we keep over the offer.",
  },
  {
    initials: "S",
    name: "Sam",
    quote: "Simple and effective. That’s all I wanted from a cashback app.",
  },
  {
    initials: "ER",
    name: "Elena R.",
    quote:
      "The intelligence behind the offers is noticeable. We’re reaching people who actually come in and spend.",
  },
  {
    initials: "CW",
    name: "@city.walker",
    quote:
      "I’ve found so many new local restaurants and cafés through Carrot. It feels like having a friend who always knows the good spots.",
  },
]);

const RETAIL: Testimonial[] = withThemes([
  {
    initials: "DK",
    name: "Daniel K.",
    quote:
      "Setup was straightforward and the ongoing experience has been smooth. We’re seeing reliable sales from customers who found us through Carrot.",
  },
  {
    initials: "A",
    name: "Avery",
    quote: "This one actually delivers. I use it when I’m shopping now.",
  },
  {
    initials: "MS",
    name: "@morgan.shops",
    quote:
      "I love opening it when I’m trying to figure out where to pick something up. It makes the decision easier and usually better.",
  },
  {
    initials: "LP",
    name: "Lena P.",
    quote:
      "Carrot feels different from other marketing tools. More thoughtful, more automated, and the results have been consistent for us.",
  },
  {
    initials: "OF",
    name: "Omar F.",
    quote:
      "The team is responsive and the platform is easy to manage. We’re happy with the steady flow of shoppers.",
  },
  {
    initials: "J",
    name: "Jess",
    quote:
      "Makes me feel smart about where I spend. That’s a nice feeling when I’m buying something for myself.",
  },
  {
    initials: "KT",
    name: "Kim Tran",
    quote:
      "We’ve had a really positive experience. Clear terms, good support, and revenue we can actually count on.",
  },
  {
    initials: "NL",
    name: "@nate.local",
    quote:
      "I didn’t expect to use it this much for shopping. Now it’s just part of how I look for things locally.",
  },
  {
    initials: "GW",
    name: "Greg W.",
    quote:
      "Simple to control, effective at bringing people in, and the Carrot team has been great throughout.",
  },
  {
    initials: "SM",
    name: "Sophia M.",
    quote:
      "Great for discovering little shops I wouldn’t have walked into otherwise. The cashback makes it even better.",
  },
  {
    initials: "AR",
    name: "Alex Rivera",
    quote:
      "Even during slower weeks, the offers have helped keep a steady pace of customers coming through.",
  },
  {
    initials: "EC",
    name: "@emily.checks",
    quote:
      "Reliable and surprisingly useful. I keep coming back to it before I buy.",
  },
  {
    initials: "MG",
    name: "Maria G.",
    quote:
      "Consistent revenue without constant management. That’s the part we appreciate most.",
  },
  {
    initials: "C",
    name: "Chris",
    quote:
      "It somehow makes spending feel lighter. Hard to explain, but it works when I’m shopping.",
  },
  {
    initials: "BH",
    name: "Ben H.",
    quote:
      "Easy partnership and real results. We’ve already recommended Carrot to other shop owners.",
  },
  {
    initials: "SG",
    name: "@sara.goes",
    quote:
      "I open it before most shopping trips now. It’s become a habit in the best way.",
  },
  {
    initials: "JL",
    name: "Jordan Lee",
    quote:
      "The offers feel intelligent and the reporting is clear. Support has been quick whenever we’ve needed it.",
  },
  {
    initials: "M",
    name: "Mia",
    quote:
      "Helps me treat myself and still feel responsible about money. Rare combination.",
  },
]);

const SERVICES: Testimonial[] = withThemes([
  {
    initials: "DP",
    name: "@derek.plans",
    quote:
      "Clean, useful, and it actually changes where I book things. I’ve been recommending it to friends.",
  },
  {
    initials: "HJ",
    name: "Hannah J.",
    quote:
      "We’ve been impressed with how little effort it takes on our side while still bringing in steady new clients.",
  },
  {
    initials: "T",
    name: "Taylor",
    quote:
      "I use it to decide between a few options. The cashback often tips the scale.",
  },
  {
    initials: "NK",
    name: "Noah K.",
    quote:
      "Great experience from day one. The team is easy to work with and the system runs quietly in the background.",
  },
  {
    initials: "IM",
    name: "Isabella M.",
    quote:
      "Reliable customers and a partner that actually listens. That’s been our experience with Carrot.",
  },
  {
    initials: "AR",
    name: "@alexis.r",
    quote: "Simple idea done really well. I keep it on my home screen.",
  },
  {
    initials: "RP",
    name: "Ryan P.",
    quote:
      "We like the control we have and the fact that it just works. Support has been excellent.",
  },
  {
    initials: "LB",
    name: "Lauren B.",
    quote:
      "It’s helped our family try new activities without overspending. Win-win.",
  },
  {
    initials: "CD",
    name: "Chris D.",
    quote:
      "Surprisingly effective for bringing in new clients. The targeting feels thoughtful.",
  },
  {
    initials: "M",
    name: "Morgan",
    quote: "I didn’t think I’d use another cashback app. This one stuck.",
  },
  {
    initials: "SR",
    name: "Sophia R.",
    quote:
      "Smooth process, good communication, and consistent results. We’re glad we signed up.",
  },
  {
    initials: "JL",
    name: "@jamie.local",
    quote:
      "Makes booking local services more fun and a little smarter at the same time.",
  },
  {
    initials: "TH",
    name: "Tom H.",
    quote:
      "Straightforward, effective, and the customers have been steady. No complaints.",
  },
  {
    initials: "RS",
    name: "Riley S.",
    quote:
      "I check it the way some people check reviews — just part of deciding where to go.",
  },
  {
    initials: "NF",
    name: "Nadia F.",
    quote:
      "One of the easier marketing relationships we’ve had. Results have been consistent.",
  },
  {
    initials: "KO",
    name: "@kevin.out",
    quote:
      "Real offers, real places, and it actually influences my plans. That’s enough for me.",
  },
  {
    initials: "EV",
    name: "Elena V.",
    quote:
      "The Carrot team has been great to work with. Setup was easy and the ongoing results have been reliable.",
  },
  {
    initials: "JM",
    name: "Jordan M.",
    quote:
      "It’s the first app in a long time that feels like it’s actually on my side.",
  },
]);

export const PRODUCT_TESTIMONIALS: Record<Vertical, Testimonial[]> = {
  hospitality: HOSPITALITY,
  retail: RETAIL,
  services: SERVICES,
  // TODO: no Digital-specific reviews were supplied; falls back to the mixed
  // homepage set until page 5 of the reviews doc exists.
  digital: TESTIMONIALS,
};
