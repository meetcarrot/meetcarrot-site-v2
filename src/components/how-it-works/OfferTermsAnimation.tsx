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
 * Step 1's illustration: the merchant dialling in their own offer.
 *
 * The point of the step is control, so the four inputs fill one after another —
 * the viewer reads it as someone deciding, not as a dashboard loading. When the
 * last one lands the card flips to a ready state, which is the handoff into
 * step 2.
 */

const INPUTS = [
  { label: "Max cashback", to: 12, format: (v: number) => `${v}%` },
  { label: "Min spend", to: 25, format: (v: number) => wholeDollars.format(v) },
  { label: "Max amount", to: 50, format: (v: number) => wholeDollars.format(v) },
  { label: "Customer cap", to: 200, format: (v: number) => `${v}/mo` },
];

const FILL_MS = 800;
const STAGGER_MS = 600;
const READY_AT = STAGGER_MS * (INPUTS.length - 1) + FILL_MS + 300;
const CYCLE_MS = READY_AT + 2800;

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
      setIsReady((current) => (current === ready ? current : ready));
    },
    onReducedMotion: () => {
      INPUTS.forEach((input, index) => {
        const value = valueRefs.current[index];
        if (value) value.textContent = input.format(input.to);
        const track = trackRefs.current[index];
        if (track) track.style.transform = "scaleX(1)";
      });
      setIsReady(true);
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="A merchant setting max cashback, minimum spend, max amount, and a monthly customer cap, then the offer showing as ready."
      className="w-full"
    >
      <div className={STEP_CARD_CLASS}>
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

      <p
        className={[
          "mt-3 text-center text-[12px] font-medium transition-opacity duration-500 ease-out",
          isReady ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        Your offer is ready.
      </p>
    </div>
  );
}
