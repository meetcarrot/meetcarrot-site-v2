import type { ReactNode } from "react";

import { SectionBadge } from "@/components/safety/SectionBadge";
import {
  BellIcon,
  GridDotsIcon,
  KeypadLockIcon,
  ShieldIcon,
} from "@/components/safety/icons";

const HABITS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <ShieldIcon height={24} width={24} fill="var(--color-white)" />,
    title: "Turn on two-factor",
    body: "It`s already required. Make sure your recovery method is current.",
  },
  {
    icon: <GridDotsIcon height={24} width={24} fill="var(--color-white)" />,
    title: "Use an unique password",
    body: "A password manager makes this effortless. Reused passwords are how most accounts get taken over.",
  },
  {
    icon: <BellIcon height={24} width={24} fill="var(--color-white)" />,
    title: "Watch your alerts",
    body: "We send a notification for every sign-in and cashback payout. If one looks unfamiliar, tap it and let us know.",
  },
  {
    icon: <KeypadLockIcon height={24} width={24} />,
    title: "Never share a code",
    body: "No one at Carrot will ever ask for your one-time code. If someone does, they`re not us.",
  },
];

export function YourPart() {
  return (
    <section className="py-14 lg:py-24 ">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <SectionBadge label="Your part" />
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Small steps.{" "}
            <br className="lg:hidden" />
            Strong defense.
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            Most fraud doesn&#39;t break in. It walks in. A few quick habits make
            sure that never happens to you.
          </p>
        </div>
        {/* `lg:gap86` is a typo in the target's markup — no-op class, kept verbatim. */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap86 mt-14 lg:mt-20">
          {HABITS.map((habit) => (
            <div
              key={habit.title}
              className="rounded-4xl p-7 lg:p-10 bg-white shadow-[0_8px_16px_0_rgba(0,0,0,0.05)]"
            >
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="flex items-center justify-center rounded-full w-16 h-16 bg-gray-400">
                  {habit.icon}
                </div>
              </div>
              <p className="font-medium text-center text-[18px] md:text-[24px] mb-4 leading-[130%]">
                {habit.title}
              </p>
              <p className="font-normal text-center text-[16px] md:text-[18px] leading-[130%]">
                {habit.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
