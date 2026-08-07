import Image from "next/image";
import type { ReactNode } from "react";

interface Step {
  alt: string;
  /** 296x418 crop, shown below `lg`. */
  mobileSrc: string;
  /** 432x611 crop, shown from `lg`. */
  desktopSrc: string;
  title: string;
  copy: ReactNode;
}

const steps: Step[] = [
  {
    alt: "app view: product selector",
    mobileSrc: "/images/slide-1.png",
    desktopSrc: "/images/slide-1-lg.png",
    title: "Pick your bill",
    copy: (
      <>
        Add your rent, mortgage, car payment,{" "}
        <br className="hidden md:block" />
        or other bills. Takes about 2 minutes.
      </>
    ),
  },
  {
    alt: "app view: split example",
    mobileSrc: "/images/slide-2.png",
    desktopSrc: "/images/slide-2-lg.png",
    title: "We split it",
    copy: (
      <>
        We look at your cash flow and set your split,{" "}
        <br className="hidden md:block" />
        anywhere from 30% to 50% of the bill.
      </>
    ),
  },
  {
    alt: "app view: schedule",
    mobileSrc: "/images/slide-3.png",
    desktopSrc: "/images/slide-3-lg.png",
    title: "Pay on your schedule",
    copy: (
      <>
        1st half when the bill is due.{" "}
        <br className="hidden md:block" />
        2nd half two weeks later.
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            One bill,{" "}
            <br className="md:hidden" />
            two payments
          </h2>
        </div>
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-0 lg:-ml-6 lg:-mr-6">
          {steps.map((step) => (
            <div key={step.title}>
              {/*
                Two separate crops, not one responsive image: the target ships
                differently framed art per breakpoint, so both stay in the DOM
                and CSS picks the one to show.
              */}
              <Image
                alt={step.alt}
                loading="lazy"
                width={296}
                height={418}
                className="block lg:hidden mx-auto mb-6 max-w-full"
                src={step.mobileSrc}
              />
              <Image
                alt={step.alt}
                loading="lazy"
                width={432}
                height={611}
                className="hidden lg:block mx-auto mb-8 max-w-full"
                src={step.desktopSrc}
              />
              <p className="font-medium text-[18px] md:text-[24px] text-center mb-2">
                {step.title}
              </p>
              <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
