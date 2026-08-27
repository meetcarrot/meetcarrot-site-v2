import { VerticalPage } from "@/components/product/VerticalPage";
import { VERTICALS } from "@/data/verticals";
import { pageMetadata } from "@/lib/seo";

const config = VERTICALS.hospitality;

export const metadata = pageMetadata({
  title: config.metaTitle,
  description: config.metaDescription,
  path: "/hospitality",
});

export default function HospitalityPage() {
  return <VerticalPage config={config} />;
}
