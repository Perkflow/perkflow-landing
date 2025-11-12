import { useState, useEffect } from "react";
import type { Article } from "@/types/cms";
import { loadArticles } from "@/lib/document-utils";
import { getLocale } from "next-intl/server";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const locale = await getLocale();
        setIsLoading(true);
        setError(null);
        const loadedArticles = await loadArticles(locale);
        setArticles(loadedArticles);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load articles"
        );
        console.error("Error loading articles:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
}
