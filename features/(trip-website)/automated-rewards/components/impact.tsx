import flowerImg from "@/assets/icons/feature-flower.svg";
import Container from "@/components/layouts/container";
import Image from "next/image";
import { useTranslations } from "next-intl";

const getStats = (t: (key: string) => string) => [
  {
    value: "+32%",
    description: t("Impact.stat1.desc"),
  },
  {
    value: "2x",
    description: t("Impact.stat2.desc"),
  },
  {
    value: "<1 minute",
    description: t("Impact.stat3.desc"),
  },
  {
    value: "65%",
    description: t("Impact.stat4.desc"),
  },
];

export default function Impact() {
  const t = useTranslations("AutomatedReward");
  const stats = getStats(t);

  return (
    <div className="relative overflow-hidden bg-[#003B4A] px-6 py-32 text-white">
      {/* Decorative Backgrounds */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/5 transform opacity-20">
        <Image src={flowerImg} alt="bg image" className="h-auto w-52" />
      </div>
      <div className="absolute top-1/2 -right-12 -translate-y-1/5 transform opacity-20">
        <Image src={flowerImg} alt="bg image" className="h-auto w-52" />
      </div>
      <Container>
        {/* Content */}
        <h2 className="mx-auto mb-4 max-w-2xl text-center text-3xl font-semibold lg:text-5xl">
          {t("Impact.heading")}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm text-white lg:text-base">
          {t("Impact.subheading")}
        </p>
        <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group h-[150px] rounded-2xl bg-[#004557] px-4 py-6 transition-all duration-500 ease-in-out hover:bg-[#005C73] lg:h-[200px]"
            >
              <h1 className="mb-2 text-3xl font-semibold text-[#F8F9FA] group-hover:text-[#9AD3BC]">
                {stat.value}
              </h1>
              <p className="w-[70%] text-sm text-[#CED4DA] group-hover:text-[#9DD4BE]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
