import type { Metadata } from "next";

import { LottieAnimation } from "@/components/LottieAnimation";
import { BeforeAfterCalculator } from "@/components/product/BeforeAfterCalculator";
import {
  CalendarDollarIcon,
  CalendarSolidIcon,
  CarFrontIcon,
  CashIcon,
  CheckCircleIcon,
  CircleHalfIcon,
  EqualCircleIcon,
  HandCashIcon,
  SplitCirclesIcon,
} from "@/components/product/product-icons";
import { LenderSection } from "@/components/product/LenderSection";
import { ProductBenefits } from "@/components/product/ProductBenefits";
import { ProductCta } from "@/components/product/ProductCta";
import { ProductHero } from "@/components/product/ProductHero";
import { ThreeSteps } from "@/components/product/ThreeSteps";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Testimonials } from "@/components/Testimonials";
import { FaqSection } from "@/components/FaqSection";
import { PRODUCT_FAQS } from "@/data/product-faqs";
import { PRODUCT_TESTIMONIALS } from "@/data/product-testimonials";

const PRODUCT_PHOTOS = [
  "/images/car/img-1.png",
  "/images/car/img-2.png",
  "/images/car/img-3.png",
  "/images/car/img-4.png",
  "/images/car/img-5.png",
  "/images/car/img-6.png",
  "/images/car/img-7.png",
  "/images/car/img-8.png",
  "/images/car/img-9.png",
];

const LENDER_LOGOS = [
  { name: "Chase", src: "/images/brands/chase.svg" },
  { name: "Toyota", src: "/images/car/toyota.svg" },
  { name: "GM", src: "/images/brands/GM.svg" },
  { name: "Ford", src: "/images/brands/ford.svg" },
  { name: "Honda", src: "/images/brands/honda.svg" },
  { name: "Kia", src: "/images/brands/kia.svg" },
  { name: "Hyundai", src: "/images/brands/hundai.svg" },
  { name: "Ally", src: "/images/brands/ally.svg" },
];

export const metadata: Metadata = {
  title: "Split Your Car Payment in Two - Split Pay",
  description:
    "Your lender gets paid in full on day one. You pay us back in two halves, two weeks apart. No new debt, no interest.",
};

export default function CarPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero
          illustration={
            <LottieAnimation
              src="/lottie/product_carloan.json"
              className="h-full w-full [&_svg]:h-full! [&_svg]:w-full!"
            />
          }
          title={
            <>
              One car payment, <br className="hidden lg:block" /> two halves.
            </>
          }
          subtitle={
            <>
              Your lender gets paid in full on day one. You pay us back in{" "}
              <br className="hidden lg:block" />
              two halves, two weeks apart. No new debt, no interest.
            </>
          }
          badges={["Zero late fees", "No credit check", "Cancel anytime"]}
          badgeListClassName="lg:mt-16"
          imageSrc="/images/car/bg-hero.png"
          imageAlt="family"
          imageSizes="(min-width: 1024px) 900px, 100vw"
          imageColumnClassName="lg:h-180"
          imageBleedClassName="lg:-bottom-14"
          firstPayment={{ amount: "$500", className: "top-6 md:top-12 -left-4 md:-left-6" }}
          secondPayment={{ amount: "$500", className: "-bottom-4 md:bottom-2 md:-right-6 -right-4" }}
        />

        <ThreeSteps
          steps={[
            {
              imageSrc: "/images/car/left-phone.png",
              imageAlt: "app view: how much is your car payment",
              label: "Add your monthly car payment",
            },
            {
              imageSrc: "/images/car/central-phone.png",
              imageAlt: "app view: connect your accounts",
              label: "Connect your accounts",
            },
            {
              imageSrc: "/images/car/right-phone.png",
              imageAlt: "app view: you are approved",
              label: "Get approved",
            },
          ]}
        />

        <ProductBenefits
          heading="Keep you car. Keep your cash."
          image={{ src: "/images/car/bg-benefits.png", alt: "man loading car for a camping trip" }}
          benefits={[
            {
              icon: <CashIcon />,
              title: "More cash, all month",
              copy: "Half now. Half in two weeks. Your 1st of the month stops feeling brutal.",
            },
            {
              icon: <CalendarSolidIcon />,
              title: "Never late, never dinged",
              copy: "We pay your lender in full on day one. You pay us back in two halves. No late fees, no credit hit.",
            },
            {
              icon: <CircleHalfIcon />,
              title: "Your biggest cost, halved",
              copy: "Insurance, gas, parking — your car already costs in pieces. We just shrink the biggest one.",
            },
          ]}
        />

        <BeforeAfterCalculator
          heading="See what your car payment looks like, split."
          beforeLabel="Your monthly car payment (before)"
          afterLabel="Your monthly car payment (after)"
          billNoun="your monthly car payment"
          defaultAmount={500}
          max={1000}
        />

        <LenderSection
          heading="Nothing changes for your lender."
          intro="We pay your lender in full on the due date. You pay us back in two halves. Nothing else changes."
          steps={[
            { icon: <CarFrontIcon width={32} height={32} />, title: "Your car payment is due", copy: "Your normal payment date arrives." },
            { icon: <CheckCircleIcon width={32} height={32} />, title: "Split Pay pays in full", copy: "We cover the full amount to your lender on time." },
            { icon: <SplitCirclesIcon width={32} height={32} />, title: "You pay in 2 installments", copy: "Half now. Half two weeks later." },
          ]}
          image={{ src: "/images/car/bg-lender.png", alt: "family reading" }}
          cards={[
            {
              icon: <HandCashIcon />,
              title: "Paid in full",
              copy: "We send your lender the full payment on your due date. Every time.",
            },
            {
              icon: <EqualCircleIcon />,
              title: "Terms don’t move",
              copy: "Same APR. Same length. Same payoff date. We just shift the timing.",
            },
            {
              icon: <CalendarDollarIcon />,
              title: "One on-time payment",
              copy: "Your lender sees a single on-time payment. No flag. No asterisk.",
            },
          ]}
          logos={LENDER_LOGOS}
        />

        <Testimonials testimonials={PRODUCT_TESTIMONIALS.car} photos={PRODUCT_PHOTOS} />

        <FaqSection faqs={PRODUCT_FAQS.car} />

        <ProductCta
          title="One car payment, two halves."
          backgroundSrc="/images/car/car-loan-bg.png"
          phoneSrc="/images/car/phone.png"
          phoneWidth={1314}
          phoneHeight={2517}
        />
      </main>
      <SiteFooter />
    </>
  );
}
