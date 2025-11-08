import Image from "next/image";

import bg from "@/assets/images/middle-bg.png";

import dremaImg from "@/assets/images/dream.png";
import TitleTag from "@/components/atoms/title-tag";

import trip1 from "@/assets/icons/trip-1.svg";
import trip2 from "@/assets/icons/trip-2.svg";
import trip3 from "@/assets/icons/trip-3.svg";

import { useTranslations } from "next-intl";

const getDREAMS = (t: (key: string) => string) => [
  {
    icons: trip3,
    title: t("feature1.title"),
    description: t("feature1.content"),
  },
  {
    icons: trip2,
    title: t("feature2.title"),
    description: t("feature2.content"),
  },
  {
    icons: trip1,
    title: t("feature3.title"),
    description: t("feature3.content"),
  },
];

export default function DreamSection() {
  const t = useTranslations("Trips_Page.Dream");
  const DREAMS = getDREAMS(t);
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl justify-between px-4 lg:flex lg:items-center lg:space-x-12">
        <div className="lg:w-[55%]">
          <TitleTag title={t("caption")} />
          <h2 className="mt-4 text-2xl leading-8 font-bold text-black sm:text-4xl lg:leading-[60px]">
            {t("heading")}
          </h2>
          <p className="text-color mt-2 w-[70%] text-sm lg:text-base">
            {t("subheading")}
          </p>

          <div className="mt-20 space-y-16 pl-4">
            {DREAMS.map(({ icons, title, description }) => (
              <div key={title} className="flex items-center gap-4">
                <Image src={icons} alt="trip" width={80} height={80} />
                <div className="flex flex-col gap-2">
                  <h1 className="text-base font-semibold">{title}</h1>
                  <p className="text-color text-sm leading-6">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Column */}
        <div className="relative mx-auto mt-10 flex justify-center lg:mt-0 lg:w-[30%]">
          {/* Decorative green circle */}

          <Image
            src={dremaImg}
            alt="Team celebration"
            quality={100}
            className="z-20 w-full object-cover"
            priority
          />

          <div className="absolute -bottom-20 -left-20 z-0 h-full w-full">
            <Image
              src={bg}
              alt="Celebrating team member"
              width={1000}
              height={1000}
              quality={100}
              loading="lazy"
              className="z-10"
            />
          </div>

          <div className="absolute -top-40 -left-0 z-0 h-full w-[1000]">
            <Image
              src={bg}
              alt="Celebrating team member"
              width={1000}
              height={1000}
              quality={100}
              loading="lazy"
              className="z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
