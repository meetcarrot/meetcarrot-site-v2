"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-linked parallax on a single element.
 *
 * This is the one effect here that genuinely wants GSAP: `scrub` ties progress
 * to scroll position rather than to a clock, and ScrollTrigger batches every
 * subscriber's measurements into one read/write pass per frame. Hand-rolling it
 * means a scroll listener per element, each forcing its own layout read.
 *
 * GSAP is imported inside the effect, not at module scope, so its ~30KB lands
 * in its own chunk fetched after hydration instead of in the bundle that blocks
 * first paint. The closing CTA is on every page, so a static import would put
 * that weight in front of every visitor for a decorative effect.
 *
 * The element must sit inside a container with `overflow: hidden` and be taller
 * than it, or the drift exposes an edge.
 */
export function useParallax(distance = 60) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Parallax is decorative motion tied to scrolling — exactly what a reduced
    // motion preference is asking us not to do.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context: { revert: () => void } | undefined;
    let cancelled = false;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      // The import can resolve after unmount; without this the context below
      // would be created with nothing left to clean it up.
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.fromTo(
          element,
          { yPercent: -distance / 10 },
          {
            yPercent: distance / 10,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              // Runs from the section entering the viewport to it leaving, so
              // the travel spreads across the whole time it is on screen.
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }, element);
    })();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [distance]);

  return ref;
}
