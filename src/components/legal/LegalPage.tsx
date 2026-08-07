"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@/components/icons";
import type { LegalDoc } from "@/data/legal";
import { cn } from "@/lib/utils";

/**
 * Shared styling for the CMS HTML. The source markup leans on `<h1>`/`<h2>` for
 * sub-headings inside a section, which Tailwind's preflight strips back to body
 * size — hence the explicit heading rules.
 */
const RICH_TEXT_CLASS = [
  "text-[16px] leading-[1.33]",
  "[&>*:first-child]:mt-0",
  "[&_p]:mb-4 [&_p:last-child]:mb-0",
  "[&_strong]:font-medium [&_b]:font-medium",
  "[&_h1]:font-medium [&_h1]:text-[18px] [&_h1]:mt-8 [&_h1]:mb-3",
  "[&_h2]:font-medium [&_h2]:text-[16px] [&_h2]:mt-6 [&_h2]:mb-2",
  "[&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4",
  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4",
  "[&_li]:mb-2 [&_li_p]:mb-0",
  "[&_a]:text-orange-100 [&_a]:underline",
].join(" ");

const CARD_CLASS =
  "bg-white rounded-3xl lg:rounded-4xl shadow-[0_8px_16px_0_rgba(0,0,0,0.05)]";

export interface LegalPageProps {
  doc: LegalDoc;
}

export function LegalPage({ doc }: LegalPageProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mx-auto px-6 container lg:max-w-256 flex flex-col gap-10 md:gap-14">
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-poly-sans-wide text-[40px] md:text-[48px] lg:text-[56px] leading-[1.15]!">
          {doc.title}
        </h1>
        <p className="text-[16px] leading-[1.33] text-gray-600">
          Last Updated {doc.lastUpdated}
        </p>
      </header>

      {doc.intro ? (
        <div className={cn(CARD_CLASS, "px-6 py-8 md:px-10 md:py-10")}>
          <div
            className={RICH_TEXT_CLASS}
            dangerouslySetInnerHTML={{ __html: doc.intro }}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-4 lg:gap-6">
        {doc.sections.map((section) => {
          const isOpen = openId === section.id;
          const buttonId = `legal-section-${section.id}`;
          const panelId = `legal-panel-${section.id}`;

          return (
            <div key={section.id} className={CARD_CLASS}>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : section.id)}
                className="flex w-full items-center justify-between gap-8 py-5 px-5 lg:py-6 lg:px-8 cursor-pointer text-left rounded-3xl lg:rounded-4xl transition duration-200 ease-in-out active:scale-[0.99] active:translate-y-px focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white focus-visible:ring-offset-2"
              >
                <span className="text-[18px] font-medium leading-[1.33]">
                  {section.title}
                </span>
                {/*
                  The shared ChevronRightIcon hard-codes a white stroke for use on
                  dark buttons; on a white card it needs the black stroke instead.
                */}
                <ChevronRightIcon
                  width={12}
                  height={12}
                  className={cn(
                    "shrink-0 transition-transform duration-200 ease-out [&_path]:stroke-black",
                    isOpen && "rotate-90",
                  )}
                />
              </button>

              {isOpen ? (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-6 lg:px-8 lg:pb-8"
                >
                  <div
                    className={RICH_TEXT_CLASS}
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
