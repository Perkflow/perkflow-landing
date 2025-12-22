import ExperiencesContent from "@/features/(trip-website)/experiences/components/experiences-content";
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
    title: `Experiences - ${t("title")}`,
    description:
      "Discover unforgettable experiences and activities around the world.",
  };
}

export default function Page() {
  return <ExperiencesContent />;
}
