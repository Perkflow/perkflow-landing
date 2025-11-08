import Image from "next/image";
import incentivesImg from "@/assets/images/incentives-img.jpg";
import { useTranslations } from "next-intl";

export default function Incentives() {
  const t = useTranslations("Enterprise_Page");
  const incentives = {
    title: t("Incentives.title"),
    content: t("Incentives.content"),
  };

  return (
    <div className="flex justify-center p-4 md:px-10 md:py-20">
      <div className="flex w-full max-w-7xl flex-col-reverse items-center gap-10 overflow-hidden rounded-lg bg-(--lavender-mist) md:flex-row md:items-start md:gap-20">
        <div className="flex w-full flex-col justify-center gap-5 px-2 md:w-1/2 md:px-4">
          <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
            {incentives.title}
          </h2>
          <p className="text-sm text-gray-600 md:text-base">
            {incentives.content}
          </p>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative h-[250px] w-full md:h-[350px]">
            <Image
              src={incentivesImg}
              alt="Incentives Image"
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
