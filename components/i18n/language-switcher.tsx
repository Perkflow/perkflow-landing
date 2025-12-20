"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getSlugForLanguage, loadArticleBySlug } from "@/lib/document-utils";
import type { CMSPost } from "@/types/cms";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const [targetPath, setTargetPath] = useState<string | null>(null);

  // Dynamically determine the target language
  const switchTo = locale === "en" ? "fr" : "en";
  const label = switchTo.toUpperCase();

  useEffect(() => {
    // Check if we are on an article page
    const articleMatch = pathname.match(/^\/articles\/([^/]+)$/);
    if (!articleMatch) {
      setTargetPath(null);
      return;
    }
    const currentSlug = articleMatch[1];
    loadArticleBySlug(currentSlug, locale)
      .then(async (article) => {
        if (!article) {
          setTargetPath(`/resources`);
          return;
        }
        const targetSlug = await getSlugForLanguage(article.id, switchTo);
        if (targetSlug) {
          setTargetPath(`/articles/${targetSlug}`);
        } else {
          setTargetPath(`/resources`);
        }
      })
      .catch((error) => {
        console.error("Error fetching article for language switch:", error);
        setTargetPath(`/resources`);
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
