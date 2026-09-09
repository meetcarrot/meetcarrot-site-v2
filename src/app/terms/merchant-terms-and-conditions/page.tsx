import { LegalHero } from "@/components/legal/LegalHero";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MERCHANT_TERMS } from "@/data/merchant-terms";
import { MAIN_ID, pageMetadata } from "@/lib/seo";
import { MERCHANT_TERMS_PATH } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Merchant terms and conditions - Carrot",
    description:
      "These Carrot Merchant Terms and Conditions are entered into by and between Carrot Company Limited, USA and the Merchant identified in the Enrollment Agreement.",
    path: MERCHANT_TERMS_PATH,
  }),
  robots: { index: false, follow: false },
};

// The hero band carries its own header-clearing padding, so <main> adds none.
export default function MerchantTermsPage() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <LegalHero
          title={MERCHANT_TERMS.title}
          iconSrc="/images/terms/merchant-terms.webp"
          iconAlt="Merchant terms and conditions"
          iconWidth={580}
          iconHeight={673}
        />
        <LegalPage doc={MERCHANT_TERMS} />
      </main>
      <SiteFooter />
    </>
  );
}
