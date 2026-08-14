"use client";

import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Faq } from "@/types/content";

const TITLE_ID = "faq-modal-title";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export interface FaqModalProps {
  faqs: Faq[];
  /** Index into `faqs` of the question currently on screen. */
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Button that opened the modal; focus returns here on close. */
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function FaqModal({ faqs, index, onIndexChange, onClose, triggerRef }: FaqModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const faq = faqs[index];

  // Move focus into the panel on open, and hand it back to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const trigger = triggerRef;
    return () => {
      const returnTo = trigger.current ?? previouslyFocused;
      returnTo?.focus();
    };
  }, [triggerRef]);

  // Verified live: the page behind the modal stops scrolling while it is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!faq) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-8 md:px-6">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative flex max-h-[85vh] w-full max-w-[720px] flex-col overflow-y-auto bg-white rounded-[20px] md:rounded-3xl lg:rounded-4xl px-6 py-8 md:px-10 md:py-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] focus-visible:outline-none"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-[22px] leading-none text-gray-400 transition duration-200 ease-in-out active:scale-[0.96] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <h3 id={TITLE_ID} className="font-medium text-[20px] lg:text-[24px] mb-4 pr-12">
          {faq.question}
        </h3>

        <div
          className="text-[16px] leading-[1.5] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-medium [&_a.external-link]:text-pink [&_a.external-link]:underline"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            variant="dark"
            size="compact"
            disabled={index === 0}
            onClick={() => onIndexChange(index - 1)}
            className="w-auto rounded-full px-5 disabled:opacity-40"
          >
            <span className="flex items-center gap-2">
              <ChevronRightIcon width={12} height={12} className="rotate-180" />
              Prev
            </span>
          </Button>

          <span className="text-[14px] font-medium text-gray-600">
            {index + 1} of {faqs.length}
          </span>

          <Button
            variant="dark"
            size="compact"
            disabled={index === faqs.length - 1}
            onClick={() => onIndexChange(index + 1)}
            className="w-auto rounded-full px-5 disabled:opacity-40"
          >
            <span className="flex items-center gap-2">
              Next
              <ChevronRightIcon width={12} height={12} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
