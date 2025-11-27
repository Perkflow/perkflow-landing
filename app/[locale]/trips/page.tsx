import FAQ from "@/features/(trip-website)/components/faq";
import CareerPath from "@/features/(trip-website)/trips/components/career-path";
import DreamSection from "@/features/(trip-website)/trips/components/dream";
import TripsHeroSection from "@/features/(trip-website)/trips/components/hero";
import Testimonials from "@/features/(trip-website)/trips/components/testimonials";
import TransformSection from "@/features/(trip-website)/trips/components/transform-section";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "TripsMetadata",
  });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en" ? `${baseUrl}/trips` : `${baseUrl}/${locale}/trips`;

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
          url: "/assets/og/trips.webp",
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
          url: "/assets/og/trips.webp",
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
    <div className="mx-auto min-h-screen overflow-hidden">
      <TripsHeroSection />
      <TransformSection />
      <CareerPath />
      <DreamSection />
      <Testimonials />
      <FAQ />
    </div>
  );
}
