"use client";

import heroMapIcon from "@/assets/icons/hero-map.svg";
import curveArrowIcon from "@/assets/icons/curve-arrow.svg";
import heroCongratulationsImg1 from "@/assets/images/hero-congratulation-1.png";
import heroCongratulationsImg2 from "@/assets/images/hero-congratulation-2.png";
import heroGiftIcon from "@/assets/icons/hero-gift.svg";
import heroImg4 from "@/assets/icons/shopping-cart.svg";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";
import { useWaitlist } from "@/hooks/useWaitlist";
import { isAPIError } from "@/lib/error";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useFormRefresh } from "@/hooks/use-form-refresh";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

interface HeroVariation {
  id: number;
  tagline: string;
  title: string;
  subtitle: string;
  primaryCTA: { text: string; action: string; type: "contact" | "link" } | null;
  secondaryCTA?: { text: string; action: string; type: "contact" | "link" };
  backgroundColor: string;
  visualType: "celebration" | "platform" | "team" | "ai";
  showTagline: boolean;
}

const getHeroVariations = (t: (key: string) => string): HeroVariation[] => [
  {
    id: 1,
    tagline: t("HeroVariation1.tagline"),
    title: t("HeroVariation1.title"),
    subtitle: t("HeroVariation1.subtitle"),
    primaryCTA: {
      text: t("HeroVariation1.primaryCTA.text"),
      action: "/contact",
      type: "contact",
    },
    backgroundColor: "bg-white",
    visualType: "platform",
    showTagline: true,
  },
  {
    id: 2,
    tagline: t("HeroVariation2.tagline"),
    title: t("HeroVariation2.title"),
    subtitle: t("HeroVariation2.subtitle"),
    primaryCTA: null,
    backgroundColor: "bg-green-50",
    visualType: "ai",
    showTagline: true,
  },
  {
    id: 3,
    tagline: t("HeroVariation3.tagline"),
    title: t("HeroVariation3.title"),
    subtitle: t("HeroVariation3.subtitle"),
    primaryCTA: {
      text: t("HeroVariation3.primaryCTA.text"),
      action: "/contact",
      type: "contact",
    },
    secondaryCTA: {
      text: t("HeroVariation3.secondaryCTA.text"),
      action: "/contact",
      type: "contact",
    },
    backgroundColor: "bg-white",
    visualType: "celebration",
    showTagline: true,
  },
];

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const tw = useTranslations("Waitlist_Page");
  const heroVariations = getHeroVariations(t);
  const locale = useLocale();

  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const { mutate: joinWaitlist, isPending } = useWaitlist();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Use the form refresh hook
  const { handleFormSuccess } = useFormRefresh({
    shouldRefresh: true,
    refreshDelay: 1000,
    useRouterRefresh: true,
  });

  const isHome = pathname === "/" || pathname === "/fr";
  const isWaitlist = pathname === "/waitlist";
  const currentHero = heroVariations[currentHeroIndex];

  // Auto-rotate hero every 6 seconds only on home page
  useEffect(() => {
    if (!isHome) return;
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex(
        (prevIndex) => (prevIndex + 1) % heroVariations.length,
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [isHome, isAutoPlaying]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    joinWaitlist(
      { email },
      {
        onSuccess: (response) => {
          toast.success(
            response.message || "Successfully joined the waitlist!",
          );

          // Use the form refresh hook to handle success and page refresh
          handleFormSuccess(() => {
            setEmail("");
          });
        },
        onError: (error: unknown) => {
          let apiError: string = "Failed to create account.";
          if (isAPIError(error)) {
            apiError = error.response?.data.message ?? apiError;
          } else if (error instanceof Error) {
            apiError = error.message;
          }
          toast.error(apiError);
        },
      },
    );
  };

  const renderCTAButtons = (hero: HeroVariation) => {
    return (
      <div className="mt-4 space-x-4">
        {hero.primaryCTA === null ? null : hero.primaryCTA.type ===
          "contact" ? (
          <ContactFormDialog
            title={hero.primaryCTA.text}
            description={t("ContactFormDialog.getStarted.description")}
          >
            <Button>{hero.primaryCTA.text}</Button>
          </ContactFormDialog>
        ) : (
          <Button asChild>
            <Link href={hero.primaryCTA.action}>{hero.primaryCTA.text}</Link>
          </Button>
        )}

        {hero.secondaryCTA &&
          (hero.secondaryCTA.type === "contact" ? (
            <ContactFormDialog
              title={hero.secondaryCTA.text}
              description={t("ContactFormDialog.getStarted.description")}
            >
              <Button variant="outline">{hero.secondaryCTA.text}</Button>
            </ContactFormDialog>
          ) : (
            <Button className="h-12 px-4" variant="outline" asChild>
              <Link href={hero.secondaryCTA.action}>
                {hero.secondaryCTA.text}
              </Link>
            </Button>
          ))}
      </div>
    );
  };

  return (
    <section
      className={`relative w-full min-w-0 overflow-x-hidden px-4 py-20 transition-all duration-1000 ease-in-out ${isHome ? currentHero.backgroundColor : "bg-white"}`}
    >
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              #E5E7EB,
              #E5E7EB 1px,
              transparent 1px,
              transparent 60px
            ),
            repeating-linear-gradient(
              90deg,
              #E5E7EB,
              #E5E7EB 1px,
              transparent 1px,
              transparent 40px
            )
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/hero-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      {/* Bottom gradient overlay (on all slides) */}
      {isHome && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-2 ${currentHeroIndex === 1 ? "h-48 md:h-[28rem]" : "h-32 md:h-64"}`}
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(247,249,251,1) 0%, rgba(247,249,251,0.97) 55%, rgba(247,249,251,0.7) 75%, rgba(247,249,251,0) 100%)",
          }}
        />
      )}

      {/* Hero content - Two column layout for home, centered for waitlist */}
      <div className="relative z-10 mx-auto h-full max-w-6xl px-4">
        {isHome ? (
          // Two-column layout for home page with rotating content
          <div className="grid min-h-[500px] grid-cols-1 items-center gap-8 lg:min-h-[600px] lg:grid-cols-2 lg:gap-12">
            {/* Right Column - Visual Content */}
            <div className="relative order-2 flex justify-center lg:order-2 lg:justify-start">
              <div
                className={`transition-all duration-1000 ease-in-out ${
                  currentHeroIndex === 1 ? "mt-6 md:mt-10 md:scale-115" : ""
                }`}
              >
                {/* Platform slide */}
                <div
                  className={`${currentHeroIndex === 0 ? "block" : "hidden"}`}
                >
                  <div className="mx-auto w-full max-w-xl">
                    <Image
                      src={"/hero/hero-one.webp"}
                      alt={"platform image"}
                      width={560}
                      height={448}
                      priority={currentHeroIndex === 0}
                      fetchPriority={currentHeroIndex === 0 ? "high" : "low"}
                      loading={currentHeroIndex === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 560px, (min-width: 768px) 80vw, 90vw"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>

                {/* AI slide */}
                <div
                  className={`${currentHeroIndex === 1 ? "block" : "hidden"}`}
                >
                  <div className="mx-auto w-full max-w-xl">
                    <Image
                      src={"/hero/hero-ai.webp"}
                      alt={"ai assistant image"}
                      width={560}
                      height={448}
                      priority={currentHeroIndex === 1}
                      fetchPriority={currentHeroIndex === 1 ? "high" : "low"}
                      loading={currentHeroIndex === 1 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 560px, (min-width: 768px) 80vw, 90vw"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>

                {/* Celebration slide */}
                <div
                  className={`${currentHeroIndex === 2 ? "block" : "hidden"}`}
                >
                  <div className="mx-auto w-full max-w-xl">
                    <Image
                      src={"/hero/hero-two.webp"}
                      alt={"celebration image"}
                      width={560}
                      height={448}
                      priority={currentHeroIndex === 2}
                      fetchPriority={currentHeroIndex === 2 ? "high" : "low"}
                      loading={currentHeroIndex === 2 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 560px, (min-width: 768px) 80vw, 90vw"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>
              </div>
              {currentHeroIndex === 1 && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 md:h-96"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(247,249,251,1) 0%, rgba(247,249,251,0.85) 60%, rgba(247,249,251,0.2) 85%, rgba(247,249,251,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  }}
                />
              )}
              {/* Gift icon moved to text column */}
            </div>

            {/* Left Column - Text Content */}
            <div className="relative order-1 space-y-6 text-left lg:order-1">
              {/* Decorative gift icon: shown on slides 1 and 3, positioned relative to text */}
              {currentHeroIndex === 0 && (
                <Image
                  src={heroGiftIcon}
                  alt="gift icon"
                  className="absolute top-44 right-28 size-[48px] sm:top-44 sm:right-20 md:size-[72px]"
                />
              )}
              {currentHeroIndex === 0 && (
                <Image
                  src={heroImg4}
                  alt="shopping cart icon"
                  className="absolute top-64 left-52 size-[48px] sm:top-84 sm:left-56 md:size-[48px]"
                />
              )}
              {currentHeroIndex === 2 && (
                <Image
                  src={heroGiftIcon}
                  alt="gift icon"
                  className="absolute top-40 right-28 size-[48px] sm:top-52 sm:right-20 md:size-[72px]"
                />
              )}
              {/* Tagline */}
              {currentHero.showTagline && (
                <div className="transition-all duration-1000 ease-in-out">
                  <p className="text-md bg-gradient-to-r from-[#005C73] to-[#72E0D6] bg-clip-text font-semibold tracking-wide text-transparent md:text-lg">
                    {currentHero.tagline
                      .split(/(?<=[.!?])\s+/)
                      .map((part, idx) => (
                        <span key={idx} className="block">
                          {part}
                        </span>
                      ))}
                  </p>
                </div>
              )}

              {/* Title with icon */}
              <div className="relative">
                {(currentHeroIndex === 0 || currentHeroIndex === 2) && (
                  <Image
                    src={heroMapIcon}
                    alt="reward icon"
                    className="absolute -top-8 -left-16 z-0 size-[80px] md:-top-12 md:-left-20 md:size-[80px]"
                  />
                )}
                <h1 className="relative z-10 text-[34px] leading-[130%] font-semibold tracking-tight transition-all duration-1000 ease-in-out md:text-[52px]">
                  {currentHero.title}
                </h1>
              </div>

              {/* Subtitle */}
              <p className="max-w-md text-base whitespace-pre-line text-[#495057] transition-all duration-1000 ease-in-out md:text-[18px]">
                {currentHero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="transition-all duration-1000 ease-in-out">
                {renderCTAButtons(currentHero)}
              </div>
            </div>
          </div>
        ) : (
          // Centered layout for waitlist page
          <div
            className={`mx-auto ${locale === "en" ? "max-w-3xl" : "max-w-4xl"} px-6 py-12 text-center text-black`}
          >
            <div className="relative">
              <h1 className="mb-4 text-[38px] leading-[130%] font-semibold tracking-tight md:text-[60px]">
                {tw("heading")}
              </h1>
              <Image
                src={heroMapIcon}
                alt="reward icon"
                className="absolute -top-4 -left-8 -z-10 size-[60px] md:-left-24 md:size-[100px]"
              />
              <Image
                src={heroGiftIcon}
                alt="gift icon"
                className="absolute -right-8 -bottom-0 -z-10 size-[60px] md:-right-20 md:-bottom-12 md:size-[100px]"
              />
            </div>

            <p className="mb-6 text-base text-[#495057] md:text-[22px]">
              {tw("text")}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto flex w-full flex-col items-center gap-2 sm:w-100 sm:flex-row"
            >
              <Input
                type="email"
                placeholder={tw("form.placeholder")}
                className="w-full flex-1 px-4 sm:w-auto"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="min-w-[120px]"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>{tw("form.pendingButton")}</span>
                  </div>
                ) : (
                  tw("form.button")
                )}
              </Button>
            </form>

            <div className="mx-auto mt-8 md:mt-6 md:max-w-7xl">
              <div className="transition-all duration-1000 ease-in-out">
                <div className="mx-auto w-full max-w-lg">
                  <Image
                    src="/hero/hero-one.webp"
                    alt="platform image"
                    width={500}
                    height={400}
                    priority={false}
                    fetchPriority="low"
                    loading="lazy"
                    sizes="(min-width: 1024px) 500px, (min-width: 768px) 70vw, 85vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero rotation indicator dots for home page */}
        {isHome && (
          <div className="relative z-10 mt-6 flex justify-center space-x-2 lg:mt-8">
            {heroVariations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentHeroIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentHeroIndex
                    ? "bg-teal-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to hero ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
