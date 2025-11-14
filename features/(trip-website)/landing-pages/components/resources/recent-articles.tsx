import { getTranslations } from "next-intl/server";
import { RecentArticlesClient } from "./recent-articles.client";
import { getResourceArticles } from "./resources-data";
import { getLocale } from "next-intl/server";
import Container from "@/components/layouts/container";

export default async function RecentArticles() {
  const locale = await getLocale();
  const [t, articles] = await Promise.all([
    getTranslations("Resources_Page"),
    getResourceArticles(locale),
  ]);
  const hasArticles = Array.isArray(articles) && articles.length > 0;

  return (
    <Container>
      <div id="blog" className="py-10">
        <h1 className="text-foreground mb-6 text-2xl font-bold md:text-3xl">
          {t("recent_articles.heading")}
        </h1>

        {hasArticles ? (
          <RecentArticlesClient
            articles={articles}
            loadMoreLabel={t("recent_articles.load_more")}
            showLessLabel={t("recent_articles.show_less")}
          />
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground">{t("no_articles")}</p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
