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
import { CONSUMER_DEMO } from "@/data/consumer-flow";

/**
 * Discover: a map of nearby offer percentages. A pointer taps the merchant's
 * pin and a business profile slides up, with Activate waiting on it.
 */

const PINS = CONSUMER_DEMO.nearby;

const STAGGER_MS = 240;
const MAP_HOLD_MS = 480;
const TO_PIN_MS = 600;
const PRESS_MS = 200;
const PRESS_HOLD_MS = 180;
const PROFILE_HOLD_MS = 2400;

const PINS_READY_AT = STAGGER_MS * PINS.length;
const TO_PIN_AT = PINS_READY_AT + MAP_HOLD_MS;
const PRESS_AT = TO_PIN_AT + TO_PIN_MS;
const PROFILE_AT = PRESS_AT + PRESS_MS + PRESS_HOLD_MS;
const CYCLE_MS = PROFILE_AT + PROFILE_HOLD_MS;

const CURSOR_FADE_IN_MS = 220;
const TIP_X = 5;
const TIP_Y = 3;

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

export function FindBusinessAnimation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorPos = useRef({ x: 180, y: 180 });
  const approachFrom = useRef({ x: 180, y: 180, key: "" });

  const [arrived, setArrived] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
      const nextArrived = Math.min(Math.floor(elapsed / STAGGER_MS) + 1, PINS.length);
      const nextPressed = elapsed >= PRESS_AT && elapsed < PROFILE_AT;
      const nextOpen = elapsed >= PROFILE_AT;

      setArrived((current) => (current === nextArrived ? current : nextArrived));
      setPressed((current) => (current === nextPressed ? current : nextPressed));
      setProfileOpen((current) => (current === nextOpen ? current : nextOpen));

      const card = cardRef.current;
      const cursor = cursorRef.current;
      if (!card || !cursor) return;

      let opacity = 0;
      if (elapsed >= TO_PIN_AT && elapsed < PROFILE_AT) {
        opacity =
          elapsed < TO_PIN_AT + CURSOR_FADE_IN_MS
            ? (elapsed - TO_PIN_AT) / CURSOR_FADE_IN_MS
            : 1;
      } else if (elapsed >= PROFILE_AT) {
        opacity = 1 - segment(elapsed, PROFILE_AT, 240);
      }

      if (pinRef.current && elapsed >= TO_PIN_AT) {
        const target = centerIn(card, pinRef.current);
        const approach = segment(elapsed, TO_PIN_AT, TO_PIN_MS);
        const point = approach < 1 ? moveToward("pin", target, approach) : target;
        paintCursor(point.x, point.y, opacity, nextPressed ? 3 : 0);
        return;
      }

      paintCursor(cursorPos.current.x, cursorPos.current.y, opacity);
    },
    onReducedMotion: () => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.opacity = "0";
      setArrived(PINS.length);
      setPressed(false);
      setProfileOpen(true);
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="A map of nearby cashback offers. Tapping The Corner's 20% pin opens its business profile with an Activate button."
      className={STEP_FRAME_CLASS}
    >
      <div ref={cardRef} className="relative h-full overflow-hidden rounded-3xl">
        <OfferMap arrived={arrived} featuredPressed={pressed} featuredRef={pinRef} />

        <div
          className={[
            "absolute inset-x-3 bottom-3 z-20 rounded-2xl bg-white border border-black/10 shadow-[0_8px_24px_0_rgba(0,0,0,0.10)] px-4 py-4 transition-all duration-300 ease-out",
            profileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none",
          ].join(" ")}
        >
          <OfferProfile />
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
