"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { GetStartedButton } from "@/components/GetStartedButton";

/**
 * Circle-check bullet used by the trust badges. Local to this file because the
 * shared icon set ships a different (chevron-style) check.
 */
function BadgeCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        clipRule="evenodd"
        d="M12 0C15.7192 0 18.7502 1.04894 20.8506 3.14941C22.9511 5.24988 24 8.28084 24 12C24 15.7192 22.9511 18.7502 20.8506 20.8506C18.7502 22.9511 15.7192 24 12 24C8.28084 24 5.24988 22.9511 3.14941 20.8506C1.04894 18.7502 0 15.7192 0 12C0 8.28082 1.04894 5.24988 3.14941 3.14941C5.24988 1.04894 8.28082 0 12 0ZM17.6582 7.24707C17.2426 6.88371 16.6107 6.92628 16.2471 7.3418L9.95117 14.5371L7.70703 12.293C7.31651 11.9024 6.68349 11.9025 6.29297 12.293C5.90246 12.6835 5.90245 13.3165 6.29297 13.707L9.29297 16.707C9.48866 16.9027 9.75661 17.0082 10.0332 16.999C10.3098 16.9898 10.5707 16.8665 10.7529 16.6582L17.7529 8.6582C18.1163 8.24256 18.0737 7.61065 17.6582 7.24707Z"
        fill="var(--color-black)"
        fillRule="evenodd"
      />
    </svg>
  );
}

/** Half-filled clock face — the 1st payment marker. */
function FirstPaymentIcon() {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20.4853 3.51481C18.2349 1.26432 15.1826 9.43497e-07 12 0C8.81743 -9.43496e-07 5.76517 1.26431 3.51473 3.51481C1.26429 5.7653 6.1018e-07 8.81763 0 12.0003C-6.10179e-07 15.183 1.26428 18.2353 3.51473 20.4858L20.4853 3.51481Z"
        fill="var(--color-white)"
      />
      <path
        d="M12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12C1.25 6.06294 6.06294 1.25 12 1.25Z"
        stroke="var(--color-white)"
        strokeWidth="2.5"
      />
    </svg>
  );
}

/** Mirrored half-filled clock face — the 2nd payment marker. */
function SecondPaymentIcon() {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.51466 20.4866C5.76511 22.7371 8.81736 24.0014 12 24.0014C15.1826 24.0014 18.2348 22.7371 20.4853 20.4866C22.7357 18.2361 24 15.1838 24 12.0011C24 8.81845 22.7357 5.76612 20.4853 3.51563L3.51466 20.4866Z"
        fill="var(--color-white)"
      />
      <path
        d="M21.5 12.0014C21.5 6.75473 17.2467 2.50143 12 2.50143C6.75329 2.50143 2.5 6.75473 2.5 12.0014C2.5 17.2481 6.75329 21.5014 12 21.5014L12 24.0014C5.37255 24.0014 5.79387e-07 18.6289 0 12.0014C-6.39811e-08 5.37402 5.37258 0.00143491 12 0.00143433L12.3096 0.00534058C18.7939 0.16954 24 5.47721 24 12.0011L23.9961 12.311C23.8319 18.7953 18.5239 24.0014 12 24.0014L12 21.5014C17.2467 21.5014 21.5 17.2481 21.5 12.0014Z"
        fill="var(--color-white)"
      />
    </svg>
  );
}

const FLOATING_CARD_CLASS =
  "flex shrink-0 items-center gap-2 bg-white/85 w-66 h-17 md:w-74 md:h-19.5 px-4.5 md:px-5 rounded-[14px] md:rounded-2xl shadow-[0_10.378px_20.757px_0_rgba(0,0,0,0.10)] md:shadow-[0_12px_24px_0_rgba(0,0,0,0.10)] absolute z-10";

interface PaymentCardProps {
  icon: ReactNode;
  label: string;
  amount: string;
  caption: string;
  /** Per-product absolute offsets; the rest of the card is identical. */
  className: string;
}

/**
 * Hero entrance.
 *
 * Runs on load rather than on scroll — the hero is above the fold, so waiting
 * for an intersection would mean animating something the reader is already
 * looking at.
 *
 * Direction is assigned by what each piece is: the text column builds up as a
 * staggered read down the left, the photograph rises from beneath as one plane,
 * and the two floating cards enter from the side they sit on, so they read as
 * settling onto the image rather than fading up through it.
 */
const ENTER_EASE = [0.22, 1, 0.36, 1] as const;

const FROM = {
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  bottom: { x: 0, y: 40 },
  up: { x: 0, y: 14 },
} as const;

function enter(from: keyof typeof FROM, delay: number) {
  return {
    "data-motion-hidden": true,
    initial: { opacity: 0, ...FROM[from] },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.6, delay, ease: ENTER_EASE },
  } as const;
}

function PaymentCard({
  icon,
  label,
  amount,
  caption,
  className,
  from,
  delay,
}: PaymentCardProps & { from: "left" | "right"; delay: number }) {
  return (
    <motion.div className={cn(FLOATING_CARD_CLASS, className)} {...enter(from, delay)}>
      <div className="flex items-center justify-center bg-black rounded-full w-10 h-10 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-semibold text-no-wrap shrink-0 text-[14px] md:text-[16px] leading-[140%]">
            {label}
          </p>
          <p className="font-semibold text-[14px] md:text-[16px] leading-[140%]">
            {amount}
          </p>
        </div>
        <p className="font-normal text-[12px] md:text-[14px] leading-[130%] opacity-75 text-gray-400">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

/** The two floating stat chips over the hero photo. */
export interface ProductHeroPayment {
  label: string;
  amount: string;
  caption: string;
  /** Absolute-position utilities for this product, merged over the shared card class. */
  className: string;
}

export interface ProductHeroProps {
  /** Rendered into the `.illustration-component` slot (a Lottie or an inline SVG). */
  illustration: ReactNode;
  /** Headline — pass the `<br className="hidden lg:block" />` breaks inline. */
  title: ReactNode;
  /** Sub-copy under the headline, breaks included. */
  subtitle: ReactNode;
  ctaLabel?: string;
  badges: string[];
  /** Per-product top margin on the badge row (e.g. `lg:mt-16`). */
  badgeListClassName?: string;
  imageSrc: string;
  imageAlt?: string;
  imageSizes: string;
  /** Per-product height on the right-hand column (e.g. `md:h-110 lg:h-180`). */
  imageColumnClassName?: string;
  /** Per-vertical bleed below the tinted band (e.g. `lg:-bottom-30`). */
  imageBleedClassName?: string;
  firstPayment: ProductHeroPayment;
  secondPayment: ProductHeroPayment;
}

/**
 * Golden hero shared by /rent, /mortgage and /car.
 *
 * `data-header-theme="tint"` is read by the site header's intersection
 * observer to flip its palette while this section is in view.
 *
 * The right-hand photo bleeds past the tinted band via a negative `bottom` on an
 * `inset-0` wrapper, so the column's own height is what positions the two
 * floating payment chips — hence the per-product height and offset overrides.
 */
export function ProductHero({
  illustration,
  title,
  subtitle,
  ctaLabel = "Get started",
  badges,
  badgeListClassName,
  imageSrc,
  imageAlt = "family",
  imageSizes,
  imageColumnClassName,
  imageBleedClassName,
  firstPayment,
  secondPayment,
}: ProductHeroProps) {
  return (
    <section
      className="bg-tint-fade pt-18 mb-18 md:pt-28 md:mb-8"
      data-header-theme="tint"
      data-self-enter
    >
      <div className="mx-auto px-6 container lg:max-w-324 pt-12">
        <div className="block justify-between gap-6 lg:flex">
          <div className="w-full lg:w-150 shrink-0 lg:pt-6 mx-auto">
            <motion.div
              className="illustration-component flex items-center justify-center lg:w-50 h-26 lg:h-30"
              {...enter("up", 0.05)}
            >
              {illustration}
            </motion.div>
            <motion.h1
              className="leading-[115%]! font-poly-sans-wide text-center spacing lg:text-left text-[40px] md:text-[56px] lg:text-[64px] mt-6 md:mt-8 lg:mt-10"
              {...enter("left", 0.12)}
            >
              {title}
            </motion.h1>
            <motion.p
              className="font-normal mt-1 md:mt-1.25 mb-6 text-center lg:text-left text-[16px] lg:text-[18px] leading-[1.6] text-gray-400"
              {...enter("left", 0.2)}
            >
              {subtitle}
            </motion.p>
            {/* The target puts a `shadow-[0_12px_24px_0_rgba(0, 0, 0, 0.10)]` here, but
                the literal spaces split it into four junk classes, so it renders no
                shadow. Omitted rather than "fixed" — the button carries its own. */}
            <motion.div
              className="w-70 max-w-full mx-auto lg:mx-0"
              {...enter("left", 0.28)}
            >
              <GetStartedButton variant="primary" size="default">
                {ctaLabel}
              </GetStartedButton>
            </motion.div>
            <motion.ul
              className={cn(
                "flex flex-wrap md:flex-nowrap lg:flex-wrap gap-2 md:gap-6 lg:gap-3 justify-center my-8 md:my-10 lg:justify-start lg:mt-26 lg:mb-14",
                badgeListClassName,
              )}
              {...enter("left", 0.36)}
            >
              {badges.map((badge) => (
                <li key={badge} className="flex shrink-0 items-center gap-1 md:gap-2">
                  <BadgeCheckIcon className="w-2.5 h-2.5 md:w-4 md:h-4" />
                  <p className="font-normal text-[12px] md:text-[14px] leading-[130%] md:whitespace-nowrap">
                    {badge}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className={cn(
              "w-full md:w-[97%] mx-auto h-90 md:h-100 lg:w-132 lg:h-168 lg:mr-4 xl:mr-auto relative",
              imageColumnClassName,
            )}
            {...enter("bottom", 0.18)}
          >
            <PaymentCard
              icon={<FirstPaymentIcon />}
              label={firstPayment.label}
              amount={firstPayment.amount}
              caption={firstPayment.caption}
              className={firstPayment.className}
              from="left"
              delay={0.7}
            />
            <PaymentCard
              icon={<SecondPaymentIcon />}
              label={secondPayment.label}
              amount={secondPayment.amount}
              caption={secondPayment.caption}
              className={secondPayment.className}
              from="right"
              delay={0.82}
            />
            <div
              className={cn(
                "absolute inset-0 -bottom-10 rounded-3xl overflow-hidden shadow-[0_12px_24px_0_rgba(0,0,0,0.10)]",
                imageBleedClassName,
              )}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes={imageSizes}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
