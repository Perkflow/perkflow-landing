import Image from "next/image";

import transformImage from "@/assets/images/transform.png";
import greenPattern from "@/assets/icons/feature-flower.svg";
import TitleTag from "@/components/atoms/title-tag";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import tickIcon from "@/assets/icons/tick.svg";
import { useTranslations } from "next-intl";

export default function TransformSection() {
  const t = useTranslations("Trips_Page.TransformSection");

  return (
    <section className="overflow-hidden bg-[#003B4A] py-4 pb-16 lg:py-32 lg:pb-32">
      <div className="mx-auto flex max-w-7xl flex-col-reverse justify-between gap-y-8 px-6 lg:flex-row lg:items-center lg:space-x-12 lg:gap-y-0 xl:px-0">
        <div className="relative lg:w-[40%]">
          {/* Green decorative circle */}
          <div className="absolute top-32 -right-6 z-0 -translate-y-1/2">
            <Image
              src={greenPattern}
              alt="Decorative green"
              width={300}
              height={45}
            />
          </div>
          <div className="relative z-10 mx-auto lg:w-full">
            <Image
              src={transformImage}
              width={450}
              height={1000}
              quality={100}
              alt="Gifts for team"
              className="z-20 mx-auto h-auto w-full object-cover lg:w-full"
            />
          </div>
        </div>

        <div className="mt-12 lg:mt-0 lg:w-1/2">
          <TitleTag title={t("titleTag")} />

          <h1 className="mt-4 text-2xl leading-[32px] font-semibold text-[#F8F9FA] lg:text-5xl lg:leading-[60px]">
            {t("heading")}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#DEE2E6] lg:text-base lg:leading-[32px]">
            {t("subheading")}
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4">
            {[t("point1"), t("point2"), t("point3"), t("point4")].map(
              (item, i) => (
                <li key={i} className="flex items-start">
                  <Image
                    src={tickIcon}
                    alt="tick icon"
                    width={24}
                    height={24}
                  />
                  <span className="ml-3 text-xs text-[#DEE2E6] lg:text-base">
                    {item}
                  </span>
                </li>
              ),
            )}
          </ul>

          <Link href="/waitlist">
            <Button variant={"outline"} className="mt-8">
              {t("button")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
