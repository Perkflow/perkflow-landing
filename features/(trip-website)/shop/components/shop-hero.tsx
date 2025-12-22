import Container from "@/components/layouts/container";
import { useTranslations } from "next-intl";

export default function ShopHero() {
  const t = useTranslations("Shop_Page.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003B4A] via-[#004d5f] to-[#006b7a] pt-24 pb-16 lg:pt-28 lg:pb-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-white/5" />
        <div className="absolute -bottom-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-white/5" />
      </div>

      <Container>
        <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Text content */}
          <div className="text-center lg:w-1/2 lg:text-left">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl xl:text-6xl">
              {t("heading")}
            </h1>
            <p className="mt-4 text-lg text-white/80 lg:text-xl">
              {t("subheading")}
            </p>
          </div>

          {/* Stacked gift cards */}
          <div className="relative flex h-64 w-80 items-center justify-center lg:h-72 lg:w-96">
            {/* Card 1 - Back (Amazon) */}
            <div className="absolute left-0 top-4 h-36 w-56 rotate-[-8deg] transform rounded-xl bg-[#232F3E] shadow-2xl transition-transform hover:rotate-[-10deg] lg:h-40 lg:w-64">
              <div className="flex h-full items-center justify-center">
                <span className="text-2xl font-bold text-white">amazon</span>
              </div>
            </div>

            {/* Card 2 - Middle (Airbnb) */}
            <div className="absolute left-8 top-8 h-36 w-56 rotate-[-2deg] transform rounded-xl bg-[#FF5A5F] shadow-2xl transition-transform hover:rotate-[-4deg] lg:left-12 lg:h-40 lg:w-64">
              <div className="flex h-full items-center justify-center gap-2">
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span className="text-2xl font-bold text-white">airbnb</span>
              </div>
            </div>

            {/* Card 3 - Front (Primark) */}
            <div className="absolute left-16 top-12 h-36 w-56 rotate-[4deg] transform rounded-xl bg-[#00A0D0] shadow-2xl transition-transform hover:rotate-[6deg] lg:left-24 lg:h-40 lg:w-64">
              <div className="flex h-full items-center justify-center">
                <span className="text-2xl font-bold tracking-widest text-white">
                  PRIMARK
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
