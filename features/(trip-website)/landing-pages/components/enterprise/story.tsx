"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import left from "@/assets/icons/left.svg";
import right from "@/assets/icons/right.svg";
import netflix from "@/assets/images/netflix.png";
import incentivesImg from "@/assets/images/incentives-img.jpg";
import { useTranslations } from "next-intl";

export default function Story() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = useTranslations("Enterprise_Page.Story");

  const story = [
    {
      id: 1,
      content: t("card1.content"),
      author: "James Doe",
      position: t("card1.position"),
      image: netflix,
    },
    {
      id: 2,
      content: t("card2.content"),
      author: "James Packer",
      position: t("card2.position"),
      image: incentivesImg,
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection("auto");
      setCurrent((prev) => (prev === story.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [story.length]);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDirection("auto");
      setCurrent((prev) => (prev === story.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrent((prev) => (prev === 0 ? story.length - 1 : prev - 1));
    resetInterval();
  };

  const handleNext = () => {
    setDirection("next");
    setCurrent((prev) => (prev === story.length - 1 ? 0 : prev + 1));
    resetInterval();
  };

  const { content, author, position, image } = story[current];

  const animationClass =
    direction === "prev" ? "slide-in-left" : "slide-in-right";

  return (
    <div className="bg-white px-4 md:px-15">
      <div className="flex justify-between gap-2 md:gap-0">
        <div className="w-full">
          <h2 className="mb-2 text-center text-lg font-semibold text-(--chart-10) md:text-left md:text-3xl">
            {t("heading")}
          </h2>
          <p className="text-center text-xs text-(--chart-11) md:text-start md:text-sm">
            {t("subheading")}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <Image
            src={left}
            alt="left"
            className="h-6 w-6 cursor-pointer md:h-8 md:w-8"
            onClick={handlePrev}
          />
          <Image
            src={right}
            alt="right"
            className="h-6 w-6 cursor-pointer md:h-8 md:w-8"
            onClick={handleNext}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-hidden py-5 md:flex-row md:gap-5">
        <div
          key={`image-${current}`}
          className={`relative h-[200px] w-full rounded-lg border border-gray-300 md:h-auto md:w-[40%] ${animationClass}`}
        >
          <Image src={image} alt="story image" fill className="rounded-lg" />
        </div>

        <div
          key={`content-${current}`}
          className={`from-blue to-mint h-50 w-full rounded-lg bg-gradient-to-b text-sm text-white md:h-75 md:w-[60%] md:text-base ${animationClass}`}
        >
          <div className="flex h-full flex-col justify-between px-4 py-2 md:px-8 md:py-12">
            <p>{content}</p>
            <div>
              <p>{author}</p>
              <p className="text-xs md:text-sm">{position}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slide-in-left {
          animation: slideInLeft 500ms ease-in-out forwards;
        }
        .slide-in-right {
          animation: slideInRight 500ms ease-in-out forwards;
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .overflow-hidden {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
