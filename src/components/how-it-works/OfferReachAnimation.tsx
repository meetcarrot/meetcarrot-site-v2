"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import {
  easeOutCubic,
  segment,
  useStepAnimation,
} from "@/components/how-it-works/useStepAnimation";

/**
 * Step 2's illustration: the offer leaving the business and reaching people
 * across the city, one after another, on a loop.
 *
 * The map is a rendered isometric plate rather than a CSS-tilted plane. An
 * earlier version rotated a flat div with `rotateX` and then counter-rotated
 * every avatar to keep faces upright, which fought itself and read as skew
 * rather than depth. With the perspective baked into the artwork, everything on
 * top is plain 2D and simply sits where it is put.
 *
 * The arcs travel outward, from the shop to the people. Drawn inward they read
 * as footfall, which is step 3's claim — this step is distribution, so the
 * direction has to say "sent".
 *
 * Faces are the review-tile crops already in the repo, so the people here are
 * the same people quoted further down the page rather than a second cast.
 */

/**
 * Percent coordinates over the plate. Spread around the map so they read as
 * different parts of a city rather than a ring around the shop.
 */
const CUSTOMERS = [
  { photo: "/images/img-2.jpg", x: 15, y: 30 },
  { photo: "/images/img-5.jpg", x: 78, y: 20 },
  { photo: "/images/img-7.jpg", x: 90, y: 55 },
  { photo: "/images/img-3.jpg", x: 58, y: 86 },
  { photo: "/images/img-9.jpg", x: 14, y: 68 },
];

/** The shop sits slightly above centre so it reads as standing on the plate. */
const SHOP = { x: 50, y: 44 };

const REACH_TO = 1240;
const REACH_MS = 3200;
const SEND_AT = 700;
const SEND_STAGGER = 460;
/** Arc draw time; the avatar lands as its arc completes. */
const DRAW_MS = 520;
const CYCLE_MS = SEND_AT + SEND_STAGGER * CUSTOMERS.length + DRAW_MS + 1800;

/** Quadratic arc from the shop out to a customer, bowed off the straight run. */
function arcPath(x: number, y: number) {
  const dx = x - SHOP.x;
  const dy = y - SHOP.y;
  const midX = (SHOP.x + x) / 2;
  const midY = (SHOP.y + y) / 2;
  // Perpendicular offset. A straight line reads as a fixed connection; a bow
  // reads as something that travelled.
  return `M ${SHOP.x} ${SHOP.y} Q ${midX - dy * 0.22} ${midY + dx * 0.22} ${x} ${y}`;
}

export function OfferReachAnimation() {
  const reachRef = useRef<HTMLSpanElement>(null);
  const [sent, setSent] = useState(0);

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: (elapsed) => {
      const progress = easeOutCubic(segment(elapsed, 0, REACH_MS));
      if (reachRef.current) {
        reachRef.current.textContent = Math.round(REACH_TO * progress).toLocaleString("en-US");
      }
      const landed = CUSTOMERS.filter(
        (_, index) => elapsed >= SEND_AT + index * SEND_STAGGER,
      ).length;
      setSent((current) => (current === landed ? current : landed));
    },
    onReducedMotion: () => {
      if (reachRef.current) reachRef.current.textContent = REACH_TO.toLocaleString("en-US");
      setSent(CUSTOMERS.length);
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="An offer leaving a business on a city map and reaching customers in different parts of the city."
      className="w-full max-w-72 mx-auto"
    >
      <div className="relative aspect-square w-full">
        <Image
          src="/images/how-it-works/map-plate.png"
          alt=""
          fill
          loading="lazy"
          sizes="288px"
          className="object-contain"
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {CUSTOMERS.map((customer, index) => (
            <path
              key={customer.photo}
              d={arcPath(customer.x, customer.y)}
              fill="none"
              stroke="var(--color-pink)"
              strokeWidth="0.8"
              strokeLinecap="round"
              // `pathLength` normalises every arc to 1 so they all draw at the
              // same rate regardless of how far the customer is.
              pathLength={1}
              strokeDasharray="1"
              className="transition-[stroke-dashoffset,opacity] duration-500 ease-out"
              style={{
                strokeDashoffset: index < sent ? 0 : 1,
                opacity: index < sent ? 0.7 : 0,
              }}
            />
          ))}
        </svg>

        <div
          className="absolute w-[26%]"
          style={{ left: `${SHOP.x}%`, top: `${SHOP.y}%`, transform: "translate(-50%, -62%)" }}
        >
          <Image
            src="/images/how-it-works/map-business.png"
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="h-auto w-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.10)]"
          />
        </div>

        {CUSTOMERS.map((customer, index) => (
          <div
            key={customer.photo}
            className={[
              "absolute size-11 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white shadow-[0_6px_16px_0_rgba(0,0,0,0.18)] transition-all duration-500 ease-out",
              index < sent ? "opacity-100 scale-100" : "opacity-0 scale-75",
            ].join(" ")}
            style={{ left: `${customer.x}%`, top: `${customer.y}%` }}
          >
            {/* Plain <img>: decorative crops of images next/image has already
                optimised elsewhere on the page. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customer.photo}
              alt=""
              loading="lazy"
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <p className="mt-1 text-center text-[13px] text-gray-600">
        Sent to{" "}
        <span ref={reachRef} className="font-medium tabular-nums text-black">
          0
        </span>{" "}
        customers nearby
      </p>
    </div>
  );
}
