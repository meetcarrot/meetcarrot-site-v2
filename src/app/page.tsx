import { CategoryCards } from "@/components/CategoryCards";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Testimonials } from "@/components/Testimonials";

/**
 * Section order and the absence of any wrapper on <main> both mirror the target:
 * sections stack directly, and the hero's own `pt-18 md:pt-28` is what clears the
 * fixed header rather than page-level padding.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoryCards />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
