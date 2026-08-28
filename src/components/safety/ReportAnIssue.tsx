"use client";

import { SectionBadge } from "@/components/safety/SectionBadge";
import { UserCircleIcon, ShieldUserIcon } from "@/components/safety/icons";
import { Button } from "@/components/ui/button";
import {
  CONTACT_SUPPORT_MESSAGE,
  REPORT_VULNERABILITY_MESSAGE,
  openIntercomMessage,
} from "@/lib/links";

/**
 * The two CTAs size to their label (`inline-flex w-auto`) rather than the
 * full card width the primary button defaults to.
 */
const CTA_CLASS = "inline-flex w-auto";

export function ReportAnIssue() {
  return (
    <section className="py-14 lg:py-24 ">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <SectionBadge label="Report an issue" />
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            See something? Say something.
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            We follow SOC 2 standards for security, availability, and
            confidentiality. We comply with CCPA and GDPR for member data rights.
            And we pay outside auditors, not just our own team, to find what we
            missed.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-14 lg:mt-20">
          <div className="flex flex-col items-center text-center rounded-4xl p-10 bg-white text-gray-400">
            <div className="flex items-center justify-center rounded-full w-16 h-16 mb-6 bg-gray-400">
              <UserCircleIcon height={24} width={24} />
            </div>
            <p className="font-normal text-[14px] md:text-[16px] mb-6 text-gray-600">
              For Members
            </p>
            <h3 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[40px] lg:text-[48px] leading-[110%] mb-6">
              See something off{" "}
              <br />
              in your account?
            </h3>
            <p className="font-normal text-[16px] md:text-[18px] leading-[150%] mb-10 max-w-md text-gray-600">
              Contact us through our app, or email us. We treat every report as
              urgent and respond within one business day.
            </p>
            <Button
              className={CTA_CLASS}
              onClick={() =>
                openIntercomMessage(
                  CONTACT_SUPPORT_MESSAGE,
                  "I need to contact Carrot support",
                )
              }
            >
              Contact support
            </Button>
          </div>
          <div className="flex flex-col items-center text-center rounded-4xl p-10 bg-gray-400 text-white">
            <div className="flex items-center justify-center rounded-full w-16 h-16 mb-6 bg-white">
              <ShieldUserIcon height={24} width={24} />
            </div>
            <p className="font-normal text-[14px] md:text-[16px] mb-6 text-white">
              For Security Researchers
            </p>
            <h3 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[40px] lg:text-[48px] leading-[110%] mb-6">
              Found a{" "}
              <br />
              vulnerability?
            </h3>
            <p className="font-normal text-[16px] md:text-[18px] leading-[150%] mb-10 max-w-md text-gray-300">
              We welcome responsible disclosure. We&#39;ll respond, fix, and
              credit your work.
            </p>
            <Button
              className={CTA_CLASS}
              onClick={() =>
                openIntercomMessage(
                  REPORT_VULNERABILITY_MESSAGE,
                  "I'd like to report a security vulnerability",
                )
              }
            >
              Report a vulnerability
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
