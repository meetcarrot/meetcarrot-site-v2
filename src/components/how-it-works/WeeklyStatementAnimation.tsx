"use client";

import { useRef, useState } from "react";

import { CarrotIcon } from "@/components/carrot-logo";

import {
  STEP_CARD_CLASS,
  easeOutCubic,
  useStepAnimation,
  wholeDollars,
} from "@/components/how-it-works/useStepAnimation";

/**
 * Step 4's illustration: a week of activity tallying on a statement card, then
 * Carrot collecting on Friday. Built in the DOM rather than shipped as a
 * Lottie because the numbers have to read as real currency — a vector export
 * would bake in glyphs that can't use tabular figures or the site's font.
 *
 * The tone brief is "calm, reliable, automatic", which drives every timing
 * choice here: nothing bounces, nothing flashes, and the counters ease to a
 * stop rather than snapping.
 */

/** Where a full week lands. Cashback is 10% of revenue, matching a mid-range offer. */
const TARGET = {
  customers: 128,
  revenue: 4860,
  cashback: 486,
};

/** Cycle segments, in ms. Sum is one full loop. */
const GROW_MS = 4200;
const LOCK_MS = 600;
const PROCESSING_MS = 1300;
const PAID_MS = 2200;
const RESET_MS = 700;

const LOCK_AT = GROW_MS;
const PROCESSING_AT = LOCK_AT + LOCK_MS;
const PAID_AT = PROCESSING_AT + PROCESSING_MS;
const RESET_AT = PAID_AT + PAID_MS;
const CYCLE_MS = RESET_AT + RESET_MS;

type Phase = "growing" | "locked" | "processing" | "paid" | "resetting";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function phaseFor(elapsed: number): Phase {
  if (elapsed < LOCK_AT) return "growing";
  if (elapsed < PROCESSING_AT) return "locked";
  if (elapsed < PAID_AT) return "processing";
  if (elapsed < RESET_AT) return "paid";
  return "resetting";
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WeeklyStatementAnimation() {
  const customersRef = useRef<HTMLSpanElement>(null);
  const revenueRef = useRef<HTMLSpanElement>(null);
  const cashbackRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Only the phase re-renders — five times a cycle. The counters are written
  // straight to the DOM, because re-rendering three numbers at 60fps would
  // re-run this component ~500 times per loop for no visual gain.
  const [phase, setPhase] = useState<Phase>("growing");

  /** Paint one instant of the cycle. `progress` is 0–1 through the week. */
  function paint(progress: number) {
    const eased = easeOutCubic(progress);
    if (customersRef.current) {
      customersRef.current.textContent = String(Math.round(TARGET.customers * eased));
    }
    if (revenueRef.current) {
      revenueRef.current.textContent = wholeDollars.format(Math.round(TARGET.revenue * eased));
    }
    if (cashbackRef.current) {
      cashbackRef.current.textContent = wholeDollars.format(Math.round(TARGET.cashback * eased));
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    // Days light up as the week sweeps past them.
    dayRefs.current.forEach((day, index) => {
      if (!day) return;
      day.dataset.reached = progress >= (index + 1) / DAYS.length ? "true" : "false";
    });
  }

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: (elapsed) => {
      const next = phaseFor(elapsed);
      setPhase((current) => (current === next ? current : next));
      paint(next === "growing" ? elapsed / GROW_MS : 1);
    },
    onReducedMotion: () => {
      paint(1);
      setPhase("paid");
    },
  });

  const isSettled = phase === "processing" || phase === "paid" || phase === "resetting";

  return (
    <div
      ref={rootRef}
      className="w-full"
      role="img"
      aria-label="A weekly statement tallying customers, revenue, and cashback through the week, then settling automatically on Friday."
    >
      <div
        className={[
          STEP_CARD_CLASS,
          "transition-opacity duration-500 ease-out",
          phase === "resetting" ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CarrotIcon idPrefix="statement-mark" className="h-4 w-auto" />
            <span className="text-[13px] font-medium">Weekly statement</span>
          </span>
          <span
            className={[
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-300 ease-out",
              phase === "paid"
                ? "bg-[#e8f6ed] text-[#137a3c]"
                : phase === "processing"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-gray-100 text-gray-600/70",
            ].join(" ")}
          >
            {phase === "paid" ? (
              <>
                <CheckIcon />
                Paid Friday
              </>
            ) : phase === "processing" ? (
              <>
                {/* Steady pulse, not a spinner — the brief is calm, not busy. */}
                <span className="size-1.5 rounded-full bg-gray-600 animate-pulse" />
                Tallying
              </>
            ) : (
              "Collecting"
            )}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {[
            { label: "Customers", ref: customersRef, initial: "0" },
            { label: "Revenue", ref: revenueRef, initial: wholeDollars.format(0) },
            { label: "Cashback", ref: cashbackRef, initial: wholeDollars.format(0) },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4">
              <span className="text-[13px] text-gray-600">{row.label}</span>
              {/* Tabular figures: proportional digits change width as they tick,
                  which reads as the number twitching rather than counting. */}
              <span
                ref={row.ref}
                className="text-[15px] font-medium tabular-nums tracking-[-0.01em]"
              >
                {row.initial}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              ref={barRef}
              className="h-full w-full origin-left rounded-full bg-pink"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="mt-2 flex justify-between">
            {DAYS.map((day, index) => (
              <span
                key={`${day}-${index}`}
                ref={(element) => {
                  dayRefs.current[index] = element;
                }}
                data-reached="false"
                className="text-[10px] font-medium text-gray-600/40 transition-colors duration-300 ease-out data-[reached=true]:text-gray-400 last:data-[reached=true]:text-pink"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p
        className={[
          "mt-3 text-center text-[12px] text-gray-600 transition-opacity duration-500 ease-out",
          isSettled && phase !== "resetting" ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        Settled every Friday, automatically.
      </p>
    </div>
  );
}
