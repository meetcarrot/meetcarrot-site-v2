import type { Metadata } from "next";
import localFont from "next/font/local";
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
  metadataBase: new URL("https://meetcarrot.xyz"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://meetcarrot.xyz",
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
  // TODO: favicons are still Split Pay's — awaiting the Carrot icon asset.
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
      <body className="transition-colors duration-200 ease-in-out">
        {children}
      </body>
    </html>
  );
}
