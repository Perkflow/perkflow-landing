// Document utilities (Payload CMS only)
import type { CMSMedia, CMSPost, Article } from "@/types/cms";
import { resolveMediaUrl } from "@/lib/media";

// Removed TXT extraction and fallback

// Helper function to get localized slug for a given language
export function getLocalizedSlug(
  post: Article | CMSPost,
  language: string
): string {
  // For English or if no languageSlugs, return default slug
  if (language === "en" || !post.languageSlugs) {
    return post.slug || "";
  }

  // Find translation for the requested language
  const translation = post.languageSlugs.find(
    (item) => item.language === language
  );

  // Return translated slug or fallback to default
  return translation?.slug || post.slug || "";
}

// Get available languages for a post (from documentation)
export function getAvailableLanguages(post: Article | CMSPost): string[] {
  const languages = ["en"]; // Default slug is typically English

  if (post.languageSlugs) {
    post.languageSlugs.forEach((item) => {
      languages.push(item.language);
    });
  }

  return languages;
}

// Get slug for a specific language (from documentation)
export function getSlugForLanguage(
  post: Article | CMSPost,
  language: string
): string | null {
  if (language === "en") {
    return post.slug || null;
  }

  const translation = post.languageSlugs?.find(
    (item) => item.language === language
  );

  return translation?.slug || null;
}

// Function to get content preview (first two lines)
export function getContentPreview(content: string): string {
  const lines = content.split("\n").filter((line) => line.trim().length > 0);
  return (
    lines.slice(0, 2).join(" ").substring(0, 150) +
    (content.length > 150 ? "..." : "")
  );
}

// Extract plain text from Lexical rich-text JSON
export function extractPlainTextFromLexical(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;

  const stack: any[] = [node];
  const parts: string[] = [];

  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;
    if (Array.isArray(current)) {
      for (let i = current.length - 1; i >= 0; i--) stack.push(current[i]);
      continue;
    }
    if (current.text) {
      parts.push(current.text);
    }
    if (current.children) {
      for (let i = current.children.length - 1; i >= 0; i--) {
        stack.push(current.children[i]);
      }
      parts.push("\n");
    }
    if (current.root) {
      stack.push(current.root);
    }
  }

  return parts
    .join("")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function joinPrefixAndFilename(
  prefix: string | undefined,
  filename: string
): string {
  const safePrefix = (prefix || "").replace(/^\/+|\/+$/g, "");
  const safeFilename = filename.replace(/^\/+/, "");
  if (safePrefix && safeFilename.startsWith(`${safePrefix}/`)) {
    return safeFilename;
  }
  if (!safePrefix) return safeFilename;
  return `${safePrefix}/${safeFilename}`;
}

function collectMediaCandidates(media?: CMSMedia | null): string[] {
  if (!media) return [];

  const candidates: string[] = [];
  const seen = new Set<string>();
  const push = (value?: string | null) => {
    if (!value) return;
    const trimmed = value.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    candidates.push(trimmed);
  };

  push(media.url);
  push(media.normalizedPath);
  push(media.staticURL);
  push(media.thumbnailURL);

  if (media.filename) {
    push(joinPrefixAndFilename(media.prefix ?? "uploads", media.filename));
  }

  if (media.sizes) {
    Object.values(media.sizes).forEach((size) => {
      push(size?.url);
      if (size?.filename) {
        push(
          joinPrefixAndFilename(
            size.prefix ?? media.prefix ?? "uploads",
            size.filename
          )
        );
      }
    });
  }

  return candidates;
}

// Function to convert Payload CMS post to Article format
export function convertPayloadPostToArticle(
  post: CMSPost,
  includeContent: boolean = true,
): Article {
  // For the preview, generate plain text from the rich text content or excerpt
  const plainTextForPreview = post.content
    ? typeof post.content === "string"
      ? post.content
      : extractPlainTextFromLexical(post.content)
    : post.excerpt || "";

  const contentPreview = getContentPreview(plainTextForPreview);

  // Calculate reading time from the plain text version
  const wordCount = plainTextForPreview.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const mediaCandidates = collectMediaCandidates(post.featuredImage);
  const resolvedFeaturedImage =
    mediaCandidates
      .map((candidate) => resolveMediaUrl(candidate))
      .find((candidate): candidate is string => Boolean(candidate)) ?? null;
  const rawFeaturedImage = mediaCandidates.find((candidate) =>
    Boolean(candidate)
  );

  // Get author name
  const authorName = (() => {
    const a: any = post.author as any;
    if (!a) return "Perkflow Team";
    if (a.firstName || a.lastName) {
      return (
        `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || "Perkflow Team"
      );
    }
    if (a.name) return a.name;
    if (a.email) return a.email;
    return "Perkflow Team";
  })();

  return {
    id: post.id,
    title: post.title,
    author: authorName,
    time: `${readingTime} min read`,
    image: resolvedFeaturedImage ?? rawFeaturedImage ?? "",
    filePath: "", // Not needed for CMS posts
    content: includeContent ? post.content : null, // Pass the raw Lexical JSON object only if requested
    contentPreview,
    // Additional CMS fields
    slug: post.slug,
    languageSlugs: post.languageSlugs,
    excerpt: post.excerpt,
    category: post.category
      ? {
          id: post.category.id,
          name: post.category.name,
          slug: post.category.slug,
          color: post.category.color,
        }
      : undefined,
    publishedAt: post.publishedAt ?? post.updatedAt ?? post.createdAt ?? null,
    featuredImage: post.featuredImage
      ? {
          url: resolvedFeaturedImage ?? rawFeaturedImage ?? "",
          alt: post.featuredImage.alt || post.title,
          width: post.featuredImage.width,
          height: post.featuredImage.height,
          originalUrl: rawFeaturedImage,
          normalizedPath: post.featuredImage.normalizedPath,
        }
      : undefined,
    seo: post.seo,
  };
}

// Function to load articles from Payload CMS
export async function loadArticlesFromCMS(locale: string): Promise<Article[]> {
  try {
    const { payloadAPI } = await import("@/connection/payload-api");
    const response = await payloadAPI.getPosts({
      limit: 50,
      status: "published",
      sort: "-publishedAt",
      locale,
    });

    const publishedPosts = response.docs.filter(isPublishedPost);

    const articles = publishedPosts
      .map((post) => convertPayloadPostToArticle(post, false))
      .filter((article) => {
        const isValid = article.title && article.title.trim().length > 0;
        return isValid;
      });
    return articles;
  } catch (error) {
    console.error("Error loading articles from CMS:", error);
    return [];
  }
}

// Function to load a single article by slug from CMS
export async function loadArticleBySlug(
  slug: string,
  locale: string
): Promise<Article | null> {
  try {
    const { payloadAPI } = await import("@/connection/payload-api");
    const post = await payloadAPI.getPostBySlug(slug, locale);

    if (!post || !isPublishedPost(post)) return null;

    return convertPayloadPostToArticle(post);
  } catch (error) {
    console.error("Error loading article by slug:", error);
    return null;
  }
}

// Function to load articles by category
export async function loadArticlesByCategory(
  categorySlug: string
): Promise<Article[]> {
  try {
    const { payloadAPI } = await import("@/connection/payload-api");
    const response = await payloadAPI.getPosts({
      category: categorySlug,
      status: "published",
      sort: "-publishedAt",
    });

    return response.docs
      .filter(isPublishedPost)
      .map((post) => convertPayloadPostToArticle(post, false));
  } catch (error) {
    console.error("Error loading articles by category:", error);
    return [];
  }
}

// Function to search articles
export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const { payloadAPI } = await import("@/connection/payload-api");
    const response = await payloadAPI.searchPosts(query, {
      status: "published",
      sort: "-publishedAt",
    });

    return response.docs
      .filter(isPublishedPost)
      .map((post) => convertPayloadPostToArticle(post, false));
  } catch (error) {
    console.error("Error searching articles:", error);
    return [];
  }
}

// Main function to load articles (CMS only)
export async function loadArticles(locale: string): Promise<Article[]> {
  return loadArticlesFromCMS(locale);
}

// Function to load categories from CMS
export async function loadCategories(): Promise<any[]> {
  try {
    const { payloadAPI } = await import("@/connection/payload-api");
    const response = await payloadAPI.getCategories();
    return response.docs;
  } catch (error) {
    console.error("Error loading categories:", error);
    return [];
  }
}

// Function to load featured articles
export async function loadFeaturedArticles(
  limit: number = 5
): Promise<Article[]> {
  try {
    const { payloadAPI } = await import("@/connection/payload-api");
    const response = await payloadAPI.getFeaturedPosts(limit);
    return response.docs
      .filter(isPublishedPost)
      .map((post) => convertPayloadPostToArticle(post, false));
  } catch (error) {
    console.error("Error loading featured articles:", error);
    return [];
  }
}

function isPublishedPost(post: CMSPost | null | undefined): boolean {
  if (!post) return false;
  const status = (post as any)?.status;
  const legacyStatus = (post as any)?._status;
  const toValue = (value: unknown) =>
    typeof value === "string" ? value.toLowerCase() : "";
  const normalizedStatus = toValue(status);
  const normalizedLegacyStatus = toValue(legacyStatus);
  return (
    normalizedStatus === "published" || normalizedLegacyStatus === "published"
  );
}
