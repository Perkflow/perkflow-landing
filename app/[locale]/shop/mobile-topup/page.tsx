import MobileTopupContent from "@/features/(trip-website)/mobile-topup/components/mobile-topup-content";
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
    title: `Mobile Top-up - ${t("title")}`,
    description:
      "Send mobile airtime and data to over 160 countries instantly. Secure and fast international mobile recharge.",
  };
}

export default function Page() {
  return <MobileTopupContent />;
}
