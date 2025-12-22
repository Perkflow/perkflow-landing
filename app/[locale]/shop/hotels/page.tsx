import HotelsContent from "@/features/(trip-website)/hotels/components/hotels-content";
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
    title: `Hotels - ${t("title")}`,
    description:
      "Find your perfect place to stay. Best hotels deals waiting for you!",
  };
}

export default function Page() {
  return <HotelsContent />;
}
