"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Section entrance: a short fade and a small rise as the block scrolls into
 * view.
 *
 * Kept deliberately quiet. The distance is 16px, not 60 — enough to register as
 * intentional, not enough to read as a slide. It fires `once`, so scrolling back
 * up does not replay it, and the viewport margin means it has already finished
 * by the time the section is properly on screen rather than animating under the
 * reader's eyes.
 *
 * Do not wrap anything containing a `position: fixed` child: the transform makes
 * this element their containing block.
 */
export interface RevealProps {
  children: ReactNode;
  /** Seconds to wait, for staggering siblings. Keep under ~0.2 total. */
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      data-motion-hidden
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
