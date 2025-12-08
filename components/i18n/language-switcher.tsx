"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getSlugForLanguage } from "@/lib/document-utils";
import type { CMSPost } from "@/types/cms";

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
      .then((article: CMSPost) => {
        // Use the helper function from documentation
        const targetSlug = getSlugForLanguage(article, switchTo);

        // Check if the target version is actually valid
        // If switching to EN (default), check if title exists (API returns default locale by default)
        const isEnTargetValid =
          switchTo === "en" && article.title && article.title.trim().length > 0;

        // If switching to other language, check if slug exists
        const isOtherTargetValid = switchTo !== "en" && targetSlug;

        if (isEnTargetValid || isOtherTargetValid) {
          setTargetPath(`/articles/${targetSlug}`);
        } else {
          // No translation available, fallback to resources index
          setTargetPath(`/resources`);
        }
      })
      .catch((error) => {
        console.error("Error fetching article for language switch:", error);
        // On error, fallback to resources to be safe
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
