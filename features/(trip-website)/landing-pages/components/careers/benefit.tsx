import EnterpriseBgImg1 from "@/assets/icons/enterprise-bg-1.svg";
import EnterpriseBgImg2 from "@/assets/icons/enterprise-bg-2.svg";
import Container from "@/components/layouts/container";
import { useTranslations } from "next-intl";

export default function Benefit() {
  const t = useTranslations("Careers_Page");

  const purpose = [
    {
      title: t("Benefits.purpose.card1.title"),
      content: t("Benefits.purpose.card1.content"),
    },
    {
      title: t("Benefits.purpose.card2.title"),
      content: t("Benefits.purpose.card2.content"),
    },
    {
      title: t("Benefits.purpose.card3.title"),
      content: t("Benefits.purpose.card3.content"),
    },
    {
      title: t("Benefits.purpose.card4.title"),
      content: t("Benefits.purpose.card4.content"),
    },
  ];

  return (
    <div className="relative flex w-full flex-col items-start gap-10 overflow-hidden bg-(--chart-8) py-20 text-white md:flex-row">
      <div
        className="absolute bottom-0 left-30 hidden h-[100px] w-[150px] translate-x-[-50%] translate-y-[50%] bg-contain bg-no-repeat md:block lg:h-[150px] lg:w-[200px]"
        style={{ backgroundImage: `url(${EnterpriseBgImg1.src})` }}
      />

      <div
        className="absolute top-0 right-[-120px] hidden h-[180px] w-[250px] translate-x-[39%] bg-contain bg-no-repeat md:block lg:h-[220px] lg:w-[300px]"
        style={{ backgroundImage: `url(${EnterpriseBgImg2.src})` }}
      />

      <Container>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="mb-2 text-xl font-bold md:mb-4 md:text-4xl">
              {t("Benefits.heading")}
            </h2>
            <p className="text-sm text-(--chart-9) md:text-base">
              {t("Benefits.subheading")}
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:w-1/2">
            {purpose.map(({ title, content }) => (
              <div key={title} className="flex flex-col gap-1">
                <h3 className="text-base font-semibold md:text-lg">{title}</h3>
                <p className="text-sm text-(--chart-9)">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
