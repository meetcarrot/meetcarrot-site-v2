"use client";

import { useState } from "react";

const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dollarsAndCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MIN = 250;
const MAX = 2500;
const STEP = 50;

export interface CashbackCalculatorProps {
  heading: string;
  /** Average order value for this vertical, e.g. 75 for hospitality. */
  averageOrderValue: number;
  /** Cashback rate as a fraction, e.g. 0.125 for 12.5%. */
  cashbackRate: number;
  /** Reads after the asterisk, e.g. "Based on the average restaurant." */
  footnote: string;
}

/**
 * Slider is the monthly revenue a merchant wants Carrot to drive. Both outputs
 * derive from it: the customer count is revenue ÷ AOV floored to a whole person
 * (you cannot buy a fraction of a visit), and the cashback spend is the rate
 * applied to that revenue.
 */
export function CashbackCalculator({
  heading,
  averageOrderValue,
  cashbackRate,
  footnote,
}: CashbackCalculatorProps) {
  const [revenue, setRevenue] = useState(MIN);

  const customers = Math.floor(revenue / averageOrderValue);
  const cashbackSpend = revenue * cashbackRate;
  // The filled portion of the track has to be painted as a gradient because a
  // range input exposes no cross-browser "progress" pseudo-element.
  const fillPercent = ((revenue - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center max-w-200 mx-auto">
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 leading-none lg:grid-cols-2 gap-8 mt-14 lg:mt-20">
          <div className="bg-white rounded-4xl py-8 px-6 md:py-10 md:px-10 lg:py-10 lg:px-14 flex flex-col items-center">
            <p className="font-medium text-[18px] md:text-[24px] mb-6 md:mb-12 lg:mb-14 text-center">
              Monthly revenue goal
            </p>
            <p className="font-poly-sans-wide font-semibold leading-none! text-[48px] md:text-[72px] lg:text-[80px] mb-8 md:mb-12 lg:mb-14">
              {wholeDollars.format(revenue)}
            </p>
            <input
              aria-label="Monthly revenue goal"
              className="w-full h-3 lg:h-4 rounded-full appearance-none cursor-pointer mt-auto [&::-webkit-slider-runnable-track]:h-3 lg:[&::-webkit-slider-runnable-track]:h-4 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 lg:[&::-webkit-slider-thumb]:w-8 lg:[&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink [&::-webkit-slider-thumb]:border-4 lg:[&::-webkit-slider-thumb]:border-5 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:-mt-1.5 lg:[&::-webkit-slider-thumb]:-mt-2 [&::-moz-range-track]:h-3 lg:[&::-moz-range-track]:h-4 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-gray-200 [&::-moz-range-progress]:h-3 lg:[&::-moz-range-progress]:h-4 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-pink [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 lg:[&::-moz-range-thumb]:w-8 lg:[&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-pink [&::-moz-range-thumb]:ring-4 lg:[&::-moz-range-thumb]:ring-5 [&::-moz-range-thumb]:ring-white"
              max={MAX}
              min={MIN}
              onChange={(event) => setRevenue(Number(event.target.value))}
              step={STEP}
              style={{
                background: `linear-gradient(to right, var(--color-pink) 0%, var(--color-pink) ${fillPercent}%, var(--color-gray-200) ${fillPercent}%, var(--color-gray-200) 100%)`,
              }}
              type="range"
              value={revenue}
            />
          </div>
          <div className="bg-white rounded-4xl p-7 lg:p-10 flex flex-col">
            <p className="font-medium text-[18px] md:text-[24px] mb-6 md:mb-8 text-center">
              What it costs you
            </p>
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-3 lg:gap-4 mb-8">
              <div className="bg-gray-100 rounded-2xl p-6 text-center">
                <p className="font-normal text-[16px] text-gray-600 mb-5">
                  Cashback spend
                </p>
                <p className="font-semibold text-[32px]">
                  {dollarsAndCents.format(cashbackSpend)}
                  <sup>*</sup>
                </p>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6 text-center">
                <p className="font-normal text-[16px] text-gray-600 mb-5">
                  Customers
                </p>
                <p className="font-semibold text-[32px]">{customers}</p>
              </div>
            </div>
            <p className="font-normal text-[14px] text-gray-400 text-center mt-auto">
              * {footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
