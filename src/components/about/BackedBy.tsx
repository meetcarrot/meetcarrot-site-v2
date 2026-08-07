import Image from "next/image";

interface Investor {
  /** Casing is the target's own — some labels are lower-cased, some are not. */
  label: string;
  logo: string;
  width: number;
  height: number;
  /** Per-logo column span; the last one also spans both mobile columns. */
  className: string;
}

const INVESTORS: readonly Investor[] = [
  {
    label: "Thrive Capital",
    logo: "/images/about-us/thriveCapital.svg",
    width: 155,
    height: 20,
    className: "lg:col-span-3",
  },
  {
    label: "Slow Ventures",
    logo: "/images/about-us/slowVentures.svg",
    width: 195,
    height: 22,
    className: "lg:col-span-3",
  },
  {
    label: "SciFi VC",
    logo: "/images/about-us/scifiVC.svg",
    width: 95,
    height: 22,
    className: "lg:col-span-3",
  },
  {
    label: "khosla ventures",
    logo: "/images/brands/khoslaVentures.svg",
    width: 200,
    height: 23,
    className: "lg:col-span-3",
  },
  {
    label: "alpaca",
    logo: "/images/brands/alpacaVC.svg",
    width: 99,
    height: 27,
    className: "lg:col-span-4",
  },
  {
    label: "metaprop",
    logo: "/images/brands/metaprop.svg",
    width: 173,
    height: 31,
    className: "lg:col-span-4",
  },
  {
    label: "not boring",
    logo: "/images/about-us/notBoring.svg",
    width: 156,
    height: 32,
    className: "col-span-2 lg:col-span-4",
  },
];

export function BackedBy() {
  return (
    <section className="py-14 lg:py-24 bg-gray-100">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Backed by
          </h2>
        </div>
        <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 items-center justify-items-center">
          {INVESTORS.map((investor) => (
            <div
              key={investor.label}
              aria-label={investor.label}
              className={`flex items-center justify-center h-8 lg:h-10 ${investor.className}`}
              role="img"
            >
              {/* unoptimized: Next refuses to run SVG through the image optimizer. */}
              <Image
                src={investor.logo}
                alt={investor.label}
                width={investor.width}
                height={investor.height}
                unoptimized
                className="max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
