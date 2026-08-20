import { Reveal } from "@/components/Reveal";
import { StepIllustration } from "@/components/how-it-works/StepIllustration";
import { HOMEPAGE_STEP_COUNT, HOW_IT_WORKS_STEPS } from "@/data/how-it-works";

/**
 * Homepage summary of the same flow the /how-it-works page carries in full —
 * same copy, same animated cards, three across instead of stacked. It reads
 * from the shared step list so the two surfaces cannot describe Carrot
 * differently.
 */
export function HowItWorks() {
  const steps = HOW_IT_WORKS_STEPS.slice(0, HOMEPAGE_STEP_COUNT);

  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <Reveal className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            How It Works
          </h2>
        </Reveal>
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-8">
          {steps.map((step, index) => (
            // Staggered by a tenth of a second so the three read left to right
            // rather than snapping in as one row.
            <Reveal key={step.id} delay={index * 0.1} className="flex flex-col">
              {/* Equal-height frames, so titles and copy start on the same row
                  when the three sit side by side. */}
              <div className="flex justify-center mb-8">
                <StepIllustration id={step.id} />
              </div>
              <p className="font-medium text-[18px] md:text-[24px] leading-[1.2] text-center mb-2 min-h-[1.2em]">
                {step.title}
              </p>
              <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
                {step.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
