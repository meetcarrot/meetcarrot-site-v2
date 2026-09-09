"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Flip this off to hide the hero chips without deleting the component.
 * Set to `false` and the photos render as they did before.
 */
export const SHOW_HERO_STORY_CHIPS = true;

/** Pause after a photo swap so the dissolve has started before the chip lands. */
const CHIP_IN_MS = 1_000;
/** Full-width pill is up, then typing starts. */
const TEXT_START_MS = 220;
const CHAR_MS = 48;
/** Last character is out, then the circle appears. */
const CIRCLE_IN_MS = 180;
/** Circle is up, then the check draws. */
const CHECK_IN_MS = 220;

const LABELS = {
  left: "Offer promoted",
  right: "Purchase made",
} as const;

function SuccessCheckIcon({
  circle,
  checked,
}: {
  circle: boolean;
  checked: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className="size-3 shrink-0 text-[#03FF00] md:size-3.5"
    >
      <circle
        cx="6"
        cy="6"
        r="6"
        fill={circle ? "currentColor" : "none"}
      />
      <path
        d="M3.4 6.15 5.15 7.9 8.6 4.2"
        fill="none"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10"
        strokeDashoffset={checked ? 0 : 10}
        className="transition-[stroke-dashoffset] duration-350 ease-out motion-reduce:transition-none"
      />
    </svg>
  );
}

/**
 * One small pill per hero frame. Same copy on every pair — it names the
 * moment, not a merchant. The chip arrives at full width, the label types
 * out, then a circle and check land to the right. Hides when the pair changes.
 */
export function HeroStoryChip({
  side,
  pairToken,
}: {
  side: "left" | "right";
  pairToken: number;
}) {
  const reduced = useReducedMotion();
  const label = LABELS[side];
  const [pillUp, setPillUp] = useState(false);
  const [typed, setTyped] = useState(0);
  const [circleUp, setCircleUp] = useState(false);
  const [checkDrawn, setCheckDrawn] = useState(false);

  useEffect(() => {
    if (reduced) {
      setPillUp(true);
      setTyped(label.length);
      setCircleUp(true);
      setCheckDrawn(true);
      return;
    }

    setPillUp(false);

    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        setTyped(0);
        setCircleUp(false);
        setCheckDrawn(false);
        setPillUp(true);
      }, CHIP_IN_MS),
    );

    const typingStarts = CHIP_IN_MS + TEXT_START_MS;
    for (let i = 1; i <= label.length; i += 1) {
      timers.push(
        window.setTimeout(() => setTyped(i), typingStarts + i * CHAR_MS),
      );
    }

    const typedDone = typingStarts + label.length * CHAR_MS;
    timers.push(
      window.setTimeout(() => setCircleUp(true), typedDone + CIRCLE_IN_MS),
    );
    timers.push(
      window.setTimeout(
        () => setCheckDrawn(true),
        typedDone + CIRCLE_IN_MS + CHECK_IN_MS,
      ),
    );

    return () => {
      for (const id of timers) window.clearTimeout(id);
    };
  }, [pairToken, reduced, label]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-[2] left-3 top-auto bottom-3",
        "md:left-4 md:top-4 md:bottom-auto lg:top-auto lg:bottom-4",
        "inline-flex h-6 max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full",
        "md:h-7 md:gap-2 md:px-3 md:text-[13px]",
        "bg-white/50 px-2.5 text-[11px] font-medium leading-none text-white",
        "whitespace-nowrap backdrop-blur-md",
        "transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:transition-none",
        pillUp ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
      )}
    >
      <span className="relative inline-block">
        <span className="invisible whitespace-nowrap">{label}</span>
        <span className="absolute inset-0 whitespace-nowrap">
          {label.slice(0, typed)}
        </span>
      </span>
      <SuccessCheckIcon circle={circleUp} checked={checkDrawn} />
    </div>
  );
}
