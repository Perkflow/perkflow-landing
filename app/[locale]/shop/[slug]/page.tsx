import { notFound } from "next/navigation";
import ProductDetailContent from "@/features/(trip-website)/shop/components/product-detail-content";
import {
  getProductBySlug,
  giftCardProducts,
} from "@/features/(trip-website)/shop/data/products";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const t = await getTranslations({
    locale,
    namespace: "ShopMetadata",
  });

  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en"
      ? `${baseUrl}/shop/${slug}`
      : `${baseUrl}/${locale}/shop/${slug}`;

  const description =
    product.description[locale as "en" | "fr"] || product.description.en;

  return {
    metadataBase: new URL(baseUrl),
    title: `${product.name} - ${t("title")}`,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} - ${t("og.title")}`,
      description: description,
      phoneNumbers: "+1 (716) 451-3912",
      emails: "hello@perkflow.io",
      images: [
        {
          url: `/shop/brands/${product.slug}.svg`,
          width: 1200,
          height: 628,
          alt: product.name,
          type: "image/svg+xml",
        },
      ],
      url: canonicalUrl,
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      site: "@PerkFlow",
      title: `${product.name} - ${t("twitter.title")}`,
      description: description,
      images: [
        {
          url: `/shop/brands/${product.slug}.svg`,
          alt: product.name,
        },
      ],
    },
    keywords: `${product.brandName}, gift card, ${t("keywords")}`,
    robots: "index, follow",
    publisher: "@PerkFlow",
  };
}

export async function generateStaticParams() {
  return giftCardProducts.map((product) => ({
    slug: product.slug,
  }));
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} locale={locale} />;
}
