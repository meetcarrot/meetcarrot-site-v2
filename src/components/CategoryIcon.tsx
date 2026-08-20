"use client";

import { motion, useReducedMotion } from "motion/react";
import NextImage from "next/image";

import { cn } from "@/lib/utils";

export type CategoryId = "hospitality" | "retail" | "services" | "digital";

/**
 * Each prop is its own layer so a cup, bag, wrench or parcel can move without
 * the rest of the scene. Pieces sit flat on a shared ground; they only animate
 * as they enter, then hold still. No backdrop — the card shows through.
 */

const ENTER = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.8 };

interface Layer {
  src?: string;
  steam?: boolean;
  left: string;
  bottom: string;
  width: string;
  z: number;
}

/** Square diorama. Grounded pieces share `bottom` so buildings sit on the floor. */
const SCENES: Record<CategoryId, readonly Layer[]> = {
  hospitality: [
    { src: "/images/categories/parts/hospitality-building.webp", left: "18%", bottom: "3%", width: "64%", z: 1 },
    { src: "/images/categories/parts/hospitality-croissant.webp", left: "2%", bottom: "3%", width: "28%", z: 2 },
    { src: "/images/categories/parts/hospitality-cup.webp", left: "66%", bottom: "3%", width: "26%", z: 3 },
    { steam: true, left: "74%", bottom: "24%", width: "12%", z: 4 },
  ],
  retail: [
    { src: "/images/categories/parts/retail-building.webp", left: "10%", bottom: "3%", width: "66%", z: 1 },
    { src: "/images/categories/parts/retail-bag.webp", left: "62%", bottom: "3%", width: "30%", z: 2 },
  ],
  services: [
    { src: "/images/categories/parts/services-chair.webp", left: "4%", bottom: "3%", width: "34%", z: 1 },
    { src: "/images/categories/parts/services-wrench.webp", left: "42%", bottom: "3%", width: "15%", z: 3 },
    { src: "/images/categories/parts/services-bottle.webp", left: "66%", bottom: "3%", width: "22%", z: 2 },
  ],
  digital: [
    { src: "/images/categories/parts/digital-laptop.webp", left: "4%", bottom: "3%", width: "70%", z: 1 },
    { src: "/images/categories/parts/digital-box.webp", left: "62%", bottom: "46%", width: "28%", z: 2 },
  ],
};

export function CategoryIcon({
  id,
  delay = "0s",
  className,
}: {
  id: CategoryId;
  delay?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const delaySec = Number.parseFloat(delay) || 0;
  const layers = SCENES[id];

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square h-full w-auto max-w-full shrink-0 overflow-visible",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[20%] bottom-[1%] h-[7%] rounded-[100%] bg-black/15 blur-[6px]"
      />
      <div className="relative h-full w-full">
        {layers.map((layer, index) => (
          <SceneLayer
            key={layer.src ?? `steam-${index}`}
            layer={layer}
            reduced={Boolean(reduced)}
            delay={delaySec + index * 0.08}
          />
        ))}
      </div>
    </div>
  );
}

function SceneLayer({
  layer,
  reduced,
  delay,
}: {
  layer: Layer;
  reduced: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute drop-shadow-[0_2px_3px_rgba(0,0,0,0.14)]"
      style={{
        left: layer.left,
        bottom: layer.bottom,
        width: layer.width,
        zIndex: layer.z,
      }}
      initial={reduced ? false : { y: 16, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ ...ENTER, delay }}
    >
      {layer.steam ? (
        <Steam reduced={reduced} />
      ) : layer.src ? (
        <NextImage
          src={layer.src}
          alt=""
          width={640}
          height={640}
          sizes="220px"
          className="h-auto w-full max-h-none max-w-none select-none bg-transparent"
        />
      ) : null}
    </motion.div>
  );
}

function Steam({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <div className="relative aspect-[3/4] w-full">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="absolute bottom-0 w-[18%] rounded-full bg-white/70 blur-[1px]"
          style={{ left: `${18 + index * 28}%`, height: `${48 + index * 12}%` }}
          animate={{
            y: [-6, -16, -6],
            opacity: [0.15, 0.65, 0.15],
            scaleX: [1, 1.35, 1],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.25,
          }}
        />
      ))}
    </div>
  );
}
