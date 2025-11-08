"use client";

import partnerIcon1 from "@/assets/icons/partner-1.svg";
import partnerIcon2 from "@/assets/icons/patner-10.svg";
import partnerIcon3 from "@/assets/icons/patner-3.svg";
import partnerIcon4 from "@/assets/icons/patner-4.svg";
import partnerIcon5 from "@/assets/icons/patner-5.svg";
import partnerIcon6 from "@/assets/icons/patner-6.svg";
import partnerIcon7 from "@/assets/icons/patner-7.svg";
import partnerIcon8 from "@/assets/icons/patner-8.svg";
import partnerIcon9 from "@/assets/icons/patner-9.svg";
import partnerIcon10 from "@/assets/icons/patner-10.svg";
import partnerIcon11 from "@/assets/icons/patner-11.svg";
import partnerIcon12 from "@/assets/icons/patner-12.svg";

const logosTop = [
  partnerIcon1,
  partnerIcon2,
  partnerIcon3,
  partnerIcon4,
  partnerIcon5,
  partnerIcon6,
  partnerIcon7,
];
const logosBottom = [
  partnerIcon8,
  partnerIcon9,
  partnerIcon10,
  partnerIcon11,
  partnerIcon12,
];

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useTranslations } from "next-intl";

export default function Partners() {
  const t = useTranslations("HomePage");

  return (
    <div className="dark:bg-grid-white/[0.05] relative mx-auto flex max-w-7xl flex-col items-center justify-center overflow-hidden rounded-md bg-white/20 px-4 py-6 antialiased md:px-8 dark:bg-black">
      <h1 className="mb-4 text-center text-xl font-medium text-[#495057] md:text-2xl">
        {t("Partners.heading")}
      </h1>
      <div className="max-w-6xl">
        <InfiniteMovingCards items={logosTop} direction="right" speed="fast" />
      </div>
      <div className="max-w-3xl">
        <InfiniteMovingCards
          items={logosBottom}
          direction="left"
          speed="fast"
        />
      </div>
    </div>
  );
}
