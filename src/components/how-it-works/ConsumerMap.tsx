import type { Ref } from "react";

import { CONSUMER_DEMO, FEATURED_OFFER } from "@/data/consumer-flow";

/** Faint street grid so the pins read as a map, not a scatter plot. */
export function MapStreets() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="100" height="100" fill="var(--color-gray-100)" />
      <g fill="none" stroke="var(--color-gray-200)">
        <path d="M0 30 H100" strokeWidth="5" />
        <path d="M0 58 H100" strokeWidth="5" />
        <path d="M0 82 H100" strokeWidth="4" />
        <path d="M22 0 V100" strokeWidth="5" />
        <path d="M48 0 V100" strokeWidth="4" />
        <path d="M76 0 V100" strokeWidth="5" />
        <path d="M0 16 H100" strokeWidth="2" />
        <path d="M0 44 H100" strokeWidth="2" />
        <path d="M34 0 V100" strokeWidth="2" />
        <path d="M62 0 V100" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function OfferMap({
  arrived,
  featuredPressed = false,
  featuredRef,
}: {
  arrived: number;
  featuredPressed?: boolean;
  featuredRef?: Ref<HTMLDivElement>;
}) {
  return (
    <>
      <MapStreets />
      <YouMarker />
      {CONSUMER_DEMO.nearby.map((pin, index) => (
        <OfferPin
          key={pin.name}
          rate={pin.rate}
          x={pin.x}
          y={pin.y}
          visible={index < arrived}
          featured={pin.name === FEATURED_OFFER.name}
          pressed={pin.name === FEATURED_OFFER.name && featuredPressed}
          pinRef={pin.name === FEATURED_OFFER.name ? featuredRef : undefined}
        />
      ))}
    </>
  );
}

export function YouMarker() {
  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${CONSUMER_DEMO.you.x}%`, top: `${CONSUMER_DEMO.you.y}%` }}
    >
      <div className="size-3 rounded-full bg-gray-400 ring-[3px] ring-white shadow-[0_2px_6px_rgba(0,0,0,0.2)]" />
      <p className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-medium text-gray-600">
        You
      </p>
    </div>
  );
}

export function OfferPin({
  rate,
  x,
  y,
  visible,
  featured = false,
  pressed = false,
  pinRef,
}: {
  rate: number;
  x: number;
  y: number;
  visible: boolean;
  featured?: boolean;
  pressed?: boolean;
  pinRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={pinRef}
      className={[
        "absolute z-10 -translate-x-1/2 -translate-y-full transition-all ease-out",
        visible ? "opacity-100 scale-100" : "opacity-0 scale-75",
        pressed ? "scale-90" : "",
      ].join(" ")}
      style={{ left: `${x}%`, top: `${y}%`, transitionDuration: "400ms" }}
    >
      <div
        className={[
          "rounded-full px-2 py-1 font-medium tabular-nums text-white bg-pink shadow-[0_4px_10px_0_rgba(0,0,0,0.16)]",
          featured ? "text-[12px]" : "text-[11px]",
        ].join(" ")}
      >
        {rate}%
      </div>
      <div
        className="absolute left-1/2 top-[calc(100%-1px)] -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-pink"
      />
    </div>
  );
}

export function ActivatePill({
  pressed,
  pillRef,
}: {
  pressed?: boolean;
  pillRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={pillRef}
      className={[
        "relative w-full overflow-hidden font-medium text-[14px] text-center text-gray-100 bg-pink rounded-3xl h-10 flex items-center justify-center shadow-[0_2px_6px_0_rgba(0,0,0,0.15)] transition duration-150 ease-out",
        pressed ? "scale-[0.98] translate-y-px" : "",
      ].join(" ")}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-[0.05]"
        aria-hidden="true"
      />
      <span className="relative">Activate</span>
    </div>
  );
}

/** The business profile that opens from a map pin — same chrome on both steps. */
export function OfferProfile({
  activateRef,
  pressed,
}: {
  activateRef?: Ref<HTMLDivElement>;
  pressed?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-1">
        <p className="text-[13px] text-gray-600">{FEATURED_OFFER.name}</p>
        <p className="font-poly-sans-wide font-semibold leading-none! text-[28px] md:text-[32px] tabular-nums tracking-[-0.02em]">
          {FEATURED_OFFER.rate}% back
        </p>
        <p className="text-[11px] text-gray-600">Promoted offer</p>
      </div>
      <ActivatePill pillRef={activateRef} pressed={pressed} />
    </div>
  );
}
