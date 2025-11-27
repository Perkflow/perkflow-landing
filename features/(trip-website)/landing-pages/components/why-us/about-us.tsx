import Image from "next/image";
import AboutUsImg from "@/assets/images/about-us.jpg";
import Container from "@/components/layouts/container";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("Why_Us_Page");
  const about = {
    title: t("about_us.heading"),
    content: t("about_us.body"),
  };

  return (
    <Container>
      <div className="flex justify-center py-10">
        <div className="bg-muted flex flex-col-reverse items-start gap-10 overflow-hidden rounded-lg md:flex-row md:gap-20">
          <div className="w-full md:w-1/2">
            <Image
              src={AboutUsImg}
              alt="about us"
              width={500}
              height={300}
              className="h-full w-full rounded object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-center gap-5 md:w-1/2">
            <div className="text-primary w-fit rounded-full bg-white text-sm font-semibold">
              <div className="bg-primary/10 flex gap-2 rounded-full px-3 py-1">
                <span>•</span>
                <span>{t("about_us.caption")}</span>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-3xl">
                {about.title}
              </h2>
              <p className="text-gray-600">{about.content}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
