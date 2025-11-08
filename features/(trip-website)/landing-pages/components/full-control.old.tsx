import trackIcon from "@/assets/icons/track.svg";
import inviteIcon from "@/assets/icons/invite.svg";
import fullControlBg from "@/assets/images/full-control-bg.png";
import fullControlBg2 from "@/assets/images/full-control-bg-2.png";
import fullControlImg from "@/assets/images/full-control.png";
import setIcon from "@/assets/icons/set.svg";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

const getCONTROL = (t: (key: string) => string) => [
  {
    icon: trackIcon,
    title: t("Benefits.benefit2.card.card1.title"),
    description: t("Benefits.benefit2.card.card1.description"),
  },
  {
    icon: inviteIcon,
    title: t("Benefits.benefit2.card.card2.title"),
    description: t("Benefits.benefit2.card.card2.description"),
  },
  {
    icon: setIcon,
    title: t("Benefits.benefit2.card.card3.title"),
    description: t("Benefits.benefit2.card.card3.description"),
  },
];

export default function FullControl() {
  const t = useTranslations("HomePage");
  const CONTROL = getCONTROL(t);

  return (
    <section className="relative overflow-hidden bg-[#003B4A] py-20 text-white">
      <Image
        src={fullControlBg}
        alt="full-control-bg"
        width={500}
        height={300}
        className="pointer-events-none absolute bottom-0 left-0 object-cover md:top-0"
      />

      {/* Decorative flower shape */}
      <Image
        className="absolute right-0 bottom-0 z-0 w-[120px] object-cover md:w-[200px]"
        src={fullControlBg2}
        alt="full-control-bg"
      />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-12 px-4 md:flex-row">
        <Image
          src={fullControlImg}
          alt="Control dashboard"
          width={700}
          height={450}
          className="z-10 h-auto object-cover md:w-[40%]"
        />

        <div className="z-10 order-1 w-full space-y-6 md:order-2 md:w-[40%]">
          <h2 className="text-xl font-medium md:text-[30px]">
            {t("Benefits.benefit2.body")}
          </h2>
          <ul className="space-y-8">
            {CONTROL.map(({ icon, title, description }) => (
              <li className="flex items-start space-x-4" key={title}>
                <Image
                  src={icon}
                  alt="track"
                  className="h-6 w-6 object-cover"
                />
                <div>
                  <h4 className="text-sm font-medium md:text-base">{title}</h4>
                  <p className="m-1 text-sm text-[#E9ECEF] md:text-sm">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <ContactFormDialog
              title={t("ContactFormDialog.getStarted.title")}
              description={t("ContactFormDialog.getStarted.description")}
            >
              <Button
                variant="outline"
                className="px-6 py-3 font-medium text-[#005C73]"
              >
                {t("Benefits.benefit2.cta")}
              </Button>
            </ContactFormDialog>
          </div>
        </div>
      </div>
    </section>
  );
}
