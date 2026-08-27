import { ClayHeroIcon } from "@/components/ClayHeroIcon";

/**
 * Title + icon card, matching Split Pay's help/terms/privacy hero: a bordered
 * white card under the header, fully in flow (no negative-margin tuck under
 * the section below — that clip is what hid the title on legal pages).
 *
 * `pt-18 md:pt-28` clears the fixed header — the legal routes must not also
 * pad `<main>`, or the header gap doubles.
 */
export function LegalHero({
  title,
  iconSrc,
  iconAlt = "",
  iconWidth,
  iconHeight,
}: {
  title: string;
  iconSrc: string;
  iconAlt?: string;
  iconWidth: number;
  iconHeight: number;
}) {
  return (
    <section className="pt-18 md:pt-28" data-header-theme="light">
      <div className="mx-auto px-6 container lg:max-w-324 pt-6 md:pt-10 lg:pt-14">
        <div className="relative z-10 bg-white border border-[rgba(0,0,0,0.14)] rounded-[20px] md:rounded-3xl lg:rounded-[32px] shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] px-6 py-10 md:px-10 md:py-14 lg:py-20 flex flex-col items-center justify-center gap-6 md:gap-10">
          <div className="illustration-component flex items-center justify-center overflow-visible h-30 min-[450px]:h-42 lg:h-53">
            <ClayHeroIcon
              src={iconSrc}
              alt={iconAlt}
              width={iconWidth}
              height={iconHeight}
            />
          </div>
          <h1 className="font-poly-sans-wide text-center text-[40px] md:text-[56px] lg:text-[64px] leading-[115%]!">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
