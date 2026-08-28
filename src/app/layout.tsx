import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Analytics } from "@/components/Analytics";
import { FontPreviewPanel } from "@/components/FontPreviewPanel";
import { Intercom } from "@/components/Intercom";
import { JsonLd } from "@/components/JsonLd";
import { SkipToContent } from "@/components/SkipToContent";
import { APP_STORE_ID } from "@/lib/links";
import { fontPreviewBootScript } from "@/lib/font-preview";
import { SITE_DESCRIPTION, SITE_TITLE, siteGraphJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const gtAmerica = localFont({
  variable: "--font-gt-america",
  display: "swap",
  preload: false,
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
  preload: false,
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
  preload: false,
  fallback: ["Arial"],
  src: [
    {
      path: "../../public/fonts/PolySans_MedianWide.otf",
      weight: "600",
      style: "normal",
    },
  ],
});

const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["Arial"],
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

const TITLE = SITE_TITLE;
const DESCRIPTION = SITE_DESCRIPTION;

export const viewport: Viewport = {
  themeColor: "#f8f8f5",
  width: "device-width",
  initialScale: 1,
};

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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  itunes: { appId: APP_STORE_ID },
  formatDetection: { telephone: false, email: false, address: false },
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
      className={`${satoshi.variable} ${gtAmerica.variable} ${gtAmericaMono.variable} ${polySansWide.variable}`}
    >
      <head>
        {/* Motion wrappers server-render at opacity:0 and are revealed on
            hydration. Without this, scripting-disabled visitors see a blank
            page rather than an unanimated one. */}
        <noscript>
          <style>{`[data-motion-hidden]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600&display=swap"
        />
        {process.env.NODE_ENV === "development" ? (
          <script
            dangerouslySetInnerHTML={{ __html: fontPreviewBootScript() }}
          />
        ) : null}
      </head>
      <body className="transition-colors duration-200 ease-in-out">
        {process.env.NODE_ENV === "development" ? <FontPreviewPanel /> : null}
        <SkipToContent />
        {children}
        <JsonLd data={siteGraphJsonLd()} />
        <Intercom />
        <Analytics />
      </body>
    </html>
  );
}
