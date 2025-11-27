"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getSlugForLanguage } from "@/lib/document-utils";
import type { Article } from "@/types/cms";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const switchTo = locale === "en" ? "fr" : "en";
  const label = locale === "en" ? "FR" : "EN";

  useEffect(() => {
    // Check if we're on an article page
    const articleMatch = pathname.match(/^\/articles\/([^/]+)$/);

    if (!articleMatch) {
      // Not on an article page, reset targetPath to use default behavior
      setTargetPath(null);
      return;
    }

    const currentSlug = articleMatch[1];

    // Fetch article to get languageSlugs
    fetch(`/api/cms/posts/${currentSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((article: Article) => {
        // Use the helper function from documentation
        const targetSlug = getSlugForLanguage(article, switchTo);

        if (targetSlug) {
          setTargetPath(`/articles/${targetSlug}`);
        } else {
          // No translation available, fallback to default slug
          setTargetPath(`/articles/${article.slug}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching article for language switch:", error);
        // On error, use current pathname
        setTargetPath(null);
      });
  }, [pathname, switchTo]);

  return (
    <Link
      href={targetPath || pathname}
      locale={switchTo}
      className="flex items-center gap-2 text-lg font-medium text-black hover:text-gray-900 md:text-sm"
    >
      <FaGlobe className="h-4 w-4" />
      {label}
    </Link>
  );
}
