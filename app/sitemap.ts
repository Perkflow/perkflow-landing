import { MetadataRoute } from "next";
import { getLocalizedSlug } from "@/lib/document-utils";
import type { CMSPost } from "@/types/cms";

const BASE_URL = "https://perkflow.io";
const LOCALES = ["en", "fr"] as const;

// Static routes for the landing page
const STATIC_ROUTES = [
  "",
  "/automated-rewards",
  "/gifts",
  "/trips",
  "/award-ceremony",
  "/resources",
  "/enterprise",
  "/why-us",
  "/careers",
  "/contact",
  "/news",
  "/waitlist",
  "/jobs-posting",
  "/terms",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Generate entries for static routes in all locales
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }))
  );

  // Fetch dynamic articles from your CMS
  const articleEntries = await getArticleEntries();

  return [...staticEntries, ...articleEntries];
}

async function getArticleEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const PAYLOAD_URL =
      process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL ||
      process.env.PAYLOAD_CMS_URL ||
      "https://cms.perkflow.io";

    if (!PAYLOAD_URL) {
      console.warn("NEXT_PUBLIC_PAYLOAD_CMS_URL not set, skipping articles");
      return [];
    }

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of LOCALES) {
      const queryParams = new URLSearchParams({
        limit: "1000",
        where: JSON.stringify({ status: { equals: "published" } }),
        depth: "1",
        locale,
        "fallback-locale": "none",
        // Optimization: Select only necessary fields to reduce response size and fix cache error
        "select[slug]": "true",
        "select[updatedAt]": "true",
        "select[title]": "true",
        "select[languageSlugs]": "true",
        "select[defaultLanguage]": "true",
      });

      // Fetch published articles from Payload CMS for the specific locale
      const response = await fetch(
        `${PAYLOAD_URL}/api/posts?${queryParams.toString()}`,
        {
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      );

      if (!response.ok) {
        console.warn(
          `Failed to fetch articles for sitemap (locale: ${locale})`
        );
        continue;
      }

      const data = await response.json();
      const articles = data.docs || [];

      // Generate sitemap entries for this locale
      const localeEntries = articles
        .filter((article: CMSPost) => article.title)
        .map((article: CMSPost) => {
          const slug = getLocalizedSlug(article, locale);
          return {
            url: `${BASE_URL}${
              locale === "en" ? "" : `/${locale}`
            }/articles/${slug}`,
            lastModified: new Date(article.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          };
        });

      entries.push(...localeEntries);
    }

    return entries;
  } catch (error) {
    console.error("Error fetching articles for sitemap: ", error);
    return [];
  }
}
