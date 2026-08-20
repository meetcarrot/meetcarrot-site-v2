"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { GET_STARTED_MESSAGE, SUPPORT_EMAIL } from "@/lib/links";

/**
 * The site's primary CTA. Opens the Intercom Messenger with a short welcome
 * and labeled blanks already in the composer, so the first click starts a
 * conversation with the details we need to follow up.
 *
 * A real `<button>`, not a link: it triggers an action on this page, so it must
 * not advertise navigation affordances (middle-click, "copy link address") that
 * would do nothing.
 */

export interface GetStartedButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Override the prefill — e.g. to name the vertical the visitor came from. */
  message?: string;
}

export function GetStartedButton({
  message = GET_STARTED_MESSAGE,
  children = "Get started",
  ...props
}: GetStartedButtonProps) {
  function handleClick() {
    if (window.Intercom) {
      window.Intercom("showNewMessage", message);
      return;
    }
    // Ad blockers and privacy extensions routinely drop the Messenger. Without
    // this the site's main CTA would silently do nothing for those visitors.
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      "Getting started with Carrot",
    )}&body=${encodeURIComponent(message)}`;
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
