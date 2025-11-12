import { useTranslations } from "next-intl";

export default function Values() {
  const t = useTranslations("Careers_Page");

  const philosophy = [
    {
      title: t("Values.philosophy.card1.title"),
      content: t("Values.philosophy.card1.content"),
    },
    {
      title: t("Values.philosophy.card2.title"),
      content: t("Values.philosophy.card2.content"),
    },
    {
      title: t("Values.philosophy.card3.title"),
      content: t("Values.philosophy.card3.content"),
    },
    {
      title: t("Values.philosophy.card4.title"),
      content: t("Values.philosophy.card4.content"),
    },
    {
      title: t("Values.philosophy.card5.title"),
      content: t("Values.philosophy.card5.content"),
    },
    {
      title: t("Values.philosophy.card6.title"),
      content: t("Values.philosophy.card6.content"),
    },
  ];

  return (
    <div className="flex flex-col items-center gap-10 bg-white px-4 py-10 md:px-20 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
            {t("Values.heading")}
          </h1>
          <p className="mt-4 text-sm text-gray-500">{t("Values.subheading")}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map(({ title, content }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-4 rounded-lg bg-(--lavender-mist) p-6 md:items-start"
            >
              <div>
                <h2 className="text-center text-lg font-semibold text-(--chart-10) md:text-left">
                  {title}
                </h2>
                <p className="text-center text-sm text-(--chart-11) md:text-left md:text-base">
                  {content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
