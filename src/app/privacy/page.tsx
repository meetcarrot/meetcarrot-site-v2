import type { Metadata } from "next";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PRIVACY } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy - Carrot",
  description:
    "How Carrot collects, uses, and shares information when you use our website.",
  alternates: { canonical: "/privacy" },
};

// The hero band carries its own header-clearing padding, so <main> adds none.
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalHero title={PRIVACY.title} />
        <LegalPage doc={PRIVACY} />
      </main>
      <SiteFooter />
    </>
  );
}
