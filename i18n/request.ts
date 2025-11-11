import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../messages/${locale}/home.json`)).default,
      ...(await import(`../messages/${locale}/header.json`)).default,
      ...(await import(`../messages/${locale}/footer.json`)).default,
      ...(await import(`../messages/${locale}/waitlist.json`)).default,
      ...(await import(`../messages/${locale}/contact.json`)).default,
      ...(await import(`../messages/${locale}/automated-reward.json`))
        .default,
      ...(await import(`../messages/${locale}/careers.json`)).default,
      ...(await import(`../messages/${locale}/enterprise.json`)).default,
      ...(await import(`../messages/${locale}/why-us.json`)).default,
      ...(await import(`../messages/${locale}/resources.json`)).default,
      ...(await import(`../messages/${locale}/award-ceremony.json`)).default,
      ...(await import(`../messages/${locale}/trips.json`)).default,
      ...(await import(`../messages/${locale}/gifts.json`)).default,
      ...(await import(`../messages/${locale}/company.json`)).default,
      ...(await import(`../messages/${locale}/articles.json`)).default,
      ...(await import(`../messages/${locale}/metadata.json`)).default,
    },
  };
});
