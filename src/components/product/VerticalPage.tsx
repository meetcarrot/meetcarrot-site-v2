import Image from "next/image";
import { CashbackCalculator } from "@/components/product/CashbackCalculator";
import { LenderSection } from "@/components/product/LenderSection";
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
import { ProductBenefits } from "@/components/product/ProductBenefits";
import { AutopilotCta } from "@/components/AutopilotCta";
import { ProductHero } from "@/components/product/ProductHero";
import { ThreeSteps } from "@/components/product/ThreeSteps";
import { WinWinWin } from "@/components/product/WinWinWin";
import { FaqSection } from "@/components/FaqSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Testimonials } from "@/components/Testimonials";
import { FAQS } from "@/data/faqs";
import { PRODUCT_TESTIMONIALS } from "@/data/product-testimonials";
import type { VerticalConfig } from "@/data/verticals";

const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * The revenue figure the two hero chips illustrate. Held constant across
 * verticals so the chips compare like for like; only the derived cashback spend
 * and customer count move with each vertical's AOV and rate.
 */
const SAMPLE_REVENUE = 2000;

/**
 * All four vertical routes render this. Everything that differs between them
 * lives in `@/data/verticals` — icons and layout stay here so the pages can't
 * drift apart as copy lands.
 */
export function VerticalPage({ config }: { config: VerticalConfig }) {
  const dir = `/images/${config.slug}`;
  const photos = Array.from({ length: 9 }, (_, i) => `${dir}/img-${i + 1}.jpg`);
  const sampleCustomers = Math.floor(SAMPLE_REVENUE / config.averageOrderValue);

  const [benefitOne, benefitTwo, benefitThree] = config.benefits;
  const [stepOne, stepTwo, stepThree] = config.easySteps;
  const [cardOne, cardTwo, cardThree] = config.easyCards;
  const [consumerOne, consumerTwo, consumerThree] = config.consumerSteps;

  return (
    <>
      <SiteHeader />
      <main>
        <ProductHero
          illustration={
            // Same icon the homepage category card and menu use, so a visitor
            // arriving from either lands on art they already recognise.
            <Image
              src={`/images/categories/${config.slug}-iso.png`}
              alt=""
              width={512}
              height={512}
              className="h-full w-auto object-contain animate-icon-float"
            />
          }
          title={config.heading}
          subtitle={config.subheading}
          badges={config.badges}
          imageSrc={`${dir}/hero.jpg`}
          imageAlt={config.name}
          imageSizes="(min-width: 1024px) 624px, 100vw"
          imageBleedClassName="lg:-bottom-16"
          firstPayment={{
            label: "Revenue driven",
            amount: wholeDollars.format(SAMPLE_REVENUE),
            caption: "Per month",
            className: "top-23 md:top-17 lg:top-55 -left-4 md:-left-6",
          }}
          secondPayment={{
            label: "Your cashback spend",
            amount: wholeDollars.format(SAMPLE_REVENUE * config.cashbackRate),
            caption: `${sampleCustomers} customers`,
            className: "-bottom-4 md:bottom-2 md:-right-6 -right-4",
          }}
        />

        <ProductBenefits
          heading={config.benefitsHeading}
          image={{ src: `${dir}/bg-benefits.jpg`, alt: config.name }}
          benefits={[
            { icon: <CashIcon />, title: benefitOne.title, copy: benefitOne.copy },
            {
              icon: <CalendarDollarIcon />,
              title: benefitTwo.title,
              copy: benefitTwo.copy,
            },
            {
              icon: <PeaceIcon />,
              title: benefitThree.title,
              copy: benefitThree.copy,
            },
          ]}
        />

        <CashbackCalculator
          heading={config.calculatorHeading}
          averageOrderValue={config.averageOrderValue}
          cashbackRate={config.cashbackRate}
          footnote={config.calculatorFootnote}
        />

        <LenderSection
          heading={config.easyHeading}
          intro={config.easyIntro}
          steps={[
            {
              icon: <CalendarDollarIcon width={32} height={32} />,
              title: stepOne.title,
              copy: stepOne.copy,
            },
            {
              icon: <CheckCircleIcon width={32} height={32} />,
              title: stepTwo.title,
              copy: stepTwo.copy,
            },
            {
              icon: <SplitCirclesIcon width={32} height={32} />,
              title: stepThree.title,
              copy: stepThree.copy,
            },
          ]}
          image={{ src: `${dir}/bg-lender.jpg`, alt: config.name }}
          cards={[
            { icon: <SplitGradientIcon />, title: cardOne.title, copy: cardOne.copy },
            { icon: <BuildingIcon />, title: cardTwo.title, copy: cardTwo.copy },
            {
              icon: <QuestionCircleIcon />,
              title: cardThree.title,
              copy: cardThree.copy,
            },
          ]}
        />

        {/* The consumer-side flow sits under "Easy for you", per the changes doc. */}
        <ThreeSteps
          steps={[
            {
              imageSrc: `${dir}/left-phone.png`,
              imageAlt: `app view: ${consumerOne.toLowerCase()}`,
              label: consumerOne,
            },
            {
              imageSrc: `${dir}/central-phone.png`,
              imageAlt: `app view: ${consumerTwo.toLowerCase()}`,
              label: consumerTwo,
            },
            {
              imageSrc: `${dir}/right-phone.png`,
              imageAlt: `app view: ${consumerThree.toLowerCase()}`,
              label: consumerThree,
            },
          ]}
        />

        <WinWinWin entries={config.winWinWin} />

        <Testimonials
          testimonials={PRODUCT_TESTIMONIALS[config.slug]}
          photos={photos}
        />

        {/* The standard 12 by design — there is no per-vertical FAQ variant. */}
        <FaqSection faqs={FAQS} />

        <AutopilotCta
          title={config.ctaTitle}
          backgroundSrc={`${dir}/cta-bg.jpg`}
          phoneSrc={`${dir}/cta-phone.png`}
          phoneWidth={1308}
          phoneHeight={2511}
        />
      </main>
      <SiteFooter />
    </>
  );
}
