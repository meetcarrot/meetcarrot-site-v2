import type { Metadata } from "next";

import { HowWeKeepSafe } from "@/components/safety/HowWeKeepSafe";
import { OurPartners } from "@/components/safety/OurPartners";
import { OurPromise } from "@/components/safety/OurPromise";
import { ReportAnIssue } from "@/components/safety/ReportAnIssue";
import { AutopilotCta } from "@/components/AutopilotCta";
import { SafetyHero } from "@/components/safety/SafetyHero";
import { SecurityAudits } from "@/components/safety/SecurityAudits";
import { YourPart } from "@/components/safety/YourPart";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";

const TITLE = "Safety & Security - Carrot";
const DESCRIPTION =
  "Your money, your account, and your data — protected by layers you never have to think about.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: `${SITE_URL}/safety-and-security`,
    siteName: "Carrot",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: { canonical: "/safety-and-security" },
};

/**
 * As on the homepage, `<main>` carries no padding of its own — the hero's
 * `pt-18 md:pt-28` is what clears the fixed header.
 */
export default function SafetyAndSecurityPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <SafetyHero />
        <HowWeKeepSafe />
        <OurPromise />
        <YourPart />
        <OurPartners />
        <SecurityAudits />
        <ReportAnIssue />
        <AutopilotCta backgroundSrc="/images/safety-and-security/cta-bg.jpg" />
      </main>
      <SiteFooter />
    </>
  );
}
