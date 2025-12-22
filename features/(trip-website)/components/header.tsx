"use client";

import Container from "@/components/layouts/container";
import Logo from "@/components/atoms/logo";

import { NavItem } from "./navitem";
import AuthButtons from "./auth-buttons";
import MobileToggle from "./mobile-toggle";
import MobileMenu from "./mobile-menu";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MegaMenu from "./mega-menu";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CompanyMegaMenu from "./company-menu";

import LanguageSwitcher from "@/components/i18n/language-switcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);

  const t = useTranslations("Header");

  // fade-in background on scroll
  useEffect(() => {
    const onScroll = () => setIsOpaque(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll when mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (mobileOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [mobileOpen]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <nav
      className={cn(
        // ① use `fixed` so it never scrolls off-screen
        "fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-colors duration-300",
        isOpaque ? "bg-white/50" : "bg-white",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center lg:gap-16">
            <Logo />
            <div className="hidden lg:flex items-center gap-8">
              <div
                className=""
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <Button
                  className="flex items-center text-gray-700 hover:text-gray-900"
                  variant={"ghost"}
                >
                  {t("navItem.title1")}{" "}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </Button>
                <MegaMenu open={open} setOpen={setOpen} />
              </div>
              <NavItem href="/resources">{t("navItem.title2")}</NavItem>
              <NavItem href="/enterprise">{t("navItem.title3")}</NavItem>
              <div
                className=""
                onMouseEnter={() => setOpen2(true)}
                onMouseLeave={() => setOpen2(false)}
              >
                <Button
                  className="flex items-center text-gray-700 hover:text-gray-900"
                  variant={"ghost"}
                >
                  {t("navItem.title4")}{" "}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </Button>
                <CompanyMegaMenu open={open2} setOpen={setOpen2} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <AuthButtons />
            </div>
            <div className="lg:hidden">
              <MobileToggle
                open={mobileOpen}
                onToggle={() => setMobileOpen((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </Container>

      <MobileMenu
        open2={open2}
        onClose2={() => setOpen2(false)}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </nav>
  );
}
