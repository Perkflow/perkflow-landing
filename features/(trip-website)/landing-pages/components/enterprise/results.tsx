"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import EnterpriseBgImg2 from "@/assets/images/enterprise-bg-2.png";
import { useTranslations } from "next-intl";

export default function Results() {
  const t = useTranslations("Enterprise_Page.Results");
  const purpose = [
    {
      title: "25%",
      content: t("card1.content"),
    },
    {
      title: "2x",
      content: t("card2.content"),
    },
    {
      title: "3x",
      content: t("card3.content"),
    },
    {
      title: "30%",
      content: t("card4.content"),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % purpose.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [purpose.length]);

  return (
    <div className="relative flex w-full flex-col items-center gap-10 bg-(--chart-8) px-4 py-10 text-white sm:px-10 md:px-20">
      <div className="text-center">
        <h2 className="mb-4 text-xl font-bold md:text-4xl">{t("heading")}</h2>
        <p className="text-sm text-(--chart-9)">{t("subheading")}</p>
      </div>

      <div className="flex w-full max-w-6xl flex-wrap justify-center gap-4">
        {purpose.map(({ title, content }, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={title}
              className={`z-1 flex min-h-[140px] w-full flex-col gap-2 rounded-lg p-4 transition-all duration-500 ease-in-out sm:w-[45%] lg:w-[22%] ${
                isActive ? "bg-blue text-[#9DD4BE]" : "bg-[#004557] text-white"
              }`}
            >
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-inherit">{content}</p>
            </div>
          );
        })}

        <div className="absolute top-[55%] left-0 hidden h-[100px] w-[150px] md:block lg:top-[45%] lg:left-11 lg:h-[150px] lg:w-[200px]">
          <Image
            src={EnterpriseBgImg2}
            alt="Decorative Right"
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute top-[55%] right-[-2rem] hidden h-[100px] w-[150px] md:block lg:top-[45%] lg:right-11 lg:h-[150px] lg:w-[200px]">
          <Image
            src={EnterpriseBgImg2}
            alt="Decorative Right"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
