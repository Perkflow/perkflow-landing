import { Button } from "@/components/ui/button";
import Image from "next/image";

import avatarImg from "@/assets/images/feature-trusted.png";
import trustPilotImg from "@/assets/images/trustpilot.png";
import capterraImg from "@/assets/images/capterra.png";
import heroImg from "@/assets/images/feature-hero-img.png";
import flowerImg from "@/assets/icons/feature-flower.svg";
import curveBg from "@/assets/icons/feature-cuve.svg";
import { StarOff, TicketPercent } from "lucide-react";
import Container from "@/components/layouts/container";
import { Link } from "@/i18n/navigation";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function GiftHeroSection() {
  const t = useTranslations("Gifts_Page.Hero");
  return (
    <section className="relative overflow-hidden bg-[#003B4A] pt-24 pb-6 lg:pt-10 lg:pb-0">
      <Container>
        <div className="justify-between py-4 lg:flex lg:items-center lg:py-44">
          {/* Left content */}
          <div className="text-white lg:w-1/2">
            <h1 className="text-4xl leading-[130%] font-bold tracking-tight sm:text-[60px]">
              {t("heading")}
            </h1>
            <p className="mt-2 opacity-90 lg:text-lg">{t("subheading")}</p>
            <div className="mt-8 flex space-x-4">
              <ContactFormDialog
                title={t("contactForm.title")}
                description={t("contactForm.desc")}
              >
                <Button className="bg-white text-[#495057] hover:border hover:border-white hover:bg-transparent hover:text-white">
                  {t("contactForm.button")}
                </Button>
              </ContactFormDialog>
              <Button
                className="border border-white bg-transparent text-white"
                variant="outline"
              >
                <Link href="/contact">{t("button")}</Link>
              </Button>
            </div>

            {/* Trusted by section */}
            <div className="mt-12">
              <p className="text-xs font-medium text-[#E9ECEF] md:text-base">
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

                  <span className="text-[10px] font-bold text-white lg:text-sm">
                    4.8/5{" "}
                    <span className="font-medium text-[#E9ECEF]">
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
              src={flowerImg}
              alt="Celebrating team member"
              width={340}
              height={1000}
              quality={100}
              loading="lazy"
              className="absolute -top-2 right-0 z-0 w-[120px] sm:w-[340px] md:-top-12 md:right-0"
            />

            <Image
              src={heroImg}
              alt="Celebrating team member"
              width={620}
              height={1127}
              quality={100}
              loading="lazy"
              className="z-10"
            />
            {/* Decorative icons */}
            <div className="absolute top-0 left-36 hidden sm:block">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#f9953b]">
                <span className="font-bold text-white">
                  <TicketPercent size={16} />
                </span>
              </div>
            </div>
            <div className="absolute top-20 left-10 hidden sm:block">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#9bd3bc]">
                <span className="font-bold text-white">
                  <StarOff size={16} />
                </span>
              </div>
            </div>

            <Image
              src={curveBg}
              alt="Celebrating team member"
              width={560}
              height={1127}
              quality={100}
              loading="lazy"
              className="absolute -right-12 -bottom-48 z-0 hidden sm:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
