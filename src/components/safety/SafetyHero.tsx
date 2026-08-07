import Image from "next/image";

/**
 * Golden hero. `data-header-theme="golden"` is what the site header's
 * intersection observer reads to flip its palette while this band is in view,
 * and the section's own `pt-18 md:pt-28` is what clears the fixed header.
 */
export function SafetyHero() {
  return (
    <section
      className="bg-golden mb-14 lg:mb-24 h-130 min-[420px]:h-115 md:h-140 lg:h-170 pt-18 md:pt-28"
      data-header-theme="golden"
    >
      <div className="mx-auto px-6 container lg:max-w-324 pt-12">
        <div className="px-6 py-10 lg:px-10 md:px-10 md:py-14 lg:py-20 h-112 min-[420px]:h-96 md:h-115 lg:h-148 w-full border border-[rgba(0,0,0,0.14)] bg-golden rounded-4xl shadow-[0_12px_24px_0_rgba(0,0,0,0.05)]">
          <div className="illustration-component flex items-center justify-center h-28 min-[450px]:h-42 lg:h-53">
            {/* h-full/w-auto stands in for the target's `.illustration-component img`
                rule so the artwork fills the fixed-height slot at every breakpoint. */}
            <Image
              alt="security"
              src="/images/safety-and-security/welcome-img.png"
              width={840}
              height={636}
              priority
              className="h-full w-auto"
            />
          </div>
          <h1 className="leading-[115%]! font-poly-sans-wide text-center text-[40px] md:text-[56px] lg:text-[64px] mt-2 md:mt-6 lg:mt-10">
            {/* Explicit space: JSX drops the newline, so the two sentences would
                otherwise collide at the breakpoints where the <br> is hidden. */}
            Quietly secure.{" "}
            <br className="hidden lg:block" />
            Always working.
          </h1>
          <p className="font-normal text-center text-[16px] md:text-[18px] leading-[130%] md:leading-[160%] text-gray-400">
            Your money, your account, and your data — protected by layers you
            never have to think about.
          </p>
        </div>
      </div>
    </section>
  );
}
