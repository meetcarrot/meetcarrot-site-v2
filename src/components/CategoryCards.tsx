import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const CARD_BODY_CLASS =
  "shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] p-6 pt-8 lg:p-12 rounded-[20px] bg-white";
const CARD_TITLE_CLASS =
  "leading-[115%]! font-poly-sans-wide text-[22px] md:text-[24px] lg:text-[40px] lg:tracking-[0.8px] mb-1";
const CARD_DESCRIPTION_CLASS = "text-[16px] font-normal leading-[1.33] lg:h-16";

interface Category {
  href: string;
  title: string;
  description: string;
  icon: string;
  /**
   * Staggers the float so a row of four doesn't rise and fall as one block.
   */
  floatDelay: string;
}

const CATEGORIES: Category[] = [
  {
    href: "/hospitality",
    title: "Hospitality",
    description:
      "Restaurants, cafés, bars, and hospitality venues focused on food, drinks, and in-person experiences.",
    icon: "/images/categories/hospitality-iso.png",
    floatDelay: "0s",
  },
  {
    href: "/retail",
    title: "Retail",
    description:
      "Local boutiques, specialty shops, and stores where customers browse and buy in person.",
    icon: "/images/categories/retail-iso.png",
    floatDelay: "0.6s",
  },
  {
    href: "/services",
    title: "Services",
    description:
      "Everyday local services — from auto care and wellness to fitness, beauty, and professional help.",
    icon: "/images/categories/services-iso.png",
    floatDelay: "1.2s",
  },
  {
    href: "/digital",
    title: "Digital",
    description:
      "E-commerce, online events, digital products, and businesses that operate primarily online.",
    icon: "/images/categories/digital-iso.png",
    floatDelay: "1.8s",
  },
];

function CategoryCard({ href, title, description, icon, floatDelay }: Category) {
  return (
    <Link
      className="group focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2 rounded-[20px] block"
      href={href}
    >
      <div className={CARD_BODY_CLASS}>
        <div className="h-26 lg:h-54 w-40 lg:w-54 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end">
          {/*
            Two layers of motion, deliberately separated: the idle float lives on
            the outer element and the hover lift on the inner one, so hovering
            does not fight or restart the drift — they compose.

            An isometric object reads as sitting on a surface, so the hover is a
            lift off it: rise, a touch of scale, and a contact shadow that
            spreads and softens the way a real one does as the object rises.
          */}
          <div
            className="h-26 lg:h-46 animate-icon-float"
            style={{ animationDelay: floatDelay }}
          >
            <Image
              src={icon}
              alt=""
              width={512}
              height={512}
              className="h-full w-auto object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.06] drop-shadow-[0_6px_10px_rgba(0,0,0,0.10)] group-hover:drop-shadow-[0_18px_22px_rgba(0,0,0,0.14)]"
            />
          </div>
        </div>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <p className={CARD_TITLE_CLASS}>{title}</p>
            <p className={CARD_DESCRIPTION_CLASS}>{description}</p>
          </div>
          <div className="w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center bg-pink rounded-full shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1">
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
          {CATEGORIES.map((category, index) => (
            // Short stagger so the row resolves in sequence rather than as one
            // block. Kept under a tenth of a second each — any longer and the
            // last card feels late rather than deliberate.
            <Reveal key={category.href} delay={index * 0.08}>
              <CategoryCard {...category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
