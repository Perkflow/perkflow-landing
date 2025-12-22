"use client";

import { ShopHeaderNav } from "@/features/(trip-website)/components/shop-header-nav";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  const t = useTranslations("Shop_Page");

  return (
    <div className="min-h-screen bg-[#F5F8FB]">
      <ShopHeaderNav>
        <div className="relative hidden sm:block sm:w-80 lg:w-96">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder={t("search.placeholder")}
            className="h-12 rounded-full border-gray-300 bg-gray-50 pl-12 pr-4 focus:bg-white"
          />
        </div>
      </ShopHeaderNav>
      {children}
    </div>
  );
}
