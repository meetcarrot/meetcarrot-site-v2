import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ChevronRightIcon, ClockIcon } from "@/components/icons";
import { LottieAnimation } from "@/components/LottieAnimation";

const CARD_BODY_CLASS =
  "shadow-[0_2px_6px_0_rgba(0,0,0,0.06)] p-6 pt-8 lg:p-12 rounded-[20px] bg-white";
const CARD_TITLE_CLASS =
  "leading-[115%]! font-poly-sans-wide text-[22px] md:text-[24px] lg:text-[40px] lg:tracking-[0.8px] mb-1";
const CARD_DESCRIPTION_CLASS = "text-[16px] font-normal leading-[1.33] lg:h-11";

interface ProductCardProps {
  href: string;
  title: string;
  description: ReactNode;
  /** Outer illustration frame — sized per card, so never unify these. */
  frameClassName: string;
  /** Inner slot the Lottie SVG stretches into — also per card. */
  slotClassName: string;
  lottieSrc: string;
}

function ProductCard({
  href,
  title,
  description,
  frameClassName,
  slotClassName,
  lottieSrc,
}: ProductCardProps) {
  return (
    <Link
      className="focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2 rounded-[20px] block"
      href={href}
    >
      <div className={CARD_BODY_CLASS}>
        <div className={frameClassName}>
          <div className={slotClassName}>
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

export function ProductCards() {
  return (
    <section className="pt-32 md:pt-40 lg:pt-36 pb-14 lg:pb-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            Split your{" "}
            <br className="md:hidden" />
            largest bills
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            Rent, mortgage, car payment. Each one splits in two.{" "}
            <br className="hidden lg:block" />
            Your landlord or lender gets paid in full on day one. We handle the
            rest.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-14 lg:mt-20">
          <ProductCard
            href="/rent"
            title="Rent"
            description={
              <>
                The 1st of the month, finally on{" "}
                <br className="max-[413px]:hidden lg:hidden" />
                your side.
              </>
            }
            frameClassName="h-26 lg:h-54 w-40 lg:w-54 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end"
            slotClassName="h-26 lg:h-46"
            lottieSrc="/lottie/product_rent.json"
          />
          <ProductCard
            href="/mortgage"
            title="Mortgages"
            description={
              <>
                Your mortgage, on your schedule.{" "}
                <br className="max-[413px]:hidden" />
                No refinancing. No catch.
              </>
            }
            frameClassName="h-26 md:mt-2 lg:h-54 lg:mt-5 w-40 lg:w-54 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end"
            slotClassName="h-21 lg:h-44"
            lottieSrc="/lottie/product_mortgage.json"
          />
          <ProductCard
            href="/car"
            title="Car payment"
            description={
              <>
                Your car payment, without{" "}
                <br className="max-[413px]:hidden lg:hidden" />
                the flinch.
              </>
            }
            frameClassName="h-26 lg:h-54 w-40 lg:w-80 mx-auto mb-6 lg:mb-12 flex items-center lg:items-end"
            slotClassName="h-18 relative -right-4 lg:h-36 lg:-bottom-3"
            lottieSrc="/lottie/product_carloan.json"
          />
          <div className={CARD_BODY_CLASS}>
            <div className="illustration-component flex items-center justify-center h-26 lg:h-54 mb-6 lg:mb-12 lg:items-end">
              {/* Static SVG: unoptimized because Next refuses to run SVG through the image optimizer. */}
              <Image
                src="/images/deco.svg"
                alt="cash flow"
                width={208}
                height={151}
                unoptimized
              />
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <p className={CARD_TITLE_CLASS}>Every big bill</p>
                <p className={CARD_DESCRIPTION_CLASS}>
                  Insurance, tuition, utilities, the ones{" "}
                  <br className="hidden lg:block" />
                  that keep you up are next.
                </p>
              </div>
              <div className="bg-gray-200 h-12 rounded-3xl px-4 items-center hidden lg:flex shrink-0">
                <p className="text-[16px] font-normal leading-[1.33] text-gray-600">
                  Coming soon
                </p>
              </div>
              <div className="w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center bg-gray-200 rounded-full lg:hidden shrink-0">
                <ClockIcon width={14} height={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
