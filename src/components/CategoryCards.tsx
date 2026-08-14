import Link from "next/link";

import { ChevronRightIcon } from "@/components/icons";
import { LottieAnimation } from "@/components/LottieAnimation";

const CARD_BODY_CLASS =
  "shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] p-6 pt-8 lg:p-12 rounded-[20px] bg-white";
const CARD_TITLE_CLASS =
  "leading-[115%]! font-poly-sans-wide text-[22px] md:text-[24px] lg:text-[40px] lg:tracking-[0.8px] mb-1";
const CARD_DESCRIPTION_CLASS = "text-[16px] font-normal leading-[1.33] lg:h-16";

interface Category {
  href: string;
  title: string;
  description: string;
  /**
   * TODO: placeholder art. The four animated category icons are still pending —
   * these currently point at the leftover Split Pay lotties so the layout has
   * something to size against. Swap the paths, not the markup.
   */
  lottieSrc: string;
}

const CATEGORIES: Category[] = [
  {
    href: "/hospitality",
    title: "Hospitality",
    description:
      "Restaurants, cafés, bars, and hospitality venues focused on food, drinks, and in-person experiences.",
    lottieSrc: "/lottie/product_rent.json",
  },
  {
    href: "/retail",
    title: "Retail",
    description:
      "Local boutiques, specialty shops, and stores where customers browse and buy in person.",
    lottieSrc: "/lottie/product_mortgage.json",
  },
  {
    href: "/services",
    title: "Services",
    description:
      "Everyday local services — from auto care and wellness to fitness, beauty, and professional help.",
    lottieSrc: "/lottie/product_carloan.json",
  },
  {
    href: "/digital",
    title: "Digital",
    description:
      "E-commerce, online events, digital products, and businesses that operate primarily online.",
    lottieSrc: "/lottie/product_rent.json",
  },
];

function CategoryCard({ href, title, description, lottieSrc }: Category) {
  return (
    <Link
      className="focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2 rounded-[20px] block"
      href={href}
    >
      <div className={CARD_BODY_CLASS}>
        <div className="h-26 lg:h-54 w-40 lg:w-54 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end">
          <div className="h-26 lg:h-46">
            <LottieAnimation
              src={lottieSrc}
              className="h-full w-full [&_svg]:h-full! [&_svg]:w-full!"
            />
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <p className={CARD_TITLE_CLASS}>{title}</p>
            <p className={CARD_DESCRIPTION_CLASS}>{description}</p>
          </div>
          <div className="w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center bg-orange-100 rounded-full shrink-0">
            <ChevronRightIcon width={12} height={12} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CategoryCards() {
  return (
    <section className="pt-32 md:pt-40 lg:pt-36 pb-14 lg:pb-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Built to Deliver{" "}
            <br className="md:hidden" />
            Steady Revenue
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px] max-w-3xl mx-auto">
            We focus on helping local businesses receive consistent revenue from
            real customers — new and returning — while supporting hospitality,
            retail, services, and digital businesses alike.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-14 lg:mt-20">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
