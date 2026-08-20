import Link from "next/link";

import { CarrotLogo } from "@/components/carrot-logo";

import {
  AppStoreBadge,
  CarIcon,
  GooglePlayBadge,
  MortgageIcon,
  OtherBillsIcon,
  RentIcon,
} from "@/components/icons";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/carrot-cashback/id1663585181";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=xyz.meetcarrot.mobile&hl=en_US";

/**
 * The store badges are dark lockups — white type over a half-opacity black
 * plate. On the old black footer the plate blended into the background; on a
 * light one it needs its own solid fill, or the badge reads as washed-out grey.
 */
const BADGE_LINK_CLASS =
  "block rounded-3xl overflow-hidden bg-black shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] transition duration-200 ease-out hover:brightness-90 active:scale-[0.99] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-gray-100 focus-visible:ring-offset-2";

/**
 * The category icons ship with a hard-coded white fill for the old dark footer,
 * so they are recoloured here rather than in the shared icon set — the same
 * icons are used on dark surfaces elsewhere.
 */
const NAV_LINK_CLASS =
  "group inline-flex items-center gap-3 [&_svg_path]:fill-gray-400 [&_svg_path]:transition-colors hover:[&_svg_path]:fill-pink-dark focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-gray-100 focus-visible:ring-offset-2 rounded";
const TEXT_LINK_CLASS =
  "group inline-flex items-center gap-3 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-gray-100 focus-visible:ring-offset-2 rounded";

const COLUMN_LABEL_CLASS =
  "font-medium tracking-[0.06em] text-pink-dark text-[12px] uppercase mb-5";
const LINK_TEXT_CLASS =
  "text-[16px] font-normal leading-[1.33] transition-colors duration-200 group-hover:text-pink-dark";

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;

// TODO: placeholder icons — the four category marks are still the leftover
// rent/mortgage/car set. The illustrated versions are too detailed at 16px.
const CATEGORY_LINKS: ReadonlyArray<{
  href?: string;
  label: string;
  Icon: IconComponent;
  comingSoon?: boolean;
}> = [
  { href: "/hospitality", label: "Hospitality", Icon: RentIcon },
  { href: "/retail", label: "Retail", Icon: MortgageIcon },
  { href: "/services", label: "Services", Icon: CarIcon },
  { label: "Digital", Icon: OtherBillsIcon, comingSoon: true },
];

const LEARN_MORE_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/safety-and-security", label: "Safety & security" },
  { href: "/help", label: "Help & FAQs" },
  { href: "/terms", label: "Terms of service" },
  { href: "/privacy", label: "Privacy policy" },
];

/**
 * Footer. Sits on the page background rather than its own black band, so the
 * page ends as one continuous surface.
 *
 * One responsive grid, rendered once. It previously shipped the same three
 * blocks three times over, each gated to a breakpoint, which meant every copy
 * change had to be made in triplicate.
 */
export function SiteFooter() {
  return (
    <footer
      className="bg-gray-100 py-14 lg:py-20"
      data-header-theme="light"
    >
      <div className="mx-auto px-6 container lg:max-w-324">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <CarrotLogo idPrefix="footer-logo" width={96} height={43} />
            <p className="text-[16px] font-normal leading-[1.33] mt-5 max-w-70">
              Pay for Revenue, Not Clicks
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 min-[401px]:flex-row min-[401px]:items-center">
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
          </div>

          <nav aria-label="Categories">
            <p className={COLUMN_LABEL_CLASS}>Categories</p>
            <ul className="grid grid-cols-1 gap-4">
              {CATEGORY_LINKS.map(({ href, label, Icon, comingSoon }) => (
                <li key={label}>
                  {comingSoon || !href ? (
                    <div className="inline-flex items-center gap-3 [&_svg_path]:fill-gray-400">
                      <Icon />
                      <span className="text-[16px] font-normal leading-[1.33] text-gray-600">
                        {label} (coming soon)
                      </span>
                    </div>
                  ) : (
                    <Link className={NAV_LINK_CLASS} href={href}>
                      <Icon />
                      <span className={LINK_TEXT_CLASS}>{label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Learn more">
            <p className={COLUMN_LABEL_CLASS}>Learn more</p>
            <ul className="grid grid-cols-1 gap-4">
              {LEARN_MORE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link className={TEXT_LINK_CLASS} href={href}>
                    <span className={LINK_TEXT_CLASS}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/*
          `text-gray-400/70`, not `text-gray-600`: the muted token is #90919b,
          which lands at 2.9:1 on this background — fine as white-on-black in the
          old footer, well under the 4.5:1 floor here. Compositing the ink colour
          at 70% clears it.
        */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="font-normal text-[12px] leading-[1.5] text-gray-400/70 max-w-180">
            © 2026 Carrot Company Limited, USA. Carrot is a technology company
            that provides cashback services. All payments and remittances are
            handled by Stripe.
          </p>
        </div>
      </div>
    </footer>
  );
}
