import type { Metadata } from "next";
import localFont from "next/font/local";

import { Analytics } from "@/components/Analytics";
import { Intercom } from "@/components/Intercom";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const gtAmerica = localFont({
  variable: "--font-gt-america",
  display: "swap",
  fallback: ["Arial"],
  src: [
    {
      path: "../../public/fonts/GT_America_Standard_Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GT_America_Standard_Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

const gtAmericaMono = localFont({
  variable: "--font-gt-america-mono",
  display: "swap",
  fallback: ["Arial"],
  src: [
    {
      path: "../../public/fonts/GT_America_Mono_Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

const polySansWide = localFont({
  variable: "--font-poly-sans-wide",
  display: "swap",
  fallback: ["Arial"],
  src: [
    {
      path: "../../public/fonts/PolySans_MedianWide.otf",
      weight: "600",
      style: "normal",
    },
  ],
});

const TITLE = "Carrot - The Way Marketing Should Be";
const DESCRIPTION =
  "Turn on steady, automated revenue with intelligent cashback offers. No upfront or monthly fee — you pay for revenue, not clicks.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Self-canonical. Per-page metadata overrides this with its own path; without
  // it, query-string and trailing-slash variants can be indexed separately.
  alternates: { canonical: "/" },
  // Filled from the environment so the token is not committed. Unset renders
  // no tag, which is the correct default before the property is verified.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Carrot",
    title: TITLE,
    description: DESCRIPTION,
    // TODO: still the Split Pay OG image — awaiting Carrot artwork.
    images: [{ url: "/seo/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/seo/og-image.png"],
  },
  // Generated from the delivered Icon.svg. The mark is much taller than it is
  // wide, so favicon.svg re-squares the artboard with padding rather than
  // letting it render edge-to-edge at 16px.
  icons: {
    icon: [
      { url: "/seo/favicon.svg", type: "image/svg+xml" },
      { url: "/seo/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/seo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      id="carrot-app"
      lang="en"
      translate="no"
      className={`${gtAmerica.variable} ${gtAmericaMono.variable} ${polySansWide.variable}`}
    >
      <head>
        {/* Motion wrappers server-render at opacity:0 and are revealed on
            hydration. Without this, scripting-disabled visitors see a blank
            page rather than an unanimated one. */}
        <noscript>
          <style>{`[data-motion-hidden]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="transition-colors duration-200 ease-in-out">
        {children}
        <Intercom />
        <Analytics />
      </body>
    </html>
  );
}
