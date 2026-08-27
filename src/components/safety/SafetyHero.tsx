import { ClayHeroIcon } from "@/components/ClayHeroIcon";

/**
 * Verbatim from `docs/research/markup-safety/section-00.txt`, including the
 * breakpoint heights. Tablet is the load-bearing one: `md:h-140` / `md:h-115`
 * with no `lg:` line-break on the title. White fill instead of golden; the
 * clay icon sits in the original `.illustration-component` slot so it cannot
 * change the frame.
 */
export function SafetyHero() {
  return (
    <section
      className="mb-14 lg:mb-24 h-130 min-[420px]:h-115 md:h-140 lg:h-170 pt-18 md:pt-28"
      data-header-theme="light"
    >
      <div className="mx-auto px-6 container lg:max-w-324 pt-12">
        <div className="px-6 py-10 lg:px-10 md:px-10 md:py-14 lg:py-20 h-112 min-[420px]:h-96 md:h-115 lg:h-148 w-full border border-[rgba(0,0,0,0.14)] bg-white rounded-4xl shadow-[0_12px_24px_0_rgba(0,0,0,0.05)]">
          <div className="illustration-component flex items-center justify-center overflow-visible h-28 min-[450px]:h-42 lg:h-53">
            <ClayHeroIcon
              src="/images/safety-and-security/shield-clay.webp"
              alt="Security shield"
              width={679}
              height={767}
            />
          </div>
          <h1 className="leading-[115%]! font-poly-sans-wide text-center text-[40px] md:text-[56px] lg:text-[64px] mt-2 md:mt-6 lg:mt-10">
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
