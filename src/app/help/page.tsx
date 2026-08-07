import type { Metadata } from "next";
import { FaqSection } from "@/components/FaqSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { HELP_CATEGORIES, HELP_FAQS } from "@/data/help";
import { StillNeedHelp } from "./StillNeedHelp";

export const metadata: Metadata = {
  title: "Help Center - Split Pay",
  description:
    "Answers about Split Pay accounts, payments, eligibility, and support. Browse help articles or reach our team by chat, text, email, or phone.",
};

/** Verbatim from `docs/research/markup-help/section-01.txt`. */
const CATEGORY_CARD_CLASS =
  "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white focus-visible:ring-offset-2 flex flex-col gap-1 py-5 px-5 lg:py-6 lg:px-8 bg-white rounded-[20px] md:rounded-3xl lg:rounded-4xl transition duration-200 ease-in-out shadow-[0_8px_16px_0_rgba(0,0,0,0.05)] active:shadow-[0_4px_8px_0_rgba(0,0,0,0.04)] active:scale-[0.99] active:translate-y-px";

const SECTION_HEADING_CLASS =
  "text-[40px] font-poly-sans-wide text-center leading-[1.3]!";

/**
 * The hero carries its own `pt-18 md:pt-28` — that, not page-level padding, is
 * what clears the fixed header, exactly as on the homepage.
 */
export default function HelpPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-golden pt-18 md:pt-28" data-header-theme="golden">
          <div className="mx-auto px-6 container lg:max-w-324 pt-6 md:pt-10 lg:pt-14">
            <div className="relative z-10 -mb-10 lg:-mb-16 bg-golden border border-[rgba(0,0,0,0.14)] rounded-[20px] md:rounded-3xl lg:rounded-[32px] shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] px-6 py-10 md:px-10 md:py-14 lg:py-20 flex flex-col items-center justify-center gap-6 md:gap-10">
              <div className="flex items-center justify-center h-30 min-[450px]:h-42 lg:h-53">
                {/* Plain <img>: next/image refuses to optimise SVG without
                    `dangerouslyAllowSVG`, and the box is sized by the wrapper. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/help/help.svg"
                  alt="Help and support"
                  width={280}
                  height={240}
                  className="h-full w-auto"
                />
              </div>
              <h1 className="font-poly-sans-wide text-center text-[40px] md:text-[56px] lg:text-[64px] leading-[115%]!">
                Help center
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-gray-100">
          <div className="mx-auto px-6 container lg:max-w-324 pt-24 md:pt-28 lg:pt-40">
            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className={SECTION_HEADING_CLASS}>How can we help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {HELP_CATEGORIES.map((category) => (
                  <a
                    key={category.slug}
                    href={`/help/${category.slug}`}
                    className={CATEGORY_CARD_CLASS}
                  >
                    <span className="text-[18px] font-medium">{category.title}</span>
                    <span className="text-[16px] font-normal leading-[1.33] text-gray-600">
                      {category.articleCount}{" "}
                      {category.articleCount === 1 ? "article" : "articles"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FaqSection faqs={HELP_FAQS} />

        <StillNeedHelp />
      </main>
      <SiteFooter />
    </>
  );
}
