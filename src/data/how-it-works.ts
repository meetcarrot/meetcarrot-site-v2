/**
 * The canonical "How it works" flow. Every surface that explains how Carrot
 * works for a merchant renders these same four steps — the dedicated
 * /how-it-works page in full, the homepage as a three-up summary — so the
 * wording cannot drift between them the way it had before.
 *
 * Copy is plain strings, deliberately: earlier versions baked `<br>` tags in to
 * control line breaks per breakpoint, which then had to be maintained
 * separately for every layout that showed the step.
 */
export interface HowItWorksStep {
  /** Also selects the step's animated illustration. */
  id: "terms" | "promote" | "revenue" | "reimbursement";
  title: string;
  copy: string;
}

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    id: "terms",
    title: "Set Your Terms",
    copy: "You’re in full control. Choose your rates, limits, and caps — then change them whenever you want.",
  },
  {
    id: "promote",
    title: "We Promote It",
    copy: "Carrot automatically targets the right customers and sends dynamic offers in real time.",
  },
  {
    id: "revenue",
    title: "Earn Steady Revenue",
    copy: "Consistent revenue from real purchases — month after month.",
  },
  {
    id: "reimbursement",
    title: "Automatic Reimbursement",
    copy: "Carrot automatically charges your account each week for redeemed offers.",
  },
];

/**
 * How many steps the homepage summary shows. The closing reimbursement step is
 * the one detail a visitor does not need before they have an offer, so the
 * homepage stops at three and the dedicated page carries all four.
 */
export const HOMEPAGE_STEP_COUNT = 3;
