import { GiftIcon, PiggyBankIcon, TargetIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MakeGiftingSection() {
  const t = useTranslations("Gifts_Page.Make_Gifting_Easy");
  return (
    <section className="bg-[#003B4A] py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        <h2 className="text-center text-2xl font-semibold text-white sm:text-5xl lg:text-5xl">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-white lg:text-base">
          {t("subheading")}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: GiftIcon,
              title: t("card1.title"),
              description: t("card1.content"),
            },
            {
              icon: TargetIcon,
              title: t("card2.title"),
              description: t("card2.content"),
            },
            {
              icon: PiggyBankIcon,
              title: t("card3.title"),
              description: t("card3.content"),
            },
          ].map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="rounded-xl bg-white p-6">
              <Icon className="h-6 w-6 text-orange-400" />
              <h3 className="mt-4 text-base font-semibold text-gray-900 lg:text-xl">
                {title}
              </h3>
              <p className="text-color mt-2 text-sm lg:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
