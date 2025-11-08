import Image from "next/image";
import WhyUsCover from "@/assets/images/why-us-cover.jpg";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function WhyUsFront() {
  const t = useTranslations("Why_Us_Page");
  const locale = useLocale();
  return (
    <div className="mt-17 flex items-center justify-center">
      <div className="relative flex h-[500px] w-full items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={WhyUsCover}
            alt="why us"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-(--chart-6) via-(--chart-6)/20 to-(--chart-7)/100" />

        <div className="absolute inset-0 bg-black/40 bg-none" />

        <div className="relative px-4 text-center text-white">
          <h1
            className={`text-4xl md:text-5xl ${locale === "fr" ? "max-w-3xl" : ""} font-bold`}
          >
            {t("Hero.heading")}
          </h1>
          <p className="mt-2 text-lg">{t("Hero.subheading")}</p>
        </div>
      </div>
    </div>
  );
}
