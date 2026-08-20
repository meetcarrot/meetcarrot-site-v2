"use client";

import { MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Page transition.
 *
 * `template.tsx` rather than `layout.tsx` because App Router remounts a
 * template on every navigation — that remount is what re-runs the entrance and
 * clears the exit state below.
 *
 * Not the browser's View Transitions API: Next exposes it behind
 * `experimental.viewTransition`, and its own documentation advises against
 * shipping it, so the sequencing is done here.
 *
 * App Router gives no exit hook — it unmounts the outgoing route before the
 * incoming one renders, so there is nothing left to animate by the time a
 * navigation starts. The only way to play an exit is to own the moment before
 * it: intercept the click, fade the current page out, then navigate. The
 * incoming route then runs its own entrance, and the two halves read as one
 * continuous transition.
 *
 * The listener runs in the CAPTURE phase, which is load-bearing. React attaches
 * its handlers to the root container, which is inside `document` — so on the
 * bubble phase Next's own Link handler fires first, calls `preventDefault` and
 * navigates immediately, and this handler then sees an already-prevented event
 * and bails. The exit never played and the outgoing page simply sat there until
 * the new route committed.
 *
 * Capturing first, and calling `preventDefault` before Link sees the event,
 * makes Link stand down — it returns early on `e.defaultPrevented`. Propagation
 * is deliberately NOT stopped, so a link's own `onClick` still runs; the mobile
 * menu closes itself that way.
 */

/** Long enough to read as a fade, short enough not to feel like latency. */
const EXIT_MS = 180;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Honour the OS setting by navigating immediately, with no fade at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleClick(event: MouseEvent) {
      // Anything the browser would treat as "not a plain left-click
      // navigation" must keep its native behaviour: new tabs, downloads,
      // modified clicks.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return; // external, mailto, tel, hash

      const [path] = href.split("#");
      if (path === window.location.pathname) return; // same page, or a hash on it

      event.preventDefault();
      setExiting(true);
      window.setTimeout(() => router.push(href), EXIT_MS);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  return (
    <MotionConfig reducedMotion="user">
      <div data-page-enter data-page-exiting={exiting || undefined}>
        {children}
      </div>
    </MotionConfig>
  );
}
