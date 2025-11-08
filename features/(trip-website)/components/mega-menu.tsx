"use client";

import { cn } from "@/lib/utils";
import { GiftIcon, StarIcon, TrophyIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MdAirplaneTicket } from "react-icons/md";

import rockstarImage from "@/assets/icons/rockstar.svg";
import greenGiftImage from "@/assets/icons/hero-map.svg";
import purpleGiftImage from "@/assets/icons/gift-purple.svg";

import navBg from "@/assets/images/nav-bg.png";
import AnimatedBackground from "@/components/atoms/animated-background";

import { useTranslations } from "next-intl";

const getITEMS = (t: (key: string) => string) => [
  {
    icon: StarIcon,
    title: t("featureMegaMenu.items.item1.title"),
    desc: t("featureMegaMenu.items.item1.description"),
    href: "/automated-rewards",
  },
  {
    icon: GiftIcon,
    title: t("featureMegaMenu.items.item2.title"),
    desc: t("featureMegaMenu.items.item2.description"),
    href: "/gifts",
  },
  {
    icon: MdAirplaneTicket,
    title: t("featureMegaMenu.items.item3.title"),
    desc: t("featureMegaMenu.items.item3.description"),
    href: "/trips",
  },
  {
    icon: TrophyIcon,
    title: t("featureMegaMenu.items.item4.title"),
    desc: t("featureMegaMenu.items.item4.description"),
    href: "/award-ceremony",
  },
];

export default function MegaMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations("Header");
  const ITEMS = getITEMS(t);

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-[48px] z-10 transform overflow-hidden bg-transparent pt-4 transition-all duration-500 ease-in-out",
        open
          ? "pointer-events-auto max-h-screen translate-y-0"
          : "pointer-events-none max-h-0 -translate-y-0",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 overflow-hidden px-4 sm:px-6 lg:px-9">
        <div className="relative col-span-4 w-full overflow-hidden rounded-bl-xl bg-[#F98A26] p-12 text-white">
          <h3 className="mb-3 max-w-[350px] text-[32px] leading-[120%] font-medium tracking-[2%]">
            {t("featureMegaMenu.heading")}
          </h3>
          <p className="z-2 max-w-[350px]">{t("featureMegaMenu.text")}</p>
          {/* <Link
            href="/learn-more"
            className="inline-block rounded-full border border-white px-4 py-2 transition hover:bg-white hover:text-orange-500"
          >
            Learn More
          </Link> */}

          <Image
            src={greenGiftImage}
            alt="gift decoration"
            width={50}
            height={50}
            loading="lazy"
            fetchPriority="low"
            sizes="50px"
            className="absolute top-32 right-7"
          />

          <Image
            src={rockstarImage}
            alt="rockstar decoration"
            width={200}
            height={200}
            loading="lazy"
            fetchPriority="low"
            sizes="200px"
          />

          <Image
            src={purpleGiftImage}
            alt="purple gift decoration"
            width={50}
            height={50}
            loading="lazy"
            fetchPriority="low"
            sizes="50px"
            className="absolute bottom-10 left-56"
          />

          <Image
            src={navBg}
            alt="navigation background"
            width={200}
            height={200}
            loading="lazy"
            fetchPriority="low"
            sizes="200px"
            className="absolute right-0 bottom-0"
          />
        </div>

        <div className="col-span-8 rounded-br-xl bg-white p-8 transition-colors duration-300">
          <div className="mx-auto flex max-w-4xl gap-x-8">
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              <AnimatedBackground
                className={`rounded-lg bg-[#F98A26]/20`}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
                enableHover
              >
                {ITEMS.slice(0).map(
                  ({ icon: Icon, title, desc, href }, index) => {
                    const handleClick = () => {
                      setOpen(false);

                      return;
                    };
                    return (
                      <Link
                        onClick={handleClick}
                        href={href}
                        key={index}
                        data-id={`card-${index}`}
                        className="flex w-[80%] flex-col items-start space-x-3 rounded-md p-6 transition"
                      >
                        <div className="mb-1 flex items-center space-x-3">
                          <Icon className="mt-1 h-6 w-6 flex-shrink-0 text-gray-700" />
                          <h4 className="font-semibold text-[#101828]">
                            {title}
                          </h4>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{desc}</p>
                        </div>
                      </Link>
                    );
                  },
                )}
              </AnimatedBackground>
            </div>

            <div className="flex flex-1 flex-col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
