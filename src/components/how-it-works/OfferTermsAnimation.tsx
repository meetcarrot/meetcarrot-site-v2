"use client";

import { useRef, useState } from "react";

import {
  STEP_CARD_CLASS,
  easeOutCubic,
  segment,
  useStepAnimation,
  wholeDollars,
} from "@/components/how-it-works/useStepAnimation";

/**
 * Step 1's illustration: the merchant dialling in their own offer, which then
 * resolves into the offer a customer will actually see.
 *
 * The point of the step is control, so the parameters fill one after another —
 * that reads as someone deciding, where filling together reads as a dashboard
 * loading. Max cashback leads because it is the number merchants care about
 * and the one the offer is named after.
 *
 * The setup card and the preview are stacked in the same fixed box and
 * cross-faded, so the handoff costs no height and the card beneath never jumps.
 */

const HEADLINE_RATE = 12;

/** Filled in order. The headline rate leads; the guardrails follow. */
const INPUTS = [
  { label: "Max cashback", to: HEADLINE_RATE, format: (v: number) => `${v}%` },
  { label: "Min spend", to: 25, format: (v: number) => wholeDollars.format(v) },
  { label: "Max spend", to: 200, format: (v: number) => wholeDollars.format(v) },
  { label: "Customer cap", to: 150, format: (v: number) => `${v}/mo` },
];

const FILL_MS = 720;
const STAGGER_MS = 560;
const READY_AT = STAGGER_MS * (INPUTS.length - 1) + FILL_MS + 260;
const PREVIEW_AT = READY_AT + 520;
const CYCLE_MS = PREVIEW_AT + 3000;

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

export function OfferTermsAnimation() {
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isReady, setIsReady] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: (elapsed) => {
      INPUTS.forEach((input, index) => {
        const progress = easeOutCubic(segment(elapsed, index * STAGGER_MS, FILL_MS));
        const value = valueRefs.current[index];
        if (value) value.textContent = input.format(Math.round(input.to * progress));
        const track = trackRefs.current[index];
        if (track) track.style.transform = `scaleX(${progress})`;
      });
      const ready = elapsed >= READY_AT;
      const preview = elapsed >= PREVIEW_AT;
      setIsReady((current) => (current === ready ? current : ready));
      setShowPreview((current) => (current === preview ? current : preview));
    },
    onReducedMotion: () => {
      INPUTS.forEach((input, index) => {
        const value = valueRefs.current[index];
        if (value) value.textContent = input.format(input.to);
        const track = trackRefs.current[index];
        if (track) track.style.transform = "scaleX(1)";
      });
      setIsReady(true);
      setShowPreview(true);
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="A merchant setting max cashback, minimum spend, maximum spend, and a monthly customer cap, then the finished offer previewing as a customer would see it."
      className="relative w-full max-w-84 mx-auto"
    >
      <div
        className={[
          STEP_CARD_CLASS,
          "transition-opacity duration-500 ease-out",
          showPreview ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium">Your offer</p>
          <span
            className={[
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-300 ease-out",
              isReady ? "bg-[#e8f6ed] text-[#137a3c]" : "bg-gray-100 text-gray-600/70",
            ].join(" ")}
          >
            {isReady ? (
              <>
                <CheckIcon />
                Ready
              </>
            ) : (
              "Setting up"
            )}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {INPUTS.map((input, index) => (
            <div key={input.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[13px] text-gray-600">{input.label}</span>
                {/* Tabular figures: proportional digits change width as they
                    count, which reads as twitching rather than counting. */}
                <span
                  ref={(element) => {
                    valueRefs.current[index] = element;
                  }}
                  className="text-[15px] font-medium tabular-nums tracking-[-0.01em]"
                >
                  {input.format(0)}
                </span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  ref={(element) => {
                    trackRefs.current[index] = element;
                  }}
                  className="h-full w-full origin-left rounded-full bg-pink"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The offer as a customer meets it — the thing the parameters add up to. */}
      <div
        className={[
          "absolute inset-x-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
          showPreview ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95",
        ].join(" ")}
        aria-hidden={!showPreview}
      >
        <div className={[STEP_CARD_CLASS, "text-center"].join(" ")}>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-pink-dark">
            Your offer is ready
          </p>
          <p className="mt-3 font-poly-sans-wide text-[40px] leading-none tracking-[-0.02em]">
            {HEADLINE_RATE}% back
          </p>
          <p className="mt-3 text-[12px] text-gray-600">
            {wholeDollars.format(25)} minimum · up to {wholeDollars.format(200)}
          </p>
          <div className="mt-4 rounded-full bg-gray-100 py-2 text-[12px] font-medium">
            Live to 150 customers a month
          </div>
        </div>
      </div>
    </div>
  );
}
