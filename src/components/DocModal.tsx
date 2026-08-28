"use client";

import { motion } from "motion/react";
import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { createPortal } from "react-dom";
import { ChevronRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const TITLE_ID = "doc-modal-title";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/** Default rich-text rules — flat prose, which is all an FAQ answer contains. */
const BODY_CLASS =
  "text-[16px] leading-[1.5] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-medium [&_a.external-link]:text-pink [&_a.external-link]:underline";

/** One paged entry. Both FAQ answers and legal sections collapse to this. */
export interface DocModalItem {
  id: string;
  title: string;
  /** Trusted, pre-sanitised HTML. */
  html: string;
}

export interface DocModalProps {
  items: DocModalItem[];
  /** Index into `items` of the entry currently on screen. */
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Button that opened the modal; focus returns here on close. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  /**
   * Replaces the default prose rules. Legal sections carry `<h1>`/`<h2>`
   * sub-headings that need explicit sizing, which FAQ answers never have.
   */
  bodyClassName?: string;
}

export function DocModal({
  items,
  index,
  onIndexChange,
  onClose,
  triggerRef,
  bodyClassName,
}: DocModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const item = items[index];

  /*
    Rendered into <body> rather than in place.

    `position: fixed` is only relative to the viewport while no ancestor has a
    transform, filter or perspective — any of those become the containing block
    instead. The page-entrance animation puts a transform on the section this
    modal lives inside, so the overlay was sizing itself to that section: it
    covered the page content but stopped short of the footer and sat underneath
    the header. A portal takes the dialog out of that subtree entirely, which is
    also what lets it cover the fixed header without a z-index race.

    No mounted guard is needed: this only ever renders from a user click, so it
    never runs during SSR and `document` is always there.
  */


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

  // Paging swaps the body under a scrolled panel, so send the reader back to the
  // top — otherwise a short section opens already scrolled past its heading.
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [index]);

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

  if (!item) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative flex h-[min(60vh,35rem)] w-full max-w-[720px] flex-col overflow-hidden bg-white rounded-[20px] md:rounded-3xl lg:rounded-4xl shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] focus-visible:outline-none"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-[22px] leading-none text-gray-400 transition duration-200 ease-in-out active:scale-[0.96] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <h3
          id={TITLE_ID}
          className="shrink-0 font-medium text-[20px] lg:text-[24px] px-6 pt-8 pr-14 md:px-10 md:pt-10 md:pr-16"
        >
          {item.title}
        </h3>

        {/*
          Fixed height so Prev / Next stay put while paging. Long sections
          (Merchant Terms definitions, billing) scroll in this region only —
          do not grow the panel. 60vh keeps it from swallowing short viewports.
        */}
        <div
          ref={contentRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4 md:px-10"
        >
          {/* Replaces rather than merges: `cn` would run these arbitrary variants
              through tailwind-merge, which resolves `[&_p]:mb-4` against the
              default rules and silently drops one side. */}
          <div
            className={bodyClassName ?? BODY_CLASS}
            dangerouslySetInnerHTML={{ __html: item.html }}
          />
        </div>

        <div className="relative shrink-0 px-6 pb-6 pt-4 md:px-10 md:pb-8 md:pt-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-linear-to-t from-white to-transparent"
          />
          <div className="flex items-center justify-between gap-4">
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
              {index + 1} of {items.length}
            </span>

            <Button
              variant="dark"
              size="compact"
              disabled={index === items.length - 1}
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
      </motion.div>
    </div>,
    document.body,
  );
}
