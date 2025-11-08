import Image from "next/image";

import trustImage from "@/assets/images/trusted .png";
import TitleTag from "@/components/atoms/title-tag";

import testimonialImg1 from "@/assets/images/testimonial-1.jpg";
import testimonialImg2 from "@/assets/images/testimonial-2.jpg";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("Trips_Page.Testimonials");
  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 bg-white px-4 lg:flex-row">
        <div className="relative mx-auto lg:w-[70%]">
          <Image
            width={1000}
            height={1000}
            src={trustImage}
            alt="trusted"
            quality={100}
            className="w-full object-cover"
          />
        </div>
        <div>
          <TitleTag title={t("caption")} />
          <h2 className="mt-4 mb-4 w-[70%] text-2xl font-semibold md:leading-[60px] lg:text-4xl">
            {t("heading")}
          </h2>
          <p className="mb-8 w-[90%] text-sm text-gray-600 md:text-base lg:w-full">
            {t("subheading")}
          </p>
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-12">
            <div>
              <div className="flex items-center gap-6">
                <Image
                  src={testimonialImg2}
                  alt="Alfonso Donin"
                  width={48}
                  height={48}
                  objectFit="cover"
                  className="h-12 w-12 rounded-full"
                />
                <div className="">
                  <div className="text-[#F39E0D]">★★★★★</div>
                  <div className="font-semibold">Jordan K., Techco</div>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {t("testimonialsList.testimonial1")}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-6">
                <Image
                  src={testimonialImg1}
                  alt="Alfonso Donin"
                  width={48}
                  height={48}
                  objectFit="cover"
                  quality={90}
                  className="h-12 w-12 rounded-full"
                />
                <div className="">
                  <div className="text-[#F39E0D]">★★★★★</div>
                  <div className="font-semibold">Alfonso Donin</div>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {t("testimonialsList.testimonial2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
