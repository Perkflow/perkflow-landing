import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { ProviderWrapper } from "./provider-wrapper";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import FooterSection from "@/features/(trip-website)/components/footer";
import Header from "@/features/(trip-website)/components/header";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations("Metadata");

  return {
    title: {
      template: "%s | Perkflow",
      default: t("title.default"),
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <ProviderWrapper>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="light">
              <Header />
              {children}
              <FooterSection />
            </ThemeProvider>
          </NextIntlClientProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
