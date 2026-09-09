"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

import { HERO_PAIR_CYCLE, HERO_PAIRS } from "@/data/hero-pairs";
import { cn } from "@/lib/utils";

const CYCLE_MS = 5_000;
/** How long the right frame trails the left, so one side moves at a time. */
const SIDE_STAGGER_MS = 1_400;
const INITIAL_INDEX = HERO_PAIRS.findIndex((pair) => pair.id === 5);

interface HeroPairIndexes {
  left: number;
  right: number;
}

const HeroPairContext = createContext<HeroPairIndexes>({
  left: INITIAL_INDEX,
  right: INITIAL_INDEX,
});

function nextIndex(current: number) {
  const currentId = HERO_PAIRS[current]?.id ?? HERO_PAIRS[INITIAL_INDEX].id;
  const at = HERO_PAIR_CYCLE.indexOf(currentId);
  const nextId = HERO_PAIR_CYCLE[(at + 1) % HERO_PAIR_CYCLE.length];
  return HERO_PAIRS.findIndex((pair) => pair.id === nextId);
}

/**
 * Both sides always open on pair 5 — it is the SSR default, so LCP is a real
 * photo and hydrate matches. Every 5s the pair advances along
 * 5 → 1 → 4 → 2 → 3 → 5…, with the left frame dissolving first and the right
 * one following {@link SIDE_STAGGER_MS} later, so the two never turn together.
 */
export function HeroPairRotator({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [indexes, setIndexes] = useState<HeroPairIndexes>({
    left: INITIAL_INDEX,
    right: INITIAL_INDEX,
  });
  const leftIndexRef = useRef(INITIAL_INDEX);

  useEffect(() => {
    if (reduced) return;
    let cycleId = 0;
    let staggerId = 0;

    const tick = () => {
      cycleId = window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          const next = nextIndex(leftIndexRef.current);
          leftIndexRef.current = next;
          setIndexes((current) => ({ ...current, left: next }));
          staggerId = window.setTimeout(() => {
            setIndexes((current) => ({ ...current, right: next }));
          }, SIDE_STAGGER_MS);
        }
        tick();
      }, CYCLE_MS);
    };
    tick();

    return () => {
      window.clearTimeout(cycleId);
      window.clearTimeout(staggerId);
    };
  }, [reduced]);

  return (
    <HeroPairContext.Provider value={indexes}>
      {children}
    </HeroPairContext.Provider>
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
  const index = useContext(HeroPairContext)[side];

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
