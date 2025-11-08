import userStart from "@/assets/icons/user-star.svg";
import rocket from "@/assets/icons/rocket-outline.svg";
import megaGoal from "@/assets/icons/mage_goals.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OurPhilosophy() {
  const t = useTranslations("Why_Us_Page");
  const philosophy = [
    {
      title: t("philosophy.card1.title"),
      content: t("philosophy.card1.content"),
      icon: userStart,
    },
    {
      title: t("philosophy.card2.title"),
      content: t("philosophy.card2.content"),
      icon: rocket,
    },
    {
      title: t("philosophy.card3.title"),
      content: t("philosophy.card3.content"),
      icon: megaGoal,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-8 bg-white px-4 py-10 md:p-20">
      <div className="flex w-full flex-col items-center gap-5 md:w-1/2">
        <div className="text-primary w-fit rounded-full bg-white text-sm font-semibold">
          <div className="bg-primary/10 flex gap-2 rounded-full px-3 py-1">
            <span aria-hidden="true">•</span>
            <span>{t("philosophy.caption")}</span>
          </div>
        </div>

        <h1 className="text-center text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">
          {t("philosophy.heading")}
        </h1>
      </div>

      <div className="flex w-full flex-col md:flex-row md:justify-between">
        {philosophy.map(({ icon, title, content }) => (
          <div
            key={title}
            className="bg-muted mb-5 flex flex-col items-center gap-7 rounded-lg px-4 py-6 md:mx-2 md:mb-0 md:items-start"
          >
            <Image src={icon} alt={`${title} icon`} className="h-10 w-10" />

            <div>
              <h3 className="text-center text-lg font-semibold text-gray-900 md:text-left">
                {title}
              </h3>
              <p className="text-gray-600">{content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
