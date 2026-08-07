import type { ReactNode } from "react";

import { SectionBadge } from "@/components/safety/SectionBadge";
import {
  BankIcon,
  BarsIcon,
  BellIcon,
  CashIcon,
  CircleXIcon,
  EyeOffIcon,
  GearIcon,
  GridDotsIcon,
  ShieldIcon,
  SignalIcon,
  UserCircleIcon,
} from "@/components/safety/icons";

interface SafetyPillarProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  body: ReactNode;
  features: { icon: ReactNode; label: string }[];
}

function SafetyPillar({ icon, title, subtitle, body, features }: SafetyPillarProps) {
  return (
    <div className="flex-1 flex flex-col rounded-4xl bg-white shadow-[0_8px_16px_0_rgba(0,0,0,0.05)] p-8 lg:p-10">
      {/* Icon sits beside the copy below lg, above it from lg up. */}
      <div className="flex items-center lg:block">
        <div className="flex lg:justify-center lg:mb-6">
          <div className="flex items-center justify-center rounded-full w-16 h-16 bg-gray-400">
            {icon}
          </div>
        </div>
        <div className="ml-4 lg:ml-0">
          <p className="font-medium lg:text-center text-[20px] md:text-[24px] leading-[130%]">
            {title}
          </p>
          <p className="font-normal lg:text-center text-[14px] md:text-[16px] leading-[130%] text-gray-600 mt-1">
            {subtitle}
          </p>
        </div>
      </div>
      <p className="font-normal lg:text-center flex-1 text-[16px] md:text-[18px] leading-[150%] mt-6">
        {body}
      </p>
      <div className="border-t border-gray-200 my-8" />
      {/* Fixed height from lg up keeps the three cards' rules aligned. */}
      <div className="flex flex-col shrink-0 lg:h-47 gap-5">
        {features.map((feature) => (
          <div key={feature.label} className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-200 shrink-0">
              {feature.icon}
            </div>
            <p className="font-medium text-[14px] md:text-[16px] leading-[140%]">
              {feature.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowWeKeepSafe() {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <SectionBadge label="How we keep things safe" />
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Three jobs. Done in the background.
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            Behind every Split Pay payment is a stack of encryption, monitoring,
            and partners doing the heavy lifting.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-14 lg:mt-20">
          <SafetyPillar
            icon={<CashIcon height={24} width={24} />}
            title="Your money"
            subtitle="Stays exactly where it belongs."
            body="When you connect a bank account, your credentials never touch our servers. Plaid handles that on its end. Every transfer is encrypted in transit and signed at every step. Funds settle through our regulated banking partners, not a workaround."
            features={[
              {
                icon: <GridDotsIcon height={14} width={14} />,
                label: "256-bit encryption in transit and at rest",
              },
              {
                icon: <CircleXIcon height={14} width={14} />,
                label: "Bank connections handled by Plaid, never stored as passwords",
              },
              {
                icon: <BankIcon height={14} width={14} />,
                label: "Regulated banking partners process every payment",
              },
            ]}
          />
          <SafetyPillar
            icon={<UserCircleIcon height={24} width={24} />}
            title="Your account"
            subtitle="No one gets in but you."
            body="Two-factor authentication is on by default. Logins are watched for unusual devices, locations, and patterns. If something looks off, we pause first and ask questions later. And if you spot something we missed, our support team is real humans, reachable fast."
            features={[
              {
                icon: <ShieldIcon height={14} width={14} />,
                label: "Two-factor authentication on every account",
              },
              {
                icon: <SignalIcon height={14} width={14} />,
                label: "Device and location monitoring",
              },
              {
                icon: <BellIcon height={14} width={14} />,
                label: "Real-time alerts for new sign-ins and large transactions",
              },
            ]}
          />
          <SafetyPillar
            icon={<BarsIcon height={24} width={24} />}
            title="Your data"
            subtitle="Stays yours. Always."
            body="We collect what`s needed to make payments work, and nothing else. Your data is encrypted at rest, encrypted in transit, and never sold. You can request a full copy of what we have, or ask us to delete it, anytime."
            features={[
              {
                icon: <EyeOffIcon height={14} width={14} />,
                label: "AES-256 encryption at rest, TLS in transit",
              },
              {
                icon: <CircleXIcon height={14} width={14} />,
                label: "We never sell your data",
              },
              {
                icon: <GearIcon height={14} width={14} />,
                label: "Request, export, or delete your data anytime",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
