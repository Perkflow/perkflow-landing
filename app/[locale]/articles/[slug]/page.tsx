import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { loadArticleBySlug } from "@/lib/document-utils";
import { resolveMediaUrl } from "@/lib/media";
import type { Article } from "@/types/cms";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { notFound } from "next/navigation";
import { Lora } from "next/font/google";
import { getLocale } from "next-intl/server";
import { SocialShareButtons } from "@/features/(trip-website)/landing-pages/components/articles/social-share-buttons";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

const articleFont = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Fonction pour générer les métadonnées
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params;
  const article: Article | null = await loadArticleBySlug(
    resolvedParams.slug,
    resolvedParams.locale
  );

  if (!article) {
    return {
      title: "Article not found",
      description: "The item you are looking for does not exist.",
    };
  }

  const locale = await getLocale();
  const baseUrl = "https://perkflow.io";
  const canonicalUrl =
    locale === "en"
      ? `${baseUrl}/articles/${article.slug}`
      : `${baseUrl}/${locale}/articles/${article.slug}`;

  // Get article image
  const getArticleImage = (current: Article | null) => {
    if (!current) return null;
    const candidates = [
      current.featuredImage?.url,
      current.featuredImage?.originalUrl,
      current.featuredImage?.normalizedPath,
      current.image,
    ];

    for (const candidate of candidates) {
      const resolved = resolveMediaUrl(candidate);
      if (resolved) return resolved;
    }
    return null;
  };

  const heroImage = getArticleImage(article);
  const imageUrl = heroImage
    ? new URL(heroImage, canonicalUrl).toString()
    : null;

  return {
    metadataBase: new URL(baseUrl),
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: article.seo?.keywords?.join(", "),

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      type: "article",
      phoneNumbers: "+1 (716) 451-3912",
      emails: "hello@perkflow.io",
      url: canonicalUrl,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: article.featuredImage?.width,
            height: article.featuredImage?.height,
            alt: article.featuredImage?.alt,
          },
        ],
      }),
      locale: locale,
      siteName: "@PerkFlow",
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      ...(imageUrl && {
        images: {
          url: imageUrl,
          alt: article.featuredImage?.alt,
        },
      }),
      site: "@PerkFlow",
    },

    authors: article.author ? [{ name: article.author }] : undefined,
    ...(article.publishedAt && {
      publishedTime: article.publishedAt,
    }),
  };
}

export default async function ArticleDetailPage({ params }: any) {
  const resolvedParams = await params;
  const article: Article | null = await loadArticleBySlug(
    resolvedParams.slug,
    resolvedParams.locale
  );
  if (!article) {
    notFound();
  }

  const locale = await getLocale();
  const url = `https://perkflow.io/${locale}/articles/${article.slug}`;
  const title = article.title;
  const t = await getTranslations("Articles_Page");

  const getArticleImage = (current: Article | null) => {
    if (!current) return null;
    const candidates = [
      current.featuredImage?.url,
      current.featuredImage?.originalUrl,
      current.featuredImage?.normalizedPath,
      current.image,
    ];

    for (const candidate of candidates) {
      const resolved = resolveMediaUrl(candidate);
      if (resolved) return resolved;
    }

    return null;
  };

  const backHref = `/${resolvedParams.locale}/resources`;

  const heroImage = getArticleImage(article);

  return (
    <div
      className={
        articleFont.className +
        " relative min-h-screen overflow-hidden bg-gray-50"
      }
    >
      {/* Project gradient background overlays */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle vertical wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/10 via-transparent to-green-200/10" />
        {/* Softer, smaller blobs */}
        <div className="absolute top-200 -right-20 h-[500px] w-[50%] rounded-full bg-gradient-to-br from-orange-200/50 to-green-200/12 blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 h-[800px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-100/50 via-orange-200/20 to-green-100/50 blur-[120px]" />
        <div className="absolute bottom-200 -left-20 h-[500px] w-[50%] rounded-full bg-gradient-to-tr from-orange-200/50 to-green-200/12 blur-[90px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mt-15">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("go_back")}
          </Link>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="p-6 md:p-8 lg:p-10">
              <div className="mb-8">
                <div className="mb-2 h-1 w-12 rounded-full bg-[#F9A826]" />
                <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900">
                  {article.title}
                </h1>

                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#F9A826]" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#F9A826]" />
                      <span>{article.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#F9A826]" />
                      <span>{t("published_recently")}</span>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <span className="uppercase">{t("share_on")}</span>
                    <SocialShareButtons url={url} title={title} />
                  </div>
                </div>

                {article.seo?.keywords && article.seo.keywords.length > 0 && (
                  <div className="mt-14 mb-4 flex flex-wrap gap-2">
                    {article.seo.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="relative inline-block rounded-sm bg-gradient-to-b from-[#02BDEC] to-[#9AD3BC] p-[1px]"
                      >
                        <span className="block rounded-sm bg-white px-2 py-1 text-xs uppercase">
                          {keyword}
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                {heroImage && (
                  <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl border border-gray-100 shadow-md">
                    <Image
                      src={heroImage}
                      alt={`Featured image for ${article.title}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="pointer-events-none absolute top-4 right-4 h-2 w-2 rounded-full bg-[#F9A826]" />
                  </div>
                )}
              </div>

              <div className="max-w-none">
                {article.content && typeof article.content === "object" ? (
                  <RichText
                    className="payload-richtext"
                    data={article.content}
                  />
                ) : (
                  <div className="leading-relaxed text-gray-700">
                    {article.content}
                  </div>
                )}
              </div>

              <div className="mt-12 border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>
                        {t("written_by")} {article.author}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={backHref}
                    className="inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t("go_back")}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
