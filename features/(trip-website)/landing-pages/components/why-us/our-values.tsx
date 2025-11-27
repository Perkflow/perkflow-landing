import { useTranslations } from "next-intl";
import Container from "@/components/layouts/container";

export default function OurValues() {
  const t = useTranslations("Why_Us_Page");

  const values = [
    {
      title: t("values.card1.title"),
      content: t("values.card1.content"),
    },
    {
      title: t("values.card2.title"),
      content: t("values.card2.content"),
    },
    {
      title: t("values.card3.title"),
      content: t("values.card3.content"),
    },
    {
      title: t("values.card4.title"),
      content: t("values.card4.content"),
    },
    {
      title: t("values.card5.title"),
      content: t("values.card5.content"),
    },
    {
      title: t("values.card6.title"),
      content: t("values.card6.content"),
    },
  ];

  return (
    <div className="flex flex-col items-center gap-8 bg-white py-10">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex w-full flex-col items-center gap-5">
            <div className="text-primary w-fit rounded-full bg-white text-sm font-semibold">
              <div className="bg-primary/10 flex gap-2 rounded-full px-3 py-1">
                <span aria-hidden="true">•</span>
                <span className="uppercase">{t("values.caption")}</span>
              </div>
            </div>

            <h1 className="text-center text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">
              {t("values.heading")}
            </h1>
            <p className="text-center text-gray-600">
              {t("values.subheading")}
            </p>
          </div>

          <div className="z-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, content }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-2 rounded-xl bg-[#F5F8FB] px-4 py-6 md:items-start"
              >
                <h3 className="text-center text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="text-center text-gray-600 md:text-start">
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
