"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Fills the `.illustration-component` slot the page already sized. Width comes
 * from the asset's aspect ratio against that slot height — `w-full` plus an
 * absolutely-positioned image collapses the slot to zero on legal heroes,
 * where the parent shrink-wraps instead of stretching.
 */

const ENTER = { type: "spring" as const, stiffness: 380, damping: 20, mass: 0.85 };

export function ClayHeroIcon({
  src,
  alt = "",
  width,
  height,
  className,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("relative h-full min-h-0 overflow-visible", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
      animate={reduced ? undefined : { scale: [1, 1.035, 1] }}
      transition={
        reduced
          ? undefined
          : { delay: 0.7, duration: 3.6, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { y: 18, opacity: 0, scale: 0.88, rotate: -5 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        transition={ENTER}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 280px, (min-width: 450px) 220px, 170px"
          className="object-contain select-none"
        />
      </motion.div>
    </motion.div>
  );
}
