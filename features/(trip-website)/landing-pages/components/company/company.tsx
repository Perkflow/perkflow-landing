import Image from "next/image";
import CompanyImg1 from "@/assets/images/company-Img-1.jpg";
import Clogo from "@/assets/icons/c-logo.svg";
import Ctext from "@/assets/icons/c-text.svg";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Company() {
  const t = useTranslations("Company_Page.Hero");
  return (
    <div className="bg-background text-foreground relative mt-16 overflow-hidden py-12">
      <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-10 px-4 sm:px-8 lg:px-20">
        {/* Header Section */}
        <div className="flex max-w-3xl flex-col gap-4 text-center">
          <h1 className="text-2xl font-bold text-balance sm:text-3xl md:text-4xl lg:text-5xl">
            {t("heading")}
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base">
            {t("subheading")}
          </p>
        </div>

        {/* Image Section */}
        <div
          className="relative h-[250px] w-full overflow-hidden sm:h-[320px] md:h-[420px] lg:h-[480px]"
          style={{ borderRadius: "var(--radius-xl)" }}
        >
          <Image
            src={CompanyImg1}
            alt="Enterprise Main"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

          {/* Text Content over Image */}
          <div className="absolute bottom-4 left-4 max-w-[90%] px-4 py-3 text-white sm:left-6 sm:max-w-sm">
            <div className="mb-3 flex items-center gap-2">
              <Image src={Clogo} alt="Company logo" height={20} />
              <Image src={Ctext} alt="Company text" height={20} />
            </div>

            <p className="mb-3 text-xs sm:text-sm">{t("overlay.text")}</p>

            <Link
              href="#"
              className="flex items-center gap-1 text-sm hover:underline"
            >
              {t("overlay.link")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
