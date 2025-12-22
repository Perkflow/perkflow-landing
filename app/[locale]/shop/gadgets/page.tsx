import GadgetsContent from "@/features/(trip-website)/gadgets/components/gadgets-content";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ShopMetadata",
  });

  return {
    title: `Gadgets - ${t("title")}`,
    description:
      "Discover the latest gadgets and electronics. Best deals on smartphones, laptops, and more.",
  };
}

export default function Page() {
  return <GadgetsContent />;
}
