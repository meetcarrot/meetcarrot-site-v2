import { ActivateOfferAnimation } from "@/components/how-it-works/ActivateOfferAnimation";
import { FindBusinessAnimation } from "@/components/how-it-works/FindBusinessAnimation";
import { PayNormallyAnimation } from "@/components/how-it-works/PayNormallyAnimation";
import type { ConsumerStepId } from "@/data/consumer-flow";

const ILLUSTRATIONS: Record<ConsumerStepId, () => React.ReactElement> = {
  discover: FindBusinessAnimation,
  activate: ActivateOfferAnimation,
  spend: PayNormallyAnimation,
};

export function ConsumerStepIllustration({ id }: { id: ConsumerStepId }) {
  const Animation = ILLUSTRATIONS[id];
  return <Animation />;
}
