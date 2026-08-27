"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

import { DocModal } from "@/components/DocModal";
import { ChevronRightIcon } from "@/components/icons";
import type { LegalDoc } from "@/data/legal";

/**
 * Shared styling for the CMS HTML. The source markup leans on `<h1>`/`<h2>` for
 * sub-headings inside a section, which Tailwind's preflight strips back to body
 * size — hence the explicit heading rules.
 */
const RICH_TEXT_CLASS = [
  "text-[16px] leading-[1.5]",
  "[&>*:first-child]:mt-0",
  "[&_p]:mb-4 [&_p:last-child]:mb-0",
  "[&_strong]:font-medium [&_b]:font-medium",
  "[&_h1]:font-medium [&_h1]:text-[18px] [&_h1]:mt-8 [&_h1]:mb-3",
  "[&_h2]:font-medium [&_h2]:text-[16px] [&_h2]:mt-6 [&_h2]:mb-2",
  "[&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4",
  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4",
  "[&_li]:mb-2 [&_li_p]:mb-0",
  "[&_a]:text-pink [&_a]:underline",
].join(" ");

/** Same pill the FAQ grid uses — the two grids are the same control. */
const SECTION_BUTTON_CLASS =
  "flex items-center justify-between gap-8 py-4 px-5 lg:px-8 cursor-pointer bg-white rounded-[20px] md:rounded-3xl lg:rounded-4xl md:min-h-18 lg:min-h-22 transition duration-200 ease-in-out shadow-[0_8px_16px_0_rgba(0,0,0,0.05)] active:shadow-[0_4px_8px_0_rgba(0,0,0,0.04)] active:scale-[0.99] active:translate-y-px focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2";

export interface LegalPageProps {
  doc: LegalDoc;
}

export function LegalPage({ doc }: LegalPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function handleOpen(index: number, element: HTMLButtonElement) {
    triggerRef.current = element;
    setOpenIndex(index);
  }

  return (
    <section className="pb-14 lg:pb-24 pt-10 md:pt-14 lg:pt-16">
      <div className="mx-auto px-6 container lg:max-w-324 flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-[16px] leading-[1.5] font-medium">
            Last Updated {doc.lastUpdated}
          </p>
          {doc.intro ? (
            <div
              className={RICH_TEXT_CLASS}
              dangerouslySetInnerHTML={{ __html: doc.intro }}
            />
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {doc.sections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => handleOpen(index, event.currentTarget)}
              className={SECTION_BUTTON_CLASS}
            >
              <span className="text-[18px] leading-[1.33] font-medium text-left">
                {section.title}
              </span>
              {/*
                The shared ChevronRightIcon hard-codes a white stroke for use on
                dark buttons; on a white card it needs the black stroke instead.
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

      <AnimatePresence>
        {openIndex !== null && (
        <DocModal
          items={doc.sections}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          triggerRef={triggerRef}
          bodyClassName={RICH_TEXT_CLASS}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
