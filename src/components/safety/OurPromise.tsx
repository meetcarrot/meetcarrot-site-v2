import { SectionBadge } from "@/components/safety/SectionBadge";

const PROMISES = [
  "We will never sell your personal data. Not now. Not ever.",
  "We will never ask for your password by phone, email, or text.",
  "We will never store your passwords in plain text.",
  "We will never share your transaction history outside Carrot without your explicit permission.",
];

export function OurPromise() {
  return (
    <section
      className="py-14 lg:py-24 bg-[linear-gradient(180deg,#000_0%,#0F0F0F_100%)]"
      data-header-theme="black"
    >
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <SectionBadge label="Our promise" />
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center text-white">
            A list of things{" "}
            <br className="lg:hidden" />
            we’ll never do
          </h2>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 mt-14 lg:mt-20">
          {PROMISES.map((promise, index) => (
            <div
              key={promise}
              className="flex items-center flex-col text-center sm:text-left sm:flex-row gap-6 lg:gap-12 rounded-4xl p-6 lg:p-10 border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_100%)]"
            >
              <div className="flex items-center justify-center shrink-0 rounded-full w-16 h-16 lg:w-26 lg:h-26 bg-[rgba(255,255,255,0.06)] border border-white/10 filter-[drop-shadow(0_12px_24px_rgba(0,0,0,0.50))]">
                <p className="leading-[115%]! font-poly-sans-wide text-white text-[24px] lg:text-[40px] leading-none">
                  {index + 1}
                </p>
              </div>
              <p className="font-normal text-white text-[18px] md:text-[24px] lg:text-[28px] leading-[140%]">
                {promise}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
