import Link from "next/link";

import {
  AppStoreBadge,
  CarIcon,
  GooglePlayBadge,
  MortgageIcon,
  OtherBillsIcon,
  RentIcon,
  SplitPayLogoWhite,
} from "@/components/icons";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/rent-app-best-way-to-pay-rent/id6448634850";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=xyz.visible.visiblerentapp";

const BADGE_LINK_CLASS =
  "block rounded-3xl relative shadow-[0_12px_24px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-1px_1px_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.45)] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-linear-to-b before:from-white before:to-transparent before:opacity-10 transition duration-200 ease-out hover:brightness-85 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";

// The two column families use slightly different hover selectors on the target:
// the icon columns recolour every `path`, the text columns exclude gradient fills.
const PRODUCT_LINK_CLASS =
  "group inline-flex items-center gap-3 hover:[&_svg_path]:fill-gray-600 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";
const TEXT_LINK_CLASS =
  "group inline-flex items-center gap-3 hover:[&_svg_path:not([fill^=url])]:fill-gray-600 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200/80 focus-visible:ring-offset-white transition duration-200 ease-in-out";

const COLUMN_LABEL_CLASS =
  "font-medium tracking-[-0.56px] text-orange-100 text-[12px] mb-6";
const LINK_TEXT_CLASS =
  "text-[16px] font-normal leading-[1.33] text-white group-hover:text-gray-600";
const MUTED_TEXT_CLASS = "text-[16px] font-normal leading-[1.33] text-gray-600";

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;

const PRODUCT_LINKS: ReadonlyArray<{
  href: string;
  label: string;
  Icon: IconComponent;
}> = [
  { href: "/rent", label: "Rent", Icon: RentIcon },
  { href: "/mortgage", label: "Mortgage", Icon: MortgageIcon },
  { href: "/car", label: "Car payment", Icon: CarIcon },
];

const LEARN_MORE_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/safety-and-security", label: "Safety & security" },
  { href: "/about-us", label: "About us" },
  { href: "/help", label: "Help & FAQs" },
  { href: "/terms", label: "Terms of service" },
  { href: "/privacy", label: "Privacy policy" },
];

/**
 * `variant` namespaces the logo's gradient ids. The footer renders this block
 * three times (one per breakpoint layout); without distinct ids the browser
 * resolves them all to the first copy, which is `display:none` and paints nothing.
 */
function BrandBlock({ variant }: { variant: string }) {
  return (
    <div>
      <div>
        <SplitPayLogoWhite idPrefix={`footer-${variant}`} width={152} height={34} />
        <p className="text-[16px] font-normal leading-[1.33] text-white mt-6">
          Split your bills into two.{" "}
          <br className="md:hidden" />
          Less stress, better timing.
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

function ProductsNav() {
  return (
    <nav aria-label="Products">
      <p className={COLUMN_LABEL_CLASS}>PRODUCTS</p>
      <ul className="grid grid-cols-1 gap-4">
        {PRODUCT_LINKS.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link className={PRODUCT_LINK_CLASS} href={href}>
              <Icon />
              <p className={LINK_TEXT_CLASS}>{label}</p>
            </Link>
          </li>
        ))}
        <li>
          {/* Not yet shipped on the target, so it renders as plain text. */}
          <div className={PRODUCT_LINK_CLASS}>
            <OtherBillsIcon />
            <p className={MUTED_TEXT_CLASS}>Other bills (coming soon)</p>
          </div>
        </li>
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
      {/* Literal year — the target ships a static 2026, not a computed date. */}
      <p className="font-normal text-[12px] text-gray-600">
        © 2026 Visible Ideas Inc.
      </p>
      <p className="font-normal text-[12px] text-gray-600 mt-2">
        Split Pay™ is a financial technology company, not a bank. Banking
        services are provided by Evolve Bank &amp; Trust, Members FDIC.
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
          <BrandBlock variant="mobile" />
          <ProductsNav />
          <LearnMoreNav />
          <LegalBlock />
        </div>
        <div className="hidden md:grid grid-cols-1 gap-14 lg:hidden">
          <BrandBlock variant="md" />
          <div className="grid grid-cols-2 gap-14">
            <ProductsNav />
            <LearnMoreNav />
          </div>
          <LegalBlock />
        </div>
        <div className="hidden lg:flex items-start justify-between">
          <div>
            <BrandBlock variant="lg" />
            <div className="mt-16">
              <LegalBlock />
            </div>
          </div>
          <div>
            <ProductsNav />
          </div>
          <div>
            <LearnMoreNav />
          </div>
        </div>
      </div>
    </footer>
  );
}
