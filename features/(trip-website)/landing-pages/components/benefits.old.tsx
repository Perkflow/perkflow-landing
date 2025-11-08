import goalIcon from "@/assets/icons/goal.svg";
import rewardIcon from "@/assets/icons/reward.svg";
import voteIcon from "@/assets/icons/vote.svg";

import benefitBg from "@/assets/images/benefit.png";
import TitleTag from "@/components/atoms/title-tag";

import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import Image from "next/image";
import { useTranslations } from "next-intl";

const getBENEFITS = (t: (key: string) => string) => [
  {
    title: t("Benefits.benefit1.card.card1.title"),
    description: t("Benefits.benefit1.card.card1.description"),
    icon: goalIcon,
  },

  {
    title: t("Benefits.benefit1.card.card2.title"),
    description: t("Benefits.benefit1.card.card2.description"),
    icon: rewardIcon,
  },
  {
    title: t("Benefits.benefit1.card.card3.title"),
    description: t("Benefits.benefit1.card.card3.description"),
    icon: voteIcon,
  },
];

export default function Benefits() {
  const t = useTranslations("HomePage");
  const BENEFITS = getBENEFITS(t);

  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="mx-auto max-w-7xl gap-12 px-2">
        {/* Text Column */}
        <div className="w-full">
          <div className="space-y-3">
            <TitleTag title={t("Benefits.caption")} />
            <h2 className="text-3xl font-semibold text-[#212529] md:text-4xl">
              {t("Benefits.heading")}
            </h2>
            <p className="text-base text-[#495057]">
              {t("Benefits.subheading")}
            </p>
          </div>

          <div className="flex flex-col items-end justify-between gap-20 md:flex-row">
            <div className="mt-12 flex flex-col gap-12 md:w-1/3 md:flex-row">
              <div className="flex flex-col">
                <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                  {t("Benefits.benefit1.body")}
                </h3>
                <ul className="mt-6 space-y-6">
                  {BENEFITS.map(({ title, description, icon }) => (
                    <li className="flex items-start space-x-3" key={title}>
                      <Image
                        src={icon}
                        alt={title}
                        className="h-6 w-6 text-orange-500"
                      />
                      <div>
                        <h4 className="font-medium text-[#0B0019]">{title}</h4>
                        <p className="mt-2 text-sm text-[#495057]">
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="">
                  <ContactFormDialog
                    title={t("ContactFormDialog.rewardSolutions.title")}
                    description={t(
                      "ContactFormDialog.rewardSolutions.description",
                    )}
                  >
                    <Button variant="default" className="mt-6">
                      {t("Benefits.benefit1.cta")}
                    </Button>
                  </ContactFormDialog>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full md:w-[40%]">
              <div className="overflow-hidden">
                <Image
                  src={benefitBg}
                  alt="Team celebrating goals"
                  width={720}
                  height={20}
                  quality={100}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
