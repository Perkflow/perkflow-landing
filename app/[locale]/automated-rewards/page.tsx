import RewardsHeroSection from "@/features/(trip-website)/automated-rewards/components/hero";
import RewardsAutopilot from "@/features/(trip-website)/automated-rewards/components/rewards-autopilot";
import MotivationSection from "@/features/(trip-website)/automated-rewards/components/motivation";
import Customize from "@/features/(trip-website)/automated-rewards/components/customize";
import Impact from "@/features/(trip-website)/automated-rewards/components/impact";
import FAQ from "@/features/(trip-website)/components/faq";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "AutomatedRewardsMetadata",
  });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en"
      ? `${baseUrl}/automated-rewards`
      : `${baseUrl}/${locale}/automated-rewards`;

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
          url: "/assets/og/automated-rewards.webp",
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
          url: "/assets/og/automated-rewards.webp",
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
      <RewardsHeroSection />
      <MotivationSection />
      <RewardsAutopilot />
      <Customize />
      <Impact />
      <FAQ />
    </div>
  );
}
