import type { Metadata } from "next";

import { LottieAnimation } from "@/components/LottieAnimation";
import { BeforeAfterCalculator } from "@/components/product/BeforeAfterCalculator";
import {
  CalendarDollarIcon,
  CashIcon,
  CheckCircleIcon,
  HouseIcon,
  PeaceIcon,
  QuestionCircleIcon,
  ShieldDollarIcon,
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
  "/images/mortgage/img-1.png",
  "/images/mortgage/img-2.png",
  "/images/mortgage/img-3.png",
  "/images/mortgage/img-4.png",
  "/images/mortgage/img-5.png",
  "/images/mortgage/img-6.png",
  "/images/mortgage/img-7.png",
  "/images/mortgage/img-8.png",
  "/images/mortgage/img-9.png",
];

const LENDER_LOGOS = [
  { name: "Rocket Mortgage", src: "/images/mortgage/rocket-mortgage.svg" },
  { name: "Chase", src: "/images/brands/chase.svg" },
  { name: "Wells Fargo", src: "/images/mortgage/wells-fargo.svg" },
  { name: "Bank of America", src: "/images/brands/bank-of-america.svg" },
  { name: "UWM", src: "/images/mortgage/uwm.svg" },
  { name: "loanDepot", src: "/images/brands/loan-depot.svg" },
  { name: "Navy Federal Credit Union", src: "/images/mortgage/navy-federal.svg" },
  { name: "Penny mac", src: "/images/mortgage/pennymac.svg" },
];

export const metadata: Metadata = {
  title: "Split Your Mortgage in Two - Split Pay",
  description:
    "Your biggest monthly bill shouldn't mean 30 days of math. Split your mortgage into two payments on your schedule. Same total, smarter timing.",
};

export default function MortgagePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero
          illustration={
            <LottieAnimation
              src="/lottie/product_mortgage.json"
              className="h-full w-full [&_svg]:h-full! [&_svg]:w-full!"
            />
          }
          title={
            <>
              Mortgage month, <br className="hidden lg:block" /> handled.
            </>
          }
          subtitle={
            <>
              Your biggest monthly bill shouldn&rsquo;t mean 30 days of math.{" "}
              <br className="hidden lg:block" />
              Split your mortgage into two payments on your schedule,
            </>
          }
          badges={["Zero late fees", "No credit check", "Cancel anytime"]}
          imageSrc="/images/mortgage/bg-hero.png"
          imageAlt="family"
          imageSizes="(min-width: 1024px) 1200px, 100vw"
          imageColumnClassName="md:h-110"
          imageBleedClassName="lg:-bottom-30"
          firstPayment={{ amount: "$1,000", className: "top-40 md:top-12 lg:top-66 -left-4 md:-left-6" }}
          secondPayment={{ amount: "$1,000", className: "-bottom-4 md:bottom-25 lg:bottom-40 md:-right-6 -right-4" }}
        />

        <ThreeSteps
          steps={[
            {
              imageSrc: "/images/mortgage/left-phone.png",
              imageAlt: "app view: how much is your mortgage",
              label: "Add your monthly mortgage",
            },
            {
              imageSrc: "/images/mortgage/central-phone.png",
              imageAlt: "app view: connect your accounts",
              label: "Connect your accounts",
            },
            {
              imageSrc: "/images/mortgage/right-phone.png",
              imageAlt: "app view: you are approved",
              label: "Get approved",
            },
          ]}
        />

        <ProductBenefits
          heading={
            <>
              Your biggest bill,{" "}
              <br className="hidden min-[340px]:block" />
              smoother every month.
            </>
          }
          image={{ src: "/images/mortgage/bg-benefits.png", alt: "walking with dog" }}
          benefits={[
            {
              icon: <CashIcon />,
              title: "Keep more cash on hand",
              copy: "A $2,400 mortgage doesn’t have to mean $2,400 gone all at once. Split it into two $1,200 payments and keep more cash through the month.",
            },
            {
              icon: <CalendarDollarIcon />,
              title: "Never miss a payment",
              copy: "Late mortgage payments can hurt your credit and trigger fees. Split Pay sends your servicer the full amount, on time, every time.",
            },
            {
              icon: <PeaceIcon />,
              title: "More peace of mind",
              copy: "No more juggling which bills to pay first. No more sweating one massive payment. Your mortgage, handled.",
            },
          ]}
        />

        <BeforeAfterCalculator
          heading="See what your mortgage payment looks like, split."
          beforeLabel="Your monthly mortgage (before)"
          afterLabel="Your monthly mortgage (after)"
          billNoun="your monthly mortgage"
          defaultAmount={2000}
        />

        <LenderSection
          heading="Nothing changes for your lender."
          intro={
            <>
              Split Pay integrates with your mortgage servicer, not the other way around.{" "}
              <br className="hidden md:block" />
              Your lender receives your full payment on time, down to the penny.
            </>
          }
          steps={[
            { icon: <HouseIcon width={32} height={32} />, title: "Your mortgage is due", copy: "Your normal payment date arrives." },
            { icon: <CheckCircleIcon width={32} height={32} />, title: "Split Pay pays in full", copy: "We cover the full amount to your lender on time." },
            { icon: <SplitCirclesIcon width={32} height={32} />, title: "You pay in 2 installments", copy: "Half now. Half two weeks later." },
          ]}
          image={{ src: "/images/mortgage/bg-lender.png", alt: "family reading" }}
          cards={[
            {
              icon: <SplitGradientIcon />,
              title: "How Split Pay works",
              copy: "We pay your mortgage servicer in full on your due date. You pay us back in two installments — half now, half later. Your lender sees one on-time payment. You get breathing room.",
            },
            {
              icon: <ShieldDollarIcon />,
              title: "What happens to my escrow?",
              copy: "Nothing. Your escrow for taxes and insurance stays exactly the same. We split the total payment amount (escrow included) so your servicer receives the full amount they expect.",
            },
            {
              icon: <QuestionCircleIcon />,
              title: "What does my lender see?",
              copy: "Your lender still receives the full mortgage payment as usual. Split Pay simply lets you break it into smaller payments on your side.",
            },
          ]}
          logos={LENDER_LOGOS}
          logosFootnote="Works with all other mortgage providers"
        />

        <Testimonials testimonials={PRODUCT_TESTIMONIALS.mortgage} photos={PRODUCT_PHOTOS} />

        <FaqSection faqs={PRODUCT_FAQS.mortgage} />

        <ProductCta
          title="Mortgage month, handled."
          backgroundSrc="/images/mortgage/mortgage-bg.png"
          phoneSrc="/images/mortgage/mortgage-phone.png"
          phoneWidth={1308}
          phoneHeight={2511}
        />
      </main>
      <SiteFooter />
    </>
  );
}
