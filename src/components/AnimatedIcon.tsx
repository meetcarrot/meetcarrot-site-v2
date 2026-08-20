import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * A category illustration built from two separately rendered pieces — a base
 * object and one accent object — so the accent can animate on its own.
 *
 * A single flat PNG can only move as one lump, which is why the previous
 * version could float and lift but nothing inside it ever moved. Splitting the
 * accent out is the cheapest way to get real part motion without going to
 * layered SVG or Lottie.
 *
 * No `"use client"`: every animation here is CSS, so this ships no JavaScript.
 */
export type AccentMotion = "bob" | "swing" | "spin" | "roll";

export interface AnimatedIconProps {
  base: string;
  accent: string;
  alt?: string;
  /** Accent box, as percentages of the icon square. */
  accentBox: { left: string; top: string; width: string };
  motion: AccentMotion;
  /** Wisps rising off the accent — only sensible on something hot. */
  steam?: boolean;
  /** Offsets this icon's idle drift so a row of them doesn't move in lockstep. */
  floatDelay?: string;
  className?: string;
}

const MOTION_CLASS: Record<AccentMotion, string> = {
  bob: "accent-bob",
  swing: "accent-swing",
  spin: "accent-spin",
  roll: "accent-roll",
};

export function AnimatedIcon({
  base,
  accent,
  alt = "",
  accentBox,
  motion,
  steam = false,
  floatDelay,
  className,
}: AnimatedIconProps) {
  return (
    <div
      className={cn(
        "relative aspect-square h-full animate-icon-float",
        // The lift is on this wrapper and the part motion on the accent inside,
        // so hovering composes with the idle animation instead of restarting it.
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.06]",
        className,
      )}
      style={floatDelay ? { animationDelay: floatDelay } : undefined}
    >
      <Image
        src={base}
        alt={alt}
        fill
        sizes="220px"
        className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.08)]"
      />

      <div className="absolute" style={accentBox}>
        {steam ? (
          <div className="pointer-events-none absolute inset-x-0 -top-[55%] flex justify-center gap-[12%]">
            {[0, 0.9, 1.8].map((delay) => (
              <span
                key={delay}
                className="steam-wisp block h-[38%] w-[12%] rounded-full bg-gray-400/25"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        ) : null}

        <Image
          src={accent}
          alt=""
          width={512}
          height={512}
          className={cn("h-auto w-full", MOTION_CLASS[motion])}
        />
      </div>
    </div>
  );
}
