import { VerticalPage } from "@/components/product/VerticalPage";
import { VERTICALS } from "@/data/verticals";
import { pageMetadata } from "@/lib/seo";

const config = VERTICALS.retail;

export const metadata = pageMetadata({
  title: config.metaTitle,
  description: config.metaDescription,
  path: "/retail",
});

export default function RetailPage() {
  return <VerticalPage config={config} />;
}
