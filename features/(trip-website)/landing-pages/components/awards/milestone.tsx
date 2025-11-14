import Image from "next/image";
import tick from "@/assets/icons/tick.svg";
import awardImg4 from "@/assets/images/award-4.png";
import awardBg2 from "@/assets/icons/award-bg-2.svg";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import Container from "@/components/layouts/container";
import { useTranslations } from "next-intl";

export default function Milestone() {
  const t = useTranslations("Award_Ceremony_Page");
  const objectives = [
    {
      title: t("Milestone.card1.title"),
      content: t("Milestone.card1.content"),
    },
    {
      title: t("Milestone.card2.title"),
      content: t("Milestone.card2.content"),
    },
    {
      title: t("Milestone.card3.title"),
      content: t("Milestone.card3.content"),
    },
  ];

  return (
    <div
      className="relative flex justify-center bg-white bg-cover bg-no-repeat px-4 py-10 md:px-16"
      style={{
        backgroundImage: `url(${awardBg2.src})`,
        backgroundPosition: "right 12px top 85px",
        backgroundSize: "200px",
      }}
    >
      <Container>
        <div className="flex flex-col items-center gap-10 overflow-hidden rounded-lg md:flex-row">
          <div className="flex w-full flex-col justify-center gap-6 md:w-1/2 md:py-8">
            <div>
              <h2 className="text-foreground text-xl font-bold md:text-3xl">
                {t("Milestone.heading")}
              </h2>

              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {t("Milestone.subheading")}
              </p>
            </div>

            {objectives.map(({ title, content }) => (
              <div key={title} className="flex items-start gap-3">
                <Image src={tick} alt="tick icon" className="mt-1 h-5 w-5" />
                <div>
                  <h3 className="text-foreground text-base font-semibold md:text-lg">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {content}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <ContactFormDialog
                title={t("contactForm.title")}
                description={t("contactForm.desc")}
              >
                <button className="bg-primary hover:bg-primary/90 cursor-pointer rounded-full px-6 py-2 text-sm text-white transition">
                  {t("contactForm.button")}
                </button>
              </ContactFormDialog>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative h-[250px] min-h-[300px] w-full overflow-hidden rounded-lg bg-cover bg-no-repeat md:h-full">
              <Image
                src={awardImg4}
                alt="incentives image"
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
