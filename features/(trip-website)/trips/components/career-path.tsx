import { CheckSquare, CircleCheck, LockKeyholeOpen } from "lucide-react";
import TitleTag from "@/components/atoms/title-tag";
import Image from "next/image";

import arrowLg from "@/assets/icons/arrow-lg.svg";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function CareerPath() {
  const t = useTranslations("Trips_Page.Career-path");
  const locale = useLocale();

  return (
    <section className="bg-[#F5F7FA] px-4 py-28 text-center">
      <TitleTag title={t("caption")} />

      <h2
        className={`mx-auto my-4 w-[70%] text-xl font-semibold ${locale === "en" ? "md:w-[30%]" : "md:w-[40%]"} lg:text-4xl`}
      >
        {t("heading")}
      </h2>
      <p className="text-color mx-auto mb-12 w-[80%] text-sm md:w-[30%]">
        {t("subheading")}
      </p>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:gap-8 lg:flex-row">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex size-[58px] items-center justify-center rounded-[8px] bg-white">
            <CheckSquare color="#F98A26" size={36} />
          </div>

          <h1 className="text-lg font-semibold">{t("card1.title")}</h1>
          <p className="text-color w-[70%] text-sm leading-6 lg:w-full">
            {t("card1.content")}
          </p>
        </div>

        <Image
          src={arrowLg}
          alt="gift"
          width={100}
          height={100}
          className="w-[25%] rotate-90 object-cover md:rotate-0"
        />

        <div className="flex flex-col items-center space-y-3">
          <div className="flex size-[58px] items-center justify-center rounded-[8px] bg-white">
            <CircleCheck color="#F98A26" size={36} />
          </div>

          <h1 className="text-lg font-semibold">{t("card2.title")}</h1>
          <p className="text-color w-[70%] text-sm leading-6 lg:w-full">
            {t("card2.content")}
          </p>
        </div>

        <Image
          src={arrowLg}
          alt="gift"
          width={100}
          height={100}
          className="w-[25%] rotate-90 object-cover md:rotate-0"
        />

        <div className="flex flex-col items-center space-y-3">
          <div className="flex size-[58px] items-center justify-center rounded-[8px] bg-white">
            <LockKeyholeOpen color="#F98A26" size={36} />
          </div>

          <h1 className="text-lg font-semibold">{t("card3.title")}</h1>
          <p className="text-color w-[70%] text-sm leading-6 lg:w-full">
            {t("card3.content")}
          </p>
        </div>
      </div>
    </section>
  );
}
