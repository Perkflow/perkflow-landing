import userStart from "@/assets/icons/user-star.svg";
import rocket from "@/assets/icons/rocket-outline.svg";
import megaGoal from "@/assets/icons/mage_goals.svg";
import Image from "next/image";
import Container from "@/components/layouts/container";
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
    <div className="flex flex-col items-center gap-8 bg-white px-4 py-10">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex w-full flex-col items-center gap-5">
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

          <div className="z-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {philosophy.map(({ icon, title, content }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-2 rounded-xl bg-[#F5F8FB] px-4 py-6 md:items-start"
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
      </Container>
    </div>
  );
}
