import React from "react";
import { CheckSquare, Gift, Repeat } from "lucide-react";
import TitleTag from "@/components/atoms/title-tag";
import Image from "next/image";
import { useTranslations } from "next-intl";

import arrowLg from "@/assets/icons/arrow-lg.svg";

export default function RewardsAutopilot() {
  const t = useTranslations("AutomatedReward");
  return (
    <section className="bg-[#F5F7FA] px-4 py-28 text-center">
      <TitleTag title={t("RewardAutopilot.titleTag")} />

      <div className="flex flex-col items-center">
        <h2 className="my-4 max-w-4xl text-4xl font-semibold">
          {t("RewardAutopilot.heading")}
        </h2>
        <p className="text-color mb-12 text-sm">
          {t("RewardAutopilot.subheading")}
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:gap-8 lg:flex-row">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex size-[58px] items-center justify-center rounded-[8px] bg-white">
            <CheckSquare color="#F98A26" size={36} />
          </div>

          <h1 className="text-lg font-semibold">
            {t("RewardAutopilot.item1.title")}
          </h1>
          <p className="text-color w-[70%] text-sm leading-6 lg:w-full">
            {t("RewardAutopilot.item1.desc")}
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
            <Gift color="#F98A26" size={36} />
          </div>

          <h1 className="text-lg font-semibold">
            {t("RewardAutopilot.item2.title")}
          </h1>
          <p className="text-color w-[70%] text-sm leading-6 lg:w-full">
            {t("RewardAutopilot.item2.desc")}
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
            <Repeat color="#F98A26" size={36} />
          </div>

          <h1 className="text-lg font-semibold">
            {t("RewardAutopilot.item3.title")}
          </h1>
          <p className="text-color w-[70%] text-sm leading-6 lg:w-full">
            {t("RewardAutopilot.item3.desc")}
          </p>
        </div>
      </div>
    </section>
  );
}
