import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MAIN_ID } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Page not found - Carrot",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <section className="pt-18 md:pt-28" data-header-theme="light">
          <div className="mx-auto px-6 container lg:max-w-324 py-20 md:py-28 text-center">
            <h1 className="font-poly-sans-wide text-[40px] md:text-[56px] leading-[115%]!">
              Page not found
            </h1>
            <p className="mt-4 text-[16px] leading-[1.6]">
              That page doesn’t exist. Head back to the homepage to keep going.
            </p>
            <Link
              href="/"
              className="inline-flex mt-8 rounded-3xl text-[16px] font-medium underline underline-offset-4 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2"
            >
              Go to homepage
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
