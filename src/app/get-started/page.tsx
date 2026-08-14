import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { IntakeForm } from "./IntakeForm";

export const metadata: Metadata = {
  title: "Get Started - Carrot",
  description:
    "Tell us about your business and we'll get your cashback offer set up. No upfront cost, no monthly fee.",
};

const DEMO_URL = "https://calendly.com/meetcarrot/demo";

const STEPS = [
  {
    title: "Set your terms",
    copy: "Choose your cashback rate, your limits, and a monthly cap. Change them whenever you want.",
  },
  {
    title: "We promote it",
    copy: "Carrot targets the right customers nearby and sends dynamic offers in real time.",
  },
  {
    title: "You earn steady revenue",
    copy: "Consistent revenue from real purchases — and you only pay when it works.",
  },
];

// Content routes have no hero, so <main> supplies the padding that clears the
// fixed header (h-16.5 mobile / h-28 desktop).
export default function GetStartedPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-28 md:pt-40 pb-24">
        <div className="mx-auto px-6 container lg:max-w-256">
          <header className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-poly-sans-wide text-[40px] md:text-[48px] lg:text-[56px] leading-[1.15]!">
              Get Started
            </h1>
            <p className="text-[16px] leading-[1.33] lg:text-[18px] max-w-2xl">
              Tell us about your business and we&rsquo;ll get your offer set up.
              No upfront cost, no monthly fee — you pay for revenue, not clicks.
            </p>
          </header>

          <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="bg-white rounded-[20px] lg:rounded-4xl p-6 lg:p-8 shadow-[0_2px_6px_0_rgba(0,0,0,0.06)]"
              >
                <div className="size-10 rounded-full bg-orange-100 text-white flex items-center justify-center font-semibold text-[16px] mb-4">
                  {index + 1}
                </div>
                <p className="font-medium text-[18px] md:text-[20px] mb-2">
                  {step.title}
                </p>
                <p className="text-[16px] font-normal leading-[1.33]">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 lg:mt-20">
            <IntakeForm />
          </div>

          <p className="mt-8 text-center text-[16px] leading-[1.33] text-gray-600">
            Would rather talk it through first?{" "}
            <a
              className="text-orange-100 underline"
              href={DEMO_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Book a demo
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
