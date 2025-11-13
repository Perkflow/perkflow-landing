import Accomplishment from "@/features/(trip-website)/landing-pages/components/awards/accomplishment";
import Awards from "@/features/(trip-website)/landing-pages/components/awards/awards";
import Celebrate from "@/features/(trip-website)/landing-pages/components/awards/celebrate";
import Milestone from "@/features/(trip-website)/landing-pages/components/awards/milestone";
import Recognition from "@/features/(trip-website)/landing-pages/components/awards/recognition";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "AwardCeremonyMetadata",
  });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en" ? `${baseUrl}/award-ceremony` : `${baseUrl}/${locale}/award-ceremony`;

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
          url: "/assets/og/award-ceremony.webp",
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
          url: "/assets/og/award-ceremony.webp",
          alt: t("imageAlt"),
        },
      ],
    },
    keywords: t("keywords"),
    robots: "index, follow",
    publisher: "@PerkFlow",
  };
}

export default function AwardsPage() {
  return (
    <>
      <Awards />
      <Recognition />
      <Celebrate />
      <Milestone />
      <Accomplishment />
    </>
  );
}
