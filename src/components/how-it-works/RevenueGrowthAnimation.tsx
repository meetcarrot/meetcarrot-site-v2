"use client";

import { useRef, useState } from "react";

import {
  easeOutCubic,
  segment,
  useStepAnimation,
  wholeDollars,
} from "@/components/how-it-works/useStepAnimation";

/**
 * Step 3's illustration: revenue arriving.
 *
 * An earlier version was a small bar chart and read as a report rather than as
 * money coming in. This leads with the total at display size and has individual
 * payments visibly land and fold into it, so the motion carries the meaning
 * even if nobody reads the axis. Bars stay, but as a supporting baseline under
 * the number rather than the main event.
 */

const TOTAL = 24680;

/** Payments that fly in. Values are the increments the total ticks through. */
const PAYMENTS = [
  { label: "New customer", amount: 62 },
  { label: "New customer", amount: 48 },
  { label: "New customer", amount: 85 },
];

const MONTHS = [0.34, 0.42, 0.4, 0.56, 0.68, 0.84];

const GROW_MS = 2600;
const PAYMENT_AT = 700;
const PAYMENT_STAGGER = 800;
const PAYMENT_VISIBLE_MS = 1100;
const CYCLE_MS = Math.max(GROW_MS, PAYMENT_AT + PAYMENT_STAGGER * PAYMENTS.length) + 2200;

export function RevenueGrowthAnimation() {
  const totalRef = useRef<HTMLSpanElement>(null);
  const barRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<number[]>([]);

  const paint = (elapsed: number) => {
    const progress = easeOutCubic(segment(elapsed, 0, GROW_MS));
    if (totalRef.current) {
      totalRef.current.textContent = wholeDollars.format(Math.round(TOTAL * progress));
    }
    MONTHS.forEach((height, index) => {
      const bar = barRefs.current[index];
      if (!bar) return;
      const barProgress = easeOutCubic(segment(elapsed, index * 220, 600));
      bar.style.transform = `scaleY(${height * barProgress})`;
    });

    // A payment is on screen for a beat after it lands, then folds away.
    const showing = PAYMENTS.reduce<number[]>((acc, _, index) => {
      const start = PAYMENT_AT + index * PAYMENT_STAGGER;
      if (elapsed >= start && elapsed < start + PAYMENT_VISIBLE_MS) acc.push(index);
      return acc;
    }, []);
    setVisible((current) =>
      current.length === showing.length && current.every((v, i) => v === showing[i])
        ? current
        : showing,
    );
  };

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: paint,
    onReducedMotion: () => {
      if (totalRef.current) totalRef.current.textContent = wholeDollars.format(TOTAL);
      MONTHS.forEach((height, index) => {
        const bar = barRefs.current[index];
        if (bar) bar.style.transform = `scaleY(${height})`;
      });
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Revenue from Carrot climbing to twenty four thousand dollars as individual customer payments arrive."
      className="w-full max-w-84 mx-auto"
    >
      <div className="relative">
        <p className="text-center text-[13px] text-gray-600">Revenue driven</p>
        {/* Display size on purpose: this number is the step's whole message. */}
        <p className="mt-1 text-center">
          <span
            ref={totalRef}
            className="font-poly-sans-wide text-[36px] md:text-[44px] leading-none tabular-nums tracking-[-0.02em] text-pink"
          >
            {wholeDollars.format(0)}
          </span>
        </p>

        {/* Payments land top-right and fade upward into the total. */}
        <div className="pointer-events-none absolute -top-1 right-0 h-20 w-36">
          {PAYMENTS.map((payment, index) => (
            <div
              key={`${payment.label}-${index}`}
              className={[
                "absolute right-0 flex items-center gap-1.5 rounded-full bg-[#e8f6ed] px-2.5 py-1 text-[11px] font-medium text-[#137a3c] transition-all duration-500 ease-out",
                visible.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ top: `${index * 22}px` }}
            >
              +{wholeDollars.format(payment.amount)}
            </div>
          ))}
        </div>

        <div className="mt-5 flex h-14 items-end gap-2">
          {MONTHS.map((height, index) => (
            <div key={index} className="h-full flex-1 overflow-hidden rounded-md bg-gray-100">
              {/* Scaled from the bottom so bars grow up out of the baseline
                  rather than unmasking downward from the top. */}
              <div
                ref={(element) => {
                  barRefs.current[index] = element;
                }}
                className="h-full w-full origin-bottom rounded-md bg-pink/25"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[12px] text-gray-600">
          Month after month, from real purchases.
        </p>
      </div>
    </div>
  );
}
