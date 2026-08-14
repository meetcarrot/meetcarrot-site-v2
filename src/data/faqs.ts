import type { Faq } from "@/types/content";

/**
 * DRAFT copy. The 12 final FAQs are still coming; these are written from the
 * product described in the changes doc so nothing on the page reads as another
 * company's product. Replace wholesale when the real set lands — the shape
 * (`id`, `question`, `slug`, `answer` HTML) is what FaqSection and FaqModal
 * consume, so keep it.
 */
export const FAQS: Faq[] = [
  {
    id: "what-is-carrot",
    question: "What is Carrot?",
    slug: "what-is-carrot",
    answer:
      "<p>Carrot is a cashback marketing platform for local businesses. You set a cashback offer, we promote it to the right customers, and you get paid when they actually buy.</p><p>There is no upfront cost and no monthly fee. You pay a share of the revenue we bring you — not for clicks or impressions.</p>",
  },
  {
    id: "what-does-it-cost",
    question: "What does it cost?",
    slug: "what-does-it-cost",
    answer:
      "<p>Nothing to start. No setup fee, no monthly subscription, no contract.</p><p>You choose a cashback rate and a monthly cap. The cashback comes out of the sales Carrot drives, so your cost scales with your results and never exceeds the cap you set.</p>",
  },
  {
    id: "how-do-i-set-my-offer",
    question: "How do I set my offer?",
    slug: "how-do-i-set-my-offer",
    answer:
      "<p>You are in full control. Pick your cashback rate, any spend minimums, and a monthly cap on what you are willing to spend.</p><p>You can change any of it whenever you want from your merchant dashboard, and changes take effect immediately.</p>",
  },
  {
    id: "who-sees-my-offer",
    question: "Who sees my offer?",
    slug: "who-sees-my-offer",
    answer:
      "<p>Carrot targets customers near you who are actively deciding where to spend. Offers are sent dynamically based on location, timing, and what someone is likely to buy.</p><p>You are reaching people who are ready to purchase, not a broad audience that happens to scroll past an ad.</p>",
  },
  {
    id: "do-i-need-new-hardware",
    question: "Do I need new hardware or a new POS?",
    slug: "do-i-need-new-hardware",
    answer:
      "<p>No. Carrot works alongside your existing setup. There is no new terminal, no new software at the counter, and no change to how you take payment.</p><p>Customers pay you the way they always have. The cashback is handled on our side.</p>",
  },
  {
    id: "how-do-customers-get-cashback",
    question: "How do customers get their cash back?",
    slug: "how-do-customers-get-cashback",
    answer:
      "<p>Customers link a payment method in the Carrot app. When they pay you with that card, we detect the purchase and credit their cash back automatically.</p><p>Nothing is required from you or your staff at checkout — no codes, no coupons, no vouchers to keep track of.</p>",
  },
  {
    id: "when-do-i-pay",
    question: "When do I pay Carrot?",
    slug: "when-do-i-pay",
    answer:
      "<p>You are billed for the cashback earned on completed purchases, after those purchases happen. Payments are processed securely through Stripe.</p><p>If no one redeems an offer in a given period, there is nothing to pay.</p>",
  },
  {
    id: "can-i-pause-or-cancel",
    question: "Can I pause or cancel?",
    slug: "can-i-pause-or-cancel",
    answer:
      "<p>Yes, at any time. Pause your offer from the dashboard and it stops going out. There is no contract and no cancellation fee.</p><p>You can turn it back on whenever it suits your calendar.</p>",
  },
  {
    id: "what-kind-of-businesses",
    question: "What kinds of businesses can use Carrot?",
    slug: "what-kind-of-businesses",
    answer:
      "<p>Carrot works for hospitality, retail, services, and digital businesses.</p><p>That covers restaurants, cafés, and bars; boutiques and specialty shops; auto care, wellness, fitness, beauty, and professional services; and e-commerce, online events, and digital products.</p>",
  },
  {
    id: "how-do-i-know-its-working",
    question: "How do I know it is working?",
    slug: "how-do-i-know-its-working",
    answer:
      "<p>Your merchant dashboard shows the revenue Carrot drove, how many customers came through, and what you spent on cashback for that period.</p><p>Because cashback is only paid on completed purchases, every dollar of cost maps to a real sale.</p>",
  },
  {
    id: "are-these-new-or-existing-customers",
    question: "Are these new customers or my existing ones?",
    slug: "are-these-new-or-existing-customers",
    answer:
      "<p>Both. Carrot brings in customers who have not visited you before, and gives your regulars a reason to come back rather than shop around.</p><p>Steady revenue usually comes from a mix of the two.</p>",
  },
  {
    id: "how-do-i-get-started",
    question: "How do I get started?",
    slug: "how-do-i-get-started",
    answer:
      "<p>Tell us about your business and we will get your offer set up. Most merchants are live shortly after enrolling.</p><p>Questions before you commit? Reach us any time at <a class=\"external-link\" href=\"mailto:support@meetcarrot.xyz\" rel=\"nofollow\">support@meetcarrot.xyz</a>.</p>",
  },
];
