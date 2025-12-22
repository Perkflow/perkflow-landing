import MobileTopupPage from "@/features/(trip-website)/mobile-topup/components/mobile-topup-page";
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
        title: `Mobile Top-up - ${t("title")}`, // Using shop title as base for now, can be specific later
        description: "Send mobile airtime and data to over 160 countries instantly. Secure and fast international mobile recharge.",
    };
}

export default function Page() {
    return <MobileTopupPage />;
}
