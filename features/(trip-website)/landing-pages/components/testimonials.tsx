import quote from "@/assets/icons/quote.svg";
import testimonialImg1 from "@/assets/images/testimonial-1.jpg";
import testimonialImg2 from "@/assets/images/testimonial-2.jpg";
import testimonialImg3 from "@/assets/images/testimonial-3.jpg";
import Container from "@/components/layouts/container";

import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const getTestimonials = (t: (key: string) => string) => [
  {
    name: "Michael Stapl",
    role: t("Testimonials.testimonial1.role"),
    company: "CoreTel Solutions",
    country: "🇺🇸",
    avatar: testimonialImg1,
    quote: t("Testimonials.testimonial1.quote"),
    rating: 5,
  },
  {
    name: "David Agyekum",
    role: t("Testimonials.testimonial2.role"),
    company: "FinPlus",
    country: "🇬🇭",
    avatar: testimonialImg2,
    quote: t("Testimonials.testimonial2.quote"),
    rating: 5,
  },
  {
    name: "Lydia Mensah",
    role: t("Testimonials.testimonial3.role"),
    company: "Agrolink",
    country: "🇬🇧",
    avatar: testimonialImg3,
    quote: t("Testimonials.testimonial3.quote"),
    rating: 5,
  },
];

export default function Testimonials() {
  const t = useTranslations("HomePage");
  const testimonials = getTestimonials(t);

  return (
    <section className="relative bg-[#F5F7FA] py-20">
      {/* Green gradient top-left */}
      <div
        className="pointer-events-none absolute top-0 left-0 -z-0 h-80 w-80 md:h-[420px] md:w-[420px]"
        style={{
          background:
            "radial-gradient(circle, rgba(171,222,201,0.5) 0%, rgba(171,222,201,0.25) 40%, rgba(171,222,201,0) 70%)",
          filter: "blur(6px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl space-y-4 px-2 text-center">
        <div className="inline-block rounded-full bg-[#F0FCFF] px-5 py-2 text-xs font-semibold tracking-wider text-[#005C73] uppercase md:text-sm">
          • {t("Testimonials.caption")}
        </div>
        <h2 className="text-3xl font-semibold text-[#111827] md:text-5xl">
          {t("Testimonials.heading")}
        </h2>
        <p className="mx-auto max-w-xl leading-6 text-[#495057]">
          {t("Testimonials.subheading")}
        </p>
      </div>
      <Container>
        <div className="mt-12 grid grid-cols-1 gap-8 px-2 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((i) => (
            <div
              key={i.name}
              className="relative overflow-hidden rounded-[8px] bg-white p-8 shadow-sm"
            >
              {/* Quote icon background */}
              <div className="absolute top-4 right-4 text-teal-100">
                <Image
                  src={quote}
                  alt="quote"
                  width={48}
                  height={48}
                  objectFit="cover"
                />
              </div>

              {/* Profile */}
              <div className="mb-8 flex items-center space-x-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={i.avatar}
                    alt={i.name}
                    width={48}
                    height={48}
                    objectFit="cover"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{i.name}</p>
                  <p className="flex items-center text-gray-600">
                    <span className="mr-1">{i.country}</span>
                    <span>
                      {i.role}, {i.company}
                    </span>
                  </p>
                </div>
              </div>

              {/* Quote text */}
              <p className="mb-16 font-medium text-[#111827]">“{i.quote}”</p>

              {/* Rating */}
              <div className="flex items-center">
                <div className="flex space-x-1 text-yellow-500">
                  {Array.from({ length: i.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#F39E0D" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({t("Testimonials.span")})
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
