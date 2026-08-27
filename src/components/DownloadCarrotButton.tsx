"use client";

import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

import { DownloadAppModal } from "@/components/DownloadAppModal";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Header-only consumer CTA. Opens the App Store / Google Play modal.
 * Every other primary button on the site is `GetStartedButton` (Intercom).
 */

export type DownloadCarrotButtonProps = Omit<ButtonProps, "onClick">;

export function DownloadCarrotButton({
  children = "Download Carrot",
  ...props
}: DownloadCarrotButtonProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        {...props}
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="download-carrot-modal"
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      <AnimatePresence>
        {open ? (
          <DownloadAppModal
            onClose={() => setOpen(false)}
            triggerRef={triggerRef}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
