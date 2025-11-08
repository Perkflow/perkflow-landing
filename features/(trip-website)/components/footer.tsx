import React from "react";
import { Link } from "@/i18n/navigation";

import { PiWhatsappLogoFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import whiteLogo from "@/assets/icons/white-logo.svg";
import { useTranslations } from "next-intl";

export default function FooterSection() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-[#005C73] py-16 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 justify-between gap-8 px-2 sm:grid-cols-2">
        <div className="max-w-[350px] space-y-8 md:max-w-[420px]">
          <Image
            src={whiteLogo}
            alt="logo"
            className="w-[150px] object-cover"
            width={100}
            height={100}
          />
          <p className="text-sm leading-[150%] text-white/80 md:text-base">
            {t("body")}
          </p>
          <div className="mt-2 flex space-x-3">
            {[
              {
                icon: <PiWhatsappLogoFill size={18} />,
                href: " https://wa.me/33758592722",
              },
              {
                icon: <FaLinkedin size={18} />,
                href: " https://www.linkedin.com/company/perkflow-inc/",
              },
            ].map(({ icon, href }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <span className="text-[#0B263B]">{icon}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex max-w-[350px] flex-wrap justify-between gap-10 md:max-w-[600px]">
          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-medium md:text-lg">
              {t("Company.heading")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 md:text-base">
              <li>
                <Link href="#support" className="hover:text-white">
                  {t("Company.link.support")}
                </Link>
              </li>
              <li>
                <Link href="/resources/#blog" className="hover:text-white">
                  {t("Company.link.blog")}
                </Link>
              </li>
              <li>
                <Link href="/why-us" className="hover:text-white">
                  {t("Company.link.why_us")}
                </Link>
              </li>
              <li>{/* Removed Terms link (duplicated below) */}</li>
              <li>
                <Link href="/jobs-posting" className="hover:text-white">
                  {t("Company.link.jobs")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white">
                  {t("Company.link.news")}
                </Link>
              </li>
              <li>{/* Removed Privacy link (duplicated below) */}</li>
              <li>{/* Removed Refund link (duplicated below) */}</li>
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="mb-4 font-medium md:text-lg">
              {t("Features.heading")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 md:text-base">
              <li>
                <Link href="/gifts" className="hover:text-white">
                  {t("Features.link.gifts")}
                </Link>
              </li>
              <li>
                <Link href="/automated-rewards" className="hover:text-white">
                  {t("Features.link.automated_rewards")}
                </Link>
              </li>
              <li>
                <Link href="/trips" className="hover:text-white">
                  {t("Features.link.trips")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="mb-4 font-medium md:text-lg">
              {t("Contact.heading")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 md:text-base">
              <li>+1 (716) 451-3912</li>
              <li>
                <Link
                  href="mailto:hello@perkflow.io"
                  className="hover:text-white"
                >
                  hello@perkflow.io
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 md:mt-24">
        <div className="mx-auto flex max-w-7xl flex-col items-end justify-between gap-4 px-2 pt-6 text-xs font-light text-white sm:flex-row md:text-sm">
          <div className="flex flex-col gap-16">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href="/terms" className="hover:underline">
                {t("Company.link.terms")}
              </Link>
              <Link href="/privacy" className="hover:underline">
                {t("Company.link.privacy")}
              </Link>
              <Link href="/refund" className="hover:underline">
                {t("Company.link.refund")}
              </Link>
            </div>
            <div className="text-left">
              <p>&copy; 2025 — Copyright PerkFlow, Inc.</p>
              <p>{t("Copywrite.text")}</p>
            </div>
          </div>
          <address className="text-left not-italic sm:text-right">
            PerkFlow
            <br />
            2261 Market Street STE 85409
            <br />
            San Francisco, CA 94114
          </address>
        </div>
      </div>
    </footer>
  );
}
