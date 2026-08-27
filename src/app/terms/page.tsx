import { LegalHero } from "@/components/legal/LegalHero";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TERMS } from "@/data/legal";
import { MAIN_ID, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of use - Carrot",
  description:
    "The terms and conditions that govern your access to and use of Carrot's website.",
  path: "/terms",
});

// The hero band carries its own header-clearing padding, so <main> adds none.
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <LegalHero
          title={TERMS.title}
          iconSrc="/images/terms/terms.webp"
          iconAlt="Terms of use"
          iconWidth={562}
          iconHeight={758}
        />
        <LegalPage doc={TERMS} />
      </main>
      <SiteFooter />
    </>
  );
}
