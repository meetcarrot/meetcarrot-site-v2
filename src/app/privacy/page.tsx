import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PRIVACY } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy - Carrot",
  description:
    "How Carrot collects, uses, and shares information when you use our website.",
};

// Content routes have no hero, so <main> supplies the padding that clears the
// fixed header (h-16.5 mobile / h-28 desktop).
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-28 md:pt-40 pb-24">
        <LegalPage doc={PRIVACY} />
      </main>
      <SiteFooter />
    </>
  );
}
