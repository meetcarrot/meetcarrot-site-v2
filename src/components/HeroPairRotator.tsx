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

import { HERO_PAIR_CYCLE, HERO_PAIRS } from "@/data/hero-pairs";
import { cn } from "@/lib/utils";

const CYCLE_MS = 5_000;
const INITIAL_INDEX = HERO_PAIRS.findIndex((pair) => pair.id === 5);

const HeroPairContext = createContext(INITIAL_INDEX);

function nextIndex(current: number) {
  const currentId = HERO_PAIRS[current]?.id ?? HERO_PAIRS[INITIAL_INDEX].id;
  const at = HERO_PAIR_CYCLE.indexOf(currentId);
  const nextId = HERO_PAIR_CYCLE[(at + 1) % HERO_PAIR_CYCLE.length];
  return HERO_PAIRS.findIndex((pair) => pair.id === nextId);
}

/**
 * Pair 5 is the SSR default so LCP is a real photo and hydrate matches.
 * Holds 5s, then dissolves along 5 → 1 → 4 → 2 → 3 → 5…
 */
export function HeroPairRotator({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(INITIAL_INDEX);

  useEffect(() => {
    if (reduced) return;
    let cycleId = 0;

    const tick = () => {
      cycleId = window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          setIndex((current) => nextIndex(current));
        }
        tick();
      }, CYCLE_MS);
    };
    tick();

    return () => window.clearTimeout(cycleId);
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
            priority={pairIndex === INITIAL_INDEX}
            loading={pairIndex === INITIAL_INDEX ? undefined : "eager"}
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
