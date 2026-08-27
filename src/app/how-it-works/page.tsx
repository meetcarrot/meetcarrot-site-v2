import { StepsSection } from "@/components/how-it-works/StepsSection";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { howToJsonLd, MAIN_ID, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How Carrot Works - Carrot",
  description:
    "Set your offer terms, let Carrot promote it to the right customers, and earn steady revenue from real purchases.",
  path: "/how-it-works",
});

/**
 * Single-section page. The steps section carries its own `pt-30 lg:pt-50`, which
 * is what clears the fixed header — no page-level padding, matching the homepage.
 */
export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <StepsSection />
      </main>
      <SiteFooter />
      <JsonLd data={howToJsonLd()} />
    </>
  );
}
