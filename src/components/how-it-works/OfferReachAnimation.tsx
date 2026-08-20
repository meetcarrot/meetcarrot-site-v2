"use client";

import { useRef, useState } from "react";

import {
  STEP_FRAME_CLASS,
  easeOutCubic,
  segment,
  useStepAnimation,
} from "@/components/how-it-works/useStepAnimation";

/**
 * Step 2's illustration: targeted offers going out to nearby customers.
 *
 * The centre card is the offer being sent right now. Each customer gets their
 * own rate — the number changes, a line draws out to them, and as soon as it
 * lands the next amount appears and the next line kicks off. Direction matters:
 * the dash runs from the offer to the person, not the other way around.
 *
 * Faces are the review-tile crops already in the repo, so the people here are
 * the same people quoted further down the page rather than a second cast.
 */

/** Positions are percentages of the map, measured from its top-left. */
const CUSTOMERS = [
  { photo: "/images/img-2.jpg", x: 12, y: 18, rate: 15 },
  { photo: "/images/img-5.jpg", x: 78, y: 10, rate: 25 },
  { photo: "/images/img-7.jpg", x: 88, y: 58, rate: 10 },
  { photo: "/images/img-3.jpg", x: 62, y: 86, rate: 35 },
  { photo: "/images/img-9.jpg", x: 20, y: 78, rate: 5 },
  { photo: "/images/img-6.jpg", x: 2, y: 48, rate: 20 },
] as const;

const REACH_TO = 1240;

/** Let the new amount sit long enough to read before the line leaves. */
const SHOW_MS = 350;
/** Time for a line to travel from the offer to the customer. */
const DRAW_MS = 800;
const BEAT_MS = SHOW_MS + DRAW_MS;
const START_AT = 180;
const HOLD_MS = 2200;
const CYCLE_MS = START_AT + BEAT_MS * CUSTOMERS.length + HOLD_MS;
const REACH_MS = START_AT + BEAT_MS * CUSTOMERS.length;

const CENTER = 50;
/** Long enough to cover a corner-to-centre line in the 100×100 viewBox. */
const LINE_LENGTH = 80;

export function OfferReachAnimation() {
  const reachRef = useRef<HTMLSpanElement>(null);
  const [arrived, setArrived] = useState(0);
  const [offerIndex, setOfferIndex] = useState(0);

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: (elapsed) => {
      const progress = easeOutCubic(segment(elapsed, 0, REACH_MS));
      if (reachRef.current) {
        reachRef.current.textContent = Math.round(REACH_TO * progress).toLocaleString("en-US");
      }

      const t = elapsed - START_AT;
      if (t < 0) {
        setOfferIndex(0);
        setArrived(0);
        return;
      }

      const index = Math.min(Math.floor(t / BEAT_MS), CUSTOMERS.length - 1);
      const local = t - index * BEAT_MS;
      const drawn = index + (local >= SHOW_MS ? 1 : 0);

      setOfferIndex((current) => (current === index ? current : index));
      setArrived((current) => (current === drawn ? current : drawn));
    },
    onReducedMotion: () => {
      if (reachRef.current) reachRef.current.textContent = REACH_TO.toLocaleString("en-US");
      setArrived(CUSTOMERS.length);
      setOfferIndex(CUSTOMERS.length - 1);
    },
  });

  const rate = CUSTOMERS[offerIndex].rate;

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Targeted cashback offers going out to nearby customers, each person receiving a different offer amount."
      className={`${STEP_FRAME_CLASS} flex flex-col`}
    >
      <div className="relative min-h-0 flex-1">
        {/* Lines draw from the offer out to each person. Dash offset is measured
            from x1,y1, so the offer has to be the start of the path. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {CUSTOMERS.map((customer, index) => (
            <line
              key={customer.photo}
              x1={CENTER}
              y1={CENTER}
              x2={customer.x + 6}
              y2={customer.y + 6}
              stroke="var(--color-pink)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray={LINE_LENGTH}
              className="transition-[stroke-dashoffset,opacity] ease-out"
              style={{
                transitionDuration: `${DRAW_MS}ms`,
                strokeDashoffset: index < arrived ? 0 : LINE_LENGTH,
                opacity: index < arrived ? 0.35 : 0,
              }}
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-2xl bg-white border border-black/10 shadow-[0_8px_24px_0_rgba(0,0,0,0.10)] px-4 py-3 text-center">
            <p className="text-[11px] text-gray-600">Promoted Offer</p>
            <p className="text-[18px] font-medium leading-tight tabular-nums">
              {rate}% back
            </p>
          </div>
        </div>

        {CUSTOMERS.map((customer, index) => (
          <div
            key={customer.photo}
            className={[
              "absolute size-12 rounded-full overflow-hidden border-2 border-white shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] transition-all ease-out",
              index < arrived ? "opacity-100 scale-100" : "opacity-0 scale-75",
            ].join(" ")}
            style={{
              left: `${customer.x}%`,
              top: `${customer.y}%`,
              transitionDuration: `${DRAW_MS}ms`,
            }}
          >
            {/* Plain <img>: these are decorative crops of images next/image has
                already optimised elsewhere on the page. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customer.photo}
              alt=""
              loading="lazy"
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <p className="shrink-0 pt-2 text-center text-[13px] text-gray-600">
        Promoted to{" "}
        <span ref={reachRef} className="font-medium tabular-nums text-black">
          0
        </span>{" "}
        customers nearby
      </p>
    </div>
  );
}
