import Image from "next/image";
import awardImg1 from "@/assets/images/award-1.jpg";
import { Link } from "@/i18n/navigation";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function Awards() {
  const t = useTranslations("Award_Ceremony_Page");

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="relative flex h-[500px] w-full items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={awardImg1}
            alt="why us"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-(--chart-6) via-(--chart-6)/20 to-(--chart-7)" />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">
            {t("Hero.heading")}
          </h1>

          <p className="mt-2 text-lg">{t("Hero.subheading")}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <ContactFormDialog
              title={t("contactForm.title")}
              description={t("contactForm.desc")}
            >
              <button
                type="button"
                className="bg-card text-sidebar-primary border-card cursor-pointer rounded-full border px-4 py-2 text-sm transition hover:bg-transparent hover:text-white"
              >
                {t("contactForm.button")}
              </button>
            </ContactFormDialog>
            <button
              type="button"
              className="border-card hover:bg-card hover:text-sidebar-primary cursor-pointer rounded-full border bg-transparent px-4 py-2 text-sm text-white transition"
            >
              <Link href="/contact">{t("Hero.button")}</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
