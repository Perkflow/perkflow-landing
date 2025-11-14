"use client";

import Image from "next/image";
import EnterpriseBgImg from "@/assets/images/enterprise-bg.jpg";
import EnterpriseBgImg1 from "@/assets/images/enterprise-bg-1.png";
import EnterpriseBgImg2 from "@/assets/images/enterprise-bg-2.png";
import { Link } from "@/i18n/navigation";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";
import Container from "@/components/layouts/container";

export default function Enterprise() {
  const t = useTranslations("Enterprise_Page");
  return (
    <div
      className="relative mt-16 overflow-hidden bg-(--chart-8) text-white py-20"
      style={{
        backgroundImage: `url(${EnterpriseBgImg1.src}), url(${EnterpriseBgImg2.src})`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "500px, 250px",
        backgroundPosition: "left 0 top 260px, right 80px top 170px",
      }}
    >
      <style jsx>{`
        @media (max-width: 768px) {
          div[style] {
            background-image: none !important;
          }
        }
      `}</style>
      <Container>
        <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-10 px-4 sm:px-10 md:px-20">
          <div className="flex max-w-3xl flex-col gap-4 text-center">
            <h1 className="text-2xl font-bold text-balance sm:text-3xl md:text-4xl lg:text-5xl">
              {t("Hero.heading")}
            </h1>

            <p className="text-sm text-[#E9ECEF] md:text-base">
              {t("Hero.subheading")}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <ContactFormDialog
                title={t("Hero.contactForm.title")}
                description={t("Hero.contactForm.desc")}
              >
                <button className="cursor-pointer rounded-full border border-transparent bg-[#F9A826] px-4 py-2 text-sm text-[#0B0019] transition hover:bg-[#F9A826]/90">
                  {t("Hero.contactForm.button")}
                </button>
              </ContactFormDialog>
              <button className="rounded-full border border-white bg-white px-4 py-2 text-sm text-(--chart-8) transition hover:bg-transparent hover:text-white">
                <Link href="/contact">{t("Hero.button")}</Link>
              </button>
            </div>
          </div>

          <div className="relative h-[250px] w-full mb-10 overflow-hidden rounded-lg sm:h-[300px] md:h-[400px] lg:h-[450px]">
            <Image
              src={EnterpriseBgImg}
              alt="Enterprise Main"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>

      {/* <div className="absolute hidden md:block left-0 top-[65%] lg:top-[60%] w-[150px] lg:w-[200px] h-[150px] lg:h-[200px]">
        <Image
          src={EnterpriseBgImg1}
          alt="Decorative Left"
          fill
          className="object-contain"
        />
      </div>

      <div className="absolute hidden md:block right-[-2rem] lg:right-0 top-[55%] lg:top-[45%] w-[150px] lg:w-[200px] h-[100px] lg:h-[150px]">
        <Image
          src={EnterpriseBgImg2}
          alt="Decorative Right"
          fill
          className="object-contain"
        />
      </div> */}
    </div>
  );
}
