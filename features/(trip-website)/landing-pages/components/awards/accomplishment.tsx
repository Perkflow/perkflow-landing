import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Accomplishment() {
  const t = useTranslations("Award_Ceremony_Page");
  return (
    <div>
      <div className="from-primary to-mint relative flex min-h-[350px] flex-col items-center justify-center bg-gradient-to-b text-center text-white sm:min-h-[400px] md:min-h-[464px]">
        <div className="absolute inset-0 z-0 bg-black/20" />

        <div className="relative z-10 flex max-w-full flex-col items-center gap-4 px-4 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-2xl leading-tight font-bold sm:text-4xl md:text-4xl">
            {t("Accomplishment.heading")}
          </h1>

          <p className="text-sm text-white/90">
            {t("Accomplishment.subheading")}
          </p>

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
