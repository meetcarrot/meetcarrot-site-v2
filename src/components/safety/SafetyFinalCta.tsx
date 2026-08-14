import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { GET_STARTED_URL } from "@/lib/links";

/** Closing CTA — same shell as the homepage's, with this page's copy and art. */
export function SafetyFinalCta() {
  return (
    // The oversized bottom padding is the room the overflowing phone hangs into.
    <section className="pt-14 pb-90 sm:pb-25 lg:pb-30">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Make the month easier
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            Two payments instead of one. Same month. Less stress.
          </p>
          <div className="w-70 max-w-full mx-auto">
            <ButtonLink href={GET_STARTED_URL} variant="primary" size="default">
              Get Started
            </ButtonLink>
          </div>
        </div>
        <div className="mt-14 lg:mt-20">
          {/* Deliberately no `overflow-hidden` — the phone overlay breaks out
              of this frame's bottom edge. */}
          <div className="relative h-100 md:h-110 lg:h-200">
            <Image
              alt=""
              loading="lazy"
              fill
              className="object-cover rounded-4xl"
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 92vw, 1200px"
              src="/images/safety-and-security/get-started-bg.png"
            />
            {/* Centred under `sm` via the left/right-50% + translate trick,
                right-anchored from `sm` up. */}
            <Image
              alt="Carrot app on a phone"
              loading="lazy"
              width={1308}
              height={2511}
              className="absolute h-auto w-50 md:w-60 lg:w-92 right-[50%] left-[50%] transform-[translateX(-50%)] sm:left-auto sm:transform-none sm:right-4 bottom-[-80%] sm:-bottom-15 lg:-bottom-25"
              sizes="(max-width: 767px) 200px, (max-width: 1023px) 240px, 368px"
              src="/images/safety-and-security/get-started-phone.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
