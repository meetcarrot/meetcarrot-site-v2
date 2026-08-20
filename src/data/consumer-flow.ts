/**
 * One sample trip, shared by the three consumer-side animations on category
 * pages: discover the offer, activate it, then spend at the merchant.
 *
 * Pin positions are percentages of the map, from its top-left.
 */
export const CONSUMER_DEMO = {
  business: "The Corner",
  rate: 20,
  spend: 65,
  you: { x: 24, y: 72 },
  nearby: [
    { name: "The Corner", rate: 20, x: 68, y: 28 },
    { name: "Oak Room", rate: 25, x: 42, y: 16 },
    { name: "Harbor & Co.", rate: 15, x: 14, y: 22 },
    { name: "Westside", rate: 35, x: 82, y: 58 },
    { name: "Maple Street", rate: 10, x: 52, y: 82 },
    { name: "Pine & Co.", rate: 5, x: 10, y: 48 },
  ],
} as const;

export const FEATURED_OFFER = CONSUMER_DEMO.nearby[0];

export type ConsumerStepId = "discover" | "activate" | "spend";
