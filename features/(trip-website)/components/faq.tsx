"use client";

import TitleTag from "@/components/atoms/title-tag";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const getFAQS = (t: (key: string) => string) => [
  {
    question: t("FAQ.item1.question"),
    answer: t("FAQ.item1.answer"),
  },
  {
    question: t("FAQ.item2.question"),
    answer: t("FAQ.item2.answer"),
  },
  {
    question: t("FAQ.item3.question"),
    answer: t("FAQ.item3.answer"),
  },
  {
    question: t("FAQ.item4.question"),
    answer: t("FAQ.item4.answer"),
  },
  {
    question: t("FAQ.item5.question"),
    answer: t("FAQ.item5.answer"),
  },
  {
    question: t("FAQ.item6.question"),
    answer: t("FAQ.item6.answer"),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const t = useTranslations("AutomatedReward");
  const FAQS = getFAQS(t);

  // Optional: update heights if content changes
  useEffect(() => {}, [openIndex]);
  return (
    <section
      className="relative bg-[#F2F4F7] py-32"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(229,231,235,0.5) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(229,231,235,0.5) 1px, transparent 1px)
        `,
        backgroundSize: "70px 70px",
      }}
    >
      <div className="container mx-auto px-8 text-center">
        {/* FAQ pill */}
        <TitleTag title="FAQ" />
        {/* Main heading */}
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-gray-900 sm:text-4xl lg:leading-[60px]">
          {t("FAQ.heading")}
        </h2>
        {/* Subheading */}
        <p className="text-color mt-4">{t("FAQ.subheading")}</p>
      </div>

      <div className="mt-16 bg-[#F2F4F7]">
        <div className="mx-auto space-y-6 px-4 md:max-w-4xl lg:px-0">
          {FAQS.map((item, idx) => (
            <div
              key={item.question}
              className="overflow-hidden rounded-[8px] border-[#E5E7EB] bg-white"
            >
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-medium text-gray-900 lg:text-base">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={cn(
                    "transition-transfor m h-5 w-5 text-gray-500",
                    openIndex === idx ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>
              <div
                ref={(el: HTMLDivElement | null) => {
                  contentRefs.current[idx] = el;
                }}
                style={{
                  height:
                    openIndex === idx
                      ? `${contentRefs.current[idx]?.scrollHeight}px`
                      : "0px",
                }}
                className="ease overflow-hidden px-6 transition-[height] duration-300"
              >
                <div className="text-color pb-4 text-sm">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
