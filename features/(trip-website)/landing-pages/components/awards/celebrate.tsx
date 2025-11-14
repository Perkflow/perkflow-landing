import Image from "next/image";
import awardImg3 from "@/assets/images/award-3.jpg";
import awardBg1 from "@/assets/icons/award-bg-1.svg";
import Container from "@/components/layouts/container";
import { useTranslations } from "next-intl";

export default function Celebrate() {
  const t = useTranslations("Award_Ceremony_Page");
  const celebrate = {
    title: t("Celebrate.heading"),
    content: t("Celebrate.subheading"),
  };

  return (
    <div
      className="relative flex justify-center bg-cover bg-no-repeat p-4 md:px-16 md:py-20"
      style={{
        backgroundImage: `url(${awardBg1.src})`,
        backgroundPosition: "left 16px top 25px",
        backgroundSize: "200px",
      }}
    >
      <Container>
        <div className="bg-muted flex flex-col items-center gap-10 overflow-hidden rounded-lg md:flex-row-reverse md:items-start md:gap-16">
          <div className="flex w-full flex-col justify-center gap-5 px-2 md:w-1/2 md:px-4">
            <h2 className="text-foreground text-xl font-bold md:text-3xl">
              {celebrate.title}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {celebrate.content}
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative h-[180px] w-full md:h-[250px]">
              <Image
                src={awardImg3}
                alt="Celebrate Image"
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
