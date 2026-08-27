import { CategoryIcon } from "@/components/CategoryIcon";
import { CashbackCalculator } from "@/components/product/CashbackCalculator";
import { LenderSection } from "@/components/product/LenderSection";
import {
  BuildingIcon,
  CalendarDollarIcon,
  CashIcon,
  CheckCircleIcon,
  HandCashIcon,
  PeaceIcon,
  QuestionCircleIcon,
  ShieldDollarIcon,
} from "@/components/product/product-icons";
import { ProductBenefits } from "@/components/product/ProductBenefits";
import { AutopilotCta } from "@/components/AutopilotCta";
import { JsonLd } from "@/components/JsonLd";
import { ProductHero } from "@/components/product/ProductHero";
import { ThreeSteps } from "@/components/product/ThreeSteps";
import { FaqSection } from "@/components/FaqSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Testimonials } from "@/components/Testimonials";
import { FAQS } from "@/data/faqs";
import { PRODUCT_TESTIMONIALS } from "@/data/product-testimonials";
import type { VerticalConfig } from "@/data/verticals";
import { faqPageJsonLd, MAIN_ID } from "@/lib/seo";

const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * Hero chips use the same $250/month cashback spend as the calculator default,
 * so the overlay and the slider cannot disagree. Customers = spend ÷ (AOV ×
 * rate), rounded; revenue = customers × AOV.
 */
const SAMPLE_CASHBACK_SPEND = 250;

/**
 * All four vertical routes render this. Everything that differs between them
 * lives in `@/data/verticals` — icons and layout stay here so the pages can't
 * drift apart as copy lands.
 */
export function VerticalPage({ config }: { config: VerticalConfig }) {
  const dir = `/images/${config.slug}`;
  const photos = Array.from({ length: 9 }, (_, i) => `${dir}/img-${i + 1}.jpg`);
  const cac = config.averageOrderValue * config.cashbackRate;
  const sampleCustomers = Math.round(SAMPLE_CASHBACK_SPEND / cac);
  const sampleRevenue = sampleCustomers * config.averageOrderValue;

  const [benefitOne, benefitTwo, benefitThree] = config.benefits;
  const [stepOne, stepTwo, stepThree] = config.easySteps;
  const [cardOne, cardTwo, cardThree] = config.easyCards;

  return (
    <>
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1}>
        <ProductHero
          illustration={
            // Same icon the homepage category card and menu use, so a visitor
            // arriving from either lands on art they already recognise.
            <CategoryIcon id={config.slug} />
          }
          title={config.heading}
          subtitle={config.subheading}
          badges={config.badges}
          imageSrc={`${dir}/hero.jpg`}
          imageAlt={`${config.name} business`}
          imageSizes="(min-width: 1024px) 624px, 100vw"
          imageBleedClassName="lg:-bottom-16"
          firstPayment={{
            icon: <CashIcon width={18} height={18} />,
            label: "Revenue driven",
            amount: wholeDollars.format(sampleRevenue),
            caption: "Per month",
            className: "top-23 md:top-17 lg:top-55 -left-4 md:-left-6",
          }}
          secondPayment={{
            icon: <HandCashIcon width={18} height={18} />,
            label: "Your cashback spend",
            amount: wholeDollars.format(SAMPLE_CASHBACK_SPEND),
            caption: `${sampleCustomers} customers`,
            className: "-bottom-4 md:bottom-2 md:-right-6 -right-4",
          }}
        />

        <ThreeSteps steps={config.consumerSteps} />

        <ProductBenefits
          heading={config.benefitsHeading}
          image={{ src: `${dir}/bg-benefits.jpg`, alt: `${config.name} business` }}
          benefits={[
            {
              icon: <CheckCircleIcon />,
              title: benefitOne.title,
              copy: benefitOne.copy,
            },
            {
              icon: <PeaceIcon />,
              title: benefitTwo.title,
              copy: benefitTwo.copy,
            },
            {
              icon: <ShieldDollarIcon />,
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
              icon: <CashIcon width={32} height={32} />,
              title: stepThree.title,
              copy: stepThree.copy,
            },
          ]}
          image={{ src: `${dir}/bg-lender.jpg`, alt: `${config.name} business` }}
          cards={[
            { icon: <HandCashIcon />, title: cardOne.title, copy: cardOne.copy },
            { icon: <BuildingIcon />, title: cardTwo.title, copy: cardTwo.copy },
            {
              icon: <QuestionCircleIcon />,
              title: cardThree.title,
              copy: cardThree.copy,
            },
          ]}
        />

        <Testimonials
          testimonials={PRODUCT_TESTIMONIALS[config.slug]}
          photos={photos}
        />

        {/* The standard 12 by design — there is no per-vertical FAQ variant. */}
        <FaqSection faqs={FAQS} />

        <AutopilotCta
          title={config.ctaTitle}
          description={config.ctaDescription}
          backgroundSrc={config.ctaBackground}
        />
      </main>
      <SiteFooter />
      <JsonLd data={faqPageJsonLd(FAQS)} />
    </>
  );
}
