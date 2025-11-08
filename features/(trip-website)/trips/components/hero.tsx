import { Button } from "@/components/ui/button";
import Image from "next/image";

import avatarImg from "@/assets/images/feature-trusted.png";
import trustPilotImg from "@/assets/icons/trusted-dark.svg";
import capterraImg from "@/assets/icons/capterra-dark.svg";
import heroImg from "@/assets/images/trips-hero.png";
import bg from "@/assets/images/middle-bg.png";
import { Link } from "@/i18n/navigation";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function TripsHeroSection() {
  const t = useTranslations("Trips_Page.Hero");

  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] pt-24 pb-6 lg:pt-10 lg:pb-0">
      <div className="mx-auto justify-between px-4 py-4 lg:container lg:flex lg:items-center lg:py-32 xl:max-w-[90rem] xl:px-8">
        {/* Left content */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl leading-[130%] font-bold tracking-tight text-[#0B0019] sm:text-[60px]">
            {t("heading")}
          </h1>
          <p className="text-color mt-2 opacity-90 lg:text-lg">
            {t("subheading")}
          </p>
          <div className="mt-8 flex space-x-4">
            <ContactFormDialog
              title={t("contactForm.title")}
              description={t("contactForm.desc")}
            >
              <Button variant="default">{t("contactForm.button")}</Button>
            </ContactFormDialog>
            <Button variant="outline">
              <Link href="/contact">{t("button")}</Link>
            </Button>
          </div>

          {/* Trusted by section */}
          <div className="mt-12">
            <p className="text-color text-xs font-medium md:text-base">
              {t("socialProof.heading")}
            </p>
            <div className="mt-4 flex items-center space-x-8">
              {/* Avatars */}
              <div className="space-y-1">
                <Image
                  src={avatarImg}
                  alt="Avatar"
                  width={100}
                  height={40}
                  quality={80}
                  className="w-[60px] object-cover lg:w-[100px]"
                />

                <span className="text-color text-[10px] font-bold lg:text-sm">
                  4.8/5{" "}
                  <span className="text-color font-medium">
                    {t("socialProof.subheading")}
                  </span>
                </span>
              </div>

              <Image
                src={trustPilotImg}
                alt="trustpilot"
                width={100}
                height={40}
                quality={80}
                className="w-[60px] object-cover lg:w-[100px]"
              />

              <Image
                src={capterraImg}
                alt=" capterra "
                width={100}
                height={40}
                quality={80}
                className="w-[60px] object-cover lg:w-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="relative mt-10 flex justify-center lg:mt-0 lg:w-[45%]">
          {/* Orange background shape */}

          <Image
            src={heroImg}
            alt="Celebrating team member"
            width={620}
            height={1127}
            quality={100}
            loading="lazy"
            className="z-10 w-full"
          />

          <div className="absolute -top-20 left-0 z-0 h-full w-full">
            <Image
              src={bg}
              alt="Celebrating team member"
              width={620}
              height={1127}
              quality={100}
              loading="lazy"
              className="z-10 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
