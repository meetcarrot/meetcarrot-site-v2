import type { Metadata } from "next";

import { LottieAnimation } from "@/components/LottieAnimation";
import { BeforeAfterCalculator } from "@/components/product/BeforeAfterCalculator";
import {
  BuildingIcon,
  CalendarDollarIcon,
  CashIcon,
  CheckCircleIcon,
  PeaceIcon,
  QuestionCircleIcon,
  SplitCirclesIcon,
  SplitGradientIcon,
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
  "/images/rent/img-1.png",
  "/images/rent/img-2.png",
  "/images/rent/img-3.png",
  "/images/rent/img-4.png",
  "/images/rent/img-5.png",
  "/images/rent/img-6.png",
  "/images/rent/img-7.png",
  "/images/rent/img-8.png",
  "/images/rent/img-9.png",
];

export const metadata: Metadata = {
  title: "Split Your Rent in Two - Split Pay",
  description:
    "Your biggest bill shouldn't wipe out your month. Split Pay breaks rent into two payments on your schedule, so the 1st feels like any other day.",
};

export default function RentPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero
          illustration={
            <LottieAnimation
              src="/lottie/product_rent.json"
              className="h-full w-full [&_svg]:h-full! [&_svg]:w-full!"
            />
          }
          title={
            <>
              Rent day, <br className="hidden lg:block" /> lighter.
            </>
          }
          subtitle={
            <>
              Your biggest bill shouldn&rsquo;t wipe out your month.{" "}
              <br className="hidden lg:block" />
              Split Pay breaks rent into two payments on your schedule,{" "}
              <br className="hidden lg:block" />
              so the 1st feels like any other day.
            </>
          }
          badges={["Zero late fees", "No credit check", "Cancel anytime"]}
          imageSrc="/images/rent/welcome-img.png"
          imageAlt="family"
          imageSizes="(min-width: 1024px) 624px, 100vw"
          imageBleedClassName="lg:-bottom-16"
          firstPayment={{ amount: "$1,000", className: "top-23 md:top-17 lg:top-55 -left-4 md:-left-6" }}
          secondPayment={{ amount: "$1,000", className: "-bottom-4 md:bottom-2 md:-right-6 -right-4" }}
        />

        <ThreeSteps
          steps={[
            {
              imageSrc: "/images/rent/left-phone.png",
              imageAlt: "app view: how much is your rent",
              label: "Add your rent",
            },
            {
              imageSrc: "/images/rent/central-phone.png",
              imageAlt: "app view: connect your accounts",
              label: "Connect your accounts",
            },
            {
              imageSrc: "/images/rent/right-phone.png",
              imageAlt: "app view: you are approved",
              label: "Get approved",
            },
          ]}
        />

        <ProductBenefits
          heading={
            <>
              More cash, less pressure,{" "}
              <br className="hidden min-[480px]:block" />
              every month.
            </>
          }
          image={{ src: "/images/rent/bg-benefits.png", alt: "fine" }}
          benefits={[
            {
              icon: <CashIcon />,
              title: "Keep more cash on hand",
              copy: "A $2,000 rent payment doesn’t have to mean $2,000 gone on the 1st. Split it into two $1,000 payments and keep more cash for the rest of the month.",
            },
            {
              icon: <CalendarDollarIcon />,
              title: "Never pay rent late",
              copy: "Late rent can mean fees, awkward landlord texts, or a hit to your rental history. Split Pay pays your landlord in full, on time, every time.",
            },
            {
              icon: <PeaceIcon />,
              title: "More peace of mind",
              copy: "Your biggest bill of the month, handled. Set it once and stop dreading the 1st. Breathing room, built in.",
            },
          ]}
        />

        <BeforeAfterCalculator
          heading="See what your rent looks like, split."
          beforeLabel="Your rent (before)"
          afterLabel="Your rent (after)"
          billNoun="your total rent"
          defaultAmount={2000}
        />

        <LenderSection
          heading={
            <>
              Easy for you. <br className="hidden min-[480px]:block" /> Easy for your landlord.
            </>
          }
          intro={
            <>
              Split Pay works alongside your existing rent setup, not on top of it.{" "}
              <br className="hidden md:block" />
              Your landlord receives your full payment on time, the way they already accept it.
            </>
          }
          steps={[
            { icon: <CalendarDollarIcon width={32} height={32} />, title: "Rent is due", copy: "Your normal payment date arrives." },
            { icon: <CheckCircleIcon width={32} height={32} />, title: "Split Pay pays in full", copy: "We cover the full amount to your landlord on time." },
            { icon: <SplitCirclesIcon width={32} height={32} />, title: "You pay 2 installments", copy: "Half now. Half two weeks later." },
          ]}
          image={{ src: "/images/rent/bg-lender.png", alt: "family reading" }}
          cards={[
            {
              icon: <SplitGradientIcon />,
              title: "How Split Pay works",
              copy: "We pay your landlord or property manager in full on your rent due date. You pay us back in two installments — half now, half later. Your landlord sees one on-time rent payment. You get breathing room.",
            },
            {
              icon: <BuildingIcon />,
              title: "Works with any landlord",
              copy: "Big property management companies, small independent owners, co-ops, condo boards, if you pay rent, we can split it. We send your payment the way your landlord already accepts it: ACH, Zelle, tenant portal, or a mailed check.",
            },
            {
              icon: <QuestionCircleIcon />,
              title: "What does my landlord see?",
              copy: "Your landlord still gets paid in full, on time. There are no changes to how they receive payments.",
            },
          ]}
        />

        <Testimonials testimonials={PRODUCT_TESTIMONIALS.rent} photos={PRODUCT_PHOTOS} />

        <FaqSection faqs={PRODUCT_FAQS.rent} />

        <ProductCta
          title="Rent day, lighter"
          backgroundSrc="/images/rent/rent.png"
          phoneSrc="/images/rent/rent-phone.png"
          phoneWidth={1308}
          phoneHeight={2511}
        />
      </main>
      <SiteFooter />
    </>
  );
}
