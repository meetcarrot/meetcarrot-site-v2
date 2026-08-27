import { AutopilotCta } from "@/components/AutopilotCta";
import { CategoryCards } from "@/components/CategoryCards";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Testimonials } from "@/components/Testimonials";
import { FAQS } from "@/data/faqs";
import { faqPageJsonLd, MAIN_ID, pageMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

/**
 * Section order and the absence of any wrapper on <main> both mirror the target:
 * sections stack directly, and the hero's own `pt-18 md:pt-28` is what clears the
 * fixed header rather than page-level padding.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <HeroSection />
        <CategoryCards />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
        <AutopilotCta backgroundSrc="/images/homepage-paddleboard.jpg" />
      </main>
      <SiteFooter />
      <JsonLd data={faqPageJsonLd(FAQS)} />
    </>
  );
}
