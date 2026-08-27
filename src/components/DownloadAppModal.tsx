"use client";

import { motion } from "motion/react";
import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { createPortal } from "react-dom";

import { CarrotLogo } from "@/components/carrot-logo";
import { AppStoreBadge, GooglePlayBadge } from "@/components/icons";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/links";

const TITLE_ID = "download-app-title";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const BADGE_LINK_CLASS =
  "block rounded-3xl overflow-hidden bg-black shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] transition duration-200 ease-out hover:brightness-90 active:scale-[0.99] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2";

export function DownloadAppModal({
  onClose,
  triggerRef,
}: {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const trigger = triggerRef;
    return () => {
      const returnTo = trigger.current ?? previouslyFocused;
      returnTo?.focus();
    };
  }, [triggerRef]);

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

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8">
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
        id="download-carrot-modal"
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative flex w-full max-w-[840px] flex-col overflow-hidden bg-white rounded-[20px] md:rounded-3xl lg:rounded-4xl shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] px-6 py-10 md:px-16 md:py-16 focus-visible:outline-none"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-[22px] leading-none text-gray-400 transition duration-200 ease-in-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="mx-auto mb-8 w-24 md:w-32">
          <CarrotLogo idPrefix="download-modal-logo" className="h-auto w-full" />
        </div>

        <h2
          id={TITLE_ID}
          className="font-poly-sans-wide leading-[115%]! text-center text-[32px] md:text-[48px]"
        >
          Get the Carrot app
        </h2>
        <p className="mt-4 text-center text-[16px] leading-[1.5] lg:text-[18px] max-w-xl mx-auto">
          Find cashback offers near you, activate in a tap, and pay the way you
          already do. Once the purchase is verified, cashback lands
          automatically.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 min-[480px]:flex-row">
          <a
            aria-label="Download on the App Store"
            className={BADGE_LINK_CLASS}
            href={APP_STORE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <AppStoreBadge />
          </a>
          <a
            aria-label="Get it on Google Play"
            className={BADGE_LINK_CLASS}
            href={GOOGLE_PLAY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GooglePlayBadge />
          </a>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

