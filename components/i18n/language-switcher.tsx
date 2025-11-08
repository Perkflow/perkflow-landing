"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const switchTo = locale === "en" ? "fr" : "en";
  const label = locale === "en" ? "FR" : "EN";

  return (
    <Link
      href={pathname}
      locale={switchTo}
      className="flex items-center gap-2 text-lg font-medium text-black hover:text-gray-900 md:text-sm"
    >
      <FaGlobe className="h-4 w-4" />
      {label}
    </Link>
  );
}
