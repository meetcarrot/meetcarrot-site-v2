"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Section entrance: a short fade with a small directional travel as the block
 * scrolls into view.
 *
 * Kept deliberately quiet. The distance is 16-24px, not 60 — enough to register
 * as intentional, not enough to read as a slide. It fires `once`, so scrolling
 * back up never replays it, and the viewport margin means it has finished by the
 * time the section is properly on screen rather than animating under the
 * reader's eyes.
 *
 * Direction carries meaning: `up` for things arriving in the normal reading
 * flow, `left`/`right` for a half of a two-column block so the pair converges
 * on the centre rather than both drifting the same way.
 *
 * Do not wrap anything containing a `position: fixed` child — the transform
 * makes this element their containing block.
 */
export type RevealDirection = "up" | "left" | "right" | "none";

const OFFSETS: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 16 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
  none: { x: 0, y: 0 },
};

export interface RevealProps {
  children: ReactNode;
  /** Seconds to wait, for staggering siblings. Keep the total under ~0.3. */
  delay?: number;
  direction?: RevealDirection;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  const offset = OFFSETS[direction];

  return (
    <motion.div
      data-motion-hidden
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
