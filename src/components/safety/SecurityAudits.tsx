import type { ReactNode } from "react";

import { SectionBadge } from "@/components/safety/SectionBadge";
import {
  CircleCheckIcon,
  GlassesIcon,
  ShieldSearchIcon,
} from "@/components/safety/icons";

const CREDENTIALS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <CircleCheckIcon height={24} width={24} />,
    title: "SOC 2",
    body: "Independently audited security controls.",
  },
  {
    icon: <GlassesIcon height={24} width={24} />,
    title: "CCPA / GDPR",
    body: "Member data rights, respected by default.",
  },
  {
    icon: <ShieldSearchIcon height={24} width={24} />,
    title: "Annual Security Testing",
    body: "Independent security experts test our systems annually.",
  },
];

export function SecurityAudits() {
  return (
    <section className="py-14 lg:py-24 ">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <SectionBadge label="Security audits" />
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Independently checked.{" "}
            <br className="hidden md:block" />
            Regularly tested.
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            We follow SOC 2 standards for security, availability, and
            confidentiality. We comply with CCPA and GDPR for member data rights.
            And we pay outside auditors, not just our own team, to find what we
            missed.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-14 lg:mt-20">
          {CREDENTIALS.map((credential) => (
            <div
              key={credential.title}
              className="rounded-4xl p-7 lg:p-10 bg-white shadow-[0_8px_16px_0_rgba(0,0,0,0.05)]"
            >
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="flex items-center justify-center rounded-full w-16 h-16 bg-gray-400">
                  {credential.icon}
                </div>
              </div>
              <p className="font-medium text-center text-[18px] md:text-[24px] mb-4 leading-[130%]">
                {credential.title}
              </p>
              <p className="font-normal text-center text-[16px] md:text-[18px] leading-[130%]">
                {credential.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
