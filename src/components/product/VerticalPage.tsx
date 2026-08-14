import { LottieAnimation } from "@/components/LottieAnimation";
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
import { ProductCta } from "@/components/product/ProductCta";
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

/**
 * All four vertical routes render this. Everything that differs between them
 * lives in `@/data/verticals` — icons and layout stay here so the pages can't
 * drift apart as copy lands.
 */
export function VerticalPage({ config }: { config: VerticalConfig }) {
  const dir = `/images/${config.slug}`;
  const photos = Array.from({ length: 9 }, (_, i) => `${dir}/img-${i + 1}.png`);

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
            // TODO: placeholder art — the per-vertical animated icon is pending.
            <LottieAnimation
              src="/lottie/product_rent.json"
              className="h-full w-full [&_svg]:h-full! [&_svg]:w-full!"
            />
          }
          title={config.heading}
          subtitle={config.subheading}
          badges={config.badges}
          imageSrc={`${dir}/hero.png`}
          imageAlt={config.name}
          imageSizes="(min-width: 1024px) 624px, 100vw"
          imageBleedClassName="lg:-bottom-16"
          firstPayment={{
            amount: "$1,000",
            className: "top-23 md:top-17 lg:top-55 -left-4 md:-left-6",
          }}
          secondPayment={{
            amount: "$1,000",
            className: "-bottom-4 md:bottom-2 md:-right-6 -right-4",
          }}
        />

        <ProductBenefits
          heading={config.benefitsHeading}
          image={{ src: `${dir}/bg-benefits.png`, alt: config.name }}
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
          image={{ src: `${dir}/bg-lender.png`, alt: config.name }}
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

        {/* TODO: per-vertical FAQ sets are pending; the shared 12 run everywhere. */}
        <FaqSection faqs={FAQS} />

        <ProductCta
          title={config.ctaTitle}
          backgroundSrc={`${dir}/cta-bg.png`}
          phoneSrc={`${dir}/cta-phone.png`}
          phoneWidth={1308}
          phoneHeight={2511}
        />
      </main>
      <SiteFooter />
    </>
  );
}
