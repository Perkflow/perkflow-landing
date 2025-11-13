import FAQ from "@/features/(trip-website)/components/faq";
import GiftHeroSection from "@/features/(trip-website)/gifts/components/gift-hero";
import MakeGiftingSection from "@/features/(trip-website)/gifts/components/make-gifting";
import RecognizeAchievementsSection from "@/features/(trip-website)/gifts/components/recognize-achievement";
import WhyGiftsWorkSection from "@/features/(trip-website)/gifts/components/why-gifts-work";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "GiftsMetadata",
  });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en"
      ? `${baseUrl}/gifts`
      : `${baseUrl}/${locale}/gifts`;

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
          url: "/assets/og/gifts.webp",
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
          url: "/assets/og/gifts.webp",
          alt: t("imageAlt"),
        },
      ],
    },
    keywords: t("keywords"),
    robots: "index, follow",
    publisher: "@PerkFlow",
  };
}

export default function Page() {
  return (
    <div className="mx-auto min-h-screen">
      <GiftHeroSection />
      <WhyGiftsWorkSection />
      <MakeGiftingSection />
      <RecognizeAchievementsSection />
      <FAQ />
    </div>
  );
}
