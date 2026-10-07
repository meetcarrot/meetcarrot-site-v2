import Link from "next/link";

import { ClayHeroIcon } from "@/components/ClayHeroIcon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MAIN_ID, pageMetadata } from "@/lib/seo";
import { ENROLLED_PATH } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "You're enrolled - Carrot",
    description: "Your enrollment is complete.",
    path: ENROLLED_PATH,
  }),
  robots: { index: false, follow: false },
};

/**
 * Formsite lands here after a merchant finishes enrollment. One confirmation,
 * no extra CTAs — they already completed the form.
 */
export default function EnrolledPage() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <section
          className="flex min-h-svh flex-col pt-18 md:pt-28"
          data-header-theme="light"
        >
          <div className="mx-auto flex flex-1 flex-col items-center justify-center px-6 container lg:max-w-324 py-12 md:py-16">
            <div className="relative z-10 w-full max-w-3xl bg-white border border-[rgba(0,0,0,0.14)] rounded-[20px] md:rounded-3xl lg:rounded-[32px] shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] px-6 py-10 md:px-10 md:py-14 lg:py-20 flex flex-col items-center justify-center gap-6 md:gap-8 text-center">
              <div className="illustration-component relative flex items-center justify-center overflow-visible h-30 min-[450px]:h-42 lg:h-53">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[18%] bottom-[4%] h-[8%] rounded-[100%] bg-black/12 blur-[6px]"
                />
                <ClayHeroIcon
                  src="/images/confirmed/enrolled.webp"
                  alt=""
                  width={983}
                  height={755}
                />
              </div>
              <h1 className="font-poly-sans-wide text-[40px] md:text-[56px] leading-[115%]!">
                You’re enrolled
              </h1>
              <p className="text-[16px] leading-[1.6]">
                Your enrollment is complete. We’ll be in touch with next steps.
              </p>
              <Link
                href="/"
                className="inline-flex rounded-3xl text-[16px] font-medium underline underline-offset-4 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2"
              >
                Go to homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
