import Image from "next/image";

interface InvestorQuote {
  name: string;
  firm: string;
  photo: string;
  quote: string;
}

const QUOTES: readonly InvestorQuote[] = [
  {
    name: "Vinod Khosla",
    firm: "Khosla Ventures",
    photo: "/images/about-us/VinodKhosla.png",
    quote:
      "Split Pay is turning a large, unavoidable monthly expense into a financial health tool.",
  },
  {
    name: "Packy McCormick",
    firm: "Not Boring",
    photo: "/images/about-us/PackyMcCormick.png",
    quote:
      "This is the right product at the right time. The team is thinking big about the housing problem in America.",
  },
  {
    name: "Sam Lessin",
    firm: "Slow Ventures",
    photo: "/images/about-us/SamLessin.png",
    quote:
      "The dual-sided approach caught my attention: less friction for landlords, a path to homeownership for renters.",
  },
  {
    name: "Vince Hankes",
    firm: "Thrive Capital",
    photo: "/images/about-us/VinceHankes.png",
    quote:
      "The team has an incredible track record building exceptional consumer finance products.",
  },
];

export function InvestorQuotes() {
  return (
    <section className="pt-6 pb-14 lg:pb-24 bg-gray-100">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {QUOTES.map((investor) => (
            <div
              key={investor.name}
              className="bg-white rounded-3xl lg:rounded-4xl shadow-[0_8px_16px_0_rgba(0,0,0,0.05)] p-8 md:p-10 lg:p-12 flex flex-col"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={investor.photo}
                  alt={investor.name}
                  width={72}
                  height={72}
                  className="w-18 h-18 rounded-full object-cover"
                />
                <p className="mt-2 font-medium text-[18px] lg:text-[24px]">
                  {investor.name}
                </p>
                <p className="font-normal text-[16px] lg:text-[18px] text-gray-600">
                  {investor.firm}
                </p>
              </div>
              <p className="tracking-[-0.56px] mt-6 lg:mt-8 text-center text-[24px] md:text-[32px] lg:text-[40px] leading-[130%] font-medium">
                {investor.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
