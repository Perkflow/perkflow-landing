import tickIcon from "@/assets/icons/tick.svg";
import Container from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import achievementImg from "@/assets/images/achievement-img.png";
import flowerImg from "@/assets/icons/feature-flower.svg";
import TitleTag from "@/components/atoms/title-tag";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function RecognizeAchievementsSection() {
  const t = useTranslations("Gifts_Page");
  return (
    <section className="bg-white py-20 lg:py-32">
      <Container className="px-2 sm:px-3 lg:px-4">
        <div className="justify-between px-4 lg:flex lg:items-center lg:space-x-12">
          {/* Text Column */}
          <div className="max-w-2xl lg:w-[40%]">
            <TitleTag title={t("Recognize_Achievement.titleTag")} />
            <h2 className="mt-4 text-2xl leading-8 font-bold text-black sm:text-5xl lg:leading-[60px]">
              {t("Recognize_Achievement.heading")}
            </h2>
            <p className="text-color mt-2 text-sm lg:text-base">
              {t("Recognize_Achievement.subheading")}
            </p>
            <ul className="mt-6 space-y-4">
              {[
                t("Recognize_Achievement.point1"),
                t("Recognize_Achievement.point2"),
                t("Recognize_Achievement.point3"),
                t("Recognize_Achievement.point4"),
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-start text-sm lg:text-base"
                >
                  <Image
                    src={tickIcon}
                    alt="tick icon"
                    width={24}
                    height={24}
                  />
                  <span className="text-color ml-3 text-sm">{text}</span>
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

          {/* Image Column */}
          <div className="relative mt-10 flex justify-center lg:mt-0 lg:w-[40%]">
            {/* Decorative green circle */}

            <div className="absolute -top-10 left-10 z-0">
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
                src={achievementImg}
                alt="Team celebration"
                quality={100}
                className="z-20 w-[500px] object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
