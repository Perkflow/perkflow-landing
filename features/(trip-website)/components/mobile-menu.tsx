import Logo from "@/components/atoms/logo";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, XIcon } from "lucide-react";
import { NavItem } from "./navitem";
import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import airplaneIcon from "@/assets/icons/airplane.svg";
import giftIcon from "@/assets/icons/gift.svg";
import starIcon from "@/assets/icons/star.svg";

import Image from "next/image";
import { useTranslations } from "next-intl";

const getFEATURES = (t: (key: string) => string) => [
  {
    name: t("navItems.features.item1.name"),
    href: "/automated-rewards",
    icon: starIcon,
    content: t("navItems.features.item1.content"),
  },
  {
    name: t("navItems.features.item2.name"),
    href: "/gifts",
    icon: giftIcon,
    content: t("navItems.features.item2.content"),
  },
  {
    name: t("navItems.features.item3.name"),
    href: "/trips",
    icon: airplaneIcon,
    content: t("navItems.features.item3.content"),
  },
];

const getCOMPANY = (t: (key: string) => string) => [
  {
    name: t("navItems.company.item1.name"),
    href: "/why-us",
    content: t("navItems.company.item1.content"),
  },
  {
    name: t("navItems.company.item2.name"),
    href: "/careers",
    content: t("navItems.company.item2.content"),
  },
  {
    name: t("navItems.company.item3.name"),
    href: "/trips",
    content: t("navItems.company.item3.content"),
  },
  {
    name: t("navItems.company.item4.name"),
    href: "/award-ceremony",
    content: t("navItems.company.item2.content"),
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  open2?: boolean;
  onClose2: () => void;
}

export default function MobileMenu({ open, onClose, onClose2 }: Props) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState("0px");

  const [companyOpen, setCompanyOpen] = useState(false);
  const contentRef2 = useRef<HTMLDivElement>(null);
  const [maxH2, setMaxH2] = useState("0px");

  const t = useTranslations("Header.mobileMenu");
  const FEATURES = getFEATURES(t);
  const COMPANY = getCOMPANY(t);

  useLayoutEffect(() => {
    if (featuresOpen && contentRef.current) {
      setMaxH(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxH("0px");
    }

    if (companyOpen && contentRef2.current) {
      setMaxH2(`${contentRef2.current.scrollHeight}px`);
    } else {
      setMaxH2("0px");
    }
  }, [featuresOpen, companyOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex h-screen transform flex-col bg-white transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4">
        <Logo width={120} height={40} />
        <button
          onClick={onClose}
          className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Nav and expandable Features */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        <div
          className="flex w-full items-center justify-between font-semibold text-gray-800"
          onClick={() => setFeaturesOpen((prev) => !prev)}
        >
          <span className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-[#101828]">
              {t("navItems.features.title")}
            </span>
          </span>
          {featuresOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        <div
          ref={contentRef}
          style={{ maxHeight: maxH }}
          className="overflow-hidden transition-all duration-500 ease-in-out"
        >
          <div className="space-y-8 rounded-[12px] border border-[#EAECF0] bg-white p-4 shadow">
            {FEATURES.map(({ name, href, icon, content }) => {
              return (
                <Link
                  onClick={onClose}
                  key={name}
                  href={href}
                  className="flex items-start space-x-3"
                >
                  <Image
                    src={icon}
                    alt={name}
                    width={20}
                    height={20}
                    className="h-6 w-6"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900">{name}</span>
                    <p className="text-sm text-gray-600">{content}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <NavItem
          href="/resources"
          className={cn("block text-lg font-semibold text-gray-900", {
            "-mt-6": !featuresOpen,
          })}
        >
          {t("navItems.resources.title")}
        </NavItem>
        <NavItem
          href="/enterprise"
          className="block text-lg font-semibold text-gray-900"
        >
          {t("navItems.enterprise.title")}
        </NavItem>

        <div
          className="flex w-full items-center justify-between font-semibold text-gray-800"
          onClick={() => setCompanyOpen((prev) => !prev)}
        >
          <span className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-[#101828]">
              {t("navItems.company.title")}
            </span>
          </span>
          {featuresOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        <div
          ref={contentRef2}
          style={{ maxHeight: maxH2 }}
          className="overflow-hidden transition-all duration-500 ease-in-out"
        >
          <div className="space-y-8 rounded-[12px] border border-[#EAECF0] bg-white p-4 shadow">
            {COMPANY.map(({ name, href, content }) => {
              return (
                <Link
                  onClick={onClose2}
                  key={name}
                  href={href}
                  className="flex items-start space-x-3"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-900">{name}</span>
                    <p className="text-sm text-gray-600">{content}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer sticks to bottom */}
      <div className="flex flex-col space-y-4 px-4 py-6">
        <Link
          href="/contact"
          className="font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground text-center hover:bg-primary/90 transition-colors"
        >
          Get a quote
        </Link>
        <Link
          href="https://sandbox.perkflow.io"
          className="font-semibold px-4 py-2 rounded-full border border-input bg-background text-foreground text-center hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
