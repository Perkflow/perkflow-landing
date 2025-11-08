import Image from "next/image";
import awardImg2 from "@/assets/images/award-2.png";
import { useTranslations } from "next-intl";

export default function Recognition() {
  const t = useTranslations("Award_Ceremony_Page");
  const recognition = {
    title: t("Recognition.heading"),
    content: t("Recognition.subheading"),
  };

  return (
    <div className="flex justify-center bg-white p-4 md:px-10 md:py-20">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 overflow-hidden rounded-lg md:flex-row md:items-start md:gap-20">
        <div className="flex w-full flex-col justify-center gap-5 px-2 md:w-1/2 md:px-4">
          <h2 className="text-foreground text-xl font-bold md:text-3xl">
            {recognition.title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            {recognition.content}
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative h-[180px] w-full overflow-hidden rounded-lg md:h-[250px]">
            <Image
              src={awardImg2}
              alt="recognition Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
