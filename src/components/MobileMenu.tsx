"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { CarrotLogo } from "@/components/carrot-logo";
import { ChevronRightIcon, CloseIcon } from "@/components/icons";
import Image from "next/image";
import { GetStartedButton } from "@/components/GetStartedButton";
import { Button, ButtonLink } from "@/components/ui/button";
import { MERCHANT_LOGIN_URL } from "@/lib/links";

interface MobileMenuProps {
  onClose: () => void;
}

interface CategoryCard {
  label: string;
  href: string;
  icon: string;
  /** Staggers the float across the row. */
  floatDelay: string;
  /** Fixed-height slot the illustration sits in; heights differ per card. */
  slotClassName: string;
  figureClassName: string;
}

const CATEGORY_CARDS: readonly CategoryCard[] = [
  {
    label: "Hospitality",
    href: "/hospitality",
    icon: "/images/categories/hospitality.png",
    floatDelay: "0s",
    slotClassName: "h-25 flex justify-center items-end",
    figureClassName: "h-25",
  },
  {
    label: "Retail",
    href: "/retail",
    icon: "/images/categories/retail.png",
    floatDelay: "0.6s",
    slotClassName: "h-25 flex justify-center items-end",
    figureClassName: "h-19",
  },
  {
    label: "Services",
    href: "/services",
    icon: "/images/categories/services.png",
    floatDelay: "1.2s",
    slotClassName: "h-25 mt-1 flex justify-center items-end",
    figureClassName: "h-19",
  },
  {
    label: "Digital",
    href: "/digital",
    icon: "/images/categories/digital.png",
    floatDelay: "1.8s",
    slotClassName: "h-25 flex justify-center items-end",
    figureClassName: "h-25",
  },
];

const LEARN_MORE_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Safety & security", href: "/safety-and-security" },
  { label: "Help & FAQs", href: "/help" },
] as const;

/**
 * Flat white card lifted by a real shadow. The previous treatment stacked a
 * top-light gradient, two inset hairlines, and a heavy drop shadow to fake
 * extrusion on black — none of that reads on a white surface, where the shadow
 * alone carries the elevation.
 */
const CARD_CLASS =
  "relative h-54 md:h-58 lg:h-full rounded-3xl px-4 bg-white border border-black/5 shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] cursor-pointer flex flex-col justify-center transition duration-200 ease-in-out hover:shadow-[0_12px_32px_0_rgba(0,0,0,0.12)] active:scale-[0.99] active:translate-y-px focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2";

const CARD_LABEL_CLASS =
  "font-medium tracking-[-0.56px] text-[18px] text-center";

const LEARN_MORE_LINK_CLASS =
  "relative block h-12 overflow-hidden rounded-full bg-white border border-black/5 px-5 flex items-center justify-between shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] transition duration-200 ease-in-out hover:shadow-[0_8px_20px_0_rgba(0,0,0,0.10)] active:scale-[0.99] active:translate-y-px focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2";

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
    // Animating the fixed panel itself is safe — the containing-block problem
    // only applies to transforms on an *ancestor* of a fixed element.
    <motion.div
      id="public-header-menu"
      className="fixed inset-0 z-30 bg-white flex flex-col"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full">
        <div className="mx-auto px-6 flex justify-between items-center h-16.5 md:h-28">
          <Link
            aria-label="Carrot home"
            href="/"
            onClick={onClose}
            className="block rounded mr-2 w-16 md:w-20 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2"
          >
            <CarrotLogo className="w-full h-auto" />
          </Link>
          <div className="flex items-center justify-end gap-4 flex-1">
            <GetStartedButton
              variant="dark"
              size="default"
              className="max-w-45 hidden lg:inline-flex"
            />
            <ButtonLink
              href={MERCHANT_LOGIN_URL}
              variant="dark"
              size="compact"
              className="max-w-20 md:max-w-30 whitespace-nowrap"
            >
              Sign In
            </ButtonLink>
            <Button
              variant="dark"
              size="icon"
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
            <p className="text-[16px] leading-[1.33] font-medium md:text-[24px] mb-6 md:mb-8">
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
                    <Image
                      src={card.icon}
                      alt=""
                      width={512}
                      height={512}
                      className={`${card.figureClassName} w-auto object-contain animate-icon-float`}
                      style={{ animationDelay: card.floatDelay }}
                    />
                  </div>
                  <div className="mt-4 h-12">
                    <p className={CARD_LABEL_CLASS}>{card.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 md:mt-14 lg:mt-0 lg:w-79.5">
            <p className="text-[16px] leading-[1.33] font-medium md:text-[24px] mb-6 md:mb-8 lg:hidden">
              Learn More
            </p>
            <p className="font-medium hidden lg:block lg:bg-block text-[24px] mb-8">
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
                    <p className="text-[16px] font-normal leading-[1.33]">
                      {link.label}
                    </p>
                  </div>
                  {/* The shared icon hard-codes a white stroke; on a white row it needs black. */}
                  <ChevronRightIcon className="[&_path]:stroke-black" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
