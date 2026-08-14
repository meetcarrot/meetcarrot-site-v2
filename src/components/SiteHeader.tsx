"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CarrotLogo } from "@/components/carrot-logo";
import { MenuIcon } from "@/components/icons";
import { MobileMenu } from "@/components/MobileMenu";
import { Button, ButtonLink } from "@/components/ui/button";
import { GET_STARTED_URL, MERCHANT_LOGIN_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

export type HeaderTheme = "tint" | "black" | "light";

function isHeaderTheme(value: string | undefined): value is HeaderTheme {
  return value === "tint" || value === "black" || value === "light";
}

/**
 * Resolves which `[data-header-theme]` section currently sits behind the header
 * band — the section spanning the viewport's top edge.
 *
 * Deliberately a scroll listener rather than an IntersectionObserver: the
 * natural observer formulation (`rootMargin: "0px 0px -100% 0px"`) collapses the
 * root to a zero-height line, and a zero-area rect never reports an
 * intersection, so the header would sit on its default theme forever.
 */
function useHeaderTheme(): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>("light");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]"),
    );
    if (sections.length === 0) return;

    let frame = 0;
    const resolve = () => {
      frame = 0;
      // Last in document order wins where two sections meet at the top edge.
      const active = sections
        .filter((section) => {
          const { top, bottom } = section.getBoundingClientRect();
          return top <= 0 && bottom > 0;
        })
        .pop();
      const next = active?.dataset.headerTheme;
      setTheme(isHeaderTheme(next) ? next : "light");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(resolve);
    };

    resolve();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return theme;
}

export function SiteHeader() {
  const theme = useHeaderTheme();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // `tint` and `black` share a treatment: pink labels, no backdrop blur.
  const onDarkBackdrop = theme === "tint" || theme === "black";
  const pillVariant = onDarkBackdrop ? "darkOnTint" : "dark";

  return (
    <>
      <header
        aria-hidden="false"
        className="fixed inset-x-0 top-0 z-20 transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] visible opacity-100"
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 backdrop-blur-md transition-opacity duration-300 ease-out mask-[linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]",
            onDarkBackdrop ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t transition-[opacity,--tw-gradient-from,--tw-gradient-to] duration-300 ease-out from-pink-50/10 to-pink-50 mask-[linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] opacity-0"
        />
        <div className="relative">
          <div className="w-full">
            <div className="mx-auto px-6 flex justify-between items-center h-16.5 md:h-28">
              {/*
                Narrower than the lockup it replaced: Carrot's mark is ~2.23:1,
                so 152px wide would stand 68px tall and overflow the 66px mobile
                header band.
              */}
              <Link
                aria-label="Carrot home"
                href="/"
                className="block rounded mr-2 w-24 md:w-32 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2"
              >
                <CarrotLogo idPrefix="header-logo" className="w-full h-auto" />
              </Link>
              <div className="flex items-center justify-end gap-4 flex-1">
                <ButtonLink
                  href={GET_STARTED_URL}
                  variant={pillVariant}
                  size="default"
                  className="max-w-45 hidden lg:inline-flex"
                >
                  Get started
                </ButtonLink>
                <ButtonLink
                  href={MERCHANT_LOGIN_URL}
                  variant={pillVariant}
                  size="compact"
                  className="max-w-20 md:max-w-30 whitespace-nowrap"
                >
                  Sign In
                </ButtonLink>
                <Button
                  variant="dark"
                  size="icon"
                  className="text-gray-100"
                  aria-label="Open menu"
                  aria-controls="public-header-menu"
                  aria-expanded={open}
                  onClick={() => setOpen(true)}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center transition-transform duration-200 ease-out",
                      open ? "rotate-90" : "rotate-0",
                    )}
                  >
                    <MenuIcon />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {open ? <MobileMenu onClose={close} /> : null}
    </>
  );
}
