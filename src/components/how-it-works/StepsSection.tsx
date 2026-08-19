import { StepIllustration } from "@/components/how-it-works/StepIllustration";
import { HOW_IT_WORKS_STEPS } from "@/data/how-it-works";

/**
 * The dedicated /how-it-works page: all four steps, stacked, each numbered.
 *
 * The illustrations are live cards rather than artwork — each shows the actual
 * thing its step describes, in shared card chrome, so the sequence reads as one
 * system: set terms, push them out, revenue lands, Carrot collects. They size
 * themselves, so there is no fixed-height frame here.
 */
export function StepsSection() {
  return (
    <section
      className="bg-pink-50 pb-14 lg:pb-24 pt-30 lg:pt-50"
      data-header-theme="tint"
    >
      <div className="mx-auto px-6 container lg:max-w-324">
        <h1 className="text-[40px] leading-[115%]! font-poly-sans-wide text-center md:text-[56px] lg:text-[64px]">
          How Carrot works
        </h1>
        <div className="mt-10 md:mt-20 grid grid-cols-1 gap-6 md:gap-10 max-w-167 mx-auto">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.id}
              className="shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] px-6 md:px-10 py-10 border border-black/15 rounded-3xl flex flex-col gap-6"
            >
              <div className="w-full flex justify-center">
                <p className="px-4 border border-black/15 h-9 flex items-center rounded-full font-medium text-[14px] md:text-[16px]">
                  Step {index + 1}
                </p>
              </div>
              <div className="flex items-center justify-center w-full">
                <StepIllustration id={step.id} />
              </div>
              <p className="font-normal text-center text-[18px] md:text-[24px] w-full">
                <b className="font-medium">{step.title}.</b> {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
