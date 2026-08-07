import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { BackedBy } from "@/components/about/BackedBy";
import { InvestorQuotes } from "@/components/about/InvestorQuotes";
import { MissingLayer } from "@/components/about/MissingLayer";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const TITLE = "About Us - Split Pay";
const DESCRIPTION =
  "Credit infrastructure wasn’t built for how people actually get paid. Meet the team building the missing layer, and the investors backing it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about-us" },
  openGraph: {
    type: "website",
    url: "https://splitpay.com/about-us",
    siteName: "Split Pay",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/seo/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@splitpay",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/seo/og-image.png"],
  },
};

/**
 * Sections stack directly under <main> with no wrapper, mirroring the target:
 * the hero's own `pt-18 md:pt-28` is what clears the fixed header.
 */
export default function AboutUsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AboutHero />
        <AboutStats />
        <MissingLayer />
        <WhoWeAre />
        <BackedBy />
        <InvestorQuotes />
      </main>
      <SiteFooter />
    </>
  );
}
