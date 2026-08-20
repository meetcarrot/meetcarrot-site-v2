import { OfferReachAnimation } from "@/components/how-it-works/OfferReachAnimation";
import { OfferTermsAnimation } from "@/components/how-it-works/OfferTermsAnimation";
import { RevenueGrowthAnimation } from "@/components/how-it-works/RevenueGrowthAnimation";
import { STEP_ILLUSTRATION_BOX } from "@/components/how-it-works/useStepAnimation";
import { WeeklyStatementAnimation } from "@/components/how-it-works/WeeklyStatementAnimation";
import type { HowItWorksStep } from "@/data/how-it-works";

/**
 * Maps a step to its animated card, so every surface showing the flow gets the
 * same illustration for the same step without importing all four itself.
 *
 * The fixed box lives here rather than in each animation: it is a property of
 * the sequence (all steps line up), not of any one illustration.
 */
const ILLUSTRATIONS: Record<HowItWorksStep["id"], () => React.ReactElement> = {
  terms: OfferTermsAnimation,
  promote: OfferReachAnimation,
  revenue: RevenueGrowthAnimation,
  reimbursement: WeeklyStatementAnimation,
};

export function StepIllustration({ id }: { id: HowItWorksStep["id"] }) {
  const Animation = ILLUSTRATIONS[id];
  return (
    <div className={STEP_ILLUSTRATION_BOX}>
      <Animation />
    </div>
  );
}
