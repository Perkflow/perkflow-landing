import { unstable_cache } from "next/cache";
import { loadArticlesFromCMS } from "@/lib/document-utils";
import type { Article } from "@/types/cms";

async function requestArticles(locale: string): Promise<Article[]> {
  try {
    return await loadArticlesFromCMS(locale);
  } catch (error) {
    console.error("Failed to load resource articles", error);
    return [];
  }
}

const fetchArticles = async (locale: string): Promise<Article[]> =>
  requestArticles(locale);

export const getResourceArticles = unstable_cache(
  fetchArticles,
  ["resources-articles"],
  {
    revalidate: 300,
  },
);
