import ShopContent from "@/features/(trip-website)/shop/components/shop-content";
import { giftCardProducts } from "@/features/(trip-website)/shop/data/products";
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
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en" ? `${baseUrl}/shop` : `${baseUrl}/${locale}/shop`;

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      phoneNumbers: "+1 (716) 451-3912",
      emails: "hello@perkflow.io",
      images: [
        {
          url: "/assets/og/shop.webp",
          width: 1200,
          height: 628,
          alt: t("imageAlt"),
          type: "image/webp",
        },
      ],
      url: canonicalUrl,
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      site: "@PerkFlow",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: [
        {
          url: "/assets/og/shop.webp",
          alt: t("imageAlt"),
        },
      ],
    },
    keywords: t("keywords"),
    robots: "index, follow",
    publisher: "@PerkFlow",
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <ShopContent
      initialProducts={giftCardProducts}
      initialCategory={resolvedSearchParams.category || "all"}
      initialSearch={resolvedSearchParams.search || ""}
      initialPage={Number(resolvedSearchParams.page) || 1}
    />
  );
}
