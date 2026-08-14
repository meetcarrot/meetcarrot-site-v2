import Image from "next/image";

import { SectionBadge } from "@/components/safety/SectionBadge";

/** Every partner lockup ships as a 299×112 SVG on the same artboard. */
const LOGO_WIDTH = 299;
const LOGO_HEIGHT = 112;

const PARTNERS = [
  {
    alt: "Plaid",
    src: "/images/safety-and-security/plaid.svg",
    body: "Securely connects your bank account without storing your credentials.",
  },
  {
    // TODO: placeholder type-set lockup — swap for Stripe's official SVG.
    alt: "Stripe",
    src: "/images/brands/stripe.svg",
    body: "Processes every payment on infrastructure trusted by millions of businesses.",
  },
  {
    alt: "Drata",
    src: "/images/brands/drata.svg",
    body: "Continuously monitors our security controls, so we stay audit-ready every day.",
  },
];

export function OurPartners() {
  return (
    <section
      className="py-14 lg:py-24 bg-[linear-gradient(180deg,#000_0%,#0F0F0F_100%)]"
      data-header-theme="black"
    >
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <SectionBadge label="Our partners" />
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center text-white">
            The best in the business.{" "}
            <br className="hidden md:block" />
            Behind the scenes.
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px] text-[#D0CFCE]">
            We don&#39;t build security from scratch. We partner with the
            companies trusted by the largest banks, fintech, and most regulated
            industries in the country.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14 lg:mt-20">
          {PARTNERS.map((partner) => (
            <div
              key={partner.alt}
              className="flex flex-col items-center text-center rounded-4xl p-8 lg:p-10 border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_100%)] filter-[drop-shadow(0_12px_24px_rgba(0,0,0,0.10))]"
            >
              <div className="flex items-center justify-center w-full mb-4">
                {/* Static SVG: unoptimized because Next won't run SVG through the image optimizer. */}
                <Image
                  alt={partner.alt}
                  className="h-full w-full"
                  src={partner.src}
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  unoptimized
                />
              </div>
              <p className="font-normal text-gray-300 text-[16px] md:text-[18px] leading-[140%]">
                {partner.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
