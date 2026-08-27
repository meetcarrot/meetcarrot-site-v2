import { VerticalPage } from "@/components/product/VerticalPage";
import { VERTICALS } from "@/data/verticals";
import { pageMetadata } from "@/lib/seo";

const config = VERTICALS.services;

export const metadata = pageMetadata({
  title: config.metaTitle,
  description: config.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return <VerticalPage config={config} />;
}
