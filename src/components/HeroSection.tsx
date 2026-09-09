import { HeroFrame, HeroPairRotator } from "@/components/HeroPairRotator";
import { CheckIcon } from "@/components/icons";
import { GetStartedButton } from "@/components/GetStartedButton";

/**
 * Hero band. `data-header-theme` is read by the site header's scroll listener to
 * flip its palette while this section is in view — the band is white, so the
 * header takes the light (blurred) treatment rather than the tinted one.
 *
 * The two flanking photo columns and the in-copy `grid-cols-2` block are two
 * renderings of the same pair of images, swapped at the `lg` breakpoint.
 */
export function HeroSection() {
  return (
    <section className="bg-white pt-18 md:pt-28" data-header-theme="light">
      <div className="mx-auto px-6 container lg:max-w-324 pt-12">
        <HeroPairRotator>
          <div className="flex justify-between gap-6">
          <div className="h-fill flex-1 relative hidden lg:block">
            {/* -bottom-12 lets the photo bleed 48px past the hero band; nothing above may clip it. */}
            <HeroFrame
              side="left"
              bleed
              sizes="(min-width: 1024px) 33vw, 0vw"
              className="rounded-3xl shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]"
            />
          </div>

          <div className="w-120 md:w-full lg:w-98.5 max-w-full mx-auto">
            <h1 className="leading-[115%]! font-poly-sans-wide text-center text-[40px] md:text-[56px] lg:text-[64px] lg:pt-12 leading-[1.15]">
              The Way
              <br />
              Marketing
              <br />
              Should Be
            </h1>
            <p className="text-[16px] font-normal mb-6 mt-1 md:mt-1.25 text-center leading-[1.6]">
              Turn on steady, automated revenue
              <br />
              with intelligent cashback offers
            </p>

            <div className="w-70 max-w-full flex justify-center mx-auto">
              <GetStartedButton variant="primary" size="default" />
            </div>

            <div className="py-8 md:py-10 lg:pb-12 opacity-65 flex flex-col md:flex-row md:justify-center lg:flex-col gap-2 md:gap-0 lg:gap-2">
              <p className="font-normal flex items-center justify-center gap-2 text-[14px]">
                <CheckIcon className="opacity-65" width={12} height={10} />
                100% Automated
              </p>
              <p className="font-normal opacity-25 text-[14px] mx-4 hidden md:block lg:hidden">
                |
              </p>
              <p className="font-normal flex items-center justify-center gap-2 text-[14px]">
                <CheckIcon className="opacity-65" width={12} height={10} />
                No Upfront or Monthly Fee
              </p>
              <p className="font-normal opacity-25 text-[14px] mx-4 hidden md:block lg:hidden">
                |
              </p>
              <p className="font-normal flex items-center justify-center gap-2 text-[14px]">
                <CheckIcon className="opacity-65" width={12} height={10} />
                Pay For Revenue, Not Clicks
              </p>
            </div>

            {/* Same pair as the flanking columns, shown below lg. The grid is
                shorter than the cells so the photos bleed 48px (mobile) / 64px
                (md) into the next section — matching Split Pay. */}
            <div className="grid grid-cols-2 gap-6 h-60 md:h-134 lg:hidden">
              <HeroFrame
                side="left"
                sizes="(max-width: 1023px) 50vw, 0vw"
                className="w-full h-72 md:h-150 rounded-3xl shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]"
              />
              <HeroFrame
                side="right"
                sizes="(max-width: 1023px) 50vw, 0vw"
                className="w-full h-72 md:h-150 rounded-3xl shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]"
              />
            </div>
          </div>

          <div className="h-fill flex-1 relative hidden lg:block">
            <HeroFrame
              side="right"
              bleed
              sizes="(min-width: 1024px) 33vw, 0vw"
              className="rounded-3xl shadow-[0_8px_16px_0_rgba(0,0,0,0.10)]"
            />
          </div>
        </div>
        </HeroPairRotator>
      </div>
    </section>
  );
}
