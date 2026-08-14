import type { Metadata } from "next";

import { VerticalPage } from "@/components/product/VerticalPage";
import { VERTICALS } from "@/data/verticals";

const config = VERTICALS.hospitality;

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
};

export default function HospitalityPage() {
  return <VerticalPage config={config} />;
}
