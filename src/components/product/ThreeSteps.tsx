import { Reveal } from "@/components/Reveal";
import { ConsumerStepIllustration } from "@/components/how-it-works/ConsumerStepIllustration";
import type { ConsumerStepId } from "@/data/consumer-flow";
import type { VerticalCopyBlock } from "@/data/verticals";

const STEP_IDS: readonly [ConsumerStepId, ConsumerStepId, ConsumerStepId] = [
  "discover",
  "activate",
  "spend",
];

/** Same chrome as the homepage category tiles and How It Works row. */
const STEP_TILE_CLASS =
  "h-full flex flex-col shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] p-6 pt-8 lg:p-12 rounded-[20px] bg-white";

export interface ThreeStepsProps {
  steps: readonly [VerticalCopyBlock, VerticalCopyBlock, VerticalCopyBlock];
}

/**
 * How customers use Carrot — discover the offer, activate it, then spend.
 * Same three looping cards on every category page.
 */
export function ThreeSteps({ steps }: ThreeStepsProps) {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <Reveal className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            How customers use it
          </h2>
        </Reveal>
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {STEP_IDS.map((id, index) => (
            <Reveal key={id} delay={index * 0.1} className="h-full">
              <div className={STEP_TILE_CLASS}>
                <div className="flex justify-center mb-6 lg:mb-12">
                  <ConsumerStepIllustration id={id} />
                </div>
                <p className="font-medium text-[18px] md:text-[24px] leading-[1.2] text-center mb-2 min-h-[1.2em]">
                  {steps[index].title}
                </p>
                <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
                  {steps[index].copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
