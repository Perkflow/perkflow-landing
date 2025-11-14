import Image from "next/image";

import motivationImage from "@/assets/images/motivation-img.png";
import greenPattern from "@/assets/icons/feature-flower.svg";
import TitleTag from "@/components/atoms/title-tag";
import { Button } from "@/components/ui/button";
import Container from "@/components/layouts/container";
import tickIcon from "@/assets/icons/tick.svg";
import ContactFormDialog from "@/components/ui/contact-form-dialog";

import { useTranslations } from "next-intl";

export default function MotivationSection() {
  const t = useTranslations("AutomatedReward");
  return (
    <section className="overflow-hidden bg-white py-4 pb-16 lg:py-32 lg:pb-32">
      <Container>
        <div className="flex flex-col-reverse justify-between gap-y-8 lg:flex-row lg:items-center lg:space-x-12 lg:gap-y-0">
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
                src={motivationImage}
                width={450}
                height={1000}
                quality={100}
                alt="Gifts for team"
                className="z-20 mx-auto h-auto w-full object-cover lg:w-full"
              />
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <TitleTag title={t("Motivation.titleTag")} />

            <h1 className="mt-4 text-2xl leading-[32px] font-semibold lg:text-5xl lg:leading-[60px]">
              {t("Motivation.heading")}
            </h1>
            <p className="text-color mt-4 text-base leading-6 lg:text-xl lg:leading-[32px]">
              {t("Motivation.subheading")}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4">
              {[
                t("Motivation.Item.item1"),
                t("Motivation.Item.item2"),
                t("Motivation.Item.item3"),
                t("Motivation.Item.item4"),
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <Image
                    src={tickIcon}
                    alt="tick icon"
                    width={24}
                    height={24}
                  />
                  <span className="text-color ml-3 text-xs lg:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <ContactFormDialog
              title={t("contactFormDialog.title")}
              description={t("contactFormDialog.description")}
            >
              <Button className="mt-8">{t("contactFormDialog.cta")}</Button>
            </ContactFormDialog>
          </div>
        </div>
      </Container>
    </section>
  );
}
