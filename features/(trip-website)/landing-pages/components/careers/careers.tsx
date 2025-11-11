import Image from "next/image";
import careerImg1 from "@/assets/images/career-Img-1.jpg";
import careerImg2 from "@/assets/images/career-Img-2.jpg";
import careerImg3 from "@/assets/images/career-Img-3.jpg";
import careerImg4 from "@/assets/images/career-Img-4.jpg";
import careerImg5 from "@/assets/images/career-Img-5.jpg";
import careerImg6 from "@/assets/images/career-Img-6.jpg";
import careerImg7 from "@/assets/images/career-Img-7.jpg";
import careerImg8 from "@/assets/images/career-Img-8.jpg";
import careerImg9 from "@/assets/images/career-Img-9.jpg";
import careerImg10 from "@/assets/images/career-Img-10.jpg";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Careers() {
  const t = useTranslations("Careers_Page");
  return (
    <div className="bg-background text-foreground relative mt-16 overflow-hidden py-12">
      <div className="relative z-[1] flex max-h-[500px] w-full flex-col items-center justify-center gap-10 px-4 sm:px-8 lg:px-20">
        <div className="flex max-w-4xl flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-balance sm:text-3xl md:text-4xl lg:text-5xl">
            {t("Hero.heading")}
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base">
            {t("Hero.subheading")}
          </p>

          <button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-full px-4 py-2 text-sm transition">
            <Link href="#open-roles">{t("Hero.cta")}</Link>
          </button>
        </div>

        {/* Image Layout */}
        <div className="flex max-h-[315px] w-full gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <div
              className="h-[150px] w-[300px] overflow-hidden"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <Image
                src={careerImg1}
                alt="Career 1"
                className="h-full w-full object-cover"
                placeholder="blur"
                priority
              />
            </div>
            <div
              className="h-[150px] w-[300px] overflow-hidden"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <Image
                src={careerImg2}
                alt="Career 2"
                className="h-full w-full object-cover"
                placeholder="blur"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div
            className="max-h-[500px] w-[500px] flex-grow overflow-hidden"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <Image
              src={careerImg3}
              alt="Career 3"
              className="h-full w-full object-cover"
              placeholder="blur"
              priority
            />
          </div>

          {/* Column 3 */}
          <div className="flex h-[350px] flex-col gap-4">
            {/* Top row */}
            <div className="flex h-[150px] gap-4">
              {[careerImg4, careerImg5, careerImg6, careerImg7].map(
                (img, i) => (
                  <div
                    key={i}
                    className="flex-1 overflow-hidden"
                    style={{ borderRadius: "var(--radius-lg)" }}
                  >
                    <Image
                      src={img}
                      alt={`Career ${i + 4}`}
                      className="h-full w-full object-cover"
                      placeholder="blur"
                    />
                  </div>
                ),
              )}
            </div>

            {/* Bottom row */}
            <div className="flex h-[150px] gap-4">
              {[careerImg8, careerImg9, careerImg10].map((img, i) => (
                <div
                  key={i}
                  className="flex-1 overflow-hidden"
                  style={{ borderRadius: "var(--radius-lg)" }}
                >
                  <Image
                    src={img}
                    alt={`Career ${i + 8}`}
                    className="h-full w-full object-cover"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
