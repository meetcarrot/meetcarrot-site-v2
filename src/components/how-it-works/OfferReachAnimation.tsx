"use client";

import { useRef, useState } from "react";

import {
  easeOutCubic,
  segment,
  useStepAnimation,
} from "@/components/how-it-works/useStepAnimation";

/**
 * Step 2's illustration: the offer going out across a city and pulling people
 * back toward the business.
 *
 * Customers drift in around a central business marker, each joined to it by a
 * line that draws inward. The direction of travel is the whole point — a ring
 * of faces alone reads as an audience, whereas arrows converging on the shop
 * reads as footfall, which is what the step actually claims.
 *
 * Faces are the review-tile crops already in the repo, so the people here are
 * the same people quoted further down the page rather than a second cast.
 */

/** Positions are percentages of the square field, measured from its centre. */
const CUSTOMERS = [
  { photo: "/images/img-2.jpg", x: 12, y: 18 },
  { photo: "/images/img-5.jpg", x: 78, y: 10 },
  { photo: "/images/img-7.jpg", x: 88, y: 58 },
  { photo: "/images/img-3.jpg", x: 62, y: 86 },
  { photo: "/images/img-9.jpg", x: 20, y: 78 },
  { photo: "/images/img-6.jpg", x: 2, y: 48 },
];

const REACH_TO = 1240;
const REACH_MS = 3000;
const ARRIVE_AT = 500;
const ARRIVE_STAGGER = 380;
const ARRIVE_MS = 700;
const CYCLE_MS = ARRIVE_AT + ARRIVE_STAGGER * CUSTOMERS.length + ARRIVE_MS + 2200;

const CENTER = 50;

export function OfferReachAnimation() {
  const reachRef = useRef<HTMLSpanElement>(null);
  const [arrived, setArrived] = useState(0);

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: (elapsed) => {
      const progress = easeOutCubic(segment(elapsed, 0, REACH_MS));
      if (reachRef.current) {
        reachRef.current.textContent = Math.round(REACH_TO * progress).toLocaleString("en-US");
      }
      const landed = CUSTOMERS.filter(
        (_, index) => elapsed >= ARRIVE_AT + index * ARRIVE_STAGGER,
      ).length;
      setArrived((current) => (current === landed ? current : landed));
    },
    onReducedMotion: () => {
      if (reachRef.current) reachRef.current.textContent = REACH_TO.toLocaleString("en-US");
      setArrived(CUSTOMERS.length);
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="A cashback offer reaching over a thousand nearby customers, with people across the city heading toward the business."
      className="w-full max-w-84 mx-auto"
    >
      <div className="relative aspect-square w-full">
        {/* Connector lines sit under the avatars. Drawn in a 100x100 user-space
            box so the coordinates match the percentage positions above. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {CUSTOMERS.map((customer, index) => (
            <line
              key={customer.photo}
              x1={customer.x + 6}
              y1={customer.y + 6}
              x2={CENTER}
              y2={CENTER}
              stroke="var(--color-pink)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="60"
              className="transition-[stroke-dashoffset,opacity] duration-700 ease-out"
              style={{
                strokeDashoffset: index < arrived ? 0 : 60,
                opacity: index < arrived ? 0.35 : 0,
              }}
            />
          ))}
        </svg>

        {/* The business, dead centre — everything else points at it. */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-2xl bg-white border border-black/10 shadow-[0_8px_24px_0_rgba(0,0,0,0.10)] px-4 py-3 text-center">
            <p className="text-[11px] text-gray-600">Your offer</p>
            <p className="text-[18px] font-medium leading-tight">12% back</p>
          </div>
        </div>

        {CUSTOMERS.map((customer, index) => (
          <div
            key={customer.photo}
            className={[
              "absolute size-12 rounded-full overflow-hidden border-2 border-white shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] transition-all duration-700 ease-out",
              index < arrived ? "opacity-100 scale-100" : "opacity-0 scale-75",
            ].join(" ")}
            style={{ left: `${customer.x}%`, top: `${customer.y}%` }}
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

      <p className="mt-1 text-center text-[13px] text-gray-600">
        Shown to{" "}
        <span ref={reachRef} className="font-medium tabular-nums text-black">
          0
        </span>{" "}
        customers nearby
      </p>
    </div>
  );
}
