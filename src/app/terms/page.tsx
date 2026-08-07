import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TERMS } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms of Use - Split Pay",
  description:
    "The legally binding terms and conditions that govern your use of Split Pay's website, app, and services.",
};

// Content routes have no hero, so <main> supplies the padding that clears the
// fixed header (h-16.5 mobile / h-28 desktop).
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-28 md:pt-40 pb-24">
        <LegalPage doc={TERMS} />
      </main>
      <SiteFooter />
    </>
  );
}
