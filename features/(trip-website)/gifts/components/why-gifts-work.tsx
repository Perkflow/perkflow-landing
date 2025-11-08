import Image from "next/image";

import whyItworkImg from "@/assets/images/whyitworks-img.png";
import patternBg from "@/assets/icons/pattern.svg";
import yellowPattern from "@/assets/icons/yellow-blur.svg";
import greenPattern from "@/assets/icons/green-blur.svg";
import TitleTag from "@/components/atoms/title-tag";
import { Button } from "@/components/ui/button";

import tickIcon from "@/assets/icons/tick.svg";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function WhyGiftsWorkSection() {
  const t = useTranslations("Gifts_Page");
  return (
    <section className="overflow-hidden bg-white py-4 pb-16 lg:py-32 lg:pb-32">
      <div className="mx-auto flex max-w-7xl flex-col-reverse justify-between gap-y-8 px-6 lg:flex-row lg:items-center lg:space-x-12 lg:gap-y-0 xl:px-0">
        <div className="relative lg:w-[40%]">
          <div className="absolute -bottom-10 lg:-left-20">
            <Image
              src={patternBg}
              width={150}
              height={500}
              alt="pattern"
              className="z-0 h-auto w-[100px] lg:w-[150px]"
            />
          </div>

          <div className="relative z-10 mx-auto lg:w-full">
            <Image
              src={whyItworkImg}
              width={450}
              height={1000}
              quality={100}
              alt="Gifts for team"
              className="z-20 h-auto w-full object-cover lg:w-full"
            />

            {/* Green decorative circle */}
            <div className="absolute top-0 left-12 z-20 -translate-y-1/2">
              <Image
                src={greenPattern}
                alt="Decorative green"
                width={50}
                height={45}
              />
            </div>

            {/* Orange decorative circle */}
            <div className="absolute top-1/2 right-0 z-20 translate-x-1/2 -translate-y-1/2 -rotate-45 transform">
              <Image
                src={yellowPattern}
                alt="Decorative orange"
                width={100}
                height={64}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 lg:w-1/2">
          <TitleTag title={t("Why_Gifts_Work.titleTag")} />

          <h1 className="mt-4 text-2xl leading-[32px] font-semibold lg:text-5xl lg:leading-[60px]">
            {t("Why_Gifts_Work.heading")}
          </h1>
          <p className="text-color mt-4 text-base leading-6 lg:text-xl lg:leading-[32px]">
            {t("Why_Gifts_Work.subheading")}
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {[
              t("Why_Gifts_Work.point1"),
              t("Why_Gifts_Work.point2"),
              t("Why_Gifts_Work.point3"),
              t("Why_Gifts_Work.point4"),
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <Image src={tickIcon} alt="tick icon" width={24} height={24} />
                <span className="text-color ml-3 text-sm lg:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <ContactFormDialog
            title={t("Hero.contactForm.title")}
            description={t("Hero.contactForm.desc")}
          >
            <Button className="mt-8">{t("Hero.contactForm.button")}</Button>
          </ContactFormDialog>
        </div>
      </div>
    </section>
  );
}
