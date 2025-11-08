import { Button } from "@/components/ui/button";
import Image from "next/image";

import howItWorksPlan from "@/assets/images/htw-1.png";
import howItWorksPersonalize from "@/assets/images/htw-2.png";
import howItWorksApprove from "@/assets/images/htw-3.png";
import howToWorkBg from "@/assets/images/htw-bg.png";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const getHowItWorks = (t: (key: string) => string) => [
  {
    imgSrc: howItWorksPlan,
    title: t("HowItWorks.card1.title"),
    text: t("HowItWorks.card1.text"),
  },
  {
    imgSrc: howItWorksPersonalize,
    title: t("HowItWorks.card2.title"),
    text: t("HowItWorks.card2.text"),
  },
  {
    imgSrc: howItWorksApprove,
    title: t("HowItWorks.card3.title"),
    text: t("HowItWorks.card3.text"),
  },
];

export default function HowItWorks() {
  const t = useTranslations("HomePage");
  const HOW_IT_WORKS = getHowItWorks(t);
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-[#003B4A] py-32 text-white">
      <Image
        src={howToWorkBg}
        alt="howitworks-bg"
        width={500}
        height={500}
        className="pointer-events-none absolute right-0 bottom-0"
      />

      <div
        className={`mx-auto ${locale === "fr" ? "max-w-5xl" : "max-w-2xl"} space-y-6 px-4 text-center`}
      >
        {/* Pill label */}
        <div className="text-transform: inline-flex items-center rounded-full bg-[#F8F9FA] px-5.5 py-1.5 text-sm font-semibold tracking-wide text-[#005C73] uppercase">
          <span className="mr-2">•</span>
          {t("HowItWorks.caption")}
        </div>

        {/* Heading + subheading */}
        <h2 className="text-3xl leading-tight font-semibold sm:text-5xl">
          {t("HowItWorks.heading")}
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-[#F8F9FA] sm:text-base">
          {t("HowItWorks.subheading")}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {HOW_IT_WORKS.map(({ imgSrc, title, text }) => (
          <div
            key={title}
            className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg"
          >
            <div className="flex justify-center bg-[#F0FCFF] p-6">
              <Image
                src={imgSrc}
                alt={title}
                width={300}
                height={200}
                objectFit="contain"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 text-xl font-semibold text-[#101828]">
                {title}
              </h3>
              <p className="flex-1 text-sm text-gray-600">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <ContactFormDialog
          title={t("ContactFormDialog.rewardSolutions.title")}
          description={t("ContactFormDialog.rewardSolutions.description")}
        >
          <Button variant="outline">{t("HowItWorks.cta")}</Button>
        </ContactFormDialog>
      </div>
    </section>
  );
}
