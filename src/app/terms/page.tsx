import type { Metadata } from "next";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TERMS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Website Terms of Service - Carrot",
  description:
    "The terms and conditions that govern your access to and use of Carrot's website.",
  alternates: { canonical: "/terms" },
};

// The hero band carries its own header-clearing padding, so <main> adds none.
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalHero title={TERMS.title} />
        <LegalPage doc={TERMS} />
      </main>
      <SiteFooter />
    </>
  );
}
