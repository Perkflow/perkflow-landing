import target from "@/assets/icons/target.svg";
import progressBar from "@/assets/icons/progress-bar.svg";
import gifts from "@/assets/icons/gifts.svg";
import EnterpriseBgImg1 from "@/assets/icons/enterprise-bg-1.svg";
import EnterpriseBgImg2 from "@/assets/icons/enterprise-bg-2.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Purpose() {
  const t = useTranslations("Enterprise_Page");

  const purpose = [
    {
      title: t("Purpose.card1.title"),
      content: t("Purpose.card1.content"),
      icon: target,
    },
    {
      title: t("Purpose.card2.title"),
      content: t("Purpose.card2.content"),
      icon: progressBar,
    },
    {
      title: t("Purpose.card3.title"),
      content: t("Purpose.card3.content"),
      icon: gifts,
    },
  ];

  return (
    <div className="relative flex w-full flex-col items-start gap-10 overflow-hidden bg-(--chart-8) px-4 py-10 text-white md:flex-row md:px-20">
      <div
        className="absolute bottom-20 left-30 hidden h-[100px] w-[150px] translate-x-[-50%] translate-y-[50%] bg-contain bg-no-repeat md:block lg:h-[150px] lg:w-[200px]"
        style={{ backgroundImage: `url(${EnterpriseBgImg1.src})` }}
      />

      <div
        className="absolute top-0 right-[-120px] hidden h-[180px] w-[250px] translate-x-[39%] bg-contain bg-no-repeat md:block lg:h-[220px] lg:w-[300px]"
        style={{ backgroundImage: `url(${EnterpriseBgImg2.src})` }}
      />
      <div className="flex max-w-7xl mx-auto flex-col md:flex-row justify-center gap-10">
        <div className="w-full">
          <h2 className="mb-2 text-xl font-bold md:mb-4 md:text-4xl">
            {t("Purpose.heading")}
          </h2>
          <p className="text-sm text-(--chart-9) md:text-base">
            {t("Purpose.subheading")}
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          {purpose.map(({ title, content, icon }) => (
            <div key={title} className="flex items-start gap-3">
              <Image src={icon} alt={title} className="mt-1 h-6 w-6" />
              <div>
                <h3 className="text-base font-semibold md:text-lg">{title}</h3>
                <p className="text-sm text-(--chart-9) md:text-base">
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
