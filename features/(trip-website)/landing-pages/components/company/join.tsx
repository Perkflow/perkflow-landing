"use client";
import { useEffect, useState } from "react";
import CompanyBg1 from "@/assets/images/company-bg-1.png";
import CompanyBg2 from "@/assets/icons/company-bg-2.svg";
import { Link } from "@/i18n/navigation";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function Join() {
  const [isMediumUp, setIsMediumUp] = useState(false);
  const t = useTranslations("Company_Page.Join");

  useEffect(() => {
    const handleResize = () => {
      setIsMediumUp(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundImage = isMediumUp
    ? `url(${CompanyBg1.src}), url(${CompanyBg2.src})`
    : `url(${CompanyBg2.src})`;

  const backgroundPosition = isMediumUp
    ? "left top 85px, right bottom"
    : "right bottom";

  const backgroundSize = isMediumUp ? "200px, 150px" : "150px";

  return (
    <div
      className="relative m-4 overflow-hidden bg-cover bg-no-repeat py-10 text-white sm:m-8 sm:py-16 lg:m-16"
      style={{
        backgroundImage,
        backgroundPosition,
        backgroundSize,
        borderRadius: "var(--radius-xl)",
        backgroundColor: "var(--primary)",
      }}
    >
      <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-8 px-4 sm:gap-10 sm:px-8 md:px-16">
        <div className="flex max-w-3xl flex-col gap-4 text-center md:gap-8">
          <h1 className="text-2xl font-bold text-balance sm:text-3xl md:text-4xl lg:text-5xl">
            {t("heading")}
          </h1>

          <p className="text-muted text-sm sm:text-base md:text-lg">
            {t("subheading")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <ContactFormDialog
              title={t("contactForm.title")}
              description={t("contactForm.desc")}
            >
              <button className="bg-background text-primary cursor-pointer rounded-full border border-white px-5 py-2.5 text-sm transition hover:bg-transparent hover:text-white sm:text-base">
                {t("contactForm.button")}
              </button>
            </ContactFormDialog>
            <button className="hover:text-primary rounded-full border border-white bg-transparent px-5 py-2.5 text-sm text-white transition hover:bg-white sm:text-base">
              <Link href="/contact">{t("button")}</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
