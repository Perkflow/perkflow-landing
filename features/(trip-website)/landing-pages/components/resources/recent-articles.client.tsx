"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import type { Article } from "@/types/cms";
import recentEvent from "@/assets/images/recent-event.jpg";
import { resolveMediaUrl } from "@/lib/media";

function getArticleImage(imageSrc?: string | null) {
  return resolveMediaUrl(imageSrc) || recentEvent;
}

interface RecentArticlesClientProps {
  articles: Article[];
  loadMoreLabel: string;
  showLessLabel: string;
}

export function RecentArticlesClient({
  articles,
  loadMoreLabel,
  showLessLabel,
}: RecentArticlesClientProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const canShowMore = visibleCount < articles.length;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, visibleCount).map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="block transition-transform hover:scale-[1.02]"
          >
            <article className="bg-card flex h-[400px] cursor-pointer flex-col overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]">
              <div className="relative h-[200px] w-full">
                <Image
                  src={getArticleImage(
                    article.featuredImage?.url || article.image,
                  )}
                  alt={`Article image for ${article.title}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex flex-grow flex-col gap-3 p-4">
                <h2 className="text-foreground line-clamp-2 text-base font-semibold">
                  {article.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2 flex-grow text-sm">
                  {article.contentPreview}
                </p>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <span>{article.author}</span>
                  <span aria-hidden="true" className="text-lg leading-none">
                    •
                  </span>
                  <span>{article.time}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {articles.length > 6 && (
        <div className="mt-8 flex w-full justify-center">
          {canShowMore ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary rounded-full px-5 py-2 transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label={loadMoreLabel}
            >
              {loadMoreLabel}
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(6)}
              className="bg-muted text-foreground hover:bg-muted/80 focus:ring-muted rounded-full px-5 py-2 transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-label={showLessLabel}
            >
              {showLessLabel}
            </button>
          )}
        </div>
      )}
    </>
  );
}
