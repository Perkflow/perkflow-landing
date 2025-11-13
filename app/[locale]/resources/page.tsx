import RecentArticles from "@/features/(trip-website)/landing-pages/components/resources/recent-articles";
import Recongnition from "@/features/(trip-website)/landing-pages/components/resources/reconginition";
import Resources from "@/features/(trip-website)/landing-pages/components/resources/resources";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ResourcesMetadata",
  });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en"
      ? `${baseUrl}/resources`
      : `${baseUrl}/${locale}/resources`;

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
          url: "/assets/og/resources.webp",
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
          url: "/assets/og/resources.webp",
          alt: t("imageAlt"),
        },
      ],
    },
    keywords: t("keywords"),
    robots: "index, follow",
    publisher: "@PerkFlow",
  };
}

export const revalidate = 300; // ISR: cache this page for 5 minutes

export default async function ResourcesPage() {
  return (
    <div>
      <Resources />
      <Recongnition />
      <RecentArticles />
    </div>
  );
}
