import type { Metadata } from "next";

import { VerticalPage } from "@/components/product/VerticalPage";
import { VERTICALS } from "@/data/verticals";

const config = VERTICALS.digital;

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
};

export default function DigitalPage() {
  return <VerticalPage config={config} />;
}
