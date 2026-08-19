"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

import { TESTIMONIALS } from "@/data/testimonials";
import type { Testimonial } from "@/types/content";

const CARDS_PER_COLUMN = 2;
const COPIES = [0, 1, 2];

const DEFAULT_PHOTOS = [
  "/images/img-1.jpg",
  "/images/img-2.jpg",
  "/images/img-3.jpg",
  "/images/img-4.jpg",
  "/images/img-5.jpg",
  "/images/img-6.jpg",
  "/images/img-7.jpg",
  "/images/img-8.jpg",
  "/images/img-9.jpg",
];

// Which slot the photo card occupies within its column (0 = above both quote
// cards, 1 = between them, 2 = below both). Transcribed from the live markup,
// where the position varies per column — that is what staggers the photos into
// a mosaic instead of a flat bottom row. Set every entry to 2 to un-stagger.
const DEFAULT_PHOTO_SLOT = [2, 0, 1, 0, 2, 0, 2, 0, 1];

function toColumns(testimonials: Testimonial[]): Testimonial[][] {
  return Array.from(
    { length: Math.ceil(testimonials.length / CARDS_PER_COLUMN) },
    (_, index) =>
      testimonials.slice(index * CARDS_PER_COLUMN, index * CARDS_PER_COLUMN + CARDS_PER_COLUMN),
  );
}

export interface TestimonialsProps {
  /** Defaults to the homepage set; product pages pass their own. */
  testimonials?: Testimonial[];
  /** One photo per column; wraps if shorter than the column count. */
  photos?: string[];
  /** Per-column photo slot (0/1/2); wraps if shorter. */
  photoSlots?: number[];
}

/**
 * Rail owns its own scroll position, so it must not opt into any behaviour that
 * lets the browser move the rail behind our back:
 *  - no `scroll-smooth`: every programmatic write would animate, and the
 *    auto-scroll writes ~60x a second.
 *  - no `snap-x snap-mandatory`: mandatory snap re-snaps after each write and
 *    after touch momentum, which is what made the rail judder.
 *  - `touch-pan-y`: the pointer handlers do the horizontal drag themselves, so
 *    native horizontal panning would double every touch gesture. Vertical pans
 *    still fall through to the page.
 */
const RAIL_BASE =
  "flex py-8 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden touch-pan-y gap-6 lg:gap-8 min-[1920px]:px-4";

/** Pixels per second of idle drift. Slow enough to read a card while it moves. */
const AUTO_SCROLL_SPEED = 24;

/**
 * Longest frame delta we integrate. Anything above this is a stalled tab or a
 * blocked main thread; using the real delta would teleport the rail forward.
 */
const MAX_FRAME_MS = 50;

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-full rounded-[20px] p-6 lg:rounded-4xl lg:p-10 shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] bg-white text-gray-400">
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="size-10 lg:size-14 rounded-full flex items-center justify-center font-semibold text-[14px] lg:text-[18px] leading-none uppercase shrink-0 bg-pink text-white">
          {testimonial.initials}
        </div>
        <span className="text-[14px] lg:text-[18px] font-medium leading-none">
          {testimonial.name}
        </span>
      </div>
      <div className="h-px my-4 lg:my-8 bg-black/10" />
      <p className="text-[16px] lg:text-[24px] font-medium leading-[1.3]">{testimonial.quote}</p>
    </div>
  );
}

function TestimonialColumn({
  column,
  photo,
  photoSlot,
}: {
  column: Testimonial[];
  photo: string;
  photoSlot: number;
}) {
  const children: ReactNode[] = column.map((testimonial) => (
    <TestimonialCard key={testimonial.name} testimonial={testimonial} />
  ));

  children.splice(
    photoSlot,
    0,
    <div
      key="photo"
      className="w-full flex-1 select-none overflow-hidden rounded-[20px] lg:rounded-4xl shadow-[0_12px_24px_0_rgba(0,0,0,0.05)]"
    >
      {/* Plain <img>, not next/image: the target relies on the raw element
          stretching to the flex-1 box, and these are decorative. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        draggable={false}
        loading="lazy"
        width={552}
        height={584}
        className="w-full h-full object-cover"
      />
    </div>,
  );

  return (
    <div className="shrink-0 w-1/2 min-w-60 sm:w-1/3 lg:w-1/4">
      <div className="h-full flex flex-col items-center justify-center gap-6 lg:gap-8">
        {children}
      </div>
    </div>
  );
}

export function Testimonials({
  testimonials = TESTIMONIALS,
  photos = DEFAULT_PHOTOS,
  photoSlots = DEFAULT_PHOTO_SLOT,
}: TestimonialsProps = {}) {
  const columns = toColumns(testimonials);
  const railRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  /** Hover / touch-hold pause, kept in a ref so it never re-renders the rail. */
  const paused = useRef(false);
  /**
   * Our authoritative scroll offset, in fractional pixels. `scrollLeft` rounds
   * on write in most engines, so reading it back each frame would discard the
   * sub-pixel remainder — at 24px/s that is 0.4px per frame, i.e. most of the
   * motion, and the rounding error is what showed up as jitter. We integrate
   * here and treat the DOM as write-only unless something else moves it.
   */
  const position = useRef(0);
  /** Last value we wrote, to tell our own scroll events apart from the user's. */
  const applied = useRef(0);

  /** Wrap into the middle copy, then push to the DOM. */
  const applyPosition = useCallback((rail: HTMLDivElement) => {
    // The rail renders three identical copies of the columns. Staying inside the
    // middle one leaves a full copy of runway in either direction, so crossing a
    // boundary can be answered by a jump of exactly one copy width onto pixel-
    // identical content — that jump is the illusion of an infinite loop.
    const copyWidth = rail.scrollWidth / COPIES.length;
    if (copyWidth > 0) {
      if (position.current >= copyWidth * 1.5) position.current -= copyWidth;
      else if (position.current < copyWidth * 0.5) position.current += copyWidth;
    }
    rail.scrollLeft = position.current;
    applied.current = rail.scrollLeft;
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    position.current = rail.scrollWidth / COPIES.length;
    applyPosition(rail);
  }, [applyPosition]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Scrolling a rail that is off-screen burns frames for nothing and, worse,
    // eats the loop's runway so the section is mid-teleport when it appears.
    let onScreen = false;
    const observer = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting));
    observer.observe(rail);

    let frame = 0;
    let previous = 0;
    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      const elapsed = previous === 0 ? 0 : Math.min(now - previous, MAX_FRAME_MS);
      previous = now;

      if (
        elapsed === 0 ||
        !onScreen ||
        document.hidden ||
        paused.current ||
        drag.current.active ||
        reduceMotion.matches
      ) {
        return;
      }

      position.current += (AUTO_SCROLL_SPEED * elapsed) / 1000;
      applyPosition(rail);
    };

    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [applyPosition]);

  // Wheel, trackpad and touch momentum all move the rail without going through
  // `position`. Re-anchor to whatever the browser did, but only when the gap is
  // bigger than the rounding slop from our own writes.
  const handleScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (Math.abs(rail.scrollLeft - applied.current) <= 1) return;
    position.current = rail.scrollLeft;
    applyPosition(rail);
  }, [applyPosition]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { active: true, startX: event.clientX, startScroll: position.current };
    rail.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rail = railRef.current;
      if (!rail || !drag.current.active) return;
      const desired = drag.current.startScroll - (event.clientX - drag.current.startX);
      position.current = desired;
      applyPosition(rail);
      // A wrap mid-drag must carry into the anchor, or the next move event would
      // measure its offset against the pre-jump origin and undo the jump.
      drag.current.startScroll += position.current - desired;
    },
    [applyPosition],
  );

  const handlePointerEnd = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const rail = railRef.current;
    if (rail?.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  }, []);

  const handlePointerEnter = useCallback(() => {
    paused.current = true;
  }, []);

  // Pointer capture suppresses boundary events mid-drag, so this only fires with
  // the pointer up — no need to also end the drag here.
  const handlePointerLeave = useCallback(() => {
    paused.current = false;
  }, []);

  return (
    <section className="py-14 lg:py-24">
      <div className="flex flex-col gap-6 md:gap-6 px-4">
        <Image
          src="/images/average-rating.svg"
          alt="rating"
          width={239}
          height={104}
          className="w-40 mx-auto h-auto md:w-57.5"
        />
        <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
          What People Are Saying
        </h2>
      </div>
      <div className="mt-8 lg:mt-14">
        <div className="w-full max-w-480 mx-auto">
          <div
            ref={railRef}
            className={
              isDragging
                ? `${RAIL_BASE} cursor-grabbing select-none`
                : `${RAIL_BASE} cursor-grab`
            }
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            {COPIES.map((copy) =>
              columns.map((column, columnIndex) => (
                <TestimonialColumn
                  key={`${copy}-${columnIndex}`}
                  column={column}
                  photo={photos[columnIndex % photos.length]}
                  photoSlot={photoSlots[columnIndex % photoSlots.length]}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
