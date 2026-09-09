import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MAIN_ID, pageMetadata } from "@/lib/seo";
import { MERCHANT_TERMS_PATH } from "@/lib/site";

export function movedTermsMetadata(path: string) {
  return {
    ...pageMetadata({
      title: "This page has moved - Carrot",
      description:
        "The merchant terms and conditions have moved to a new address.",
      path,
    }),
    robots: { index: false, follow: false },
  };
}

/**
 * Landing for old contract URLs. Tells the reader the address changed and
 * sends them to the current merchant terms — no legal copy of its own.
 */
export function MovedMerchantTerms() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <section className="pt-18 md:pt-28" data-header-theme="light">
          <div className="mx-auto px-6 container lg:max-w-324 py-20 md:py-28 text-center">
            <h1 className="font-poly-sans-wide text-[40px] md:text-[56px] leading-[115%]!">
              This page has moved
            </h1>
            <p className="mt-4 text-[16px] leading-[1.6]">
              The merchant terms and conditions are now at{" "}
              <span className="whitespace-nowrap">{MERCHANT_TERMS_PATH}</span>.
            </p>
            <Link
              href={MERCHANT_TERMS_PATH}
              className="inline-flex mt-8 rounded-3xl text-[16px] font-medium underline underline-offset-4 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2"
            >
              Go to merchant terms and conditions
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
