import type { Metadata } from "next";

import { VerticalPage } from "@/components/product/VerticalPage";
import { VERTICALS } from "@/data/verticals";

const config = VERTICALS.services;

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <VerticalPage config={config} />;
}
