import Image from "next/image";

export interface ThreeStepsStep {
  imageSrc: string;
  imageAlt: string;
  label: string;
}

export interface ThreeStepsProps {
  /** Exactly three phone screenshots; only the first step's copy/alt vary by product. */
  steps: readonly [ThreeStepsStep, ThreeStepsStep, ThreeStepsStep];
}

/**
 * "Three steps. About three minutes." — the onboarding walkthrough shared by
 * /rent, /mortgage and /car. The negative `lg:-ml-6 lg:-mr-6` cancels the
 * container padding so the three phones sit edge to edge on desktop.
 */
export function ThreeSteps({ steps }: ThreeStepsProps) {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center max-w-200 mx-auto">
            Three steps.
            <br />
            About three
            <br className="md:hidden" />
            minutes.
          </h2>
        </div>
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-0 lg:-ml-6 lg:-mr-6">
          {steps.map((step) => (
            <div key={step.label}>
              <Image
                src={step.imageSrc}
                alt={step.imageAlt}
                loading="lazy"
                width={1296}
                height={1833}
                className="mx-auto mb-6 lg:mb-8 max-w-full w-74 lg:w-108 h-auto"
                sizes="(min-width: 1024px) 432px, 296px"
              />
              <p className="font-medium text-[18px] text-center mb-2">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
