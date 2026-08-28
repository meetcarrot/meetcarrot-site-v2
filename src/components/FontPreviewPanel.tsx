"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  DEFAULT_PREVIEW,
  FONT_PREVIEW_STORAGE_KEY,
  PREVIEW_FONTS,
  PREVIEW_PAIRINGS,
  familyForFontId,
  type PreviewPairing,
} from "@/lib/font-preview";
import { cn } from "@/lib/utils";

const OPEN_KEY = "carrot:font-preview-open";

interface PreviewChoice {
  body: string;
  headline: string;
}

function readStoredChoice(): PreviewChoice {
  try {
    const raw = localStorage.getItem(FONT_PREVIEW_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREVIEW };
    const parsed = JSON.parse(raw) as Partial<PreviewChoice>;
    return {
      body: parsed.body ?? DEFAULT_PREVIEW.body,
      headline: parsed.headline ?? DEFAULT_PREVIEW.headline,
    };
  } catch {
    return { ...DEFAULT_PREVIEW };
  }
}

function applyChoice(choice: PreviewChoice) {
  const root = document.documentElement;
  const body = familyForFontId(choice.body);
  const headline = familyForFontId(choice.headline);
  if (body) root.style.setProperty("--font-body", body);
  if (headline) root.style.setProperty("--font-headline", headline);
}

function matchingPairing(choice: PreviewChoice): PreviewPairing | undefined {
  return PREVIEW_PAIRINGS.find(
    (pair) => pair.body === choice.body && pair.headline === choice.headline,
  );
}

function FontSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <label className="flex min-w-0 items-center gap-2 text-[12px] text-gray-600">
      <span className="shrink-0 font-medium text-gray-400">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="max-w-48 truncate rounded-lg border border-gray-200 bg-white px-2 py-1 text-[12px] text-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-pink/80"
      >
        {PREVIEW_FONTS.map((font) => (
          <option key={font.id} value={font.id}>
            {font.label}
            {font.note ? ` (${font.note})` : ""}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * Dev-only type tester. Renders a bar above the fixed header so every route
 * can swap body + headline faces. Pairing chips apply both at once; the
 * dropdowns still allow any mix.
 */
export function FontPreviewPanel() {
  const barRef = useRef<HTMLDivElement>(null);
  const bodyId = useId();
  const headlineId = useId();
  const [open, setOpen] = useState(true);
  const [choice, setChoice] = useState<PreviewChoice>({ ...DEFAULT_PREVIEW });

  const persist = useCallback((next: PreviewChoice) => {
    setChoice(next);
    applyChoice(next);
    localStorage.setItem(FONT_PREVIEW_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const persistOpen = useCallback((next: boolean) => {
    setOpen(next);
    localStorage.setItem(OPEN_KEY, next ? "1" : "0");
  }, []);

  useEffect(() => {
    // Restore off the effect body so the server markup renders first and the
    // stored choice lands on the next frame.
    const id = window.setTimeout(() => {
      const stored = readStoredChoice();
      setChoice(stored);
      applyChoice(stored);
      if (localStorage.getItem(OPEN_KEY) === "0") setOpen(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      root.style.setProperty("--dev-font-panel-h", "0px");
      return;
    }
    const node = barRef.current;
    if (!node) return;
    const sync = () => {
      root.style.setProperty("--dev-font-panel-h", `${node.offsetHeight}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => {
      observer.disconnect();
      root.style.setProperty("--dev-font-panel-h", "0px");
    };
  }, [open]);

  const activePair = matchingPairing(choice);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => persistOpen(true)}
        className="fixed top-2 right-2 z-[60] rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-gray-400 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        style={{ fontFamily: "var(--font-gt-america), Arial, sans-serif" }}
      >
        Fonts
      </button>
    );
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist:wght@400;500;600&family=Bricolage+Grotesque:opsz,wght@12..96,600&family=Nunito:wght@400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@600,700&f[]=cabinet-grotesk@500,600,700&display=swap"
      />
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[60] border-b border-gray-200 bg-white"
        style={{ fontFamily: "var(--font-gt-america), Arial, sans-serif" }}
      >
        <div className="mx-auto flex max-w-324 flex-col gap-2 px-4 py-2 lg:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-[11px] font-medium tracking-[0.06em] text-pink uppercase">
              Font preview
            </p>
            <FontSelect
              id={bodyId}
              label="Body"
              value={choice.body}
              onChange={(body) => persist({ ...choice, body })}
            />
            <FontSelect
              id={headlineId}
              label="Headline"
              value={choice.headline}
              onChange={(headline) => persist({ ...choice, headline })}
            />
            <button
              type="button"
              onClick={() => persistOpen(false)}
              className="ml-auto text-[12px] text-gray-600 underline-offset-2 hover:text-gray-400 hover:underline"
            >
              Hide
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {PREVIEW_PAIRINGS.map((pair) => {
              const selected = activePair?.id === pair.id;
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() =>
                    persist({ body: pair.body, headline: pair.headline })
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] leading-none transition-colors",
                    selected
                      ? "border-pink bg-pink text-white"
                      : "border-gray-200 bg-gray-100 text-gray-400 hover:border-gray-300",
                  )}
                >
                  {pair.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[9px] font-medium tracking-[0.04em] uppercase",
                      selected
                        ? "bg-white/20 text-white"
                        : pair.badge === "now"
                          ? "bg-gray-200 text-gray-600"
                          : pair.badge === "orig"
                            ? "bg-gray-200 text-gray-600"
                            : "bg-pink-50 text-pink",
                    )}
                  >
                    {pair.badge === "now"
                      ? "Now"
                      : pair.badge === "orig"
                        ? "Orig"
                        : "Rec"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
