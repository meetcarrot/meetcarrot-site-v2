"use client";

import Image from "next/image";

import { useParallax } from "@/components/useParallax";

/**
 * The closing CTA photograph, drifting slightly slower than the page scrolls.
 *
 * It brings its own `overflow-hidden` wrapper so the drift stays inside the
 * rounded frame.
 *
 * The inner frame is 20% taller than the window it sits in, so a ±6% drift can
 * never pull an edge into view.
 */
export function ParallaxBackdrop({ src, sizes }: { src: string; sizes: string }) {
  const ref = useParallax(60);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-4xl">
      <div ref={ref} className="absolute -inset-y-[10%] inset-x-0">
        <Image
          src={src}
          alt=""
          fill
          loading="lazy"
          className="object-cover"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
