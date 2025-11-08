import Image from "next/image";
import articlesHero from "@/assets/images/articles-1.png";
import { useTranslations } from "next-intl";

export default function Resources() {
  const t = useTranslations("Resources_Page");
  return (
    <div className="py-16 pb-12 md:pb-20">
      <div className="relative flex min-h-[350px] flex-col items-center justify-center text-center text-white sm:min-h-[400px] md:min-h-[464px]">
        <Image
          src={articlesHero}
          alt="Resources header background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-0 bg-black/20" />

        <div className="relative z-10 flex max-w-full flex-col items-center gap-4 px-2 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <h1 className="text-2xl leading-tight font-bold sm:text-4xl md:text-5xl">
            {t("Hero.heading")}
          </h1>
          <p className="text-sm text-white/90 sm:text-base md:text-lg">
            {t("Hero.subheading")}
          </p>
        </div>
      </div>
    </div>
  );
}
