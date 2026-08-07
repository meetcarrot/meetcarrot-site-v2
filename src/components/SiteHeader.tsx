"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MenuIcon, SplitPayLogo } from "@/components/icons";
import { MobileMenu } from "@/components/MobileMenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HeaderTheme = "golden" | "black" | "light";

function isHeaderTheme(value: string | undefined): value is HeaderTheme {
  return value === "golden" || value === "black" || value === "light";
}

/**
 * Resolves which `[data-header-theme]` section currently sits behind the header
 * band. The root margin collapses the viewport to a line along its top edge, so
 * a section intersects exactly while it is the one under the header.
 */
function useHeaderTheme(): HeaderTheme {
  const [theme, setTheme] = useState<HeaderTheme>("light");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]"),
    );
    if (sections.length === 0) return;

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        // Document order, so the lower section wins where two meet at the band.
        const active = sections.filter((section) => intersecting.has(section)).pop();
        const next = active?.dataset.headerTheme;
        setTheme(isHeaderTheme(next) ? next : "light");
      },
      { rootMargin: "0px 0px -100% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return theme;
}

export function SiteHeader() {
  const theme = useHeaderTheme();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // `golden` and `black` share a treatment: golden labels, no backdrop blur.
  const onDarkBackdrop = theme === "golden" || theme === "black";
  const pillVariant = onDarkBackdrop ? "darkOnGolden" : "dark";

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
          className="pointer-events-none absolute inset-0 bg-linear-to-t transition-[opacity,--tw-gradient-from,--tw-gradient-to] duration-300 ease-out from-golden/10 to-golden mask-[linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] opacity-0"
        />
        <div className="relative">
          <div className="w-full">
            <div className="mx-auto px-6 flex justify-between items-center h-16.5 md:h-28">
              <Link
                aria-label="Split Pay home"
                href="/"
                className="block rounded mr-2 w-38 md:w-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out focus-visible:ring-offset-2"
              >
                <SplitPayLogo className="transition-colors duration-200 w-full text-gray-400" />
              </Link>
              <div className="flex items-center justify-end gap-4 flex-1">
                <Button
                  variant={pillVariant}
                  size="default"
                  className="max-w-45 hidden lg:flex items-center justify-center"
                >
                  Get started
                </Button>
                <Button
                  variant={pillVariant}
                  size="compact"
                  className="max-w-20 md:max-w-30 whitespace-nowrap items-center justify-center"
                >
                  Sign In
                </Button>
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
