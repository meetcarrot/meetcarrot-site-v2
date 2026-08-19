import Image from "next/image";

import { GetStartedButton } from "@/components/GetStartedButton";
import { ParallaxBackdrop } from "@/components/ParallaxBackdrop";
import { Reveal } from "@/components/Reveal";

const BACKGROUND_SIZES = "(max-width: 767px) 92vw, (max-width: 1023px) 92vw, 1200px";
const PHONE_SIZES = "(max-width: 767px) 200px, (max-width: 1023px) 240px, 368px";

/**
 * The closing section on every page: the business is set up and running itself,
 * so the photograph is the owner enjoying their time while the phone shows the
 * revenue still arriving.
 *
 * One component rather than a copy per page — the homepage, the safety page and
 * the four vertical pages previously carried three near-identical
 * implementations, which is how two of them ended up still describing Split
 * Pay's product.
 */
export interface AutopilotCtaProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  /** Lifestyle photograph behind the phone. */
  backgroundSrc: string;
  phoneSrc: string;
  /** Intrinsic phone-render dimensions; the crops differ per page. */
  phoneWidth: number;
  phoneHeight: number;
}

export function AutopilotCta({
  title = "Steady revenue, on autopilot",
  description = "Turn your offer on and get back to running your business. Carrot finds the customers, verifies the purchases, and settles up every Friday.",
  ctaLabel = "Get Started",
  backgroundSrc,
  phoneSrc,
  phoneWidth,
  phoneHeight,
}: AutopilotCtaProps) {
  return (
    // The oversized bottom padding is the room the overflowing phone hangs into:
    // below `sm` the phone is centred and pushed almost fully out of the frame.
    <section className="pt-14 pb-90 sm:pb-25 lg:pb-30">
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
          {/* Deliberately no `overflow-hidden` — the phone overlay breaks out
              of this frame's bottom edge. */}
          <div className="relative h-100 md:h-110 lg:h-200">
            <ParallaxBackdrop src={backgroundSrc} sizes={BACKGROUND_SIZES} />
            {/* Centred under `sm` via the left/right-50% + translate trick,
                right-anchored from `sm` up. */}
            <Image
              src={phoneSrc}
              alt="Carrot app on a phone"
              loading="lazy"
              width={phoneWidth}
              height={phoneHeight}
              className="absolute h-auto w-50 md:w-60 lg:w-92 right-[50%] left-[50%] transform-[translateX(-50%)] sm:left-auto sm:transform-none sm:right-4 bottom-[-80%] sm:-bottom-15 lg:-bottom-25"
              sizes={PHONE_SIZES}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
