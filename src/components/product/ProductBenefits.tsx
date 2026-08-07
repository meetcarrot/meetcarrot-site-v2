import Image from "next/image";
import type { ReactNode } from "react";

export interface ProductBenefit {
  /** 24×24 SVG, rendered inside the dark circle. See `product-icons.tsx`. */
  icon: ReactNode;
  title: string;
  copy: ReactNode;
}

export interface ProductBenefitsImage {
  src: string;
  alt: string;
}

export interface ProductBenefitsProps {
  heading: ReactNode;
  /**
   * Empty on all three live product pages, but the paragraph itself ships in
   * the markup and its `gap-6` still spaces the header block.
   */
  subheading?: ReactNode;
  /** Full-bleed photo the cards overlap by `-mt-10` / `lg:-mt-20`. */
  image: ProductBenefitsImage;
  /** Three cards on every product page; the grid is `lg:grid-cols-3`. */
  benefits: ProductBenefit[];
}

export function ProductBenefits({
  heading,
  subheading,
  image,
  benefits,
}: ProductBenefitsProps) {
  return (
    <section className="overflow-x-clip py-14 lg:py-24" data-header-theme="gray">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            {heading}
          </h2>
          <p className="text-[16px] font-normal leading-[1.33] text-center lg:text-[18px]">
            {subheading}
          </p>
        </div>
        <div className="mt-14 lg:mt-20 relative">
          <div className="relative rounded-4xl overflow-hidden h-100 md:h-110.5 lg:h-200">
            <Image
              alt={image.alt}
              loading="lazy"
              fill
              className="object-cover"
              sizes="(min-width: 1296px) 1248px, 100vw"
              src={image.src}
            />
          </div>
          <div className="relative z-10 -mt-10 lg:-mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mx-4 md:mx-10">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-4xl p-7 lg:p-10 bg-white shadow-[0_8px_16px_0_rgba(0,0,0,0.05)]"
              >
                <div className="flex justify-center mb-4 lg:mb-6">
                  <div className="flex items-center justify-center rounded-full w-16 h-16 bg-gray-400">
                    {benefit.icon}
                  </div>
                </div>
                <p className="font-medium text-center text-[18px] md:text-[24px] mb-4 leading-[130%]">
                  {benefit.title}
                </p>
                <p className="font-normal text-center text-[16px] md:text-[18px] leading-[130%]">
                  {benefit.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
