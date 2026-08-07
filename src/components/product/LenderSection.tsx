import Image from "next/image";
import { Fragment, type ReactNode } from "react";

export interface LenderStep {
  /** SVG rendered at 32×32 inside the translucent circle. See `product-icons.tsx`. */
  icon: ReactNode;
  /** Set `whitespace-nowrap` upstream, so keep this short. */
  title: string;
  copy: ReactNode;
}

export interface LenderCard {
  /** SVG rendered at 24×24 inside the translucent circle. */
  icon: ReactNode;
  title: string;
  copy: ReactNode;
}

export interface LenderSectionImage {
  src: string;
  alt: string;
}

export interface LenderLogo {
  /** Doubles as the `aria-label` on the wrapper and the React key. */
  name: string;
  src: string;
}

export interface LenderSectionProps {
  heading: ReactNode;
  intro: ReactNode;
  /** Three steps, separated by hairline rules that turn horizontal at `md`. */
  steps: LenderStep[];
  image: LenderSectionImage;
  /** Three cards on every product page; the grid is `lg:grid-cols-3`. */
  cards: LenderCard[];
  /** Mortgage + car ship a servicer logo wall; rent omits the block entirely. */
  logos?: LenderLogo[];
  /** Mobile-only line under the logo wall, e.g. "Works with all other mortgage providers". */
  logosFootnote?: string;
}

export function LenderSection({
  heading,
  intro,
  steps,
  image,
  cards,
  logos,
  logosFootnote,
}: LenderSectionProps) {
  return (
    <section
      className="overflow-x-clip bg-[linear-gradient(180deg,#000_0%,#0F0F0F_100%)] py-14 lg:py-24"
      data-header-theme="black"
    >
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center text-white">
            {heading}
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px] text-[#D0CFCE]">
            {intro}
          </p>
          <div className="mt-6 lg:mt-12">
            <div className="flex flex-col items-stretch md:flex-row md:items-start md:max-w-260 mx-auto">
              {steps.map((step, index) => (
                <Fragment key={step.title}>
                  {index > 0 ? (
                    <div className="self-center w-px h-10 my-2 bg-white/15 md:self-start md:flex-1 md:h-px md:w-auto md:my-0 md:mt-8 md:mx-4 lg:mt-10" />
                  ) : null}
                  <div className="flex flex-col items-center text-center md:flex-1">
                    <div className="flex items-center justify-center size-16 md:size-20 rounded-full bg-white/6 ring-1 ring-inset ring-white/10 mb-4 md:mb-6">
                      {step.icon}
                    </div>
                    <p className="text-white whitespace-nowrap font-medium text-[18px] mb-2">
                      {step.title}
                    </p>
                    <p className="font-normal text-gray-300 text-[16px] leading-[1.3]">
                      {step.copy}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 lg:mt-20 relative">
          <div className="relative rounded-4xl overflow-hidden h-100 md:h-110.5 lg:h-200">
            <Image
              alt={image.alt}
              loading="lazy"
              fill
              className="object-cover"
              sizes="(min-width: 1296px) 1248px, 100vw"
              src={image.src}
            />
          </div>
          <div className="relative z-10 -mt-10 lg:-mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mx-4 md:mx-10">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-4xl p-7 lg:p-10 bg-black/50 border border-white/5 shadow-[0_12px_24px_0_rgba(0,0,0,0.50)] backdrop-blur-[5px] text-white"
              >
                <div className="flex justify-center mb-4 lg:mb-6">
                  <div className="flex items-center justify-center rounded-full w-16 h-16 bg-white/[0.06] ring-1 ring-inset ring-white/10 [filter:drop-shadow(0_12px_24px_rgba(0,0,0,0.10))]">
                    {card.icon}
                  </div>
                </div>
                <p className="font-medium text-center text-[18px] md:text-[24px] mb-4 leading-[130%]">
                  {card.title}
                </p>
                <p className="font-normal text-center text-[16px] md:text-[18px] leading-[130%]">
                  {card.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
        {logos && logos.length > 0 ? (
          <div className="mt-14 lg:mt-24">
            <div className="relative">
              {/* Two independent layouts: a 2-up grid below `lg`, a single
                  edge-to-edge row (masked at both ends) from `lg`. */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:hidden">
                {logos.map((logo) => (
                  <div
                    key={logo.name}
                    aria-label={logo.name}
                    className="flex items-center justify-center h-14"
                    role="img"
                  >
                    {/* Plain <img>, not next/image: these are SVGs sized by
                        their own intrinsic box inside the h-14 flex cell. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="logo" src={logo.src} />
                  </div>
                ))}
              </div>
              <div className="hidden lg:block mx-[calc(50%-50vw)]">
                <div className="max-w-480 mx-auto mask-[linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
                  <div className="flex items-center justify-between gap-x-6 px-10">
                    {logos.map((logo) => (
                      <div
                        key={logo.name}
                        aria-label={logo.name}
                        className="flex items-center justify-center h-14 w-39"
                        role="img"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="logo" src={logo.src} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {logosFootnote ? (
                <p className="font-normal text-gray-600 text-center text-[16px] mt-12 lg:hidden">
                  {logosFootnote}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
