import Image from "next/image";
import incentivesImg from "@/assets/images/incentives-img.jpg";
import tick from "@/assets/icons/tick.svg";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

export default function Objectives() {
  const t = useTranslations("Enterprise_Page");
  const objectives = [
    {
      title: t("Objectives.card1.title"),
      content: t("Objectives.card1.content"),
    },
    {
      title: t("Objectives.card2.title"),
      content: t("Objectives.card2.content"),
    },
    {
      title: t("Objectives.card3.title"),
      content: t("Objectives.card3.content"),
    },
  ];

  return (
    <div className="flex justify-center px-4 py-10 md:px-20">
      <div className="flex w-full flex-col-reverse items-center gap-10 overflow-hidden rounded-lg bg-(--lavender-mist) md:flex-row">
        <div className="flex w-full flex-col justify-center gap-6 p-4 md:w-1/2 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
            {t("Objectives.heading")}
          </h2>

          {objectives.map(({ title, content }) => (
            <div key={title} className="flex items-start gap-3">
              <Image src={tick} alt="tick icon" className="mt-1 h-5 w-5" />
              <div>
                <h3 className="text-base font-semibold text-(--chart-10) md:text-lg">
                  {title}
                </h3>
                <p className="text-sm text-(--chart-11) md:text-base">
                  {content}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <ContactFormDialog
              title={t("Objectives.contactForm.title")}
              description={t("Objectives.contactForm.desc")}
            >
              <button className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2 text-sm text-white transition">
                {t("Objectives.contactForm.title")}
              </button>
            </ContactFormDialog>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative h-[250px] min-h-[300px] w-full md:h-full">
            <Image
              src={incentivesImg}
              alt="incentives image"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
