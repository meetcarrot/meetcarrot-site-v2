import type { Metadata } from "next";

import { StepsSection } from "@/components/how-it-works/StepsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "How Carrot Works - Carrot",
  description:
    "Choose a bill to split, check your eligibility, verify your identity, and add your Carrot account numbers to your payment portal.",
};

/**
 * Single-section page. The steps section carries its own `pt-30 lg:pt-50`, which
 * is what clears the fixed header — no page-level padding, matching the target.
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
