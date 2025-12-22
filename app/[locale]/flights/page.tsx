import FlightsPage from "@/features/(trip-website)/flights/components/flights-page";
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
        title: `Flights - ${t("title")}`,
        description: "Best deals are waiting for you! Explore 900+ international airlines.",
    };
}

export default function Page() {
    return <FlightsPage />;
}
