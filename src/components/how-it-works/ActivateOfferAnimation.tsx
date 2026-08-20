"use client";

import { useRef, useState } from "react";

import { OfferMap, OfferProfile } from "@/components/how-it-works/ConsumerMap";
import { PointerCursor } from "@/components/how-it-works/PointerCursor";
import {
  STEP_FRAME_CLASS,
  easeInOutCubic,
  segment,
  useStepAnimation,
} from "@/components/how-it-works/useStepAnimation";
import { CONSUMER_DEMO, FEATURED_OFFER } from "@/data/consumer-flow";

/**
 * Activate: starts on Discover's end state — map behind, profile card open.
 * Activate is pressed on that card, the card flips away, and a route draws
 * along the streets from the customer to the business.
 */

const PIN_COUNT = CONSUMER_DEMO.nearby.length;

const START_PAUSE_MS = 480;
const TO_BUTTON_MS = 600;
const PRESS_MS = 220;
const PRESS_HOLD_MS = 220;
const FLIP_MS = 640;
const ROUTE_MS = 1100;
const HOLD_MS = 2600;

const TO_BUTTON_AT = START_PAUSE_MS;
const PRESS_AT = TO_BUTTON_AT + TO_BUTTON_MS;
const FLIP_AT = PRESS_AT + PRESS_MS + PRESS_HOLD_MS;
const ROUTE_AT = FLIP_AT + FLIP_MS;
const CYCLE_MS = ROUTE_AT + ROUTE_MS + HOLD_MS;

const CURSOR_FADE_IN_MS = 220;
const TIP_X = 5;
const TIP_Y = 3;

const YOU = CONSUMER_DEMO.you;
const BIZ = FEATURED_OFFER;
/** Manhattan path along the street grid, you → business. */
const ROUTE_D = `M ${YOU.x} ${YOU.y} L 22 ${YOU.y} L 22 30 L ${BIZ.x} 30 L ${BIZ.x} ${BIZ.y}`;

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function centerIn(root: HTMLElement, target: HTMLElement) {
  const rootBox = root.getBoundingClientRect();
  const targetBox = target.getBoundingClientRect();
  return {
    x: targetBox.left - rootBox.left + targetBox.width / 2,
    y: targetBox.top - rootBox.top + targetBox.height / 2,
  };
}

export function ActivateOfferAnimation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const activateRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const routeLength = useRef(0);

  const cursorPos = useRef({ x: 210, y: 240 });
  const approachFrom = useRef({ x: 210, y: 240, key: "" });

  const [pressed, setPressed] = useState(false);

  const paintCursor = (x: number, y: number, opacity: number, nudgeY = 0) => {
    cursorPos.current = { x, y };
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.opacity = String(opacity);
    cursor.style.transform = `translate(${x - TIP_X}px, ${y + nudgeY - TIP_Y}px)`;
  };

  const moveToward = (key: string, target: { x: number; y: number }, progress: number) => {
    if (approachFrom.current.key !== key) {
      approachFrom.current = { x: cursorPos.current.x, y: cursorPos.current.y, key };
    }
    const eased = easeInOutCubic(progress);
    return {
      x: lerp(approachFrom.current.x, target.x, eased),
      y: lerp(approachFrom.current.y, target.y, eased),
    };
  };

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: (elapsed) => {
      const nextPressed = elapsed >= PRESS_AT && elapsed < FLIP_AT;
      setPressed((current) => (current === nextPressed ? current : nextPressed));

      const sheet = sheetRef.current;
      if (sheet) {
        const turn = easeInOutCubic(segment(elapsed, FLIP_AT, FLIP_MS));
        sheet.style.transform = `rotateY(${turn * 180}deg)`;
        sheet.style.opacity = String(1 - Math.max((turn - 0.55) / 0.45, 0));
        sheet.style.pointerEvents = turn > 0 ? "none" : "auto";
      }

      const route = routeRef.current;
      if (route) {
        if (routeLength.current === 0) {
          routeLength.current = route.getTotalLength();
          route.style.strokeDasharray = String(routeLength.current);
        }
        const drawn = easeInOutCubic(segment(elapsed, ROUTE_AT, ROUTE_MS));
        route.style.strokeDashoffset = String(routeLength.current * (1 - drawn));
      }

      const card = cardRef.current;
      const cursor = cursorRef.current;
      if (!card || !cursor) return;

      let opacity = 0;
      if (elapsed >= TO_BUTTON_AT && elapsed < FLIP_AT) {
        opacity =
          elapsed < TO_BUTTON_AT + CURSOR_FADE_IN_MS
            ? (elapsed - TO_BUTTON_AT) / CURSOR_FADE_IN_MS
            : 1;
      } else if (elapsed >= FLIP_AT) {
        opacity = 1 - segment(elapsed, FLIP_AT, 200);
      }

      if (elapsed < FLIP_AT && activateRef.current && elapsed >= TO_BUTTON_AT) {
        const target = centerIn(card, activateRef.current);
        const approach = segment(elapsed, TO_BUTTON_AT, TO_BUTTON_MS);
        const point = approach < 1 ? moveToward("activate", target, approach) : target;
        paintCursor(point.x, point.y, opacity, nextPressed ? 3 : 0);
        return;
      }

      paintCursor(cursorPos.current.x, cursorPos.current.y, opacity);
    },
    onReducedMotion: () => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.opacity = "0";
      const sheet = sheetRef.current;
      if (sheet) {
        sheet.style.opacity = "0";
        sheet.style.transform = "rotateY(180deg)";
      }
      const route = routeRef.current;
      if (route) {
        if (routeLength.current === 0) {
          routeLength.current = route.getTotalLength();
          route.style.strokeDasharray = String(routeLength.current);
        }
        route.style.strokeDashoffset = "0";
      }
      setPressed(false);
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="The Corner's profile open on the map. Activate is pressed, the card flips, and a route draws along the streets to the business."
      className={STEP_FRAME_CLASS}
    >
      <div
        ref={cardRef}
        className="relative h-full overflow-hidden rounded-3xl"
        style={{ perspective: "1100px" }}
      >
        <OfferMap arrived={PIN_COUNT} />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-[11] h-full w-full"
          aria-hidden="true"
        >
          <path
            ref={routeRef}
            d={ROUTE_D}
            fill="none"
            stroke="var(--color-pink)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={200}
            strokeDashoffset={200}
          />
        </svg>

        <div
          ref={sheetRef}
          className="absolute inset-x-3 bottom-3 z-20 origin-center will-change-transform"
          style={{ transformStyle: "preserve-3d", transform: "rotateY(0deg)" }}
        >
          <div
            className="rounded-2xl bg-white border border-black/10 shadow-[0_8px_24px_0_rgba(0,0,0,0.10)] px-4 py-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            <OfferProfile activateRef={activateRef} pressed={pressed} />
          </div>
        </div>

        <div
          ref={cursorRef}
          className="pointer-events-none absolute top-0 left-0 z-30 opacity-0 will-change-transform"
        >
          <PointerCursor />
        </div>
      </div>
    </div>
  );
}
