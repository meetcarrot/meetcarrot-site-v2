"use client";

import { useRef, useState } from "react";
import { FaqModal } from "@/components/FaqModal";
import { ChevronRightIcon } from "@/components/icons";
import { FAQS } from "@/data/faqs";

/** Verbatim from `docs/research/markup/section-04.txt`. */
const QUESTION_BUTTON_CLASS =
  "flex items-center justify-between gap-8 py-4 px-5 lg:px-8 cursor-pointer bg-white rounded-[20px] md:rounded-3xl lg:rounded-4xl md:min-h-18 lg:min-h-22 transition duration-200 ease-in-out shadow-[0_8px_16px_0_rgba(0,0,0,0.05)] active:shadow-[0_4px_8px_0_rgba(0,0,0,0.04)] active:scale-[0.99] active:translate-y-px focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white focus-visible:ring-offset-2";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function handleOpen(index: number, element: HTMLButtonElement) {
    triggerRef.current = element;
    setOpenIndex(index);
  }

  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="flex flex-col gap-6 md:gap-6">
          <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
            FAQs
          </h2>
        </div>
        <div className="mt-14 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {FAQS.map((faq, index) => (
              <button
                key={faq.id}
                type="button"
                aria-haspopup="dialog"
                onClick={(event) => handleOpen(index, event.currentTarget)}
                className={QUESTION_BUTTON_CLASS}
              >
                <span className="text-[16px] leading-[1.33] font-medium text-left">
                  <b>{faq.question}</b>
                </span>
                {/*
                  The shared ChevronRightIcon hard-codes a white stroke for use on dark
                  buttons; the FAQ rows need the black stroke the source markup ships.
                */}
                <ChevronRightIcon
                  width={12}
                  height={12}
                  className="shrink-0 [&_path]:stroke-black"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <FaqModal
          faqs={FAQS}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          triggerRef={triggerRef}
        />
      )}
    </section>
  );
}
