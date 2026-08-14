import type { Metadata } from "next";

import { HowWeKeepSafe } from "@/components/safety/HowWeKeepSafe";
import { OurPartners } from "@/components/safety/OurPartners";
import { OurPromise } from "@/components/safety/OurPromise";
import { ReportAnIssue } from "@/components/safety/ReportAnIssue";
import { SafetyFinalCta } from "@/components/safety/SafetyFinalCta";
import { SafetyHero } from "@/components/safety/SafetyHero";
import { SecurityAudits } from "@/components/safety/SecurityAudits";
import { YourPart } from "@/components/safety/YourPart";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const TITLE = "Safety & Security - Carrot";
const DESCRIPTION =
  "Your money, your account, and your data — protected by layers you never have to think about.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://meetcarrot.xyz/safety-and-security",
    siteName: "Carrot",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
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
        <SafetyFinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
