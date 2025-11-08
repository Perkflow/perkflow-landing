"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useWaitlist } from "@/hooks/useWaitlist";
import { isAPIError } from "@/lib/error";
import ContactFormDialog from "@/components/ui/contact-form-dialog";
import { useFormRefresh } from "@/hooks/use-form-refresh";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  Heart,
  MessageCircle,
  Share,
  Gift,
  MapPin,
} from "lucide-react";

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const { mutate: joinWaitlist, isPending } = useWaitlist();

  // Use the form refresh hook
  const { handleFormSuccess } = useFormRefresh({
    shouldRefresh: true,
    refreshDelay: 1000,
    useRouterRefresh: true,
  });

  const isHome = pathname === "/" || pathname === "/fr";
  const isWaitlist = pathname === "/waitlist";

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

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background with gradient and grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
      <div
        className="absolute inset-0 opacity-30"
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

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 h-16 w-16 rounded-full bg-green-200 opacity-60" />
      <div className="absolute top-40 right-20 h-8 w-8 rounded-full bg-orange-200 opacity-60" />
      <div className="absolute bottom-40 left-20 h-12 w-12 rounded-full bg-blue-200 opacity-60" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
        {isHome ? (
          <div className="w-full text-center">
            {/* Main headline */}
            <div className="relative mb-4">
              <h1 className="text-[34px] leading-[130%] font-semibold tracking-tight text-[#111827] md:text-[52px]">
                Your All-in-One Platform for
                <br />
                Rewards That Work
              </h1>

              {/* Decorative icons */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 transform">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 transform">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Gift className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-3xl text-base text-[#495057] md:text-[18px]">
              {t("Hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="default" className="rounded-full">
                {t("Hero.primaryCTA.text")}
              </Button>
              <Button variant="outline" className="rounded-full">
                {t("Hero.secondaryCTA.text")}
              </Button>
            </div>

            {/* Floating congratulations cards */}
            <div className="relative -mt-8 mb-16">
              {/* Left card */}
              <div className="absolute -top-16 -left-40 w-80 -rotate-3 transform rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-800">
                    Congratulations!
                  </span>
                </div>
                <div className="mb-3 flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gray-300"
                    />
                  ))}
                </div>
                <p className="mb-2 text-sm font-medium text-gray-800">
                  Milestone unlocked #BeatQ2target
                </p>
                <p className="mb-3 text-xs text-gray-600">Sales team</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-gray-600">21</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-gray-600">4</span>
                  </div>
                </div>
              </div>

              {/* Right card */}
              <div className="absolute -top-8 -right-40 w-80 rotate-3 transform rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-800">
                    Congratulations!
                  </span>
                </div>
                <div className="mb-3 flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gray-300"
                    />
                  ))}
                </div>
                <p className="mb-2 text-sm font-medium text-gray-800">
                  Milestone unlocked #Totheskyandbeyond
                </p>
                <p className="mb-3 text-xs text-gray-600">Marketing team</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-gray-600">1000</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-gray-600">22</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Three circular images */}
            <div className="relative flex justify-center gap-16 pt-8">
              {/* Left circle - Map/Planning scene */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <MapPin className="h-16 w-16 text-blue-600" />
                </div>
              </div>

              {/* Middle circle - Boat scene with flower */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-200">
                  <MapPin className="h-16 w-16 text-cyan-600" />
                </div>
                {/* Flower icon */}
                <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-400">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>
              </div>

              {/* Right circle - Wine scene */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                  <MapPin className="h-16 w-16 text-orange-600" />
                </div>
              </div>

              {/* Dashed line connecting middle and right circles */}
              <div className="absolute top-8 left-1/2 h-0.5 w-32 translate-x-8 transform border-t-2 border-dashed border-gray-300"></div>
            </div>
          </div>
        ) : (
          // Waitlist page layout
          <div className="mx-auto w-full max-w-3xl px-6 text-center text-black">
            <div className="relative">
              <h1 className="mb-4 text-[38px] leading-[130%] font-semibold tracking-tight md:text-[60px]">
                Be the First to Unlock Smarter Rewards
              </h1>
            </div>

            <p className="mb-6 text-base text-[#495057] md:text-[22px]">
              Join the waitlist for our all-in-one platform to automate gifting,
              set team goals, and build unforgettable culture through rewards
              and experiences.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto flex w-full flex-col items-center gap-2 sm:w-100 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
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
                    <span>Joining...</span>
                  </div>
                ) : (
                  "Join Waitlist"
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
