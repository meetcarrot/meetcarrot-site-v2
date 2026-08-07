"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  /** Path to a Lottie JSON under `public/lottie`, e.g. "/lottie/product_rent.json". */
  src: string;
  className?: string;
  loop?: boolean;
  /** Delay the fetch until the container scrolls near the viewport. */
  lazy?: boolean;
}

/**
 * Thin wrapper around lottie-web's SVG renderer. The target site renders these
 * illustrations client-side only, so we mirror that: nothing ships in the HTML,
 * and the JSON is fetched once the container approaches the viewport.
 */
export function LottieAnimation({
  src,
  className,
  loop = true,
  lazy = true,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animation: AnimationItem | undefined;
    let cancelled = false;

    async function mount() {
      const lottie = (await import("lottie-web")).default;
      if (cancelled || !container) return;
      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop,
        autoplay: true,
        path: src,
      });
    }

    if (!lazy) {
      void mount();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            void mount();
          }
        },
        { rootMargin: "200px" },
      );
      observer.observe(container);
      return () => {
        cancelled = true;
        observer.disconnect();
        animation?.destroy();
      };
    }

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, [src, loop, lazy]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
