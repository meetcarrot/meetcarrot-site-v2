"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

import { HERO_PAIRS } from "@/data/hero-pairs";
import { cn } from "@/lib/utils";

const CYCLE_MS = 20_000;

const HeroPairContext = createContext(0);

function randomIndex(exclude?: number) {
  const count = HERO_PAIRS.length;
  if (count <= 1) return 0;
  let next = Math.floor(Math.random() * count);
  if (exclude === undefined) return next;
  while (next === exclude) {
    next = Math.floor(Math.random() * count);
  }
  return next;
}

/**
 * Picks a random left/right pair on mount, then crossfades to another pair
 * every few seconds. Both columns always show the same pair index.
 *
 * Pair 1 is the SSR default so LCP stays a real photo (not an empty frame)
 * and the markup matches on hydrate. The first client tick may swap it.
 * Holds ~20s, then a slow dissolve to the next pair.
 */
export function HeroPairRotator({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId = 0;

    // Randomize off the effect body so the SSR pair renders first and hydrate
    // still matches; the swap lands on the next frame.
    const initialId = window.setTimeout(() => setIndex(randomIndex()), 0);
    if (reduced) return () => window.clearTimeout(initialId);

    const tick = () => {
      timeoutId = window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          setIndex((current) => randomIndex(current));
        }
        tick();
      }, CYCLE_MS);
    };

    tick();
    return () => {
      window.clearTimeout(initialId);
      window.clearTimeout(timeoutId);
    };
  }, [reduced]);

  return (
    <HeroPairContext.Provider value={index}>{children}</HeroPairContext.Provider>
  );
}

export function HeroFrame({
  side,
  sizes,
  bleed = false,
  className,
}: {
  side: "left" | "right";
  sizes: string;
  bleed?: boolean;
  className?: string;
}) {
  const index = useContext(HeroPairContext);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        bleed && "absolute inset-0 -bottom-12",
        className,
      )}
    >
      {HERO_PAIRS.map((pair, pairIndex) => {
        const shot = pair[side];
        const active = pairIndex === index;
        return (
          <Image
            key={`${side}-${pair.id}`}
            src={shot.src}
            alt={active ? shot.alt : ""}
            fill
            priority={pairIndex === 0}
            loading={pairIndex === 0 ? undefined : "eager"}
            unoptimized
            sizes={sizes}
            aria-hidden={!active}
            className={cn(
              "object-cover transition-opacity duration-[2800ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
              shot.position,
              shot.filter,
              active ? "z-[1] opacity-100" : "z-0 opacity-0",
            )}
          />
        );
      })}
    </div>
  );
}
