import Link from "next/link";

import { CategoryIcon, type CategoryId } from "@/components/CategoryIcon";
import { ChevronRightIcon, ClockIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const CARD_BODY_CLASS =
  "group/cat shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] p-6 pt-8 lg:p-12 rounded-[20px] bg-white";
const CARD_TITLE_CLASS =
  "leading-[115%]! font-poly-sans-wide text-[22px] md:text-[24px] lg:text-[40px] lg:tracking-[0.8px] mb-1";
const CARD_DESCRIPTION_CLASS = "text-[16px] font-normal leading-[1.33] lg:h-16";

interface Category {
  href?: string;
  title: string;
  description: string;
  icon: CategoryId;
  /**
   * Staggers the float so a row of four doesn't rise and fall as one block.
   */
  floatDelay: string;
  comingSoon?: boolean;
}

const CATEGORIES: Category[] = [
  {
    href: "/hospitality",
    title: "Hospitality",
    description:
      "Restaurants, cafés, bars, and hospitality venues focused on food, drinks, and in-person experiences.",
    icon: "hospitality" as const,
    floatDelay: "0s",
  },
  {
    href: "/retail",
    title: "Retail",
    description:
      "Local boutiques, specialty shops, and stores where customers browse and buy in person.",
    icon: "retail" as const,
    floatDelay: "0.6s",
  },
  {
    href: "/services",
    title: "Services",
    description:
      "Everyday local services — from auto care and wellness to fitness, beauty, and professional help.",
    icon: "services" as const,
    floatDelay: "1.2s",
  },
  {
    title: "Digital",
    description:
      "E-commerce, online events, digital products, and businesses that operate primarily online.",
    icon: "digital" as const,
    floatDelay: "1.8s",
    comingSoon: true,
  },
];

function CategoryCard({
  href,
  title,
  description,
  icon,
  floatDelay,
  comingSoon,
}: Category) {
  const card = (
    <div className={CARD_BODY_CLASS}>
      <div className="mx-auto mb-6 flex h-26 w-40 items-center justify-center lg:mb-12 lg:h-54 lg:w-54">
        <CategoryIcon id={icon} delay={floatDelay} />
      </div>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <p className={CARD_TITLE_CLASS}>{title}</p>
          <p className={CARD_DESCRIPTION_CLASS}>{description}</p>
        </div>
        {comingSoon ? (
          <>
            <div className="bg-gray-200 h-12 rounded-3xl px-4 items-center hidden lg:flex shrink-0">
              <p className="text-[16px] font-normal leading-[1.33] text-gray-600">
                Coming soon
              </p>
            </div>
            <div className="w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center bg-gray-200 rounded-full lg:hidden shrink-0">
              <ClockIcon width={14} height={14} />
            </div>
          </>
        ) : (
          <div className="w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center bg-pink rounded-full shrink-0">
            <ChevronRightIcon width={12} height={12} />
          </div>
        )}
      </div>
    </div>
  );

  if (comingSoon || !href) {
    return card;
  }

  return (
    <Link
      className="group/cat focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2 rounded-[20px] block"
      href={href}
    >
      {card}
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
            <Reveal key={category.title} delay={index * 0.08}>
              <CategoryCard {...category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
