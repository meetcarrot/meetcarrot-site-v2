import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { LegalHero } from "@/components/legal/LegalHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FAQS } from "@/data/faqs";
import { faqPageJsonLd, MAIN_ID, pageMetadata } from "@/lib/seo";
import { StillNeedHelp } from "./StillNeedHelp";

export const metadata = pageMetadata({
  title: "Help & FAQs - Carrot",
  description:
    "Answers about Carrot offers, payouts, and merchant accounts. Reach our team by chat or email.",
  path: "/help",
});

/**
 * The hero carries its own `pt-18 md:pt-28` — that, not page-level padding, is
 * what clears the fixed header, exactly as on the homepage.
 */
export default function HelpPage() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <LegalHero
          title="Help center"
          iconSrc="/images/help/help.webp"
          iconAlt="Help and support"
          iconWidth={824}
          iconHeight={608}
        />

        {/*
          The help-article category grid is hidden for now — there are no
          articles behind it yet. Rebuild the list from Carrot's own articles
          when they exist.
        */}

        <FaqSection faqs={FAQS} />

        <StillNeedHelp />
      </main>
      <SiteFooter />
      <JsonLd data={faqPageJsonLd(FAQS)} />
    </>
  );
}
