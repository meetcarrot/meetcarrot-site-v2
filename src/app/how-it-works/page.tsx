import type { Metadata } from "next";

import { StepsSection } from "@/components/how-it-works/StepsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "How Carrot Works - Carrot",
  description:
    "Set your offer terms, let Carrot promote it to the right customers, and earn steady revenue from real purchases.",
  alternates: { canonical: "/how-it-works" },
};

/**
 * Single-section page. The steps section carries its own `pt-30 lg:pt-50`, which
 * is what clears the fixed header — no page-level padding, matching the homepage.
 */
export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <StepsSection />
      </main>
      <SiteFooter />
    </>
  );
}
