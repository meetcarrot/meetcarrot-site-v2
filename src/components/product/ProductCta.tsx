import Image from "next/image";

import { Button } from "@/components/ui/button";

const BACKGROUND_SIZES = "(max-width: 767px) 92vw, (max-width: 1023px) 92vw, 1200px";
const PHONE_SIZES = "(max-width: 767px) 200px, (max-width: 1023px) 240px, 368px";

export interface ProductCtaProps {
  /** e.g. "Rent day, lighter" */
  title: string;
  description?: string;
  ctaLabel?: string;
  backgroundSrc: string;
  phoneSrc: string;
  /** Intrinsic phone-render dimensions — car ships a slightly larger crop. */
  phoneWidth: number;
  phoneHeight: number;
}

/**
 * Closing CTA for the product pages. The phone overhangs the photo by design:
 * below `sm` it is centred and pushed almost fully out of the frame
 * (`bottom-[-80%]`), which is why the section carries the outsized `pb-90`.
 */
export function ProductCta({
  title,
  description = "Set up your first split in under 3 minutes. No credit check, no contracts.",
  ctaLabel = "Get Started",
  backgroundSrc,
  phoneSrc,
  phoneWidth,
  phoneHeight,
}: ProductCtaProps) {
  return (
    <section className="pt-14 pb-90 sm:pb-25 lg:pb-30">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            {title}
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            {description}
          </p>
          <div className="w-70 max-w-full mx-auto">
            <Button variant="primary" size="default">
              {ctaLabel}
            </Button>
          </div>
        </div>
        <div className="mt-14 lg:mt-20">
          <div className="relative h-100 md:h-110 lg:h-200">
            <Image
              src={backgroundSrc}
              alt=""
              fill
              loading="lazy"
              className="object-cover rounded-4xl"
              sizes={BACKGROUND_SIZES}
            />
            <Image
              src={phoneSrc}
              alt="Split Pay app on a phone"
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
