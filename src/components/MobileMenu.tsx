"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ChevronRightIcon, CloseIcon, SplitPayLogo } from "@/components/icons";
import { LottieAnimation } from "@/components/LottieAnimation";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  onClose: () => void;
}

interface CategoryCard {
  label: string;
  href: string;
  lottie: string;
  /** Fixed-height slot the illustration sits in; heights differ per card. */
  slotClassName: string;
  figureClassName: string;
}

// TODO: placeholder art — the four animated category icons are still pending,
// so these reuse the leftover dark lotties. Only `lottie` needs swapping.
const CATEGORY_CARDS: readonly CategoryCard[] = [
  {
    label: "Hospitality",
    href: "/hospitality",
    lottie: "/lottie/product_rent_dark.json",
    slotClassName: "h-25 flex justify-center items-end",
    figureClassName: "h-25",
  },
  {
    label: "Retail",
    href: "/retail",
    lottie: "/lottie/product_mortgage_dark.json",
    slotClassName: "h-25 flex justify-center items-end",
    figureClassName: "h-19",
  },
  {
    label: "Services",
    href: "/services",
    lottie: "/lottie/product_carloan_dark.json",
    slotClassName: "h-25 mt-1 flex justify-center items-end",
    figureClassName: "h-19",
  },
  {
    label: "Digital",
    href: "/digital",
    lottie: "/lottie/product_rent_dark.json",
    slotClassName: "h-25 flex justify-center items-end",
    figureClassName: "h-25",
  },
];

const LEARN_MORE_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Safety & security", href: "/safety-and-security" },
  { label: "Help & FAQs", href: "/help" },
] as const;

const CARD_CLASS =
  "relative h-54 md:h-58 lg:h-full rounded-3xl px-4 bg-linear-to-b from-white/10 to-transparent shadow-[0_12px_24px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.45)] before:bg-linear-to-b before:from-white before:to-transparent before:opacity-10 bg-black cursor-pointer flex flex-col justify-center transition-[filter] duration-200 ease-out hover:brightness-90 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";


const CARD_LABEL_CLASS =
  "font-medium tracking-[-0.56px] text-white text-[18px] text-center";

const LEARN_MORE_LINK_CLASS =
  "relative block h-12 overflow-hidden rounded-full bg-black/50 px-5 flex items-center justify-between shadow-[0_12px_24px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.45)] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-linear-to-b before:from-white before:to-transparent before:opacity-10 transition-[filter] duration-200 ease-out hover:brightness-90 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";

export function MobileMenu({ onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div id="public-header-menu" className="fixed inset-0 z-30 bg-black flex flex-col">
      <div className="w-full">
        <div className="mx-auto px-6 flex justify-between items-center h-16.5 md:h-28">
          <Link
            aria-label="Carrot home"
            href="/"
            onClick={onClose}
            className="block rounded mr-2 w-38 md:w-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2"
          >
            <SplitPayLogo idPrefix="menu-logo" className="transition-colors duration-200 w-full text-white" />
          </Link>
          <div className="flex items-center justify-end gap-4 flex-1">
            <Button
              variant="light"
              size="default"
              className="max-w-45 hidden lg:flex items-center justify-center"
            >
              Get started
            </Button>
            <Button
              variant="light"
              size="compact"
              className="max-w-20 md:max-w-30 whitespace-nowrap items-center justify-center"
            >
              Sign In
            </Button>
            <Button
              variant="light"
              size="icon"
              className="text-gray-400"
              aria-label="Close menu"
              aria-controls="public-header-menu"
              aria-expanded
              onClick={onClose}
            >
              <span className="flex items-center justify-center transition-transform duration-200 ease-out rotate-90">
                <CloseIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>

      <nav
        aria-label="Menu"
        className="mx-auto px-6 container lg:max-w-324 min-h-0 flex-1 overflow-y-auto"
      >
        <div className="py-6 md:py-14 lg:flex lg:gap-14">
          <div className="lg:flex-1 lg:flex lg:flex-col">
            <p className="text-[16px] leading-[1.33] font-medium text-white md:text-[24px] mb-6 md:mb-8">
              What kind of business do you run?
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:flex-1">
              {CATEGORY_CARDS.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  onClick={onClose}
                  className={CARD_CLASS}
                >
                  <div className={card.slotClassName}>
                    <LottieAnimation src={card.lottie} className={card.figureClassName} />
                  </div>
                  <div className="mt-4 h-12">
                    <p className={CARD_LABEL_CLASS}>{card.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 md:mt-14 lg:mt-0 lg:w-79.5">
            <p className="text-[16px] leading-[1.33] font-medium text-white md:text-[24px] mb-6 md:mb-8 lg:hidden">
              Learn More
            </p>
            <p className="font-medium text-white hidden lg:block lg:bg-block text-[24px] mb-8">
              Learn More
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
              {LEARN_MORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={LEARN_MORE_LINK_CLASS}
                >
                  <div className="flex items-center gap-2.5">
                    <p className="text-[16px] font-normal leading-[1.33] text-white">
                      {link.label}
                    </p>
                  </div>
                  {/* The shared icon hard-codes a white stroke; the menu rows use gray-600. */}
                  <ChevronRightIcon className="[&_path]:stroke-gray-600" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
