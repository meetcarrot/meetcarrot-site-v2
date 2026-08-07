import Image from "next/image";

import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

/**
 * Hero band. `data-header-theme="golden"` is read by the site header's
 * intersection observer to flip its palette while this section is in view.
 *
 * The two flanking photo columns and the in-copy `grid-cols-2` block are two
 * renderings of the same pair of images, swapped at the `lg` breakpoint.
 */
export function HeroSection() {
  return (
    <section className="bg-golden pt-18 md:pt-28" data-header-theme="golden">
      <div className="mx-auto px-6 container lg:max-w-324 pt-12">
        <div className="flex justify-between gap-6">
          <div className="h-fill flex-1 relative hidden lg:block">
            {/* -bottom-12 lets the photo bleed 48px past the golden band; nothing above may clip it. */}
            <div className="absolute inset-0 -bottom-12 rounded-3xl overflow-hidden shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]">
              <Image
                src="/images/deco-left.png"
                alt="dad with son"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 0vw"
              />
            </div>
          </div>

          <div className="w-120 md:w-full lg:w-98.5 max-w-full mx-auto">
            <h1 className="leading-[115%]! font-poly-sans-wide text-center text-[40px] md:text-[56px] lg:text-[64px] lg:pt-12 leading-[1.15]">
              Big bills.
              <br />
              Better timing.
            </h1>
            <p className="text-[16px] font-normal mb-6 mt-1 md:mt-1.25 text-center leading-[1.6]">
              Your biggest bills hit all at once.
              <br className="hidden lg:block" />
              Split Pay breaks them into two smaller payments.
              <br className="hidden md:block" />
              Less pressure, more room to breathe.
            </p>

            <div className="w-70 max-w-full flex justify-center mx-auto">
              <Button variant="primary" size="default">
                Get started
              </Button>
            </div>

            <div className="py-8 md:py-10 lg:pb-12 opacity-65 flex flex-col md:flex-row md:justify-center lg:flex-col gap-2 md:gap-0 lg:gap-2">
              <p className="font-normal flex items-center justify-center gap-2 text-[14px]">
                <CheckIcon className="opacity-65" width={12} height={10} />
                No credit check
              </p>
              <p className="font-normal opacity-25 text-[14px] mx-4 hidden md:block lg:hidden">
                |
              </p>
              <p className="font-normal flex items-center justify-center gap-2 text-[14px]">
                <CheckIcon className="opacity-65" width={12} height={10} />
                Works with any landlord or lender
              </p>
              <p className="font-normal opacity-25 text-[14px] mx-4 hidden md:block lg:hidden">
                |
              </p>
              <p className="font-normal flex items-center justify-center gap-2 text-[14px]">
                <CheckIcon className="opacity-65" width={12} height={10} />
                Set up in minutes
              </p>
            </div>

            {/* Below lg the flanking columns are hidden and the same photos render here. */}
            <div className="grid grid-cols-2 gap-6 h-60 md:h-134 lg:hidden">
              <div className="w-full h-72 md:h-150 relative rounded-3xl overflow-hidden shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]">
                <Image
                  src="/images/deco-left.png"
                  alt="dad with son"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1023px) 50vw, 0vw"
                />
              </div>
              <div className="w-full h-72 md:h-150 relative rounded-3xl overflow-hidden shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]">
                <Image
                  src="/images/deco-right.png"
                  alt="girl with dog"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 50vw, 0vw"
                />
              </div>
            </div>
          </div>

          <div className="h-fill flex-1 relative hidden lg:block">
            <div className="absolute inset-0 -bottom-12 rounded-3xl overflow-hidden shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]">
              <Image
                src="/images/deco-right.png"
                alt="girl with dog"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 0vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
