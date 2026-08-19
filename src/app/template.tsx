"use client";

import { MotionConfig, motion } from "motion/react";

/**
 * Page transition. `template.tsx` rather than `layout.tsx` because App Router
 * remounts a template on every navigation, which is what gives each route its
 * own enter animation.
 *
 * Deliberately opacity-only. A `transform` (or `filter`, or
 * `will-change: transform`) on an ancestor makes it the containing block for
 * every `position: fixed` descendant — which here would mean the site header
 * and the modals detaching from the viewport and scrolling with the page.
 * Opacity creates a stacking context but not a containing block, so it is the
 * one property safe to animate at this level.
 *
 * There is no exit animation: App Router unmounts the outgoing route before the
 * incoming one renders, so nothing survives long enough to animate out. A fast
 * fade in reads as continuous without pretending otherwise.
 *
 * `MotionConfig reducedMotion="user"` sits here so every motion component in the
 * tree honours the OS setting without each one asking.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        data-motion-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
