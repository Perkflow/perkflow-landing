import clockIcon from "@/assets/icons/clock.svg";
import expertIcons from "@/assets/icons/expert.svg";
import flowIcon from "@/assets/icons/flow.svg";
import supportImg from "@/assets/images/support.png";

import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import Image from "next/image";
import { useTranslations } from "next-intl";

const getSUPPORT = (t: (key: string) => string) => [
  {
    icon: clockIcon,
    title: t("Benefits.benefit2.card.card1.title"),
    description: t("Benefits.benefit2.card.card1.description"),
  },
  {
    icon: expertIcons,
    title: t("Benefits.benefit2.card.card2.title"),
    description: t("Benefits.benefit2.card.card2.description"),
  },
  {
    icon: flowIcon,
    title: t("Benefits.benefit2.card.card3.title"),
    description: t("Benefits.benefit2.card.card3.description"),
  },
];

export default function Support() {
  const t = useTranslations("HomePage");
  const SUPPORT = getSUPPORT(t);

  return (
    <section className="bg-[#f5f7fa] py-20" id="support">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-12 px-2 md:flex-row-reverse">
        {/* Text Column */}
        <div className="w-full space-y-6 md:w-[40%]">
          <h2 className="text-xl font-medium text-[#0B0019] md:text-[30px]">
            {t("Benefits.benefit2.body")}
          </h2>
          <ul className="space-y-8">
            {SUPPORT.map(({ icon, title, description }) => (
              <li className="flex items-start space-x-3" key={title}>
                <Image
                  src={icon}
                  alt={`${title} icon`}
                  className="h-6 w-6 object-cover"
                />
                <div>
                  <h4 className="text-base font-semibold text-[#0B0019]">
                    {title}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-[#495057]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={supportImg}
          alt="Customer support"
          width={700}
          height={450}
          className="h-auto object-cover md:w-[40%]"
        />
      </div>
    </section>
  );
}
