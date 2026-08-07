import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CARD_CLASS =
  "rounded-4xl bg-black/50 border-2 border-[rgba(255,255,255,0.05)] shadow-[0_12px_24px_0_rgba(0,0,0,0.50)] backdrop-blur-[5px] p-8 md:p-10 lg:p-14 text-white";
const CARD_TITLE_CLASS =
  "leading-[115%]! font-poly-sans-wide text-[28px] md:text-[36px] lg:text-[44px] text-center mb-6 lg:mb-8";
const CARD_BODY_CLASS = "font-normal text-[14px] md:text-[16px]";
const ILLUSTRATION_SLOT_CLASS =
  "illustration-component flex items-center justify-center h-64 md:h-72 mb-8 lg:mb-10 rounded-full";

/**
 * Mission band. `data-header-theme="black"` flips the site header to its dark
 * treatment for as long as this section sits behind it.
 */
export function MissingLayer() {
  return (
    <section
      className="py-14 lg:py-24 bg-[linear-gradient(180deg,#000_0%,#0F0F0F_100%)]"
      data-header-theme="black"
    >
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center text-white">
            The missing layer
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px] text-[#D0CFCE]">
            Credit infrastructure wasn’t built for how people actually get paid.
            We’re building what’s missing.
          </p>
        </div>

        <div className="mt-8 lg:mt-10 flex justify-center">
          {/* The white pill is an anchor here, so it borrows `buttonVariants`
              rather than <Button>: auto width, and gray-400 rather than black. */}
          <a
            rel="noopener noreferrer"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "light", size: "default" }),
              "w-auto inline-flex items-center justify-center text-gray-400",
            )}
            href="/static/docs/SplitPay-LensAI.pdf"
          >
            <div className="relative z-20">Read the white paper</div>
          </a>
        </div>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className={CARD_CLASS}>
            <div className={ILLUSTRATION_SLOT_CLASS}>
              <Image
                src="/images/about-us/circle-text.svg"
                alt="text"
                width={400}
                height={420}
                unoptimized
                className="h-full w-auto object-contain"
              />
            </div>
            <h3 className={CARD_TITLE_CLASS}>
              Income arrives on
              <br />
              a schedule.
              <br />
              Bills don’t.
            </h3>
            <div className="flex flex-col gap-6 text-center text-gray-300">
              <p className={CARD_BODY_CLASS}>
                For the 67% of Americans living paycheck to paycheck, the problem
                isn’t overspending. It’s that rent, car payments, and insurance
                all land at once while income arrives in intervals. That timing
                mismatch creates overdrafts, late fees, and cascading stress for
                otherwise stable households.
              </p>
              <p className={CARD_BODY_CLASS}>
                This is a physics problem, not a behavior problem. And it’s
                invisible to traditional credit infrastructure.
              </p>
            </div>
          </div>

          <div className={CARD_CLASS}>
            <div className={ILLUSTRATION_SLOT_CLASS}>
              <Image
                src="/images/about-us/planet.svg"
                alt="text"
                width={362}
                height={420}
                unoptimized
                className="h-full w-auto object-contain"
              />
            </div>
            <h3 className={CARD_TITLE_CLASS}>
              Lens AI
              <br />
              sees what
              <br />
              FICO can’t.
            </h3>
            <div className="flex flex-col gap-6 text-center text-gray-300">
              <p className={CARD_BODY_CLASS}>
                FICO measures the wrong thing. Lens AI evaluates real-time cash
                flow, behavioral patterns, and stability signals to predict
                whether someone will make a specific payment given their actual
                financial rhythm, not a static score.
              </p>
              <p className={CARD_BODY_CLASS}>
                The results validate the thesis: removing reliance on traditional
                credit scores expanded approvals to previously excluded segments
                without increasing loss rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
