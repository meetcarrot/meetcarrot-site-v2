import type { Metadata } from "next";
import { FaqSection } from "@/components/FaqSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FAQS } from "@/data/faqs";
import { StillNeedHelp } from "./StillNeedHelp";

export const metadata: Metadata = {
  title: "Help & FAQs - Carrot",
  description:
    "Answers about Carrot offers, payouts, and merchant accounts. Reach our team by chat or email.",
  alternates: { canonical: "/help" },
};

/**
 * The hero carries its own `pt-18 md:pt-28` — that, not page-level padding, is
 * what clears the fixed header, exactly as on the homepage.
 */
export default function HelpPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-pink-50 pt-18 md:pt-28" data-header-theme="tint">
          <div className="mx-auto px-6 container lg:max-w-324 pt-6 md:pt-10 lg:pt-14">
            <div className="relative z-10 -mb-10 lg:-mb-16 bg-pink-50 border border-[rgba(0,0,0,0.14)] rounded-[20px] md:rounded-3xl lg:rounded-[32px] shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] px-6 py-10 md:px-10 md:py-14 lg:py-20 flex flex-col items-center justify-center gap-6 md:gap-10">
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

        {/*
          The help-article category grid is hidden for now — there are no
          articles behind it yet. Its data source was Split Pay's and has been
          removed; rebuild the list from Carrot's own articles when they exist.
        */}

        <FaqSection faqs={FAQS} />

        <StillNeedHelp />
      </main>
      <SiteFooter />
    </>
  );
}
