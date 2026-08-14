"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

import { TESTIMONIALS } from "@/data/testimonials";
import type { Testimonial, TestimonialTheme } from "@/types/content";

/**
 * Avatar and divider colours per card theme. Not derivable by swapping the card
 * colours around — the white card's avatar is pink, and the two brand-coloured
 * cards both take a white avatar so the initials stay legible.
 */
const AVATAR_THEME: Record<TestimonialTheme, string> = {
  "bg-gray-400 text-white": "bg-white text-gray-400",
  "bg-orange text-white": "bg-white text-orange",
  "bg-pink text-white": "bg-white text-pink",
  "bg-white text-gray-400": "bg-pink text-white",
};

const DIVIDER_THEME: Record<TestimonialTheme, string> = {
  "bg-gray-400 text-white": "bg-white/15",
  "bg-orange text-white": "bg-black/15",
  "bg-pink text-white": "bg-black/15",
  "bg-white text-gray-400": "bg-black/10",
};

const CARDS_PER_COLUMN = 2;
const COPIES = [0, 1, 2];

const DEFAULT_PHOTOS = [
  "/images/img-1.png",
  "/images/img-2.png",
  "/images/img-3.png",
  "/images/img-4.png",
  "/images/img-5.png",
  "/images/img-6.png",
  "/images/img-7.png",
  "/images/img-8.png",
  "/images/img-9.png",
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

const RAIL_BASE =
  "flex py-8 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden scroll-smooth gap-6 lg:gap-8 min-[1920px]:px-4";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className={`w-full rounded-[20px] p-6 lg:rounded-4xl lg:p-10 shadow-[0_12px_24px_0_rgba(0,0,0,0.05)] ${testimonial.theme}`}
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <div
          className={`size-10 lg:size-14 rounded-full flex items-center justify-center font-semibold text-[14px] lg:text-[18px] leading-none uppercase shrink-0 ${AVATAR_THEME[testimonial.theme]}`}
        >
          {testimonial.initials}
        </div>
        <span className="text-[14px] lg:text-[18px] font-medium leading-none">
          {testimonial.name}
        </span>
      </div>
      <div className={`h-px my-4 lg:my-8 ${DIVIDER_THEME[testimonial.theme]}`} />
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
    <div className="shrink-0 snap-always snap-center w-1/2 min-w-60 sm:w-1/3 lg:w-1/4">
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

  // The rail renders three identical copies of the columns. Parking the initial
  // scroll position at the start of the middle copy leaves a full copy of runway
  // in either direction, which is what makes the loop feel infinite.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.style.scrollBehavior = "auto";
    rail.scrollLeft = rail.scrollWidth / COPIES.length;
    rail.style.scrollBehavior = "";
  }, []);

  const handleScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const copyWidth = rail.scrollWidth / COPIES.length;
    if (copyWidth === 0) return;

    // Once the viewport drifts halfway into the first or last copy, teleport it
    // by exactly one copy width. The content there is identical, so the only
    // visible artefact would be the smooth-scroll animation chasing the jump —
    // hence the temporary `scroll-behavior: auto`.
    const current = rail.scrollLeft;
    let next = current;
    if (current < copyWidth * 0.5) next = current + copyWidth;
    else if (current > copyWidth * 1.5) next = current - copyWidth;
    if (next === current) return;

    rail.style.scrollBehavior = "auto";
    rail.scrollLeft = next;
    rail.style.scrollBehavior = "";
    // Keep the in-flight drag anchored to the new position, or the next
    // pointermove would immediately undo the jump.
    if (drag.current.active) drag.current.startScroll += next - current;
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
    rail.style.scrollBehavior = "auto";
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    rail.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
  }, []);

  const handlePointerEnd = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!drag.current.active) return;
    drag.current.active = false;
    if (rail) {
      rail.style.scrollBehavior = "";
      if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
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
                : `${RAIL_BASE} cursor-grab snap-x snap-mandatory`
            }
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
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
