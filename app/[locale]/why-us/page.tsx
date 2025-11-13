import WhyUsFront from "@/features/(trip-website)/landing-pages/components/why-us/why-us";
import AboutUs from "@/features/(trip-website)/landing-pages/components/why-us/about-us";
import OurPhilosophy from "@/features/(trip-website)/landing-pages/components/why-us/our-philosophy";
import OurValues from "@/features/(trip-website)/landing-pages/components/why-us/our-values";
import OurTeam from "@/features/(trip-website)/landing-pages/components/why-us/our-team";
import LeadingCompanies from "@/features/(trip-website)/landing-pages/components/why-us/leading-companies";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "WhyUsMetadata",
  });
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en" ? `${baseUrl}/why-us` : `${baseUrl}/${locale}/why-us`;

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
          url: "/assets/og/why-us.webp",
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
          url: "/assets/og/why-us.webp",
          alt: t("imageAlt"),
        },
      ],
    },
    keywords: t("keywords"),
    robots: "index, follow",
    publisher: "@PerkFlow",
  };
}

export default function WhyUs() {
  return (
    <>
      <WhyUsFront />
      <AboutUs />
      <div className="relative overflow-hidden">
        {/* Gradient background overlays */}
        {/* Softer, smaller blobs */}
        <div className="absolute top-50 -right-20 z-0 h-[500px] w-[30%] rounded-full bg-linear-to-br from-orange-200/40 to-green-200/12 blur-[90px]" />
        <div className="absolute top-1/2 -left-20 z-0 h-[500px] w-[30%] rounded-full bg-linear-to-br from-green-200/40 to-blue-200/12 blur-[90px]" />
        <div className="absolute -right-20 bottom-50 z-0 h-[500px] w-[30%] rounded-full bg-linear-to-br from-green-200/40 to-blue-200/12 blur-[90px]" />
        <OurPhilosophy />
        <OurValues />
        <OurTeam />
        <LeadingCompanies />
      </div>
    </>
  );
}
