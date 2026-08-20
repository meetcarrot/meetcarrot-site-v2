"use client";

import { useRef, useState } from "react";

import {
  STEP_FRAME_CLASS,
  easeInOutCubic,
  easeOutCubic,
  segment,
  useStepAnimation,
  wholeDollars,
} from "@/components/how-it-works/useStepAnimation";

/**
 * Step 1's illustration: the merchant dialling in their own offer.
 *
 * Same slider face as the category-page calculator (title, display value,
 * pink range), scaled to the step card. One parameter at a time: a pointer
 * drags the thumb to the target, the card then becomes an offer review, the
 * pointer presses Promote, and the offer goes live before the loop restarts.
 */

const PARAMS = [
  {
    label: "Maximum Cashback Rate",
    to: 20,
    max: 25,
    format: (value: number) => `${value}%`,
  },
  {
    label: "Minimum Spend",
    to: 65,
    max: 100,
    format: (value: number) => wholeDollars.format(value),
  },
  {
    label: "Maximum Cashback Amount",
    to: 15,
    max: 50,
    format: (value: number) => wholeDollars.format(value),
  },
  {
    label: "Monthly Customer Cap",
    to: 90,
    max: 200,
    format: (value: number) => `${value}`,
  },
] as const;

type Scene = "param" | "review" | "success";

const VALUE_APPROACH_MS = 460;
const VALUE_HOLD_MS = 160;
const THUMB_APPROACH_MS = 360;
const DRAG_MS = 880;
const HOLD_MS = 300;
const PARAM_MS =
  VALUE_APPROACH_MS + VALUE_HOLD_MS + THUMB_APPROACH_MS + DRAG_MS + HOLD_MS;
const THUMB_AT = VALUE_APPROACH_MS + VALUE_HOLD_MS;
const DRAG_AT = THUMB_AT + THUMB_APPROACH_MS;

/** Pointer-tip offset inside the 28×28 SVG, so the arrow lands on the target. */
const TIP_X = 5;
const TIP_Y = 3;
const PARAMS_MS = PARAM_MS * PARAMS.length;

const REVIEW_IN_MS = 360;
const REVIEW_PAUSE_MS = 280;
const TO_BUTTON_MS = 560;
const PRESS_MS = 220;
const PRESS_HOLD_MS = 200;
const SUCCESS_FADE_MS = 280;
const SUCCESS_HOLD_MS = 2400;

const REVIEW_AT = PARAMS_MS;
const TO_BUTTON_AT = REVIEW_AT + REVIEW_IN_MS + REVIEW_PAUSE_MS;
const PRESS_AT = TO_BUTTON_AT + TO_BUTTON_MS;
const SUCCESS_AT = PRESS_AT + PRESS_MS + PRESS_HOLD_MS;
const CYCLE_MS = SUCCESS_AT + SUCCESS_FADE_MS + SUCCESS_HOLD_MS;

const CURSOR_FADE_IN_MS = 220;

/**
 * White card behind the slider. Flip to `true` to restore the tile without
 * touching layout — the rounded frame and padding stay either way.
 */
const SHOW_TILE = false;
const TILE_FILL = SHOW_TILE ? "bg-white" : "bg-transparent";

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

function fillTrack(track: HTMLDivElement, percent: number) {
  track.style.background = `linear-gradient(to right, var(--color-pink) 0%, var(--color-pink) ${percent}%, var(--color-gray-200) ${percent}%, var(--color-gray-200) 100%)`;
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function PointerCursor() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="drop-shadow-sm">
      <path
        d="M4.2 2.8v17.2l4.4-4.3 2.7 6.5 2.5-1-2.7-6.6H17L4.2 2.8z"
        fill="white"
        stroke="#2a2638"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OfferTermsAnimation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const promoteRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorPos = useRef({ x: 210, y: 92 });
  const approachFrom = useRef({ x: 210, y: 92, key: "" });

  const [scene, setScene] = useState<Scene>("param");
  const [paramIndex, setParamIndex] = useState(0);
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
      const nextScene: Scene =
        elapsed >= SUCCESS_AT ? "success" : elapsed >= REVIEW_AT ? "review" : "param";
      const nextIndex = Math.min(Math.floor(elapsed / PARAM_MS), PARAMS.length - 1);
      const nextPressed = elapsed >= PRESS_AT && elapsed < SUCCESS_AT;

      setScene((current) => (current === nextScene ? current : nextScene));
      setParamIndex((current) => (current === nextIndex ? current : nextIndex));
      setPressed((current) => (current === nextPressed ? current : nextPressed));

      const param = PARAMS[nextIndex];
      const local = elapsed - nextIndex * PARAM_MS;
      const drag = easeOutCubic(segment(local, DRAG_AT, DRAG_MS));
      const fillPercent = nextScene === "param" ? (param.to / param.max) * drag * 100 : 0;

      const value = valueRef.current;
      if (value && nextScene === "param") {
        value.textContent = param.format(Math.round(param.to * drag));
      }

      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (track) fillTrack(track, fillPercent);
      if (thumb) thumb.style.left = `${fillPercent}%`;

      const card = cardRef.current;
      const cursor = cursorRef.current;
      if (!card || !cursor) return;

      let opacity = 1;
      if (elapsed < CURSOR_FADE_IN_MS) opacity = elapsed / CURSOR_FADE_IN_MS;
      if (elapsed >= SUCCESS_AT) {
        opacity = 1 - segment(elapsed, SUCCESS_AT, SUCCESS_FADE_MS);
      }

      if (nextScene === "param" && thumb && valueRef.current) {
        const onValue = local < THUMB_AT;
        const target = centerIn(card, onValue ? valueRef.current : thumb);
        const approach = onValue
          ? segment(local, 0, VALUE_APPROACH_MS)
          : segment(local, THUMB_AT, THUMB_APPROACH_MS);
        const key = onValue ? `value-${nextIndex}` : `thumb-${nextIndex}`;
        const followingThumb = local >= DRAG_AT;
        const point = followingThumb || approach >= 1 ? target : moveToward(key, target, approach);
        paintCursor(point.x, point.y, opacity);
        return;
      }

      if (nextScene === "review" && promoteRef.current) {
        const target = centerIn(card, promoteRef.current);
        const approach = segment(elapsed, TO_BUTTON_AT, TO_BUTTON_MS);
        const point =
          elapsed < TO_BUTTON_AT
            ? cursorPos.current
            : approach < 1
              ? moveToward("promote", target, approach)
              : target;
        paintCursor(point.x, point.y, opacity, nextPressed ? 3 : 0);
        return;
      }

      paintCursor(cursorPos.current.x, cursorPos.current.y, opacity);
    },
    onReducedMotion: () => {
      const last = PARAMS[PARAMS.length - 1];
      const value = valueRef.current;
      if (value) value.textContent = last.format(last.to);
      const track = trackRef.current;
      if (track) fillTrack(track, 100);
      const thumb = thumbRef.current;
      if (thumb) thumb.style.left = "100%";
      const cursor = cursorRef.current;
      if (cursor) cursor.style.opacity = "0";
      setScene("success");
      setParamIndex(PARAMS.length - 1);
      setPressed(false);
    },
  });

  const param = PARAMS[paramIndex];

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="A merchant setting maximum cashback rate, minimum spend, maximum cashback amount, and a monthly customer cap with a slider, then promoting the offer until it goes live."
      className={STEP_FRAME_CLASS}
    >
      <div
        ref={cardRef}
        className={`relative h-full overflow-hidden rounded-3xl ${TILE_FILL}`}
      >
        <div
          className={[
            `absolute inset-0 flex flex-col items-center justify-center gap-6 ${TILE_FILL} px-7 py-8 transition-opacity duration-300 ease-out`,
            scene === "param" ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
          ].join(" ")}
          aria-hidden={scene !== "param"}
        >
          <p className="font-medium text-[14px] md:text-[16px] text-center leading-snug">
            {param.label}
          </p>
          <p
            ref={valueRef}
            className="font-poly-sans-wide font-semibold leading-none! text-[36px] md:text-[40px] tabular-nums tracking-[-0.02em]"
          >
            {param.format(0)}
          </p>
          {/*
            Visual match for CashbackCalculator's range input: pink fill on a
            gray track, pink thumb with a white ring. Decorative — the loop
            drives the thumb, so this is not an actual control.
          */}
          <div className="relative w-full px-1">
            <div ref={trackRef} className="relative h-3 rounded-full bg-gray-200">
              <div
                ref={thumbRef}
                className="absolute top-1/2 z-10 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink border-4 border-white shadow-[0_1px_3px_rgba(0,0,0,0.18)]"
                style={{ left: "0%" }}
              />
            </div>
          </div>
        </div>

        <div
          className={[
            `absolute inset-0 flex flex-col justify-center gap-5 ${TILE_FILL} px-7 py-8 transition-opacity duration-300 ease-out`,
            scene === "review" ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
          ].join(" ")}
          aria-hidden={scene !== "review"}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="font-medium text-[14px] md:text-[16px] text-center">Offer review</p>
            <p className="font-poly-sans-wide font-semibold leading-none! text-[28px] md:text-[32px] text-center tracking-[-0.02em]">
              {PARAMS[0].format(PARAMS[0].to)} back
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {PARAMS.map((item) => (
              <li key={item.label} className="flex items-baseline justify-between gap-3">
                <span className="text-[12px] md:text-[13px] text-gray-600">{item.label}</span>
                <span className="text-[13px] md:text-[14px] font-medium tabular-nums">
                  {item.format(item.to)}
                </span>
              </li>
            ))}
          </ul>
          <div
            ref={promoteRef}
            className={[
              "relative w-full overflow-hidden font-medium text-[14px] text-center text-gray-100 bg-pink rounded-3xl h-10 flex items-center justify-center shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] transition duration-150 ease-out",
              pressed ? "scale-[0.98] translate-y-px after:opacity-[0.09]" : "",
            ].join(" ")}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-[0.05]"
              aria-hidden="true"
            />
            <span className="relative">Promote</span>
          </div>
        </div>

        <div
          className={[
            `absolute inset-0 flex flex-col items-center justify-center gap-4 ${TILE_FILL} px-7 py-8 transition-opacity duration-300 ease-out`,
            scene === "success" ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
          ].join(" ")}
          aria-hidden={scene !== "success"}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-[#e8f6ed] text-[#137a3c]">
            <CheckIcon />
          </span>
          <p className="font-poly-sans-wide font-semibold text-[22px] md:text-[24px] leading-none text-center tracking-[-0.02em]">
            Your offer is live
          </p>
          <p className="text-[13px] text-gray-600 text-center">
            Your cashback offer will now be promoted.
          </p>
        </div>

        <div
          ref={cursorRef}
          className="pointer-events-none absolute top-0 left-0 z-20 opacity-0 will-change-transform"
        >
          <PointerCursor />
        </div>
      </div>
    </div>
  );
}
