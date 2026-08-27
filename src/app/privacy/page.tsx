import { LegalHero } from "@/components/legal/LegalHero";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PRIVACY } from "@/data/legal";
import { MAIN_ID, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy - Carrot",
  description:
    "How Carrot collects, uses, and shares information when you use our website.",
  path: "/privacy",
});

// The hero band carries its own header-clearing padding, so <main> adds none.
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <LegalHero
          title={PRIVACY.title}
          iconSrc="/images/privacy/privacy.webp"
          iconAlt="Privacy policy"
          iconWidth={598}
          iconHeight={829}
        />
        <LegalPage doc={PRIVACY} />
      </main>
      <SiteFooter />
    </>
  );
}
