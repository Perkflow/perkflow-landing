import goalIcon from "@/assets/icons/goal.svg";
import inviteIcon from "@/assets/icons/invite.svg";
import setIcon from "@/assets/icons/set.svg";
import rewardIcon from "@/assets/icons/reward.svg";
import Container from "@/components/layouts/container";
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
    icon: inviteIcon,
  },
  {
    title: t("Benefits.benefit1.card.card3.title"),
    description: t("Benefits.benefit1.card.card3.description"),
    icon: setIcon,
  },
  {
    title: t("Benefits.benefit1.card.card4.title"),
    description: t("Benefits.benefit1.card.card4.description"),
    icon: rewardIcon,
  },
];

export default function Benefits() {
  const t = useTranslations("HomePage");
  const BENEFITS = getBENEFITS(t);

  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] py-20">
      {/* Decorative gradients */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 -z-0 h-80 w-80 md:h-[28rem] md:w-[28rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(249,138,38,0.35) 0%, rgba(249,138,38,0.15) 40%, rgba(249,138,38,0) 70%)",
          filter: "blur(6px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-1/2 -z-0 h-80 w-80 -translate-x-1/2 md:h-[26rem] md:w-[26rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(171,222,201,0.5) 0%, rgba(171,222,201,0.25) 40%, rgba(171,222,201,0) 70%)",
          filter: "blur(6px)",
        }}
      />
      <Container>
        <div className="relative z-10 gap-12 px-2">
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

            <div className="flex flex-col items-center justify-between gap-20 md:flex-row">
              <div className="flex flex-col md:w-2/4 md:flex-row">
                <div className="flex flex-col">
                  <ul className="space-y-6">
                    {BENEFITS.map(({ title, description, icon }) => (
                      <li className="flex items-start space-x-3" key={title}>
                        <Image
                          src={icon}
                          alt={title}
                          className="h-6 w-6 text-orange-500"
                        />
                        <div>
                          <h4 className="font-medium text-[#0B0019]">
                            {title}
                          </h4>
                          <p className="mt-2 text-sm text-[#495057]">
                            {description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="">
                    <ContactFormDialog
                      title={t("ContactFormDialog.getStarted.title")}
                      description={t(
                        "ContactFormDialog.getStarted.description"
                      )}
                    >
                      <Button variant="default" className="mt-6">
                        {t("ContactFormDialog.getStarted.title")}
                      </Button>
                    </ContactFormDialog>
                  </div>
                </div>
              </div>

              {/* Image Column */}
              <div className="mx-8 w-full md:w-1/2">
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
      </Container>
    </section>
  );
}
