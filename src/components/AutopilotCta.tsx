import { GetStartedButton } from "@/components/GetStartedButton";
import { ParallaxBackdrop } from "@/components/ParallaxBackdrop";
import { Reveal } from "@/components/Reveal";

const BACKGROUND_SIZES = "(max-width: 767px) 92vw, (max-width: 1023px) 92vw, 1200px";

/**
 * The closing section on the homepage and category pages: Carrot is running,
 * so the photograph is the owner doing something else.
 *
 * One component rather than a copy per page — the homepage, the safety page and
 * the four vertical pages previously carried three near-identical
 * implementations, which is how two of them drifted from Carrot's product.
 */
export interface AutopilotCtaProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  backgroundSrc: string;
}

export function AutopilotCta({
  title = "More time for the things you love",
  description = "Relax — your business is on autopilot. Carrot finds the customers, verifies the purchases, and settles up every Friday.",
  ctaLabel = "Get Started",
  backgroundSrc,
}: AutopilotCtaProps) {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <Reveal className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            {title}
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            {description}
          </p>
          <div className="w-70 max-w-full mx-auto">
            <GetStartedButton variant="primary" size="default">
              {ctaLabel}
            </GetStartedButton>
          </div>
        </Reveal>
        <div className="mt-14 lg:mt-20">
          <div className="relative h-100 md:h-110 lg:h-200">
            <ParallaxBackdrop src={backgroundSrc} sizes={BACKGROUND_SIZES} />
          </div>
        </div>
      </div>
    </section>
  );
}
