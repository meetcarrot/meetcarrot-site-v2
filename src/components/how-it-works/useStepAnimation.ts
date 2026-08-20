"use client";

import { useEffect, useRef } from "react";

/**
 * Drives the looping card animations in the How Carrot Works steps.
 *
 * Every one of them wants the same behaviour: run a fixed-length cycle on
 * `requestAnimationFrame`, stop burning frames when nobody can see it, and show
 * a settled end state instead of moving when the user has asked for reduced
 * motion. That logic lives here once rather than four times.
 *
 * Callers paint by writing to DOM refs from `onFrame`, not by setting state —
 * at 60fps a state write per frame would re-render the component several
 * hundred times per cycle for no visual gain. State is for the handful of
 * discrete phase flips.
 */

/** Longest frame delta integrated. Above this the tab stalled; using the real
 *  delta would jump the animation forward instead of resuming where it left. */
const MAX_FRAME_MS = 50;

export interface StepAnimationOptions {
  /** Length of one full loop, in ms. */
  cycleMs: number;
  /** Called each frame with elapsed ms into the current cycle. */
  onFrame: (elapsed: number) => void;
  /** Painted once, in place of looping, under `prefers-reduced-motion`. */
  onReducedMotion: () => void;
}

export function useStepAnimation({ cycleMs, onFrame, onReducedMotion }: StepAnimationOptions) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Held in refs so a caller re-render doesn't tear down and restart the loop
  // mid-cycle, which would visibly snap the animation back to zero.
  const frameRef = useRef(onFrame);
  const reducedRef = useRef(onReducedMotion);

  // Refreshed in an effect rather than assigned during render: a ref write in
  // the render body runs on every attempt, including ones React discards.
  useEffect(() => {
    frameRef.current = onFrame;
    reducedRef.current = onReducedMotion;
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred a frame rather than run inline: these callbacks set state, and
      // doing that in an effect body cascades a second render on mount.
      const settle = requestAnimationFrame(() => reducedRef.current());
      return () => cancelAnimationFrame(settle);
    }

    let onScreen = false;
    const observer = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting));
    observer.observe(root);

    let frame = 0;
    let previous = 0;
    let elapsed = 0;

    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      const delta = previous === 0 ? 0 : Math.min(now - previous, MAX_FRAME_MS);
      previous = now;
      if (!onScreen || document.hidden) return;

      elapsed = (elapsed + delta) % cycleMs;
      frameRef.current(elapsed);
    };

    frameRef.current(0);
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [cycleMs]);

  return rootRef;
}

/** Decelerating ease — things arrive quickly, then settle rather than stop dead. */
export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Clamped 0–1 progress of `elapsed` across a segment starting at `from`. */
export function segment(elapsed: number, from: number, duration: number) {
  return Math.min(Math.max((elapsed - from) / duration, 0), 1);
}

export const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Shared card chrome, so the four steps read as one set. */
export const STEP_CARD_CLASS =
  "w-full max-w-84 mx-auto rounded-3xl bg-white border border-black/10 shadow-[0_8px_24px_0_rgba(0,0,0,0.06)] px-5 py-5";

/**
 * Every illustration occupies this same box, whatever its natural height.
 *
 * Without it the four cards are different heights, so the title and body copy
 * beneath them sit at different baselines — obvious on the homepage where three
 * of them stand side by side. Each animation centres itself inside the box
 * rather than stretching, so the shorter ones simply carry more air.
 */
export const STEP_ILLUSTRATION_BOX =
  "flex h-84 w-full items-center justify-center";
