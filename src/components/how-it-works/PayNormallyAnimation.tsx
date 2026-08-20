"use client";

import { useRef, useState } from "react";

import { CheckMark } from "@/components/how-it-works/CheckMark";
import {
  STEP_FRAME_CLASS,
  easeOutCubic,
  segment,
  useStepAnimation,
  wholeDollars,
} from "@/components/how-it-works/useStepAnimation";
import { CONSUMER_DEMO } from "@/data/consumer-flow";

/**
 * Spend: a POS shows the total, a card taps the reader, then the payment lands.
 */

type Scene = "pos" | "paid";

const HOLD_MS = 560;
const TAP_MS = 520;
const TAP_HOLD_MS = 320;
const PAID_MS = 280;
const PAID_HOLD_MS = 2400;

const TAP_AT = HOLD_MS;
const PAID_AT = TAP_AT + TAP_MS + TAP_HOLD_MS;
const CYCLE_MS = PAID_AT + PAID_MS + PAID_HOLD_MS;

function ContactlessMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.2 8.4c1.6 1.6 1.6 5.6 0 7.2M11.2 6.2c2.7 2.7 2.7 8.9 0 11.6M14.2 4.2c3.7 3.7 3.7 12 0 15.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PayNormallyAnimation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<Scene>("pos");
  const [tapped, setTapped] = useState(false);

  const rootRef = useStepAnimation({
    cycleMs: CYCLE_MS,
    onFrame: (elapsed) => {
      const nextScene: Scene = elapsed >= PAID_AT ? "paid" : "pos";
      const nextTapped = elapsed >= TAP_AT + TAP_MS && elapsed < PAID_AT;

      setScene((current) => (current === nextScene ? current : nextScene));
      setTapped((current) => (current === nextTapped ? current : nextTapped));

      const card = cardRef.current;
      if (!card) return;

      if (elapsed < TAP_AT) {
        card.style.opacity = "1";
        card.style.transform = "translate(-50%, -42px) rotate(-16deg)";
        return;
      }

      if (elapsed >= PAID_AT) {
        const leave = easeOutCubic(segment(elapsed, PAID_AT, 220));
        card.style.opacity = String(1 - leave);
        card.style.transform = `translate(-50%, ${10 + leave * 18}px) rotate(-6deg)`;
        return;
      }

      const tap = easeOutCubic(segment(elapsed, TAP_AT, TAP_MS));
      const y = -42 + 52 * tap;
      const rotate = -16 + 10 * tap;
      card.style.opacity = "1";
      card.style.transform = `translate(-50%, ${y}px) rotate(${rotate}deg)`;
    },
    onReducedMotion: () => {
      const card = cardRef.current;
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translate(-50%, 10px) rotate(-6deg)";
      }
      setTapped(false);
      setScene("paid");
    },
  });

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="A POS showing a sixty-five dollar total. A card taps to pay, then the payment is complete."
      className={STEP_FRAME_CLASS}
    >
      <div className="relative flex h-full items-center justify-center overflow-hidden rounded-3xl bg-gray-100 px-6">
        <div
          className={[
            "relative w-full max-w-52 rounded-[28px] bg-gray-400 px-2.5 pt-2.5 pb-4 shadow-[0_12px_28px_0_rgba(0,0,0,0.18)] transition duration-150 ease-out",
            tapped ? "scale-[0.985] translate-y-px" : "",
          ].join(" ")}
        >
          <div className="relative overflow-hidden rounded-[20px] bg-white px-5 py-7 min-h-40 flex flex-col items-center justify-center">
            <div
              className={[
                "absolute inset-0 flex flex-col items-center justify-center px-5 transition-opacity duration-300 ease-out",
                scene === "pos" ? "opacity-100" : "opacity-0",
              ].join(" ")}
              aria-hidden={scene !== "pos"}
            >
              <p className="text-[12px] text-gray-600">Total</p>
              <p className="mt-1 font-poly-sans-wide font-semibold leading-none! text-[36px] tabular-nums tracking-[-0.02em]">
                {wholeDollars.format(CONSUMER_DEMO.spend)}
              </p>
              <span className="mt-5 text-gray-400">
                <ContactlessMark />
              </span>
            </div>

            <div
              className={[
                "absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 transition-opacity duration-300 ease-out",
                scene === "paid" ? "opacity-100" : "opacity-0",
              ].join(" ")}
              aria-hidden={scene !== "paid"}
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-[#e8f6ed] text-[#137a3c]">
                <CheckMark size={20} />
              </span>
              <p className="font-poly-sans-wide font-semibold text-[22px] leading-none tracking-[-0.02em]">
                Paid
              </p>
              <p className="text-[12px] text-gray-600 text-center">
                {wholeDollars.format(CONSUMER_DEMO.spend)}
              </p>
            </div>
          </div>

          <div
            ref={cardRef}
            className="pointer-events-none absolute left-1/2 top-[46%] z-10 h-[3.35rem] w-[5.35rem] rounded-xl bg-gray-400 shadow-[0_8px_18px_0_rgba(0,0,0,0.28)] will-change-transform"
            aria-hidden="true"
          >
            <div className="ml-2.5 mt-2.5 h-2.5 w-4 rounded-[2px] bg-pink" />
            <p className="absolute right-2.5 bottom-1.5 text-[9px] tracking-wider text-white/70">
              ••••
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
