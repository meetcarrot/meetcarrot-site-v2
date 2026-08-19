import type { Faq } from "@/types/content";

/**
 * The standard 12-question set. Identical on the homepage, every vertical page,
 * and the Help & FAQs page — there is deliberately no per-page variant, so edit
 * here and every surface follows.
 */
export const FAQS: Faq[] = [
  {
    id: "how-much-does-it-cost",
    question: "How much does it cost?",
    slug: "how-much-does-it-cost",
    answer:
      "<p>There are no upfront fees or monthly charges. You only pay when a customer redeems your offer and makes a qualified purchase. Reimbursements are processed automatically at the end of every week.</p>",
  },
  {
    id: "whats-required-to-start",
    question: "What’s required to start?",
    slug: "whats-required-to-start",
    answer:
      "<p>Complete enrollment and confirm your offer parameters (rate, minimum spend, max cashback, and monthly cap). Once that’s done, you’re live.</p>",
  },
  {
    id: "how-do-we-verify-consumer-transactions",
    question: "How do we verify consumer transactions?",
    slug: "how-do-we-verify-consumer-transactions",
    answer:
      "<p>Transactions are automatically verified by matching statement descriptors from the consumer’s purchase data.</p>",
  },
  {
    id: "what-work-is-required-on-my-end",
    question: "What work is required on my end?",
    slug: "what-work-is-required-on-my-end",
    answer:
      "<p>Very little. After setting your offer, Carrot handles the rest. You can update your parameters, but no ongoing work is required.</p>",
  },
  {
    id: "how-do-i-reconcile-the-transactions",
    question: "How do I reconcile the transactions?",
    slug: "how-do-i-reconcile-the-transactions",
    answer:
      "<p>You’ll have a clear dashboard showing all redeemed offers and associated revenue. Reports are simple and easy to review.</p>",
  },
  {
    id: "what-offer-types-are-supported",
    question: "What offer types are supported?",
    slug: "what-offer-types-are-supported",
    answer:
      "<p>All offers are structured as a percentage cashback (e.g. 25% cashback), ranging from 1% to the max offer rate you set. Offers are dynamically updated to help drive customers to your business. Offers tied to specific items or limited to specific times (such as buy-one-get-one) currently aren’t supported, since exact purchased items or purchase times can’t be verified.</p>",
  },
  {
    id: "what-do-i-pay-for-again",
    question: "What do I pay for again?",
    slug: "what-do-i-pay-for-again",
    answer:
      "<p>You only pay for results — when a customer uses your offer and makes a qualified purchase.</p>",
  },
  {
    id: "when-do-reimbursements-happen",
    question: "When do reimbursements happen?",
    slug: "when-do-reimbursements-happen",
    answer:
      "<p>Charges for offer reimbursements happen every week, at the end of the week.</p>",
  },
  {
    id: "how-does-it-work-again",
    question: "How does it work again?",
    slug: "how-does-it-work-again",
    answer:
      "<p>You set your offer terms → Carrot promotes it to relevant customers in real time → Customers redeem and make a qualified purchase → You receive the revenue, and you reimburse Carrot for the offer amounts.</p>",
  },
  {
    id: "can-i-update-my-offer",
    question: "Can I update my offer?",
    slug: "can-i-update-my-offer",
    answer: "<p>Yes. You can update your offer by working with your local rep.</p>",
  },
  {
    id: "how-do-customers-find-my-offer",
    question: "How do customers find my offer?",
    slug: "how-do-customers-find-my-offer",
    answer:
      "<p>Carrot automatically targets and shows your offer to relevant consumers in real time based on location, behavior, and intent.</p>",
  },
  {
    id: "do-i-need-to-change-anything-at-my-business",
    question: "Do I need to change anything at my business?",
    slug: "do-i-need-to-change-anything-at-my-business",
    answer:
      "<p>No. There’s nothing you need to add at your location or change in your existing process. Everything runs through Carrot.</p>",
  },
];
