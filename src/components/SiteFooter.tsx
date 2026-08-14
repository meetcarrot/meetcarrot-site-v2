import Link from "next/link";

import { CarrotLogoWhite } from "@/components/carrot-logo";

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

const BADGE_LINK_CLASS =
  "block rounded-3xl relative shadow-[0_12px_24px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.45)] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-linear-to-b before:from-white before:to-transparent before:opacity-10 transition duration-200 ease-out hover:brightness-85 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";

// The two column families use slightly different hover selectors on the target:
// the icon columns recolour every `path`, the text columns exclude gradient fills.
const PRODUCT_LINK_CLASS =
  "group inline-flex items-center gap-3 hover:[&_svg_path]:fill-gray-600 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";
const TEXT_LINK_CLASS =
  "group inline-flex items-center gap-3 hover:[&_svg_path:not([fill^=url])]:fill-gray-600 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-hot/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";

const COLUMN_LABEL_CLASS =
  "font-medium tracking-[-0.56px] text-pink text-[12px] mb-6";
const LINK_TEXT_CLASS =
  "text-[16px] font-normal leading-[1.33] text-white group-hover:text-gray-600";

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;

// TODO: placeholder icons — the four animated category icons are still pending.
const CATEGORY_LINKS: ReadonlyArray<{
  href: string;
  label: string;
  Icon: IconComponent;
}> = [
  { href: "/hospitality", label: "Hospitality", Icon: RentIcon },
  { href: "/retail", label: "Retail", Icon: MortgageIcon },
  { href: "/services", label: "Services", Icon: CarIcon },
  { href: "/digital", label: "Digital", Icon: OtherBillsIcon },
];

const LEARN_MORE_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/safety-and-security", label: "Safety & security" },
  { href: "/help", label: "Help & FAQs" },
  { href: "/terms", label: "Terms of service" },
  { href: "/privacy", label: "Privacy policy" },
];

/**
 * The footer renders this block three times, one per breakpoint layout. The
 * white logo cut is a flat fill with no gradient ids, so the copies can't
 * collide the way a gradient lockup would.
 */
function BrandBlock() {
  return (
    <div>
      <div>
        <CarrotLogoWhite width={140} height={63} />
        {/* TODO: awaiting the final footer tagline. */}
        <p className="text-[16px] font-normal leading-[1.33] text-white mt-6">
          Steady revenue on autopilot.{" "}
          <br className="md:hidden" />
          Intelligent cashback offers for local business.
        </p>
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 min-[401px]:flex-row min-[401px]:items-center min-[401px]:gap-6">
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
  );
}

function CategoriesNav() {
  return (
    <nav aria-label="Categories">
      <p className={COLUMN_LABEL_CLASS}>CATEGORIES</p>
      <ul className="grid grid-cols-1 gap-4">
        {CATEGORY_LINKS.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link className={PRODUCT_LINK_CLASS} href={href}>
              <Icon />
              <p className={LINK_TEXT_CLASS}>{label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function LearnMoreNav() {
  return (
    <nav aria-label="Learn more">
      <p className={COLUMN_LABEL_CLASS}>LEARN MORE</p>
      <ul className="grid grid-cols-1 gap-4">
        {LEARN_MORE_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link className={TEXT_LINK_CLASS} href={href}>
              <p className={LINK_TEXT_CLASS}>{label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function LegalBlock() {
  return (
    <div className="max-w-90">
      <p className="font-normal text-[12px] text-gray-600">
        © 2026 Carrot Company Limited, USA. All rights reserved.
      </p>
      <p className="font-normal text-[12px] text-gray-600 mt-2">
        Carrot is a marketing technology company, not a bank. Payments are
        processed by Stripe.
      </p>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-14 lg:pt-24 lg:pb-30 bg-black" data-header-theme="black">
      <div className="mx-auto px-6 container lg:max-w-324">
        {/*
          The target ships the same content three times, each gated by a
          breakpoint, rather than one responsive grid. Reproduced verbatim so
          the breakpoint behaviour matches.
        */}
        <div className="grid grid-cols-1 gap-14 md:hidden">
          <BrandBlock />
          <CategoriesNav />
          <LearnMoreNav />
          <LegalBlock />
        </div>
        <div className="hidden md:grid grid-cols-1 gap-14 lg:hidden">
          <BrandBlock />
          <div className="grid grid-cols-2 gap-14">
            <CategoriesNav />
            <LearnMoreNav />
          </div>
          <LegalBlock />
        </div>
        <div className="hidden lg:flex items-start justify-between">
          <div>
            <BrandBlock />
            <div className="mt-16">
              <LegalBlock />
            </div>
          </div>
          <div>
            <CategoriesNav />
          </div>
          <div>
            <LearnMoreNav />
          </div>
        </div>
      </div>
    </footer>
  );
}
