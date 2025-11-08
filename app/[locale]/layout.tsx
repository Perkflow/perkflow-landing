import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import FooterSection from "@/features/(trip-website)/components/footer";
import Header from "@/features/(trip-website)/components/header";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Header />
            {children}
            <FooterSection />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
