import { MetadataRoute } from "next";

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

    const queryParams = new URLSearchParams({
      limit: "1000",
      where: JSON.stringify({ status: { equals: "published" } }),
      depth: "0",
    });

    // Fetch published articles from Payload CMS
    const response = await fetch(`${PAYLOAD_URL}/api/posts?${queryParams.toString()}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.warn("Failed to fetch articles for sitemap");
      return [];
    }

    const data = await response.json();
    const articles = data.docs || [];

    // Generate sitemap entries for each article in all locales
    return articles.flatMap((article: { slug: string; updatedAt: string }) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}/articles/${
          article.slug
        }`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    );
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
    return [];
  }
}
