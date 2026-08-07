"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

interface LottieAnimationProps {
  /** Path to a Lottie JSON under `public/lottie`, e.g. "/lottie/product_rent.json". */
  src: string;
  className?: string;
  loop?: boolean;
}

/**
 * Thin wrapper around lottie-web's SVG renderer, matching how the target mounts
 * its product illustrations: client-side only, nothing in the server HTML.
 *
 * These mount eagerly rather than on scroll. That mirrors the target — it
 * requests all six product_*.json files during page load — and it sidesteps a
 * deadlock: the container has no intrinsic width until the animation is inside
 * it, and IntersectionObserver never reports a zero-area element as visible.
 */
export function LottieAnimation({ src, className, loop = true }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animation: AnimationItem | undefined;
    let cancelled = false;

    void import("lottie-web").then(({ default: lottie }) => {
      if (cancelled) return;
      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop,
        autoplay: true,
        path: src,
      });
    });

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, [src, loop]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
