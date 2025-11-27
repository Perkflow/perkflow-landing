import Benefits from "@/features/(trip-website)/landing-pages/components/benefits";
import HeroSection from "@/features/(trip-website)/landing-pages/components/hero";
import Partners from "@/features/(trip-website)/landing-pages/components/partners";
import Planning from "@/features/(trip-website)/landing-pages/components/planning";
import Service from "@/features/(trip-website)/landing-pages/components/service";
import Support from "@/features/(trip-website)/landing-pages/components/support";
import Testimonials from "@/features/(trip-website)/landing-pages/components/testimonials";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomeMetadata" });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl = locale === "en" ? `${baseUrl}/` : `${baseUrl}/${locale}`;

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
          url: "/assets/og/home-page.webp",
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
          url: "/assets/og/home-page.webp",
          alt: t("imageAlt"),
        },
      ],
    },
    robots: "index, follow",
    keywords: t("keywords"),
    publisher: "@PerkFlow",
  };
}

export default function Home() {
  return (
    <div className="mx-auto min-h-screen">
      <HeroSection />
      <Partners />
      <Service />
      <Benefits />
      <Support />
      <Testimonials />
      <Planning />
    </div>
  );
}
