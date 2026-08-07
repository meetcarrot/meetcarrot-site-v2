import Image from "next/image";
import type { ReactNode } from "react";

interface Step {
  /** Badge label rendered above the illustration. */
  label: string;
  src: string;
  alt: string;
  /** Intrinsic SVG dimensions — needed by next/image, not a rendered size. */
  width: number;
  height: number;
  body: ReactNode;
}

const STEPS: Step[] = [
  {
    label: "Step 1",
    src: "/images/how-it-works/deco-1.svg",
    alt: "choose product",
    width: 286,
    height: 218,
    body: (
      <>
        Choose a bill to split. It can be your rent,
        <br className="hidden md:block" /> mortgage, or car payment.
      </>
    ),
  },
  {
    label: "Step 2",
    src: "/images/how-it-works/deco-2.svg",
    alt: "check eligibility",
    width: 253,
    height: 248,
    body: (
      <>
        We&rsquo;ll check your eligibility by reviewing your income, spending,
        and savings.
      </>
    ),
  },
  {
    label: "Step 3",
    src: "/images/how-it-works/deco-3.svg",
    alt: "verify identity",
    width: 275,
    height: 208,
    body: (
      <>
        We&rsquo;ll also verify your identity to keep
        <br className="hidden md:block" /> everything secure.
      </>
    ),
  },
  {
    label: "Step 4",
    src: "/images/how-it-works/deco-4.svg",
    alt: "payment portal",
    width: 308,
    height: 217,
    body: (
      <>
        Once approved, you&rsquo;ll get Split Pay account and routing numbers
        that can be added to your payment portal like a bank account.
      </>
    ),
  },
  {
    label: "Step 5",
    src: "/images/how-it-works/deco-5.svg",
    alt: "split your bill",
    width: 253,
    height: 178,
    body: (
      <>
        After adding your Split Pay account numbers to your payment portal,
        you&rsquo;re ready to split your bill.
      </>
    ),
  },
];

export function StepsSection() {
  return (
    <section
      className="bg-golden pb-14 lg:pb-24 pt-30 lg:pt-50"
      data-header-theme="golden"
    >
      <div className="mx-auto px-6 container lg:max-w-324">
        <h1 className="text-[40px] leading-[115%]! font-poly-sans-wide text-center md:text-[56px] lg:text-[64px]">
          How Split Pay works
        </h1>
        <div className="mt-10 md:mt-20 grid grid-cols-1 gap-6 md:gap-10 max-w-167 mx-auto">
          {STEPS.map((step) => (
            <div
              key={step.label}
              className="shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] px-6 md:px-10 py-10 border border-black/15 rounded-3xl flex flex-col gap-6"
            >
              <div className="w-full flex justify-center">
                <p className="px-4 border border-black/15 h-9 flex items-center rounded-full font-medium text-[14px] md:text-[16px]">
                  {step.label}
                </p>
              </div>
              <div className="illustration-component flex items-center justify-center h-42 md:h-63 w-full">
                {/*
                  Static SVG: unoptimized because Next refuses to run SVG through
                  the image optimizer. `max-h-full w-auto` reproduces the target's
                  `.illustration-component` contain behaviour so tall illustrations
                  scale down inside the fixed-height frame instead of overflowing.
                */}
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={step.width}
                  height={step.height}
                  className="max-h-full w-auto object-contain"
                  unoptimized
                />
              </div>
              <p className="font-normal text-center text-[18px] md:text-[24px] w-full">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
