import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { ProviderWrapper } from "./provider-wrapper";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import FooterSection from "@/features/(trip-website)/components/footer";
import Header from "@/features/(trip-website)/components/header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

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
      template: "%s – PerkFlow",
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
      <head>
        {/* Critical background images */}
        <link rel="preload" as="image" href="/assets/hero-bg.png" />

        {/* Hero carousel images - prioritize first one */}
        <link
          rel="preload"
          as="image"
          href="/hero/hero-one.webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero/hero-ai.webp"
          fetchPriority="low"
        />
        <link
          rel="preload"
          as="image"
          href="/hero/hero-two.webp"
          fetchPriority="low"
        />

        {/* Preload critical CSS background images */}
        <link
          rel="preload"
          as="image"
          href="/assets/optimized/service-bg.webp"
          fetchPriority="low"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ProviderWrapper>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <FooterSection />
          </NextIntlClientProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
