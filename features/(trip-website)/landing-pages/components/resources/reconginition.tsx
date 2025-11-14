import Image from "next/image";
import { Link } from "@/i18n/navigation";
import recentEvent from "@/assets/images/recent-event.jpg";
import { resolveMediaUrl } from "@/lib/media";
import { getTranslations } from "next-intl/server";
import { getResourceArticles } from "./resources-data";
import { getLocale } from "next-intl/server";
import Container from "@/components/layouts/container";

function getArticleImage(imageSrc?: string | null) {
  return resolveMediaUrl(imageSrc) || recentEvent;
}

export default async function Recognition() {
  const locale = await getLocale();
  const [t, articles] = await Promise.all([
    getTranslations("Resources_Page"),
    getResourceArticles(locale),
  ]);

  if (!articles || articles.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-2 pb-16">
        <div className="text-muted-foreground text-center">
          {t("no_articles")}
        </div>
      </div>
    );
  }

  const [featured, ...rest] = articles;
  const sideArticles = rest.slice(0, 3);

  return (
    <Container>
      <div className="relative flex flex-col gap-10 pt-10 pb-16 md:flex-row">
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-[#ABDEC980] via-[#D5EEE480] to-transparent" />
        {/* Left Featured Article */}
        <div className="w-full md:w-1/2">
          <Link href={`/articles/${featured.slug}`} className="block">
            <div className="relative h-[280px] w-full md:h-[300px]">
              <Image
                src={getArticleImage(
                  featured.featuredImage?.url || featured.image
                )}
                alt={`Image for ${featured.title}`}
                fill
                className="rounded-lg object-cover"
                unoptimized
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h2 className="text-foreground text-lg font-semibold">
                {featured.title}
              </h2>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {featured.contentPreview}
              </p>
              <p className="text-muted-foreground text-xs">
                {featured.author} • {featured.time}
              </p>
            </div>
          </Link>
        </div>

        {/* Right List of Stories */}
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          {sideArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="flex flex-col gap-4 md:flex-row md:items-start"
            >
              <div className="relative h-[180px] w-full md:h-[110px] md:w-[110px]">
                <Image
                  src={getArticleImage(
                    article.featuredImage?.url || article.image
                  )}
                  alt={`Image for ${article.title}`}
                  fill
                  className="rounded-lg object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center md:w-[calc(100%-120px)]">
                <p className="text-foreground line-clamp-2 text-sm font-medium">
                  {article.title}
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  {article.author} • {article.time}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
