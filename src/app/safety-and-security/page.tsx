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
import { MAIN_ID, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Safety & Security - Carrot",
  description:
    "Your money, your account, and your data — protected by layers you never have to think about.",
  path: "/safety-and-security",
});

/**
 * As on the homepage, `<main>` carries no padding of its own — the hero's
 * `pt-18 md:pt-28` is what clears the fixed header.
 */
export default function SafetyAndSecurityPage() {
  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <SafetyHero />
        <HowWeKeepSafe />
        <OurPromise />
        <YourPart />
        <OurPartners />
        <SecurityAudits />
        <ReportAnIssue />
        <AutopilotCta
          title="Steady revenue, on autopilot"
          description="Turn your offer on and get back to running your business. Carrot finds the customers, verifies the purchases, and settles up every Friday."
          backgroundSrc="/images/safety-and-security/cta-bg.jpg"
        />
      </main>
      <SiteFooter />
    </>
  );
}
