import serviceGoalIcon from "@/assets/icons/service-goal.svg";
import serviceInvitesIcon from "@/assets/icons/service-invites.svg";
import serviceTailorIcon from "@/assets/icons/service-tailored.svg";
import serviceUserIcon from "@/assets/icons/service-user.svg";
import serviceCalculatorIcon from "@/assets/icons/service-calculator.svg";
import serviceRewardsIcon from "@/assets/icons/service-gift.svg";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useTranslations } from "next-intl";

const getServices = (t: (key: string) => string) => [
  {
    icon: serviceGoalIcon,
    title: t("Service.card1.title"),
    description: t("Service.card1.description"),
  },
  {
    icon: serviceTailorIcon,
    title: t("Service.card2.title"),
    description: t("Service.card2.description"),
    offset: true,
  },
  {
    icon: serviceCalculatorIcon,
    title: t("Service.card3.title"),
    description: t("Service.card3.description"),
  },
  {
    icon: serviceInvitesIcon,
    title: t("Service.card4.title"),
    description: t("Service.card4.description"),
  },
  {
    icon: serviceUserIcon,
    title: t("Service.card5.title"),
    description: t("Service.card5.description"),
    offset: true,
  },
  {
    icon: serviceRewardsIcon,
    title: t("Service.card6.title"),
    description: t("Service.card6.description"),
  },
];

export default function Service() {
  const t = useTranslations("HomePage");
  const services = getServices(t);

  return (
    <section className="relative bg-[#003B4A] py-20 text-white">
      <div className="relative z-10 mx-auto max-w-2xl space-y-4 px-4 text-center">
        <div className="inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-semibold tracking-wider text-white uppercase md:text-sm">
          • {t("Service.caption")}
        </div>
        <h2 className="text-3xl font-semibold text-white md:text-5xl">
          {t("Service.heading")}
        </h2>
        <p className="leading-6 text-white/80">{t("Service.subheading")}</p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-5">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url('assets/service-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />

        <div className="relative z-10 container mx-auto mt-12 grid grid-cols-1 gap-8 gap-y-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <div
              key={svc.title}
              className={cn(
                "group h-fit flex-col space-y-4 rounded-[12px] border-[10px] border-[#F5F7FA] bg-white p-6 shadow-md transition-colors transition-shadow transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-[#F9A826] hover:bg-[#F9A826] hover:text-white hover:shadow-lg md:h-[350px]",
                { "lg:-mt-8": svc.offset },
              )}
            >
              <Image
                src={svc.icon}
                alt={svc.title}
                width={60}
                height={60}
                className="h-[30px] w-[30px] object-cover md:h-[50px] md:w-[50px]"
              />
              <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-white md:text-lg">
                {svc.title}
              </h3>
              <p className="flex-1 text-sm text-gray-600 transition-colors group-hover:text-white">
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-12 text-center">
        <ContactFormDialog
          title={t("ContactFormDialog.getStarted.title")}
          description={t("ContactFormDialog.getStarted.description")}
        >
          <Button size={"lg"} className="rounded-full px-5 py-6">
            {t("Service.cta")}
          </Button>
        </ContactFormDialog>
      </div>
    </section>
  );
}
