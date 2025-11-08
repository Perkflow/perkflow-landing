import tickIcon from "@/assets/icons/tick.svg";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import customizeImg from "@/assets/images/customise-img.png";
import flowerImg from "@/assets/icons/feature-flower-orange.svg";
import TitleTag from "@/components/atoms/title-tag";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function Customize() {
  const t = useTranslations("AutomatedReward");
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl justify-between px-4 lg:flex lg:items-center lg:space-x-12">
        <div className="max-w-2xl lg:w-[40%]">
          <TitleTag title={t("Customize.titleTag")} />
          <h2 className="mt-4 text-2xl leading-8 font-bold text-black sm:text-5xl lg:leading-[60px]">
            {t("Customize.heading")}
          </h2>
          <p className="text-color mt-2 text-sm lg:text-base">
            {t("Customize.subheading")}
          </p>
          <ul className="mt-6 space-y-4">
            {[
              t("Customize.Item.item1"),
              t("Customize.Item.item2"),
              t("Customize.Item.item3"),
              t("Customize.Item.item4"),
            ].map((text) => (
              <li key={text} className="flex items-start text-sm lg:text-base">
                <Image src={tickIcon} alt="tick icon" width={24} height={24} />
                <span className="text-color ml-3 text-sm">{text}</span>
              </li>
            ))}
          </ul>
          <ContactFormDialog
            title={t("contactFormDialog.title")}
            description={t("contactFormDialog.description")}
          >
            <Button className="mt-8" variant="outline">
              {t("contactFormDialog.cta")}
            </Button>
          </ContactFormDialog>
        </div>

        {/* Image Column */}
        <div className="relative mt-10 flex justify-center lg:mt-0 lg:w-[40%]">
          {/* Decorative green circle */}

          <div className="absolute -top-10 left-0 z-0">
            <Image
              src={flowerImg}
              alt="decor"
              width={300}
              height={300}
              className="hidden lg:block"
            />
          </div>

          <div className="relative z-10">
            <Image
              src={customizeImg}
              alt="Team celebration"
              quality={100}
              className="z-20 w-[500px] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
