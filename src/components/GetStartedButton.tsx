"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { GET_STARTED_MESSAGE, SUPPORT_EMAIL } from "@/lib/links";

/**
 * The site's primary merchant CTA. Opens Intercom with the canned get-started
 * prompt. Falls back to a prefilled mailto if the Messenger never loaded.
 *
 * A real `<button>`, not a link: it triggers an action on this page, so it must
 * not advertise navigation affordances (middle-click, "copy link address") that
 * would do nothing.
 */

export type GetStartedButtonProps = Omit<ButtonProps, "onClick">;

function openGetStarted() {
  if (typeof window.Intercom === "function") {
    window.Intercom("showNewMessage", GET_STARTED_MESSAGE);
    return;
  }
  const subject = encodeURIComponent("I'd like to get started with Carrot");
  const body = encodeURIComponent(GET_STARTED_MESSAGE);
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

export function GetStartedButton({
  children = "Get Started",
  ...props
}: GetStartedButtonProps) {
  return (
    <Button {...props} onClick={openGetStarted}>
      {children}
    </Button>
  );
}
