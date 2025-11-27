import Enterprise from "@/features/(trip-website)/landing-pages/components/enterprise/enterprise";
import Features from "@/features/(trip-website)/landing-pages/components/enterprise/features";
import Incentives from "@/features/(trip-website)/landing-pages/components/enterprise/incentives";
import Objectives from "@/features/(trip-website)/landing-pages/components/enterprise/objectives";
import Purpose from "@/features/(trip-website)/landing-pages/components/enterprise/purpose";
import Results from "@/features/(trip-website)/landing-pages/components/enterprise/results";
import Story from "@/features/(trip-website)/landing-pages/components/enterprise/story";
import Partners from "@/features/(trip-website)/landing-pages/components/partners";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "EnterpriseMetadata",
  });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en"
      ? `${baseUrl}/enterprise`
      : `${baseUrl}/${locale}/enterprise`;

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
          url: "/assets/og/enterprise.webp",
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
          url: "/assets/og/enterprise.webp",
          alt: t("imageAlt"),
        },
      ],
    },
    keywords: t("keywords"),
    robots: "index, follow",
    publisher: "@PerkFlow",
  };
}

export default function EnterprisePage() {
  return (
    <>
      <Enterprise />
      <Partners />
      <Incentives />
      <Purpose />
      <Objectives />
      <Features />
      <Story />
      <Results />
    </>
  );
}
