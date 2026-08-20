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
  className,
}: AnimatedIconProps) {
  return (
    // The icon itself is static: only its accent moves. It previously also
    // drifted and lifted on hover, which competed with the part motion for
    // attention and made the whole object look unsettled.
    <div className={cn("relative aspect-square h-full", className)}>
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
