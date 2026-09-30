import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Carrot",
    short_name: "Carrot",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#f8f8f5",
    theme_color: "#ff0063",
    icons: [
      {
        src: "/seo/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/seo/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

export const dynamic = "force-static";
