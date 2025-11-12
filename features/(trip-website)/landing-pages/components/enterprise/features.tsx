import Image from "next/image";
import feature1 from "@/assets/icons/feature-1.svg";
import feature2 from "@/assets/icons/feature-2.svg";
import feature3 from "@/assets/icons/feature-3.svg";
import feature4 from "@/assets/icons/feature-4.svg";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("Enterprise_Page.Features");
  const philosophy = [
    {
      title: t("card1.title"),
      content: t("card1.content"),
      icon: feature1,
    },
    {
      title: t("card2.title"),
      content: t("card2.content"),
      icon: feature4,
    },
    {
      title: t("card3.title"),
      content: t("card3.content"),
      icon: feature2,
    },
    {
      title: t("card4.title"),
      content: t("card4.content"),
      icon: feature3,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-10 bg-white px-4 py-10 md:px-20 md:py-20">
      <div className="flex flex-col gap-10 max-w-7xl mx-auto">
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
            {t("heading")}
          </h1>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.map(({ icon, title, content }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-4 rounded-lg bg-(--lavender-mist) p-6 transition hover:shadow-md md:items-start"
            >
              <Image src={icon} alt={`${title} icon`} className="h-10 w-10" />
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
