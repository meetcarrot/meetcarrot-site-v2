import type { ReactNode } from "react";

export interface WinWinWinEntry {
  /** Who wins, e.g. "Customers win". */
  title: string;
  copy: ReactNode;
}

export interface WinWinWinProps {
  heading?: string;
  entries: readonly [WinWinWinEntry, WinWinWinEntry, WinWinWinEntry];
}

/**
 * Three equal panels — the section only ever holds three, so the tuple type is
 * what keeps a fourth from silently breaking the `lg:grid-cols-3` rhythm.
 */
export function WinWinWin({ heading = "Win-Win-Win", entries }: WinWinWinProps) {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto px-6 container lg:max-w-324">
        <h2 className="leading-[115%]! font-poly-sans-wide text-[32px] md:text-[48px] lg:text-[56px] text-center">
          {heading}
        </h2>
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {entries.map((entry) => (
            <div
              key={entry.title}
              className="bg-white rounded-[20px] lg:rounded-4xl p-6 lg:p-10 shadow-[0_2px_6px_0_rgba(0,0,0,0.06)]"
            >
              <p className="font-medium text-[18px] md:text-[24px] mb-3">
                {entry.title}
              </p>
              <p className="text-[16px] font-normal leading-[1.33] lg:text-[18px]">
                {entry.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
